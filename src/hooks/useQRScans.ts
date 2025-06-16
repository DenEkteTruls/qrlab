import { useState, useEffect, useCallback } from 'react';
import { supabase, QRScan } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function useQRScans() {
  const [qrScans, setQRScans] = useState<QRScan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchQRScans = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Fetch recent scans for user's QR codes (last 30 days, max 50 scans)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await supabase
        .from('qr_scans')
        .select(`
          *,
          qr_codes!inner(
            id,
            title,
            type,
            user_id
          )
        `)
        .eq('qr_codes.user_id', user.id)
        .gte('scanned_at', thirtyDaysAgo.toISOString())
        .order('scanned_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching QR scans:', error);
        throw error;
      }

      setQRScans(data || []);
    } catch (error) {
      console.error('Error in fetchQRScans:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchQRScans();
  }, [fetchQRScans]);

  return {
    qrScans,
    loading,
    refetch: fetchQRScans
  };
} 
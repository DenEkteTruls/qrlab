import { useState, useEffect } from 'react';
import { supabase, QRCode } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function useQRCodes() {
  const [qrCodes, setQRCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchQRCodes = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      setQRCodes(data || []);
    } catch (error: any) {
      console.error('Error fetching QR codes:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
    } finally {
      setLoading(false);
    }
  };

  const createQRCode = async (qrCodeData: Partial<QRCode>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      // Generate a simple unique short ID
      const shortId = Math.random().toString(36).substr(2, 8);
      
      // Simplify the data structure to match the current schema
      const insertData = {
        user_id: user.id,
        title: qrCodeData.title,
        type: qrCodeData.type || 'url', // Default to 'url' if not specified
        content: qrCodeData.content,
        short_url: `qrlab.no/${shortId}`,
        design_settings: qrCodeData.design_settings || {},
        scan_count: 0,
        is_active: true
      };

      console.log('Attempting to insert QR code:', insertData);

      const { data, error } = await supabase
        .from('qr_codes')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('QR code created successfully:', data);

      // Update local state
      setQRCodes(prev => [data, ...prev]);
      
      return data;
    } catch (error: any) {
      console.error('Error creating QR code:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }
  };

  const updateQRCode = async (id: string, updates: Partial<QRCode>) => {
    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('qr_codes')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase update error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      setQRCodes(prev => prev.map(qr => qr.id === id ? data : qr));
      return data;
    } catch (error: any) {
      console.error('Error updating QR code:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }
  };

  const deleteQRCode = async (id: string) => {
    try {
      const { error } = await supabase
        .from('qr_codes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      setQRCodes(prev => prev.filter(qr => qr.id !== id));
    } catch (error: any) {
      console.error('Error deleting QR code:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }
  };

  const getQRCodeById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select(`
          *,
          qr_access_restrictions (*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching QR code:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchQRCodes();
  }, [user]);

  return {
    qrCodes,
    loading,
    createQRCode,
    updateQRCode,
    deleteQRCode,
    getQRCodeById,
    refetch: fetchQRCodes
  };
} 
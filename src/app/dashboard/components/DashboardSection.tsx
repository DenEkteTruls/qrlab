"use client";

import { useState } from 'react';
import { useQRCodes } from '@/hooks/useQRCodes';
import { Plus, QrCode, BarChart3, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateQRDialog } from './CreateQRDialog';

export function DashboardSection() {
  const { qrCodes, loading } = useQRCodes();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
            Oversikt over dine QR-koder
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
                <div className="h-3 w-24 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const totalScans = qrCodes.reduce((sum, qr) => sum + qr.scan_count, 0);
  const activeQRs = qrCodes.filter(qr => qr.is_active).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
            Oversikt over dine QR-koder
          </p>
        </div>
        <Button 
          size="lg" 
          onClick={() => setCreateDialogOpen(true)}
          style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}
        >
          <Plus className="w-5 h-5 mr-2" />
          Ny QR-kode
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
              Totale QR-koder
            </CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
              {qrCodes.length}
            </div>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
              Alle dine QR-koder
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
              Totale scans
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
              {totalScans}
            </div>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
              Antall ganger skannet
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
              Aktive QR-koder
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
              {activeQRs}
            </div>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
              Koder i bruk
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
              Abonnement
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
              Premium
            </div>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
              Aktiv plan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent QR Codes */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
            Siste QR-koder
          </CardTitle>
        </CardHeader>
        <CardContent>
          {qrCodes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                Ingen QR-koder ennå
              </h3>
              <p className="text-muted-foreground mb-6" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
                Kom i gang ved å lage din første QR-kode
              </p>
              <Button 
                onClick={() => setCreateDialogOpen(true)}
                style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Lag din første QR-kode
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {qrCodes.slice(0, 5).map((qr) => (
                <div key={qr.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                        {qr.title}
                      </h4>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
                        {qr.scan_count} scans • {new Date(qr.created_at).toLocaleDateString('no')}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    qr.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-muted text-muted-foreground'
                  }`} style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                    {qr.is_active ? 'Aktiv' : 'Inaktiv'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create QR Dialog */}
      <CreateQRDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
    </div>
  );
} 
"use client";

import { BarChart3, TrendingUp, Eye, MousePointer, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
            Analytics
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
            Detaljert analyse av QR-kode ytelse
          </p>
        </div>
        <Button variant="outline" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
          <Download className="w-4 h-4 mr-2" />
          Eksporter data
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
              Totale visninger
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
              12,345
            </div>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
              +20.1% fra forrige måned
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
              Unique scans
            </CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
              8,234
            </div>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
              +15.2% fra forrige måned
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
              Konverteringsrate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
              66.7%
            </div>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
              +2.4% fra forrige måned
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
              Gj.snitt per dag
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
              234
            </div>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
              +12.1% fra forrige måned
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
              Scans over tid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
                  Graf kommer her
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
              Top performere
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Produktkatalog QR', scans: 1234, change: '+12%' },
                { name: 'Kontaktinfo QR', scans: 856, change: '+8%' },
                { name: 'Nettside QR', scans: 642, change: '+15%' },
                { name: 'WiFi QR', scans: 428, change: '+3%' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
                      {item.scans} scans
                    </p>
                  </div>
                  <div className="text-green-600 font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                    {item.change}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
            Enhetsfordeling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold mb-2" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
                68%
              </div>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
                Mobil
              </p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold mb-2" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
                28%
              </div>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
                Desktop
              </p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold mb-2" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
                4%
              </div>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
                Tablet
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
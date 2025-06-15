"use client";

import { useState } from 'react';
import { useQRCodes } from '@/hooks/useQRCodes';
import { Plus, QrCode, Search, Filter, MoreHorizontal, Eye, Edit, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { CreateQRDialog } from './CreateQRDialog';

export function QRCodesSection() {
  const { qrCodes, loading } = useQRCodes();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
            Mine QR-koder
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
            Administrer alle dine QR-koder
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-16 bg-muted animate-pulse rounded" />
              ))}
            </div>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
            Mine QR-koder
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
            Administrer alle dine QR-koder
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

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Søk QR-koder..."
            className="pl-10"
            style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}
          />
        </div>
        <Button variant="outline" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* QR Codes List */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
            QR-koder ({qrCodes.length})
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                    QR-kode
                  </TableHead>
                  <TableHead style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                    Type
                  </TableHead>
                  <TableHead style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                    Scans
                  </TableHead>
                  <TableHead style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                    Status
                  </TableHead>
                  <TableHead style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                    Opprettet
                  </TableHead>
                  <TableHead className="text-right" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                    Handlinger
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qrCodes.map((qr) => (
                  <TableRow key={qr.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <QrCode className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                            {qr.title}
                          </p>
                          <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
                            ID: {qr.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
                      {qr.type || 'URL'}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                        {qr.scan_count}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        qr.is_active 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-muted text-muted-foreground'
                      }`} style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                        {qr.is_active ? 'Aktiv' : 'Inaktiv'}
                      </div>
                    </TableCell>
                    <TableCell style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
                      {new Date(qr.created_at).toLocaleDateString('no')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
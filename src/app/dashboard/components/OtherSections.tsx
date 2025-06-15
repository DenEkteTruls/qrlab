"use client";

import { Upload, Users, Settings, FileSpreadsheet, UserPlus, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BulkUploadSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
          Bulk Upload
        </h1>
        <p className="text-muted-foreground mt-1" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
          Last opp flere QR-koder samtidig
        </p>
      </div>

      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
              Bulk upload funksjonalitet
            </h3>
            <p className="text-muted-foreground mb-6" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
              Last opp CSV-filer eller bruk vårt API for å lage mange QR-koder på en gang
            </p>
            <div className="flex gap-4 justify-center">
              <Button style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Last opp CSV
              </Button>
              <Button variant="outline" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
                API dokumentasjon
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function TeamSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
            Team
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
            Administrer teammedlemmer og tilganger
          </p>
        </div>
        <Button style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
          <UserPlus className="w-4 h-4 mr-2" />
          Inviter medlem
        </Button>
      </div>

      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2" style={{ fontFamily: 'Satoshi-Medium, Satoshi-Variable' }}>
              Team administrasjon
            </h3>
            <p className="text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
              Administrer teammedlemmer, roller og tilganger til QR-koder
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
          Innstillinger
        </h1>
        <p className="text-muted-foreground mt-1" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
          Tilpass din QRLab-opplevelse
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
              Profil innstillinger
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
                Administrer profil, passord og preferanser
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable' }}>
              Sikkerhet
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
                To-faktor autentisering og sikkerhetsinnstillinger
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
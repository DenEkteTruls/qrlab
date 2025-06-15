"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { Textarea } from "./ui/textarea";

// Import the QR generator
let QRCodeGenerator: any = null;
if (typeof window !== 'undefined') {
  QRCodeGenerator = (window as any).QRCodeGenerator;
}

export default function QRGenerator() {
  const [qrType, setQrType] = useState("url");
  const [qrData, setQrData] = useState("");
  const [qrStyle, setQrStyle] = useState({
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    size: 256,
    style: "square"
  });
  
  const [generator, setGenerator] = useState<any>(null);
  const [qrResult, setQrResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize generator
  useEffect(() => {
    if (QRCodeGenerator && !generator) {
      setGenerator(new QRCodeGenerator(qrStyle));
    }
  }, [QRCodeGenerator, generator, qrStyle]);

  // Update generator options when style changes
  useEffect(() => {
    if (generator) {
      generator.updateOptions(qrStyle);
    }
  }, [generator, qrStyle]);

  // Generate QR code when data changes
  useEffect(() => {
    if (generator && qrData.trim()) {
      generateQR();
    } else {
      setQrResult(null);
    }
  }, [qrData, qrType, generator]);

  const generateQR = async () => {
    if (!generator || !qrData.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await generator.generate(qrType, qrData, 'api');
      setQrResult(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generator || !qrResult) return;
    
    try {
      await generator.downloadQR(qrResult.url, `qrcode-${Date.now()}.png`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCopy = async () => {
    if (!generator || !qrResult) return;
    
    try {
      await generator.copyToClipboard(qrResult.url);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const qrTypes = [
    { value: "url", label: "Nettside (URL)" },
    { value: "text", label: "Tekst" },
    { value: "email", label: "E-post" },
    { value: "phone", label: "Telefon" },
    { value: "sms", label: "SMS" },
    { value: "wifi", label: "Wi-Fi" },
  ];

  const qrStyles = [
    { value: "square", label: "Firkantede" },
    { value: "rounded", label: "Avrundede" },
    { value: "dot", label: "Prikker" },
  ];

  return (
    <div className="relative z-10 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-900" 
            style={{ fontFamily: 'Satoshi-Bold' }}
          >
            Lag din QR-kode
          </h2>
          <p 
            className="text-lg text-slate-600 max-w-2xl mx-auto" 
            style={{ fontFamily: 'Satoshi-Regular' }}
          >
            Velg type, tilpass utseendet og generer din unike QR-kode på sekunder
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Column 1: Data Input */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-slate-900">
                <span 
                  className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold rounded-full shadow-lg"
                  style={{ fontFamily: 'Satoshi-Bold' }}
                >
                  1
                </span>
                <span 
                  className="text-lg" 
                  style={{ fontFamily: 'Satoshi-Bold' }}
                >
                  Innhold & Type
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label 
                  htmlFor="qr-type" 
                  className="text-slate-700" 
                  style={{ fontFamily: 'Satoshi-Medium' }}
                >
                  QR-kode type
                </Label>
                <Select value={qrType} onValueChange={setQrType}>
                  <SelectTrigger 
                    className="text-base"
                    style={{ fontFamily: 'Satoshi-Regular' }}
                  >
                    <SelectValue placeholder="Velg QR-kode type" />
                  </SelectTrigger>
                  <SelectContent>
                    {qrTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="qr-data" 
                  className="text-slate-700" 
                  style={{ fontFamily: 'Satoshi-Medium' }}
                >
                  {qrType === "url" && "Nettside URL"}
                  {qrType === "text" && "Tekst innhold"}
                  {qrType === "email" && "E-post adresse"}
                  {qrType === "phone" && "Telefonnummer"}
                  {qrType === "sms" && "SMS melding"}
                  {qrType === "wifi" && "Wi-Fi detaljer"}
                </Label>
                {qrType === "text" || qrType === "sms" ? (
                  <Textarea
                    id="qr-data"
                    placeholder={
                      qrType === "text" 
                        ? "Skriv inn teksten din her..." 
                        : "Skriv inn SMS meldingen..."
                    }
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    className="min-h-[100px] text-base"
                    style={{ fontFamily: 'Satoshi-Regular' }}
                  />
                ) : (
                  <Input
                    id="qr-data"
                    type={qrType === "email" ? "email" : qrType === "phone" ? "tel" : "text"}
                    placeholder={
                      qrType === "url" ? "https://example.com" :
                      qrType === "email" ? "navn@example.com" :
                      qrType === "phone" ? "+47 123 45 678" :
                      qrType === "wifi" ? "SSID:passord:WPA" :
                      "Skriv inn data..."
                    }
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    className="text-base"
                    style={{ fontFamily: 'Satoshi-Regular' }}
                  />
                )}
              </div>

              {qrType === "wifi" && (
                <div className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg" style={{ fontFamily: 'Satoshi-Regular' }}>
                  <strong>Format:</strong> SSID:Passord:Sikkerhet (f.eks. MinWiFi:passord123:WPA)
                </div>
              )}

              {error && (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg" style={{ fontFamily: 'Satoshi-Regular' }}>
                  <strong>Feil:</strong> {error}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Column 2: Style Customization */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-slate-900">
                <span 
                  className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg"
                  style={{ fontFamily: 'Satoshi-Bold' }}
                >
                  2
                </span>
                <span 
                  className="text-lg" 
                  style={{ fontFamily: 'Satoshi-Bold' }}
                >
                  Design & Stil
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label 
                    htmlFor="fg-color" 
                    className="text-slate-700" 
                    style={{ fontFamily: 'Satoshi-Medium' }}
                  >
                    Forgrunns farge
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="fg-color"
                      type="color"
                      value={qrStyle.foregroundColor}
                      onChange={(e) => setQrStyle({...qrStyle, foregroundColor: e.target.value})}
                      className="w-12 h-9 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={qrStyle.foregroundColor}
                      onChange={(e) => setQrStyle({...qrStyle, foregroundColor: e.target.value})}
                      className="flex-1 text-sm"
                      style={{ fontFamily: 'Satoshi-Regular' }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="bg-color" 
                    className="text-slate-700" 
                    style={{ fontFamily: 'Satoshi-Medium' }}
                  >
                    Bakgrunns farge
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="bg-color"
                      type="color"
                      value={qrStyle.backgroundColor}
                      onChange={(e) => setQrStyle({...qrStyle, backgroundColor: e.target.value})}
                      className="w-12 h-9 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={qrStyle.backgroundColor}
                      onChange={(e) => setQrStyle({...qrStyle, backgroundColor: e.target.value})}
                      className="flex-1 text-sm"
                      style={{ fontFamily: 'Satoshi-Regular' }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="qr-style" 
                    className="text-slate-700" 
                    style={{ fontFamily: 'Satoshi-Medium' }}
                  >
                    QR-kode stil
                  </Label>
                  <Select 
                    value={qrStyle.style} 
                    onValueChange={(value) => setQrStyle({...qrStyle, style: value})}
                  >
                    <SelectTrigger style={{ fontFamily: 'Satoshi-Regular' }}>
                      <SelectValue placeholder="Velg stil" />
                    </SelectTrigger>
                    <SelectContent>
                      {qrStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="qr-size" 
                    className="text-slate-700" 
                    style={{ fontFamily: 'Satoshi-Medium' }}
                  >
                    Størrelse ({qrStyle.size}px)
                  </Label>
                  <input
                    id="qr-size"
                    type="range"
                    min="128"
                    max="512"
                    step="32"
                    value={qrStyle.size}
                    onChange={(e) => setQrStyle({...qrStyle, size: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Column 3: Preview and Actions */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <span 
                    className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold rounded-full shadow-lg"
                    style={{ fontFamily: 'Satoshi-Bold' }}
                  >
                    3
                  </span>
                  <span 
                    className="text-lg" 
                    style={{ fontFamily: 'Satoshi-Bold' }}
                  >
                    Forhåndsvisning
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                {/* QR Code Preview */}
                <div 
                  className="border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center overflow-hidden"
                  style={{ 
                    width: '100%',
                    aspectRatio: '1',
                    maxWidth: '200px',
                    minHeight: '200px'
                  }}
                >
                  {isGenerating ? (
                    <div className="text-slate-400 text-center" style={{ fontFamily: 'Satoshi-Regular' }}>
                      <div className="text-2xl mb-2">⏳</div>
                      <div className="text-sm">Genererer...</div>
                    </div>
                  ) : qrResult ? (
                    <img 
                      src={qrResult.url} 
                      alt="Generated QR Code"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : qrData ? (
                    <div className="text-slate-400 text-center" style={{ fontFamily: 'Satoshi-Regular' }}>
                      <div className="text-2xl mb-2">🔄</div>
                      <div className="text-sm">Vent litt...</div>
                    </div>
                  ) : (
                    <div className="text-slate-400 text-center" style={{ fontFamily: 'Satoshi-Regular' }}>
                      <div className="text-4xl mb-2">📱</div>
                      <div className="text-sm">QR-koden vises her</div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="w-full space-y-3">
                  <Button 
                    className="w-full text-sm py-2 h-auto shadow-lg" 
                    disabled={!qrResult || isGenerating}
                    onClick={handleDownload}
                    style={{ fontFamily: 'Satoshi-Bold' }}
                  >
                    Last ned QR-kode
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-sm py-2 h-auto" 
                    disabled={!qrResult || isGenerating}
                    onClick={handleCopy}
                    style={{ fontFamily: 'Satoshi-Medium' }}
                  >
                    Kopier som bilde
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-sm py-2 h-auto" 
                    disabled={!qrResult || isGenerating}
                    style={{ fontFamily: 'Satoshi-Medium' }}
                  >
                    Del QR-kode
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-slate-100">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div 
                      className="text-xl font-bold text-slate-900" 
                      style={{ fontFamily: 'Satoshi-Bold' }}
                    >
                      {qrData.length}
                    </div>
                    <div 
                      className="text-xs text-slate-500" 
                      style={{ fontFamily: 'Satoshi-Regular' }}
                    >
                      Tegn
                    </div>
                  </div>
                  <div>
                    <div 
                      className="text-xl font-bold text-slate-900" 
                      style={{ fontFamily: 'Satoshi-Bold' }}
                    >
                      {qrStyle.size}px
                    </div>
                    <div 
                      className="text-xs text-slate-500" 
                      style={{ fontFamily: 'Satoshi-Regular' }}
                    >
                      Størrelse
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
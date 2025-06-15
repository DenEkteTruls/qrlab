import { NextRequest, NextResponse } from 'next/server';
import { logQRScan, parseTrackingData } from '@/lib/tracking';

export async function GET(request: NextRequest) {
  try {
    const url = request.url;
    const trackingData = parseTrackingData(url);
    
    if (!trackingData) {
      return NextResponse.json({ error: 'Invalid tracking data' }, { status: 400 });
    }
    
    const { type, value, scanId, qrId } = trackingData;
    
    // Get client information
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Log the scan
    const logSuccess = await logQRScan({
      qrCodeId: qrId,
      scanId: scanId,
      ipAddress: clientIP,
      userAgent: userAgent,
      country: 'Unknown', // You could use a GeoIP service here
      city: 'Unknown'
    });
    
    console.log('QR Scan logged:', {
      qrId,
      scanId,
      type,
      value,
      success: logSuccess
    });
    
    // Redirect based on type
    let redirectUrl: string;
    
    switch (type) {
      case 'url':
        redirectUrl = value.startsWith('http') ? value : `https://${value}`;
        break;
      case 'phone':
      case 'telefon':
        redirectUrl = `tel:${value}`;
        break;
      case 'email':
        redirectUrl = `mailto:${value}`;
        break;
      case 'sms':
        redirectUrl = `sms:${value}`;
        break;
      default:
        // For text and other types, show the content
        return NextResponse.json({
          message: 'QR Code scanned successfully',
          type,
          content: value,
          scanId,
          tracked: logSuccess
        });
    }
    
    // Redirect to the actual content
    return NextResponse.redirect(redirectUrl);
    
  } catch (error) {
    console.error('Error in tracking endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Also handle POST requests for webhook compatibility
export async function POST(request: NextRequest) {
  return GET(request);
} 
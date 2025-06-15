# QR Code Tracking System

## Overview

The QR code tracking system has been implemented to track scans and provide analytics. When a user creates a QR code with tracking enabled, the system generates tracking URLs instead of direct content URLs.

## How It Works

### 1. QR Code Creation
- When creating a QR code (e.g., type="telefon", value="48338033")
- If tracking is enabled (default), the system generates a tracking URL
- Example: `/api/track?type=telefon&value=48338033&scan_id=abc123&qr_id=uuid`

### 2. QR Code Scanning
- User scans the QR code
- Gets redirected to the tracking URL
- System logs the scan with metadata (IP, user agent, timestamp)
- User gets redirected to the actual content (tel:48338033)

### 3. Analytics
- Each scan is logged in the `qr_scans` table
- Scan count is automatically incremented on the QR code
- Tracking data includes: IP address, user agent, location, timestamp

## Files Modified

### New Files
- `src/lib/tracking.ts` - Core tracking utilities
- `src/app/api/track/route.ts` - API endpoint for handling scans
- `supabase/migrations/20241220_add_increment_scan_count_function.sql` - Database function

### Modified Files
- `src/app/dashboard/components/QRCodesSection.tsx` - Updated to use tracking URLs
- `src/lib/supabase.ts` - Added scan_id field to QRScan interface

## Configuration

### Local Testing
Currently configured to use local API endpoint: `/api/track`

### Production
To use external webhook, update `TRACKING_BASE_URL` in `src/lib/tracking.ts`:
```typescript
const TRACKING_BASE_URL = 'http://caspernag.app.n8n.cloud/webhook-test/qrlab';
```

## Database Setup

Run this SQL to create the increment function:
```sql
CREATE OR REPLACE FUNCTION increment_scan_count(qr_code_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE qr_codes 
  SET 
    scan_count = scan_count + 1,
    updated_at = NOW()
  WHERE id = qr_code_id;
END;
$$;

GRANT EXECUTE ON FUNCTION increment_scan_count(UUID) TO authenticated;
```

## Features

### Tracking Indicators
- QR codes with tracking enabled show a "Tracking" badge in the dashboard
- Tracking can be disabled per QR code in advanced settings

### Supported Types
- **URL**: Redirects to website
- **Phone/Telefon**: Opens phone dialer (tel:)
- **Email**: Opens email client (mailto:)
- **SMS**: Opens SMS app (sms:)
- **Text**: Returns JSON with content

### Analytics Data
Each scan logs:
- QR code ID
- Unique scan ID
- IP address
- User agent
- Country/city (if GeoIP service added)
- Timestamp
- GPS coordinates (if available)

## Example Flow

1. User creates QR code: type="telefon", content="48338033"
2. System generates tracking URL: `/api/track?type=telefon&value=48338033&scan_id=xyz789&qr_id=abc123`
3. QR code contains the tracking URL
4. When scanned:
   - Logs scan to database
   - Increments scan count
   - Redirects to `tel:48338033`

## Testing

1. Create a QR code with tracking enabled
2. Scan the QR code or visit the tracking URL
3. Check the database for logged scans
4. Verify scan count increments

The system is now ready for use with comprehensive tracking and analytics! 
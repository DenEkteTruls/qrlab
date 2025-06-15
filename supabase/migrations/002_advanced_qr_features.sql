-- Add advanced features to QR codes table
ALTER TABLE qr_codes ADD COLUMN IF NOT EXISTS advanced_settings JSONB DEFAULT '{}';

-- Update the type constraint to include new QR types
ALTER TABLE qr_codes DROP CONSTRAINT IF EXISTS qr_codes_type_check;
ALTER TABLE qr_codes ADD CONSTRAINT qr_codes_type_check 
CHECK (type IN ('url', 'text', 'vcard', 'wifi', 'email', 'phone', 'sms', 'event', 'crypto'));

-- Add columns for advanced analytics
ALTER TABLE qr_scans ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8);
ALTER TABLE qr_scans ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);
ALTER TABLE qr_scans ADD COLUMN IF NOT EXISTS blocked BOOLEAN DEFAULT FALSE;
ALTER TABLE qr_scans ADD COLUMN IF NOT EXISTS block_reason TEXT;

-- Create table for QR code access restrictions
CREATE TABLE IF NOT EXISTS qr_access_restrictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  qr_code_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE NOT NULL,
  restriction_type TEXT NOT NULL CHECK (restriction_type IN ('geo', 'time', 'password', 'scan_limit')),
  restriction_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for QR code security events
CREATE TABLE IF NOT EXISTS qr_security_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  qr_code_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('blocked_scan', 'failed_password', 'geo_violation', 'time_violation', 'scan_limit_exceeded')),
  event_data JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security for new tables
ALTER TABLE qr_access_restrictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_security_events ENABLE ROW LEVEL SECURITY;

-- Policies for access restrictions
CREATE POLICY "Users can view own QR access restrictions" ON qr_access_restrictions FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM qr_codes 
  WHERE qr_codes.id = qr_access_restrictions.qr_code_id 
  AND qr_codes.user_id = auth.uid()
));

CREATE POLICY "Users can manage own QR access restrictions" ON qr_access_restrictions FOR ALL
USING (EXISTS (
  SELECT 1 FROM qr_codes 
  WHERE qr_codes.id = qr_access_restrictions.qr_code_id 
  AND qr_codes.user_id = auth.uid()
));

-- Policies for security events
CREATE POLICY "Users can view own QR security events" ON qr_security_events FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM qr_codes 
  WHERE qr_codes.id = qr_security_events.qr_code_id 
  AND qr_codes.user_id = auth.uid()
));

-- Create function to validate QR access
CREATE OR REPLACE FUNCTION validate_qr_access(
  qr_id UUID,
  user_ip TEXT DEFAULT NULL,
  user_lat DECIMAL DEFAULT NULL,
  user_lng DECIMAL DEFAULT NULL,
  password_attempt TEXT DEFAULT NULL
) RETURNS TABLE (
  allowed BOOLEAN,
  reason TEXT
) LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  qr_record qr_codes%ROWTYPE;
  restriction_record RECORD;
  current_scans INTEGER;
  daily_scans INTEGER;
BEGIN
  -- Get QR code record
  SELECT * INTO qr_record FROM qr_codes WHERE id = qr_id AND is_active = TRUE;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'QR code not found or inactive';
    RETURN;
  END IF;

  -- Check password protection
  IF (qr_record.advanced_settings->>'passwordProtected')::BOOLEAN = TRUE THEN
    IF password_attempt IS NULL OR 
       password_attempt != (qr_record.advanced_settings->>'password') THEN
      RETURN QUERY SELECT FALSE, 'Invalid password';
      RETURN;
    END IF;
  END IF;

  -- Check scan limits
  IF (qr_record.advanced_settings->>'scanLimit')::INTEGER > 0 THEN
    SELECT COUNT(*) INTO current_scans FROM qr_scans WHERE qr_code_id = qr_id;
    IF current_scans >= (qr_record.advanced_settings->>'scanLimit')::INTEGER THEN
      RETURN QUERY SELECT FALSE, 'Scan limit exceeded';
      RETURN;
    END IF;
  END IF;

  -- Check daily scan limits
  IF (qr_record.advanced_settings->>'maxScansPerDay')::INTEGER > 0 THEN
    SELECT COUNT(*) INTO daily_scans 
    FROM qr_scans 
    WHERE qr_code_id = qr_id 
    AND scanned_at >= CURRENT_DATE;
    
    IF daily_scans >= (qr_record.advanced_settings->>'maxScansPerDay')::INTEGER THEN
      RETURN QUERY SELECT FALSE, 'Daily scan limit exceeded';
      RETURN;
    END IF;
  END IF;

  -- Check geographic restrictions
  IF (qr_record.advanced_settings->>'geoLocked')::BOOLEAN = TRUE AND 
     user_lat IS NOT NULL AND user_lng IS NOT NULL THEN
    
    -- Simple radius check (in a real implementation, you'd use PostGIS)
    -- This is a simplified version
    IF NOT EXISTS (
      SELECT 1 FROM qr_access_restrictions 
      WHERE qr_code_id = qr_id 
      AND restriction_type = 'geo'
      -- Add proper geographic validation here
    ) THEN
      RETURN QUERY SELECT FALSE, 'Geographic restriction violated';
      RETURN;
    END IF;
  END IF;

  -- Check time restrictions
  IF (qr_record.advanced_settings->>'timeRestricted')::BOOLEAN = TRUE THEN
    DECLARE
      valid_from TIMESTAMP;
      valid_until TIMESTAMP;
    BEGIN
      valid_from := (qr_record.advanced_settings->>'validFrom')::TIMESTAMP;
      valid_until := (qr_record.advanced_settings->>'validUntil')::TIMESTAMP;
      
      IF (valid_from IS NOT NULL AND NOW() < valid_from) OR
         (valid_until IS NOT NULL AND NOW() > valid_until) THEN
        RETURN QUERY SELECT FALSE, 'Time restriction violated';
        RETURN;
      END IF;
    END;
  END IF;

  -- If all checks pass
  RETURN QUERY SELECT TRUE, 'Access granted';
END;
$$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_qr_scans_qr_code_id ON qr_scans(qr_code_id);
CREATE INDEX IF NOT EXISTS idx_qr_scans_scanned_at ON qr_scans(scanned_at);
CREATE INDEX IF NOT EXISTS idx_qr_access_restrictions_qr_code_id ON qr_access_restrictions(qr_code_id);
CREATE INDEX IF NOT EXISTS idx_qr_security_events_qr_code_id ON qr_security_events(qr_code_id);
CREATE INDEX IF NOT EXISTS idx_qr_security_events_created_at ON qr_security_events(created_at); 
-- Add the missing advanced_settings column
ALTER TABLE qr_codes 
ADD COLUMN IF NOT EXISTS advanced_settings JSONB DEFAULT '{}';

-- Update the type constraint to include all new QR types
ALTER TABLE qr_codes DROP CONSTRAINT IF EXISTS qr_codes_type_check;
ALTER TABLE qr_codes ADD CONSTRAINT qr_codes_type_check 
CHECK (type IN ('url', 'text', 'vcard', 'wifi', 'email', 'phone', 'sms', 'event', 'crypto'));

-- Update the unique constraint on short_url to be more flexible
ALTER TABLE qr_codes DROP CONSTRAINT IF EXISTS qr_codes_short_url_key;
ALTER TABLE qr_codes ADD CONSTRAINT qr_codes_short_url_unique UNIQUE (short_url);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_qr_codes_user_created ON qr_codes(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_qr_codes_type ON qr_codes(type);
CREATE INDEX IF NOT EXISTS idx_qr_codes_active ON qr_codes(is_active) WHERE is_active = true;

-- Create the access restrictions table for advanced features
CREATE TABLE IF NOT EXISTS qr_access_restrictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  qr_code_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE NOT NULL,
  restriction_type TEXT NOT NULL CHECK (restriction_type IN ('geo', 'time', 'password', 'scan_limit')),
  restriction_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the security events table
CREATE TABLE IF NOT EXISTS qr_security_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  qr_code_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('blocked_scan', 'failed_password', 'geo_violation', 'time_violation', 'scan_limit_exceeded', 'qr_created')),
  event_data JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
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

-- Add indexes for new tables
CREATE INDEX IF NOT EXISTS idx_qr_access_restrictions_qr_code_id ON qr_access_restrictions(qr_code_id);
CREATE INDEX IF NOT EXISTS idx_qr_security_events_qr_code_id ON qr_security_events(qr_code_id);
CREATE INDEX IF NOT EXISTS idx_qr_security_events_created_at ON qr_security_events(created_at); 
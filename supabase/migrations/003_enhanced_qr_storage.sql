-- Ensure the qr_codes table has all necessary columns
ALTER TABLE qr_codes 
ADD COLUMN IF NOT EXISTS advanced_settings JSONB DEFAULT '{}';

-- Update the type constraint to include all new QR types
ALTER TABLE qr_codes DROP CONSTRAINT IF EXISTS qr_codes_type_check;
ALTER TABLE qr_codes ADD CONSTRAINT qr_codes_type_check 
CHECK (type IN ('url', 'text', 'vcard', 'wifi', 'email', 'phone', 'sms', 'event', 'crypto'));

-- Create function to generate unique short IDs
CREATE OR REPLACE FUNCTION generate_unique_short_id()
RETURNS TEXT AS $$
DECLARE
    new_id TEXT;
    done BOOL;
BEGIN
    done := FALSE;
    WHILE NOT done LOOP
        new_id := 'qr_' || substr(md5(random()::text), 1, 8);
        done := NOT EXISTS(SELECT 1 FROM qr_codes WHERE short_url LIKE '%' || new_id);
    END LOOP;
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to log QR code creation
CREATE OR REPLACE FUNCTION log_qr_creation()
RETURNS TRIGGER AS $$
BEGIN
    -- Log the creation in a separate audit table if needed
    INSERT INTO qr_security_events (qr_code_id, event_type, event_data, created_at)
    VALUES (NEW.id, 'qr_created', jsonb_build_object(
        'title', NEW.title,
        'type', NEW.type,
        'has_advanced_features', (NEW.advanced_settings != '{}'),
        'security_level', COALESCE((NEW.advanced_settings->>'securityLevel')::int, 0)
    ), NOW());
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for QR code creation logging
DROP TRIGGER IF EXISTS qr_creation_log ON qr_codes;
CREATE TRIGGER qr_creation_log
    AFTER INSERT ON qr_codes
    FOR EACH ROW
    EXECUTE FUNCTION log_qr_creation();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_qr_codes_user_created ON qr_codes(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_qr_codes_short_url ON qr_codes(short_url);
CREATE INDEX IF NOT EXISTS idx_qr_codes_type ON qr_codes(type);
CREATE INDEX IF NOT EXISTS idx_qr_codes_active ON qr_codes(is_active) WHERE is_active = true;

-- Add constraint to ensure short_url uniqueness
ALTER TABLE qr_codes ADD CONSTRAINT unique_short_url UNIQUE (short_url); 
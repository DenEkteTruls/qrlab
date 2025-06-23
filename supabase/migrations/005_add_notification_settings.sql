-- Add notification settings column to profiles table
ALTER TABLE profiles 
ADD COLUMN notification_settings JSONB DEFAULT '{
  "email_notifications": true,
  "push_notifications": false,
  "marketing_emails": false,
  "security_alerts": true
}'::jsonb;

-- Update existing rows to have default notification settings
UPDATE profiles 
SET notification_settings = '{
  "email_notifications": true,
  "push_notifications": false,
  "marketing_emails": false,
  "security_alerts": true
}'::jsonb
WHERE notification_settings IS NULL; 
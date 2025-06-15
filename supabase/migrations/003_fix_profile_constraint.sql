-- Fix potential foreign key constraint issues
-- This migration ensures the database is properly set up for QR code creation

-- First, let's make sure the profiles table allows for automatic user creation
-- by making the foreign key constraint less strict
ALTER TABLE qr_codes DROP CONSTRAINT IF EXISTS qr_codes_user_id_fkey;

-- Add a more flexible foreign key constraint that allows for cascading
ALTER TABLE qr_codes 
ADD CONSTRAINT qr_codes_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Ensure the advanced_settings column exists and has a proper default
ALTER TABLE qr_codes 
ALTER COLUMN advanced_settings SET DEFAULT '{}';

-- Make sure all constraints are named properly to avoid conflicts
ALTER TABLE qr_codes DROP CONSTRAINT IF EXISTS qr_codes_short_url_unique;
ALTER TABLE qr_codes ADD CONSTRAINT qr_codes_short_url_unique UNIQUE (short_url);

-- Add a function to automatically create profiles when needed
CREATE OR REPLACE FUNCTION ensure_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if profile exists, if not create it
  INSERT INTO profiles (id, email, full_name, subscription_tier)
  VALUES (
    NEW.user_id,
    (SELECT email FROM auth.users WHERE id = NEW.user_id),
    COALESCE(
      (SELECT raw_user_meta_data->>'full_name' FROM auth.users WHERE id = NEW.user_id),
      (SELECT email FROM auth.users WHERE id = NEW.user_id),
      'User'
    ),
    'free'
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically ensure profile exists when creating QR codes
DROP TRIGGER IF EXISTS ensure_profile_on_qr_insert ON qr_codes;
CREATE TRIGGER ensure_profile_on_qr_insert
  BEFORE INSERT ON qr_codes
  FOR EACH ROW
  EXECUTE FUNCTION ensure_user_profile();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.qr_codes TO authenticated;
GRANT ALL ON public.qr_scans TO authenticated;
GRANT ALL ON public.qr_access_restrictions TO authenticated;
GRANT ALL ON public.qr_security_events TO authenticated;

-- Additional safety: ensure RLS policies are properly set
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;
CREATE POLICY "Enable insert for authenticated users only" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Test the setup by creating a simple view to debug issues
CREATE OR REPLACE VIEW debug_qr_setup AS
SELECT 
  'Tables exist' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN '✓ profiles'
    ELSE '✗ profiles missing'
  END as profiles_status,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'qr_codes') THEN '✓ qr_codes'
    ELSE '✗ qr_codes missing'
  END as qr_codes_status,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'qr_codes' AND column_name = 'advanced_settings') THEN '✓ advanced_settings column'
    ELSE '✗ advanced_settings column missing'
  END as advanced_settings_status; 
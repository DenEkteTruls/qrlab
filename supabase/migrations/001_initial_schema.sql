-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Create users profile table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create QR codes table
CREATE TABLE qr_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('url', 'text', 'vcard', 'wifi')),
  content TEXT NOT NULL,
  short_url TEXT UNIQUE NOT NULL,
  design_settings JSONB DEFAULT '{}',
  scan_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create QR scans table for analytics
CREATE TABLE qr_scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  qr_code_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_scans ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- QR codes policies
CREATE POLICY "Users can view own QR codes" ON qr_codes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own QR codes" ON qr_codes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own QR codes" ON qr_codes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own QR codes" ON qr_codes FOR DELETE USING (auth.uid() = user_id);

-- QR scans policies (users can view scans of their QR codes)
CREATE POLICY "Users can view scans of own QR codes" ON qr_scans FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM qr_codes 
  WHERE qr_codes.id = qr_scans.qr_code_id 
  AND qr_codes.user_id = auth.uid()
));

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user(); 
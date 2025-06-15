-- Create function to increment scan count for QR codes
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION increment_scan_count(UUID) TO authenticated; 
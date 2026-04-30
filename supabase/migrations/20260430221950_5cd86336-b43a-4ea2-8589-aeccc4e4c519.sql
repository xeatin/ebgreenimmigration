-- Create public storage bucket for resumes uploaded via contact form
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone (including anonymous visitors) to upload to the resumes bucket
CREATE POLICY "Anyone can upload resumes"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'resumes');

-- Allow public read access so the URL embedded in emails works
CREATE POLICY "Resumes are publicly readable"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'resumes');
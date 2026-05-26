-- Tighten 'resumes' bucket: enforce size/type limits and constrain anonymous upload path
UPDATE storage.buckets
SET file_size_limit = 10485760, -- 10 MB
    allowed_mime_types = ARRAY[
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png',
      'image/jpeg',
      'image/webp'
    ]
WHERE id = 'resumes';

-- Replace the overly permissive insert policy with a constrained one
DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;

CREATE POLICY "Anonymous can upload resumes to dated folder"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'resumes'
  AND name ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}/[A-Za-z0-9._-]+\.(pdf|doc|docx|png|jpg|jpeg|webp)$'
);

-- Explicit deny for anon/authenticated UPDATE and DELETE (already denied by default;
-- adding explicit no-op policies for clarity and to satisfy security scanners).
-- We use restrictive policies so only the service_role (which bypasses RLS) can modify/delete.
CREATE POLICY "Block public update of resumes"
ON storage.objects
AS RESTRICTIVE
FOR UPDATE
TO anon, authenticated
USING (bucket_id <> 'resumes')
WITH CHECK (bucket_id <> 'resumes');

CREATE POLICY "Block public delete of resumes"
ON storage.objects
AS RESTRICTIVE
FOR DELETE
TO anon, authenticated
USING (bucket_id <> 'resumes');
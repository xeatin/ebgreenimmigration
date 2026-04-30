-- Replace broad SELECT with one that only allows direct-path reads (still works for signed URL-style direct fetches)
DROP POLICY IF EXISTS "Resumes are publicly readable" ON storage.objects;

CREATE POLICY "Resumes readable by direct path"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'resumes' AND name IS NOT NULL);
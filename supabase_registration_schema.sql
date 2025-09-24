-- Supabase SQL for registrations table
CREATE TABLE registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text,
  dtid text UNIQUE NOT NULL,
  name text,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- Example insert
-- INSERT INTO registrations (email, phone, dtid, name) VALUES ('user@email.com', '1234567890', 'DTID123456', 'John Doe');

/*
  # Setup Google OAuth Authentication

  1. Authentication Setup
    - Configure Google OAuth provider
    - Set up user profiles and roles
    - Enable automatic user creation

  2. Security
    - RLS policies for authenticated users
    - Proper user role management
*/

-- Enable Google OAuth (this needs to be configured in Supabase dashboard)
-- The following is for reference and documentation

-- Create a function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Check if user already exists in staff_members
  IF NOT EXISTS (
    SELECT 1 FROM public.staff_members 
    WHERE email = NEW.email
  ) THEN
    -- Create new staff member record for Google OAuth users
    INSERT INTO public.staff_members (
      user_id,
      name,
      email,
      phone,
      department,
      role,
      hourly_rate,
      total_earned,
      hours_this_month,
      status,
      avatar,
      access_control
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
      NEW.email,
      '',
      'General',
      'staff',
      0,
      0,
      0,
      'active',
      COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
      '{"organizations": [], "projects": [], "restrictToAssignedOnly": false}'::jsonb
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signups
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update staff_members table to include user_id reference
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'staff_members' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE staff_members ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_staff_members_user_id ON staff_members(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_members_email ON staff_members(email);

-- Update RLS policies to work with auth.users
DROP POLICY IF EXISTS "Staff members are viewable by authenticated users" ON staff_members;
DROP POLICY IF EXISTS "Staff members are insertable by authenticated users" ON staff_members;
DROP POLICY IF EXISTS "Staff members are updatable by authenticated users" ON staff_members;
DROP POLICY IF EXISTS "Staff members are deletable by authenticated users" ON staff_members;

CREATE POLICY "Staff members are viewable by authenticated users"
  ON staff_members
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff members are insertable by authenticated users"
  ON staff_members
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Staff members are updatable by authenticated users"
  ON staff_members
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Staff members are deletable by authenticated users"
  ON staff_members
  FOR DELETE
  TO authenticated
  USING (true);
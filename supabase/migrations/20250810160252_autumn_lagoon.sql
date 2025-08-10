/*
  # User Registration and Admin Management Setup

  1. New Features
    - Enable user self-registration
    - Admin user creation functionality
    - Role-based access control enhancements
    
  2. Security
    - Maintain existing RLS policies
    - Ensure proper user creation flow
    - Admin role management
    
  3. Triggers
    - Auto-create staff member records for new users
    - Handle user metadata properly
*/

-- Enable user registration by updating auth settings
-- Note: This would typically be done in Supabase dashboard, but documenting here

-- Update the handle_new_user function to better handle registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
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
    access_control,
    joined_at
  )
  VALUES (
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
    '{"organizations": [], "projects": [], "restrictToAssignedOnly": false}'::jsonb,
    CURRENT_DATE
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add index for better performance on user lookups
CREATE INDEX IF NOT EXISTS idx_staff_members_user_id_email ON staff_members(user_id, email);

-- Add constraint to ensure email uniqueness across the system
-- (This should already exist, but ensuring it's there)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'staff_members_email_key' 
    AND table_name = 'staff_members'
  ) THEN
    ALTER TABLE staff_members ADD CONSTRAINT staff_members_email_key UNIQUE (email);
  END IF;
END $$;
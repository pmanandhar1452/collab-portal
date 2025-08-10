/*
  # Create users and staff management schema

  1. New Tables
    - `staff_members`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `department` (text)
      - `role` (text)
      - `hourly_rate` (numeric)
      - `total_earned` (numeric)
      - `hours_this_month` (numeric)
      - `status` (text)
      - `avatar` (text)
      - `access_control` (jsonb)
      - `joined_at` (date)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on staff_members table
    - Add policies for authenticated users
*/

-- Create staff_members table
CREATE TABLE IF NOT EXISTS staff_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text DEFAULT '',
  department text DEFAULT '',
  role text DEFAULT 'staff',
  hourly_rate numeric DEFAULT 0,
  total_earned numeric DEFAULT 0,
  hours_this_month numeric DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  avatar text DEFAULT '',
  access_control jsonb DEFAULT '{
    "organizations": [],
    "projects": [],
    "restrictToAssignedOnly": false
  }',
  joined_at date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;

-- Create policies for staff_members
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_staff_members_user_id ON staff_members(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_members_email ON staff_members(email);
CREATE INDEX IF NOT EXISTS idx_staff_members_status ON staff_members(status);
CREATE INDEX IF NOT EXISTS idx_staff_members_department ON staff_members(department);

-- Insert default staff members (these would normally be created through user registration)
INSERT INTO staff_members (
  name, email, phone, department, role, hourly_rate, total_earned, 
  hours_this_month, status, avatar, access_control, joined_at
) VALUES 
(
  'Sarah Johnson',
  'sarah@company.com',
  '+1 (555) 123-4567',
  'Development',
  'Senior Developer',
  85,
  12450,
  156,
  'active',
  'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  '{"organizations": ["1"], "projects": ["1", "2"], "restrictToAssignedOnly": true}',
  '2024-03-15'
),
(
  'Mike Chen',
  'mike@company.com',
  '+1 (555) 234-5678',
  'Design',
  'UI/UX Designer',
  75,
  8900,
  128,
  'active',
  'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  '{"organizations": ["1", "2"], "projects": [], "restrictToAssignedOnly": false}',
  '2024-05-22'
),
(
  'Alex Rivera',
  'alex@company.com',
  '+1 (555) 345-6789',
  'Development',
  'Backend Developer',
  80,
  15200,
  168,
  'active',
  'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  '{"organizations": ["1", "2"], "projects": [], "restrictToAssignedOnly": false}',
  '2024-01-10'
),
(
  'Emma Davis',
  'emma@company.com',
  '+1 (555) 456-7890',
  'Marketing',
  'Content Creator',
  60,
  6750,
  112,
  'active',
  'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  '{"organizations": ["1"], "projects": ["1"], "restrictToAssignedOnly": true}',
  '2024-07-08'
),
(
  'James Wilson',
  'james@company.com',
  '+1 (555) 567-8901',
  'Development',
  'QA Engineer',
  70,
  4200,
  80,
  'inactive',
  'https://images.pexels.com/photos/1552058/pexels-photo-1552058.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  '{"organizations": ["2"], "projects": ["3"], "restrictToAssignedOnly": true}',
  '2024-09-15'
) ON CONFLICT (email) DO NOTHING;
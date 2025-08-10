/*
  # Create invoices and payments schema

  1. New Tables
    - `invoices`
      - `id` (uuid, primary key)
      - `staff_member_id` (uuid, foreign key)
      - `organization_id` (uuid, foreign key)
      - `project_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `amount` (numeric)
      - `currency` (text)
      - `due_date` (date)
      - `status` (text)
      - `file_url` (text)
      - `submitted_at` (timestamptz)
      - `approved_at` (timestamptz)
      - `paid_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `payment_requests`
      - `id` (uuid, primary key)
      - `staff_member_id` (uuid, foreign key)
      - `organization_id` (uuid, foreign key)
      - `type` (text)
      - `description` (text)
      - `amount` (numeric)
      - `currency` (text)
      - `status` (text)
      - `receipt_url` (text)
      - `submitted_at` (timestamptz)
      - `approved_at` (timestamptz)
      - `paid_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `time_entries`
      - `id` (uuid, primary key)
      - `staff_member_id` (uuid, foreign key)
      - `project_id` (uuid, foreign key)
      - `description` (text)
      - `hours` (numeric)
      - `date` (date)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_member_id uuid REFERENCES staff_members(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text DEFAULT '',
  amount numeric NOT NULL,
  currency text DEFAULT 'USD',
  due_date date,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'rejected')),
  file_url text DEFAULT '',
  submitted_at timestamptz DEFAULT now(),
  approved_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payment_requests table
CREATE TABLE IF NOT EXISTS payment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_member_id uuid REFERENCES staff_members(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  type text DEFAULT 'expense' CHECK (type IN ('expense', 'advance', 'bonus')),
  description text NOT NULL,
  amount numeric NOT NULL,
  currency text DEFAULT 'USD',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'rejected')),
  receipt_url text DEFAULT '',
  submitted_at timestamptz DEFAULT now(),
  approved_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create time_entries table
CREATE TABLE IF NOT EXISTS time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_member_id uuid REFERENCES staff_members(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  description text NOT NULL,
  hours numeric NOT NULL,
  date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for invoices
CREATE POLICY "Invoices are viewable by authenticated users"
  ON invoices
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Invoices are insertable by authenticated users"
  ON invoices
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Invoices are updatable by authenticated users"
  ON invoices
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Invoices are deletable by authenticated users"
  ON invoices
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for payment_requests
CREATE POLICY "Payment requests are viewable by authenticated users"
  ON payment_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Payment requests are insertable by authenticated users"
  ON payment_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Payment requests are updatable by authenticated users"
  ON payment_requests
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Payment requests are deletable by authenticated users"
  ON payment_requests
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for time_entries
CREATE POLICY "Time entries are viewable by authenticated users"
  ON time_entries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Time entries are insertable by authenticated users"
  ON time_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Time entries are updatable by authenticated users"
  ON time_entries
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Time entries are deletable by authenticated users"
  ON time_entries
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_invoices_staff_member_id ON invoices(staff_member_id);
CREATE INDEX IF NOT EXISTS idx_invoices_organization_id ON invoices(organization_id);
CREATE INDEX IF NOT EXISTS idx_invoices_project_id ON invoices(project_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_submitted_at ON invoices(submitted_at);

CREATE INDEX IF NOT EXISTS idx_payment_requests_staff_member_id ON payment_requests(staff_member_id);
CREATE INDEX IF NOT EXISTS idx_payment_requests_organization_id ON payment_requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_payment_requests_status ON payment_requests(status);
CREATE INDEX IF NOT EXISTS idx_payment_requests_submitted_at ON payment_requests(submitted_at);

CREATE INDEX IF NOT EXISTS idx_time_entries_staff_member_id ON time_entries(staff_member_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_project_id ON time_entries(project_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_date ON time_entries(date);
CREATE INDEX IF NOT EXISTS idx_time_entries_status ON time_entries(status);
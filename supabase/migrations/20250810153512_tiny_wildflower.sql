/*
  # Create organizations and projects schema

  1. New Tables
    - `organizations`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `email` (text)
      - `phone` (text)
      - `address` (text)
      - `website` (text)
      - `timezone` (text)
      - `currency` (text)
      - `fiscal_year_start` (text)
      - `payment_terms` (integer)
      - `invoice_prefix` (text)
      - `tax_rate` (numeric)
      - `registration_number` (text)
      - `banking_details` (jsonb)
      - `payment_methods` (jsonb)
      - `notifications` (jsonb)
      - `branding` (jsonb)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `projects`
      - `id` (uuid, primary key)
      - `organization_id` (uuid, foreign key)
      - `name` (text)
      - `client` (text)
      - `description` (text)
      - `budget` (numeric)
      - `spent` (numeric)
      - `start_date` (date)
      - `end_date` (date)
      - `status` (text)
      - `team_members` (text[])
      - `hourly_budget` (numeric)
      - `hours_spent` (numeric)
      - `priority` (text)
      - `tags` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  address text DEFAULT '',
  website text DEFAULT '',
  logo text DEFAULT '',
  timezone text DEFAULT 'America/New_York',
  currency text DEFAULT 'USD',
  fiscal_year_start text DEFAULT '01-01',
  payment_terms integer DEFAULT 30,
  invoice_prefix text DEFAULT '',
  tax_rate numeric DEFAULT 0,
  registration_number text DEFAULT '',
  banking_details jsonb DEFAULT '{}',
  payment_methods jsonb DEFAULT '{
    "paypal": {"enabled": false, "email": "", "clientId": "", "clientSecret": ""},
    "wise": {"enabled": false, "apiKey": "", "profileId": ""},
    "veem": {"enabled": false, "apiKey": "", "accountId": ""}
  }',
  notifications jsonb DEFAULT '{
    "emailNotifications": true,
    "invoiceReminders": true,
    "paymentConfirmations": true,
    "weeklyReports": false
  }',
  branding jsonb DEFAULT '{
    "primaryColor": "#2563eb",
    "secondaryColor": "#64748b",
    "logoUrl": ""
  }',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  client text NOT NULL,
  description text DEFAULT '',
  budget numeric DEFAULT 0,
  spent numeric DEFAULT 0,
  start_date date,
  end_date date,
  status text DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'on-hold', 'completed')),
  team_members text[] DEFAULT '{}',
  hourly_budget numeric DEFAULT 0,
  hours_spent numeric DEFAULT 0,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for organizations
CREATE POLICY "Organizations are viewable by authenticated users"
  ON organizations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Organizations are insertable by authenticated users"
  ON organizations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Organizations are updatable by authenticated users"
  ON organizations
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Organizations are deletable by authenticated users"
  ON organizations
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for projects
CREATE POLICY "Projects are viewable by authenticated users"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Projects are insertable by authenticated users"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Projects are updatable by authenticated users"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Projects are deletable by authenticated users"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_organization_id ON projects(organization_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_organizations_is_active ON organizations(is_active);

-- Insert default organizations
INSERT INTO organizations (
  name, email, phone, address, website, timezone, currency, fiscal_year_start,
  payment_terms, invoice_prefix, tax_rate, registration_number, banking_details,
  payment_methods, notifications, branding
) VALUES 
(
  'YAA Collaborator Portal',
  'admin@yaa.ai',
  '+1 (555) 123-4567',
  '123 Business St, Suite 100, City, State 12345',
  'https://yaa.ai',
  'America/New_York',
  'USD',
  '01-01',
  30,
  'YAA',
  8.5,
  'REG123456789',
  '{"accountName": "YAA Collaborator Portal", "accountNumber": "****1234", "routingNumber": "****5678", "bankName": "Business Bank"}',
  '{"paypal": {"enabled": true, "email": "payments@yaa.ai", "clientId": "****", "clientSecret": "****"}, "wise": {"enabled": false, "apiKey": "", "profileId": ""}, "veem": {"enabled": false, "apiKey": "", "accountId": ""}}',
  '{"emailNotifications": true, "invoiceReminders": true, "paymentConfirmations": true, "weeklyReports": false}',
  '{"primaryColor": "#2563eb", "secondaryColor": "#64748b", "logoUrl": ""}'
),
(
  'Tech Solutions Inc',
  'admin@techsolutions.com',
  '+1 (555) 987-6543',
  '456 Tech Ave, Innovation District, City, State 54321',
  'https://techsolutions.com',
  'America/Los_Angeles',
  'USD',
  '04-01',
  15,
  'TSI',
  9.25,
  'REG987654321',
  '{}',
  '{"paypal": {"enabled": false, "email": "", "clientId": "", "clientSecret": ""}, "wise": {"enabled": true, "apiKey": "****", "profileId": "****"}, "veem": {"enabled": false, "apiKey": "", "accountId": ""}}',
  '{"emailNotifications": true, "invoiceReminders": false, "paymentConfirmations": true, "weeklyReports": true}',
  '{"primaryColor": "#059669", "secondaryColor": "#374151", "logoUrl": ""}'
) ON CONFLICT (name) DO NOTHING;
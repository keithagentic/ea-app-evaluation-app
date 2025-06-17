/*
  # Initial Schema for EA Evaluation Tool

  1. New Tables
    - `users` - User profiles and authentication
    - `applications` - Application inventory and metadata  
    - `rubrics` - Assessment rubric definitions
    - `rubric_categories` - Rubric category structure
    - `rubric_subcategories` - Detailed scoring criteria
    - `assessments` - Assessment instances
    - `assessment_scores` - Individual category scores
    - `assessment_evidence` - Supporting evidence files

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure file storage for evidence uploads

  3. Indexes
    - Performance indexes for common queries
    - Foreign key relationships
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'assessment_lead', 'assessor', 'viewer', 'compliance')),
  organization text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text DEFAULT '',
  version text DEFAULT '',
  vendor text DEFAULT '',
  business_owner text NOT NULL,
  technical_owner text NOT NULL,
  business_criticality text NOT NULL CHECK (business_criticality IN ('mission_critical', 'business_important', 'administrative', 'development')),
  technology_stack text[] DEFAULT '{}',
  hosting_environment text DEFAULT '',
  user_count integer DEFAULT 0,
  annual_cost decimal DEFAULT 0,
  compliance_requirements text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Rubrics table
CREATE TABLE IF NOT EXISTS rubrics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  version text NOT NULL DEFAULT '1.0',
  description text DEFAULT '',
  industry_type text DEFAULT '',
  scoring_scale_min integer NOT NULL DEFAULT 1,
  scoring_scale_max integer NOT NULL DEFAULT 5,
  scoring_scale_labels text[] NOT NULL DEFAULT '{"Poor", "Fair", "Good", "Very Good", "Excellent"}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Rubric categories table
CREATE TABLE IF NOT EXISTS rubric_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  rubric_id uuid NOT NULL REFERENCES rubrics(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  weight decimal NOT NULL CHECK (weight >= 0 AND weight <= 100),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Rubric subcategories table
CREATE TABLE IF NOT EXISTS rubric_subcategories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id uuid NOT NULL REFERENCES rubric_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  weight decimal NOT NULL CHECK (weight >= 0 AND weight <= 100),
  scoring_criteria jsonb NOT NULL DEFAULT '[]',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id uuid NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  rubric_id uuid NOT NULL REFERENCES rubrics(id) ON DELETE RESTRICT,
  assessor_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'submitted', 'approved')),
  progress decimal DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  overall_score decimal DEFAULT NULL,
  classification text DEFAULT NULL CHECK (classification IS NULL OR classification IN ('strategic', 'important', 'acceptable', 'needs_improvement', 'retire')),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz DEFAULT NULL,
  submitted_at timestamptz DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Assessment scores table
CREATE TABLE IF NOT EXISTS assessment_scores (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id uuid NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES rubric_categories(id) ON DELETE RESTRICT,
  subcategory_id uuid NOT NULL REFERENCES rubric_subcategories(id) ON DELETE RESTRICT,
  score integer NOT NULL CHECK (score >= 1 AND score <= 5),
  comments text DEFAULT '',
  confidence_level integer DEFAULT 3 CHECK (confidence_level >= 1 AND confidence_level <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(assessment_id, subcategory_id)
);

-- Assessment evidence table
CREATE TABLE IF NOT EXISTS assessment_evidence (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id uuid NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES rubric_categories(id) ON DELETE RESTRICT,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  description text DEFAULT '',
  uploaded_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_auth_user_id ON users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_applications_business_criticality ON applications(business_criticality);
CREATE INDEX IF NOT EXISTS idx_rubric_categories_rubric_id ON rubric_categories(rubric_id);
CREATE INDEX IF NOT EXISTS idx_rubric_subcategories_category_id ON rubric_subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_assessments_assessor_id ON assessments(assessor_id);
CREATE INDEX IF NOT EXISTS idx_assessments_status ON assessments(status);
CREATE INDEX IF NOT EXISTS idx_assessment_scores_assessment_id ON assessment_scores(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_evidence_assessment_id ON assessment_evidence(assessment_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE rubrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE rubric_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE rubric_subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_evidence ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own profile and other users in their organization
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = auth_user_id);

-- Applications can be read by authenticated users
CREATE POLICY "Applications readable by authenticated users" ON applications
  FOR SELECT TO authenticated
  USING (true);

-- Rubrics can be read by authenticated users
CREATE POLICY "Rubrics readable by authenticated users" ON rubrics
  FOR SELECT TO authenticated
  USING (true);

-- Rubric categories can be read by authenticated users
CREATE POLICY "Rubric categories readable by authenticated users" ON rubric_categories
  FOR SELECT TO authenticated
  USING (true);

-- Rubric subcategories can be read by authenticated users
CREATE POLICY "Rubric subcategories readable by authenticated users" ON rubric_subcategories
  FOR SELECT TO authenticated
  USING (true);

-- Assessments can be read by the assessor or admins
CREATE POLICY "Assessments readable by assessor" ON assessments
  FOR SELECT TO authenticated
  USING (
    assessor_id = (SELECT id FROM users WHERE auth_user_id = auth.uid())
    OR 
    (SELECT role FROM users WHERE auth_user_id = auth.uid()) IN ('admin', 'assessment_lead')
  );

-- Assessments can be updated by the assessor
CREATE POLICY "Assessments updatable by assessor" ON assessments
  FOR UPDATE TO authenticated
  USING (assessor_id = (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Assessment scores can be managed by the assessor
CREATE POLICY "Assessment scores manageable by assessor" ON assessment_scores
  FOR ALL TO authenticated
  USING (
    assessment_id IN (
      SELECT id FROM assessments 
      WHERE assessor_id = (SELECT id FROM users WHERE auth_user_id = auth.uid())
    )
  );

-- Assessment evidence can be managed by the assessor
CREATE POLICY "Assessment evidence manageable by assessor" ON assessment_evidence
  FOR ALL TO authenticated
  USING (
    assessment_id IN (
      SELECT id FROM assessments 
      WHERE assessor_id = (SELECT id FROM users WHERE auth_user_id = auth.uid())
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rubrics_updated_at BEFORE UPDATE ON rubrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rubric_categories_updated_at BEFORE UPDATE ON rubric_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rubric_subcategories_updated_at BEFORE UPDATE ON rubric_subcategories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessment_scores_updated_at BEFORE UPDATE ON assessment_scores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
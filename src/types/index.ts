export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization: string;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'admin' | 'assessment_lead' | 'assessor' | 'viewer' | 'compliance';

export interface Application {
  id: string;
  name: string;
  description: string;
  version?: string;
  vendor?: string;
  business_owner: string;
  technical_owner: string;
  business_criticality: BusinessCriticality;
  technology_stack?: string[];
  hosting_environment?: string;
  user_count?: number;
  annual_cost?: number;
  compliance_requirements?: string[];
  created_at: string;
  updated_at: string;
}

export type BusinessCriticality = 'mission_critical' | 'business_important' | 'administrative' | 'development';

export interface Rubric {
  id: string;
  name: string;
  version: string;
  description: string;
  industry_type?: string;
  categories: RubricCategory[];
  scoring_scale: ScoringScale;
  created_at: string;
  updated_at: string;
}

export interface RubricCategory {
  id: string;
  name: string;
  description: string;
  weight: number; // Percentage weight (0-100)
  subcategories: RubricSubcategory[];
}

export interface RubricSubcategory {
  id: string;
  name: string;
  description: string;
  weight: number;
  scoring_criteria: ScoringCriteria[];
}

export interface ScoringCriteria {
  score: number;
  label: string;
  description: string;
}

export interface ScoringScale {
  min: number;
  max: number;
  labels: string[]; // e.g., ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
}

export interface Assessment {
  id: string;
  application_id: string;
  application?: Application;
  rubric_id: string;
  rubric?: Rubric;
  assessor_id: string;
  assessor?: User;
  status: AssessmentStatus;
  progress: number; // 0-100
  overall_score?: number;
  classification?: ApplicationClassification;
  started_at: string;
  completed_at?: string;
  submitted_at?: string;
  created_at: string;
  updated_at: string;
}

export type AssessmentStatus = 'draft' | 'in_progress' | 'completed' | 'submitted' | 'approved';

export type ApplicationClassification = 'strategic' | 'important' | 'acceptable' | 'needs_improvement' | 'retire';

export interface AssessmentScore {
  id: string;
  assessment_id: string;
  category_id: string;
  subcategory_id: string;
  score: number;
  comments?: string;
  evidence_files?: string[];
  confidence_level?: number; // 1-5 scale
  created_at: string;
  updated_at: string;
}

export interface AssessmentEvidence {
  id: string;
  assessment_id: string;
  category_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  description?: string;
  uploaded_by: string;
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface AssessmentScoreInput {
  category_id: string;
  subcategory_id: string;
  score: number;
  comments?: string;
  confidence_level?: number;
}

export interface EvidenceUpload {
  file: File;
  description?: string;
  category_id: string;
}
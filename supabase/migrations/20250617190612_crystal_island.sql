/*
  # Seed Initial Data for EA Evaluation Tool

  1. Sample Users
  2. Sample Applications  
  3. Default Rubric with Categories
  4. Sample Assessments for Testing
*/

-- Insert sample users (these will be created after auth users are set up)
INSERT INTO users (id, email, name, role, organization) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'admin@company.com', 'System Administrator', 'admin', 'Enterprise Corp'),
  ('550e8400-e29b-41d4-a716-446655440002', 'lead@company.com', 'Assessment Lead', 'assessment_lead', 'Enterprise Corp'),
  ('550e8400-e29b-41d4-a716-446655440003', 'assessor1@company.com', 'Senior Architect', 'assessor', 'Enterprise Corp'),
  ('550e8400-e29b-41d4-a716-446655440004', 'assessor2@company.com', 'Technical Lead', 'assessor', 'Enterprise Corp'),
  ('550e8400-e29b-41d4-a716-446655440005', 'viewer@company.com', 'Business Analyst', 'viewer', 'Enterprise Corp');

-- Insert sample applications
INSERT INTO applications (id, name, description, business_owner, technical_owner, business_criticality, technology_stack, hosting_environment, user_count, annual_cost) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', 'Customer Relationship Management', 'Primary CRM system for sales and customer management', 'Sales Director', 'IT Manager', 'mission_critical', '{"Salesforce", "JavaScript", "REST APIs"}', 'Cloud - Salesforce', 500, 120000),
  ('650e8400-e29b-41d4-a716-446655440002', 'Enterprise Resource Planning', 'Core ERP system for finance and operations', 'CFO', 'ERP Administrator', 'mission_critical', '{"SAP", "ABAP", "Oracle DB"}', 'On-Premise', 200, 500000),
  ('650e8400-e29b-41d4-a716-446655440003', 'Human Resources Information System', 'HR management and employee self-service', 'HR Director', 'HR IT Lead', 'business_important', '{"Workday", "Java", "REST APIs"}', 'Cloud - Workday', 800, 80000),
  ('650e8400-e29b-41d4-a716-446655440004', 'Document Management System', 'Enterprise document storage and collaboration', 'Operations Manager', 'SharePoint Admin', 'business_important', '{"SharePoint", "C#", ".NET"}', 'Cloud - Microsoft 365', 1000, 60000),
  ('650e8400-e29b-41d4-a716-446655440005', 'Legacy Inventory System', 'Older inventory tracking system', 'Warehouse Manager', 'Legacy System Admin', 'administrative', '{"COBOL", "DB2", "Mainframe"}', 'On-Premise Mainframe', 50, 200000);

-- Insert default enterprise rubric
INSERT INTO rubrics (id, name, version, description, industry_type) VALUES
  ('750e8400-e29b-41d4-a716-446655440001', 'Enterprise Application Assessment Rubric', '1.0', 'Comprehensive rubric for evaluating enterprise applications across multiple dimensions', 'General');

-- Insert rubric categories
INSERT INTO rubric_categories (id, rubric_id, name, description, weight, sort_order) VALUES
  ('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'Technical Quality', 'Assessment of technical architecture, performance, and maintainability', 25, 1),
  ('850e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001', 'Security & Compliance', 'Security posture and regulatory compliance assessment', 20, 2),
  ('850e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440001', 'Business Value', 'Business alignment and value delivery assessment', 20, 3),
  ('850e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440001', 'Operational Excellence', 'Operations, support, and reliability assessment', 15, 4),
  ('850e8400-e29b-41d4-a716-446655440005', '750e8400-e29b-41d4-a716-446655440001', 'Strategic Alignment', 'Alignment with enterprise strategy and roadmap', 10, 5),
  ('850e8400-e29b-41d4-a716-446655440006', '750e8400-e29b-41d4-a716-446655440001', 'Cost Effectiveness', 'Total cost of ownership and financial efficiency', 10, 6);

-- Insert rubric subcategories for Technical Quality
INSERT INTO rubric_subcategories (id, category_id, name, description, weight, scoring_criteria, sort_order) VALUES
  ('950e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', 'Architecture Quality', 'Overall technical architecture and design patterns', 30, '[
    {"score": 1, "label": "Poor", "description": "Monolithic, tightly coupled, poor separation of concerns"},
    {"score": 2, "label": "Fair", "description": "Some modular design but significant technical debt"},
    {"score": 3, "label": "Good", "description": "Well-structured with clear separation of concerns"},
    {"score": 4, "label": "Very Good", "description": "Modern architecture patterns, loosely coupled"},
    {"score": 5, "label": "Excellent", "description": "Exemplary architecture, microservices, cloud-native"}
  ]', 1),
  ('950e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440001', 'Performance', 'Application performance and scalability', 25, '[
    {"score": 1, "label": "Poor", "description": "Frequent performance issues, poor scalability"},
    {"score": 2, "label": "Fair", "description": "Occasional performance issues, limited scalability"},
    {"score": 3, "label": "Good", "description": "Generally good performance, adequate scalability"},
    {"score": 4, "label": "Very Good", "description": "Excellent performance, good scalability"},
    {"score": 5, "label": "Excellent", "description": "Outstanding performance, highly scalable"}
  ]', 2),
  ('950e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001', 'Code Quality', 'Code maintainability and technical debt', 25, '[
    {"score": 1, "label": "Poor", "description": "High technical debt, poor code quality"},
    {"score": 2, "label": "Fair", "description": "Moderate technical debt, some quality issues"},
    {"score": 3, "label": "Good", "description": "Good code quality, manageable technical debt"},
    {"score": 4, "label": "Very Good", "description": "High code quality, low technical debt"},
    {"score": 5, "label": "Excellent", "description": "Exemplary code quality, minimal technical debt"}
  ]', 3),
  ('950e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440001', 'Technology Stack', 'Currency and supportability of technology stack', 20, '[
    {"score": 1, "label": "Poor", "description": "Legacy technologies, end-of-life components"},
    {"score": 2, "label": "Fair", "description": "Aging technologies, limited vendor support"},
    {"score": 3, "label": "Good", "description": "Current technologies, good vendor support"},
    {"score": 4, "label": "Very Good", "description": "Modern technologies, excellent support"},
    {"score": 5, "label": "Excellent", "description": "Cutting-edge technologies, future-proof"}
  ]', 4);

-- Insert rubric subcategories for Security & Compliance
INSERT INTO rubric_subcategories (id, category_id, name, description, weight, scoring_criteria, sort_order) VALUES
  ('950e8400-e29b-41d4-a716-446655440005', '850e8400-e29b-41d4-a716-446655440002', 'Security Controls', 'Implementation of security controls and measures', 40, '[
    {"score": 1, "label": "Poor", "description": "Minimal security controls, significant vulnerabilities"},
    {"score": 2, "label": "Fair", "description": "Basic security controls, some vulnerabilities"},
    {"score": 3, "label": "Good", "description": "Good security controls, minor vulnerabilities"},
    {"score": 4, "label": "Very Good", "description": "Strong security controls, well-protected"},
    {"score": 5, "label": "Excellent", "description": "Comprehensive security, zero-trust architecture"}
  ]', 1),
  ('950e8400-e29b-41d4-a716-446655440006', '850e8400-e29b-41d4-a716-446655440002', 'Compliance Status', 'Regulatory and policy compliance', 35, '[
    {"score": 1, "label": "Poor", "description": "Non-compliant, significant regulatory risks"},
    {"score": 2, "label": "Fair", "description": "Partially compliant, some regulatory gaps"},
    {"score": 3, "label": "Good", "description": "Generally compliant, minor gaps"},
    {"score": 4, "label": "Very Good", "description": "Fully compliant, well-documented"},
    {"score": 5, "label": "Excellent", "description": "Exceeds compliance requirements"}
  ]', 2),
  ('950e8400-e29b-41d4-a716-446655440007', '850e8400-e29b-41d4-a716-446655440002', 'Data Protection', 'Data privacy and protection measures', 25, '[
    {"score": 1, "label": "Poor", "description": "Poor data protection, privacy risks"},
    {"score": 2, "label": "Fair", "description": "Basic data protection, some privacy gaps"},
    {"score": 3, "label": "Good", "description": "Good data protection, privacy compliant"},
    {"score": 4, "label": "Very Good", "description": "Strong data protection, privacy by design"},
    {"score": 5, "label": "Excellent", "description": "Exemplary data protection, privacy leadership"}
  ]', 3);

-- Insert sample assessments
INSERT INTO assessments (id, application_id, rubric_id, assessor_id, status, progress) VALUES
  ('a50e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'in_progress', 60),
  ('a50e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'draft', 0),
  ('a50e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 'completed', 100),
  ('a50e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 'submitted', 100);

-- Insert some sample assessment scores
INSERT INTO assessment_scores (assessment_id, category_id, subcategory_id, score, comments, confidence_level) VALUES
  ('a50e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', '950e8400-e29b-41d4-a716-446655440001', 4, 'Well-architected system with good separation of concerns', 4),
  ('a50e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', '950e8400-e29b-41d4-a716-446655440002', 4, 'Excellent performance with good scalability', 5),
  ('a50e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001', '950e8400-e29b-41d4-a716-446655440001', 3, 'Good architecture but some legacy components', 3),
  ('a50e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440002', '950e8400-e29b-41d4-a716-446655440005', 4, 'Strong security controls implemented', 4);
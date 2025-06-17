import { 
  User, 
  Application, 
  Rubric, 
  Assessment, 
  AssessmentScore,
  RubricCategory,
  RubricSubcategory 
} from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@company.com',
    name: 'John Doe',
    role: 'assessor',
    organization: 'Enterprise Architecture Team',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    email: 'jane.smith@company.com',
    name: 'Jane Smith',
    role: 'assessment_lead',
    organization: 'Enterprise Architecture Team',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z'
  },
  {
    id: '3',
    email: 'admin@company.com',
    name: 'System Admin',
    role: 'admin',
    organization: 'IT Administration',
    created_at: '2024-01-01T08:00:00Z',
    updated_at: '2024-01-01T08:00:00Z'
  }
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: 'app-1',
    name: 'Customer Relationship Management System',
    description: 'Enterprise CRM system for managing customer interactions and sales processes',
    version: '2.1.4',
    vendor: 'Salesforce',
    business_owner: 'Sarah Johnson',
    technical_owner: 'Mike Chen',
    business_criticality: 'mission_critical',
    technology_stack: ['JavaScript', 'Apex', 'Lightning Web Components'],
    hosting_environment: 'SaaS Cloud',
    user_count: 450,
    annual_cost: 125000,
    compliance_requirements: ['SOX', 'GDPR', 'CCPA'],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'app-2',
    name: 'Enterprise Resource Planning',
    description: 'Integrated ERP system for finance, HR, and operations management',
    version: '12.2.9',
    vendor: 'SAP',
    business_owner: 'Robert Wilson',
    technical_owner: 'Lisa Park',
    business_criticality: 'mission_critical',
    technology_stack: ['ABAP', 'Java', 'HANA Database'],
    hosting_environment: 'On-Premise',
    user_count: 850,
    annual_cost: 450000,
    compliance_requirements: ['SOX', 'GDPR', 'SOC2'],
    created_at: '2023-12-01T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z'
  },
  {
    id: 'app-3',
    name: 'Document Management Portal',
    description: 'Centralized document storage and collaboration platform',
    version: '3.4.1',
    vendor: 'Microsoft',
    business_owner: 'Emily Davis',
    technical_owner: 'David Kim',
    business_criticality: 'business_important',
    technology_stack: ['SharePoint', 'PowerApps', 'Power Automate'],
    hosting_environment: 'Hybrid Cloud',
    user_count: 1200,
    annual_cost: 85000,
    compliance_requirements: ['GDPR', 'ISO27001'],
    created_at: '2023-11-15T00:00:00Z',
    updated_at: '2024-01-08T00:00:00Z'
  },
  {
    id: 'app-4',
    name: 'Business Intelligence Dashboard',
    description: 'Analytics and reporting platform for business insights',
    version: '2024.1',
    vendor: 'Tableau',
    business_owner: 'Mark Thompson',
    technical_owner: 'Anna Rodriguez',
    business_criticality: 'business_important',
    technology_stack: ['Tableau Server', 'PostgreSQL', 'Python'],
    hosting_environment: 'Private Cloud',
    user_count: 180,
    annual_cost: 95000,
    compliance_requirements: ['SOC2'],
    created_at: '2023-10-01T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z'
  },
  {
    id: 'app-5',
    name: 'Legacy Inventory System',
    description: 'Older inventory management system scheduled for replacement',
    version: '1.8.2',
    vendor: 'Custom Built',
    business_owner: 'Tom Anderson',
    technical_owner: 'Jennifer Lee',
    business_criticality: 'administrative',
    technology_stack: ['Java 8', 'Oracle DB', 'JSF'],
    hosting_environment: 'On-Premise',
    user_count: 45,
    annual_cost: 25000,
    compliance_requirements: [],
    created_at: '2020-03-01T00:00:00Z',
    updated_at: '2023-12-15T00:00:00Z'
  }
];

// Mock Rubric Categories and Subcategories
const securitySubcategories: RubricSubcategory[] = [
  {
    id: 'sub-sec-1',
    name: 'Authentication & Authorization',
    description: 'User authentication mechanisms and access controls',
    weight: 30,
    scoring_criteria: [
      { score: 1, label: 'Poor', description: 'Basic password authentication only' },
      { score: 2, label: 'Fair', description: 'Password with basic complexity requirements' },
      { score: 3, label: 'Good', description: 'Multi-factor authentication available' },
      { score: 4, label: 'Very Good', description: 'MFA enforced with role-based access' },
      { score: 5, label: 'Excellent', description: 'Advanced MFA with zero-trust principles' }
    ]
  },
  {
    id: 'sub-sec-2',
    name: 'Data Encryption',
    description: 'Data protection through encryption at rest and in transit',
    weight: 25,
    scoring_criteria: [
      { score: 1, label: 'Poor', description: 'No encryption implemented' },
      { score: 2, label: 'Fair', description: 'Basic encryption for sensitive data' },
      { score: 3, label: 'Good', description: 'Encryption at rest and in transit' },
      { score: 4, label: 'Very Good', description: 'Strong encryption with key management' },
      { score: 5, label: 'Excellent', description: 'Enterprise-grade encryption with HSM' }
    ]
  },
  {
    id: 'sub-sec-3',
    name: 'Vulnerability Management',
    description: 'Security vulnerability assessment and remediation processes',
    weight: 25,
    scoring_criteria: [
      { score: 1, label: 'Poor', description: 'No vulnerability scanning' },
      { score: 2, label: 'Fair', description: 'Annual vulnerability assessments' },
      { score: 3, label: 'Good', description: 'Quarterly vulnerability scans' },
      { score: 4, label: 'Very Good', description: 'Monthly scans with remediation tracking' },
      { score: 5, label: 'Excellent', description: 'Continuous monitoring and automated remediation' }
    ]
  },
  {
    id: 'sub-sec-4',
    name: 'Audit & Compliance',
    description: 'Security audit trails and regulatory compliance',
    weight: 20,
    scoring_criteria: [
      { score: 1, label: 'Poor', description: 'No audit logging' },
      { score: 2, label: 'Fair', description: 'Basic access logging' },
      { score: 3, label: 'Good', description: 'Comprehensive audit trails' },
      { score: 4, label: 'Very Good', description: 'Audit trails with integrity protection' },
      { score: 5, label: 'Excellent', description: 'Real-time monitoring with SIEM integration' }
    ]
  }
];

const performanceSubcategories: RubricSubcategory[] = [
  {
    id: 'sub-perf-1',
    name: 'Response Time',
    description: 'Application response time under normal load',
    weight: 35,
    scoring_criteria: [
      { score: 1, label: 'Poor', description: '>5 seconds average response time' },
      { score: 2, label: 'Fair', description: '3-5 seconds average response time' },
      { score: 3, label: 'Good', description: '1-3 seconds average response time' },
      { score: 4, label: 'Very Good', description: '0.5-1 second average response time' },
      { score: 5, label: 'Excellent', description: '<0.5 seconds average response time' }
    ]
  },
  {
    id: 'sub-perf-2',
    name: 'Scalability',
    description: 'Ability to handle increased load and user growth',
    weight: 30,
    scoring_criteria: [
      { score: 1, label: 'Poor', description: 'Cannot scale beyond current load' },
      { score: 2, label: 'Fair', description: 'Limited vertical scaling only' },
      { score: 3, label: 'Good', description: 'Horizontal scaling with manual intervention' },
      { score: 4, label: 'Very Good', description: 'Auto-scaling with some limitations' },
      { score: 5, label: 'Excellent', description: 'Elastic auto-scaling across all tiers' }
    ]
  },
  {
    id: 'sub-perf-3',
    name: 'Availability',
    description: 'System uptime and availability metrics',
    weight: 35,
    scoring_criteria: [
      { score: 1, label: 'Poor', description: '<95% uptime' },
      { score: 2, label: 'Fair', description: '95-97% uptime' },
      { score: 3, label: 'Good', description: '97-99% uptime' },
      { score: 4, label: 'Very Good', description: '99-99.5% uptime' },
      { score: 5, label: 'Excellent', description: '>99.5% uptime with HA architecture' }
    ]
  }
];

const maintainabilitySubcategories: RubricSubcategory[] = [
  {
    id: 'sub-maint-1',
    name: 'Code Quality',
    description: 'Code maintainability, documentation, and standards compliance',
    weight: 40,
    scoring_criteria: [
      { score: 1, label: 'Poor', description: 'Legacy code with no documentation' },
      { score: 2, label: 'Fair', description: 'Some documentation, inconsistent standards' },
      { score: 3, label: 'Good', description: 'Well-documented with coding standards' },
      { score: 4, label: 'Very Good', description: 'High-quality code with automated testing' },
      { score: 5, label: 'Excellent', description: 'Exemplary code quality with comprehensive testing' }
    ]
  },
  {
    id: 'sub-maint-2',
    name: 'Technical Debt',
    description: 'Level of technical debt and modernization needs',
    weight: 35,
    scoring_criteria: [
      { score: 1, label: 'Poor', description: 'Significant technical debt, major refactoring needed' },
      { score: 2, label: 'Fair', description: 'Moderate technical debt, some refactoring needed' },
      { score: 3, label: 'Good', description: 'Manageable technical debt' },
      { score: 4, label: 'Very Good', description: 'Minimal technical debt' },
      { score: 5, label: 'Excellent', description: 'Modern architecture with no significant debt' }
    ]
  },
  {
    id: 'sub-maint-3',
    name: 'Support & Documentation',
    description: 'Quality of support documentation and knowledge transfer',
    weight: 25,
    scoring_criteria: [
      { score: 1, label: 'Poor', description: 'No documentation or support materials' },
      { score: 2, label: 'Fair', description: 'Basic documentation, limited support' },
      { score: 3, label: 'Good', description: 'Good documentation and support processes' },
      { score: 4, label: 'Very Good', description: 'Comprehensive documentation and training' },
      { score: 5, label: 'Excellent', description: 'Excellent documentation with self-service capabilities' }
    ]
  }
];

// Mock Rubric Categories
const mockCategories: RubricCategory[] = [
  {
    id: 'cat-security',
    name: 'Security',
    description: 'Application security posture and risk assessment',
    weight: 30,
    subcategories: securitySubcategories
  },
  {
    id: 'cat-performance',
    name: 'Performance',
    description: 'Application performance, scalability, and availability',
    weight: 25,
    subcategories: performanceSubcategories
  },
  {
    id: 'cat-maintainability',
    name: 'Maintainability',
    description: 'Code quality, technical debt, and support capabilities',
    weight: 20,
    subcategories: maintainabilitySubcategories
  },
  {
    id: 'cat-business-value',
    name: 'Business Value',
    description: 'Business alignment and value delivery',
    weight: 15,
    subcategories: [
      {
        id: 'sub-bv-1',
        name: 'Strategic Alignment',
        description: 'Alignment with business strategy and objectives',
        weight: 50,
        scoring_criteria: [
          { score: 1, label: 'Poor', description: 'No clear business alignment' },
          { score: 2, label: 'Fair', description: 'Limited business value' },
          { score: 3, label: 'Good', description: 'Good business alignment' },
          { score: 4, label: 'Very Good', description: 'Strong strategic value' },
          { score: 5, label: 'Excellent', description: 'Critical to business strategy' }
        ]
      },
      {
        id: 'sub-bv-2',
        name: 'User Satisfaction',
        description: 'End user satisfaction and adoption rates',
        weight: 50,
        scoring_criteria: [
          { score: 1, label: 'Poor', description: 'Low user satisfaction, high complaints' },
          { score: 2, label: 'Fair', description: 'Below average user satisfaction' },
          { score: 3, label: 'Good', description: 'Average user satisfaction' },
          { score: 4, label: 'Very Good', description: 'High user satisfaction' },
          { score: 5, label: 'Excellent', description: 'Exceptional user satisfaction and adoption' }
        ]
      }
    ]
  },
  {
    id: 'cat-compliance',
    name: 'Compliance',
    description: 'Regulatory compliance and governance',
    weight: 10,
    subcategories: [
      {
        id: 'sub-comp-1',
        name: 'Regulatory Compliance',
        description: 'Adherence to industry regulations and standards',
        weight: 60,
        scoring_criteria: [
          { score: 1, label: 'Poor', description: 'Non-compliant with major regulations' },
          { score: 2, label: 'Fair', description: 'Partially compliant, gaps identified' },
          { score: 3, label: 'Good', description: 'Mostly compliant with minor gaps' },
          { score: 4, label: 'Very Good', description: 'Fully compliant with regular audits' },
          { score: 5, label: 'Excellent', description: 'Exceeds compliance requirements' }
        ]
      },
      {
        id: 'sub-comp-2',
        name: 'Data Governance',
        description: 'Data privacy, retention, and governance policies',
        weight: 40,
        scoring_criteria: [
          { score: 1, label: 'Poor', description: 'No data governance policies' },
          { score: 2, label: 'Fair', description: 'Basic data governance' },
          { score: 3, label: 'Good', description: 'Good data governance practices' },
          { score: 4, label: 'Very Good', description: 'Comprehensive data governance' },
          { score: 5, label: 'Excellent', description: 'Industry-leading data governance' }
        ]
      }
    ]
  }
];

// Mock Rubrics
export const mockRubrics: Rubric[] = [
  {
    id: 'rubric-1',
    name: 'Enterprise Application Assessment v2.1',
    version: '2.1',
    description: 'Comprehensive assessment rubric for enterprise applications',
    industry_type: 'General',
    categories: mockCategories,
    scoring_scale: {
      min: 1,
      max: 5,
      labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
    },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'rubric-2',
    name: 'Financial Services Application Assessment',
    version: '1.3',
    description: 'Specialized assessment rubric for financial services applications',
    industry_type: 'Financial Services',
    categories: mockCategories, // In real app, this would have finance-specific categories
    scoring_scale: {
      min: 1,
      max: 5,
      labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
    },
    created_at: '2023-12-01T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z'
  }
];

// Mock Assessments
export const mockAssessments: Assessment[] = [
  {
    id: 'assessment-1',
    application_id: 'app-1',
    application: mockApplications[0],
    rubric_id: 'rubric-1',
    rubric: mockRubrics[0],
    assessor_id: '1',
    assessor: mockUsers[0],
    status: 'in_progress',
    progress: 65,
    overall_score: undefined,
    classification: undefined,
    started_at: '2024-01-15T09:00:00Z',
    completed_at: undefined,
    submitted_at: undefined,
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-16T14:30:00Z'
  },
  {
    id: 'assessment-2',
    application_id: 'app-2',
    application: mockApplications[1],
    rubric_id: 'rubric-1',
    rubric: mockRubrics[0],
    assessor_id: '1',
    assessor: mockUsers[0],
    status: 'completed',
    progress: 100,
    overall_score: 4.2,
    classification: 'strategic',
    started_at: '2024-01-10T10:00:00Z',
    completed_at: '2024-01-12T16:45:00Z',
    submitted_at: '2024-01-12T17:00:00Z',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-12T17:00:00Z'
  },
  {
    id: 'assessment-3',
    application_id: 'app-3',
    application: mockApplications[2],
    rubric_id: 'rubric-1',
    rubric: mockRubrics[0],
    assessor_id: '2',
    assessor: mockUsers[1],
    status: 'draft',
    progress: 0,
    overall_score: undefined,
    classification: undefined,
    started_at: '2024-01-16T08:00:00Z',
    completed_at: undefined,
    submitted_at: undefined,
    created_at: '2024-01-16T08:00:00Z',
    updated_at: '2024-01-16T08:00:00Z'
  },
  {
    id: 'assessment-4',
    application_id: 'app-5',
    application: mockApplications[4],
    rubric_id: 'rubric-1',
    rubric: mockRubrics[0],
    assessor_id: '1',
    assessor: mockUsers[0],
    status: 'completed',
    progress: 100,
    overall_score: 2.1,
    classification: 'retire',
    started_at: '2024-01-08T11:00:00Z',
    completed_at: '2024-01-09T15:30:00Z',
    submitted_at: '2024-01-09T16:00:00Z',
    created_at: '2024-01-08T11:00:00Z',
    updated_at: '2024-01-09T16:00:00Z'
  }
];

// Mock Assessment Scores (for completed assessments)
export const mockAssessmentScores: AssessmentScore[] = [
  // Assessment 2 scores (ERP System - completed)
  {
    id: 'score-1',
    assessment_id: 'assessment-2',
    category_id: 'cat-security',
    subcategory_id: 'sub-sec-1',
    score: 4,
    comments: 'Strong MFA implementation with SAML integration',
    confidence_level: 4,
    created_at: '2024-01-11T10:00:00Z',
    updated_at: '2024-01-11T10:00:00Z'
  },
  {
    id: 'score-2',
    assessment_id: 'assessment-2',
    category_id: 'cat-security',
    subcategory_id: 'sub-sec-2',
    score: 5,
    comments: 'Enterprise-grade encryption with HSM key management',
    confidence_level: 5,
    created_at: '2024-01-11T10:15:00Z',
    updated_at: '2024-01-11T10:15:00Z'
  },
  {
    id: 'score-3',
    assessment_id: 'assessment-2',
    category_id: 'cat-performance',
    subcategory_id: 'sub-perf-1',
    score: 4,
    comments: 'Good response times, some optimization opportunities',
    confidence_level: 4,
    created_at: '2024-01-11T11:00:00Z',
    updated_at: '2024-01-11T11:00:00Z'
  },
  // Assessment 4 scores (Legacy System - completed)
  {
    id: 'score-4',
    assessment_id: 'assessment-4',
    category_id: 'cat-security',
    subcategory_id: 'sub-sec-1',
    score: 2,
    comments: 'Basic password authentication, no MFA',
    confidence_level: 5,
    created_at: '2024-01-09T10:00:00Z',
    updated_at: '2024-01-09T10:00:00Z'
  },
  {
    id: 'score-5',
    assessment_id: 'assessment-4',
    category_id: 'cat-maintainability',
    subcategory_id: 'sub-maint-2',
    score: 1,
    comments: 'Significant technical debt, requires major refactoring',
    confidence_level: 5,
    created_at: '2024-01-09T11:00:00Z',
    updated_at: '2024-01-09T11:00:00Z'
  }
];

// Current user (for demo purposes)
export const currentUser = mockUsers[0]; // John Doe - Assessor
import { create } from 'zustand';
import { Assessment, AssessmentScore, AssessmentScoreInput } from '../types';
import { mockAssessments, mockAssessmentScores, currentUser } from './mockData';

interface AssessmentState {
  assessments: Assessment[];
  selectedAssessment: Assessment | null;
  assessmentScores: AssessmentScore[];
  loading: boolean;
  error: string | null;
}

interface AssessmentActions {
  fetchAssessments: () => Promise<void>;
  fetchAssessmentScores: (assessmentId: string) => Promise<void>;
  getAssessment: (id: string) => Assessment | undefined;
  selectAssessment: (assessment: Assessment | null) => void;
  updateAssessmentStatus: (id: string, status: Assessment['status']) => void;
  updateAssessmentProgress: (id: string, progress: number) => void;
  saveScore: (assessmentId: string, scoreInput: AssessmentScoreInput) => Promise<void>;
  getScore: (assessmentId: string, subcategoryId: string) => AssessmentScore | undefined;
  calculateOverallScore: (assessmentId: string) => number;
  submitAssessment: (id: string) => Promise<void>;
}

export const useAssessmentStore = create<AssessmentState & AssessmentActions>((set, get) => ({
  // State
  assessments: [],
  selectedAssessment: null,
  assessmentScores: [],
  loading: false,
  error: null,

  // Actions
  fetchAssessments: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 400));
      // Filter assessments for current user (assessor role)
      const userAssessments = mockAssessments.filter(
        assessment => assessment.assessor_id === currentUser.id
      );
      set({ assessments: userAssessments, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch assessments', loading: false });
    }
  },

  fetchAssessmentScores: async (assessmentId: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 200));
      const scores = mockAssessmentScores.filter(
        score => score.assessment_id === assessmentId
      );
      set({ assessmentScores: scores, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch assessment scores', loading: false });
    }
  },

  getAssessment: (id: string) => {
    const { assessments } = get();
    return assessments.find(assessment => assessment.id === id);
  },

  selectAssessment: (assessment: Assessment | null) => {
    set({ selectedAssessment: assessment });
  },

  updateAssessmentStatus: (id: string, status: Assessment['status']) => {
    set(state => ({
      assessments: state.assessments.map(assessment =>
        assessment.id === id
          ? { ...assessment, status, updated_at: new Date().toISOString() }
          : assessment
      ),
      selectedAssessment: state.selectedAssessment?.id === id
        ? { ...state.selectedAssessment, status, updated_at: new Date().toISOString() }
        : state.selectedAssessment
    }));
  },

  updateAssessmentProgress: (id: string, progress: number) => {
    set(state => ({
      assessments: state.assessments.map(assessment =>
        assessment.id === id
          ? { ...assessment, progress, updated_at: new Date().toISOString() }
          : assessment
      ),
      selectedAssessment: state.selectedAssessment?.id === id
        ? { ...state.selectedAssessment, progress, updated_at: new Date().toISOString() }
        : state.selectedAssessment
    }));
  },

  saveScore: async (assessmentId: string, scoreInput: AssessmentScoreInput) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const newScore: AssessmentScore = {
        id: `score-${Date.now()}`,
        assessment_id: assessmentId,
        category_id: scoreInput.category_id,
        subcategory_id: scoreInput.subcategory_id,
        score: scoreInput.score,
        comments: scoreInput.comments || '',
        confidence_level: scoreInput.confidence_level || 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      set(state => {
        // Remove existing score for this subcategory if it exists
        const filteredScores = state.assessmentScores.filter(
          score => !(score.assessment_id === assessmentId && score.subcategory_id === scoreInput.subcategory_id)
        );
        
        return {
          assessmentScores: [...filteredScores, newScore]
        };
      });

      // Update assessment status to in_progress if it was draft
      const { assessments } = get();
      const assessment = assessments.find(a => a.id === assessmentId);
      if (assessment && assessment.status === 'draft') {
        get().updateAssessmentStatus(assessmentId, 'in_progress');
      }

    } catch (error) {
      set({ error: 'Failed to save score' });
    }
  },

  getScore: (assessmentId: string, subcategoryId: string) => {
    const { assessmentScores } = get();
    return assessmentScores.find(
      score => score.assessment_id === assessmentId && score.subcategory_id === subcategoryId
    );
  },

  calculateOverallScore: (assessmentId: string) => {
    const { assessmentScores, selectedAssessment } = get();
    
    if (!selectedAssessment || !selectedAssessment.rubric) {
      return 0;
    }

    const scores = assessmentScores.filter(score => score.assessment_id === assessmentId);
    const rubric = selectedAssessment.rubric;
    
    let totalWeightedScore = 0;
    let totalWeight = 0;

    // Calculate weighted average across categories
    rubric.categories.forEach(category => {
      let categoryScore = 0;
      let categoryTotalWeight = 0;

      category.subcategories.forEach(subcategory => {
        const score = scores.find(s => s.subcategory_id === subcategory.id);
        if (score) {
          categoryScore += score.score * subcategory.weight;
          categoryTotalWeight += subcategory.weight;
        }
      });

      if (categoryTotalWeight > 0) {
        const avgCategoryScore = categoryScore / categoryTotalWeight;
        totalWeightedScore += avgCategoryScore * category.weight;
        totalWeight += category.weight;
      }
    });

    return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  },

  submitAssessment: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const overallScore = get().calculateOverallScore(id);
      
      // Determine classification based on score
      let classification: Assessment['classification'];
      if (overallScore >= 4.5) classification = 'strategic';
      else if (overallScore >= 3.5) classification = 'important';
      else if (overallScore >= 2.5) classification = 'acceptable';
      else if (overallScore >= 1.5) classification = 'needs_improvement';
      else classification = 'retire';

      const now = new Date().toISOString();
      
      set(state => ({
        assessments: state.assessments.map(assessment =>
          assessment.id === id
            ? {
                ...assessment,
                status: 'submitted' as const,
                progress: 100,
                overall_score: overallScore,
                classification,
                completed_at: now,
                submitted_at: now,
                updated_at: now
              }
            : assessment
        ),
        selectedAssessment: state.selectedAssessment?.id === id
          ? {
              ...state.selectedAssessment,
              status: 'submitted' as const,
              progress: 100,
              overall_score: overallScore,
              classification,
              completed_at: now,
              submitted_at: now,
              updated_at: now
            }
          : state.selectedAssessment,
        loading: false
      }));
      
    } catch (error) {
      set({ error: 'Failed to submit assessment', loading: false });
    }
  }
}));
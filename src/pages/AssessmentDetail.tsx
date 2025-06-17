import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAssessmentStore, useUserStore } from '../store';
import { AssessmentHeader } from '../components/assessment/AssessmentHeader';
import { CategoryNavigation } from '../components/assessment/CategoryNavigation';
import { SubcategoryScoring } from '../components/assessment/SubcategoryScoring';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function AssessmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getAssessment, 
    fetchAssessmentScores, 
    updateAssessmentProgress,
    calculateOverallScore,
    assessmentScores,
    loading 
  } = useAssessmentStore();
  const { fetchCurrentUser } = useUserStore();

  const [activeCategory, setActiveCategory] = useState<string>('');
  const [assessment, setAssessment] = useState(useAssessmentStore.getState().getAssessment(id!));

  useEffect(() => {
    if (!id) {
      navigate('/assessments');
      return;
    }

    // Initialize stores
    fetchCurrentUser();
    fetchAssessmentScores(id);

    // Get assessment
    const foundAssessment = getAssessment(id);
    if (!foundAssessment) {
      navigate('/assessments');
      return;
    }

    setAssessment(foundAssessment);
    
    // Set first category as active
    if (foundAssessment.rubric?.categories.length && !activeCategory) {
      setActiveCategory(foundAssessment.rubric.categories[0].id);
    }
  }, [id, navigate, fetchCurrentUser, fetchAssessmentScores, getAssessment, activeCategory]);

  // Update progress when scores change
  useEffect(() => {
    if (!assessment || !assessment.rubric) return;

    const totalSubcategories = assessment.rubric.categories.reduce(
      (total, category) => total + category.subcategories.length, 
      0
    );
    
    const completedSubcategories = assessmentScores.filter(
      score => score.assessment_id === assessment.id
    ).length;

    const newProgress = totalSubcategories > 0 
      ? Math.round((completedSubcategories / totalSubcategories) * 100)
      : 0;

    if (newProgress !== assessment.progress) {
      updateAssessmentProgress(assessment.id, newProgress);
      // Update local state
      setAssessment(prev => prev ? { ...prev, progress: newProgress } : null);
    }
  }, [assessmentScores, assessment, updateAssessmentProgress]);

  const handleScoreSaved = () => {
    // Recalculate overall score
    if (assessment) {
      const overallScore = calculateOverallScore(assessment.id);
      setAssessment(prev => prev ? { ...prev, overall_score: overallScore } : null);
    }
  };

  const handleSubmitSuccess = () => {
    navigate('/assessments');
  };

  if (loading || !assessment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!assessment.rubric) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Assessment Configuration Error
          </h2>
          <p className="text-gray-600 mb-4">
            This assessment is missing rubric configuration.
          </p>
          <Button onClick={() => navigate('/assessments')}>
            Back to Assessments
          </Button>
        </div>
      </div>
    );
  }

  const activeRubricCategory = assessment.rubric.categories.find(
    cat => cat.id === activeCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AssessmentHeader 
        assessment={assessment} 
        onSubmit={handleSubmitSuccess}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card>
                <CardContent>
                  <CategoryNavigation
                    categories={assessment.rubric.categories}
                    activeCategory={activeCategory}
                    onCategorySelect={setActiveCategory}
                    assessmentId={assessment.id}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeRubricCategory ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {activeRubricCategory.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {activeRubricCategory.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    Category Weight: {activeRubricCategory.weight}% of total score
                  </div>
                </div>

                <div className="space-y-6">
                  {activeRubricCategory.subcategories.map((subcategory) => (
                    <SubcategoryScoring
                      key={subcategory.id}
                      assessmentId={assessment.id}
                      categoryId={activeRubricCategory.id}
                      subcategory={subcategory}
                      onScoreSaved={handleScoreSaved}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Card>
                <CardContent>
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a Category
                    </h3>
                    <p className="text-gray-600">
                      Choose a category from the sidebar to begin scoring.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { clsx } from 'clsx';
import { RubricCategory } from '../../types';
import { useAssessmentStore } from '../../store';

interface CategoryNavigationProps {
  categories: RubricCategory[];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
  assessmentId: string;
}

export function CategoryNavigation({ 
  categories, 
  activeCategory, 
  onCategorySelect, 
  assessmentId 
}: CategoryNavigationProps) {
  const { assessmentScores } = useAssessmentStore();

  const getCategoryProgress = (category: RubricCategory) => {
    const categoryScores = assessmentScores.filter(score => 
      score.assessment_id === assessmentId && score.category_id === category.id
    );
    const totalSubcategories = category.subcategories.length;
    const completedSubcategories = categoryScores.length;
    
    return {
      completed: completedSubcategories,
      total: totalSubcategories,
      percentage: totalSubcategories > 0 ? (completedSubcategories / totalSubcategories) * 100 : 0
    };
  };

  return (
    <nav className="space-y-2">
      <div className="text-sm font-medium text-gray-900 mb-4">Assessment Categories</div>
      {categories.map((category) => {
        const progress = getCategoryProgress(category);
        const isActive = activeCategory === category.id;
        const isCompleted = progress.completed === progress.total && progress.total > 0;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={clsx(
              'w-full text-left p-4 rounded-lg border transition-all duration-200',
              'hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              {
                'border-primary-500 bg-primary-50': isActive,
                'border-gray-200 bg-white': !isActive,
              }
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{category.name}</span>
                  {isCompleted && (
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Weight: {category.weight}%</span>
                  <span>{progress.completed}/{progress.total} completed</span>
                </div>
                {/* Progress bar */}
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={clsx(
                      'h-1.5 rounded-full transition-all duration-300',
                      {
                        'bg-green-500': isCompleted,
                        'bg-primary-500': !isCompleted && progress.percentage > 0,
                        'bg-gray-200': progress.percentage === 0,
                      }
                    )}
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
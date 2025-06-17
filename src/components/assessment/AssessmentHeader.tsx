import React from 'react';
import { Assessment } from '../../types';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Button } from '../ui/Button';
import { useAssessmentStore } from '../../store';

interface AssessmentHeaderProps {
  assessment: Assessment;
  onSubmit?: () => void;
}

export function AssessmentHeader({ assessment, onSubmit }: AssessmentHeaderProps) {
  const { submitAssessment } = useAssessmentStore();

  const getStatusBadge = (status: Assessment['status']) => {
    const variants = {
      draft: 'secondary' as const,
      in_progress: 'warning' as const,
      completed: 'success' as const,
      submitted: 'success' as const,
      approved: 'success' as const,
    };
    
    const labels = {
      draft: 'Draft',
      in_progress: 'In Progress',
      completed: 'Completed',
      submitted: 'Submitted',
      approved: 'Approved',
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getCriticalityBadge = (criticality: string) => {
    const variants = {
      mission_critical: 'danger' as const,
      business_important: 'warning' as const,
      administrative: 'secondary' as const,
      development: 'default' as const,
    };

    const labels = {
      mission_critical: 'Mission Critical',
      business_important: 'Business Important',
      administrative: 'Administrative',
      development: 'Development',
    };

    return (
      <Badge variant={variants[criticality as keyof typeof variants]}>
        {labels[criticality as keyof typeof labels]}
      </Badge>
    );
  };

  const handleSubmit = async () => {
    if (assessment.progress === 100) {
      await submitAssessment(assessment.id);
      onSubmit?.();
    }
  };

  const canSubmit = assessment.progress === 100 && assessment.status !== 'submitted' && assessment.status !== 'approved';

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {assessment.application?.name}
            </h1>
            {getStatusBadge(assessment.status)}
            {assessment.application && getCriticalityBadge(assessment.application.business_criticality)}
          </div>
          
          <p className="text-gray-600 mb-4">
            {assessment.application?.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Business Owner:</span>
              <div className="text-gray-600">{assessment.application?.business_owner}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Technical Owner:</span>
              <div className="text-gray-600">{assessment.application?.technical_owner}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Assessor:</span>
              <div className="text-gray-600">{assessment.assessor?.name}</div>
            </div>
          </div>

          <div className="mt-4">
            <Progress 
              value={assessment.progress} 
              showLabel 
              className="max-w-md"
            />
          </div>

          {assessment.overall_score && (
            <div className="mt-4 flex items-center space-x-4">
              <div>
                <span className="font-medium text-gray-700">Overall Score:</span>
                <span className="ml-2 text-lg font-bold text-primary-600">
                  {assessment.overall_score.toFixed(1)}/5.0
                </span>
              </div>
              {assessment.classification && (
                <div>
                  <span className="font-medium text-gray-700">Classification:</span>
                  <span className="ml-2 capitalize text-gray-900">
                    {assessment.classification.replace('_', ' ')}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex space-x-3">
          {canSubmit && (
            <Button onClick={handleSubmit} variant="primary">
              Submit Assessment
            </Button>
          )}
          <Button variant="outline">
            Save Draft
          </Button>
        </div>
      </div>
    </div>
  );
}
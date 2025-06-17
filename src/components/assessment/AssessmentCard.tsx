import React from 'react';
import { Assessment } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { formatDistanceToNow } from 'date-fns';

interface AssessmentCardProps {
  assessment: Assessment;
  onClick: () => void;
}

export function AssessmentCard({ assessment, onClick }: AssessmentCardProps) {
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
      <Badge variant={variants[status]} size="sm">
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
      <Badge variant={variants[criticality as keyof typeof variants]} size="sm">
        {labels[criticality as keyof typeof labels]}
      </Badge>
    );
  };

  const getClassificationBadge = (classification: string) => {
    const variants = {
      strategic: 'success' as const,
      important: 'default' as const,
      acceptable: 'secondary' as const,
      needs_improvement: 'warning' as const,
      retire: 'danger' as const,
    };

    const labels = {
      strategic: 'Strategic',
      important: 'Important',
      acceptable: 'Acceptable',
      needs_improvement: 'Needs Improvement',
      retire: 'Retire',
    };

    return (
      <Badge variant={variants[classification as keyof typeof variants]} size="sm">
        {labels[classification as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {assessment.application?.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {assessment.application?.description}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2 ml-4">
                {getStatusBadge(assessment.status)}
                {assessment.application && getCriticalityBadge(assessment.application.business_criticality)}
                {assessment.classification && getClassificationBadge(assessment.classification)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
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

            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{assessment.progress}%</span>
                </div>
                <Progress value={assessment.progress} size="sm" />
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600 ml-6">
                {assessment.overall_score && (
                  <div>
                    <span className="font-medium">Score:</span>
                    <span className="ml-1 font-semibold text-primary-600">
                      {assessment.overall_score.toFixed(1)}/5.0
                    </span>
                  </div>
                )}
                <div>
                  <span className="font-medium">Updated:</span>
                  <span className="ml-1">
                    {formatDistanceToNow(new Date(assessment.updated_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            {assessment.application?.technology_stack && assessment.application.technology_stack.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Tech Stack:</span>
                  <div className="flex flex-wrap gap-1">
                    {assessment.application.technology_stack.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="secondary" size="sm">
                        {tech}
                      </Badge>
                    ))}
                    {assessment.application.technology_stack.length > 3 && (
                      <Badge variant="secondary" size="sm">
                        +{assessment.application.technology_stack.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
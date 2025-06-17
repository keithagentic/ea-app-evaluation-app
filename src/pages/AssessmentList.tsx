import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore, useUserStore } from '../store';
import { Assessment } from '../types';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { AssessmentFilters } from '../components/assessment/AssessmentFilters';
import { AssessmentCard } from '../components/assessment/AssessmentCard';

export function AssessmentList() {
  const navigate = useNavigate();
  const { assessments, fetchAssessments, loading } = useAssessmentStore();
  const { fetchCurrentUser, currentUser } = useUserStore();
  
  const [filteredAssessments, setFilteredAssessments] = useState<Assessment[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    criticality: 'all',
    search: '',
  });
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'progress' | 'updated_at'>('updated_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchCurrentUser();
    fetchAssessments();
  }, [fetchCurrentUser, fetchAssessments]);

  useEffect(() => {
    let filtered = [...assessments];

    // Apply filters
    if (filters.status !== 'all') {
      filtered = filtered.filter(assessment => assessment.status === filters.status);
    }

    if (filters.criticality !== 'all') {
      filtered = filtered.filter(assessment => 
        assessment.application?.business_criticality === filters.criticality
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(assessment =>
        assessment.application?.name.toLowerCase().includes(searchLower) ||
        assessment.application?.description?.toLowerCase().includes(searchLower) ||
        assessment.application?.business_owner.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.application?.name || '';
          bValue = b.application?.name || '';
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'progress':
          aValue = a.progress;
          bValue = b.progress;
          break;
        case 'updated_at':
        default:
          aValue = new Date(a.updated_at);
          bValue = new Date(b.updated_at);
          break;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredAssessments(filtered);
  }, [assessments, filters, sortBy, sortOrder]);

  const handleAssessmentClick = (assessmentId: string) => {
    navigate(`/assessments/${assessmentId}`);
  };

  const getStatusStats = () => {
    const stats = {
      total: assessments.length,
      draft: assessments.filter(a => a.status === 'draft').length,
      in_progress: assessments.filter(a => a.status === 'in_progress').length,
      completed: assessments.filter(a => a.status === 'completed' || a.status === 'submitted').length,
    };
    return stats;
  };

  const stats = getStatusStats();

  if (loading && assessments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
            <p className="text-gray-600 mt-1">
              Manage and track your application assessments
            </p>
          </div>
          <Button onClick={() => navigate('/assessments/new')} disabled>
            New Assessment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card padding="sm">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Assessments</div>
              </div>
            </CardContent>
          </Card>
          <Card padding="sm">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
                <div className="text-sm text-gray-600">Draft</div>
              </div>
            </CardContent>
          </Card>
          <Card padding="sm">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.in_progress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </CardContent>
          </Card>
          <Card padding="sm">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters and Search */}
      <AssessmentFilters
        filters={filters}
        onFiltersChange={setFilters}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSortBy}
        onSortOrderChange={setSortOrder}
      />

      {/* Assessment List */}
      <div className="mt-6">
        {filteredAssessments.length === 0 ? (
          <Card>
            <CardContent>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {assessments.length === 0 ? 'No Assessments Yet' : 'No Matching Assessments'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {assessments.length === 0 
                    ? 'Get started by creating your first application assessment.'
                    : 'Try adjusting your filters to see more results.'
                  }
                </p>
                {assessments.length === 0 && (
                  <Button onClick={() => navigate('/assessments/new')} disabled>
                    Create Assessment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAssessments.map((assessment) => (
              <AssessmentCard
                key={assessment.id}
                assessment={assessment}
                onClick={() => handleAssessmentClick(assessment.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Results Summary */}
      {filteredAssessments.length > 0 && (
        <div className="mt-6 text-sm text-gray-600 text-center">
          Showing {filteredAssessments.length} of {assessments.length} assessments
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { Button } from '../ui/Button';

interface AssessmentFiltersProps {
  filters: {
    status: string;
    criticality: string;
    search: string;
  };
  onFiltersChange: (filters: any) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: string) => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

export function AssessmentFilters({
  filters,
  onFiltersChange,
  sortBy,
  sortOrder,
  onSortChange,
  onSortOrderChange,
}: AssessmentFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: 'all',
      criticality: 'all',
      search: '',
    });
  };

  const hasActiveFilters = filters.status !== 'all' || filters.criticality !== 'all' || filters.search !== '';

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Applications
          </label>
          <input
            type="text"
            id="search"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search by application name, description, or owner..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
          </select>
        </div>

        <div>
          <label htmlFor="criticality" className="block text-sm font-medium text-gray-700 mb-1">
            Business Criticality
          </label>
          <select
            id="criticality"
            value={filters.criticality}
            onChange={(e) => handleFilterChange('criticality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Criticalities</option>
            <option value="mission_critical">Mission Critical</option>
            <option value="business_important">Business Important</option>
            <option value="administrative">Administrative</option>
            <option value="development">Development</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="updated_at">Last Updated</option>
            <option value="name">Application Name</option>
            <option value="status">Status</option>
            <option value="progress">Progress</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as 'asc' | 'desc')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { clsx } from 'clsx';

interface ConfidenceSelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const confidenceLevels = [
  { value: 1, label: 'Very Low', description: 'Limited information available' },
  { value: 2, label: 'Low', description: 'Some uncertainty in assessment' },
  { value: 3, label: 'Medium', description: 'Reasonable confidence in assessment' },
  { value: 4, label: 'High', description: 'Strong confidence in assessment' },
  { value: 5, label: 'Very High', description: 'Complete confidence in assessment' },
];

export function ConfidenceSelector({ value, onChange, disabled }: ConfidenceSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700">Confidence Level:</div>
      <div className="flex space-x-2">
        {confidenceLevels.map((level) => (
          <button
            key={level.value}
            onClick={() => onChange(level.value)}
            disabled={disabled}
            title={level.description}
            className={clsx(
              'flex-1 p-3 text-center rounded-lg border-2 transition-all duration-200',
              'hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              {
                'border-primary-500 bg-primary-50 text-primary-700': value === level.value,
                'border-gray-200 bg-white text-gray-700': value !== level.value,
                'opacity-50 cursor-not-allowed': disabled,
                'cursor-pointer': !disabled,
              }
            )}
          >
            <div className="text-sm font-medium">{level.value}</div>
            <div className="text-xs mt-1">{level.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
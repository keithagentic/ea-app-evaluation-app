import React from 'react';
import { clsx } from 'clsx';
import { ScoringCriteria } from '../../types';

interface ScoreSelectorProps {
  criteria: ScoringCriteria[];
  selectedScore?: number;
  onScoreSelect: (score: number) => void;
  disabled?: boolean;
}

export function ScoreSelector({ criteria, selectedScore, onScoreSelect, disabled }: ScoreSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 mb-3">Select Score:</div>
      <div className="space-y-2">
        {criteria.map((criterion) => (
          <button
            key={criterion.score}
            onClick={() => onScoreSelect(criterion.score)}
            disabled={disabled}
            className={clsx(
              'w-full text-left p-4 rounded-lg border-2 transition-all duration-200',
              'hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              {
                'border-primary-500 bg-primary-50': selectedScore === criterion.score,
                'border-gray-200 bg-white': selectedScore !== criterion.score,
                'opacity-50 cursor-not-allowed': disabled,
                'cursor-pointer': !disabled,
              }
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={clsx(
                    'inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold',
                    {
                      'bg-primary-600 text-white': selectedScore === criterion.score,
                      'bg-gray-100 text-gray-700': selectedScore !== criterion.score,
                    }
                  )}>
                    {criterion.score}
                  </span>
                  <span className="font-medium text-gray-900">{criterion.label}</span>
                </div>
                <p className="text-sm text-gray-600 ml-11">{criterion.description}</p>
              </div>
              {selectedScore === criterion.score && (
                <div className="ml-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
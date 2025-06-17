import React from 'react';

export function ApplicationList() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">
            Applications
          </h2>
          <p className="text-gray-500">
            Application inventory will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
}
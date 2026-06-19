import React from 'react';

interface PatientLayoutProps {
  children: React.ReactNode;
}

export const PatientLayout: React.FC<PatientLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Content area with sidebar offset */}
      <div className="flex-1 lg:ml-64 overflow-auto">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

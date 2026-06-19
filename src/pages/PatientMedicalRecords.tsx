import React from 'react';
import { useMedicalRecords } from '../hooks/usePatient';
import { FileText, Download, AlertCircle } from 'lucide-react';

const PatientMedicalRecords: React.FC = () => {
  const { data, isLoading, error } = useMedicalRecords();

  const records = data?.data || [];

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center space-x-4">
        <AlertCircle className="text-red-600" size={24} />
        <div>
          <h3 className="font-semibold text-red-900">Error loading medical records</h3>
          <p className="text-red-700 text-sm">Please refresh the page and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold">Medical Records</h1>
        <p className="text-blue-100">Your complete medical history</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading medical records...</p>
          </div>
        </div>
      ) : records.length > 0 ? (
        <div className="space-y-4">
          {records.map((record: any) => (
            <div key={record._id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <FileText className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {new Date(record.recordDate).toLocaleDateString()}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Dr. {record.doctorId?.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Diagnosis</p>
                  <p className="text-gray-800">{record.diagnosis}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Treatment</p>
                  <p className="text-gray-800">{record.treatment}</p>
                </div>
              </div>

              {record.medications && record.medications.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-semibold">Medications</p>
                  <ul className="list-disc list-inside space-y-1">
                    {record.medications.map((med: string, idx: number) => (
                      <li key={idx} className="text-gray-800">{med}</li>
                    ))}
                  </ul>
                </div>
              )}

              {record.notes && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-semibold">Notes</p>
                  <p className="text-gray-800">{record.notes}</p>
                </div>
              )}

              {record.attachments && record.attachments.length > 0 && (
                <div className="flex space-x-2">
                  {record.attachments.map((attachment: string, idx: number) => (
                    <a
                      key={idx}
                      href={attachment}
                      download
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
                    >
                      <Download size={18} />
                      <span className="text-sm">Download {idx + 1}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No medical records found</p>
        </div>
      )}
    </div>
  );
};

export default PatientMedicalRecords;

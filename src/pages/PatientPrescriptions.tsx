import React from 'react';
import { usePrescriptions } from '../hooks/usePatient';
import { Pill, Download, AlertCircle } from 'lucide-react';

const PatientPrescriptions: React.FC = () => {
  const { data, isLoading, error } = usePrescriptions();

  const prescriptions = data?.data || [];

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center space-x-4">
        <AlertCircle className="text-red-600" size={24} />
        <div>
          <h3 className="font-semibold text-red-900">Error loading prescriptions</h3>
          <p className="text-red-700 text-sm">Please refresh the page and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold">Prescriptions</h1>
        <p className="text-blue-100">Your current and past prescriptions</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading prescriptions...</p>
          </div>
        </div>
      ) : prescriptions.length > 0 ? (
        <div className="space-y-4">
          {prescriptions.map((prescription: any) => (
            <div key={prescription._id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <Pill className="text-purple-600 flex-shrink-0 mt-1" size={24} />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      Prescription from {new Date(prescription.prescriptionDate).toLocaleDateString()}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Dr. {prescription.doctorId?.name}
                    </p>
                  </div>
                </div>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
                >
                  <Download size={20} />
                  <span className="text-sm">Download PDF</span>
                </a>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 font-semibold mb-3">Medicines</p>
                <div className="space-y-3">
                  {prescription.medicines.map((medicine: any, idx: number) => (
                    <div key={idx} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Medicine Name</p>
                          <p className="font-semibold text-gray-800">{medicine.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Dosage</p>
                          <p className="font-semibold text-gray-800">{medicine.dosage}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-semibold text-gray-800">{medicine.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Instructions</p>
                          <p className="font-semibold text-gray-800">{medicine.instructions}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {prescription.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Additional Notes</p>
                  <p className="text-gray-800">{prescription.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No prescriptions found</p>
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptions;

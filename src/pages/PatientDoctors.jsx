import React, { useState } from 'react';
import { useDoctors } from '../hooks/usePatient';
import { Search, MapPin, Award, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
const PatientDoctors = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const { data, isLoading, error } = useDoctors(selectedSpecialization);
    const doctors = data?.data || [];
    const filteredDoctors = doctors.filter((doctor) => doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()));
    if (error) {
        return (<div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center space-x-4">
        <AlertCircle className="text-red-600" size={24}/>
        <div>
          <h3 className="font-semibold text-red-900">Error loading doctors</h3>
          <p className="text-red-700 text-sm">Please refresh the page and try again</p>
        </div>
      </div>);
    }
    return (<div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold">Our Doctors</h1>
        <p className="text-blue-100">Find and book appointments with our specialist doctors</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20}/>
            <input type="text" placeholder="Search doctors by name or specialization..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      {isLoading ? (<div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading doctors...</p>
          </div>
        </div>) : filteredDoctors.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (<div key={doctor._id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              {doctor.profileImage && (<img src={doctor.profileImage} alt={doctor.name} className="w-full h-48 object-cover"/>)}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Award size={18} className="text-blue-600"/>
                    <span>{doctor.specialization}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock size={18} className="text-green-600"/>
                    <span>{doctor.experience} years experience</span>
                  </div>

                  {doctor.phone && (<div className="flex items-center space-x-2 text-gray-600">
                      <MapPin size={18} className="text-red-600"/>
                      <span>{doctor.phone}</span>
                    </div>)}
                </div>

                <div className="flex space-x-3">
                  <Link to={`/patient/appointments/book?doctorId=${doctor._id}`} className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Book Now
                  </Link>
                  <Link to={`/patient/messages?doctorId=${doctor._id}`} className="flex-1 text-center bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition">
                    Message
                  </Link>
                </div>
              </div>
            </div>))}
        </div>) : (<div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No doctors found</p>
        </div>)}
    </div>);
};
export default PatientDoctors;

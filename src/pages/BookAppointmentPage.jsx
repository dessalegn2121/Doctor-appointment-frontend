import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBookAppointment, useDepartments, useDoctorDetails, useDoctorsByDepartment } from '../hooks/usePatient';
import { bookAppointmentSchema } from '../schemas/validationSchemas';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
const BookAppointment = () => {
    const [searchParams] = useSearchParams();
    const doctorIdParam = searchParams.get('doctorId');
    const [successMessage, setSuccessMessage] = useState('');
    const { data: departmentsData, isLoading: departmentsLoading } = useDepartments();
    const { data: doctorDetailsData } = useDoctorDetails(doctorIdParam);
    const { mutate: bookAppointment, isPending, error } = useBookAppointment();
    const departments = Array.isArray(departmentsData?.data)
        ? departmentsData.data
        : Array.isArray(departmentsData?.data?.data)
            ? departmentsData.data.data
            : [];
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue, } = useForm({
        resolver: zodResolver(bookAppointmentSchema),
        defaultValues: {
            doctorId: doctorIdParam || '',
            departmentId: '',
        },
    });
    const selectedDepartmentId = watch('departmentId');
    const selectedDoctorId = watch('doctorId');
    const selectedDepartment = departments.find((dept) => dept._id === selectedDepartmentId);
    useEffect(() => {
        if (!doctorIdParam || !doctorDetailsData?.data)
            return;
        const doctor = doctorDetailsData.data;
        const matchedDepartment = departments.find((dept) => dept.name.trim().toLowerCase() === String(doctor.department || '').trim().toLowerCase());
        if (matchedDepartment && selectedDepartmentId !== matchedDepartment._id) {
            setValue('departmentId', matchedDepartment._id, { shouldValidate: true });
        }
        if (selectedDoctorId !== doctorIdParam) {
            setValue('doctorId', doctorIdParam, { shouldValidate: true });
        }
    }, [doctorIdParam, doctorDetailsData, departments, selectedDepartmentId, selectedDoctorId, setValue]);
    const doctorsQuery = useDoctorsByDepartment(selectedDepartment?.name);
    const doctorsPayload = doctorsQuery.data?.data;
    const doctors = Array.isArray(doctorsPayload)
        ? doctorsPayload
        : Array.isArray(doctorsPayload?.doctors)
            ? doctorsPayload.doctors
            : Array.isArray(doctorsQuery.data?.data?.doctors)
                ? doctorsQuery.data.data.doctors
                : [];
    const selectedDoctor = doctors.find((doc) => doc._id === selectedDoctorId);
    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    ];
    const onSubmit = (data) => {
        bookAppointment(data, {
            onSuccess: () => {
                setSuccessMessage('Appointment booked successfully!');
                reset();
                setTimeout(() => setSuccessMessage(''), 3000);
            },
        });
    };
    return (<div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold">Book an Appointment</h1>
        <p className="text-blue-100">Schedule your visit with our doctors</p>
      </div>

      {successMessage && (<div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="text-green-600" size={20}/>
          <p className="text-green-800">{successMessage}</p>
        </div>)}

      {error && (<div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="text-red-600" size={20}/>
          <p className="text-red-800">Error booking appointment. Please try again.</p>
        </div>)}

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Department *</label>
            <select {...register('departmentId')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Choose a department...</option>
              {departments.map((department) => (<option key={department._id} value={department._id}>
                  {department.name}
                </option>))}
            </select>
            {errors.departmentId && (<p className="text-red-600 text-sm mt-1">{errors.departmentId.message}</p>)}
          </div>

          {departmentsLoading && (<p className="text-sm text-gray-500">Loading departments...</p>)}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor *</label>
            <select {...register('doctorId')} disabled={!selectedDepartmentId} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">{selectedDepartmentId ? 'Choose a doctor...' : 'Select a department first'}</option>
              {doctors.map((doctor) => (<option key={doctor._id} value={doctor._id}>
                  {doctor.name} - {doctor.specialization}
                </option>))}
            </select>
            {errors.doctorId && (<p className="text-red-600 text-sm mt-1">{errors.doctorId.message}</p>)}
          </div>

          {selectedDepartmentId && doctors.length === 0 && (<div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              No doctors are available in this department right now.
            </div>)}

          {selectedDoctor && (<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">Selected Doctor:</p>
              <p className="font-semibold text-gray-800">{selectedDoctor.name}</p>
              <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
              {selectedDoctor.phone && (<p className="text-sm text-gray-600">📞 {selectedDoctor.phone}</p>)}
            </div>)}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Date *</label>
            <input {...register('appointmentDate')} type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
            {errors.appointmentDate && (<p className="text-red-600 text-sm mt-1">{errors.appointmentDate.message}</p>)}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot *</label>
            <select {...register('timeSlot')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select a time slot...</option>
              {timeSlots.map((slot) => (<option key={slot} value={slot}>
                  {slot}
                </option>))}
            </select>
            {errors.timeSlot && (<p className="text-red-600 text-sm mt-1">{errors.timeSlot.message}</p>)}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit *</label>
            <textarea {...register('reason')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Describe your reason for the appointment" rows={4}/>
            {errors.reason && (<p className="text-red-600 text-sm mt-1">{errors.reason.message}</p>)}
          </div>

          <button type="submit" disabled={isPending} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 font-semibold">
            {isPending ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>);
};
export default BookAppointment;

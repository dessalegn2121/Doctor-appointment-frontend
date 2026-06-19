import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePatientProfile, useUpdatePatientProfile, useChangePassword } from '../hooks/usePatient';
import { profileSchema, changePasswordSchema, ProfileFormData, ChangePasswordFormData } from '../schemas/validationSchemas';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const PatientProfile: React.FC = () => {
  const { data: profileData, isLoading: profileLoading } = usePatientProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdatePatientProfile();
  const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
    watch: watchProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: profileData?.data || {},
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onUpdateProfile = (data: ProfileFormData) => {
    updateProfile(data, {
      onSuccess: () => {
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      },
    });
  };

  const onChangePassword = (data: ChangePasswordFormData) => {
    changePassword(
      { currentPassword: data.currentPassword, newPassword: data.newPassword },
      {
        onSuccess: () => {
          setSuccessMessage('Password changed successfully!');
          resetPassword();
          setTimeout(() => setSuccessMessage(''), 3000);
        },
      }
    );
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-blue-100">Manage your personal information</p>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="text-green-600" size={20} />
          <p className="text-green-800">{successMessage}</p>
        </div>
      )}

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h2>
        <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                {...registerProfile('name')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full Name"
              />
              {profileErrors.name && (
                <p className="text-red-600 text-sm mt-1">{profileErrors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                {...registerProfile('email')}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                {...registerProfile('phone')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Phone Number"
              />
              {profileErrors.phone && (
                <p className="text-red-600 text-sm mt-1">{profileErrors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                {...registerProfile('gender')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                {...registerProfile('dob')}
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              <select
                {...registerProfile('bloodGroup')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Blood Group</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              {...registerProfile('address')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your address"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {isUpdating ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2>
        <form onSubmit={handleSubmitPassword(onChangePassword)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                {...registerPassword('currentPassword')}
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordErrors.currentPassword && (
              <p className="text-red-600 text-sm mt-1">{passwordErrors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              {...registerPassword('newPassword')}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new password"
            />
            {passwordErrors.newPassword && (
              <p className="text-red-600 text-sm mt-1">{passwordErrors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              {...registerPassword('confirmPassword')}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm new password"
            />
            {passwordErrors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{passwordErrors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isChangingPassword}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {isChangingPassword ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientProfile;

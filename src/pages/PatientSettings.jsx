import React, { useState } from 'react';
import { Bell, Lock, AlertCircle, CheckCircle } from 'lucide-react';
const PatientSettings = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [notificationSettings, setNotificationSettings] = useState({
        appointmentReminders: true,
        doctorMessages: true,
        prescriptionUpdates: true,
        generalNotifications: true,
    });
    const [privacySettings, setPrivacySettings] = useState({
        showProfile: true,
        allowMessages: true,
        shareRecords: false,
    });
    const handleNotificationChange = (key) => {
        setNotificationSettings({
            ...notificationSettings,
            [key]: !notificationSettings[key],
        });
        setSuccessMessage('Settings updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };
    const handlePrivacyChange = (key) => {
        setPrivacySettings({
            ...privacySettings,
            [key]: !privacySettings[key],
        });
        setSuccessMessage('Settings updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };
    return (<div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-blue-100">Manage your preferences and privacy</p>
      </div>

      {successMessage && (<div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="text-green-600" size={20}/>
          <p className="text-green-800">{successMessage}</p>
        </div>)}

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="text-blue-600" size={24}/>
          <h2 className="text-xl font-bold text-gray-800">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <p className="font-semibold text-gray-800">Appointment Reminders</p>
              <p className="text-sm text-gray-600">Get notified before your appointments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notificationSettings.appointmentReminders} onChange={() => handleNotificationChange('appointmentReminders')} className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <p className="font-semibold text-gray-800">Doctor Messages</p>
              <p className="text-sm text-gray-600">Get notified when doctors send you messages</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notificationSettings.doctorMessages} onChange={() => handleNotificationChange('doctorMessages')} className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <p className="font-semibold text-gray-800">Prescription Updates</p>
              <p className="text-sm text-gray-600">Get notified about new prescriptions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notificationSettings.prescriptionUpdates} onChange={() => handleNotificationChange('prescriptionUpdates')} className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <p className="font-semibold text-gray-800">General Notifications</p>
              <p className="text-sm text-gray-600">Get other system notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notificationSettings.generalNotifications} onChange={() => handleNotificationChange('generalNotifications')} className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Lock className="text-blue-600" size={24}/>
          <h2 className="text-xl font-bold text-gray-800">Privacy Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <p className="font-semibold text-gray-800">Show My Profile</p>
              <p className="text-sm text-gray-600">Allow doctors to view your profile</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={privacySettings.showProfile} onChange={() => handlePrivacyChange('showProfile')} className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <p className="font-semibold text-gray-800">Allow Messages</p>
              <p className="text-sm text-gray-600">Allow doctors to send you messages</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={privacySettings.allowMessages} onChange={() => handlePrivacyChange('allowMessages')} className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <p className="font-semibold text-gray-800">Share Medical Records</p>
              <p className="text-sm text-gray-600">Allow doctors to access your medical history</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={privacySettings.shareRecords} onChange={() => handlePrivacyChange('shareRecords')} className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24}/>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-red-900 mb-3">Danger Zone</h3>
            <p className="text-sm text-red-700 mb-4">
              These actions cannot be undone. Please proceed with caution.
            </p>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>);
};
export default PatientSettings;

import React, { useState } from "react";
import { Save, Bell, Lock, Eye } from "lucide-react";
import { doctorDashboardAPI } from "../services/doctorDashboardAPI";
const Settings = () => {
    const [message, setMessage] = useState("");
    const [settings, setSettings] = useState({
        notificationPreferences: {
            emailNotifications: true,
            appointmentReminders: true,
            newPatientAlerts: true,
        },
        privacySettings: {
            showProfile: true,
            allowMessages: true,
            shareReviews: true,
        },
        securitySettings: {
            twoFactorAuth: false,
            loginAlerts: true,
        },
    });
    const handleSaveSettings = async () => {
        try {
            await doctorDashboardAPI.updateSettings(settings);
            setMessage("Settings updated successfully!");
            setTimeout(() => setMessage(""), 3000);
        }
        catch (err) {
            setMessage("Failed to update settings");
            console.error(err);
        }
    };
    return (<div className="space-y-6 max-w-2xl">
      {message && (<div className={`p-4 rounded-lg ${message.includes("successfully")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"}`}>
          {message}
        </div>)}

      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell size={24} className="text-blue-600"/>
          <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" checked={settings.notificationPreferences.emailNotifications} onChange={(e) => setSettings({
            ...settings,
            notificationPreferences: {
                ...settings.notificationPreferences,
                emailNotifications: e.target.checked,
            },
        })} className="w-4 h-4"/>
            <span className="text-gray-700">Email Notifications</span>
          </label>

          <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" checked={settings.notificationPreferences.appointmentReminders} onChange={(e) => setSettings({
            ...settings,
            notificationPreferences: {
                ...settings.notificationPreferences,
                appointmentReminders: e.target.checked,
            },
        })} className="w-4 h-4"/>
            <span className="text-gray-700">Appointment Reminders</span>
          </label>

          <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" checked={settings.notificationPreferences.newPatientAlerts} onChange={(e) => setSettings({
            ...settings,
            notificationPreferences: {
                ...settings.notificationPreferences,
                newPatientAlerts: e.target.checked,
            },
        })} className="w-4 h-4"/>
            <span className="text-gray-700">New Patient Alerts</span>
          </label>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Eye size={24} className="text-blue-600"/>
          <h2 className="text-xl font-bold text-gray-900">Privacy Settings</h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" checked={settings.privacySettings.showProfile} onChange={(e) => setSettings({
            ...settings,
            privacySettings: {
                ...settings.privacySettings,
                showProfile: e.target.checked,
            },
        })} className="w-4 h-4"/>
            <span className="text-gray-700">Show My Profile Publicly</span>
          </label>

          <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" checked={settings.privacySettings.allowMessages} onChange={(e) => setSettings({
            ...settings,
            privacySettings: {
                ...settings.privacySettings,
                allowMessages: e.target.checked,
            },
        })} className="w-4 h-4"/>
            <span className="text-gray-700">Allow Patient Messages</span>
          </label>

          <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" checked={settings.privacySettings.shareReviews} onChange={(e) => setSettings({
            ...settings,
            privacySettings: {
                ...settings.privacySettings,
                shareReviews: e.target.checked,
            },
        })} className="w-4 h-4"/>
            <span className="text-gray-700">Share My Reviews</span>
          </label>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Lock size={24} className="text-blue-600"/>
          <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" checked={settings.securitySettings.twoFactorAuth} onChange={(e) => setSettings({
            ...settings,
            securitySettings: {
                ...settings.securitySettings,
                twoFactorAuth: e.target.checked,
            },
        })} className="w-4 h-4"/>
            <span className="text-gray-700">Two-Factor Authentication</span>
          </label>

          <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" checked={settings.securitySettings.loginAlerts} onChange={(e) => setSettings({
            ...settings,
            securitySettings: {
                ...settings.securitySettings,
                loginAlerts: e.target.checked,
            },
        })} className="w-4 h-4"/>
            <span className="text-gray-700">Login Alerts</span>
          </label>
        </div>
      </div>

      <button onClick={handleSaveSettings} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium w-full justify-center">
        <Save size={20}/>
        Save Settings
      </button>
    </div>);
};
export default Settings;

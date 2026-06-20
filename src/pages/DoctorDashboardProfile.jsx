import React, { useEffect, useState } from "react";
import { Save, Upload, Eye, EyeOff } from "lucide-react";
import { doctorDashboardAPI } from "../services/doctorDashboardAPI";
const DoctorDashboardProfile = () => {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [passwordMode, setPasswordMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        gender: "",
        dob: "",
        qualification: "",
        specialization: "",
        experience: "",
        licenseNumber: "",
        address: "",
        description: "",
        consultationFee: "",
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await doctorDashboardAPI.getProfile();
                setProfile(res.data);
                setFormData({
                    name: res.data.name || "",
                    phone: res.data.phone || "",
                    gender: res.data.gender || "",
                    dob: res.data.dob ? res.data.dob.split("T")[0] : "",
                    qualification: res.data.qualification || "",
                    specialization: res.data.specialization || "",
                    experience: res.data.experience || "",
                    licenseNumber: res.data.licenseNumber || "",
                    address: res.data.address || "",
                    description: res.data.description || "",
                    consultationFee: res.data.consultationFee || "",
                });
            }
            catch (err) {
                setMessage("Failed to load profile");
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");
        try {
            await doctorDashboardAPI.updateProfile(formData);
            setMessage("Profile updated successfully!");
            setEditMode(false);
            setTimeout(() => setMessage(""), 3000);
        }
        catch (err) {
            setMessage("Failed to update profile");
            console.error(err);
        }
        finally {
            setSaving(false);
        }
    };
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage("Passwords do not match");
            setSaving(false);
            return;
        }
        try {
            await doctorDashboardAPI.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            setMessage("Password changed successfully!");
            setPasswordMode(false);
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setTimeout(() => setMessage(""), 3000);
        }
        catch (err) {
            setMessage("Failed to change password");
            console.error(err);
        }
        finally {
            setSaving(false);
        }
    };
    const handleProfilePictureUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                setSaving(true);
                await doctorDashboardAPI.uploadProfilePicture(reader.result);
                setMessage("Profile picture updated successfully!");
                setTimeout(() => setMessage(""), 3000);
            }
            catch (err) {
                setMessage("Failed to upload profile picture");
                console.error(err);
            }
            finally {
                setSaving(false);
            }
        };
        reader.readAsDataURL(file);
    };
    if (loading) {
        return (<div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>);
    }
    return (<div className="max-w-4xl">
      {message && (<div className={`mb-4 p-4 rounded-lg ${message.includes("successfully")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"}`}>
          {message}
        </div>)}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Picture Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 h-32"></div>

        <div className="px-6 py-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img src={profile?.profileImage || "https://via.placeholder.com/120"} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-lg -mt-16 object-cover"/>
                <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
                  <Upload size={16} className="text-white"/>
                  <input type="file" accept="image/*" onChange={handleProfilePictureUpload} className="hidden" disabled={saving}/>
                </label>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{profile?.name}</h2>
                <p className="text-gray-600">{profile?.specialization}</p>
              </div>
            </div>
            <button onClick={() => setEditMode(!editMode)} className={`px-6 py-2 rounded-lg font-medium transition ${editMode
            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
            : "bg-blue-600 text-white hover:bg-blue-700"}`}>
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {editMode ? (<form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                </div>

                {/* Qualification */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                  <input type="text" name="qualification" value={formData.qualification} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., MBBS, MD"/>
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                  <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                  <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                </div>

                {/* License Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                  <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                </div>

                {/* Consultation Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee</label>
                  <input type="number" name="consultationFee" value={formData.consultationFee} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio/Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tell about yourself..."/>
              </div>

              <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium">
                <Save size={20}/>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <p className="text-gray-900 font-medium">{profile?.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Gender</p>
                    <p className="text-gray-900 font-medium capitalize">{profile?.gender || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Date of Birth</p>
                    <p className="text-gray-900 font-medium">
                      {profile?.dob ? new Date(profile.dob).toLocaleDateString() : "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-4">Professional Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm">Qualification</p>
                    <p className="text-gray-900 font-medium">{profile?.qualification}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Specialization</p>
                    <p className="text-gray-900 font-medium">{profile?.specialization}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Experience</p>
                    <p className="text-gray-900 font-medium">{profile?.experience} years</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">License Number</p>
                    <p className="text-gray-900 font-medium">{profile?.licenseNumber || "-"}</p>
                  </div>
                </div>
              </div>
            </div>)}

          {/* Change Password Section */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Security</h3>
              <button onClick={() => setPasswordMode(!passwordMode)} className={`px-6 py-2 rounded-lg font-medium transition ${passwordMode
            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
            : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                {passwordMode ? "Cancel" : "Change Password"}
              </button>
            </div>

            {passwordMode && (<form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input type={showPasswords.current ? "text" : "password"} name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
                    <button type="button" onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })} className="absolute right-3 top-2.5">
                      {showPasswords.current ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <input type={showPasswords.new ? "text" : "password"} name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
                    <button type="button" onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })} className="absolute right-3 top-2.5">
                      {showPasswords.new ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input type={showPasswords.confirm ? "text" : "password"} name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
                    <button type="button" onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })} className="absolute right-3 top-2.5">
                      {showPasswords.confirm ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium">
                  {saving ? "Updating..." : "Update Password"}
                </button>
              </form>)}
          </div>
        </div>
      </div>
    </div>);
};
export default DoctorDashboardProfile;

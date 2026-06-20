import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { doctorDashboardAPI } from "../services/doctorDashboardAPI";
const DoctorSchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [formData, setFormData] = useState({
        day: "",
        timeSlots: [{ startTime: "09:00", endTime: "17:00", isAvailable: true }],
        isWorkingDay: true,
    });
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);
                const res = await doctorDashboardAPI.getSchedule();
                setSchedule(res.data || []);
            }
            catch (err) {
                console.error("Failed to fetch schedule", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);
    const handleSaveSchedule = async () => {
        try {
            setSaving(true);
            await doctorDashboardAPI.updateSchedule(formData);
            alert("Schedule updated successfully!");
            setSelectedDay(null);
        }
        catch (err) {
            console.error("Failed to save schedule", err);
            alert("Failed to save schedule");
        }
        finally {
            setSaving(false);
        }
    };
    const handleSelectDay = (day) => {
        const existing = schedule.find((s) => s.day === day);
        setFormData(existing || {
            day,
            timeSlots: [{ startTime: "09:00", endTime: "17:00", isAvailable: true }],
            isWorkingDay: true,
        });
        setSelectedDay(day);
    };
    if (loading) {
        return (<div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>);
    }
    return (<div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Weekly Schedule</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Days List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b font-semibold text-gray-900">Days</div>
          <div className="space-y-1 p-2">
            {days.map((day) => (<button key={day} onClick={() => handleSelectDay(day)} className={`w-full text-left px-4 py-2 rounded-lg transition ${selectedDay === day
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-900"}`}>
                {day}
              </button>))}
          </div>
        </div>

        {/* Schedule Editor */}
        {selectedDay && (<div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{selectedDay} Schedule</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isWorkingDay} onChange={(e) => setFormData({ ...formData, isWorkingDay: e.target.checked })} className="w-4 h-4"/>
                  <span className="text-gray-700">Working Day</span>
                </label>
              </div>

              {formData.isWorkingDay && (<div className="space-y-3">
                  {formData.timeSlots.map((slot, index) => (<div key={index} className="flex gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Time
                        </label>
                        <input type="time" value={slot.startTime} onChange={(e) => {
                        const newSlots = [...formData.timeSlots];
                        newSlots[index].startTime = e.target.value;
                        setFormData({ ...formData, timeSlots: newSlots });
                    }} className="px-3 py-2 border border-gray-300 rounded-lg"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Time
                        </label>
                        <input type="time" value={slot.endTime} onChange={(e) => {
                        const newSlots = [...formData.timeSlots];
                        newSlots[index].endTime = e.target.value;
                        setFormData({ ...formData, timeSlots: newSlots });
                    }} className="px-3 py-2 border border-gray-300 rounded-lg"/>
                      </div>
                    </div>))}
                </div>)}

              <button onClick={handleSaveSchedule} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                <Save size={20}/>
                {saving ? "Saving..." : "Save Schedule"}
              </button>
            </div>
          </div>)}
      </div>
    </div>);
};
export default DoctorSchedule;

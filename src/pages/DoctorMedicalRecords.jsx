import React, { useState } from "react";
import { FileText, Plus } from "lucide-react";
const MedicalRecords = () => {
    const [showForm, setShowForm] = useState(false);
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({
        patientId: "",
        diagnosis: "",
        treatment: "",
        notes: "",
        visitDate: new Date().toISOString().split("T")[0],
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to submit
        setShowForm(false);
        setFormData({
            patientId: "",
            diagnosis: "",
            treatment: "",
            notes: "",
            visitDate: new Date().toISOString().split("T")[0],
        });
    };
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20}/>
          Create Record
        </button>
      </div>

      {showForm && (<form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
              <input type="text" value={formData.patientId} onChange={(e) => setFormData({ ...formData, patientId: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visit Date</label>
              <input type="date" value={formData.visitDate} onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
              <input type="text" value={formData.diagnosis} onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Treatment</label>
              <input type="text" value={formData.treatment} onChange={(e) => setFormData({ ...formData, treatment: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Save Record
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
              Cancel
            </button>
          </div>
        </form>)}

      {/* Records List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {records.length === 0 ? (<div className="p-8 text-center text-gray-500">
            <FileText size={48} className="mx-auto mb-2 opacity-50"/>
            <p>No medical records found</p>
          </div>) : (<div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Patient</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Diagnosis</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Treatment</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (<tr key={record._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{record.patientId}</td>
                    <td className="py-4 px-6 text-gray-700">{record.visitDate}</td>
                    <td className="py-4 px-6 text-gray-700">{record.diagnosis}</td>
                    <td className="py-4 px-6 text-gray-700">{record.treatment}</td>
                  </tr>))}
              </tbody>
            </table>
          </div>)}
      </div>
    </div>);
};
export default MedicalRecords;

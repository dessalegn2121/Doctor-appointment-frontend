import React, { useEffect, useState } from "react";
import { Pill, Plus, Eye } from "lucide-react";
import { doctorDashboardAPI } from "../services/doctorDashboardAPI";
const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                setLoading(true);
                const res = await doctorDashboardAPI.getPrescriptions({ page, limit: 10 });
                setPrescriptions(res.data.prescriptions || []);
                setTotal(res.data.total || 0);
            }
            catch (err) {
                console.error("Failed to fetch prescriptions", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPrescriptions();
    }, [page]);
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20}/>
          Create Prescription
        </button>
      </div>

      {/* Prescriptions List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (<div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>) : prescriptions.length === 0 ? (<div className="p-8 text-center text-gray-500">
            <Pill size={48} className="mx-auto mb-2 opacity-50"/>
            <p>No prescriptions found</p>
          </div>) : (<div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Patient</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Diagnosis</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Medicines</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((pres) => (<tr key={pres._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{pres.patientId?.name}</td>
                    <td className="py-4 px-6 text-gray-700">{pres.diagnosis}</td>
                    <td className="py-4 px-6 text-gray-700">{pres.medicines?.length || 0} medicines</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${pres.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"}`}>
                        {pres.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded inline-flex items-center gap-1">
                        <Eye size={16}/>
                        View
                      </button>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>)}
      </div>

      {/* Pagination */}
      {total > 10 && (<div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300">
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {Math.ceil(total / 10)}
          </span>
          <button onClick={() => setPage(Math.min(Math.ceil(total / 10), page + 1))} disabled={page === Math.ceil(total / 10)} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300">
            Next
          </button>
        </div>)}
    </div>);
};
export default Prescriptions;

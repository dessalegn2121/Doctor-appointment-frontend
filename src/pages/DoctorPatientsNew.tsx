import React, { useEffect, useState } from "react";
import { Users, Search, Eye } from "lucide-react";
import { doctorDashboardAPI } from "../services/doctorDashboardAPI";

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const res = await doctorDashboardAPI.getPatients({
          page,
          limit: 10,
          search: search || undefined,
        });
        setPatients(res.data.patients || []);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error("Failed to fetch patients", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchPatients();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, page]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Patients List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : patients.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Users size={48} className="mx-auto mb-2 opacity-50" />
            <p>No patients found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Phone</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient: any) => (
                  <tr key={patient._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{patient.name}</td>
                    <td className="py-4 px-6 text-gray-700">{patient.email}</td>
                    <td className="py-4 px-6 text-gray-700">{patient.phone}</td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded inline-flex items-center gap-1">
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > 10 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {Math.ceil(total / 10)}
          </span>
          <button
            onClick={() => setPage(Math.min(Math.ceil(total / 10), page + 1))}
            disabled={page === Math.ceil(total / 10)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorPatients;

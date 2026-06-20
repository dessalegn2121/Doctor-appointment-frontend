import React, { useEffect, useState } from "react";
import { TestTube } from "lucide-react";
import { doctorDashboardAPI } from "../services/doctorDashboardAPI";
const LabReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const res = await doctorDashboardAPI.getLabReports({ page, limit: 10 });
                setReports(res.data.reports || []);
                setTotal(res.data.total || 0);
            }
            catch (err) {
                console.error("Failed to fetch lab reports", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, [page]);
    return (<div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Lab Reports</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (<div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>) : reports.length === 0 ? (<div className="p-8 text-center text-gray-500">
            <TestTube size={48} className="mx-auto mb-2 opacity-50"/>
            <p>No lab reports found</p>
          </div>) : (<div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Patient</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Test Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (<tr key={report._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{report.patientId?.name}</td>
                    <td className="py-4 px-6 text-gray-700">{report.testName}</td>
                    <td className="py-4 px-6 text-gray-700">
                      {new Date(report.reportDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${report.status === "reviewed"
                    ? "bg-green-100 text-green-800"
                    : report.status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"}`}>
                        {report.status}
                      </span>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>)}
      </div>
    </div>);
};
export default LabReports;

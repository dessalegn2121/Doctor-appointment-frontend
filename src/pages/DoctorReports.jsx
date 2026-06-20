import React from "react";
import { BarChart3 } from "lucide-react";
const Reports = () => {
    const reportTypes = [
        { label: "Daily Report", value: "daily" },
        { label: "Weekly Report", value: "weekly" },
        { label: "Monthly Report", value: "monthly" },
    ];
    const [selectedReport, setSelectedReport] = React.useState("daily");
    return (<div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Consultation Reports</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              {reportTypes.map((report) => (<option key={report.value} value={report.value}>
                  {report.label}
                </option>))}
            </select>
          </div>

          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            <BarChart3 size={20}/>
            Generate & Download
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-gray-600 text-sm">Total Appointments</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-gray-600 text-sm">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">0</p>
            <p className="text-gray-600 text-sm">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">0</p>
            <p className="text-gray-600 text-sm">Cancelled</p>
          </div>
        </div>
      </div>
    </div>);
};
export default Reports;

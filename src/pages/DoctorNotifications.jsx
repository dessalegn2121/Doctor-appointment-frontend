import React, { useEffect, useState } from "react";
import { Bell, CheckCircle } from "lucide-react";
import { doctorDashboardAPI } from "../services/doctorDashboardAPI";
const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const res = await doctorDashboardAPI.getNotifications({ page, limit: 20 });
                setNotifications(res.data.notifications || []);
                setTotal(res.data.total || 0);
            }
            catch (err) {
                console.error("Failed to fetch notifications", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [page]);
    const handleMarkAsRead = async (notificationId) => {
        try {
            await doctorDashboardAPI.markNotificationAsRead(notificationId);
            setNotifications((prev) => prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n)));
        }
        catch (err) {
            console.error("Failed to mark as read", err);
        }
    };
    return (<div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>

      <div className="space-y-3">
        {loading ? (<div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>) : notifications.length === 0 ? (<div className="p-8 text-center text-gray-500 bg-white rounded-lg">
            <Bell size={48} className="mx-auto mb-2 opacity-50"/>
            <p>No notifications</p>
          </div>) : (notifications.map((notif) => (<div key={notif._id} className={`p-4 rounded-lg border transition ${notif.isRead
                ? "bg-gray-50 border-gray-200"
                : "bg-blue-50 border-blue-200"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                  <p className="text-gray-700 text-sm mt-1">{notif.message}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
                {!notif.isRead && (<button onClick={() => handleMarkAsRead(notif._id)} className="flex-shrink-0 text-blue-600 hover:text-blue-700">
                    <CheckCircle size={20}/>
                  </button>)}
              </div>
            </div>)))}
      </div>

      {/* Pagination */}
      {total > 20 && (<div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300">
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {Math.ceil(total / 20)}
          </span>
          <button onClick={() => setPage(Math.min(Math.ceil(total / 20), page + 1))} disabled={page === Math.ceil(total / 20)} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300">
            Next
          </button>
        </div>)}
    </div>);
};
export default Notifications;

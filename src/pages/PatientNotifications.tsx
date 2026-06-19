import React from 'react';
import { useNotifications, useMarkNotificationAsRead } from '../hooks/usePatient';
import { Bell, CheckCircle, AlertCircle, MessageSquare, Calendar, Trash2 } from 'lucide-react';

const PatientNotifications: React.FC = () => {
  const { data, isLoading, error } = useNotifications();
  const { mutate: markAsRead } = useMarkNotificationAsRead();

  const notifications = data?.data || [];
  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="text-blue-600" size={20} />;
      case 'message':
        return <MessageSquare className="text-green-600" size={20} />;
      case 'prescription':
        return <AlertCircle className="text-purple-600" size={20} />;
      case 'reminder':
        return <Bell className="text-orange-600" size={20} />;
      default:
        return <Bell className="text-gray-600" size={20} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-50 border-blue-200';
      case 'message':
        return 'bg-green-50 border-green-200';
      case 'prescription':
        return 'bg-purple-50 border-purple-200';
      case 'reminder':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center space-x-4">
        <AlertCircle className="text-red-600" size={24} />
        <div>
          <h3 className="font-semibold text-red-900">Error loading notifications</h3>
          <p className="text-red-700 text-sm">Please refresh the page and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-blue-100">
          {unreadCount > 0 ? `You have ${unreadCount} unread notification(s)` : 'All caught up!'}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading notifications...</p>
          </div>
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification: any) => (
            <div
              key={notification._id}
              className={`rounded-lg border p-4 flex items-start space-x-4 transition ${
                notification.isRead
                  ? 'bg-white border-gray-200'
                  : `${getNotificationColor(notification.type)}`
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                  {new Date(notification.createdAt).toLocaleTimeString()}
                </p>
              </div>

              <div className="flex-shrink-0 flex items-center space-x-2">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition"
                    title="Mark as read"
                  >
                    <CheckCircle className="text-blue-600" size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Bell className="mx-auto mb-4 text-gray-400" size={32} />
          <p className="text-gray-600 text-lg">No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default PatientNotifications;

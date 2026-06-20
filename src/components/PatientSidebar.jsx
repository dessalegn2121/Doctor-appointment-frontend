import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, User, Users, Calendar, FileText, Pill, Bell, MessageSquare, Settings, Menu, X, } from 'lucide-react';
export const PatientSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const menuItems = [
        { icon: BarChart3, label: 'Dashboard', path: '/patient/dashboard' },
        { icon: User, label: 'Profile', path: '/patient/profile' },
        { icon: Users, label: 'Doctors', path: '/patient/doctors' },
        { icon: Calendar, label: 'Appointments', path: '/patient/appointments' },
        { icon: FileText, label: 'Medical Records', path: '/patient/medical-records' },
        { icon: Pill, label: 'Prescriptions', path: '/patient/prescriptions' },
        { icon: Bell, label: 'Notifications', path: '/patient/notifications' },
        { icon: MessageSquare, label: 'Messages', path: '/patient/messages' },
        { icon: Settings, label: 'Settings', path: '/patient/settings' },
    ];
    const isActive = (path) => location.pathname === path;
    return (<>
      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg">
        {isOpen ? <X size={24}/> : <Menu size={24}/>}
      </button>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Patient Portal</h1>
        </div>

        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (<Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'text-blue-100 hover:bg-blue-700'}`}>
                <Icon size={20}/>
                <span>{item.label}</span>
              </Link>);
        })}
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setIsOpen(false)}/>)}
    </>);
};

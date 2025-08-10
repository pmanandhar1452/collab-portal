import React from 'react';
import { 
  Home, 
  FileText, 
  CreditCard, 
  Clock, 
  History, 
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { User as UserType } from '../../types';
import { StaffView } from '../StaffDashboard';

interface StaffNavigationProps {
  user: UserType;
  activeView: StaffView;
  onViewChange: (view: StaffView) => void;
  onLogout: () => void;
}

export function StaffNavigation({ user, activeView, onViewChange, onLogout }: StaffNavigationProps) {
  const navItems = [
    { id: 'overview' as StaffView, label: 'Overview', icon: Home },
    { id: 'invoices' as StaffView, label: 'Upload Invoice', icon: FileText },
    { id: 'requests' as StaffView, label: 'Payment Request', icon: CreditCard },
    { id: 'timesheet' as StaffView, label: 'Time Tracking', icon: Clock },
    { id: 'submissions' as StaffView, label: 'My Submissions', icon: History },
    { id: 'settings' as StaffView, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Staff Portal</h1>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2563eb&color=fff`}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.department}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeView === item.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
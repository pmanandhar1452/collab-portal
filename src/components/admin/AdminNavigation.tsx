import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Users, 
  BarChart3, 
  FileBarChart, 
  LogOut,
  Target,
  Settings,
  User
} from 'lucide-react';
import { User } from '../../types';
import { AdminView } from '../AdminDashboard';

interface AdminNavigationProps {
  user: User;
  activeView: AdminView;
  onViewChange: (view: AdminView) => void;
  onLogout: () => void;
}

export function AdminNavigation({ user, activeView, onViewChange, onLogout }: AdminNavigationProps) {
  const navItems = [
    { id: 'overview' as AdminView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'payments' as AdminView, label: 'Payments', icon: CreditCard },
    { id: 'staff' as AdminView, label: 'Staff Management', icon: Users },
    { id: 'projects' as AdminView, label: 'Project Setup', icon: Target },
    { id: 'analytics' as AdminView, label: 'Project Analytics', icon: BarChart3 },
    { id: 'reports' as AdminView, label: 'Financial Reports', icon: FileBarChart },
    { id: 'organization' as AdminView, label: 'Organization', icon: Settings },
    { id: 'settings' as AdminView, label: 'User Settings', icon: User },
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=dc2626&color=fff`}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">Administrator</p>
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
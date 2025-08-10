import React from 'react';
import { 
  FileText, 
  CreditCard, 
  Clock, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { User } from '../../types';

interface StaffOverviewProps {
  user: User;
}

export function StaffOverview({ user }: StaffOverviewProps) {
  const stats = [
    {
      label: 'Pending Invoices',
      value: '3',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+2 from last month'
    },
    {
      label: 'Hours This Month',
      value: '156',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+12 hours from last month'
    },
    {
      label: 'Total Earned',
      value: '$12,450',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+8.2% from last month'
    },
    {
      label: 'Completed Projects',
      value: '8',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+2 this quarter'
    }
  ];

  const recentActivity = [
    {
      type: 'invoice',
      title: 'Invoice submitted for Project Alpha',
      amount: '$2,500',
      status: 'pending',
      date: '2 hours ago'
    },
    {
      type: 'timesheet',
      title: 'Timesheet approved for last week',
      amount: '40 hours',
      status: 'approved',
      date: '1 day ago'
    },
    {
      type: 'payment',
      title: 'Payment received via PayPal',
      amount: '$1,800',
      status: 'completed',
      date: '3 days ago'
    },
    {
      type: 'request',
      title: 'Expense request for software license',
      amount: '$299',
      status: 'pending',
      date: '5 days ago'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'approved':
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your work and payments.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${stat.bgColor} ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(activity.status)}
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{activity.amount}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    activity.status === 'completed' || activity.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : activity.status === 'pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <FileText className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Submit Invoice</h3>
          <p className="text-blue-700 text-sm mb-4">Upload and submit your latest invoice for processing</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Upload Invoice
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <Clock className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-green-900 mb-2">Log Time</h3>
          <p className="text-green-700 text-sm mb-4">Track your work hours for accurate billing</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            Track Time
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <CreditCard className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Payment Request</h3>
          <p className="text-purple-700 text-sm mb-4">Request advances, reimbursements, or bonuses</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
            New Request
          </button>
        </div>
      </div>
    </div>
  );
}
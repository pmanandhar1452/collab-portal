import React from 'react';
import { 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3
} from 'lucide-react';

export function AdminOverview() {
  const stats = [
    {
      label: 'Active Staff',
      value: '24',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+2 this month'
    },
    {
      label: 'Pending Payments',
      value: '$45,280',
      icon: DollarSign,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      change: '12 invoices pending'
    },
    {
      label: 'Monthly Spend',
      value: '$128,450',
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+15% from last month'
    },
    {
      label: 'Projects Active',
      value: '18',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '5 completing this month'
    }
  ];

  const recentActivity = [
    {
      type: 'invoice',
      title: 'New invoice submitted by Sarah Johnson',
      amount: '$2,500',
      status: 'pending',
      time: '2 minutes ago'
    },
    {
      type: 'payment',
      title: 'Payment sent via PayPal to Mike Chen',
      amount: '$1,800',
      status: 'completed',
      time: '1 hour ago'
    },
    {
      type: 'request',
      title: 'Expense request approved for Alex Rivera',
      amount: '$450',
      status: 'approved',
      time: '3 hours ago'
    },
    {
      type: 'timesheet',
      title: 'Timesheet submitted by Emma Davis',
      amount: '40 hours',
      status: 'pending',
      time: '5 hours ago'
    }
  ];

  const paymentMethods = [
    { method: 'PayPal', amount: '$45,230', percentage: 38, color: 'bg-blue-500' },
    { method: 'Wise', amount: '$32,150', percentage: 27, color: 'bg-green-500' },
    { method: 'Veem', amount: '$28,670', percentage: 24, color: 'bg-purple-500' },
    { method: 'Bank Transfer', amount: '$13,200', percentage: 11, color: 'bg-gray-500' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of collaborator payments and project management.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{activity.amount}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      activity.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : activity.status === 'approved'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Payment Methods Usage</h2>
          </div>
          <div className="p-6 space-y-6">
            {paymentMethods.map((method, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{method.method}</span>
                  <span className="text-sm font-semibold text-gray-900">{method.amount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${method.color}`}
                    style={{ width: `${method.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  {method.percentage}% of total
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <FileText className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Review Submissions</h3>
          <p className="text-blue-700 text-sm mb-4">12 invoices and requests awaiting approval</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Review Now
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <DollarSign className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-green-900 mb-2">Process Payments</h3>
          <p className="text-green-700 text-sm mb-4">$45,280 in approved payments ready</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            Process Payments
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <BarChart3 className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold text-purple-900 mb-2">View Analytics</h3>
          <p className="text-purple-700 text-sm mb-4">Project performance and spending insights</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}
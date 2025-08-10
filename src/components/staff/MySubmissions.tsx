import React, { useState } from 'react';
import { 
  FileText, 
  CreditCard, 
  Clock, 
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Download
} from 'lucide-react';
import { User } from '../../types';

interface MySubmissionsProps {
  user: User;
}

type SubmissionType = 'invoice' | 'request' | 'timesheet';
type StatusType = 'pending' | 'approved' | 'paid' | 'rejected';

interface Submission {
  id: string;
  type: SubmissionType;
  title: string;
  amount: string;
  status: StatusType;
  date: string;
  dueDate?: string;
}

export function MySubmissions({ user }: MySubmissionsProps) {
  const [activeFilter, setActiveFilter] = useState<SubmissionType | 'all'>('all');
  
  const submissions: Submission[] = [
    {
      id: '1',
      type: 'invoice',
      title: 'Development Services - January 2025',
      amount: '$2,500.00',
      status: 'pending',
      date: '2025-01-10',
      dueDate: '2025-01-25'
    },
    {
      id: '2',
      type: 'request',
      title: 'Software License Reimbursement',
      amount: '$299.00',
      status: 'approved',
      date: '2025-01-08'
    },
    {
      id: '3',
      type: 'invoice',
      title: 'Consulting Services - December 2024',
      amount: '$1,800.00',
      status: 'paid',
      date: '2025-01-05',
      dueDate: '2025-01-20'
    },
    {
      id: '4',
      type: 'request',
      title: 'Travel Expense - Client Meeting',
      amount: '$450.00',
      status: 'rejected',
      date: '2025-01-03'
    },
    {
      id: '5',
      type: 'timesheet',
      title: 'Timesheet - Week 1, January 2025',
      amount: '40 hours',
      status: 'approved',
      date: '2025-01-07'
    }
  ];

  const filteredSubmissions = activeFilter === 'all' 
    ? submissions 
    : submissions.filter(s => s.type === activeFilter);

  const getStatusIcon = (status: StatusType) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: SubmissionType) => {
    switch (type) {
      case 'invoice':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'request':
        return <CreditCard className="w-5 h-5 text-green-600" />;
      case 'timesheet':
        return <Clock className="w-5 h-5 text-purple-600" />;
    }
  };

  const filters = [
    { key: 'all' as const, label: 'All Submissions', count: submissions.length },
    { key: 'invoice' as const, label: 'Invoices', count: submissions.filter(s => s.type === 'invoice').length },
    { key: 'request' as const, label: 'Requests', count: submissions.filter(s => s.type === 'request').length },
    { key: 'timesheet' as const, label: 'Timesheets', count: submissions.filter(s => s.type === 'timesheet').length }
  ];

  const statusSummary = {
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    paid: submissions.filter(s => s.status === 'paid').length,
    rejected: submissions.filter(s => s.status === 'rejected').length
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Submissions</h1>
        <p className="text-gray-600 mt-2">Track the status of your invoices, payment requests, and timesheets.</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-amber-600">{statusSummary.pending}</p>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
            </div>
            <AlertCircle className="w-8 h-8 text-amber-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{statusSummary.approved}</p>
              <p className="text-sm font-medium text-gray-600">Approved</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{statusSummary.paid}</p>
              <p className="text-sm font-medium text-gray-600">Completed</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-red-600">{statusSummary.rejected}</p>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(submission.type)}
                      <span className="text-sm font-medium text-gray-900 capitalize">
                        {submission.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {submission.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {submission.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(submission.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(submission.status)}`}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(submission.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {submission.dueDate ? new Date(submission.dueDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 p-1 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 p-1 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
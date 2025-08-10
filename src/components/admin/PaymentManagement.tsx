import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Send,
  DollarSign,
  Calendar,
  Filter
} from 'lucide-react';

interface PaymentItem {
  id: string;
  type: 'invoice' | 'request';
  staffName: string;
  title: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  submittedAt: string;
  dueDate?: string;
  description: string;
}

export function PaymentManagement() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'paid'>('all');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const paymentItems: PaymentItem[] = [
    {
      id: '1',
      type: 'invoice',
      staffName: 'Sarah Johnson',
      title: 'Development Services - January 2025',
      amount: 2500,
      currency: 'USD',
      status: 'pending',
      submittedAt: '2025-01-10T14:30:00Z',
      dueDate: '2025-01-25',
      description: 'Frontend development and bug fixes for Project Alpha'
    },
    {
      id: '2',
      type: 'request',
      staffName: 'Mike Chen',
      title: 'Software License Reimbursement',
      amount: 299,
      currency: 'USD',
      status: 'approved',
      submittedAt: '2025-01-08T10:15:00Z',
      description: 'Adobe Creative Suite license for design work'
    },
    {
      id: '3',
      type: 'invoice',
      staffName: 'Alex Rivera',
      title: 'Consulting Services - December 2024',
      amount: 1800,
      currency: 'USD',
      status: 'paid',
      submittedAt: '2025-01-05T09:20:00Z',
      dueDate: '2025-01-20',
      description: 'Backend optimization and database design'
    },
    {
      id: '4',
      type: 'request',
      staffName: 'Emma Davis',
      title: 'Conference Travel Expenses',
      amount: 850,
      currency: 'USD',
      status: 'pending',
      submittedAt: '2025-01-09T16:45:00Z',
      description: 'Travel and accommodation for tech conference'
    }
  ];

  const filteredItems = filter === 'all' 
    ? paymentItems 
    : paymentItems.filter(item => item.status === filter);

  const getStatusIcon = (status: string) => {
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

  const getStatusColor = (status: string) => {
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

  const handleApprove = (id: string) => {
    // In a real app, this would update the backend
    console.log('Approving payment:', id);
  };

  const handleReject = (id: string) => {
    // In a real app, this would update the backend
    console.log('Rejecting payment:', id);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for items:`, selectedItems);
  };

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const paymentMethods = [
    { value: 'paypal', label: 'PayPal', icon: '💳' },
    { value: 'wise', label: 'Wise', icon: '🏦' },
    { value: 'veem', label: 'Veem', icon: '💸' },
    { value: 'bank', label: 'Bank Transfer', icon: '🏛️' },
    { value: 'manual', label: 'Manual/Other', icon: '📝' }
  ];

  const summary = {
    total: paymentItems.reduce((sum, item) => sum + item.amount, 0),
    pending: paymentItems.filter(item => item.status === 'pending').reduce((sum, item) => sum + item.amount, 0),
    approved: paymentItems.filter(item => item.status === 'approved').reduce((sum, item) => sum + item.amount, 0)
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
        <p className="text-gray-600 mt-2">Review, approve, and process collaborator payments.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">${summary.total.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-amber-600">${summary.pending.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
            </div>
            <AlertCircle className="w-8 h-8 text-amber-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">${summary.approved.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-600">Ready to Pay</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'approved', 'paid'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === 'all' ? ` (${paymentItems.length})` : ` (${paymentItems.filter(item => item.status === status).length})`}
              </button>
            ))}
          </div>

          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-2">
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Select payment method</option>
                {paymentMethods.map(method => (
                  <option key={method.value} value={method.value}>
                    {method.icon} {method.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleBulkAction('approve')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
              >
                Approve Selected
              </button>
              <button
                onClick={() => handleBulkAction('pay')}
                disabled={!selectedMethod}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
              >
                Pay Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(filteredItems.map(item => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff & Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelection(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.staffName}</p>
                      <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-gray-900">
                      ${item.amount.toLocaleString()} {item.currency}
                    </p>
                    {item.dueDate && (
                      <p className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 p-1 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      {item.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(item.id)}
                            className="text-green-600 hover:text-green-700 p-1 rounded"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleReject(item.id)}
                            className="text-red-600 hover:text-red-700 p-1 rounded"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {item.status === 'approved' && (
                        <button className="text-blue-600 hover:text-blue-700 p-1 rounded">
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method Setup Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900">Payment Platform Integration</h3>
            <p className="text-sm text-blue-800 mt-1">
              Configure your payment platform APIs (PayPal, Wise, Veem) in settings to enable automated payments. 
              Currently showing manual tracking mode.
            </p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
              Configure Integrations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
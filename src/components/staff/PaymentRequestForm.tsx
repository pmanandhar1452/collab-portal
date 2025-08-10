import React, { useState } from 'react';
import { 
  CreditCard, 
  Receipt, 
  DollarSign,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { User } from '../../types';

interface PaymentRequestFormProps {
  user: User;
}

export function PaymentRequestForm({ user }: PaymentRequestFormProps) {
  const [formData, setFormData] = useState({
    type: 'expense' as 'expense' | 'advance' | 'bonus',
    description: '',
    amount: '',
    currency: 'USD',
    receipt: null as File | null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, receipt: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form
    setFormData({
      type: 'expense',
      description: '',
      amount: '',
      currency: 'USD',
      receipt: null
    });

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const requestTypes = [
    { 
      value: 'expense', 
      label: 'Expense Reimbursement',
      description: 'Request reimbursement for business expenses',
      icon: Receipt,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    { 
      value: 'advance', 
      label: 'Payment Advance',
      description: 'Request advance payment on future work',
      icon: CreditCard,
      color: 'text-green-600 bg-green-50 border-green-200'
    },
    { 
      value: 'bonus', 
      label: 'Bonus Request',
      description: 'Request bonus for exceptional work or milestone',
      icon: DollarSign,
      color: 'text-purple-600 bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Request</h1>
        <p className="text-gray-600 mt-2">Submit requests for expenses, advances, or bonuses.</p>
      </div>

      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">Payment request submitted successfully!</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Request Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Request Type *
            </label>
            <div className="space-y-3">
              {requestTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <label
                    key={type.value}
                    className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.type === type.value
                        ? `${type.color} border-2`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      className="sr-only"
                    />
                    <Icon className={`w-6 h-6 mr-3 mt-0.5 ${
                      formData.type === type.value ? type.color.split(' ')[0] : 'text-gray-400'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{type.label}</p>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
              placeholder={
                formData.type === 'expense' 
                  ? "Describe the business expense (e.g., software license, travel, equipment)..."
                  : formData.type === 'advance'
                  ? "Explain the reason for payment advance and timeline..."
                  : "Describe the work or achievement that merits the bonus..."
              }
            />
          </div>

          {/* Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Amount *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  id="amount"
                  required
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                id="currency"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (C$)</option>
              </select>
            </div>
          </div>

          {/* Receipt Upload (for expenses) */}
          {formData.type === 'expense' && (
            <div>
              <label htmlFor="receipt" className="block text-sm font-medium text-gray-700 mb-2">
                Receipt/Documentation
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="receipt"
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                />
                <label htmlFor="receipt" className="cursor-pointer">
                  <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    {formData.receipt ? formData.receipt.name : 'Click to upload receipt'}
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, PNG, JPG (max 10MB)
                  </p>
                </label>
              </div>
            </div>
          )}

          {/* Info Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-amber-800">
                <strong>Processing Time:</strong> {
                  formData.type === 'expense' 
                    ? 'Expense reimbursements are typically processed within 5-7 business days.'
                    : formData.type === 'advance'
                    ? 'Payment advances require approval and may take 3-5 business days.'
                    : 'Bonus requests require management approval and may take 7-10 business days.'
                }
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Submit Request</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
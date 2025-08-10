import React, { useState } from 'react';
import {
  FileBarChart,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Users,
  Clock
} from 'lucide-react';

export function FinancialReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('2025');

  const financialData = {
    monthly: {
      totalSpent: 125480,
      totalHours: 1456,
      avgHourlyRate: 76.5,
      contractors: 24,
      growth: 12.5,
      breakdown: [
        { category: 'Development', amount: 68500, percentage: 54.6, hours: 812 },
        { category: 'Design', amount: 28900, percentage: 23.0, hours: 356 },
        { category: 'Marketing', amount: 18200, percentage: 14.5, hours: 198 },
        { category: 'QA/Testing', amount: 9880, percentage: 7.9, hours: 90 }
      ]
    },
    quarterly: {
      totalSpent: 345200,
      totalHours: 4128,
      avgHourlyRate: 78.2,
      contractors: 32,
      growth: 18.3,
      breakdown: [
        { category: 'Development', amount: 185600, percentage: 53.8, hours: 2240 },
        { category: 'Design', amount: 82400, percentage: 23.9, hours: 1028 },
        { category: 'Marketing', amount: 52800, percentage: 15.3, hours: 584 },
        { category: 'QA/Testing', amount: 24400, percentage: 7.0, hours: 276 }
      ]
    },
    yearly: {
      totalSpent: 1280500,
      totalHours: 16240,
      avgHourlyRate: 79.8,
      contractors: 45,
      growth: 22.1,
      breakdown: [
        { category: 'Development', amount: 704275, percentage: 55.0, hours: 8732 },
        { category: 'Design', amount: 307320, percentage: 24.0, hours: 3898 },
        { category: 'Marketing', amount: 192075, percentage: 15.0, hours: 2436 },
        { category: 'QA/Testing', amount: 76830, percentage: 6.0, hours: 1174 }
      ]
    }
  };

  const monthlyTrends = [
    { month: 'Jul', spent: 98500, hours: 1280, contractors: 22 },
    { month: 'Aug', spent: 108200, hours: 1356, contractors: 23 },
    { month: 'Sep', spent: 115600, hours: 1398, contractors: 24 },
    { month: 'Oct', spent: 118900, hours: 1445, contractors: 24 },
    { month: 'Nov', spent: 123400, hours: 1502, contractors: 25 },
    { month: 'Dec', spent: 125480, hours: 1456, contractors: 24 }
  ];

  const topContractors = [
    { name: 'Sarah Johnson', amount: 12450, hours: 156, rate: 85 },
    { name: 'Alex Rivera', amount: 11680, hours: 168, rate: 80 },
    { name: 'Mike Chen', amount: 9800, hours: 128, rate: 75 },
    { name: 'Emma Davis', amount: 8900, hours: 142, rate: 68 },
    { name: 'James Wilson', amount: 7560, hours: 108, rate: 70 }
  ];

  const currentData = financialData[selectedPeriod as keyof typeof financialData];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-2">Comprehensive financial analysis and spending insights.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex space-x-2">
            {['monthly', 'quarterly', 'yearly'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  selectedPeriod === period
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">${currentData.totalSpent.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+{currentData.growth}% vs last period</span>
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{currentData.totalHours.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <div className="flex items-center mt-2">
                <Clock className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-xs text-blue-600">Across {currentData.contractors} contractors</span>
              </div>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">${currentData.avgHourlyRate}</p>
              <p className="text-sm font-medium text-gray-600">Avg Hourly Rate</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+2.3% vs last period</span>
              </div>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{currentData.contractors}</p>
              <p className="text-sm font-medium text-gray-600">Active Contractors</p>
              <div className="flex items-center mt-2">
                <Users className="w-4 h-4 text-amber-500 mr-1" />
                <span className="text-xs text-amber-600">3 new this period</span>
              </div>
            </div>
            <Users className="w-8 h-8 text-amber-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Spending by Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Spending by Category</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {currentData.breakdown.map((item, index) => {
              const colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-amber-600'];
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${colors[index]}`}></div>
                      <span className="text-sm font-medium text-gray-900">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">${item.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{item.hours}h</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${colors[index]}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    {item.percentage}% of total
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">6-Month Trends</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {monthlyTrends.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">{data.month} 2024</span>
                  <span className="text-sm font-semibold text-gray-900">${data.spent.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(data.spent / Math.max(...monthlyTrends.map(d => d.spent))) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{data.hours}h</span>
                  <span>{data.contractors} contractors</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Contractors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Top Contractors by Earnings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contractor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Earned
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours Worked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hourly Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topContractors.map((contractor, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-semibold text-sm">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{contractor.name}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-gray-900">${contractor.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{contractor.hours}h</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">${contractor.rate}/hr</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${Math.min((contractor.amount / 15000) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.round((contractor.amount / 15000) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <FileBarChart className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Report Summary</h3>
            <div className="mt-3 space-y-2 text-sm text-blue-800">
              <p>• Total spending increased by {currentData.growth}% compared to the previous period</p>
              <p>• Development category accounts for the largest portion at {currentData.breakdown[0].percentage}% of total spend</p>
              <p>• Average hourly rate is ${currentData.avgHourlyRate}, showing healthy market rates</p>
              <p>• {currentData.contractors} active collaborators contributed {currentData.totalHours.toLocaleString()} hours of work</p>
            </div>
            <div className="mt-4 flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
                Download Detailed Report
              </button>
              <button className="bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 text-sm font-medium">
                Schedule Email Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
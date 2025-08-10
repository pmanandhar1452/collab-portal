import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Target,
  AlertTriangle
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  client: string;
  budget: number;
  spent: number;
  hours: number;
  progress: number;
  status: 'active' | 'completed' | 'on-hold';
  team: number;
  startDate: string;
  endDate: string;
}

export function ProjectAnalytics() {
  const projects: Project[] = [
    {
      id: '1',
      name: 'E-commerce Platform',
      client: 'TechCorp Inc.',
      budget: 45000,
      spent: 28500,
      hours: 380,
      progress: 65,
      status: 'active',
      team: 5,
      startDate: '2024-11-01',
      endDate: '2025-02-15'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      client: 'StartupXYZ',
      budget: 32000,
      spent: 18900,
      hours: 245,
      progress: 45,
      status: 'active',
      team: 4,
      startDate: '2024-12-01',
      endDate: '2025-03-30'
    },
    {
      id: '3',
      name: 'Website Redesign',
      client: 'Fashion Brand Co.',
      budget: 18000,
      spent: 17800,
      hours: 220,
      progress: 95,
      status: 'active',
      team: 3,
      startDate: '2024-10-15',
      endDate: '2025-01-20'
    },
    {
      id: '4',
      name: 'Data Analytics Dashboard',
      client: 'FinTech Solutions',
      budget: 38000,
      spent: 38000,
      hours: 456,
      progress: 100,
      status: 'completed',
      team: 6,
      startDate: '2024-08-01',
      endDate: '2024-12-15'
    },
    {
      id: '5',
      name: 'CRM Integration',
      client: 'SalesForce Pro',
      budget: 25000,
      spent: 12500,
      hours: 156,
      progress: 30,
      status: 'on-hold',
      team: 3,
      startDate: '2024-11-20',
      endDate: '2025-02-28'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage > 90) return { color: 'text-red-600', bg: 'bg-red-100', status: 'Over Budget Risk' };
    if (percentage > 75) return { color: 'text-amber-600', bg: 'bg-amber-100', status: 'Budget Watch' };
    return { color: 'text-green-600', bg: 'bg-green-100', status: 'On Track' };
  };

  const totalStats = {
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
    totalHours: projects.reduce((sum, p) => sum + p.hours, 0),
    activeProjects: projects.filter(p => p.status === 'active').length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    onHoldProjects: projects.filter(p => p.status === 'on-hold').length
  };

  const monthlyData = [
    { month: 'Aug', hours: 180, budget: 15000, spent: 12500 },
    { month: 'Sep', hours: 220, budget: 18000, spent: 16800 },
    { month: 'Oct', hours: 280, budget: 22000, spent: 19500 },
    { month: 'Nov', hours: 320, budget: 28000, spent: 25200 },
    { month: 'Dec', hours: 380, budget: 35000, spent: 31800 },
    { month: 'Jan', hours: 340, budget: 30000, spent: 28500 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Project Analytics</h1>
        <p className="text-gray-600 mt-2">Track project performance, budgets, and resource allocation.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalStats.activeProjects}</p>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">${totalStats.totalBudget.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">${totalStats.totalSpent.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-amber-600">{totalStats.totalHours}</p>
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Performance</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">{data.month} 2024/25</span>
                  <span className="text-sm font-semibold text-gray-900">{data.hours}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(data.spent / data.budget) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Budget: ${data.budget.toLocaleString()}</span>
                  <span>Spent: ${data.spent.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Status Distribution</h3>
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(totalStats.activeProjects / projects.length) * 251.2} 251.2`}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(totalStats.completedProjects / projects.length) * 251.2} 251.2`}
                    strokeDashoffset={`-${(totalStats.activeProjects / projects.length) * 251.2}`}
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{totalStats.activeProjects}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Completed</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{totalStats.completedProjects}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">On Hold</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{totalStats.onHoldProjects}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project & Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget & Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours & Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => {
                const budgetStatus = getBudgetStatus(project.spent, project.budget);
                return (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{project.name}</p>
                        <p className="text-xs text-gray-500">{project.client}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                        </p>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${budgetStatus.bg} ${budgetStatus.color}`}>
                          {budgetStatus.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{project.hours}h logged</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          {project.team} team members
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ').charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-xs text-gray-900">
                          {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-amber-900">Budget Alerts</h3>
            <p className="text-sm text-amber-800 mt-1">
              2 projects are approaching their budget limits. Consider reviewing resource allocation for 
              "E-commerce Platform" and "Website Redesign" projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  Users,
  Calendar,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Building2
} from 'lucide-react';
import { Organization } from '../../types';

interface Project {
  id: string;
  organizationId: string;
  name: string;
  client: string;
  description: string;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'on-hold' | 'planning';
  teamMembers: string[];
  hourlyBudget: number;
  hoursSpent: number;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

export function ProjectSetup() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [organizationFilter, setOrganizationFilter] = useState('all');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [newProject, setNewProject] = useState({
    name: '',
    organizationId: '',
    client: '',
    description: '',
    budget: '',
    startDate: '',
    endDate: '',
    status: 'planning' as const,
    teamMembers: [] as string[],
    hourlyBudget: '',
    priority: 'medium' as const,
    tags: [] as string[]
  });

  // Mock organizations data
  const [organizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'YAA Collaborator Portal',
      email: 'admin@yaa.ai',
      timezone: 'America/New_York',
      currency: 'USD',
      fiscalYearStart: '01-01',
      paymentTerms: 30,
      invoicePrefix: 'YAA',
      taxRate: 8.5,
      paymentMethods: {
        paypal: { enabled: true, email: '', clientId: '', clientSecret: '' },
        wise: { enabled: false, apiKey: '', profileId: '' },
        veem: { enabled: false, apiKey: '', accountId: '' }
      },
      notifications: {
        emailNotifications: true,
        invoiceReminders: true,
        paymentConfirmations: true,
        weeklyReports: false
      },
      branding: {
        primaryColor: '#2563eb',
        secondaryColor: '#64748b',
        logoUrl: '',
        favicon: 'https://yaa.ai/favicon.ico'
      },
      createdAt: '2024-01-15',
      isActive: true
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      email: 'admin@techsolutions.com',
      timezone: 'America/Los_Angeles',
      currency: 'USD',
      fiscalYearStart: '04-01',
      paymentTerms: 15,
      invoicePrefix: 'TSI',
      taxRate: 9.25,
      paymentMethods: {
        paypal: { enabled: false, email: '', clientId: '', clientSecret: '' },
        wise: { enabled: true, apiKey: '', profileId: '' },
        veem: { enabled: false, apiKey: '', accountId: '' }
      },
      notifications: {
        emailNotifications: true,
        invoiceReminders: false,
        paymentConfirmations: true,
        weeklyReports: true
      },
      branding: {
        primaryColor: '#059669',
        secondaryColor: '#374151',
        logoUrl: '',
        favicon: ''
      },
      createdAt: '2024-03-22',
      isActive: true
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      organizationId: '1',
      name: 'E-commerce Platform',
      client: 'TechCorp Inc.',
      description: 'Complete e-commerce solution with payment integration',
      budget: 45000,
      spent: 28500,
      startDate: '2024-11-01',
      endDate: '2025-02-15',
      status: 'active',
      teamMembers: ['Sarah Johnson', 'Mike Chen', 'Alex Rivera'],
      hourlyBudget: 600,
      hoursSpent: 380,
      priority: 'high',
      tags: ['web', 'ecommerce', 'react']
    },
    {
      id: '2',
      organizationId: '1',
      name: 'Mobile App Development',
      client: 'StartupXYZ',
      description: 'Cross-platform mobile application',
      budget: 32000,
      spent: 18900,
      startDate: '2024-12-01',
      endDate: '2025-03-30',
      status: 'active',
      teamMembers: ['Emma Davis', 'James Wilson'],
      hourlyBudget: 400,
      hoursSpent: 245,
      priority: 'medium',
      tags: ['mobile', 'react-native', 'ios', 'android']
    },
    {
      id: '3',
      organizationId: '2',
      name: 'Website Redesign',
      client: 'Fashion Brand Co.',
      description: 'Complete website redesign and branding',
      budget: 18000,
      spent: 17800,
      startDate: '2024-10-15',
      endDate: '2025-01-20',
      status: 'completed',
      teamMembers: ['Mike Chen'],
      hourlyBudget: 240,
      hoursSpent: 220,
      priority: 'low',
      tags: ['design', 'branding', 'wordpress']
    }
  ]);

  const availableTeamMembers = [
    'Sarah Johnson',
    'Mike Chen', 
    'Alex Rivera',
    'Emma Davis',
    'James Wilson'
  ];

  const handleCreateProject = () => {
    if (newProject.name && newProject.client && newProject.budget && newProject.organizationId) {
      const project: Project = {
        id: Date.now().toString(),
        organizationId: newProject.organizationId,
        name: newProject.name,
        client: newProject.client,
        description: newProject.description,
        budget: parseFloat(newProject.budget),
        spent: 0,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        status: newProject.status,
        teamMembers: newProject.teamMembers,
        hourlyBudget: parseFloat(newProject.hourlyBudget) || 0,
        hoursSpent: 0,
        priority: newProject.priority,
        tags: newProject.tags
      };

      setProjects([...projects, project]);
      setNewProject({
        name: '',
        organizationId: '',
        client: '',
        description: '',
        budget: '',
        startDate: '',
        endDate: '',
        status: 'planning',
        teamMembers: [],
        hourlyBudget: '',
        priority: 'medium',
        tags: []
      });
      setShowCreateForm(false);
    }
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const getOrganizationName = (organizationId: string) => {
    const org = organizations.find(o => o.id === organizationId);
    return org ? org.name : 'Unknown Organization';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-amber-100 text-amber-800';
      case 'planning':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesOrganization = organizationFilter === 'all' || project.organizationId === organizationFilter;
    return matchesSearch && matchesStatus && matchesOrganization;
  });

  const projectStats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0)
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Setup</h1>
          <p className="text-gray-600 mt-2">Create and manage projects, budgets, and team assignments.</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{projectStats.total}</p>
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{projectStats.active}</p>
              <p className="text-sm font-medium text-gray-600">Active</p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{projectStats.completed}</p>
              <p className="text-sm font-medium text-gray-600">Completed</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">${projectStats.totalBudget.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-amber-600">${projectStats.totalSpent.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
            </div>
            <DollarSign className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-3">
            <select
              value={organizationFilter}
              onChange={(e) => setOrganizationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="all">All Organizations</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Create Project Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create New Project</h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization *
              </label>
              <select
                value={newProject.organizationId}
                onChange={(e) => setNewProject({ ...newProject, organizationId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Select organization</option>
                {organizations.map(org => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter project name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client *
              </label>
              <input
                type="text"
                value={newProject.client}
                onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter client name"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                placeholder="Project description..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget *
              </label>
              <input
                type="number"
                value={newProject.budget}
                onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hourly Budget
              </label>
              <input
                type="number"
                value={newProject.hourlyBudget}
                onChange={(e) => setNewProject({ ...newProject, hourlyBudget: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={newProject.startDate}
                onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={newProject.endDate}
                onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={newProject.priority}
                onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProject}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project & Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget & Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {getOrganizationName(project.organizationId)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{project.name}</p>
                      <p className="text-xs text-gray-500">{project.client}</p>
                      {project.description && (
                        <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min((project.spent / project.budget) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round((project.spent / project.budget) * 100)}% used
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-xs text-gray-900">
                        {new Date(project.startDate).toLocaleDateString()} - 
                        {new Date(project.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{project.teamMembers.length} members</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {project.hoursSpent}h / {project.hourlyBudget}h
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ').charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}>
                        {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingProject(project)}
                        className="text-blue-600 hover:text-blue-700 p-1 rounded"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 hover:text-red-700 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
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
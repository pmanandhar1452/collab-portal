import React, { useState } from 'react';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Settings,
  Users,
  Shield,
  Bell,
  Palette,
  Save,
  Upload,
  Eye,
  EyeOff,
  Plus,
  Edit3,
  Trash2,
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Organization } from '../../types';

export function OrganizationSetup() {
  const [activeTab, setActiveTab] = useState('list');
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'YAA Collaborator Portal',
      email: 'admin@yaa.ai',
      phone: '+1 (555) 123-4567',
      address: '123 Business St, Suite 100, City, State 12345',
      website: 'https://yaa.ai',
      logo: '',
      timezone: 'America/New_York',
      currency: 'USD',
      fiscalYearStart: '01-01',
      paymentTerms: 30,
      invoicePrefix: 'YAA',
      taxRate: 8.5,
      registrationNumber: 'REG123456789',
      bankingDetails: {
        accountName: 'YAA Collaborator Portal',
        accountNumber: '****1234',
        routingNumber: '****5678',
        bankName: 'Business Bank'
      },
      paymentMethods: {
        paypal: { enabled: true, email: 'payments@yaa.ai', clientId: '****', clientSecret: '****' },
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
      phone: '+1 (555) 987-6543',
      address: '456 Tech Ave, Innovation District, City, State 54321',
      website: 'https://techsolutions.com',
      timezone: 'America/Los_Angeles',
      currency: 'USD',
      fiscalYearStart: '04-01',
      paymentTerms: 15,
      invoicePrefix: 'TSI',
      taxRate: 9.25,
      registrationNumber: 'REG987654321',
      paymentMethods: {
        paypal: { enabled: false, email: '', clientId: '', clientSecret: '' },
        wise: { enabled: true, apiKey: '****', profileId: '****' },
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

  const [newOrg, setNewOrg] = useState<Partial<Organization>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    timezone: 'America/New_York',
    currency: 'USD',
    fiscalYearStart: '01-01',
    paymentTerms: 30,
    invoicePrefix: '',
    taxRate: 0,
    registrationNumber: '',
    paymentMethods: {
      paypal: { enabled: false, email: '', clientId: '', clientSecret: '' },
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
      favicon: ''
    },
    isActive: true
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const handleCreateOrganization = () => {
    if (newOrg.name && newOrg.email) {
      const organization: Organization = {
        id: Date.now().toString(),
        ...newOrg as Organization,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setOrganizations([...organizations, organization]);
      
      // Auto-create "General Default" project for the new organization
      // Dispatch event to create default project
      const organizationCreatedEvent = new CustomEvent('organizationCreated', {
        detail: {
          organizationId: organization.id,
          organizationName: organization.name
        }
      });
      window.dispatchEvent(organizationCreatedEvent);
      
      setNewOrg({
        name: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        timezone: 'America/New_York',
        currency: 'USD',
        fiscalYearStart: '01-01',
        paymentTerms: 30,
        invoicePrefix: '',
        taxRate: 0,
        registrationNumber: '',
        paymentMethods: {
          paypal: { enabled: false, email: '', clientId: '', clientSecret: '' },
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
          favicon: ''
        },
        isActive: true
      });
      setShowCreateForm(false);
    }
  };

  const handleDeleteOrganization = (id: string) => {
    setOrganizations(organizations.filter(org => org.id !== id));
  };

  const toggleSecret = (field: string) => {
    setShowSecrets(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'list', label: 'Organizations', icon: Building2 },
    { id: 'create', label: 'Create New', icon: Plus }
  ];

  const timezones = [
    'America/New_York',
    'America/Chicago', 
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organization Management</h1>
          <p className="text-gray-600 mt-2">Manage multiple organizations and their settings.</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Organization</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{organizations.length}</p>
              <p className="text-sm font-medium text-gray-600">Total Organizations</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{organizations.filter(org => org.isActive).length}</p>
              <p className="text-sm font-medium text-gray-600">Active</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">{new Set(organizations.map(org => org.currency)).size}</p>
              <p className="text-sm font-medium text-gray-600">Currencies</p>
            </div>
            <Globe className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-amber-600">
                {organizations.filter(org => 
                  org.paymentMethods.paypal.enabled || 
                  org.paymentMethods.wise.enabled || 
                  org.paymentMethods.veem.enabled
                ).length}
              </p>
              <p className="text-sm font-medium text-gray-600">Payment Enabled</p>
            </div>
            <CreditCard className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Create Organization Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create New Organization</h2>
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
                Organization Name *
              </label>
              <input
                type="text"
                value={newOrg.name || ''}
                onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter organization name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={newOrg.email || ''}
                onChange={(e) => setNewOrg({ ...newOrg, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={newOrg.phone || ''}
                onChange={(e) => setNewOrg({ ...newOrg, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={newOrg.website || ''}
                onChange={(e) => setNewOrg({ ...newOrg, website: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={newOrg.currency || 'USD'}
                onChange={(e) => setNewOrg({ ...newOrg, currency: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invoice Prefix
              </label>
              <input
                type="text"
                value={newOrg.invoicePrefix || ''}
                onChange={(e) => setNewOrg({ ...newOrg, invoicePrefix: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="e.g., INV, ORG"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                rows={3}
                value={newOrg.address || ''}
                onChange={(e) => setNewOrg({ ...newOrg, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                placeholder="Enter full address"
              />
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
              onClick={handleCreateOrganization}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Organization
            </button>
          </div>
        </div>
      )}

      {/* Organizations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Settings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Methods
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrganizations.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{org.name}</p>
                      <p className="text-xs text-gray-500">Created: {new Date(org.createdAt).toLocaleDateString()}</p>
                      {org.website && (
                        <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800">
                          {org.website}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="w-3 h-3 mr-1 text-gray-400" />
                        {org.email}
                      </div>
                      {org.phone && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-3 h-3 mr-1 text-gray-400" />
                          {org.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-900">{org.currency} • {org.invoicePrefix}</p>
                      <p className="text-xs text-gray-500">{org.timezone}</p>
                      <p className="text-xs text-gray-500">{org.paymentTerms} day terms</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-1">
                      {org.paymentMethods.paypal.enabled && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          PayPal
                        </span>
                      )}
                      {org.paymentMethods.wise.enabled && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Wise
                        </span>
                      )}
                      {org.paymentMethods.veem.enabled && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                          Veem
                        </span>
                      )}
                      {!org.paymentMethods.paypal.enabled && !org.paymentMethods.wise.enabled && !org.paymentMethods.veem.enabled && (
                        <span className="text-xs text-gray-500">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      org.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {org.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingOrg(org)}
                        className="text-blue-600 hover:text-blue-700 p-1 rounded"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteOrganization(org.id)}
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
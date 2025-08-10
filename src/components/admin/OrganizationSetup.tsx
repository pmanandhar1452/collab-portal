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
  AlertCircle,
  Monitor
} from 'lucide-react';
import { Organization } from '../../types';
import { useOrganizations } from '../../hooks/useOrganizations';

export function OrganizationSetup() {
  const [activeTab, setActiveTab] = useState('list');
  const [globalSettings, setGlobalSettings] = useState({
    favicon: 'https://yaa.ai/favicon.ico',
    siteName: 'Collaborator Portal'
  });
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { 
    organizations, 
    loading, 
    error: dbError, 
    createOrganization, 
    updateOrganization, 
    deleteOrganization 
  } = useOrganizations();

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
      logoUrl: ''
    },
    isActive: true
  });

  const handleSave = async () => {
    setIsSaving(true);
    
    // Update the favicon in the HTML head
    if (globalSettings.favicon) {
      // Update existing favicon links
      const faviconLinks = document.querySelectorAll('link[rel*="icon"]');
      faviconLinks.forEach(link => {
        (link as HTMLLinkElement).href = globalSettings.favicon;
      });
      
      // If no favicon links exist, create them
      if (faviconLinks.length === 0) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/x-icon';
        link.href = globalSettings.favicon;
        document.head.appendChild(link);
        
        const shortcutLink = document.createElement('link');
        shortcutLink.rel = 'shortcut icon';
        shortcutLink.type = 'image/x-icon';
        shortcutLink.href = globalSettings.favicon;
        document.head.appendChild(shortcutLink);
      }
      
      // Force browser to reload favicon by adding timestamp
      const timestamp = new Date().getTime();
      const allFaviconLinks = document.querySelectorAll('link[rel*="icon"]');
      allFaviconLinks.forEach(link => {
        const currentHref = (link as HTMLLinkElement).href;
        const separator = currentHref.includes('?') ? '&' : '?';
        (link as HTMLLinkElement).href = `${globalSettings.favicon}${separator}t=${timestamp}`;
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const handleCreateOrganization = async () => {
    if (newOrg.name && newOrg.email) {
      try {
        const organization = await createOrganization(newOrg);
        
        // Auto-create "General Default" project for the new organization
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
            logoUrl: ''
          },
          isActive: true
        });
        setShowCreateForm(false);
      } catch (error) {
        console.error('Failed to create organization:', error);
      }
    }
  };

  const handleDeleteOrganization = async (id: string) => {
    try {
      await deleteOrganization(id);
    } catch (error) {
      console.error('Failed to delete organization:', error);
    }
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
    { id: 'create', label: 'Create New', icon: Plus },
    { id: 'global', label: 'Global Settings', icon: Monitor }
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
        <div className="flex space-x-3">
          <button
            onClick={() => setActiveTab('global')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium flex items-center space-x-2"
          >
            <Monitor className="w-5 h-5" />
            <span>Global Settings</span>
          </button>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Organization</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Stats Cards */}
      {activeTab === 'list' && (
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
      )}

      {/* Search */}
      {activeTab === 'list' && (
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
      )}

      {/* Global Settings Tab */}
      {activeTab === 'global' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Global Portal Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={globalSettings.siteName}
                  onChange={(e) => setGlobalSettings({ ...globalSettings, siteName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter site name"
                />
                <p className="text-xs text-gray-500 mt-1">This appears in the browser tab and page titles</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Favicon
                </label>
                <div className="space-y-4">
                  {globalSettings.favicon ? (
                    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={globalSettings.favicon}
                        alt="Current favicon"
                        className="w-8 h-8"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Current Favicon</p>
                        <p className="text-xs text-gray-500 break-all">{globalSettings.favicon}</p>
                      </div>
                      <button
                        onClick={() => setGlobalSettings({ ...globalSettings, favicon: '' })}
                        className="text-red-600 hover:text-red-700 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="favicon-upload"
                        accept=".ico,.png,.jpg,.jpeg,.svg"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // In production, this would upload to cloud storage
                            const url = URL.createObjectURL(file);
                            setGlobalSettings({ ...globalSettings, favicon: url });
                          }
                        }}
                      />
                      <label htmlFor="favicon-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Click to upload favicon</p>
                        <p className="text-sm text-gray-500">
                          ICO, PNG, JPG, SVG (recommended: 32x32px)
                        </p>
                      </label>
                    </div>
                  )}
                  <input
                    type="url"
                    value={globalSettings.favicon}
                    onChange={(e) => setGlobalSettings({ ...globalSettings, favicon: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Or enter favicon URL directly"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  The favicon appears in browser tabs and bookmarks for the entire portal
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Global Settings</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Organization Form */}
      {showCreateForm && activeTab === 'list' && (
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
      {activeTab === 'list' && (
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
      )}
    </div>
  );
}
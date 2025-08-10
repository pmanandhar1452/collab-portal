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
  EyeOff
} from 'lucide-react';

interface OrganizationSettings {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyWebsite: string;
  companyLogo: string;
  timezone: string;
  currency: string;
  fiscalYearStart: string;
  paymentTerms: number;
  invoicePrefix: string;
  taxRate: number;
  companyRegistration: string;
  bankingDetails: {
    accountName: string;
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
  paymentMethods: {
    paypal: { enabled: boolean; email: string; clientId: string; clientSecret: string };
    wise: { enabled: boolean; apiKey: string; profileId: string };
    veem: { enabled: boolean; apiKey: string; accountId: string };
  };
  notifications: {
    emailNotifications: boolean;
    invoiceReminders: boolean;
    paymentConfirmations: boolean;
    weeklyReports: boolean;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    favicon: string;
  };
}

export function OrganizationSetup() {
  const [activeTab, setActiveTab] = useState('general');
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState<OrganizationSettings>({
    companyName: 'YAA Collaborator Portal',
    companyEmail: 'admin@yaa.ai',
    companyPhone: '+1 (555) 123-4567',
    companyAddress: '123 Business St, Suite 100, City, State 12345',
    companyWebsite: 'https://yaa.ai',
    companyLogo: '',
    timezone: 'America/New_York',
    currency: 'USD',
    fiscalYearStart: '01-01',
    paymentTerms: 30,
    invoicePrefix: 'INV',
    taxRate: 8.5,
    companyRegistration: 'REG123456789',
    bankingDetails: {
      accountName: 'YAA Collaborator Portal',
      accountNumber: '****1234',
      routingNumber: '****5678',
      bankName: 'Business Bank'
    },
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
      favicon: 'https://yaa.ai/favicon.ico'
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    // Show success message
  };

  const toggleSecret = (field: string) => {
    setShowSecrets(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield }
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Organization Setup</h1>
        <p className="text-gray-600 mt-2">Configure your organization settings, payment methods, and branding.</p>
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

        <div className="p-8">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">General Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Email *
                  </label>
                  <input
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={settings.companyPhone}
                    onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={settings.companyWebsite}
                    onChange={(e) => setSettings({ ...settings, companyWebsite: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    rows={3}
                    value={settings.companyAddress}
                    onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    {timezones.map(tz => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Currency
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
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
                    Payment Terms (Days)
                  </label>
                  <input
                    type="number"
                    value={settings.paymentTerms}
                    onChange={(e) => setSettings({ ...settings, paymentTerms: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Prefix
                  </label>
                  <input
                    type="text"
                    value={settings.invoicePrefix}
                    onChange={(e) => setSettings({ ...settings, invoicePrefix: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Methods */}
          {activeTab === 'payments' && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-900">Payment Method Configuration</h2>
              
              {/* PayPal */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">PayPal</h3>
                      <p className="text-sm text-gray-500">Configure PayPal integration</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.paymentMethods.paypal.enabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        paymentMethods: {
                          ...settings.paymentMethods,
                          paypal: { ...settings.paymentMethods.paypal, enabled: e.target.checked }
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                {settings.paymentMethods.paypal.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PayPal Email
                      </label>
                      <input
                        type="email"
                        value={settings.paymentMethods.paypal.email}
                        onChange={(e) => setSettings({
                          ...settings,
                          paymentMethods: {
                            ...settings.paymentMethods,
                            paypal: { ...settings.paymentMethods.paypal, email: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Client ID
                      </label>
                      <div className="relative">
                        <input
                          type={showSecrets.paypalClientId ? 'text' : 'password'}
                          value={settings.paymentMethods.paypal.clientId}
                          onChange={(e) => setSettings({
                            ...settings,
                            paymentMethods: {
                              ...settings.paymentMethods,
                              paypal: { ...settings.paymentMethods.paypal, clientId: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => toggleSecret('paypalClientId')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showSecrets.paypalClientId ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Wise */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Wise</h3>
                      <p className="text-sm text-gray-500">Configure Wise integration</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.paymentMethods.wise.enabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        paymentMethods: {
                          ...settings.paymentMethods,
                          wise: { ...settings.paymentMethods.wise, enabled: e.target.checked }
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                {settings.paymentMethods.wise.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showSecrets.wiseApiKey ? 'text' : 'password'}
                          value={settings.paymentMethods.wise.apiKey}
                          onChange={(e) => setSettings({
                            ...settings,
                            paymentMethods: {
                              ...settings.paymentMethods,
                              wise: { ...settings.paymentMethods.wise, apiKey: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => toggleSecret('wiseApiKey')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showSecrets.wiseApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile ID
                      </label>
                      <input
                        type="text"
                        value={settings.paymentMethods.wise.profileId}
                        onChange={(e) => setSettings({
                          ...settings,
                          paymentMethods: {
                            ...settings.paymentMethods,
                            wise: { ...settings.paymentMethods.wise, profileId: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Veem */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Veem</h3>
                      <p className="text-sm text-gray-500">Configure Veem integration</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.paymentMethods.veem.enabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        paymentMethods: {
                          ...settings.paymentMethods,
                          veem: { ...settings.paymentMethods.veem, enabled: e.target.checked }
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                {settings.paymentMethods.veem.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showSecrets.veemApiKey ? 'text' : 'password'}
                          value={settings.paymentMethods.veem.apiKey}
                          onChange={(e) => setSettings({
                            ...settings,
                            paymentMethods: {
                              ...settings.paymentMethods,
                              veem: { ...settings.paymentMethods.veem, apiKey: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => toggleSecret('veemApiKey')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showSecrets.veemApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account ID
                      </label>
                      <input
                        type="text"
                        value={settings.paymentMethods.veem.accountId}
                        onChange={(e) => setSettings({
                          ...settings,
                          paymentMethods: {
                            ...settings.paymentMethods,
                            veem: { ...settings.paymentMethods.veem, accountId: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
              
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {key === 'emailNotifications' && 'Receive email notifications for important events'}
                        {key === 'invoiceReminders' && 'Send reminders for overdue invoices'}
                        {key === 'paymentConfirmations' && 'Confirm when payments are processed'}
                        {key === 'weeklyReports' && 'Receive weekly summary reports'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [key]: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Branding */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Branding & Appearance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.branding.primaryColor}
                      onChange={(e) => setSettings({
                        ...settings,
                        branding: { ...settings.branding, primaryColor: e.target.value }
                      })}
                      className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.branding.primaryColor}
                      onChange={(e) => setSettings({
                        ...settings,
                        branding: { ...settings.branding, primaryColor: e.target.value }
                      })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.branding.secondaryColor}
                      onChange={(e) => setSettings({
                        ...settings,
                        branding: { ...settings.branding, secondaryColor: e.target.value }
                      })}
                      className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.branding.secondaryColor}
                      onChange={(e) => setSettings({
                        ...settings,
                        branding: { ...settings.branding, secondaryColor: e.target.value }
                      })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={settings.branding.logoUrl}
                    onChange={(e) => setSettings({
                      ...settings,
                      branding: { ...settings.branding, logoUrl: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon URL
                  </label>
                  <input
                    type="url"
                    value={settings.branding.favicon}
                    onChange={(e) => setSettings({
                      ...settings,
                      branding: { ...settings.branding, favicon: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900">Security Configuration</h3>
                    <p className="text-sm text-amber-800 mt-2">
                      Security settings will be available in a future update. This will include:
                    </p>
                    <ul className="list-disc list-inside text-sm text-amber-800 mt-2 space-y-1">
                      <li>Two-factor authentication setup</li>
                      <li>API key management</li>
                      <li>Session timeout configuration</li>
                      <li>IP whitelist management</li>
                      <li>Audit log settings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 px-8 py-4">
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Settings</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
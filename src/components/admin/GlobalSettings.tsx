import React, { useState } from 'react';
import {
  Monitor,
  Upload,
  Save,
  Trash2,
  Globe,
  Palette,
  Settings,
  AlertCircle
} from 'lucide-react';

export function GlobalSettings() {
  const [globalSettings, setGlobalSettings] = useState({
    favicon: 'https://yaa.ai/favicon.ico',
    siteName: 'Collaborator Portal',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    logoUrl: '',
    companyName: 'YAA Collaborator Portal',
    supportEmail: 'support@yaa.ai',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

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
    
    // Update document title
    if (globalSettings.siteName) {
      document.title = globalSettings.siteName;
    }
    
    // In a real app, this would save to the database
    localStorage.setItem('globalSettings', JSON.stringify(globalSettings));
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

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

  const dateFormats = [
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD',
    'DD-MM-YYYY'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Global Settings</h1>
        <p className="text-gray-600 mt-2">Configure global portal settings and branding.</p>
      </div>

      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <Settings className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">Global settings saved successfully!</p>
        </div>
      )}

      {/* Site Configuration */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Monitor className="w-6 h-6" />
          <span>Site Configuration</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name *
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
              Company Name
            </label>
            <input
              type="text"
              value={globalSettings.companyName}
              onChange={(e) => setGlobalSettings({ ...globalSettings, companyName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Support Email
            </label>
            <input
              type="email"
              value={globalSettings.supportEmail}
              onChange={(e) => setGlobalSettings({ ...globalSettings, supportEmail: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="support@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Timezone
            </label>
            <select
              value={globalSettings.timezone}
              onChange={(e) => setGlobalSettings({ ...globalSettings, timezone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {timezones.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Format
            </label>
            <select
              value={globalSettings.dateFormat}
              onChange={(e) => setGlobalSettings({ ...globalSettings, dateFormat: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {dateFormats.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Currency
            </label>
            <select
              value={globalSettings.currency}
              onChange={(e) => setGlobalSettings({ ...globalSettings, currency: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Branding & Assets */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Palette className="w-6 h-6" />
          <span>Branding & Assets</span>
        </h2>
        
        <div className="space-y-6">
          {/* Favicon */}
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

          {/* Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Logo
            </label>
            <div className="space-y-4">
              {globalSettings.logoUrl ? (
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={globalSettings.logoUrl}
                    alt="Company logo"
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Current Logo</p>
                    <p className="text-xs text-gray-500 break-all">{globalSettings.logoUrl}</p>
                  </div>
                  <button
                    onClick={() => setGlobalSettings({ ...globalSettings, logoUrl: '' })}
                    className="text-red-600 hover:text-red-700 p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="logo-upload"
                    accept=".png,.jpg,.jpeg,.svg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setGlobalSettings({ ...globalSettings, logoUrl: url });
                      }
                    }}
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload company logo</p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, SVG (recommended: 200x60px)
                    </p>
                  </label>
                </div>
              )}
              <input
                type="url"
                value={globalSettings.logoUrl}
                onChange={(e) => setGlobalSettings({ ...globalSettings, logoUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Or enter logo URL directly"
              />
            </div>
          </div>

          {/* Color Scheme */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex space-x-3">
                <input
                  type="color"
                  value={globalSettings.primaryColor}
                  onChange={(e) => setGlobalSettings({ ...globalSettings, primaryColor: e.target.value })}
                  className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={globalSettings.primaryColor}
                  onChange={(e) => setGlobalSettings({ ...globalSettings, primaryColor: e.target.value })}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="#2563eb"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <div className="flex space-x-3">
                <input
                  type="color"
                  value={globalSettings.secondaryColor}
                  onChange={(e) => setGlobalSettings({ ...globalSettings, secondaryColor: e.target.value })}
                  className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={globalSettings.secondaryColor}
                  onChange={(e) => setGlobalSettings({ ...globalSettings, secondaryColor: e.target.value })}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="#64748b"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900">Global Settings Information</h3>
            <p className="text-sm text-blue-800 mt-1">
              These settings apply to the entire portal and affect all users and organizations. 
              Changes to branding and colors will be reflected across all interfaces immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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
  );
}
import React, { useState } from 'react';
import { User } from '../types';
import { AdminNavigation } from './admin/AdminNavigation';
import { AdminOverview } from './admin/AdminOverview';
import { PaymentManagement } from './admin/PaymentManagement';
import { StaffManagement } from './admin/StaffManagement';
import { ProjectAnalytics } from './admin/ProjectAnalytics';
import { FinancialReports } from './admin/FinancialReports';
import { ProjectSetup } from './admin/ProjectSetup';
import { OrganizationSetup } from './admin/OrganizationSetup';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export type AdminView = 'overview' | 'payments' | 'staff' | 'analytics' | 'reports' | 'projects' | 'organization';

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState<AdminView>('overview');

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <AdminOverview />;
      case 'payments':
        return <PaymentManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'analytics':
        return <ProjectAnalytics />;
      case 'reports':
        return <FinancialReports />;
      case 'projects':
        return <ProjectSetup />;
      case 'organization':
        return <OrganizationSetup />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminNavigation
        user={user}
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
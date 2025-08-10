import React, { useState } from 'react';
import { User } from '../types';
import { StaffNavigation } from './staff/StaffNavigation';
import { StaffOverview } from './staff/StaffOverview';
import { InvoiceUpload } from './staff/InvoiceUpload';
import { PaymentRequestForm } from './staff/PaymentRequestForm';
import { TimeTracking } from './staff/TimeTracking';
import { MySubmissions } from './staff/MySubmissions';

interface StaffDashboardProps {
  user: User;
  onLogout: () => void;
}

export type StaffView = 'overview' | 'invoices' | 'requests' | 'timesheet' | 'submissions';

export function StaffDashboard({ user, onLogout }: StaffDashboardProps) {
  const [activeView, setActiveView] = useState<StaffView>('overview');

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <StaffOverview user={user} />;
      case 'invoices':
        return <InvoiceUpload user={user} />;
      case 'requests':
        return <PaymentRequestForm user={user} />;
      case 'timesheet':
        return <TimeTracking user={user} />;
      case 'submissions':
        return <MySubmissions user={user} />;
      default:
        return <StaffOverview user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <StaffNavigation
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
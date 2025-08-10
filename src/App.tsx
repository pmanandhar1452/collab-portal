import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { StaffDashboard } from './components/StaffDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, login, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user?.role === 'admin' ? (
        <AdminDashboard user={user} onLogout={logout} />
      ) : (
        <StaffDashboard user={user} onLogout={logout} />
      )}
    </div>
  );
}

export default App;
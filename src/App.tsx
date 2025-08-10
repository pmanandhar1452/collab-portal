import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { StaffDashboard } from './components/StaffDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { useAuth } from './hooks/useAuth';

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const { user, login, register, signInWithGoogle, logout, loading, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    if (showRegister) {
      return (
        <RegisterForm 
          onRegister={register}
          onGoogleSignUp={signInWithGoogle}
          onBackToLogin={() => setShowRegister(false)}
          loading={loading}
        />
      );
    }
    
    return (
      <LoginForm 
        onLogin={login} 
        onGoogleSignIn={signInWithGoogle} 
        onShowRegister={() => setShowRegister(true)}
        loading={loading} 
      />
    );
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
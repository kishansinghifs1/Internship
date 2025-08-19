import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import AppLayout from '@/components/AppLayout';
import Landing from './Landing';
import DemoLogin from '@/components/auth/DemoLogin';

const Index: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleBackToLanding = () => {
    setShowLogin(false);
  };

  const handleLogin = (userType: string, email: string) => {
    login(userType, email);
    setShowLogin(false);
  };

  // If user is authenticated, show the dashboard
  if (isAuthenticated) {
    return (
      <AppProvider>
        <AppLayout />
      </AppProvider>
    );
  }

  // If showing login, show the demo login component
  if (showLogin) {
    return (
      <DemoLogin 
        onLogin={handleLogin}
        onBack={handleBackToLanding}
      />
    );
  }

  // Otherwise, show the landing page
  return (
    <Landing onLoginClick={handleLoginClick} />
  );
};

export default Index;
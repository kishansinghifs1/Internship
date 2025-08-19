import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  userType: string;
  name: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userType: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userType: string, email: string) => {
    // Simulate user data based on demo accounts
    const userData: User = {
      email,
      userType,
      name: getUserName(userType),
      company: getCompanyName(userType)
    };
    
    setUser(userData);
    localStorage.setItem('buildbridge_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('buildbridge_user');
  };

  const getUserName = (userType: string): string => {
    switch (userType) {
      case 'construction-firm':
        return 'John Smith';
      case 'vendor':
        return 'Sarah Johnson';
      case 'client':
        return 'Mike Wilson';
      default:
        return 'Demo User';
    }
  };

  const getCompanyName = (userType: string): string => {
    switch (userType) {
      case 'construction-firm':
        return 'ABC Construction Ltd.';
      case 'vendor':
        return 'Premium Supplies Co.';
      case 'client':
        return 'Wilson Properties';
      default:
        return 'Demo Company';
    }
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('buildbridge_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('buildbridge_user');
      }
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
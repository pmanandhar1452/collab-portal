import { useState } from 'react';
import { User } from '../types';

// Mock user data - in production this would connect to your authentication system
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@company.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    password: 'staff123',
    role: 'staff',
    department: 'Development',
    avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accessControl: {
      organizations: ['1'], // Only access to YAA Collaborator Portal
      projects: ['1', '2'], // Only access to specific projects
      restrictToAssignedOnly: true
    }
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@company.com',
    password: 'staff123',
    role: 'staff',
    department: 'Design',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accessControl: {
      organizations: ['1', '2'], // Access to both organizations
      projects: [], // Empty means access to all projects in allowed organizations
      restrictToAssignedOnly: false
    }
  }
];

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };
}
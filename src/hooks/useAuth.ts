import React from 'react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';

// Mock user data for fallback when not using Supabase auth
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
      organizations: ['1'],
      projects: ['1', '2'],
      restrictToAssignedOnly: true
    }
  }
];

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  // Initialize auth state listener
  React.useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleSupabaseUser(session.user);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await handleSupabaseUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('user');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSupabaseUser = async (supabaseUser: any) => {
    try {
      // Check if user exists in staff_members table
      const { data: staffMember, error } = await supabase
        .from('staff_members')
        .select('*')
        .eq('email', supabaseUser.email)
        .single();

      if (staffMember) {
        // User exists in staff_members, create User object
        const user: User = {
          id: staffMember.id,
          name: staffMember.name,
          email: staffMember.email,
          role: staffMember.role === 'admin' ? 'admin' : 'staff',
          department: staffMember.department,
          avatar: supabaseUser.user_metadata?.avatar_url || staffMember.avatar,
          accessControl: staffMember.access_control
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // New user - create staff member record
        const newStaffMember = {
          user_id: supabaseUser.id,
          name: supabaseUser.user_metadata?.full_name || supabaseUser.email.split('@')[0],
          email: supabaseUser.email,
          phone: '',
          department: 'General',
          role: 'staff',
          hourly_rate: 0,
          total_earned: 0,
          hours_this_month: 0,
          status: 'active',
          avatar: supabaseUser.user_metadata?.avatar_url || '',
          access_control: {
            organizations: [],
            projects: [],
            restrictToAssignedOnly: false
          }
        };

        const { data: createdStaff, error: createError } = await supabase
          .from('staff_members')
          .insert([newStaffMember])
          .select()
          .single();

        if (createdStaff) {
          const user: User = {
            id: createdStaff.id,
            name: createdStaff.name,
            email: createdStaff.email,
            role: 'staff',
            department: createdStaff.department,
            avatar: createdStaff.avatar,
            accessControl: createdStaff.access_control
          };
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
    } catch (error) {
      console.error('Error handling Supabase user:', error);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Try Supabase auth first
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (data.user && !error) {
        await handleSupabaseUser(data.user);
        return true;
      }
    } catch (error) {
      console.error('Supabase auth error:', error);
    }

    // Fallback to mock users for demo
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
    setUser(null);
    localStorage.removeItem('user');
    setLoading(false);
  };

  const updateUser = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Update in Supabase if user has a staff member record
      if (user.id) {
        const { error } = await supabase
          .from('staff_members')
          .update({
            name: updates.name || user.name,
            // Add other updatable fields as needed
          })
          .eq('id', user.id);

        if (error) {
          console.error('Error updating user in database:', error);
          // Continue with local update as fallback
        }
      }

      // Update local state
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Failed to update user:', error);
      return false;
    }
  };

  return {
    user,
    loading,
    login,
    signInWithGoogle,
    logout,
    updateUser,
    isAuthenticated: !!user
  };
}
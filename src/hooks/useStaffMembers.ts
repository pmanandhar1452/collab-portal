import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface StaffMember {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  hourlyRate: number;
  totalEarned: number;
  hoursThisMonth: number;
  status: 'active' | 'inactive';
  avatar: string;
  accessControl: {
    organizations: string[];
    projects: string[];
    restrictToAssignedOnly: boolean;
  };
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

export function useStaffMembers() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStaffMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('staff_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedStaffMembers: StaffMember[] = data.map(staff => ({
        id: staff.id,
        userId: staff.user_id || undefined,
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        department: staff.department,
        role: staff.role,
        hourlyRate: staff.hourly_rate,
        totalEarned: staff.total_earned,
        hoursThisMonth: staff.hours_this_month,
        status: staff.status as StaffMember['status'],
        avatar: staff.avatar,
        accessControl: staff.access_control,
        joinedAt: staff.joined_at,
        createdAt: staff.created_at,
        updatedAt: staff.updated_at
      }));

      setStaffMembers(mappedStaffMembers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createStaffMember = async (staffData: Omit<StaffMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('staff_members')
        .insert([{
          user_id: staffData.userId || null,
          name: staffData.name,
          email: staffData.email,
          phone: staffData.phone,
          department: staffData.department,
          role: staffData.role,
          hourly_rate: staffData.hourlyRate,
          total_earned: staffData.totalEarned,
          hours_this_month: staffData.hoursThisMonth,
          status: staffData.status,
          avatar: staffData.avatar,
          access_control: staffData.accessControl,
          joined_at: staffData.joinedAt
        }])
        .select()
        .single();

      if (error) throw error;

      await fetchStaffMembers();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create staff member');
      throw err;
    }
  };

  const updateStaffMember = async (id: string, updates: Partial<StaffMember>) => {
    try {
      const { error } = await supabase
        .from('staff_members')
        .update({
          user_id: updates.userId || null,
          name: updates.name,
          email: updates.email,
          phone: updates.phone,
          department: updates.department,
          role: updates.role,
          hourly_rate: updates.hourlyRate,
          total_earned: updates.totalEarned,
          hours_this_month: updates.hoursThisMonth,
          status: updates.status,
          avatar: updates.avatar,
          access_control: updates.accessControl,
          joined_at: updates.joinedAt,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      await fetchStaffMembers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update staff member');
      throw err;
    }
  };

  const deleteStaffMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('staff_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchStaffMembers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete staff member');
      throw err;
    }
  };

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  return {
    staffMembers,
    loading,
    error,
    createStaffMember,
    updateStaffMember,
    deleteStaffMember,
    refetch: fetchStaffMembers
  };
}
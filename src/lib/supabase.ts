import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          address: string;
          website: string;
          logo: string;
          timezone: string;
          currency: string;
          fiscal_year_start: string;
          payment_terms: number;
          invoice_prefix: string;
          tax_rate: number;
          registration_number: string;
          banking_details: any;
          payment_methods: any;
          notifications: any;
          branding: any;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string;
          address?: string;
          website?: string;
          logo?: string;
          timezone?: string;
          currency?: string;
          fiscal_year_start?: string;
          payment_terms?: number;
          invoice_prefix?: string;
          tax_rate?: number;
          registration_number?: string;
          banking_details?: any;
          payment_methods?: any;
          notifications?: any;
          branding?: any;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          address?: string;
          website?: string;
          logo?: string;
          timezone?: string;
          currency?: string;
          fiscal_year_start?: string;
          payment_terms?: number;
          invoice_prefix?: string;
          tax_rate?: number;
          registration_number?: string;
          banking_details?: any;
          payment_methods?: any;
          notifications?: any;
          branding?: any;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          client: string;
          description: string;
          budget: number;
          spent: number;
          start_date: string;
          end_date: string;
          status: string;
          team_members: string[];
          hourly_budget: number;
          hours_spent: number;
          priority: string;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          client: string;
          description?: string;
          budget?: number;
          spent?: number;
          start_date?: string;
          end_date?: string;
          status?: string;
          team_members?: string[];
          hourly_budget?: number;
          hours_spent?: number;
          priority?: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          name?: string;
          client?: string;
          description?: string;
          budget?: number;
          spent?: number;
          start_date?: string;
          end_date?: string;
          status?: string;
          team_members?: string[];
          hourly_budget?: number;
          hours_spent?: number;
          priority?: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      staff_members: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          email: string;
          phone: string;
          department: string;
          role: string;
          hourly_rate: number;
          total_earned: number;
          hours_this_month: number;
          status: string;
          avatar: string;
          access_control: any;
          joined_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          email: string;
          phone?: string;
          department?: string;
          role?: string;
          hourly_rate?: number;
          total_earned?: number;
          hours_this_month?: number;
          status?: string;
          avatar?: string;
          access_control?: any;
          joined_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          email?: string;
          phone?: string;
          department?: string;
          role?: string;
          hourly_rate?: number;
          total_earned?: number;
          hours_this_month?: number;
          status?: string;
          avatar?: string;
          access_control?: any;
          joined_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      invoices: {
        Row: {
          id: string;
          staff_member_id: string;
          organization_id: string;
          project_id: string | null;
          title: string;
          description: string;
          amount: number;
          currency: string;
          due_date: string | null;
          status: string;
          file_url: string;
          submitted_at: string;
          approved_at: string | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          staff_member_id: string;
          organization_id: string;
          project_id?: string | null;
          title: string;
          description?: string;
          amount: number;
          currency?: string;
          due_date?: string | null;
          status?: string;
          file_url?: string;
          submitted_at?: string;
          approved_at?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          staff_member_id?: string;
          organization_id?: string;
          project_id?: string | null;
          title?: string;
          description?: string;
          amount?: number;
          currency?: string;
          due_date?: string | null;
          status?: string;
          file_url?: string;
          submitted_at?: string;
          approved_at?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      payment_requests: {
        Row: {
          id: string;
          staff_member_id: string;
          organization_id: string;
          type: string;
          description: string;
          amount: number;
          currency: string;
          status: string;
          receipt_url: string;
          submitted_at: string;
          approved_at: string | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          staff_member_id: string;
          organization_id: string;
          type?: string;
          description: string;
          amount: number;
          currency?: string;
          status?: string;
          receipt_url?: string;
          submitted_at?: string;
          approved_at?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          staff_member_id?: string;
          organization_id?: string;
          type?: string;
          description?: string;
          amount?: number;
          currency?: string;
          status?: string;
          receipt_url?: string;
          submitted_at?: string;
          approved_at?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      time_entries: {
        Row: {
          id: string;
          staff_member_id: string;
          project_id: string;
          description: string;
          hours: number;
          date: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          staff_member_id: string;
          project_id: string;
          description: string;
          hours: number;
          date?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          staff_member_id?: string;
          project_id?: string;
          description?: string;
          hours?: number;
          date?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
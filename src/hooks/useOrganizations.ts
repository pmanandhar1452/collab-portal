import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Organization } from '../types';

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedOrganizations: Organization[] = data.map(org => ({
        id: org.id,
        name: org.name,
        email: org.email,
        phone: org.phone,
        address: org.address,
        website: org.website,
        logo: org.logo,
        timezone: org.timezone,
        currency: org.currency,
        fiscalYearStart: org.fiscal_year_start,
        paymentTerms: org.payment_terms,
        invoicePrefix: org.invoice_prefix,
        taxRate: org.tax_rate,
        registrationNumber: org.registration_number,
        bankingDetails: org.banking_details,
        paymentMethods: org.payment_methods,
        notifications: org.notifications,
        branding: org.branding,
        isActive: org.is_active,
        createdAt: org.created_at.split('T')[0]
      }));

      setOrganizations(mappedOrganizations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createOrganization = async (orgData: Partial<Organization>) => {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .insert([{
          name: orgData.name!,
          email: orgData.email!,
          phone: orgData.phone || '',
          address: orgData.address || '',
          website: orgData.website || '',
          logo: orgData.logo || '',
          timezone: orgData.timezone || 'America/New_York',
          currency: orgData.currency || 'USD',
          fiscal_year_start: orgData.fiscalYearStart || '01-01',
          payment_terms: orgData.paymentTerms || 30,
          invoice_prefix: orgData.invoicePrefix || '',
          tax_rate: orgData.taxRate || 0,
          registration_number: orgData.registrationNumber || '',
          banking_details: orgData.bankingDetails || {},
          payment_methods: orgData.paymentMethods || {
            paypal: { enabled: false, email: '', clientId: '', clientSecret: '' },
            wise: { enabled: false, apiKey: '', profileId: '' },
            veem: { enabled: false, apiKey: '', accountId: '' }
          },
          notifications: orgData.notifications || {
            emailNotifications: true,
            invoiceReminders: true,
            paymentConfirmations: true,
            weeklyReports: false
          },
          branding: orgData.branding || {
            primaryColor: '#2563eb',
            secondaryColor: '#64748b',
            logoUrl: ''
          },
          is_active: orgData.isActive !== false
        }])
        .select()
        .single();

      if (error) throw error;

      await fetchOrganizations();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create organization');
      throw err;
    }
  };

  const updateOrganization = async (id: string, updates: Partial<Organization>) => {
    try {
      const { error } = await supabase
        .from('organizations')
        .update({
          name: updates.name,
          email: updates.email,
          phone: updates.phone,
          address: updates.address,
          website: updates.website,
          logo: updates.logo,
          timezone: updates.timezone,
          currency: updates.currency,
          fiscal_year_start: updates.fiscalYearStart,
          payment_terms: updates.paymentTerms,
          invoice_prefix: updates.invoicePrefix,
          tax_rate: updates.taxRate,
          registration_number: updates.registrationNumber,
          banking_details: updates.bankingDetails,
          payment_methods: updates.paymentMethods,
          notifications: updates.notifications,
          branding: updates.branding,
          is_active: updates.isActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      await fetchOrganizations();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update organization');
      throw err;
    }
  };

  const deleteOrganization = async (id: string) => {
    try {
      const { error } = await supabase
        .from('organizations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchOrganizations();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete organization');
      throw err;
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return {
    organizations,
    loading,
    error,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    refetch: fetchOrganizations
  };
}
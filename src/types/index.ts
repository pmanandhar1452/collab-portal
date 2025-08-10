export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  avatar?: string;
  department?: string;
}

export interface Invoice {
  id: string;
  staffId: string;
  staffName: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  createdAt: string;
  dueDate: string;
  fileUrl?: string;
  fileName?: string;
}

export interface PaymentRequest {
  id: string;
  staffId: string;
  staffName: string;
  type: 'expense' | 'advance' | 'bonus';
  description: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  createdAt: string;
  receiptUrl?: string;
  receiptName?: string;
}

export interface TimeEntry {
  id: string;
  staffId: string;
  staffName: string;
  projectId: string;
  projectName: string;
  date: string;
  hours: number;
  description: string;
  hourlyRate?: number;
  status: 'submitted' | 'approved';
}

export interface Project {
  id: string;
  organizationId: string;
  name: string;
  client: string;
  status: 'active' | 'completed' | 'on-hold';
  budget: number;
  spent: number;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Organization {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  logo?: string;
  timezone: string;
  currency: string;
  fiscalYearStart: string;
  paymentTerms: number;
  invoicePrefix: string;
  taxRate: number;
  registrationNumber?: string;
  bankingDetails?: {
    accountName: string;
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
  paymentMethods: {
    paypal: { enabled: boolean; email: string; clientId: string; clientSecret: string };
    wise: { enabled: boolean; apiKey: string; profileId: string };
    veem: { enabled: boolean; apiKey: string; accountId: string };
  };
  notifications: {
    emailNotifications: boolean;
    invoiceReminders: boolean;
    paymentConfirmations: boolean;
    weeklyReports: boolean;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    favicon: string;
  };
  createdAt: string;
  isActive: boolean;
}

export interface Payment {
  id: string;
  invoiceId?: string;
  requestId?: string;
  staffId: string;
  staffName: string;
  amount: number;
  currency: string;
  method: 'wise' | 'paypal' | 'veem' | 'bank' | 'manual';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  paidAt: string;
  notes?: string;
}
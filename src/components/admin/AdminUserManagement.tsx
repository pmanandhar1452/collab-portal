import React, { useState } from 'react';
import {
  UserPlus,
  Shield,
  Users,
  Search,
  Edit3,
  Trash2,
  Crown,
  User,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useStaffMembers } from '../../hooks/useStaffMembers';
import { supabase } from '../../lib/supabase';

export function AdminUserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { 
    staffMembers, 
    loading, 
    createStaffMember, 
    updateStaffMember, 
    deleteStaffMember,
    refetch
  } = useStaffMembers();

  const filteredUsers = staffMembers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adminUsers = staffMembers.filter(user => user.role === 'admin');
  const staffUsers = staffMembers.filter(user => user.role === 'staff');

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError('');
    setSuccess('');

    // Validation
    if (newAdminData.password !== newAdminData.confirmPassword) {
      setError('Passwords do not match');
      setIsCreating(false);
      return;
    }

    if (newAdminData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsCreating(false);
      return;
    }

    try {
      // Check if user already exists in staff_members table
      const { data: existingStaff, error: checkError } = await supabase
        .from('staff_members')
        .select('*')
        .eq('email', newAdminData.email)
        .single();

      if (existingStaff) {
        setError('A user with this email already exists in the system');
        setIsCreating(false);
        return;
      }

      // First create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newAdminData.email,
        password: newAdminData.password,
        options: {
          data: {
            full_name: newAdminData.name
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        if (authError.message.includes('already registered')) {
          // User exists in auth but not in staff_members
          // Create staff member record without user_id (will be linked later via trigger or manual process)
          const adminData = {
            user_id: null, // Will be linked when user logs in
            name: newAdminData.name,
            email: newAdminData.email,
            phone: '',
            department: 'Administration',
            role: 'admin',
            hourly_rate: 0,
            total_earned: 0,
            hours_this_month: 0,
            status: 'active',
            avatar: '',
            access_control: {
              organizations: [],
              projects: [],
              restrictToAssignedOnly: false
            },
            joined_at: new Date().toISOString().split('T')[0]
          };

          const { error: createError } = await supabase
            .from('staff_members')
            .insert([adminData]);

          if (createError) {
            console.error('Staff creation error:', createError);
            throw new Error('Failed to create staff member record');
          }
        } else {
          throw authError;
        }
      } else if (authData.user) {
        // New user created successfully, create staff member record
        const adminData = {
          user_id: authData.user.id,
          name: newAdminData.name,
          email: newAdminData.email,
          phone: '',
          department: 'Administration',
          role: 'admin',
          hourly_rate: 0,
          total_earned: 0,
          hours_this_month: 0,
          status: 'active',
          avatar: '',
          access_control: {
            organizations: [],
            projects: [],
            restrictToAssignedOnly: false
          },
          joined_at: new Date().toISOString().split('T')[0]
        };

        const { error: createError } = await supabase
          .from('staff_members')
          .insert([adminData]);

        if (createError) {
          console.error('Staff creation error:', createError);
          throw new Error('Failed to create staff member record');
        }
      }

      // Refresh the staff members list
      await refetch();
      
      setSuccess('Admin user created successfully!');
      setNewAdminData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setShowCreateAdmin(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Admin creation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create admin user. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleRole = async (userId: string, currentRole: string) => {
    try {
      const newRole = currentRole === 'admin' ? 'staff' : 'admin';
      const newDepartment = newRole === 'admin' ? 'Administration' : 'General';
      
      await updateStaffMember(userId, { 
        role: newRole,
        department: newDepartment
      });
      
      setSuccess(`User role updated to ${newRole}`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update user role');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteStaffMember(userId);
        setSuccess('User deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete user');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  // Add a function to sync orphaned auth users
  const handleSyncUsers = async () => {
    setError('');
    setSuccess('');
    
    try {
      // Refresh the staff members list and attempt to link any unlinked records
      await refetch();
      
      // Check for staff members without user_id that might need linking
      const unlinkedStaff = staffMembers.filter(staff => !staff.userId);
      if (unlinkedStaff.length > 0) {
        setSuccess(`User list refreshed. Found ${unlinkedStaff.length} users that may need linking when they log in.`);
      } else {
        setSuccess('User list refreshed successfully');
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to sync users');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage user accounts and administrative privileges.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleSyncUsers}
            className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 font-medium flex items-center space-x-2"
          >
            <Users className="w-5 h-5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setShowCreateAdmin(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-medium flex items-center space-x-2"
          >
            <Crown className="w-5 h-5" />
            <span>Create Admin</span>
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">{success}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{staffMembers.length}</p>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-red-600">{adminUsers.length}</p>
              <p className="text-sm font-medium text-gray-600">Administrators</p>
            </div>
            <Crown className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{staffUsers.length}</p>
              <p className="text-sm font-medium text-gray-600">Staff Members</p>
            </div>
            <User className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Create Admin Form */}
      {showCreateAdmin && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Crown className="w-6 h-6 text-red-600" />
              <span>Create Administrator</span>
            </h2>
            <button
              onClick={() => setShowCreateAdmin(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleCreateAdmin} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newAdminData.name}
                  onChange={(e) => setNewAdminData({ ...newAdminData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={newAdminData.email}
                  onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newAdminData.password}
                    onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={newAdminData.confirmPassword}
                    onChange={(e) => setNewAdminData({ ...newAdminData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-red-900">Administrator Privileges</h3>
                  <p className="text-sm text-red-800 mt-1">
                    This user will have full administrative access including user management, 
                    payment processing, and system configuration.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowCreateAdmin(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5" />
                    <span>Create Administrator</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=${user.role === 'admin' ? 'dc2626' : '2563eb'}&color=fff`}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900 flex items-center space-x-2">
                          <span>{user.name}</span>
                          {user.role === 'admin' && <Crown className="w-4 h-4 text-red-500" />}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{user.email}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'admin'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Administrator' : 'Staff Member'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{user.department}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleRole(user.id, user.role)}
                        className={`p-1 rounded ${
                          user.role === 'admin'
                            ? 'text-blue-600 hover:text-blue-700'
                            : 'text-red-600 hover:text-red-700'
                        }`}
                        title={user.role === 'admin' ? 'Demote to Staff' : 'Promote to Admin'}
                      >
                        {user.role === 'admin' ? <User className="w-4 h-4" /> : <Crown className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700 p-1 rounded"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
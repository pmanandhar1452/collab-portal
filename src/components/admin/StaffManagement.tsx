import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Edit3,
  Trash2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  hourlyRate: number;
  totalEarned: number;
  hoursThisMonth: number;
  joinedAt: string;
  status: 'active' | 'inactive';
  avatar: string;
}

export function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Development',
      role: 'Senior Developer',
      hourlyRate: 85,
      totalEarned: 12450,
      hoursThisMonth: 156,
      joinedAt: '2024-03-15',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@company.com',
      phone: '+1 (555) 234-5678',
      department: 'Design',
      role: 'UI/UX Designer',
      hourlyRate: 75,
      totalEarned: 8900,
      hoursThisMonth: 128,
      joinedAt: '2024-05-22',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '3',
      name: 'Alex Rivera',
      email: 'alex@company.com',
      phone: '+1 (555) 345-6789',
      department: 'Development',
      role: 'Backend Developer',
      hourlyRate: 80,
      totalEarned: 15200,
      hoursThisMonth: 168,
      joinedAt: '2024-01-10',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '4',
      name: 'Emma Davis',
      email: 'emma@company.com',
      phone: '+1 (555) 456-7890',
      department: 'Marketing',
      role: 'Content Creator',
      hourlyRate: 60,
      totalEarned: 6750,
      hoursThisMonth: 112,
      joinedAt: '2024-07-08',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '5',
      name: 'James Wilson',
      email: 'james@company.com',
      phone: '+1 (555) 567-8901',
      department: 'Development',
      role: 'QA Engineer',
      hourlyRate: 70,
      totalEarned: 4200,
      hoursThisMonth: 80,
      joinedAt: '2024-09-15',
      status: 'inactive',
      avatar: 'https://images.pexels.com/photos/1552058/pexels-photo-1552058.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const departments = ['all', 'Development', 'Design', 'Marketing', 'QA'];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || staff.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const totalStats = {
    active: staffMembers.filter(s => s.status === 'active').length,
    totalEarned: staffMembers.reduce((sum, s) => sum + s.totalEarned, 0),
    avgHourlyRate: Math.round(staffMembers.reduce((sum, s) => sum + s.hourlyRate, 0) / staffMembers.length),
    hoursThisMonth: staffMembers.reduce((sum, s) => sum + s.hoursThisMonth, 0)
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-2">Manage collaborator profiles, rates, and performance.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalStats.active}</p>
              <p className="text-sm font-medium text-gray-600">Active Staff</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">${totalStats.totalEarned.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-600">Total Earned</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">${totalStats.avgHourlyRate}</p>
              <p className="text-sm font-medium text-gray-600">Avg Hourly Rate</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-amber-600">{totalStats.hoursThisMonth}</p>
              <p className="text-sm font-medium text-gray-600">Hours This Month</p>
            </div>
            <Calendar className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-3">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department & Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate & Earnings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  This Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img
                        src={staff.avatar}
                        alt={staff.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{staff.name}</p>
                        <p className="text-xs text-gray-500">
                          Joined {new Date(staff.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="w-3 h-3 mr-1 text-gray-400" />
                        {staff.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="w-3 h-3 mr-1 text-gray-400" />
                        {staff.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{staff.department}</p>
                      <p className="text-xs text-gray-500">{staff.role}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-gray-900">${staff.hourlyRate}/hr</p>
                      <p className="text-xs text-gray-500">${staff.totalEarned.toLocaleString()} total</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{staff.hoursThisMonth}h</p>
                      <p className="text-xs text-gray-500">
                        ${(staff.hoursThisMonth * staff.hourlyRate).toLocaleString()}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      staff.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 p-1 rounded">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700 p-1 rounded">
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
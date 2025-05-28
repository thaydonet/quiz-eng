import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { checkIsAdmin, assignRole, removeRole } from '../services/adminService';
import { Users, Settings, Activity, Database } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      const adminStatus = await checkIsAdmin(user.id);
      setIsAdmin(adminStatus);
      setLoading(false);

      if (!adminStatus) {
        navigate('/');
      }
    };

    checkAdmin();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-800" />
            <h2 className="ml-3 text-xl font-semibold text-gray-900">User Management</h2>
          </div>
          <p className="mt-2 text-gray-600">Manage users, roles, and permissions</p>
          <button className="mt-4 w-full px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700">
            Manage Users
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-blue-800" />
            <h2 className="ml-3 text-xl font-semibold text-gray-900">Question Bank</h2>
          </div>
          <p className="mt-2 text-gray-600">Manage test questions and categories</p>
          <button className="mt-4 w-full px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700">
            Manage Questions
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-800" />
            <h2 className="ml-3 text-xl font-semibold text-gray-900">Analytics</h2>
          </div>
          <p className="mt-2 text-gray-600">View test statistics and user performance</p>
          <button className="mt-4 w-full px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700">
            View Analytics
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-blue-800" />
            <h2 className="ml-3 text-xl font-semibold text-gray-900">Settings</h2>
          </div>
          <p className="mt-2 text-gray-600">Configure system settings and preferences</p>
          <button className="mt-4 w-full px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700">
            Manage Settings
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-4">
            {/* Activity items would be mapped here */}
            <p className="text-gray-600">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import {
  FiUser,
  FiMail,
  FiLock,
  FiShield,
  FiLogOut,
  FiCheckCircle,
  FiDatabase,
  FiRefreshCw
} from 'react-icons/fi';
import { useAdminAuth } from '../context/AdminAuthContext';
import { adminApi } from '../services/adminApi';
import { useToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { user, logout } = useAdminAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Change Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const res = await adminApi.getDashboardStats();
      setStats(res.data);
    } catch (e) {
      // Ignored
    } finally {
      setLoadingStats(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.warning('New password must be at least 6 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirmation do not match');
      return;
    }

    try {
      setChangingPassword(true);
      await adminApi.changePassword(currentPassword, newPassword);
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.message || 'Failed to update password');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="max-w-4xl space-y-8 font-sans animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Manage your administrator profile, update password, and view basic system status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ================================================================= */}
        {/* 1. ADMIN PROFILE                                                  */}
        {/* ================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FiUser className="text-emerald-600 text-lg" />
            <h2 className="text-sm font-bold text-slate-900">Administrator Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Admin Name
              </label>
              <div className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-2">
                <FiUser className="text-slate-400" />
                <span>{user?.name || user?.username || 'Super Administrator'}</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Admin Email
              </label>
              <div className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-2">
                <FiMail className="text-slate-400" />
                <span>{user?.email || 'admin@whyinsured.com'}</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Role / Access Level
              </label>
              <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-bold text-emerald-700 inline-flex items-center gap-1.5">
                <FiShield className="text-emerald-600" />
                <span>{user?.role ? user.role.toUpperCase() : 'SUPERADMIN'}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiLogOut />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. CHANGE PASSWORD                                                */}
        {/* ================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FiLock className="text-emerald-600 text-lg" />
            <h2 className="text-sm font-bold text-slate-900">Change Password</h2>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={changingPassword}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/10 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {changingPassword ? 'Updating Password...' : 'Save New Password'}
            </button>
          </form>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. BASIC SYSTEM STATUS                                              */}
      {/* =================================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FiDatabase className="text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Basic System Status</h3>
          </div>
          <button
            type="button"
            onClick={loadStats}
            disabled={loadingStats}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
          >
            <FiRefreshCw className={loadingStats ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Companies</span>
            <span className="text-xl font-black text-slate-800 mt-1 block">{stats?.totalCompanies || 0}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Plans</span>
            <span className="text-xl font-black text-slate-800 mt-1 block">{stats?.totalPlans || 0}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Benefits</span>
            <span className="text-xl font-black text-slate-800 mt-1 block">{stats?.totalBenefits || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

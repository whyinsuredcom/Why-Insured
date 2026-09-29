import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import {
  FiGrid,
  FiBriefcase,
  FiLayers,
  FiSettings,
  FiLogOut,
  FiExternalLink,
  FiMenu,
  FiX,
  FiShield,
  FiChevronRight
} from 'react-icons/fi';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.info('Logged out from admin panel');
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: FiGrid },
    { label: 'Companies', path: '/admin/companies', icon: FiBriefcase },
    { label: 'Plans', path: '/admin/plans', icon: FiLayers },
    { label: 'Settings', path: '/admin/settings', icon: FiSettings }
  ];

  // Derive breadcrumb from current path
  const pathParts = location.pathname.replace('/admin', '').split('/').filter(Boolean);
  const breadcrumbTitle = pathParts[0] ? pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1) : 'Dashboard';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans antialiased">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ===================================================================== */}
      {/* SIDEBAR                                                               */}
      {/* ===================================================================== */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 text-white flex flex-col justify-between border-r border-slate-800/80 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo / Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-900">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-900/40">
                <FiShield className="text-base" />
              </div>
              <div>
                <span className="text-sm font-black tracking-tight text-white font-display block leading-none">
                  WHYINSURED
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mt-0.5">
                  Admin Panel
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                    }`
                  }
                >
                  <Icon className="text-base shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-900 space-y-2">
          {/* View Public Website */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-400 hover:bg-slate-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <FiExternalLink className="text-sm" />
              <span>View Public Website</span>
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Live</span>
          </a>

          {/* Current User Card & Logout */}
          <div className="bg-slate-900/90 rounded-2xl p-3 flex items-center justify-between border border-slate-800/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                {(user?.username || 'A')[0]}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white truncate block">
                  {user?.name || user?.username || 'Admin'}
                </span>
                <span className="text-[10px] text-slate-400 truncate block">
                  {user?.email || 'admin@whyinsured.com'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Logout"
            >
              <FiLogOut className="text-sm" />
            </button>
          </div>
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* MAIN CONTENT AREA                                                     */}
      {/* ===================================================================== */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              <FiMenu className="text-xl" />
            </button>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Link to="/admin/dashboard" className="hover:text-slate-800 transition-colors">
                Admin
              </Link>
              <FiChevronRight className="text-slate-400 text-xs" />
              <span className="text-slate-900 font-bold">{breadcrumbTitle}</span>
              {pathParts[1] && (
                <>
                  <FiChevronRight className="text-slate-400 text-xs" />
                  <span className="text-slate-500 font-mono text-[11px] truncate max-w-[120px] sm:max-w-none">
                    {pathParts[1]}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <FiExternalLink className="text-xs text-slate-400" />
              <span>Open Public Site</span>
            </a>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">CMS Connected</span>
            </div>
          </div>
        </header>

        {/* Dynamic Route Pages */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

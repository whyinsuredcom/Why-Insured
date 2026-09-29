import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiBriefcase,
  FiLayers,
  FiShield,
  FiPlus,
  FiArrowUpRight,
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiFolder
} from 'react-icons/fi';
import { adminApi } from '../services/adminApi';
import { useToast } from '../components/Toast';

export default function DashboardPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalPlans: 0,
    totalBenefits: 0,
    totalMedia: 0,
    recentPlans: [],
    recentCompanies: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getDashboardStats();
      setStats(res.data);
    } catch (err) {
      toast.error(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Companies',
      value: stats.totalCompanies,
      icon: FiBriefcase,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50 text-blue-600',
      link: '/admin/companies'
    },
    {
      title: 'Total Plans',
      value: stats.totalPlans,
      icon: FiLayers,
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-50 text-emerald-600',
      link: '/admin/plans'
    },
    {
      title: 'Total Policy Benefits',
      value: stats.totalBenefits,
      icon: FiShield,
      color: 'from-purple-600 to-violet-600',
      bgColor: 'bg-purple-50 text-purple-600',
      link: '/admin/plans'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans">
      {/* Welcome Banner & Quick Action Buttons */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Insurance CMS
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight font-display">
            Welcome to WHYINSURED Admin
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-medium leading-relaxed">
            Manage insurance companies, plan structures, benefits, report cards, company strength metrics, and media in real time.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="relative z-10 flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            to="/admin/companies?action=add"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-sm transition-all cursor-pointer hover:scale-102"
          >
            <FiPlus className="text-sm text-emerald-600" />
            <span>Add Company</span>
          </Link>
          <Link
            to="/admin/plans?action=add"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer hover:scale-102"
          >
            <FiPlus className="text-sm" />
            <span>Add Plan</span>
          </Link>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3 CORE STAT CARDS                                                     */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500">{card.title}</span>
                <div className={`w-9 h-9 rounded-xl ${card.bgColor} flex items-center justify-center text-lg`}>
                  <Icon />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                  {loading ? '—' : card.value}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-emerald-600 flex items-center gap-0.5 font-semibold transition-colors">
                  View <FiArrowUpRight className="text-sm" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* RECENT PLANS & RECENT COMPANIES TABLES                                */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recently Updated Plans */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Recently Updated Plans</h2>
              <p className="text-xs text-slate-500 mt-0.5">Quick access to manage content sections</p>
            </div>
            <Link
              to="/admin/plans"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              All Plans →
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400">Loading plans...</div>
          ) : stats.recentPlans.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">No plans found</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.recentPlans.map((plan) => (
                <div key={plan.id} className="py-3 flex items-center justify-between gap-3 group">
                  <div className="min-w-0">
                    <Link
                      to={`/admin/plans/${plan.id}`}
                      className="text-xs sm:text-sm font-bold text-slate-800 hover:text-emerald-600 truncate block transition-colors"
                    >
                      {plan.name}
                    </Link>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Company: {plan.companyName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {plan.status}
                    </span>
                    <Link
                      to={`/admin/plans/${plan.id}`}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recently Added Companies */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Companies</h2>
              <p className="text-xs text-slate-500 mt-0.5">Active health insurance providers</p>
            </div>
            <Link
              to="/admin/companies"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              All Companies →
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400">Loading companies...</div>
          ) : stats.recentCompanies.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">No companies found</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.recentCompanies.map((comp) => (
                <div key={comp.id} className="py-3 flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/60 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      {comp.logo ? (
                        <img src={comp.logo} alt={comp.name} className="w-full h-full object-contain" />
                      ) : (
                        <FiBriefcase className="text-slate-400 text-xs" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link
                        to="/admin/companies"
                        className="text-xs sm:text-sm font-bold text-slate-800 hover:text-emerald-600 truncate block transition-colors"
                      >
                        {comp.name}
                      </Link>
                      <span className="text-[11px] text-slate-400 font-mono">
                        slug: {comp.slug}
                      </span>
                    </div>
                  </div>

                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    {comp.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

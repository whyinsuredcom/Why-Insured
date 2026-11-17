import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FiHome,
  FiZap,
  FiVideo,
  FiFileText,
  FiShield,
  FiBookOpen,
  FiAward,
  FiHelpCircle,
  FiBookmark,
  FiClock,
  FiBook,
  FiX,
  FiArrowUpRight,
  FiArrowRight,
  FiLayers
} from 'react-icons/fi';
import { FEATURE_FLAGS } from '../../config/features';

export default function AcademySidebar({
  isCollapsed = false,
  mobileOpen = false,
  onCloseMobile = () => {}
}) {
  const navSections = [
    {
      title: 'Explore',
      items: [
        { label: 'Home', path: '/insurance-academy', icon: FiHome, exact: true },
        { label: 'Shorts', path: '/insurance-academy/shorts', icon: FiZap, badge: 'Shorts' },
        { label: 'All Videos', path: '/insurance-academy/videos', icon: FiVideo }
      ]
    },
    {
      title: 'Education & Guides',
      items: [
        { label: 'Policy Explained', path: '/insurance-academy/policy-explained', icon: FiFileText },
        { label: 'Claim Academy', path: '/insurance-academy/claim-academy', icon: FiShield },
        { label: 'Insurance Guides', path: '/insurance-academy/guides', icon: FiBookOpen },
        { label: 'Learning Paths', path: '/insurance-academy/learning-paths', icon: FiAward, badge: 'Paths' }
      ]
    },
    {
      title: 'Knowledge Reference',
      items: [
        { label: 'Insurance FAQs', path: '/insurance-academy/faqs', icon: FiHelpCircle },
        { label: 'Insurance Dictionary', path: '/insurance-academy/dictionary', icon: FiBook }
      ]
    },
    {
      title: 'Personal Library',
      items: [
        { label: 'Saved Videos', path: '/insurance-academy/saved', icon: FiBookmark },
        { label: 'Watch Later', path: '/insurance-academy/watch-later', icon: FiClock }
      ]
    }
  ];

  // Compact mini items shown when sidebar is collapsed (YouTube Mini Sidebar pattern)
  const miniNavItems = [
    { label: 'Home', path: '/insurance-academy', icon: FiHome, exact: true },
    { label: 'Shorts', path: '/insurance-academy/shorts', icon: FiZap },
    { label: 'Videos', path: '/insurance-academy/videos', icon: FiVideo },
    { label: 'Clauses', path: '/insurance-academy/policy-explained', icon: FiFileText },
    { label: 'Claims', path: '/insurance-academy/claim-academy', icon: FiShield },
    { label: 'Library', path: '/insurance-academy/saved', icon: FiBookmark },
  ];

  // Mobile bottom navigation items (YouTube mobile bottom bar)
  const mobileBottomItems = [
    { label: 'Home', path: '/insurance-academy', icon: FiHome, exact: true },
    { label: 'Shorts', path: '/insurance-academy/shorts', icon: FiZap },
    { label: 'Videos', path: '/insurance-academy/videos', icon: FiVideo },
    { label: 'Library', path: '/insurance-academy/saved', icon: FiBookmark },
  ];

  // Full Expanded Sidebar Content
  const expandedContent = (
    <div className="flex flex-col h-full justify-between select-none py-2 overflow-y-auto no-scrollbar">
      <div className="space-y-4">
        {navSections.map((section, sIdx) => (
          <div key={section.title || sIdx} className="space-y-0.5">
            {section.title && (
              <div className="px-3.5 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-3.5 py-2.5 mx-1.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-emerald-100/90 text-emerald-800 border border-emerald-500/35 font-bold shadow-2xs'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`
                  }
                  title={item.label}
                >
                  <Icon
                    className={`text-base shrink-0 transition-transform group-hover:scale-110 ${
                      item.badge === 'Shorts' ? 'text-emerald-600' : ''
                    }`}
                  />
                  <span className="truncate flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span
                      className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-500/25"
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
            {sIdx < navSections.length - 1 && (
              <div className="pt-2 pb-1 px-3">
                <hr className="border-slate-200/80" />
              </div>
            )}
          </div>
        ))}

        {/* Main Website Shortcuts */}
        <div className="pt-2 px-3 space-y-1.5">
          <hr className="border-slate-200/80 mb-2" />
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pb-1">
            WHYINSURED Main
          </div>
          <Link
            to="/compare"
            onClick={onCloseMobile}
            className="flex items-center gap-3 px-2 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <FiLayers className="text-base text-slate-500" />
            <span>Compare Plans</span>
          </Link>
          <Link
            to="/"
            onClick={onCloseMobile}
            className="flex items-center gap-3 px-2 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <FiArrowRight className="text-base text-slate-500" />
            <span>Health Insurance</span>
          </Link>
        </div>
      </div>

      {/* Advisory Desk Helper Box (Only when expanded & enabled) */}
      {FEATURE_FLAGS.ADVISOR_NAVIGATION && (
        <div className="p-3 mx-2 mt-4 rounded-2xl bg-gradient-to-br from-[#102A43] to-[#163654] text-white space-y-2 text-left shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Free Guidance
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-200 leading-snug">
            Need personalized health policy evaluation? Consult a verified advisor.
          </p>
          <Link
            to="/advisors"
            onClick={onCloseMobile}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <span>Consult Advisor</span>
            <FiArrowUpRight className="text-xs" />
          </Link>
        </div>
      )}
    </div>
  );

  // Mini Collapsed Sidebar Content (YouTube Desktop Collapsed Mode)
  const miniContent = (
    <div className="flex flex-col items-center py-2 space-y-1 w-full select-none">
      {miniNavItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `w-[64px] flex flex-col items-center justify-center py-3 px-1 rounded-xl transition-all group ${
                isActive
                  ? 'text-emerald-800 bg-emerald-100/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
            title={item.label}
          >
            <Icon className="text-lg shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-semibold mt-1 leading-tight text-center truncate max-w-full">
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </div>
  );

  return (
    <>
      {/* =====================================================================
          1. DESKTOP / TABLET SIDEBAR (FIXED TO LEFT COLUMN)
      ===================================================================== */}
      <aside
        className={`hidden md:block shrink-0 sticky top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-white border-r border-slate-200/90 transition-all duration-200 z-30 ${
          isCollapsed ? 'w-[72px] px-1' : 'w-60 px-1'
        }`}
      >
        {isCollapsed ? miniContent : expandedContent}
      </aside>

      {/* =====================================================================
          2. MOBILE DRAWER SIDEBAR (OVERLAY FOR MOBILE SCREENS)
      ===================================================================== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl flex flex-col md:hidden transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              WI
            </div>
            <span className="text-sm font-extrabold text-[#102A43] font-display">
              Insurance Academy
            </span>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto">{expandedContent}</div>
      </aside>

      {/* =====================================================================
          3. YOUTUBE-STYLE MOBILE BOTTOM NAVIGATION BAR (FIXED BOTTOM FOR MOBILE)
      ===================================================================== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 h-14 flex items-center justify-around px-2 shadow-lg select-none">
        {mobileBottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors flex-1 ${
                  isActive
                    ? 'text-emerald-700 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`
              }
            >
              <Icon className="text-xl" />
              <span className="text-[10px] font-semibold mt-0.5">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}

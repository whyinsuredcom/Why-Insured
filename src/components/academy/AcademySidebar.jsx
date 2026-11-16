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
  FiArrowUpRight
} from 'react-icons/fi';

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
        { label: 'Short Videos', path: '/insurance-academy/shorts', icon: FiZap, badge: 'Shorts' },
        { label: 'Long Videos', path: '/insurance-academy/videos', icon: FiVideo }
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

  const content = (
    <div className="flex flex-col h-full justify-between select-none py-3 overflow-y-auto">
      <div className="space-y-5">
        {navSections.map((section, sIdx) => (
          <div key={section.title || sIdx} className="space-y-1">
            {!isCollapsed && section.title && (
              <div className="px-4 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
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
                    `flex items-center gap-3.5 px-3.5 py-2.5 mx-2 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-emerald-100/90 text-emerald-800 border border-emerald-500/35 font-bold shadow-2xs'
                        : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/70'
                    } ${isCollapsed ? 'justify-center mx-1 px-2' : ''}`
                  }
                  title={item.label}
                >
                  <Icon
                    className={`text-base shrink-0 transition-transform group-hover:scale-110 ${
                      item.badge === 'Shorts' ? 'text-emerald-600' : ''
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span
                      className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100/80 text-emerald-800 border border-emerald-500/25"
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Advisory Desk Helper Box (Only when expanded) */}
      {!isCollapsed && (
        <div className="p-3 mx-3 mt-4 rounded-2xl bg-gradient-to-br from-[#102A43] to-[#163654] text-white space-y-2 text-left shadow-xs">
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

  return (
    <>
      {/* =====================================================================
          DESKTOP SIDEBAR (FIXED OR COLLAPSIBLE)
      ===================================================================== */}
      <aside
        className={`hidden md:block shrink-0 sticky top-24 sm:top-28 h-[calc(100vh-8.5rem)] rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-2xs transition-all duration-300 z-30 ${
          isCollapsed ? 'w-20' : 'w-60'
        }`}
      >
        {content}
      </aside>

      {/* =====================================================================
          MOBILE DRAWER SIDEBAR
      ===================================================================== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-60 w-72 bg-white shadow-2xl flex flex-col md:hidden transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100">
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
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto">{content}</div>
      </aside>
    </>
  );
}


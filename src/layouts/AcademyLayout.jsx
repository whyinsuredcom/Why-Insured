import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import AcademySidebar from '../components/academy/AcademySidebar';
import AcademySearchBar from '../components/academy/AcademySearchBar';

export default function AcademyLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#17212B] font-sans antialiased flex flex-col text-left pt-24 sm:pt-28 pb-16">
      {/* Academy Search Bar - Directly below the WHYINSURED navbar & above Academy content */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mb-5 sm:mb-6">
        <AcademySearchBar />
      </div>

      {/* Main Flex Container: Sidebar + Page Content */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
        {/* Mobile Navigation Drawer Trigger */}
        <div className="md:hidden w-full flex items-center justify-between pb-3 border-b border-slate-200/80">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            <FiMenu className="text-sm text-emerald-600" />
            <span>Academy Menu</span>
          </button>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Insurance Academy
          </span>
        </div>

        {/* Collapsible Left Sidebar */}
        <AcademySidebar
          isCollapsed={isSidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Dynamic Nested Page Content Area */}
        <main className="flex-1 min-w-0 w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AcademyNavbar from '../components/academy/AcademyNavbar';
import AcademySidebar from '../components/academy/AcademySidebar';

export default function AcademyLayout() {
  // Automatically collapse sidebar on tablet (<1200px) and expand on desktop (>=1200px)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1200;
    }
    return false;
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sync collapse state on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile layout handles drawer independently
        setIsSidebarCollapsed(false);
      } else if (window.innerWidth < 1200) {
        setIsSidebarCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#17212B] font-sans antialiased flex flex-col text-left">
      {/* 1. YouTube-style Sticky Academy Header (with Search, Logo, Hamburger, Shortcuts) */}
      <AcademyNavbar
        onToggleSidebar={handleToggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      {/* 2. Main Flex Workspace: Collapsible Sidebar + Dynamic Page Content */}
      <div className="flex flex-row w-full max-w-[1920px] mx-auto flex-1 items-start">
        {/* Collapsible Left Sidebar (Expanded on Desktop, Mini on Tablet, Drawer on Mobile) */}
        <AcademySidebar
          isCollapsed={isSidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Dynamic Nested Content Feed (Single-column on mobile, responsive grid on desktop/tablet) */}
        <main className="flex-1 min-w-0 p-3 sm:p-5 lg:p-6 pb-24 md:pb-12 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

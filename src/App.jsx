import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Safe Storage & Error Boundaries
import { safeSessionStorage } from './utils/safeStorage';
import RouteErrorBoundary from './components/RouteErrorBoundary';

// Reusable Public Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import FloatingActions from './components/FloatingActions';
import { FEATURE_FLAGS } from './config/features';

// Pages
import Home from './pages/Home';
import CompanyDetail from './pages/CompanyDetail';
import PlanDetail from './pages/PlanDetail';
import ComparisonPage from './pages/ComparisonPage';
import ClaimPage from './pages/ClaimPage';
import HospitalPage from './pages/HospitalPage';
import AdvisorsPage from './pages/AdvisorsPage';
import AdvisorDetailPage from './pages/AdvisorDetailPage';
import UploadPolicy from './pages/UploadPolicy';

// WHYINSURED Academy Components & Pages
import AcademyLayout from './layouts/AcademyLayout';
import AcademyHomePage from './pages/academy/AcademyHomePage';
import AcademyShortsPage from './pages/academy/AcademyShortsPage';
import AcademyVideosPage from './pages/academy/AcademyVideosPage';
import AcademyWatchPage from './pages/academy/AcademyWatchPage';
import AcademyPolicyExplainedPage from './pages/academy/AcademyPolicyExplainedPage';
import AcademyClaimPage from './pages/academy/AcademyClaimPage';
import AcademyGuidesPage from './pages/academy/AcademyGuidesPage';
import AcademyArticleDetailPage from './pages/academy/AcademyArticleDetailPage';
import AcademyLearningPathsPage from './pages/academy/AcademyLearningPathsPage';
import AcademyFaqsPage from './pages/academy/AcademyFaqsPage';
import AcademyDictionaryPage from './pages/academy/AcademyDictionaryPage';
import AcademyLibraryPage from './pages/academy/AcademyLibraryPage';

// Admin Panel Components & Pages
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import { ToastProvider } from './admin/components/Toast';
import AdminProtectedRoute from './admin/components/AdminProtectedRoute';
import AdminLayout from './admin/layouts/AdminLayout';
import LoginPage from './admin/pages/LoginPage';
import DashboardPage from './admin/pages/DashboardPage';
import CompaniesPage from './admin/pages/CompaniesPage';
import PlansPage from './admin/pages/PlansPage';
import PlanEditorPage from './admin/pages/PlanEditorPage';
import SettingsPage from './admin/pages/SettingsPage';
import AcademyManagementPage from './admin/pages/AcademyManagementPage';

// Helper to detect if the page was refreshed (F5/Ctrl+R/Browser Reload)
const isPageRefresh = () => {
  try {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      return navEntries[0].type === 'reload';
    }
    return performance.navigation.type === 1;
  } catch (_) {
    return false;
  }
};

function App() {
  const [showPreloader, setShowPreloader] = useState(() => {
    try {
      const seen = safeSessionStorage.getItem('whyinsured_preloader_seen');
      const isHome = typeof window !== 'undefined' && window.location.pathname === '/';
      const isReload = isPageRefresh();
      return isHome && !seen && !isReload;
    } catch (_) {
      return false;
    }
  });

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Scroll to top on route change
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (_) {}
  }, [location.pathname]);

  const handlePreloaderComplete = () => {
    safeSessionStorage.setItem('whyinsured_preloader_seen', 'true');
    setShowPreloader(false);
  };

  // Page Transition Variants for Public Website
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  // =========================================================================
  // ADMIN ROUTES (NO PUBLIC NAVBAR, NO PUBLIC FOOTER)
  // =========================================================================
  if (isAdminRoute) {
    return (
      <AdminAuthProvider>
        <ToastProvider>
          <div className="min-h-screen bg-[#F8FAFC] antialiased font-sans">
            <RouteErrorBoundary key={location.pathname}>
              <Routes location={location}>
                <Route path="/admin/login" element={<LoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <AdminProtectedRoute>
                      <AdminLayout />
                    </AdminProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="companies" element={<CompaniesPage />} />
                  <Route path="plans" element={<PlansPage />} />
                  <Route path="plans/:planId" element={<PlanEditorPage />} />
                  <Route path="academy" element={<AcademyManagementPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/admin/login" replace />} />
              </Routes>
            </RouteErrorBoundary>
          </div>
        </ToastProvider>
      </AdminAuthProvider>
    );
  }

  // =========================================================================
  // PUBLIC WEBSITE ROUTES (WITH PUBLIC NAVBAR & FOOTER)
  // =========================================================================
  const isAcademyRoute = location.pathname.startsWith('/insurance-academy') || location.pathname.startsWith('/academy');

  return (
    <AnimatePresence mode="wait">
      {showPreloader ? (
        <Preloader key="preloader" onComplete={handlePreloaderComplete} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-[#F8FAFC] flex flex-col justify-start text-slate-800 antialiased font-sans"
        >
          {/* Public Header - Rendered across all public pages except dedicated Academy */}
          {!isAcademyRoute && <Navbar />}

          {/* Main Routing Panel wrapped in RouteErrorBoundary */}
          <main className="flex-grow">
            <RouteErrorBoundary key={location.pathname}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/insurance/:companyId" element={<CompanyDetail />} />
                    <Route path="/insurance/:companyId/:planId" element={<PlanDetail />} />
                    <Route path="/insurance/:companyId/:planId/features" element={<PlanDetail />} />
                    <Route path="/insurance/:companyId/:planId/limitations" element={<PlanDetail />} />
                    <Route path="/compare" element={<ComparisonPage />} />
                    <Route path="/claim" element={<ClaimPage />} />
                    <Route path="/advisors" element={<AdvisorsPage />} />
                    <Route path="/advisors/:slug" element={<AdvisorDetailPage />} />
                    <Route path="/hospital" element={<HospitalPage />} />
                    <Route path="/upload-policy" element={<UploadPolicy />} />

                    {/* WHYINSURED Insurance Academy (YouTube-inspired Video Platform) */}
                    <Route path="/insurance-academy" element={<AcademyLayout />}>
                      <Route index element={<AcademyHomePage />} />
                      <Route path="shorts" element={<AcademyShortsPage />} />
                      <Route path="videos" element={<AcademyVideosPage />} />
                      <Route path="watch/:videoId" element={<AcademyWatchPage />} />
                      <Route path="policy-explained" element={<AcademyPolicyExplainedPage />} />
                      <Route path="claim-academy" element={<AcademyClaimPage />} />
                      <Route path="guides" element={<AcademyGuidesPage />} />
                      <Route path="article/:slug" element={<AcademyArticleDetailPage />} />
                      <Route path="learning-paths" element={<AcademyLearningPathsPage />} />
                      <Route path="faqs" element={<AcademyFaqsPage />} />
                      <Route path="dictionary" element={<AcademyDictionaryPage />} />
                      <Route path="saved" element={<AcademyLibraryPage />} />
                      <Route path="watch-later" element={<AcademyLibraryPage />} />
                    </Route>

                    {/* Legacy /academy backward-compatibility */}
                    <Route path="/academy" element={<Navigate to="/insurance-academy" replace />} />
                    <Route path="/academy/*" element={<Navigate to="/insurance-academy" replace />} />

                    <Route path="*" element={<Home />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </RouteErrorBoundary>
          </main>

          {/* Public Footer - Rendered across all public pages */}
          <Footer />

          {/* Unified Floating Actions Container (Chat with WHYINSURED + Upload Your Policy) */}
          {(FEATURE_FLAGS.AI_CHAT_WIDGET || FEATURE_FLAGS.POLICY_UPLOAD_WIDGET) && (
            <FloatingActions />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;

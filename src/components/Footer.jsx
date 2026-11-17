import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiShield,
  FiX,
  FiFileText,
  FiHelpCircle,
  FiArrowUpRight
} from 'react-icons/fi';
import logoImg from '../assets/logo.png';
import { safeSessionStorage } from '../utils/safeStorage';
import { FEATURE_FLAGS } from '../config/features';

export const WHYINSURED_CONTACT_EMAIL = "whyinsured3@gmail.com";
export const FOOTER_CONTACT_EMAIL = WHYINSURED_CONTACT_EMAIL;

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | 'disclaimer'

  const quickLinks = [
    { name: 'Health Insurance', path: '/' },
    { name: 'Compare Plans', path: '/compare' },
    ...(FEATURE_FLAGS.ADVISOR_NAVIGATION ? [{ name: 'Advisors', path: '/advisors' }] : []),
    { name: 'Insurance Academy', path: '/academy' }
  ];

  const insuranceCompanies = [
    { name: 'HDFC ERGO', path: '/insurance/hdfc-ergo' },
    { name: 'Tata AIG', path: '/insurance/tata-aig' },
    { name: 'ICICI Lombard', path: '/insurance/icici-lombard' },
    { name: 'Niva Bupa', path: '/insurance/niva-bupa' },
    { name: 'Star Health', path: '/insurance/star-health' },
    { name: 'Care Health', path: '/insurance/care-health' },
    { name: 'IndusInd General Insurance', path: '/insurance/reliance-general' },
    { name: 'Magma General Insurance', path: '/insurance/magma-hdi' },
    { name: 'ManipalCigna Health Insurance', path: '/insurance/manipal-cigna' },
    { name: 'Aditya Birla Health Insurance', path: '/insurance/aditya-birla' },
    { name: 'Bajaj General Insurance', path: '/insurance/bajaj-general' },
    { name: 'SBI General Insurance', path: '/insurance/sbi-general' },
    { name: 'ACKO', path: '/insurance/acko' },
  ];

  const handleOpenModal = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <footer className="relative bg-[#060913] text-slate-300 border-t border-slate-800/80 font-sans select-none z-10 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute left-1/4 top-0 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/[0.025] blur-[130px] pointer-events-none" />
        <div className="absolute right-10 bottom-0 w-80 h-80 rounded-full bg-blue-500/[0.02] blur-[110px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10">

          {/* Main Footer Grid (4 Clean Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start pb-10">

            {/* 1. COLUMN 1: WHYINSURED (lg: col-span-4) */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <Link
                to="/"
                onClick={() => {
                  safeSessionStorage.removeItem('whyinsured_last_search_query');
                  window.dispatchEvent(new CustomEvent('whyinsured-reset-search'));
                }}
                className="inline-flex items-center gap-2 group"
              >
                <div className="bg-white/95 rounded-xl p-2 shadow-xs border border-slate-700/40 inline-flex items-center justify-center">
                  <img
                    src={logoImg}
                    alt="WHYINSURED"
                    className="h-6 sm:h-7 w-auto object-contain select-none"
                  />
                </div>
              </Link>

              <div>
                <p className="text-sm font-bold text-white tracking-tight">
                  Your Health Insurance, Simplified.
                </p>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed max-w-sm">
                  Simplifying health insurance with unbiased comparisons, transparent metrics, and verified policy benefits.
                </p>
              </div>

              {/* Trust Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-semibold text-emerald-400">
                <FiShield className="text-xs" />
                <span>100% Unbiased & Transparent</span>
              </div>
            </div>

            {/* 2. COLUMN 2: QUICK LINKS (lg: col-span-3) */}
            <div className="lg:col-span-3 text-left">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-200 mb-4 font-display flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Quick Links
              </h4>

              <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      onClick={() => {
                        if (link.path === '/') {
                          safeSessionStorage.removeItem('whyinsured_last_search_query');
                          window.dispatchEvent(new CustomEvent('whyinsured-reset-search'));
                        }
                      }}
                      className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 group cursor-pointer"
                    >
                      <span className="text-slate-600 group-hover:text-emerald-400 transition-colors">•</span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. COLUMN 3: COMPANIES / INSURANCE (lg: col-span-3) */}
            <div className="lg:col-span-3 text-left">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-200 mb-4 font-display flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Companies / Insurance
              </h4>

              <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs sm:text-sm font-medium">
                {insuranceCompanies.map((comp, idx) => (
                  <li key={idx}>
                    <Link
                      to={comp.path}
                      className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all duration-200 inline-flex items-center gap-1 group cursor-pointer"
                    >
                      <span className="text-slate-600 group-hover:text-blue-400 transition-colors">•</span>
                      <span>{comp.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. COLUMN 4: CONTACT (EMAIL ONLY) (lg: col-span-2) */}
            <div className="lg:col-span-2 text-left space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-200 mb-4 font-display flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                Contact
              </h4>

              <div className="space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Email Us
                </p>

                <a
                  href={`mailto:${FOOTER_CONTACT_EMAIL}`}
                  className="group inline-flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 text-slate-200 hover:text-emerald-400 transition-all duration-200 cursor-pointer text-xs font-semibold shadow-xs"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <FiMail className="text-xs" />
                  </div>
                  <span className="truncate">{FOOTER_CONTACT_EMAIL}</span>
                  <FiArrowUpRight className="text-[10px] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar Divider */}
          <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
            <p className="text-slate-400 font-medium">
              © 2026 WHYINSURED. All Rights Reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
              <button
                type="button"
                onClick={() => handleOpenModal('privacy')}
                className="text-slate-400 hover:text-slate-200 hover:underline transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-slate-700">|</span>
              <button
                type="button"
                onClick={() => handleOpenModal('terms')}
                className="text-slate-400 hover:text-slate-200 hover:underline transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>
              <span className="text-slate-700">|</span>
              <button
                type="button"
                onClick={() => handleOpenModal('disclaimer')}
                className="text-slate-400 hover:text-slate-200 hover:underline transition-colors cursor-pointer"
              >
                Disclaimer
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Interactive Modal for Legal Pages */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-left text-slate-200 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <FiX />
              </button>

              {/* Modal Content: Privacy Policy */}
              {activeModal === 'privacy' && (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <FiFileText />
                    <span>Privacy Policy</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Your Privacy is Paramount</h3>
                  <div className="text-xs text-slate-300 space-y-2 max-h-60 overflow-y-auto pr-1">
                    <p>
                      WHYINSURED does not sell, trade, or share your personal information with third-party insurance telemarketers without your explicit consent.
                    </p>
                    <p>
                      All comparison queries and health insurance report views on this platform are completely anonymous and encrypted.
                    </p>
                    <p>
                      We strictly adhere to data protection norms to provide an advertisement-free, transparent insurance evaluation experience.
                    </p>
                  </div>
                  <div className="pt-2 text-right">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      Got it
                    </button>
                  </div>
                </div>
              )}

              {/* Modal Content: Terms & Conditions */}
              {activeModal === 'terms' && (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                    <FiFileText />
                    <span>Terms & Conditions</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Terms of Use</h3>
                  <div className="text-xs text-slate-300 space-y-2 max-h-60 overflow-y-auto pr-1">
                    <p>
                      WHYINSURED provides comparative health insurance metrics, claim settlement ratios, and feature summaries for educational and informational purposes.
                    </p>
                    <p>
                      While we make every effort to ensure information is updated, insurance underwriting, terms, premiums, and policy guidelines are determined solely by the respective insurance companies.
                    </p>
                    <p>
                      Users are advised to review the official policy wording and schedule issued by the insurer before final purchase.
                    </p>
                  </div>
                  <div className="pt-2 text-right">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      Got it
                    </button>
                  </div>
                </div>
              )}

              {/* Modal Content: Disclaimer */}
              {activeModal === 'disclaimer' && (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <FiHelpCircle />
                    <span>Regulatory Disclaimer</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Advisory & IRDAI Guidelines</h3>
                  <div className="text-xs text-slate-300 space-y-2 max-h-60 overflow-y-auto pr-1">
                    <p>
                      Health insurance is subject to market risks, medical underwriting, and regulatory guidelines set by IRDAI.
                    </p>
                    <p>
                      Claim settlement ratios (CSR), incurred claim ratios (ICR), and solvency metrics shown on WHYINSURED are sourced from official IRDAI annual reports and public company disclosures.
                    </p>
                    <p>
                      *T&C Apply across all mentioned policies.
                    </p>
                  </div>
                  <div className="pt-2 text-right">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      Got it
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

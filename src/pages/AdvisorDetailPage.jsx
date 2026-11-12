import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiGlobe,
  FiArrowUpRight,
  FiCheck
} from 'react-icons/fi';
import AdvisorAvatar from '../components/advisors/AdvisorAvatar';
import AdvisorEnquiryModal from '../components/advisors/AdvisorEnquiryModal';
import { AdvisorDetailSkeleton } from '../components/advisors/AdvisorSkeleton';
import { fetchAdvisorBySlug } from '../services/advisorService';

export default function AdvisorDetailPage() {
  const { slug } = useParams();

  const [advisor, setAdvisor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAdvisorBySlug(slug)
      .then(res => {
        if (!isMounted) return;
        if (res.success && res.data) {
          setAdvisor(res.data);
          setError(null);
        } else {
          setError(res.error || `Advisor profile "${slug}" not found.`);
        }
      })
      .catch(err => {
        if (!isMounted) return;
        setError(err.message || 'Failed to load advisor details');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7FAF9] pt-28 pb-20 font-sans">
        <AdvisorDetailSkeleton />
      </div>
    );
  }

  if (error || !advisor) {
    return (
      <div className="min-h-screen bg-[#F7FAF9] pt-32 pb-20 font-sans px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#E4E7EB] p-8 text-center space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-[#102A43] font-display">
            Advisor Profile Not Found
          </h2>
          <p className="text-xs sm:text-sm text-[#627D98] leading-relaxed">
            The advisor profile for <strong className="text-[#102A43]">"{slug}"</strong> could not be located or has been relocated.
          </p>
          <div className="pt-2">
            <Link
              to="/advisors"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <FiArrowLeft className="text-xs" />
              <span>Back to Advisors Directory</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAF9] pt-28 pb-24 font-sans text-[#172B3A] relative overflow-hidden text-left">

      {/* Brand Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#00A86B]/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[500px] h-[400px] bg-[#102A43]/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* =========================================================================
            1. BACK NAVIGATION & BREADCRUMBS
        ========================================================================= */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/advisors"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#627D98] hover:text-[#00A86B] transition-colors py-1 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-white border border-[#E4E7EB] flex items-center justify-center text-[#102A43] group-hover:border-[#00A86B] group-hover:text-[#00A86B] transition-all shadow-2xs">
              <FiArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>Back to Advisors</span>
          </Link>

          <span className="text-[11px] font-medium text-[#627D98]">
            Advisory Directory / {advisor.name}
          </span>
        </div>

        {/* =========================================================================
            2. HERO PORTFOLIO CARD (SPLIT LAYOUT)
        ========================================================================= */}
        <section className="bg-white rounded-3xl border border-[#E4E7EB] shadow-[0_4px_24px_rgba(16,42,67,0.04)] p-6 sm:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Column: Portrait & Available Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="overflow-hidden rounded-2xl bg-slate-100 border border-[#E4E7EB] shadow-2xs">
                <AdvisorAvatar
                  name={advisor.name}
                  image={advisor.profileImage}
                  aspect="portrait"
                  className="w-full"
                />
              </div>

              {/* Available Professional Details Card */}
              <div className="p-5 rounded-2xl bg-[#F7FAF9] border border-[#E4E7EB] space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-[#E4E7EB] pb-3">
                  <span className="font-semibold text-[#102A43] flex items-center gap-1.5">
                    <FiCalendar className="text-[#00A86B]" />
                    <span>Advisory Mode</span>
                  </span>
                  <span className="text-[#627D98]">
                    {advisor.consultation?.mode || 'Online & Telephonic'}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#E4E7EB] pb-3">
                  <span className="font-semibold text-[#102A43] flex items-center gap-1.5">
                    <FiGlobe className="text-[#00A86B]" />
                    <span>Availability</span>
                  </span>
                  <span className="text-[#627D98]">
                    {advisor.consultation?.availability || 'Mon – Sat (10:00 AM – 6:30 PM)'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#102A43] flex items-center gap-1.5">
                    <FiMapPin className="text-[#00A86B]" />
                    <span>Location</span>
                  </span>
                  <span className="text-[#627D98]">
                    {advisor.consultation?.location || 'India'}
                  </span>
                </div>
              </div>

              {/* Consultation Options */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 px-5 rounded-xl bg-[#00A86B] hover:bg-[#0FA26E] text-white text-xs font-semibold transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Advisory Session</span>
                  <FiArrowUpRight className="text-xs" />
                </button>

                <a
                  href={`mailto:${advisor.consultation?.email || 'whyinsured3@gmail.com'}?subject=${encodeURIComponent(`Advisory Consultation: ${advisor.name} via WHYINSURED`)}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-[#E4E7EB] text-[#102A43] text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <FiMail className="text-xs text-[#627D98]" />
                  <span>Email Advisory Desk</span>
                </a>
              </div>
            </div>

            {/* Right Column: Bio & Core Expertise */}
            <div className="lg:col-span-7 space-y-6">

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#0B6946] border border-[#00A86B]/20 mb-3">
                  {advisor.category}
                </span>

                <h1 className="text-3xl sm:text-4xl font-black text-[#102A43] font-display tracking-tight">
                  {advisor.name}
                </h1>

                <p className="text-xs sm:text-sm text-[#172B3A]/80 font-normal leading-relaxed mt-3">
                  {advisor.shortDescription}
                </p>
              </div>

              {/* Specialization Tags */}
              {advisor.expertise && advisor.expertise.length > 0 && (
                <div className="pt-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#627D98] mb-2">
                    Primary Focus Areas
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {advisor.expertise.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#F0FDF4] text-[#0B6946] border border-[#00A86B]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Professional Introduction */}
              <div className="pt-4 border-t border-[#E4E7EB] space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#102A43] font-display">
                  Professional Introduction
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-[#172B3A]/80 leading-relaxed font-normal">
                  {Array.isArray(advisor.intro) ? (
                    advisor.intro.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))
                  ) : (
                    <p>{advisor.intro || advisor.shortDescription}</p>
                  )}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            3. RELEVANT HEALTH INSURANCE EXPERTISE
        ========================================================================= */}
        {advisor.guidancePoints && advisor.guidancePoints.length > 0 && (
          <section className="bg-white rounded-3xl border border-[#E4E7EB] p-8 sm:p-10 mb-10 shadow-[0_4px_24px_rgba(16,42,67,0.03)] space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0FA26E]">
                Advisory Focus
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display tracking-tight mt-1">
                Health Insurance Guidance Scope
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {advisor.guidancePoints.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#F7FAF9] border border-[#E4E7EB] space-y-2 text-left"
                >
                  <h4 className="text-sm font-bold text-[#102A43] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#00A86B]/15 text-[#00A86B] flex items-center justify-center text-xs shrink-0">
                      <FiCheck />
                    </span>
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-xs text-[#627D98] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            4. CONSULTATION CALLOUT
        ========================================================================= */}
        <section className="bg-gradient-to-r from-[#102A43] to-[#1B3A5A] rounded-3xl p-8 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00A86B]">
              Independent Policy Advice
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Schedule a Guidance Session with {advisor.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Get unbiased answers to your health insurance questions, compare category coverage, and decode fine-print clauses without sales pressure.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 px-6 py-3 rounded-xl bg-[#00A86B] hover:bg-[#0FA26E] text-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            Request Session
          </button>
        </section>

      </div>

      {/* Reusable Consultation Modal */}
      <AdvisorEnquiryModal
        advisor={advisor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

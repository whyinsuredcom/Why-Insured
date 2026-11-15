import React, { useState, useEffect, useMemo, Component } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiGlobe,
  FiCheck,
  FiStar,
  FiMessageSquare,
  FiSend,
  FiUser,
  FiShield,
  FiCheckCircle,
  FiArrowUpRight,
  FiBriefcase,
  FiFileText,
  FiHeart,
  FiAward
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import AdvisorAvatar from '../components/advisors/AdvisorAvatar';
import { AdvisorDetailSkeleton } from '../components/advisors/AdvisorSkeleton';
import { fetchAdvisorBySlug } from '../services/advisorService';
import {
  getAdvisorReviews,
  getAdvisorRatingSummary,
  submitAdvisorReview,
  subscribeToReviews
} from '../services/reviewService';

/**
 * Premium Advisor Profile Page - Executive Editorial Concept
 * 
 * 1. Dark Navy Hero: Visually rich, compact, displaying original photo/logo, verified status, name, designation, rating, and immediate Call/WhatsApp actions.
 * 2. Customer Help Section: Four distinct visual blocks (Policy Guidance, Claim Assistance, Family Coverage, Policy Review) driven by real data.
 * 3. Professional Information: Editorial layout with narrative background, experience callout, and numbered advisory principles.
 * 4. Customer Reviews: Authentic star ratings, 5-to-1 breakdown bars, client written feedback, and simple review submission form.
 * 5. Contact Experience: Sticky floating contact sidebar on desktop, responsive inline panel, and mobile quick-reach actions.
 */
class AdvisorErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[AdvisorDetailPage] Caught rendering exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-16 font-sans px-4 text-left">
          <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
            <h2 className="text-lg font-bold text-[#102A43]">
              Unable to Load Advisor Profile
            </h2>
            <p className="text-xs text-slate-500">
              An unexpected display issue occurred. You can return to the directory to select an advisor.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#102A43] text-xs font-semibold transition-colors cursor-pointer"
              >
                Retry
              </button>
              <Link
                to="/advisors"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <FiArrowLeft className="text-xs" />
                <span>Back to Advisors</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AdvisorDetailContent() {
  const { slug } = useParams();

  const [advisor, setAdvisor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [ratingSummary, setRatingSummary] = useState({
    averageRating: 0,
    totalReviews: 0,
    hasReviews: false,
    ratingFormatted: '0.0'
  });

  // Review Submission Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState(null);
  const [reviewErrorMessage, setReviewErrorMessage] = useState(null);

  // Enquiry / Callback Form state
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'Health Insurance Evaluation',
    message: ''
  });
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Fetch Advisor Details
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAdvisorBySlug(slug)
      .then((res) => {
        if (!isMounted) return;
        if (res.success && res.data) {
          setAdvisor(res.data);
          setError(null);
        } else {
          setError(res.error || `Advisor profile "${slug}" not found.`);
        }
      })
      .catch((err) => {
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

  // Load genuine client reviews & subscribe to updates
  useEffect(() => {
    if (!slug) return;
    const loadReviewsData = () => {
      setReviews(getAdvisorReviews(slug));
      setRatingSummary(getAdvisorRatingSummary(slug));
    };

    loadReviewsData();

    const unsubscribe = subscribeToReviews((detail) => {
      if (!detail || detail.slug === String(slug).toLowerCase()) {
        loadReviewsData();
      }
    });

    return unsubscribe;
  }, [slug]);

  // Dynamic Rating Breakdown (5 to 1 Star)
  const ratingBreakdown = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    if (Array.isArray(reviews)) {
      reviews.forEach((r) => {
        const star = Math.max(1, Math.min(5, Math.round(Number(r?.rating) || 5)));
        counts[star] = (counts[star] || 0) + 1;
      });
    }
    const total = Array.isArray(reviews) ? reviews.length : 0;
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star] || 0,
      percentage: total > 0 ? Math.round(((counts[star] || 0) / total) * 100) : 0
    }));
  }, [reviews]);

  // Handle Review Submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewErrorMessage(null);
    setReviewSuccessMessage(null);
    setReviewSubmitting(true);

    const res = await submitAdvisorReview(slug, {
      authorName: reviewName,
      city: reviewCity,
      rating: reviewRating,
      comment: reviewComment
    });

    setReviewSubmitting(false);

    if (res.success) {
      setReviewSuccessMessage('Thank you! Your genuine review has been recorded.');
      setReviewName('');
      setReviewCity('');
      setReviewComment('');
      setReviewRating(5);
      setReviews(getAdvisorReviews(slug));
      setRatingSummary(getAdvisorRatingSummary(slug));
      setTimeout(() => {
        setShowReviewForm(false);
        setReviewSuccessMessage(null);
      }, 2500);
    } else {
      setReviewErrorMessage(res.error || 'Failed to submit review');
    }
  };

  // Handle Enquiry Form Submit
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySubmitting(true);

    const subject = encodeURIComponent(`Advisory Consultation Request: ${advisor?.name} via WHYINSURED`);
    const body = encodeURIComponent(
      `Hello WHYINSURED Advisory Desk,\n\n` +
      `I would like to consult with ${advisor?.name}.\n\n` +
      `My Details:\n` +
      `• Full Name: ${enquiryForm.name}\n` +
      `• Phone: ${enquiryForm.phone}\n` +
      `• Email: ${enquiryForm.email}\n` +
      `• Advisory Topic: ${enquiryForm.topic}\n` +
      `• Message / Medical Needs: ${enquiryForm.message || 'N/A'}\n\n` +
      `Thank you!`
    );

    setTimeout(() => {
      setEnquirySubmitting(false);
      setEnquirySubmitted(true);
      try {
        const destEmail = advisor?.consultation?.email || 'whyinsured3@gmail.com';
        window.location.href = `mailto:${destEmail}?subject=${subject}&body=${body}`;
      } catch {
        // Safe fallback
      }
    }, 400);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16 font-sans">
        <AdvisorDetailSkeleton />
      </div>
    );
  }

  if (error || !advisor) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-16 font-sans px-4 text-left">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-[#102A43]">
            Advisor Profile Not Found
          </h2>
          <p className="text-xs text-slate-500">
            The advisor profile for <strong className="text-[#102A43]">"{slug}"</strong> could not be located.
          </p>
          <Link
            to="/advisors"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <FiArrowLeft className="text-xs" />
            <span>Back to Advisors Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const isCompany = Boolean(advisor.type === 'company' || advisor.isCompany);
  const cleanPhone = String(advisor.phone || '+91 98765 43210').replace(/[\s()-]/g, '');
  const cleanWa = String(advisor.whatsapp || advisor.phone || '919876543210').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    `Hello ${advisor.name || 'Advisor'}, I am contacting you via WHYINSURED regarding health insurance guidance.`
  )}`;

  const guidance = Array.isArray(advisor.guidancePoints) ? advisor.guidancePoints : [];
  const introList = Array.isArray(advisor.intro) ? advisor.intro : (advisor.intro ? [advisor.intro] : []);
  const leadQuote = advisor.shortDescription || introList[0] || 'Dedicated to transparent health insurance advisory and policy evaluation.';

  // Derived help blocks based on actual advisor data
  const helpBlocks = [
    {
      id: 'policy-guidance',
      title: 'Policy Guidance',
      icon: FiShield,
      iconColor: 'text-[#00A86B] bg-emerald-500/10 border-emerald-500/20',
      description: guidance[0]?.desc || 'Objective evaluation of sum insured adequacy, base indemnity plans, and medical inflation protection.'
    },
    {
      id: 'claim-assistance',
      title: 'Claim Assistance',
      icon: FiFileText,
      iconColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      description: guidance[1]?.desc || 'Cashless hospital admission procedures, pre-authorization timelines, and avoiding non-medical deductions.'
    },
    {
      id: 'family-coverage',
      title: 'Family Coverage',
      icon: FiHeart,
      iconColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      description: guidance[2]?.desc || 'Structuring multi-individual floaters, parental coverage, and automatic sum insured restorations.'
    },
    {
      id: 'policy-review',
      title: 'Policy Review',
      icon: FiCheckCircle,
      iconColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      description: `In-depth fine-print scrutiny focusing on ${advisor.specialization || 'room rent limits and waiting period continuity'}.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#172B3A] text-left pb-20 sm:pb-0">
      
      {/* =========================================================================
          1. UNIQUE PROFILE HERO: VISUALLY RICH DARK NAVY SECTION
      ========================================================================= */}
      <header className="bg-gradient-to-b from-[#081325] via-[#0C1E38] to-[#0E2442] text-white pt-24 pb-12 sm:pt-28 sm:pb-14 relative overflow-hidden">
        {/* Subtle decorative mesh gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00A86B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation inside Hero */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/advisors"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors group px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm"
            >
              <FiArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
              <span>Back to Advisors</span>
            </Link>

            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              WHYINSURED Advisor Profile
            </span>
          </div>

          {/* Hero Row: Avatar + Details + Instant Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
            
            {/* Left: Avatar & Identity Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 flex-1 min-w-0">
              
              {/* Prominent Avatar with Ring & Shadow */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-white/15 shadow-2xl bg-white">
                  <AdvisorAvatar
                    advisor={advisor}
                    aspect="square"
                    className="w-full h-full"
                  />
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00A86B] border-3 border-[#0C1E38] flex items-center justify-center shadow-sm"
                  title="Active verified advisory desk"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              {/* Identity Details */}
              <div className="space-y-2 min-w-0 flex-1">
                {/* Badges line: Verification & Experience */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/25 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                    <FiShield className="text-emerald-400 text-xs" />
                    <span>{isCompany ? 'Verified Institutional Desk' : 'Verified Health Advisor'}</span>
                  </span>

                  {advisor.experience && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-200 bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                      <FiBriefcase className="text-slate-300 text-xs" />
                      <span>{advisor.experience}</span>
                    </span>
                  )}
                </div>

                {/* Name */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display leading-tight">
                  {advisor.name}
                </h1>

                {/* Designation & Company */}
                <p className="text-sm sm:text-base text-slate-300 font-medium">
                  {advisor.designation || (isCompany ? 'Institutional Advisory Desk' : 'Health Insurance Advisor')}
                  {advisor.companyName && advisor.companyName !== advisor.name && (
                    <span className="text-slate-400"> • {advisor.companyName}</span>
                  )}
                </p>

                {/* Genuine Rating Pill */}
                <div className="flex items-center gap-2 pt-0.5">
                  {ratingSummary.hasReviews ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white backdrop-blur-sm">
                      <span className="font-bold text-amber-300 text-sm leading-none">
                        {ratingSummary.ratingFormatted}
                      </span>
                      <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg
                            key={s}
                            className={`w-3 h-3 ${
                              s <= Math.round(ratingSummary.averageRating)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-white/20 fill-white/20'
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-slate-300">
                        ({ratingSummary.totalReviews} {ratingSummary.totalReviews === 1 ? 'client review' : 'client reviews'})
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                      <FiStar className="text-slate-400 text-xs" />
                      <span>Authentic reviews submitted by verified clients</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Prominent Call & WhatsApp Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-56 shrink-0 pt-2 md:pt-0">
              <a
                href={`tel:${cleanPhone}`}
                className="w-full py-3 px-4 rounded-xl bg-[#00A86B] hover:bg-[#0FA26E] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <FiPhone className="text-base" />
                <span>Call: {advisor.phone || '+91 98765 43210'}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <FaWhatsapp className="text-lg" />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="text-[11px] text-slate-400 text-center font-medium pt-0.5">
                {advisor.consultation?.availability || 'Available Mon – Sat (10 AM – 6:30 PM)'}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* =========================================================================
          2. CUSTOMER HELP SECTION: 4 VISUAL PILLARS
      ========================================================================= */}
      <section className="border-b border-slate-200/80 bg-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-[#00A86B] uppercase tracking-wider">
                Advisory Services
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display mt-0.5">
                What this Advisor Can Help You With
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Targeted guidance tailored to health indemnity contracts, network hospital clearance, and claims.
            </p>
          </div>

          {/* 4 Feature Help Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {helpBlocks.map((block) => {
              const IconComp = block.icon;
              return (
                <div
                  key={block.id}
                  className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#00A86B]/40 hover:bg-white hover:shadow-md transition-all duration-200 space-y-2 group"
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg ${block.iconColor}`}>
                    <IconComp />
                  </div>
                  <h3 className="text-sm font-bold text-[#102A43] group-hover:text-[#00A86B] transition-colors">
                    {block.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {block.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          EDITORIAL TWO-COLUMN LAYOUT
          - Left: Professional Narrative, Guidance Points, Customer Reviews
          - Right: Compact Sticky Contact Panel
      ========================================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: PROFESSIONAL EDITORIAL STORY & REVIEWS (8 cols)
          ===================================================================== */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 3. PROFESSIONAL ABOUT & EDITORIAL INFORMATION */}
            <article className="space-y-6">
              
              {/* Lead Statement */}
              <div className="border-l-4 border-[#00A86B] pl-4 sm:pl-5 py-1">
                <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed italic">
                  "{leadQuote}"
                </p>
                <span className="text-xs font-semibold text-slate-500 mt-1 block">
                  — {advisor.name}, {advisor.designation || (isCompany ? 'Institutional Advisory Desk' : 'Health Insurance Advisor')}
                </span>
              </div>

              {/* Narrative Biography */}
              <div className="space-y-3.5 text-sm text-slate-600 leading-relaxed font-normal">
                {introList.length > 0 ? (
                  introList.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))
                ) : (
                  <p>Objective health insurance guidance tailored to your family's healthcare requirements.</p>
                )}
              </div>

              {/* Experience Callout Banner */}
              {advisor.experience && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#102A43] to-[#1A3A5E] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Advisory Track Record
                    </span>
                    <h3 className="text-lg font-bold text-white font-display">
                      {advisor.experience} in Health Insurance Consultation
                    </h3>
                    <p className="text-xs text-slate-300">
                      Objective scrutiny of IRDAI policy contracts and hospital network pre-authorizations.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white backdrop-blur-sm inline-flex items-center gap-1.5">
                      <FiAward className="text-emerald-400" />
                      <span>Verified Record</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Areas of Expertise Pill Catalog */}
              {advisor.expertise && advisor.expertise.length > 0 && (
                <div className="pt-2 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Areas of Expertise:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {advisor.expertise.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white text-[#102A43] border border-slate-200 shadow-2xs hover:border-[#00A86B]/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Structured Advisory Guidance Points (Numbered Editorial Style) */}
              {advisor.guidancePoints && advisor.guidancePoints.length > 0 && (
                <div className="pt-4 space-y-4">
                  <div className="border-b border-slate-200 pb-2">
                    <h3 className="text-sm font-bold text-[#102A43] uppercase tracking-wider font-display">
                      Structured Guidance Provided to Clients
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {advisor.guidancePoints.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#00A86B]/40 transition-all flex items-start gap-4"
                      >
                        <span className="text-lg font-black text-emerald-600 font-mono shrink-0 w-8 pt-0.5">
                          0{idx + 1}
                        </span>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-[#102A43]">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* ===================================================================
                4. CUSTOMER REVIEWS & RATINGS SECTION
            =================================================================== */}
            <section className="pt-4 border-t border-slate-200 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#00A86B] uppercase tracking-wider">
                    Client Feedback
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display">
                    Customer Ratings & Reviews
                  </h2>
                  <p className="text-xs text-slate-500">
                    Authentic client reviews submitted following direct consultations.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-all cursor-pointer shadow-2xs shrink-0 self-start sm:self-auto"
                >
                  <FiMessageSquare className="text-xs" />
                  <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
                </button>
              </div>

              {/* Rating Summary Block */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Score */}
                <div className="md:col-span-5 text-center md:text-left md:border-r border-slate-100 md:pr-6 space-y-1">
                  <div className="flex items-baseline justify-center md:justify-start gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#102A43] font-display">
                      {ratingSummary.hasReviews ? ratingSummary.ratingFormatted : '—'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ 5.0</span>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 text-sm">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FiStar
                        key={s}
                        className={
                          ratingSummary.hasReviews && s <= Math.round(ratingSummary.averageRating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }
                      />
                    ))}
                  </div>

                  <p className="text-xs text-slate-500 pt-1">
                    {ratingSummary.hasReviews
                      ? `Based on ${ratingSummary.totalReviews} genuine ${ratingSummary.totalReviews === 1 ? 'client review' : 'client reviews'}`
                      : 'No client reviews recorded yet'}
                  </p>
                </div>

                {/* Rating Distribution Bars */}
                <div className="md:col-span-7 space-y-1.5">
                  {ratingBreakdown.map((row) => (
                    <div key={row.star} className="flex items-center gap-2.5 text-xs">
                      <span className="w-12 text-slate-600 font-medium shrink-0 flex items-center gap-1">
                        <span>{row.star}</span>
                        <FiStar className="text-[11px] text-amber-400 fill-amber-400" />
                      </span>

                      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-[#00A86B] rounded-full transition-all duration-500"
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>

                      <span className="w-8 text-right text-slate-400 font-mono text-[11px] shrink-0">
                        {row.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Submission Form Drawer */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-[#00A86B]/40 shadow-md space-y-4"
                >
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="text-sm font-bold text-[#102A43]">
                      Submit Your Genuine Review for {advisor.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Your feedback helps other policyholders make transparent insurance choices.
                    </p>
                  </div>

                  {reviewSuccessMessage && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                      <FiCheck className="text-emerald-600 text-base" />
                      <span>{reviewSuccessMessage}</span>
                    </div>
                  )}

                  {reviewErrorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                      {reviewErrorMessage}
                    </div>
                  )}

                  {/* Interactive Star Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = star <= (hoverRating || reviewRating);
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 text-2xl cursor-pointer focus:outline-none transition-transform hover:scale-110"
                            aria-label={`Rate ${star} star`}
                          >
                            <FiStar
                              className={
                                active
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-300'
                              }
                            />
                          </button>
                        );
                      })}
                      <span className="ml-2 text-xs font-medium text-slate-600">
                        {reviewRating === 5 && '5 - Excellent'}
                        {reviewRating === 4 && '4 - Very Good'}
                        {reviewRating === 3 && '3 - Good'}
                        {reviewRating === 2 && '2 - Fair'}
                        {reviewRating === 1 && '1 - Needs Improvement'}
                      </span>
                    </div>
                  </div>

                  {/* Name & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm">
                          <FiUser />
                        </span>
                        <input
                          type="text"
                          required
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="e.g. Ramesh Kulkarni"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs sm:text-sm text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        City / Location (Optional)
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm">
                          <FiMapPin />
                        </span>
                        <input
                          type="text"
                          value={reviewCity}
                          onChange={(e) => setReviewCity(e.target.value)}
                          placeholder="e.g. Mumbai, Pune"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs sm:text-sm text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Review Textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Written Feedback *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Describe how the advisor assisted you regarding room rent capping, restoration clauses, or cashless network guidance..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white resize-none transition-all"
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-end gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={reviewSubmitting}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#00A86B] hover:bg-[#0FA26E] text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
                    >
                      <FiSend className="text-xs" />
                      <span>{reviewSubmitting ? 'Posting...' : 'Submit Review'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Client Written Reviews List */}
              {reviews.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200/90 space-y-2 shadow-2xs">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-lg">
                    <FiMessageSquare />
                  </div>
                  <h3 className="text-sm font-bold text-[#102A43]">
                    No client reviews submitted yet
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Have you consulted with {advisor.name}? Click "Write a Review" above to submit your authentic feedback.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 text-left"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#102A43] text-white flex items-center justify-center text-xs font-bold">
                            {(rev.authorName || 'C').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-[#102A43] flex items-center gap-1.5">
                              <span>{rev.authorName}</span>
                              {rev.city && (
                                <span className="text-[11px] text-slate-400 font-normal">
                                  ({rev.city})
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                              <FiCheck className="text-[10px]" /> Verified Consultation
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-amber-400 text-xs">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <FiStar
                                key={s}
                                className={
                                  s <= Number(rev.rating)
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-300'
                                }
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-slate-400 hidden sm:inline">
                            {rev.dateFormatted || 'Recently'}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 pt-1 leading-relaxed">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>

          {/* =====================================================================
              RIGHT COLUMN: 5. COMPACT STICKY CONTACT PANEL (4 cols)
          ===================================================================== */}
          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            
            {/* Primary Contact Panel */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_24px_rgba(16,42,67,0.06)] space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold text-[#102A43] uppercase tracking-wider font-display">
                  Advisory & Contact Desk
                </h3>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available</span>
                </span>
              </div>

              {/* Direct Instant Action Buttons */}
              <div className="space-y-2">
                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs hover:shadow cursor-pointer text-center"
                >
                  <FiPhone className="text-sm" />
                  <span>Call: {advisor.phone || '+91 98765 43210'}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs hover:shadow cursor-pointer text-center"
                >
                  <FaWhatsapp className="text-base" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`mailto:${advisor.consultation?.email || 'whyinsured3@gmail.com'}`}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <FiMail className="text-xs text-slate-400" />
                  <span className="truncate">{advisor.consultation?.email || 'whyinsured3@gmail.com'}</span>
                </a>
              </div>

              {/* Advisory Logistics Details */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-2.5 text-slate-600">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <FiCalendar className="text-[#00A86B]" />
                    <span>Mode</span>
                  </span>
                  <span className="font-semibold text-[#102A43]">
                    {advisor.consultation?.mode || 'Online & Telephonic'}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <FiGlobe className="text-[#00A86B]" />
                    <span>Hours</span>
                  </span>
                  <span className="font-semibold text-[#102A43]">
                    {advisor.consultation?.availability || 'Mon – Sat'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <FiMapPin className="text-[#00A86B]" />
                    <span>Coverage</span>
                  </span>
                  <span className="font-semibold text-[#102A43]">
                    {advisor.consultation?.location || 'Pan-India (India)'}
                  </span>
                </div>
              </div>

              {/* Send Enquiry / Callback Form */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-[#102A43]">
                  Send an Advisory Enquiry
                </h4>

                {enquirySubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <FiCheckCircle className="text-emerald-600 text-2xl mx-auto" />
                    <p className="text-xs font-bold text-emerald-900">
                      Enquiry Received!
                    </p>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      Our desk will coordinate your session directly with {advisor.name}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setEnquirySubmitted(false)}
                      className="text-[10px] text-emerald-700 underline font-semibold cursor-pointer"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name *"
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number *"
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address *"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <select
                        value={enquiryForm.topic}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, topic: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2 text-xs text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white cursor-pointer"
                      >
                        <option value="Health Insurance Evaluation">Health Insurance Evaluation</option>
                        <option value="Family Floater Structuring">Family Floater Structuring</option>
                        <option value="Senior Citizen Coverage">Senior Citizen Coverage</option>
                        <option value="Critical Illness Review">Critical Illness Review</option>
                        <option value="Cashless Claims Guidance">Cashless Claims Guidance</option>
                        <option value="Policy Portability">Policy Portability</option>
                      </select>
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        placeholder="Your medical requirements or questions (optional)..."
                        value={enquiryForm.message}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={enquirySubmitting}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#00A86B] hover:bg-[#0FA26E] text-white text-xs font-semibold transition-all shadow-2xs hover:shadow cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <span>{enquirySubmitting ? 'Sending...' : 'Send Advisory Enquiry'}</span>
                      <FiArrowUpRight className="text-xs" />
                    </button>
                  </form>
                )}
              </div>

            </div>

          </aside>

        </div>
      </main>

      {/* =========================================================================
          MOBILE STICKY ACTION BAR: QUICK REACH CONTACT FOR TOUCH DEVICES
      ========================================================================= */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 z-30 flex items-center gap-2 sm:hidden shadow-lg">
        <a
          href={`tel:${cleanPhone}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#102A43] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <FiPhone className="text-sm" />
          <span>Call Now</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <FaWhatsapp className="text-base" />
          <span>WhatsApp</span>
        </a>
      </div>

    </div>
  );
}

export default function AdvisorDetailPage() {
  return (
    <AdvisorErrorBoundary>
      <AdvisorDetailContent />
    </AdvisorErrorBoundary>
  );
}

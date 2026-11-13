import React, { useState, useEffect, useMemo } from 'react';
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
  FiArrowUpRight
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
 * Premium, Professional & Customer-Friendly Advisor Detail Page
 * - Responsive 2-column desktop layout (content on left, contact sidebar on right)
 * - Profile Header with photo/logo, designation, verified status & quick Call/WhatsApp
 * - About, Expertise, Customer Benefits, and Reviews & Ratings with breakdown
 * - Working contact & enquiry callback submission
 */
export default function AdvisorDetailPage() {
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

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState(null);
  const [reviewErrorMessage, setReviewErrorMessage] = useState(null);

  // Enquiry Form state (Contact Section)
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'Health Insurance Evaluation',
    message: ''
  });
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Load Advisor Details
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

  // Load genuine reviews & subscribe to updates
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

  // Dynamic Rating Breakdown (5-star to 1-star) calculated from real submitted reviews
  const ratingBreakdown = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const star = Math.max(1, Math.min(5, Math.round(Number(r.rating) || 5)));
      counts[star] = (counts[star] || 0) + 1;
    });
    const total = reviews.length;
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star],
      percentage: total > 0 ? Math.round((counts[star] / total) * 100) : 0
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
      // Refresh local reviews state
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
      `• Name: ${enquiryForm.name}\n` +
      `• Phone: ${enquiryForm.phone}\n` +
      `• Email: ${enquiryForm.email}\n` +
      `• Topic: ${enquiryForm.topic}\n` +
      `• Message: ${enquiryForm.message || 'N/A'}\n\n` +
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
      <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-16 font-sans">
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

  const isCompany = advisor.type === 'company';
  const cleanPhone = (advisor.whatsapp || advisor.phone || '919876543210').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${advisor.name}, I am contacting you via WHYINSURED regarding health insurance guidance.`
  )}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16 font-sans text-[#172B3A] text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            BREADCRUMBS & BACK LINK
        ========================================================================= */}
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/advisors"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#00A86B] transition-colors py-1 cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#102A43] group-hover:border-[#00A86B] group-hover:text-[#00A86B] transition-all shadow-2xs">
              <FiArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>Back to All Advisors</span>
          </Link>

          <span className="text-[11px] text-slate-400">
            Advisors Directory / {advisor.name}
          </span>
        </div>

        {/* =========================================================================
            1. PROFILE HEADER
            - Original photo or company logo
            - Advisor name and designation
            - Genuine rating and review count
            - Verification status badge
            - Prominent Call and WhatsApp buttons
        ========================================================================= */}
        <section className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(16,42,67,0.04)] p-5 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            
            {/* Photo / Logo & Primary Information */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-50 shadow-2xs">
                <AdvisorAvatar
                  advisor={advisor}
                  aspect="square"
                  className="w-full h-full"
                />
              </div>

              <div className="space-y-1">
                {/* Verification Status */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0B6946] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#00A86B]/25">
                    <FiShield className="text-xs text-[#00A86B]" />
                    <span>{isCompany ? 'Verified Insurer Desk' : 'Verified Advisor'}</span>
                  </span>
                  
                  {advisor.experience && (
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {advisor.experience}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display tracking-tight">
                  {advisor.name}
                </h1>

                {/* Designation */}
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {advisor.designation || advisor.category}
                  {advisor.companyName && advisor.companyName !== advisor.name && (
                    <span className="text-slate-400"> • {advisor.companyName}</span>
                  )}
                </p>

                {/* Genuine Rating & Review Count */}
                <div className="pt-0.5 flex items-center gap-2 text-xs">
                  {ratingSummary.hasReviews ? (
                    <div className="flex items-center gap-1 text-[#102A43] font-bold">
                      <FiStar className="fill-amber-400 text-amber-400 text-sm" />
                      <span>{ratingSummary.ratingFormatted}</span>
                      <span className="text-slate-400 font-normal">
                        ({ratingSummary.totalReviews}{' '}
                        {ratingSummary.totalReviews === 1 ? 'client review' : 'client reviews'})
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-slate-400">
                      <FiStar className="text-slate-300 text-xs" />
                      <span>No reviews yet</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Prominent Call & WhatsApp Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
              <a
                href={`tel:${advisor.phone || '+919876543210'}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow cursor-pointer text-center"
                title={`Call ${advisor.name}`}
              >
                <FiPhone className="text-sm" />
                <span>Call Directly</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow cursor-pointer text-center"
                title={`WhatsApp ${advisor.name}`}
              >
                <FaWhatsapp className="text-base" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>
        </section>

        {/* =========================================================================
            TWO-COLUMN DESKTOP LAYOUT
            - Left Column: About, Expertise, Customer Benefits, Reviews & Ratings
            - Right Column: Contact & Callback Section (Sticky Sidebar)
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* =======================================================================
              LEFT COLUMN (MAIN ADVISOR INFORMATION)
          ======================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 2. ABOUT SECTION */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-3">
              <h2 className="text-base font-bold text-[#102A43] font-display border-b border-slate-100 pb-2">
                About this Advisor
              </h2>

              <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {Array.isArray(advisor.intro) ? (
                  advisor.intro.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))
                ) : (
                  <p>{advisor.intro || advisor.shortDescription}</p>
                )}
              </div>

              {/* Experience Highlight if Available */}
              {advisor.experience && (
                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Advisory Background</span>
                  <span className="font-bold text-[#102A43]">{advisor.experience} in Healthcare Advisory</span>
                </div>
              )}
            </section>

            {/* 3. EXPERTISE SECTION */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-bold text-[#102A43] font-display border-b border-slate-100 pb-2">
                Insurance Categories & Expertise
              </h2>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Primary Specialization:</span>
                  <span className="text-xs font-bold text-[#0FA26E]">{advisor.specialization}</span>
                </div>

                {advisor.expertise && advisor.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {advisor.expertise.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#F0FDF4] text-[#0B6946] border border-[#00A86B]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Offered to Customers */}
              {advisor.guidancePoints && advisor.guidancePoints.length > 0 && (
                <div className="pt-2 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Services Offered to Customers:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {advisor.guidancePoints.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1"
                      >
                        <h4 className="text-xs font-bold text-[#102A43] flex items-center gap-1.5">
                          <FiCheck className="text-[#00A86B] text-xs shrink-0" />
                          <span>{item.title}</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 4. CUSTOMER BENEFITS SECTION */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-3">
              <h2 className="text-base font-bold text-[#102A43] font-display border-b border-slate-100 pb-2">
                How this Advisor Helps You (Customer Benefits)
              </h2>

              <p className="text-xs text-slate-500">
                Direct benefits you receive when consulting with {advisor.name}:
              </p>

              <div className="space-y-2 pt-1">
                {advisor.whatYouGet && advisor.whatYouGet.length > 0 ? (
                  advisor.whatYouGet.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-[#102A43] font-medium p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                      <span className="w-5 h-5 rounded-full bg-[#00A86B]/15 text-[#00A86B] flex items-center justify-center shrink-0 mt-0.5">
                        <FiCheck className="text-xs" />
                      </span>
                      <span className="leading-relaxed">{benefit}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start gap-2.5 text-xs text-[#102A43] font-medium p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                      <span className="w-5 h-5 rounded-full bg-[#00A86B]/15 text-[#00A86B] flex items-center justify-center shrink-0 mt-0.5">
                        <FiCheck className="text-xs" />
                      </span>
                      <span className="leading-relaxed">Objective policy scrutiny without sales bias or quota pressure</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-[#102A43] font-medium p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                      <span className="w-5 h-5 rounded-full bg-[#00A86B]/15 text-[#00A86B] flex items-center justify-center shrink-0 mt-0.5">
                        <FiCheck className="text-xs" />
                      </span>
                      <span className="leading-relaxed">Detection of room rent capping, proportionate deductions, and hidden sub-limits</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-[#102A43] font-medium p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                      <span className="w-5 h-5 rounded-full bg-[#00A86B]/15 text-[#00A86B] flex items-center justify-center shrink-0 mt-0.5">
                        <FiCheck className="text-xs" />
                      </span>
                      <span className="leading-relaxed">Pre-authorization admission checklist and cashless hospital network guidance</span>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* 5. REVIEWS & RATINGS SECTION WITH BREAKDOWN */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-bold text-[#102A43] font-display">
                    Customer Ratings & Reviews
                  </h2>
                  <p className="text-xs text-slate-500">
                    Transparent, authentic reviews submitted by verified clients.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-all cursor-pointer shadow-2xs shrink-0"
                >
                  <FiMessageSquare className="text-xs" />
                  <span>{showReviewForm ? 'Cancel' : 'Write a Review'}</span>
                </button>
              </div>

              {/* Rating Summary & Star Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200 items-center">
                
                {/* Average Score */}
                <div className="md:col-span-5 text-center md:text-left md:border-r border-slate-200 md:pr-4 space-y-1">
                  <div className="flex items-baseline justify-center md:justify-start gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-[#102A43]">
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

                  <p className="text-[11px] text-slate-500">
                    {ratingSummary.hasReviews
                      ? `Based on ${ratingSummary.totalReviews} genuine ${ratingSummary.totalReviews === 1 ? 'review' : 'reviews'}`
                      : 'No customer ratings submitted yet'}
                  </p>
                </div>

                {/* Rating Breakdown Bars (5 to 1 Star) */}
                <div className="md:col-span-7 space-y-1.5">
                  {ratingBreakdown.map((row) => (
                    <div key={row.star} className="flex items-center gap-2 text-[11px]">
                      <span className="w-12 text-slate-600 font-medium shrink-0 flex items-center gap-0.5">
                        <span>{row.star}</span>
                        <FiStar className="text-[10px] text-amber-400 fill-amber-400" />
                      </span>
                      
                      <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full bg-[#00A86B] rounded-full transition-all duration-500"
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>

                      <span className="w-8 text-right text-slate-400 font-mono text-[10px] shrink-0">
                        {row.count}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-4 sm:p-5 rounded-xl bg-white border border-[#00A86B]/30 shadow-xs space-y-3"
                >
                  <h4 className="text-xs font-bold text-[#102A43]">
                    Submit Your Feedback for {advisor.name}
                  </h4>

                  {reviewSuccessMessage && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                      <FiCheck className="text-emerald-600" />
                      <span>{reviewSuccessMessage}</span>
                    </div>
                  )}

                  {reviewErrorMessage && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                      {reviewErrorMessage}
                    </div>
                  )}

                  {/* Star Rating Selector */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = star <= (hoverRating || reviewRating);
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 text-xl cursor-pointer focus:outline-none"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 text-xs">
                          <FiUser />
                        </span>
                        <input
                          type="text"
                          required
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="e.g. Ankit Sharma"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-8 pr-2.5 text-xs text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        City / Location (Optional)
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 text-xs">
                          <FiMapPin />
                        </span>
                        <input
                          type="text"
                          value={reviewCity}
                          onChange={(e) => setReviewCity(e.target.value)}
                          placeholder="e.g. Mumbai, Delhi"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-8 pr-2.5 text-xs text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Written Review */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Written Review *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience regarding policy selection, clarity of terms, or claim guidance..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={reviewSubmitting}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#00A86B] hover:bg-[#0FA26E] text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                    >
                      <FiSend className="text-xs" />
                      <span>{reviewSubmitting ? 'Posting...' : 'Submit Review'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Customer Reviews List */}
              {reviews.length === 0 ? (
                <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="text-xs font-semibold text-[#102A43]">
                    No client reviews submitted yet
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Have you consulted with {advisor.name}? Click "Write a Review" above to submit your genuine feedback.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#102A43] text-white flex items-center justify-center text-[10px] font-bold">
                            {(rev.authorName || 'C').charAt(0).toUpperCase()}
                          </div>
                          <span className="text-xs font-bold text-[#102A43]">
                            {rev.authorName}
                          </span>
                          {rev.city && (
                            <span className="text-[10px] text-slate-400">
                              ({rev.city})
                            </span>
                          )}
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
                          <span className="text-[10px] text-slate-400">
                            {rev.dateFormatted || 'Recently'}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 pt-0.5">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>

          {/* =======================================================================
              RIGHT COLUMN: 6. CONTACT SECTION (STICKY SIDEBAR)
          ======================================================================= */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            
            {/* Primary Contact Card */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
              <h2 className="text-sm font-bold text-[#102A43] uppercase tracking-wider border-b border-slate-100 pb-2">
                Contact this Advisor
              </h2>

              {/* Direct Actions */}
              <div className="space-y-2">
                <a
                  href={`tel:${advisor.phone || '+919876543210'}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer text-center"
                >
                  <FiPhone className="text-sm" />
                  <span>Call: {advisor.phone || '+91 98765 43210'}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer text-center"
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

              {/* Key Logistics */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-2 text-slate-600">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/50">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <FiCalendar className="text-[#00A86B]" />
                    <span>Mode</span>
                  </span>
                  <span className="font-semibold text-[#102A43]">
                    {advisor.consultation?.mode || 'Online & Telephonic'}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/50">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <FiGlobe className="text-[#00A86B]" />
                    <span>Availability</span>
                  </span>
                  <span className="font-semibold text-[#102A43]">
                    {advisor.consultation?.availability || 'Mon – Sat'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <FiMapPin className="text-[#00A86B]" />
                    <span>Location</span>
                  </span>
                  <span className="font-semibold text-[#102A43]">
                    {advisor.consultation?.location || 'India'}
                  </span>
                </div>
              </div>

              {/* Quick Advisory Callback Form */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <h3 className="text-xs font-bold text-[#102A43]">
                  Request an Advisory Callback
                </h3>

                {enquirySubmitted ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <FiCheckCircle className="text-emerald-600 text-2xl mx-auto" />
                    <p className="text-xs font-bold text-emerald-900">
                      Request Received!
                    </p>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      Our desk will coordinate your advisory session with {advisor.name}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setEnquirySubmitted(false)}
                      className="text-[10px] text-emerald-700 underline font-semibold cursor-pointer"
                    >
                      Send another request
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number *"
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address *"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white"
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
                        placeholder="Your question or medical condition (optional)..."
                        value={enquiryForm.message}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={enquirySubmitting}
                      className="w-full py-2 px-3 rounded-xl bg-[#00A86B] hover:bg-[#0FA26E] text-white text-xs font-semibold transition-all shadow-2xs hover:shadow cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <span>{enquirySubmitting ? 'Submitting...' : 'Request Advisory Callback'}</span>
                      <FiArrowUpRight className="text-xs" />
                    </button>
                  </form>
                )}
              </div>

            </section>

          </div>

        </div>

      </div>
    </div>
  );
}

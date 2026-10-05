import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { companiesData } from '../data/companies';
import { findHdfcPlan, resolveHdfcPlanId } from '../data/hdfcPlanRegistry';
import HdfcPlanDetailSection from '../components/HdfcPlanDetailSection';
import MedicareSelectSection from '../components/MedicareSelectSection';
import IciciCompleteHealthSection from '../components/IciciCompleteHealthSection';
import NivaBupaPlanDetailSection from '../components/NivaBupaPlanDetailSection';
import StarHealthPlanDetailSection from '../components/StarHealthPlanDetailSection';
import CareHealthPlanDetailSection from '../components/CareHealthPlanDetailSection';
import MagmaPlanDetailSection from '../components/MagmaPlanDetailSection';
import ReliancePlanDetailSection from '../components/ReliancePlanDetailSection';
import ManipalCignaPlanDetailSection from '../components/ManipalCignaPlanDetailSection';
import AdityaBirlaPlanDetailSection from '../components/AdityaBirlaPlanDetailSection';
import BajajPlanDetailSection from '../components/BajajPlanDetailSection';
import SbiPlanDetailSection from '../components/SbiPlanDetailSection';
import AckoPlanDetailSection from '../components/AckoPlanDetailSection';
import StandardPlanDetailSection from '../components/StandardPlanDetailSection';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/+$/, '');

export default function PlanDetail() {
  const { companyId, planId } = useParams();
  const [dynamicPlan, setDynamicPlan] = React.useState(null);

  // Static company lookup
  const staticCompany = companiesData.find(
    c => c.slug === companyId || c.id === companyId || (companyId === 'hdfc-life' && (c.id === 'hdfc-ergo' || c.slug === 'hdfc-ergo'))
  );

  const isHdfcErgoInitial = staticCompany?.id === 'hdfc-ergo' || staticCompany?.id === 'hdfc-life' || companyId === 'hdfc-ergo' || companyId === 'hdfc-life';

  // Synchronous static plan check to see if data is already available in memory
  const initialStaticPlan = isHdfcErgoInitial
    ? findHdfcPlan(staticCompany, planId)
    : staticCompany?.plans?.find(p => p.id === planId || p.slug === planId);

  const initialHasMatchingPlan = Boolean(initialStaticPlan);

  // Loading state machine:
  // If we already have the static plan in memory, isLoading is false.
  // If not in static dictionary (e.g. newly added plan or new company), isLoading is TRUE until API fetch resolves!
  const [isLoading, setIsLoading] = React.useState(!initialHasMatchingPlan);
  const [isFetched, setIsFetched] = React.useState(Boolean(initialHasMatchingPlan));

  // Fetch dynamic plan from backend API
  React.useEffect(() => {
    let isMounted = true;

    if (!initialHasMatchingPlan) {
      setIsLoading(true);
      setIsFetched(false);
    }

    async function loadDynamicPlan() {
      try {
        const targetPlanSlug = isHdfcErgoInitial ? (resolveHdfcPlanId(planId) || planId) : planId;
        const res = await fetch(`${API_BASE_URL}/api/public/plans/${companyId}/${targetPlanSlug}`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.success && json.data) {
            setDynamicPlan(json.data);
          }
        }
      } catch (e) {
        // Graceful fallback to static dictionary
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsFetched(true);
        }
      }
    }

    loadDynamicPlan();
    return () => {
      isMounted = false;
    };
  }, [companyId, planId]);

  // Company resolution (dynamic from API or static fallback)
  const baseCompany = staticCompany || (dynamicPlan?.company ? {
    id: dynamicPlan.company.id || dynamicPlan.company.slug || companyId,
    slug: dynamicPlan.company.slug || companyId,
    name: dynamicPlan.company.name || dynamicPlan.companyName || companyId,
    fullName: dynamicPlan.company.full_name || dynamicPlan.company.name || companyId,
    logo: dynamicPlan.company.logo || dynamicPlan.companyLogo || '',
    description: dynamicPlan.company.description || '',
    theme: {
      primary: dynamicPlan.company.primary_color || '#0038A8',
      secondary: dynamicPlan.company.secondary_color || '#F0F4FF',
      accent: dynamicPlan.company.primary_color || '#0038A8',
      background: dynamicPlan.company.secondary_color || '#F0F4FF',
      text: '#0F172A'
    },
    plans: []
  } : null);

  // If dynamic plan has company branding from API (authoritative source if updated in Admin Panel), use it
  const company = baseCompany ? {
    ...baseCompany,
    logo: dynamicPlan?.company?.logo || baseCompany.logo,
    primary_color: dynamicPlan?.company?.primary_color || baseCompany.primary_color || baseCompany.theme?.primary || '#0038A8',
    secondary_color: dynamicPlan?.company?.secondary_color || baseCompany.secondary_color || baseCompany.theme?.secondary || '#F0F4FF',
    theme: {
      ...baseCompany.theme,
      primary: dynamicPlan?.company?.primary_color || baseCompany.theme?.primary || '#0038A8',
      secondary: dynamicPlan?.company?.secondary_color || baseCompany.theme?.secondary || '#F0F4FF',
      accent: dynamicPlan?.company?.primary_color || baseCompany.theme?.accent || baseCompany.theme?.primary || '#0038A8',
      background: dynamicPlan?.company?.secondary_color || baseCompany.theme?.background || '#F8FAFC'
    }
  } : null;

  const isHdfcErgo = company?.id === 'hdfc-ergo' || company?.id === 'hdfc-life' || company?.slug === 'hdfc-ergo' || company?.slug === 'hdfc-life';

  // Static plan fallback (strict match by ID or slug)
  const staticPlan = isHdfcErgo
    ? findHdfcPlan(company, planId)
    : company?.plans?.find(p => p.id === planId || p.slug === planId);

  const isMatchingStaticPlan = Boolean(staticPlan);

  // Active plan merging dynamic CMS data
  const plan = dynamicPlan ? {
    ...(isMatchingStaticPlan ? staticPlan : {}),
    ...dynamicPlan,
    name: dynamicPlan.name || (isMatchingStaticPlan ? staticPlan?.name : ''),
    description: dynamicPlan.description || dynamicPlan.tagline || (isMatchingStaticPlan ? staticPlan?.description : ''),
    coverage: dynamicPlan.coverage || (isMatchingStaticPlan ? staticPlan?.coverage : ''),
    details: {
      ...(isMatchingStaticPlan ? staticPlan?.details : {}),
      ...dynamicPlan.details
    }
  } : (isMatchingStaticPlan ? staticPlan : null);

  const hdfcCanonicalPlanId = isHdfcErgo ? (resolveHdfcPlanId(planId) || planId) : null;

  // =========================================================================
  // STATE MACHINE GUARDS — PREVENT PAGE NOT FOUND FLASH
  // =========================================================================

  // 1. While still loading and plan not yet available: show clean Loading state (NEVER show Not Found flash!)
  if (isLoading && !plan) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-20 px-4 bg-slate-50 font-sans">
        <div className="w-10 h-10 border-3 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin mb-4" />
        <h2 className="text-base sm:text-lg font-bold text-slate-800 font-display">Loading Plan Details...</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Fetching verified policy information</p>
      </div>
    );
  }

  // 2. Only show "Plan Not Found" after request has definitely completed and the plan does not exist
  if (isFetched && (!company || !plan)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-20 px-4 bg-slate-50 font-sans">
        <h1 className="text-2xl font-bold text-slate-800 font-display">Plan Not Found</h1>
        <p className="text-sm text-slate-500 mt-2 mb-6">The requested plan details could not be found.</p>
        <Link to="/" className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  // 3. Fallback guard while initial mount state reconciles
  if (!company || !plan) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-20 px-4 bg-slate-50 font-sans">
        <div className="w-10 h-10 border-3 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-600">Resolving policy...</p>
      </div>
    );
  }

  const { theme } = company;

  // Normalize company key to check against canonical dedicated components
  const compKey = String(company.slug || company.id || companyId || '').toLowerCase().trim();

  // Apply custom CSS variables for the theme
  const themeStyles = {
    '--primary': theme.primary || company.primary_color || '#0038A8',
    '--secondary': theme.secondary || company.secondary_color || '#F0F4FF',
    '--accent': theme.accent || theme.primary || company.primary_color || '#0038A8',
    '--bg': theme.background || '#F8FAFC',
    '--text': theme.text || '#0F172A',
  };

  return (
    <div
      style={{ ...themeStyles, backgroundColor: 'var(--bg)' }}
      className="min-h-screen font-sans pt-[88px] sm:pt-24 pb-2 sm:pb-20 relative transition-colors duration-300"
    >
      {compKey !== 'magma-hdi' && (
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{ backgroundColor: 'var(--primary)' }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Render Company Dedicated Component or Standard WHYINSURED Plan Detail Section */}
        {(compKey === 'hdfc-life' || compKey === 'hdfc-ergo') ? (
          <HdfcPlanDetailSection
            key={hdfcCanonicalPlanId || plan.id}
            planId={hdfcCanonicalPlanId || plan.id}
            plan={plan}
            company={company}
          />
        ) : compKey === 'tata-aig' ? (
          <MedicareSelectSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : compKey === 'icici-lombard' ? (
          <IciciCompleteHealthSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : compKey === 'niva-bupa' ? (
          <NivaBupaPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : compKey === 'star-health' ? (
          <StarHealthPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : compKey === 'care-health' ? (
          <CareHealthPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : compKey === 'reliance-general' ? (
          <ReliancePlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : compKey === 'magma-hdi' ? (
          <MagmaPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : compKey === 'manipal-cigna' ? (
          <ManipalCignaPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : compKey === 'aditya-birla' ? (
          <AdityaBirlaPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : compKey === 'bajaj-general' ? (
          <BajajPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : compKey === 'sbi-general' ? (
          <SbiPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : compKey === 'acko' ? (
          <AckoPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : (
          <StandardPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiShield, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { companiesData } from '../data/companies';
import { findHdfcPlan, resolveHdfcPlanId } from '../data/hdfcPlanRegistry';
import { getPlanDetailData } from '../utils/compareDataHelper';
import PlanHealthSnapshot from '../components/PlanHealthSnapshot';
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

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/+$/, '');

export default function PlanDetail() {
  const { companyId, planId } = useParams();
  const [dynamicPlan, setDynamicPlan] = React.useState(null);

  // Fetch dynamic plan from backend API
  React.useEffect(() => {
    let isMounted = true;
    async function loadDynamicPlan() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/public/plans/${companyId}/${planId}`);
        if (!res.ok) return;
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          setDynamicPlan(json.data);
        }
      } catch (e) {
        // Graceful fallback to static dictionary
      }
    }
    loadDynamicPlan();
    return () => {
      isMounted = false;
    };
  }, [companyId, planId]);

  // Static company fallback
  const staticCompany = companiesData.find(
    c => c.slug === companyId || c.id === companyId || (companyId === 'hdfc-life' && (c.id === 'hdfc-ergo' || c.slug === 'hdfc-ergo'))
  );

  // Company resolution (dynamic from API or static fallback)
  const company = staticCompany || (dynamicPlan?.company ? {
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

  const isHdfcErgo = company?.id === 'hdfc-ergo' || company?.id === 'hdfc-life';

  // Static plan fallback
  const staticPlan = isHdfcErgo
    ? findHdfcPlan(company, planId)
    : company?.plans?.find(p => p.id === planId) ||
    (company?.id === 'tata-aig' ? (company?.plans?.find(p => p.id === planId) || company?.plans?.[0]) : null) ||
    (company?.id === 'icici-lombard' ? (company?.plans?.find(p => p.id === planId) || company?.plans?.[0]) : null) ||
    (company?.id === 'niva-bupa' ? (company?.plans?.find(p => p.id === planId) || company?.plans?.[0]) : null) ||
    (company?.id === 'star-health' ? (company?.plans?.find(p => p.id === planId) || company?.plans?.[0]) : null) ||
    (company?.id === 'care-health' ? (company?.plans?.find(p => p.id === planId) || company?.plans?.[0]) : null) ||
    (company?.id === 'reliance-general' ? (company?.plans?.find(p => p.id === planId) || company?.plans?.[0]) : null) ||
    (company?.id === 'magma-hdi' ? (company?.plans?.find(p => p.id === planId) || company?.plans?.[0]) : null) ||
    (company?.id === 'manipal-cigna' ? (company?.plans?.find(p => p.id === planId) || company?.plans?.[0]) : null) ||
    (company?.id === 'aditya-birla' ? (company?.plans?.find(p => p.id === planId) || company?.plans?.[0]) : null) ||
    (company?.id === 'bajaj-general' ? (company?.plans?.find(p => p.id === planId) || company?.plans?.[0]) : null) ||
    (company?.id === 'sbi-general' ? (company?.plans?.find(p => p.id === planId) || company?.plans?.[0]) : null) ||
    (company?.id === 'acko' ? (company?.plans?.find(p => p.id === planId) || company?.plans?.[0]) : null);

  // Active plan merging dynamic CMS data
  const plan = dynamicPlan ? {
    ...staticPlan,
    ...dynamicPlan,
    name: dynamicPlan.name || staticPlan?.name,
    description: dynamicPlan.description || dynamicPlan.tagline || staticPlan?.description,
    coverage: dynamicPlan.coverage || staticPlan?.coverage,
    details: {
      ...staticPlan?.details,
      ...dynamicPlan.details
    }
  } : staticPlan;

  const hdfcCanonicalPlanId = isHdfcErgo ? resolveHdfcPlanId(planId) : null;

  if (!company || !plan) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-20 px-4 bg-slate-50 font-sans">
        <h1 className="text-2xl font-bold text-slate-800">Plan Not Found</h1>
        <p className="text-sm text-slate-500 mt-2 mb-6">The requested plan details could not be found.</p>
        <Link to="/" className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  const { theme, name, logo } = company;

  const isSpecialCompanyWithOwnComponent = company.id === 'hdfc-life' || company.id === 'hdfc-ergo' || company.id === 'tata-aig' || company.id === 'icici-lombard' || company.id === 'niva-bupa' || company.id === 'star-health' || company.id === 'care-health' || company.id === 'reliance-general' || company.id === 'magma-hdi' || company.id === 'manipal-cigna' || company.id === 'aditya-birla' || company.id === 'bajaj-general' || company.id === 'sbi-general' || company.id === 'acko';
  
  // Detail sections: If dynamic CMS features are provided and not special company, map them cleanly
  let rawDetailSections = [];
  if (!isSpecialCompanyWithOwnComponent) {
    if (dynamicPlan?.featuresSections && dynamicPlan.featuresSections.length > 0) {
      rawDetailSections = dynamicPlan.featuresSections.map(sec => ({
        title: sec.title || 'Policy Benefits',
        isGrouped: false,
        features: (sec.items || []).map(item => ({
          title: item.title,
          value: item.points && item.points.length > 0 ? item.points : (item.summary || item.subtitle || 'Covered')
        }))
      }));
    } else {
      rawDetailSections = getPlanDetailData(plan, company);
    }
  }

  const detailSections = company.id === 'tata-aig'
    ? rawDetailSections.filter(section => section.title !== 'Ratio' && section.title !== 'Fundamentals')
    : rawDetailSections;

  const renderDetailValue = (val) => {
    if (Array.isArray(val)) {
      return (
        <ul className="text-left space-y-1 list-none pl-0 w-full">
          {val.slice(0, 4).map((item, idx) => (
            <li key={idx} className="flex items-start gap-1.5 text-xs font-semibold text-slate-600 leading-tight">
              <span className="text-emerald-500 shrink-0 select-none">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    const textVal = String(val || "").trim();
    const lowerVal = textVal.toLowerCase();

    const isYes = lowerVal === 'yes' || lowerVal === 'available' || lowerVal.includes('✓') || lowerVal === 'covered' || lowerVal.startsWith('covered');
    const isNo = lowerVal === 'no' || lowerVal === 'not available' || lowerVal.includes('✕') || lowerVal === 'not covered' || lowerVal.startsWith('not covered');

    if (isYes) {
      const cleanText = textVal.replace(/^[✓\s]+/, '').replace(/covered/i, 'Covered').replace(/available/i, 'Available').replace(/yes/i, 'Yes');
      return (
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50">
          <span className="text-[11px] sm:text-xs select-none">✓</span>
          <span>{cleanText || "Covered"}</span>
        </span>
      );
    }

    if (isNo) {
      const cleanText = textVal.replace(/^[✕\s]+/, '').replace(/not covered/i, 'Not Covered').replace(/not available/i, 'Not Available').replace(/no/i, 'No');
      return (
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-100/50">
          <span className="text-[11px] sm:text-xs select-none">✕</span>
          <span>{cleanText || "Not Covered"}</span>
        </span>
      );
    }

    return (
      <span className="text-slate-700 font-semibold text-xs sm:text-sm leading-normal break-words">
        {textVal}
      </span>
    );
  };

  // Apply custom CSS variables for the theme
  const themeStyles = {
    '--primary': theme.primary,
    '--secondary': theme.secondary,
    '--accent': theme.accent,
    '--bg': theme.background,
    '--text': theme.text,
  };

  const isSpecialCompany = company.id === 'hdfc-life' || company.id === 'hdfc-ergo' || company.id === 'tata-aig' || company.id === 'icici-lombard' || company.id === 'niva-bupa' || company.id === 'star-health' || company.id === 'care-health' || company.id === 'reliance-general' || company.id === 'magma-hdi' || company.id === 'manipal-cigna' || company.id === 'aditya-birla' || company.id === 'bajaj-general' || company.id === 'sbi-general';

  return (
    <div style={{ ...themeStyles, backgroundColor: 'var(--bg)' }} className={`min-h-screen font-sans ${isSpecialCompany ? 'pt-[88px] sm:pt-24 pb-2 sm:pb-20' : 'pt-24 pb-20'} relative transition-colors duration-300`}>
      {company.id !== 'magma-hdi' && (
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{ backgroundColor: 'var(--primary)' }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HDFC ERGO, Tata AIG, ICICI Lombard, Niva Bupa, Star Health, Care Health & Magma Viewport Structure */}
        {(company.id === 'hdfc-life' || company.id === 'hdfc-ergo') ? (
          <HdfcPlanDetailSection
            key={hdfcCanonicalPlanId || plan.id}
            planId={hdfcCanonicalPlanId || plan.id}
            plan={plan}
            company={company}
          />
        ) : company.id === 'tata-aig' ? (
          <MedicareSelectSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : company.id === 'icici-lombard' ? (
          <IciciCompleteHealthSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : company.id === 'niva-bupa' ? (
          <NivaBupaPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : company.id === 'star-health' ? (
          <StarHealthPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : company.id === 'care-health' ? (
          <CareHealthPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : company.id === 'reliance-general' ? (
          <ReliancePlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : company.id === 'magma-hdi' ? (
          <MagmaPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : company.id === 'manipal-cigna' ? (
          <ManipalCignaPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : company.id === 'aditya-birla' ? (
          <AdityaBirlaPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : company.id === 'bajaj-general' ? (
          <BajajPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : company.id === 'sbi-general' ? (
          <SbiPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : company.id === 'acko' ? (
          <AckoPlanDetailSection key={plan.id} plan={plan} company={company} planId={plan.id} />
        ) : (
              <>
                {/* Plan Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ background: theme.gradient ? theme.gradient : 'var(--primary)' }}
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded border"
                      style={{
                        backgroundColor: 'var(--bg)',
                        color: 'var(--primary)',
                        borderColor: `${theme.primary}20`
                      }}
                    >
                      Health Policy
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{name}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                    {plan.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-medium">
                    {plan.description}
                  </p>
                </div>

                {/* Logo - Clean view without outer card or frame */}
                <img
                  src={logo}
                  alt={name}
                  className="w-28 sm:w-36 h-auto max-h-12 sm:max-h-16 object-contain select-none self-start sm:self-center shrink-0"
                />
              </div>
            </div>



            {/* Plan Health Snapshot Section (Tata AIG Plans ONLY) */}
            {company.id === 'tata-aig' && (
              <PlanHealthSnapshot plan={plan} company={company} />
            )}

            {/* Policy Details Grid */}
            {/* Dynamic Policy Details Sections */}
            <div className="space-y-8 mb-8">
              {detailSections.map((section, secIdx) => (
                <div key={secIdx} className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 px-1 pt-4">
                    <div className="h-[1.5px] w-4 rounded-full bg-[var(--primary)]" style={{ backgroundColor: 'var(--primary)' }} />
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">
                      {section.title}
                    </h3>
                    <div className="h-[1px] flex-grow bg-slate-200/60" />
                  </div>

                  {/* Category Card */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    {section.isGrouped ? (
                      section.groups.map((group, groupIdx) => (
                        <div key={groupIdx} className="border-b border-slate-100 last:border-b-0">
                          {/* Sub-Group Header */}
                          <div className="bg-slate-50/50 px-5 py-2 border-b border-slate-100">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
                              {group.title}
                            </span>
                          </div>

                          {/* Sub-Group Features */}
                          <div className="divide-y divide-slate-50">
                            {group.features.map((feat, featIdx) => (
                              <div key={featIdx} className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center hover:bg-slate-50/20 transition-colors">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block sm:inline">
                                  {feat.title}
                                </span>
                                <div className="sm:col-span-2 mt-1 sm:mt-0 flex text-left">
                                  {renderDetailValue(feat.value)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="divide-y divide-slate-50">
                        {section.features.map((feat, featIdx) => (
                          <div key={featIdx} className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center hover:bg-slate-50/20 transition-colors">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block sm:inline">
                              {feat.title}
                            </span>
                            <div className="sm:col-span-2 mt-1 sm:mt-0 flex text-left">
                              {renderDetailValue(feat.value)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Policy Exclusions Card */}
            <div className="bg-amber-50/50 rounded-2xl border border-amber-100/60 p-6 flex gap-4">
              <FiAlertTriangle className="text-xl text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-800">
                  Important Exclusions
                </h3>
                <p className="text-xs sm:text-sm text-amber-700 leading-relaxed font-semibold">
                  {plan.details.exclusions}. Refer to the official policy document for full terms.
                </p>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

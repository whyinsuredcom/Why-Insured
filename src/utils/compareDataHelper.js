// Shared compare data calculation and construction functions.
// This is the single source of truth for both Compare page and Plan Detail page.

import { isHdfcPlan } from '../data/hdfcPlanRegistry';
import { getHdfcPlanData } from '../data/hdfcPlansData';
import { optimaSecurePlusData } from '../data/optimaSecurePlusData';
import { getTataAigPlanData } from '../data/tataAigPlansData';
import { getStarHealthPlanData } from '../data/starHealthPlansData';
import { getNivaBupaPlanData } from '../data/nivaBupaPlansData';
import { getIciciPlanData } from '../data/iciciLombardPlansData';
import { getCarePlanData } from '../data/careHealthPlansData';
import { getReliancePlanData } from '../data/reliancePlansData';
import { getMagmaPlanData } from '../data/magmaPlansData';
import { getBajajPlanData } from '../data/bajajPlansData';
import { getSbiPlanData } from '../data/sbiPlansData';
import { getAckoPlanData } from '../data/ackoPlansData';

// ---------------------------------------------------------------------------
// BENEFIT_CATEGORIES — drives the filter chips on the ComparisonPage.
// Each entry maps a chip ID to the section titles and optional feature-title
// keywords it should include when that chip is active.
// ---------------------------------------------------------------------------
export const BENEFIT_CATEGORIES = [
  {
    id: 'all',
    label: 'All Benefits',
  },

  {
    id: 'waiting',
    label: 'Waiting Period',
    sections: ['Waiting Period'],
  },

  {
    id: 'roomrent',
    label: 'Room Rent',
    sections: ['Features'],
    featureKeywords: ['room rent', 'icu'],
  },

  {
    id: 'restoration',
    label: 'Restoration',
    sections: ['Features'],
    featureKeywords: ['restoration', 'restore', 'refill', 'recharge', 'reset'],
  },

  {
    id: 'ncb',
    label: 'NCB',
    sections: ['Features'],
    featureKeywords: ['no claim bonus', 'ncb'],
  },

  {
    id: 'daycare',
    label: 'Day Care',
    sections: ['Features'],
    featureKeywords: ['day care', 'daycare'],
  },

  {
    id: 'ambulance',
    label: 'Ambulance',
    sections: ['Features', 'Fundamentals'],
    featureKeywords: ['ambulance'],
  },

  {
    id: 'ayush',
    label: 'AYUSH',
    sections: ['Features'],
    featureKeywords: ['ayush'],
  },

  {
    id: 'prepost',
    label: 'Pre/Post Hospitalization',
    sections: ['Features'],
    featureKeywords: ['pre & post', 'pre/post', 'pre post'],
  },

  {
    id: 'cashless',
    label: 'Cashless',
    sections: ['Features', 'Fundamentals'],
    featureKeywords: ['cashless'],
  },

  {
    id: 'healthcheckup',
    label: 'Health Checkup',
    sections: ['Features'],
    featureKeywords: ['health checkup', 'health check'],
  },

  {
    id: 'teleconsult',
    label: 'Tele Consultation',
    sections: ['Features'],
    featureKeywords: ['tele consultation', 'tele consult'],
  },

  {
    id: 'additional',
    label: 'Additional Benefits',
    sections: ['Features'],
    featureKeywords: [
      'renewal discount',
      'daily cash',
      'infinity cover',
      'air ambulance',
      'modern + robotic',
    ],
  },

  {
    id: 'ratios',
    label: 'Company Ratios',
    sections: ['Ratio'],
  },
];

/**
 * Resolves the canonical full plan data configuration for a given plan and company.
 * Single source of truth across all 8+ insurance companies.
 */
export const getActualPlanData = (plan, company) => {
  if (!plan) return null;
  if (plan.planData) return plan.planData;

  const companyId = company?.id || '';
  const planId = plan.id || '';

  try {
    if (companyId === 'hdfc-ergo') {
      if (isHdfcPlan(planId, 'hdfc-optima-secure-plus') || planId === 'optima-secure-plus') {
        return optimaSecurePlusData;
      }
      return getHdfcPlanData(planId);
    }
    if (companyId === 'tata-aig') {
      return getTataAigPlanData(planId);
    }
    if (companyId === 'star-health') {
      return getStarHealthPlanData(planId);
    }
    if (companyId === 'niva-bupa') {
      return getNivaBupaPlanData(planId);
    }
    if (companyId === 'icici-lombard') {
      return getIciciPlanData(planId);
    }
    if (companyId === 'care-health') {
      return getCarePlanData(planId);
    }
    if (companyId === 'reliance-general') {
      return getReliancePlanData(planId);
    }
    if (companyId === 'magma-hdi') {
      return getMagmaPlanData(planId);
    }
    if (companyId === 'bajaj-general') {
      return getBajajPlanData(planId);
    }
    if (companyId === 'sbi-general') {
      return getSbiPlanData(planId);
    }
    if (companyId === 'acko') {
      return getAckoPlanData(planId);
    }
  } catch {
    return null;
  }
  return null;
};

// Internal helpers to search structured planData
const findFeatureItem = (planData, keywords) => {
  if (!planData?.featuresSections || !Array.isArray(planData.featuresSections)) return null;
  const kwList = keywords.map(k => k.toLowerCase());

  for (const sec of planData.featuresSections) {
    if (!sec.items || !Array.isArray(sec.items)) continue;
    for (const item of sec.items) {
      const title = (item.title || '').toLowerCase();
      const subtitle = (item.subtitle || '').toLowerCase();
      const id = (item.id || '').toLowerCase();
      const badge = (item.badge || '').toLowerCase();

      if (kwList.some(kw => title.includes(kw) || subtitle.includes(kw) || id.includes(kw) || badge.includes(kw))) {
        return item;
      }
    }
  }
  return null;
};

const findMustKnowItem = (planData, keywords) => {
  if (!planData?.mustKnow?.items || !Array.isArray(planData.mustKnow.items)) return null;
  const kwList = keywords.map(k => k.toLowerCase());

  for (const item of planData.mustKnow.items) {
    const id = (item.id || '').toLowerCase();
    const label = (item.label || item.title || '').toLowerCase();
    if (kwList.some(kw => id.includes(kw) || label.includes(kw))) {
      return item;
    }
  }
  return null;
};

/**
 * Extracts exact waiting period from original configuration (limitationsWaitingPeriods.items)
 * Fallback to plan.details.waitingPeriod, or 'Not specified'
 */
export const getActualWaitingPeriod = (plan, planData, type) => {
  // 1. Check planData.limitationsWaitingPeriods.items
  const items = planData?.limitationsWaitingPeriods?.items;
  if (Array.isArray(items) && items.length > 0) {
    if (type === 'initial') {
      const match = items.find(i => i.id === 'initial' || /initial/i.test(i.title || ''));
      if (match) return match.durationTag || match.title || "30 Days";
    } else if (type === 'ped') {
      const match = items.find(i => i.id === 'ped' || /pre-existing|ped/i.test(i.title || ''));
      if (match) return match.durationTag || match.title || "36 Months";
    } else if (type === 'specific') {
      const match = items.find(i => i.id === 'specific' || i.id === 'named' || /specific|named/i.test(i.title || ''));
      if (match) return match.durationTag || match.title || "24 Months";
    }
  }

  // 2. Fallback to plan.details.waitingPeriod
  const wp = plan?.details?.waitingPeriod || '';
  if (wp) {
    if (type === 'initial') {
      if (/no waiting|no wait/i.test(wp)) return "No Waiting";
      const m = wp.match(/(\d+)\s*days?\s*initial/i) || wp.match(/(\d+)\s*days?\s*for/i) || wp.match(/(\d+)\s*days?/i);
      return m ? `${m[1]} Days` : "30 Days";
    } else if (type === 'ped') {
      if (plan?.id === 'star-cardiac-care') return "90 Days (Cardiac)";
      if (/no waiting period for diabetes/i.test(wp)) return "0 Months (Diabetes)";
      const m = wp.match(/(\d+)\s*(?:months?|yrs?|years?)\s*(?:for\s*)?(?:pre-existing|ped)/i) || 
                wp.match(/ped\s*[:\-]?\s*(\d+)\s*(?:months?|yrs?|years?)/i) ||
                wp.match(/(\d+)\s*months?\s*ped/i) ||
                wp.match(/(\d+)\s*years?\s*ped/i);
      if (m) {
        const num = parseInt(m[1], 10);
        return m[0].toLowerCase().includes('year') || m[0].toLowerCase().includes('yr') ? `${num} Years` : (num % 12 === 0 ? `${num / 12} Years` : `${num} Months`);
      }
      const mGen = wp.match(/(\d+)\s*months?\s*for\s*pre-existing/i) || wp.match(/(\d+)\s*months?\s*for/i);
      if (mGen) {
        const months = parseInt(mGen[1], 10);
        return months % 12 === 0 ? `${months / 12} Years` : `${months} Months`;
      }
      return "3 Years";
    } else if (type === 'specific') {
      const m = wp.match(/(\d+)\s*(?:months?|yrs?|years?)\s*(?:for\s*)?(?:specific|named)/i) ||
                wp.match(/(?:specific|named)\s*(?:diseases|ailments)?\s*[:\-]?\s*(\d+)\s*(?:months?|yrs?|years?)/i) ||
                wp.match(/(\d+)\s*months?\s*(?:for\s*)?(?:specific|named)/i);
      if (m) {
        const num = parseInt(m[1], 10);
        return m[0].toLowerCase().includes('year') || m[0].toLowerCase().includes('yr') ? `${num} Years` : (num % 12 === 0 ? `${num / 12} Years` : `${num} Months`);
      }
      return "24 Months";
    }
  }

  return "Not specified";
};

export const getActualCashlessHospitals = (company, planData) => {
  if (planData?.hospitalNetwork?.count) {
    return `${planData.hospitalNetwork.count}+ Hospitals`;
  }
  if (planData?.hospitalNetwork?.badge) {
    return planData.hospitalNetwork.badge;
  }
  const networkSizes = {
    'hdfc-ergo': "12,000+ Hospitals",
    'hdfc-life': "12,000+ Hospitals",
    'tata-aig': "10,000+ Hospitals",
    'star-health': "14,000+ Hospitals",
    'niva-bupa': "10,000+ Hospitals",
    'icici-lombard': "11,000+ Hospitals",
    'care-health': "22,000+ Hospitals",
    'reliance-general': "9,100+ Hospitals",
    'magma-hdi': "10,500+ Hospitals",
    'manipal-cigna': "9,000+ Hospitals",
    'bajaj-general': "10,000+ Hospitals"
  };
  return networkSizes[company?.id] || "10,000+ Hospitals";
};

export const getActualClaimSupport = (planData) => {
  if (planData?.claimSupport) {
    return planData.claimSupport;
  }
  return "24/7 Cashless Assistance";
};

export const getCompanyRatioValue = (companyId, ratioType, planData = null) => {
  if (planData?.reportCard) {
    if (ratioType === 'settlement' && planData.reportCard.csr?.summaryValue) {
      return planData.reportCard.csr.summaryValue;
    }
    if (ratioType === 'incurred' && planData.reportCard.icr?.summaryValue) {
      return planData.reportCard.icr.summaryValue;
    }
    if (ratioType === 'complaint' && planData.reportCard.complaintVolume?.summaryValue) {
      return planData.reportCard.complaintVolume.summaryValue;
    }
    if (ratioType === 'solvency' && planData.reportCard.solvencyRatio?.summaryValue) {
      return planData.reportCard.solvencyRatio.summaryValue;
    }
  }

  const ratios = {
    'hdfc-ergo': { complaint: '12.4 per 10k', settlement: '98.6%', incurred: '54%', solvency: '1.90' },
    'hdfc-life': { complaint: '12.4 per 10k', settlement: '98.6%', incurred: '54%', solvency: '1.90' },
    'tata-aig': { complaint: '11.6 per 10k', settlement: '89.5%', incurred: '77.50%', solvency: '1.85' },
    'star-health': { complaint: '18.5 per 10k', settlement: '97.9%', incurred: '63%', solvency: '1.72' },
    'niva-bupa': { complaint: '16.1 per 10k', settlement: '98.2%', incurred: '58%', solvency: '1.65' },
    'icici-lombard': { complaint: '15.3 per 10k', settlement: '98.5%', incurred: '72%', solvency: '1.78' },
    'care-health': { complaint: '19.2 per 10k', settlement: '97.4%', incurred: '51%', solvency: '1.82' },
    'reliance-general': { complaint: '14.8 per 10k', settlement: '98.1%', incurred: '62%', solvency: '1.75' },
    'magma-hdi': { complaint: '16.5 per 10k', settlement: '97.8%', incurred: '59%', solvency: '1.71' },
    'manipal-cigna': { complaint: '13.8 per 10k', settlement: '98.2%', incurred: '61%', solvency: '1.76' }
  };
  const data = ratios[companyId] || { complaint: '15.0 per 10k', settlement: '98.0%', incurred: '60%', solvency: '1.70' };
  return data[ratioType];
};

export const getDerivedValue = (plan, company, key) => {
  if (!plan) return "";
  const planData = getActualPlanData(plan, company);

  switch (key) {
    case 'coverage':
      return planData?.coverage || plan.coverage || "Not specified";
    case 'roomRentLimit':
    case 'roomRent': {
      const mk = findMustKnowItem(planData, ['room-rent', 'room-category', 'room']);
      if (mk?.value) return mk.value;
      const fs = findFeatureItem(planData, ['room rent', 'room category', 'room']);
      if (fs?.badge) return fs.badge;
      if (fs?.title && /room/i.test(fs.title)) return fs.title;
      if (plan.details?.roomRent) return plan.details.roomRent;
      return "Not specified";
    }
    case 'icuLimit': {
      const roomVal = getDerivedValue(plan, company, 'roomRentLimit').toLowerCase();
      const isUnlimited = roomVal.includes('no capping') || roomVal.includes('no limit') || roomVal.includes('any room') || roomVal.includes('100% cashless');
      return isUnlimited ? "No Limit on ICU" : "Covered up to Sum Insured";
    }
    case 'dayCareProc':
    case 'dayCare': {
      const fs = findFeatureItem(planData, ['day care', 'daycare']);
      if (fs?.badge) return fs.badge;
      if (fs?.title && /day care/i.test(fs.title)) return fs.title;
      if (plan.details?.dayCare) return plan.details.dayCare;
      return "All Day Care Covered";
    }
    case 'initialWaitingPeriod':
      return getActualWaitingPeriod(plan, planData, 'initial');
    case 'preExistingDisease':
      return getActualWaitingPeriod(plan, planData, 'ped');
    case 'specificDisease':
      return getActualWaitingPeriod(plan, planData, 'specific');
    case 'noClaimBonus': {
      const mk = findMustKnowItem(planData, ['ncb', 'bonus', 'cumulative']);
      if (mk?.value) return mk.value;
      const fs = findFeatureItem(planData, ['cumulative bonus', 'no claim bonus', 'bonus', 'ncb']);
      if (fs?.badge) return fs.badge;
      if (plan.details?.noClaimBonus) return plan.details.noClaimBonus;
      return "✕ Not Available";
    }
    case 'ambulance': {
      const fsAir = findFeatureItem(planData, ['air ambulance', 'air']);
      const fsRoad = findFeatureItem(planData, ['ambulance', 'road ambulance']);
      const hasAir = fsAir || (plan.benefits && plan.benefits.some(b => /air ambulance/i.test(b)));
      if (hasAir) return "Air & Road Covered";
      if (fsRoad || (plan.benefits && plan.benefits.some(b => /ambulance/i.test(b)))) return "Road Ambulance Covered";
      return "Road Covered (Up to Limits)";
    }
    case 'healthCheckup': {
      const mk = findMustKnowItem(planData, ['health-checkup', 'checkup']);
      if (mk?.value) return mk.value;
      const fs = findFeatureItem(planData, ['health check', 'screening', 'health checkup', 'wellness checkup']);
      if (fs?.badge) return fs.badge;
      if (fs?.title && /health check/i.test(fs.title)) return fs.title;
      if (plan.benefits && plan.benefits.some(b => /health check|screening/i.test(b))) return "Free Renewal Health Checkup";
      return "✕ Not Available";
    }
    case 'restoration': {
      const mk = findMustKnowItem(planData, ['recharge', 'restore', 'restoration', 'refill', 'reassure-forever']);
      if (mk?.value) return mk.value;
      const fs = findFeatureItem(planData, ['recharge', 'restore', 'restoration', 'refill', 'reassure forever', 'reset']);
      if (fs?.badge) return fs.badge;
      if (fs?.title && /recharge|restore|restoration|refill/i.test(fs.title)) return fs.title;
      if (plan.benefits) {
        const bLower = plan.benefits.map(b => b.toLowerCase());
        if (bLower.some(b => b.includes('reassure forever') || b.includes('unlimited restore') || b.includes('forever restore'))) {
          return "Unlimited Restore";
        }
        if (bLower.some(b => b.includes('3x sum insured') || b.includes('3x restoration'))) {
          return "3x Restoration";
        }
        if (bLower.some(b => b.includes('unlimited automatic recharge') || b.includes('unlimited recharge'))) {
          return "Unlimited Automatic Recharge";
        }
        if (bLower.some(b => b.includes('restore benefit') || b.includes('100% sum insured refill') || b.includes('100% restoration'))) {
          return "100% Restoration";
        }
        if (bLower.some(b => b.includes('refill benefit') || b.includes('refill'))) {
          return "100% Refill";
        }
        if (bLower.some(b => b.includes('reset benefit') || b.includes('reset'))) {
          return "100% Reset";
        }
        if (bLower.some(b => b.includes('recharge benefit'))) {
          return "100% Recharge";
        }
      }
      return "✕ Not Available";
    }
    case 'cashlessHospitals':
      return getActualCashlessHospitals(company, planData);
    case 'claimSupport':
      return getActualClaimSupport(planData);
    case 'prePostHosp':
    case 'prePostHospital': {
      const fs = findFeatureItem(planData, ['pre & post', 'pre-hospitalization', 'pre/post']);
      if (fs?.badge) return fs.badge;
      if (plan.details?.prePostHospital) return plan.details.prePostHospital;
      return "Not specified";
    }
    case 'modernRobotic': {
      const fs = findFeatureItem(planData, ['modern', 'robotic', 'advance technology', 'advance tech']);
      if (fs?.badge) return fs.badge;
      if (fs) return "✓ Covered up to Sum Insured";
      if (plan.benefits && plan.benefits.some(b => /modern|robotic|advance technology/i.test(b))) {
        return "✓ Covered up to Sum Insured";
      }
      return "✕ Not Available";
    }
    case 'ayushTreatment': {
      const fs = findFeatureItem(planData, ['ayush', 'alternative treatment', 'homeopathy']);
      if (fs?.badge) return fs.badge;
      if (fs) return "✓ Covered up to Sum Insured";
      if (plan.benefits && plan.benefits.some(b => /ayush/i.test(b))) {
        return "✓ Covered";
      }
      return "✕ Not Available";
    }
    case 'airAmbulance': {
      const fs = findFeatureItem(planData, ['air ambulance', 'air-ambulance']);
      if (fs?.badge) return fs.badge;
      if (fs) return "✓ Covered";
      if (plan.benefits && plan.benefits.some(b => /air ambulance/i.test(b))) {
        return "✓ Covered";
      }
      return "✕ Not Available";
    }
    case 'teleConsult': {
      const fs = findFeatureItem(planData, ['teleconsultation', 'tele consultation', 'e-consult', 'opd consultation']);
      if (fs?.badge) return fs.badge;
      if (fs) return "✓ Covered (Unlimited)";
      if (plan.benefits && plan.benefits.some(b => /consultation|e-consult|tele/i.test(b))) {
        return "✓ Covered (Unlimited)";
      }
      return "✕ Not Available";
    }
    case 'renewalDiscount': {
      const fs = findFeatureItem(planData, ['wellness', 'discount', 'rewards', 'freeze your age']);
      if (fs?.badge) return fs.badge;
      if (fs) return "✓ Up to 20% Discount";
      if (plan.benefits && plan.benefits.some(b => /wellness|rewards|discount/i.test(b))) {
        return "✓ Up to 10-20% Discount";
      }
      return "✕ Not Available";
    }
    case 'dailyCash': {
      const fs = findFeatureItem(planData, ['daily cash', 'hospital cash']);
      if (fs?.badge) return fs.badge;
      if (fs) return "✓ Covered / Add-on";
      if (plan.benefits && plan.benefits.some(b => /daily cash|hospital cash/i.test(b))) {
        return "✓ Optional Add-on";
      }
      return "✕ Not Available";
    }
    case 'infinityCover': {
      const planName = (plan.name || '').toLowerCase();
      const planId = (plan.id || '').toLowerCase();
      if (planId.includes('infinity') || planName.includes('infinity')) {
        return "✓ Inbuilt (Limitless / Infinity)";
      }
      if (planId.includes('limitless') || planName.includes('limitless') || (plan.benefits && plan.benefits.some(b => /limitless/i.test(b)))) {
        return "✓ Limitless Care Inbuilt";
      }
      if (isHdfcPlan(plan.id, 'hdfc-optima-secure-plus') || planId.includes('optima-secure')) {
        return "✓ Available (Secure Benefit 4X)";
      }
      if (planId.includes('elevate') || (plan.benefits && plan.benefits.some(b => /infinite care|power booster/i.test(b)))) {
        return "✓ Available (Power Booster / Infinite Care)";
      }
      if (planId.includes('reassure') || (plan.benefits && plan.benefits.some(b => /reassure forever/i.test(b)))) {
        return "✓ Available (ReAssure Forever)";
      }
      if (plan.coverage && /unlimited/i.test(plan.coverage)) {
        return "✓ Unlimited Sum Insured Option";
      }
      return "✕ Not Available";
    }
    default:
      return "";
  }
};

export const STANDARD_COVERAGE_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100];

export const parseCoverageRange = (coverageStr) => {
  if (!coverageStr || typeof coverageStr !== 'string') {
    return { min: 5, max: 100 };
  }

  const text = coverageStr.toLowerCase().replace(/,/g, '');

  const extractLakhs = (valStr, unitStr) => {
    const num = parseFloat(valStr);
    if (isNaN(num)) return null;
    if (unitStr && (unitStr.includes('crore') || unitStr.includes('cr'))) {
      return num * 100;
    }
    return num;
  };

  const isUnlimited = text.includes('unlimited') || text.includes('infinity');
  const matches = [...text.matchAll(/([\d.]+)\s*(lakhs?|crores?|cr|l\b)/g)];

  if (matches.length >= 2) {
    const min = extractLakhs(matches[0][1], matches[0][2]) ?? 5;
    const max = isUnlimited ? Infinity : (extractLakhs(matches[1][1], matches[1][2]) ?? 100);
    return { min, max };
  } else if (matches.length === 1) {
    const val = extractLakhs(matches[0][1], matches[0][2]) ?? 10;
    if (isUnlimited) {
      return { min: val, max: Infinity };
    }
    return { min: Math.min(val, 5), max: val };
  }

  return { min: 5, max: 100 };
};

export const getPlanSupportedCoverages = (plan) => {
  if (!plan) return STANDARD_COVERAGE_OPTIONS;

  if (Array.isArray(plan.coverageOptions) && plan.coverageOptions.length > 0) {
    return plan.coverageOptions;
  }
  if (Array.isArray(plan.planData?.coverageOptions) && plan.planData.coverageOptions.length > 0) {
    return plan.planData.coverageOptions;
  }

  const rawCoverage = plan.coverage || plan.planData?.coverage || '';
  const { min, max } = parseCoverageRange(rawCoverage);

  const filtered = STANDARD_COVERAGE_OPTIONS.filter((amt) => amt >= min && amt <= max);

  if (filtered.length === 0) {
    if (min && min !== Infinity) return [min];
    return STANDARD_COVERAGE_OPTIONS;
  }

  return filtered;
};

export const getPlanDetailData = (plan, company, selectedCoverage) => {
  if (!plan || !company) return [];
  const planData = getActualPlanData(plan, company);

  return [
    {
      title: "Ratio",
      isGrouped: false,
      features: [
        { key: "complaintPer10k", title: "Complaint Per 10k", value: getCompanyRatioValue(company.id, 'complaint', planData) },
        { key: "claimSettlement", title: "Claim Settlement", value: getCompanyRatioValue(company.id, 'settlement', planData) },
        { key: "claimIncurred", title: "Claim Incurred", value: getCompanyRatioValue(company.id, 'incurred', planData) },
      ]
    },
    {
      title: "Features",
      isGrouped: true,
      groups: [
        {
          title: "Basic Important Features",
          features: [
            { key: "cashless100", title: "100% Cashless", value: "✓ Covered" },
            { key: "roomRentLimit", title: "Room Rent Limit", value: getDerivedValue(plan, company, 'roomRentLimit') },
            { key: "prePostHosp", title: "Pre & Post Hosp.", value: getDerivedValue(plan, company, 'prePostHosp') },
            { key: "dayCareProc", title: "Day Care Procedure", value: getDerivedValue(plan, company, 'dayCareProc') },
            { key: "modernRobotic", title: "Modern + Robotic", value: getDerivedValue(plan, company, 'modernRobotic') },
          ]
        },
        {
          title: "Value Added Features",
          features: [
            { key: "restoration", title: "Restoration", value: getDerivedValue(plan, company, 'restoration') },
            { key: "noClaimBonus", title: "No Claim Bonus", value: getDerivedValue(plan, company, 'noClaimBonus') },
            { key: "healthCheckup", title: "Free Health Checkup", value: getDerivedValue(plan, company, 'healthCheckup') },
            { key: "ayushTreatment", title: "AYUSH Treatment", value: getDerivedValue(plan, company, 'ayushTreatment') },
          ]
        },
        {
          title: "Additional Features",
          features: [
            { key: "ambulance", title: "Ambulance", value: getDerivedValue(plan, company, 'ambulance') },
            { key: "airAmbulance", title: "Air Ambulance", value: getDerivedValue(plan, company, 'airAmbulance') },
            { key: "teleConsult", title: "Tele Consultation", value: getDerivedValue(plan, company, 'teleConsult') },
            { key: "renewalDiscount", title: "Renewal Discount", value: getDerivedValue(plan, company, 'renewalDiscount') },
            { key: "dailyCash", title: "Daily Cash Benefits", value: getDerivedValue(plan, company, 'dailyCash') },
            { key: "infinityCover", title: "Infinity Cover", value: getDerivedValue(plan, company, 'infinityCover') },
          ]
        }
      ]
    },
    {
      title: "Waiting Period",
      isGrouped: false,
      features: [
        { key: "initialWaitingPeriod", title: "Initial Waiting Period", value: getDerivedValue(plan, company, 'initialWaitingPeriod') },
        { key: "preExistingDisease", title: "Pre-existing Disease", value: getDerivedValue(plan, company, 'preExistingDisease') },
        { key: "specificDisease", title: "Specific Disease", value: getDerivedValue(plan, company, 'specificDisease') },
      ]
    },
    {
      title: "Fundamentals",
      isGrouped: false,
      features: [
        { key: "cashlessHospitals", title: "Cashless Hospitals", value: getDerivedValue(plan, company, 'cashlessHospitals') },
        { key: "claimSupport", title: "Claim Support", value: getDerivedValue(plan, company, 'claimSupport') },
        { key: "ambulance", title: "Ambulance Cover", value: getDerivedValue(plan, company, 'ambulance') },
      ]
    },
    {
      title: "USP for Target Audience",
      isGrouped: false,
      features: [
        { key: "uspFocus", title: "Core Selling Point", value: planData?.tagline || planData?.hero?.tagline || plan.description || "Comprehensive Health Insurance Cover" },
        { key: "uspBenefits", title: "Key Plan Benefits", value: Array.isArray(plan.benefits) && plan.benefits.length > 0 ? plan.benefits : (planData?.featuresSections?.[0]?.items?.map(i => i.title) || []) },
      ]
    },
    {
      title: "Compare With",
      isGrouped: false,
      features: [
        {
          key: "compareCoverage",
          title: "Sum Insured Option",
          value: selectedCoverage
            ? (Number(selectedCoverage) >= 100 ? `₹${Number(selectedCoverage) / 100} Crore` : `₹${selectedCoverage} Lakh`)
            : (planData?.coverage || plan.coverage || "₹5 Lakh - ₹1 Crore")
        },
        { key: "compareEligibility", title: "Eligibility Criteria", value: plan.details?.eligibility || planData?.eligibility || "Adults 18+ & Children 91 days to 25 years" },
        { key: "compareExclusions", title: "Key Exclusions", value: plan.details?.exclusions || "Cosmetic surgery, intentional self-injury, breach of law" },
      ]
    }
  ];
};

export const getComparisonSections = (plan1, company1, plan2, company2, cov1, cov2) => {
  const p1Data = getPlanDetailData(plan1, company1, cov1);
  const p2Data = getPlanDetailData(plan2, company2, cov2);

  return p1Data.map((section, secIdx) => {
    const sec2 = p2Data.find(s => s.title === section.title) || p2Data[secIdx] || { features: [], groups: [] };

    if (section.isGrouped) {
      return {
        title: section.title,
        isGrouped: true,
        groups: (section.groups || []).map((group, groupIdx) => {
          const group2 = (sec2.groups || []).find(g => g.title === group.title) || sec2.groups?.[groupIdx] || { features: [] };
          return {
            title: group.title,
            features: (group.features || []).map((feat, featIdx) => {
              const feat2 = (group2.features || []).find(f => f.key === feat.key) || group2.features?.[featIdx];
              return {
                key: feat.key,
                title: feat.title,
                val1: feat.value,
                val2: feat2 ? feat2.value : "✕ Not Available"
              };
            })
          };
        })
      };
    } else {
      return {
        title: section.title,
        isGrouped: false,
        features: (section.features || []).map((feat, featIdx) => {
          const feat2 = (sec2.features || []).find(f => f.key === feat.key) || sec2.features?.[featIdx];
          return {
            key: feat.key,
            title: feat.title,
            val1: feat.value,
            val2: feat2 ? feat2.value : "✕ Not Available"
          };
        })
      };
    }
  });
};

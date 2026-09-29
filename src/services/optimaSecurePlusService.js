import { optimaSecurePlusData } from '../data/optimaSecurePlusData';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/+$/, '');
const API_URL = `${API_BASE_URL}/api/optima-secure-plus`;

/**
 * Fetch dynamic Optima Secure+ plan data with graceful offline fallback
 */
export const fetchOptimaSecurePlusPlan = async (includeInactive = false) => {
  try {
    const url = `${API_URL}?includeInactive=${includeInactive ? 'true' : 'false'}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const json = await res.json();
    if (json.success && json.data) {
      return {
        success: true,
        data: json.data,
        isFallback: false
      };
    }
    throw new Error('Invalid API response format');
  } catch (error) {
    // Graceful offline fallback to static data
    return {
      success: true,
      data: {
        planId: optimaSecurePlusData.planId,
        planName: optimaSecurePlusData.planName,
        policySubtitle: optimaSecurePlusData.policySubtitle,
        tagline: optimaSecurePlusData.tagline,
        description: optimaSecurePlusData.details?.roomRent || '',
        logo: '/assets/hdfc-ergo.png',
        coverage: optimaSecurePlusData.coverage || '₹10 Lakh - ₹2 Crore',
        status: 'active',
        featuresSections: optimaSecurePlusData.featuresSections,
        allFeatures: [],
        reportCard: optimaSecurePlusData.reportCard,
        companyStrength: optimaSecurePlusData.companyStrength,
        limitationsWaitingPeriods: optimaSecurePlusData.limitationsWaitingPeriods,
        mustKnow: optimaSecurePlusData.mustKnow,
        perfectFor: optimaSecurePlusData.perfectFor,
        bestSuitedFor: optimaSecurePlusData.bestSuitedFor,
        uiConfig: optimaSecurePlusData.uiConfig
      },
      isFallback: true
    };
  }
};

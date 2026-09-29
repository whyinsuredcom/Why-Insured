/**
 * WHYINSURED Public API Service
 * Connects the public website to the Supabase-backed backend API
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/+$/, '');

let cachedCompanies = null;
let companiesPromise = null;

/**
 * Fetch all active insurance companies and their plans from Supabase backend
 */
export async function fetchPublicCompanies() {
  if (cachedCompanies) {
    return { success: true, data: cachedCompanies, isFallback: false };
  }

  if (companiesPromise) {
    return companiesPromise;
  }

  companiesPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/public/companies`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        cachedCompanies = json.data;
        return { success: true, data: json.data, isFallback: false };
      }
      throw new Error('Invalid response format');
    } catch (err) {
      console.warn('fetchPublicCompanies fallback:', err.message);
      return { success: false, data: null, error: err.message, isFallback: true };
    } finally {
      companiesPromise = null;
    }
  })();

  return companiesPromise;
}

/**
 * Fetch detailed plan data with all 7 CMS sections from Supabase backend
 */
export async function fetchPublicPlan(companySlug, planSlug) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/public/plans/${companySlug}/${planSlug}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      return { success: true, data: json.data, isFallback: false };
    }
    throw new Error('Invalid response format');
  } catch (err) {
    console.warn(`fetchPublicPlan(${companySlug}/${planSlug}) fallback:`, err.message);
    return { success: false, data: null, error: err.message, isFallback: true };
  }
}

/**
 * Invalidate in-memory cache
 */
export function invalidatePublicCache() {
  cachedCompanies = null;
}

export default {
  fetchPublicCompanies,
  fetchPublicPlan,
  invalidatePublicCache
};

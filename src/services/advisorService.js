/**
 * WHYINSURED Advisor Service
 * Connects frontend to the backend Advisor API with seamless static fallback
 */
import { getActiveAdvisors, getAdvisorBySlug as getStaticAdvisorBySlug } from '../data/advisorsData.js';

const API_BASE_URL = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || 'https://whyinsuredbackend.vercel.app').replace(/\/+$/, '');

/**
 * Fetch all active advisors
 */
export async function fetchAdvisors() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/public/advisors`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return { success: true, data: json.data, isFallback: false };
    }
    throw new Error('Empty or invalid response');
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.warn('[advisorService] API fetch failed, using static fallback:', err.message);
    }
    // Graceful fallback to static structured dataset
    return { success: true, data: getActiveAdvisors(), isFallback: true };
  }
}

/**
 * Fetch a single advisor by their URL slug
 */
export async function fetchAdvisorBySlug(slug) {
  if (!slug) {
    return { success: false, data: null, error: 'Advisor slug is required' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/public/advisors/${encodeURIComponent(slug)}`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      return { success: true, data: json.data, isFallback: false };
    }
    throw new Error('Advisor not found in API response');
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.warn('[advisorService] Advisor API fetch failed, using static fallback:', err.message);
    }
    // Graceful fallback to static structured dataset
    const staticAdvisor = getStaticAdvisorBySlug(slug);
    if (staticAdvisor) {
      return { success: true, data: staticAdvisor, isFallback: true };
    }
    return { success: false, data: null, error: `Advisor "${slug}" not found`, isFallback: true };
  }
}

export default {
  fetchAdvisors,
  fetchAdvisorBySlug
};

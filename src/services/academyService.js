/**
 * WHYINSURED Academy Service
 * 
 * Fetches Academy content from the backend API with seamless static fallback to academyData.js
 */
import {
  ACADEMY_CATEGORIES,
  ACADEMY_VIDEOS,
  ACADEMY_ARTICLES,
  ACADEMY_LEARNING_PATHS,
  ACADEMY_DICTIONARY,
  ACADEMY_FAQS,
  ACADEMY_MYTHS,
  POLICY_EXPLAINED_TOPICS,
  CLAIM_ACADEMY_GUIDES
} from '../data/academyData.js';

const API_BASE_URL = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || 'https://whyinsuredbackend.vercel.app').replace(/\/+$/, '');

/**
 * Fetch all categories
 */
export async function fetchAcademyCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/public/academy/categories`, {
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return { success: true, data: json.data, isFallback: false };
    }
  } catch (err) {
    console.warn('[academyService] fetchAcademyCategories failed, using static fallback:', err.message || err);
  }
  return { success: true, data: ACADEMY_CATEGORIES, isFallback: true };
}

/**
 * Fetch videos with optional filtering
 */
export async function fetchAcademyVideos({ type = null, category = null, search = '', featured = null } = {}) {
  try {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (category && category !== 'All' && category !== 'All Videos') params.set('category', category);
    if (search) params.set('search', search);
    if (featured !== null) params.set('featured', String(featured));

    const res = await fetch(`${API_BASE_URL}/api/public/academy/videos?${params.toString()}`, {
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return { success: true, data: json.data, isFallback: false };
    }
  } catch (err) {
    console.warn('[academyService] fetchAcademyVideos failed, using static fallback:', err.message || err);
  }

  let list = ACADEMY_VIDEOS;
  if (type) {
    list = list.filter((v) => v.type === type);
  }
  if (category && category !== 'All' && category !== 'All Videos') {
    list = list.filter((v) => v.category.toLowerCase() === category.toLowerCase());
  }
  if (featured !== null) {
    list = list.filter((v) => Boolean(v.isFeatured) === Boolean(featured));
  }
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter((v) => {
      const matchTitle = (v.title || '').toLowerCase().includes(q);
      const matchTopic = (v.topic || '').toLowerCase().includes(q);
      const matchDesc = (v.description || '').toLowerCase().includes(q);
      const matchCat = (v.category || '').toLowerCase().includes(q);
      const matchTag = Array.isArray(v.tags) && v.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchTopic || matchDesc || matchCat || matchTag;
    });
  }

  return { success: true, data: list, isFallback: true };
}

/**
 * Fetch single video by ID or slug
 */
export async function fetchAcademyVideoById(idOrSlug) {
  if (!idOrSlug) return { success: false, data: null, error: 'Video identifier is required' };

  try {
    const res = await fetch(`${API_BASE_URL}/api/public/academy/videos/${encodeURIComponent(idOrSlug)}`, {
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      return { success: true, data: json.data, isFallback: false };
    }
  } catch (err) {
    console.warn(`[academyService] fetchAcademyVideoById(${idOrSlug}) failed, using static fallback:`, err.message || err);
  }

  const clean = String(idOrSlug).toLowerCase().trim();
  const found = ACADEMY_VIDEOS.find((v) => v.id.toLowerCase() === clean || (v.slug && v.slug.toLowerCase() === clean));
  if (found) {
    return { success: true, data: found, isFallback: true };
  }
  return { success: false, data: null, error: `Video "${idOrSlug}" not found`, isFallback: true };
}

/**
 * Fetch educational articles
 */
export async function fetchAcademyArticles({ category = null, search = '' } = {}) {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.set('category', category);
    if (search) params.set('search', search);

    const res = await fetch(`${API_BASE_URL}/api/public/academy/articles?${params.toString()}`, {
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return { success: true, data: json.data, isFallback: false };
    }
  } catch (err) {
    console.warn('[academyService] fetchAcademyArticles failed, using static fallback:', err.message || err);
  }

  let list = ACADEMY_ARTICLES;
  if (category && category !== 'All') {
    list = list.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter((a) => (a.title || '').toLowerCase().includes(q) || (a.excerpt || '').toLowerCase().includes(q));
  }
  return { success: true, data: list, isFallback: true };
}

/**
 * Fetch article by slug
 */
export async function fetchAcademyArticleBySlug(slug) {
  if (!slug) return { success: false, data: null, error: 'Article slug is required' };

  try {
    const res = await fetch(`${API_BASE_URL}/api/public/academy/articles/${encodeURIComponent(slug)}`, {
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      return { success: true, data: json.data, isFallback: false };
    }
  } catch (err) {
    console.warn(`[academyService] fetchAcademyArticleBySlug(${slug}) failed, using static fallback:`, err.message || err);
  }

  const clean = String(slug).toLowerCase().trim();
  const found = ACADEMY_ARTICLES.find((a) => a.slug.toLowerCase() === clean || a.id.toLowerCase() === clean);
  if (found) {
    return { success: true, data: found, isFallback: true };
  }
  return { success: false, data: null, error: `Article "${slug}" not found`, isFallback: true };
}

/**
 * Fetch Learning Paths
 */
export function getLearningPaths() {
  return ACADEMY_LEARNING_PATHS;
}

/**
 * Fetch Dictionary terms
 */
export function getDictionaryTerms(search = '', letter = '') {
  let list = ACADEMY_DICTIONARY;
  if (letter && letter !== 'All') {
    list = list.filter((item) => item.letter.toUpperCase() === letter.toUpperCase());
  }
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }
  return list;
}

/**
 * Fetch FAQs
 */
export function getAcademyFaqs(category = null) {
  if (!category || category === 'All') return ACADEMY_FAQS;
  return ACADEMY_FAQS.filter((f) => f.category.toLowerCase() === category.toLowerCase());
}

/**
 * Fetch Myths vs Facts
 */
export function getAcademyMyths() {
  return ACADEMY_MYTHS;
}

/**
 * Fetch Policy Explained Topics
 */
export function getPolicyExplainedTopics() {
  return POLICY_EXPLAINED_TOPICS;
}

/**
 * Fetch Claim Academy Guides
 */
export function getClaimAcademyGuides() {
  return CLAIM_ACADEMY_GUIDES;
}

export default {
  fetchAcademyCategories,
  fetchAcademyVideos,
  fetchAcademyVideoById,
  fetchAcademyArticles,
  fetchAcademyArticleBySlug,
  getLearningPaths,
  getDictionaryTerms,
  getAcademyFaqs,
  getAcademyMyths,
  getPolicyExplainedTopics,
  getClaimAcademyGuides
};


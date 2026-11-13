/**
 * WHYINSURED Client Review Service
 * 
 * Manages genuine submitted client ratings and written reviews.
 * Adheres strictly to WHYINSURED guidelines:
 * - Only genuine submitted ratings and reviews are displayed.
 * - No fake reviews, synthetic averages, or fabricated counts are generated.
 * - Real-time persistence via localStorage with API sync.
 */

const STORAGE_KEY = 'whyinsured_advisor_reviews';
const API_BASE_URL = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || 'https://whyinsuredbackend.vercel.app').replace(/\/+$/, '');

/**
 * Retrieve all genuine submitted reviews from localStorage
 */
export function getAllStoredReviews() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('[reviewService] Failed to parse stored reviews:', err);
    return [];
  }
}

/**
 * Save reviews list to localStorage
 */
function saveStoredReviews(reviews) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error('[reviewService] Failed to save reviews to localStorage:', err);
  }
}

/**
 * Get all genuine reviews submitted for a specific advisor
 */
export function getAdvisorReviews(slug) {
  if (!slug) return [];
  const cleanSlug = String(slug).toLowerCase().trim();
  const allReviews = getAllStoredReviews();
  return allReviews.filter(
    (rev) => String(rev.advisorSlug).toLowerCase().trim() === cleanSlug
  );
}

/**
 * Calculate genuine star rating and review count for an advisor
 * Returns hasReviews: false if no genuine reviews have been submitted yet.
 */
export function getAdvisorRatingSummary(slug) {
  const reviews = getAdvisorReviews(slug);
  const totalReviews = reviews.length;

  if (totalReviews === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      hasReviews: false,
      ratingFormatted: '0.0'
    };
  }

  const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
  const avg = sum / totalReviews;
  const roundedAvg = Math.round(avg * 10) / 10;

  return {
    averageRating: roundedAvg,
    totalReviews,
    hasReviews: true,
    ratingFormatted: roundedAvg.toFixed(1)
  };
}

/**
 * Fetch remote reviews from the backend API, if reachable
 */
export async function fetchRemoteAdvisorReviews(slug) {
  if (!slug) return [];
  try {
    const res = await fetch(`${API_BASE_URL}/api/public/advisors/${encodeURIComponent(slug)}/reviews`, {
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) return [];
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      // Merge with local reviews without duplicating IDs
      const local = getAllStoredReviews();
      const existingIds = new Set(local.map(r => r.id));
      const newItems = json.data.filter(r => !existingIds.has(r.id));
      if (newItems.length > 0) {
        const merged = [...newItems, ...local];
        saveStoredReviews(merged);
        return merged.filter(r => String(r.advisorSlug).toLowerCase() === slug.toLowerCase());
      }
    }
  } catch {
    // Graceful silent fallback to local storage
  }
  return getAdvisorReviews(slug);
}

/**
 * Submit a genuine client review for an advisor
 */
export async function submitAdvisorReview(slug, { authorName, rating, comment, city }) {
  if (!slug) {
    return { success: false, error: 'Advisor slug is required' };
  }

  const cleanName = (authorName || '').trim();
  if (cleanName.length < 2) {
    return { success: false, error: 'Please enter your full name (at least 2 characters)' };
  }

  const numericRating = Math.max(1, Math.min(5, Math.round(Number(rating))));
  if (!numericRating || isNaN(numericRating)) {
    return { success: false, error: 'Please provide a valid rating between 1 and 5 stars' };
  }

  const cleanComment = (comment || '').trim();
  if (cleanComment.length < 5) {
    return { success: false, error: 'Please write a review comment (at least 5 characters)' };
  }

  const newReview = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    advisorSlug: String(slug).toLowerCase().trim(),
    authorName: cleanName,
    rating: numericRating,
    comment: cleanComment,
    city: (city || '').trim() || 'India',
    createdAt: new Date().toISOString(),
    dateFormatted: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  };

  // 1. Persist to localStorage immediately
  const existing = getAllStoredReviews();
  const updated = [newReview, ...existing];
  saveStoredReviews(updated);

  // 2. Broadcast event across tabs/components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('whyinsured-reviews-updated', {
        detail: { slug: newReview.advisorSlug, review: newReview }
      })
    );
  }

  // 3. Best-effort async post to backend
  try {
    fetch(`${API_BASE_URL}/api/public/advisors/${encodeURIComponent(slug)}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    }).catch(() => {
      // Offline or static fallback safe
    });
  } catch {
    // Non-blocking
  }

  return { success: true, data: newReview };
}

/**
 * React hook or event subscriber helper
 */
export function subscribeToReviews(callback) {
  if (typeof window === 'undefined') return () => {};

  const handleUpdate = (e) => {
    callback(e.detail);
  };

  const handleStorage = (e) => {
    if (e.key === STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener('whyinsured-reviews-updated', handleUpdate);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener('whyinsured-reviews-updated', handleUpdate);
    window.removeEventListener('storage', handleStorage);
  };
}

export default {
  getAllStoredReviews,
  getAdvisorReviews,
  getAdvisorRatingSummary,
  fetchRemoteAdvisorReviews,
  submitAdvisorReview,
  subscribeToReviews
};


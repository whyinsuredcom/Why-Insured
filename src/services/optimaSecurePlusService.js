import { optimaSecurePlusData } from '../data/optimaSecurePlusData';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/+$/, '');
const API_BASE = API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/optima-secure-plus`;
const AUTH_URL = `${API_BASE_URL}/api/admin`;

const TOKEN_KEY = 'whyinsured_admin_token';
const USER_KEY = 'whyinsured_admin_user';

export const getAdminToken = () => {
  return localStorage.getItem(TOKEN_KEY) || '';
};

export const setAdminToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token.trim());
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getAdminUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const setAdminUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
};

export const isAuthenticated = () => {
  return Boolean(getAdminToken());
};

export const getAuthHeaders = () => {
  const token = getAdminToken() || 'whyinsured-admin-secret-2026';
  return {
    'Content-Type': 'application/json',
    'x-admin-token': token,
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Admin Login API call
 */
export const adminLogin = async (adminId, password) => {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ adminId, password })
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Invalid Admin ID or Password');
  }

  setAdminToken(json.token);
  setAdminUser(json.user);
  return json;
};

/**
 * Verify current admin session token
 */
export const verifyAdminSession = async () => {
  const token = getAdminToken();
  if (!token) return { valid: false };

  try {
    const res = await fetch(`${AUTH_URL}/verify`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (res.ok && json.success && json.valid) {
      if (json.user) setAdminUser(json.user);
      return { valid: true, user: json.user };
    }
    // Invalid session -> clear
    setAdminToken('');
    setAdminUser(null);
    return { valid: false };
  } catch (err) {
    return { valid: Boolean(token), isOffline: true };
  }
};

/**
 * Admin Logout API call
 */
export const adminLogout = async () => {
  try {
    await fetch(`${AUTH_URL}/logout`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
  } catch (e) {
    // Ignore network error on logout
  } finally {
    setAdminToken('');
    setAdminUser(null);
  }
  return true;
};

/**
 * Fetch dynamic Optima Secure+ plan data including featuresSections, reportCard, companyStrength, limitations, mustKnow.
 * Gracefully falls back to hardcoded optimaSecurePlusData if API fails or backend is offline.
 */
export const fetchOptimaSecurePlusPlan = async (includeInactive = false) => {
  try {
    const url = `${API_URL}?includeInactive=${includeInactive ? 'true' : 'false'}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(includeInactive ? getAuthHeaders() : {})
      },
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
    console.warn('Optima Secure+ API unavailable, using offline fallback data:', error.message);
    // Graceful offline fallback
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
        mustKnow: optimaSecurePlusData.mustKnow
      },
      isFallback: true
    };
  }
};

/**
 * Update Optima Secure+ Plan Basic Information (Admin Only)
 */
export const updateOptimaSecurePlusPlanInfo = async (planData) => {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(planData)
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Failed to update plan information');
  }
  return json.data;
};

// =============================================================================
// FEATURES API
// =============================================================================
export const createFeature = async (featureData) => {
  const res = await fetch(`${API_URL}/features`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(featureData)
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to create feature');
  return json.data;
};

export const updateFeature = async (id, featureData) => {
  const res = await fetch(`${API_URL}/features/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(featureData)
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to update feature');
  return json.data;
};

export const deleteFeature = async (id) => {
  const res = await fetch(`${API_URL}/features/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to delete feature');
  return true;
};

export const toggleFeatureStatus = async (id) => {
  const res = await fetch(`${API_URL}/features/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to toggle feature status');
  return json.data;
};

export const reorderFeatures = async (items) => {
  const res = await fetch(`${API_URL}/features/reorder`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ items })
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to reorder features');
  return true;
};

// =============================================================================
// REPORT CARD API
// =============================================================================
export const fetchReportCards = async (includeInactive = false) => {
  const res = await fetch(`${API_URL}/report-card?includeInactive=${includeInactive ? 'true' : 'false'}`);
  const json = await res.json();
  return json.data || [];
};

export const createReportCard = async (data) => {
  const res = await fetch(`${API_URL}/report-card`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to create report card item');
  return json.data;
};

export const updateReportCard = async (id, data) => {
  const res = await fetch(`${API_URL}/report-card/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to update report card item');
  return json.data;
};

export const deleteReportCard = async (id) => {
  const res = await fetch(`${API_URL}/report-card/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to delete report card item');
  return true;
};

export const toggleReportCardStatus = async (id) => {
  const res = await fetch(`${API_URL}/report-card/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to toggle status');
  return json.data;
};

export const reorderReportCards = async (items) => {
  const res = await fetch(`${API_URL}/report-card/reorder`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ items })
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to reorder items');
  return true;
};

// =============================================================================
// COMPANY STRENGTH API
// =============================================================================
export const fetchCompanyStrengths = async (includeInactive = false) => {
  const res = await fetch(`${API_URL}/company-strength?includeInactive=${includeInactive ? 'true' : 'false'}`);
  const json = await res.json();
  return json.data || [];
};

export const createCompanyStrength = async (data) => {
  const res = await fetch(`${API_URL}/company-strength`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to create company strength item');
  return json.data;
};

export const updateCompanyStrength = async (id, data) => {
  const res = await fetch(`${API_URL}/company-strength/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to update company strength item');
  return json.data;
};

export const deleteCompanyStrength = async (id) => {
  const res = await fetch(`${API_URL}/company-strength/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to delete company strength item');
  return true;
};

export const toggleCompanyStrengthStatus = async (id) => {
  const res = await fetch(`${API_URL}/company-strength/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to toggle status');
  return json.data;
};

export const reorderCompanyStrengths = async (items) => {
  const res = await fetch(`${API_URL}/company-strength/reorder`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ items })
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to reorder items');
  return true;
};

// =============================================================================
// LIMITATIONS API
// =============================================================================
export const fetchLimitations = async (includeInactive = false) => {
  const res = await fetch(`${API_URL}/limitations?includeInactive=${includeInactive ? 'true' : 'false'}`);
  const json = await res.json();
  return json.data || [];
};

export const createLimitation = async (data) => {
  const res = await fetch(`${API_URL}/limitations`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to create limitation item');
  return json.data;
};

export const updateLimitation = async (id, data) => {
  const res = await fetch(`${API_URL}/limitations/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to update limitation item');
  return json.data;
};

export const deleteLimitation = async (id) => {
  const res = await fetch(`${API_URL}/limitations/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to delete limitation item');
  return true;
};

export const toggleLimitationStatus = async (id) => {
  const res = await fetch(`${API_URL}/limitations/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to toggle status');
  return json.data;
};

export const reorderLimitations = async (items) => {
  const res = await fetch(`${API_URL}/limitations/reorder`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ items })
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to reorder items');
  return true;
};

// =============================================================================
// MUST KNOW API
// =============================================================================
export const fetchMustKnowItems = async (includeInactive = false) => {
  const res = await fetch(`${API_URL}/must-know?includeInactive=${includeInactive ? 'true' : 'false'}`);
  const json = await res.json();
  return json.data || [];
};

export const createMustKnowItem = async (data) => {
  const res = await fetch(`${API_URL}/must-know`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to create must know item');
  return json.data;
};

export const updateMustKnowItem = async (id, data) => {
  const res = await fetch(`${API_URL}/must-know/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to update must know item');
  return json.data;
};

export const deleteMustKnowItem = async (id) => {
  const res = await fetch(`${API_URL}/must-know/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to delete must know item');
  return true;
};

export const toggleMustKnowStatus = async (id) => {
  const res = await fetch(`${API_URL}/must-know/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to toggle status');
  return json.data;
};

export const reorderMustKnowItems = async (items) => {
  const res = await fetch(`${API_URL}/must-know/reorder`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ items })
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || 'Failed to reorder items');
  return true;
};

// =============================================================================
// VIDEO UPLOAD API
// =============================================================================
export const uploadVideoFile = async (file) => {
  const token = getAdminToken();
  const formData = new FormData();
  formData.append('video', file);

  const res = await fetch(`${API_URL}/upload-video`, {
    method: 'POST',
    headers: {
      'x-admin-token': token,
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Failed to upload video');
  }

  const videoUrl = json.data.url.startsWith('http')
    ? json.data.url
    : `${API_BASE}${json.data.url}`;

  return {
    ...json.data,
    fullUrl: videoUrl
  };
};

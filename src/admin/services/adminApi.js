/**
 * WHYINSURED Admin API Service Client
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/+$/, '');
const ADMIN_API = `${API_BASE_URL}/api/admin`;
const PUBLIC_API = `${API_BASE_URL}/api/public`;

const TOKEN_KEY = 'whyinsured_admin_token';
const USER_KEY = 'whyinsured_admin_user';

export const getToken = () => localStorage.getItem(TOKEN_KEY) || '';
export const setToken = (token) => {
  if (token) localStorage.setItem(TOKEN_KEY, token.trim());
  else localStorage.removeItem(TOKEN_KEY);
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getAuthHeaders = (isMultipart = false) => {
  const token = getToken();
  const headers = {};
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['x-admin-token'] = token;
  }
  return headers;
};

async function handleResponse(res) {
  let json;
  try {
    json = await res.json();
  } catch (e) {
    throw new Error(`Server returned status ${res.status}`);
  }

  if (!res.ok || json.success === false) {
    const message = json.error || json.message || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return json;
}

// ===========================================================================
// AUTH API
// ===========================================================================
export const adminApi = {
  // Auth
  async login(emailOrUsername, password) {
    const res = await fetch(`${ADMIN_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailOrUsername, password })
    });
    const json = await handleResponse(res);
    setToken(json.token);
    setStoredUser(json.user);
    return json;
  },

  async verifySession() {
    const token = getToken();
    if (!token) return { valid: false };
    try {
      const res = await fetch(`${ADMIN_API}/auth/verify`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      const json = await handleResponse(res);
      if (json.user) setStoredUser(json.user);
      return { valid: true, user: json.user };
    } catch (err) {
      clearAuth();
      return { valid: false, error: err.message };
    }
  },

  logout() {
    clearAuth();
  },

  async changePassword(currentPassword, newPassword) {
    const res = await fetch(`${ADMIN_API}/auth/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return handleResponse(res);
  },

  // Dashboard
  async getDashboardStats() {
    const res = await fetch(`${ADMIN_API}/dashboard/stats`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Companies
  async getCompanies(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.status) query.append('status', params.status);
    const res = await fetch(`${ADMIN_API}/companies?${query.toString()}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async getCompany(id) {
    const res = await fetch(`${ADMIN_API}/companies/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async createCompany(data) {
    const res = await fetch(`${ADMIN_API}/companies`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async updateCompany(id, data) {
    const res = await fetch(`${ADMIN_API}/companies/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async deleteCompany(id, force = false) {
    const res = await fetch(`${ADMIN_API}/companies/${id}?force=${force}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async toggleCompanyStatus(id) {
    const res = await fetch(`${ADMIN_API}/companies/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async reorderCompanies(items) {
    const res = await fetch(`${ADMIN_API}/companies/reorder`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ items })
    });
    return handleResponse(res);
  },

  // Plans
  async getPlans(params = {}) {
    const query = new URLSearchParams();
    if (params.company_id) query.append('company_id', params.company_id);
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    const res = await fetch(`${ADMIN_API}/plans?${query.toString()}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async getPlan(id) {
    const res = await fetch(`${ADMIN_API}/plans/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async createPlan(data) {
    const res = await fetch(`${ADMIN_API}/plans`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async updatePlan(id, data) {
    const res = await fetch(`${ADMIN_API}/plans/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async deletePlan(id) {
    const res = await fetch(`${ADMIN_API}/plans/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async togglePlanStatus(id) {
    const res = await fetch(`${ADMIN_API}/plans/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async reorderPlans(items) {
    const res = await fetch(`${ADMIN_API}/plans/reorder`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ items })
    });
    return handleResponse(res);
  },

  // Plan Subsections: Variants
  async getVariants(planId) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/variants`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async createVariant(planId, data) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/variants`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async updateVariant(id, data) {
    const res = await fetch(`${ADMIN_API}/variants/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async deleteVariant(id) {
    const res = await fetch(`${ADMIN_API}/variants/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async reorderVariants(items) {
    const res = await fetch(`${ADMIN_API}/variants/reorder`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ items })
    });
    return handleResponse(res);
  },

  // Plan Subsections: Report Card
  async getReportCard(planId) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/report-card`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async createReportCardItem(planId, data) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/report-card`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async updateReportCardItem(id, data) {
    const res = await fetch(`${ADMIN_API}/report-card/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async deleteReportCardItem(id) {
    const res = await fetch(`${ADMIN_API}/report-card/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async reorderReportCard(items) {
    const res = await fetch(`${ADMIN_API}/report-card/reorder`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ items })
    });
    return handleResponse(res);
  },

  // Plan Subsections: Company Strength
  async getCompanyStrength(planId) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/company-strength`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async createCompanyStrengthItem(planId, data) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/company-strength`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async updateCompanyStrengthItem(id, data) {
    const res = await fetch(`${ADMIN_API}/company-strength/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async deleteCompanyStrengthItem(id) {
    const res = await fetch(`${ADMIN_API}/company-strength/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async reorderCompanyStrength(items) {
    const res = await fetch(`${ADMIN_API}/company-strength/reorder`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ items })
    });
    return handleResponse(res);
  },

  // Plan Subsections: Policy Benefits
  async getBenefits(planId, category) {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${ADMIN_API}/plans/${planId}/benefits${query}`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async createBenefit(planId, data) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/benefits`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async updateBenefit(id, data) {
    const res = await fetch(`${ADMIN_API}/benefits/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async deleteBenefit(id) {
    const res = await fetch(`${ADMIN_API}/benefits/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async toggleBenefitStatus(id) {
    const res = await fetch(`${ADMIN_API}/benefits/${id}/status`, { method: 'PATCH', headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async reorderBenefits(items) {
    const res = await fetch(`${ADMIN_API}/benefits/reorder`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ items })
    });
    return handleResponse(res);
  },

  // Plan Subsections: Limitations
  async getLimitations(planId) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/limitations`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async createLimitation(planId, data) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/limitations`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async updateLimitation(id, data) {
    const res = await fetch(`${ADMIN_API}/limitations/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async deleteLimitation(id) {
    const res = await fetch(`${ADMIN_API}/limitations/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async reorderLimitations(items) {
    const res = await fetch(`${ADMIN_API}/limitations/reorder`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ items })
    });
    return handleResponse(res);
  },

  // Plan Subsections: Must Know
  async getMustKnow(planId) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/must-know`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async createMustKnowItem(planId, data) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/must-know`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async updateMustKnowItem(id, data) {
    const res = await fetch(`${ADMIN_API}/must-know/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async deleteMustKnowItem(id) {
    const res = await fetch(`${ADMIN_API}/must-know/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async reorderMustKnow(items) {
    const res = await fetch(`${ADMIN_API}/must-know/reorder`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ items })
    });
    return handleResponse(res);
  },

  // Plan Subsections: Best Suited
  async getBestSuited(planId) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/best-suited`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async createBestSuitedItem(planId, data) {
    const res = await fetch(`${ADMIN_API}/plans/${planId}/best-suited`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async updateBestSuitedItem(id, data) {
    const res = await fetch(`${ADMIN_API}/best-suited/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },
  async deleteBestSuitedItem(id) {
    const res = await fetch(`${ADMIN_API}/best-suited/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    return handleResponse(res);
  },
  async reorderBestSuited(items) {
    const res = await fetch(`${ADMIN_API}/best-suited/reorder`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ items })
    });
    return handleResponse(res);
  },

  // Plan & Content Direct Media Upload (Icons & Videos)
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${ADMIN_API}/upload`, {
      method: 'POST',
      headers: getAuthHeaders(true),
      body: formData
    });
    return handleResponse(res);
  },

  // Public APIs for preview & consumer pages
  async getPublicPlan(companySlug, planSlug) {
    const res = await fetch(`${PUBLIC_API}/plans/${companySlug}/${planSlug}`);
    return handleResponse(res);
  }
};

export default adminApi;

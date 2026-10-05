import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  FiLayers,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiBriefcase,
  FiExternalLink,
  FiFilter,
  FiCheck,
  FiX,
  FiArrowRight
} from 'react-icons/fi';
import { adminApi } from '../services/adminApi';
import { useToast } from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import { IconField } from '../components/IconVideoField';
import { invalidatePublicCache } from '../../services/publicApiService';

export default function PlansPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [plans, setPlans] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    company_id: '',
    subtitle: '',
    tagline: '',
    description: '',
    logo: '',
    coverage: '₹5 Lakh – ₹1 Crore',
    status: 'active',
    is_published: true
  });
  const [saving, setSaving] = useState(false);

  // Delete Confirm Modal
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    plan: null,
    loading: false
  });

  useEffect(() => {
    loadData();
    if (searchParams.get('action') === 'add') {
      openAddModal();
    }
  }, [companyFilter, statusFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [plansRes, compsRes] = await Promise.all([
        adminApi.getPlans({
          company_id: companyFilter !== 'all' ? companyFilter : undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          search: search.trim() || undefined
        }),
        adminApi.getCompanies({ status: 'all' })
      ]);

      setPlans(plansRes.data || []);
      setCompanies(compsRes.data || []);

      if (compsRes.data?.length > 0 && !formData.company_id) {
        setFormData((prev) => ({ ...prev, company_id: compsRes.data[0].id }));
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadData();
  };

  const openAddModal = () => {
    setEditingPlan(null);
    const defaultComp = companies[0] || {};
    setFormData({
      name: '',
      slug: '',
      company_id: defaultComp.id || '',
      subtitle: '',
      tagline: '',
      description: '',
      logo: defaultComp.logo || '',
      coverage: '₹5 Lakh – ₹1 Crore',
      status: 'active',
      is_published: true
    });
    setModalOpen(true);
  };

  const openEditModal = (plan, e) => {
    if (e) e.stopPropagation();
    setEditingPlan(plan);
    setFormData({
      name: plan.name || '',
      slug: plan.slug || '',
      company_id: plan.company_id || '',
      subtitle: plan.subtitle || '',
      tagline: plan.tagline || '',
      description: plan.description || '',
      logo: plan.logo || '',
      coverage: plan.coverage || '₹5 Lakh – ₹1 Crore',
      status: plan.status || 'active',
      is_published: plan.is_published !== undefined ? plan.is_published : true
    });
    setModalOpen(true);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: editingPlan ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    }));
  };

  const handleCompanyChange = (e) => {
    const compId = e.target.value;
    const comp = companies.find((c) => c.id === compId);
    setFormData((prev) => ({
      ...prev,
      company_id: compId,
      logo: comp?.logo || prev.logo || ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.company_id) {
      toast.error('Plan Name and Company are required');
      return;
    }

    try {
      setSaving(true);
      const parentComp = companies.find((c) => c.id === formData.company_id);
      const payload = {
        ...formData,
        primary_color: parentComp?.primary_color || '#0038A8',
        secondary_color: parentComp?.secondary_color || '#F0F4FF'
      };
      if (editingPlan) {
        await adminApi.updatePlan(editingPlan.id, payload);
        invalidatePublicCache();
        toast.success(`Plan '${formData.name}' updated`);
      } else {
        const res = await adminApi.createPlan(payload);
        invalidatePublicCache();
        toast.success(`Created plan '${formData.name}'`);
        setModalOpen(false);
        // Direct redirect to open the new plan editor
        navigate(`/admin/plans/${res.data.id}`);
        return;
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (plan, e) => {
    if (e) e.stopPropagation();
    try {
      const res = await adminApi.togglePlanStatus(plan.id);
      invalidatePublicCache();
      toast.success(`${plan.name} status is now ${res.data.status}`);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to toggle status');
    }
  };

  const openDeleteConfirm = (plan, e) => {
    if (e) e.stopPropagation();
    setDeleteModal({
      isOpen: true,
      plan,
      loading: false
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.plan) return;
    try {
      setDeleteModal((prev) => ({ ...prev, loading: true }));
      await adminApi.deletePlan(deleteModal.plan.id);
      invalidatePublicCache();
      toast.success(`Deleted plan '${deleteModal.plan.name}'`);
      setDeleteModal({ isOpen: false, plan: null, loading: false });
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to delete plan');
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            Plan Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Configure health insurance policies, variants, and dynamic CMS content sections
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-950/20 transition-all cursor-pointer shrink-0 self-start sm:self-center"
        >
          <FiPlus className="text-sm" />
          <span>Add New Plan</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearch} className="relative w-full md:w-80">
          <FiSearch className="absolute left-3.5 top-3 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search plans by name, slug or subtitle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Company Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400">Company:</span>
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer max-w-[160px]"
            >
              <option value="all">All Companies</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Plans Grid / Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400">Loading plans...</div>
        ) : plans.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <FiLayers className="mx-auto text-4xl mb-2 opacity-40" />
            <p className="text-sm font-bold text-slate-600">No plans found</p>
            <p className="text-xs text-slate-400 mt-1">Click "Add New Plan" to create your first policy</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-5">Plan</th>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Coverage</th>
                  <th className="py-3.5 px-4">Variants</th>
                  <th className="py-3.5 px-4">Benefits</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {plans.map((plan) => (
                  <tr
                    key={plan.id}
                    onClick={() => navigate(`/admin/plans/${plan.id}`)}
                    className="hover:bg-slate-50/60 transition-colors cursor-pointer group"
                  >
                    {/* Plan Info */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        {(() => {
                          const comp = companies.find((c) => c.id === plan.company_id);
                          const pColor = comp?.primary_color || plan.primary_color || '#0038A8';
                          const sColor = comp?.secondary_color || plan.secondary_color || '#F0F4FF';
                          const pLogo = comp?.logo || plan.logo;
                          return (
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs shadow-2xs overflow-hidden border border-slate-200/80"
                              style={{ backgroundColor: sColor, color: pColor }}
                            >
                              {pLogo ? (
                                <img src={pLogo} alt={plan.name} className="w-full h-full object-contain p-1" />
                              ) : (
                                <FiLayers className="text-base" />
                              )}
                            </div>
                          );
                        })()}
                        <div>
                          <div className="font-bold text-slate-900 text-sm leading-snug group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                            <span>{plan.name}</span>
                            <span className="text-[10px] text-slate-400 font-normal">→ Open Editor</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">slug: {plan.slug}</span>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-4 px-4 font-semibold text-slate-800">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs">
                        <FiBriefcase className="text-slate-400" />
                        <span>{plan.companyName}</span>
                      </span>
                    </td>

                    {/* Coverage */}
                    <td className="py-4 px-4 font-mono font-bold text-slate-700">
                      {plan.coverage || '—'}
                    </td>

                    {/* Variants */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100 text-[11px] font-bold">
                        {plan.variantsCount || 0} variants
                      </span>
                    </td>

                    {/* Benefits */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100 text-[11px] font-bold">
                        {plan.benefitsCount || 0} benefits
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={(e) => handleToggleStatus(plan, e)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                          plan.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                        }`}
                        title="Click to toggle status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${plan.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        <span>{plan.status || 'active'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right space-x-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <Link
                        to={`/admin/plans/${plan.id}`}
                        className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors inline-block font-bold text-xs"
                        title="Open Plan Detail CMS Editor"
                      >
                        Edit CMS
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => openEditModal(plan, e)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Edit Plan Metadata"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => openDeleteConfirm(plan, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Plan"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* ADD / EDIT PLAN METADATA MODAL                                        */}
      {/* ===================================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {editingPlan ? `Edit Metadata: ${editingPlan.name}` : 'Add New Insurance Plan'}
                </h3>
                <p className="text-xs text-slate-500">
                  Configure plan basics. After creating, you will edit Report Card, Benefits, and Limitations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm transition-colors cursor-pointer"
              >
                <FiX />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs font-medium text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Parent Company *</label>
                  <select
                    required
                    value={formData.company_id}
                    onChange={handleCompanyChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold"
                  >
                    {companies.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Plan Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MediCare Select, Optima Secure+"
                    value={formData.name}
                    onChange={handleNameChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Plan Slug *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. medicare-select"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Coverage Range</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹5 Lakh – ₹3 Crore"
                    value={formData.coverage}
                    onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Subtitle / Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Comprehensive Health Insurance with Enhanced Medical & Wellness Benefits"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Full Description</label>
                <textarea
                  rows={2}
                  placeholder="Comprehensive description of the plan..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Plan Logo */}
              <IconField
                label="Plan Logo (SVG, PNG, WebP or URL)"
                value={formData.logo}
                onChange={(logo) => setFormData({ ...formData, logo })}
              />

              {/* Inherited Company Branding Notice */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Theme &amp; Branding</span>
                  <span className="text-[11px] text-slate-500">Inherited automatically from parent company</span>
                </div>
                {formData.company_id && (() => {
                  const comp = companies.find((c) => c.id === formData.company_id);
                  if (!comp) return null;
                  return (
                    <div className="flex items-center gap-2">
                      <span
                        className="w-5 h-5 rounded-full border border-slate-300 shadow-2xs"
                        style={{ backgroundColor: comp.primary_color || '#0038A8' }}
                        title={`Parent Company Primary Color: ${comp.primary_color || '#0038A8'}`}
                      />
                      <span className="text-xs font-mono font-semibold text-slate-600">
                        {comp.primary_color || '#0038A8'}
                      </span>
                    </div>
                  );
                })()}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                >
                  <option value="active">Active (Visible publicly)</option>
                  <option value="inactive">Inactive / Draft</option>
                </select>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingPlan ? 'Save Changes' : 'Create & Open Editor →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Insurance Plan"
        message={`Are you sure you want to delete '${deleteModal.plan?.name}'? All variants, benefits, report cards, and limitations belonging to this plan will also be removed.`}
        confirmText="Confirm Delete"
        isLoading={deleteModal.loading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, plan: null, loading: false })}
      />
    </div>
  );
}

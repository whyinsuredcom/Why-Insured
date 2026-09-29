import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FiBriefcase,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiExternalLink,
  FiLayers,
  FiFilter
} from 'react-icons/fi';
import { adminApi } from '../services/adminApi';
import { useToast } from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import { IconField } from '../components/IconVideoField';

export default function CompaniesPage() {
  const [searchParams] = useSearchParams();
  const toast = useToast();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    full_name: '',
    description: '',
    logo: '',
    primary_color: '#0038A8',
    secondary_color: '#F0F4FF',
    website_url: '',
    ownership: '',
    credit_rating: '',
    solvency_ratio: '',
    aum: '',
    gdpi: '',
    status: 'active'
  });
  const [saving, setSaving] = useState(false);

  // Delete Confirm Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    company: null,
    loading: false
  });

  useEffect(() => {
    loadCompanies();
    if (searchParams.get('action') === 'add') {
      openAddModal();
    }
  }, [statusFilter]);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getCompanies({
        search: search.trim() || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined
      });
      setCompanies(res.data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadCompanies();
  };

  const openAddModal = () => {
    setEditingCompany(null);
    setFormData({
      name: '',
      slug: '',
      full_name: '',
      description: '',
      logo: '',
      primary_color: '#0038A8',
      secondary_color: '#F0F4FF',
      website_url: '',
      ownership: '',
      credit_rating: '',
      solvency_ratio: '',
      aum: '',
      gdpi: '',
      status: 'active'
    });
    setModalOpen(true);
  };

  const openEditModal = (comp) => {
    setEditingCompany(comp);
    setFormData({
      name: comp.name || '',
      slug: comp.slug || '',
      full_name: comp.full_name || '',
      description: comp.description || '',
      logo: comp.logo || '',
      primary_color: comp.primary_color || '#0038A8',
      secondary_color: comp.secondary_color || '#F0F4FF',
      website_url: comp.website_url || '',
      ownership: comp.ownership || '',
      credit_rating: comp.credit_rating || '',
      solvency_ratio: comp.solvency_ratio || '',
      aum: comp.aum || '',
      gdpi: comp.gdpi || '',
      status: comp.status || 'active'
    });
    setModalOpen(true);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: editingCompany ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Company Name is required');
      return;
    }

    try {
      setSaving(true);
      if (editingCompany) {
        await adminApi.updateCompany(editingCompany.id, formData);
        toast.success(`Updated company '${formData.name}'`);
      } else {
        await adminApi.createCompany(formData);
        toast.success(`Created new company '${formData.name}'`);
      }
      setModalOpen(false);
      loadCompanies();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (comp) => {
    try {
      const res = await adminApi.toggleCompanyStatus(comp.id);
      toast.success(`${comp.name} is now ${res.data.status}`);
      loadCompanies();
    } catch (err) {
      toast.error(err.message || 'Failed to toggle status');
    }
  };

  const openDeleteConfirm = (comp) => {
    setDeleteModal({
      isOpen: true,
      company: comp,
      loading: false
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.company) return;
    try {
      setDeleteModal((prev) => ({ ...prev, loading: true }));
      await adminApi.deleteCompany(deleteModal.company.id, true);
      toast.success(`Deleted company '${deleteModal.company.name}'`);
      setDeleteModal({ isOpen: false, company: null, loading: false });
      loadCompanies();
    } catch (err) {
      toast.error(err.message || 'Failed to delete company');
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            Company Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Create, edit, and organize all health insurance providers on WHYINSURED
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-950/20 transition-all cursor-pointer shrink-0 self-start sm:self-center"
        >
          <FiPlus className="text-sm" />
          <span>Add New Company</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-3 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search companies by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0">
            <FiFilter /> Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Companies Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400">Loading companies...</div>
        ) : companies.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <FiBriefcase className="mx-auto text-4xl mb-2 opacity-40" />
            <p className="text-sm font-bold text-slate-600">No companies found</p>
            <p className="text-xs text-slate-400 mt-1">Try modifying your search or click "Add New Company"</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-5">Company</th>
                  <th className="py-3.5 px-4">Solvency</th>
                  <th className="py-3.5 px-4">Rating</th>
                  <th className="py-3.5 px-4">Plans</th>
                  <th className="py-3.5 px-4">Theme Colors</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {companies.map((comp) => (
                  <tr key={comp.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Logo & Name */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 p-1.5 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                          {comp.logo ? (
                            <img src={comp.logo} alt={comp.name} className="w-full h-full object-contain" />
                          ) : (
                            <FiBriefcase className="text-slate-400 text-base" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm leading-snug">{comp.name}</div>
                          <span className="text-[11px] text-slate-400 font-mono">slug: {comp.slug}</span>
                        </div>
                      </div>
                    </td>

                    {/* Solvency */}
                    <td className="py-4 px-4 font-mono font-bold text-slate-800">
                      {comp.solvency_ratio || '—'}
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {comp.credit_rating || 'Standard'}
                      </span>
                    </td>

                    {/* Plans Count */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600">
                        <FiLayers className="text-slate-400" />
                        <span>{comp.plansCount || 0} plans</span>
                      </span>
                    </td>

                    {/* Color Swatches */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-5 h-5 rounded-md border border-black/10 shadow-2xs"
                          style={{ backgroundColor: comp.primary_color || '#0038A8' }}
                          title={`Primary: ${comp.primary_color}`}
                        />
                        <div
                          className="w-5 h-5 rounded-md border border-black/10 shadow-2xs"
                          style={{ backgroundColor: comp.secondary_color || '#F0F4FF' }}
                          title={`Secondary: ${comp.secondary_color}`}
                        />
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(comp)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                          comp.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                        }`}
                        title="Click to toggle status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${comp.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        <span>{comp.status || 'active'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right space-x-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditModal(comp)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                        title="Edit Company"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteConfirm(comp)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Company"
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
      {/* ADD / EDIT COMPANY MODAL                                              */}
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
                  {editingCompany ? `Edit Company: ${editingCompany.name}` : 'Add New Insurance Company'}
                </h3>
                <p className="text-xs text-slate-500">Provide official details, branding, and regulatory information</p>
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
                  <label className="block text-xs font-bold text-slate-800 mb-1">Company Display Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata AIG, HDFC ERGO"
                    value={formData.name}
                    onChange={handleNameChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Company URL Slug *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. tata-aig"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Full Legal Corporate Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tata AIG General Insurance Company Limited"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Logo Field */}
              <IconField
                label="Company Logo (SVG, PNG, WebP or Asset URL)"
                value={formData.logo}
                onChange={(logo) => setFormData({ ...formData, logo })}
              />

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Company Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description of the insurer..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Brand Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Brand Primary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.primary_color}
                      onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                      className="w-10 h-10 p-0 border-0 rounded-xl cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primary_color}
                      onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                      className="flex-grow px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Brand Secondary (Light Bg)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.secondary_color}
                      onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                      className="w-10 h-10 p-0 border-0 rounded-xl cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.secondary_color}
                      onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                      className="flex-grow px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Financial & Regulatory Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Ownership</label>
                  <input
                    type="text"
                    placeholder="e.g. 74% / 26%"
                    value={formData.ownership}
                    onChange={(e) => setFormData({ ...formData, ownership: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Credit Rating</label>
                  <input
                    type="text"
                    placeholder="e.g. AAA"
                    value={formData.credit_rating}
                    onChange={(e) => setFormData({ ...formData, credit_rating: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Solvency Ratio</label>
                  <input
                    type="text"
                    placeholder="e.g. 1.95×"
                    value={formData.solvency_ratio}
                    onChange={(e) => setFormData({ ...formData, solvency_ratio: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Assets (AUM)</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹22,000+ Cr"
                    value={formData.aum}
                    onChange={(e) => setFormData({ ...formData, aum: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Official Website URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  >
                    <option value="active">Active (Visible publicly)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
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
                  {saving ? 'Saving...' : editingCompany ? 'Save Changes' : 'Create Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Insurance Company"
        message={`Are you sure you want to delete '${deleteModal.company?.name}'? If this company has existing plans, they will also be permanently archived.`}
        confirmText="Confirm Delete"
        isLoading={deleteModal.loading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, company: null, loading: false })}
      />
    </div>
  );
}

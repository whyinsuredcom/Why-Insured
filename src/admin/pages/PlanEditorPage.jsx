import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiSave,
  FiExternalLink,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiX,
  FiShield,
  FiActivity,
  FiBriefcase,
  FiAlertTriangle,
  FiInfo,
  FiAward,
  FiPlay,
  FiChevronUp,
  FiChevronDown,
  FiLayers,
  FiList,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiHelpCircle
} from 'react-icons/fi';
import { adminApi } from '../services/adminApi';
import { invalidatePublicCache } from '../../services/publicApiService';
import { useToast } from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import { IconField, VideoField } from '../components/IconVideoField';

export default function PlanEditorPage() {
  const { planId } = useParams();
  const toast = useToast();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'report_card' | 'company_strength' | 'benefits' | 'limitations' | 'must_know' | 'best_suited' | 'variants'

  // Sub-category filter for Policy Benefits
  const [benefitCategory, setBenefitCategory] = useState('ALL');

  // Basic Information Form State
  const [basicForm, setBasicForm] = useState({
    name: '',
    subtitle: '',
    description: '',
    coverage: '',
    theme_primary: '#0038A8',
    theme_secondary: '#F0F4FF',
    status: 'active'
  });
  const [savingBasic, setSavingBasic] = useState(false);

  // Generic Edit Modal State
  const [itemModal, setItemModal] = useState({
    isOpen: false,
    sectionType: '', // 'benefit' | 'report_card' | 'company_strength' | 'limitation' | 'must_know' | 'best_suited' | 'variant'
    item: null,
    formData: {}
  });

  // Delete Confirm Modal
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    sectionType: '',
    id: null,
    title: ''
  });

  useEffect(() => {
    loadPlanData();
  }, [planId]);

  const loadPlanData = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getPlan(planId);
      const p = res.data;
      setPlan(p);
      if (p) {
        setBasicForm({
          name: p.name || '',
          subtitle: p.subtitle || p.tagline || '',
          description: p.description || '',
          coverage: p.coverage || '',
          theme_primary: p.theme_primary || p.primary_color || '#0038A8',
          theme_secondary: p.theme_secondary || p.secondary_color || '#F0F4FF',
          status: p.status || 'active'
        });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load plan');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBasic = async (e) => {
    e.preventDefault();
    try {
      setSavingBasic(true);
      await adminApi.updatePlan(plan.id, basicForm);
      invalidatePublicCache();
      toast.success('Basic plan information updated');
      loadPlanData();
    } catch (err) {
      toast.error(err.message || 'Failed to update plan information');
    } finally {
      setSavingBasic(false);
    }
  };

  // Reorder helper
  const handleMoveItem = async (sectionKey, index, direction) => {
    const list = [...(plan[sectionKey] || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const reordered = list.map((item, idx) => ({ id: item.id, display_order: idx + 1 }));

    try {
      if (sectionKey === 'policyBenefits') await adminApi.reorderBenefits(reordered);
      else if (sectionKey === 'variants') await adminApi.reorderVariants(reordered);
      else if (sectionKey === 'reportCard') await adminApi.reorderReportCard(reordered);
      else if (sectionKey === 'companyStrength') await adminApi.reorderCompanyStrength(reordered);
      else if (sectionKey === 'limitations') await adminApi.reorderLimitations(reordered);
      else if (sectionKey === 'mustKnow') await adminApi.reorderMustKnow(reordered);
      else if (sectionKey === 'bestSuited') await adminApi.reorderBestSuited(reordered);

      invalidatePublicCache();
      toast.success('Display order updated');
      loadPlanData();
    } catch (err) {
      toast.error(err.message || 'Failed to reorder items');
    }
  };

  // Delete Action
  const handleConfirmDelete = async () => {
    const { sectionType, id } = deleteModal;
    try {
      if (sectionType === 'variant') await adminApi.deleteVariant(id);
      else if (sectionType === 'benefit') await adminApi.deleteBenefit(id);
      else if (sectionType === 'report_card') await adminApi.deleteReportCardItem(id);
      else if (sectionType === 'company_strength') await adminApi.deleteCompanyStrengthItem(id);
      else if (sectionType === 'limitation') await adminApi.deleteLimitation(id);
      else if (sectionType === 'must_know') await adminApi.deleteMustKnowItem(id);
      else if (sectionType === 'best_suited') await adminApi.deleteBestSuitedItem(id);

      invalidatePublicCache();
      toast.success('Item deleted successfully');
      setDeleteModal({ isOpen: false, sectionType: '', id: null, title: '' });
      loadPlanData();
    } catch (err) {
      toast.error(err.message || 'Failed to delete item');
    }
  };

  // Open Modal for Add/Edit
  const openItemModal = (sectionType, item = null) => {
    let initialData = {};
    if (item) {
      initialData = { ...item };
    } else {
      if (sectionType === 'benefit') {
        initialData = {
          category: benefitCategory !== 'ALL' ? benefitCategory : 'MOST IMPORTANT',
          title: '',
          description: '',
          icon_url: '',
          video_url: '',
          display_order: (plan.policyBenefits?.length || 0) + 1,
          status: 'active'
        };
      } else if (sectionType === 'report_card') {
        initialData = {
          title: '',
          summary_value: '',
          explanation: '',
          display_order: (plan.reportCard?.length || 0) + 1,
          status: 'active'
        };
      } else if (sectionType === 'company_strength') {
        initialData = {
          title: '',
          summary_value: '',
          explanation: '',
          items: [],
          display_order: (plan.companyStrength?.length || 0) + 1,
          status: 'active'
        };
      } else if (sectionType === 'limitation') {
        initialData = {
          title: '',
          waiting_period: '',
          description: '',
          icon_url: '',
          video_url: '',
          display_order: (plan.limitations?.length || 0) + 1,
          status: 'active'
        };
      } else if (sectionType === 'must_know') {
        initialData = {
          title: '',
          description: '',
          icon_url: '',
          video_url: '',
          display_order: (plan.mustKnow?.length || 0) + 1,
          status: 'active'
        };
      } else if (sectionType === 'best_suited') {
        initialData = {
          heading: '',
          description: '',
          bullet_points: [],
          icon_url: '',
          video_url: '',
          display_order: (plan.bestSuited?.length || 0) + 1,
          status: 'active'
        };
      } else if (sectionType === 'variant') {
        initialData = {
          name: '',
          variant_key: '',
          room_category: 'Single Private Room',
          network_type: 'All Network Hospitals',
          sum_insured: '5 Lakhs – 1 Crore',
          tagline: '',
          badge: '',
          highlights: [],
          is_popular: false,
          display_order: (plan.variants?.length || 0) + 1,
          status: 'active'
        };
      }
    }

    setItemModal({
      isOpen: true,
      sectionType,
      item,
      formData: initialData
    });
  };

  // Save Modal Item
  const handleSaveModalItem = async (e) => {
    e.preventDefault();
    const { sectionType, item, formData } = itemModal;

    try {
      if (sectionType === 'variant') {
        if (item) await adminApi.updateVariant(item.id, formData);
        else await adminApi.createVariant(plan.id, formData);
      } else if (sectionType === 'benefit') {
        if (item) await adminApi.updateBenefit(item.id, formData);
        else await adminApi.createBenefit(plan.id, formData);
      } else if (sectionType === 'report_card') {
        if (item) await adminApi.updateReportCardItem(item.id, formData);
        else await adminApi.createReportCardItem(plan.id, formData);
      } else if (sectionType === 'company_strength') {
        if (item) await adminApi.updateCompanyStrengthItem(item.id, formData);
        else await adminApi.createCompanyStrengthItem(plan.id, formData);
      } else if (sectionType === 'limitation') {
        if (item) await adminApi.updateLimitation(item.id, formData);
        else await adminApi.createLimitation(plan.id, formData);
      } else if (sectionType === 'must_know') {
        if (item) await adminApi.updateMustKnowItem(item.id, formData);
        else await adminApi.createMustKnowItem(plan.id, formData);
      } else if (sectionType === 'best_suited') {
        if (item) await adminApi.updateBestSuitedItem(item.id, formData);
        else await adminApi.createBestSuitedItem(plan.id, formData);
      }

      invalidatePublicCache();
      toast.success(item ? 'Item updated' : 'New item added');
      setItemModal({ isOpen: false, sectionType: '', item: null, formData: {} });
      loadPlanData();
    } catch (err) {
      toast.error(err.message || 'Failed to save item');
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-xs font-semibold text-slate-400 font-sans">
        <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <span>Loading Plan Editor...</span>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="py-24 text-center font-sans">
        <h2 className="text-lg font-bold text-slate-800">Plan Not Found</h2>
        <Link to="/admin/plans" className="text-xs font-bold text-emerald-600 mt-2 inline-block">
          ← Return to Plans List
        </Link>
      </div>
    );
  }

  const companySlug = plan.company?.slug || plan.company_id;
  const publicPlanUrl = `/insurance/${companySlug}/${plan.slug}`;

  // Filter benefits based on active subcategory
  const filteredBenefits = (plan.policyBenefits || []).filter((b) => {
    if (benefitCategory === 'ALL') return true;
    const cat = String(b.category || b.section || '').toUpperCase();
    return cat.includes(benefitCategory);
  });

  // Navigation tab definitions adhering to Requirement 7
  const navTabs = [
    { id: 'basic', label: '1. Basic Information', icon: FiInfo },
    { id: 'report_card', label: '2. Report Card', icon: FiAward, count: plan.reportCard?.length },
    { id: 'company_strength', label: '3. Company Strength', icon: FiBriefcase, count: plan.companyStrength?.length },
    { id: 'benefits', label: '4. Policy Benefits', icon: FiShield, count: plan.policyBenefits?.length },
    { id: 'limitations', label: '5. Limitations & Waiting', icon: FiAlertTriangle, count: plan.limitations?.length },
    { id: 'must_know', label: '6. Must Know', icon: FiHelpCircle, count: plan.mustKnow?.length },
    { id: 'best_suited', label: '7. Best Suited / Perfect For', icon: FiUsers, count: plan.bestSuited?.length },
    { id: 'variants', label: '8. Plan Variants', icon: FiLayers, count: plan.variants?.length }
  ];

  return (
    <div className="space-y-6 font-sans animate-in fade-in duration-200">
      {/* Top Header Bar with Live Preview */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/plans"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm transition-colors cursor-pointer shrink-0"
            title="Back to Plans"
          >
            <FiArrowLeft />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase">
                {plan.company?.name || 'Insurer Plan'}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                plan.status === 'active' || plan.status === 'published'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {plan.status || 'Active'}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-display mt-1">
              {plan.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          <a
            href={publicPlanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <FiExternalLink />
            <span>Open Public Website View</span>
          </a>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto bg-white rounded-t-2xl px-3 pt-2 gap-2 text-xs font-bold text-slate-500">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'border-emerald-600 text-emerald-600 font-extrabold'
                  : 'border-transparent hover:text-slate-800'
              }`}
            >
              <Icon className="text-sm" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* SECTION 1: BASIC INFORMATION                                         */}
      {/* ===================================================================== */}
      {activeTab === 'basic' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-3xl space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Basic Plan Information</h2>
            <p className="text-xs text-slate-500 mt-0.5">Edit core naming, descriptions, coverage range, and branding colors</p>
          </div>

          <form onSubmit={handleSaveBasic} className="space-y-4 text-xs font-medium text-slate-700">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Plan Name *</label>
              <input
                type="text"
                required
                value={basicForm.name}
                onChange={(e) => setBasicForm({ ...basicForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Subtitle / Tagline</label>
              <input
                type="text"
                value={basicForm.subtitle}
                onChange={(e) => setBasicForm({ ...basicForm, subtitle: e.target.value })}
                placeholder="e.g. Unlimited Protection. Added Every Year."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Coverage Range</label>
              <input
                type="text"
                value={basicForm.coverage}
                onChange={(e) => setBasicForm({ ...basicForm, coverage: e.target.value })}
                placeholder="e.g. ₹10 Lakh - ₹2 Crore"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Full Description</label>
              <textarea
                rows={3}
                value={basicForm.description}
                onChange={(e) => setBasicForm({ ...basicForm, description: e.target.value })}
                placeholder="Plan overview and value proposition..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Theme Primary Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={basicForm.theme_primary}
                    onChange={(e) => setBasicForm({ ...basicForm, theme_primary: e.target.value })}
                    className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white shrink-0"
                  />
                  <input
                    type="text"
                    value={basicForm.theme_primary}
                    onChange={(e) => setBasicForm({ ...basicForm, theme_primary: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Theme Secondary Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={basicForm.theme_secondary}
                    onChange={(e) => setBasicForm({ ...basicForm, theme_secondary: e.target.value })}
                    className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white shrink-0"
                  />
                  <input
                    type="text"
                    value={basicForm.theme_secondary}
                    onChange={(e) => setBasicForm({ ...basicForm, theme_secondary: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Publication Status</label>
              <select
                value={basicForm.status}
                onChange={(e) => setBasicForm({ ...basicForm, status: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
              >
                <option value="active">Active (Visible on Website)</option>
                <option value="inactive">Inactive / Draft</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={savingBasic}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-950/10 flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <FiSave />
                <span>{savingBasic ? 'Saving...' : 'Save Plan Details'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 2: REPORT CARD CMS                                            */}
      {/* ===================================================================== */}
      {activeTab === 'report_card' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Report Card Metrics</h2>
              <p className="text-xs text-slate-500">Manage Claim Settlement Ratio (CSR), Incurred Claim Ratio (ICR), Complaints/10K, etc.</p>
            </div>
            <button
              type="button"
              onClick={() => openItemModal('report_card')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              <FiPlus />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(plan.reportCard || []).map((rc, idx) => (
              <div key={rc.id || idx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:border-emerald-300 transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <span>{rc.title}</span>
                    <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">#{idx + 1}</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight text-emerald-700 mb-2">
                    {rc.summary_value || rc.single_year || '—'}
                  </div>
                  {rc.explanation && (
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">{rc.explanation}</p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveItem('reportCard', idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    >
                      <FiChevronUp />
                    </button>
                    <button
                      type="button"
                      disabled={idx === (plan.reportCard?.length || 0) - 1}
                      onClick={() => handleMoveItem('reportCard', idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    >
                      <FiChevronDown />
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openItemModal('report_card', rc)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteModal({ isOpen: true, sectionType: 'report_card', id: rc.id, title: rc.title })}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 3: COMPANY STRENGTH CMS                                       */}
      {/* ===================================================================== */}
      {activeTab === 'company_strength' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Company Strength & Financials</h2>
              <p className="text-xs text-slate-500">Ownership, Solvency Ratio, Credit Rating, Financial Base, etc.</p>
            </div>
            <button
              type="button"
              onClick={() => openItemModal('company_strength')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              <FiPlus />
              <span>Add Strength Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(plan.companyStrength || []).map((cs, idx) => (
              <div key={cs.id || idx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:border-emerald-300 transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <span>{cs.title}</span>
                    <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">#{idx + 1}</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono tracking-tight text-blue-700 mb-2">
                    {cs.summary_value || '—'}
                  </div>
                  {cs.explanation && (
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">{cs.explanation}</p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveItem('companyStrength', idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    >
                      <FiChevronUp />
                    </button>
                    <button
                      type="button"
                      disabled={idx === (plan.companyStrength?.length || 0) - 1}
                      onClick={() => handleMoveItem('companyStrength', idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    >
                      <FiChevronDown />
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openItemModal('company_strength', cs)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteModal({ isOpen: true, sectionType: 'company_strength', id: cs.id, title: cs.title })}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 4: POLICY BENEFITS CMS                                        */}
      {/* ===================================================================== */}
      {activeTab === 'benefits' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {['ALL', 'MOST IMPORTANT', 'VALUE ADDED', 'ADDITIONAL', 'OPTIONAL'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setBenefitCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                    benefitCategory === cat
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openItemModal('benefit')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <FiPlus />
              <span>Add Benefit</span>
            </button>
          </div>

          <div className="space-y-3">
            {filteredBenefits.map((b, idx) => (
              <div key={b.id || idx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                    {b.icon_url && b.icon_url.startsWith('http') ? (
                      <img src={b.icon_url} alt="" className="w-6 h-6 object-contain" />
                    ) : (
                      <FiShield className="text-emerald-600 w-5 h-5" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                        {b.category || b.section || 'MOST IMPORTANT'}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                      {b.summary || b.detailed_description || b.subtitle || 'Covered as per policy terms'}
                    </p>
                    {b.video_url && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 font-semibold mt-1">
                        <FiPlay className="text-xs" /> Video Explainer Attached
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveItem('policyBenefits', idx, 'up')}
                    className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    <FiChevronUp />
                  </button>
                  <button
                    type="button"
                    disabled={idx === filteredBenefits.length - 1}
                    onClick={() => handleMoveItem('policyBenefits', idx, 'down')}
                    className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    <FiChevronDown />
                  </button>
                  <button
                    type="button"
                    onClick={() => openItemModal('benefit', b)}
                    className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <FiEdit2 className="text-sm" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteModal({ isOpen: true, sectionType: 'benefit', id: b.id, title: b.title })}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 5: LIMITATIONS & WAITING PERIODS                              */}
      {/* ===================================================================== */}
      {activeTab === 'limitations' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Limitations & Waiting Periods</h2>
              <p className="text-xs text-slate-500">Initial waiting period, specific diseases, pre-existing disease terms, permanent exclusions</p>
            </div>
            <button
              type="button"
              onClick={() => openItemModal('limitation')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              <FiPlus />
              <span>Add Limitation</span>
            </button>
          </div>

          <div className="space-y-3">
            {(plan.limitations || []).map((lim, idx) => (
              <div key={lim.id || idx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {lim.waiting_period && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100 uppercase">
                        {lim.waiting_period}
                      </span>
                    )}
                    <h4 className="text-sm font-bold text-slate-900">{lim.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{lim.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveItem('limitations', idx, 'up')}
                    className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    <FiChevronUp />
                  </button>
                  <button
                    type="button"
                    disabled={idx === (plan.limitations?.length || 0) - 1}
                    onClick={() => handleMoveItem('limitations', idx, 'down')}
                    className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    <FiChevronDown />
                  </button>
                  <button
                    type="button"
                    onClick={() => openItemModal('limitation', lim)}
                    className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <FiEdit2 className="text-sm" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteModal({ isOpen: true, sectionType: 'limitation', id: lim.id, title: lim.title })}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 6: MUST KNOW DETAILS                                          */}
      {/* ===================================================================== */}
      {activeTab === 'must_know' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Must Know Policy Details</h2>
              <p className="text-xs text-slate-500">Crucial fine-print caveats, room categories, discounts, and renewal terms</p>
            </div>
            <button
              type="button"
              onClick={() => openItemModal('must_know')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              <FiPlus />
              <span>Add Must Know</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(plan.mustKnow || []).map((mk, idx) => (
              <div key={mk.id || idx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{mk.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{mk.description}</p>
                </div>
                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveItem('mustKnow', idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    >
                      <FiChevronUp />
                    </button>
                    <button
                      type="button"
                      disabled={idx === (plan.mustKnow?.length || 0) - 1}
                      onClick={() => handleMoveItem('mustKnow', idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    >
                      <FiChevronDown />
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openItemModal('must_know', mk)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteModal({ isOpen: true, sectionType: 'must_know', id: mk.id, title: mk.title })}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 7: BEST SUITED / PERFECT FOR                                  */}
      {/* ===================================================================== */}
      {activeTab === 'best_suited' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Best Suited / Perfect For Profiles</h2>
              <p className="text-xs text-slate-500">Target customer scenarios (Families, Senior Citizens, Young Professionals, etc.)</p>
            </div>
            <button
              type="button"
              onClick={() => openItemModal('best_suited')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              <FiPlus />
              <span>Add Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(plan.bestSuited || []).map((bs, idx) => (
              <div key={bs.id || idx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{bs.heading || bs.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{bs.description}</p>
                  {bs.bullet_points && bs.bullet_points.length > 0 && (
                    <ul className="space-y-1 mb-2">
                      {bs.bullet_points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs text-slate-500 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveItem('bestSuited', idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    >
                      <FiChevronUp />
                    </button>
                    <button
                      type="button"
                      disabled={idx === (plan.bestSuited?.length || 0) - 1}
                      onClick={() => handleMoveItem('bestSuited', idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    >
                      <FiChevronDown />
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openItemModal('best_suited', bs)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteModal({ isOpen: true, sectionType: 'best_suited', id: bs.id, title: bs.heading || bs.title })}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 8: PLAN VARIANTS                                              */}
      {/* ===================================================================== */}
      {activeTab === 'variants' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Plan Variants (Tiers & Options)</h2>
              <p className="text-xs text-slate-500">e.g. Standard, Smart, Elite with variant-specific room category and network terms</p>
            </div>
            <button
              type="button"
              onClick={() => openItemModal('variant')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              <FiPlus />
              <span>Add Variant</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(plan.variants || []).map((v, idx) => (
              <div key={v.id || idx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">{v.name || v.variant_name}</span>
                    {v.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 uppercase">
                        {v.badge}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600 mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Room Category:</span>
                      <span className="font-semibold text-slate-800">{v.room_category || 'Single Private'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sum Insured:</span>
                      <span className="font-mono font-semibold text-slate-800">{v.sum_insured || v.coverage || '—'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveItem('variants', idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    >
                      <FiChevronUp />
                    </button>
                    <button
                      type="button"
                      disabled={idx === (plan.variants?.length || 0) - 1}
                      onClick={() => handleMoveItem('variants', idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    >
                      <FiChevronDown />
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openItemModal('variant', v)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteModal({ isOpen: true, sectionType: 'variant', id: v.id, title: v.name || v.variant_name })}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* GENERIC ITEM EDIT / CREATE MODAL                                      */}
      {/* ===================================================================== */}
      {itemModal.isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900 tracking-tight capitalize">
                {itemModal.item ? 'Edit' : 'Add'} {itemModal.sectionType.replace('_', ' ')}
              </h3>
              <button
                type="button"
                onClick={() => setItemModal({ isOpen: false, sectionType: '', item: null, formData: {} })}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm transition-colors cursor-pointer"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveModalItem} className="p-6 overflow-y-auto space-y-4 text-xs font-medium text-slate-700">
              {/* POLICY BENEFIT FORM FIELDS */}
              {itemModal.sectionType === 'benefit' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Category *</label>
                      <select
                        value={itemModal.formData.category || 'MOST IMPORTANT'}
                        onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, category: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      >
                        <option value="MOST IMPORTANT">MOST IMPORTANT</option>
                        <option value="VALUE ADDED">VALUE ADDED</option>
                        <option value="ADDITIONAL">ADDITIONAL</option>
                        <option value="OPTIONAL">OPTIONAL</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Benefit Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Any Room Category, Restore Infinity Plus"
                        value={itemModal.formData.title || ''}
                        onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, title: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Detailed explanation of the policy benefit..."
                      value={itemModal.formData.summary || itemModal.formData.detailed_description || ''}
                      onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, summary: e.target.value, detailed_description: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <IconField
                      label="Benefit Icon"
                      value={itemModal.formData.icon_url || itemModal.formData.icon_type}
                      onChange={(icon) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, icon_url: icon, icon_type: icon } })}
                    />
                    <VideoField
                      label="Video Explainer (Optional)"
                      value={itemModal.formData.video_url}
                      onChange={(video) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, video_url: video } })}
                    />
                  </div>
                </>
              )}

              {/* REPORT CARD FORM FIELDS */}
              {itemModal.sectionType === 'report_card' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Metric Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Claim Settlement Ratio, Incurred Claim Ratio"
                        value={itemModal.formData.title || ''}
                        onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, title: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Display Value *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 98.7%, 68.20%, 11.2"
                        value={itemModal.formData.summary_value || itemModal.formData.single_year || ''}
                        onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, summary_value: e.target.value, single_year: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Explanation / Subtitle</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. On average, settled around 98.7% of claims over the last 3 years..."
                      value={itemModal.formData.explanation || ''}
                      onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, explanation: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* COMPANY STRENGTH FORM FIELDS */}
              {itemModal.sectionType === 'company_strength' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Heading / Category *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. OWNERSHIP, CREDIT RATING, CAPITAL STRENGTH"
                        value={itemModal.formData.title || ''}
                        onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, title: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Display Value *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 51% / 49%, AAA, 2.00×"
                        value={itemModal.formData.summary_value || ''}
                        onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, summary_value: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Explanation</label>
                    <textarea
                      rows={2}
                      placeholder="Financial reliability overview..."
                      value={itemModal.formData.explanation || ''}
                      onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, explanation: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* LIMITATIONS FORM FIELDS */}
              {itemModal.sectionType === 'limitation' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Limitation Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Initial Waiting Period (30 Days)"
                        value={itemModal.formData.title || ''}
                        onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, title: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Waiting Period / Duration</label>
                      <input
                        type="text"
                        placeholder="e.g. 30 Days, 24 Months, 36 Months"
                        value={itemModal.formData.waiting_period || itemModal.formData.duration_tag || ''}
                        onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, waiting_period: e.target.value, duration_tag: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Terms and conditions..."
                      value={itemModal.formData.description || ''}
                      onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, description: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <IconField
                      label="Icon"
                      value={itemModal.formData.icon_url}
                      onChange={(icon) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, icon_url: icon } })}
                    />
                    <VideoField
                      label="Video Explainer (Optional)"
                      value={itemModal.formData.video_url}
                      onChange={(video) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, video_url: video } })}
                    />
                  </div>
                </>
              )}

              {/* MUST KNOW FORM FIELDS */}
              {itemModal.sectionType === 'must_know' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DISCOUNT & PREMIUM, ROOM CATEGORY"
                      value={itemModal.formData.title || ''}
                      onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, title: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Description *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Essential notice or fine print explanation..."
                      value={itemModal.formData.description || ''}
                      onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, description: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <IconField
                      label="Icon"
                      value={itemModal.formData.icon_url}
                      onChange={(icon) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, icon_url: icon } })}
                    />
                    <VideoField
                      label="Video Explainer (Optional)"
                      value={itemModal.formData.video_url}
                      onChange={(video) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, video_url: video } })}
                    />
                  </div>
                </>
              )}

              {/* BEST SUITED FORM FIELDS */}
              {itemModal.sectionType === 'best_suited' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Profile Heading *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Families, Individuals, Senior Citizens"
                      value={itemModal.formData.heading || itemModal.formData.title || ''}
                      onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, heading: e.target.value, title: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Description *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Why this plan is ideal for this persona..."
                      value={itemModal.formData.description || ''}
                      onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, description: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Bullet Points (One per line)</label>
                    <textarea
                      rows={3}
                      placeholder="Point 1&#10;Point 2&#10;Point 3"
                      value={Array.isArray(itemModal.formData.bullet_points) ? itemModal.formData.bullet_points.join('\n') : ''}
                      onChange={(e) => setItemModal({
                        ...itemModal,
                        formData: {
                          ...itemModal.formData,
                          bullet_points: e.target.value.split('\n').filter(Boolean)
                        }
                      })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <IconField
                      label="Icon"
                      value={itemModal.formData.icon_url}
                      onChange={(icon) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, icon_url: icon } })}
                    />
                    <VideoField
                      label="Video Explainer (Optional)"
                      value={itemModal.formData.video_url}
                      onChange={(video) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, video_url: video } })}
                    />
                  </div>
                </>
              )}

              {/* VARIANT FORM FIELDS */}
              {itemModal.sectionType === 'variant' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Variant Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Standard, Smart, Elite"
                        value={itemModal.formData.name || itemModal.formData.variant_name || ''}
                        onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, name: e.target.value, variant_name: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Room Category</label>
                      <input
                        type="text"
                        placeholder="e.g. Single Private Room, Twin Sharing, Any Room"
                        value={itemModal.formData.room_category || ''}
                        onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, room_category: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Sum Insured Range</label>
                      <input
                        type="text"
                        placeholder="e.g. 5 Lakhs – 25 Lakhs"
                        value={itemModal.formData.sum_insured || itemModal.formData.coverage || ''}
                        onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, sum_insured: e.target.value, coverage: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Badge</label>
                      <input
                        type="text"
                        placeholder="e.g. MOST POPULAR, SMART VALUE"
                        value={itemModal.formData.badge || ''}
                        onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, badge: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Tagline</label>
                    <input
                      type="text"
                      placeholder="Variant summary tagline..."
                      value={itemModal.formData.tagline || ''}
                      onChange={(e) => setItemModal({ ...itemModal, formData: { ...itemModal.formData, tagline: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setItemModal({ isOpen: false, sectionType: '', item: null, formData: {} })}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors cursor-pointer"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Confirm Removal"
        message={`Are you sure you want to delete '${deleteModal.title}'? This action cannot be undone.`}
        confirmText="Delete Item"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, sectionType: '', id: null, title: '' })}
      />
    </div>
  );
}

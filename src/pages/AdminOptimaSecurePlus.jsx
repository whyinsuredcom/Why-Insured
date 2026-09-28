import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiShield,
  FiAward,
  FiAlertTriangle,
  FiHelpCircle,
  FiVideo,
  FiSliders,
  FiActivity,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiCheckCircle,
  FiRefreshCw,
  FiLogOut,
  FiSearch,
  FiMenu,
  FiX,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiEyeOff,
  FiPlay,
  FiSave,
  FiLayers,
  FiHeart,
  FiStar,
  FiCheck,
  FiDollarSign,
  FiCompass,
  FiTrendingUp,
  FiAlertCircle,
  FiSettings,
  FiExternalLink,
  FiUserCheck,
  FiCheckSquare,
  FiClock,
  FiInfo
} from 'react-icons/fi';

import {
  fetchOptimaSecurePlusPlan,
  updateOptimaSecurePlusPlanInfo,
  createFeature,
  updateFeature,
  deleteFeature,
  toggleFeatureStatus,
  reorderFeatures,
  createReportCard,
  updateReportCard,
  deleteReportCard,
  toggleReportCardStatus,
  reorderReportCards,
  createCompanyStrength,
  updateCompanyStrength,
  deleteCompanyStrength,
  toggleCompanyStrengthStatus,
  reorderCompanyStrengths,
  createLimitation,
  updateLimitation,
  deleteLimitation,
  toggleLimitationStatus,
  reorderLimitations,
  createMustKnowItem,
  updateMustKnowItem,
  deleteMustKnowItem,
  toggleMustKnowStatus,
  reorderMustKnowItems,
  uploadVideoFile,
  adminLogout,
  getAdminUser
} from '../services/optimaSecurePlusService';

import logoImg from '../assets/logo.png';
import hdfcErgoLogo from '../assets/hdfc-ergo.png';
import secureBenefitVideo from '../assets/2x coverage.mp4';
import unlimitedVideo from '../assets/unlimited.mp4';
import preventiveVideo from '../assets/Preventive.mp4';

// Available icons for selection
const AVAILABLE_ICONS = [
  { key: 'check', label: 'Checkmark', icon: FiCheck },
  { key: 'shield', label: 'Shield', icon: FiShield },
  { key: 'heart', label: 'Heart', icon: FiHeart },
  { key: 'award', label: 'Award', icon: FiAward },
  { key: 'star', label: 'Star', icon: FiStar },
  { key: 'dollar', label: 'Currency', icon: FiDollarSign },
  { key: 'compass', label: 'Compass', icon: FiCompass },
  { key: 'trending', label: 'Growth', icon: FiTrendingUp },
  { key: 'clock', label: 'Clock', icon: FiClock },
  { key: 'info', label: 'Info', icon: FiInfo },
  { key: 'layers', label: 'Layers', icon: FiLayers }
];

// Feature Sections
const FEATURE_SECTIONS = [
  { key: 'most_important', title: 'Most Important Features', shortTitle: 'Most Important' },
  { key: 'value_added', title: 'Value Added Features', shortTitle: 'Value Added' },
  { key: 'additional', title: 'Additional Features', shortTitle: 'Additional' },
  { key: 'optional_rider', title: 'Optional Riders / Add-ons', shortTitle: 'Optional Riders' }
];

// Preset Videos
const PRESET_VIDEOS = [
  { label: 'None (No Video)', value: '' },
  { label: 'Preset: 2X Secure Benefit Video', value: 'asset:2x_coverage' },
  { label: 'Preset: Unlimited Restoration Video', value: 'asset:unlimited' },
  { label: 'Preset: Preventive Health Check Video', value: 'asset:preventive' }
];

export default function AdminOptimaSecurePlus() {
  const navigate = useNavigate();
  const adminUser = getAdminUser() || { username: 'admin', name: 'Administrator' };

  // Current active navigation tab
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Loading and feedback states
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [featureSubSection, setFeatureSubSection] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Data Store States
  const [planForm, setPlanForm] = useState({
    plan_name: 'Optima Secure+',
    company_name: 'HDFC ERGO',
    policy_subtitle: 'HDFC ERGO Health Insurance Policy',
    tagline: 'Unlimited Protection. Added Every Year.',
    description: '4X Coverage with Secure, Plus, Restore & Protect benefits.',
    logo: '/assets/hdfc-ergo.png',
    coverage: '₹10 Lakh - ₹2 Crore',
    status: 'active'
  });

  const [featuresList, setFeaturesList] = useState([]);
  const [reportCardList, setReportCardList] = useState([]);
  const [companyStrengthList, setCompanyStrengthList] = useState([]);
  const [limitationsList, setLimitationsList] = useState([]);
  const [mustKnowList, setMustKnowList] = useState([]);

  // Modal States
  const [activeModal, setActiveModal] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [deletingItem, setDeletingItem] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [savingItem, setSavingItem] = useState(false);
  const [savingPlan, setSavingPlan] = useState(false);

  // Form State for Modals
  const [featureForm, setFeatureForm] = useState({
    section: 'most_important',
    title: '',
    subtitle: '',
    summary: '',
    badge: '',
    icon_type: 'check',
    video_url: '',
    video_title: '',
    points: [],
    steps: [],
    display_order: 1,
    status: 'active'
  });

  const [reportCardForm, setReportCardForm] = useState({
    category: 'Claims',
    title: '',
    score: '',
    subtitle: '',
    description: '',
    single_year: '',
    three_year_avg: '',
    video_url: '',
    display_order: 1,
    status: 'active'
  });

  const [companyStrengthForm, setCompanyStrengthForm] = useState({
    title: '',
    value: '',
    label: '',
    description: '',
    video_url: '',
    display_order: 1,
    status: 'active'
  });

  const [limitationForm, setLimitationForm] = useState({
    title: '',
    duration_tag: '',
    description: '',
    highlight: '',
    policy_ref: '',
    disease_list: [],
    exclusions_list: [],
    video_url: '',
    display_order: 1,
    status: 'active'
  });

  const [mustKnowForm, setMustKnowForm] = useState({
    title: '',
    icon: 'ℹ️',
    description: '',
    paragraphs: [],
    display_order: 1,
    status: 'active'
  });

  // Dynamic Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Toast helper
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  // Load All CMS Data
  const loadAllData = async () => {
    setLoading(true);
    try {
      const res = await fetchOptimaSecurePlusPlan(true);
      if (res.data) {
        setIsFallback(res.isFallback);
        setPlanForm({
          plan_name: res.data.planName || 'Optima Secure+',
          company_name: res.data.companyName || 'HDFC ERGO',
          policy_subtitle: res.data.policySubtitle || 'HDFC ERGO Health Insurance Policy',
          tagline: res.data.tagline || 'Unlimited Protection. Added Every Year.',
          description: res.data.description || '4X Coverage with Secure, Plus, Restore & Protect benefits.',
          logo: res.data.logo || '/assets/hdfc-ergo.png',
          coverage: res.data.coverage || '₹10 Lakh - ₹2 Crore',
          status: res.data.status || 'active'
        });

        // Features
        if (res.data.allFeatures && res.data.allFeatures.length > 0) {
          setFeaturesList(res.data.allFeatures);
        } else if (res.data.featuresSections) {
          const flat = [];
          res.data.featuresSections.forEach((sec) => {
            sec.items.forEach((item) => {
              flat.push({
                ...item,
                section: sec.sectionKey || (sec.id === 'sec-1' ? 'most_important' : sec.id === 'sec-2' ? 'value_added' : sec.id === 'sec-3' ? 'additional' : 'optional_rider'),
                icon_type: item.iconType || item.icon_type || 'check',
                video_url: item.videoUrl || item.video_url || '',
                display_order: item.displayOrder || item.display_order || 1,
                status: item.status || 'active'
              });
            });
          });
          setFeaturesList(flat);
        }

        // 4 Subsections
        if (res.data.reportCard?.items) setReportCardList(res.data.reportCard.items);
        if (res.data.companyStrength?.items) setCompanyStrengthList(res.data.companyStrength.items);
        if (res.data.limitationsWaitingPeriods?.items) setLimitationsList(res.data.limitationsWaitingPeriods.items);
        if (res.data.mustKnow?.items) setMustKnowList(res.data.mustKnow.items);
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'Unable to connect to server. Using offline state.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Logout
  const handleLogout = async () => {
    await adminLogout();
    navigate('/admin/login', { replace: true });
  };

  // Plan Info Save
  const handleSavePlanInfo = async (e) => {
    e.preventDefault();
    setSavingPlan(true);
    try {
      await updateOptimaSecurePlusPlanInfo(planForm);
      showToast('success', '✓ Plan information updated successfully');
      await loadAllData();
    } catch (err) {
      showToast('error', err.message || 'Unable to save plan changes');
    } finally {
      setSavingPlan(false);
    }
  };

  // ===========================================================================
  // OPEN ADD / EDIT MODALS
  // ===========================================================================
  const handleOpenAdd = (type) => {
    setEditingItem(null);
    if (type === 'feature') {
      const defaultSec = featureSubSection !== 'all' ? featureSubSection : 'most_important';
      setFeatureForm({
        section: defaultSec,
        title: '',
        subtitle: '',
        summary: '',
        badge: '',
        icon_type: 'check',
        video_url: '',
        video_title: '',
        points: [],
        steps: [],
        display_order: featuresList.length + 1,
        status: 'active'
      });
    } else if (type === 'report_card') {
      setReportCardForm({
        category: 'Claims',
        title: '',
        score: '',
        subtitle: '',
        description: '',
        single_year: '',
        three_year_avg: '',
        video_url: '',
        display_order: reportCardList.length + 1,
        status: 'active'
      });
    } else if (type === 'company_strength') {
      setCompanyStrengthForm({
        title: '',
        value: '',
        label: '',
        description: '',
        video_url: '',
        display_order: companyStrengthList.length + 1,
        status: 'active'
      });
    } else if (type === 'limitation') {
      setLimitationForm({
        title: '',
        duration_tag: '',
        description: '',
        highlight: '',
        policy_ref: '',
        disease_list: [],
        exclusions_list: [],
        video_url: '',
        display_order: limitationsList.length + 1,
        status: 'active'
      });
    } else if (type === 'must_know') {
      setMustKnowForm({
        title: '',
        icon: 'ℹ️',
        description: '',
        paragraphs: [],
        display_order: mustKnowList.length + 1,
        status: 'active'
      });
    }
    setActiveModal(type);
  };

  const handleOpenEdit = (type, item) => {
    setEditingItem(item);
    if (type === 'feature') {
      setFeatureForm({
        section: item.section || 'most_important',
        title: item.title || '',
        subtitle: item.subtitle || '',
        summary: item.summary || '',
        badge: item.badge || '',
        icon_type: item.icon_type || item.iconType || 'check',
        video_url: item.video_url || item.videoUrl || '',
        video_title: item.video_title || item.videoTitle || item.title || '',
        points: Array.isArray(item.points) ? [...item.points] : [],
        steps: Array.isArray(item.steps) ? [...item.steps] : [],
        display_order: item.display_order || 1,
        status: item.status || 'active'
      });
    } else if (type === 'report_card') {
      setReportCardForm({
        category: item.category || 'Claims',
        title: item.title || '',
        score: item.score || item.summaryValue || '',
        subtitle: item.subtitle || '',
        description: item.description || item.explanation || '',
        single_year: item.single_year || item.singleYear || '',
        three_year_avg: item.three_year_avg || item.threeYearAvg || '',
        video_url: item.video_url || item.videoUrl || '',
        display_order: item.display_order || 1,
        status: item.status || 'active'
      });
    } else if (type === 'company_strength') {
      setCompanyStrengthForm({
        title: item.title || '',
        value: item.value || item.summaryValue || '',
        label: item.label || '',
        description: item.description || item.explanation || '',
        video_url: item.video_url || item.videoUrl || '',
        display_order: item.display_order || 1,
        status: item.status || 'active'
      });
    } else if (type === 'limitation') {
      setLimitationForm({
        title: item.title || '',
        duration_tag: item.duration_tag || item.durationTag || '',
        description: item.description || item.summary || '',
        highlight: item.highlight || '',
        policy_ref: item.policy_ref || item.policyRef || '',
        disease_list: Array.isArray(item.disease_list) ? [...item.disease_list] : [],
        exclusions_list: Array.isArray(item.exclusions_list) ? [...item.exclusions_list] : [],
        video_url: item.video_url || item.videoUrl || '',
        display_order: item.display_order || 1,
        status: item.status || 'active'
      });
    } else if (type === 'must_know') {
      setMustKnowForm({
        title: item.title || '',
        icon: item.icon || 'ℹ️',
        description: item.description || '',
        paragraphs: Array.isArray(item.paragraphs) ? [...item.paragraphs] : [item.description || ''],
        display_order: item.display_order || 1,
        status: item.status || 'active'
      });
    }
    setActiveModal(type);
  };

  // Save Modal Item
  const handleSaveModal = async (e) => {
    e.preventDefault();
    setSavingItem(true);
    try {
      if (activeModal === 'feature') {
        if (!featureForm.title.trim()) throw new Error('Feature title is required');
        if (editingItem) {
          await updateFeature(editingItem.id, featureForm);
          showToast('success', '✓ Feature updated successfully');
        } else {
          await createFeature(featureForm);
          showToast('success', '✓ Feature added successfully');
        }
      } else if (activeModal === 'report_card') {
        if (!reportCardForm.title.trim()) throw new Error('Title is required');
        if (editingItem) {
          await updateReportCard(editingItem.id, reportCardForm);
          showToast('success', '✓ Report Card updated successfully');
        } else {
          await createReportCard(reportCardForm);
          showToast('success', '✓ Report Card added successfully');
        }
      } else if (activeModal === 'company_strength') {
        if (!companyStrengthForm.title.trim()) throw new Error('Title is required');
        if (editingItem) {
          await updateCompanyStrength(editingItem.id, companyStrengthForm);
          showToast('success', '✓ Company Strength updated successfully');
        } else {
          await createCompanyStrength(companyStrengthForm);
          showToast('success', '✓ Company Strength added successfully');
        }
      } else if (activeModal === 'limitation') {
        if (!limitationForm.title.trim()) throw new Error('Title is required');
        if (editingItem) {
          await updateLimitation(editingItem.id, limitationForm);
          showToast('success', '✓ Limitation updated successfully');
        } else {
          await createLimitation(limitationForm);
          showToast('success', '✓ Limitation added successfully');
        }
      } else if (activeModal === 'must_know') {
        if (!mustKnowForm.title.trim()) throw new Error('Title is required');
        if (editingItem) {
          await updateMustKnowItem(editingItem.id, mustKnowForm);
          showToast('success', '✓ Must Know item updated successfully');
        } else {
          await createMustKnowItem(mustKnowForm);
          showToast('success', '✓ Must Know item added successfully');
        }
      }
      setActiveModal(null);
      await loadAllData();
    } catch (err) {
      console.error('Save error:', err);
      showToast('error', err.message || 'Unable to add or update item.');
    } finally {
      setSavingItem(false);
    }
  };

  // Toggle Status
  const handleToggle = async (type, id, currentStatus) => {
    try {
      if (type === 'feature') await toggleFeatureStatus(id);
      if (type === 'report_card') await toggleReportCardStatus(id);
      if (type === 'company_strength') await toggleCompanyStrengthStatus(id);
      if (type === 'limitation') await toggleLimitationStatus(id);
      if (type === 'must_know') await toggleMustKnowStatus(id);

      const label = type === 'feature' ? 'Feature' : type === 'report_card' ? 'Report Card item' : type === 'company_strength' ? 'Company Strength' : type === 'limitation' ? 'Limitation' : 'Must Know item';
      showToast('success', `✓ ${label} ${currentStatus === 'active' ? 'disabled' : 'enabled'} successfully`);
      await loadAllData();
    } catch (err) {
      console.error('Toggle status error:', err);
      showToast('error', err.message || 'Unable to update status.');
    }
  };

  // Move Order Up / Down
  const handleMoveOrder = async (type, list, currentIndex, direction) => {
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const reordered = [...list];
    const temp = reordered[currentIndex];
    reordered[currentIndex] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    const items = reordered.map((it, idx) => ({ id: it.id, display_order: idx + 1 }));

    try {
      if (type === 'feature') await reorderFeatures(items);
      if (type === 'report_card') await reorderReportCards(items);
      if (type === 'company_strength') await reorderCompanyStrengths(items);
      if (type === 'limitation') await reorderLimitations(items);
      if (type === 'must_know') await reorderMustKnowItems(items);

      showToast('success', '✓ Order updated successfully');
      await loadAllData();
    } catch (err) {
      console.error('Reorder error:', err);
      showToast('error', err.message || 'Failed to reorder items.');
    }
  };

  // Confirm and Delete
  const handleConfirmDelete = async () => {
    if (!deleteDialog || deletingItem) return;
    const { type, item } = deleteDialog;
    if (!item || !item.id) {
      showToast('error', 'Unable to delete: Invalid item ID.');
      setDeleteDialog(null);
      return;
    }

    setDeletingItem(true);
    try {
      if (type === 'feature') await deleteFeature(item.id);
      else if (type === 'report_card') await deleteReportCard(item.id);
      else if (type === 'company_strength') await deleteCompanyStrength(item.id);
      else if (type === 'limitation') await deleteLimitation(item.id);
      else if (type === 'must_know') await deleteMustKnowItem(item.id);

      const label = type === 'feature' ? 'Feature' : type === 'report_card' ? 'Report Card item' : type === 'company_strength' ? 'Company Strength item' : type === 'limitation' ? 'Limitation' : 'Must Know item';
      showToast('success', `✓ ${label} deleted successfully`);
      setDeleteDialog(null);
      await loadAllData();
    } catch (err) {
      console.error('Delete error:', err);
      showToast('error', err.message || 'Unable to delete item. Please try again.');
    } finally {
      setDeletingItem(false);
    }
  };

  // Video Upload
  const handleFileUpload = async (e, setTargetForm) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    try {
      const res = await uploadVideoFile(file);
      setTargetForm((prev) => ({
        ...prev,
        video_url: res.fullUrl || res.url
      }));
      showToast('success', '✓ Video uploaded successfully');
    } catch (err) {
      showToast('error', err.message || 'Failed to upload video');
    } finally {
      setUploadingVideo(false);
    }
  };

  // Filter lists based on Search & Status
  const filterList = (items, fields = ['title', 'description']) => {
    return items.filter((item) => {
      if (statusFilter === 'active' && item.status !== 'active') return false;
      if (statusFilter === 'inactive' && item.status !== 'inactive') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = fields.some((f) => String(item[f] || '').toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  };

  const filteredFeatures = useMemo(() => {
    let list = featuresList;
    if (featureSubSection !== 'all') {
      list = list.filter((f) => f.section === featureSubSection);
    }
    return filterList(list, ['title', 'subtitle', 'summary', 'badge']);
  }, [featuresList, featureSubSection, statusFilter, searchQuery]);

  const filteredReportCards = useMemo(() => {
    let list = reportCardList;
    if (categoryFilter !== 'all') {
      list = list.filter((rc) => (rc.category || 'Claims').toLowerCase() === categoryFilter.toLowerCase());
    }
    return filterList(list, ['title', 'subtitle', 'description', 'category']);
  }, [reportCardList, categoryFilter, statusFilter, searchQuery]);

  const filteredCompanyStrengths = useMemo(() => {
    return filterList(companyStrengthList, ['title', 'value', 'label', 'description']);
  }, [companyStrengthList, statusFilter, searchQuery]);

  const filteredLimitations = useMemo(() => {
    return filterList(limitationsList, ['title', 'duration_tag', 'description', 'highlight', 'policy_ref']);
  }, [limitationsList, statusFilter, searchQuery]);

  const filteredMustKnow = useMemo(() => {
    return filterList(mustKnowList, ['title', 'description']);
  }, [mustKnowList, statusFilter, searchQuery]);

  // Video URL formatting helper
  const resolvePreviewUrl = (url) => {
    if (!url) return null;
    if (url === 'asset:unlimited') return { type: 'mp4', url: unlimitedVideo };
    if (url === 'asset:2x_coverage') return { type: 'mp4', url: secureBenefitVideo };
    if (url === 'asset:preventive') return { type: 'mp4', url: preventiveVideo };

    const uploadMatch = url.match(/(?:\/uploads\/.*)$/);
    if (url.startsWith('/uploads/') || uploadMatch) {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/+$/, '');
      const uploadPath = uploadMatch ? uploadMatch[0] : url;
      return { type: 'mp4', url: `${apiBase}${uploadPath}` };
    }

    if (url.includes('youtube.com/embed/')) return { type: 'youtube', url };
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return { type: 'youtube', url: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1` };
    }
    return { type: 'mp4', url };
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans flex flex-col antialiased selection:bg-emerald-500 selection:text-white w-full overflow-x-hidden">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-bounce max-w-[calc(100vw-32px)]">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-xs font-bold text-white border ${
              toast.type === 'success' ? 'bg-[#059669] border-emerald-600' : 'bg-rose-600 border-rose-700'
            }`}
          >
            {toast.type === 'success' ? <FiCheckCircle className="text-base shrink-0" /> : <FiAlertCircle className="text-base shrink-0" />}
            <span className="truncate">{toast.message}</span>
          </div>
        </div>
      )}

      {/* TOP HEADER — WHYINSURED THEME */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shadow-2xs w-full">
        <div className="px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          {/* Left: Mobile Hamburger Toggle & Official WHYINSURED Logo */}
          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80 cursor-pointer transition-colors shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              <FiMenu className="text-lg" />
            </button>

            {/* Official WHYINSURED Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <img
                src={logoImg}
                alt="WHYINSURED"
                className="h-7 sm:h-8 w-auto object-contain select-none"
                style={{ mixBlendMode: 'multiply' }}
              />
              <div className="hidden sm:block h-5 w-[1px] bg-slate-200" />
            </div>

            {/* Section & Plan Badges */}
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-[#059669] border border-emerald-200/70 shrink-0">
                <FiShield className="text-[10px]" />
                <span>Admin Panel</span>
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#0F172A] truncate">
                Optima Secure+
              </span>
            </div>
          </div>

          {/* Right: Actions & User Pill */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Refresh */}
            <button
              type="button"
              onClick={loadAllData}
              disabled={loading}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-[#0F172A] border border-slate-200/80 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <FiRefreshCw className={`text-sm ${loading ? 'animate-spin' : ''}`} />
            </button>

            {/* Live Website Link */}
            <Link
              to="/insurance/hdfc-ergo/hdfc-optima-secure-plus/features"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-[#059669] border border-emerald-300/80 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <span>View Live Plan</span>
              <FiExternalLink className="text-xs" />
            </Link>

            {/* Admin User Profile Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-[#0F172A]">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center text-[10px] font-bold shrink-0">
                A
              </div>
              <span className="text-xs font-bold hidden sm:inline">{adminUser.name || 'Admin'}</span>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-[#475569] hover:text-rose-600 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
              title="Logout"
            >
              <FiLogOut className="text-xs" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD LAYOUT (Sidebar + Content) */}
      <div className="flex-1 flex w-full relative">
        {/* MOBILE SIDEBAR DRAWER BACKDROP */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 lg:hidden"
          />
        )}

        {/* SIDEBAR NAVIGATION — WHYINSURED STYLE */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-[57px] h-screen lg:h-[calc(100vh-57px)] inset-y-0 left-0 z-40 w-72 lg:w-64 bg-white border-r border-[#E2E8F0] flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 ${
            mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Mobile Sidebar Header */}
          <div className="p-4 border-b border-slate-100 lg:hidden flex items-center justify-between">
            <img
              src={logoImg}
              alt="WHYINSURED"
              className="h-7 w-auto object-contain select-none"
              style={{ mixBlendMode: 'multiply' }}
            />
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <FiX className="text-base" />
            </button>
          </div>

          <div className="flex-1 py-4 px-3 space-y-5 overflow-y-auto">
            {/* Overview Section */}
            <div>
              <div className="px-3 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">
                OVERVIEW
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('dashboard');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-emerald-50 text-[#059669] border-l-2 border-[#059669]'
                    : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <FiActivity className="text-sm" />
                  <span>Dashboard</span>
                </span>
              </button>
            </div>

            {/* HDFC ERGO Optima Secure+ Content Modules */}
            <div>
              <div className="px-3 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">
                OPTIMA SECURE+ CMS
              </div>
              <div className="space-y-1">
                {/* Plan Info */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('plan_info');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'plan_info'
                      ? 'bg-emerald-50 text-[#059669] border-l-2 border-[#059669]'
                      : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <FiSliders className="text-sm" />
                    <span>Plan Information</span>
                  </span>
                </button>

                {/* Features */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('features');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'features'
                      ? 'bg-emerald-50 text-[#059669] border-l-2 border-[#059669]'
                      : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <FiShield className="text-sm" />
                    <span>Features</span>
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      activeTab === 'features' ? 'bg-emerald-200/60 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {featuresList.length}
                  </span>
                </button>

                {/* Report Card */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('report_card');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'report_card'
                      ? 'bg-emerald-50 text-[#059669] border-l-2 border-[#059669]'
                      : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <FiAward className="text-sm" />
                    <span>Report Card</span>
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      activeTab === 'report_card' ? 'bg-emerald-200/60 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {reportCardList.length}
                  </span>
                </button>

                {/* Company Strength */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('company_strength');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'company_strength'
                      ? 'bg-emerald-50 text-[#059669] border-l-2 border-[#059669]'
                      : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <FiTrendingUp className="text-sm" />
                    <span>Company Strength</span>
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      activeTab === 'company_strength' ? 'bg-emerald-200/60 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {companyStrengthList.length}
                  </span>
                </button>

                {/* Limitations */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('limitations');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'limitations'
                      ? 'bg-emerald-50 text-[#059669] border-l-2 border-[#059669]'
                      : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <FiAlertTriangle className="text-sm" />
                    <span>Limitations</span>
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      activeTab === 'limitations' ? 'bg-emerald-200/60 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {limitationsList.length}
                  </span>
                </button>

                {/* Must Know */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('must_know');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'must_know'
                      ? 'bg-emerald-50 text-[#059669] border-l-2 border-[#059669]'
                      : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <FiHelpCircle className="text-sm" />
                    <span>Must Know</span>
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      activeTab === 'must_know' ? 'bg-emerald-200/60 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {mustKnowList.length}
                  </span>
                </button>

                {/* Videos */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('videos');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'videos'
                      ? 'bg-emerald-50 text-[#059669] border-l-2 border-[#059669]'
                      : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <FiVideo className="text-sm" />
                    <span>Videos</span>
                  </span>
                </button>
              </div>
            </div>

            {/* System */}
            <div>
              <div className="px-3 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">
                SYSTEM
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('settings');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-emerald-50 text-[#059669] border-l-2 border-[#059669]'
                    : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <FiSettings className="text-sm" />
                  <span>Settings</span>
                </span>
              </button>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-200">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-[#475569] hover:text-rose-600 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT CONTAINER */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-8 space-y-6">

          {/* ========================================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW                                                 */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Greeting & Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-[#E2E8F0] shadow-xs">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#059669] mb-1">
                    <span>HDFC ERGO</span>
                    <span className="text-slate-300">•</span>
                    <span>Optima Secure+</span>
                  </div>
                  <h1 className="text-lg sm:text-2xl font-black text-[#0F172A] font-display">
                    Content Management
                  </h1>
                  <p className="text-xs text-[#475569] font-medium mt-0.5">
                    Manage HDFC ERGO Optima Secure+ content, features and information.
                  </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('features');
                      handleOpenAdd('feature');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
                  >
                    <FiPlus />
                    <span>+ Add Feature</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('report_card');
                      handleOpenAdd('report_card');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0F172A] text-xs font-bold border border-slate-200 cursor-pointer transition-all"
                  >
                    <FiPlus />
                    <span>+ Add Report Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('must_know');
                      handleOpenAdd('must_know');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0F172A] text-xs font-bold border border-slate-200 cursor-pointer transition-all"
                  >
                    <FiPlus />
                    <span>+ Add Must Know</span>
                  </button>
                </div>
              </div>

              {/* 4 Summary Cards — 1 col mobile, 2 col tablet, 4 col desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Total Features */}
                <div
                  onClick={() => setActiveTab('features')}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#0F172A] font-mono">
                    {featuresList.length}
                  </div>
                  <div className="text-xs font-bold text-[#475569] uppercase tracking-wider mt-1 flex items-center justify-between">
                    <span>Total Features</span>
                    <FiShield className="text-emerald-600 text-sm" />
                  </div>
                </div>

                {/* Active Features */}
                <div
                  onClick={() => {
                    setStatusFilter('active');
                    setActiveTab('features');
                  }}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#059669] font-mono">
                    {featuresList.filter((f) => f.status === 'active').length}
                  </div>
                  <div className="text-xs font-bold text-[#475569] uppercase tracking-wider mt-1 flex items-center justify-between">
                    <span>Active Features</span>
                    <span className="w-2 h-2 rounded-full bg-[#059669]" />
                  </div>
                </div>

                {/* Report Card Items */}
                <div
                  onClick={() => setActiveTab('report_card')}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="text-2xl sm:text-3xl font-black text-indigo-600 font-mono">
                    {reportCardList.length}
                  </div>
                  <div className="text-xs font-bold text-[#475569] uppercase tracking-wider mt-1 flex items-center justify-between">
                    <span>Report Card Items</span>
                    <FiAward className="text-indigo-600 text-sm" />
                  </div>
                </div>

                {/* Must Know Items */}
                <div
                  onClick={() => setActiveTab('must_know')}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">
                    {mustKnowList.length}
                  </div>
                  <div className="text-xs font-bold text-[#475569] uppercase tracking-wider mt-1 flex items-center justify-between">
                    <span>Must Know Items</span>
                    <FiHelpCircle className="text-amber-600 text-sm" />
                  </div>
                </div>
              </div>

              {/* Sections Quick Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Module 1: Plan Info */}
                <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center text-base mb-2">
                      <FiSliders />
                    </div>
                    <h3 className="font-extrabold text-sm text-[#0F172A]">Plan Information</h3>
                    <p className="text-xs text-[#475569] mt-1">
                      Edit plan name, taglines, company metadata, and base coverage.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('plan_info')}
                    className="w-full py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-bold text-[#059669] border border-slate-200 transition-colors cursor-pointer"
                  >
                    Manage Plan Info →
                  </button>
                </div>

                {/* Module 2: Company Strength */}
                <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center text-base mb-2">
                      <FiTrendingUp />
                    </div>
                    <h3 className="font-extrabold text-sm text-[#0F172A]">Company Strength</h3>
                    <p className="text-xs text-[#475569] mt-1">
                      Manage ownership, ratings, capital solvency, and assets base.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('company_strength')}
                    className="w-full py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-bold text-[#059669] border border-slate-200 transition-colors cursor-pointer"
                  >
                    Manage Company Strength →
                  </button>
                </div>

                {/* Module 3: Limitations */}
                <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-base mb-2">
                      <FiAlertTriangle />
                    </div>
                    <h3 className="font-extrabold text-sm text-[#0F172A]">Limitations & Exclusions</h3>
                    <p className="text-xs text-[#475569] mt-1">
                      Waiting periods, disease restrictions, and exclusions lists.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('limitations')}
                    className="w-full py-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-xs font-bold text-rose-600 border border-slate-200 transition-colors cursor-pointer"
                  >
                    Manage Limitations →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: PLAN INFORMATION                                                   */}
          {/* ========================================================================= */}
          {activeTab === 'plan_info' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-6 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base sm:text-lg font-black text-[#0F172A]">Base Plan Details</h2>
                <p className="text-xs text-[#475569]">
                  Edit core insurance details rendered at the top of Optima Secure+ page.
                </p>
              </div>

              <form onSubmit={handleSavePlanInfo} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Company Name</label>
                  <input
                    type="text"
                    value={planForm.company_name}
                    onChange={(e) => setPlanForm({ ...planForm, company_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Plan Name</label>
                  <input
                    type="text"
                    value={planForm.plan_name}
                    onChange={(e) => setPlanForm({ ...planForm, plan_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Policy Subtitle</label>
                  <input
                    type="text"
                    value={planForm.policy_subtitle}
                    onChange={(e) => setPlanForm({ ...planForm, policy_subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Coverage Range</label>
                  <input
                    type="text"
                    value={planForm.coverage}
                    onChange={(e) => setPlanForm({ ...planForm, coverage: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#475569] mb-1">Tagline / Key Highlight</label>
                  <input
                    type="text"
                    value={planForm.tagline}
                    onChange={(e) => setPlanForm({ ...planForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#475569] mb-1">Long Description</label>
                  <textarea
                    rows={3}
                    value={planForm.description}
                    onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Plan Status</label>
                  <select
                    value={planForm.status}
                    onChange={(e) => setPlanForm({ ...planForm, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#059669]"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>

                <div className="sm:col-span-2 flex justify-end pt-3">
                  <button
                    type="submit"
                    disabled={savingPlan}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <FiSave />
                    <span>{savingPlan ? 'SAVING...' : 'SAVE CHANGES'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: FEATURES MANAGEMENT                                                */}
          {/* ========================================================================= */}
          {activeTab === 'features' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              {/* Header Bar */}
              <div className="p-4 sm:p-5 border-b border-slate-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-[#0F172A]">Optima Secure+ Features</h2>
                    <p className="text-xs text-[#475569]">
                      Manage Most Important, Value Added, Additional, and Optional Rider benefits.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenAdd('feature')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer self-start sm:self-center shrink-0"
                  >
                    <FiPlus />
                    <span>+ ADD FEATURE</span>
                  </button>
                </div>

                {/* Sub-section Switcher Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setFeatureSubSection('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer ${
                      featureSubSection === 'all'
                        ? 'bg-[#059669] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Sections ({featuresList.length})
                  </button>
                  {FEATURE_SECTIONS.map((sec) => {
                    const count = featuresList.filter((f) => f.section === sec.key).length;
                    return (
                      <button
                        key={sec.key}
                        type="button"
                        onClick={() => setFeatureSubSection(sec.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer ${
                          featureSubSection === sec.key
                            ? 'bg-[#059669] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {sec.shortTitle} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Search & Status Filters */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <div className="relative flex-1 w-full">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Search features by title, summary, or badge..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white font-medium"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#059669] w-full sm:w-36"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
              </div>

              {/* Responsive Content */}
              {loading ? (
                <div className="py-16 text-center text-xs text-slate-400">Loading features...</div>
              ) : filteredFeatures.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <p className="text-xs font-semibold text-slate-500">No features found matching current criteria.</p>
                  <button
                    type="button"
                    onClick={() => handleOpenAdd('feature')}
                    className="px-4 py-2 bg-[#059669] text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    + Add Feature
                  </button>
                </div>
              ) : (
                <>
                  {/* MOBILE CARD VIEW (< md screens) */}
                  <div className="block md:hidden p-3 space-y-3">
                    {filteredFeatures.map((feat, idx) => {
                      const iconObj = AVAILABLE_ICONS.find((i) => i.key === (feat.icon_type || feat.iconType));
                      const IconComp = iconObj ? iconObj.icon : FiCheckSquare;
                      const isFirst = idx === 0;
                      const isLast = idx === filteredFeatures.length - 1;
                      const hasVideo = Boolean(feat.video_url || feat.videoUrl);

                      return (
                        <div key={feat.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center text-sm shrink-0 mt-0.5">
                                <IconComp />
                              </div>
                              <div>
                                <h4 className="font-black text-[#0F172A] text-xs leading-snug">{feat.title}</h4>
                                {feat.subtitle && (
                                  <p className="text-[11px] text-[#475569] font-medium mt-0.5">{feat.subtitle}</p>
                                )}
                              </div>
                            </div>
                            {feat.badge && (
                              <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                                {feat.badge}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                {feat.section ? feat.section.replace('_', ' ') : 'Feature'}
                              </span>
                              {hasVideo && (
                                <button
                                  type="button"
                                  onClick={() => setPreviewVideo({ title: feat.title, url: feat.video_url || feat.videoUrl })}
                                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 cursor-pointer"
                                >
                                  <FiPlay className="text-[9px]" />
                                  <span>Video</span>
                                </button>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleToggle('feature', feat.id, feat.status)}
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                feat.status === 'active'
                                  ? 'bg-emerald-50 text-[#059669] border border-emerald-200'
                                  : 'bg-slate-100 text-slate-500 border border-slate-200'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${feat.status === 'active' ? 'bg-[#059669]' : 'bg-slate-400'}`} />
                              <span>{feat.status === 'active' ? 'Active' : 'Inactive'}</span>
                            </button>
                          </div>

                          {/* Order & Action Buttons */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] font-mono font-bold text-slate-400 mr-1">#{feat.display_order || idx + 1}</span>
                              <button
                                type="button"
                                disabled={isFirst}
                                onClick={() => handleMoveOrder('feature', filteredFeatures, idx, 'up')}
                                className={`p-1 rounded bg-slate-100 text-xs ${isFirst ? 'opacity-30 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-200 cursor-pointer'}`}
                              >
                                <FiArrowUp />
                              </button>
                              <button
                                type="button"
                                disabled={isLast}
                                onClick={() => handleMoveOrder('feature', filteredFeatures, idx, 'down')}
                                className={`p-1 rounded bg-slate-100 text-xs ${isLast ? 'opacity-30 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-200 cursor-pointer'}`}
                              >
                                <FiArrowDown />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenEdit('feature', feat)}
                                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                              >
                                <FiEdit2 className="text-xs" />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteDialog({ type: 'feature', item: feat })}
                                className="px-3 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                              >
                                <FiTrash2 className="text-xs" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* DESKTOP TABLE VIEW (>= md screens) */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-extrabold uppercase tracking-wider text-[10px]">
                          <th className="py-3 px-4 text-center w-16">Order</th>
                          <th className="py-3 px-4 w-12">Icon</th>
                          <th className="py-3 px-4">Title & Details</th>
                          <th className="py-3 px-4">Section</th>
                          <th className="py-3 px-4">Badge</th>
                          <th className="py-3 px-4">Video</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {filteredFeatures.map((feat, idx) => {
                          const iconObj = AVAILABLE_ICONS.find((i) => i.key === (feat.icon_type || feat.iconType));
                          const IconComp = iconObj ? iconObj.icon : FiCheckSquare;
                          const isFirst = idx === 0;
                          const isLast = idx === filteredFeatures.length - 1;
                          const hasVideo = Boolean(feat.video_url || feat.videoUrl);

                          return (
                            <tr key={feat.id} className="hover:bg-slate-50/80 transition-colors">
                              {/* Order */}
                              <td className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <span className="font-mono font-bold text-slate-500 text-xs w-4">
                                    {feat.display_order || idx + 1}
                                  </span>
                                  <div className="flex flex-col">
                                    <button
                                      type="button"
                                      disabled={isFirst}
                                      onClick={() => handleMoveOrder('feature', filteredFeatures, idx, 'up')}
                                      className={`p-0.5 rounded text-[10px] ${
                                        isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200 cursor-pointer'
                                      }`}
                                    >
                                      <FiArrowUp />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={isLast}
                                      onClick={() => handleMoveOrder('feature', filteredFeatures, idx, 'down')}
                                      className={`p-0.5 rounded text-[10px] ${
                                        isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200 cursor-pointer'
                                      }`}
                                    >
                                      <FiArrowDown />
                                    </button>
                                  </div>
                                </div>
                              </td>

                              {/* Icon */}
                              <td className="py-3 px-4">
                                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center text-xs">
                                  <IconComp />
                                </div>
                              </td>

                              {/* Details */}
                              <td className="py-3 px-4">
                                <div>
                                  <div className="font-black text-[#0F172A] text-xs sm:text-sm">{feat.title}</div>
                                  {feat.subtitle && (
                                    <div className="text-[11px] text-[#475569] font-medium mt-0.5">{feat.subtitle}</div>
                                  )}
                                </div>
                              </td>

                              {/* Section */}
                              <td className="py-3 px-4">
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 whitespace-nowrap">
                                  {feat.section ? feat.section.replace('_', ' ') : 'Feature'}
                                </span>
                              </td>

                              {/* Badge */}
                              <td className="py-3 px-4">
                                {feat.badge ? (
                                  <span className="inline-block text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                                    {feat.badge}
                                  </span>
                                ) : (
                                  <span className="text-slate-300">—</span>
                                )}
                              </td>

                              {/* Video */}
                              <td className="py-3 px-4">
                                {hasVideo ? (
                                  <button
                                    type="button"
                                    onClick={() => setPreviewVideo({ title: feat.title, url: feat.video_url || feat.videoUrl })}
                                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#059669] bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 cursor-pointer"
                                  >
                                    <FiPlay className="text-[10px]" />
                                    <span>Watch</span>
                                  </button>
                                ) : (
                                  <span className="text-slate-300 text-xs">No Video</span>
                                )}
                              </td>

                              {/* Status Toggle */}
                              <td className="py-3 px-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleToggle('feature', feat.id, feat.status)}
                                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                    feat.status === 'active'
                                      ? 'bg-emerald-50 text-[#059669] border border-emerald-200 hover:bg-emerald-100'
                                      : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${feat.status === 'active' ? 'bg-[#059669]' : 'bg-slate-400'}`} />
                                  <span>{feat.status === 'active' ? 'Active' : 'Inactive'}</span>
                                </button>
                              </td>

                              {/* Actions */}
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEdit('feature', feat)}
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                                    title="Edit Feature"
                                  >
                                    <FiEdit2 className="text-xs" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setDeleteDialog({ type: 'feature', item: feat })}
                                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                                    title="Delete Feature"
                                  >
                                    <FiTrash2 className="text-xs" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: REPORT CARD MANAGEMENT                                             */}
          {/* ========================================================================= */}
          {activeTab === 'report_card' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-[#0F172A]">Report Card & Evaluator</h2>
                    <p className="text-xs text-[#475569]">
                      HDFC ERGO Performance metrics (CSR, ICR, Complaints per 10,000 claims).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenAdd('report_card')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer self-start sm:self-center"
                  >
                    <FiPlus />
                    <span>+ ADD REPORT CARD ITEM</span>
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Search report card by metric title or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#059669] font-medium"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-slate-700 w-full sm:w-36"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="block md:hidden p-3 space-y-3">
                {filteredReportCards.map((rc, idx) => (
                  <div key={rc.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {rc.category || 'Claims'}
                        </span>
                        <h4 className="font-black text-[#0F172A] text-xs mt-1.5">{rc.title}</h4>
                      </div>
                      <span className="font-extrabold text-amber-600 font-mono text-base">
                        {rc.score || rc.summaryValue || '—'}
                      </span>
                    </div>

                    <p className="text-xs text-[#475569]">{rc.description || rc.explanation}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleToggle('report_card', rc.id, rc.status)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                          rc.status === 'active'
                            ? 'bg-emerald-50 text-[#059669] border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        <span>{rc.status === 'active' ? 'Active' : 'Inactive'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit('report_card', rc)}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <FiEdit2 className="text-xs" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteDialog({ type: 'report_card', item: rc })}
                          className="px-3 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <FiTrash2 className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4 text-center w-16">Order</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Metric Title</th>
                      <th className="py-3 px-4">Score / Value</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredReportCards.map((rc, idx) => (
                      <tr key={rc.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 text-center font-mono font-bold text-slate-500">
                          {rc.display_order || idx + 1}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {rc.category || 'Claims'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-black text-[#0F172A]">{rc.title}</td>
                        <td className="py-3 px-4 font-extrabold text-amber-600 font-mono text-sm">
                          {rc.score || rc.summaryValue || '—'}
                        </td>
                        <td className="py-3 px-4 text-[#475569] max-w-xs truncate">
                          {rc.description || rc.explanation}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggle('report_card', rc.id, rc.status)}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                              rc.status === 'active'
                                ? 'bg-emerald-50 text-[#059669] border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}
                          >
                            <span>{rc.status === 'active' ? 'Active' : 'Inactive'}</span>
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit('report_card', rc)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                              title="Edit"
                            >
                              <FiEdit2 className="text-xs" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteDialog({ type: 'report_card', item: rc })}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                              title="Delete"
                            >
                              <FiTrash2 className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: COMPANY STRENGTH MANAGEMENT                                        */}
          {/* ========================================================================= */}
          {activeTab === 'company_strength' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-[#0F172A]">Company Strength Metrics</h2>
                    <p className="text-xs text-[#475569]">
                      Financial strength and reliability indicators (Ownership, Credit Rating, Solvency, Assets).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenAdd('company_strength')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer self-start sm:self-center"
                  >
                    <FiPlus />
                    <span>+ ADD STRENGTH METRIC</span>
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Search company strength..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#059669] font-medium"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-slate-700 w-full sm:w-36"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="block md:hidden p-3 space-y-3">
                {filteredCompanyStrengths.map((cs, idx) => (
                  <div key={cs.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-black text-[#0F172A] text-xs">{cs.title}</h4>
                        {cs.label && <p className="text-[11px] text-slate-500 font-medium">{cs.label}</p>}
                      </div>
                      <span className="font-extrabold text-emerald-700 font-mono text-base">
                        {cs.value || cs.summaryValue || '—'}
                      </span>
                    </div>

                    <p className="text-xs text-[#475569]">{cs.description || cs.explanation}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleToggle('company_strength', cs.id, cs.status)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                          cs.status === 'active'
                            ? 'bg-emerald-50 text-[#059669] border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        <span>{cs.status === 'active' ? 'Active' : 'Inactive'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit('company_strength', cs)}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <FiEdit2 className="text-xs" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteDialog({ type: 'company_strength', item: cs })}
                          className="px-3 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <FiTrash2 className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4 text-center w-16">Order</th>
                      <th className="py-3 px-4">Metric Title</th>
                      <th className="py-3 px-4">Value / Rating</th>
                      <th className="py-3 px-4">Label / Subtitle</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredCompanyStrengths.map((cs, idx) => (
                      <tr key={cs.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 text-center font-mono font-bold text-slate-500">
                          {cs.display_order || idx + 1}
                        </td>
                        <td className="py-3 px-4 font-black text-[#0F172A]">{cs.title}</td>
                        <td className="py-3 px-4 font-extrabold text-emerald-700 font-mono text-sm">
                          {cs.value || cs.summaryValue || '—'}
                        </td>
                        <td className="py-3 px-4 text-slate-500 text-[11px] font-medium">{cs.label || '—'}</td>
                        <td className="py-3 px-4 text-[#475569] max-w-xs truncate">{cs.description || cs.explanation}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggle('company_strength', cs.id, cs.status)}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                              cs.status === 'active'
                                ? 'bg-emerald-50 text-[#059669] border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}
                          >
                            <span>{cs.status === 'active' ? 'Active' : 'Inactive'}</span>
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit('company_strength', cs)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                              title="Edit"
                            >
                              <FiEdit2 className="text-xs" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteDialog({ type: 'company_strength', item: cs })}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                              title="Delete"
                            >
                              <FiTrash2 className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: LIMITATIONS & WAITING PERIODS                                      */}
          {/* ========================================================================= */}
          {activeTab === 'limitations' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-[#0F172A]">Limitations & Waiting Periods</h2>
                    <p className="text-xs text-[#475569]">
                      Policy waiting periods (30 Days, 24 Months specific diseases, permanent exclusions).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenAdd('limitation')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer self-start sm:self-center"
                  >
                    <FiPlus />
                    <span>+ ADD LIMITATION</span>
                  </button>
                </div>

                {/* Search */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Search limitations by title or terms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#059669] font-medium"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-slate-700 w-full sm:w-36"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="block md:hidden p-3 space-y-3">
                {filteredLimitations.map((lim, idx) => (
                  <div key={lim.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-black text-[#0F172A] text-xs">{lim.title}</h4>
                        {lim.policy_ref && <p className="text-[11px] text-slate-400 font-mono mt-0.5">{lim.policy_ref}</p>}
                      </div>
                      {lim.duration_tag && (
                        <span className="text-[10px] font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 shrink-0">
                          {lim.duration_tag}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#475569]">{lim.description || lim.summary}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleToggle('limitation', lim.id, lim.status)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                          lim.status === 'active'
                            ? 'bg-emerald-50 text-[#059669] border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        <span>{lim.status === 'active' ? 'Active' : 'Inactive'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit('limitation', lim)}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <FiEdit2 className="text-xs" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteDialog({ type: 'limitation', item: lim })}
                          className="px-3 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <FiTrash2 className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4 text-center w-16">Order</th>
                      <th className="py-3 px-4">Limitation Title</th>
                      <th className="py-3 px-4">Duration Tag</th>
                      <th className="py-3 px-4">Summary</th>
                      <th className="py-3 px-4">Policy Reference</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredLimitations.map((lim, idx) => (
                      <tr key={lim.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 text-center font-mono font-bold text-slate-500">
                          {lim.display_order || idx + 1}
                        </td>
                        <td className="py-3 px-4 font-black text-[#0F172A]">{lim.title}</td>
                        <td className="py-3 px-4">
                          <span className="text-[10px] font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            {lim.duration_tag || '—'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#475569] max-w-xs truncate">{lim.description || lim.summary}</td>
                        <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{lim.policy_ref || '—'}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggle('limitation', lim.id, lim.status)}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                              lim.status === 'active'
                                ? 'bg-emerald-50 text-[#059669] border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}
                          >
                            <span>{lim.status === 'active' ? 'Active' : 'Inactive'}</span>
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit('limitation', lim)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                              title="Edit"
                            >
                              <FiEdit2 className="text-xs" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteDialog({ type: 'limitation', item: lim })}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                              title="Delete"
                            >
                              <FiTrash2 className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: MUST KNOW DETAILS                                                  */}
          {/* ========================================================================= */}
          {activeTab === 'must_know' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-[#0F172A]">Must-Know Details</h2>
                    <p className="text-xs text-[#475569]">
                      Critical advice & gotchas (Discounts, Room Categories, Health checkup rules, Cataract limits).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenAdd('must_know')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer self-start sm:self-center"
                  >
                    <FiPlus />
                    <span>+ ADD MUST KNOW ITEM</span>
                  </button>
                </div>

                {/* Search */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Search must-know rules..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#059669] font-medium"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-slate-700 w-full sm:w-36"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="block md:hidden p-3 space-y-3">
                {filteredMustKnow.map((mk, idx) => (
                  <div key={mk.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl shrink-0">{mk.icon || 'ℹ️'}</span>
                      <div>
                        <h4 className="font-black text-[#0F172A] text-xs">{mk.title}</h4>
                        <p className="text-xs text-[#475569] mt-1">{mk.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleToggle('must_know', mk.id, mk.status)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                          mk.status === 'active'
                            ? 'bg-emerald-50 text-[#059669] border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        <span>{mk.status === 'active' ? 'Active' : 'Inactive'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit('must_know', mk)}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <FiEdit2 className="text-xs" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteDialog({ type: 'must_know', item: mk })}
                          className="px-3 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <FiTrash2 className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4 text-center w-16">Order</th>
                      <th className="py-3 px-4 w-12">Icon</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Summary Description</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredMustKnow.map((mk, idx) => (
                      <tr key={mk.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 text-center font-mono font-bold text-slate-500">
                          {mk.display_order || idx + 1}
                        </td>
                        <td className="py-3 px-4 text-base">{mk.icon || 'ℹ️'}</td>
                        <td className="py-3 px-4 font-black text-[#0F172A]">{mk.title}</td>
                        <td className="py-3 px-4 text-[#475569] max-w-sm truncate">{mk.description}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggle('must_know', mk.id, mk.status)}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                              mk.status === 'active'
                                ? 'bg-emerald-50 text-[#059669] border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}
                          >
                            <span>{mk.status === 'active' ? 'Active' : 'Inactive'}</span>
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit('must_know', mk)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                              title="Edit"
                            >
                              <FiEdit2 className="text-xs" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteDialog({ type: 'must_know', item: mk })}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                              title="Delete"
                            >
                              <FiTrash2 className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: VIDEOS DEMO MANAGEMENT                                             */}
          {/* ========================================================================= */}
          {activeTab === 'videos' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-6 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base sm:text-lg font-black text-[#0F172A]">Video Demonstrations</h2>
                <p className="text-xs text-[#475569]">
                  Preview local video assets attached to Optima Secure+ features and metrics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Video 1: 2X Coverage */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-[#059669] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Asset 1
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">2X coverage.mp4</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#0F172A]">2X Secure Benefit Multiplier</h4>
                  <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
                    <video src={secureBenefitVideo} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPreviewVideo({ title: '2X Secure Benefit Multiplier', url: 'asset:2x_coverage' })}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-2xl group-hover:bg-black/60 transition-colors cursor-pointer"
                    >
                      <FiPlay />
                    </button>
                  </div>
                </div>

                {/* Video 2: Unlimited Restoration */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-[#059669] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Asset 2
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">unlimited.mp4</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#0F172A]">Unlimited Automatic Restoration</h4>
                  <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
                    <video src={unlimitedVideo} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPreviewVideo({ title: 'Unlimited Automatic Restoration', url: 'asset:unlimited' })}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-2xl group-hover:bg-black/60 transition-colors cursor-pointer"
                    >
                      <FiPlay />
                    </button>
                  </div>
                </div>

                {/* Video 3: Preventive Health Checkup */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-[#059669] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Asset 3
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Preventive.mp4</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#0F172A]">Preventive Health Check-up</h4>
                  <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
                    <video src={preventiveVideo} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPreviewVideo({ title: 'Preventive Health Check-up', url: 'asset:preventive' })}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-2xl group-hover:bg-black/60 transition-colors cursor-pointer"
                    >
                      <FiPlay />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 9: SETTINGS                                                           */}
          {/* ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-6 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base sm:text-lg font-black text-[#0F172A]">CMS Portal Settings</h2>
                <p className="text-xs text-[#475569]">System session status and admin configuration.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-[#0F172A] block">Admin Session</span>
                    <span className="text-slate-500 font-mono text-[11px]">Logged in as @{adminUser.username}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-4 py-2 bg-rose-50 text-rose-700 font-bold rounded-xl border border-rose-200 hover:bg-rose-100 cursor-pointer self-start sm:self-auto"
                  >
                    Terminate Session & Logout
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD / EDIT FEATURE                                               */}
      {/* ========================================================================= */}
      {activeModal === 'feature' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 sm:p-5 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#059669] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {editingItem ? 'Edit Mode' : 'New Feature'}
                </span>
                <h3 className="text-sm sm:text-base font-black text-[#0F172A] mt-1 truncate max-w-[280px] sm:max-w-none">
                  {editingItem ? `Edit: ${editingItem.title}` : 'Add New Optima Secure+ Feature'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Section *</label>
                  <select
                    value={featureForm.section}
                    onChange={(e) => setFeatureForm({ ...featureForm, section: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A]"
                  >
                    {FEATURE_SECTIONS.map((s) => (
                      <option key={s.key} value={s.key}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Status</label>
                  <select
                    value={featureForm.status}
                    onChange={(e) => setFeatureForm({ ...featureForm, status: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A]"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1">Feature Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 2X Coverage From Day 1"
                  value={featureForm.title}
                  onChange={(e) => setFeatureForm({ ...featureForm, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Subtitle / Summary</label>
                  <input
                    type="text"
                    placeholder="Short summary..."
                    value={featureForm.subtitle}
                    onChange={(e) => setFeatureForm({ ...featureForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Badge Text</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% CASHLESS"
                    value={featureForm.badge}
                    onChange={(e) => setFeatureForm({ ...featureForm, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A]"
                  />
                </div>
              </div>

              {/* Icon Picker */}
              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1.5">Select Icon</label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-28 overflow-y-auto p-2 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  {AVAILABLE_ICONS.map((item) => {
                    const Icon = item.icon;
                    const isSelected = featureForm.icon_type === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setFeatureForm({ ...featureForm, icon_type: item.key })}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#059669] text-white border-emerald-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Icon className="text-sm mb-0.5" />
                        <span className="text-[9px] font-bold truncate w-full">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Video Picker */}
              <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2.5">
                <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                  <FiVideo className="text-[#059669]" />
                  <span>Video Demo Configuration</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Preset Demo Video</label>
                    <select
                      value={featureForm.video_url}
                      onChange={(e) => setFeatureForm({ ...featureForm, video_url: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-[#0F172A]"
                    >
                      {PRESET_VIDEOS.map((pv, idx) => (
                        <option key={idx} value={pv.value}>{pv.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Upload MP4 File</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, setFeatureForm)}
                      disabled={uploadingVideo}
                      className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#059669] file:text-white cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={savingItem}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {savingItem ? 'SAVING...' : 'SAVE FEATURE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD / EDIT REPORT CARD                                           */}
      {/* ========================================================================= */}
      {activeModal === 'report_card' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 sm:p-5 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-sm sm:text-base font-black text-[#0F172A]">
                {editingItem ? `Edit: ${editingItem.title}` : 'Add Report Card Item'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Claims, Service"
                    value={reportCardForm.category}
                    onChange={(e) => setReportCardForm({ ...reportCardForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Status</label>
                  <select
                    value={reportCardForm.status}
                    onChange={(e) => setReportCardForm({ ...reportCardForm, status: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. CSR, ICR"
                    value={reportCardForm.title}
                    onChange={(e) => setReportCardForm({ ...reportCardForm, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Score / Percentage</label>
                  <input
                    type="text"
                    placeholder="e.g. 97.8%"
                    value={reportCardForm.score}
                    onChange={(e) => setReportCardForm({ ...reportCardForm, score: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1">Detailed Explanation</label>
                <textarea
                  rows={2}
                  placeholder="Metric meaning and calculation..."
                  value={reportCardForm.description}
                  onChange={(e) => setReportCardForm({ ...reportCardForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={savingItem}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  {savingItem ? 'SAVING...' : 'SAVE METRIC'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD / EDIT COMPANY STRENGTH                                      */}
      {/* ========================================================================= */}
      {activeModal === 'company_strength' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 sm:p-5 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-sm sm:text-base font-black text-[#0F172A]">
                {editingItem ? `Edit: ${editingItem.title}` : 'Add Company Strength Metric'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1">Metric Title *</label>
                <input
                  type="text"
                  placeholder="e.g. CREDIT RATING, FINANCIAL BASE"
                  value={companyStrengthForm.title}
                  onChange={(e) => setCompanyStrengthForm({ ...companyStrengthForm, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Primary Value / Score</label>
                  <input
                    type="text"
                    placeholder="e.g. AAA, 2.00×"
                    value={companyStrengthForm.value}
                    onChange={(e) => setCompanyStrengthForm({ ...companyStrengthForm, value: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Subtitle / Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Solvency as of March 2025"
                    value={companyStrengthForm.label}
                    onChange={(e) => setCompanyStrengthForm({ ...companyStrengthForm, label: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="How this proves insurer reliability..."
                  value={companyStrengthForm.description}
                  onChange={(e) => setCompanyStrengthForm({ ...companyStrengthForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={savingItem}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  {savingItem ? 'SAVING...' : 'SAVE STRENGTH'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: ADD / EDIT LIMITATION                                            */}
      {/* ========================================================================= */}
      {activeModal === 'limitation' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 sm:p-5 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-sm sm:text-base font-black text-[#0F172A]">
                {editingItem ? `Edit: ${editingItem.title}` : 'Add Limitation / Waiting Period'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1">Limitation Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Initial 30 Days Waiting Period"
                  value={limitationForm.title}
                  onChange={(e) => setLimitationForm({ ...limitationForm, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Duration Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. 30 Days, 24 Months"
                    value={limitationForm.duration_tag}
                    onChange={(e) => setLimitationForm({ ...limitationForm, duration_tag: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Policy Ref / Clause</label>
                  <input
                    type="text"
                    placeholder="e.g. Section 4.1"
                    value={limitationForm.policy_ref}
                    onChange={(e) => setLimitationForm({ ...limitationForm, policy_ref: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1">Summary / Terms</label>
                <textarea
                  rows={3}
                  placeholder="Explanation of terms and applicable conditions..."
                  value={limitationForm.description}
                  onChange={(e) => setLimitationForm({ ...limitationForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={savingItem}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  {savingItem ? 'SAVING...' : 'SAVE LIMITATION'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: ADD / EDIT MUST KNOW                                             */}
      {/* ========================================================================= */}
      {activeModal === 'must_know' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 sm:p-5 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-sm sm:text-base font-black text-[#0F172A]">
                {editingItem ? `Edit: ${editingItem.title}` : 'Add Must-Know Item'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-[#475569] mb-1">Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. ROOM CATEGORY LIMIT"
                    value={mustKnowForm.title}
                    onChange={(e) => setMustKnowForm({ ...mustKnowForm, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1">Emoji / Icon</label>
                  <input
                    type="text"
                    placeholder="e.g. ℹ️, 💡, 🛡️"
                    value={mustKnowForm.icon}
                    onChange={(e) => setMustKnowForm({ ...mustKnowForm, icon: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1">Advisory Description</label>
                <textarea
                  rows={3}
                  placeholder="Clear advisory note for customers..."
                  value={mustKnowForm.description}
                  onChange={(e) => setMustKnowForm({ ...mustKnowForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1">Status</label>
                <select
                  value={mustKnowForm.status}
                  onChange={(e) => setMustKnowForm({ ...mustKnowForm, status: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={savingItem}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  {savingItem ? 'SAVING...' : 'SAVE POINT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION MODAL                                                 */}
      {/* ========================================================================= */}
      {deleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-sm p-5 sm:p-6 space-y-4 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-xl mx-auto border border-rose-200">
              <FiTrash2 />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-black text-[#0F172A]">Delete {deleteDialog.type === 'feature' ? 'Feature' : 'Item'}?</h3>
              <p className="text-xs text-[#475569]">
                Are you sure you want to delete <strong className="text-[#0F172A]">"{deleteDialog.item.title}"</strong>?
              </p>
              <p className="text-[11px] text-rose-600 font-semibold">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                disabled={deletingItem}
                onClick={() => setDeleteDialog(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingItem}
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                {deletingItem ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIDEO PREVIEW MODAL                                                       */}
      {/* ========================================================================= */}
      {previewVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setPreviewVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3.5 bg-slate-950 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm truncate mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#059669] shrink-0" />
                <span className="truncate">{previewVideo.title} — Video Preview</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewVideo(null)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center text-sm cursor-pointer shrink-0"
              >
                <FiX />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {(() => {
                const resolved = resolvePreviewUrl(previewVideo.url);
                if (!resolved) return <p className="text-xs text-slate-400">No video found</p>;
                if (resolved.type === 'mp4') {
                  return <video src={resolved.url} controls autoPlay className="w-full h-full object-contain" />;
                }
                return (
                  <iframe
                    src={resolved.url}
                    title={previewVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                );
              })()}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

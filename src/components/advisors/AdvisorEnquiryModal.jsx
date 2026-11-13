import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiMail,
  FiPhone,
  FiUser,
  FiCheckCircle,
  FiArrowUpRight,
  FiMessageSquare
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import AdvisorAvatar from './AdvisorAvatar';

export default function AdvisorEnquiryModal({ advisor, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'Health Insurance Evaluation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !advisor) return null;

  const {
    name,
    specialization,
    phone = '+91 98765 43210',
    whatsapp = '919876543210',
    email = 'whyinsured3@gmail.com',
    companyName
  } = advisor;

  const cleanPhone = (whatsapp || phone).replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${name}, I am contacting you via WHYINSURED regarding health insurance guidance.`
  )}`;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Advisory Consultation Request: ${name} via WHYINSURED`);
    const body = encodeURIComponent(
      `Hello WHYINSURED Advisory Desk,\n\n` +
      `I would like to request an insurance advisory consultation with ${name}.\n\n` +
      `Client Details:\n` +
      `• Full Name: ${formData.name}\n` +
      `• Phone Number: ${formData.phone}\n` +
      `• Email Address: ${formData.email}\n` +
      `• Advisory Topic: ${formData.topic}\n` +
      `• Message / Questions: ${formData.message || 'N/A'}\n\n` +
      `Thank you!`
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        const destEmail = advisor.consultation?.email || email || 'whyinsured3@gmail.com';
        window.location.href = `mailto:${destEmail}?subject=${subject}&body=${body}`;
      } catch {
        // Safe fallback
      }
    }, 400);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A43]/60 backdrop-blur-xs overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-[0_24px_64px_rgba(16,42,67,0.18)] p-6 sm:p-7 text-left my-8 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#627D98] hover:text-[#102A43] flex items-center justify-center text-sm transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <FiX />
          </button>

          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F0FDF4] text-[#00A86B] flex items-center justify-center text-2xl mx-auto border border-[#00A86B]/20">
                <FiCheckCircle />
              </div>
              <h3 className="text-xl font-bold text-[#102A43] font-display">
                Request Sent Successfully
              </h3>
              <p className="text-xs sm:text-sm text-[#172B3A]/75 leading-relaxed max-w-md mx-auto">
                Thank you, <strong className="text-[#102A43]">{formData.name}</strong>. Your consultation request for{' '}
                <strong className="text-[#102A43]">{name}</strong> has been logged.
              </p>
              
              <div className="p-4 rounded-2xl bg-[#F7FAF9] border border-slate-200 text-xs text-slate-600 space-y-2 text-left">
                <p className="font-semibold text-[#102A43]">Direct Contact Options:</p>
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <a
                    href={`tel:${phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-slate-200 text-[#102A43] font-semibold hover:border-[#00A86B]"
                  >
                    <FiPhone className="text-[#00A86B]" />
                    <span>Call {phone}</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20bd5a]"
                  >
                    <FaWhatsapp />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full mt-2 py-2.5 rounded-xl bg-[#00A86B] hover:bg-[#0FA26E] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              {/* Advisor Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 mb-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-white">
                  <AdvisorAvatar
                    advisor={advisor}
                    aspect="square"
                    className="w-full h-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0FA26E] block">
                    {advisor.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#102A43] font-display truncate">
                    {name}
                  </h3>
                  {companyName && (
                    <p className="text-[11px] text-slate-500 truncate">{companyName}</p>
                  )}
                  <p className="text-[11px] text-[#00A86B] font-medium truncate">
                    {specialization}
                  </p>
                </div>
              </div>

              {/* Instant Contact Action Bar */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#102A43] text-xs font-semibold transition-all"
                  title="Direct Phone Call"
                >
                  <FiPhone className="text-[#00A86B]" />
                  <span>Call: {phone}</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-all shadow-2xs"
                  title="Open WhatsApp Chat"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Consultation Booking Form */}
              <div className="text-xs font-semibold text-[#102A43] mb-2 flex items-center gap-1">
                <FiMessageSquare className="text-[#00A86B]" />
                <span>Or Request an Advisory Callback</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs">
                      <FiUser />
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs font-medium text-[#172B3A] placeholder-slate-400 focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs">
                        <FiPhone />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs font-medium text-[#172B3A] placeholder-slate-400 focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs">
                        <FiMail />
                      </span>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs font-medium text-[#172B3A] placeholder-slate-400 focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Advisory Focus
                  </label>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Health Insurance Evaluation">Health Insurance Evaluation</option>
                    <option value="Family Floater Structuring">Family Floater Structuring</option>
                    <option value="Senior Citizen Coverage">Senior Citizen Coverage & Co-Pays</option>
                    <option value="Critical Illness & Top-up">Critical Illness & Top-Up Planning</option>
                    <option value="Room Rent & Deductions">Room Rent Sub-Limits Audit</option>
                    <option value="Cashless Claims Guidance">Cashless Hospital Admission / Claims</option>
                    <option value="Policy Portability">Portability & Continuity Credits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Your Question or Situation (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe family member ages or specific policy questions..."
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl py-2 px-3 text-xs font-normal text-[#172B3A] placeholder-slate-400 focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#00A86B] hover:bg-[#0FA26E] text-white text-xs font-semibold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Request Callback'}</span>
                    <FiArrowUpRight className="text-xs" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

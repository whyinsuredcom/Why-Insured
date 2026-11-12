import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiMail,
  FiPhone,
  FiUser,
  FiCheckCircle,
  FiArrowUpRight
} from 'react-icons/fi';
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

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Advisory Consultation Request: ${advisor.name} via WHYINSURED`);
    const body = encodeURIComponent(
      `Hello WHYINSURED Advisory Desk,\n\n` +
      `I would like to request an insurance advisory session with ${advisor.name}.\n\n` +
      `My Details:\n` +
      `• Full Name: ${formData.name}\n` +
      `• Phone Number: ${formData.phone}\n` +
      `• Email Address: ${formData.email}\n` +
      `• Topic: ${formData.topic}\n` +
      `• Message: ${formData.message}\n\n` +
      `Thank you!`
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        const destEmail = advisor.consultation?.email || advisor.contact?.email || 'whyinsured3@gmail.com';
        window.location.href = `mailto:${destEmail}?subject=${subject}&body=${body}`;
      } catch {
        // Fallback safe
      }
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A43]/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-white rounded-3xl border border-[#E4E7EB] shadow-[0_24px_64px_rgba(16,42,67,0.18)] p-6 sm:p-8 text-left my-8 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#627D98] hover:text-[#102A43] flex items-center justify-center text-sm transition-colors cursor-pointer z-10"
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
                Consultation Request Prepared
              </h3>
              <p className="text-xs sm:text-sm text-[#172B3A]/75 leading-relaxed max-w-md mx-auto">
                Thank you, <strong className="text-[#102A43]">{formData.name}</strong>. Your consultation request for{' '}
                <strong className="text-[#102A43]">{advisor.name}</strong> has been prepared for the WHYINSURED Advisory Desk.
              </p>
              <div className="p-4 rounded-2xl bg-[#F7FAF9] border border-[#E4E7EB] text-xs text-[#627D98] space-y-1 text-left">
                <p className="font-semibold text-[#102A43]">Next Steps:</p>
                <p>• Our desk coordinates advisory scheduling based on topic availability.</p>
                <p>• Direct desk email: <a href="mailto:whyinsured3@gmail.com" className="text-[#00A86B] font-semibold underline">whyinsured3@gmail.com</a></p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full mt-4 py-3 rounded-xl bg-[#00A86B] hover:bg-[#0FA26E] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 pb-5 border-b border-[#E4E7EB] mb-6">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#E4E7EB]">
                  <AdvisorAvatar
                    name={advisor.name}
                    image={advisor.profileImage}
                    aspect="square"
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0FA26E] block font-display">
                    Advisory Consultation
                  </span>
                  <h3 className="text-lg font-bold text-[#102A43] font-display">
                    Consult with {advisor.name}
                  </h3>
                  <p className="text-xs text-[#627D98]">
                    {advisor.designation}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98] text-sm">
                      <FiUser />
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Amit Patel"
                      className="w-full bg-[#F7FAF9] border border-[#E4E7EB] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm font-medium text-[#172B3A] placeholder-[#627D98] focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98] text-sm">
                        <FiPhone />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#F7FAF9] border border-[#E4E7EB] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm font-medium text-[#172B3A] placeholder-[#627D98] focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98] text-sm">
                        <FiMail />
                      </span>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@domain.com"
                        className="w-full bg-[#F7FAF9] border border-[#E4E7EB] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm font-medium text-[#172B3A] placeholder-[#627D98] focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                    Advisory Focus
                  </label>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full bg-[#F7FAF9] border border-[#E4E7EB] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-medium text-[#172B3A] focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Health Insurance Evaluation">Health Insurance Evaluation</option>
                    <option value="Policy Comparison">Policy Comparison & Feature Audit</option>
                    <option value="Coverage Understanding">Coverage Understanding & Room Rent Caps</option>
                    <option value="Family Floater Advisory">Family Floater Structuring</option>
                    <option value="Claim Advisory">Pre-Admission / Claim Documentation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                    Your Question or Situation (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe family member ages or specific policy clauses you'd like to review..."
                    className="w-full bg-[#F7FAF9] border border-[#E4E7EB] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-normal text-[#172B3A] placeholder-[#627D98] focus:outline-none focus:border-[#00A86B] focus:bg-white transition-all"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-[#E4E7EB] text-xs font-semibold text-[#627D98] hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A86B] hover:bg-[#0FA26E] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Preparing...' : 'Submit Request'}</span>
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

/**
 * WHYINSURED Feature Visibility Configuration
 * 
 * Centralized feature flags to enable/disable UI entry points without
 * deleting underlying components, routes, backend APIs, or source files.
 * 
 * Default state:
 * - AI_CHAT_WIDGET: false (removes "Chat with WHYINSURED" floating button)
 * - POLICY_UPLOAD_WIDGET: false (removes "Upload Your Policy" floating button)
 * - ADVISOR_NAVIGATION: false (removes Advisor link/button from Desktop Header, Mobile Nav, and Footer)
 * 
 * To reactivate any feature in the future, simply switch the respective flag to true.
 */
export const FEATURE_FLAGS = {
  // 1. Floating AI Chat Assistant button ("Chat with WHYINSURED") & floating widget
  AI_CHAT_WIDGET: false,

  // 2. Floating Policy Upload button ("Upload Your Policy")
  POLICY_UPLOAD_WIDGET: false,

  // 3. Advisor navigation entry points (Desktop header, Mobile nav, Footer)
  ADVISOR_NAVIGATION: false,
};

export default FEATURE_FLAGS;

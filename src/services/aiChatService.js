/**
 * aiChatService.js
 * 
 * WHYINSURED Frontend AI Chat Service.
 * Connects directly to the Backend Gemini AI Endpoint (POST /api/ai/chat).
 * Includes automatic logo mapping and client-side fallback for offline resilience.
 */

import hdfcLogo from '../assets/hdfc-ergo-logo.png';
import tataLogo from '../assets/tata-aig.png';
import starLogo from '../assets/star-health.png';
import nivaLogo from '../assets/niva-bupa.png';
import iciciLogo from '../assets/icici-lombard.png';
import careLogo from '../assets/care-health.png';
import adityaBirlaLogo from '../assets/aditya brila.png';
import bajajLogo from '../assets/Bajaj.png';
import sbiLogo from '../assets/SBI.png';
import ackoLogo from '../assets/acko.png';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/+$/, '');

// Logo Dictionary by Company ID
const LOGO_MAP = {
  'hdfc-ergo': hdfcLogo,
  'tata-aig': tataLogo,
  'star-health': starLogo,
  'niva-bupa': nivaLogo,
  'icici-lombard': iciciLogo,
  'care-health': careLogo,
  'aditya-birla': adityaBirlaLogo,
  'bajaj-general': bajajLogo,
  'sbi-general': sbiLogo,
  'acko': ackoLogo
};

/**
 * Send user query & conversation history to backend Gemini AI endpoint
 * 
 * @param {string} query - Current user requirement message
 * @param {Array} conversationHistory - Past conversation messages
 * @returns {Promise<Object>} Formatted AI response with recommendations
 */
export async function sendUserRequirementToAi(query, conversationHistory = [], currentPlan = null) {
  try {
    const formattedHistory = (conversationHistory || []).map(msg => ({
      sender: msg.sender,
      text: msg.text,
      recommendations: msg.recommendations || []
    }));

    if (import.meta.env.DEV) {
      console.log('[AI Chat] API URL:', `${API_BASE_URL}/api/ai/chat`);
    }

    const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: query,
        conversation: formattedHistory,
        currentPlan: currentPlan
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        '[AI Chat] Backend request failed:',
        response.status,
        errorText
      );
      throw new Error(
        `AI backend error ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(
        data.error || 'AI backend returned an unsuccessful response'
      );
    }

    // Map logos and enrich recommendation cards
    const enrichedRecs = (data.recommendations || []).map(rec => ({
      ...rec,
      planId: rec.policyId,
      name: rec.policyName,
      companyName: rec.company,
      logo: LOGO_MAP[rec.companyId] || hdfcLogo,
      highlights: rec.matchedRequirements || []
    }));

    return {
      text: data.reply,
      intent: data.intent,
      requirements: data.requirements,
      recommendations: enrichedRecs,
      suggestions: data.suggestions || [],
      disclaimer: data.disclaimer
    };
  } catch (error) {
    console.error('[AI Chat] Network/API error:', error);
    throw error;
  }
}

/**
 * Client Fallback Matcher (if backend server is not running)
 */
export function clientFallbackMatcher(query, currentPlan = null) {
  const lower = (query || '').toLowerCase().trim();

  // MediCare Select Plan Data (Pre & Post Hospitalization)
  if (lower.includes('medicare') || (currentPlan && String(currentPlan).toLowerCase().includes('medicare'))) {
    if (lower.includes('pre') || lower.includes('post') || lower.includes('hospital')) {
      return {
        text: "**Tata AIG MediCare Select** policy mein Pre & Post Hospitalization expenses ka coverage is tarah hai:\n\n• **Pre-Hospitalisation:** Hospital admission se **90 din (90 days)** pehle tak ke eligible medical expenses covered hain.\n• **Post-Hospitalisation:** Hospital discharge ke **90 din (90 days)** baad tak ke eligible medical expenses covered hain.\n\n📌 **Important Note (Website Policy Terms):**\nCovered when the in-patient hospitalisation claim is admissible and approved under the policy terms.",
        intent: 'WEBSITE_KNOWLEDGE',
        requirements: {},
        recommendations: [],
        disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
      };
    }
    if (lower.includes('room rent') || lower.includes('room') || lower.includes('kamra')) {
      return {
        text: "**Tata AIG MediCare Select** mein Room Category coverage is tarah hai:\n\n• **Standard Variant:** Single Private Room covered with zero capping (no daily rent sub-limit, no proportionate deduction).\n• **Smart Variant:** Twin Sharing room covered across Value Provider Network (VPN) hospitals.\n• **Elite Variant:** Any Room Category covered with zero capping.\n• **ICU Charges:** Zero capping / no limit on ICU charges.",
        intent: 'WEBSITE_KNOWLEDGE',
        requirements: {},
        recommendations: [],
        disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
      };
    }
    if (lower.includes('restoration') || lower.includes('restore') || lower.includes('kitni baar')) {
      return {
        text: "**Tata AIG MediCare Select** mein **Restore Infinity Plus** is tarah kaam karta hai:\n\n• **Kitni baar restore hota hai:** Unlimited restorations during a policy year.\n• **Kitna amount milta hai:** 100% of Base Sum Insured.\n• **Illness Type:** Restores for both related and unrelated illnesses.\n• **Important Rule:** Restore Infinity Plus is available for your subsequent hospitalisation, not the same continuous hospitalisation.",
        intent: 'WEBSITE_KNOWLEDGE',
        requirements: {},
        recommendations: [],
        disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
      };
    }
  }

  // If greeting
  if (/^(hi|hii|hello|hey|namaste)\b/i.test(lower)) {
    return {
      text: "Hi! 👋 Nice to meet you. I'm your WHYINSURED Advisor. What kind of health insurance are you looking for?",
      intent: 'greeting',
      requirements: {},
      recommendations: [],
      disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
    };
  }

  // Other insurance (car, motor, life, travel)
  if (/\b(car|motor|bike|vehicle|auto)\s*(insurance|policy)?\b/i.test(lower)) {
    return {
      text: "Car insurance protects your vehicle against accidents, theft, third-party liabilities, and natural damages.\n\nWhile WHYINSURED specializes in deep analysis of health insurance policies, let me know if you need help securing health coverage for yourself or your family too!",
      intent: 'other_insurance',
      requirements: {},
      recommendations: [],
      disclaimer: 'WHYINSURED focuses on health insurance comparisons and policy wording analysis.'
    };
  }

  // Room rent limit question
  if (/\b(room\s*rent|room\s*limit|room\s*capping|kamre\s*ka\s*rent)\b/i.test(lower)) {
    return {
      text: "**Room rent limit** is the maximum daily amount your insurer will pay for your hospital room (e.g. 1% of Sum Insured or Single Private Room).\n\n⚠️ **Why it matters:** If you pick a room exceeding your limit, the insurer will apply **proportionate deductions** — cutting down not just the room charges, but doctor fees, surgeon fees, and nursing charges proportionately across your entire hospital bill.\n\n💡 **Recommendation:** Always choose plans with **No Room Rent Capping** or **Single Private Room Eligibility**.",
      intent: 'insurance_question',
      requirements: { roomCategory: 'No Capping' },
      recommendations: [],
      disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
    };
  }

  // Restoration benefit question
  if (/\b(restoration|restore|recharge|refill|reset)\b/i.test(lower)) {
    return {
      text: "**Restoration Benefit** automatically refills 100% of your sum insured after you use up your coverage during a claim in the policy year.\n\n💡 **Key Things to Check:**\n- Does it restore for the **same illness** or only different illnesses?\n- Is it **unlimited times** per year?\n- Does it trigger on partial exhaustion or only complete exhaustion?",
      intent: 'insurance_question',
      requirements: { restoreBenefit: true },
      recommendations: [],
      disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
    };
  }

  // Cashless hospitalization question
  if (/\b(cashless|tpa|network\s*hospital)\b/i.test(lower)) {
    return {
      text: "**Cashless Hospitalization** means the insurance company settles your medical bills directly with the network hospital, so you don’t have to pay out-of-pocket and wait for reimbursements.\n\n💡 Just present your health insurance card / e-card at the hospital's TPA desk 48 hours before planned admission or within 24 hours of emergency admission.",
      intent: 'insurance_question',
      requirements: {},
      recommendations: [],
      disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
    };
  }

  // Deductible / Co-pay question
  if (/\b(deductible|copay|co-pay|co\s*payment)\b/i.test(lower)) {
    return {
      text: "**Deductible in Simple Language:**\nA deductible is a fixed amount you agree to pay from your own pocket before your insurance starts paying.\n\n*Example:* If you have a ₹25,000 deductible and your hospital bill is ₹1,00,000, you pay ₹25,000 and the insurer pays the remaining ₹75,000.\n\nPlans with deductibles have significantly lower annual premiums, making them great as super top-up policies!",
      intent: 'insurance_question',
      requirements: {},
      recommendations: [],
      disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
    };
  }

  // Age / Situational Requirement (e.g. 25, 30 years old, parents 55 & 58)
  if (/\b(i\s*am|i'm|age)\s*\d{1,2}\b/i.test(lower) || /\bparents\b/i.test(lower)) {
    const isParents = /\bparents\b/i.test(lower);
    if (isParents) {
      return {
        text: "For parents aged around 55-60, the most critical factors to prioritize are:\n1. **Zero Co-payment & No Room Rent Capping** (to avoid massive hospital deductions)\n2. **Low Pre-existing Disease (PED) Waiting Period** (1-2 years instead of 3-4 years)\n3. **Annual Health Checkups & Consumables Cover**\n\nWould you like me to show you the top recommended health plans for your parents?",
        intent: 'requirement_discovery',
        requirements: { relation: 'parents' },
        recommendations: [],
        disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
      };
    }

    return {
      text: "At your age, getting health insurance now gives you the lowest premiums, zero waiting period hurdles later, and high cumulative bonus accumulation.\n\nAre you looking for an individual plan for yourself, or do you want to include family members?",
      intent: 'requirement_discovery',
      requirements: { relation: 'self' },
      recommendations: [],
      disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
    };
  }

  // Insurer exclusion (e.g. "I don't want Star")
  if (/\b(don'?t\s*want|exclude|avoid)\s*(star|hdfc|care|tata|niva|icici)\b/i.test(lower)) {
    const excluded = lower.includes('star') ? 'Star Health' : 'that insurer';
    return {
      text: `Understood! I have noted your preference and will exclude **${excluded}** from your plan recommendations. Would you like me to show you alternative top-rated plans from HDFC ERGO, Care Health, or Tata AIG?`,
      intent: 'requirement_update',
      requirements: {},
      recommendations: [],
      disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
    };
  }

  // If user explicitly asks for plans
  if (lower.includes('show') || lower.includes('dikha') || lower === 'yes' || lower === 'haan' || lower.includes('recommend') || lower.includes('options') || lower.includes('batao')) {
    const fallbackCatalog = [
      {
        companyId: 'hdfc-ergo',
        planId: 'hdfc-optima-secure-plus',
        name: 'Optima Secure+',
        companyName: 'HDFC ERGO',
        logo: hdfcLogo,
        coverage: '₹10 Lakh – ₹2 Crore',
        badge: 'Comprehensive Health Policy',
        matchScore: 92,
        reason: 'Top comprehensive match with 2X instant coverage on Day 1 and unlimited restoration.',
        highlights: [
          'Unlimited Automatic Restore for same & unrelated illnesses',
          '2X Instant Coverage with Secure Benefit on Day 1',
          'Zero Deductible on hospital consumables (Protect Plus)'
        ],
        link: '/insurance/hdfc-ergo/hdfc-optima-secure-plus'
      },
      {
        companyId: 'care-health',
        planId: 'care-supreme',
        name: 'Care Supreme',
        companyName: 'Care Health',
        logo: careLogo,
        coverage: '₹5 Lakh – ₹1 Crore',
        badge: 'High Bonus Booster',
        matchScore: 88,
        reason: 'Provides 500% cumulative bonus booster and unlimited automatic recharges in policy year.',
        highlights: [
          'Cumulative Bonus booster up to 500% of Sum Insured',
          'Unlimited automatic recharge anytime in policy year',
          'No room rent capping across all sum insured variants'
        ],
        link: '/insurance/care-health/care-supreme'
      },
      {
        companyId: 'tata-aig',
        planId: 'medicare-select',
        name: 'MediCare Select',
        companyName: 'Tata AIG',
        logo: tataLogo,
        coverage: '₹5 Lakh – ₹20 Lakh',
        badge: 'Global Cover & Restoration',
        matchScore: 85,
        reason: 'Reliable cover with cumulative bonus up to 100% and compassionate restoration benefit.',
        highlights: [
          '100% Restore benefit upon exhaustion',
          'Worldwide emergency medical coverage',
          'Consumables benefit add-on available'
        ],
        link: '/insurance/tata-aig/medicare-select'
      }
    ];

    return {
      text: "Perfect! Based on your requirements, here are the plans that best match:",
      intent: 'show_recommendations',
      requirements: {},
      recommendations: fallbackCatalog,
      disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
    };
  }

  // Otherwise, conversational advisor understanding
  return {
    text: "Got it! I understand what you're looking for. Would you like me to show you the plans that best match your requirements?",
    intent: 'conversational_advisor',
    requirements: {},
    recommendations: [],
    disclaimer: 'These recommendations are based on verified policy information available on WHYINSURED. Please review the policy wording before making a decision.'
  };
}


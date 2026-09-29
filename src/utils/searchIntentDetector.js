/**
 * searchIntentDetector.js
 * 
 * Intelligent intent classifier for the WHYINSURED Homepage Search Bar.
 * Separates ENTITY DETECTION (plan, company) from USER INTENT (search vs question/requirement).
 * 
 * Key Principles:
 * 1. Plan / Company name ONLY -> WEBSITE SEARCH (e.g. "medicare", "medicare select", "Tata AIG", "HDFC", "Optima Secure")
 * 2. Benefit / Feature name ONLY -> WEBSITE SEARCH (e.g. "cashless", "room rent", "restoration")
 * 3. Plan / Company + Question / Request -> AI CONVERSATION (e.g. "MediCare Select ka pre post ke bare me bata", "MediCare Select mein room rent kya hai")
 * 4. Plan / Company + Benefit / Feature -> AI CONVERSATION (e.g. "MediCare Select pre post", "MediCare Select room rent", "MediCare Select waiting period")
 * 5. General Requirement / Advice / Personal Need -> AI CONVERSATION (e.g. "mujhe parents ke liye plan chahiye", "I want a plan for my parents")
 */

/**
 * Known insurance companies and common aliases
 */
const KNOWN_COMPANIES = [
  'tata aig',
  'tata',
  'hdfc ergo',
  'hdfc',
  'star health',
  'star',
  'niva bupa',
  'niva',
  'max bupa',
  'care health',
  'care',
  'icici lombard',
  'icici',
  'aditya birla',
  'bajaj allianz',
  'bajaj general',
  'bajaj',
  'sbi general',
  'sbi',
  'acko',
  'magma hdi',
  'magma',
  'reliance general',
  'reliance'
];

/**
 * Known insurance plans and common aliases
 */
const KNOWN_PLANS = [
  'medicare select',
  'medicare',
  'optima secure plus',
  'optima secure',
  'my:health suraksha',
  'my health suraksha',
  'reassure 2.0',
  'reassure',
  'health companion',
  'care supreme',
  'care advantage',
  'care classic',
  'care plus',
  'elevate',
  'health booster',
  'activ fit',
  'activ health',
  'activ one',
  'star comprehensive',
  'young star',
  'star cardiac care',
  'senior citizens red carpet',
  'health shield',
  'health adv edge'
];

/**
 * Specific insurance feature and benefit terms
 */
const KNOWN_FEATURES = [
  // Pre & Post Hospitalization
  'pre post',
  'pre-hospitalisation',
  'pre hospitalisation',
  'pre-hospitalization',
  'pre hospitalization',
  'post-hospitalisation',
  'post hospitalisation',
  'post-hospitalization',
  'post hospitalization',
  // Room category & ICU
  'room rent limit',
  'room rent',
  'room limit',
  'room capping',
  'single private room',
  'twin sharing',
  'icu charges',
  'icu limit',
  'icu capping',
  'icu',
  'proportionate deduction',
  // Restoration
  'restore infinity plus',
  'restore infinity',
  'restore benefit',
  'restoration',
  'restore',
  'automatic restore',
  'recharge',
  'refill',
  // Waiting period & PED
  'waiting period',
  'ped waiting',
  'ped',
  'pre existing disease',
  'pre-existing disease',
  'cooling off',
  // Cashless & network
  'cashless hospitalization',
  'cashless hospital',
  'cashless',
  'network hospital',
  'tpa',
  // Cost sharing
  'no co-payment',
  'no co payment',
  'no co-pay',
  'no co pay',
  'no copay',
  'zero co-pay',
  'zero copay',
  'co-payment',
  'co payment',
  'co-pay',
  'co pay',
  'copay',
  'deductible',
  // Bonus & boosters
  '2x coverage',
  '2x cover',
  '2 x coverage',
  '2 x cover',
  '2x',
  '2 x',
  'double cover',
  'double coverage',
  'cumulative bonus',
  'no claim bonus',
  'ncb',
  'booster',
  'bonus',
  // Other coverage features
  'consumables',
  'maternity',
  'newborn',
  'day care',
  'daycare',
  'ayush',
  'ayurveda',
  'homeopathy',
  'opd cover',
  'opd',
  'critical illness',
  'air ambulance',
  'ambulance',
  'organ donor',
  'domiciliary',
  'annual health checkup',
  'health checkup',
  'zone upgrade',
  'zone'
];

/**
 * Strong conversational, question, and requirement regex (English & Hinglish)
 */
const CONVERSATIONAL_REGEX = new RegExp(
  '\\b(' +
  // English Question words & phrases
  'what\\s+is|what\\s+are|what\\s+does|how\\s+does|how\\s+much|how\\s+to|how\\s+do|how\\s+can|' +
  'tell\\s+me|tell\\s+us|explain|clarify|describe|guide\\s+me|' +
  'does\\s+this\\s+have|does\\s+it\\s+have|is\\s+there|do\\s+they\\s+have|can\\s+i\\s+get|will\\s+it\\s+cover|is\\s+it\\s+covered|' +
  // English Requirement & Advice phrases
  'i\\s+want|i\\s+need|i\\s+am\\s+looking|i\'m\\s+looking|looking\\s+for|we\\s+want|we\\s+need|' +
  'need\\s+a\\s+plan|want\\s+a\\s+plan|need\\s+plan|want\\s+plan|require\\s+a\\s+plan|' +
  'for\\s+my\\s+parents?|for\\s+parents?|for\\s+my\\s+family|for\\s+family|for\\s+myself|for\\s+me|' +
  'for\\s+my\\s+father|for\\s+my\\s+mother|for\\s+my\\s+wife|for\\s+my\\s+husband|for\\s+my\\s+kids?|' +
  'for\\s+my\\s+children|for\\s+my\\s+son|for\\s+my\\s+daughter|for\\s+senior\\s+citizens?|' +
  'aged?\\s*\\d{1,2}|years?\\s*old|\\b\\d{1,2}\\s*(?:lakh|lac|cr|crore)\\s*(?:cover|coverage|ka\\s*plan|policy)?|' +
  'which\\s+plan|which\\s+policy|which\\s+is\\s+better|which\\s+is\\s+best|what\\s+is\\s+the\\s+best|' +
  'best\\s+plan\\s+for|best\\s+health\\s+insurance|suggest\\s+me|recommend\\s+me|help\\s+me\\s+choose|' +
  'suitable\\s+for|difference\\s+between|compare|' +
  // Hindi & Hinglish Question & Request patterns
  'kya\\s+hai|kya\\s+h|kya\\s+hota\\s+hai|kya\\s+benefit\\s+hai|kya\\s+fayda\\s+hai|kya\\s+milega|kya\\s+rule\\s+hai|kya\\s+cover|' +
  'batao|bata|bta|btao|bataye|bataiye|bata\\s+do|bta\\s+do|samjhao|samjha|dikhao|dijiye|' +
  'kitna\\s+hai|kitna\\s+h|kitne\\s+din|kitne\\s+saal|kitna\\s+milta\\s+hai|kitni\\s+baar|kitna\\s+cover|' +
  'kaise\\s+kaam\\s+karta\\s+hai|kaise\\s+work\\s+karta\\s+hai|kaise\\s+milega|kaise\\s+hota\\s+hai|kaise|' +
  'kaisa\\s+hai|kaisa\\s+plan|kaisi\\s+hai|acchi\\s+hai|acha\\s+hai|sahi\\s+hai|sahi\\s+rahega|theek\\s+hai|' +
  'ke\\s+bare\\s+me|ke\\s+bare\\s+mein|ke\\s+baare\\s+me|ke\\s+baare\\s+mein|k\\s+bare\\s+me|k\\s+bare\\s+m|k\\s+baare\\s+me|' +
  'iske\\s+bare\\s+me|iske\\s+baare\\s+me|iske\\s+bare\\s+mein|iske\\s+baare\\s+mein|bare\\s+me|baare\\s+me|' +
  'chahiye|chaiye|chahie|chahta|chahti|mujhe\\s+chahiye|lena\\s+hai|leni\\s+hai|' +
  'mere\\s+liye|apne\\s+liye|humare\\s+liye|hamare\\s+liye|' +
  'parents\\s+ke\\s+liye|family\\s+ke\\s+liye|senior\\s+citizen\\s+ke\\s+liye|' +
  'father\\s+ke\\s+liye|mother\\s+ke\\s+liye|papa\\s+ke\\s+liye|mummy\\s+ke\\s+liye|wife\\s+ke\\s+liye|husband\\s+ke\\s+liye|' +
  'bacho\\s+ke\\s+liye|children\\s+ke\\s+liye|' +
  'mein\\s+kya|me\\s+kya|mein\\s+hai|me\\s+hai|mein\\s+kitna|me\\s+kitna|' +
  'ka\\s+benefit|ki\\s+benefit|ka\\s+fayda|ki\\s+detail|ke\\s+details|' +
  'hoga\\s+ya\\s+nahi|milega\\s+ya\\s+nahi|cover\\s+hota\\s+hai|cover\\s+hai\\s+ya\\s+nahi|hota\\s+hai|hoti\\s+hai' +
  ')\\b',
  'i'
);

/**
 * Normalizes string for phrase matching
 */
function normalize(str) {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if normalized text contains a normalized phrase on word boundaries
 */
function containsPhrase(text, phrase) {
  if (!text || !phrase) return false;
  const tNorm = ` ${normalize(text)} `;
  const pNorm = ` ${normalize(phrase)} `;
  return tNorm.includes(pNorm);
}

/**
 * Detects if query contains any known company or plan entity
 */
export function detectEntity(query) {
  const norm = normalize(query);
  let matchedPlan = null;
  let matchedCompany = null;

  // Check plans (sorted by length descending for specificity)
  const sortedPlans = [...KNOWN_PLANS].sort((a, b) => b.length - a.length);
  for (const p of sortedPlans) {
    if (containsPhrase(norm, p)) {
      matchedPlan = p;
      break;
    }
  }

  // Check companies (sorted by length descending)
  const sortedCompanies = [...KNOWN_COMPANIES].sort((a, b) => b.length - a.length);
  for (const c of sortedCompanies) {
    if (containsPhrase(norm, c)) {
      matchedCompany = c;
      break;
    }
  }

  return {
    hasEntity: Boolean(matchedPlan || matchedCompany),
    plan: matchedPlan,
    company: matchedCompany
  };
}

/**
 * Detects if query contains any specific insurance benefit / feature
 */
export function detectFeature(query) {
  const norm = normalize(query);
  const sortedFeatures = [...KNOWN_FEATURES].sort((a, b) => b.length - a.length);

  for (const f of sortedFeatures) {
    if (containsPhrase(norm, f)) {
      return {
        hasFeature: true,
        feature: f
      };
    }
  }

  return {
    hasFeature: false,
    feature: null
  };
}

/**
 * Detects whether a search query represents:
 * 1. WEBSITE_SEARCH (false) - Pure entity/feature search
 * 2. CONVERSATIONAL_ADVISOR (true) - Conversational inquiry, requirement, or feature inquiry about a plan
 * 
 * @param {string} rawQuery - The raw input string typed by user
 * @param {Object} searchResults - Results returned by searchGlobalInsurance
 * @returns {Object} { isConversational: boolean, reason: string, entity?: Object, feature?: Object }
 */
export function detectQueryIntent(rawQuery, searchResults = null) {
  if (!rawQuery || typeof rawQuery !== 'string') {
    return { isConversational: false, reason: 'empty' };
  }

  const query = rawQuery.trim();
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.length < 2) {
    return { isConversational: false, reason: 'too_short' };
  }

  // 1. Explicit question mark at the end or in query -> Conversational
  if (query.includes('?')) {
    return { isConversational: true, reason: 'explicit_question' };
  }

  // 2. Check for explicit conversational, question, or requirement phrasing
  const hasConversationalPhrasing = CONVERSATIONAL_REGEX.test(lowerQuery);

  // 3. Detect entities (plan / company) and policy features
  const entity = detectEntity(lowerQuery);
  const feature = detectFeature(lowerQuery);

  // CASE A: Conversational phrasing detected anywhere in query
  // Example: "MediCare Select ka pre post ke bare me bata", "MediCare Select mein room rent kya hai", "I want a plan for my parents"
  if (hasConversationalPhrasing) {
    return {
      isConversational: true,
      reason: 'conversational_phrasing',
      entity,
      feature
    };
  }

  // CASE B: BOTH an entity AND a policy feature are mentioned
  // Example: "MediCare Select pre post", "MediCare Select room rent", "Optima Secure waiting period", "HDFC Optima Secure room rent"
  // Even without question words, inquiring about a plan's feature is a conversational question!
  if (entity.hasEntity && feature.hasFeature) {
    return {
      isConversational: true,
      reason: 'entity_feature_inquiry',
      entity,
      feature
    };
  }

  // CASE C: Entity accompanied by inquiring particles/prepositions (e.g. "mein", "ka", "about", "details")
  // Example: "MediCare Select mein", "Optima Secure ka"
  const hasInquiringParticle = /\b(mein|me|ka|ki|ke|about|details|details\s+of)\b/i.test(lowerQuery);
  if (entity.hasEntity && hasInquiringParticle) {
    return {
      isConversational: true,
      reason: 'entity_inquiry_particle',
      entity
    };
  }

  // CASE D: Standalone Entity search (Plan or Company only)
  // Example: "medicare", "medicare select", "tata aig", "hdfc", "optima secure", "star health"
  // If the query is essentially just the entity name (+/- words like 'insurance', 'plan', 'policy')
  if (entity.hasEntity && !feature.hasFeature) {
    const norm = normalize(lowerQuery);
    // Remove known entity tokens and neutral filler words
    let remainder = norm;
    if (entity.plan) remainder = remainder.replace(new RegExp(`\\b${normalize(entity.plan)}\\b`, 'g'), '');
    if (entity.company) remainder = remainder.replace(new RegExp(`\\b${normalize(entity.company)}\\b`, 'g'), '');
    remainder = remainder.replace(/\b(health|insurance|plan|policy|plans|policies|company)\b/g, '').trim();

    // If no substantive remaining words, it is a pure website entity search
    if (remainder.length === 0) {
      return {
        isConversational: false,
        reason: 'standalone_entity_search',
        entity
      };
    }
  }

  // CASE E: Standalone Feature search (e.g. "cashless", "room rent", "restoration", "waiting period")
  // If user typed only the feature without questions or entities
  if (feature.hasFeature && !entity.hasEntity) {
    const norm = normalize(lowerQuery);
    let remainder = norm.replace(new RegExp(`\\b${normalize(feature.feature)}\\b`, 'g'), '');
    remainder = remainder.replace(/\b(health|insurance|benefit|feature|coverage|clause|rule)\b/g, '').trim();

    if (remainder.length === 0) {
      return {
        isConversational: false,
        reason: 'standalone_feature_search',
        feature
      };
    }
  }

  // CASE F: Short query that cleanly matches the website search catalog
  const words = normalize(lowerQuery).split(/\s+/).filter(Boolean);
  const isShortQuery = words.length <= 3;
  const hasCatalogResults = searchResults && searchResults.totalCount > 0;

  if (isShortQuery && hasCatalogResults) {
    return { isConversational: false, reason: 'catalog_match' };
  }

  // CASE G: Multi-word descriptive query (4+ words) that is not a catalog search
  if (words.length >= 4 && (!hasCatalogResults || words.includes('for') || words.includes('with') || words.includes('without'))) {
    return { isConversational: true, reason: 'descriptive_requirement' };
  }

  // Default to standard website search
  return { isConversational: false, reason: 'default_website_search' };
}

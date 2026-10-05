// =============================================================================
// BAJAJ GENERAL INSURANCE — HEALTH GUARD PLAN DATA
// Policy Benefits, Report Card, Company Strength, Limitations & Takeaways
// Sourced from official Bajaj Allianz General Insurance Health Guard policy terms.
// Theme: Primary #004DA8 | Deeper Blue #003781
// =============================================================================

export const BAJAJ_SOURCES = [
  {
    title: "Bajaj Allianz General Insurance – Public Disclosures",
    name: "Bajaj Allianz General Insurance – Public Disclosures",
    url: "https://www.bajajallianz.com/public-disclosure.html",
    type: "website"
  },
  {
    title: "Bajaj Allianz Health Guard Policy Document",
    name: "Bajaj Allianz Health Guard Policy Document",
    url: "https://www.bajajallianz.com/health-insurance-plans/health-guard-policy.html",
    type: "pdf"
  },
  {
    title: "IRDAI – Official Annual Reports",
    name: "IRDAI – Official Annual Reports",
    url: "https://irdai.gov.in/annual-reports",
    type: "website"
  }
];

export const BAJAJ_SHARED_REPORT_CARD = {
  heading: 'REPORT CARD',
  subheading: 'Bajaj General Insurance Performance',
  description: 'Official claim settlement and financial strength metrics.',
  csr: {
    title: 'Claim Settlement Ratio',
    summaryValue: '89.2%',
    subtitle: 'Claim Settlement Ratio',
    explanation: 'Bajaj Allianz General Insurance consistently maintains an average claim settlement ratio of ~89.2% with fast turnaround time.',
    singleYear: '89.2%',
    singleYearLabel: 'Recent Single Year',
    threeYearAvg: '89.2%',
    threeYearAvgLabel: '3 Years Avg Ratio'
  },
  icr: {
    title: 'Incurred Claim Ratio',
    summaryValue: '74.50%',
    subtitle: 'Incurred Claim Ratio',
    explanation: 'For every ₹100 collected in premiums, Bajaj General Insurance spends about ₹74.50 on settling claims, showing healthy claim solvency.',
    range: '74.50%',
    rangeLabel: 'Incurred Claim Ratio'
  },
  complaintVolume: {
    title: 'Complaints/10K',
    summaryValue: '12.1',
    subtitle: 'Complaints/10K',
    explanation: 'Low volume of complaints per 10,000 claims settled across India.',
    value: '12.1',
    label: 'Complaints/10K — 12.1'
  }
};

export const BAJAJ_SHARED_COMPANY_STRENGTH = {
  heading: 'COMPANY STRENGTH',
  subheading: 'How reliable/strong is the insurer?',
  description: 'Financial stability and institutional backing of Bajaj Allianz General Insurance.',
  ownership: {
    title: 'OWNERSHIP / PERCENTAGE',
    summaryValue: '74% / 26%',
    explanation: 'A trusted joint venture between Bajaj Finserv Limited (74%) and Allianz SE (26%), combining Indian market leadership with global insurance expertise.',
    items: [
      { name: 'Bajaj Finserv Limited', value: '74%', label: 'Ownership' },
      { name: 'Allianz SE', value: '26%', label: 'Ownership' }
    ]
  },
  creditRating: {
    title: 'CREDIT RATING',
    summaryValue: 'AAA',
    explanation: 'Consistently rated AAA by leading credit rating agencies, indicating the highest degree of financial safety.',
    items: [
      { agency: 'ICRA', rating: 'AAA / Stable' },
      { agency: 'CARE', rating: 'AAA / Stable' }
    ]
  },
  capitalStrength: {
    title: 'CAPITAL STRENGTH',
    summaryValue: '2.05×',
    explanation: 'Solvency ratio stands strong at 2.05×, well above the IRDAI mandatory requirement of 1.50×.',
    value: '2.05×',
    label: 'Solvency Ratio (as of FY 2024-25)'
  },
  financialBase: {
    title: 'FINANCIAL BASE',
    summaryValue: '₹25,000+ Cr',
    explanation: 'Robust asset base and extensive liquidity reserves for uninterrupted cashless claims settlement.',
    value: '₹25,000+ Cr',
    label: 'Assets Under Management (AUM)'
  },
  reinsuranceStrength: {
    title: 'REINSURANCE STRENGTH',
    summaryValue: '90%+',
    explanation: 'Reinsurance backed by top-rated international reinsurance leaders including Munich Re and Swiss Re.',
    value: '90%+',
    label: 'Global Reinsurance Backing'
  },
  marketPosition: {
    title: 'MARKET POSITION',
    summaryValue: 'Top 3',
    explanation: 'One of the largest private general insurers in India with 10,000+ network hospital partnerships.',
    value: 'Top 3 Private General Insurer',
    label: 'Serving Millions Across India'
  }
};

export const BAJAJ_SHARED_BEST_SUITED_FOR = {
  heading: 'PERFECT FOR',
  subheading: 'Who is this plan perfect for?',
  description: 'Target customer profiles and ideal family scenarios for Bajaj Health Guard.',
  profiles: [
    {
      title: 'Families Seeking Comprehensive Hospitalization Cover',
      icon: '🏥',
      summary: 'Families wanting in-patient care, 60/90 days pre-post hospitalization, and day care procedure protection.',
      badge: 'Family Floater',
      highlights: [
        'Available in Individual and Family Floater options',
        'In-patient room rent, doctor fees, nursing & surgical appliances covered',
        '100% cashless treatment across 10,000+ network hospitals'
      ]
    },
    {
      title: 'Individuals Wanting 100% Sum Insured Reinstatement',
      icon: '🔄',
      summary: 'Policyholders wanting automatic 100% sum insured refill upon exhaustion for subsequent eligible claims in the same year.',
      badge: 'Reinstatement',
      highlights: [
        '100% Sum Insured reinstated on exhaustion',
        'Available for subsequent eligible claims',
        'Ensures continuous healthcare protection'
      ]
    },
    {
      title: 'Maternity & Newborn Security Seekers (Gold & Platinum)',
      icon: '👶',
      summary: 'Young couples looking for maternity benefits, newborn baby cover, and vaccination coverage under Gold & Platinum variants.',
      badge: 'Maternity Cover',
      highlights: [
        'Normal delivery and C-section covered after waiting period',
        'Newborn baby and vaccination expenses covered',
        'Available under Gold and Platinum plan tiers'
      ]
    },
    {
      title: 'Long-Term Policy & Wellness Enthusiasts',
      icon: '🛡️',
      summary: 'Customers looking to save with 2-year/3-year tenure discounts, family discounts, online discounts, and 5% to 10% wellness renewal savings.',
      badge: 'High Savings',
      highlights: [
        '5% to 10% renewal premium discounts on wellness activities',
        'Multi-year policy term discounts (1, 2, and 3 years)',
        'Zone discounts up to 30% and 5% direct/online purchase discount'
      ]
    }
  ]
};

// =============================================================================
// HEALTH GUARD EXACT 4-SECTION POLICY BENEFITS ARCHITECTURE
// 1. MOST IMPORTANT
// 2. valueAdded
// 3. ADDITIONAL
// 4. optional
// =============================================================================
export const BAJAJ_HEALTH_GUARD_FEATURES_SECTIONS = [
  // ---------------------------------------------------------------------------
  // 1. MOST IMPORTANT
  // ---------------------------------------------------------------------------
  {
    id: 'most-important',
    title: 'MOST IMPORTANT',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'in-patient-hospitalization',
        title: 'In-patient Hospitalization',
        subtitle: 'Room Rent, Doctor Fees, Nursing & Surgical Expenses',
        badge: 'HOSPITALIZATION',
        iconType: 'home',
        summary: 'Hospitalization expenses including room rent, doctor fees, nursing, medicines, blood, oxygen and surgical appliances are covered as per policy terms.',
        points: [
          'Hospitalization expenses including room rent, doctor fees, nursing, medicines, blood, oxygen and surgical appliances are covered as per policy terms.',
          'Covers continuous in-patient hospitalization of minimum 24 hours stay.',
          'Available across network hospitals with 100% cashless claims facility.'
        ]
      },
      {
        id: 'pre-post-hospitalization',
        title: 'Pre & Post Hospitalization',
        subtitle: '60 Days Pre & 90 Days Post Hospitalization',
        badge: '60 & 90 DAYS',
        iconType: 'calendar',
        summary: 'Eligible medical expenses are covered for up to 60 days before hospitalization and 90 days after discharge, as per policy terms.',
        points: [
          'Pre-Hospitalization: Covered up to 60 days prior to hospital admission.',
          'Post-Hospitalization: Covered up to 90 days following discharge from hospital.',
          'Includes eligible diagnostic tests, doctor consultations, and prescribed medicines related to the hospitalization.'
        ]
      },
      {
        id: 'day-care-procedures',
        title: 'Day Care Procedures',
        subtitle: 'Procedures Requiring Less Than 24 Hours Stay',
        badge: 'DAY CARE',
        iconType: 'activity',
        summary: 'Medical procedures that require less than 24 hours of hospitalization are covered, subject to policy terms and applicable conditions.',
        points: [
          'Medical procedures that require less than 24 hours of hospitalization are covered, subject to policy terms and applicable conditions.',
          'Covers advanced technological treatments and surgeries performed under day care.',
          'Subject to policy terms and recognized hospital admission criteria.'
        ]
      },
      {
        id: 'sum-insured-reinstatement',
        title: 'Sum Insured Reinstatement Benefit',
        subtitle: '100% Refill of Base Sum Insured on Exhaustion',
        badge: '100% REINSTATEMENT',
        iconType: 'refresh',
        summary: 'If the base Sum Insured gets exhausted during the policy year, 100% of the Sum Insured is reinstated for subsequent eligible claims, as per policy terms.',
        points: [
          'If the base Sum Insured gets exhausted during the policy year, 100% of the Sum Insured is reinstated for subsequent eligible claims, as per policy terms.',
          'Ensures family protection continues uninterrupted for future hospitalizations.',
          'Applicable as per defined reinstatement guidelines in the policy wording.'
        ]
      },
      {
        id: 'road-ambulance',
        title: 'Road Ambulance',
        subtitle: 'Emergency Road Transport to Hospital',
        badge: 'UP TO ₹20,000',
        iconType: 'truck',
        summary: 'Emergency road ambulance expenses are covered up to ₹20,000 per policy year, subject to policy terms.',
        points: [
          'Emergency road ambulance expenses are covered up to ₹20,000 per policy year, subject to policy terms.',
          'Covers emergency transportation of the insured to the nearest hospital for required in-patient care.',
          'Reimbursed as per actual expenses incurred up to the specified limit.'
        ]
      },
      {
        id: 'organ-donor-expenses',
        title: 'Organ Donor Expenses',
        subtitle: 'In-Patient Treatment of Organ Donor Covered',
        badge: 'ORGAN DONOR',
        iconType: 'heart',
        summary: 'Eligible expenses related to the treatment of an organ donor during an organ transplant are covered as per policy terms.',
        points: [
          'Eligible expenses related to the treatment of an organ donor during an organ transplant are covered as per policy terms.',
          'Covers harvesting of the donated organ for the insured recipient.',
          'Subject to valid transplant surgery authorization and policy conditions.'
        ]
      },
      {
        id: 'ayush-treatment',
        title: 'AYUSH Treatment',
        subtitle: 'Ayurveda, Yoga, Unani, Siddha & Homeopathy',
        badge: 'AYUSH COVER',
        iconType: 'shield',
        summary: 'In-patient hospitalization expenses for eligible AYUSH treatments at government or recognized hospitals are covered as per policy terms.',
        points: [
          'In-patient hospitalization expenses for eligible AYUSH treatments at government or recognized hospitals are covered as per policy terms.',
          'Treatment must be undergone in recognized government healthcare institutions or accredited AYUSH centers.',
          'Covered up to the limits specified in the policy schedule.'
        ]
      },
      {
        id: 'plans-available-sum-insured',
        title: 'Plans Available & Sum Insured',
        subtitle: 'Silver, Gold & Platinum Coverage Options',
        badge: '3 PLAN TIERS',
        iconType: 'award',
        summary: 'Health Guard is available in three plans: Silver: ₹1.5 lakh and ₹2 lakh, Gold: ₹3 lakh to ₹50 lakh, Platinum: ₹5 lakh to ₹1 crore.',
        points: [
          'Silver: ₹1.5 lakh and ₹2 lakh',
          'Gold: ₹3 lakh to ₹50 lakh',
          'Platinum: ₹5 lakh to ₹1 crore'
        ]
      },
      {
        id: 'individual-family-floater',
        title: 'Individual / Family Floater',
        subtitle: 'Flexible Coverage for Individuals & Families',
        badge: 'INDIVIDUAL & FLOATER',
        iconType: 'users',
        summary: 'The policy is available in both Individual and Family Floater options.',
        points: [
          'The policy is available in both Individual and Family Floater options.',
          'Individual option provides a dedicated sum insured to each insured person.',
          'Family Floater option allows shared coverage across spouse, dependent children, and parents under a single umbrella sum insured.'
        ]
      },
      {
        id: 'policy-period',
        title: 'Policy Period',
        subtitle: '1 Year, 2 Years & 3 Years Policy Tenure',
        badge: '1 - 3 YEARS',
        iconType: 'clock',
        summary: 'Policy tenure options are 1 year, 2 years and 3 years, subject to applicable terms.',
        points: [
          'Policy tenure options are 1 year, 2 years and 3 years, subject to applicable terms.',
          'Multi-year policies lock in coverage terms and prevent annual premium renewal hassles.',
          'Attractive multi-year long-term discounts available on 2-year and 3-year options.'
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 2. valueAdded
  // ---------------------------------------------------------------------------
  {
    id: 'value-added',
    title: 'valueAdded',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    items: [
      {
        id: 'preventive-health-checkup',
        title: 'Preventive Health Check-up',
        subtitle: 'Routine Medical Check-Up Reimbursement',
        badge: 'HEALTH CHECK-UP',
        iconType: 'heart',
        summary: 'Eligible preventive health check-up expenses are reimbursed as per the applicable policy terms and defined limits.',
        points: [
          'Eligible preventive health check-up expenses are reimbursed as per the applicable policy terms and defined limits.',
          'Available for adult insured members at specified intervals.',
          'Helps identify emerging health risks early for proactive medical care.'
        ]
      },
      {
        id: 'convalescence-benefit',
        title: 'Convalescence Benefit',
        subtitle: 'Lump-Sum Recovery Benefit for 10+ Days Hospital Stay',
        badge: 'CONVALESCENCE',
        iconType: 'smile',
        summary: 'For continuous hospitalization of more than 10 days, a lump-sum convalescence benefit is available. The applicable amount depends on the plan and Sum Insured.',
        points: [
          'For continuous hospitalization of more than 10 days, a lump-sum convalescence benefit is available. The applicable amount depends on the plan and Sum Insured.',
          'Provides additional financial support during prolonged hospital recovery periods.',
          'Paid as a lump sum over and above the regular hospitalization claim.'
        ]
      },
      {
        id: 'daily-cash-child',
        title: 'Daily Cash Benefit for Accompanying Child',
        subtitle: '₹500/day up to 10 Days for Child < 12 Years',
        badge: '₹500 / DAY',
        iconType: 'dollar',
        summary: 'For an insured child below 12 years, a parent/guardian accompanying the child may receive ₹500 per day, up to a maximum of 10 days, subject to policy terms.',
        points: [
          'For an insured child below 12 years, a parent/guardian accompanying the child may receive ₹500 per day, up to a maximum of 10 days, subject to policy terms.',
          'Helps offset incidental expenses incurred by parents staying at the hospital.',
          'Applicable for eligible continuous in-patient hospitalizations.'
        ]
      },
      {
        id: 'wellness-benefits-discounts',
        title: 'Wellness Benefits & Discounts',
        subtitle: '5% to 10% Renewal Premium Savings',
        badge: '5% - 10% DISCOUNT',
        iconType: 'trending',
        summary: 'Eligible health parameters and wellness activities can provide renewal premium discounts of 5% to 10%, with additional benefits subject to applicable conditions.',
        points: [
          'Eligible health parameters and wellness activities can provide renewal premium discounts of 5% to 10%, with additional benefits subject to applicable conditions.',
          'Rewards healthy lifestyle, regular preventive checkups, and wellness engagement.',
          'Applied on renewal premium as per verified wellness milestones.'
        ]
      },
      {
        id: 'family-longterm-discounts',
        title: 'Family & Long-term Discounts',
        subtitle: 'Savings on Family Inclusion & Multi-Year Tenures',
        badge: 'FAMILY & TENURE',
        iconType: 'users',
        summary: 'Applicable discounts may be available for covering eligible family members and for selecting 2-year or 3-year policy tenure.',
        points: [
          'Applicable discounts may be available for covering eligible family members and for selecting 2-year or 3-year policy tenure.',
          'Family discount applies when 2 or more eligible family members are covered under individual policies.',
          'Long-term discount applies for upfront 2-year or 3-year premium payment.'
        ]
      },
      {
        id: 'online-direct-discount',
        title: 'Online/Direct Discount',
        subtitle: '5% Direct Purchase Premium Discount',
        badge: '5% DISCOUNT',
        iconType: 'zap',
        summary: 'A 5% discount may be available when the policy is purchased directly/online, subject to applicable terms.',
        points: [
          'A 5% discount may be available when the policy is purchased directly/online, subject to applicable terms.',
          'Direct channel benefit passed on as upfront premium reduction.',
          'Subject to policy terms and direct application channels.'
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 3. ADDITIONAL
  // ---------------------------------------------------------------------------
  {
    id: 'additional',
    title: 'ADDITIONAL',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    items: [
      {
        id: 'super-cumulative-bonus-platinum',
        title: 'Super Cumulative Bonus — Platinum Plan',
        subtitle: 'Higher Bonus Increment on Claim-Free Years',
        badge: 'PLATINUM PLAN',
        iconType: 'trending',
        summary: 'Under the Platinum Plan, the Sum Insured can increase for claim-free years according to the applicable cumulative bonus structure, up to the specified maximum limit.',
        points: [
          'Under the Platinum Plan, the Sum Insured can increase for claim-free years according to the applicable cumulative bonus structure, up to the specified maximum limit.',
          'Accelerates total coverage accumulation for healthy policy years.',
          'Exclusive feature available under the Platinum Plan variant.'
        ]
      },
      {
        id: 'zone-discounts',
        title: 'Zone Discounts',
        subtitle: 'Zone B: up to 20% | Zone C: up to 30%',
        badge: 'UP TO 30%',
        iconType: 'globe',
        summary: 'Premium discounts may be available for selecting different zones: Zone B: up to 20%, Zone C: up to 30%.',
        points: [
          'Zone B: up to 20% discount',
          'Zone C: up to 30% discount',
          'Allows policyholders living in Tier 2 and Tier 3 cities to pay lower premiums corresponding to local medical costs.'
        ]
      },
      {
        id: 'bariatric-surgery-cover',
        title: 'Bariatric Surgery Cover',
        subtitle: 'Medically Necessary Weight-Loss Surgery Covered',
        badge: 'BARIATRIC SURGERY',
        iconType: 'activity',
        summary: 'Eligible bariatric surgery expenses are covered after the applicable waiting period and subject to defined medical criteria and policy terms.',
        points: [
          'Eligible bariatric surgery expenses are covered after the applicable waiting period and subject to defined medical criteria and policy terms.',
          'Must meet clinical severity and BMI criteria prescribed under IRDAI guidelines.',
          'Subject to attending physician recommendation and pre-authorization.'
        ]
      },
      {
        id: 'maternity-newborn-gold-platinum',
        title: 'Maternity & New Born Baby Cover — Gold & Platinum',
        subtitle: 'Maternity Delivery & Newborn Hospitalization',
        badge: 'GOLD & PLATINUM',
        iconType: 'heart',
        summary: 'Eligible maternity expenses, including normal delivery/C-section and lawful termination, are covered after the applicable waiting period. Newborn-related coverage is also available subject to policy terms.',
        points: [
          'Eligible maternity expenses, including normal delivery/C-section and lawful termination, are covered after the applicable waiting period.',
          'Newborn-related coverage is also available subject to policy terms.',
          'Available under Gold and Platinum plan variants.'
        ]
      },
      {
        id: 'newborn-vaccination-cover',
        title: 'New Born Baby & Vaccination Cover',
        subtitle: 'Newborn Healthcare & Defined Vaccinations Covered',
        badge: 'VACCINATION COVER',
        iconType: 'shield',
        summary: 'Eligible newborn baby expenses and applicable vaccinations are covered for the specified period and limits according to the policy terms.',
        points: [
          'Eligible newborn baby expenses and applicable vaccinations are covered for the specified period and limits according to the policy terms.',
          'Covers defined childhood vaccinations as per the national immunization schedule up to the specified sub-limit.',
          'Provides essential health security for infants from birth.'
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 4. optional
  // (Keep the optional heading visible, but leave its content empty for now)
  // ---------------------------------------------------------------------------
  {
    id: 'optional',
    title: 'optional',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    items: []
  }
];

export const BAJAJ_HEALTH_GUARD_LIMITATIONS = {
  heading: 'LIMITATIONS & WAITING PERIODS',
  subheading: 'Terms, Waiting Periods & Exclusions',
  items: [
    {
      id: 'initial-waiting-period',
      title: 'Initial Waiting Period',
      durationTag: '30 DAYS',
      summary: 'Any illness diagnosed during the first 30 days of the policy is not covered, except accidental injuries which are covered from Day 1.',
      highlight: 'Accidental injuries covered from Day 1.'
    },
    {
      id: 'specific-illness-waiting-period',
      title: 'Specific Illness / Named Ailments Waiting Period',
      durationTag: '24 MONTHS',
      summary: 'Specified medical conditions and surgeries have a 24-month waiting period before becoming eligible for claims.',
      diseaseList: [
        'Cataract & Eye Surgeries',
        'Hernia & Hydrocele',
        'Kidney & Gallbladder Stones',
        'Joint Replacement Surgeries',
        'Benign Prostatic Hypertrophy',
        'Hysterectomy & Fibroids'
      ]
    },
    {
      id: 'pre-existing-diseases-waiting-period',
      title: 'Pre-Existing Diseases (PED) Waiting Period',
      durationTag: '36 MONTHS',
      summary: 'Any pre-existing medical condition declared at the time of policy purchase is covered after 36 months of continuous coverage.',
      highlight: 'Full coverage after 36 consecutive policy months.'
    },
    {
      id: 'permanent-exclusions',
      title: 'Permanent Policy Exclusions',
      durationTag: 'PERMANENT',
      summary: 'Certain non-medical treatments and conditions are permanently excluded from coverage under standard policy terms.',
      exclusionsList: [
        'Cosmetic or plastic surgery unless necessitated by burns or accident',
        'Self-inflicted injuries and attempted suicide',
        'Alcohol, substance abuse, and drug addiction treatments',
        'Breach of law or criminal acts with malicious intent',
        'War, invasion, nuclear radiation, and chemical exposure'
      ]
    }
  ]
};

export const BAJAJ_HEALTH_GUARD_MUST_KNOW = {
  heading: 'MUST KNOW DETAILS',
  subheading: 'Key product takeaways',
  items: [
    {
      id: 'reinstatement-clause',
      icon: '🔄',
      title: '100% Sum Insured Reinstatement',
      summary: 'Provides automatic 100% restoration of base Sum Insured upon exhaustion for subsequent eligible claims in the policy year.'
    },
    {
      id: 'pre-post-hospitalization-window',
      icon: '📅',
      title: '60 Days Pre & 90 Days Post Hospitalization',
      summary: 'Extended pre and post hospital coverage ensures diagnostic and medical follow-up expenses are fully reimbursed.'
    },
    {
      id: 'tier-variants',
      icon: '🏆',
      title: 'Silver, Gold & Platinum Variants',
      summary: 'Flexible plan tiers from ₹1.5 Lakhs up to ₹1 Crore with optional maternity and newborn covers in Gold/Platinum tiers.'
    },
    {
      id: 'wellness-savings',
      icon: '💡',
      title: '5% to 10% Wellness Renewal Discounts',
      summary: 'Track wellness parameters and engage in health milestones to earn substantial discounts on policy renewals.'
    }
  ]
};

// Master Plan Data Configuration
export const BAJAJ_PLANS_DATA = {
  'health-guard': {
    planId: 'health-guard',
    planName: 'Health Guard',
    companyName: 'Bajaj General Insurance',
    fullName: 'Bajaj Allianz Health Guard',
    tagline: 'Comprehensive individual and family floater health cover across Silver, Gold, and Platinum variants with Sum Insured reinstatement.',
    coverage: '₹1.5 Lakh - ₹1 Crore',
    premium: '₹6,500/year',
    benefits: [
      'In-patient Hospitalization & Pre/Post Expenses covered',
      '100% Sum Insured Reinstatement Benefit',
      'Day Care Procedures, Road Ambulance & AYUSH Covered',
      'Silver, Gold & Platinum Plans with Floater Options'
    ],
    details: {
      eligibility: 'Adults 18+ to Lifelong | Children 3 months to 30 years',
      waitingPeriod: '30 Days initial, 24 Months Named Ailments, 36 Months PED',
      roomRent: 'Covered as per chosen plan variant',
      hospitalization: 'Inpatient treatment expenses covered up to Sum Insured',
      prePostHospital: '60 Days Pre & 90 Days Post Hospitalization',
      dayCare: 'All eligible day care procedures covered',
      noClaimBonus: 'Cumulative Bonus up to specified maximum limit',
      exclusions: 'Cosmetic surgery, self-inflicted injury, breach of law'
    },
    featuresSections: BAJAJ_HEALTH_GUARD_FEATURES_SECTIONS,
    reportCard: BAJAJ_SHARED_REPORT_CARD,
    companyStrength: BAJAJ_SHARED_COMPANY_STRENGTH,
    limitationsWaitingPeriods: BAJAJ_HEALTH_GUARD_LIMITATIONS,
    mustKnow: BAJAJ_HEALTH_GUARD_MUST_KNOW,
    bestSuitedFor: BAJAJ_SHARED_BEST_SUITED_FOR,
    sources: BAJAJ_SOURCES,
    uiConfig: {
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  }
};

export const resolveBajajPlanId = (planId) => {
  if (!planId) return null;
  const cleanId = String(planId).toLowerCase().trim();
  if (
    cleanId === 'health-guard' ||
    cleanId === 'healthguard' ||
    cleanId === 'bajaj-health-guard' ||
    cleanId === 'bajaj-healthguard'
  ) {
    return 'health-guard';
  }
  return cleanId;
};

export const getBajajPlanData = (planId) => {
  const canonicalId = resolveBajajPlanId(planId);
  return BAJAJ_PLANS_DATA[canonicalId] || null;
};

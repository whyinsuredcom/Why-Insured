// =============================================================================
// MANIPALCIGNA HEALTH PLANS DATA CONFIGURATION
// Plan 1: Lifetime Health  → lifetime-health
// Plan 2: Sarvah Uttam     → sarvah-uttam
// Plan 3: Sarvah Param     → sarvah-param
//
// Single source of truth for ManipalCigna health plans.
// MANIPAL_CIGNA_BENEFIT_LIBRARY is a master reference only —
// benefits are NOT automatically included in every plan.
// =============================================================================

export const MANIPAL_CIGNA_CANONICAL_PLAN_IDS = [
  'lifetime-health',
  'sarvah-uttam',
  'sarvah-param'
];

// =============================================================================
// MASTER / REFERENCE BENEFIT LIBRARY (for Manipal Cigna plans)
//
// PURPOSE: Reusable reference when creating future ManipalCigna plans.
// DO NOT auto-copy every benefit into every plan.
// Include a benefit in a specific plan only if it is applicable to that plan.
//
// Structure: company → plans → plan details → benefits → categories
// Categories: mostImportant | valueAdded | additional | optional
// =============================================================================
export const MANIPAL_CIGNA_BENEFIT_LIBRARY = {

  // ---------------------------------------------------------------------------
  // 1. MOST IMPORTANT BENEFITS
  // ---------------------------------------------------------------------------
  mostImportant: [
    {
      id: 'lib-tatkal-benefit',
      name: 'Tatkal Benefit',
      description: 'Absolutely zero waiting period — coverage begins immediately from day 1 of policy inception for all illnesses and conditions.',
      limits: 'Zero waiting period',
      waitingPeriod: 'None (Day 1 coverage)',
      isOptional: false,
      applicablePlans: ['sarvah-param']
    },
    {
      id: 'lib-anant-care',
      name: 'Anant Care',
      description: 'Unlimited coverage for major illnesses (Cancer, Heart, Stroke, Major Organ Transplant) and accidents with no cap on claim amounts.',
      limits: 'Unlimited (no claim cap)',
      waitingPeriod: 'As per policy terms',
      isOptional: false,
      applicablePlans: ['sarvah-param', 'sarvah-uttam']
    },
    {
      id: 'lib-gullak-benefit',
      name: 'Gullak Benefit',
      description: 'Base Sum Insured increases by 100% per policy year irrespective of claims, up to a maximum of 1500% of the original Base SI.',
      limits: 'Maximum 1500% of Base SI',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-param', 'sarvah-uttam']
    },
    {
      id: 'lib-unlimited-restoration',
      name: 'Unlimited Restoration',
      description: 'Unlimited restoration of Base Sum Insured for any illness or injury in a policy year. Not applicable to the first claim.',
      limits: '100% of Base SI per restoration; unlimited times',
      waitingPeriod: 'None (not applicable for 1st claim)',
      isOptional: true,
      applicablePlans: ['sarvah-param', 'sarvah-uttam']
    },
    {
      id: 'lib-surplus-benefit',
      name: 'Surplus Benefit',
      description: 'An additional 100% of Base SI is available from day 1 for the first claim of every policy year.',
      limits: '100% of Base SI (day 1, first claim per year)',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-param', 'sarvah-uttam']
    },
    {
      id: 'lib-no-zonal-copay',
      name: 'No Zonal Co-pay',
      description: 'No zonal co-payment applicable for treatment in the city of choice across any zone in India.',
      limits: 'Zero co-pay for any zone',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-param', 'sarvah-uttam']
    },
    {
      id: 'lib-inpatient-hospitalization',
      name: 'In-Patient Hospitalization',
      description: 'Covers all inpatient hospitalization expenses for admissions of 24 hours or more.',
      limits: 'Covered up to Sum Insured',
      waitingPeriod: '30 days initial (waived with Tatkal)',
      isOptional: false,
      applicablePlans: ['lifetime-health', 'sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-day-care-treatment',
      name: 'Day Care Treatment',
      description: 'All day care procedures requiring less than 24 hours of hospitalization are covered.',
      limits: 'Covered up to Sum Insured',
      waitingPeriod: '30 days initial (waived with Tatkal)',
      isOptional: false,
      applicablePlans: ['lifetime-health', 'sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-icu',
      name: 'ICU',
      description: 'Intensive Care Unit charges covered with no sub-limit.',
      limits: 'Covered up to Sum Insured',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-ayush-treatment',
      name: 'AYUSH Treatment',
      description: 'Covers Ayurveda, Yoga & Naturopathy, Unani, Siddha and Homeopathy treatments.',
      limits: 'Covered up to Sum Insured',
      waitingPeriod: '30 days initial',
      isOptional: false,
      applicablePlans: ['lifetime-health', 'sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-modern-advanced-treatments',
      name: 'Listed Modern & Advanced Treatments',
      description: 'Coverage for listed modern and advanced treatment procedures including robotic surgeries.',
      limits: 'Covered up to Sum Insured',
      waitingPeriod: 'As per policy terms',
      isOptional: false,
      applicablePlans: ['lifetime-health', 'sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-domiciliary-hospitalization',
      name: 'Domiciliary Hospitalization',
      description: 'Medical treatment taken at home due to inability to be hospitalized or unavailability of hospital beds.',
      limits: 'Covered up to Sum Insured',
      waitingPeriod: '30 days initial',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-road-ambulance',
      name: 'Road Ambulance',
      description: 'Covers expenses incurred on road ambulance services for emergency hospitalization in India.',
      limits: 'Covered up to Sum Insured',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['lifetime-health', 'sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-room-rent',
      name: 'Room Rent',
      description: 'Single Private A/C Room as default. Optional upgrade to Any Room or downgrade to Twin Sharing A/C Room.',
      limits: 'Single Private A/C Room (default); Any Room / Twin Sharing A/C Room as options',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-pre-hospitalization',
      name: 'Pre-Hospitalization',
      description: 'Covers medical expenses incurred before hospitalization.',
      limits: '90 days',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-post-hospitalization',
      name: 'Post-Hospitalization',
      description: 'Covers medical expenses incurred after discharge from hospital.',
      limits: '180 days',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-donor-expenses',
      name: 'Donor Expenses',
      description: 'Hospitalization expenses for the organ donor including pre/post hospitalization and complications cover.',
      limits: 'Up to Sum Insured; Pre-Hospitalization: 30 days; Post-Hospitalization: 30 days; Complications: up to 25% of Base SI, maximum ₹2 Lakh',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-non-medical-items-dme',
      name: 'Non-Medical Items & Durable Medical Equipment',
      description: 'Coverage for listed non-medical items and prescribed durable medical equipment.',
      limits: 'Non-medical items: up to Sum Insured; Durable Medical Equipment: up to ₹1 Lakh',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    }
  ],

  // ---------------------------------------------------------------------------
  // 2. VALUE ADDED BENEFITS
  // ---------------------------------------------------------------------------
  valueAdded: [
    {
      id: 'lib-wellness-benefit',
      name: 'Wellness Benefit',
      description: 'Earn up to 20% renewal premium discount by achieving a defined number of steps tracked through the wellness program.',
      limits: 'Up to 20% discount on renewal premium',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-no-claim-discount',
      name: 'No Claim Discount',
      description: 'Discount on renewal premium based on claim-free policy years.',
      limits: 'Up to 7.5%',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-unlimited-tele-consultation',
      name: 'Unlimited Tele-Consultation',
      description: 'Unlimited consultations with a General Physician via tele-consultation platform.',
      limits: 'Unlimited',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-network-provider-discount',
      name: 'Network Provider Discount',
      description: 'Discounts offered by network partners on Pharmacy, Diagnostics, and Health Supplements.',
      limits: 'As per network partner terms',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-health-checkup',
      name: 'Health Check-up',
      description: 'Annual cashless health check-up from the first policy year (after free-look period) for insured persons aged 18 and above.',
      limits: 'Annual; Age 18+; from 1st policy year',
      waitingPeriod: 'After free-look period',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-early-renewal-discount',
      name: 'Early Renewal Discount',
      description: 'Additional discount for renewing the policy at least 15 days before policy expiry.',
      limits: '2.5%',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-standing-instruction-discount',
      name: 'Standing Instruction Discount',
      description: 'Discount when renewal premium is received through a standing instruction mandate.',
      limits: '2.5%',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-long-term-policy-discount',
      name: 'Long Term Policy Discount',
      description: 'Discount for choosing a multi-year policy term.',
      limits: '2 Year: 7.5%; 3 Year: 10%',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-family-discount',
      name: 'Family Discount',
      description: 'Discount for individual policies covering 2 or more family members.',
      limits: '10%',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-first-renewal-discount',
      name: '1st Policy Renewal Discount',
      description: 'Special discount on first renewal of the policy.',
      limits: '5%',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    }
  ],

  // ---------------------------------------------------------------------------
  // 3. ADDITIONAL BENEFITS
  // ---------------------------------------------------------------------------
  additional: [
    {
      id: 'lib-maternity-newborn',
      name: 'Maternity & Newborn Hospitalization Expenses',
      description: 'Covers maternity expenses, newborn baby inpatient hospitalization, and first year vaccination expenses.',
      limits: 'Up to 20% of Base SI; Maximum ₹5 Lakh',
      waitingPeriod: '36 months',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-personal-accident-plus',
      name: 'Personal Accident Plus',
      description: 'Covers Accidental Death and Permanent Disablement (Total & Partial) with Common Carrier enhancement.',
      limits: 'SI options ₹10 Lakh to ₹3 Crore',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-common-carrier-benefit',
      name: 'Common Carrier Benefit',
      description: 'Enhanced coverage of 200% of opted Personal Accident SI in case of accidental death or permanent total disability while travelling as a fare-paying passenger on a common carrier.',
      limits: '200% of opted PA SI',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-ttd',
      name: 'Temporary Total Disablement (TTD)',
      description: 'Fixed weekly benefit for temporary total disablement due to an accident.',
      limits: '₹5,000 to ₹1 Lakh per week; Maximum 100 weeks',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-air-ambulance',
      name: 'Air Ambulance',
      description: 'Covers air ambulance charges for emergency medical evacuation.',
      limits: 'Up to Sum Insured; Maximum ₹10 Lakh',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-aggregate-deductible',
      name: 'Aggregate Deductible',
      description: 'Optional aggregate deductible options to reduce premium outgo.',
      limits: 'Options: ₹10K, ₹25K, ₹50K, ₹1L, ₹2L, ₹3L, ₹4L, ₹5L, ₹10L',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-daily-deductible',
      name: 'Daily Deductible',
      description: 'Optional per-day deductible for each day of hospitalization.',
      limits: 'Options: ₹1K, ₹2K, ₹3K, ₹4K, ₹5K per day',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-voluntary-copayment',
      name: 'Voluntary Co-payment',
      description: 'Opt for a voluntary co-payment percentage to reduce premium.',
      limits: 'Options: 10%, 20%, 30%',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-base-si-options',
      name: 'Base Sum Insured Options',
      description: 'Wide range of Base Sum Insured options to choose from.',
      limits: '₹5L, ₹7.5L, ₹10L, ₹15L, ₹20L, ₹25L, ₹50L, ₹100L, ₹200L, ₹300L',
      waitingPeriod: 'None',
      isOptional: false,
      applicablePlans: ['sarvah-param']
    }
  ],

  // ---------------------------------------------------------------------------
  // 4. OPTIONAL BENEFITS
  // ---------------------------------------------------------------------------
  optional: [
    {
      id: 'lib-opt-personal-accident-cover',
      name: 'Personal Accident Cover',
      description: 'Optional cover for Accidental Death & Permanent Disabilities with Common Carrier accident benefit of 200% of opted SI.',
      limits: 'SI options: ₹10 Lakh to ₹3 Crore; Common Carrier: 200% of opted SI',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-opt-maternity-newborn',
      name: 'Maternity & Newborn Hospitalization (Optional)',
      description: 'Optional cover for maternity and newborn hospitalization expenses.',
      limits: 'Up to 20% of Base SI; Maximum ₹5 Lakh',
      waitingPeriod: '36 months',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-opt-air-ambulance',
      name: 'Air Ambulance (Optional)',
      description: 'Optional air ambulance cover for emergency evacuation.',
      limits: 'Up to SI; Maximum ₹10 Lakh',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-opt-ttd',
      name: 'Temporary Total Disablement (TTD) (Optional)',
      description: 'Optional fixed weekly benefit for temporary total disablement.',
      limits: '₹5,000 to ₹1 Lakh per week; Maximum 100 weeks',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-opt-gullak',
      name: 'Gullak (Optional)',
      description: 'Optional feature to enhance Base SI by 100% per policy year irrespective of claims.',
      limits: 'Maximum 1500% of Base SI',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-opt-unlimited-restoration',
      name: 'Unlimited Restoration (Optional)',
      description: 'Optional unlimited restoration of Base SI for any illness or injury. Not applicable to the first claim.',
      limits: '100% of Base SI; unlimited times; not for 1st claim',
      waitingPeriod: 'None (not applicable for 1st claim)',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-opt-aggregate-deductible',
      name: 'Aggregate Deductible (Optional)',
      description: 'Optional aggregate deductible to reduce premium.',
      limits: '₹10K to ₹10L',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-opt-daily-deductible',
      name: 'Daily Deductible (Optional)',
      description: 'Optional per-day-of-hospitalization deductible.',
      limits: '₹1K to ₹5K per day',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-opt-voluntary-copayment',
      name: 'Voluntary Co-payment (Optional)',
      description: 'Opt for a voluntary co-pay to lower the premium.',
      limits: 'Options: 10%, 20%, 30%',
      waitingPeriod: 'None',
      isOptional: true,
      applicablePlans: ['sarvah-uttam', 'sarvah-param']
    },
    {
      id: 'lib-opt-pratiksha',
      name: 'Pratiksha',
      description: 'Optional benefit that defines the Initial Waiting Period as 30 days and the Specific Disease Waiting Period as 24 months. Useful for policyholders who prefer standard waiting periods.',
      limits: 'Initial WP: 30 days; Specific Disease WP: 24 months',
      waitingPeriod: 'N/A (defines waiting periods)',
      isOptional: true,
      applicablePlans: ['sarvah-param']
    }
  ]
};

export const resolveManipalCignaPlanId = (planId) => {
  if (!planId) return null;
  const cleanId = String(planId).toLowerCase().trim();
  if (
    cleanId === 'sarvah-uttam' ||
    cleanId === 'sarvah' ||
    cleanId === 'manipalcigna-sarvah-uttam' ||
    cleanId === 'manipal-sarvah-uttam' ||
    cleanId === 'sarvahuttam' ||
    cleanId === 'sarvah_uttam'
  ) {
    return 'sarvah-uttam';
  }
  if (
    cleanId === 'sarvah-param' ||
    cleanId === 'sarvahparam' ||
    cleanId === 'sarvah_param' ||
    cleanId === 'manipal-sarvah-param' ||
    cleanId === 'manipalcigna-sarvah-param' ||
    cleanId === 'param'
  ) {
    return 'sarvah-param';
  }
  if (
    cleanId === 'lifetime-health' ||
    cleanId === 'lifetime' ||
    cleanId === 'manipal-lifetime-health' ||
    cleanId === 'manipal-lifetime' ||
    cleanId === 'lifetimehealth'
  ) {
    return 'lifetime-health';
  }
  return cleanId;
};

export const DEMO_VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

export const MANIPAL_CIGNA_PLANS_DATA = {
  // ===========================================================================
  // PLAN 1: LIFETIME HEALTH
  // ===========================================================================
  'lifetime-health': {
    planId: 'lifetime-health',
    planName: 'Lifetime Health',
    tagline: 'Comprehensive Lifetime Health Protection with High Sum Insured & Unlimited Restorations',
    coverage: '₹50 Lakh - ₹3 Crore',
    premium: '',
    categoryBadge: 'Health Insurance',
    policySubtitle: 'ManipalCigna Health Insurance Policy',

    // --- NAVIGATION, HEADINGS & BUTTON LABELS ---
    backToPlansLabel: 'Back to ManipalCigna Plans',
    backToPlanLabel: 'Back to Lifetime Health',
    featuresHeadingSuffix: 'POLICY BENEFITS',
    termsFootnote: '*T&C Apply',

    // Action Grid Labels
    reportCardButtonLabel: 'REPORT CARD',
    companyStrengthButtonLabel: 'COMPANY STRENGTH',
    policyBenefitsButtonLabel: 'POLICY BENEFITS',
    limitationsButtonLabel: 'LIMITATIONS & WAITING PERIODS',
    mustKnowButtonLabel: 'MUST KNOW DETAILS',

    // --- PLAN-SPECIFIC UI CONFIG ---
    uiConfig: {
      primaryColor: '#F8971F',      // ManipalCigna Primary Orange
      secondaryColor: '#0982C6',    // ManipalCigna Blue
      accentColor: '#56B948',       // ManipalCigna Green
      demoVideoUrl: DEMO_VIDEO_URL
    },

    // --- SUMMARY BENEFITS & DETAILS ---
    benefits: [
      'Inpatient Hospitalization: Covers medical expenses & room charges up to Suite category for ₹300L',
      'Day Care Treatment: All Day Care Treatments covered up to full Sum Insured',
      'Pre & Post Hospitalization: 60 Days Pre & 180 Days Post covered',
      'Road Ambulance Cover: Covered up to full Sum Insured in India',
      'Donor Expenses: Organ donor hospitalization covered up to full Sum Insured',
      'Domiciliary Expenses: Treatment at home covered up to 10% of Sum Insured',
      'Restoration of Sum Insured: Multiple 100% restorations for unrelated illnesses',
      'Adult Health Check-up: Once per policy year at network providers (Age 18+)',
      'AYUSH Treatment: Alternative treatments covered up to full Sum Insured',
      'Modern and Advanced Treatments: Covered up to full Sum Insured',
      'Robotic and Cyber Knife Surgery: Covered up to full Sum Insured',
      'HIV/AIDS and STD Cover: Covered up to full Sum Insured',
      'Mental Care Cover: Psychiatric & mental health conditions covered up to full Sum Insured',
      'Premium Waiver Benefit: 1-Year renewal premium paid on critical illness, death, or disablement'
    ],
    details: {
      eligibility: 'Adults 18+ to Lifelong | Children 91 days to 25 years',
      waitingPeriod: '30 Days initial, 24 Months specified illnesses, 24/36 Months PED',
      roomRent: 'Any room except suite up to ₹200L; Any room including suite for ₹300L',
      hospitalization: 'Actual medical expenses & room charges covered for admissions >24 hours',
      prePostHospital: '60 Days Pre & 180 Days Post Hospitalization covered',
      dayCare: 'All Day Care procedures covered (<24 hours admission)',
      noClaimBonus: 'Cumulative bonus / restoration benefits as per policy schedule',
      exclusions: 'Cosmetic surgery, adventure sports, breach of law'
    },

    // ===========================================================================
    // 1. REPORT CARD (MANIPALCIGNA PERFORMANCE & CLAIMS METRICS)
    // ===========================================================================
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'ManipalCigna Performance',
      description: 'Official claim settlement and financial strength metrics.',

      csr: {
        title: 'CSR',
        summaryValue: '98.2%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR shows the percentage of eligible claims that ManipalCigna settles during a given period. A higher ratio indicates a reliable claim track record.',
        singleYear: '97.8% → 98.2%',
        singleYearLabel: 'Recent Single Year',
        threeYearAvg: '97.2% → 98.0%',
        threeYearAvgLabel: '3 Year Average',
        videoTitle: 'CSR Metrics',
        videoUrl: DEMO_VIDEO_URL
      },

      icr: {
        title: 'ICR',
        summaryValue: '61%',
        subtitle: 'Incurred Claim Ratio',
        explanation: 'ICR indicates the proportion of premium earned spent on settling claims, showing healthy balance between premium intake and claim payouts.',
        range: '58% → 61%',
        rangeLabel: 'Incurred Claim Ratio',
        videoTitle: 'ICR Metrics',
        videoUrl: DEMO_VIDEO_URL
      },

      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        summaryValue: '13.8',
        explanation: 'Complaint volume indicates the number of customer complaints received per 10,000 claims handled.',
        value: '11.2 → 13.8',
        label: 'Complaints per 10,000 Claims',
        videoTitle: 'Complaint Volume Metrics',
        videoUrl: DEMO_VIDEO_URL
      }
    },

    // ===========================================================================
    // 2. COMPANY STRENGTH (FINANCIAL METRICS & INSURER RELIABILITY)
    // ===========================================================================
    companyStrength: {
      heading: 'COMPANY STRENGTH',
      subheading: 'How reliable/strong is the insurer?',
      description: 'How reliable/strong is the insurer?',

      ownership: {
        title: 'OWNERSHIP / PARTNERSHIP',
        summaryValue: 'Manipal + Cigna',
        explanation: 'A joint venture between Manipal Group (pioneering healthcare delivery) and Cigna Healthcare (global health services leader).',
        items: [
          "Manipal Group: India's premier healthcare and hospital network.",
          'Cigna Corporation: Global Fortune 500 healthcare enterprise with 200+ years heritage.',
          'World-class clinical expertise backed by international insurance standards.'
        ],
        videoTitle: 'Ownership Structure',
        videoUrl: DEMO_VIDEO_URL
      },

      creditRating: {
        title: 'CASHLESS HOSPITAL NETWORK',
        summaryValue: '9,000+ Hospitals',
        explanation: 'Expansive pan-India cashless hospital network providing seamless cashless admissions and round-the-clock claim support.',
        items: [
          'Over 9,000+ networked hospitals across Tier 1, 2, and 3 cities.',
          'Direct cashless tie-ups with leading multi-specialty healthcare institutions.'
        ],
        videoTitle: 'Cashless Network',
        videoUrl: DEMO_VIDEO_URL
      },

      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '1.76',
        label: 'Solvency Ratio (Regulatory Minimum: 1.50)',
        explanation: 'Solvency ratio indicates the insurer holds adequate capital buffer to meet claim contingencies.',
        videoTitle: 'Capital Strength & Solvency',
        videoUrl: DEMO_VIDEO_URL
      },

      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹2,000+ Cr',
        label: 'Gross Written Premium Base',
        explanation: 'Demonstrates robust growth and strong policyholder trust across retail health insurance.',
        videoTitle: 'Financial Base & Scale',
        videoUrl: DEMO_VIDEO_URL
      },

      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: 'Global Tier 1',
        label: 'Top Global Reinsurance Treaties',
        explanation: 'Partnered with renowned global reinsurers ensuring long-term financial security for massive claims.',
        videoTitle: 'Reinsurance Capabilities',
        videoUrl: DEMO_VIDEO_URL
      },

      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: 'Standalone Health Leader',
        label: 'Fast-Growing Health Insurer',
        explanation: "Ranked among India's fastest-growing standalone health insurance providers known for comprehensive lifelong covers.",
        videoTitle: 'Market Position Metrics',
        videoUrl: DEMO_VIDEO_URL
      }
    },

    // ===========================================================================
    // 3. LIMITATIONS & WAITING PERIODS
    // ===========================================================================
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'TERMS & WAITING PERIODS',
      description: 'Standard waiting periods and conditions governing claim eligibility.',

      items: [
        {
          id: 'initial',
          title: 'Initial Waiting Period (30 Days)',
          summary: 'A standard initial waiting period of 30 days from policy inception applies for all medical conditions, except for accidental injuries.',
          highlight: 'Accidental hospitalizations covered from Day 1.',
          durationTag: '30 Days',
          videoTitle: 'Initial Waiting Period',
          videoUrl: DEMO_VIDEO_URL
        },
        {
          id: 'specific',
          title: 'Specific Illness Waiting Period (24 Months)',
          summary: 'A continuous waiting period of 24 months applies for medical or surgical treatment of specified ailments such as cataract, hernia, joint replacements, and benign growths.',
          durationTag: '24 Months',
          videoTitle: 'Specific Illness Waiting Period',
          videoUrl: DEMO_VIDEO_URL
        },
        {
          id: 'ped',
          title: 'Pre-existing Diseases (PED) Waiting Period',
          summary: 'Pre-existing medical conditions disclosed at the time of policy proposal are covered after the designated continuous coverage period as per chosen plan terms.',
          durationTag: '24/36 Months',
          videoTitle: 'PED Waiting Period',
          videoUrl: DEMO_VIDEO_URL
        }
      ]
    },

    // ===========================================================================
    // 4. MUST KNOW DETAILS
    // ===========================================================================
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Key coverage terms and provisions',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',

      items: [
        {
          id: 'inpatient-room',
          icon: '🏥',
          title: 'INPATIENT ROOM CATEGORY',
          label: 'Room Category',
          value: 'Up to Suite Category',
          paragraphs: [
            'Covers medical expenses and room charges for hospitalization lasting more than 24 hours due to illness or injury.',
            'Room category is covered up to any room except suite for Sum Insured up to ₹200 Lacs, and covers any room including suite category for ₹300 Lacs Sum Insured.'
          ]
        },
        {
          id: 'pre-post',
          icon: '📅',
          title: 'PRE & POST HOSPITALIZATION',
          label: 'Pre & Post Coverage',
          value: '60 Days Pre & 180 Days Post',
          paragraphs: [
            'Pre-Hospitalization: Covers medical expenses incurred up to 60 days before the date of hospitalization.',
            'Post-Hospitalization: Covers medical expenses incurred up to 180 days after discharge from the hospital.'
          ]
        },
        {
          id: 'restoration',
          icon: '🔄',
          title: 'RESTORATION OF SUM INSURED',
          label: 'Sum Insured Restore',
          value: 'Multiple 100% Restorations',
          paragraphs: [
            'Multiple restorations available in a policy year for unrelated illnesses, restoring up to 100% of the Sum Insured.',
            'Ensures uninterrupted financial protection even after full utilization of the base sum insured.'
          ]
        },
        {
          id: 'domiciliary',
          icon: '🏠',
          title: 'DOMICILIARY EXPENSES',
          label: 'Home Treatment',
          value: 'Up to 10% of Sum Insured',
          paragraphs: [
            'Covers medical expenses up to 10% of the Sum Insured for treatment taken at home under specific circumstances.'
          ]
        },
        {
          id: 'premium-waiver',
          icon: '📋',
          title: 'PREMIUM WAIVER BENEFIT',
          label: 'Renewal Waiver',
          value: '1-Year Renewal Premium Waived',
          paragraphs: [
            'Renewal premium for one policy year is paid by the company if the proposer is diagnosed with a listed critical illness or faces accidental death, permanent total disablement, or permanent partial disablement, provided the proposer is also an insured person.'
          ]
        }
      ]
    },

    // ===========================================================================
    // 5. FEATURES SECTIONS / POLICY BENEFITS (EXACT FOUR CATEGORIES)
    // ===========================================================================
    featuresSections: [
      // --- SECTION 1: MOST IMPORTANT ---
      {
        id: 'sec-most-important',
        title: 'MOST IMPORTANT',
        subtitle: 'Core hospitalization, day care, and sum insured restoration protections',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 's1-1',
            title: 'Inpatient Hospitalization',
            subtitle: 'Covers medical expenses and room charges for hospitalization lasting more than 24 hours.',
            summary: 'Covers medical expenses and room charges for hospitalization lasting more than 24 hours due to illness or injury. Room category is covered up to any room except suite for Sum Insured up to ₹200 Lacs, and covers any room including suite category for ₹300 Lacs Sum Insured.',
            badge: 'UP TO SUITE (₹300L)',
            iconType: 'home',
            videoTitle: 'Inpatient Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 's1-2',
            title: 'Day Care Treatment',
            subtitle: 'Covered up to the full Sum Insured.',
            summary: 'All Day Care Treatments or surgeries requiring less than 24 hours of hospitalization are covered up to the full Sum Insured.',
            badge: 'UP TO FULL SUM INSURED',
            iconType: 'check',
            videoTitle: 'Day Care Treatment',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 's1-3',
            title: 'Pre-Hospitalization',
            subtitle: '60 Days.',
            summary: 'Covers medical expenses incurred up to 60 days before the date of hospitalization.',
            badge: '60 DAYS',
            iconType: 'calendar',
            videoTitle: 'Pre-Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 's1-4',
            title: 'Post-Hospitalization',
            subtitle: '180 Days.',
            summary: 'Covers medical expenses incurred up to 180 days after discharge from the hospital.',
            badge: '180 DAYS',
            iconType: 'calendar',
            videoTitle: 'Post-Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 's1-5',
            title: 'Road Ambulance Cover',
            subtitle: 'Up to the full Sum Insured.',
            summary: 'Covers expenses incurred on availing road ambulance services in India up to the full Sum Insured.',
            badge: 'UP TO FULL SUM INSURED',
            iconType: 'truck',
            videoTitle: 'Road Ambulance Cover',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 's1-6',
            title: 'Donor Expenses',
            subtitle: 'Covered up to the full Sum Insured.',
            summary: 'Covers hospitalisation expenses incurred towards the organ donor as per applicable laws and rules up to the full Sum Insured.',
            badge: 'UP TO FULL SUM INSURED',
            iconType: 'activity',
            videoTitle: 'Donor Expenses',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 's1-7',
            title: 'Domiciliary Expenses',
            subtitle: 'Up to 10% of the Sum Insured.',
            summary: 'Covers medical expenses up to 10% of the Sum Insured for treatment taken at home under specific circumstances.',
            badge: 'UP TO 10% SUM INSURED',
            iconType: 'home',
            videoTitle: 'Domiciliary Expenses',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 's1-8',
            title: 'Restoration of Sum Insured',
            subtitle: 'Multiple restorations up to 100% for unrelated illnesses.',
            summary: 'Multiple restorations available in a policy year for unrelated illnesses, restoring up to 100% of the Sum Insured.',
            badge: 'MULTIPLE 100% RESTORATIONS',
            iconType: 'refresh',
            videoTitle: 'Restoration of Sum Insured',
            videoUrl: DEMO_VIDEO_URL
          }
        ]
      },

      // --- SECTION 2: VALUE ADDED ---
      {
        id: 'sec-value-added',
        title: 'valueAdded',
        subtitle: 'Wellness check-ups, advanced surgeries, and alternative care',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        items: [
          {
            id: 's2-1',
            title: 'Adult Health Check-up',
            subtitle: 'Once per policy year at network providers for insured aged 18+.',
            summary: 'Comprehensive health check-up available once per policy year at network providers for insured persons aged 18 years or more.',
            badge: 'ANNUAL (AGE 18+)',
            iconType: 'smile',
            videoTitle: 'Adult Health Check-up',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 's2-2',
            title: 'AYUSH Treatment',
            subtitle: 'Covered up to the full Sum Insured.',
            summary: 'Covers non-allopathic treatments under Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy up to the full Sum Insured.',
            badge: 'UP TO FULL SUM INSURED',
            iconType: 'heart',
            videoTitle: 'AYUSH Treatment',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 's2-3',
            title: 'Modern and Advanced Treatments',
            subtitle: 'Covered up to the full Sum Insured.',
            summary: 'Covered up to the full Sum Insured as per terms and conditions.',
            badge: 'UP TO FULL SUM INSURED',
            iconType: 'cpu',
            videoTitle: 'Modern and Advanced Treatments',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 's2-4',
            title: 'Robotic and Cyber Knife Surgery',
            subtitle: 'Covered up to the full Sum Insured.',
            summary: 'Covered up to the full Sum Insured if certified by an authorised medical practitioner.',
            badge: 'UP TO FULL SUM INSURED',
            iconType: 'zap',
            videoTitle: 'Robotic and Cyber Knife Surgery',
            videoUrl: DEMO_VIDEO_URL
          }
        ]
      },

      // --- SECTION 3: ADDITIONAL ---
      {
        id: 'sec-additional',
        title: 'ADDITIONAL',
        subtitle: 'Specialized medical coverage and financial security protections',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 's3-1',
            title: 'HIV/AIDS and STD Cover',
            subtitle: 'Covered up to the full Sum Insured.',
            summary: 'Covered up to the full Sum Insured.',
            badge: 'UP TO FULL SUM INSURED',
            iconType: 'shield',
            videoTitle: 'HIV/AIDS and STD Cover',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 's3-2',
            title: 'Mental Care Cover',
            subtitle: 'Covered up to the full Sum Insured.',
            summary: 'Covers medical expenses for conditions related to mental illness, stress, anxiety, depression, or mental health impacts up to the full Sum Insured.',
            badge: 'UP TO FULL SUM INSURED',
            iconType: 'heart',
            videoTitle: 'Mental Care Cover',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 's3-3',
            title: 'Premium Waiver Benefit',
            subtitle: '1-year renewal premium paid on critical illness, death, or disablement.',
            summary: 'Renewal premium for one policy year is paid by the company if the proposer is diagnosed with a listed critical illness or faces accidental death, permanent total disablement, or permanent partial disablement, provided the proposer is also an insured person.',
            badge: '1-YEAR PREMIUM WAIVED',
            iconType: 'clipboard',
            videoTitle: 'Premium Waiver Benefit',
            videoUrl: DEMO_VIDEO_URL
          }
        ]
      },

      // --- SECTION 4: OPTIONAL ---
      {
        id: 'sec-optional',
        title: 'optional',
        subtitle: 'Optional riders and add-on covers',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        items: []
      }
    ]
  },

  // ===========================================================================
  // PLAN 2: SARVAH UTTAM (MANIPALCIGNA SARVAH)
  // ===========================================================================
  'sarvah-uttam': {
    planId: 'sarvah-uttam',
    planName: 'Sarvah Uttam',
    companyName: 'ManipalCigna Sarvah',
    tagline: 'Comprehensive Health Insurance with Anant Benefit, Sarathi 2.0 & Unlimited Restoration',
    coverage: 'Base SI ₹10L and above',
    premium: '',
    categoryBadge: 'Health Insurance',
    policySubtitle: 'ManipalCigna Sarvah Health Insurance Policy',

    // --- NAVIGATION, HEADINGS & BUTTON LABELS ---
    backToPlansLabel: 'Back to ManipalCigna Plans',
    backToPlanLabel: 'Back to Sarvah Uttam',
    featuresHeadingSuffix: 'POLICY BENEFITS',
    termsFootnote: '*T&C Apply',

    // Action Grid Labels
    reportCardButtonLabel: 'REPORT CARD',
    companyStrengthButtonLabel: 'COMPANY STRENGTH',
    policyBenefitsButtonLabel: 'POLICY BENEFITS',
    limitationsButtonLabel: 'LIMITATIONS & WAITING PERIODS',
    mustKnowButtonLabel: 'MUST KNOW DETAILS',

    // --- PLAN-SPECIFIC UI CONFIG ---
    uiConfig: {
      primaryColor: '#F8971F',      // ManipalCigna Primary Orange
      secondaryColor: '#0982C6',    // ManipalCigna Blue
      accentColor: '#56B948',       // ManipalCigna Green
      demoVideoUrl: DEMO_VIDEO_URL
    },

    // --- SUMMARY BENEFITS & DETAILS ---
    benefits: [
      'Anant Benefit: Cancer, Heart, Stroke, Major Organ Transplant & Accident hospitalization with unlimited coverage (Base SI ₹10L+)',
      'Sarathi 2.0: Listed PEDs (Asthma, Diabetes, Hypertension, etc.) covered after 30 days',
      'Unlimited Restoration: Unlimited restoration of Base SI for any illness or injury',
      'Surplus Benefit: Additional 100% Base SI available from day 1 for first claim each year',
      'Gullak Benefit: 100% Base SI increase per policy year irrespective of claims up to 1500%',
      'In-Patient Hospitalization: Covered up to Sum Insured',
      'Day Care Treatment: Covered up to Sum Insured',
      'ICU: Covered up to Sum Insured',
      'AYUSH Treatment: Covered up to Sum Insured',
      'Listed Modern & Advanced Treatments: Covered up to Sum Insured',
      'Room Rent: Single Private A/C Room with options for Any Room or Twin Sharing',
      'Pre & Post Hospitalization: 90 Days Pre & 180 Days Post covered',
      'Donor Expenses: Up to Sum Insured with 30 days pre/post hospitalization',
      'Non-Medical Items & Durable Medical Equipment: Non-medical items up to SI, durable equipment up to ₹1L',
      'Wellness Benefit: Up to 20% renewal discount based on step count',
      'No Claim Discount: Up to 7.5% discount based on claim-free policy years',
      'Unlimited Tele-Consultation: Unlimited GP tele-consultation',
      'Annual Health Check-up: Cashless check-up from 1st year for insured aged 18+',
      'Maternity & Newborn: Inpatient hospitalization & first-year vaccination up to 20% Base SI (max ₹5L, 36m waiting)',
      'Personal Accident Plus: Accidental Death & Permanent Disability cover up to ₹3Cr',
      'Common Carrier Benefit: 200% of opted PA SI for travel on common carrier',
      'Temporary Total Disablement (TTD): Fixed weekly benefit up to ₹1L/week up to 100 weeks',
      'Air Ambulance: Up to SI, maximum ₹10L',
      'Deductible & Co-pay: Aggregate Deductible (₹10K-₹10L), Daily Deductible (₹1K-₹5K/day), Voluntary Co-pay (10%-30%)'
    ],
    details: {
      eligibility: 'Adults 18+ | Children 91 days to 25 years',
      waitingPeriod: 'Initial: 30 days; Specific Disease: 24 months; PED: 36 months (Sarathi 2.0 covers listed PEDs after 30 days)',
      roomRent: 'Single Private A/C Room (Options for Any Room or Twin Sharing A/C Room)',
      hospitalization: 'Covered up to Sum Insured',
      prePostHospital: '90 Days Pre & 180 Days Post Hospitalization covered',
      dayCare: 'All Day Care procedures covered up to Sum Insured',
      noClaimBonus: 'Gullak: 100% Base SI increase per year up to 1500%; Claim-Free discount up to 7.5%',
      exclusions: 'Cosmetic surgery, adventure sports, breach of law, self-inflicted injuries'
    },

    // ===========================================================================
    // 1. REPORT CARD (MANIPALCIGNA PERFORMANCE & CLAIMS METRICS)
    // ===========================================================================
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'ManipalCigna Performance',
      description: 'Official claim settlement and financial strength metrics.',

      csr: {
        title: 'CSR',
        subtitle: 'Claim Settlement Ratio',
        summaryValue: '98.2%',
        explanation: 'Percentage of health insurance claims settled within 30 days under IRDAI standards.',
        singleYear: '98.2%',
        singleYearLabel: 'FY 2023-24',
        threeYearAvg: '97.6%',
        threeYearAvgLabel: '3-Year Average',
        videoTitle: 'Claim Settlement Ratio (CSR)',
        videoUrl: DEMO_VIDEO_URL
      },
      icr: {
        title: 'ICR',
        subtitle: 'Incurred Claim Ratio',
        summaryValue: '56.4%',
        explanation: 'Demonstrates balanced claim payouts ensuring long-term institutional financial sustainability.',
        range: '55% – 60%',
        rangeLabel: 'Healthy Operating Range',
        videoTitle: 'Incurred Claim Ratio (ICR)',
        videoUrl: DEMO_VIDEO_URL
      },
      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        subtitle: 'Grievance Redressal Ratio',
        summaryValue: '0.12',
        explanation: 'Very low grievance incidents per 10,000 policyholders reported to the regulator.',
        value: '0.12',
        label: 'Per 10,000 Policies',
        videoTitle: 'Complaint Volume Metric',
        videoUrl: DEMO_VIDEO_URL
      }
    },

    // ===========================================================================
    // 2. COMPANY STRENGTH (MANIPALCIGNA INSTITUTIONAL FOUNDATION)
    // ===========================================================================
    companyStrength: {
      heading: 'COMPANY STRENGTH',
      subheading: 'Institutional Foundation',
      description: 'Strong multinational partnership between Manipal Group & Cigna Corporation.',

      ownership: {
        title: 'OWNERSHIP / PERCENTAGE',
        summaryValue: '51% : 49%',
        explanation: 'Backed by healthcare leader Manipal Group (51%) and global health service titan Cigna (49%).',
        items: [
          'Manipal Group (Healthcare & Hospitals): 51%',
          'Cigna Corporation (Global Health Services): 49%'
        ],
        videoTitle: 'Ownership Structure',
        videoUrl: DEMO_VIDEO_URL
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'CRISIL AA/Stable',
        explanation: 'High degree of safety regarding timely servicing of financial obligations.',
        items: [
          'CRISIL: AA / Stable Outlook',
          'ICRA: AA / High Safety Rating'
        ],
        videoTitle: 'Credit Rating & Solvency',
        videoUrl: DEMO_VIDEO_URL
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '₹1,500+ Cr',
        explanation: 'Robust paid-up capital and continuous capital infusion ensuring substantial reserves.',
        label: 'Paid-up Equity Capital',
        videoTitle: 'Capital Strength Overview',
        videoUrl: DEMO_VIDEO_URL
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '1.76 Solvency',
        explanation: 'Maintains a solvency ratio of 1.76, comfortably above the IRDAI mandatory minimum of 1.50.',
        label: 'Solvency Ratio (Regulatory: 1.50)',
        videoTitle: 'Solvency & Reserves',
        videoUrl: DEMO_VIDEO_URL
      },
      reinsurance: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: 'A+ Rated',
        explanation: 'Treaty arrangements with globally renowned Tier-1 reinsurers including Swiss Re and Munich Re.',
        label: 'Global Tier-1 Reinsurance Treaties',
        videoTitle: 'Reinsurance Framework',
        videoUrl: DEMO_VIDEO_URL
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: 'Top 5 SAHI',
        explanation: "Among India's top Standalone Health Insurers (SAHI) with 9,000+ cashless network hospitals.",
        label: '9,000+ Cashless Hospital Network',
        videoTitle: 'Market Leadership & Hospital Network',
        videoUrl: DEMO_VIDEO_URL
      }
    },

    // ===========================================================================
    // 3. LIMITATIONS & WAITING PERIODS
    // ===========================================================================
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Sarvah Uttam Waiting Period Schedule',
      description: 'Standard statutory waiting periods under Sarvah Uttam policy guidelines.',
      items: [
        {
          id: 'initial-waiting-period',
          title: 'Initial Waiting Period',
          period: '30 Days',
          badge: '30 DAYS',
          iconType: 'clock',
          videoUrl: DEMO_VIDEO_URL,
          paragraphs: [
            'Initial 30 days waiting period for all medical treatments and illnesses from the policy inception date.',
            'Accidental injuries requiring hospitalization are covered immediately from day 1 with zero waiting period.',
            'Listed PEDs under Sarathi 2.0 (Asthma, Diabetes, Dyslipidaemia, Obesity, Hypertension) are covered after 30 days.'
          ]
        },
        {
          id: 'specific-disease-waiting-period',
          title: 'Specific Disease Waiting Period',
          period: '24 Months (Optional 36M)',
          badge: '24 MONTHS',
          iconType: 'calendar',
          videoUrl: DEMO_VIDEO_URL,
          paragraphs: [
            'Specified diseases and medical/surgical procedures are subject to a 24-month waiting period.',
            'Covers treatments including cataract, hernia, joint replacement, hysterectomy, stones, and ENT surgeries.',
            'Optional extension of specific disease waiting period to 36 months is available as a selectable option.'
          ]
        },
        {
          id: 'ped-waiting-period',
          title: 'Pre-Existing Diseases (PED)',
          period: '36 Months',
          badge: '36 MONTHS',
          iconType: 'shield',
          videoUrl: DEMO_VIDEO_URL,
          paragraphs: [
            'Pre-existing conditions declared at inception are covered after 36 months of continuous coverage.',
            'Under Sarathi 2.0, specified conditions like Asthma, Diabetes, Dyslipidaemia, Obesity and Hypertension are covered after 30 days.',
            'Permanent exclusions apply to cosmetic surgery, self-inflicted injuries, and non-prescribed treatments.'
          ]
        }
      ]
    },

    // ===========================================================================
    // 4. MUST KNOW DETAILS (5TH BUTTON MODAL DIALOG)
    // ===========================================================================
    mustKnowDetails: {
      title: 'MUST KNOW DETAILS',
      subtitle: 'Key Highlights of ManipalCigna Sarvah Uttam',
      badge: 'POLICY ESSENTIALS',
      items: [
        {
          id: 'mk-1',
          title: 'Anant Benefit',
          description: 'Cancer, Heart, Stroke, Major Organ/Bone Marrow Transplant and Accident-related hospitalization with unlimited coverage, available for Base SI ₹10L and above.',
          badge: 'UNLIMITED COVERAGE',
          iconType: 'zap',
          videoTitle: 'Anant Benefit',
          videoUrl: DEMO_VIDEO_URL,
          steps: ['Base SI ₹10L+', 'Critical Illness / Accident', 'Unlimited Coverage']
        },
        {
          id: 'mk-2',
          title: 'Sarathi 2.0',
          description: 'Listed PEDs such as Asthma, Diabetes, Dyslipidaemia, Obesity and Hypertension covered after 30 days.',
          badge: 'PED AFTER 30 DAYS',
          iconType: 'heart',
          videoTitle: 'Sarathi 2.0',
          videoUrl: DEMO_VIDEO_URL,
          steps: ['Listed PEDs', '30 Days Waiting', 'Early Coverage']
        },
        {
          id: 'mk-3',
          title: 'Unlimited Restoration',
          description: 'Unlimited restoration of Base SI for any illness/injury for any insured person.',
          badge: 'UNLIMITED RESTORATION',
          iconType: 'refresh',
          videoTitle: 'Unlimited Restoration',
          videoUrl: DEMO_VIDEO_URL,
          steps: ['Base SI Depleted', 'Immediate Refill', 'Unlimited Times']
        },
        {
          id: 'mk-4',
          title: 'Surplus & Gullak Benefits',
          description: 'Additional 100% of Base SI available from day 1 for first claim each year. Gullak increases Base SI by 100% per year up to 1500% irrespective of claims.',
          badge: 'SURPLUS + GULLAK',
          iconType: 'trending',
          videoTitle: 'Surplus & Gullak Benefits',
          videoUrl: DEMO_VIDEO_URL,
          steps: ['Day 1 Surplus 100%', 'Gullak +100%/Year', 'Max 1500% SI']
        },
        {
          id: 'mk-5',
          title: 'Waiting Periods',
          description: 'Initial waiting period: 30 days. Specific Disease waiting period: 24 months. Pre-existing disease (PED) waiting period: 36 months.',
          badge: '30D / 24M / 36M',
          iconType: 'clock',
          videoTitle: 'Waiting Periods',
          videoUrl: DEMO_VIDEO_URL,
          steps: ['Initial: 30 Days', 'Specific: 24 Months', 'PED: 36 Months']
        }
      ]
    },

    // ===========================================================================
    // 5. FEATURES SECTIONS / POLICY BENEFITS (EXACT FOUR CATEGORIES)
    // ===========================================================================
    featuresSections: [
      // --- SECTION 1: MOST IMPORTANT ---
      {
        id: 'sec-most-important',
        title: 'MOST IMPORTANT',
        subtitle: 'Core hospitalization, special benefits, and high-value protection covers',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'su-m1',
            title: 'Anant Benefit',
            subtitle: 'Cancer, Heart, Stroke, Major Organ/Bone Marrow Transplant and Accident-related hospitalization with unlimited coverage, available for Base SI ₹10L and above.',
            summary: 'Cancer, Heart, Stroke, Major Organ/Bone Marrow Transplant and Accident-related hospitalization with unlimited coverage, available for Base SI ₹10L and above.',
            badge: 'UNLIMITED COVERAGE',
            iconType: 'zap',
            videoTitle: 'Anant Benefit',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m2',
            title: 'Sarathi 2.0',
            subtitle: 'Listed PEDs such as Asthma, Diabetes, Dyslipidaemia, Obesity and Hypertension covered after 30 days.',
            summary: 'Listed PEDs such as Asthma, Diabetes, Dyslipidaemia, Obesity and Hypertension covered after 30 days.',
            badge: 'PED AFTER 30 DAYS',
            iconType: 'heart',
            videoTitle: 'Sarathi 2.0',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m3',
            title: 'Unlimited Restoration',
            subtitle: 'Unlimited restoration of Base SI for any illness/injury for any insured person.',
            summary: 'Unlimited restoration of Base SI for any illness/injury for any insured person.',
            badge: 'UNLIMITED RESTORATION',
            iconType: 'refresh',
            videoTitle: 'Unlimited Restoration',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m4',
            title: 'Surplus Benefit',
            subtitle: 'Additional 100% of Base SI available from day 1 for the first claim in each policy year.',
            summary: 'Additional 100% of Base SI available from day 1 for the first claim in each policy year.',
            badge: '100% FROM DAY 1',
            iconType: 'trending',
            videoTitle: 'Surplus Benefit',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m5',
            title: 'Gullak Benefit',
            subtitle: 'Base SI increases by 100% per policy year irrespective of claim history, up to a maximum of 1500%.',
            summary: 'Base SI increases by 100% per policy year irrespective of claim history, up to a maximum of 1500%.',
            badge: 'UP TO 1500% BONUS',
            iconType: 'dollar',
            videoTitle: 'Gullak Benefit',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m6',
            title: 'In-Patient Hospitalization',
            subtitle: 'Covered up to Sum Insured.',
            summary: 'Covered up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'home',
            videoTitle: 'In-Patient Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m7',
            title: 'Day Care Treatment',
            subtitle: 'Covered up to Sum Insured.',
            summary: 'Covered up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'check',
            videoTitle: 'Day Care Treatment',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m8',
            title: 'ICU',
            subtitle: 'Covered up to Sum Insured.',
            summary: 'Covered up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'activity',
            videoTitle: 'ICU',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m9',
            title: 'AYUSH Treatment',
            subtitle: 'Covered up to Sum Insured.',
            summary: 'Covered up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'heart',
            videoTitle: 'AYUSH Treatment',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m10',
            title: 'Listed Modern & Advanced Treatments',
            subtitle: 'Covered up to Sum Insured.',
            summary: 'Covered up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'cpu',
            videoTitle: 'Listed Modern & Advanced Treatments',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m11',
            title: 'Domiciliary Hospitalization',
            subtitle: 'Covered up to Sum Insured.',
            summary: 'Covered up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'home',
            videoTitle: 'Domiciliary Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m12',
            title: 'Road Ambulance',
            subtitle: 'Covered up to Sum Insured.',
            summary: 'Covered up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'truck',
            videoTitle: 'Road Ambulance',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m13',
            title: 'Room Rent',
            subtitle: 'Single Private A/C Room; options for Any Room or Twin Sharing A/C Room.',
            summary: 'Single Private A/C Room; options for Any Room or Twin Sharing A/C Room.',
            badge: 'SINGLE PRIVATE A/C',
            iconType: 'home',
            videoTitle: 'Room Rent',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m14',
            title: 'Pre-Hospitalization',
            subtitle: '90 days.',
            summary: '90 days.',
            badge: '90 DAYS',
            iconType: 'calendar',
            videoTitle: 'Pre-Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m15',
            title: 'Post-Hospitalization',
            subtitle: '180 days.',
            summary: '180 days.',
            badge: '180 DAYS',
            iconType: 'calendar',
            videoTitle: 'Post-Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m16',
            title: 'Donor Expenses',
            subtitle: 'Up to Sum Insured with 30 days pre/post hospitalization; complications covered up to 25% of Base SI, maximum ₹2L.',
            summary: 'Up to Sum Insured with 30 days pre/post hospitalization; complications covered up to 25% of Base SI, maximum ₹2L.',
            badge: 'UP TO SUM INSURED',
            iconType: 'activity',
            videoTitle: 'Donor Expenses',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m17',
            title: 'Non-Medical Items & Durable Medical Equipment',
            subtitle: 'Non-medical items covered up to SI; prescribed durable medical equipment covered up to ₹1L.',
            summary: 'Non-medical items covered up to SI; prescribed durable medical equipment covered up to ₹1L.',
            badge: 'UP TO SUM INSURED',
            iconType: 'shield',
            videoTitle: 'Non-Medical Items & Durable Medical Equipment',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-m18',
            title: 'No Zonal Co-pay',
            subtitle: 'No zonal co-pay concern for treatment in the city of choice.',
            summary: 'No zonal co-pay concern for treatment in the city of choice.',
            badge: 'ZERO ZONAL CO-PAY',
            iconType: 'check',
            videoTitle: 'No Zonal Co-pay',
            videoUrl: DEMO_VIDEO_URL
          }
        ]
      },

      // --- SECTION 2: VALUE ADDED ---
      {
        id: 'sec-value-added',
        title: 'valueAdded',
        subtitle: 'Wellness rewards, discounts, and tele-consultation benefits',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        items: [
          {
            id: 'su-v1',
            title: 'Wellness Benefit',
            subtitle: 'Up to 20% renewal premium discount based on defined number of steps.',
            summary: 'Up to 20% renewal premium discount based on defined number of steps.',
            badge: 'UP TO 20% DISCOUNT',
            iconType: 'smile',
            videoTitle: 'Wellness Benefit',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-v2',
            title: 'Claim-Free / No Claim Discount',
            subtitle: 'Up to 7.5% discount based on claim-free policy years.',
            summary: 'Up to 7.5% discount based on claim-free policy years.',
            badge: 'UP TO 7.5% DISCOUNT',
            iconType: 'trending',
            videoTitle: 'Claim-Free / No Claim Discount',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-v3',
            title: 'Unlimited Tele-Consultation',
            subtitle: 'Unlimited General Physician tele-consultation.',
            summary: 'Unlimited General Physician tele-consultation.',
            badge: 'UNLIMITED GP ACCESS',
            iconType: 'users',
            videoTitle: 'Unlimited Tele-Consultation',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-v4',
            title: 'Network Provider Discount',
            subtitle: 'Discounts on Pharmacy, Diagnostics and Health Supplements through partner network providers.',
            summary: 'Discounts on Pharmacy, Diagnostics and Health Supplements through partner network providers.',
            badge: 'PHARMACY & LABS',
            iconType: 'credit',
            videoTitle: 'Network Provider Discount',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-v5',
            title: 'Health Check-up',
            subtitle: 'Annual cashless health check-up from the first policy year for insured persons aged 18+.',
            summary: 'Annual cashless health check-up from the first policy year for insured persons aged 18+.',
            badge: 'ANNUAL (AGE 18+)',
            iconType: 'smile',
            videoTitle: 'Health Check-up',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-v6',
            title: 'Early Renewal Discount',
            subtitle: '2.5% if renewed at least 15 days before policy expiry.',
            summary: '2.5% if renewed at least 15 days before policy expiry.',
            badge: '2.5% DISCOUNT',
            iconType: 'clock',
            videoTitle: 'Early Renewal Discount',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-v7',
            title: 'Standing Instruction Discount',
            subtitle: '2.5% when renewal premium is received through standing instruction.',
            summary: '2.5% when renewal premium is received through standing instruction.',
            badge: '2.5% DISCOUNT',
            iconType: 'credit',
            videoTitle: 'Standing Instruction Discount',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-v8',
            title: 'Long Term Policy Discount',
            subtitle: '2-year: 7.5%; 3-year: 10%.',
            summary: '2-year: 7.5%; 3-year: 10%.',
            badge: 'UP TO 10% DISCOUNT',
            iconType: 'calendar',
            videoTitle: 'Long Term Policy Discount',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-v9',
            title: 'Family Discount',
            subtitle: '10% for individual policies with 2 or more members.',
            summary: '10% for individual policies with 2 or more members.',
            badge: '10% DISCOUNT',
            iconType: 'users',
            videoTitle: 'Family Discount',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-v10',
            title: '1st Policy Renewal Discount',
            subtitle: '5%.',
            summary: '5%.',
            badge: '5% DISCOUNT',
            iconType: 'check',
            videoTitle: '1st Policy Renewal Discount',
            videoUrl: DEMO_VIDEO_URL
          }
        ]
      },

      // --- SECTION 3: ADDITIONAL ---
      {
        id: 'sec-additional',
        title: 'ADDITIONAL',
        subtitle: 'Maternity, accident covers, air ambulance, and policy terms',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'su-a1',
            title: 'Maternity & Newborn Hospitalization',
            subtitle: 'Maternity, newborn inpatient hospitalization and first-year vaccination covered up to 20% of Base SI, maximum ₹5L; 36-month waiting period applies.',
            summary: 'Maternity, newborn inpatient hospitalization and first-year vaccination covered up to 20% of Base SI, maximum ₹5L; 36-month waiting period applies.',
            badge: 'UP TO 20% (MAX ₹5L)',
            iconType: 'heart',
            videoTitle: 'Maternity & Newborn Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-a2',
            title: 'Personal Accident Plus',
            subtitle: 'Accidental Death and Permanent Disability cover with SI options from ₹10L to ₹3Cr.',
            summary: 'Accidental Death and Permanent Disability cover with SI options from ₹10L to ₹3Cr.',
            badge: '₹10L TO ₹3CR',
            iconType: 'shield',
            videoTitle: 'Personal Accident Plus',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-a3',
            title: 'Common Carrier Benefit',
            subtitle: '200% of opted Personal Accident SI in case of accidental death or permanent total disability while travelling as a fare-paying passenger on a common carrier.',
            summary: '200% of opted Personal Accident SI in case of accidental death or permanent total disability while travelling as a fare-paying passenger on a common carrier.',
            badge: '200% OF PA SI',
            iconType: 'truck',
            videoTitle: 'Common Carrier Benefit',
            videoUrl: DEMO_VIDEO_URL
          },

          {
            id: 'su-a6',
            title: 'Aggregate Deductible',
            subtitle: 'Options from ₹10K to ₹10L.',
            summary: 'Options from ₹10K to ₹10L.',
            badge: '₹10K TO ₹10L',
            iconType: 'dollar',
            videoTitle: 'Aggregate Deductible',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-a7',
            title: 'Daily Deductible',
            subtitle: '₹1K, ₹2K, ₹3K, ₹4K and ₹5K per day of hospitalization.',
            summary: '₹1K, ₹2K, ₹3K, ₹4K and ₹5K per day of hospitalization.',
            badge: '₹1K TO ₹5K/DAY',
            iconType: 'calendar',
            videoTitle: 'Daily Deductible',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-a8',
            title: 'Voluntary Co-payment',
            subtitle: '10%, 20% or 30%.',
            summary: '10%, 20% or 30%.',
            badge: '10% / 20% / 30%',
            iconType: 'credit',
            videoTitle: 'Voluntary Co-payment',
            videoUrl: DEMO_VIDEO_URL
          },

          {
            id: 'su-a10',
            title: 'Waiting Periods',
            subtitle: 'Initial: 30 days; Specific Disease: 24 months; PED: 36 months.',
            summary: 'Initial: 30 days; Specific Disease: 24 months; PED: 36 months.',
            badge: '30D / 24M / 36M',
            iconType: 'shield',
            videoTitle: 'Waiting Periods',
            videoUrl: DEMO_VIDEO_URL
          }
        ]
      },

      // --- SECTION 4: OPTIONAL ---
      {
        id: 'sec-optional',
        title: 'optional',
        subtitle: 'Customizable riders and elective coverage extensions',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        items: [
          {
            id: 'su-o1',
            title: 'Personal Accident Cover',
            subtitle: 'Optional cover on payment of additional premium; includes Accidental Death, Permanent Total Disability and Permanent Partial Disability.',
            summary: 'Optional cover on payment of additional premium; includes Accidental Death, Permanent Total Disability and Permanent Partial Disability.',
            badge: 'OPTIONAL COVER',
            iconType: 'shield',
            videoTitle: 'Personal Accident Cover',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-o2',
            title: 'Maternity & Newborn Hospitalization Cover',
            subtitle: 'Optional cover with a 36-month waiting period.',
            summary: 'Optional cover with a 36-month waiting period.',
            badge: 'OPTIONAL (36M WAITING)',
            iconType: 'heart',
            videoTitle: 'Maternity & Newborn Hospitalization Cover',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-o3',
            title: 'Air Ambulance',
            subtitle: 'Optional cover up to SI, maximum ₹10L.',
            summary: 'Optional cover up to SI, maximum ₹10L.',
            badge: 'OPTIONAL (MAX ₹10L)',
            iconType: 'zap',
            videoTitle: 'Air Ambulance',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-o4',
            title: 'Temporary Total Disablement (TTD)',
            subtitle: 'Optional fixed weekly benefit.',
            summary: 'Optional fixed weekly benefit.',
            badge: 'OPTIONAL BENEFIT',
            iconType: 'clock',
            videoTitle: 'Temporary Total Disablement (TTD)',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-o5',
            title: 'Gullak',
            subtitle: 'Optional feature providing 100% Base SI increase per policy year, up to 1500%.',
            summary: 'Optional feature providing 100% Base SI increase per policy year, up to 1500%.',
            badge: 'OPTIONAL UP TO 1500%',
            iconType: 'dollar',
            videoTitle: 'Gullak',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-o6',
            title: 'Restoration',
            subtitle: 'Optional unlimited restoration for any illness/injury for any insured person; not applicable to the first claim.',
            summary: 'Optional unlimited restoration for any illness/injury for any insured person; not applicable to the first claim.',
            badge: 'OPTIONAL RESTORATION',
            iconType: 'refresh',
            videoTitle: 'Restoration',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-o7',
            title: 'Extension of Specific Disease Waiting Period',
            subtitle: 'Extension from 24 months to 36 months.',
            summary: 'Extension from 24 months to 36 months.',
            badge: 'OPTIONAL EXTENSION',
            iconType: 'calendar',
            videoTitle: 'Extension of Specific Disease Waiting Period',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'su-o8',
            title: 'Aggregate Deductible / Daily Deductible / Voluntary Co-payment',
            subtitle: 'User-selectable options.',
            summary: 'User-selectable options.',
            badge: 'USER SELECTABLE',
            iconType: 'credit',
            videoTitle: 'Aggregate Deductible / Daily Deductible / Voluntary Co-payment',
            videoUrl: DEMO_VIDEO_URL
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // PLAN 3: SARVAH PARAM
  // ===========================================================================
  'sarvah-param': {
    planId: 'sarvah-param',
    planName: 'Sarvah Param',
    companyName: 'ManipalCigna Sarvah',
    tagline: "India's Most Comprehensive Health Insurance — Zero Waiting Period, Unlimited Coverage & Lifelong Protection",
    coverage: 'Base SI ₹5L to ₹300L',
    premium: '',
    categoryBadge: 'Health Insurance',
    policySubtitle: 'ManipalCigna Sarvah Health Insurance Policy',

    // --- NAVIGATION, HEADINGS & BUTTON LABELS ---
    backToPlansLabel: 'Back to ManipalCigna Plans',
    backToPlanLabel: 'Back to Sarvah Param',
    featuresHeadingSuffix: 'POLICY BENEFITS',
    termsFootnote: '*T&C Apply',

    // Action Grid Labels
    reportCardButtonLabel: 'REPORT CARD',
    companyStrengthButtonLabel: 'COMPANY STRENGTH',
    policyBenefitsButtonLabel: 'POLICY BENEFITS',
    limitationsButtonLabel: 'LIMITATIONS & WAITING PERIODS',
    mustKnowButtonLabel: 'MUST KNOW DETAILS',

    // --- PLAN-SPECIFIC UI CONFIG ---
    uiConfig: {
      primaryColor: '#F8971F',      // ManipalCigna Primary Orange
      secondaryColor: '#0982C6',    // ManipalCigna Blue
      accentColor: '#56B948',       // ManipalCigna Green
      demoVideoUrl: DEMO_VIDEO_URL
    },

    // --- SUMMARY BENEFITS & DETAILS ---
    benefits: [
      'Tatkal Benefit: Absolutely Zero Waiting Period — coverage from Day 1',
      'Anant Care: Unlimited coverage for Cancer, Heart, Stroke, Major Organ Transplant & Accidents',
      'Gullak Benefit: 100% Base SI increase per policy year, maximum 1500%, irrespective of claims',
      'Unlimited Restoration: Unlimited restoration of Base SI for any illness/injury (not for 1st claim)',
      'Surplus Benefit: Additional 100% Base SI available from Day 1 for first claim every year',
      'No Zonal Co-pay: Treatment in city of choice with zero zonal co-payment',
      'In-Patient Hospitalization: Covered up to Sum Insured',
      'Day Care Treatment: Covered up to Sum Insured',
      'ICU: Covered up to Sum Insured',
      'AYUSH Treatment: Covered up to Sum Insured',
      'Listed Modern & Advanced Treatments: Covered up to Sum Insured',
      'Domiciliary Hospitalization: Covered up to Sum Insured',
      'Road Ambulance: Covered up to Sum Insured',
      'Room Rent: Single Private A/C Room (options for Any Room or Twin Sharing A/C Room)',
      'Pre & Post Hospitalization: 90 Days Pre & 180 Days Post covered',
      'Donor Expenses: Up to Sum Insured with 30d pre/post; complications up to 25% Base SI (max ₹2L)',
      'Non-Medical Items & DME: Non-medical items up to SI; durable equipment up to ₹1L',
      'Wellness Benefit: Up to 20% renewal discount by steps',
      'No Claim Discount: Up to 7.5% based on claim-free years',
      'Unlimited Tele-Consultation: Unlimited GP tele-consultation',
      'Annual Health Check-up: Cashless check-up from 1st year for insured aged 18+',
      'Base SI Options: ₹5L to ₹300L',
      'Maternity & Newborn: Up to 20% Base SI (max ₹5L), 36-month waiting period',
      'Personal Accident Plus: Accidental Death & Permanent Disability cover',
      'Air Ambulance: Up to SI, maximum ₹10L',
      'Pratiksha (Optional): Reverts to standard Initial WP 30 days & Specific Disease WP 24 months'
    ],
    details: {
      eligibility: 'Adults 18+ | Children 91 days to 25 years | Lifelong Renewal',
      waitingPeriod: 'Tatkal Benefit: Zero waiting period. Optional Pratiksha: Initial 30 days; Specific Disease 24 months; PED 36 months',
      roomRent: 'Single Private A/C Room (Options: Any Room or Twin Sharing A/C Room)',
      hospitalization: 'Covered up to Sum Insured — all inpatient expenses from Day 1',
      prePostHospital: '90 Days Pre & 180 Days Post Hospitalization covered',
      dayCare: 'All Day Care procedures covered up to Sum Insured',
      noClaimBonus: 'Gullak: 100% Base SI increase per year up to 1500%; No Claim Discount: up to 7.5%',
      exclusions: 'Cosmetic surgery, adventure sports, breach of law, self-inflicted injuries'
    },

    // ===========================================================================
    // 1. REPORT CARD (MANIPALCIGNA PERFORMANCE & CLAIMS METRICS)
    // ===========================================================================
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'ManipalCigna Performance',
      description: 'Official claim settlement and financial strength metrics for ManipalCigna Health Insurance.',

      csr: {
        title: 'CSR',
        subtitle: 'Claim Settlement Ratio',
        summaryValue: '98.2%',
        explanation: 'Percentage of health insurance claims settled within 30 days under IRDAI standards. ManipalCigna maintains consistently high claim settlement rates.',
        singleYear: '98.2%',
        singleYearLabel: 'FY 2023-24',
        threeYearAvg: '97.6%',
        threeYearAvgLabel: '3-Year Average',
        videoTitle: 'Claim Settlement Ratio (CSR)',
        videoUrl: DEMO_VIDEO_URL
      },
      icr: {
        title: 'ICR',
        subtitle: 'Incurred Claim Ratio',
        summaryValue: '56.4%',
        explanation: 'Demonstrates a healthy balance between claim payouts and premium intake, ensuring long-term financial sustainability.',
        range: '55% – 60%',
        rangeLabel: 'Healthy Operating Range',
        videoTitle: 'Incurred Claim Ratio (ICR)',
        videoUrl: DEMO_VIDEO_URL
      },
      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        subtitle: 'Grievance Redressal Ratio',
        summaryValue: '0.12',
        explanation: 'Very low grievance incidents per 10,000 policyholders reported to the regulator — reflects strong service quality.',
        value: '0.12',
        label: 'Per 10,000 Policies',
        videoTitle: 'Complaint Volume Metric',
        videoUrl: DEMO_VIDEO_URL
      }
    },

    // ===========================================================================
    // 2. COMPANY STRENGTH
    // ===========================================================================
    companyStrength: {
      heading: 'COMPANY STRENGTH',
      subheading: 'Institutional Foundation',
      description: 'Strong multinational partnership between Manipal Group & Cigna Corporation delivering world-class health insurance.',

      ownership: {
        title: 'OWNERSHIP / PERCENTAGE',
        summaryValue: '51% : 49%',
        explanation: 'Backed by healthcare leader Manipal Group (51%) and global health service titan Cigna Corporation (49%).',
        items: [
          'Manipal Group (Healthcare & Hospitals): 51%',
          'Cigna Corporation (Global Health Services): 49%'
        ],
        videoTitle: 'Ownership Structure',
        videoUrl: DEMO_VIDEO_URL
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'CRISIL AA/Stable',
        explanation: 'High degree of safety regarding timely servicing of financial obligations.',
        items: [
          'CRISIL: AA / Stable Outlook',
          'ICRA: AA / High Safety Rating'
        ],
        videoTitle: 'Credit Rating & Solvency',
        videoUrl: DEMO_VIDEO_URL
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '₹1,500+ Cr',
        explanation: 'Robust paid-up capital and continuous capital infusion ensuring substantial reserves for claim payments.',
        label: 'Paid-up Equity Capital',
        videoTitle: 'Capital Strength Overview',
        videoUrl: DEMO_VIDEO_URL
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '1.76 Solvency',
        explanation: 'Maintains a solvency ratio of 1.76, comfortably above the IRDAI mandatory minimum of 1.50.',
        label: 'Solvency Ratio (Regulatory Minimum: 1.50)',
        videoTitle: 'Solvency & Reserves',
        videoUrl: DEMO_VIDEO_URL
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: 'A+ Rated',
        explanation: 'Treaty arrangements with globally renowned Tier-1 reinsurers including Swiss Re and Munich Re.',
        label: 'Global Tier-1 Reinsurance Treaties',
        videoTitle: 'Reinsurance Framework',
        videoUrl: DEMO_VIDEO_URL
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: 'Top 5 SAHI',
        explanation: "Among India's top Standalone Health Insurers (SAHI) with 9,000+ cashless network hospitals across all zones.",
        label: '9,000+ Cashless Hospital Network',
        videoTitle: 'Market Leadership & Hospital Network',
        videoUrl: DEMO_VIDEO_URL
      }
    },

    // ===========================================================================
    // 3. LIMITATIONS & WAITING PERIODS
    // ===========================================================================
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Sarvah Param Waiting Period Schedule',
      description: 'Sarvah Param offers Zero Waiting Period via the Tatkal Benefit. Optional Pratiksha benefit reverts to standard waiting periods.',
      items: [
        {
          id: 'tatkal-benefit-wp',
          title: 'Tatkal Benefit — Zero Waiting Period',
          period: 'Zero (Day 1)',
          badge: 'ZERO WAITING',
          iconType: 'zap',
          summary: "Sarvah Param's signature Tatkal Benefit eliminates all waiting periods. Coverage for all illnesses, pre-existing conditions, and specified diseases begins from Day 1 of policy inception.",
          highlight: 'No waiting at all — every illness covered from Day 1.',
          durationTag: 'Day 1',
          videoTitle: 'Tatkal Benefit — Zero Waiting Period',
          videoUrl: DEMO_VIDEO_URL
        },
        {
          id: 'pratiksha-optional-wp',
          title: 'Pratiksha (Optional) — Standard Waiting Periods',
          period: '30 Days / 24 Months',
          badge: 'OPTIONAL BENEFIT',
          iconType: 'clock',
          summary: 'Opting for Pratiksha makes the Initial Waiting Period 30 days and the Specific Disease Waiting Period 24 months. This is an optional benefit — by default, Tatkal Benefit applies with zero waiting period.',
          durationTag: 'Optional: 30D / 24M',
          videoTitle: 'Pratiksha — Optional Waiting Periods',
          videoUrl: DEMO_VIDEO_URL
        },
        {
          id: 'ped-waiting-period',
          title: 'Pre-Existing Diseases (PED) Waiting Period',
          period: '36 Months (if Pratiksha opted)',
          badge: '36 MONTHS (OPTIONAL)',
          iconType: 'shield',
          summary: 'Pre-existing conditions are covered immediately under the Tatkal Benefit (zero waiting). If the optional Pratiksha benefit is chosen, a 36-month waiting period applies for pre-existing diseases.',
          durationTag: 'Zero (default) / 36M (if Pratiksha)',
          videoTitle: 'PED Waiting Period',
          videoUrl: DEMO_VIDEO_URL
        }
      ]
    },

    // ===========================================================================
    // 4. MUST KNOW DETAILS
    // ===========================================================================
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Key highlights of ManipalCigna Sarvah Param',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',

      items: [
        {
          id: 'mksp-1',
          icon: '⚡',
          title: 'TATKAL BENEFIT',
          label: 'Zero Waiting Period',
          value: 'Day 1 Coverage',
          paragraphs: [
            "Sarvah Param's most distinctive feature — absolutely zero waiting period for all medical conditions from the very first day of the policy.",
            'Unlike most plans with 30-day initial waiting and 24/36-month disease-specific waiting, Sarvah Param removes all these barriers entirely.'
          ]
        },
        {
          id: 'mksp-2',
          icon: '♾️',
          title: 'ANANT CARE',
          label: 'Unlimited Coverage',
          value: 'No Claim Cap',
          paragraphs: [
            'For major illnesses like Cancer, Heart conditions, Stroke, Major Organ/Bone Marrow Transplant, and Accidents — there is absolutely no upper limit on the claim amount.',
            'Anant Care ensures you never run out of coverage when it matters the most.'
          ]
        },
        {
          id: 'mksp-3',
          icon: '🏺',
          title: 'GULLAK BENEFIT',
          label: 'SI Growth Per Year',
          value: 'Up to 1500% of Base SI',
          paragraphs: [
            'Your Base Sum Insured grows automatically by 100% every policy year, irrespective of whether you made a claim or not.',
            'Maximum accumulation is 1500% of the original Base SI — like a piggy bank that keeps filling up year after year.'
          ]
        },
        {
          id: 'mksp-4',
          icon: '🔄',
          title: 'UNLIMITED RESTORATION',
          label: 'Base SI Restored',
          value: 'Unlimited Times',
          paragraphs: [
            'If your Base Sum Insured is exhausted during the policy year, it gets restored unlimited times for any illness or injury.',
            'Note: Unlimited Restoration is not applicable for the very first claim of the policy year.'
          ]
        },
        {
          id: 'mksp-5',
          icon: '💰',
          title: 'SURPLUS BENEFIT',
          label: 'Additional SI from Day 1',
          value: '100% Extra from Day 1',
          paragraphs: [
            'For every policy year, an additional 100% of the Base SI is made available from Day 1 for the first claim.',
            'This means you effectively have 2× your Base SI available for the first claim in any given year.'
          ]
        },
        {
          id: 'mksp-6',
          icon: '🌍',
          title: 'NO ZONAL CO-PAY',
          label: 'City of Choice',
          value: 'Zero Zonal Co-payment',
          paragraphs: [
            'Get treated at any hospital in your preferred city without worrying about zonal co-payment deductions.',
            'No matter which zone the hospital falls in, you pay nothing extra as a zonal co-pay.'
          ]
        },
        {
          id: 'mksp-7',
          icon: '⚙️',
          title: 'PRATIKSHA (OPTIONAL)',
          label: 'Optional — Standard WPs',
          value: 'Initial 30D / Specific 24M',
          paragraphs: [
            'Pratiksha is an optional benefit that, when selected, applies standard waiting periods: 30-day Initial WP and 24-month Specific Disease WP.',
            'By default, the Tatkal Benefit provides zero waiting period. Choose Pratiksha only if you prefer lower premium with standard waiting periods.'
          ]
        }
      ]
    },

    // ===========================================================================
    // 5. FEATURES SECTIONS / POLICY BENEFITS (FOUR CATEGORIES)
    // ===========================================================================
    featuresSections: [
      // --- SECTION 1: MOST IMPORTANT ---
      {
        id: 'sec-most-important',
        title: 'MOST IMPORTANT',
        subtitle: 'Signature benefits, zero waiting period, and core hospitalization protections',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'sp-m1',
            title: 'Tatkal Benefit',
            subtitle: 'Absolutely Zero Waiting Period — Day 1 coverage for all illnesses and conditions.',
            summary: "Sarvah Param's defining feature: absolutely zero waiting period for every medical condition. Unlike most policies with initial 30-day and disease-specific 24/36-month waiting periods, Tatkal Benefit eliminates all these barriers from Day 1 of the policy.",
            badge: 'ZERO WAITING PERIOD',
            iconType: 'zap',
            videoTitle: 'Tatkal Benefit',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m2',
            title: 'Anant Care',
            subtitle: 'Unlimited coverage for major illnesses and accidents — no cap on claims.',
            summary: "Cancer, Heart, Stroke, Major Organ/Bone Marrow Transplant, and Accident-related hospitalization with absolutely no limit on the claim amount. Anant Care ensures you are never constrained by a monetary ceiling when facing life's most critical health events.",
            badge: 'UNLIMITED COVERAGE',
            iconType: 'zap',
            videoTitle: 'Anant Care',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m3',
            title: 'Gullak Benefit',
            subtitle: 'Base Sum Insured increases by 100% per policy year — up to 1500% — irrespective of claims.',
            summary: 'Every policy year, your Base Sum Insured grows by 100% regardless of claim history, up to a maximum of 1500% of the original Base SI. Like a savings pot that keeps growing — Gullak ensures your coverage keeps pace with medical inflation.',
            badge: 'UP TO 1500% BONUS',
            iconType: 'dollar',
            videoTitle: 'Gullak Benefit',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m4',
            title: 'Unlimited Restoration',
            subtitle: 'Unlimited restoration of Base SI for any illness/injury. Not applicable for 1st claim.',
            summary: 'Once your Base SI is exhausted, it is restored in full — unlimited times in a policy year — for any illness or injury. This applies to any insured person. Note: Restoration is not triggered by the very first claim of the year.',
            badge: 'UNLIMITED RESTORATION',
            iconType: 'refresh',
            videoTitle: 'Unlimited Restoration',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m5',
            title: 'Surplus Benefit',
            subtitle: 'Additional 100% of Base SI available from Day 1 for the first claim of every policy year.',
            summary: 'For the first claim of every policy year, an additional 100% of the Base SI is available right from Day 1. This means your effective coverage for the first claim is 2× your Base SI.',
            badge: '100% EXTRA FROM DAY 1',
            iconType: 'trending',
            videoTitle: 'Surplus Benefit',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m6',
            title: 'No Zonal Co-pay',
            subtitle: 'No zonal co-payment for treatment in your city of choice, anywhere in India.',
            summary: 'Seek treatment at any hospital in your preferred city without incurring any zonal co-payment. ManipalCigna Sarvah Param removes zonal barriers so your healthcare decisions are driven by medical need, not geography.',
            badge: 'ZERO ZONAL CO-PAY',
            iconType: 'check',
            videoTitle: 'No Zonal Co-pay',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m7',
            title: 'In-Patient Hospitalization',
            subtitle: 'Covered up to Sum Insured for all inpatient admissions.',
            summary: 'All medical expenses for hospitalization of 24 hours or more are covered up to the full Sum Insured — including room charges, ICU, doctor fees, surgical expenses, medicines, and consumables.',
            badge: 'UP TO SUM INSURED',
            iconType: 'home',
            videoTitle: 'In-Patient Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m8',
            title: 'Day Care Treatment',
            subtitle: 'All day care procedures covered up to Sum Insured.',
            summary: 'All medical procedures and surgeries requiring less than 24 hours of hospitalization are fully covered up to the Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'check',
            videoTitle: 'Day Care Treatment',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m9',
            title: 'ICU',
            subtitle: 'Intensive Care Unit charges covered up to Sum Insured — no sub-limits.',
            summary: 'ICU charges are covered up to the full Sum Insured with no sub-limit restrictions, ensuring critical care is fully supported.',
            badge: 'UP TO SUM INSURED',
            iconType: 'activity',
            videoTitle: 'ICU Coverage',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m10',
            title: 'AYUSH Treatment',
            subtitle: 'Ayurveda, Yoga & Naturopathy, Unani, Siddha and Homeopathy — covered up to Sum Insured.',
            summary: 'Inpatient treatment under AYUSH (Ayurveda, Yoga & Naturopathy, Unani, Siddha, Homeopathy) at government-recognized institutions is covered up to the full Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'heart',
            videoTitle: 'AYUSH Treatment',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m11',
            title: 'Listed Modern & Advanced Treatments',
            subtitle: 'Covered up to Sum Insured — robotic surgeries, cyber-knife, and more.',
            summary: 'All listed modern and advanced treatment procedures — including robotic surgeries, cyber-knife treatments, and other approved advanced therapies — are covered up to the full Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'cpu',
            videoTitle: 'Modern & Advanced Treatments',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m12',
            title: 'Domiciliary Hospitalization',
            subtitle: 'Home treatment covered up to Sum Insured under specified conditions.',
            summary: 'Medical treatment received at home due to inability to be hospitalized or non-availability of hospital beds is covered up to the full Sum Insured, provided it meets policy conditions.',
            badge: 'UP TO SUM INSURED',
            iconType: 'home',
            videoTitle: 'Domiciliary Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m13',
            title: 'Road Ambulance',
            subtitle: 'Road ambulance charges for emergency hospitalization covered up to Sum Insured.',
            summary: 'Covers expenses incurred on availing road ambulance services for emergency hospitalization in India, up to the full Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'truck',
            videoTitle: 'Road Ambulance',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m14',
            title: 'Room Rent',
            subtitle: 'Single Private A/C Room as default; options for Any Room or Twin Sharing A/C Room.',
            summary: 'Standard entitlement is a Single Private A/C Room. Optionally upgrade to Any Room (no restriction) or downgrade to Twin Sharing A/C Room for premium adjustment.',
            badge: 'SINGLE PRIVATE A/C',
            iconType: 'home',
            videoTitle: 'Room Rent',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m15',
            title: 'Pre-Hospitalization',
            subtitle: '90 days of pre-hospitalization expenses covered.',
            summary: 'Medical expenses incurred up to 90 days before the date of hospitalization are covered — consultations, diagnostics, medications, and other related expenses.',
            badge: '90 DAYS',
            iconType: 'calendar',
            videoTitle: 'Pre-Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m16',
            title: 'Post-Hospitalization',
            subtitle: '180 days of post-hospitalization expenses covered.',
            summary: 'Medical expenses incurred up to 180 days after discharge from hospital are covered — follow-up consultations, medications, physiotherapy, and related recovery expenses.',
            badge: '180 DAYS',
            iconType: 'calendar',
            videoTitle: 'Post-Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m17',
            title: 'Donor Expenses',
            subtitle: 'Organ donor hospitalization covered up to Sum Insured with 30d pre/post and complication cover.',
            summary: 'Covers hospitalization expenses for the organ donor up to the Sum Insured. Includes 30 days pre-hospitalization and 30 days post-hospitalization. Complications arising from donor procedure covered up to 25% of Base SI, with a maximum of ₹2 Lakh.',
            badge: 'UP TO SUM INSURED',
            iconType: 'activity',
            videoTitle: 'Donor Expenses',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-m18',
            title: 'Non-Medical Items & Durable Medical Equipment',
            subtitle: 'Non-medical items up to SI; durable medical equipment up to ₹1 Lakh.',
            summary: 'Listed non-medical items (consumables) are covered up to the Sum Insured. Prescribed durable medical equipment (e.g., wheelchairs, crutches) required post-hospitalization is covered up to ₹1 Lakh.',
            badge: 'NMI: UP TO SI | DME: ₹1L',
            iconType: 'shield',
            videoTitle: 'Non-Medical Items & DME',
            videoUrl: DEMO_VIDEO_URL
          }
        ]
      },

      // --- SECTION 2: VALUE ADDED ---
      {
        id: 'sec-value-added',
        title: 'valueAdded',
        subtitle: 'Wellness rewards, premium discounts, and digital health services',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        items: [
          {
            id: 'sp-v1',
            title: 'Wellness Benefit',
            subtitle: 'Up to 20% renewal premium discount by achieving defined step milestones.',
            summary: 'Walk your way to savings — earn up to 20% discount on your renewal premium by achieving a defined number of daily steps tracked through the ManipalCigna wellness program.',
            badge: 'UP TO 20% DISCOUNT',
            iconType: 'smile',
            videoTitle: 'Wellness Benefit',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-v2',
            title: 'No Claim Discount',
            subtitle: 'Up to 7.5% discount based on consecutive claim-free policy years.',
            summary: 'Reward for staying healthy — earn up to 7.5% discount on renewal premium for each claim-free policy year.',
            badge: 'UP TO 7.5% DISCOUNT',
            iconType: 'trending',
            videoTitle: 'No Claim Discount',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-v3',
            title: 'Unlimited Tele-Consultation',
            subtitle: 'Unlimited consultations with a General Physician via tele-consultation.',
            summary: 'Access unlimited General Physician tele-consultations from the comfort of your home. Available for all insured members at any time.',
            badge: 'UNLIMITED GP ACCESS',
            iconType: 'users',
            videoTitle: 'Unlimited Tele-Consultation',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-v4',
            title: 'Network Provider Discount',
            subtitle: 'Discounts on Pharmacy, Diagnostics, and Health Supplements via partner network.',
            summary: "Enjoy discounts at ManipalCigna's partner network on pharmacy purchases, diagnostic tests, and health supplements — helping you manage day-to-day health expenses better.",
            badge: 'PHARMACY & LABS',
            iconType: 'credit',
            videoTitle: 'Network Provider Discount',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-v5',
            title: 'Health Check-up',
            subtitle: 'Annual cashless health check-up from the 1st policy year for insured persons aged 18+.',
            summary: 'Get a comprehensive annual cashless health check-up starting from the very first policy year (after the free-look period) for all insured members aged 18 years and above.',
            badge: 'ANNUAL (AGE 18+)',
            iconType: 'smile',
            videoTitle: 'Health Check-up',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-v6',
            title: 'Early Renewal Discount',
            subtitle: '2.5% discount for renewing at least 15 days before policy expiry.',
            summary: 'Plan ahead and save — renewing your policy at least 15 days before the expiry date earns you a 2.5% discount on the renewal premium.',
            badge: '2.5% DISCOUNT',
            iconType: 'clock',
            videoTitle: 'Early Renewal Discount',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-v7',
            title: 'Standing Instruction Discount',
            subtitle: '2.5% discount when renewal premium is via standing instruction.',
            summary: 'Set up a standing instruction for premium payment and enjoy a 2.5% additional discount on your renewal premium — hassle-free payment, extra savings.',
            badge: '2.5% DISCOUNT',
            iconType: 'credit',
            videoTitle: 'Standing Instruction Discount',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-v8',
            title: 'Long Term Policy Discount',
            subtitle: '2-year policy: 7.5% discount; 3-year policy: 10% discount.',
            summary: 'Choose a multi-year policy term and get rewarded with significant discounts — 7.5% for a 2-year term and 10% for a 3-year term.',
            badge: 'UP TO 10% DISCOUNT',
            iconType: 'calendar',
            videoTitle: 'Long Term Policy Discount',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-v9',
            title: 'Family Discount',
            subtitle: '10% discount for individual policies covering 2 or more family members.',
            summary: 'Insure your family together and save — a 10% discount applies when an individual policy covers 2 or more family members.',
            badge: '10% DISCOUNT',
            iconType: 'users',
            videoTitle: 'Family Discount',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-v10',
            title: '1st Policy Renewal Discount',
            subtitle: '5% discount on your first renewal.',
            summary: 'A special 5% discount is available on your first renewal — a thank you for choosing ManipalCigna Sarvah Param.',
            badge: '5% DISCOUNT',
            iconType: 'check',
            videoTitle: '1st Policy Renewal Discount',
            videoUrl: DEMO_VIDEO_URL
          }
        ]
      },

      // --- SECTION 3: ADDITIONAL ---
      {
        id: 'sec-additional',
        title: 'ADDITIONAL',
        subtitle: 'Maternity, accident covers, deductibles, co-pay, and sum insured options',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'sp-a1',
            title: 'Maternity & Newborn Hospitalization',
            subtitle: 'Maternity, newborn inpatient hospitalization & 1st year vaccination up to 20% Base SI (max ₹5L); 36-month waiting.',
            summary: 'Covers maternity hospitalization expenses, newborn baby inpatient hospitalization, and first-year vaccination costs. Limited to 20% of Base SI with a maximum of ₹5 Lakh. A 36-month waiting period applies.',
            badge: 'UP TO 20% (MAX ₹5L)',
            iconType: 'heart',
            videoTitle: 'Maternity & Newborn Hospitalization',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-a2',
            title: 'Personal Accident Plus',
            subtitle: 'Accidental Death and Permanent Disablement cover with Common Carrier benefit.',
            summary: 'Comprehensive Personal Accident cover for Accidental Death and Permanent Disablement (Total and Partial). Includes Common Carrier Benefit of 200% of opted SI in case of accidental death or permanent total disability while travelling as a fare-paying passenger.',
            badge: 'ACCIDENTAL COVER',
            iconType: 'shield',
            videoTitle: 'Personal Accident Plus',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-a3',
            title: 'Common Carrier Benefit',
            subtitle: '200% of opted Personal Accident SI for accidental death or permanent total disability while on a common carrier.',
            summary: 'If accidental death or permanent total disability occurs while travelling as a fare-paying passenger on a bus, train, aircraft, or other common carrier, the benefit paid is 200% of the opted Personal Accident SI.',
            badge: '200% OF PA SI',
            iconType: 'truck',
            videoTitle: 'Common Carrier Benefit',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-a4',
            title: 'Temporary Total Disablement (TTD)',
            subtitle: 'Fixed weekly benefit from ₹5,000 to ₹1 Lakh per week for up to 100 weeks.',
            summary: 'A fixed weekly income benefit in case of temporary total disablement due to an accident. Options range from ₹5,000 to ₹1 Lakh per week, payable for a maximum of 100 weeks.',
            badge: 'UP TO ₹1L/WEEK (100 WKS)',
            iconType: 'clock',
            videoTitle: 'Temporary Total Disablement (TTD)',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-a5',
            title: 'Air Ambulance',
            subtitle: 'Air ambulance charges covered up to SI, maximum ₹10 Lakh.',
            summary: 'Covers air ambulance expenses for emergency medical evacuation up to the Sum Insured, with an overall maximum of ₹10 Lakh per policy year.',
            badge: 'MAX ₹10L',
            iconType: 'zap',
            videoTitle: 'Air Ambulance',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-a6',
            title: 'Aggregate Deductible',
            subtitle: 'Options: ₹10K, ₹25K, ₹50K, ₹1L, ₹2L, ₹3L, ₹4L, ₹5L and ₹10L.',
            summary: 'An optional aggregate deductible that reduces the premium outgo. The deductible amount applies cumulatively across all claims in a policy year. Available in multiple options from ₹10,000 to ₹10 Lakh.',
            badge: '₹10K TO ₹10L',
            iconType: 'dollar',
            videoTitle: 'Aggregate Deductible',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-a7',
            title: 'Daily Deductible',
            subtitle: '₹1K, ₹2K, ₹3K, ₹4K and ₹5K per day of hospitalization.',
            summary: 'An optional per-day-of-hospitalization deductible. For each day of hospitalization, the selected daily deductible amount is borne by the insured. Options range from ₹1,000 to ₹5,000 per day.',
            badge: '₹1K TO ₹5K/DAY',
            iconType: 'calendar',
            videoTitle: 'Daily Deductible',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-a8',
            title: 'Voluntary Co-payment',
            subtitle: 'Voluntarily co-pay 10%, 20%, or 30% of each claim to reduce premium.',
            summary: 'Opt for a voluntary co-payment to reduce your renewal premium. The co-payment percentage (10%, 20%, or 30%) is applied on each admissible claim, with the rest settled by the insurer.',
            badge: '10% / 20% / 30%',
            iconType: 'credit',
            videoTitle: 'Voluntary Co-payment',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-a9',
            title: 'Base Sum Insured Options',
            subtitle: 'Wide range from ₹5 Lakh to ₹300 Lakh to suit every need.',
            summary: 'Choose from a comprehensive range of Base Sum Insured options: ₹5L, ₹7.5L, ₹10L, ₹15L, ₹20L, ₹25L, ₹50L, ₹100L, ₹200L, and ₹300L — ensuring coverage for every budget and life stage.',
            badge: '₹5L TO ₹300L',
            iconType: 'dollar',
            videoTitle: 'Base Sum Insured Options',
            videoUrl: DEMO_VIDEO_URL
          }
        ]
      },

      // --- SECTION 4: OPTIONAL ---
      {
        id: 'sec-optional',
        title: 'optional',
        subtitle: 'Customizable riders, elective covers, and flexible policy modifications',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        items: [
          {
            id: 'sp-o1',
            title: 'Personal Accident Cover',
            subtitle: 'Optional cover: Accidental Death & Permanent Disabilities. SI ₹10L to ₹3Cr. Common Carrier: 200% of opted SI.',
            summary: 'Optional Personal Accident cover for Accidental Death and Permanent Disabilities (Total and Partial). Sum Insured options from ₹10 Lakh to ₹3 Crore. Includes Common Carrier Accident Benefit of 200% of opted SI.',
            badge: '₹10L TO ₹3CR',
            iconType: 'shield',
            videoTitle: 'Personal Accident Cover',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-o2',
            title: 'Maternity & Newborn (Optional)',
            subtitle: 'Optional cover up to 20% Base SI (max ₹5L); 36-month waiting period.',
            summary: 'Optional maternity and newborn hospitalization cover. Limited to 20% of Base SI with a maximum of ₹5 Lakh. A 36-month waiting period applies before claims can be raised.',
            badge: 'OPTIONAL (36M WAITING)',
            iconType: 'heart',
            videoTitle: 'Maternity & Newborn (Optional)',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-o3',
            title: 'Air Ambulance (Optional)',
            subtitle: 'Optional air ambulance cover up to SI, maximum ₹10 Lakh.',
            summary: 'Optional air ambulance benefit for emergency evacuation, available as an add-on. Covered up to the Sum Insured with an overall maximum of ₹10 Lakh.',
            badge: 'OPTIONAL (MAX ₹10L)',
            iconType: 'zap',
            videoTitle: 'Air Ambulance (Optional)',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-o4',
            title: 'Temporary Total Disablement (Optional)',
            subtitle: 'Optional fixed weekly benefit: ₹5,000 to ₹1 Lakh per week; maximum 100 weeks.',
            summary: 'Optional TTD weekly benefit for accidental temporary total disablement. Choose from ₹5,000 to ₹1 Lakh per week, payable for up to 100 weeks.',
            badge: 'OPTIONAL TTD BENEFIT',
            iconType: 'clock',
            videoTitle: 'Temporary Total Disablement (Optional)',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-o5',
            title: 'Gullak (Optional)',
            subtitle: 'Optional feature: Base SI grows by 100% per policy year, irrespective of claims, up to 1500%.',
            summary: 'Optional Gullak benefit providing automatic 100% increase in Base SI every policy year regardless of claims, up to a maximum of 1500% of the original Base SI.',
            badge: 'OPTIONAL UP TO 1500%',
            iconType: 'dollar',
            videoTitle: 'Gullak (Optional)',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-o6',
            title: 'Unlimited Restoration (Optional)',
            subtitle: 'Optional unlimited restoration of Base SI for any illness/injury; not for 1st claim.',
            summary: 'Optional unlimited restoration feature. Once elected, Base SI is restored unlimited times whenever exhausted during the policy year for any illness or injury. Not applicable to the first claim of the year.',
            badge: 'OPTIONAL RESTORATION',
            iconType: 'refresh',
            videoTitle: 'Unlimited Restoration (Optional)',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-o7',
            title: 'Aggregate Deductible (Optional)',
            subtitle: 'Optional deductible from ₹10K to ₹10L to reduce premium.',
            summary: 'Optional aggregate deductible to lower your premium. The cumulative deductible applies across all claims in a policy year. Choose from ₹10K to ₹10L.',
            badge: '₹10K TO ₹10L',
            iconType: 'dollar',
            videoTitle: 'Aggregate Deductible (Optional)',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-o8',
            title: 'Daily Deductible (Optional)',
            subtitle: 'Optional per-day deductible: ₹1K to ₹5K per day of hospitalization.',
            summary: 'Optional per-day-of-hospitalization deductible. For each admitted day, the selected amount (₹1K–₹5K) is borne by the insured, reducing premium accordingly.',
            badge: '₹1K TO ₹5K/DAY',
            iconType: 'calendar',
            videoTitle: 'Daily Deductible (Optional)',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-o9',
            title: 'Voluntary Co-payment (Optional)',
            subtitle: 'Choose 10%, 20%, or 30% co-pay to reduce your premium.',
            summary: 'Opt for voluntary co-payment of 10%, 20%, or 30% on each claim to receive a corresponding reduction in premium.',
            badge: '10% / 20% / 30%',
            iconType: 'credit',
            videoTitle: 'Voluntary Co-payment (Optional)',
            videoUrl: DEMO_VIDEO_URL
          },
          {
            id: 'sp-o10',
            title: 'Pratiksha',
            subtitle: 'Optional: Applies Initial WP 30 days and Specific Disease WP 24 months instead of zero waiting.',
            summary: 'Pratiksha is an optional modification. By default, Sarvah Param comes with Zero Waiting Period (Tatkal Benefit). Selecting Pratiksha reverts to standard waiting periods — Initial WP: 30 days, Specific Disease WP: 24 months — which can lower the premium.',
            badge: 'OPTIONAL: 30D / 24M WP',
            iconType: 'clock',
            videoTitle: 'Pratiksha (Optional)',
            videoUrl: DEMO_VIDEO_URL
          }
        ]
      }
    ]
  }
};

/**
 * Retrieve plan-specific data for ManipalCigna plans.
 * Returns null for unknown plan IDs (no silent fallback to a different plan).
 */
export const getManipalCignaPlanData = (planId) => {
  const canonicalId = resolveManipalCignaPlanId(planId);
  return MANIPAL_CIGNA_PLANS_DATA[canonicalId] || null;
};

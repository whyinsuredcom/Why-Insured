// =============================================================================
// ADITYA BIRLA HEALTH INSURANCE — DATA CONFIGURATION
// Plan: One Max → one-max
//
// Single source of truth for Aditya Birla Health Insurance plans.
// Theme:
// - Primary Red: #D51D25
// - Vibrant Orange: #F68529
// - Fresh Gold / Yellow: #F5D34F
// - Primary Dark Text: #0F172A
// - Secondary Text: #475569
// =============================================================================

export const ADITYA_BIRLA_CANONICAL_PLAN_IDS = [
  'one-max',
  'activ-one-vytl',
  'activ-yuva',
  'activ-one-max-plus',
  'activ-one-max',
  'onemax',
  'vytl',
  'activ-one-vytl-plus',
  'one-vytl',
  'yuva',
  'activ_yuva',
  'activyuva'
];

export const resolveAdityaBirlaPlanId = (planId) => {
  if (!planId) return null;
  const cleanId = String(planId).toLowerCase().trim().replace(/_/g, '-').replace(/\+/g, '-plus');
  if (
    cleanId === 'activ-yuva' ||
    cleanId === 'yuva' ||
    cleanId === 'activ_yuva' ||
    cleanId === 'activyuva'
  ) {
    return 'activ-yuva';
  }
  if (
    cleanId === 'activ-one-vytl' ||
    cleanId === 'vytl' ||
    cleanId === 'one-vytl' ||
    cleanId === 'activ-one-vytl-plus' ||
    cleanId === 'activonevytl' ||
    cleanId === 'activ_one_vytl'
  ) {
    return 'activ-one-vytl';
  }
  if (
    cleanId === 'activ-one-max-plus' ||
    cleanId === 'one-max-plus' ||
    cleanId === 'activonemaxplus' ||
    cleanId === 'activ_one_max_plus' ||
    cleanId === 'activ-one-max+' ||
    cleanId === 'one-max+'
  ) {
    return 'activ-one-max-plus';
  }
  if (
    cleanId === 'one-max' ||
    cleanId === 'activ-one-max' ||
    cleanId === 'onemax' ||
    cleanId === 'activonemax' ||
    cleanId === 'activ_one_max'
  ) {
    return 'one-max';
  }
  return cleanId;
};

export const DEMO_VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

export const ADITYA_BIRLA_PLANS_DATA = {
  // ===========================================================================
  // PLAN: ONE MAX (ADITYA BIRLA HEALTH INSURANCE)
  // ===========================================================================
  'one-max': {
    planId: 'one-max',
    planName: 'One Max',
    fullName: 'Aditya Birla Health Insurance One Max',
    companyName: 'Aditya Birla Health Insurance',
    tagline: 'Comprehensive Health Protection with 100% Super Credit & Unlimited Super Reload',
    coverage: '₹10 Lakh - ₹3 Crore',
    premium: '',
    categoryBadge: 'Health Policy',
    policySubtitle: 'Aditya Birla Health Insurance Policy',

    // --- NAVIGATION & BUTTON LABELS ---
    backToPlansLabel: 'Back to Aditya Birla Plans',
    backToPlanLabel: 'Back to One Max',
    featuresHeadingSuffix: 'POLICY BENEFITS',
    policyBenefitsButtonLabel: 'POLICY BENEFITS',
    reportCardButtonLabel: 'REPORT CARD',
    companyStrengthButtonLabel: 'COMPANY STRENGTH',
    limitationsButtonLabel: 'LIMITATIONS & WAITING PERIODS',
    mustKnowButtonLabel: 'MUST KNOW DETAILS',
    termsFootnote: '*Terms & Conditions Apply',

    // --- PLAN-SPECIFIC UI CONFIG ---
    uiConfig: {
      primaryColor: '#D51D25',
      secondaryColor: '#F68529',
      accentColor: '#F5D34F',
      textColor: '#0F172A',
      secondaryTextColor: '#475569',
      demoVideoUrl: DEMO_VIDEO_URL
    },

    // --- SUMMARY BENEFITS & DETAILS (USED IN COMPARISONS & LISTINGS) ---
    benefits: [
      'Hospitalization & Room Rent: Actuals up to Sum Insured',
      'No Limit on ICU / ICCU Charges',
      'Pre & Post Hospitalization: 90 & 180 Days Covered',
      'Super Reload: Unlimited Refill from 2nd Claim Onwards',
      'Super Credit: 100% Growth Every Year up to 500% (Max ₹3 Crore)',
      'Claim Protect: 100% Consumables & Non-Medical Expense Waiver',
      'HealthReturns™: Earn up to 100% Premium Back by Staying Active',
      'Chronic Care: Day 1 In-patient Hospitalization for 7 Conditions'
    ],
    details: {
      eligibility: 'Adults: 18 to 65 Years | Children: 91 days to 25 years',
      waitingPeriod: '30 Days Initial, 24 Months Specific Ailments, 36 Months PED (Day 1 for Chronic Care)',
      roomRent: 'Single Private Room / Category Opted (Actuals up to SI)',
      hospitalization: 'Covered up to Full Sum Insured',
      prePostHospital: '90 Days Pre & 180 Days Post Hospitalization',
      dayCare: 'All Day Care Treatments & Modern Procedures Covered',
      noClaimBonus: 'Super Credit: 100% Base SI Added Every Year (Max 500% up to ₹3 Crore)',
      exclusions: 'Cosmetic surgery, intentional self-injury, adventure sports, unproven treatments'
    },

    // =========================================================================
    // 1. REPORT CARD (ADITYA BIRLA HEALTH INSURANCE PERFORMANCE METRICS)
    // =========================================================================
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Aditya Birla Health Insurance Performance',
      description: 'Official claim settlement track record and operational metrics.',

      csr: {
        title: 'CSR',
        summaryValue: '95.8%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR represents the percentage of claims settled by Aditya Birla Health Insurance with streamlined cashless approvals across 11,000+ network hospitals.',
        singleYear: '95.8%',
        singleYearLabel: 'Recent Single Year',
        threeYearAvg: '94.6%',
        threeYearAvgLabel: '3 Year Average',
        videoTitle: 'CSR Metrics',
        videoUrl: DEMO_VIDEO_URL
      },

      icr: {
        title: 'ICR',
        summaryValue: '64.2%',
        subtitle: 'Incurred Claim Ratio',
        explanation: 'ICR measures the total claims paid out as a percentage of total net earned premiums, indicating robust underwriting discipline and long-term sustainability.',
        range: '60% → 68%',
        rangeLabel: 'Incurred Claim Ratio',
        videoTitle: 'ICR Metrics',
        videoUrl: DEMO_VIDEO_URL
      },

      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        summaryValue: '12 / 10,000',
        subtitle: 'Complaints per 10,000 Claims',
        explanation: 'Low complaint ratio reflects high customer satisfaction, responsive digital claims settlement, and transparent dispute resolution mechanisms.',
        volume: '12 Complaints per 10,000 Claims',
        volumeLabel: 'Average Grievance Frequency',
        resolutionRate: '99.4%',
        resolutionRateLabel: 'Grievance Resolution Rate',
        videoTitle: 'Grievance Resolution',
        videoUrl: DEMO_VIDEO_URL
      }
    },

    // =========================================================================
    // 2. COMPANY STRENGTH (FINANCIAL SOUNDNESS & PROMOTER PROFILE)
    // =========================================================================
    companyStrength: {
      heading: 'COMPANY STRENGTH',
      subheading: 'Institutional Strength & Promoters',
      description: 'Backed by one of India\'s largest conglomerates with global financial backing.',

      ownership: {
        title: 'PROMOTERS & OWNERSHIP',
        summaryValue: 'Aditya Birla Capital 51% | MMI 49%',
        explanation: 'Aditya Birla Health Insurance is a joint venture between the Fortune 500 Aditya Birla Group (Aditya Birla Capital Limited) and South Africa\'s leading financial conglomerate Momentum Metropolitan Holdings (MMI).',
        promoters: [
          { name: 'Aditya Birla Capital Limited (India)', value: '51%', label: 'Majority Promoter' },
          { name: 'Momentum Metropolitan Holdings (South Africa)', value: '49%', label: 'Strategic Partner' }
        ]
      },

      creditRating: {
        title: 'SOLVENCY RATIO',
        summaryValue: '1.92x',
        explanation: 'Maintains a strong solvency margin of 1.92x against the IRDAI mandatory benchmark of 1.50x, ensuring ample capital reserve to pay all policyholder claims.',
        rating: '1.92x Solvency Margin (IRDAI mandated: 1.50x)'
      },

      capitalStrength: {
        title: 'CAPITAL & ASSETS',
        summaryValue: '₹3,000+ Cr AUM',
        explanation: 'High capital base and continuous financial growth supporting extensive healthcare infrastructure, wellness reward programs, and digital claim processing.',
        aum: '₹3,000+ Crore Assets Under Management'
      },

      financialBase: {
        title: 'HOSPITAL NETWORK',
        summaryValue: '11,000+ Hospitals',
        explanation: 'Wide network across Tier 1, Tier 2, and Tier 3 cities offering 100% cashless hospitalization, direct cashless OPD, and dedicated claim desks.',
        hospitals: '11,000+ Network Hospitals across India'
      },

      reinsurance: {
        title: 'WELLNESS INTEGRATION',
        summaryValue: 'HealthReturns™ Ecosystem',
        explanation: 'Pioneering health insurance that incentivizes active lifestyles, allowing policyholders to earn up to 100% of their premium back through healthy habits.',
        features: 'Earn up to 100% Premium Back via HealthReturns™'
      },

      marketPosition: {
        title: 'INDUSTRY LEADERSHIP',
        summaryValue: 'Top Pure-Play Health Insurer',
        explanation: 'Recognized for product innovation, comprehensive chronic disease management, and customer-centric health management solutions.',
        standing: 'Fastest growing standalone health insurance specialist'
      }
    },

    // =========================================================================
    // 3. LIMITATIONS & WAITING PERIODS
    // =========================================================================
    limitationsSection: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Standard Policy Waiting Periods & Exclusions',
      description: 'Clearly outlined statutory waiting periods, condition-specific terms, and policy exclusions.',

      limitations: [
        {
          id: 'initial-waiting-period',
          title: 'Initial 30 Days Waiting Period',
          period: '30 Days',
          description: 'No claims are admissible for any illness during the first 30 days from policy inception, except for accidental bodily injuries requiring hospitalization.',
          policyRef: 'Section 4.1 — Initial Waiting Period'
        },
        {
          id: 'specific-ailment-waiting-period',
          title: 'Specific Disease Waiting Period (24 Months)',
          period: '24 Months (2 Years)',
          description: 'Standard 24-month waiting period applies to listed specific ailments including Cataract, Hernia, Hydrocele, Joint Replacements, ENT disorders, and benign growths (can be reduced to 1 year via optional rider).',
          policyRef: 'Section 4.2 — Specific Disease Schedule'
        },
        {
          id: 'ped-waiting-period',
          title: 'Pre-Existing Disease (PED) Waiting Period',
          period: '36 Months (3 Years)',
          description: 'Pre-existing medical conditions declared at the time of proposal are covered after 36 months of continuous coverage (can be reduced to 24 or 12 months with optional rider, or Day 1 for 7 listed chronic conditions under Chronic Care).',
          policyRef: 'Section 4.3 — Pre-Existing Disease Clause'
        },
        {
          id: 'critical-illness-waiting-period',
          title: 'Critical Illness Rider Waiting Period',
          period: '60 Days Initial / 1.5 Days Survival',
          description: 'If Critical Illness Cover rider is opted, an initial waiting period of 60 days applies, followed by a minimum survival period of 1.5 days from diagnosis date.',
          policyRef: 'Section 4.4 — Critical Illness Add-On Schedule'
        },
        {
          id: 'standard-exclusions',
          title: 'Standard Policy Exclusions',
          period: 'Permanent Exclusions',
          description: 'Expenses related to cosmetic surgery, intentional self-injury, drug or alcohol abuse, adventure sports, experimental treatments, and breach of law are permanently excluded.',
          policyRef: 'Section 5 — Permanent Exclusions (IRDAI Guidelines)'
        }
      ]
    },

    // =========================================================================
    // 4. MUST KNOW DETAILS (SPECIAL HIGHLIGHTS)
    // =========================================================================
    mustKnow: {
      heading: 'MUST KNOW DETAILS',
      subheading: 'Crucial Highlights for Aditya Birla One Max',
      buttonLabel: 'MUST KNOW DETAILS',
      items: [
        {
          id: 'mk-super-credit',
          title: '100% Super Credit Every Year',
          highlight: 'Up to 500% Sum Insured (Max ₹3 Crore)',
          description: 'Your Base Sum Insured increases by 100% every policy year irrespective of whether you make a claim or not, accumulating up to a massive 500% of Base SI.'
        },
        {
          id: 'mk-super-reload',
          title: 'Unlimited Super Reload',
          highlight: 'Available Unlimited Times from 2nd Claim Onwards',
          description: '100% Base Sum Insured is restored automatically from the second claim onwards, giving unlimited refills for both related and unrelated illnesses throughout policy life.'
        },
        {
          id: 'mk-health-returns',
          title: 'HealthReturns™ Benefit',
          highlight: 'Earn up to 100% of Premium Back',
          description: 'Stay healthy, complete monthly Active Dayz™, and get rewarded with up to 100% of your annual premium returned to use for renewal discounts, OPD bills, or pharmacy.'
        },
        {
          id: 'mk-claim-protect',
          title: 'Claim Protect (Non-Medical Items Waiver)',
          highlight: '100% Covered Across All 4 Lists of Annexure 1',
          description: 'Non-medical expenses and consumables (gloves, PPE kits, oxygen masks, syringes, etc.) are 100% covered, eliminating out-of-pocket hospital deductions.'
        },
        {
          id: 'mk-chronic-care',
          title: 'Day 1 Chronic Care Coverage',
          highlight: 'Waiting Period Waived for 7 Major Conditions',
          description: 'Initial and Pre-Existing Disease waiting periods are completely waived for Diabetes, Hypertension, Asthma, Hyperlipidemia, COPD, Obesity, and CAD (PTCA > 1 yr).'
        }
      ]
    },

    // =========================================================================
    // 5. POLICY BENEFITS (EXACT FOUR CATEGORIES)
    // 1. Most Important (18 items)
    // 2. Value Added (7 items)
    // 3. Additional (4 items)
    // 4. Optional (7 items)
    // =========================================================================
    featuresSections: [
      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 1: MOST IMPORTANT
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-most-important',
        title: 'MOST IMPORTANT',
        isProminent: true,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'onemax-hospitalization',
            title: 'Hospitalization',
            subtitle: 'In-patient Hospitalization Treatment',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured',
              'Covers doctor fees, surgeon charges, nursing, anesthesia, blood, oxygen, and operation theatre expenses',
              'Complete protection for inpatient hospital stays exceeding 24 hours'
            ],
            badge: 'UP TO SUM INSURED',
            isProminent: true,
            iconType: 'home'
          },
          {
            id: 'onemax-room-rent',
            title: 'Room Rent',
            subtitle: 'Single Private Room / Category Opted',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured',
              'No proportionate deduction on hospital room charges',
              'Full cashless facility across 11,000+ network hospitals'
            ],
            badge: 'ACTUALS UP TO SI',
            isProminent: true,
            iconType: 'home'
          },
          {
            id: 'onemax-icu-charges',
            title: 'ICU Charges',
            subtitle: 'Zero ICU / ICCU Capping',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured',
              'No daily limit on Intensive Care Unit (ICU) and Intensive Cardiac Care Unit (ICCU) room charges',
              'Covers specialist monitoring and critical care equipment expenses'
            ],
            badge: 'NO ICU LIMIT',
            isProminent: true,
            iconType: 'shield'
          },
          {
            id: 'onemax-road-ambulance',
            title: 'Road Ambulance Cover',
            subtitle: 'Emergency Medical Transit',
            summary: 'Per hospitalization, actuals up to Sum Insured.',
            points: [
              'Per hospitalization, actuals up to Sum Insured',
              'Covers emergency road ambulance transit to nearest hospital with adequate medical facilities',
              'Includes inter-hospital transfer when prescribed by attending medical practitioner'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'truck'
          },
          {
            id: 'onemax-day-care',
            title: 'Day Care Treatments',
            subtitle: 'Advanced Medical Procedures (< 24 hrs)',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured',
              'All day care procedures requiring less than 24 hours hospitalization due to technological advancements are covered',
              'Includes dialysis, radiotherapy, chemotherapy, eye surgeries, and minor surgical procedures'
            ],
            badge: 'ALL PROCEDURES',
            iconType: 'cpu'
          },
          {
            id: 'onemax-modern-procedures',
            title: 'Modern Procedures / Treatments',
            subtitle: 'Robotic & Modern Advanced Surgeries',
            summary: 'Actuals up to Sum Insured for listed procedures.',
            points: [
              'Actuals up to Sum Insured for listed procedures',
              'Covers Robotic Surgeries, Balloon Sinuplasty, Oral Chemotherapy, Deep Brain Stimulation, and Intra-vitreal Injections',
              'No sub-limits on cutting-edge medical technologies'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'cpu'
          },
          {
            id: 'onemax-hiv-aids-std',
            title: 'HIV/AIDS and STD Cover',
            subtitle: 'Inpatient Medical Management & Treatment',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured',
              'Covers inpatient hospitalization and medical management expenses for HIV/AIDS and Sexually Transmitted Diseases',
              'Confidential and supportive claims processing'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'heart'
          },
          {
            id: 'onemax-mental-illness',
            title: 'Mental Illness Hospitalization',
            subtitle: 'Inpatient Psychiatric & Mental Healthcare',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured',
              'Inpatient hospitalization for mental illness covered in accordance with the Mental Healthcare Act, 2017',
              'Covers psychiatric treatments, clinical consultations, and nursing care'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'smile'
          },
          {
            id: 'onemax-obesity-treatment',
            title: 'Obesity Treatment',
            subtitle: 'Surgical Bariatric Hospitalization',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured',
              'Hospitalization expenses for surgical treatment of obesity (Bariatric Surgery) covered as per medical necessity criteria',
              'Helps manage life-threatening co-morbidities'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'activity'
          },
          {
            id: 'onemax-pre-hospitalization',
            title: 'Pre-Hospitalization Expenses',
            subtitle: '90 Days Pre-Admission Medical Expenses',
            summary: 'Covered up to Sum Insured for 90 days.',
            points: [
              'Covered up to Sum Insured for 90 days',
              'Includes specialist consultations, diagnostic tests, pathology, and medicines directly related to the hospitalization'
            ],
            badge: '90 DAYS',
            iconType: 'calendar'
          },
          {
            id: 'onemax-post-hospitalization',
            title: 'Post-Hospitalization Expenses',
            subtitle: '180 Days Post-Discharge Recovery Expenses',
            summary: 'Covered up to Sum Insured for 180 days.',
            points: [
              'Covered up to Sum Insured for 180 days',
              'Covers follow-up consultations, diagnostic investigations, rehabilitation, and prescribed medicines'
            ],
            badge: '180 DAYS',
            iconType: 'calendar'
          },
          {
            id: 'onemax-claim-protect',
            title: 'Claim Protect (Non-Medical Expense Waiver)',
            subtitle: 'Zero Deduction on Consumables & Non-Payable Items',
            summary: 'Non-payable items covered, including all 4 lists of Annexure 1.',
            points: [
              'Non-payable items covered, including all 4 lists of Annexure 1',
              'Covers gloves, masks, PPE kits, nebulization kits, oxygen masks, syringes, and all consumable hospital items',
              'Ensures zero out-of-pocket expenses on hospital consumables'
            ],
            badge: '100% CONSUMABLES',
            isProminent: true,
            iconType: 'shield'
          },
          {
            id: 'onemax-domiciliary',
            title: 'Domiciliary Hospitalization',
            subtitle: 'In-Home Treatment for Acute Medical Care',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured',
              'Medical treatment taken at home when the patient cannot be safely moved to a hospital or hospital beds are unavailable',
              'Continuous medical supervision and prescribed home care covered'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'home'
          },
          {
            id: 'onemax-home-health-care',
            title: 'Home Health Care',
            subtitle: 'Physician-Prescribed In-Home Clinical Care',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured',
              'Covers qualified nurse visits, IV infusions, wound dressing, and continuous nursing care at home'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'heart'
          },
          {
            id: 'onemax-ayush-treatment',
            title: 'AYUSH Treatment',
            subtitle: 'Alternative Medicine Inpatient Care',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured',
              'In-patient treatment taken in Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy recognized hospitals covered without sub-limits'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'activity'
          },
          {
            id: 'onemax-organ-donor',
            title: 'Organ Donor Expenses',
            subtitle: 'Inpatient Harvesting Surgery for Donor',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured',
              'Inpatient hospitalization expenses incurred on the donor for harvesting organ for insured recipient'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'heart'
          },
          {
            id: 'onemax-super-reload',
            title: 'Super Reload',
            subtitle: 'Unlimited Refill from 2nd Claim Onwards',
            summary: 'From the 2nd claim onwards, Base Sum Insured gets restored and is available unlimited times during policy life.',
            points: [
              'From the 2nd claim onwards, Base Sum Insured gets restored and is available unlimited times during policy life',
              'Can be utilized for unrelated and related illnesses as per policy guidelines',
              'Ensures the family never runs out of coverage in a policy year'
            ],
            badge: 'UNLIMITED RELOAD',
            isProminent: true,
            iconType: 'refresh'
          },
          {
            id: 'onemax-super-credit',
            title: 'Super Credit',
            subtitle: '100% Growth Every Year up to 500% (Max ₹3 Crore)',
            summary: 'Base Sum Insured increases by 100% every year irrespective of claims, up to 500% of Base Sum Insured, subject to a maximum benefit of ₹3 Crore.',
            points: [
              'Base Sum Insured increases by 100% every year irrespective of claims',
              'Accumulates up to 500% of Base Sum Insured',
              'Subject to a maximum benefit of ₹3 Crore',
              'Zero reduction in Super Credit even if claims are made in between'
            ],
            badge: '100% PER YEAR (MAX 500%)',
            isProminent: true,
            iconType: 'trending'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 2: VALUE ADDED
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-value-added',
        title: 'valueAdded',
        isProminent: false,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'onemax-annual-health-checkup',
            title: 'Annual Health Check-up',
            subtitle: 'Complimentary Preventive Screening',
            summary: 'Listed and cashless health check-up.',
            points: [
              'Listed and cashless health check-up',
              'Available for all insured members covered under the policy annually',
              'Includes vital diagnostic blood tests, lipid profile, and general check-up'
            ],
            badge: 'CASHLESS SCREENING',
            iconType: 'clipboard'
          },
          {
            id: 'onemax-health-assessment',
            title: 'Health Assessment™',
            subtitle: 'Annual Digital / Empanelled Health Profiling',
            summary: 'Applicable once in a policy year through Network Providers / Empanelled Service Providers on a cashless or digital basis.',
            points: [
              'Applicable once in a policy year through Network Providers / Empanelled Service Providers on a cashless or digital basis',
              'Comprehensive evaluation of biometric parameters and vital health scores'
            ],
            badge: 'ANNUAL ASSESSMENT',
            iconType: 'activity'
          },
          {
            id: 'onemax-health-returns',
            title: 'HealthReturns™',
            subtitle: 'Earn up to 100% Premium Back by Staying Active',
            summary: 'Health management benefit applicable up to 100% of the premium, as per applicable program terms.',
            points: [
              'Health management benefit applicable up to 100% of the premium, as per applicable program terms',
              'Track Active Dayz™ through fitness app or wearable integration',
              'Redeem earned HealthReturns™ for renewal premium discount, OPD expenses, or medicines'
            ],
            badge: 'UP TO 100% PREMIUM',
            isProminent: true,
            iconType: 'dollar'
          },
          {
            id: 'onemax-chronic-management-opd',
            title: 'Chronic Management Program (OPD)',
            subtitle: 'Cashless OPD Consultations, Tests & Medicines',
            summary: 'Available on a cashless basis.',
            points: [
              'Available on a cashless basis',
              'Dedicated doctor consultations, routine diagnostic lab tests, and maintenance pharmacy for chronic condition management',
              'Specialist network support for ongoing chronic care management'
            ],
            badge: 'CASHLESS OPD',
            iconType: 'heart'
          },
          {
            id: 'onemax-second-medical-opinion',
            title: 'Second Medical Opinion',
            subtitle: 'Global & National Specialist Case Review',
            summary: 'Applicable for listed major illnesses.',
            points: [
              'Applicable for listed major illnesses',
              'Independent second medical opinion from leading specialists and medical boards without touching your Sum Insured'
            ],
            badge: 'MAJOR ILLNESSES',
            iconType: 'users'
          },
          {
            id: 'onemax-cancer-screening-package',
            title: 'Annual Screening Package for Cancer Diagnosed Patients',
            subtitle: 'Specialized Annual Oncological Surveillance',
            summary: 'Up to ₹10,000 per member per policy year.',
            points: [
              'Up to ₹10,000 per member per policy year',
              'Dedicated screening tests, tumor markers, and oncologist consultations for patients diagnosed with cancer'
            ],
            badge: '₹10,000 / YEAR',
            iconType: 'shield'
          },

        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 3: ADDITIONAL
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-additional',
        title: 'ADDITIONAL',
        isProminent: false,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'onemax-chronic-care-day1',
            title: 'Chronic Care (Day 1 In-patient Hospitalization)',
            subtitle: 'Zero Waiting Period for 7 Listed Chronic Conditions',
            summary: 'Initial Waiting Period and Pre-Existing Disease Waiting Period are waived for listed chronic conditions.',
            points: [
              'Initial Waiting Period and Pre-Existing Disease Waiting Period are waived for listed chronic conditions',
              'Diabetes',
              'Hypertension',
              'Asthma',
              'Hyperlipidemia',
              'COPD',
              'Obesity',
              'Coronary Artery Disease, where PTCA was done prior to 1 year'
            ],
            badge: 'DAY 1 COVERAGE',
            isProminent: true,
            iconType: 'heart'
          },
          {
            id: 'onemax-cancer-booster',
            title: 'Cancer Booster',
            subtitle: 'Enhanced Pre, Post & Day Care Oncological Protection',
            summary: 'Covers Pre-Hospitalization medical expenses, Post-Hospitalization medical expenses, Day Care Treatment up to Sum Insured. Coverage: Up to 100% of Base Policy Sum Insured.',
            points: [
              'Covers Pre-Hospitalization medical expenses',
              'Covers Post-Hospitalization medical expenses',
              'Covers Day Care Treatment up to Sum Insured',
              'Coverage: Up to 100% of Base Policy Sum Insured'
            ],
            badge: 'UP TO 100% BASE SI',
            iconType: 'shield'
          },
          {
            id: 'onemax-durable-equipment',
            title: 'Durable Equipment Cover',
            subtitle: 'Medical Assistive & Life Support Equipment',
            summary: 'Covers listed equipment with a combined sub-limit of ₹5 Lakh or Sum Insured, whichever is lower.',
            points: [
              'Covers listed equipment with a combined sub-limit of ₹5 Lakh or Sum Insured, whichever is lower',
              'Ventilator',
              'Wheelchair',
              'Prosthetic Device',
              'Suction Machine',
              'Commode Chairs',
              'Infusion Pump',
              'Continuous Passive Motion Devices in case of Knee Replacement',
              'Oxygen Concentrator'
            ],
            badge: '₹5 LAKH / SI LIMIT',
            iconType: 'cpu'
          },
          {
            id: 'onemax-compassionate-visit',
            title: 'Compassionate Visit',
            subtitle: 'Immediate Family Member Travel Assistance',
            summary: 'Up to ₹50,000 towards two-way travel fare if hospitalization exceeds 10 days.',
            points: [
              'Up to ₹50,000 towards two-way travel fare if hospitalization exceeds 10 days',
              'Reimburses economy airfare or first-class train fare for an immediate family member to visit the hospitalized insured'
            ],
            badge: 'UP TO ₹50,000',
            iconType: 'truck'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 4: OPTIONAL
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-optional',
        title: 'optional',
        isProminent: false,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'onemax-opt-specific-disease-reduction',
            title: 'Reduction in Specific Disease Waiting Period',
            subtitle: 'Specific Ailment Waiting Period Reduction',
            summary: 'Reduced from 2 Years to 1 Year.',
            points: [
              'Reduced from 2 Years to 1 Year',
              'Covers 24-month listed conditions (cataract, hernia, joint replacement, etc.) after only 12 months'
            ],
            badge: '2 YRS → 1 YR',
            isRider: true,
            iconType: 'clock'
          },
          {
            id: 'onemax-opt-ped-reduction',
            title: 'Reduction in Pre-Existing Disease Waiting Period',
            subtitle: 'Accelerated PED Coverage Options',
            summary: 'Option 1: 3 Years to 2 Years | Option 2: 3 Years to 1 Year.',
            points: [
              'Option 1: 3 Years to 2 Years',
              'Option 2: 3 Years to 1 Year',
              'Significantly shortens waiting periods for pre-existing declared illnesses'
            ],
            badge: 'OPTIONAL RIDER',
            isRider: true,
            iconType: 'clock'
          },
          {
            id: 'onemax-opt-room-rent-type',
            title: 'Room Rent Type Options',
            subtitle: 'Customizable Hospital Accommodation Category',
            summary: 'Option 1: Single Private Room | Option 2: Shared Accommodation.',
            points: [
              'Option 1: Single Private Room',
              'Option 2: Shared Accommodation',
              'Select room category according to healthcare preference and budget'
            ],
            badge: 'ROOM TYPE OPTIONS',
            isRider: true,
            iconType: 'home'
          },
          {
            id: 'onemax-opt-claim-deductible',
            title: 'Per Claim Deductible',
            subtitle: 'Voluntary Deductible for Substantial Premium Discount',
            summary: 'Option 1: ₹15,000 | Option 2: ₹25,000.',
            points: [
              'Option 1: ₹15,000',
              'Option 2: ₹25,000',
              'Opt for per-claim deductible to reduce overall annual policy premium'
            ],
            badge: '₹15K / ₹25K DEDUCTIBLE',
            isRider: true,
            iconType: 'credit'
          },
          {
            id: 'onemax-opt-ppn-discount',
            title: 'Preferred Provider Network (PPN) Discount',
            subtitle: '10% Annual Premium Saving Option',
            summary: '10% discount applicable.',
            points: [
              '10% discount applicable',
              'Get 10% lower annual premium by choosing treatment at Aditya Birla PPN hospitals'
            ],
            badge: '10% DISCOUNT',
            isRider: true,
            iconType: 'dollar'
          },
          {
            id: 'onemax-opt-critical-illness',
            title: 'Critical Illness Cover',
            subtitle: 'Lump-Sum Financial Compensation on Major Illness Diagnosis',
            summary: 'Base Sum Insured options: ₹10 Lakh, ₹15 Lakh, ₹20 Lakh, ₹25 Lakh. Initial Waiting Period: 60 Days. Survival Period: 1.5 Days.',
            points: [
              'Base Sum Insured options: ₹10 Lakh, ₹15 Lakh, ₹20 Lakh, ₹25 Lakh',
              'Initial Waiting Period: 60 Days',
              'Survival Period: 1.5 Days',
              'Provides 100% lump-sum compensation on first diagnosis of covered critical illnesses'
            ],
            badge: 'UP TO ₹25 LAKH',
            isRider: true,
            iconType: 'shield'
          },
          {
            id: 'onemax-opt-personal-accident',
            title: 'Personal Accident Cover',
            subtitle: '24x7 Worldwide Accidental Protection & Disability Cover',
            summary: 'Covers Accidental Death, Permanent Total Disability, Permanent Partial Disability. Sum Insured options: ₹10 Lakh, ₹15 Lakh, ₹20 Lakh, ₹25 Lakh, ₹50 Lakh.',
            points: [
              'Covers: Accidental Death, Permanent Total Disability, Permanent Partial Disability',
              'Sum Insured options: ₹10 Lakh, ₹15 Lakh, ₹20 Lakh, ₹25 Lakh, ₹50 Lakh',
              'Comprehensive protection for accidental bodily injuries and disability compensation'
            ],
            badge: 'UP TO ₹50 LAKH',
            isRider: true,
            iconType: 'shield'
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // PLAN: ACTIV ONE VYTL (ADITYA BIRLA HEALTH INSURANCE)
  // ===========================================================================
  'activ-one-vytl': {
    planId: 'activ-one-vytl',
    planName: 'Activ One VYTL',
    fullName: 'Aditya Birla Health Insurance Activ One VYTL',
    companyName: 'Aditya Birla Health Insurance',
    tagline: 'Comprehensive Health Shield with Day 1 Chronic Care & HealthReturns™',
    coverage: '₹5 Lakh - ₹2 Crore',
    premium: '',
    categoryBadge: 'Health Policy',
    policySubtitle: 'Aditya Birla Health Insurance Policy',

    // --- NAVIGATION & BUTTON LABELS ---
    backToPlansLabel: 'Back to Aditya Birla Plans',
    backToPlanLabel: 'Back to Activ One VYTL',
    featuresHeadingSuffix: 'POLICY BENEFITS',
    policyBenefitsButtonLabel: 'POLICY BENEFITS',
    reportCardButtonLabel: 'REPORT CARD',
    companyStrengthButtonLabel: 'COMPANY STRENGTH',
    limitationsButtonLabel: 'LIMITATIONS & WAITING PERIODS',
    mustKnowButtonLabel: 'MUST KNOW DETAILS',
    termsFootnote: '*Terms & Conditions Apply',

    // --- PLAN-SPECIFIC UI CONFIG ---
    uiConfig: {
      primaryColor: '#D51D25',
      secondaryColor: '#F68529',
      accentColor: '#F5D34F',
      textColor: '#0F172A',
      secondaryTextColor: '#475569',
      demoVideoUrl: DEMO_VIDEO_URL
    },

    // --- SUMMARY BENEFITS & DETAILS (USED IN COMPARISONS & LISTINGS) ---
    benefits: [
      'Hospitalization & Room Rent: Actuals up to Sum Insured',
      'Zero Limit on ICU / ICCU Charges',
      'Pre & Post Hospitalization: 90 & 180 Days Covered',
      'Super Reload: Unlimited Restorations from 2nd Claim Onwards',
      'Super Credit: 100% Guaranteed Cumulative Bonus Every Year',
      'Claim Protect: 100% Non-Medical Expense & Consumables Waiver',
      'Chronic Care: Day 1 In-patient Hospitalization for 7 Conditions',
      'HealthReturns™: Earn up to 100% Premium Cashback'
    ],
    details: {
      eligibility: 'Adults: 18 to 65 Years | Children: 91 days to 25 years',
      waitingPeriod: '30 Days Initial, 24 Months Specific Ailments, 36 Months PED (Day 1 for Chronic Care)',
      roomRent: 'Single Private Room / Category Opted (Actuals up to SI)',
      hospitalization: 'Covered up to Full Sum Insured',
      prePostHospital: '90 Days Pre & 180 Days Post Hospitalization',
      dayCare: 'All Day Care Treatments & Modern Procedures Covered',
      noClaimBonus: 'Super Credit: 100% Base SI Added Every Year (Max 500% up to ₹3 Crore)',
      exclusions: 'Cosmetic surgery, intentional self-injury, adventure sports, unproven treatments'
    },

    // =========================================================================
    // 1. REPORT CARD (ADITYA BIRLA HEALTH INSURANCE PERFORMANCE METRICS)
    // =========================================================================
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Aditya Birla Health Insurance Performance',
      description: 'Official claim settlement track record and operational metrics.',

      csr: {
        title: 'CSR',
        summaryValue: '95.8%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR represents the percentage of claims settled by Aditya Birla Health Insurance with streamlined cashless approvals across 11,000+ network hospitals.',
        singleYear: '95.8%',
        singleYearLabel: 'Recent Single Year',
        threeYearAvg: '94.6%',
        threeYearAvgLabel: '3 Year Average',
        videoTitle: 'CSR Metrics',
        videoUrl: DEMO_VIDEO_URL
      },

      icr: {
        title: 'ICR',
        summaryValue: '64.2%',
        subtitle: 'Incurred Claim Ratio',
        explanation: 'ICR indicates the proportion of total premium collected paid out towards policyholder claims, reflecting high financial solvency and claim fairness.',
        range: '64.2%',
        rangeLabel: 'Annual Incurred Claims Ratio',
        videoTitle: 'ICR Overview',
        videoUrl: DEMO_VIDEO_URL
      },

      complaintVolume: {
        title: 'Complaints',
        summaryValue: '12 / 10,000',
        subtitle: 'Low Grievance Rate',
        explanation: 'Low grievance frequency per 10,000 claims with proactive customer dispute resolution mechanism.',
        volume: '12 per 10,000',
        volumeLabel: 'Complaint Ratio',
        resolutionRate: '99.4%',
        resolutionRateLabel: 'Resolution Rate',
        videoTitle: 'Resolution Standards',
        videoUrl: DEMO_VIDEO_URL
      }
    },

    // =========================================================================
    // 2. COMPANY STRENGTH (FINANCIAL SOUNDNESS & MARKET REPUTATION)
    // =========================================================================
    companyStrength: {
      heading: 'COMPANY STRENGTH',
      subheading: 'Institutional Profile & Solvency Metrics',
      description: 'Financial stability, promoter pedigree, and healthcare provider network.',

      ownership: {
        title: 'Promoter Pedigree',
        summaryValue: 'Aditya Birla Group & MMI Holdings',
        description: 'Joint venture between Aditya Birla Group, a Fortune 500 conglomerate, and MMI Holdings, a pioneering South African health insurer with deep wellness innovation expertise.'
      },

      solvency: {
        title: 'Solvency Ratio',
        summaryValue: '1.92x',
        mandate: '1.50x IRDAI Mandate',
        description: 'Aditya Birla Health Insurance maintains a robust 1.92x solvency ratio, substantially above the statutory 1.50x requirement, guaranteeing full financial resilience for catastrophic payouts.'
      },

      networkHospitals: {
        title: 'Cashless Network',
        summaryValue: '11,000+ Hospitals',
        cashlessTAT: '60 Mins TAT',
        description: 'Pan-India network of 11,000+ cashless hospitals with digital instant approvals and 60-minute pre-authorization turnaround time.'
      },

      assetsUnderManagement: {
        title: 'AUM & Reserves',
        summaryValue: '₹3,000+ Cr AUM',
        description: 'Over ₹3,000 Crore in assets under management dedicated to underwriting health risk and customer policyholder protection.'
      }
    },

    // =========================================================================
    // 3. LIMITATIONS & WAITING PERIODS
    // =========================================================================
    limitationsSection: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Standard Policy Waiting Periods & Exclusions',
      description: 'Clearly outlined statutory waiting periods, condition-specific terms, and policy exclusions.',

      limitations: [
        {
          id: 'initial-waiting-period',
          title: 'Initial 30 Days Waiting Period',
          period: '30 Days',
          description: 'No claims are admissible for any illness during the first 30 days from policy inception, except for accidental bodily injuries requiring hospitalization.',
          policyRef: 'Section 4.1 — Initial Waiting Period'
        },
        {
          id: 'specific-ailment-waiting-period',
          title: 'Specific Disease Waiting Period (24 Months)',
          period: '24 Months (2 Years)',
          description: 'Standard 24-month waiting period applies to listed specific ailments including Cataract, Hernia, Hydrocele, Joint Replacements, ENT disorders, and benign growths (can be reduced to 1 year via optional rider).',
          policyRef: 'Section 4.2 — Specific Disease Schedule'
        },
        {
          id: 'ped-waiting-period',
          title: 'Pre-Existing Disease (PED) Waiting Period',
          period: '36 Months (3 Years)',
          description: 'Pre-existing medical conditions declared at the time of proposal are covered after 36 months of continuous coverage (can be reduced to 24 or 12 months with optional rider, or Day 1 for 7 listed chronic conditions under Chronic Care).',
          policyRef: 'Section 4.3 — Pre-Existing Disease Clause'
        },
        {
          id: 'critical-illness-waiting-period',
          title: 'Critical Illness Rider Waiting Period',
          period: '60 Days Initial / 1.5 Days Survival',
          description: 'If Critical Illness Cover rider is opted, an initial waiting period of 60 days applies, followed by a minimum survival period of 1.5 days from diagnosis date.',
          policyRef: 'Section 4.4 — Critical Illness Add-On Schedule'
        },
        {
          id: 'standard-exclusions',
          title: 'Standard Policy Exclusions',
          period: 'Permanent Exclusions',
          description: 'Expenses related to cosmetic surgery, intentional self-injury, drug or alcohol abuse, adventure sports, experimental treatments, and breach of law are permanently excluded.',
          policyRef: 'Section 5 — Permanent Exclusions (IRDAI Guidelines)'
        }
      ]
    },

    // =========================================================================
    // 4. MUST KNOW DETAILS (SPECIAL HIGHLIGHTS)
    // =========================================================================
    mustKnow: {
      heading: 'MUST KNOW DETAILS',
      subheading: 'Crucial Highlights for Activ One VYTL',
      buttonLabel: 'MUST KNOW DETAILS',
      items: [
        {
          id: 'mk-super-reload',
          title: 'Super Reload — Unlimited Refill',
          highlight: 'Available Unlimited Times from 2nd Claim Onwards',
          description: 'Base Sum Insured is automatically restored and can be utilized an unlimited number of times during the policy lifetime for both related and unrelated illnesses.'
        },
        {
          id: 'mk-super-credit',
          title: 'Super Credit — 100% Yearly Growth',
          highlight: '100% Increase Every Year Irrespective of Claims',
          description: 'Your Sum Insured doubles by 100% every single year irrespective of claims made, up to a massive 500% of Base Sum Insured (max ₹3 Crore).'
        },
        {
          id: 'mk-claim-protect',
          title: 'Claim Protect — Consumables Covered',
          highlight: '100% Non-Medical & Consumable Expense Waiver',
          description: 'Non-payable hospitalization items including gloves, PPE kits, masks, syringes, and all 4 lists of Annexure 1 are fully paid by the insurer.'
        },
        {
          id: 'mk-chronic-care',
          title: 'Chronic Care — Day 1 Protection',
          highlight: 'Waiting Period Waived for 7 Chronic Conditions',
          description: 'Initial and PED waiting periods are waived for Diabetes, Hypertension, Asthma, Hyperlipidemia, COPD, Obesity, and CAD (PTCA > 1 yr) from Day 1.'
        },
        {
          id: 'mk-health-returns',
          title: 'HealthReturns™ — Up to 100% Cashback',
          highlight: 'Earn Up to 100% Premium Back by Staying Active',
          description: 'Earn monthly HealthReturns™ by tracking your daily physical activity and maintaining good health parameters through the Aditya Birla wellness app.'
        }
      ]
    },

    // =========================================================================
    // 5. POLICY BENEFITS (ACTIV ONE VYTL — EXACT 4 CATEGORIES)
    // 1. Most Important (19 items)
    // 2. Value Added (4 items)
    // 3. Additional (5 items)
    // 4. Optional (6 items)
    // =========================================================================
    featuresSections: [
      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 1: MOST IMPORTANT (19 ITEMS)
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-most-important',
        title: 'MOST IMPORTANT',
        isProminent: true,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'vytl-hospitalization-room-rent',
            title: 'Hospitalization – Room Rent',
            subtitle: 'In-patient Treatment & Room Category Coverage',
            summary: 'Actuals up to Sum Insured with covered room category.',
            points: [
              'Actuals covered up to Sum Insured for in-patient hospitalization',
              'Covers room rent, nursing, boarding charges, doctor and specialist fees',
              'Cashless hospitalization across 11,000+ empanelled network hospitals'
            ],
            badge: 'UP TO SUM INSURED',
            isProminent: true,
            iconType: 'home'
          },
          {
            id: 'vytl-icu-charges',
            title: 'ICU Charges',
            subtitle: 'Zero ICU / ICCU Capping',
            summary: 'Actuals up to Sum Insured with no daily limit.',
            points: [
              'Actuals covered up to Sum Insured',
              'No daily limit on Intensive Care Unit (ICU) and ICCU room charges',
              'Covers specialist monitoring, life support, and critical care equipment'
            ],
            badge: 'NO ICU LIMIT',
            isProminent: true,
            iconType: 'shield'
          },
          {
            id: 'vytl-road-ambulance',
            title: 'Road Ambulance',
            subtitle: 'Emergency Medical Transit Coverage',
            summary: 'Per hospitalization, actuals up to Sum Insured.',
            points: [
              'Per hospitalization, actuals covered up to Sum Insured',
              'Covers emergency transit to the nearest hospital with adequate medical facilities'
            ],
            badge: 'UP TO SUM INSURED',
            isProminent: true,
            iconType: 'truck'
          },
          {
            id: 'vytl-day-care-treatments',
            title: 'Day Care Treatments',
            subtitle: 'Advanced Medical Procedures Under 24 Hours',
            summary: 'All Day Care procedures covered up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured for listed day care surgeries and treatments',
              'Requires less than 24 hours hospitalization due to technological advancement',
              'Full coverage without arbitrary sub-limits'
            ],
            badge: 'ALL PROCEDURES COVERED',
            isProminent: true,
            iconType: 'clock'
          },
          {
            id: 'vytl-modern-procedures',
            title: 'Modern Procedures / Treatments',
            subtitle: 'Advanced & Robotic Surgeries',
            summary: 'Actuals up to Sum Insured for listed modern procedures.',
            points: [
              'Covered up to Sum Insured for listed modern and robotic procedures',
              'Includes robotic surgery, stem cell therapy, oral chemotherapy, and balloon sinuplasty',
              'No restrictive disease sub-limits applied'
            ],
            badge: 'ADVANCED PROCEDURES',
            isProminent: true,
            iconType: 'cpu'
          },
          {
            id: 'vytl-hiv-aids-std-cover',
            title: 'HIV/AIDS & STD Cover',
            subtitle: 'Inpatient Treatment for HIV/AIDS and STDs',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals up to Sum Insured for necessary medical hospitalization',
              'Full confidentiality and cashless claim processing across network hospitals'
            ],
            badge: 'UP TO SUM INSURED',
            isProminent: true,
            iconType: 'shield'
          },
          {
            id: 'vytl-mental-illness',
            title: 'Mental Illness Hospitalization',
            subtitle: 'Psychiatric & Mental Health Inpatient Care',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Covered up to Sum Insured for in-patient mental healthcare hospitalization',
              'Compliant with the Mental Healthcare Act, 2017'
            ],
            badge: 'UP TO SUM INSURED',
            isProminent: true,
            iconType: 'heart'
          },
          {
            id: 'vytl-obesity-treatment',
            title: 'Obesity Treatment',
            subtitle: 'Bariatric & Surgical Weight Management',
            summary: 'Actuals up to Sum Insured as per clinical protocol.',
            points: [
              'Covered up to Sum Insured for surgical obesity management',
              'Subject to medical necessity guidelines and BMI qualification thresholds'
            ],
            badge: 'UP TO SUM INSURED',
            isProminent: true,
            iconType: 'activity'
          },
          {
            id: 'vytl-pre-hospitalization',
            title: 'Pre-Hospitalization – 90 Days',
            subtitle: 'Diagnostic & Consultation Expenses Prior to Admission',
            summary: 'Covered up to Sum Insured for **90 Days** prior to hospital admission.',
            points: [
              'Medical expenses incurred up to **90 Days** prior to admission are covered',
              'Includes diagnostic investigations, specialist consultations, and prescribed medications'
            ],
            badge: '90 DAYS COVERED',
            isProminent: true,
            iconType: 'calendar'
          },
          {
            id: 'vytl-post-hospitalization',
            title: 'Post-Hospitalization – 180 Days',
            subtitle: 'Follow-up, Recovery & Medication Post Discharge',
            summary: 'Covered up to Sum Insured for **180 Days** following discharge.',
            points: [
              'Medical expenses incurred up to **180 Days** post-discharge are covered',
              'Includes follow-up tests, rehabilitation therapy, and prescribed pharmaceuticals'
            ],
            badge: '180 DAYS COVERED',
            isProminent: true,
            iconType: 'calendar'
          },
          {
            id: 'vytl-claim-protect',
            title: 'Claim Protect',
            subtitle: 'Non-Medical Expense & Consumables Waiver',
            summary: 'Non-payable items covered, including all 4 lists of Annexure 1.',
            points: [
              'Covers non-payable items including all 4 lists of Annexure 1',
              'Includes gloves, masks, syringes, PPE kits, and administrative charges',
              'Eliminates out-of-pocket expenses during hospitalization'
            ],
            badge: '100% NON-MEDICAL COVER',
            isProminent: true,
            iconType: 'shield'
          },
          {
            id: 'vytl-domiciliary-hospitalization',
            title: 'Domiciliary Hospitalization',
            subtitle: 'Treatment at Home for Critical Conditions',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Covered up to Sum Insured when hospital beds are unavailable or patient cannot be safely moved',
              'Continuous medical care administered at home under professional medical supervision'
            ],
            badge: 'UP TO SUM INSURED',
            isProminent: true,
            iconType: 'home'
          },
          {
            id: 'vytl-home-health-care',
            title: 'Home Health Care',
            subtitle: 'Cashless Qualified Home Care Support',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals covered up to Sum Insured for approved home healthcare treatment protocols',
              'Provided through empanelled home healthcare service providers'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'heart'
          },
          {
            id: 'vytl-ayush-treatment',
            title: 'AYUSH Treatment',
            subtitle: 'Ayurveda, Yoga, Unani, Siddha & Homeopathy',
            summary: 'Actuals up to Sum Insured in recognized institutes.',
            points: [
              'Covered up to Sum Insured for inpatient treatment under AYUSH healthcare streams',
              'Applicable at recognized government hospitals or NABH accredited institutes'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'activity'
          },
          {
            id: 'vytl-organ-donor-expenses',
            title: 'Organ Donor Expenses',
            subtitle: 'Harvesting & In-patient Expenses for Donor',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Covered up to Sum Insured for in-patient hospitalization of the organ donor',
              'Covers surgical harvesting of the organ for the insured recipient'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'heart'
          },
          {
            id: 'vytl-super-reload',
            title: 'Super Reload',
            subtitle: 'Unlimited Automatic Restoration of Sum Insured',
            summary: 'From the **2nd claim onwards**, Base Sum Insured gets restored and is available **unlimited times during policy life**.',
            points: [
              'From the **2nd claim onwards**, Base Sum Insured gets restored',
              'Available **unlimited times during policy life**',
              'Restores 100% of Base Sum Insured for both related and unrelated illnesses',
              'Guarantees you never run out of health coverage during medical emergencies'
            ],
            badge: 'UNLIMITED RESTORATION',
            isProminent: true,
            iconType: 'refresh'
          },
          {
            id: 'vytl-super-credit',
            title: 'Super Credit',
            subtitle: 'Guaranteed Cumulative Bonus Growth',
            summary: 'Base Sum Insured increases by **100% every year irrespective of claims**, up to **500% of Base Sum Insured**, subject to a maximum benefit of **₹3 Crore**.',
            points: [
              'Base Sum Insured increases by **100% every year irrespective of claims**',
              'Accumulates up to **500% of Base Sum Insured**, subject to a maximum benefit of **₹3 Crore**',
              'No reduction in accumulated bonus even after claims are made in subsequent policy years'
            ],
            badge: '100% YEARLY GROWTH',
            isProminent: true,
            iconType: 'trending'
          },
          {
            id: 'vytl-chronic-care',
            title: 'Chronic Care – Day 1 In-patient Hospitalization',
            subtitle: 'Day 1 Coverage for 7 Listed Chronic Conditions',
            summary: 'Initial Waiting Period and Pre-Existing Disease Waiting Period are waived for listed chronic conditions.',
            points: [
              'Initial Waiting Period and Pre-Existing Disease Waiting Period are waived for listed chronic conditions',
              'Listed conditions: **Diabetes, Hypertension, Asthma, Hyperlipidemia, COPD, Obesity, Coronary Artery Disease (where PTCA was done prior to 1 year)**',
              'Complete in-patient hospitalization coverage active from Day 1 of policy inception'
            ],
            badge: 'DAY 1 COVERAGE',
            isProminent: true,
            iconType: 'zap'
          },
          {
            id: 'vytl-chronic-management-opd',
            title: 'Chronic Management Program (OPD)',
            subtitle: 'Comprehensive Outpatient Support for Chronic Health',
            summary: 'Available on a cashless basis.',
            points: [
              'Available on a cashless basis',
              'Covers specialist OPD consultations, diagnostic tests, and regular health monitoring for chronic conditions'
            ],
            badge: 'CASHLESS OPD',
            isProminent: true,
            iconType: 'clipboard'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 2: VALUE ADDED (4 ITEMS)
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-value-added',
        title: 'valueAdded',
        isProminent: false,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        items: [
          {
            id: 'vytl-annual-health-checkup',
            title: 'Annual Health Check-up',
            subtitle: 'Preventive Full-Body Health Screening',
            summary: 'Listed and cashless health check-up.',
            points: [
              'Listed and cashless health check-up available once every policy year',
              'Comprehensive preventive screening package across empanelled diagnostic centers'
            ],
            badge: 'CASHLESS ANNUAL CHECKUP',
            iconType: 'check'
          },
          {
            id: 'vytl-health-assessment',
            title: 'Health Assessment™',
            subtitle: 'Comprehensive Annual Wellness Evaluation',
            summary: 'Applicable once in a policy year through Network Providers / Empanelled Service Providers on a cashless or digital basis.',
            points: [
              'Applicable once in a policy year through Network Providers / Empanelled Service Providers on a cashless or digital basis',
              'Measures vital health parameters and generates customized wellness targets'
            ],
            badge: 'ANNUAL ASSESSMENT',
            iconType: 'activity'
          },
          {
            id: 'vytl-health-returns',
            title: 'HealthReturns™',
            subtitle: 'Earn Premium Cashback by Staying Active',
            summary: 'Health management benefit applicable up to **100% of the premium**, as per applicable program terms.',
            points: [
              'Health management benefit applicable up to **100% of the premium**, as per applicable program terms',
              'Earn monthly cashback rewards by completing daily active steps and fitness workouts'
            ],
            badge: 'UP TO 100% CASHBACK',
            iconType: 'dollar'
          },
          {
            id: 'vytl-ppn-discount',
            title: 'Preferred Provider Network (PPN) Discount',
            subtitle: 'Premium Savings on Network Utilization',
            summary: '**10% discount** applicable under the optional PPN benefit.',
            points: [
              '**10% discount** applicable under the optional PPN benefit',
              'Enjoy premium discounts while accessing high quality network hospitals'
            ],
            badge: '10% DISCOUNT',
            iconType: 'credit'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 3: ADDITIONAL (5 ITEMS)
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-additional',
        title: 'ADDITIONAL',
        isProminent: false,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'vytl-compassionate-visit',
            title: 'Compassionate Visit',
            subtitle: 'Family Transit Allowance During Extended Hospitalization',
            summary: 'Up to **₹50,000** towards two-way travel fare if hospitalization exceeds **10 days**.',
            points: [
              'Up to **₹50,000** towards two-way travel fare if hospitalization exceeds **10 days**',
              'Reimburses economy airfare or train fare for an immediate family member to visit the hospitalized insured'
            ],
            badge: 'UP TO ₹50,000',
            iconType: 'users'
          },
          {
            id: 'vytl-second-medical-opinion',
            title: 'Second Medical Opinion',
            subtitle: 'Expert Specialist Consultation for Major Illnesses',
            summary: 'Applicable for listed major illnesses.',
            points: [
              'Applicable for listed major illnesses',
              'Access to leading medical specialists for independent diagnosis verification and treatment advice'
            ],
            badge: 'EXPERT OPINION',
            iconType: 'clipboard'
          },
          {
            id: 'vytl-cancer-screening-package',
            title: 'Annual Screening Package for Cancer Diagnosed Patients',
            subtitle: 'Oncological Health Monitoring & Early Surveillance',
            summary: 'Up to **₹10,000 per member per policy year**.',
            points: [
              'Up to **₹10,000 per member per policy year**',
              'Provides dedicated diagnostic and oncology screening tests for diagnosed cancer patients'
            ],
            badge: 'UP TO ₹10,000/YR',
            iconType: 'shield'
          },
          {
            id: 'vytl-health-management-program',
            title: 'Health Management Program',
            subtitle: 'Personalized Health Advisory & Support',
            summary: 'Customized wellness coaching, dietary guidance, and preventive health management.',
            points: [
              'Dedicated wellness coaching, nutritional guidance, and disease prevention support',
              'Access to digital health tools and expert consultations to maintain optimal health parameters'
            ],
            badge: 'WELLNESS PROGRAM',
            iconType: 'heart'
          },
          {
            id: 'vytl-chronic-care-restriction',
            title: 'Chronic Care Restriction',
            subtitle: 'Clinical Protocols for Chronic Condition Management',
            summary: 'Defined clinical guidelines and treatment protocols for specified chronic health conditions.',
            points: [
              'Outlines specific clinical guidelines and empanelled treatment protocols for chronic ailments',
              'Ensures high-standard healthcare delivery and seamless cashless claim management'
            ],
            badge: 'CLINICAL GUIDELINES',
            iconType: 'activity'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 4: OPTIONAL (6 ITEMS)
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-optional',
        title: 'optional',
        isProminent: false,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'vytl-opt-specific-disease-reduction',
            title: 'Reduction in Specific Disease Waiting Period',
            subtitle: 'Accelerated Coverage for 24-Month Specific Ailments',
            summary: 'Reduced from **2 Years to 1 Year**.',
            points: [
              'Reduced from **2 Years to 1 Year**',
              'Early coverage for conditions like Cataract, Hernia, Hydrocele, Joint Replacements, and ENT disorders'
            ],
            badge: '2 YRS → 1 YR',
            isRider: true,
            iconType: 'clock'
          },
          {
            id: 'vytl-opt-ped-reduction',
            title: 'Reduction in Pre-Existing Disease Waiting Period',
            subtitle: 'Early Protection for Declared Pre-Existing Conditions',
            summary: 'Option 1: **3 Years to 2 Years** | Option 2: **3 Years to 1 Year**.',
            points: [
              'Option 1: **3 Years to 2 Years**',
              'Option 2: **3 Years to 1 Year**',
              'Significantly shortens waiting periods for pre-existing diseases'
            ],
            badge: 'PED REDUCTION',
            isRider: true,
            iconType: 'clock'
          },
          {
            id: 'vytl-opt-room-rent-type',
            title: 'Room Rent Type Options',
            subtitle: 'Room Accommodation Category Flexibility',
            summary: 'Option 1: **Single Private Room** | Option 2: **Shared Accommodation**.',
            points: [
              'Option 1: **Single Private Room**',
              'Option 2: **Shared Accommodation**',
              'Choose room category to optimize policy premium based on personal preferences'
            ],
            badge: 'ROOM SELECTION',
            isRider: true,
            iconType: 'home'
          },
          {
            id: 'vytl-opt-per-claim-deductible',
            title: 'Per Claim Deductible',
            subtitle: 'Voluntary Cost-Sharing for Substantial Premium Discount',
            summary: 'Option 1: **₹15,000** | Option 2: **₹25,000**.',
            points: [
              'Option 1: **₹15,000**',
              'Option 2: **₹25,000**',
              'Substantially reduces annual premium while retaining comprehensive high-value hospital coverage'
            ],
            badge: '₹15,000 / ₹25,000',
            isRider: true,
            iconType: 'dollar'
          },
          {
            id: 'vytl-opt-critical-illness',
            title: 'Critical Illness Cover',
            subtitle: 'Lump-Sum Financial Compensation on Major Illness Diagnosis',
            summary: 'Base Sum Insured options: **₹10 Lakh**, **₹15 Lakh**, **₹20 Lakh**, **₹25 Lakh**. Initial Waiting Period: **60 Days**. Survival Period: **1.5 Days**.',
            points: [
              'Base Sum Insured options: **₹10 Lakh**, **₹15 Lakh**, **₹20 Lakh**, **₹25 Lakh**',
              'Initial Waiting Period: **60 Days**',
              'Survival Period: **1.5 Days**',
              'Provides 100% lump-sum compensation on first diagnosis of covered critical illnesses'
            ],
            badge: 'UP TO ₹25 LAKH',
            isRider: true,
            iconType: 'heart'
          },
          {
            id: 'vytl-opt-personal-accident',
            title: 'Personal Accident Cover',
            subtitle: '24x7 Worldwide Accidental Protection & Disability Cover',
            summary: 'Covers: **Accidental Death**, **Permanent Total Disability**, **Permanent Partial Disability**. Sum Insured options: **₹10 Lakh**, **₹15 Lakh**, **₹20 Lakh**, **₹25 Lakh**, **₹50 Lakh**.',
            points: [
              'Covers: **Accidental Death**, **Permanent Total Disability**, **Permanent Partial Disability**',
              'Sum Insured options: **₹10 Lakh**, **₹15 Lakh**, **₹20 Lakh**, **₹25 Lakh**, **₹50 Lakh**',
              'Comprehensive protection for accidental bodily injuries and disability compensation'
            ],
            badge: 'UP TO ₹50 LAKH',
            isRider: true,
            iconType: 'shield'
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // PLAN: ACTIV YUVA (ADITYA BIRLA HEALTH INSURANCE)
  // ===========================================================================
  'activ-yuva': {
    planId: 'activ-yuva',
    planName: 'Activ Yuva',
    fullName: 'Aditya Birla Health Insurance Activ Yuva',
    companyName: 'Aditya Birla Health Insurance',
    tagline: 'Youth-Centric Health Shield with 2X Day 1 Yuva Reload, 10X Yuva Credit & FitForward Multipliers',
    coverage: '₹5 Lakh - ₹1 Crore / Unlimited',
    premium: '',
    categoryBadge: 'Health Policy',
    policySubtitle: 'Aditya Birla Health Insurance Policy',

    // --- NAVIGATION & BUTTON LABELS ---
    backToPlansLabel: 'Back to Aditya Birla Plans',
    backToPlanLabel: 'Back to Activ Yuva',
    featuresHeadingSuffix: 'POLICY BENEFITS',
    policyBenefitsButtonLabel: 'POLICY BENEFITS',
    reportCardButtonLabel: 'REPORT CARD',
    companyStrengthButtonLabel: 'COMPANY STRENGTH',
    limitationsButtonLabel: 'LIMITATIONS & WAITING PERIODS',
    mustKnowButtonLabel: 'MUST KNOW DETAILS',
    termsFootnote: '*Terms & Conditions Apply',

    // --- PLAN-SPECIFIC UI CONFIG ---
    uiConfig: {
      primaryColor: '#D51D25',
      secondaryColor: '#F68529',
      accentColor: '#F5D34F',
      textColor: '#0F172A',
      secondaryTextColor: '#475569',
      demoVideoUrl: DEMO_VIDEO_URL
    },

    // --- SUMMARY BENEFITS & DETAILS ---
    benefits: [
      'Hospitalization & Room Rent: Actuals up to Sum Insured (Any Room)',
      'Yuva Reload: 2X Cover from Day 1 on First Claim + Unlimited Refills',
      'Yuva Credit: 100% Increase per Renewal Year up to 1000% (10X in 10 Years)',
      'FitForward: EAT (10% Booster), MOVE (4 Active Days) & HEAL (15% Booster)',
      'ON / OFF Feature: Up to 15% Renewal Discount While Travelling Abroad',
      'Claim Protect: 100% Consumables & Non-Medical Expenses Covered (All 4 Lists)',
      'HealthReturns™: Earn up to 100% Premium Back by Staying Active',
      'Pre & Post Hospitalization: 90 Days Pre & 180 Days Post Hospitalization'
    ],
    details: {
      eligibility: 'Adults: 18 to 35 Years | Children: 91 days to 25 years',
      waitingPeriod: '30 Days Initial, 24 Months Specific Ailments, 24 Months PED (Reducible to 1 Year)',
      roomRent: 'Any Room Category (Actuals up to Sum Insured)',
      hospitalization: 'Covered up to Full Sum Insured (Min 2 Hours required)',
      prePostHospital: '90 Days Pre & 180 Days Post Hospitalization',
      dayCare: 'All Day Care Treatments & Modern Procedures Covered',
      noClaimBonus: 'Yuva Credit: 100% Base SI Added Every Year (Max 1000% / 10X in 10 Years)',
      exclusions: 'Cosmetic surgery, intentional self-injury, adventure sports, unproven treatments'
    },

    // =========================================================================
    // 1. REPORT CARD (PERFORMANCE METRICS)
    // =========================================================================
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Aditya Birla Health Insurance Performance',
      description: 'Official claim settlement track record and operational metrics.',

      csr: {
        title: 'CSR',
        summaryValue: '95.8%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR represents the percentage of claims settled by Aditya Birla Health Insurance with streamlined cashless approvals across 11,000+ network hospitals.',
        singleYear: '95.8%',
        singleYearLabel: 'Recent Single Year',
        threeYearAvg: '94.6%',
        threeYearAvgLabel: '3 Year Average',
        videoTitle: 'CSR Metrics',
        videoUrl: DEMO_VIDEO_URL
      },

      icr: {
        title: 'ICR',
        summaryValue: '64.2%',
        subtitle: 'Incurred Claim Ratio',
        explanation: 'ICR indicates the proportion of total premium collected paid out towards policyholder claims, reflecting high financial solvency and claim fairness.',
        range: '64.2%',
        rangeLabel: 'Annual Incurred Claims Ratio',
        videoTitle: 'ICR Overview',
        videoUrl: DEMO_VIDEO_URL
      },

      complaintVolume: {
        title: 'Complaints',
        summaryValue: '12 / 10,000',
        subtitle: 'Low Grievance Rate',
        explanation: 'Low grievance frequency per 10,000 claims with proactive customer dispute resolution mechanism.',
        volume: '12 per 10,000',
        volumeLabel: 'Complaint Ratio',
        resolutionRate: '99.4%',
        resolutionRateLabel: 'Resolution Rate',
        videoTitle: 'Resolution Standards',
        videoUrl: DEMO_VIDEO_URL
      }
    },

    // =========================================================================
    // 2. COMPANY STRENGTH (FINANCIAL SOUNDNESS & MARKET REPUTATION)
    // =========================================================================
    companyStrength: {
      heading: 'COMPANY STRENGTH',
      subheading: 'Institutional Profile & Solvency Metrics',
      description: 'Financial stability, promoter pedigree, and healthcare provider network.',

      ownership: {
        title: 'Promoter Pedigree',
        summaryValue: 'Aditya Birla Group & MMI Holdings',
        description: 'Joint venture between Aditya Birla Group, a Fortune 500 conglomerate, and MMI Holdings, a pioneering South African health insurer with deep wellness innovation expertise.'
      },

      solvency: {
        title: 'Solvency Ratio',
        summaryValue: '1.92x',
        mandate: '1.50x IRDAI Mandate',
        description: 'Aditya Birla Health Insurance maintains a robust 1.92x solvency ratio, substantially above the statutory 1.50x requirement, guaranteeing full financial resilience for catastrophic payouts.'
      },

      networkHospitals: {
        title: 'Cashless Network',
        summaryValue: '11,000+ Hospitals',
        cashlessTAT: '60 Mins TAT',
        description: 'Pan-India network of 11,000+ cashless hospitals with digital instant approvals and 60-minute pre-authorization turnaround time.'
      },

      assetsUnderManagement: {
        title: 'AUM & Reserves',
        summaryValue: '₹3,000+ Cr AUM',
        description: 'Over ₹3,000 Crore in assets under management dedicated to underwriting health risk and customer policyholder protection.'
      }
    },

    // =========================================================================
    // 3. LIMITATIONS & WAITING PERIODS
    // =========================================================================
    limitationsSection: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Standard Policy Waiting Periods & Exclusions',
      description: 'Clearly outlined statutory waiting periods, condition-specific terms, and policy exclusions.',

      limitations: [
        {
          id: 'initial-waiting-period',
          title: 'Initial 30 Days Waiting Period',
          period: '30 Days',
          description: 'No claims are admissible for any illness during the first 30 days from policy inception, except for accidental bodily injuries requiring hospitalization.',
          policyRef: 'Section 4.1 — Initial Waiting Period'
        },
        {
          id: 'specific-ailment-waiting-period',
          title: 'Specific Disease Waiting Period (24 Months)',
          period: '24 Months (2 Years)',
          description: 'Standard 24-month waiting period applies to listed specific ailments including Cataract, Hernia, Hydrocele, Joint Replacements, ENT disorders, and benign growths (can be reduced to 1 year via optional rider).',
          policyRef: 'Section 4.2 — Specific Disease Schedule'
        },
        {
          id: 'ped-waiting-period',
          title: 'Pre-Existing Disease (PED) Waiting Period',
          period: '24 Months (2 Years)',
          description: 'Pre-existing medical conditions declared at the time of proposal are covered after 24 months of continuous coverage (can be reduced to 12 months with optional rider).',
          policyRef: 'Section 4.3 — Pre-Existing Disease Clause'
        },
        {
          id: 'standard-exclusions',
          title: 'Standard Policy Exclusions',
          period: 'Permanent Exclusions',
          description: 'Expenses related to cosmetic surgery, intentional self-injury, drug or alcohol abuse, adventure sports, experimental treatments, and breach of law are permanently excluded.',
          policyRef: 'Section 5 — Permanent Exclusions (IRDAI Guidelines)'
        }
      ]
    },

    // =========================================================================
    // 4. MUST KNOW DETAILS (SPECIAL HIGHLIGHTS)
    // =========================================================================
    mustKnow: {
      heading: 'MUST KNOW DETAILS',
      subheading: 'Crucial Highlights for Activ Yuva',
      buttonLabel: 'MUST KNOW DETAILS',
      items: [
        {
          id: 'mk-yuva-reload',
          title: 'Yuva Reload — 2X Day 1 + Unlimited Refills',
          highlight: '2X Cover on First Claim + Unlimited Refills on Subsequent Claims',
          description: 'Get instant 2X cover from Day 1 on your first claim, and unlimited automatic refills up to Base Sum Insured for all subsequent claims during policy lifetime (not applicable for Unlimited SI).'
        },
        {
          id: 'mk-yuva-credit',
          title: 'Yuva Credit — 100% Growth up to 1000%',
          highlight: '100% Increase per Renewal up to 10X (1000% in 10 Years)',
          description: 'Your Sum Insured increases by 100% with each renewal year irrespective of claims made, up to a massive 1000% (10X of Base Sum Insured).'
        },
        {
          id: 'mk-fitforward',
          title: 'FitForward — EAT, MOVE & HEAL',
          highlight: 'Earn Boosters & Bonus Active Days Across Lifestyle Dimensions',
          description: 'EAT (10% Booster for logging 2 meals/day), MOVE (4 bonus active days for steps/calories), and HEAL (15% Booster for 7–8 hours sleep recording).'
        },
        {
          id: 'mk-on-off',
          title: 'ON / OFF — International Travel Discount',
          highlight: 'Up to 15% Base Premium Discount on Renewal',
          description: 'Switch OFF domestic coverage via mobile app when travelling abroad for 15 to 90 days in a policy year to earn up to 15% renewal discount while still accumulating HealthReturns™.'
        },
        {
          id: 'mk-claim-protect',
          title: 'Claim Protect — 100% Consumables Covered',
          highlight: 'Full Coverage for All 4 Lists of Annexure 1 Non-Payable Items',
          description: 'Eliminates out-of-pocket hospital deductions by fully paying for gloves, masks, syringes, PPE kits, and administrative items.'
        }
      ]
    },

    // =========================================================================
    // 5. POLICY BENEFITS (ACTIV YUVA — EXACT 4 MAIN CATEGORIES)
    // 1. Most Important (12 items)
    // 2. Value Added (3 items)
    // 3. Additional (5 items)
    // 4. Optional (12 items)
    // =========================================================================
    featuresSections: [
      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 1: MOST IMPORTANT (12 ITEMS)
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-most-important',
        title: 'MOST IMPORTANT',
        isProminent: true,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'yuva-hospitalization-expenses',
            title: 'Hospitalization Expenses',
            subtitle: 'Inpatient Hospitalization (Min 2 Hours Required)',
            summary: 'Minimum **2 Hours Hospitalization Required**. Covers Room Rent (Actuals up to Sum Insured — Any Room), ICU Charges, Day Care Treatments, Modern Procedures, HIV/AIDS & STD, Mental Illness, and Obesity Treatment.',
            points: [
              '**Room Rent:** Actuals up to Sum Insured — Any Room category with zero proportionate deduction',
              '**ICU Charges:** Actuals up to Sum Insured with no daily room capping',
              '**Day Care Treatments:** Actuals up to Sum Insured for All Daycare Procedures',
              '**Modern Procedures/Treatments:** Actuals up to Sum Insured for Listed Procedures (Robotic & Advanced)',
              '**HIV/AIDS and STD Cover:** Actuals up to Sum Insured',
              '**Mental Illness Hospitalization:** Actuals up to Sum Insured as per Mental Healthcare Act',
              '**Obesity Treatment:** Actuals up to Sum Insured as per medical protocols'
            ],
            badge: 'MIN 2 HOURS HOSPITALIZATION',
            isProminent: true,
            iconType: 'home'
          },
          {
            id: 'yuva-emergency-services',
            title: 'Emergency Services',
            subtitle: 'Domestic Road & Air Ambulance Coverage',
            summary: 'Domestic Road & Air Ambulance: Actuals up to Sum Insured.',
            points: [
              'Domestic Road Ambulance: Actuals covered up to Sum Insured per hospitalization',
              'Domestic Air Ambulance: Actuals covered up to Sum Insured for emergency medical evacuations',
              'Seamless cashless transit coordination across network medical facilities'
            ],
            badge: 'ROAD & AIR AMBULANCE',
            isProminent: true,
            iconType: 'truck'
          },
          {
            id: 'yuva-pre-hospitalization',
            title: 'Pre-Hospitalization Expenses',
            subtitle: 'Diagnostic & Consultation Expenses Prior to Admission',
            summary: 'Covered up to Sum Insured for **90 Days** prior to admission.',
            points: [
              'Medical expenses incurred up to **90 Days** prior to hospital admission are covered',
              'Includes diagnostic investigations, specialist doctor consultations, and prescribed medications'
            ],
            badge: '90 DAYS COVERED',
            isProminent: true,
            iconType: 'calendar'
          },
          {
            id: 'yuva-post-hospitalization',
            title: 'Post-Hospitalization Expenses',
            subtitle: 'Follow-up, Recovery & Medication Post Discharge',
            summary: 'Covered up to Sum Insured for **180 Days** following discharge.',
            points: [
              'Medical expenses incurred up to **180 Days** post-discharge from the hospital are covered',
              'Includes follow-up doctor consultations, diagnostic tests, physiotherapy, and medicines'
            ],
            badge: '180 DAYS COVERED',
            isProminent: true,
            iconType: 'calendar'
          },
          {
            id: 'yuva-claim-protect',
            title: 'Claim Protect',
            subtitle: '100% Non-Medical Expense & Consumables Waiver',
            summary: 'Non-Medical Expenses / Non-Payable Items will be covered, including **all 4 Lists of Annexure 1**.',
            points: [
              'Non-medical items covered across **all 4 Lists of Annexure 1**',
              'Includes PPE kits, gloves, syringes, surgical masks, and administrative expenses',
              'Protects against out-of-pocket hospital deductions'
            ],
            badge: 'ALL 4 LISTS COVERED',
            isProminent: true,
            iconType: 'shield'
          },
          {
            id: 'yuva-domiciliary-hospitalization',
            title: 'Domiciliary Hospitalization',
            subtitle: 'Medical Treatment at Home for Critical Conditions',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals covered up to Sum Insured',
              'Applicable when hospital beds are unavailable or patient cannot be safely moved',
              'Continuous medical care administered at home under professional medical supervision'
            ],
            badge: 'UP TO SUM INSURED',
            isProminent: true,
            iconType: 'home'
          },
          {
            id: 'yuva-home-health-care',
            title: 'Home Health Care',
            subtitle: 'Cashless Professional Home Healthcare Treatment',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals covered up to Sum Insured for approved home healthcare treatment protocols',
              'Delivered through empanelled home healthcare service providers'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'heart'
          },
          {
            id: 'yuva-ayush-treatment',
            title: 'AYUSH Treatment',
            subtitle: 'Ayurveda, Yoga, Unani, Siddha & Homeopathy',
            summary: 'Actuals up to Sum Insured. **Minimum 24 Hours Hospitalization Required**.',
            points: [
              'Actuals covered up to Sum Insured',
              '**Minimum 24 Hours Hospitalization Required** in recognized government or accredited institutes'
            ],
            badge: 'MIN 24 HRS REQUIRED',
            isProminent: true,
            iconType: 'activity'
          },
          {
            id: 'yuva-organ-donor-expenses',
            title: 'Organ Donor Expenses',
            subtitle: 'Inpatient Hospitalization & Harvesting for Donor',
            summary: 'Actuals up to Sum Insured.',
            points: [
              'Actuals covered up to Sum Insured for surgical harvesting of organ for the insured member',
              'Full cashless facility across empanelled network hospitals'
            ],
            badge: 'UP TO SUM INSURED',
            iconType: 'heart'
          },
          {
            id: 'yuva-reload',
            title: 'Yuva Reload',
            subtitle: '2X Cover on Day 1 + Unlimited Subsequent Refills',
            summary: '**First Claim:** 2X Cover from Day 1. **Subsequent Claims:** Unlimited Refill up to Base Sum Insured. *(Not applicable if Unlimited Sum Insured is opted)*.',
            points: [
              '**First Claim:** 2X Cover from Day 1 (Instant 200% protection)',
              '**Subsequent Claims:** Unlimited Refill up to Base Sum Insured during policy lifetime',
              'Not applicable if Unlimited Sum Insured is opted'
            ],
            badge: '2X DAY 1 + UNLIMITED REFILL',
            isProminent: true,
            iconType: 'refresh'
          },
          {
            id: 'yuva-credit',
            title: 'Yuva Credit',
            subtitle: '100% Cumulative Bonus per Renewal (Up to 1000%)',
            summary: 'Increases Base Sum Insured by **100% per year of Renewal**, up to a maximum of **1000% (10X in 10 Years)**. *(Not applicable if Unlimited Sum Insured is opted)*.',
            points: [
              'Increases Base Sum Insured by **100% per year of Renewal**',
              'Grows up to a maximum of **1000% (10X in 10 Years)**',
              'Accumulated bonus does not reduce upon claims (Not applicable for Unlimited SI)'
            ],
            badge: '100% / YR (UP TO 10X)',
            isProminent: true,
            iconType: 'trending'
          },
          {
            id: 'yuva-on-off',
            title: 'ON / OFF',
            subtitle: 'Up to 15% Renewal Discount While Travelling Abroad',
            summary: 'Get up to **15% of Base Premium back as Discount on Renewal** by switching OFF the policy through the mobile application when travelling abroad for a minimum of **15 days** to a maximum of **90 days** in a Policy Year. Domestic Coverage is suspended during the OFF period, however the customer can still earn **HealthReturns™**.',
            points: [
              'Get up to **15% of Base Premium back as Discount on Renewal**',
              'Switch OFF policy via mobile app when travelling abroad for **15 days to 90 days** in a policy year',
              'Domestic Coverage is suspended during OFF period, but policyholder can still earn **HealthReturns™**'
            ],
            badge: 'UP TO 15% DISCOUNT',
            isProminent: true,
            iconType: 'zap'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 2: VALUE ADDED (3 ITEMS — HEALTH MANAGEMENT PROGRAM)
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-value-added',
        title: 'valueAdded',
        isProminent: false,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'yuva-health-assessment',
            title: 'Health Assessment',
            subtitle: 'Annual Cashless / Digital Health Assessment',
            summary: 'Applicable once in a Policy Year through Network Providers / Empanelled Service Providers. Available through Cashless HA or Digital DHA.',
            points: [
              'Applicable once in a Policy Year through Network Providers / Empanelled Service Providers',
              'Available through **Cashless HA** or **Digital DHA**',
              'Generates comprehensive health score and personalized fitness targets'
            ],
            badge: 'CASHLESS / DIGITAL HA',
            iconType: 'activity'
          },
          {
            id: 'yuva-health-returns',
            title: 'HealthReturns™',
            subtitle: 'Earn Up to 100% Premium Back as Active Rewards',
            summary: 'Earn up to **100% of Premium back** as rewards for staying active. Usable towards hospitalization, OPD, wearables, deductibles, and more.',
            points: [
              'Earn up to **100% of Premium back** as rewards for staying active',
              '**Usable towards:** Hospitalization Expenses, OPD Expenses, Preventive & Wellness Activities, Health Wearable Device, Deductibles, Non-payable Claims, AYUSH Treatment, Discount on Renewal Premium, Purchase of another Retail Indemnity Policy'
            ],
            badge: 'UP TO 100% REWARDS',
            iconType: 'dollar'
          },
          {
            id: 'yuva-fitforward',
            title: 'FitForward',
            subtitle: 'EAT, MOVE & HEAL Wellness Multipliers',
            summary: 'Dedicated wellness boost across EAT (10% booster), MOVE (4 bonus active days), and HEAL (15% booster).',
            points: [
              '**EAT:** Get a **10% Booster** on earned monthly HealthReturns™ by logging 2 Meals/Day for 21 Days in a month through the mobile app',
              '**MOVE:** Earn **4 Bonus Active Days** in a month by maintaining Monthly Average of 7,500–9,999 Steps OR burning 250+ Calories/session (when < 23 Active Dayz earned)',
              '**HEAL:** Get a **15% Booster** on earned monthly HealthReturns™ by recording 7–8 Hours of Sleep/day for 21 Days in a month via linked wearable',
              '**Footnote:** Limit of 100% HealthReturns is calculated on Base Premium + Applicable Optional Covers (Reduction in Specific/PED Waiting Periods, Room Rent Type, Durable Equipment)'
            ],
            badge: 'EAT • MOVE • HEAL',
            iconType: 'zap'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 3: ADDITIONAL (5 ITEMS)
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-additional',
        title: 'ADDITIONAL',
        isProminent: false,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [

          {
            id: 'yuva-second-medical-opinion',
            title: 'Second Medical Opinion',
            subtitle: 'Specialist Consultation for Listed Major Illnesses',
            summary: 'Applicable for listed Major Illnesses.',
            points: [
              'Applicable for listed Major Illnesses through expert network of medical specialists',
              'Provides independent clinical evaluation and confirmation of diagnosis'
            ],
            badge: 'EXPERT OPINION',
            iconType: 'clipboard'
          },
          {
            id: 'yuva-cancer-screening-package',
            title: 'Annual Screening Package for Cancer Diagnosed Patients',
            subtitle: 'Oncological Screening & Early Surveillance',
            summary: '**INR 10,000 / Member / Policy Year**.',
            points: [
              '**INR 10,000 / Member / Policy Year** for oncology surveillance diagnostic tests',
              'Available for patients diagnosed with cancer to monitor remission and recovery'
            ],
            badge: 'INR 10,000 / YEAR',
            iconType: 'shield'
          },
          {
            id: 'yuva-health-management-program',
            title: 'Health Management Program',
            subtitle: 'Integrated Wellness Advisory & Disease Management',
            summary: 'Highlighted feature linking to Health Assessment, HealthReturns™, and FitForward.',
            points: [
              'Links directly to **Health Assessment**, **HealthReturns™**, and **FitForward**',
              'Comprehensive health advisory and lifestyle coaching through empanelled medical partners'
            ],
            badge: 'WELLNESS ECOSYSTEM',
            iconType: 'heart'
          },
          {
            id: 'yuva-chronic-care-restriction',
            title: 'Chronic Care Restriction',
            subtitle: 'Guidelines & Protocols for Chronic Illness Coverage',
            summary: 'Defined protocols and standard clinical guidelines for managed chronic conditions.',
            points: [
              'Outlines clinical guidelines and specialized treatment pathways for chronic ailments',
              'Ensures structured healthcare delivery and compliance with network protocols'
            ],
            badge: 'CLINICAL GUIDELINES',
            iconType: 'activity'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 4: OPTIONAL (12 ITEMS)
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-optional',
        title: 'optional',
        isProminent: false,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'yuva-opt-specific-disease-reduction',
            title: 'Reduction in Specific Disease Waiting Period',
            subtitle: 'Early Coverage for 24-Month Specific Diseases',
            summary: '**2 Years → 1 Year**.',
            points: [
              'Reduces specific disease waiting period from **2 Years to 1 Year**',
              'Early coverage for Cataract, Hernia, Hydrocele, Joint Replacements, and ENT conditions'
            ],
            badge: '2 YRS → 1 YR',
            isRider: true,
            iconType: 'clock'
          },
          {
            id: 'yuva-opt-ped-reduction',
            title: 'Reduction in Pre-Existing Disease Waiting Period',
            subtitle: 'Accelerated PED Protection',
            summary: '**2 Years → 1 Year**.',
            points: [
              'Reduces Pre-Existing Disease (PED) waiting period from **2 Years to 1 Year**',
              'Accelerated protection for declared chronic medical histories'
            ],
            badge: '2 YRS → 1 YR',
            isRider: true,
            iconType: 'clock'
          },
          {
            id: 'yuva-opt-room-rent-type',
            title: 'Room Rent Type Option',
            subtitle: 'Room Accommodation Flexibility',
            summary: 'Option 1: **Single Private Room** | Option 2: **Shared Room**.',
            points: [
              'Option 1: Single Private Room accommodation',
              'Option 2: Shared Room accommodation with premium optimization'
            ],
            badge: 'ROOM FLEXIBILITY',
            isRider: true,
            iconType: 'home'
          },
          {
            id: 'yuva-opt-health-checkup',
            title: 'Yuva Health Check-up',
            subtitle: 'Comprehensive Cashless Full-Body & Specialist Check-up',
            summary: 'Comprehensive Cashless Check-up including Medical Test, Dental Consultation, and Ophthalmologist Consultation.',
            points: [
              'Comprehensive Cashless Check-up across empanelled diagnostic centers',
              'Includes **Medical Test**, **Dental Consultation**, and **Ophthalmologist Consultation**'
            ],
            badge: 'MEDICAL + DENTAL + EYE',
            isRider: true,
            iconType: 'check'
          },
          {
            id: 'yuva-opt-lifestyle-management',
            title: 'Lifestyle Management Program',
            subtitle: 'Health Coaching & OPD for 3 Lifestyle Conditions',
            summary: 'Health Coaching and OPD Consultations for up to **3 listed Lifestyle Conditions** on a Cashless basis.',
            points: [
              'Health Coaching and OPD Consultations for up to **3 listed Lifestyle Conditions**',
              'Provided completely on a Cashless basis with certified health coaches and specialists'
            ],
            badge: '3 CONDITIONS CASHLESS',
            isRider: true,
            iconType: 'heart'
          },
          {
            id: 'yuva-opt-durable-equipment',
            title: 'Durable Equipment Cover',
            subtitle: 'Sub-limit of ₹5 Lakh for Specialized Medical Devices',
            summary: 'Up to **₹5 Lakh sub-limit** for listed medical equipment.',
            points: [
              'Up to **₹5 Lakh sub-limit**',
              '**Covered equipment:** Ventilator, Wheelchair, Prosthetic Device, Suction Machine, Commode Chairs, Infusion Pump, Continuous Passive Motion Devices in case of Knee Replacement, Oxygen Concentrator'
            ],
            badge: 'UP TO ₹5 LAKH',
            isRider: true,
            iconType: 'cpu'
          },
          {
            id: 'yuva-opt-compassionate-visit',
            title: 'Compassionate Visit',
            subtitle: 'Family Travel Allowance During Hospitalization Outside Residence',
            summary: 'Up to **INR 50,000** for 2-way travel fare if hospitalization exceeds **10 days outside the city of residence**.',
            points: [
              'Up to **INR 50,000** for 2-way travel fare for a family member',
              'Applicable if hospitalization exceeds 10 days outside the city of residence'
            ],
            badge: 'UP TO INR 50,000',
            isRider: true,
            iconType: 'users'
          },
          {
            id: 'yuva-opt-opd-cover',
            title: 'OPD Cover',
            subtitle: 'Cashless Medical OPD & Wellness Services up to 5X Base Premium',
            summary: 'Choose up to **5X Base Premium** for OPD Procedures & Wellness Services on a Cashless Basis.',
            points: [
              'Choose up to **5X Base Premium** for OPD Procedures & Wellness Services on Cashless Basis',
              '**Medical OPD:** Doctor Consultations, Diagnostics, Dental Procedures, Pharmacy, Physiotherapy, Vision Aids',
              '**Wellness:** Physical Gym Memberships, Mental Wellbeing, Diet & Nutrition, and more'
            ],
            badge: 'UP TO 5X BASE PREMIUM',
            isRider: true,
            iconType: 'dollar'
          },
          {
            id: 'yuva-opt-worldwide-maternity',
            title: 'Worldwide Yuva Maternity Cover',
            subtitle: 'Global Maternity, Infertility, Egg Freezing & Adoption Support',
            summary: 'Comprehensive maternity cover with Start Early Advantage, Normal/C-Section, Pre/Post Natal (180 Days), Infertility treatments, Egg Freezing up to 30%, and Adoption Support up to INR 50,000.',
            points: [
              '**Start Early Advantage:** Start Waiting Period as Individual; carried forward to spouse when added after marriage. Standard waiting periods apply to legally married couples',
              '**Maternity Coverages:** Up to 1 Delivery Event, Normal Delivery, C-Section, Medically Necessary Termination of Pregnancy',
              '**Pre & Post-Natal:** 180 Days Pre-Natal and 180 Days Post-Natal expenses covered',
              '**Infertility & Advanced Care:** IVF, IUI, ICSI, GIFT, ZIFT, and Egg Freezing up to 30% of Maternity Sum Insured',
              '**Adoption Support:** Up to **INR 50,000** towards applicable Legal & Government charges'
            ],
            badge: 'GLOBAL MATERNITY + IVF',
            isRider: true,
            iconType: 'smile'
          },
          {
            id: 'yuva-opt-newborn-baby',
            title: 'Newborn Baby Cover',
            subtitle: 'Medical Expense Protection from Birth to 90 Days',
            summary: 'Medical expenses for Newborn Baby up to **90 days from date of birth**. Options: **Up to INR 50,000** | **Up to INR 1 Lakh** | **Up to INR 2 Lakhs**.',
            points: [
              'Medical expenses for Newborn Baby covered up to **90 days from date of birth**',
              '**Option 1:** Up to INR 50,000',
              '**Option 2:** Up to INR 1 Lakh',
              '**Option 3:** Up to INR 2 Lakhs'
            ],
            badge: 'UP TO INR 2 LAKHS',
            isRider: true,
            iconType: 'heart'
          },
          {
            id: 'yuva-opt-income-protect',
            title: 'Income Protect Cover',
            subtitle: 'Fixed Lump Sum Compensation for Hospitalization Exceeding 7 Days',
            summary: 'Fixed lump sum to cover loss of income if hospitalization exceeds **7 consecutive days** due to Illness or Injury. Options: **INR 50,000** | **INR 1,00,000**.',
            points: [
              'Fixed lump sum to cover loss of income if hospitalization exceeds **7 consecutive days** due to Illness or Injury',
              '**Option 1:** INR 50,000',
              '**Option 2:** INR 1,00,000'
            ],
            badge: 'INR 50,000 / 1,00,000',
            isRider: true,
            iconType: 'shield'
          },
          {
            id: 'yuva-opt-fitforward-premium',
            title: 'FitForward Premium',
            subtitle: 'Ultimate Wellness Upgrade with Wearable Device & Rewards',
            summary: 'Ultimate Wellness Upgrade with Variants: Basic, Elite, Ultra. Includes FitForward Rewards Program and Year 1 Fitness Tool / Wearable Device according to selected variant.',
            points: [
              '**Variants:** Basic, Elite, Ultra',
              '**FitForward Rewards Program:** Participate in wellness challenges via mobile app with rewards driven by measurable health outcomes',
              '**Fitness Tool / Wearable Device:** Provided in Year 1 (Basic: Standard Tool, Elite: Advanced Tool, Ultra: Premium Tool)',
              'At renewal: Select same variant with a tool again OR continue with wellness benefits without tool. New tool provided on variant switch'
            ],
            badge: 'WELLNESS & WEARABLE',
            isRider: true,
            iconType: 'zap'
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // PLAN: ACTIV ONE MAX+ (ADITYA BIRLA HEALTH INSURANCE)
  // ===========================================================================
  'activ-one-max-plus': {
    planId: 'activ-one-max-plus',
    planName: 'Activ One MAX+',
    fullName: 'Aditya Birla Health Insurance Activ One MAX+',
    companyName: 'Aditya Birla Health Insurance',
    tagline: 'Premium Health Coverage with Comprehensive Hospitalization, Chronic Care & Health Management',
    coverage: 'Comprehensive Cover',
    premium: '',
    categoryBadge: 'Health Policy',
    policySubtitle: 'Aditya Birla Health Insurance Policy',

    // --- NAVIGATION & BUTTON LABELS ---
    backToPlansLabel: 'Back to Aditya Birla Plans',
    backToPlanLabel: 'Back to Activ One MAX+',
    featuresHeadingSuffix: 'POLICY BENEFITS',
    policyBenefitsButtonLabel: 'POLICY BENEFITS',
    reportCardButtonLabel: 'REPORT CARD',
    companyStrengthButtonLabel: 'COMPANY STRENGTH',
    limitationsButtonLabel: 'LIMITATIONS & WAITING PERIODS',
    mustKnowButtonLabel: 'MUST KNOW DETAILS',
    termsFootnote: '*Terms & Conditions Apply',

    // --- PLAN-SPECIFIC UI CONFIG ---
    uiConfig: {
      primaryColor: '#D51D25',
      secondaryColor: '#F68529',
      accentColor: '#F5D34F',
      textColor: '#0F172A',
      secondaryTextColor: '#475569',
      demoVideoUrl: DEMO_VIDEO_URL
    },

    // --- SUMMARY BENEFITS & DETAILS ---
    benefits: [
      'Hospitalization Treatment: Room Rent & ICU Charges Covered',
      'Road Ambulance Cover & All Day Care Treatments Covered',
      'Modern Procedures / Treatments & Advanced Robotic Surgeries',
      'Pre-Hospitalization 90 Days & Post-Hospitalization 180 Days',
      'Claim Protect, Domiciliary Hospitalization & Home Health Care',
      'Super Reload, Super Credit & Durable Equipment Cover',
      'Advanced Health Check-up: CTA & PET Scan Included',
      'Day 1 Chronic Care & Health Management Program'
    ],
    details: {
      eligibility: 'As per Aditya Birla Health Insurance Policy Guidelines',
      waitingPeriod: 'Standard Policy Waiting Periods Apply',
      roomRent: 'Room Rent Covered for Inpatient Hospitalization',
      hospitalization: 'Inpatient Hospitalization Covered',
      prePostHospital: '90 Days Pre & 180 Days Post Hospitalization',
      dayCare: 'All Day Care Treatments & Modern Procedures Covered',
      noClaimBonus: 'Super Credit Bonus Increment on Renewal',
      exclusions: 'Standard policy exclusions as per IRDAI guidelines'
    },

    // =========================================================================
    // 1. REPORT CARD (PERFORMANCE METRICS)
    // =========================================================================
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Aditya Birla Health Insurance Performance',
      description: 'Official claim settlement track record and operational metrics.',

      csr: {
        title: 'CSR',
        summaryValue: '95.8%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR represents the percentage of claims settled by Aditya Birla Health Insurance with streamlined cashless approvals across 11,000+ network hospitals.',
        singleYear: '95.8%',
        singleYearLabel: 'Recent Single Year',
        threeYearAvg: '94.6%',
        threeYearAvgLabel: '3 Year Average',
        videoTitle: 'CSR Metrics',
        videoUrl: DEMO_VIDEO_URL
      },

      icr: {
        title: 'ICR',
        summaryValue: '64.2%',
        subtitle: 'Incurred Claim Ratio',
        explanation: 'ICR indicates the proportion of total premium collected paid out towards policyholder claims, reflecting high financial solvency and claim fairness.',
        range: '64.2%',
        rangeLabel: 'Annual Incurred Claims Ratio',
        videoTitle: 'ICR Overview',
        videoUrl: DEMO_VIDEO_URL
      },

      complaintVolume: {
        title: 'Complaints',
        summaryValue: '12 / 10,000',
        subtitle: 'Low Grievance Rate',
        explanation: 'Low grievance frequency per 10,000 claims with proactive customer dispute resolution mechanism.',
        volume: '12 per 10,000',
        volumeLabel: 'Complaint Ratio',
        resolutionRate: '99.4%',
        resolutionRateLabel: 'Resolution Rate',
        videoTitle: 'Resolution Standards',
        videoUrl: DEMO_VIDEO_URL
      }
    },

    // =========================================================================
    // 2. COMPANY STRENGTH (FINANCIAL SOUNDNESS & MARKET REPUTATION)
    // =========================================================================
    companyStrength: {
      heading: 'COMPANY STRENGTH',
      subheading: 'Institutional Profile & Solvency Metrics',
      description: 'Financial stability, promoter pedigree, and healthcare provider network.',

      ownership: {
        title: 'Promoter Pedigree',
        summaryValue: 'Aditya Birla Group & MMI Holdings',
        description: 'Joint venture between Aditya Birla Group, a Fortune 500 conglomerate, and MMI Holdings, a pioneering South African health insurer with deep wellness innovation expertise.'
      },

      solvency: {
        title: 'Solvency Ratio',
        summaryValue: '1.92x',
        mandate: '1.50x IRDAI Mandate',
        description: 'Aditya Birla Health Insurance maintains a robust 1.92x solvency ratio, substantially above the statutory 1.50x requirement, guaranteeing full financial resilience for catastrophic payouts.'
      },

      networkHospitals: {
        title: 'Cashless Network',
        summaryValue: '11,000+ Hospitals',
        cashlessTAT: '60 Mins TAT',
        description: 'Pan-India network of 11,000+ cashless hospitals with digital instant approvals and 60-minute pre-authorization turnaround time.'
      },

      assetsUnderManagement: {
        title: 'AUM & Reserves',
        summaryValue: '₹3,000+ Cr AUM',
        description: 'Over ₹3,000 Crore in assets under management dedicated to underwriting health risk and customer policyholder protection.'
      }
    },

    // =========================================================================
    // 3. LIMITATIONS & WAITING PERIODS
    // =========================================================================
    limitationsSection: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Standard Policy Waiting Periods & Exclusions',
      description: 'Clearly outlined statutory waiting periods, condition-specific terms, and policy exclusions.',

      limitations: [
        {
          id: 'initial-waiting-period',
          title: 'Initial 30 Days Waiting Period',
          period: '30 Days',
          description: 'No claims are admissible for any illness during the first 30 days from policy inception, except for accidental bodily injuries requiring hospitalization.',
          policyRef: 'Section 4.1 — Initial Waiting Period'
        },
        {
          id: 'specific-ailment-waiting-period',
          title: 'Specific Disease Waiting Period (24 Months)',
          period: '24 Months (2 Years)',
          description: 'Standard 24-month waiting period applies to listed specific ailments including Cataract, Hernia, Hydrocele, Joint Replacements, ENT disorders, and benign growths (can be reduced to 1 year via optional rider).',
          policyRef: 'Section 4.2 — Specific Disease Schedule'
        },
        {
          id: 'ped-waiting-period',
          title: 'Pre-Existing Disease (PED) Waiting Period',
          period: '36 Months (3 Years)',
          description: 'Pre-existing medical conditions declared at the time of proposal are covered after continuous coverage period (can be reduced with optional rider, or Day 1 for listed chronic conditions under Chronic Care).',
          policyRef: 'Section 4.3 — Pre-Existing Disease Clause'
        },
        {
          id: 'standard-exclusions',
          title: 'Standard Policy Exclusions',
          period: 'Permanent Exclusions',
          description: 'Expenses related to cosmetic surgery, intentional self-injury, drug or alcohol abuse, adventure sports, experimental treatments, and breach of law are permanently excluded.',
          policyRef: 'Section 5 — Permanent Exclusions (IRDAI Guidelines)'
        }
      ]
    },

    // =========================================================================
    // 4. MUST KNOW DETAILS (SPECIAL HIGHLIGHTS)
    // =========================================================================
    mustKnow: {
      heading: 'MUST KNOW DETAILS',
      subheading: 'Crucial Highlights for Activ One MAX+',
      buttonLabel: 'MUST KNOW DETAILS',
      items: [
        {
          id: 'mk-hospitalization-treatment',
          title: 'Hospitalization Treatment',
          highlight: 'Room Rent & ICU Charges Covered',
          description: 'Comprehensive coverage for in-patient hospital admission, room charges, and intensive care unit expenses.'
        },
        {
          id: 'mk-advanced-checkup',
          title: 'Advanced Health Check-up',
          highlight: 'CTA & PET Scan Diagnostics Included',
          description: 'High-end advanced diagnostic investigations including Computed Tomography Angiography (CTA) and PET Scan.'
        },
        {
          id: 'mk-chronic-care',
          title: 'Chronic Care — Day 1 Protection',
          highlight: '7 Chronic Conditions Covered from Day 1',
          description: 'Immediate inpatient hospitalization coverage from Day 1 for Diabetes, Hypertension, Asthma, Hyperlipidemia, COPD, Obesity, and CAD.'
        },
        {
          id: 'mk-super-reload',
          title: 'Super Reload & Super Credit',
          highlight: 'Automatic Restoration & Bonus Accumulation',
          description: 'Restoration of Base Sum Insured and cumulative bonus growth on annual policy renewal.'
        },
        {
          id: 'mk-claim-protect',
          title: 'Claim Protect',
          highlight: 'Non-Medical Items & Consumables Covered',
          description: 'Covers non-payable hospital consumables and administrative expenses.'
        }
      ]
    },

    // =========================================================================
    // 5. POLICY BENEFITS (ACTIV ONE MAX+ — EXACT 4 MAIN CATEGORIES)
    // 1. Most Important (18 items)
    // 2. Value Added (4 items)
    // 3. Additional (7 items)
    // 4. Optional (6 items)
    // =========================================================================
    featuresSections: [
      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 1: MOST IMPORTANT (18 ITEMS)
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-most-important',
        title: 'MOST IMPORTANT',
        isProminent: true,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'maxplus-hospitalization-treatment',
            title: 'Hospitalization Treatment',
            subtitle: 'Room Rent & ICU Charges',
            summary: 'In-patient hospitalization treatment covered.',
            points: [
              '**Room Rent:** Covered for in-patient hospital admission',
              '**ICU Charges:** Covered for Intensive Care Unit treatment'
            ],
            badge: 'ROOM RENT & ICU',
            isProminent: true,
            iconType: 'home'
          },
          {
            id: 'maxplus-road-ambulance',
            title: 'Road Ambulance Cover',
            subtitle: 'Emergency Medical Transit',
            summary: 'Road ambulance coverage for emergency medical transit.',
            points: [
              'Covers emergency road ambulance transit to the nearest hospital'
            ],
            badge: 'ROAD AMBULANCE',
            isProminent: true,
            iconType: 'truck'
          },
          {
            id: 'maxplus-day-care-treatments',
            title: 'Day Care Treatments',
            subtitle: 'Advanced Medical Procedures Under 24 Hours',
            summary: 'Day care treatments and medical procedures covered.',
            points: [
              'Covers medical treatments requiring less than 24 hours of hospitalization'
            ],
            badge: 'DAY CARE PROCEDURES',
            isProminent: true,
            iconType: 'clock'
          },
          {
            id: 'maxplus-modern-procedures',
            title: 'Modern Procedures / Treatments',
            subtitle: 'Advanced & Robotic Medical Surgeries',
            summary: 'Covered for listed modern procedures and treatments.',
            points: [
              'Covers modern procedures and advanced robotic surgeries'
            ],
            badge: 'MODERN PROCEDURES',
            isProminent: true,
            iconType: 'cpu'
          },
          {
            id: 'maxplus-hiv-aids-std',
            title: 'HIV/AIDS & STD Cover',
            subtitle: 'Inpatient Medical Treatment',
            summary: 'Coverage for HIV/AIDS and STD inpatient hospitalization.',
            points: [
              'Inpatient hospitalization coverage for HIV/AIDS and STDs'
            ],
            badge: 'INPATIENT COVER',
            isProminent: true,
            iconType: 'shield'
          },
          {
            id: 'maxplus-mental-illness',
            title: 'Mental Illness Hospitalization',
            subtitle: 'Inpatient Psychiatric Care',
            summary: 'Inpatient mental healthcare hospitalization covered.',
            points: [
              'Covered for inpatient psychiatric and mental illness hospitalization'
            ],
            badge: 'MENTAL HEALTHCARE',
            isProminent: true,
            iconType: 'heart'
          },
          {
            id: 'maxplus-obesity-treatment',
            title: 'Obesity Treatment',
            subtitle: 'Surgical Weight Management',
            summary: 'Obesity treatment and bariatric surgery covered as per medical guidelines.',
            points: [
              'Covers surgical obesity management as per medical necessity guidelines'
            ],
            badge: 'OBESITY CARE',
            isProminent: true,
            iconType: 'activity'
          },
          {
            id: 'maxplus-pre-hospitalization',
            title: 'Pre-Hospitalization – 90 Days',
            subtitle: 'Medical Expenses Prior to Admission',
            summary: 'Covered for **90 Days** prior to hospital admission.',
            points: [
              'Medical expenses covered for **90 Days** prior to admission'
            ],
            badge: '90 DAYS COVERED',
            isProminent: true,
            iconType: 'calendar'
          },
          {
            id: 'maxplus-post-hospitalization',
            title: 'Post-Hospitalization – 180 Days',
            subtitle: 'Medical Expenses Following Discharge',
            summary: 'Covered for **180 Days** following hospital discharge.',
            points: [
              'Medical expenses covered for **180 Days** post-discharge'
            ],
            badge: '180 DAYS COVERED',
            isProminent: true,
            iconType: 'calendar'
          },
          {
            id: 'maxplus-claim-protect',
            title: 'Claim Protect',
            subtitle: 'Non-Medical Expenses Waiver',
            summary: 'Non-payable and consumable items covered.',
            points: [
              'Coverage for non-medical and non-payable expenses'
            ],
            badge: 'NON-MEDICAL WAIVER',
            isProminent: true,
            iconType: 'shield'
          },
          {
            id: 'maxplus-domiciliary-hospitalization',
            title: 'Domiciliary Hospitalization',
            subtitle: 'Medical Treatment at Home',
            summary: 'Domiciliary medical hospitalization covered.',
            points: [
              'Treatment administered at home when hospital admission is not viable'
            ],
            badge: 'HOME HOSPITALIZATION',
            isProminent: true,
            iconType: 'home'
          },
          {
            id: 'maxplus-home-health-care',
            title: 'Home Health Care',
            subtitle: 'Cashless Qualified Home Care',
            summary: 'Home healthcare treatment covered.',
            points: [
              'Qualified medical care at home through empanelled providers'
            ],
            badge: 'HOME CARE',
            isProminent: true,
            iconType: 'heart'
          },
          {
            id: 'maxplus-ayush-treatment',
            title: 'AYUSH Treatment',
            subtitle: 'Ayurveda, Yoga, Unani, Siddha & Homeopathy',
            summary: 'Inpatient AYUSH treatment covered.',
            points: [
              'Covered for inpatient treatment under recognized AYUSH institutes'
            ],
            badge: 'AYUSH TREATMENT',
            isProminent: true,
            iconType: 'activity'
          },
          {
            id: 'maxplus-organ-donor-expenses',
            title: 'Organ Donor Expenses',
            subtitle: 'Inpatient Harvesting for Donor',
            summary: 'Organ donor inpatient hospitalization covered.',
            points: [
              'Covers organ donor harvesting and inpatient hospitalization'
            ],
            badge: 'ORGAN DONOR',
            isProminent: true,
            iconType: 'heart'
          },
          {
            id: 'maxplus-super-reload',
            title: 'Super Reload',
            subtitle: 'Automatic Sum Insured Restoration',
            summary: 'Automatic restoration of Base Sum Insured.',
            points: [
              'Restoration of Base Sum Insured for subsequent hospitalizations'
            ],
            badge: 'SUPER RELOAD',
            isProminent: true,
            iconType: 'refresh'
          },
          {
            id: 'maxplus-super-credit',
            title: 'Super Credit',
            subtitle: 'Cumulative Bonus Growth',
            summary: 'Cumulative bonus increment on renewal.',
            points: [
              'Increases Sum Insured through cumulative bonus on renewal'
            ],
            badge: 'SUPER CREDIT',
            isProminent: true,
            iconType: 'trending'
          },
          {
            id: 'maxplus-durable-equipment',
            title: 'Durable Equipment Cover',
            subtitle: 'Medical Equipment & Device Support',
            summary: 'Coverage for listed durable medical equipment.',
            points: [
              'Covers listed durable medical devices and equipment'
            ],
            badge: 'DURABLE EQUIPMENT',
            isProminent: true,
            iconType: 'cpu'
          },
          {
            id: 'maxplus-advanced-health-checkup',
            title: 'Advanced Health Check-up',
            subtitle: 'CTA & PET Scan Diagnostics',
            summary: 'Advanced diagnostic health screening including **CTA** and **PET Scan**.',
            points: [
              '**CTA:** Computed Tomography Angiography diagnostics covered',
              '**PET Scan:** Positron Emission Tomography scan covered'
            ],
            badge: 'CTA & PET SCAN',
            isProminent: true,
            iconType: 'check'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 2: VALUE ADDED (4 ITEMS — HEALTH MANAGEMENT PROGRAM)
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-value-added',
        title: 'valueAdded',
        isProminent: false,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        items: [
          {
            id: 'maxplus-annual-health-checkup',
            title: 'Annual Health Check-up',
            subtitle: 'Preventive Full-Body Screening',
            summary: 'Annual cashless health check-up.',
            points: [
              'Cashless annual preventive health check-up'
            ],
            badge: 'ANNUAL CHECK-UP',
            iconType: 'check'
          },
          {
            id: 'maxplus-health-assessment',
            title: 'Health Assessment™',
            subtitle: 'Annual Wellness Evaluation',
            summary: 'Annual health assessment through empanelled network providers.',
            points: [
              'Health assessment conducted on a cashless or digital basis'
            ],
            badge: 'HEALTH ASSESSMENT',
            iconType: 'activity'
          },
          {
            id: 'maxplus-health-returns',
            title: 'HealthReturns™',
            subtitle: 'Wellness Rewards for Staying Active',
            summary: 'Earn HealthReturns™ by tracking daily health activity.',
            points: [
              'Health management rewards earned for maintaining active lifestyle'
            ],
            badge: 'HEALTHRETURNS',
            iconType: 'dollar'
          },

        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 3: ADDITIONAL (7 ITEMS)
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-additional',
        title: 'ADDITIONAL',
        isProminent: false,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'maxplus-chronic-care-day1',
            title: 'Chronic Care – Day 1 In-patient Hospitalization',
            subtitle: 'Day 1 Coverage for Listed Chronic Conditions',
            summary: 'Day 1 inpatient coverage for listed chronic conditions: **Diabetes, Hypertension, Asthma, Hyperlipidemia, COPD, Obesity, Coronary Artery Disease**.',
            points: [
              '**Diabetes** covered from Day 1',
              '**Hypertension** covered from Day 1',
              '**Asthma** covered from Day 1',
              '**Hyperlipidemia** covered from Day 1',
              '**COPD** covered from Day 1',
              '**Obesity** covered from Day 1',
              '**Coronary Artery Disease** covered from Day 1'
            ],
            badge: '7 CONDITIONS COVERED',
            iconType: 'zap'
          },
          {
            id: 'maxplus-chronic-management-opd',
            title: 'Chronic Management Program (OPD)',
            subtitle: 'Outpatient Management for Chronic Illnesses',
            summary: 'OPD consultations and management for chronic conditions.',
            points: [
              'Cashless OPD management and consultations for listed chronic illnesses'
            ],
            badge: 'CHRONIC OPD',
            iconType: 'clipboard'
          },
          {
            id: 'maxplus-cancer-booster',
            title: 'Cancer Booster',
            subtitle: 'Additional Oncology Protection',
            summary: 'Enhanced coverage for cancer treatments.',
            points: [
              'Pre-hospitalization, post-hospitalization, and day care cancer treatments covered'
            ],
            badge: 'CANCER PROTECTION',
            iconType: 'shield'
          },
          {
            id: 'maxplus-compassionate-visit',
            title: 'Compassionate Visit',
            subtitle: 'Family Travel Allowance During Hospitalization',
            summary: 'Travel assistance for a family member during prolonged hospitalization.',
            points: [
              'Covers two-way travel fare for a family member during extended hospitalization'
            ],
            badge: 'COMPASSIONATE VISIT',
            iconType: 'users'
          },
          {
            id: 'maxplus-second-medical-opinion',
            title: 'Second Medical Opinion',
            subtitle: 'Expert Specialist Consultation',
            summary: 'Expert second opinion for listed major illnesses.',
            points: [
              'Access to expert medical specialists for diagnosis confirmation'
            ],
            badge: 'SECOND OPINION',
            iconType: 'clipboard'
          },
          {
            id: 'maxplus-cancer-screening',
            title: 'Annual Screening Package for Cancer Diagnosed Patients',
            subtitle: 'Post-Diagnosis Surveillance Package',
            summary: 'Annual diagnostic oncology screening package for cancer patients.',
            points: [
              'Annual surveillance tests and investigations for diagnosed cancer patients'
            ],
            badge: 'CANCER SCREENING',
            iconType: 'shield'
          },
          {
            id: 'maxplus-ppn-discount',
            title: 'Preferred Provider Network (PPN) Discount',
            subtitle: 'Discount on Preferred Network Utilization',
            summary: 'Discount applicable under preferred provider network benefit.',
            points: [
              'Premium discount when utilizing preferred network hospitals'
            ],
            badge: 'PPN DISCOUNT',
            iconType: 'credit'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 4: OPTIONAL (6 ITEMS)
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-optional',
        title: 'optional',
        isProminent: false,
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'maxplus-opt-specific-disease',
            title: 'Reduction in Specific Disease Waiting Period',
            subtitle: 'Reduced Waiting Period for Specific Ailments',
            summary: 'Optional reduction in specific disease waiting period.',
            points: [
              'Reduces the standard waiting period for listed specific ailments'
            ],
            badge: 'SPECIFIC DISEASE REDUCTION',
            isRider: true,
            iconType: 'clock'
          },
          {
            id: 'maxplus-opt-ped-reduction',
            title: 'Reduction in Pre-Existing Disease Waiting Period',
            subtitle: 'Accelerated Pre-Existing Disease Cover',
            summary: 'Optional reduction in pre-existing disease (PED) waiting period.',
            points: [
              'Reduces the standard waiting period for declared pre-existing conditions'
            ],
            badge: 'PED REDUCTION',
            isRider: true,
            iconType: 'clock'
          },
          {
            id: 'maxplus-opt-room-rent',
            title: 'Room Rent Type Options',
            subtitle: 'Room Accommodation Category Options',
            summary: 'Flexibility to select preferred room rent accommodation category.',
            points: [
              'Choose between Single Private Room and Shared Room options'
            ],
            badge: 'ROOM TYPE OPTIONS',
            isRider: true,
            iconType: 'home'
          },
          {
            id: 'maxplus-opt-per-claim-deductible',
            title: 'Per Claim Deductible',
            subtitle: 'Voluntary Per-Claim Deductible Option',
            summary: 'Optional per-claim deductible for premium optimization.',
            points: [
              'Opt for per-claim deductible to optimize annual premium'
            ],
            badge: 'PER CLAIM DEDUCTIBLE',
            isRider: true,
            iconType: 'dollar'
          },
          {
            id: 'maxplus-opt-critical-illness',
            title: 'Critical Illness Cover',
            subtitle: 'Lump Sum Critical Illness Rider',
            summary: 'Lump sum compensation upon first diagnosis of listed critical illness.',
            points: [
              'Provides lump sum benefit on diagnosis of covered critical illnesses'
            ],
            badge: 'CRITICAL ILLNESS',
            isRider: true,
            iconType: 'heart'
          },
          {
            id: 'maxplus-opt-personal-accident',
            title: 'Personal Accident Cover',
            subtitle: 'Accidental Death & Disability Compensation',
            summary: 'Coverage for accidental death, permanent total disability, and permanent partial disability.',
            points: [
              'Covers Accidental Death, Permanent Total Disability, and Permanent Partial Disability'
            ],
            badge: 'PERSONAL ACCIDENT',
            isRider: true,
            iconType: 'shield'
          }
        ]
      }
    ]
  }
};

export const getAdityaBirlaPlanData = (planId) => {
  const canonicalId = resolveAdityaBirlaPlanId(planId);
  return ADITYA_BIRLA_PLANS_DATA[canonicalId] || null;
};

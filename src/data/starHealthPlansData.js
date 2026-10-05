// =============================================================================
// STAR HEALTH PLANS INDEPENDENT DATA CONFIGURATION
// Flagship Plan: Star Health Women Care → star-women-care
// Super Star Plan: 5 Variants → Classic, Secure, Preferred, Essential, Value Plus
// =============================================================================

import {
  SUPER_STAR_PARENT_PLAN,
  SUPER_STAR_VARIANTS_DATA,
  SUPER_STAR_VARIANTS_META,
  STAR_HEALTH_SHARED_REPORT_CARD,
  STAR_HEALTH_SHARED_COMPANY_STRENGTH
} from './starHealthSuperStarVariantsData';

export {
  SUPER_STAR_PARENT_PLAN,
  SUPER_STAR_VARIANTS_DATA,
  SUPER_STAR_VARIANTS_META,
  STAR_HEALTH_SHARED_REPORT_CARD,
  STAR_HEALTH_SHARED_COMPANY_STRENGTH
};

export const STAR_HEALTH_CANONICAL_PLAN_IDS = [
  'star-women-care',
  'star-young-star',
  'star-health-assure',
  'star-super-star',
  'star-super-star-classic',
  'star-super-star-secure',
  'star-super-star-preferred',
  'star-super-star-essential',
  'star-super-star-value-plus'
];

export const resolveStarHealthPlanId = (planId) => {
  if (!planId) return null;
  const cleanId = String(planId).toLowerCase().trim();
  if (
    cleanId === 'star-health-assure' ||
    cleanId === 'health-assure' ||
    cleanId === 'healthassure' ||
    cleanId === 'star-healthassure' ||
    cleanId === 'star-assure'
  ) {
    return 'star-health-assure';
  }
  if (
    cleanId === 'star-young-star' ||
    cleanId === 'young-star' ||
    cleanId === 'youngstar' ||
    cleanId === 'star-young'
  ) {
    return 'star-young-star';
  }
  if (
    cleanId === 'star-women-care' ||
    cleanId === 'women-care' ||
    cleanId === 'star-women' ||
    cleanId === 'womencare'
  ) {
    return 'star-women-care';
  }
  if (
    cleanId === 'star-super-star-classic' ||
    cleanId === 'super-star-classic' ||
    cleanId === 'classic'
  ) {
    return 'star-super-star-classic';
  }
  if (
    cleanId === 'star-super-star-secure' ||
    cleanId === 'super-star-secure' ||
    cleanId === 'secure'
  ) {
    return 'star-super-star-secure';
  }
  if (
    cleanId === 'star-super-star-preferred' ||
    cleanId === 'super-star-preferred' ||
    cleanId === 'preferred'
  ) {
    return 'star-super-star-preferred';
  }
  if (
    cleanId === 'star-super-star-essential' ||
    cleanId === 'super-star-essential' ||
    cleanId === 'essential'
  ) {
    return 'star-super-star-essential';
  }
  if (
    cleanId === 'star-super-star-value-plus' ||
    cleanId === 'super-star-value-plus' ||
    cleanId === 'value-plus' ||
    cleanId === 'valueplus'
  ) {
    return 'star-super-star-value-plus';
  }
  if (
    cleanId === 'star-super-star' ||
    cleanId === 'super-star' ||
    cleanId === 'superstar'
  ) {
    return 'star-super-star';
  }
  return cleanId;
};

export const STAR_HEALTH_PLANS_DATA = {
  // ===========================================================================
  // PLAN: STAR HEALTH WOMEN CARE
  // ===========================================================================
  'star-women-care': {
    planId: 'star-women-care',
    planName: 'Women Care',
    fullName: 'Star Health Women Care',
    companyName: 'Star Health',
    tagline: 'Comprehensive Women-Centric Health Cover with Inbuilt Consumables & Mother ICU Cover',
    coverage: '₹5 Lakh - ₹1 Crore',
    premium: '₹14,500/year',

    uiConfig: {
      primaryColor: '#003087',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Star Health Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'CSR',
        summaryValue: '97.9%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR shows the percentage of eligible claims settled by Star Health within the financial year through its massive network of 14,000+ cashless hospitals.',
        singleYear: '97.9%',
        singleYearLabel: 'Recent Single Year (FY2024-25)',
        threeYearAvg: '98.1%',
        threeYearAvgLabel: '3 Year Average (FY2022-25)'
      },
      icr: {
        title: 'ICR',
        summaryValue: '63%',
        subtitle: 'Incurred Claim Ratio',
        explanation: "ICR measures the percentage of net premium paid out as claims. Star Health's healthy ICR of 63% ensures financial viability and seamless claim honoring.",
        range: '63% → 66%',
        rangeLabel: 'Incurred Claim Ratio'
      },
      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        summaryValue: '18.5',
        explanation: 'Measures registered complaints per 10,000 settled claims with dedicated in-house claim processing and 24/7 doctor assistance.',
        value: '18.5',
        label: 'Complaints per 10,000 Claims'
      }
    },

    // --- 2. COMPANY STRENGTH (INDEPENDENT) ---
    companyStrength: {
      heading: 'COMPANY STRENGTH',
      subheading: 'How reliable/strong is the insurer?',
      description: 'How reliable/strong is the insurer?',
      ownership: {
        title: 'OWNERSHIP / PERCENTAGE',
        summaryValue: 'Public / Institutional',
        explanation: "India's first and largest Standalone Health Insurer (SAHI), backed by prominent institutional investors including the Rakesh Jhunjhunwala Estate, Safecrop Investments, and WestBridge Capital.",
        items: [
          { name: 'Safecrop Investments & Promoters', value: '47.8%', label: 'Shareholding' },
          { name: 'Rakesh Jhunjhunwala Estate & Family', value: '17.3%', label: 'Shareholding' },
          { name: 'Institutional & Public Investors', value: '34.9%', label: 'Shareholding' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'AA-',
        explanation: 'Credit ratings reflect strong financial stability, high claims-paying ability, and disciplined underwriting fundamentals.',
        items: [
          { agency: 'CRISIL', rating: 'AA- / Stable' },
          { agency: 'ICRA', rating: 'AA- / Stable' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '1.72×',
        explanation: "Solvency ratio represents the financial strength buffer to honor claims under adverse conditions, comfortably above the IRDAI mandatory requirement of 1.50×.",
        value: '1.72×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹14,200+ Cr',
        explanation: 'Substantial investment assets and capital reserves backing prompt claim settlements across 14,000+ hospitals.',
        value: '₹14,200+ Cr',
        label: 'Investment Assets under Management'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: '85%+',
        explanation: 'Reinsurance treaties placed with world-class global reinsurers including Munich Re and General Insurance Corporation of India (GIC Re).',
        value: '85%+',
        label: 'Backed by Munich Re & GIC Re'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: '#1 SAHI',
        explanation: "India's #1 standalone health insurance company with over 14,000+ cashless network hospitals and 850+ branch offices pan-India.",
        value: '#1 Standalone Health Insurer',
        label: 'Over 17 Crore+ Lives Covered'
      }
    },

    // --- 3. LIMITATIONS & WAITING PERIODS (INDEPENDENT) ---
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Terms & Waiting Periods',
      description: 'Interactive policy timelines, specific disease waiting, and permanent exclusions.',
      items: [
        {
          id: 'initial',
          title: 'Initial Waiting Period (30 Days)',
          summary: 'A mandatory waiting period of 30 days applies from policy inception for any non-accidental illness or disease hospitalization.',
          highlight: 'Accidental hospitalization is covered from Day 1 with zero waiting period.',
          policyRef: 'Star Health Women Care Policy Terms (Section 4.1)',
          durationTag: '30 Days'
        },
        {
          id: 'specific',
          title: '2 Years Waiting Period on Specific Diseases',
          summary: 'A continuous waiting period of 24 months (2 Years) applies for medical or surgical treatment of specified conditions including cataract, hernia, joint replacements, and benign tumors.',
          diseaseList: [
            'Cataract & eye surgeries',
            'Benign Prostatic Hypertrophy (BPH)',
            'Hernia (all types) & Hydrocele',
            'Piles, Fistula & Fissure in ano',
            'Stones in Urinary, Biliary & Renal systems',
            'Hysterectomy for Menorrhagia / Fibroids',
            'Joint replacements (non-accidental)',
            'Osteoarthritis & Osteoporosis',
            'Sinusitis, DNS, Tonsillectomy & Adenoidectomy',
            'Benign cysts, nodules, polyps & tumors',
            'Varicose veins & varicose ulcers',
            'Spondylosis, Spondylitis & Disc disorders'
          ],
          policyRef: 'Star Health Women Care Specific Disease Schedule (Section 4.2)',
          durationTag: '24 Months'
        },
        {
          id: 'ped',
          title: '24 Months Pre-Existing Disease (PED) Waiting',
          summary: 'A waiting period of 24 months of continuous coverage applies for pre-existing medical conditions declared at inception.',
          highlight: 'Continuous coverage and timely annual renewals preserve cumulative waiting credits.',
          policyRef: 'Star Health Women Care Policy Terms (Section 4.3)',
          durationTag: '24 Months'
        },
        {
          id: 'cancer-rider-waiting',
          title: '180 Days Waiting Period on Optional Cancer Cover',
          summary: 'A waiting period of 180 days applies from inception for lump sum payout on first diagnosis of female cancer (if opted).',
          policyRef: 'Star Health Women Care Optional Cancer Rider (Section 5.1)',
          durationTag: '180 Days'
        },
        {
          id: 'permanent',
          title: 'Permanent Exclusions',
          summary: 'The policy does not cover medical expenses incurred towards hospitalisation or treatment of the following permanent exclusions:',
          exclusionsList: [
            'Yoga & Naturopathy treatments',
            'Cosmetic, aesthetic & plastic surgery',
            'Intentional self-injury & suicide attempt',
            'Alcohol, drug or substance abuse treatments',
            'Obesity & weight control procedures',
            'Investigation & diagnostic-only admissions',
            'Rest cure, rehabilitation & respite care',
            'Unproven / experimental treatments',
            'Participation in hazardous adventure sports',
            'Expenses arising from breach of law',
            'War, nuclear or chemical contamination'
          ],
          policyRef: 'Standard IRDAI & Star Health Guidelines (Section 6)',
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW (INDEPENDENT) ---
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Important Women Care policy terms that policyholders should keep in mind',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'women-centric',
          icon: '👩',
          title: 'WOMEN-CENTRIC SPECIALIZED COVERAGE',
          paragraphs: [
            'Dedicated health insurance specifically tailored for female health requirements, maternity, and family floater structures.',
            'Surrogate mothers, oocyte donors, and pregnant women eligible with specific scan reports.'
          ]
        },
        {
          id: 'room-rent-tier',
          icon: '🏥',
          title: 'ROOM RENT BASED ON SUM INSURED',
          paragraphs: [
            '₹5 Lakh SI: 1% of Sum Insured per day.',
            '₹10 Lakh – ₹25 Lakh SI: Any room (except suite or above).',
            '₹50 Lakh – ₹1 Crore SI: Any room with zero room rent capping.'
          ]
        },
        {
          id: 'star-mother-cover-mustknow',
          icon: '👶',
          title: 'STAR MOTHER COVER (ICU STAY)',
          paragraphs: [
            'If an insured child (<12 yrs) is in ICU, the mother\'s hospital stay is covered in a single private room.',
            'If hospital room is unavailable, a hotel stay allowance of ₹2,500/day for up to 7 days is covered within 2 km.'
          ]
        },
        {
          id: 'inbuilt-consumables',
          icon: '🛡️',
          title: 'INBUILT CONSUMABLES COVER',
          paragraphs: [
            'Consumables cover is inbuilt into the policy, eliminating out-of-pocket costs for surgical gloves, masks, syringes, PPE kits, and cotton.'
          ]
        }
      ]
    },

    // --- 5. 4 POLICY BENEFITS CATEGORIES (EXACTLY 4 MAIN HEADINGS) ---
    featuresSections: [
      // -----------------------------------------------------------------------
      // CATEGORY 1: MOST IMPORTANT
      // -----------------------------------------------------------------------
      {
        id: 'most-important',
        title: 'MOST IMPORTANT',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'women-room-rent',
            title: 'Room Rent Limits',
            subtitle: 'Tier-wise Room Rent Coverage',
            badge: 'ROOM RENT LIMITS',
            iconType: 'home',
            summary: 'Room Rent Limits apply based on the chosen Sum Insured: ₹5L SI provides 1% of SI per day, ₹10L – ₹25L SI allows Any room (except suite or above), and ₹50L – ₹1 Cr SI covers Any room with zero capping.',
            points: [
              '₹5L SI: 1% of SI per day',
              '₹10L – ₹25L SI: Any room (except suite or above)',
              '₹50L – ₹1 Cr SI: Any room'
            ]
          },
          {
            id: 'women-ambulance',
            title: 'Ambulance',
            subtitle: 'Road & Air Ambulance Covered',
            badge: 'ROAD & AIR AMBULANCE',
            iconType: 'truck',
            summary: 'Surface road ambulance expenses are covered, and air ambulance is covered up to 10% of Sum Insured for Sum Insured of ₹10 Lakh & above.',
            points: [
              'Road: Covered',
              'Air Ambulance: Covered up to 10% of SI (for SI ₹10L & above)'
            ]
          },
          {
            id: 'women-day-care',
            title: 'All day care procedures covered',
            subtitle: 'All Day Care Surgeries & Medical Treatments',
            badge: 'ALL DAY CARE',
            iconType: 'activity',
            summary: 'All day care medical procedures and surgeries requiring less than 24 hours of hospital admission due to technological advancements are covered up to Sum Insured.',
            points: [
              'All day care procedures covered',
              'No minimum 24-hour hospitalization required for advanced day care surgeries',
              'Covers dialysis, chemotherapy, radiotherapy, and minor surgeries'
            ]
          },
          {
            id: 'women-consumables',
            title: 'Consumables: Covered (inbuilt)',
            subtitle: 'Inbuilt Non-Payable Medical Items Coverage',
            badge: 'INBUILT COVER',
            iconType: 'shield',
            summary: 'Consumables cover is inbuilt into the policy, covering non-medical disposable items like gloves, masks, PPE kits, and surgical disposables.',
            points: [
              'Consumables: Covered (inbuilt)',
              'Covers non-payable medical items, surgical gloves, PPE kits, and cotton',
              'Zero out-of-pocket deductions on listed consumables during discharge'
            ]
          },
          {
            id: 'women-pre-post',
            title: 'Pre & Post hospitalization: 60 days & 90 days',
            subtitle: '60 Days Pre & 90 Days Post Hospitalization',
            badge: '60 & 90 DAYS',
            iconType: 'calendar',
            summary: 'Medical expenses incurred 60 days prior to hospital admission and 90 days following hospital discharge are covered for consultations, diagnostic tests, and prescribed medicines.',
            points: [
              'Pre & Post hospitalization: 60 days & 90 days',
              '60 days pre-hospitalization diagnostic and consultation expenses covered',
              '90 days post-hospitalization recovery tests and medications covered'
            ]
          },
          {
            id: 'women-organ-donor',
            title: 'Organ Donor Expenses: Covered',
            subtitle: 'Organ Harvesting Expenses for Donor',
            badge: 'COVERED',
            iconType: 'heart',
            summary: 'Inpatient hospitalization expenses incurred towards harvesting the organ from a living donor for the insured recipient are covered.',
            points: [
              'Organ Donor Expenses: Covered',
              'Inpatient harvesting expenses for donor covered up to Sum Insured',
              'Protects financial stability during major organ transplantation surgeries'
            ]
          },
          {
            id: 'women-ayush',
            title: 'AYUSH Treatment: Covered (except Yoga & Naturopathy)',
            subtitle: 'Ayurveda, Unani, Siddha & Homeopathy Covered',
            badge: 'COVERED',
            iconType: 'shield',
            summary: 'Inpatient medical treatment taken under Ayurveda, Unani, Siddha, and Homeopathy at recognized government or accredited institutions is covered (except Yoga & Naturopathy).',
            points: [
              'AYUSH Treatment: Covered (except Yoga & Naturopathy)',
              'Inpatient treatments at recognized government AYUSH hospitals covered',
              'Yoga and Naturopathy treatments are excluded'
            ]
          },
          {
            id: 'women-modern-treatments',
            title: 'Modern Treatments: Covered (limits apply)',
            subtitle: 'Advanced Robotic & Technological Surgeries',
            badge: 'COVERED (LIMITS APPLY)',
            iconType: 'cpu',
            summary: 'Modern advanced treatments including robotic surgeries, immunotherapy, stem cell therapy, and precision radiotherapy are covered (sub-limits apply as per policy terms).',
            points: [
              'Modern Treatments: Covered (limits apply)',
              'Covers robotic surgeries, oral chemotherapy, and deep brain stimulation',
              'Sub-limits apply as per policy schedule'
            ]
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 2: VALUE ADDED
      // -----------------------------------------------------------------------
      {
        id: 'value-added',
        title: 'valueAdded',
        gridCols: 'grid-cols-1 sm:grid-cols-2',
        items: [
          {
            id: 'women-star-mother-cover',
            title: 'Star Mother Cover',
            subtitle: 'Hospital Stay / Hotel Allowance for Mother of Insured Child in ICU',
            badge: 'MOTHER COVER',
            iconType: 'heart',
            summary: 'If an insured child (<12 yrs) is admitted in the ICU, the mother\'s hospital stay is covered in a single private room; if unavailable, a hotel stay allowance of ₹2,500/day for up to 7 days is provided (within 2 km of hospital).',
            points: [
              'If insured child (<12 yrs) is in ICU:',
              'Mother\'s hospital stay: Covered in a single private room',
              'If not available: ₹2,500/day for max 7 days for hotel stay (within 2 km)'
            ]
          },
          {
            id: 'women-restoration-si',
            title: 'Restoration of SI: 100% once a year',
            subtitle: '100% Automatic Sum Insured Refill',
            badge: '100% ONCE / YEAR',
            iconType: 'refresh',
            summary: 'Automatic restoration of 100% basic Sum Insured is triggered once in a policy year upon partial or full exhaustion of the sum insured.',
            points: [
              'Restoration of SI: 100% once a year',
              'Recharges base Sum Insured automatically for subsequent hospitalizations',
              'Available for unrelated and subsequent medical conditions in the policy year'
            ]
          },
          {
            id: 'women-cumulative-bonus',
            title: 'Cumulative Bonus: 20% per claim-free year, up to 100%',
            subtitle: '20% Bonus Growth on Claim-Free Renewals',
            badge: '20% TO 100% BONUS',
            iconType: 'trending',
            summary: 'A cumulative bonus of 20% of basic Sum Insured is provided for each claim-free policy year, scaling up to a maximum of 100% of Sum Insured with zero extra premium.',
            steps: [
              'Year 1 Claim-Free: +20% Bonus',
              'Year 2 Claim-Free: +40% Bonus',
              'Year 3 Claim-Free: +60% Bonus',
              'Year 4 Claim-Free: +80% Bonus',
              'Year 5 (Max): 100% Bonus (Coverage Doubled)'
            ],
            points: [
              'Cumulative Bonus: 20% per claim-free year, up to 100%',
              'Increases base Sum Insured by 20% for every claim-free renewal',
              'Doubles your health coverage up to a maximum 100% cumulative bonus'
            ]
          },
          {
            id: 'women-shared-room',
            title: 'Shared Room Benefit: ₹2,000/day, max 7 days (24 hrs mandatory stay)',
            subtitle: 'Daily Cash for Choosing Shared Accommodation',
            badge: '₹2,000 / DAY',
            iconType: 'dollar',
            summary: 'If the insured opts for a shared room accommodation instead of an eligible private room, a daily allowance of ₹2,000 per day is paid for a maximum of 7 days (minimum 24 hours mandatory stay required).',
            points: [
              'Shared Room Benefit: ₹2,000/day, max 7 days (24 hrs mandatory stay)',
              'Daily cash incentive for opting shared room accommodation',
              'Requires a minimum continuous 24 hours hospitalization stay'
            ]
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 3: ADDITIONAL
      // -----------------------------------------------------------------------
      {
        id: 'additional',
        title: 'ADDITIONAL',
        gridCols: 'grid-cols-1 sm:grid-cols-2',
        items: [
          {
            id: 'women-eligibility',
            title: 'Eligibility',
            subtitle: 'Age & Female-Centric Membership Criteria',
            badge: 'ELIGIBILITY CRITERIA',
            iconType: 'users',
            summary: 'Special eligibility criteria designed for women and families: Individual Plan is for female members (18–75 years), Family Floater permits males if at least one adult female is covered, children covered 91 days to 25 years, unmarried/unemployed daughters up to 30 years, surrogate mothers & oocyte donors (25–35 yrs), and pregnant women (with 12 & 20 week scans).',
            points: [
              'Individual Plan: Only female members (age 18–75 years)',
              'Family Floater: Male members allowed if at least one adult female is covered',
              'Children: 91 days to 25 years',
              'Daughter: Can stay as a dependent if unmarried and/or unemployed up to 30 years',
              'Surrogate Mother & Oocyte Donor: Covered (age 25–35, conditions apply)',
              'Pregnant Woman: Eligible to buy (must submit 12 & 20 week pregnancy scans from approved centres)'
            ]
          },
          {
            id: 'women-mid-term',
            title: 'Mid-Term Inclusion',
            subtitle: 'Mid-Term Addition Guidelines for Spouse & Children',
            badge: 'MID-TERM INCLUSION',
            iconType: 'calendar',
            summary: 'Mid-term inclusion guidelines allow adding a newly married spouse or legally adopted child within 45 days, and newborn babies within 90 days with coverage starting from the 91st day.',
            points: [
              'Spouse / Adopted Child: Inform within 45 days of marriage/adoption',
              'Newborn Baby: Inform within 90 days; coverage starts from 91st day'
            ]
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 4: OPTIONAL
      // -----------------------------------------------------------------------
      {
        id: 'optional',
        title: 'optional',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'women-cancer-diagnosis',
            title: 'Lump Sum on Cancer Diagnosis (Female Only)',
            subtitle: '₹5L–₹25L Lump Sum Payout on Female Cancer Diagnosis',
            badge: 'OPTIONAL COVER',
            isRider: true,
            iconType: 'shield',
            summary: 'Provides an optional lump sum payout of ₹5 Lakh to ₹25 Lakh upon first diagnosis of female-specific cancer, subject to an initial waiting period of 180 days.',
            points: [
              'Lump Sum on Cancer Diagnosis (Female Only)',
              '₹5L–₹25L depending on plan',
              'Waiting period: 180 days'
            ]
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // PLAN: STAR HEALTH YOUNG STAR INSURANCE POLICY
  // ===========================================================================
  'star-young-star': {
    planId: 'star-young-star',
    planName: 'Young Star Insurance Policy',
    fullName: 'Star Health Young Star Insurance Policy',
    companyName: 'Star Health and Allied Insurance Co. Ltd.',
    subtitle: 'Start Young, Stay Covered',
    tagline: 'Tailored health protection for individuals aged 18–40 with 100% restoration, additional RTA cover, and 12-month waiting periods',
    coverage: '₹3 Lakh - ₹1 Crore',
    premium: '₹8,500/year',

    uiConfig: {
      primaryColor: '#003087',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },

    // --- 1. REPORT CARD (STAR HEALTH OFFICIAL METRICS) ---
    reportCard: STAR_HEALTH_SHARED_REPORT_CARD,

    // --- 2. COMPANY STRENGTH (STAR HEALTH INSTITUTIONAL STRENGTH) ---
    companyStrength: STAR_HEALTH_SHARED_COMPANY_STRENGTH,

    // --- 3. LIMITATIONS & WAITING PERIODS ---
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Terms & Waiting Periods',
      description: 'Interactive policy timelines, specific illness waiting, and permanent exclusions.',
      items: [
        {
          id: 'young-initial-waiting',
          title: 'Initial Waiting Period (30 Days)',
          summary: 'A 30-day initial waiting period applies from policy inception for any non-accidental illness or disease hospitalisation.',
          highlight: 'Accidental hospitalisation covered from Day 1 with zero waiting period.',
          policyRef: 'Star Health Young Star Policy Terms (Section 4.1)',
          durationTag: '30 Days'
        },
        {
          id: 'young-specific-waiting-limitation',
          title: 'Specific Illness Waiting Period (12 Months)',
          summary: 'A continuous waiting period of 12 months applies for medical or surgical treatment of specified illnesses declared at inception.',
          highlight: 'Fast-tracked 12-month waiting period compared to the standard 24 months in conventional health policies.',
          diseaseList: [
            'Cataract & eye surgeries',
            'Benign Prostatic Hypertrophy (BPH)',
            'Hernia (all types) & Hydrocele',
            'Piles, Fistula & Fissure in ano',
            'Stones in urinary, biliary & renal systems',
            'Hysterectomy for Menorrhagia / Fibroids',
            'Joint replacements (non-accidental)',
            'Osteoarthritis & Osteoporosis',
            'Sinusitis, DNS, Tonsillectomy & Adenoidectomy',
            'Benign cysts, nodules, polyps & tumors'
          ],
          policyRef: 'Star Health Young Star Specific Illness Schedule',
          durationTag: '12 Months'
        },
        {
          id: 'young-ped-waiting-limitation',
          title: 'Pre-Existing Disease (PED) Waiting Period (12 Months)',
          summary: 'Pre-existing medical conditions disclosed at inception are covered after just 12 months of continuous coverage.',
          highlight: 'Shortest-in-class 12-month PED waiting period for young policyholders.',
          policyRef: 'Star Health Young Star Policy Terms (Section 4.3)',
          durationTag: '12 Months'
        },
        {
          id: 'young-permanent-exclusions',
          title: 'Permanent Exclusions',
          summary: 'The policy does not cover medical expenses incurred towards hospitalisation or treatment of the following permanent exclusions:',
          exclusionsList: [
            'Cosmetic, aesthetic & plastic surgery',
            'Intentional self-injury & suicide attempt',
            'Alcohol, drug or substance abuse treatments',
            'Obesity & weight control procedures',
            'Investigation & diagnostic-only admissions',
            'Rest cure, rehabilitation & respite care',
            'Unproven / experimental treatments',
            'Participation in hazardous adventure sports',
            'Expenses arising from breach of law',
            'War, nuclear or chemical contamination'
          ],
          policyRef: 'Standard IRDAI & Star Health Guidelines',
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW ---
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Important Young Star policy terms that policyholders should keep in mind',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'young-age-criteria',
          icon: '👥',
          title: 'ELIGIBILITY & ENTRY AGE (18 TO 40 YEARS)',
          paragraphs: [
            'Tailored specifically for young adults aged 18 to 40 years at entry, with lifelong renewability once enrolled.',
            'Available on both Individual and Family Floater basis (Self, Spouse, and up to 3 dependent children).'
          ]
        },
        {
          id: 'young-fast-track-ped',
          icon: '⏱️',
          title: 'FAST-TRACK 12-MONTH WAITING PERIODS',
          paragraphs: [
            'Both Pre-Existing Diseases (PED) and Specific Illnesses carry an industry-low waiting period of only 12 months, compared to standard 24–36 months.'
          ]
        },
        {
          id: 'young-rta-protection',
          icon: '🛡️',
          title: 'ADDITIONAL 25% RTA COVER',
          paragraphs: [
            'An additional 25% of Sum Insured (up to ₹10 Lakh) is provided for Road Traffic Accidents (RTA) requiring in-patient hospitalization, above the base Sum Insured.'
          ]
        },
        {
          id: 'young-gold-variant-privileges',
          icon: '⭐',
          title: 'GOLD PLAN PRIVILEGES',
          paragraphs: [
            'Gold Plan includes Delivery Expenses up to ₹30,000 per delivery (max 2 deliveries) and Hospital Cash Benefit of ₹1,000/day (max 7 days per hospitalization, 14 days per year).'
          ]
        }
      ]
    },

    // --- 5. 4 POLICY BENEFITS CATEGORIES (EXACTLY 4 MAIN HEADINGS) ---
    featuresSections: [
      // -----------------------------------------------------------------------
      // CATEGORY 1: MOST IMPORTANT
      // -----------------------------------------------------------------------
      {
        id: 'most-important',
        title: 'MOST IMPORTANT',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'young-cumulative-bonus',
            title: 'Cumulative Bonus',
            subtitle: '20% of Basic Sum Insured per claim-free year, maximum 100%',
            badge: 'UP TO 100% BONUS',
            iconType: 'trending',
            summary: '20% of Basic Sum Insured per claim-free year, maximum 100%',
            steps: [
              'Year 1: +20%',
              'Year 2: +40%',
              'Year 3: +60%',
              'Year 4: +80%',
              'Year 5: 100% Max'
            ]
          },
          {
            id: 'young-restoration-si',
            title: 'Automatic Restoration of Sum Insured',
            subtitle: '100% restoration, once in a policy year, for related & unrelated claims',
            badge: '100% RESTORATION',
            iconType: 'refresh',
            summary: '100% restoration, once in a policy year, for related & unrelated claims'
          },
          {
            id: 'young-additional-rta',
            title: 'Additional RTA Cover',
            subtitle: 'Additional 25% of Sum Insured, maximum ₹10 lakh',
            badge: '+25% SI (MAX ₹10L)',
            iconType: 'shield',
            summary: 'Additional 25% of Sum Insured, maximum ₹10 lakh'
          },
          {
            id: 'young-ped-waiting',
            title: 'Pre-Existing Disease Waiting Period',
            subtitle: '12 months',
            badge: '12 MONTHS',
            iconType: 'clock',
            summary: '12 months'
          },
          {
            id: 'young-specific-illness-waiting',
            title: 'Specific Illness Waiting Period',
            subtitle: '12 months',
            badge: '12 MONTHS',
            iconType: 'clock',
            summary: '12 months'
          },
          {
            id: 'young-inpatient-treatment',
            title: 'In-Patient Treatment',
            subtitle: 'Covered up to Sum Insured',
            badge: 'UP TO SUM INSURED',
            iconType: 'activity',
            summary: 'Covered up to Sum Insured'
          },
          {
            id: 'young-room-rent',
            title: 'Room Rent',
            subtitle: 'Single Private A/C Room',
            badge: 'SINGLE PRIVATE A/C',
            iconType: 'home',
            summary: 'Single Private A/C Room'
          },
          {
            id: 'young-day-care',
            title: 'Day Care Treatment',
            subtitle: 'All day-care procedures covered',
            badge: 'ALL DAY CARE',
            iconType: 'clipboard',
            summary: 'All day-care procedures covered'
          },
          {
            id: 'young-pre-hospitalisation',
            title: 'Pre-Hospitalisation',
            subtitle: '60 days',
            badge: '60 DAYS',
            iconType: 'calendar',
            summary: '60 days'
          },
          {
            id: 'young-post-hospitalisation',
            title: 'Post-Hospitalisation',
            subtitle: '90 days',
            badge: '90 DAYS',
            iconType: 'calendar',
            summary: '90 days'
          },
          {
            id: 'young-road-ambulance',
            title: 'Road Ambulance',
            subtitle: 'Covered up to Sum Insured',
            badge: 'UP TO SUM INSURED',
            iconType: 'truck',
            summary: 'Covered up to Sum Insured'
          },
          {
            id: 'young-home-care',
            title: 'Home Care Treatment',
            subtitle: 'Up to 10% of Sum Insured, maximum ₹5 lakh/year',
            badge: 'UP TO 10% SI',
            iconType: 'home',
            summary: 'Up to 10% of Sum Insured, maximum ₹5 lakh/year'
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 2: VALUE ADDED
      // -----------------------------------------------------------------------
      {
        id: 'value-added',
        title: 'valueAdded',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'young-preventive-checkup',
            title: 'Preventive Health Check-up',
            subtitle: 'Preventive health check-up available as per applicable Sum Insured and policy terms',
            badge: 'HEALTH CHECK-UP',
            iconType: 'heart',
            summary: 'Preventive health check-up available as per applicable Sum Insured and policy terms'
          },
          {
            id: 'young-second-opinion',
            title: 'E-Domestic Second Medical Opinion',
            subtitle: "E-Domestic Second Medical Opinion through the Company's network of Medical Practitioners",
            badge: 'SECOND OPINION',
            iconType: 'users',
            summary: "E-Domestic Second Medical Opinion through the Company's network of Medical Practitioners"
          },
          {
            id: 'young-tele-consultation',
            title: 'Unlimited Tele-Consultation',
            subtitle: 'Unlimited tele-consultations through Star Health digital platforms',
            badge: 'UNLIMITED',
            iconType: 'activity',
            summary: 'Unlimited tele-consultations through Star Health digital platforms'
          },
          {
            id: 'young-wellness-program',
            title: 'STAR Wellness Program',
            subtitle: 'Earn wellness points and get renewal premium discount up to 10%',
            badge: 'UP TO 10% DISCOUNT',
            iconType: 'smile',
            summary: 'Earn wellness points and get renewal premium discount up to 10%'
          },
          {
            id: 'young-ayush',
            title: 'AYUSH Treatment',
            subtitle: 'Coverage for Ayurveda, Unani, Siddha and Homeopathy treatment',
            badge: 'AYUSH COVERED',
            iconType: 'shield',
            summary: 'Coverage for Ayurveda, Unani, Siddha and Homeopathy treatment'
          },
          {
            id: 'young-modern-treatments',
            title: 'Modern Treatments',
            subtitle: 'Listed advanced modern treatments covered as per applicable policy limits',
            badge: 'MODERN TREATMENTS',
            iconType: 'cpu',
            summary: 'Listed advanced modern treatments covered as per applicable policy limits'
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 3: ADDITIONAL
      // -----------------------------------------------------------------------
      {
        id: 'additional',
        title: 'ADDITIONAL',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'young-delivery-expenses',
            title: 'Delivery Expenses',
            subtitle: 'Gold Plan only — up to ₹30,000 per delivery, maximum 2 deliveries',
            badge: 'GOLD PLAN ONLY',
            iconType: 'heart',
            summary: 'Gold Plan only — up to ₹30,000 per delivery, maximum 2 deliveries'
          },
          {
            id: 'young-hospital-cash',
            title: 'Hospital Cash Benefit',
            subtitle: 'Gold Plan only — ₹1,000/day, maximum 7 days per hospitalisation and 14 days per policy period',
            badge: 'GOLD PLAN ONLY',
            iconType: 'dollar',
            summary: 'Gold Plan only — ₹1,000/day, maximum 7 days per hospitalisation and 14 days per policy period'
          },
          {
            id: 'young-maternity-coverage',
            title: 'Maternity Coverage',
            subtitle: 'Available under Gold Plan subject to applicable waiting period',
            badge: 'GOLD PLAN ONLY',
            iconType: 'heart',
            summary: 'Available under Gold Plan subject to applicable waiting period'
          },
          {
            id: 'young-instalment-facility',
            title: 'Instalment Facility',
            subtitle: 'Monthly, Quarterly and Half-yearly',
            badge: 'FLEXIBLE EMI',
            iconType: 'credit',
            summary: 'Monthly, Quarterly and Half-yearly'
          },
          {
            id: 'young-long-term-discount',
            title: 'Long-Term Discount',
            subtitle: '10% discount in 2nd year and 12.5% discount in 3rd year',
            badge: 'UP TO 12.5% OFF',
            iconType: 'trending',
            summary: '10% discount in 2nd year and 12.5% discount in 3rd year'
          },
          {
            id: 'young-online-discount',
            title: 'Online Discount',
            subtitle: '5% discount on first online purchase',
            badge: '5% DISCOUNT',
            iconType: 'zap',
            summary: '5% discount on first online purchase'
          },
          {
            id: 'young-favourable-claim-discount',
            title: 'Favourable Claim Experience Discount',
            subtitle: 'Up to 5%, subject to eligibility and applicable policy conditions',
            badge: 'UP TO 5% DISCOUNT',
            iconType: 'smile',
            summary: 'Up to 5%, subject to eligibility and applicable policy conditions'
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 4: OPTIONAL
      // -----------------------------------------------------------------------
      {
        id: 'optional',
        title: 'optional',
        gridCols: 'grid-cols-1',
        items: [
          {
            id: 'young-no-optional-benefit',
            title: 'No Separate Optional Benefit Specified',
            subtitle: 'No separate optional add-on/rider is specified in the provided Young Star policy content.',
            badge: 'NO SEPARATE RIDER',
            iconType: 'shield',
            summary: 'No separate optional add-on/rider is specified in the provided Young Star policy content.'
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // PLAN: STAR HEALTH HEALTHASSURE
  // ===========================================================================
  'star-health-assure': {
    planId: 'star-health-assure',
    planName: 'HealthAssure',
    fullName: 'Star Health HealthAssure',
    companyName: 'Star Health and Allied Insurance Co. Ltd.',
    subtitle: 'Star Health Insurance Policy',
    tagline: 'Comprehensive assurance with unlimited automatic restoration, any room category, and listed consumables coverage',
    coverage: '₹5 Lakh - ₹2 Crore',
    premium: '₹12,500/year',

    uiConfig: {
      primaryColor: '#003087',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },

    // --- 1. REPORT CARD (STAR HEALTH OFFICIAL METRICS) ---
    reportCard: STAR_HEALTH_SHARED_REPORT_CARD,

    // --- 2. COMPANY STRENGTH (STAR HEALTH INSTITUTIONAL STRENGTH) ---
    companyStrength: STAR_HEALTH_SHARED_COMPANY_STRENGTH,

    // --- 3. LIMITATIONS & WAITING PERIODS ---
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Terms & Waiting Periods',
      description: 'Interactive policy timelines, specific disease waiting, and permanent exclusions.',
      items: [
        {
          id: 'assure-initial-waiting',
          title: 'Initial Waiting Period (30 Days)',
          summary: '30 days for illnesses, except accidents.',
          highlight: 'Accidental hospitalisation is covered from Day 1 with zero waiting period.',
          policyRef: 'Star Health HealthAssure Policy Terms (Section 4.1)',
          durationTag: '30 Days'
        },
        {
          id: 'assure-specific-disease-waiting',
          title: 'Specific Disease Waiting Period (2 Years)',
          summary: '2 years continuous coverage required for specified illnesses and surgical procedures.',
          highlight: 'Specified illnesses covered after 24 months of continuous renewal.',
          diseaseList: [
            'Cataract & eye surgeries',
            'Benign Prostatic Hypertrophy (BPH)',
            'Hernia (all types) & Hydrocele',
            'Piles, Fistula & Fissure in ano',
            'Stones in urinary, biliary & renal systems',
            'Hysterectomy for Menorrhagia / Fibroids',
            'Joint replacements (non-accidental)',
            'Osteoarthritis & Osteoporosis',
            'Sinusitis, DNS, Tonsillectomy & Adenoidectomy',
            'Benign cysts, nodules, polyps & tumors'
          ],
          policyRef: 'Star Health HealthAssure Specific Disease Schedule',
          durationTag: '2 Years'
        },
        {
          id: 'assure-ped-waiting',
          title: 'Pre-Existing Disease (PED) Waiting Period (3 Years / 2.5 Years)',
          summary: '3 years / 2.5 years depending on policy term.',
          highlight: 'Declared pre-existing conditions covered after 3 years or 2.5 years based on policy tenure.',
          policyRef: 'Star Health HealthAssure Policy Terms (Section 4.3)',
          durationTag: '3 / 2.5 Yrs'
        },
        {
          id: 'assure-permanent-exclusions',
          title: 'Permanent Exclusions',
          summary: 'The policy does not cover medical expenses incurred towards hospitalisation or treatment of the following permanent exclusions:',
          exclusionsList: [
            'Cosmetic, aesthetic & plastic surgery',
            'Intentional self-injury & suicide attempt',
            'Alcohol, drug or substance abuse treatments',
            'Obesity & weight control procedures',
            'Investigation & diagnostic-only admissions',
            'Rest cure, rehabilitation & respite care',
            'Unproven / experimental treatments',
            'Participation in hazardous adventure sports',
            'Expenses arising from breach of law',
            'War, nuclear or chemical contamination'
          ],
          policyRef: 'Standard IRDAI & Star Health Guidelines',
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW ---
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Important HealthAssure policy terms that policyholders should keep in mind',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'assure-unlimited-restoration',
          icon: '🔄',
          title: 'UNLIMITED AUTOMATIC RESTORATION',
          paragraphs: [
            'Sum Insured restored unlimited number of times, maximum 100% each time during the policy period.'
          ]
        },
        {
          id: 'assure-any-room',
          icon: '🏥',
          title: 'ANY ROOM CATEGORY (EXCEPT SUITE OR ABOVE)',
          paragraphs: [
            'Room rent coverage allows Any Room, except Suite or above category / as applicable.'
          ]
        },
        {
          id: 'assure-consumables',
          icon: '🛡️',
          title: 'LISTED CONSUMABLES COVERED',
          paragraphs: [
            'Listed consumables under admissible inpatient/day-care claims are payable.'
          ]
        },
        {
          id: 'assure-deductible-options',
          icon: '💰',
          title: 'AGGREGATE DEDUCTIBLE DISCOUNT UP TO 55%',
          paragraphs: [
            'Optional aggregate deductible allows up to 55% discount on policy premium.'
          ]
        }
      ]
    },

    // --- 5. 4 POLICY BENEFITS CATEGORIES (EXACTLY 4 MAIN HEADINGS) ---
    featuresSections: [
      // -----------------------------------------------------------------------
      // CATEGORY 1: MOST IMPORTANT
      // -----------------------------------------------------------------------
      {
        id: 'most-important',
        title: 'MOST IMPORTANT',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'assure-automatic-restoration',
            title: 'Automatic Restoration',
            subtitle: 'Sum Insured restored unlimited number of times, maximum 100% each time.',
            badge: 'UNLIMITED RESTORATION',
            iconType: 'refresh',
            summary: 'Sum Insured restored unlimited number of times, maximum 100% each time.'
          },
          {
            id: 'assure-cumulative-bonus',
            title: 'Cumulative Bonus',
            subtitle: '25% of Sum Insured for each claim-free year, maximum 100%.',
            badge: '25% TO 100%',
            iconType: 'trending',
            summary: '25% of Sum Insured for each claim-free year, maximum 100%.',
            steps: [
              'Year 1: +25%',
              'Year 2: +50%',
              'Year 3: +75%',
              'Year 4 (Max): 100%'
            ]
          },
          {
            id: 'assure-inpatient-hospitalisation',
            title: 'In-Patient Hospitalisation',
            subtitle: 'Hospitalisation expenses covered as per policy terms.',
            badge: 'COVERED',
            iconType: 'activity',
            summary: 'Hospitalisation expenses covered as per policy terms.'
          },
          {
            id: 'assure-room-rent',
            title: 'Room Rent',
            subtitle: 'Any Room, except Suite or above category / as applicable.',
            badge: 'ANY ROOM',
            iconType: 'home',
            summary: 'Any Room, except Suite or above category / as applicable.'
          },
          {
            id: 'assure-pre-post-hospitalisation',
            title: 'Pre & Post Hospitalisation',
            subtitle: '60 days pre and 180 days post hospitalisation.',
            badge: '60 & 180 DAYS',
            iconType: 'calendar',
            summary: '60 days pre and 180 days post hospitalisation.'
          },
          {
            id: 'assure-day-care-treatments',
            title: 'Day Care Treatments',
            subtitle: 'All day-care treatments covered up to Sum Insured.',
            badge: 'ALL DAY CARE',
            iconType: 'clipboard',
            summary: 'All day-care treatments covered up to Sum Insured.'
          },
          {
            id: 'assure-emergency-road-ambulance',
            title: 'Emergency Road Ambulance',
            subtitle: 'Covered up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'truck',
            summary: 'Covered up to Sum Insured.'
          },
          {
            id: 'assure-domiciliary-hospitalisation',
            title: 'Domiciliary Hospitalisation',
            subtitle: 'Covered up to Sum Insured.',
            badge: 'COVERED',
            iconType: 'home',
            summary: 'Covered up to Sum Insured.'
          },
          {
            id: 'assure-home-care-treatment',
            title: 'Home Care Treatment',
            subtitle: 'Up to 10% of Sum Insured, maximum ₹5 lakh per policy year.',
            badge: 'UP TO 10% SI',
            iconType: 'home',
            summary: 'Up to 10% of Sum Insured, maximum ₹5 lakh per policy year.'
          },
          {
            id: 'assure-air-ambulance',
            title: 'Air Ambulance',
            subtitle: 'Up to 10% of Sum Insured per policy year.',
            badge: 'UP TO 10% SI',
            iconType: 'truck',
            summary: 'Up to 10% of Sum Insured per policy year.'
          },
          {
            id: 'assure-organ-donor-expenses',
            title: 'Organ Donor Expenses',
            subtitle: 'Covered up to Sum Insured.',
            badge: 'COVERED',
            iconType: 'heart',
            summary: 'Covered up to Sum Insured.'
          },
          {
            id: 'assure-modern-treatments',
            title: 'Modern Treatments',
            subtitle: 'Covered up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'cpu',
            summary: 'Covered up to Sum Insured.'
          },
          {
            id: 'assure-initial-waiting-period',
            title: 'Initial Waiting Period',
            subtitle: '30 days for illnesses, except accidents.',
            badge: '30 DAYS',
            iconType: 'clock',
            summary: '30 days for illnesses, except accidents.'
          },
          {
            id: 'assure-specific-disease-waiting-period',
            title: 'Specific Disease Waiting Period',
            subtitle: '2 years.',
            badge: '2 YEARS',
            iconType: 'clock',
            summary: '2 years.'
          },
          {
            id: 'assure-ped-waiting-period',
            title: 'Pre-Existing Disease Waiting Period',
            subtitle: '3 years / 2.5 years depending on policy term.',
            badge: '3 YRS / 2.5 YRS',
            iconType: 'clock',
            summary: '3 years / 2.5 years depending on policy term.'
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 2: VALUE ADDED
      // -----------------------------------------------------------------------
      {
        id: 'value-added',
        title: 'valueAdded',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'assure-health-checkup',
            title: 'Health Check-up Assure',
            subtitle: 'Available every policy year irrespective of claim, with limits based on Sum Insured.',
            badge: 'EVERY YEAR',
            iconType: 'heart',
            summary: 'Available every policy year irrespective of claim, with limits based on Sum Insured.'
          },
          {
            id: 'assure-star-wellness-program',
            title: 'Star Wellness Program',
            subtitle: 'Earn wellness points and receive renewal premium discount up to 20%.',
            badge: 'UP TO 20% DISCOUNT',
            iconType: 'smile',
            summary: 'Earn wellness points and receive renewal premium discount up to 20%.'
          },
          {
            id: 'assure-ayush-treatment',
            title: 'AYUSH Treatment',
            subtitle: 'Ayurveda, Unani, Siddha & Homeopathy covered up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'shield',
            summary: 'Ayurveda, Unani, Siddha & Homeopathy covered up to Sum Insured.'
          },
          {
            id: 'assure-second-medical-opinion',
            title: 'Second Medical Opinion',
            subtitle: "Available through Company's network of Medical Practitioners.",
            badge: 'SECOND OPINION',
            iconType: 'users',
            summary: "Available through Company's network of Medical Practitioners."
          },
          {
            id: 'assure-compassionate-travel',
            title: 'Compassionate Travel',
            subtitle: 'Air transportation expenses up to ₹10,000 for one immediate family member.',
            badge: 'UP TO ₹10,000',
            iconType: 'truck',
            summary: 'Air transportation expenses up to ₹10,000 for one immediate family member.'
          },
          {
            id: 'assure-repatriation-mortal-remains',
            title: 'Repatriation of Mortal Remains',
            subtitle: 'Up to ₹15,000 per policy year.',
            badge: 'UP TO ₹15,000',
            iconType: 'shield',
            summary: 'Up to ₹15,000 per policy year.'
          },
          {
            id: 'assure-valuable-sp-network',
            title: 'Treatment in Valuable Service Providers Network',
            subtitle: 'Lump-sum benefit up to ₹5,000 per policy period.',
            badge: 'UP TO ₹5,000',
            iconType: 'activity',
            summary: 'Lump-sum benefit up to ₹5,000 per policy period.'
          },
          {
            id: 'assure-rehab-pain-management',
            title: 'Rehabilitation & Pain Management',
            subtitle: 'As per applicable sub-limit, maximum 20% of Sum Insured.',
            badge: 'MAX 20% SI',
            iconType: 'activity',
            summary: 'As per applicable sub-limit, maximum 20% of Sum Insured.'
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 3: ADDITIONAL
      // -----------------------------------------------------------------------
      {
        id: 'additional',
        title: 'ADDITIONAL',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'assure-delivery-expenses',
            title: 'Delivery Expenses',
            subtitle: 'Up to 10% of Sum Insured, subject to applicable conditions.',
            badge: 'UP TO 10% SI',
            iconType: 'heart',
            summary: 'Up to 10% of Sum Insured, subject to applicable conditions.'
          },
          {
            id: 'assure-assisted-reproduction',
            title: 'Assisted Reproduction Treatment',
            subtitle: 'Covered with policy-year limits based on Sum Insured.',
            badge: 'COVERED',
            iconType: 'heart',
            summary: 'Covered with policy-year limits based on Sum Insured.'
          },
          {
            id: 'assure-newborn-baby-hospitalisation',
            title: 'New Born Baby Hospitalisation',
            subtitle: 'Coverage available with limits based on Sum Insured.',
            badge: 'COVERED',
            iconType: 'smile',
            summary: 'Coverage available with limits based on Sum Insured.'
          },
          {
            id: 'assure-in-utero-fetal-surgery',
            title: 'In Utero Fetal Surgery / Intervention',
            subtitle: 'Covered up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'activity',
            summary: 'Covered up to Sum Insured.'
          },
          {
            id: 'assure-asthma-cover',
            title: 'Chronic Severe Refractory Asthma',
            subtitle: 'Up to 10% of Sum Insured, maximum ₹5 lakh per policy period.',
            badge: 'UP TO 10% SI',
            iconType: 'shield',
            summary: 'Up to 10% of Sum Insured, maximum ₹5 lakh per policy period.'
          },
          {
            id: 'assure-shared-accommodation',
            title: 'Shared Accommodation',
            subtitle: '₹1,000 per day for each completed 24-hour period.',
            badge: '₹1,000 / DAY',
            iconType: 'home',
            summary: '₹1,000 per day for each completed 24-hour period.'
          },
          {
            id: 'assure-consumables-non-medical',
            title: 'Consumables / Non-Medical Items',
            subtitle: 'Listed consumables under admissible inpatient/day-care claims are payable.',
            badge: 'CONSUMABLES COVERED',
            iconType: 'shield',
            summary: 'Listed consumables under admissible inpatient/day-care claims are payable.'
          },
          {
            id: 'assure-long-term-discount',
            title: 'Long-Term Discount',
            subtitle: '10% for 2-year policy; 10% on 2nd & 3rd year premium for 3-year policy.',
            badge: 'UP TO 10% OFF',
            iconType: 'trending',
            summary: '10% for 2-year policy; 10% on 2nd & 3rd year premium for 3-year policy.'
          },
          {
            id: 'assure-floater-discount',
            title: 'Floater Discount',
            subtitle: 'Applicable discounts for eligible children and parents/parents-in-law.',
            badge: 'FLOATER DISCOUNT',
            iconType: 'users',
            summary: 'Applicable discounts for eligible children and parents/parents-in-law.'
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 4: OPTIONAL
      // -----------------------------------------------------------------------
      {
        id: 'optional',
        title: 'optional',
        gridCols: 'grid-cols-1',
        items: [
          {
            id: 'assure-aggregate-deductible',
            title: 'Aggregate Deductible Option',
            subtitle: 'Up to 55% discount on premium with aggregate deductible options',
            badge: 'UP TO 55% DISCOUNT',
            iconType: 'dollar',
            summary: 'Aggregate Deductible Option provides premium discounts based on Sum Insured and chosen deductible:',
            points: [
              'Up to ₹20 lakh SI + ₹50,000 aggregate deductible → 45% discount',
              'Up to ₹20 lakh SI + ₹1 lakh aggregate deductible → 55% discount',
              'Above ₹20 lakh SI + ₹50,000 aggregate deductible → 35% discount',
              'Above ₹20 lakh SI + ₹1 lakh aggregate deductible → 50% discount'
            ]
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // PLAN: STAR HEALTH SUPER STAR (PARENT PLAN & 5 VARIANTS)
  // ===========================================================================
  'star-super-star': SUPER_STAR_PARENT_PLAN,
  ...SUPER_STAR_VARIANTS_DATA
};

export const getStarHealthPlanData = (planId) => {
  const canonicalId = resolveStarHealthPlanId(planId);
  return STAR_HEALTH_PLANS_DATA[canonicalId] || null;
};

// =============================================================================
// CARE HEALTH PLANS INDEPENDENT DATA CONFIGURATION
// 1. Care Supreme     → care-supreme
// 2. Ultimate Care    → ultimate-care
//
// Each plan has completely separate, independent data, UI config, and content.
// Editing one plan will NOT affect any other plan.
// =============================================================================

export const CARE_HEALTH_CANONICAL_PLAN_IDS = [
  'care-supreme',
  'ultimate-care',
  'ultimate-joy',
  'care-advantage',
  'care-freedom'
];

export const resolveCarePlanId = (planId) => {
  if (!planId) return null;
  const cleanId = String(planId).toLowerCase().trim();
  if (
    cleanId === 'care-freedom' ||
    cleanId === 'freedom' ||
    cleanId === 'carefreedom'
  ) {
    return 'care-freedom';
  }
  if (
    cleanId === 'care-advantage' ||
    cleanId === 'advantage' ||
    cleanId === 'careadvantage'
  ) {
    return 'care-advantage';
  }
  if (
    cleanId === 'care-supreme' ||
    cleanId === 'supreme' ||
    cleanId === 'care' ||
    cleanId === 'care-plan'
  ) {
    return 'care-supreme';
  }
  if (
    cleanId === 'ultimate-care' ||
    cleanId === 'ultimate' ||
    cleanId === 'care-ultimate'
  ) {
    return 'ultimate-care';
  }
  if (
    cleanId === 'ultimate-joy' ||
    cleanId === 'joy' ||
    cleanId === 'care-ultimate-joy' ||
    cleanId === 'care-joy' ||
    cleanId === 'ultimatejoy'
  ) {
    return 'ultimate-joy';
  }
  return cleanId;
};

export const CARE_HEALTH_PLANS_DATA = {
  // ===========================================================================
  // PLAN 1: CARE SUPREME (FLAGSHIP)
  // ===========================================================================
  'care-supreme': {
    planId: 'care-supreme',
    planName: 'Care Supreme',
    fullName: 'Care Health Care Supreme',
    companyName: 'Care Health',
    tagline: 'Comprehensive Health Insurance with 500% NCB Super & Unlimited Automatic Recharge',
    subtitle: 'Comprehensive Health Insurance with 500% NCB Super & Unlimited Automatic Recharge',
    coverage: '₹7 Lakh - ₹1 Crore',
    premium: '₹14,200/year',

    uiConfig: {
      primaryColor: '#003366',
      accentColor: '#FACC15',
      lightBg: '#FEFCE8',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Care Health Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'CSR',
        summaryValue: '98.3%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR represents the percentage of eligible claims settled by Care Health through its wide network of 24,800+ cashless healthcare providers.',
        singleYear: '98.3%',
        singleYearLabel: 'Recent Single Year (FY2024-25)',
        threeYearAvg: '98.2%',
        threeYearAvgLabel: '3 Year Average (FY2022-25)'
      },
      icr: {
        title: 'ICR',
        summaryValue: '57%',
        subtitle: 'Incurred Claim Ratio',
        explanation: "ICR shows the proportion of earned premium spent on honoring claims. A healthy ICR of 57% reflects disciplined risk management and reliable claims liquidity.",
        range: '57% → 61%',
        rangeLabel: 'Incurred Claim Ratio'
      },
      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        summaryValue: '15.4',
        explanation: 'Low grievance volume per 10,000 settled claims with dedicated digital claim settlement desks.',
        value: '15.4',
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
        summaryValue: 'Religare 68.4%',
        explanation: 'Promoted by Religare Enterprises Limited alongside Union Bank of India and marquee institutional investors.',
        items: [
          { name: 'Religare Enterprises Limited', value: '68.4%', label: 'Shareholding' },
          { name: 'Union Bank of India', value: '5.6%', label: 'Shareholding' },
          { name: 'Corporation Bank & Institutional Investors', value: '26.0%', label: 'Shareholding' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'A+',
        explanation: 'CRISIL A+ / Positive and CARE A+ ratings reflect robust balance sheet, high solvency, and underwriting strength.',
        items: [
          { agency: 'CRISIL', rating: 'A+ / Positive' },
          { agency: 'CARE Ratings', rating: 'CARE A+ / Stable' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '1.82×',
        explanation: "Solvency ratio measures the insurer's financial buffer to pay claims under stress conditions, well above the IRDAI mandatory 1.50×.",
        value: '1.82×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹5,200+ Cr',
        explanation: 'Strong gross written premium base and investment reserves assuring timely cashless claims payments.',
        value: '₹5,200+ Cr',
        label: 'Annual Premium Underwritten'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: 'Top Global Reinsurers',
        explanation: 'Reinsurance treaties backed by GIC Re, Swiss Re, and Munich Re for catastrophic exposure coverage.',
        value: 'AAA / A+ Rated',
        label: 'Reinsurance Treaty Partners'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: 'Leading Standalone Health Insurer',
        explanation: 'One of India’s top pure-play retail standalone health insurers with 24,800+ cashless network hospitals.',
        value: '24,800+ Network Hospitals',
        label: 'Cashless Healthcare Network'
      }
    },

    // --- 3. LIMITATIONS & WAITING PERIODS ---
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Terms & Waiting Periods',
      description: 'Interactive policy timelines, specific disease waiting, and permanent exclusions.',
      items: [
        {
          id: 'initial',
          title: 'Initial Waiting Period (30 Days)',
          summary: 'A mandatory waiting period of 30 days applies from policy inception for any medical illness or hospitalization.',
          highlight: 'Accidental hospital admission is covered immediately from Day 1 with zero waiting period.',
          policyRef: 'Care Supreme Policy Terms (Section 3.1)',
          durationTag: '30 Days'
        },
        {
          id: 'specific',
          title: '2 Years Waiting Period on Specific Diseases',
          summary: 'A continuous waiting period of 24 months applies for treatment of specified ailments:',
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
          policyRef: 'Care Supreme Specific Illness Schedule (Section 3.2)',
          durationTag: '24 Months'
        },
        {
          id: 'ped',
          title: '36 Months Pre-Existing Disease (PED) Waiting',
          summary: 'A waiting period of 36 months of continuous coverage applies for pre-existing medical conditions declared at inception.',
          highlight: 'Continuous renewal protects accrued waiting period credits.',
          policyRef: 'Care Supreme Policy Terms (Section 3.3)',
          durationTag: '36 Months'
        },
        {
          id: 'permanent',
          title: 'Permanent Exclusions',
          summary: 'The policy does not cover medical expenses incurred towards treatment of the following permanent exclusions:',
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
          policyRef: 'Standard IRDAI & Care Health Guidelines (Section 4)',
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW (INDEPENDENT) ---
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Important Care Supreme terms that policyholders should keep in mind',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'room-rent',
          icon: '🏥',
          title: 'SINGLE PRIVATE ROOM COVERED',
          paragraphs: [
            'Single Private Room is covered with zero capping and zero proportionate deductions.',
            'No daily sub-limit on room rent charges across network hospitals.'
          ]
        },
        {
          id: 'ncb-super',
          icon: '📈',
          title: '500% CUMULATIVE BONUS SUPER',
          paragraphs: [
            'Guaranteed 50% increase in sum insured per claim-free year up to a massive 500% bonus.',
            'Cumulative bonus is protected even in case of minor claims with bonus protector.'
          ]
        },
        {
          id: 'unlimited-recharge',
          icon: '⚡',
          title: 'UNLIMITED AUTOMATIC RECHARGE',
          paragraphs: [
            'Sum insured is restored automatically unlimited times in a policy year upon exhaustion.',
            'Available for unrelated illnesses and subsequent hospitalizations.'
          ]
        },
        {
          id: 'health-checkup',
          icon: '📋',
          title: 'ANNUAL HEALTH CHECK-UP',
          paragraphs: [
            'Complimentary annual health check-up for all insured members on policy renewal.'
          ]
        }
      ]
    },

    // --- 5. 4 COMPACT POLICY BENEFITS CATEGORIES (CARE SUPREME) ---
    featuresSections: [
      // -----------------------------------------------------------------------
      // CATEGORY 1: FEATURES
      // -----------------------------------------------------------------------
      {
        id: 'features',
        title: 'MOST IMPORTANT',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'cs-cashless',
            title: '100% Cashless Policy',
            subtitle: '100% Cashless Across 24,800+ Network Hospitals',
            badge: '100% CASHLESS',
            iconType: 'shield',
            summary: 'Avail seamless 100% cashless hospitalization across 24,800+ partner network hospitals nationwide with zero upfront payment hassles.',
            points: [
              '100% Cashless hospitalization across 24,800+ network hospitals',
              'Direct claim processing with the hospital desk without out-of-pocket delays',
              'Zero third-party administrator (TPA) hassle with direct in-house claims'
            ]
          },
          {
            id: 'cs-room-icu',
            title: 'Any Room & No Limit on ICU charges',
            subtitle: 'Zero Room Rent Capping & No ICU Limit',
            badge: 'ANY ROOM / NO ICU LIMIT',
            iconType: 'home',
            summary: 'Freedom to choose any room category with zero proportionate deductions, and full coverage on ICU / ICCU charges up to the Sum Insured.',
            points: [
              'Any room category covered with zero proportionate deduction penalties',
              'No daily limit or capping on ICU / ICCU charges',
              'Doctor visits, nursing charges, and monitoring covered up to Sum Insured'
            ]
          },
          {
            id: 'cs-pre-post',
            title: 'Pre & Post Hospitalization (60 Days & 180 Days)',
            subtitle: '60 Days Pre & 180 Days Post Hospitalization',
            badge: '60 & 180 DAYS',
            iconType: 'calendar',
            summary: 'Comprehensive coverage for diagnostic tests, consultations, and prescribed medicines 60 days prior to hospital admission and 180 days after hospital discharge.',
            points: [
              '60 Days Pre-Hospitalization medical and diagnostic expenses covered',
              '180 Days Post-Hospitalization follow-up consultations and recovery medicines covered',
              'Full coverage for tests, scans, physiotherapy, and specialist visits'
            ]
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 2: VALUE ADDED FEATURES
      // -----------------------------------------------------------------------
      {
        id: 'value-added-features',
        title: 'valueAdded',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'cs-unlimited-restore',
            title: 'Unlimited Restoration (10+10+10....10 Lac)',
            subtitle: 'Unlimited 100% Auto-Recharge on SI',
            badge: 'UNLIMITED RESTORE',
            iconType: 'refresh',
            summary: 'Automatically restores 100% Sum Insured unlimited times in a single policy year (10+10+10....10 Lac) upon exhaustion for subsequent hospitalizations.',
            points: [
              'Unlimited 100% auto-recharge of Sum Insured in a single policy year',
              'Recharges instantly upon partial or complete exhaustion (10+10+10... Lac)',
              'Continuous financial safety net for family members and multiple claims'
            ]
          },
          {
            id: 'cs-e-consult',
            title: 'Unlimited E-Consultations',
            subtitle: '24/7 Digital Doctor Tele-Consultations',
            badge: 'UNLIMITED E-CONSULT',
            iconType: 'activity',
            summary: 'Get 24/7 unlimited virtual tele-consultations with general physicians and qualified medical specialists through the digital health portal.',
            points: [
              'Unlimited 24/7 online doctor tele-consultations across India',
              'Covers general medicine, dietetics, and specialist clinical consultations',
              'Instant digital prescriptions and prompt medical guidance'
            ]
          },
          {
            id: 'cs-guaranteed-bonus',
            title: 'Guaranteed Bonus: 50% to 100% (Eg. 10 Lac → 20 Lac)',
            subtitle: '50% Cumulative Bonus per Claim-Free Year',
            badge: '50% TO 100% BONUS',
            iconType: 'trending',
            summary: 'Guaranteed 50% increase in base Sum Insured for each claim-free year up to a maximum of 100%, doubling your coverage (e.g. ₹10 Lakh → ₹20 Lakh) with zero extra premium.',
            steps: ['Base Sum Insured: ₹10 Lakh', '+50% Bonus (Year 1): ₹15 Lakh', 'Max 100% Bonus (Year 2): ₹20 Lakh'],
            points: [
              'Guaranteed 50% increase in basic Sum Insured per claim-free year',
              'Accumulates up to 100% of base Sum Insured (e.g. ₹10 Lakh becomes ₹20 Lakh)',
              'Zero additional premium charged for accumulated bonus coverage'
            ]
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 3: ADDITIONAL FEATURES
      // -----------------------------------------------------------------------
      {
        id: 'additional-features',
        title: 'ADDITIONAL',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'cs-day-care',
            title: 'Day Care Treatments (For less than 24 hrs hospitalization)',
            subtitle: 'All Advanced Day Care Surgeries Covered',
            badge: 'ALL DAY CARE',
            iconType: 'activity',
            summary: 'Covers all advanced medical surgeries and day care procedures requiring less than 24 hours of hospital admission due to technological advancements.',
            points: [
              'All day care procedures requiring less than 24 hours hospitalization covered',
              'Covers chemotherapy, dialysis, cataract, radiotherapy, and minor surgeries',
              '100% coverage up to base Sum Insured'
            ]
          },
          {
            id: 'cs-ayush-dom-donor',
            title: 'AYUSH, Domiciliary & Organ Donor Treatment',
            subtitle: 'Alternative, Home & Organ Harvesting Cover',
            badge: 'AYUSH & DOMICILIARY',
            iconType: 'heart',
            summary: 'Full coverage for inpatient AYUSH treatments (Ayurvedic, Yoga, Unani, Siddha, Homeopathy), home hospitalization (Domiciliary), and organ donor harvesting surgery up to Sum Insured.',
            points: [
              'Inpatient AYUSH treatments covered up to 100% at recognized centers',
              'Domiciliary (home) hospitalization covered up to full Sum Insured',
              'Inpatient organ donor harvesting surgery expenses covered up to Sum Insured'
            ]
          },
          {
            id: 'cs-ambulance',
            title: 'Ambulance Covered:',
            subtitle: 'Emergency Ambulance Transportation',
            badge: 'UP TO SUM INSURED',
            iconType: 'truck',
            summary: 'Emergency surface road ambulance expenses covered up to the full Sum Insured for timely transfer to the nearest medical center.',
            points: [
              'Emergency road ambulance transportation covered up to full Sum Insured',
              'Swift emergency transit to the nearest equipped network hospital',
              'Cashless or reimbursement claim facility available'
            ]
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 4: OPTIONAL ADD-ONS
      // -----------------------------------------------------------------------
      {
        id: 'optional-add-ons',
        title: 'optional',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'cs-claim-shield',
            title: 'Claim Shield: Coverage of Non-payable items',
            subtitle: 'Coverage of Non-Payable Items',
            summary: 'Covers non-payable medical consumable items such as surgical gloves, masks, PPE kits, syringes, and cotton, eliminating out-of-pocket expenses during hospital discharge.',
            points: [
              'Full coverage for non-medical consumable hospital items',
              'Covers surgical gloves, masks, syringes, PPE kits, and cotton',
              'Minimizes unexpected out-of-pocket bills at discharge'
            ],
            isRider: true,
            badge: 'CLAIM SHIELD',
            iconType: 'shield'
          },
          {
            id: 'cs-unlimited-care',
            title: 'Unlimited Care: One unlimited claim in a lifetime – No Sum Insured limit!',
            subtitle: 'One Unlimited Claim in a Lifetime',
            summary: 'Get a one-time infinite claim benefit in a lifetime with zero Sum Insured cap during major critical or catastrophic medical emergencies.',
            points: [
              'One-time unlimited claim amount in a lifetime with no Sum Insured limit',
              'Protects personal savings against astronomical catastrophic medical bills',
              'Provides absolute peace of mind during critical health emergencies'
            ],
            isRider: true,
            badge: 'UNLIMITED CARE',
            iconType: 'heart'
          },
          {
            id: 'cs-bonus-super',
            title: 'Cumulative Bonus Super: 100% to 500% Bonus – Even if you make a claim',
            subtitle: '100% to 500% Bonus – Even with Claims',
            summary: 'Supercharge your cumulative bonus from 100% up to 500% of base Sum Insured guaranteed at every renewal—even if you make a claim during the year!',
            points: [
              '100% to 500% cumulative bonus growth on base Sum Insured',
              'Bonus continues to grow even if you lodge a claim in the policy year',
              'Rapidly scales coverage to beat medical inflation'
            ],
            isRider: true,
            badge: '100% TO 500% BONUS',
            iconType: 'trending'
          },
          {
            id: 'cs-annual-checkup',
            title: 'Annual Health Check-up: Once for all Insured every policy year',
            subtitle: 'Once for All Insured Every Policy Year',
            summary: 'Complimentary comprehensive annual health check-up package on a 100% cashless basis for all insured members across certified network diagnostic centers every policy year.',
            points: [
              '100% cashless annual preventive health check-up screening for all insured members',
              'Includes comprehensive diagnostic blood profiles, lipid tests, and organ markers',
              'Early disease detection and active health monitoring'
            ],
            isRider: true,
            badge: 'HEALTH CHECK-UP',
            iconType: 'clipboard'
          },
          {
            id: 'cs-instant-cover',
            title: 'Instant Cover: Cover after 30 days – Hypertension, Diabetes, and Hyperlipidemia',
            subtitle: 'Cover After 30 Days for PED Conditions',
            summary: 'Reduces waiting period to just 30 days for pre-existing hypertension, diabetes, and hyperlipidemia, providing immediate comprehensive hospitalization coverage.',
            points: [
              'Hypertension, diabetes, and hyperlipidemia covered from Day 31',
              'Drastically reduces standard 36-month pre-existing waiting period',
              'Immediate financial protection against common lifestyle conditions'
            ],
            isRider: true,
            badge: 'INSTANT COVER',
            iconType: 'zap'
          },
          {
            id: 'cs-ped-modification',
            title: 'Modification of PED Wait Period: PED waiting period will be modified to 1 or 2 years as opted',
            subtitle: 'Modify PED Waiting to 1 or 2 Years',
            summary: 'Option to reduce the standard pre-existing disease (PED) waiting period from 3 years down to 1 year or 2 years as opted at policy inception.',
            points: [
              'Modify PED waiting period to 1 or 2 years as opted',
              'Early eligibility for pre-existing disease hospitalization claims',
              'Customizable waiting period flexibility at policy inception'
            ],
            isRider: true,
            badge: 'PED REDUCTION',
            iconType: 'clock'
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // PLAN 2: ULTIMATE CARE (HIGH-VALUE GLOBAL COVERAGE)
  // ===========================================================================
  'ultimate-care': {
    planId: 'ultimate-care',
    planName: 'Ultimate Care',
    fullName: 'Care Health Ultimate Care',
    companyName: 'Care Health',
    tagline: 'Complete Protection. More Benefits. More Care.',
    subtitle: 'Explore the key benefits and additional features available with Ultimate Care.',
    coverage: '₹10 Lakh - ₹2 Crore',
    premium: '₹18,500/year',

    headerConfig: {
      smallLabel: 'HEALTH INSURANCE POLICY BENEFITS',
      mainHeading: 'Complete Protection. More Benefits. More Care.',
      supportingText: 'Explore the key benefits and additional features available with Ultimate Care.'
    },

    uiConfig: {
      primaryColor: '#003366',
      accentColor: '#FACC15',
      lightBg: '#FEFCE8',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Care Health Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'CSR',
        summaryValue: '98.3%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR represents the percentage of eligible claims settled by Care Health through its wide network of 24,800+ cashless healthcare providers.',
        singleYear: '98.3%',
        singleYearLabel: 'Recent Single Year (FY2024-25)',
        threeYearAvg: '98.2%',
        threeYearAvgLabel: '3 Year Average (FY2022-25)'
      },
      icr: {
        title: 'ICR',
        summaryValue: '57%',
        subtitle: 'Incurred Claim Ratio',
        explanation: "ICR shows the proportion of earned premium spent on honoring claims. A healthy ICR of 57% reflects disciplined risk management and reliable claims liquidity.",
        range: '57% → 61%',
        rangeLabel: 'Incurred Claim Ratio'
      },
      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        summaryValue: '15.4',
        explanation: 'Low grievance volume per 10,000 settled claims with dedicated digital claim settlement desks.',
        value: '15.4',
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
        summaryValue: 'Religare 68.4%',
        explanation: 'Promoted by Religare Enterprises Limited alongside Union Bank of India and marquee institutional investors.',
        items: [
          { name: 'Religare Enterprises Limited', value: '68.4%', label: 'Shareholding' },
          { name: 'Union Bank of India', value: '5.6%', label: 'Shareholding' },
          { name: 'Corporation Bank & Institutional Investors', value: '26.0%', label: 'Shareholding' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'A+',
        explanation: 'CRISIL A+ / Positive and CARE A+ ratings reflect robust balance sheet, high solvency, and underwriting strength.',
        items: [
          { agency: 'CRISIL', rating: 'A+ / Positive' },
          { agency: 'CARE Ratings', rating: 'CARE A+ / Stable' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '1.82×',
        explanation: "Solvency ratio measures the insurer's financial buffer to pay claims under stress conditions, well above the IRDAI mandatory 1.50×.",
        value: '1.82×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹5,200+ Cr',
        explanation: 'Strong gross written premium base and investment reserves assuring timely cashless claims payments.',
        value: '₹5,200+ Cr',
        label: 'Annual Premium Underwritten'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: 'Top Global Reinsurers',
        explanation: 'Reinsurance treaties backed by GIC Re, Swiss Re, and Munich Re for catastrophic exposure coverage.',
        value: 'AAA / A+ Rated',
        label: 'Reinsurance Treaty Partners'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: 'Leading Standalone Health Insurer',
        explanation: 'One of India’s top pure-play retail standalone health insurers with 24,800+ cashless network hospitals.',
        value: '24,800+ Network Hospitals',
        label: 'Cashless Healthcare Network'
      }
    },

    // --- 3. LIMITATIONS & WAITING PERIODS ---
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Terms & Waiting Periods',
      description: 'Interactive policy timelines, specific disease waiting, and permanent exclusions.',
      items: [
        {
          id: 'initial',
          title: 'Initial Waiting Period (30 Days)',
          summary: 'A mandatory waiting period of 30 days applies from policy inception for any medical illness or hospitalization.',
          highlight: 'Accidental hospital admission is covered immediately from Day 1 with zero waiting period.',
          policyRef: 'Ultimate Care Policy Terms (Section 3.1)',
          durationTag: '30 Days'
        },
        {
          id: 'specific',
          title: '2 Years Waiting Period on Specific Diseases',
          summary: 'A continuous waiting period of 24 months applies for treatment of specified ailments:',
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
          policyRef: 'Ultimate Care Specific Illness Schedule (Section 3.2)',
          durationTag: '24 Months'
        },
        {
          id: 'ped',
          title: '24 Months Pre-Existing Disease (PED) Waiting',
          summary: 'A reduced waiting period of 24 months of continuous coverage applies for pre-existing conditions declared at inception (waived off from Day 31 under Instant Cover or modified to 1/2 years as opted).',
          highlight: 'Continuous renewal protects accrued waiting period credits.',
          policyRef: 'Ultimate Care Policy Terms (Section 3.3)',
          durationTag: '24 Months'
        },
        {
          id: 'permanent',
          title: 'Permanent Exclusions',
          summary: 'The policy does not cover medical expenses incurred towards treatment of the following permanent exclusions:',
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
          policyRef: 'Standard IRDAI & Care Health Guidelines (Section 4)',
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW (INDEPENDENT) ---
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Important Ultimate Care terms that policyholders should keep in mind',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'room-rent',
          icon: '🏥',
          title: 'ANY ROOM CATEGORY WITHOUT CAPPING',
          paragraphs: [
            'Full freedom to choose any room category with zero proportionate deduction penalties up to Sum Insured.'
          ]
        },
        {
          id: 'unlimited-care',
          icon: '💖',
          title: 'UNLIMITED CARE ONE CLAIM IN LIFETIME',
          paragraphs: [
            'Any one claim during the lifetime of the policy payable without any sum insured limit.'
          ]
        },
        {
          id: 'infinity-bonus',
          icon: '📈',
          title: '100% INFINITY BONUS PER YEAR',
          paragraphs: [
            '100% of Base Sum Insured per year irrespective of claim for unlimited times on continuous renewal.'
          ]
        },
        {
          id: 'claim-shield',
          icon: '🛡️',
          title: 'CLAIM SHIELD NON-PAYABLES COVERED',
          paragraphs: [
            'Specified list of items (list I, II, III and IV) that are non-payable covered up to Sum Insured.'
          ]
        }
      ]
    },

    // --- 5. 4 COMPACT POLICY BENEFITS CATEGORIES (ULTIMATE CARE) ---
    featuresSections: [
      // =======================================================================
      // SECTION 01 — MOST IMPORTANT
      // =======================================================================
      {
        id: 'most-important',
        title: 'MOST IMPORTANT',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'uc-inpatient-care',
            title: 'In-Patient Care',
            subtitle: 'Up to SI',
            badge: 'UP TO SI',
            iconType: 'shield',
            summary: 'Complete in-patient hospitalization expenses including boarding, room rent, ICU, nursing, doctor fees, surgeon charges, operations, and prescribed medications covered up to Sum Insured.',
            points: [
              'Hospitalization expenses covered up to Sum Insured',
              'Boarding, nursing, ICU, surgeon, and specialist fees covered',
              'Zero room rent sub-limits across network hospitals'
            ]
          },
          {
            id: 'uc-day-care',
            title: 'Day Care Treatment',
            subtitle: 'All day care procedures',
            badge: 'ALL DAY CARE',
            iconType: 'activity',
            summary: 'Covers all medical surgeries and treatments that require less than 24 hours of hospitalization due to modern technological advancements.',
            points: [
              'All day care procedures covered up to Sum Insured',
              'Includes dialysis, chemotherapy, radiotherapy, cataract, and lithotripsy',
              'No minimum 24-hour admission required for advanced treatments'
            ]
          },
          {
            id: 'uc-advance-tech',
            title: 'Advance Technology Methods',
            subtitle: 'Up to SI',
            badge: 'UP TO SI',
            iconType: 'cpu',
            summary: 'Covers modern robotic surgeries, stem cell therapy, immunotherapy, and advanced technological treatment methods up to Sum Insured.',
            points: [
              'Advance Technology Methods covered up to Sum Insured',
              'Includes robotic surgeries, cyberknife, deep brain stimulation, and stereotactic radio surgery',
              'Zero restrictive sub-limits on approved modern treatments'
            ]
          },
          {
            id: 'uc-pre-hosp',
            title: 'Pre-Hospitalization Medical Expenses',
            subtitle: 'Up to SI • 60 days prior to hospitalization',
            badge: 'UP TO SI / 60 DAYS',
            iconType: 'calendar',
            summary: 'Pre-hospitalization expenses cover for 60 days prior to hospitalization including doctor consultations, diagnostic tests, scans, and prescribed medicines.',
            points: [
              'Pre-hospitalization expenses cover for 60 days prior to hospitalization',
              'Covers doctor evaluations, specialist consultations, and investigative pathology',
              'Prescribed medications leading directly to hospital admission covered'
            ]
          },
          {
            id: 'uc-post-hosp',
            title: 'Post-Hospitalization Medical Expenses',
            subtitle: 'Up to SI • 90 days after discharge',
            badge: 'UP TO SI / 90 DAYS',
            iconType: 'clock',
            summary: 'Post-hospitalization expenses cover for 90 days after discharge including follow-up doctor visits, rehabilitation physiotherapy, and recovery medicines.',
            points: [
              'Post-hospitalization expenses cover for 90 days after discharge',
              'Covers follow-up consultations, diagnostic tests, and rehabilitation care',
              'Prescribed recovery medicines covered up to Sum Insured'
            ]
          },
          {
            id: 'uc-ayush',
            title: 'AYUSH Treatment',
            subtitle: 'Up to SI',
            badge: 'UP TO SI',
            iconType: 'shield',
            summary: 'In-patient alternative medical treatments taken at recognized government AYUSH hospitals (Ayurveda, Yoga, Unani, Siddha, Homeopathy) covered up to Sum Insured.',
            points: [
              'In-patient AYUSH treatments covered up to Sum Insured',
              'Covers Ayurveda, Yoga, Unani, Siddha, and Homeopathy',
              'Treatment availed at recognized government and accredited hospitals'
            ]
          },
          {
            id: 'uc-domiciliary',
            title: 'Domiciliary Hospitalization',
            subtitle: 'Up to SI',
            badge: 'UP TO SI',
            iconType: 'home',
            summary: 'Medical treatment taken at home on doctor’s advice when the patient cannot be moved to a hospital or hospital beds are unavailable.',
            points: [
              'Home hospitalization covered up to full Sum Insured',
              'Valid when attending medical practitioner certifies patient cannot be moved',
              'Covers standard pre and post-treatment medical protocols'
            ]
          },
          {
            id: 'uc-organ-donor',
            title: 'Organ Donor Cover',
            subtitle: 'Up to SI',
            badge: 'UP TO SI',
            iconType: 'heart',
            summary: 'In-patient medical expenses incurred by the organ donor for harvesting the organ during an authorized organ transplant surgery for the insured.',
            points: [
              'Inpatient harvesting surgery costs covered up to Sum Insured',
              'Does not reduce donor screening / medical allowances',
              'Operates seamlessly alongside the insured’s primary treatment'
            ]
          },
          {
            id: 'uc-ambulance',
            title: 'Ambulance Cover',
            subtitle: 'Up to SI • Road / Air / Train / Boat etc.',
            badge: 'UP TO SI (ALL MODES)',
            iconType: 'truck',
            summary: 'Any mode of transport such as Road / Air / Train / Boat etc. covered up to the full Sum Insured for timely transfer to the nearest specialized medical center.',
            points: [
              'Any mode of transport such as Road / Air / Train / Boat etc.',
              'Expenses covered up to full Sum Insured',
              'Transfers patient to the nearest hospital for emergency medical management'
            ]
          },
          {
            id: 'uc-cumulative-bonus',
            title: 'Cumulative Bonus',
            subtitle: '50% of Base SI per year up to 100% max',
            badge: '50% TO 100% BONUS',
            iconType: 'trending',
            summary: '50% of Base SI per year irrespective of claim, maximum up to 100%. Shall not reduce in case of claim.',
            steps: ['Base Sum Insured: 100%', '+50% Bonus (Year 1)', 'Max 100% Bonus (Year 2)'],
            points: [
              '50% of Base SI per year irrespective of claim, maximum up to 100%',
              'Shall not reduce in case of claim',
              'Guaranteed cumulative increase without extra premium'
            ]
          },
          {
            id: 'uc-unlimited-auto-recharge',
            title: 'Unlimited Automatic Recharge',
            subtitle: 'Unlimited times for unrelated or same illness',
            badge: 'UNLIMITED RECHARGE',
            iconType: 'refresh',
            summary: 'Available for unlimited times for unrelated or same illness from subsequent claim upon exhaustion of base Sum Insured in a policy year.',
            points: [
              'Available for unlimited times for unrelated or same illness from subsequent claim',
              'Recharges instantly upon partial or total exhaustion of Sum Insured',
              'Continuous financial protection across multiple hospitalizations'
            ]
          },
          {
            id: 'uc-room-rent',
            title: 'Room Rent',
            subtitle: 'Up to SI',
            badge: 'UP TO SI',
            iconType: 'home',
            summary: 'Hospital room accommodation charges covered up to full Sum Insured with zero daily capping or proportionate deductions.',
            points: [
              'Room rent covered up to full Sum Insured',
              'No daily capping or sub-limit on room rent category',
              'Zero proportionate deduction penalties on hospital bills'
            ]
          },
          {
            id: 'uc-icu-cover',
            title: 'ICU Cover',
            subtitle: 'Up to SI',
            badge: 'UP TO SI',
            iconType: 'activity',
            summary: 'Intensive Care Unit (ICU) / Intensive Coronary Care Unit (ICCU) charges covered up to full Sum Insured with zero daily sub-limits.',
            points: [
              'ICU and ICCU charges covered up to full Sum Insured',
              'No per-day limit or capping on ICU stay',
              'Covers specialist monitoring, equipment, and dedicated nursing care'
            ]
          }
        ]
      },

      // =======================================================================
      // SECTION 02 — VALUE ADDED
      // =======================================================================
      {
        id: 'value-added',
        title: 'valueAdded',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'uc-infinity-bonus',
            title: 'Infinity Bonus*',
            subtitle: '100% of Base SI per year for unlimited times',
            badge: '100% PER YEAR (UNLIMITED)',
            iconType: 'trending',
            summary: '100% of Base Sum Insured per year irrespective of claim for unlimited times on continuous renewal of policy. Shall not reduce in case of claim.',
            points: [
              '100% of Base Sum Insured per year irrespective of claim for unlimited times on continuous renewal of policy.',
              'Shall not reduce in case of claim',
              'Continuously compounds your coverage year after year'
            ]
          },
          {
            id: 'uc-premium-payback',
            title: 'Premium Payback*',
            subtitle: '1st year premium refunded in every 5-year block',
            badge: 'PREMIUM REFUND',
            iconType: 'dollar',
            summary: 'In case no hospitalization related claim for the preceding 5 consecutive policy years, then 1st policy year base premium shall be refunded in every block of 5 years.',
            points: [
              'In case no hospitalization related claim for the preceding 5 consecutive policy years, then 1st policy year base premium shall be refunded in every block of 5 years',
              'Direct cash refund credited to policyholder',
              'Repeats in every qualifying 5-year block of continuous claim-free tenure'
            ]
          },
          {
            id: 'uc-unlimited-care',
            title: 'Unlimited Care^',
            subtitle: 'Any one claim without any SI limit in a lifetime',
            badge: 'NO SI LIMIT (1 CLAIM)',
            iconType: 'heart',
            summary: 'Any one claim during the lifetime of the policy payable without any sum insured limit.',
            points: [
              'Any one claim during the lifetime of the policy payable without any sum insured limit',
              'Absolute financial immunity against catastrophic medical bills',
              'Covers all approved in-patient treatment expenses without ceiling'
            ]
          },
          {
            id: 'uc-claim-shield',
            title: 'Claim Shield^',
            subtitle: 'Covers non-payable items (Lists I, II, III & IV)',
            badge: 'NON-PAYABLES COVERED',
            iconType: 'shield',
            summary: 'Specified list of items (list I, II, III and IV) that are non-payable shall be covered up to the Sum Insured.',
            points: [
              'Specified list of items (list I, II, III and IV) that are non-payable shall be covered up to the Sum Insured',
              'Covers gloves, masks, syringes, PPE kits, cotton, thermometers, and administrative charges',
              'Zero out-of-pocket deductions on non-medical consumable lists at hospital discharge'
            ]
          },
          {
            id: 'uc-instant-cover',
            title: 'Instant cover^',
            subtitle: 'PED wait period waived off from Day 31',
            badge: 'COVERED FROM DAY 31',
            iconType: 'zap',
            summary: 'If insured person has pre-existing diseases (Diabetes / Hypertension / Hyperlipidemia / Asthma / Obesity / Hypothyroidism / Coronary Artery Disease (PTCA prior 1 year)) at the time of issuance of first policy with us, the applicable PED wait period shall be waived off. Coverage shall start from the 31st day of policy start date after serving initial wait period of 30 days.',
            points: [
              'If insured person has pre-existing diseases (Diabetes / Hypertension / Hyperlipidemia / Asthma / Obesity / Hypothyroidism / Coronary Artery Disease (PTCA prior 1 year)) at the time of issuance of first policy with us, the applicable PED wait period shall be waived off.',
              'Coverage shall start from the 31st day of policy start date after serving initial wait period of 30 days.',
              'Instant protection against common pre-existing lifestyle conditions'
            ]
          },
          {
            id: 'uc-ped-modification',
            title: 'PED Wait Period Modification^',
            subtitle: 'PED wait period modified to 1 year / 2 years',
            badge: '1 OR 2 YEARS PED',
            iconType: 'clock',
            summary: 'PED wait period shall be modified to 1 year / 2 years.',
            points: [
              'PED wait period shall be modified to 1 year / 2 years',
              'Reduces the waiting duration for pre-existing medical conditions',
              'Flexible option chosen at the time of policy inception'
            ]
          },
          {
            id: 'uc-loyalty-boost',
            title: 'Loyalty Boost',
            subtitle: '+100% SI added after 7 claim-free years',
            badge: '+100% SI BONUS',
            iconType: 'trending',
            summary: 'An additional 100% of the SI as bonus - equivalent to the first policy year\'s sum insured will be added to the policy coverage after 7 consecutive claim-free years, once in a policy lifetime.',
            points: [
              'An additional 100% of the SI as bonus - equivalent to the first policy year\'s sum insured will be added to the policy coverage after 7 consecutive claim-free years, once in a policy lifetime',
              'Rewards long-term continuous healthy policy tenure',
              'Permanently doubles your primary sum insured base'
            ]
          },
          {
            id: 'uc-tenure-multiplier',
            title: 'Tenure Multiplier^^',
            subtitle: 'Combine annual SI of multi-year policy for a single claim',
            badge: 'COMBINE ANNUAL SI',
            iconType: 'refresh',
            summary: 'Combine annual Sum Insured of multi-year policy for a single claim in a policy term.',
            points: [
              'Combine annual Sum Insured of multi-year policy for a single claim in a policy term',
              'Unlocks cumulative multi-year cover upfront for large hospitalizations',
              'Available on multi-year policy tenures'
            ]
          }
        ]
      },

      // =======================================================================
      // SECTION 03 — ADDITIONAL
      // =======================================================================
      {
        id: 'additional',
        title: 'ADDITIONAL',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'uc-health-services',
            title: 'Health Services',
            subtitle: 'Health Portal & Discount Connect',
            badge: 'HEALTH PORTAL & DISCOUNTS',
            iconType: 'activity',
            summary: 'Health Portal - Doctor on chat, Healthy tips reminder, etc. Discount Connect - Discounts on services such as consultations, diagnostics, maternity etc at our network.',
            points: [
              'Health Portal - Doctor on chat, Healthy tips reminder, etc.',
              'Discount Connect - Discounts on services such as consultations, diagnostics, maternity etc at our network',
              'Value-added digital wellness and savings network across India'
            ]
          },
          {
            id: 'uc-newborn-wait-period',
            title: 'New Born - Wait Period Benefit',
            subtitle: 'Policy wait period applies if added within 90 days',
            badge: 'NEW BORN BENEFIT',
            iconType: 'heart',
            summary: 'Wait Period as per current policy will be applicable to the new born if added within 90 days of birth.',
            points: [
              'Wait Period as per current policy will be applicable to the new born if added within 90 days of birth',
              'Protects baby under continuous policy terms seamlessly',
              'Zero fresh full-term waiting period when enrolled timely'
            ]
          },
          {
            id: 'uc-medivoucher',
            title: 'MediVoucher',
            subtitle: '2 pharmacy vouchers of ₹250 each on 1st renewal',
            badge: '₹500 PHARMACY VOUCHERS',
            iconType: 'dollar',
            summary: '2 pharmacy vouchers of ₹250 each per policy shall be provided on 1st renewal with the Company.',
            points: [
              '2 pharmacy vouchers of ₹250 each per policy shall be provided on 1st renewal with the Company',
              'Redeemable for prescribed medicines and wellness supplies',
              'Complimentary bonus on your first policy renewal'
            ]
          },
          {
            id: 'uc-grace-period-coverage',
            title: 'Grace Period Coverage*',
            subtitle: 'Active protection during grace period',
            badge: 'GRACE PERIOD COVER',
            iconType: 'shield',
            summary: 'Your policy will remain active, ensuring continuous protection during the grace period (only coverage under the hospitalization expenses benefit shall be provided).',
            points: [
              'Your policy will remain active, ensuring continuous protection during the grace period (only coverage under the hospitalization expenses benefit shall be provided)',
              'Zero coverage gap during renewal processing',
              'Protects against emergency hospitalization during grace period'
            ]
          },
          {
            id: 'uc-annual-health-checkup',
            title: 'Annual Health Check up^',
            subtitle: 'Once for all Insured every policy year',
            badge: 'ONCE EVERY YEAR',
            iconType: 'clipboard',
            summary: 'Once for all Insured every policy year.',
            points: [
              'Once for all Insured every policy year',
              '100% cashless comprehensive preventive health screening',
              'Includes blood tests, lipid profile, and organ markers'
            ]
          },
          {
            id: 'uc-outpatient-consultations',
            title: 'Out-patient Consultations*',
            subtitle: 'Up to ₹5,000/yr (Max ₹500/consultation)',
            badge: 'UP TO ₹5,000/YEAR',
            iconType: 'activity',
            summary: 'General Physicians & Specialists physical consultations: up to ₹5,000 per insured year, maximum ₹500 per consultation.',
            points: [
              'General Physicians & Specialists physical consultations: up to ₹5,000 per insured year, maximum ₹500 per consultation',
              'Covers doctor clinic consultations across network medical practitioners',
              'Cashless or reimbursement OPD consultation facility'
            ]
          },
          {
            id: 'uc-phys-consult-gp',
            title: 'Physical Consultations with General Physicians^',
            subtitle: 'Max 4 consultations/yr (Max ₹500/consultation)',
            badge: 'MAX 4 / YEAR',
            iconType: 'activity',
            summary: 'Maximum 4 physical consultations per Insured per policy year with general physicians subject to maximum ₹500 per consultation in policy year.',
            points: [
              'Maximum 4 physical consultations per Insured per policy year with general physicians subject to maximum ₹500 per consultation in policy year',
              'Physical clinic visits with certified general physicians',
              'Direct primary healthcare access when needed'
            ]
          },
          {
            id: 'uc-phys-consult-specialist',
            title: 'Physical Consultations with Specialist Doctors^',
            subtitle: 'Max 4 consultations/yr (Max ₹500/consultation)',
            badge: 'MAX 4 / YEAR',
            iconType: 'activity',
            summary: 'Maximum 4 physical consultations per Insured per policy year with listed specialist doctors subject to maximum ₹500 per consultation in a policy year.',
            points: [
              'Maximum 4 physical consultations per Insured per policy year with listed specialist doctors subject to maximum ₹500 per consultation in a policy year',
              'Physical clinic consultations with designated medical specialists',
              'Covers cardiologists, pediatricians, gynecologists, orthopedics, etc.'
            ]
          }
        ]
      },

      // =======================================================================
      // SECTION 04 — OPTIONAL
      // =======================================================================
      {
        id: 'optional',
        title: 'optional',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'uc-unlimited-e-consult',
            title: 'Unlimited E-Consultations*',
            subtitle: 'Consultations with general physicians & specialists',
            badge: 'UNLIMITED 24/7',
            iconType: 'activity',
            summary: 'Available for consultations with general physicians and specialist.',
            points: [
              'Available for consultations with general physicians and specialist',
              '24/7 digital tele-consultations from home or on the go',
              'Direct digital prescription and qualified doctor consultation'
            ]
          },
          {
            id: 'uc-wellness-benefit',
            title: 'Wellness benefit*',
            subtitle: 'Step Tracking & Up to 30% Renewal Discount',
            badge: 'UP TO 30% DISCOUNT',
            iconType: 'trending',
            summary: 'Recording 10,000 steps (8,000 steps for Insured Person of age 60 years and above) or more in a day through tracking apps, devices, etc.',
            tableData: {
              headers: ['No. of days in a year', 'Renewal Discount'],
              rows: [
                ['270', '30%'],
                ['240', '20%'],
                ['180', '15%'],
                ['120', '10%'],
                ['Less than 120', '0%']
              ]
            },
            collapsibleConditions: {
              title: 'View Wellness Conditions',
              conditions: [
                'Benefit applicable on an individual basis',
                'For floater, average healthy days of all insured considered',
                'Responsibility of mapping device with CHIL system is of the Insured',
                'Last 2 months healthy days carry forward to next policy period',
                'Multi-tenure uses average healthy days over policy tenure',
                'Installment mode discount considered only post payment of first 6 months',
                'Equivalent vouchers may be provided instead of renewal discount',
                'Applicable only for Adults aged 18 and above for the renewal discount',
                'Digital Fitness Coaching',
                'AI Fitness Coaching',
                'Nutritionist / Wellness Coach',
                'Benefits (b, c & d) available for Insured members aged above 12 years'
              ]
            },
            points: [
              'Recording 10,000 steps (8,000 steps for Insured Person of age 60 years and above) or more in a day through tracking apps, devices, etc.',
              'Earn up to 30% discount on policy renewal premium',
              'Access to Digital Fitness Coaching, AI Fitness Coaching, and Nutritionist / Wellness Coach'
            ]
          },
          {
            id: 'uc-be-fit-plus',
            title: 'Be-fit Plus*',
            subtitle: 'Unlimited access to Fitness centres (Age 12+)',
            badge: 'UNLIMITED FITNESS PASS',
            iconType: 'heart',
            summary: 'Unlimited access to Fitness centres can be availed by Insured Person aged above 12 years.',
            points: [
              'Unlimited access to Fitness centres can be availed by Insured Person aged above 12 years',
              'Access network fitness centers and premium gyms nationwide',
              'Promotes active health, daily workouts, and physical well-being'
            ]
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // PLAN 3: ULTIMATE JOY (INDEPENDENT PLAN)
  // ===========================================================================
  'ultimate-joy': {
    planId: 'ultimate-joy',
    planName: 'Ultimate Joy',
    fullName: 'Care Health Ultimate Joy',
    companyName: 'Care Health',
    tagline: 'Family & Maternity Health Protection with Unlimited Automatic Recharge, 500% Cumulative Bonus & Global Newborn Care',
    subtitle: 'Family & Maternity Health Protection with Unlimited Automatic Recharge, 500% Cumulative Bonus & Global Newborn Care',
    coverage: '₹5 Lakh - ₹1 Crore',
    premium: '₹16,800/year',

    uiConfig: {
      primaryColor: '#003366',
      accentColor: '#FACC15',
      lightBg: '#FEFCE8',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Care Health Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'CSR',
        summaryValue: '98.3%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR represents the percentage of eligible claims settled by Care Health through its wide network of 24,800+ cashless healthcare providers.',
        singleYear: '98.3%',
        singleYearLabel: 'Recent Single Year (FY2024-25)',
        threeYearAvg: '98.2%',
        threeYearAvgLabel: '3 Year Average (FY2022-25)'
      },
      icr: {
        title: 'ICR',
        summaryValue: '57%',
        subtitle: 'Incurred Claim Ratio',
        explanation: "ICR shows the proportion of earned premium spent on honoring claims. A healthy ICR of 57% reflects disciplined risk management and reliable claims liquidity.",
        range: '57% → 61%',
        rangeLabel: 'Incurred Claim Ratio'
      },
      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        summaryValue: '15.4',
        explanation: 'Low grievance volume per 10,000 settled claims with dedicated digital claim settlement desks.',
        value: '15.4',
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
        summaryValue: 'Religare 68.4%',
        explanation: 'Promoted by Religare Enterprises Limited alongside Union Bank of India and marquee institutional investors.',
        items: [
          { name: 'Religare Enterprises Limited', value: '68.4%', label: 'Shareholding' },
          { name: 'Union Bank of India', value: '5.6%', label: 'Shareholding' },
          { name: 'Institutional & Public Investors', value: '26.0%', label: 'Shareholding' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'A+',
        explanation: 'CARE A+ / Stable credit rating indicates strong claim paying ability, robust balance sheet, and financial stability.',
        items: [
          { agency: 'CARE Ratings', rating: 'A+ / Stable' },
          { agency: 'ICRA', rating: 'A+ / Stable' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '1.82×',
        explanation: 'Strong solvency ratio of 1.82× provides substantial financial safety well above the statutory requirement of 1.50×.',
        value: '1.82×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹5,200+ Cr',
        explanation: 'Investment assets and financial reserve base ensuring smooth claims settlement operations across India.',
        value: '₹5,200+ Cr',
        label: 'Assets Under Management'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: '85%+',
        explanation: 'Over 85% of reinsurance backed by leading global reinsurers including Swiss Re, Hannover Re, and GIC Re.',
        value: '85%+',
        label: 'Backed by Swiss Re, Hannover Re & GIC Re'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: '#2 SAHI',
        explanation: 'Second largest standalone health insurer in India with over 24,800+ cashless healthcare network providers.',
        value: '#2 Standalone Health Insurer',
        label: 'Over 3.5 Crore Lives Protected'
      }
    },

    // --- 3. LIMITATIONS & WAITING PERIODS ---
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Terms & Waiting Periods',
      description: 'Standard waiting periods and statutory terms applied to this policy.',
      items: [
        {
          id: 'initial',
          title: 'Initial Wait Period (30 Days)',
          summary: 'A mandatory waiting period of 30 days applies from policy inception for any non-accidental illness.',
          highlight: 'Not applicable on accident cases.',
          policyRef: 'Ultimate Joy Policy Terms (Section 3.1)',
          durationTag: '30 Days'
        },
        {
          id: 'named-ailment',
          title: 'Named Ailment Waiting Period (24 Months)',
          summary: 'A continuous waiting period of 24 months applies for medical treatment of specified named ailments.',
          diseaseList: [
            'Cataract & eye surgeries',
            'Benign Prostatic Hypertrophy (BPH)',
            'Hernia (all types) & Hydrocele',
            'Piles, Fistula & Fissure in ano',
            'Stones in Urinary, Biliary & Renal systems',
            'Joint replacements (non-accidental)',
            'Osteoarthritis & Osteoporosis',
            'Sinusitis, DNS, Tonsillectomy & Adenoidectomy'
          ],
          policyRef: 'Care Health Named Ailment Schedule',
          durationTag: '24 Months'
        },
        {
          id: 'ped',
          title: 'Pre-Existing Diseases (PED) Waiting (36 Months)',
          summary: 'A waiting period of 36 months applies for pre-existing conditions declared at proposal.',
          highlight: 'Continuous policy renewals preserve PED waiting credits.',
          policyRef: 'Ultimate Joy Policy Terms (Section 3.3)',
          durationTag: '36 Months'
        },
        {
          id: 'maternity',
          title: 'Maternity Wait Period — Bronze (48 Months)',
          summary: 'A waiting period of 48 months applies for Mother & New Born Baby Care (Bronze) under base terms. Can be modified to 12 months with the Modification Rider.',
          highlight: 'Waiting period 12 months available with modification rider.',
          policyRef: 'Care Health Maternity Schedule (Section 4.1)',
          durationTag: '48 Months'
        },
        {
          id: 'permanent',
          title: 'Permanent Exclusions',
          summary: 'The policy excludes expenses for cosmetic surgery, intentional self-injury, substance abuse, and unproven experimental treatments.',
          exclusionsList: [
            'Cosmetic, aesthetic & plastic surgery',
            'Intentional self-injury & suicide attempt',
            'Substance, alcohol & drug abuse rehabilitation',
            'Obesity & bariatric surgery unless life-threatening',
            'Diagnostic-only / investigation admissions',
            'Unproven / experimental treatments'
          ],
          policyRef: 'Standard IRDAI & Care Health Guidelines',
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW ---
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Important Ultimate Joy terms that policyholders should keep in mind',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'recharge',
          icon: '🔄',
          title: 'UNLIMITED AUTOMATIC RECHARGE',
          paragraphs: [
            'Recharges 100% Sum Insured unlimited times in a policy year upon exhaustion.',
            'Applicable for the same illness as well as unrelated medical conditions.'
          ]
        },
        {
          id: 'cumulative-bonus',
          icon: '📈',
          title: '500% CUMULATIVE BONUS (NO REDUCTION ON CLAIM)',
          paragraphs: [
            '50% increase in base Sum Insured per claim-free policy year up to a maximum of 500% SI.',
            'Cumulative bonus shall not reduce even if a claim is lodged during the policy year.'
          ]
        },
        {
          id: 'room-rent-icu',
          icon: '🏥',
          title: 'ALL ROOM CATEGORIES COVERED & NO ICU LIMIT',
          paragraphs: [
            'Stay in any hospital room category with zero daily rent capping or proportionate deductions.',
            'No daily ceiling or sub-limit on Intensive Care Unit (ICU) expenses.'
          ]
        },
        {
          id: 'mother-baby-care',
          icon: '👶',
          title: 'MOTHER & NEW BORN BABY CARE (WORLDWIDE)',
          paragraphs: [
            'Available for insured females aged 18 to 45 years with worldwide maternity coverage.',
            'Coverage amount can accumulate up to 4 times with newborn coverage included in maternity limit.'
          ]
        }
      ]
    },

    // --- 5. POLICY BENEFITS (EXACT 4 HEADINGS) ---
    featuresSections: [
      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 1: MOST IMPORTANT
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'most-important',
        title: 'MOST IMPORTANT',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'uj-eligibility',
            title: 'Eligibility Criteria',
            subtitle: 'Proposer 18+ | Adult Lifelong | Child 24/25 Yrs',
            badge: 'ELIGIBILITY',
            iconType: 'users',
            summary: 'Comprehensive eligibility guidelines covering individual & floater options with lifelong renewals and wide family relationships.',
            points: [
              'Age of Proposer: 18 Years or above',
              'Entry Age - Minimum: Individual: 18 Years | Floater: 91 Days with at least 1 member of age 18 years or above',
              'Entry Age - Maximum: Adult: Lifelong | Child: 24 Years',
              'Exit Age: Adult: Lifelong | Child: 25 Years',
              'Cover Type: Individual: Maximum up to 6 Persons | Floater: 1A1C / 1A2C / 2A / 2A1C / 2A2C',
              'Who are covered: Self, spouse/live-in partner/same sex partner, son, daughter, father, mother, mother-in-law, father-in-law, grand-father, grand-mother and as per insurable interest'
            ]
          },
          {
            id: 'uj-zonal-pricing',
            title: 'Zonal Pricing',
            subtitle: '5 Zones Nationwide with City Mappings',
            badge: 'ZONAL PRICING',
            iconType: 'home',
            summary: 'Geographical zonal pricing categorization across 5 zones with clearly specified city clusters.',
            points: [
              'Zone 1: Delhi NCR, Surat, Mathura, Alwar, Aligarh, Bharatpur, Hisar',
              'Zone 2: Telangana including Hyderabad, Trivandrum',
              'Zone 3: Mumbai Metropolitan Region, Ahmedabad, Nashik, Vadodara, Indore, Kolkata, Howrah, Asansol, Pune, Ahmednagar',
              'Zone 4: Rest of Gujarat, Bangalore Urban, Ludhiana, Jaipur, Dehradun, Jalgaon',
              'Zone 5: Rest of India',
              'Note: Cities include adjoining cities; Delhi-NCR and Mumbai MMR as defined by Government'
            ]
          },
          {
            id: 'uj-core-benefits',
            title: 'Core Plan Benefits',
            subtitle: 'Sum Insured ₹5L–₹100L | All Rooms | No ICU Limit',
            badge: 'CORE PROTECTION',
            iconType: 'shield',
            summary: 'Comprehensive hospitalization and inpatient care covered up to Sum Insured with all room categories and zero ICU limit.',
            points: [
              'Sum Insured (SI): ₹5L / ₹7L / ₹10L / ₹15L / ₹20L / ₹25L / ₹50L / ₹75L / ₹100L',
              'In-Patient Care: Up to SI',
              'Day Care Treatments: All Day Care procedures, up to SI',
              'Advance Technology Methods: Up to SI',
              'Pre & Post Hospitalization Medical Expenses: Up to 60 days & up to 180 days',
              'Ambulance Cover: Up to SI, any mode of transport such as Road / Air / Train / Boat etc.',
              'Organ Donor Cover: Up to SI',
              'Domiciliary Hospitalization: Up to SI',
              'AYUSH Treatments: Up to SI',
              'Room Rent: All categories covered',
              'ICU Charges: No Limit'
            ]
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 2: VALUE ADDED
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'value-added',
        title: 'valueAdded',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'uj-unlimited-recharge',
            title: 'Unlimited Automatic Recharge',
            subtitle: 'Up to SI, Unlimited Times, Same Illness Covered',
            badge: 'UNLIMITED RECHARGE',
            iconType: 'refresh',
            summary: 'Automatically restores 100% Sum Insured unlimited times in a policy year upon exhaustion, applicable for the same illness as well.',
            points: [
              'Unlimited Automatic Recharge: Up to SI, unlimited times',
              'Applicable for same illness as well as unrelated conditions',
              'Recharges instantly upon partial or complete exhaustion'
            ]
          },
          {
            id: 'uj-cumulative-bonus',
            title: 'Cumulative Bonus',
            subtitle: '50% Per Year up to 500% SI (No Claim Reduction)',
            badge: 'UP TO 500% BONUS',
            iconType: 'trending',
            summary: '50% increase in SI per Policy Year; maximum up to 500% SI. Shall not reduce in case of claim.',
            points: [
              '50% increase in SI per Policy Year',
              'Maximum accumulation up to 500% SI',
              'Shall not reduce in case of claim'
            ]
          },
          {
            id: 'uj-e-consultation',
            title: 'Unlimited E-Consultation',
            subtitle: 'General Physicians & Specified Specialists',
            badge: 'UNLIMITED E-CONSULTS',
            iconType: 'phone',
            summary: 'Available for digital and video consultations with General Physicians and Specified Specialists 24/7.',
            points: [
              'Unlimited E-Consultation available 24/7',
              'Consultations with General Physicians and Specified Specialists',
              'Instant digital prescriptions and medical advice'
            ]
          },
          {
            id: 'uj-health-services',
            title: 'Health Services',
            subtitle: 'Health Portal, Doctor on Chat & Digital Locker',
            badge: 'DIGITAL HEALTH',
            iconType: 'activity',
            summary: 'Integrated digital health ecosystem to manage personal healthcare, consultations, and reminders.',
            points: [
              'Health Portal',
              'Doctor on chat',
              'Healthy tips reminder',
              'Digital locker for medical records, etc.'
            ]
          },
          {
            id: 'uj-discount-connect',
            title: 'Discount Connect',
            subtitle: 'Discounts on Services at Network Centers',
            badge: 'NETWORK DISCOUNTS',
            iconType: 'dollar',
            summary: 'Avail exclusive discounts on diagnostic tests, pharmacy purchases, and healthcare services across network providers.',
            points: [
              'Discounts on various services at the network',
              'Savings on diagnostic screenings and pharmacy purchases'
            ]
          },
          {
            id: 'uj-wellness-benefit',
            title: 'Wellness Benefit',
            subtitle: 'Active Days Renewal Discount & Fitness Coaching',
            badge: 'WELLNESS REWARDS',
            iconType: 'smile',
            summary: 'Earn discounts on renewal premium by achieving daily active steps, plus access online fitness coaching and counselling sessions.',
            points: [
              'Discount on renewal premium based on active days achieved',
              'Online fitness Coaching / Counselling session from Wellness Coaches'
            ]
          },
          {
            id: 'uj-vintage-discount',
            title: 'Vintage Discount',
            subtitle: 'Yr 1: 15% | Yr 2: 10% | Yr 3+: 0%',
            badge: 'LOYALTY DISCOUNT',
            iconType: 'clock',
            summary: 'Special vintage discount structure applied across initial policy years.',
            points: [
              'Policy Year 1: 15%',
              'Policy Year 2: 10%',
              'Policy Year 3 & Above: 0%'
            ]
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 3: ADDITIONAL
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'additional',
        title: 'ADDITIONAL',
        gridCols: 'grid-cols-1 sm:grid-cols-2',
        items: [
          {
            id: 'uj-wait-periods',
            title: 'Wait Periods',
            subtitle: 'Initial 30d, Named Ailments 24m, PED 36m, Maternity 48m',
            badge: 'WAITING PERIODS',
            iconType: 'clock',
            summary: 'Standard policy waiting periods applicable from policy inception.',
            points: [
              'Initial Wait Period: 30 Days (Not applicable on accident cases)',
              'Named Ailment: 24 Months',
              'Pre-Existing Diseases: 36 Months',
              'Maternity Wait Period (Bronze): 48 Months'
            ]
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 4: OPTIONAL
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'optional',
        title: 'optional',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'uj-oocyte-care',
            title: 'Oocyte Care^^',
            subtitle: 'Covers up to ₹1 Lac for Oocyte Donor Retrieval',
            badge: 'OPTIONAL RIDER',
            isRider: true,
            iconType: 'heart',
            summary: 'Covers up to ₹1 Lac hospitalization expenses related to complications arising due to Oocyte retrieval of Oocyte donor.',
            points: [
              'Oocyte Care^^: Covers up to ₹1 Lac hospitalization expenses',
              'Covers complications arising due to Oocyte retrieval of Oocyte donor'
            ]
          },
          {
            id: 'uj-surrogacy-care',
            title: 'Surrogacy Care^^^',
            subtitle: 'Covers up to ₹1 Lac for Surrogate Mother Care',
            badge: 'OPTIONAL RIDER',
            isRider: true,
            iconType: 'users',
            summary: 'Covers up to ₹1 Lac hospitalization expenses related to complications arising during pregnancy & post-partum delivery for the Surrogate Mother.',
            points: [
              'Surrogacy Care^^^: Covers up to ₹1 Lac hospitalization expenses',
              'Covers complications arising during pregnancy & post-partum delivery for the Surrogate Mother'
            ]
          },
          {
            id: 'uj-child-adoption',
            title: 'Child Adoption',
            subtitle: 'Up to ₹50,000 for Child Adoption Expenses',
            badge: 'OPTIONAL RIDER',
            isRider: true,
            iconType: 'users',
            summary: 'Covers medical and legal costs incurred during formal child adoption up to ₹50,000.',
            points: [
              'Child Adoption: Up to ₹50,000'
            ]
          },
          {
            id: 'uj-room-rent-mod',
            title: 'Room Rent Modification',
            subtitle: 'Single Pvt. AC Room Covered',
            badge: 'OPTIONAL RIDER',
            isRider: true,
            iconType: 'home',
            summary: 'Option to specify and guarantee Single Private A/C Room category.',
            points: [
              'Room Rent Modification: Single Pvt. AC Room'
            ]
          },
          {
            id: 'uj-infinity-bonus',
            title: 'Infinity Bonus',
            subtitle: '100% Bonus of Base SI/Year Irrespective of Claim',
            badge: 'OPTIONAL RIDER',
            isRider: true,
            iconType: 'trending',
            summary: '100% bonus of Base SI per year, irrespective of claim made — unlimited times on continuous policy renewal. Shall not reduce in case of claim.',
            points: [
              '100% bonus of Base SI per year, irrespective of claim made',
              'Unlimited times on continuous policy renewal',
              'Shall not reduce in case of claim'
            ]
          },
          {
            id: 'uj-spouse-care',
            title: 'Spouse Care',
            subtitle: 'Special Spouse Protection Rider',
            badge: 'OPTIONAL RIDER',
            isRider: true,
            iconType: 'heart',
            summary: 'Special coverage provisions for spouse under policy terms.',
            points: [
              'Spouse Care: Applicable'
            ]
          },
          {
            id: 'uj-mother-baby-care',
            title: 'Mother & New Born Baby Care (Bronze)',
            subtitle: 'Worldwide Maternity Cover (Age 18–45)',
            badge: 'OPTIONAL RIDER',
            isRider: true,
            iconType: 'heart',
            summary: 'Comprehensive worldwide maternity and newborn protection with accumulative cover.',
            points: [
              'Available only for Insured Person aged 18 to 45 years',
              'Coverage available worldwide',
              '1% of SI per year up to maximum ₹1 Lac',
              'Coverage amount can accumulate up to 4 times if no claim is made under this benefit',
              'Pre & Post-Natal covered within maternity limit',
              'Coverage for New Born is part of maternity Sum Insured'
            ]
          },
          {
            id: 'uj-mother-baby-mod',
            title: 'Mother & New Born Baby Care Modification (Bronze)',
            subtitle: 'Higher Limits (up to ₹3 Lac) with 12m Waiting',
            badge: 'OPTIONAL RIDER',
            isRider: true,
            iconType: 'heart',
            summary: 'Enhanced maternity sum insured tiers with waiting period reduced to 12 months.',
            points: [
              '1% of SI per year, maximum ₹1 Lac — waiting period 12 months',
              '2% of SI per year, maximum ₹2 Lac — waiting period 12 months',
              '3% of SI per year, maximum ₹3 Lac — waiting period 12 months',
              '4% of SI per year, maximum ₹3 Lac — waiting period 12 months',
              '5% of SI per year, maximum ₹3 Lac — waiting period 12 months'
            ]
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // PLAN 4: CARE ADVANTAGE
  // ===========================================================================
  'care-advantage': {
    planId: 'care-advantage',
    planName: 'Care Advantage',
    fullName: 'Care Health Care Advantage',
    companyName: 'Care Health',
    tagline: 'High-Value Health Cover with ₹1 Crore Protection & Zero Sub-Limits',
    subtitle: 'High-Value Health Cover with ₹1 Crore Protection & Zero Sub-Limits',
    coverage: '₹25 Lakh - ₹1 Crore',
    premium: '₹15,800/year',

    uiConfig: {
      primaryColor: '#003366',
      accentColor: '#FACC15',
      lightBg: '#FEFCE8',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Care Health Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'CSR',
        summaryValue: '98.3%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR represents the percentage of eligible claims settled by Care Health through its wide network of 24,800+ cashless healthcare providers.',
        singleYear: '98.3%',
        singleYearLabel: 'Recent Single Year (FY2024-25)',
        threeYearAvg: '98.2%',
        threeYearAvgLabel: '3 Year Average (FY2022-25)'
      },
      icr: {
        title: 'ICR',
        summaryValue: '57%',
        subtitle: 'Incurred Claim Ratio',
        explanation: 'ICR shows the proportion of earned premium spent on honoring claims. A healthy ICR of 57% reflects disciplined risk management and reliable claims liquidity.',
        range: '57% → 61%',
        rangeLabel: 'Incurred Claim Ratio'
      },
      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        summaryValue: '15.4',
        explanation: 'Low grievance volume per 10,000 settled claims with dedicated digital claim settlement desks.',
        value: '15.4',
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
        summaryValue: 'Religare 68.4%',
        explanation: 'Promoted by Religare Enterprises Limited alongside Union Bank of India and marquee institutional investors.',
        items: [
          { name: 'Religare Enterprises Limited', value: '68.4%', label: 'Shareholding' },
          { name: 'Union Bank of India', value: '5.6%', label: 'Shareholding' },
          { name: 'Corporation Bank & Institutional Investors', value: '26.0%', label: 'Shareholding' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'A+',
        explanation: 'CRISIL A+ / Positive and CARE A+ ratings reflect robust balance sheet, high solvency, and underwriting strength.',
        items: [
          { agency: 'CRISIL', rating: 'A+ / Positive' },
          { agency: 'CARE Ratings', rating: 'CARE A+ / Stable' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '1.82×',
        explanation: "Solvency ratio measures the insurer's financial buffer to pay claims under stress conditions, well above the IRDAI mandatory 1.50×.",
        value: '1.82×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹5,200+ Cr',
        explanation: 'Strong gross written premium base and investment reserves assuring timely cashless claims payments.',
        value: '₹5,200+ Cr',
        label: 'Annual Premium Underwritten'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: 'Top Global Reinsurers',
        explanation: 'Reinsurance treaties backed by GIC Re, Swiss Re, and Munich Re for catastrophic exposure coverage.',
        value: 'AAA / A+ Rated',
        label: 'Reinsurance Treaty Partners'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: 'Leading Standalone Health Insurer',
        explanation: 'One of India’s top pure-play retail standalone health insurers with 24,800+ cashless network hospitals.',
        value: '24,800+ Network Hospitals',
        label: 'Cashless Healthcare Network'
      }
    },

    // --- 3. LIMITATIONS & WAITING PERIODS ---
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Terms & Waiting Periods',
      description: 'Interactive policy timelines, specific disease waiting, and permanent exclusions.',
      items: [
        {
          id: 'initial',
          title: 'Initial Waiting Period (30 Days)',
          summary: '30 Days initial waiting period applies from inception for illnesses, except accidents.',
          highlight: 'Accidental hospital admission is covered immediately from Day 1 with zero waiting period.',
          policyRef: 'Care Advantage Policy Terms (Section 3.1)',
          durationTag: '30 Days'
        },
        {
          id: 'named-ailments',
          title: 'Named Ailment Waiting Period (24 Months)',
          summary: '24 Months continuous coverage required for medical or surgical treatment of named ailments:',
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
          policyRef: 'Care Advantage Specific Illness Schedule',
          durationTag: '24 Months'
        },
        {
          id: 'ped-waiting',
          title: 'Pre-Existing Disease Waiting Period (36 Months)',
          summary: '36 Months continuous coverage required for pre-existing diseases declared at inception (can be reduced to 24 months with optional rider).',
          highlight: 'Reduction in PED wait period optional rider can reduce this to 2 years.',
          policyRef: 'Care Advantage Policy Terms (Section 3.3)',
          durationTag: '36 Months'
        },
        {
          id: 'permanent-exclusions',
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
          policyRef: 'Standard IRDAI & Care Health Guidelines',
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW ---
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Important Care Advantage policy terms that policyholders should keep in mind',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'high-sum-insured',
          icon: '💰',
          title: 'HIGH SUM INSURED OPTIONS',
          paragraphs: [
            'Choice of high-value protection: ₹25 Lacs, ₹50 Lacs, and ₹1 Crore to ensure comprehensive financial security against catastrophic medical events.'
          ]
        },
        {
          id: 'no-sublimit-room-icu',
          icon: '🏥',
          title: 'ZERO ROOM RENT & ICU SUB-LIMITS',
          paragraphs: [
            'No Sub-Limit on Room Rent and No Sub-Limit on ICU Charges, giving complete freedom in hospital room selection.'
          ]
        },
        {
          id: 'auto-recharge',
          icon: '🔄',
          title: 'AUTOMATIC RECHARGE ONCE PER YEAR',
          paragraphs: [
            'Automatic Recharge available once in a Policy Year to replenish the Sum Insured upon exhaustion for subsequent hospitalizations.'
          ]
        },
        {
          id: 'smart-select',
          icon: '🛡️',
          title: 'SMART SELECT NETWORK',
          paragraphs: [
            'Full coverage up to Sum Insured for hospitals under Smart Select Network, with optional premium discount.'
          ]
        }
      ]
    },

    // --- 5. 4 POLICY BENEFITS CATEGORIES ---
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
            id: 'adv-inpatient-daycare',
            title: 'In Patient & Day Care Treatment Expenses',
            subtitle: 'Up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'activity',
            summary: 'Up to Sum Insured.'
          },
          {
            id: 'adv-room-rent',
            title: 'Room Rent',
            subtitle: 'No Sub-Limit.',
            badge: 'NO SUB-LIMIT',
            iconType: 'home',
            summary: 'No Sub-Limit.'
          },
          {
            id: 'adv-icu-charges',
            title: 'ICU Charges',
            subtitle: 'No Sub-Limit.',
            badge: 'NO SUB-LIMIT',
            iconType: 'activity',
            summary: 'No Sub-Limit.'
          },
          {
            id: 'adv-pre-post-hosp',
            title: 'Pre Hospitalisation / Post Hospitalisation',
            subtitle: '30 days pre-hospitalisation and 60 days post-hospitalisation.',
            badge: '30 & 60 DAYS',
            iconType: 'calendar',
            summary: '30 days pre-hospitalisation and 60 days post-hospitalisation.'
          },
          {
            id: 'adv-auto-recharge',
            title: 'Automatic Recharge',
            subtitle: 'Yes, once in a Policy Year.',
            badge: 'ONCE A YEAR',
            iconType: 'refresh',
            summary: 'Yes, once in a Policy Year.'
          },
          {
            id: 'adv-ambulance-cover',
            title: 'Ambulance Cover',
            subtitle: 'Up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'truck',
            summary: 'Up to Sum Insured.'
          },
          {
            id: 'adv-organ-donor',
            title: 'Organ Donor Expenses',
            subtitle: 'Up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'heart',
            summary: 'Up to Sum Insured.'
          },
          {
            id: 'adv-ncb',
            title: 'No Claim Bonus (NCB)',
            subtitle: '10% increase in SI per Policy Year in case of claim-free year; maximum up to 50% of SI.',
            badge: 'UP TO 50% NCB',
            iconType: 'trending',
            summary: '10% increase in SI per Policy Year in case of claim-free year; maximum up to 50% of SI.',
            steps: [
              'Year 1: +10%',
              'Year 2: +20%',
              'Year 3: +30%',
              'Year 4: +40%',
              'Year 5: 50% Max'
            ]
          },
          {
            id: 'adv-initial-waiting',
            title: 'Initial Waiting Period',
            subtitle: '30 Days.',
            badge: '30 DAYS',
            iconType: 'clock',
            summary: '30 Days.'
          },
          {
            id: 'adv-named-ailment-waiting',
            title: 'Named Ailment Waiting Period',
            subtitle: '24 Months.',
            badge: '24 MONTHS',
            iconType: 'clock',
            summary: '24 Months.'
          },
          {
            id: 'adv-ped-waiting',
            title: 'Pre-Existing Disease Waiting Period',
            subtitle: '36 Months.',
            badge: '36 MONTHS',
            iconType: 'clock',
            summary: '36 Months.'
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
            id: 'adv-health-checkup',
            title: 'Annual Health Check-up',
            subtitle: 'Annual.',
            badge: 'ANNUAL',
            iconType: 'heart',
            summary: 'Annual.'
          },
          {
            id: 'adv-smart-select-network',
            title: 'Smart Select Network',
            subtitle: 'For hospitals covered under Smart Select Network, coverage up to Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'shield',
            summary: 'For hospitals covered under Smart Select Network, coverage up to Sum Insured.'
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
            id: 'adv-sum-insured-options',
            title: 'Sum Insured Options',
            subtitle: '₹25 Lacs, ₹50 Lacs and ₹1 Crore.',
            badge: '₹25L - ₹1CR',
            iconType: 'dollar',
            summary: '₹25 Lacs, ₹50 Lacs and ₹1 Crore.'
          },
          {
            id: 'adv-policy-term',
            title: 'Policy Term',
            subtitle: '1 / 2 / 3 Years.',
            badge: '1 / 2 / 3 YEARS',
            iconType: 'calendar',
            summary: '1 / 2 / 3 Years.'
          },
          {
            id: 'adv-individual-floater',
            title: 'Individual / Floater',
            subtitle: 'Available for Individual and Floater coverage.',
            badge: 'INDIVIDUAL & FLOATER',
            iconType: 'users',
            summary: 'Available for Individual and Floater coverage.'
          },
          {
            id: 'adv-entry-age',
            title: 'Entry Age',
            subtitle: 'Minimum: Individual 5 years; Floater 91 days with at least 1 insured person aged 18 years or above.',
            badge: 'MIN ENTRY AGE',
            iconType: 'users',
            summary: 'Minimum: Individual 5 years; Floater 91 days with at least 1 insured person aged 18 years or above.'
          },
          {
            id: 'adv-entry-age-max',
            title: 'Entry Age Maximum',
            subtitle: 'Lifelong.',
            badge: 'LIFELONG',
            iconType: 'clock',
            summary: 'Lifelong.'
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
            id: 'adv-ncb-super',
            title: 'No Claims Bonus Super (NCBS)',
            subtitle: '50% increase in SI per Policy Year in case of claim-free year; maximum up to 100% of SI.',
            badge: 'UP TO 100% NCBS',
            isRider: true,
            iconType: 'trending',
            summary: '50% increase in SI per Policy Year in case of claim-free year; maximum up to 100% of SI. In case of a claim being paid, 50% decrease in SI per Policy Year; such decrease is only in SI accrued as NCBS.',
            points: [
              '50% increase in SI per Policy Year in case of claim-free year; maximum up to 100% of SI.',
              'In case of a claim being paid, 50% decrease in SI per Policy Year; such decrease is only in SI accrued as NCBS.'
            ]
          },
          {
            id: 'adv-air-ambulance',
            title: 'Air Ambulance Cover',
            subtitle: 'Up to ₹5 Lacs.',
            badge: 'UP TO ₹5 LACS',
            isRider: true,
            iconType: 'truck',
            summary: 'Up to ₹5 Lacs.'
          },
          {
            id: 'adv-smart-select-other',
            title: 'Smart Select – Other Hospitals',
            subtitle: '20% co-payment on all claims for hospitals not part of the Smart Select Network.',
            badge: '20% CO-PAY',
            isRider: true,
            iconType: 'shield',
            summary: '20% co-payment on all claims for hospitals not part of the Smart Select Network.'
          },
          {
            id: 'adv-reduction-ped',
            title: 'Reduction in PED Wait Period',
            subtitle: 'Applicable PED waiting period of 3 years will be reduced to 2 years.',
            badge: '3 YRS → 2 YRS',
            isRider: true,
            iconType: 'clock',
            summary: 'Applicable PED waiting period of 3 years will be reduced to 2 years.'
          },
          {
            id: 'adv-room-rent-mod',
            title: 'Room Rent Modification',
            subtitle: 'Single private room category.',
            badge: 'SINGLE PRIVATE ROOM',
            isRider: true,
            iconType: 'home',
            summary: 'Single private room category.'
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // PLAN 5: CARE FREEDOM
  // ===========================================================================
  'care-freedom': {
    planId: 'care-freedom',
    planName: 'Care Freedom',
    fullName: 'Care Health Care Freedom',
    companyName: 'Care Health',
    tagline: 'Healthcare Freedom with Zero Pre-Policy Medical Check-up',
    subtitle: 'Healthcare Freedom with Zero Pre-Policy Medical Check-up',
    coverage: '₹3 Lakh - ₹10 Lakh',
    premium: '₹11,800/year',

    uiConfig: {
      primaryColor: '#003366',
      accentColor: '#FACC15',
      lightBg: '#FEFCE8',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Care Health Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'CSR',
        summaryValue: '98.3%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR represents the percentage of eligible claims settled by Care Health through its wide network of 24,800+ cashless healthcare providers.',
        singleYear: '98.3%',
        singleYearLabel: 'Recent Single Year (FY2024-25)',
        threeYearAvg: '98.2%',
        threeYearAvgLabel: '3 Year Average (FY2022-25)'
      },
      icr: {
        title: 'ICR',
        summaryValue: '57%',
        subtitle: 'Incurred Claim Ratio',
        explanation: 'ICR shows the proportion of earned premium spent on honoring claims. A healthy ICR of 57% reflects disciplined risk management and reliable claims liquidity.',
        range: '57% → 61%',
        rangeLabel: 'Incurred Claim Ratio'
      },
      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        summaryValue: '15.4',
        explanation: 'Low grievance volume per 10,000 settled claims with dedicated digital claim settlement desks.',
        value: '15.4',
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
        summaryValue: 'Religare 68.4%',
        explanation: 'Promoted by Religare Enterprises Limited alongside Union Bank of India and marquee institutional investors.',
        items: [
          { name: 'Religare Enterprises Limited', value: '68.4%', label: 'Shareholding' },
          { name: 'Union Bank of India', value: '5.6%', label: 'Shareholding' },
          { name: 'Corporation Bank & Institutional Investors', value: '26.0%', label: 'Shareholding' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'A+',
        explanation: 'CRISIL A+ / Positive and CARE A+ ratings reflect robust balance sheet, high solvency, and underwriting strength.',
        items: [
          { agency: 'CRISIL', rating: 'A+ / Positive' },
          { agency: 'CARE Ratings', rating: 'CARE A+ / Stable' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '1.82×',
        explanation: "Solvency ratio measures the insurer's financial buffer to pay claims under stress conditions, well above the IRDAI mandatory 1.50×.",
        value: '1.82×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹5,200+ Cr',
        explanation: 'Strong gross written premium base and investment reserves assuring timely cashless claims payments.',
        value: '₹5,200+ Cr',
        label: 'Annual Premium Underwritten'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: 'Top Global Reinsurers',
        explanation: 'Reinsurance treaties backed by GIC Re, Swiss Re, and Munich Re for catastrophic exposure coverage.',
        value: 'AAA / A+ Rated',
        label: 'Reinsurance Treaty Partners'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: 'Leading Standalone Health Insurer',
        explanation: 'One of India’s top pure-play retail standalone health insurers with 24,800+ cashless network hospitals.',
        value: '24,800+ Network Hospitals',
        label: 'Cashless Healthcare Network'
      }
    },

    // --- 3. LIMITATIONS & WAITING PERIODS ---
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Terms & Waiting Periods',
      description: 'Interactive policy timelines, specific disease waiting, and permanent exclusions.',
      items: [
        {
          id: 'initial',
          title: 'Initial Waiting Period (30 Days)',
          summary: 'A 30-day initial waiting period applies from policy inception for illnesses, except accidents.',
          highlight: 'Accidental hospital admission is covered immediately from Day 1 with zero waiting period.',
          policyRef: 'Care Freedom Policy Terms (Section 3.1)',
          durationTag: '30 Days'
        },
        {
          id: 'specific',
          title: 'Specific Disease Waiting Period (24 Months)',
          summary: '24 Months continuous coverage required for medical or surgical treatment of specified ailments:',
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
          policyRef: 'Care Freedom Specific Illness Schedule',
          durationTag: '24 Months'
        },
        {
          id: 'ped-waiting',
          title: 'Pre-Existing Disease Waiting Period (24 Months)',
          summary: 'Pre-existing medical conditions like Diabetes and Hypertension covered with 24 months continuous coverage under Care Freedom.',
          highlight: 'Fast-track coverage for individuals with pre-existing conditions.',
          policyRef: 'Care Freedom Policy Terms (Section 3.3)',
          durationTag: '24 Months'
        },
        {
          id: 'permanent-exclusions',
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
          policyRef: 'Standard IRDAI & Care Health Guidelines',
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW ---
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Important Care Freedom policy terms that policyholders should keep in mind',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'freedom-inpatient',
          icon: '🏥',
          title: 'IN-PATIENT CARE (MINIMUM 24 HOURS)',
          paragraphs: [
            'Covers treatment expenses if admitted to a hospital for a minimum period of 24 consecutive hours, including room charges, nursing expenses, ICU charges, surgeon and doctor fees.'
          ]
        },
        {
          id: 'freedom-daycare',
          icon: '📋',
          title: '540+ DAY CARE TREATMENTS COVERED',
          paragraphs: [
            'Covers medical expenses for specified day care treatments, covering more than 540 treatments, at a hospital or Day Care Centre.'
          ]
        },
        {
          id: 'freedom-recharge',
          icon: '🔄',
          title: '100% RECHARGE OF SUM INSURED',
          paragraphs: [
            'Automatic refill/recharge of 100% of the base Sum Insured if the claim amount exhausts the coverage limit, usable for unrelated future claims.'
          ]
        },
        {
          id: 'freedom-domiciliary',
          icon: '🏠',
          title: 'DOMICILIARY HOSPITALISATION',
          paragraphs: [
            'Reimburses medical expenses for treatment taken at home if hospitalisation is not possible, provided treatment exceeds 3 consecutive days.'
          ]
        }
      ]
    },

    // --- 5. 4 POLICY BENEFITS CATEGORIES ---
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
            id: 'free-inpatient-care',
            title: 'In-Patient Care',
            subtitle: 'Covers treatment expenses if admitted for min 24 consecutive hours.',
            badge: 'IN-PATIENT CARE',
            iconType: 'activity',
            summary: "Covers treatment expenses if admitted to a hospital for a minimum period of 24 consecutive hours, including room charges, nursing expenses, ICU charges, surgeon's fee, doctor's fee, anaesthesia, blood, oxygen, and operation theatre charges."
          },
          {
            id: 'free-day-care',
            title: 'Day Care Treatment',
            subtitle: 'Covers more than 540 treatments at hospital or Day Care Centre.',
            badge: '540+ TREATMENTS',
            iconType: 'clipboard',
            summary: 'Covers medical expenses for specified day care treatments, covering more than 540 treatments, at a hospital or Day Care Centre.'
          },
          {
            id: 'free-pre-hosp',
            title: 'Pre-Hospitalisation',
            subtitle: 'Covers investigative tests, examination, and medication before admission.',
            badge: 'PRE-HOSPITALISATION',
            iconType: 'calendar',
            summary: 'Covers medical expenses incurred before hospitalisation, including investigative tests, examination, and medication.'
          },
          {
            id: 'free-post-hosp',
            title: 'Post-Hospitalisation',
            subtitle: 'Follow-up visits, medication, and tests up to 30 days beyond Policy End Date.',
            badge: 'POST-HOSPITALISATION',
            iconType: 'calendar',
            summary: 'Covers medical expenses incurred after hospitalisation, such as follow-up visits, medication, and confirmatory tests, valid up to 30 consecutive days beyond the Policy End Date.'
          },
          {
            id: 'free-ambulance-cover',
            title: 'Ambulance Cover',
            subtitle: 'Reimburses expenses incurred on emergency ambulance services.',
            badge: 'AMBULANCE COVER',
            iconType: 'truck',
            summary: 'Reimburses expenses incurred on emergency ambulance services offered by a hospital or any ambulance service provider.'
          },
          {
            id: 'free-domiciliary-hosp',
            title: 'Domiciliary Hospitalisation',
            subtitle: 'Home treatment expenses when exceeding 3 consecutive days.',
            badge: 'DOMICILIARY COVER',
            iconType: 'home',
            summary: 'Reimburses medical expenses for treatment taken at home if hospitalisation is not possible, provided the treatment exceeds 3 consecutive days and merits hospitalisation.'
          },
          {
            id: 'free-recharge-si',
            title: 'Recharge of Sum Insured',
            subtitle: 'Automatic refill of 100% base SI upon exhaustion.',
            badge: '100% RECHARGE',
            iconType: 'refresh',
            summary: 'Automatic refill/recharge of 100% of the base Sum Insured if the claim amount exhausts the coverage limit, which can be used by other insured members or for unrelated future claims in the same year.'
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
            id: 'free-annual-checkup',
            title: 'Annual Health Check-up',
            subtitle: 'CBC with ESR, Urine Routine, Blood Sugar, Lipid, KFT, and ECG for all adult members.',
            badge: 'ANNUAL CHECK-UP',
            iconType: 'heart',
            summary: 'Annual health check-ups provided for all insured members covered as adults, regardless of claims history. Includes tests like Complete Blood Count with ESR, Urine Routine, Blood Group, Fasting Blood Sugar, Lipid Profile, Kidney Function Test, and ECG.'
          },
          {
            id: 'free-ayush-treatment',
            title: 'AYUSH Treatment',
            subtitle: 'Covered up to the Sum Insured.',
            badge: 'UP TO SUM INSURED',
            iconType: 'shield',
            summary: 'Covered up to the Sum Insured.'
          },
          {
            id: 'free-home-care',
            title: 'Home Care',
            subtitle: 'Hiring a Qualified Nurse for daily activities up to 7 days/illness, max 45 days/year.',
            badge: 'QUALIFIED NURSE',
            iconType: 'home',
            summary: 'Indemnifies expenses incurred towards hiring a Qualified Nurse for daily activities, up to 7 days per illness/injury and maximum 45 days per policy year after a 1-day deductible.'
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
            id: 'free-consumable-allowance',
            title: 'Consumable Allowance',
            subtitle: 'Daily allowance for non-medical expenses: ₹750/day or ₹1,000/day up to 7 days.',
            badge: 'DAILY ALLOWANCE',
            iconType: 'dollar',
            summary: 'Pays a daily allowance for non-medical expenses like consumables, transportation, and attendant costs. Maximum 7 days per hospitalisation, covered after 3 days; ₹750/day or ₹1,000/day depending on the plan.'
          },
          {
            id: 'free-companion-benefit',
            title: 'Companion Benefit',
            subtitle: 'Lump-sum payout once in a policy year if hospitalised for more than 10 consecutive days.',
            badge: 'LUMP-SUM PAYOUT',
            iconType: 'heart',
            summary: 'Lump-sum payout once in a policy year if the insured person is hospitalised for more than 10 consecutive days.'
          },
          {
            id: 'free-dialysis-cover',
            title: 'Dialysis Cover',
            subtitle: 'Covers dialysis expenses up to a specific amount per sitting, payable up to 24 months.',
            badge: 'UP TO 24 MONTHS',
            iconType: 'activity',
            summary: 'Covers dialysis expenses up to a specific amount per sitting, payable up to 24 months.'
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
            id: 'free-health-check-plus',
            title: 'Health Check+ (Optional Cover)',
            subtitle: 'Upgrade annual check-up to specialised Diabetes or Cardiac Health Check-up.',
            badge: 'OPTIONAL UPGRADE',
            isRider: true,
            iconType: 'heart',
            summary: 'Option to upgrade the annual health check-up to a specialised Diabetes Health Check-up or Cardiac Health Check-up.'
          }
        ]
      }
    ]
  }
};

export const getCarePlanData = (planId) => {
  const canonicalId = resolveCarePlanId(planId);
  return CARE_HEALTH_PLANS_DATA[canonicalId] || null;
};

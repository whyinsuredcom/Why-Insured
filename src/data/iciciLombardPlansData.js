// =============================================================================
// ICICI LOMBARD PLANS INDEPENDENT DATA CONFIGURATION
// 1. Complete Health Insurance  → complete-health-insurance
// 2. Health Shield              → health-shield
// 3. Golden Shield              → golden-shield
//
// Each plan has completely separate, independent data, UI config, and content.
// Editing one plan will NOT affect any other plan.
// =============================================================================

export const ICICI_LOMBARD_CANONICAL_PLAN_IDS = [
  'elevate',
  'activate-booster'
];

export const resolveIciciPlanId = (planId) => {
  if (!planId) return null;
  const cleanId = String(planId).toLowerCase().trim();
  if (cleanId === 'elevate' || cleanId === 'icici-elevate' || cleanId === 'icici-lombard-elevate' || cleanId === 'elevate-plan') {
    return 'elevate';
  }
  if (
    cleanId === 'activate-booster' ||
    cleanId === 'activatebooster' ||
    cleanId === 'activate-booster-super-top-up' ||
    cleanId === 'activate-booster-top-up' ||
    cleanId === 'icici-activate-booster' ||
    cleanId === 'icici-lombard-activate-booster' ||
    cleanId === 'activate-booster-plan'
  ) {
    return 'activate-booster';
  }
  return cleanId;
};

export const ICICI_LOMBARD_PLANS_DATA = {
  // ===========================================================================
  // PLAN: ELEVATE (ICICI LOMBARD — ELEVATE)
  // ===========================================================================
  'elevate': {
    planId: 'elevate',
    planName: 'Elevate',
    tagline: 'Infinite Care, Power Booster, Unlimited Restoration & Customizable Healthcare Protection',
    coverage: '₹5 Lakh - ₹3 Crore',
    premium: '₹16,500/year',

    uiConfig: {
      primaryColor: '#F58220',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'ICICI Lombard Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'CSR',
        summaryValue: '98.0%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR represents the percentage of eligible claims settled by ICICI Lombard with instant cashless processing across 10,000+ network hospitals.',
        singleYear: '98.0%',
        singleYearLabel: 'Recent Single Year (FY2024-25)',
        threeYearAvg: '98.1%',
        threeYearAvgLabel: '3 Year Average (FY2022-25)'
      },
      icr: {
        title: 'ICR',
        summaryValue: '71%',
        subtitle: 'Incurred Claim Ratio',
        explanation: 'ICR measures the percentage of earned premium paid back to policyholders as claims. A stable ICR of 71% reflects balanced underwriting and high financial security.',
        range: '71% → 74%',
        rangeLabel: 'Incurred Claim Ratio'
      },
      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        summaryValue: '13.8',
        explanation: 'Lowest complaint ratios in the general insurance industry per 10,000 claims with AI-backed cashless desk.',
        value: '13.8',
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
        summaryValue: 'ICICI Bank 51.2%',
        explanation: 'Backed by banking giant ICICI Bank Limited with strong corporate governance and institutional shareholders.',
        items: [
          { name: 'ICICI Bank Limited (Promoter)', value: '51.2%', label: 'Shareholding' },
          { name: 'Foreign & Domestic Institutional Investors', value: '38.4%', label: 'Shareholding' },
          { name: 'Public & Retail Shareholders', value: '10.4%', label: 'Shareholding' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'AAA',
        explanation: 'CRISIL AAA / Stable and ICRA AAA ratings signify highest safety regarding timely servicing of financial obligations.',
        items: [
          { agency: 'CRISIL', rating: 'AAA / Stable' },
          { agency: 'ICRA', rating: 'AAA / Stable' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '2.62×',
        explanation: 'Exceptional solvency ratio of 2.62× providing an immense capital cushion well above the IRDAI mandatory minimum of 1.50×.',
        value: '2.62×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹48,000+ Cr',
        explanation: 'One of the largest investment asset portfolios in India, assuring prompt hospitalisation settlements.',
        value: '₹48,000+ Cr',
        label: 'Investment Assets under Management'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: '90%+',
        explanation: 'Over 90% of reinsurance treaties placed with top tier AAA-rated global reinsurers (Munich Re, Swiss Re, GIC Re).',
        value: '90%+',
        label: 'Backed by Munich Re, Swiss Re & GIC Re'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: '#1 Private Non-Life',
        explanation: 'Largest private sector non-life insurer in India with over 10,000+ cashless network hospitals nationwide.',
        value: '#1 Private General Insurer',
        label: 'Over 3.5 Crore+ Policies Issued'
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
          summary: 'A mandatory waiting period of 30 days applies from policy inception date for any non-accidental illness or hospitalisation.',
          highlight: 'Accidental hospitalisation covered from Day 1. Pre-existing diseases covered from Day 31 with Jumpstart Rider.',
          policyRef: 'ICICI Lombard Elevate Policy Terms (Section 3.1)',
          durationTag: '30 Days / Day 31 (Jumpstart)'
        },
        {
          id: 'specific',
          title: '2 Years Waiting Period on Specific Diseases',
          summary: 'A continuous waiting period of 24 months (2 Years) applies for medical or surgical treatment of specified conditions:',
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
          policyRef: 'ICICI Lombard Elevate Specific Illness Schedule (Section 3.2)',
          durationTag: '24 Months'
        },
        {
          id: 'permanent',
          title: 'Permanent Exclusions',
          summary: 'The policy does not cover expenses incurred towards hospitalisation or treatment arising from standard permanent exclusions:',
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
          policyRef: 'Standard IRDAI & ICICI Lombard Guidelines (Section 4)',
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW (INDEPENDENT) ---
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Key Elevate policy terms and highlights that policyholders should keep in mind',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'room-category',
          icon: '🏥',
          title: 'SINGLE PRIVATE A/C ROOM (100% CASHLESS)',
          paragraphs: [
            'Single Private A/c Room is covered with zero capping and 100% cashless claims.',
            'No daily sub-limits on room rent or ICU charges in network hospitals.'
          ]
        },
        {
          id: 'unlimited-restoration',
          icon: '🔄',
          title: 'UNLIMITED RESTORATION (10+10+10...10 LAC)',
          paragraphs: [
            'Infinite restore feature refills 100% of the Sum Insured unlimited times in a policy year.',
            'Ensures your family never runs out of coverage even with multiple hospitalizations.'
          ]
        },
        {
          id: 'power-booster',
          icon: '⚡',
          title: 'POWER BOOSTER & INFINITE CARE RIDERS',
          paragraphs: [
            'Power Booster provides 100% bonus every year irrespective of claims for an indefinite period.',
            'Infinite Care gives a one-time infinite claim amount during catastrophic emergencies.'
          ]
        },
        {
          id: 'discounts-perks',
          icon: '🏷️',
          title: 'COMPREHENSIVE DISCOUNT STRUCTURE',
          paragraphs: [
            'Up to 15% Credit Score discount, up to 30% Wellness discount on renewal, 2.5% Early Renewal discount, and up to 15% Long Tenure discount.'
          ]
        }
      ]
    },

    // --- 5. POLICY BENEFITS (4 CLEAN CATEGORIES) ---
    featuresSections: [
      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 1: MOST IMPORTANT
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-most-important',
        title: 'MOST IMPORTANT',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'elevate-room-rent',
            title: 'Single Private A/c Room',
            subtitle: '100% Cashless Inpatient Hospitalisation',
            summary: 'Full coverage for Single Private A/C Room with zero room rent sub-limits, zero proportionate deductions, and 100% cashless claim settlements across 10,000+ network hospitals.',
            points: [
              'Single Private A/c Room covered with 100% Cashless facility',
              'No daily room rent capping or proportionate deductions',
              'Smooth admission and hassle-free discharge process'
            ],
            badge: '100% CASHLESS',
            isProminent: true,
            iconType: 'home'
          },
          {
            id: 'elevate-pre-post',
            title: 'Pre & Post Hospitalization',
            subtitle: '90 Days Pre & 180 Days Post Hospitalization',
            summary: 'Comprehensive coverage for medical consultations, specialist visits, diagnostic scans, lab tests, and prescribed pharmacy expenses for 90 days before hospitalisation and 180 days after discharge.',
            points: [
              'Pre-hospitalization covered up to 90 days prior to admission',
              'Post-hospitalization covered up to 180 days after discharge',
              'Covers doctor follow-ups, diagnostic scans, and recovery medicines'
            ],
            badge: '90 & 180 DAYS',
            isProminent: true,
            iconType: 'calendar'
          },
          {
            id: 'elevate-icu-limit',
            title: 'No Limit on ICU',
            subtitle: 'Zero ICU Capping & Full Inpatient Care',
            summary: 'Zero sub-limits or daily capping on Intensive Care Unit (ICU), Intensive Cardiac Care Unit (ICCU), nursing charges, doctor consultations, and surgeon fees up to the full Sum Insured limit.',
            points: [
              'No capping or daily limit on ICU / ICCU room charges',
              'Surgeon, specialist, and nursing expenses covered up to Sum Insured',
              'Complete inpatient medical and surgical procedure protection'
            ],
            badge: 'NO ICU LIMIT',
            isProminent: true,
            iconType: 'shield'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 2: valueAdded
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-value-added',
        title: 'valueAdded',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'elevate-unlimited-restoration',
            title: 'Unlimited Restoration',
            subtitle: '10+10+10...10 Lac Infinite Refill',
            summary: 'Automatic 100% restoration of Sum Insured unlimited times in a policy year upon partial or complete exhaustion (e.g., 10+10+10...10 Lac), ensuring your coverage never runs out.',
            steps: ['Base Sum Insured (10L)', '1st Restore (+10L)', '2nd Restore (+10L)', 'Unlimited Restorations'],
            points: [
              '100% Sum Insured restoration unlimited times in a year',
              'Applies to both unrelated and related illnesses as per terms',
              'Continuous financial shield for all insured family members'
            ],
            badge: 'UNLIMITED RESTORE',
            iconType: 'refresh'
          },
          {
            id: 'elevate-bonus',
            title: 'Bonus: 20% to 100%',
            subtitle: 'Eg: 20 Lac → 40 Lac Coverage Growth',
            summary: 'Cumulative bonus ranging from 20% to 100% of Sum Insured for claim-free years. For example, a ₹20 Lac base cover doubles to ₹40 Lac without paying any extra premium.',
            steps: ['Base ₹20 Lac', '20% Annual Bonus', 'Up to 100% Bonus', 'Total ₹40 Lac Cover'],
            points: [
              'Cumulative bonus increases Sum Insured from 20% up to 100%',
              'Example: 20 Lac coverage grows up to 40 Lac',
              'Zero increase in base premium for earned bonus'
            ],
            badge: '20% TO 100% BONUS',
            iconType: 'trending'
          },
          {
            id: 'elevate-disc-credit-score',
            title: 'Credit Score Based Discount',
            subtitle: 'Up to 15% in Premium+ Based on Score',
            summary: 'Get up to a 15% discount in Premium+ based on maintaining a good credit score / financial track record.',
            points: [
              'Up to 15% discount based on healthy credit score',
              'Applies directly to the Premium+ policy tier',
              'Rewards financially disciplined policyholders'
            ],
            badge: 'UP TO 15% OFF',
            iconType: 'credit'
          },
          {
            id: 'elevate-disc-wellness',
            title: 'Wellness Discount',
            subtitle: 'Up to 30% on Renewal by Redeeming Points',
            summary: 'Earn up to a 30% discount on renewal premium by actively completing wellness activities, step tracking, and health screenings.',
            points: [
              'Up to 30% renewal discount earned via health habits',
              'Includes step tracking, fitness milestones & regular checkups',
              'Encourages continuous active wellness and lifestyle fitness'
            ],
            badge: 'UP TO 30% OFF',
            iconType: 'heart'
          },
          {
            id: 'elevate-disc-family',
            title: 'Family Discount',
            subtitle: 'Up to 10% for 2 or More Family Members',
            summary: 'Get up to a 10% discount on total premium when covering 2 or more family members under an individual or family floater structure.',
            points: [
              'Up to 10% discount covering 2+ family members',
              'Applicable across both individual and floater policies',
              'Significant annual savings for multi-member families'
            ],
            badge: 'UP TO 10% OFF',
            iconType: 'users'
          },
          {
            id: 'elevate-disc-tenure',
            title: 'Tenure Discount',
            subtitle: 'Up to 10% for Choosing 2 or 3 Year Policies',
            summary: 'Save up to 10% on policy premium by locking in multi-year healthcare coverage for 2 or 3 years in advance.',
            points: [
              'Up to 10% discount for 2 or 3-year upfront policy terms',
              'Locks in current premium rates against annual inflation',
              'Eliminates annual renewal paperwork and hassle'
            ],
            badge: 'UP TO 10% OFF',
            iconType: 'calendar'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 3: ADDITIONAL
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-additional',
        title: 'ADDITIONAL',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'elevate-road-ambulance',
            title: 'Road Ambulance Cover Available',
            subtitle: 'Emergency Road Surface Ambulance Charges',
            summary: 'Emergency road surface ambulance transportation charges covered for shifting the insured patient to the nearest hospital per hospitalisation event.',
            points: [
              'Emergency road surface ambulance expenses covered',
              'Quick hospital transit support during medical emergencies',
              'Cashless / reimbursement claim facility available'
            ],
            badge: 'AMBULANCE COVER',
            iconType: 'truck'
          },
          {
            id: 'elevate-day-care',
            title: 'All Day Care Treatment',
            subtitle: 'Less Than 24 Hrs Admission Covered',
            summary: 'All advanced day care procedures and surgical treatments requiring less than 24 hours of hospital admission due to modern medical advancements are fully covered.',
            points: [
              'All day care procedures requiring <24 hrs admission covered',
              'Covers dialysis, chemotherapy, radiotherapy, cataract, and minor surgeries',
              'Covered up to the full Sum Insured limit'
            ],
            badge: 'ALL DAY CARE',
            iconType: 'check'
          },
          {
            id: 'elevate-domiciliary-ayush',
            title: 'Domiciliary, Organ & AYUSH Treatment',
            subtitle: 'Ayurvedic, Unani, Organ Donor & Home Care',
            summary: 'Comprehensive coverage including doctor-prescribed home hospitalization (Domiciliary), organ donor harvesting inpatient expenses, and alternative treatments under AYUSH (Ayurveda, Yoga, Unani, Siddha, Homeopathy).',
            points: [
              'Domiciliary treatment covered when hospital beds are unavailable',
              'Inpatient organ donor harvesting medical expenses covered up to Sum Insured',
              'AYUSH inpatient alternative treatments (Ayurvedic, Unani, etc.) covered'
            ],
            badge: 'AYUSH & ORGAN COVER',
            iconType: 'heart'
          }
        ]
      },

      // ───────────────────────────────────────────────────────────────────────
      // CATEGORY 4: optional
      // ───────────────────────────────────────────────────────────────────────
      {
        id: 'sec-optional',
        title: 'optional',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'elevate-rider-infinite-care',
            title: 'Infinite Care',
            subtitle: 'Get One-Time Infinite Claim Amount',
            summary: 'Get a one-time infinite claim amount during critical emergencies, removing standard Sum Insured caps for catastrophic medical situations.',
            points: [
              'One-time uncapped / infinite claim amount available',
              'Ultimate financial protection against catastrophic healthcare events',
              'Optional add-on rider selected at policy inception'
            ],
            isRider: true,
            badge: 'OPTIONAL RIDER',
            iconType: 'zap'
          },
          {
            id: 'elevate-rider-power-booster',
            title: 'Power Booster',
            subtitle: '100% Bonus Every Year Irrespective of Claim',
            summary: 'Get a bonus of 100% every single year irrespective of whether a claim was filed, guaranteed for an indefinite period.',
            points: [
              '100% Sum Insured bonus added every single year',
              'Applies irrespective of claim history throughout the tenure',
              'Continuous compounding coverage protection'
            ],
            isRider: true,
            badge: 'OPTIONAL RIDER',
            iconType: 'trending'
          },
          {
            id: 'elevate-rider-claim-protector',
            title: 'Claim Protector',
            subtitle: 'Non-Payable Items (Gloves, Syringes, Masks)',
            summary: 'Covers non-payable and consumable hospital items like surgical gloves, cotton, syringes, PPE kits, and masks during inpatient hospitalisation.',
            points: [
              'Full cover for non-payable hospital consumables',
              'Includes gloves, cotton, syringes, masks, and administrative items',
              'Minimizes out-of-pocket expenses at hospital discharge'
            ],
            isRider: true,
            badge: 'OPTIONAL RIDER',
            iconType: 'shield'
          },
          {
            id: 'elevate-rider-inflation-protector',
            title: 'Inflation Protector',
            subtitle: 'Sum Insured Increases Based on Annual Inflation',
            summary: 'Sum insured will increase automatically at each policy renewal based on the previous year’s official inflation rate.',
            points: [
              'Sum Insured automatically adjusted upwards at renewal',
              'Indexed to the previous year’s consumer price inflation rate',
              'Protects your medical coverage from rising healthcare inflation'
            ],
            isRider: true,
            badge: 'OPTIONAL RIDER',
            iconType: 'trending'
          },
          {
            id: 'elevate-rider-annual-health-checkup',
            title: 'Annual Health Check-up',
            subtitle: 'Available on Cashless Basis Every Year',
            summary: 'Comprehensive preventive annual health check-up available on a 100% cashless basis every policy year for all enrolled members.',
            points: [
              '100% cashless annual health screening every year',
              'Available across certified diagnostic partner networks',
              'Helps track vital health parameters and early detection'
            ],
            isRider: true,
            badge: 'OPTIONAL RIDER',
            iconType: 'clipboard'
          },
          {
            id: 'elevate-rider-tele-consultation',
            title: 'Tele-consultation',
            subtitle: 'Unlimited 24/7 Digital Consultations',
            summary: 'Unlimited 24/7 digital tele-consultations with certified general physicians and medical specialists across multiple specialties.',
            points: [
              'Unlimited digital tele-consultations via app/portal',
              'Instant access to general practitioners and specialists',
              'Zero out-of-pocket fees per consultation session'
            ],
            isRider: true,
            badge: 'OPTIONAL RIDER',
            iconType: 'phone'
          },
          {
            id: 'elevate-rider-room-modifier',
            title: 'Room Modifier',
            subtitle: 'Upgrade or Downgrade Room Category Freely',
            summary: 'Provides policyholders the freedom to upgrade or downgrade their hospital room category as per their personal choice without proportionate deductions.',
            points: [
              'Flexibility to upgrade or downgrade hospital room category',
              'Eliminates proportionate deductions on room category change',
              'Personalized comfort during planned or emergency hospitalisation'
            ],
            isRider: true,
            badge: 'OPTIONAL RIDER',
            iconType: 'home'
          },
          {
            id: 'elevate-rider-worldwide-cover',
            title: 'Worldwide Cover',
            subtitle: 'Global Healthcare with Cashless up to ₹3 Crore',
            summary: 'Global healthcare protection offering cashless coverage of up to ₹3 Crore across top-rated international hospitals worldwide for planned and emergency treatments.',
            points: [
              'Cashless overseas healthcare coverage up to ₹3 Crore',
              'Access to leading international medical centers and specialists',
              'Covers critical planned and emergency medical procedures globally'
            ],
            isRider: true,
            badge: 'OPTIONAL RIDER',
            iconType: 'shield'
          },
          {
            id: 'elevate-rider-nri-advantage',
            title: 'NRI Advantage',
            subtitle: 'Get a 25% Discount on Base Premium',
            summary: 'Get a flat 25% discount on the base policy premium for Non-Resident Indians (NRIs) purchasing healthcare coverage in India.',
            points: [
              'Flat 25% discount on base premium for NRIs',
              'Comprehensive healthcare coverage during visits to India',
              'Cashless hospitalization across 10,000+ network hospitals'
            ],
            isRider: true,
            badge: 'OPTIONAL RIDER',
            iconType: 'dollar'
          },
          {
            id: 'elevate-rider-jumpstart',
            title: 'Jumpstart',
            subtitle: 'PED (Asthma, Diabetes, BP, etc.) Covered from Day 31',
            summary: 'Pre-existing diseases (PED) such as asthma, diabetes, hypertension/BP, and other declared conditions covered from Day 31 instead of waiting years.',
            points: [
              'Pre-existing disease waiting reduced to just 30 days',
              'Asthma, diabetes, hypertension & BP covered from Day 31',
              'Immediate peace of mind for individuals with existing conditions'
            ],
            isRider: true,
            badge: 'OPTIONAL RIDER',
            iconType: 'activity'
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // PLAN: ACTIVATE BOOSTER (SUPER TOP-UP POLICY)
  // ===========================================================================
  'activate-booster': {
    planId: 'activate-booster',
    planName: 'Activate Booster',
    planType: 'Super Top-Up Policy',
    fullName: 'ICICI Lombard Activate Booster (Super Top-Up Policy)',
    companyName: 'ICICI Lombard',
    tagline: 'High Sum Insured Super Top-Up Protection up to ₹3 Crore with Flexible Deductibles & Guaranteed Deductible Reduction',
    subtitle: 'High Sum Insured Super Top-Up Protection up to ₹3 Crore with Flexible Deductibles & Guaranteed Deductible Reduction',
    coverage: '₹10 Lakh - ₹3 Crore',
    premium: '₹4,200/year',

    uiConfig: {
      primaryColor: '#F58220',
      accentColor: '#D94A0B',
      lightBg: '#FFF4E8',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'ICICI Lombard Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'CSR',
        summaryValue: '98.0%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR represents the percentage of eligible claims settled by ICICI Lombard with instant cashless processing across 11,000+ network hospitals.',
        singleYear: '98.0%',
        singleYearLabel: 'Recent Single Year (FY2024-25)',
        threeYearAvg: '98.1%',
        threeYearAvgLabel: '3 Year Average (FY2022-25)'
      },
      icr: {
        title: 'ICR',
        summaryValue: '71%',
        subtitle: 'Incurred Claim Ratio',
        explanation: 'ICR measures the percentage of earned premium paid back to policyholders as claims. A stable ICR of 71% reflects balanced underwriting and high financial security.',
        range: '71% → 74%',
        rangeLabel: 'Incurred Claim Ratio'
      },
      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        summaryValue: '13.8',
        explanation: 'Lowest complaint ratios in the general insurance industry per 10,000 claims with AI-backed cashless desk.',
        value: '13.8',
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
        summaryValue: 'ICICI Bank 51.2%',
        explanation: 'Backed by banking giant ICICI Bank Limited with strong corporate governance and institutional shareholders.',
        items: [
          { name: 'ICICI Bank Limited (Promoter)', value: '51.2%', label: 'Shareholding' },
          { name: 'Foreign & Domestic Institutional Investors', value: '38.4%', label: 'Shareholding' },
          { name: 'Public & Retail Shareholders', value: '10.4%', label: 'Shareholding' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'AAA',
        explanation: 'CRISIL AAA / Stable and ICRA AAA ratings signify highest safety regarding timely servicing of financial obligations.',
        items: [
          { agency: 'CRISIL', rating: 'AAA / Stable' },
          { agency: 'ICRA', rating: 'AAA / Stable' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '2.62×',
        explanation: 'Exceptional solvency ratio of 2.62× providing an immense capital cushion well above the IRDAI mandatory minimum of 1.50×.',
        value: '2.62×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹48,000+ Cr',
        explanation: 'Massive investment assets under management ensuring prompt payouts and liquidity under heavy claim surges.',
        value: '₹48,000+ Cr',
        label: 'Total Assets under Management'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: '90%+',
        explanation: 'Reinsurance relationships backed by global giants Swiss Re, Munich Re, and Hannover Re.',
        value: '90%+',
        label: 'Global Reinsurer Capacity'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: '#1 Private Non-Life',
        explanation: 'Largest private sector general insurance provider in India with over 20+ years of trust and 11,000+ cashless hospitals.',
        value: '#1 Private Non-Life Insurer',
        label: 'Over 3.2 Crore Policies Issued'
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
          title: 'Initial Waiting Period (30 Days)',
          summary: 'A mandatory waiting period of 30 days applies from policy inception for any non-accidental illness.',
          highlight: 'Accidental hospitalization is covered from Day 1.',
          policyRef: 'Activate Booster Policy Terms (Section 3.1)',
          durationTag: '30 Days'
        },
        {
          id: 'specific',
          title: 'Specific Disease Waiting Period (2 Years)',
          summary: 'A continuous waiting period of 2 years (24 months) applies for medical or surgical treatment of specified conditions.',
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
          policyRef: 'ICICI Lombard Specific Disease Schedule',
          durationTag: '2 Years'
        },
        {
          id: 'ped',
          title: 'Pre-Existing Disease (PED) Waiting (3 Years)',
          summary: 'A waiting period of 3 years applies for pre-existing conditions declared at proposal.',
          highlight: 'Can be reduced to 2 or 1 year with the Waiting Period Reduction Option or Jumpstart.',
          policyRef: 'Activate Booster Policy Terms (Section 3.3)',
          durationTag: '3 Years'
        },
        {
          id: 'permanent',
          title: 'Permanent Exclusions',
          summary: 'The policy excludes expenses for cosmetic surgery, intentional self-injury, substance abuse, and unproven experimental treatments.',
          exclusionsList: [
            'Cosmetic, aesthetic & plastic surgery',
            'Intentional self-injury & suicide attempt',
            'Substance, alcohol & drug abuse rehabilitation',
            'Obesity & bariatric surgery unless life-threatening / indicated',
            'Diagnostic-only / investigation admissions',
            'Unproven / experimental treatments'
          ],
          policyRef: 'Standard IRDAI & ICICI Lombard Guidelines',
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW ---
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Important Activate Booster terms that policyholders should keep in mind',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'super-top-up',
          icon: '🛡️',
          title: 'SUPER TOP-UP DEDUCTIBLE MECHANISM',
          paragraphs: [
            'A Super Top-Up policy pays for total cumulative medical expenses that exceed the chosen deductible in a single policy year.',
            'Deductibles range from ₹3 Lakh to ₹20 Lakh, with Sum Insured options up to ₹3 Crore.'
          ]
        },
        {
          id: 'deductible-reduction',
          icon: '📉',
          title: 'GUARANTEED DEDUCTIBLE REDUCTION',
          paragraphs: [
            'Reduces the deductible by 10% at each renewal, maximum reduction is up to 50% of the deductible opted during first policy issuance.',
            'Helps you gradually lower your out-of-pocket threshold at zero extra cost.'
          ]
        },
        {
          id: 'room-modifier',
          icon: '🏥',
          title: 'ROOM MODIFIER FLEXIBILITY',
          paragraphs: [
            'Provides option to either upgrade or downgrade the room category as per requirement.',
            'Ensures customizable hospital accommodation benefits across network hospitals.'
          ]
        },
        {
          id: 'jumpstart',
          icon: '⚡',
          title: 'JUMPSTART & CHRONIC CARE PROGRAM',
          paragraphs: [
            'Jumpstart reduces waiting periods on diabetes, hypertension, cardiac, and bariatric conditions from 2 years/3 years down to 30 days.',
            'Chronic Disease Management Program provides structured OPD wellness & consultations.'
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
            id: 'act-sum-insured',
            title: 'Overall Sum Insured (SI) (₹.)',
            subtitle: 'High Sum Insured Options up to ₹3 Crore',
            badge: 'UP TO ₹3 CR',
            iconType: 'shield',
            planComparison: {
              planA: '10L, 15L, 20L, 25L, 45L, 50L, 85L, 90L, 95L, 1Cr, 3Cr',
              planB: '10L, 15L, 20L, 25L, 45L, 50L, 85L, 90L, 95L, 1Cr, 3Cr'
            },
            summary: 'Comprehensive super top-up coverage with flexible Sum Insured slabs ranging from ₹10 Lakh up to ₹3 Crore.',
            points: [
              'Plan A: 10L, 15L, 20L, 25L, 45L, 50L, 85L, 90L, 95L, 1Cr, 3Cr',
              'Plan B: 10L, 15L, 20L, 25L, 45L, 50L, 85L, 90L, 95L, 1Cr, 3Cr'
            ]
          },
          {
            id: 'act-deductible',
            title: 'Deductible (₹.)',
            subtitle: 'Flexible Aggregate Deductible Thresholds',
            badge: '₹3L - ₹20L',
            iconType: 'dollar',
            planComparison: {
              planA: '3L, 4L, 5L, 7.5L, 10L, 15L, 20L',
              planB: '3L, 4L, 5L, 7.5L, 10L, 15L, 20L'
            },
            summary: 'Choose from a wide range of aggregate deductible options to seamlessly pair with your existing base health cover.',
            points: [
              'Plan A: 3L, 4L, 5L, 7.5L, 10L, 15L, 20L',
              'Plan B: 3L, 4L, 5L, 7.5L, 10L, 15L, 20L'
            ]
          },
          {
            id: 'act-zones',
            title: 'Zones',
            subtitle: 'Zero Geographic Co-Payment',
            badge: 'NO ZONE CO-PAY',
            iconType: 'home',
            planComparison: {
              planA: 'No Zone Based Co-pay',
              planB: 'No Zone Based Co-pay'
            },
            summary: 'Avail treatments across India without any zone-based co-payment penalties or city-wise restrictions.',
            points: [
              'Plan A: No Zone Based Co-pay',
              'Plan B: No Zone Based Co-pay'
            ]
          },
          {
            id: 'act-inpatient',
            title: 'In-patient Treatment',
            subtitle: 'Full Hospitalization Covered up to SI',
            badge: 'UP TO SI',
            iconType: 'heart',
            planComparison: {
              planA: 'Up to SI',
              planB: 'Up to SI'
            },
            summary: 'Covers inpatient medical expenses, room rent, nursing fees, ICU charges, and specialist visits up to Sum Insured above chosen deductible.',
            points: [
              'Plan A: Up to SI',
              'Plan B: Up to SI'
            ]
          },
          {
            id: 'act-daycare',
            title: 'Day care Procedures/Treatment',
            subtitle: 'Advanced Surgeries Requiring <24 hrs Stay',
            badge: 'DAY CARE',
            iconType: 'check',
            planComparison: {
              planA: 'Up to SI',
              planB: 'Up to SI'
            },
            summary: 'All medical day care procedures and modern day surgeries requiring less than 24 hours hospitalization are covered up to Sum Insured.',
            points: [
              'Plan A: Up to SI',
              'Plan B: Up to SI'
            ]
          },
          {
            id: 'act-tech-advancements',
            title: 'Technological advancements and Treatments',
            subtitle: 'Modern Robotic & High-End Procedures',
            badge: 'MODERN TECH',
            iconType: 'cpu',
            planComparison: {
              planA: 'Up to SI',
              planB: 'Up to SI'
            },
            summary: 'Robotic surgeries, stem cell therapies, deep brain stimulation, and stereotactic radio surgery covered up to Sum Insured.',
            points: [
              'Plan A: Up to SI',
              'Plan B: Up to SI'
            ]
          },
          {
            id: 'act-pre-hosp',
            title: 'Pre-Hospitalization Medical Expenses',
            subtitle: 'Diagnostics & Consultations Before Admission',
            badge: '90 / 60 DAYS',
            iconType: 'calendar',
            planComparison: {
              planA: '90 days',
              planB: '60 days'
            },
            summary: 'Medical expenses, doctor consultations, investigations, and diagnostics incurred prior to hospital admission.',
            points: [
              'Plan A: 90 days',
              'Plan B: 60 days'
            ]
          },
          {
            id: 'act-post-hosp',
            title: 'Post-Hospitalization Medical Expenses',
            subtitle: 'Follow-ups & Medicines Post Discharge',
            badge: '180 / 90 DAYS',
            iconType: 'calendar',
            planComparison: {
              planA: '180 days',
              planB: '90 days'
            },
            summary: 'Medical expenses, follow-up consultations, physiotherapy, and medicines incurred after hospital discharge.',
            points: [
              'Plan A: 180 days',
              'Plan B: 90 days'
            ]
          },
          {
            id: 'act-ayush',
            title: 'In patient AYUSH Hospitalization',
            subtitle: 'Ayurveda, Yoga, Unani, Siddha & Homeopathy',
            badge: 'AYUSH COVERED',
            iconType: 'heart',
            planComparison: {
              planA: 'Up to SI',
              planB: 'Up to SI'
            },
            summary: 'Inpatient treatment taken in recognized AYUSH hospitals covered up to Sum Insured above chosen deductible.',
            points: [
              'Plan A: Up to SI',
              'Plan B: Up to SI'
            ]
          },
          {
            id: 'act-road-ambulance',
            title: 'Domestic Road Ambulance',
            subtitle: 'Emergency Transportation Costs Covered',
            badge: 'ROAD AMBULANCE',
            iconType: 'truck',
            planComparison: {
              planA: 'Up to SI',
              planB: 'Up to SI'
            },
            summary: 'Emergency road ambulance transportation to the nearest equipped hospital covered up to Sum Insured.',
            points: [
              'Plan A: Up to SI',
              'Plan B: Up to SI'
            ]
          },
          {
            id: 'act-donor-expenses',
            title: 'Donor expenses',
            subtitle: 'Organ Harvesting Inpatient Expenses',
            badge: 'DONOR COVER',
            iconType: 'activity',
            planComparison: {
              planA: 'Up to SI',
              planB: 'Up to SI'
            },
            summary: 'Inpatient hospitalization costs incurred for harvesting organ from donor during transplantation covered up to Sum Insured.',
            points: [
              'Plan A: Up to SI',
              'Plan B: Up to SI'
            ]
          },
          {
            id: 'act-domiciliary',
            title: 'Domiciliary Hospitalization',
            subtitle: 'Home Hospitalization Care Covered',
            badge: 'DOMICILIARY',
            iconType: 'home',
            planComparison: {
              planA: 'Up to SI',
              planB: 'Up to SI'
            },
            summary: 'Medical treatment taken at home under medical advice when hospital beds are unavailable or patient cannot be safely transported.',
            points: [
              'Plan A: Up to SI',
              'Plan B: Up to SI'
            ]
          },
          {
            id: 'act-bariatric',
            title: 'Bariatric surgery',
            subtitle: 'Metabolic & Bariatric Procedures Covered',
            badge: 'BARIATRIC COVER',
            iconType: 'shield',
            planComparison: {
              planA: 'Up to SI',
              planB: 'Up to SI'
            },
            summary: 'Medically indicated bariatric/metabolic surgeries for severe obesity and comorbid conditions covered up to Sum Insured.',
            points: [
              'Plan A: Up to SI',
              'Plan B: Up to SI'
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
            id: 'act-waiver-deductible',
            title: 'Waiver of Deductible',
            subtitle: 'Option to Waive Deductible at Specified Age',
            badge: 'AVAILABLE',
            iconType: 'shield',
            planComparison: {
              planA: 'Available',
              planB: 'Available'
            },
            summary: 'Provides flexibility to waive policy deductible upon reaching a specified continuous renewal milestone without fresh medical underwriting.',
            points: [
              'Plan A: Available',
              'Plan B: Available'
            ]
          },
          {
            id: 'act-surrogate-mothers',
            title: 'In Patient Treatment for Surrogate Mothers',
            subtitle: 'Maternity Inpatient Care for Surrogate Mothers',
            badge: 'PLAN A ONLY',
            iconType: 'users',
            planComparison: {
              planA: 'Up to ₹5 Lakh',
              planB: 'Not Available'
            },
            summary: 'Inpatient hospitalization treatment expenses for surrogate mothers covered up to ₹5 Lakh under Plan A.',
            points: [
              'Plan A: Up to ₹5 Lakh',
              'Plan B: Not Available'
            ]
          },
          {
            id: 'act-oocyte-donor',
            title: 'In Patient Treatment for Oocyte donor',
            subtitle: 'Harvesting & Inpatient Care for Oocyte Donors',
            badge: 'PLAN A ONLY',
            iconType: 'heart',
            planComparison: {
              planA: 'Up to ₹5 Lakh',
              planB: 'Not Available'
            },
            summary: 'Inpatient treatment and complications arising during oocyte donation covered up to ₹5 Lakh under Plan A.',
            points: [
              'Plan A: Up to ₹5 Lakh',
              'Plan B: Not Available'
            ]
          },
          {
            id: 'act-home-care',
            title: 'Home Care Treatment',
            subtitle: 'Prescribed In-Home Medical Nursing Care',
            badge: 'PLAN B ONLY',
            iconType: 'home',
            planComparison: {
              planA: 'Not Available',
              planB: 'Max up to 5L'
            },
            summary: 'Prescribed home medical nursing, post-operative support, and clinical monitoring at home covered up to ₹5 Lakh under Plan B.',
            points: [
              'Plan A: Not Available',
              'Plan B: Max up to 5L'
            ]
          },
          {
            id: 'act-claim-protector',
            title: 'Claim protector',
            subtitle: 'Non-Payable Consumables Protection',
            badge: 'UP TO SI',
            iconType: 'shield',
            planComparison: {
              planA: 'Up to SI',
              planB: 'Up to SI'
            },
            summary: 'Covers non-payable medical items, administrative charges, gloves, PPE kits, and syringes up to Sum Insured during hospitalization.',
            points: [
              'Plan A: Up to SI',
              'Plan B: Up to SI'
            ]
          },
          {
            id: 'act-inflation-protector',
            title: 'Inflation Protector',
            subtitle: 'Automatic CPI Inflation Sum Insured Adjustment',
            badge: 'INFLATION COVER',
            iconType: 'trending',
            planComparison: {
              planA: 'Available',
              planB: 'Available'
            },
            summary: 'Automatically increases base Sum Insured upon each policy renewal linked with consumer price index (CPI) inflation.',
            points: [
              'Plan A: Available',
              'Plan B: Available'
            ]
          },
          {
            id: 'act-guaranteed-deductible-red',
            title: 'Guaranteed Deductible Reduction',
            subtitle: '10% Deductible Reduction Per Renewal (Max 50%)',
            badge: 'UP TO 50% REDUCTION',
            iconType: 'trending',
            planComparison: {
              planA: 'Reduces the deductible by 10% at each renewal, maximum reduction is up to 50% of the deductible opted during the first policy issuance',
              planB: 'Reduces the deductible by 10% at each renewal, maximum reduction is up to 50% of the deductible opted during the first policy issuance'
            },
            summary: 'Reduces the deductible by 10% at each renewal, maximum reduction is up to 50% of the deductible opted during the first policy issuance.',
            steps: ['Year 1: 100% Deductible', 'Year 2: 10% Off', 'Year 3: 20% Off', 'Max: 50% Off Deductible'],
            points: [
              'Plan A: Reduces the deductible by 10% at each renewal, maximum reduction is up to 50% of the deductible opted during the first policy issuance',
              'Plan B: Reduces the deductible by 10% at each renewal, maximum reduction is up to 50% of the deductible opted during the first policy issuance'
            ]
          },
          {
            id: 'act-room-modifier',
            title: 'Room Modifier',
            subtitle: 'Option to Upgrade or Downgrade Room Category',
            badge: 'ROOM MODIFIER',
            iconType: 'home',
            planComparison: {
              planA: 'Option to either upgrade or downgrade the room category',
              planB: 'Option to either upgrade or downgrade the room category'
            },
            summary: 'Flexible policy option allowing policyholders to choose an upgraded or customized room category without proportionate rent deductions.',
            points: [
              'Plan A: Option to either upgrade or downgrade the room category',
              'Plan B: Option to either upgrade or downgrade the room category'
            ]
          },
          {
            id: 'act-teleconsultation',
            title: 'Teleconsultation',
            subtitle: 'Unlimited 24/7 Digital Doctor Consultations',
            badge: 'UNLIMITED',
            iconType: 'phone',
            planComparison: {
              planA: 'Unlimited',
              planB: 'Unlimited'
            },
            summary: 'Unlimited digital and video teleconsultations with certified general physicians and specialists on mobile app.',
            points: [
              'Plan A: Unlimited',
              'Plan B: Unlimited'
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
            id: 'act-waiting-periods',
            title: 'Waiting Periods',
            subtitle: 'Initial, Specific Disease, PED & Special Waiting Timelines',
            badge: 'STATUTORY TIMELINES',
            iconType: 'clock',
            summary: 'Policy waiting periods apply from policy inception date for specified conditions as detailed below:',
            tableData: {
              headers: ['Waiting Period Category', 'Standard Duration / Terms'],
              rows: [
                ['Initial Waiting Period', '30 days'],
                ['PED Waiting Period', '3 years'],
                ['Specific Disease Waiting Period', '2 years'],
                ['Bariatric Surgery', '2 years (30 days if Jumpstart is opted)'],
                ['Diabetes, Hypertension & Cardiac Conditions (unless PED)', '90 days']
              ]
            },
            points: [
              'Initial Waiting Period: 30 days',
              'PED Waiting Period: 3 years',
              'Specific Disease Waiting Period: 2 years',
              'Bariatric Surgery: 2 years (30 days if Jumpstart is opted)',
              'Diabetes, Hypertension & Cardiac Conditions (unless PED): 90 days'
            ]
          },
          {
            id: 'act-discounts',
            title: 'Discounts Available',
            subtitle: 'Wellness, NRI, CIBIL, PPN & Long Term Premium Discounts',
            badge: 'UP TO 30% OFF',
            iconType: 'dollar',
            summary: 'Avail substantial policy discounts on initial purchase and renewal by fulfilling eligibility criteria:',
            tableData: {
              headers: ['Discount Category', 'Discount Rate / Eligibility'],
              rows: [
                ['Wellness Discount', 'Up to 30%'],
                ['NRI Discount', '25%'],
                ['CIBIL Score-Based Discount', 'Up to 15%'],
                ['PPN Network$', '10% discount (if Network Advantage is opted)'],
                ['Early Renewal Discount', '2.5%'],
                ['Long Term Tenure Discount', 'Up to 15%']
              ]
            },
            points: [
              'Wellness Discount: Up to 30%',
              'NRI Discount: 25%',
              'CIBIL Score-Based Discount: Up to 15%',
              'PPN Network$: 10% discount (if Network Advantage is opted)',
              'Early Renewal Discount: 2.5%',
              'Long Term Tenure Discount: Up to 15%'
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
            id: 'act-jumpstart',
            title: 'Jumpstart',
            subtitle: 'Waive/Reduce Initial Waiting on Key Ailments',
            badge: 'OPTIONAL RIDER',
            isRider: true,
            iconType: 'zap',
            planComparison: {
              planA: 'Available',
              planB: 'Available'
            },
            summary: 'Optional add-on reducing waiting period on diabetes, hypertension, cardiac ailments, and bariatric surgery to 30 days.',
            points: [
              'Plan A: Available',
              'Plan B: Available'
            ]
          },
          {
            id: 'act-cdmp',
            title: 'Chronic Disease Management Program',
            subtitle: 'Specialized Care for Chronic Illnesses',
            badge: 'OPTIONAL RIDER',
            isRider: true,
            iconType: 'activity',
            planComparison: {
              planA: 'Available',
              planB: 'Available'
            },
            summary: 'Comprehensive management program for chronic conditions including health coaching, doctor reviews, and diagnostics.',
            points: [
              'Plan A: Available',
              'Plan B: Available'
            ]
          },
          {
            id: 'act-befit',
            title: 'BeFit',
            subtitle: 'Cashless OPD Consultations & Diagnostic Tests',
            badge: 'OPTIONAL RIDER',
            isRider: true,
            iconType: 'award',
            planComparison: {
              planA: 'Available',
              planB: 'Available'
            },
            summary: 'Complete outpatient wellness program offering unlimited cashless doctor consultations, pharmacy delivery, and diagnostic screenings.',
            points: [
              'Plan A: Available',
              'Plan B: Available'
            ]
          },
          {
            id: 'act-air-ambulance',
            title: 'Domestic Air Ambulance Cover',
            subtitle: 'Emergency Aeromedical Evacuation in India',
            badge: 'AIR AMBULANCE',
            isRider: true,
            iconType: 'truck',
            planComparison: {
              planA: 'Up to SI',
              planB: 'Up to SI'
            },
            summary: 'Emergency domestic air ambulance transportation to specialized tertiary medical center covered up to Sum Insured.',
            points: [
              'Plan A: Up to SI',
              'Plan B: Up to SI'
            ]
          },
          {
            id: 'act-durable-equipment',
            title: 'Durable medical equipment cover',
            subtitle: 'Coverage for Wheelchairs, CPAP, Oxygen Concentrators',
            badge: 'EQUIPMENT COVER',
            isRider: true,
            iconType: 'shield',
            planComparison: {
              planA: 'Up to SI, max up to ₹5 Lakh',
              planB: 'Up to SI, max up to ₹5 Lakh'
            },
            summary: 'Expenses towards purchasing/renting durable medical equipment (wheelchairs, CPAP/BiPAP, oxygen concentrators) covered up to ₹5 Lakh.',
            points: [
              'Plan A: Up to SI, max up to ₹5 Lakh',
              'Plan B: Up to SI, max up to ₹5 Lakh'
            ]
          },
          {
            id: 'act-ped-reduction',
            title: 'Waiting Period Reduction Option',
            subtitle: 'Reduce PED Waiting from 3 Years to 2/1 Year',
            badge: 'PED REDUCTION',
            isRider: true,
            iconType: 'clock',
            planComparison: {
              planA: 'Reduce to 2/1 year',
              planB: 'Reduce to 2/1 year'
            },
            summary: 'Option to reduce standard 3-year Pre-Existing Disease (PED) waiting period down to 2 years or 1 year at proposal.',
            points: [
              'Plan A: Reduce to 2/1 year',
              'Plan B: Reduce to 2/1 year'
            ]
          },
          {
            id: 'act-specific-reduction',
            title: 'Specific Illness Waiting Period Reduction Option',
            subtitle: 'Reduce Specific Disease Waiting from 2 Years to 1 Year',
            badge: '1 YEAR REDUCTION',
            isRider: true,
            iconType: 'clock',
            planComparison: {
              planA: 'Reduce to 1 year',
              planB: 'Reduce to 1 year'
            },
            summary: 'Option to reduce specific illness waiting period from standard 2 years down to 1 year upon policy inception.',
            points: [
              'Plan A: Reduce to 1 year',
              'Plan B: Reduce to 1 year'
            ]
          },
          {
            id: 'act-nursing-home',
            title: 'Nursing at home',
            subtitle: '₹2,000/day for Max 10 Days Post Hospitalization',
            badge: 'PLAN B ONLY',
            isRider: true,
            iconType: 'home',
            planComparison: {
              planA: 'Not Available',
              planB: '₹2000 per day, maximum up to 10 days'
            },
            summary: 'Qualified nursing care assistance at home post-discharge covered at ₹2,000 per day for a maximum of 10 days under Plan B.',
            points: [
              'Plan A: Not Available',
              'Plan B: ₹2000 per day, maximum up to 10 days'
            ]
          },
          {
            id: 'act-compassionate-visit',
            title: 'Compassionate Visit',
            subtitle: 'Travel Reimbursement for Immediate Family Member',
            badge: 'PLAN B ONLY',
            isRider: true,
            iconType: 'users',
            planComparison: {
              planA: 'Not Available',
              planB: 'Maximum up to ₹20000'
            },
            summary: 'Economy class travel transportation costs for an immediate family member to visit hospitalized insured covered up to ₹20,000 under Plan B.',
            points: [
              'Plan A: Not Available',
              'Plan B: Maximum up to ₹20000'
            ]
          },
          {
            id: 'act-health-checkup',
            title: 'Health Check-up',
            subtitle: 'Cashless Preventive Screening up to ₹5,000',
            badge: 'PLAN B ONLY',
            isRider: true,
            iconType: 'clipboard',
            planComparison: {
              planA: 'Not Available',
              planB: 'Cashless, maximum up to ₹5000'
            },
            summary: 'Comprehensive annual preventive health check-up on a cashless basis across network diagnostics up to ₹5,000 under Plan B.',
            points: [
              'Plan A: Not Available',
              'Plan B: Cashless, maximum up to ₹5000'
            ]
          },
          {
            id: 'act-dependent-accom',
            title: 'Dependent Accommodation Benefit',
            subtitle: '₹1,000/day for Max 10 Days Accommodation',
            badge: 'PLAN B ONLY',
            isRider: true,
            iconType: 'home',
            planComparison: {
              planA: 'Not Available',
              planB: '₹1000 per day, maximum up to 10 days'
            },
            summary: 'Hotel or hospital accommodation expenses for accompanying dependent family member covered at ₹1,000/day up to 10 days under Plan B.',
            points: [
              'Plan A: Not Available',
              'Plan B: ₹1000 per day, maximum up to 10 days'
            ]
          }
        ]
      }
    ]
  }
};

export const getIciciPlanData = (planId) => {
  const canonicalId = resolveIciciPlanId(planId);
  return ICICI_LOMBARD_PLANS_DATA[canonicalId] || null;
};

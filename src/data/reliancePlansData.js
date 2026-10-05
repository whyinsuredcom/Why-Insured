// =============================================================================
// RELIANCE GENERAL INSURANCE INDEPENDENT DATA CONFIGURATION
// Flagship Plan: Reliance Health Infinity Insurance → reliance-health-infinity
// Visual Theme: Royal Blue (#205398), Vibrant Red (#ED1C24), Pure White (#FFFFFF)
// =============================================================================

export const RELIANCE_CANONICAL_PLAN_IDS = [
  'reliance-health-infinity'
];

export const resolveReliancePlanId = (planId) => {
  if (!planId) return null;
  const cleanId = String(planId).toLowerCase().trim();
  if (
    cleanId === 'reliance-health-infinity' ||
    cleanId === 'health-infinity' ||
    cleanId === 'infinity' ||
    cleanId === 'reliance-infinity'
  ) {
    return 'reliance-health-infinity';
  }
  return cleanId;
};

export const getReliancePlanData = (planId) => {
  const resolvedId = resolveReliancePlanId(planId);
  return RELIANCE_PLANS_DATA[resolvedId] || null;
};

export const RELIANCE_PLANS_DATA = {
  // ===========================================================================
  // FLAGSHIP PLAN: RELIANCE HEALTH INFINITY INSURANCE
  // ===========================================================================
  'reliance-health-infinity': {
    planId: 'reliance-health-infinity',
    planName: 'Health Infinity',
    fullName: 'IndusInd General Insurance - Health Infinity',
    companyName: 'IndusInd General Insurance',
    subtitle: 'Limitless Health Protection with Unlimited Restoration, 30% More Cover, and Zero Room Sub-Limits',
    tagline: 'Limitless Health Protection with Unlimited Restoration, 30% More Cover, and Zero Room Sub-Limits',
    coverage: '₹5 Lakh - ₹1 Crore',
    premium: '₹11,800/year',

    // --- PLAN-SPECIFIC UI CONFIG (RELIANCE ROYAL BLUE & VIBRANT RED THEME) ---
    uiConfig: {
      primaryColor: '#205398',
      accentColor: '#ED1C24',
      secondaryColor: '#ED1C24',
      lightBg: '#F0F5FA',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'IndusInd General Insurance Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'CSR',
        summaryValue: '98.1%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR shows the percentage of eligible claims that IndusInd General Insurance settles during the financial year through its extensive network of 9,500+ cashless hospitals.',
        singleYear: '98.1%',
        singleYearLabel: 'Recent Single Year (FY2024-25)',
        threeYearAvg: '97.9%',
        threeYearAvgLabel: '3 Year Average (FY2022-25)'
      },
      icr: {
        title: 'ICR',
        summaryValue: '62%',
        subtitle: 'Incurred Claim Ratio',
        explanation: "ICR indicates the proportion of net earned premium that the insurer pays out for claims. IndusInd General Insurance's healthy ICR of 62% ensures strong financial stability and dependable claim settlements.",
        range: '60% → 65%',
        rangeLabel: 'Healthy ICR Range'
      },
      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        summaryValue: '14.8',
        explanation: 'Complaint volume measures customer grievances per 10,000 claims settled. IndusInd General Insurance maintains prompt digital support and swift grievance resolution.',
        value: '14.8',
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
        summaryValue: '100%',
        explanation: 'IndusInd General Insurance is one of India’s leading private general insurers, providing comprehensive healthcare coverage and technology-first claims processing nationwide.',
        items: [
          { name: 'Institutional Shareholders & Parent Group', value: '100%', label: 'Shareholding' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'AAA / Strong',
        explanation: 'Top-tier credit ratings signify the highest level of financial security and outstanding capability to honor policyholder commitments.',
        items: [
          { agency: 'CRISIL', rating: 'AAA / Stable' },
          { agency: 'ICRA', rating: 'AAA / Stable' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '1.75×',
        explanation: 'Solvency ratio of 1.75× indicates IndusInd General Insurance maintains strong capital buffers well above the IRDAI mandatory minimum of 1.50×.',
        value: '1.75×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹10,000+ Cr',
        explanation: 'Substantial investment asset base and capital reserves ensuring long-term claim-paying liquidity across India.',
        value: '₹10,000+ Cr',
        label: 'Investment Assets under Management'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: '90%+',
        explanation: 'Over 90% of reinsurance treaties placed with world-class global reinsurers and GIC Re to absorb catastrophic medical risks.',
        value: '90%+',
        label: 'Backed by Leading Global Reinsurers & GIC Re'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: '9,500+ Hospitals',
        explanation: 'A premier private general insurer with an extensive cashless hospital network of over 9,500+ hospitals across India.',
        value: '9,500+ Network Hospitals',
        label: 'Pan-India Cashless Network'
      }
    },

    // --- 3. LIMITATIONS & WAITING PERIODS (INDEPENDENT) ---
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Terms, Waiting Periods & Exclusions',
      items: [
        {
          id: 'initial-waiting',
          title: 'Initial Waiting Period',
          summary: 'A waiting period of 30 days applies from policy commencement for all illnesses unless hospitalization is due to an accident.',
          highlight: 'Emergency accidental hospitalizations are covered from Day 1.',
          durationTag: '30 Days'
        },
        {
          id: 'specific-diseases',
          title: 'Specific Disease Waiting Period',
          summary: 'A waiting period of 24 months (2 years) applies for treatment of specific pre-defined diseases listed in the policy schedule.',
          highlight: 'Continuous coverage and timely renewals preserve waiting period credits.',
          durationTag: '24 Months',
          diseaseList: [
            'Cataract & Eye ailments',
            'Hernia, Hydrocele & Fistula',
            'Hysterectomy for Menorrhagia / Fibroids',
            'Joint replacement surgeries (non-accidental)',
            'Osteoarthritis & Osteoporosis',
            'Sinusitis, Tonsillectomy & Adenoidectomy',
            'Stones in Urinary, Biliary & Renal systems',
            'Benign cysts, nodules, polyps & tumors',
            'Spondylosis, Spondylitis & Disc disorders'
          ]
        },
        {
          id: 'ped-waiting',
          title: 'Pre-existing Disease (PED) Waiting Period',
          summary: 'A waiting period of 36 months (3 years) of continuous coverage applies for pre-existing medical conditions declared at inception.',
          highlight: 'Continuous coverage and timely annual renewals preserve cumulative waiting credits.',
          durationTag: '36 Months'
        },
        {
          id: 'permanent-exclusions',
          title: 'Permanent Exclusions',
          summary: 'The policy does not cover medical expenses incurred towards hospitalization or treatment of the following permanent exclusions:',
          exclusionsList: [
            'Substance abuse and alcohol treatment',
            'Hazardous / adventure sports',
            'Cosmetic or plastic surgery',
            'Treatments without registered medical prescription',
            'External congenital anomalies',
            'Complete exclusions are subject to the policy wording and policy documents'
          ],
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW (INDEPENDENT) ---
    mustKnow: {
      heading: 'MUST KNOW DETAILS',
      subheading: 'Key product takeaways',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'no-sublimits',
          icon: '🏥',
          title: 'NO ROOM RENT & ICU SUB-LIMITS',
          summary: 'Enjoy complete freedom of room choice with zero room rent capping and no limit on ICU charges.',
          points: [
            'No Room Rent Limit on inpatient hospitalization',
            'No ICU sub-limit capping',
            'Eliminates proportionate deduction penalties across hospital bills'
          ]
        },
        {
          id: 'restoration-power',
          icon: '🔄',
          title: '10 + 10 RESTORATION & 30% MORE COVER',
          summary: 'Automatic 10 + 10 restoration for unrelated illnesses combined with an inbuilt 30% Extra Sum Insured booster.',
          points: [
            'Restoration: 10 + 10 for unrelated illnesses',
            '30% Extra Sum Insured for enhanced medical safety',
            'Substantial financial buffer for family members during multiple hospitalizations'
          ]
        },
        {
          id: 'pre-post-hospital',
          icon: '📅',
          title: 'EXTENSIVE 90 & 180 DAYS PRE/POST COVERAGE',
          summary: 'Comprehensive medical expense protection spanning 90 days before admission and 180 days post-discharge.',
          points: [
            'Pre-Hospitalization: 90 Days covered',
            'Post-Hospitalization: 180 Days covered',
            'All follow-ups, diagnostic scans, and prescribed medicines included'
          ]
        },
        {
          id: 'limitless-protection',
          icon: '🛡️',
          title: 'CUSTOMIZABLE LIMITLESS OPTIONAL RIDERS',
          summary: 'Upgrade with Limitless Cover, Smart Protector with Air Ambulance, Double Cover, and Room Rent modifiers.',
          points: [
            'Limitless Cover: Unlimited restoration up to ₹10 Lakh + Consumables',
            'Smart Protector: Super Charger boost up to 100% + Air Ambulance',
            'Double Cover: Additional 100% of Sum Insured for the same claim'
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
            id: 'no-room-rent-icu-limit',
            title: 'No Room Rent & ICU Limit',
            subtitle: 'Zero Capping on Room & ICU Charges',
            badge: 'NO CAPPING',
            iconType: 'home',
            summary: 'Enjoy complete freedom with zero capping on room rent and ICU charges, eliminating proportionate deduction penalties on your claim.',
            points: [
              'No Room Rent Limit',
              'No ICU Limit',
              'Inpatient hospitalization covered up to Sum Insured',
              'Zero proportionate deductions on doctor visits and associate medical bills'
            ]
          },
          {
            id: 'pre-post-hospitalization',
            title: 'Pre & Post Hospitalization',
            subtitle: '90 Days Pre & 180 Days Post Hospitalization',
            badge: '90 & 180 DAYS',
            iconType: 'calendar',
            summary: 'Comprehensive pre and post-hospitalization medical expense coverage for 90 days before hospital admission and 180 days post-discharge.',
            points: [
              'Pre-Hospitalization: 90 Days',
              'Post-Hospitalization: 180 Days',
              'Diagnostic tests, medical consultations, and pathology investigations covered',
              'Prescribed recovery medications and monitoring expenses included'
            ]
          },
          {
            id: 'organ-donor',
            title: 'Organ Donor',
            subtitle: 'Living Donor Inpatient Harvesting Coverage',
            badge: '₹10 LAKH',
            iconType: 'heart',
            summary: 'Inpatient hospitalization medical expenses incurred towards harvesting the organ from a living donor for the insured recipient are covered up to ₹10 Lakh.',
            points: [
              'Organ Donor Coverage: ₹10 Lakh',
              'Covers donor harvesting and surgical extraction procedures',
              'Protects the living donor from out-of-pocket medical expenses'
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
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'restoration',
            title: 'Restoration',
            subtitle: '10 + 10 Automatic Sum Insured Restoration',
            badge: '10 + 10 RESTORATION',
            iconType: 'refresh',
            summary: 'Automatic restoration benefit that restores your base Sum Insured once fully or partially exhausted during the policy year for unrelated illnesses.',
            points: [
              'Restoration: 10 + 10',
              '100% restoration on base Sum Insured',
              'Applicable for unrelated illness',
              'Ensures continuous coverage for subsequent independent claims'
            ]
          },
          {
            id: 'more-cover',
            title: 'More Cover',
            subtitle: '30% Extra Sum Insured Booster',
            badge: '+30% EXTRA SI',
            iconType: 'trending',
            summary: 'Inbuilt 30% additional coverage boost over and above the base Sum Insured to provide enhanced financial security during major hospitalizations.',
            points: [
              '30% Extra Sum Insured',
              'Inbuilt coverage enhancement from policy inception',
              'Additional safety cushion for high-cost critical treatments'
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
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'road-ambulance',
            title: 'Road Ambulance',
            subtitle: 'Emergency Transportation to Hospital',
            badge: 'COVERED',
            iconType: 'truck',
            summary: 'Emergency road ambulance expenses incurred for transporting the insured patient to the nearest network hospital in life-threatening situations.',
            points: [
              'Road Ambulance Cover Available',
              'Emergency transfer from home or accident site to hospital covered',
              'Inter-hospital transfers covered when medically advised'
            ]
          },
          {
            id: 'day-care-treatment',
            title: 'Day Care Treatment',
            subtitle: 'Short-Stay Advanced Medical Surgeries',
            badge: 'UP TO SUM INSURED',
            iconType: 'activity',
            summary: 'All medical procedures and surgeries requiring less than 24 hours of hospital admission due to technological advancements are covered up to Sum Insured.',
            points: [
              'Day Care Treatment',
              'Admission for less than 24 hours',
              'Includes chemotherapy, dialysis, radiotherapy, eye surgeries, and minor procedures',
              'No 24-hour continuous hospitalization mandate'
            ]
          },
          {
            id: 'domiciliary-organ-ayush-treatment',
            title: 'Domiciliary, Organ & AYUSH Treatment',
            subtitle: 'Home Treatment, Organ Harvest & AYUSH Care',
            badge: 'UP TO SUM INSURED',
            iconType: 'shield',
            summary: 'Comprehensive coverage encompassing domiciliary home hospital care, organ transplantation support, and recognized AYUSH alternative treatments.',
            points: [
              'Domiciliary Treatment: Covered when patient cannot be moved to hospital',
              'Organ Treatment: Living donor extraction and recipient care covered',
              'AYUSH Treatment: Includes treatments such as Ayurvedic, Unani, Siddha, Homeopathy, etc.',
              'Covered up to Sum Insured at recognized institutions'
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
            id: 'limitless-cover-addon',
            title: 'Limitless Cover',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'zap',
            summary: 'Optional add-on providing unlimited restoration (10 + 10 ... up to ₹10 Lakh) along with comprehensive consumables expense protection.',
            points: [
              'Optional / Add-on Benefit',
              'Unlimited Restoration',
              '10 + 10 ... up to ₹10 Lakh',
              'Consumables Cover included (gloves, masks, syringes, medical consumables)'
            ]
          },
          {
            id: 'smart-protector-addon',
            title: 'Smart Protector',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'shield',
            summary: 'Super Charger booster rider that scales your base Sum Insured up to 100% and provides emergency Air Ambulance coverage.',
            points: [
              'Optional / Add-on Benefit',
              'Super Charger',
              'Boost cover up to 100%',
              'Air Ambulance included for rapid emergency airlift'
            ]
          },
          {
            id: 'double-cover-addon',
            title: 'Double Cover',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'trending',
            summary: 'Provides an additional 100% of Sum Insured available even for the same single claim during major catastrophic hospitalization.',
            points: [
              'Optional / Add-on Benefit',
              'Additional 100% of Sum Insured',
              'Applicable for the same claim',
              'Doubles the effective financial protection for critical medical events'
            ]
          },
          {
            id: 'reduction-in-room-rent-addon',
            title: 'Reduction in Room Rent',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'home',
            summary: 'Option to choose specific room categories (Single Private A/C Room or Twin Sharing) to avail premium discounts while maintaining high coverage.',
            points: [
              'Optional / Add-on Benefit',
              'Option to choose: Single Private A/C Room',
              'Option to choose: Twin Sharing',
              'Provides flexible premium reduction options tailored to your healthcare preference'
            ]
          }
        ]
      }
    ]
  }
};

import {
  TATA_AIG_MEDICARE_SELECT_VARIANTS_DATA,
  TATA_AIG_MEDICARE_SELECT_FEATURES_SECTIONS,
  TATA_AIG_MEDICARE_SELECT_LIMITATIONS,
  TATA_AIG_MEDICARE_SELECT_MUST_KNOW
} from './tataAigMedicareSelectVariantsData';

// =============================================================================
// TATA AIG PLANS INDEPENDENT DATA CONFIGURATION
// Flagship Plan: Tata AIG MediCare Premier
// Canonical Plan IDs: medicare-premier, medicare-select, medicare-select-smart,
// medicare-select-standard, medicare-select-elite, medicare-reserve
// =============================================================================

export const TATA_AIG_SOURCES = [
  {
    title: "Tata AIG – Public Disclosures",
    name: "Tata AIG – Public Disclosures",
    url: "https://www.tataaig.com/public-disclosures",
    type: "website"
  },
  {
    title: "Tata AIG Annual Report – FY 2024-25",
    name: "Tata AIG Annual Report – FY 2024-25",
    url: "https://www.tataaig.com/s3/intimation_for_submission_of_annual_report_for_fy_2024_25_3d23ba6d70.pdf",
    type: "pdf"
  },
  {
    title: "Tata AIG Annual Report – FY 2023-24",
    name: "Tata AIG Annual Report – FY 2023-24",
    url: "https://www.tataaig.com/s3/Intimation_for_submission_of_Annual_Report_for_FY_2023_24_a548eca5db.pdf",
    type: "pdf"
  },
  {
    title: "Tata AIG Annual Report – FY 2022-23",
    name: "Tata AIG Annual Report – FY 2022-23",
    url: "https://www.tataaig.com/s3/fy_2022_23_6f327ce89e.pdf",
    type: "pdf"
  },
  {
    title: "IRDAI – Official Annual Reports",
    name: "IRDAI – Official Annual Reports",
    url: "https://irdai.gov.in/annual-reports",
    type: "website"
  }
];

export const TATA_AIG_CANONICAL_PLAN_IDS = [
  'medicare-premier',
  'medicare-select',
  'medicare-select-smart',
  'medicare-select-standard',
  'medicare-select-elite',
  'medicare-reserve'
];

export const resolveTataAigPlanId = (planId) => {
  if (!planId) return null;
  const cleanId = String(planId).toLowerCase().trim();
  if (
    cleanId === 'medicare-premier' ||
    cleanId === 'tata-medicare-premier' ||
    cleanId === 'premier'
  ) {
    return 'medicare-premier';
  }
  if (
    cleanId === 'medicare-select-smart' ||
    cleanId === 'tata-medicare-select-smart' ||
    cleanId === 'smart'
  ) {
    return 'medicare-select-smart';
  }
  if (
    cleanId === 'medicare-select-elite' ||
    cleanId === 'tata-medicare-select-elite' ||
    cleanId === 'elite'
  ) {
    return 'medicare-select-elite';
  }
  if (
    cleanId === 'medicare-select-standard' ||
    cleanId === 'medicare-select-base' ||
    cleanId === 'tata-medicare-select-standard'
  ) {
    return 'medicare-select-standard';
  }
  if (
    cleanId === 'medicare-select' ||
    cleanId === 'tata-medicare-select' ||
    cleanId === 'select' ||
    cleanId === 'medicare-protect' ||
    cleanId === 'tata-medicare-protect'
  ) {
    return 'medicare-select';
  }
  if (
    cleanId === 'medicare-reserve' ||
    cleanId === 'tata-medicare-reserve' ||
    cleanId === 'reserve'
  ) {
    return 'medicare-reserve';
  }
  return cleanId;
};

export const TATA_AIG_PLANS_DATA = {
  // ===========================================================================
  // FLAGSHIP PLAN: TATA AIG MEDICARE PREMIER
  // ===========================================================================
  'medicare-premier': {
    planId: 'medicare-premier',
    planName: 'MediCare Premier',
    fullName: 'Tata AIG MediCare Premier',
    companyName: 'Tata AIG',
    subtitle: 'Comprehensive Health Insurance with Enhanced Medical & Wellness Benefits',
    tagline: 'Comprehensive Health Insurance with Enhanced Medical & Wellness Benefits',
    coverage: '₹50 Lakh - ₹3 Crore',

    // --- PLAN-SPECIFIC UI CONFIG (TATA AIG ROYAL BLUE THEME) ---
    uiConfig: {
      primaryColor: '#0038A8',
      accentColor: '#0038A8',
      lightBg: '#F0F4FF',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Tata AIG Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'Claim Settlement Ratio',
        summaryValue: '89.5%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'On average, Tata AIG settled around 89.5% of claims over the last 3 years.',
        singleYear: '89.5%',
        singleYearLabel: 'Recent Single Year',
        threeYearAvg: '89.5%',
        threeYearAvgLabel: '3 Years Avg Ratio'
      },
      icr: {
        title: 'Incurred Claim Ratio',
        summaryValue: '77.50%',
        subtitle: 'Incurred Claim Ratio',
        explanation: 'For every ₹100 collected in premiums, Tata AIG spends about ₹77.50 on settling claims.',
        range: '77.50%',
        rangeLabel: 'Incurred Claim Ratio'
      },
      complaintVolume: {
        title: 'Complaints/10K',
        summaryValue: '11.6',
        subtitle: 'Complaints/10K',
        explanation: 'Around 11.6 complaints per 10,000 claims settled,    showing a low number of complaints.',
        value: '11.6',
        label: 'Complaints/10K — 11.6'
      }
    },

    // --- 2. COMPANY STRENGTH (INDEPENDENT) ---
    companyStrength: {
      heading: 'COMPANY STRENGTH',
      subheading: 'How reliable/strong is the insurer?',
      description: 'How reliable/strong is the insurer?',
      ownership: {
        title: 'OWNERSHIP / PERCENTAGE',
        summaryValue: '74% / 26%',
        explanation: 'Tata AIG General Insurance is a trusted joint venture combining the legacy of Tata Group with the global underwriting expertise of American International Group (AIG).',
        items: [
          { name: 'Tata Group (Tata Sons)', value: '74%', label: 'Ownership' },
          { name: 'American International Group (AIG)', value: '26%', label: 'Ownership' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'AAA',
        explanation: 'Top-tier credit ratings signify the highest level of financial security and outstanding capability to honor policyholder commitments.',
        items: [
          { agency: 'CRISIL', rating: 'AAA / Stable' },
          { agency: 'ICRA', rating: 'AAA / Stable' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '1.95×',
        explanation: "Solvency ratio measures the insurer's financial buffer to pay claims under stress conditions, well above the IRDAI mandatory minimum of 1.50×.",
        value: '1.95×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹22,000+ Cr',
        explanation: 'Substantial investment assets and capital reserves ensuring long-term claim-paying liquidity across India.',
        value: '₹22,000+ Cr',
        label: 'Investment Assets under Management'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: '90%+',
        explanation: 'Over 90% of reinsurance treaties placed with world-class A+ and AAA rated global reinsurers to absorb catastrophic risks.',
        value: '90%+',
        label: 'Backed by Munich Re, Swiss Re & GIC Re'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: 'Top 5',
        explanation: "Ranked among India's top 5 private general insurers with a comprehensive network of over 10,000+ cashless hospitals nationwide.",
        value: 'Top 5 Private Insurer',
        label: 'Over 2 Crore+ Policies Serviced'
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
          summary: 'A mandatory waiting period of 30 days applies from the policy inception date for any medical illness or hospitalization.',
          highlight: 'Accidental hospitalization is covered from Day 1 with zero waiting period.',
          policyRef: 'Tata AIG MediCare Premier Policy Terms (Section 3.1)',
          durationTag: '30 Days'
        },
        {
          id: 'specific',
          title: '2 Years Waiting Period on Specific Diseases',
          summary: 'A continuous waiting period of 24 months (2 Years) applies for medical/surgical treatment of specified conditions including cataract, hernia, piles, joint replacement, stones, and sinusitis.',
          diseaseList: [
            'Cataract & eye surgeries',
            'Benign Prostatic Hypertrophy (BPH)',
            'Hernia (all types) & Hydrocele',
            'Piles, Fistula & Fissure in ano',
            'Stones in Urinary, Biliary & Renal systems',
            'Hysterectomy for Menorrhagia / Fibroids',
            'Joint replacements (non-accidental)',
            'Osteoarthritis & Osteoporosis',
            'Sinusitis, DNS, Tonsillectomy',
            'Benign cysts, polyps & tumors',
            'Varicose veins & varicose ulcers',
            'Spondylosis, Spondylitis & Disc disorders'
          ],
          policyRef: 'Tata AIG MediCare Premier Policy Terms (Section 3.2)',
          durationTag: '24 Months'
        },
        {
          id: 'global-terms',
          title: 'Global Cover for Planned Hospitalization Special Condition',
          summary: 'Worldwide planned treatment cover outside India for specified critical illnesses on applicable higher tiers.',
          diseaseList: [
            'Applicable for planned hospitalization outside India',
            'Prior written intimation and approval required from insurer',
            'Applicable for critical illnesses defined in policy wording',
            'Cashless/reimbursement as per international network partner terms'
          ],
          policyRef: 'Special Condition under Global Cover for Planned Hospitalization',
          durationTag: 'Special Terms'
        },
        {
          id: 'permanent',
          title: 'Permanent Exclusions',
          summary: 'The policy does not cover expenses incurred towards treatment arising from standard permanent exclusions:',
          exclusionsList: [
            'Cosmetic, aesthetic & plastic surgery (unless reconstructive post-accident)',
            'Intentional self-injury & suicide attempt',
            'Alcohol, drug or substance abuse treatments',
            'Investigation & diagnostic-only admissions',
            'Rest cure, rehabilitation & respite care',
            'Unproven / experimental treatments',
            'Participation in hazardous adventure sports',
            'War, nuclear or chemical contamination'
          ],
          policyRef: 'Standard IRDAI & Tata AIG Exclusion Guidelines (Section 4)',
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW (INDEPENDENT) ---
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Key product highlights that policyholders should keep in mind',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'tier-coverage',
          icon: '🛡️',
          title: 'Coverage Tiers ₹50 Lakh to ₹3 Crore',
          summary: 'High sum insured coverage options starting from ₹50 Lakh up to ₹3 Crore for complete financial security.',
          points: [
            '₹50 Lakh base cover for extensive domestic protection',
            '₹75 Lakh, ₹1 Crore, ₹2 Crore & ₹3 Crore high-value tiers',
            'Enhanced post-hospitalization up to 200 days on ₹75L+ tiers'
          ]
        },
        {
          id: 'consumables-restoration',
          icon: '🔄',
          title: 'Consumables & Unlimited Restore',
          summary: '100% consumables coverage included up to Sum Insured with instant automatic Restore Benefit upon exhaustion.',
          points: [
            'Zero out-of-pocket payment for gloves, PPE kits, cotton & syringes',
            'Automatic 100% refill of base Sum Insured once during the policy year',
            'Applicable for unrelated illnesses during the active policy period'
          ]
        },
        {
          id: 'global-maternity',
          icon: '🌍',
          title: 'Global Cover & Enhanced Girl Child Benefits',
          summary: 'Planned worldwide treatment coverage and higher maternity & vaccination limits for birth of a girl child.',
          points: [
            'Planned overseas hospitalization up to Sum Insured as per special conditions',
            'Enhanced maternity cover up to ₹1,20,000 for a girl child',
            'Enhanced first-year vaccination limit up to ₹15,000 for a girl child'
          ]
        }
      ]
    },

    // --- 5. BEST SUITED FOR (INDEPENDENT) ---
    bestSuitedFor: {
      heading: 'BEST SUITED FOR',
      subheading: 'Who should choose Tata AIG MediCare Premier?',
      description: 'Ideal customer profiles and comprehensive family healthcare scenarios.',
      tagline: 'Premium comprehensive coverage designed for families seeking top-tier healthcare security.',
      profiles: [
        {
          title: 'High Coverage & Global Treatment Seekers',
          icon: '🌍',
          summary: 'Individuals and families seeking high sum insured (₹50 Lakhs to ₹3 Crore) with worldwide cover for planned medical treatments outside India.',
          badge: 'Global Cover',
          highlights: [
            'Worldwide planned treatment outside India for major illnesses',
            'High sum insured options from ₹50 Lakh up to ₹3 Crore',
            'Post-hospitalization recovery coverage up to 200 days'
          ]
        },
        {
          title: 'Nuclear & Growing Families',
          icon: '👨‍👩‍👧',
          summary: 'Families prioritizing luxury healthcare with Single Private Room without room rent caps, comprehensive restore benefit, and newborn coverage.',
          badge: 'Family Protection',
          highlights: [
            'Single Private Room without proportionate deductions',
            'Enhanced maternity cover up to ₹1,20,000 for girl child',
            'First-year newborn vaccination cover up to ₹15,000'
          ]
        },
        {
          title: 'Executives & Health-Conscious Individuals',
          icon: '💼',
          summary: 'Professionals seeking enhanced OPD benefits, annual preventive health checkups, wellness reward discounts, and second opinion consultations.',
          badge: 'Wellness & OPD',
          highlights: [
            'Comprehensive annual wellness & health checkups',
            'Second medical opinion from world-class medical networks',
            'Cumulative bonus protection and wellness premium discounts'
          ]
        },
        {
          title: 'Long-Term Comprehensive Shield',
          icon: '🛡️',
          summary: 'Those who want maximum claim certainty with no proportionate deductions, 100% consumables coverage, and organ donor protection.',
          badge: 'Max Assurance',
          highlights: [
            'Inbuilt 100% consumables cover for non-medical items',
            'Full living organ donor hospitalization covered',
            'Unlimited restoration for subsequent unrelated illnesses'
          ]
        }
      ]
    },

    // --- 6. 4 COMPACT POLICY BENEFITS CATEGORIES (EXACT DESIGN REFERENCE) ---
    featuresSections: [
      // -----------------------------------------------------------------------
      // CATEGORY 1: MOST IMPORTANT FEATURES
      // -----------------------------------------------------------------------
      {
        id: 'most-important-features',
        title: 'MOST IMPORTANT',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        items: [
          {
            id: 'inpatient',
            title: 'In-Patient Treatment',
            subtitle: 'Up to Sum Insured',
            badge: 'UP TO SUM INSURED',
            iconType: 'shield',
            summary: 'Full coverage for room rent, boarding expenses, nursing, ICU, medical practitioner fees, surgeon fees, operations, and medicines during hospital admission.',
            points: [
              'No sub-limit on hospital room rent category',
              'ICU charges covered up to full Sum Insured',
              'Covers all essential in-hospital medical and surgical procedures'
            ]
          },
          {
            id: 'pre-hosp',
            title: 'Pre-Hospitalization',
            subtitle: 'Up to 60 days',
            badge: 'UP TO 60 DAYS',
            iconType: 'calendar',
            summary: 'Medical expenses such as doctor consultations, diagnostic tests, and prescribed medicines incurred up to 60 days prior to hospital admission.',
            points: [
              'Doctor consultation evaluations and specialist checkups',
              'Pre-admission diagnostic scans, blood tests, and imaging',
              'Prescribed medications leading directly to hospitalization'
            ]
          },
          {
            id: 'post-hosp',
            title: 'Post-Hospitalization',
            subtitle: 'Up to 90 days (₹50L) | Up to 200 days (₹75L - ₹3Cr)',
            badge: '90 TO 200 DAYS',
            iconType: 'clock',
            summary: 'Follow-up consultations, diagnostics, physiotherapy, and recovery medicines. Covered up to 90 days for ₹50 Lakh; up to 200 days for ₹75 Lakh, ₹1 Crore, ₹2 Crore, and ₹3 Crore tiers.',
            points: [
              'Up to ₹50 Lakh tier: Up to 90 days coverage',
              '₹75 Lakh / ₹1 Crore / ₹2 Crore / ₹3 Crore tiers: Up to 200 days coverage',
              'Covers post-discharge rehabilitation and prescribed recovery medicines'
            ],
            tierData: {
              title: 'Post-Hospitalization Limits by Tier',
              tiers: [
                { tier: 'Up to ₹50 Lakh', value: 'Up to 90 days' },
                { tier: '₹75 Lakh', value: 'Up to 200 days' },
                { tier: '₹1 Crore', value: 'Up to 200 days' },
                { tier: '₹2 Crore', value: 'Up to 200 days' },
                { tier: '₹3 Crore', value: 'Up to 200 days' }
              ]
            }
          },
          {
            id: 'day-care',
            title: 'Day Care Procedures',
            subtitle: 'Up to Sum Insured',
            badge: 'UP TO SUM INSURED',
            iconType: 'activity',
            summary: 'Covers all medical surgeries and treatments that require less than 24 hours of hospital stay due to modern technological advancements.',
            points: [
              'Cataract, chemotherapy, radiotherapy, and dialysis',
              'Minor surgeries, lithotripsy, and endoscopic procedures',
              '100% coverage up to base Sum Insured'
            ]
          },
          {
            id: 'organ-donor',
            title: 'Organ Donor',
            subtitle: 'Up to Sum Insured',
            badge: 'UP TO SUM INSURED',
            iconType: 'heart',
            summary: 'In-patient medical expenses incurred by the organ donor for harvesting the organ during an authorized organ transplant surgery for the insured.',
            points: [
              'Inpatient harvesting surgery costs covered up to Sum Insured',
              'Does not reduce donor screening / medical allowances',
              'Operates seamlessly alongside the insured’s primary treatment'
            ]
          },
          {
            id: 'domiciliary',
            title: 'Domiciliary Treatment',
            subtitle: 'Up to Sum Insured',
            badge: 'UP TO SUM INSURED',
            iconType: 'home',
            summary: 'Medical treatment taken at home on doctor’s advice when the patient cannot be moved to a hospital or hospital beds are unavailable.',
            points: [
              'Home hospitalization covered up to full Sum Insured',
              'Valid when attending doctor certifies patient cannot be moved',
              'Pre and post-treatment protocols apply as per policy terms'
            ]
          },
          {
            id: 'restore',
            title: 'Restore Benefit',
            subtitle: 'Up to Sum Insured',
            badge: '100% AUTOMATIC REFILL',
            iconType: 'refresh',
            summary: 'Automatically refills 100% of the base Sum Insured once during the policy year when the base sum insured is exhausted due to previous claims.',
            points: [
              'Instant automatic restoration upon complete or partial exhaustion',
              'Available for subsequent unrelated medical hospitalizations',
              'Ensures continuous financial protection for family members'
            ]
          },
          {
            id: 'ayush',
            title: 'AYUSH Benefit',
            subtitle: 'Up to Sum Insured',
            badge: 'UP TO SUM INSURED',
            iconType: 'shield',
            summary: 'Inpatient medical treatments taken in recognized government or NABH/QCI accredited Ayurveda, Yoga, Naturopathy, Unani, Siddha, and Homeopathy hospitals.',
            points: [
              '100% coverage up to base Sum Insured without sub-limits',
              'Must be undertaken in authorized AYUSH healthcare centers',
              'Includes holistic treatments and prescribed herbal/ayurvedic medicines'
            ]
          },
          {
            id: 'consumables',
            title: 'Consumables Benefit',
            subtitle: 'Up to Sum Insured',
            badge: '100% NON-MEDICAL ITEMS',
            iconType: 'check',
            summary: 'Covers 100% of non-medical itemized hospital expenses such as gloves, syringes, cotton, PPE kits, masks, and administrative charges without out-of-pocket deductions.',
            points: [
              'Full waiver of non-payable List I consumable items',
              'Prevents unexpected out-of-pocket bills during hospital discharge',
              'Automatically covered up to the base Sum Insured'
            ]
          },
          {
            id: 'global-cover',
            title: 'Global Cover for Planned Hospitalization',
            subtitle: 'Worldwide Planned Treatment',
            badge: 'WORLDWIDE COVERAGE',
            iconType: 'globe',
            hasGlobalCoverModal: true,
            summary: 'This benefit allows treatment outside India, subject to policy terms and conditions.',
            points: [
              'This benefit allows treatment outside India, subject to policy terms and conditions.'
            ]
          },
          {
            id: 'ambulance',
            title: 'Ambulance Cover',
            subtitle: '₹5k / ₹7.5k / ₹10k / ₹20k / ₹30k according to tier',
            badge: 'TIER BASED COVERAGE',
            iconType: 'truck',
            summary: 'Road ambulance charges for emergency transfer to the nearest hospital per hospitalization according to ₹50L / ₹75L / ₹1Cr / ₹2Cr / ₹3Cr tier.',
            points: [
              '₹50 Lakh tier → Up to ₹5,000',
              '₹75 Lakh tier → Up to ₹7,500',
              '₹1 Crore tier → Up to ₹10,000',
              '₹2 Crore tier → Up to ₹20,000',
              '₹3 Crore tier → Up to ₹30,000'
            ],
            tierData: {
              title: 'Ambulance Cover Limits by Tier',
              tiers: [
                { tier: '₹50 Lakh', value: 'Up to ₹5,000' },
                { tier: '₹75 Lakh', value: 'Up to ₹7,500' },
                { tier: '₹1 Crore', value: 'Up to ₹10,000' },
                { tier: '₹2 Crore', value: 'Up to ₹20,000' },
                { tier: '₹3 Crore', value: 'Up to ₹30,000' }
              ]
            }
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
            id: 'maternity',
            title: 'Maternity Cover',
            subtitle: '₹50,000 – ₹1,00,000 | Girl child: ₹60,000 – ₹1,20,000',
            badge: 'GIRL CHILD ENHANCEMENT',
            iconType: 'heart',
            summary: 'Covers medical expenses incurred for normal delivery or Caesarean section hospitalization. ₹50,000 – ₹1,00,000 depending on tier; enhanced to ₹60,000 – ₹1,20,000 for birth of a girl child.',
            points: [
              'Standard tier range: ₹50,000 to ₹1,00,000 depending on tier',
              'Enhanced girl child limit: ₹60,000 to ₹1,20,000 depending on tier',
              'Covers pre and post-natal hospitalization expenses'
            ],
            tierData: {
              title: 'Maternity Limits by Tier',
              tiers: [
                { tier: '₹50 Lakh', value: '₹50,000 (Girl Child: ₹60,000)' },
                { tier: '₹75 Lakh', value: '₹75,000 (Girl Child: ₹90,000)' },
                { tier: '₹1 Crore', value: '₹1,00,000 (Girl Child: ₹1,20,000)' },
                { tier: '₹2 Crore', value: '₹1,00,000 (Girl Child: ₹1,20,000)' },
                { tier: '₹3 Crore', value: '₹1,00,000 (Girl Child: ₹1,20,000)' }
              ]
            }
          },
          {
            id: 'delivery-complications',
            title: 'Delivery Complications',
            subtitle: 'Up to ₹10,000 or ₹25,000 depending on applicable tier',
            badge: 'TIER BASED PROTECTION',
            iconType: 'shield',
            summary: 'Additional emergency coverage for medical complications arising during obstetric delivery.',
            points: [
              'Up to ₹10,000 for applicable lower tiers',
              'Up to ₹25,000 for other higher applicable tiers',
              'Covers unexpected clinical interventions during child birth'
            ]
          },
          {
            id: 'first-year-vaccination',
            title: 'First Year Vaccinations',
            subtitle: 'Up to ₹10,000 | Girl child: up to ₹15,000',
            badge: 'LIFETIME LIMIT PER CHILD',
            iconType: 'activity',
            summary: 'Covers essential infant immunization vaccines during the first year of life. Standard limit up to ₹10,000; girl child up to ₹15,000. Important: Lifetime limit per child.',
            points: [
              'Standard vaccine limit: Up to ₹10,000',
              'Enhanced girl child limit: Up to ₹15,000',
              'Lifetime limit per child, NOT per policy'
            ]
          },
          {
            id: 'second-opinion',
            title: 'Second Opinion',
            subtitle: 'Included under policy coverage',
            badge: 'INCLUDED COVERAGE',
            iconType: 'users',
            summary: 'Access to an independent second medical opinion from a global panel of leading medical specialists for major illnesses and planned surgeries.',
            points: [
              'Expert opinion from top-tier national & international specialists',
              'Zero impact on the base sum insured or no claim bonus',
              'Convenient digital review of medical records and reports'
            ]
          },
          {
            id: 'high-end-diagnostics',
            title: 'High End Diagnostics',
            subtitle: 'Up to ₹25,000 / ₹50,000 per policy year',
            badge: 'PER POLICY YEAR',
            iconType: 'cpu',
            summary: 'Outpatient coverage for high-end diagnostic tests including MRI scans, CT scans, PET scans, angiography, and specialized molecular diagnostics.',
            points: [
              'Up to ₹25,000 or ₹50,000 per policy year depending on plan/tier',
              'Covers advanced imaging and specialized molecular diagnostics',
              'No 24-hour hospitalization required for diagnostic reimbursement'
            ],
            diagnosticTests: [
              'Brain Perfusion Imaging',
              'CT Guided Biopsy',
              'CT Urography',
              'Digital Subtraction Angiography (DSA)',
              'Liver Biopsy',
              'Magnetic Resonance Cholangiography Scan',
              'PET CT',
              'PET MRI',
              'Renogram'
            ]
          },
          {
            id: 'opd-treatment',
            title: 'OPD Treatment',
            subtitle: 'Up to ₹5,000 / ₹7,500 / ₹10,000 / ₹15,000 / ₹20,000 per year',
            badge: 'TIER BASED OPTIONS',
            iconType: 'users',
            summary: 'Outpatient consultation and pharmacy reimbursement covering routine doctor visits, diagnostics, and prescribed medicines on annual policy year basis.',
            points: [
              'Coverage options: Up to ₹5,000 / ₹7,500 / ₹10,000 / ₹15,000 / ₹20,000',
              'Reimburses routine clinic consultations and pharmacy bills',
              'Available on an annual policy year basis depending on tier'
            ],
            tierData: {
              title: 'OPD Treatment Limits by Tier',
              tiers: [
                { tier: 'Option 1', value: 'Up to ₹5,000' },
                { tier: 'Option 2', value: 'Up to ₹7,500' },
                { tier: 'Option 3', value: 'Up to ₹10,000' },
                { tier: 'Option 4', value: 'Up to ₹15,000' },
                { tier: 'Option 5', value: 'Up to ₹20,000' }
              ]
            }
          },
          {
            id: 'opd-dental',
            title: 'OPD Dental',
            subtitle: 'Up to ₹10,000 / ₹12,500 / ₹15,000 / ₹20,000 / ₹25,000 per year',
            badge: 'DENTAL OPD OPTIONS',
            iconType: 'smile',
            summary: 'Dedicated dental OPD cover for routine and specialized oral treatments including root canal treatments, fillings, extractions, and crown fittings.',
            points: [
              'Coverage options: Up to ₹10,000 / ₹12,500 / ₹15,000 / ₹20,000 / ₹25,000',
              'Covers dental consultations, X-rays, and routine procedures',
              'Per policy year benefit limit depending on tier'
            ],
            tierData: {
              title: 'OPD Dental Limits by Tier',
              tiers: [
                { tier: 'Option 1', value: 'Up to ₹10,000' },
                { tier: 'Option 2', value: 'Up to ₹12,500' },
                { tier: 'Option 3', value: 'Up to ₹15,000' },
                { tier: 'Option 4', value: 'Up to ₹20,000' },
                { tier: 'Option 5', value: 'Up to ₹25,000' }
              ]
            }
          },
          {
            id: 'prolonged-hosp',
            title: 'Prolonged Hospitalization',
            subtitle: '1% of Total Sum Insured',
            badge: '1% OF SUM INSURED',
            iconType: 'clock',
            summary: 'Fixed financial lump-sum compensation paid when the insured undergoes continuous hospital stay exceeding the minimum prescribed policy duration.',
            points: [
              '1% of total base Sum Insured paid out',
              'Helps offset ancillary non-medical and recovery expenses',
              'Paid in addition to all eligible hospital claim settlements'
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
            id: 'air-ambulance',
            title: 'Emergency Air Ambulance',
            subtitle: 'Out-of-network: Up to ₹5,00,000 | Network: Up to Sum Insured',
            badge: 'HIGH VALUE RESCUE',
            iconType: 'truck',
            summary: 'Emergency aero-medical evacuation services to transport the critically ill or injured patient to the nearest specialized tertiary care center.',
            points: [
              'Out-of-network providers → Up to ₹5,00,000',
              'Network provider → Up to full Sum Insured',
              'Includes emergency aircraft and chartered medical helicopter transfer'
            ]
          },
          {
            id: 'accidental-death',
            title: 'Accidental Death Benefit',
            subtitle: '100% of Base Sum Insured OR ₹50,00,000',
            badge: '100% BASE SI OR ₹50L',
            iconType: 'shield',
            summary: 'Lump sum compensation provided to designated nominees in the unfortunate event of accidental demise of the primary policyholder.',
            points: [
              '100% of Base Sum Insured or flat ₹50,00,000 depending on plan structure',
              'Provides essential financial security to the bereaved family',
              'Operates alongside all existing health hospitalization covers'
            ]
          },
          {
            id: 'home-care',
            title: 'Home Care Treatment',
            subtitle: 'Dialysis & Chemo: Up to SI | Pandemic: Up to 25% SI',
            badge: 'HIGHER TIERS',
            iconType: 'home',
            summary: 'Specialized at-home medical treatments for higher applicable tiers: Home Dialysis up to SI, Home Chemotherapy up to SI, Pandemic Care at Home up to 25% of SI (max 15 days/year).',
            points: [
              'Home Dialysis → Up to Sum Insured',
              'Home Chemotherapy → Up to Sum Insured',
              'Pandemic Care at Home → Up to 25% of Sum Insured (max 15 days/year)',
              'Available on higher applicable tiers'
            ]
          },
          {
            id: 'no-claim-bonus',
            title: 'No Claim Bonus',
            subtitle: '50% of Base SI per year (Max 100%) OR 1% Renewal Discount',
            badge: 'UP TO 100% BONUS',
            iconType: 'trending',
            summary: '50% of Base Sum Insured for every claim-free year up to maximum 100%. 50% reduction after claim as applicable, OR 1% renewal premium discount.',
            points: [
              '50% increase in base Sum Insured for each claim-free year',
              'Maximum cumulative bonus capped at 100% (doubles your base cover)',
              '50% reduction after claim as applicable',
              'Alternative option: 1% discount on renewal premium (no pricing shown)'
            ]
          },
          {
            id: 'hearing-aid',
            title: 'Hearing Aid',
            subtitle: '50% of actuals, Maximum ₹10,000 per policy',
            badge: '50% OF ACTUALS',
            iconType: 'activity',
            summary: 'Covers the cost of hearing aid devices up to 50% of actual expenses, subject to a maximum limit of ₹10,000 per policy.',
            points: [
              '50% of actual hearing aid purchase expenses covered',
              'Maximum limit: ₹10,000 per policy',
              'Payable once during the policy period as per doctor prescription'
            ]
          },
          {
            id: 'shared-room-cash',
            title: 'Daily Cash — Shared Accommodation',
            subtitle: '0.25% of Base Sum Insured, Maximum ₹2,000/day',
            badge: '0.25% OF BASE SI',
            iconType: 'dollar',
            summary: 'Daily cash allowance paid directly to the insured when opting for a shared hospital accommodation instead of a private room.',
            points: [
              '0.25% of Base Sum Insured per day of hospitalization',
              'Maximum cap: ₹2,000 per day',
              'Direct cash benefit paid in addition to hospitalization claim'
            ]
          },
          {
            id: 'child-accompany-cash',
            title: 'Daily Cash — Accompanying Insured Child',
            subtitle: '0.25% of Base Sum Insured, Maximum ₹2,000/day',
            badge: '0.25% OF BASE SI',
            iconType: 'dollar',
            summary: 'Daily cash allowance to support a parent or legal guardian staying alongside an insured child undergoing hospital admission.',
            points: [
              '0.25% of Base Sum Insured per day',
              'Maximum cap: ₹2,000 per day',
              'Financial assistance for parents during pediatric hospital stay'
            ]
          },
          {
            id: 'bariatric',
            title: 'Bariatric Surgery',
            subtitle: 'Up to Sum Insured',
            badge: 'UP TO SUM INSURED',
            iconType: 'activity',
            summary: 'Covers bariatric metabolic surgery expenses for severe life-threatening obesity when prescribed by a medical practitioner as per clinical guidelines.',
            points: [
              'Covers surgical costs up to the full Sum Insured',
              'Subject to policy BMI and medical necessity criteria',
              'Helps treat severe obesity-related co-morbidities'
            ]
          },
          {
            id: 'dental-inpatient',
            title: 'In-patient Dental',
            subtitle: 'Up to Sum Insured',
            badge: 'UP TO SUM INSURED',
            iconType: 'smile',
            summary: 'Inpatient dental treatments and surgeries required under general anesthesia arising from accidental physical injuries.',
            points: [
              'Inpatient dental surgery covered up to Sum Insured',
              'Arising from accidental trauma or medically necessary hospital stay',
              'Covers surgeon, anesthesia, and medication charges'
            ]
          },
          {
            id: 'vaccination-cover',
            title: 'Vaccination Cover',
            subtitle: 'Up to Sum Insured',
            badge: 'UP TO SUM INSURED',
            iconType: 'shield',
            summary: 'Essential preventive vaccination coverage covered under policy guidelines to safeguard insured family members against critical infectious diseases.',
            points: [
              'Covers standard preventive pediatric and adult vaccines',
              'Subject to policy terms and approved clinical schedules',
              'Helps build long-term immunization protection'
            ]
          }
        ]
      },

      // -----------------------------------------------------------------------
      // CATEGORY 4: WELLNESS & LIFESTYLE
      // -----------------------------------------------------------------------
      {
        id: 'wellness-lifestyle',
        title: 'optional',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        items: [
          {
            id: 'teleconsult-gen',
            title: 'General Teleconsultation',
            subtitle: 'Unlimited',
            badge: 'UNLIMITED 24/7',
            iconType: 'activity',
            summary: 'Instant 24/7 access to qualified general physicians via video/audio calls.',
            points: [
              'Unlimited consultations anytime from home',
              'Instant prescription and medical advice',
              'Zero out-of-pocket charges'
            ]
          },
          {
            id: 'teleconsult-spec',
            title: 'Specialist Teleconsultation',
            subtitle: 'Unlimited',
            badge: 'UNLIMITED SPECIALISTS',
            iconType: 'users',
            summary: 'Direct digital consultations with certified medical specialists across domains.',
            points: [
              'Cardiologists, dermatologists, pediatricians & more',
              'Convenient appointment scheduling',
              'Digital record sharing and review'
            ]
          },
          {
            id: 'condition-mgmt',
            title: 'Health Condition Management',
            subtitle: 'Diet, weight and stress management programs',
            badge: 'PROGRAMS INCLUDED',
            iconType: 'clipboard',
            summary: 'Structured programs for diet, weight, stress, and chronic condition management.',
            points: [
              'Tailored nutrition coaching with dieticians',
              'Weight and metabolic fitness tracking',
              'Mindfulness and stress alleviation modules'
            ]
          },
          {
            id: 'wellness-rewards',
            title: 'Wellness Rewards',
            subtitle: 'Earn and utilize rewards',
            badge: 'REWARD PROGRAM',
            iconType: 'award',
            summary: 'Earn and utilize reward points through active health habits, steps, and checkups.',
            points: [
              'Step tracking and fitness goals incentives',
              'Annual preventive check-up bonus points',
              'Seamless digital redemption wallet'
            ]
          },
          {
            id: 'reward-utilization',
            title: 'Reward Utilization',
            subtitle: 'OPD, treatments, pharma, check-ups & diagnostics',
            badge: 'MULTI-CATEGORY',
            iconType: 'credit',
            summary: 'Reward utilization for OPD consultations, treatments, pharmaceuticals, health check-ups, and diagnostics.',
            points: [
              'OPD doctor consultations and specialist fees',
              'Prescribed treatments and clinical therapies',
              'Doorstep pharmacy orders & diagnostic scans'
            ]
          },
          {
            id: 'hra',
            title: 'Health Risk Assessment',
            subtitle: 'Included under Wellness Program',
            badge: 'INCLUDED',
            iconType: 'check',
            summary: 'Comprehensive Health Risk Assessment to evaluate baseline wellness and biometric indicators.',
            points: [
              'Personalized health report card',
              'Actionable lifestyle recommendations',
              'Benchmarked annual health tracking'
            ]
          },
          {
            id: 'ambulance-booking',
            title: 'Ambulance Booking',
            subtitle: 'Facility available through Wellness Services',
            badge: 'CONCIERGE FACILITY',
            iconType: 'truck',
            summary: 'Priority ambulance booking facility available through Wellness Services.',
            points: [
              'Fast emergency ambulance coordination',
              'Network hospital routing support',
              '24/7 dedicated helpline'
            ]
          },
          {
            id: 'emergency-help',
            title: 'Emergency Help',
            subtitle: 'Emergency assistance feature',
            badge: 'ONE-TOUCH SOS',
            iconType: 'zap',
            summary: 'Dedicated emergency assistance feature for immediate hospital coordination.',
            points: [
              'One-touch SOS button in mobile app',
              'Instant emergency contact alert',
              'Cashless hospitalization guidance'
            ]
          }
        ]
      }
    ],

    // TIER-WISE COVERAGE MATRIX (FOR COMPACT POPUP/MODAL)
    coverageTierMatrix: {
      columns: ['Benefit', '₹50 Lakh', '₹75 Lakh', '₹1 Crore', '₹2 Crore', '₹3 Crore'],
      rows: [
        {
          benefit: 'Ambulance Cover (per hospitalization)',
          t50L: '₹5,000',
          t75L: '₹7,500',
          t1Cr: '₹10,000',
          t2Cr: '₹20,000',
          t3Cr: '₹30,000'
        },
        {
          benefit: 'Health Check-up (cashless basis)',
          t50L: '1% of SI, max ₹10,000',
          t75L: '1% of SI, max ₹15,000',
          t1Cr: '1% of SI, max ₹20,000',
          t2Cr: '1% of SI, max ₹25,000',
          t3Cr: '1% of SI, max ₹25,000'
        },
        {
          benefit: 'Compassionate Travel (per policy year)',
          t50L: '₹20,000',
          t75L: '₹50,000',
          t1Cr: '₹50,000',
          t2Cr: '₹50,000',
          t3Cr: '₹50,000'
        },
        {
          benefit: 'Post-Hospitalization Expenses',
          t50L: 'Up to 90 days',
          t75L: 'Up to 200 days',
          t1Cr: 'Up to 200 days',
          t2Cr: 'Up to 200 days',
          t3Cr: 'Up to 200 days'
        },
        {
          benefit: 'Maternity Cover (Standard / Girl Child)',
          t50L: '₹50,000 / ₹60,000',
          t75L: '₹75,000 / ₹90,000',
          t1Cr: '₹1,00,000 / ₹1,20,000',
          t2Cr: '₹1,00,000 / ₹1,20,000',
          t3Cr: '₹1,00,000 / ₹1,20,000'
        },
        {
          benefit: 'Delivery Complications Cover',
          t50L: 'Up to ₹10,000',
          t75L: 'Up to ₹10,000',
          t1Cr: 'Up to ₹25,000',
          t2Cr: 'Up to ₹25,000',
          t3Cr: 'Up to ₹25,000'
        },
        {
          benefit: 'High End Diagnostics',
          t50L: 'Up to ₹25,000',
          t75L: 'Up to ₹25,000',
          t1Cr: 'Up to ₹50,000',
          t2Cr: 'Up to ₹50,000',
          t3Cr: 'Up to ₹50,000'
        },
        {
          benefit: 'Hearing Aid',
          t50L: '50% (Max ₹10,000)',
          t75L: '50% (Max ₹10,000)',
          t1Cr: '50% (Max ₹10,000)',
          t2Cr: '50% (Max ₹10,000)',
          t3Cr: '50% (Max ₹10,000)'
        },
        {
          benefit: 'Daily Cash — Shared Accommodation',
          t50L: '0.25% of SI (Max ₹2,000/day)',
          t75L: '0.25% of SI (Max ₹2,000/day)',
          t1Cr: '0.25% of SI (Max ₹2,000/day)',
          t2Cr: '0.25% of SI (Max ₹2,000/day)',
          t3Cr: '0.25% of SI (Max ₹2,000/day)'
        },
        {
          benefit: 'Daily Cash — Accompanying Child',
          t50L: '0.25% of SI (Max ₹2,000/day)',
          t75L: '0.25% of SI (Max ₹2,000/day)',
          t1Cr: '0.25% of SI (Max ₹2,000/day)',
          t2Cr: '0.25% of SI (Max ₹2,000/day)',
          t3Cr: '0.25% of SI (Max ₹2,000/day)'
        }
      ]
    }
  },

  // ===========================================================================
  // PLAN 2: MEDICARE SELECT
  // ===========================================================================
  'medicare-select': {
    planId: 'medicare-select',
    planName: 'MediCare Select',
    fullName: 'Tata AIG MediCare Select',
    companyName: 'Tata AIG',
    subtitle: 'Standard essential coverage covering hospitalization and recovery benefits',
    tagline: 'Standard essential coverage covering hospitalization and recovery benefits',
    coverage: '₹5 Lakh - ₹20 Lakh',
    premium: '₹8,200/year',

    uiConfig: {
      primaryColor: '#0038A8',
      accentColor: '#0038A8',
      lightBg: '#F0F4FF',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Tata AIG Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'Claim Settlement Ratio',
        summaryValue: '89.5%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'On average, Tata AIG settled around 89.5% of claims over the last 3 years.',
        singleYear: '89.5%',
        singleYearLabel: 'Recent Single Year',
        threeYearAvg: '89.5%',
        threeYearAvgLabel: '3 Years Avg Ratio'
      },
      icr: {
        title: 'Incurred Claim Ratio',
        summaryValue: '77.50%',
        subtitle: 'Incurred Claim Ratio',
        explanation: 'For every ₹100 collected in premiums, Tata AIG spends about ₹77.50 on settling claims.',
        range: '77.50%',
        rangeLabel: 'Incurred Claim Ratio'
      },
      complaintVolume: {
        title: 'Complaints/10K',
        summaryValue: '11.6',
        subtitle: 'Complaints/10K',
        explanation: 'Around 11.6 complaints per 10,000 claims settled,    showing a low number of complaints.',
        value: '11.6',
        label: 'Complaints/10K — 11.6'
      }
    },

    // --- 2. COMPANY STRENGTH (INDEPENDENT) ---
    companyStrength: {
      heading: 'COMPANY STRENGTH',
      subheading: 'How reliable/strong is the insurer?',
      description: 'How reliable/strong is the insurer?',
      ownership: {
        title: 'OWNERSHIP / PERCENTAGE',
        summaryValue: '74% / 26%',
        explanation: 'Tata AIG General Insurance is a trusted joint venture combining the legacy of Tata Group with the global underwriting expertise of American International Group (AIG).',
        items: [
          { name: 'Tata Group (Tata Sons)', value: '74%', label: 'Ownership' },
          { name: 'American International Group (AIG)', value: '26%', label: 'Ownership' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'AAA',
        explanation: 'Top-tier credit ratings signify the highest level of financial security and outstanding capability to honor policyholder commitments.',
        items: [
          { agency: 'CRISIL', rating: 'AAA / Stable' },
          { agency: 'ICRA', rating: 'AAA / Stable' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '1.95×',
        explanation: "Solvency ratio measures the insurer's financial buffer to pay claims under stress conditions, well above the IRDAI mandatory minimum of 1.50×.",
        value: '1.95×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹22,000+ Cr',
        explanation: 'Substantial investment assets and capital reserves ensuring long-term claim-paying liquidity across India.',
        value: '₹22,000+ Cr',
        label: 'Investment Assets under Management'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: '90%+',
        explanation: 'Over 90% of reinsurance treaties placed with world-class A+ and AAA rated global reinsurers to absorb catastrophic risks.',
        value: '90%+',
        label: 'Backed by Munich Re, Swiss Re & GIC Re'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: 'Top 5',
        explanation: "Ranked among India's top 5 private general insurers with a comprehensive network of over 10,000+ cashless hospitals nationwide.",
        value: 'Top 5 Private Insurer',
        label: 'Over 2 Crore+ Policies Serviced'
      }
    },

    // --- 3. LIMITATIONS & WAITING PERIODS ---
    limitationsWaitingPeriods: TATA_AIG_MEDICARE_SELECT_LIMITATIONS,

    // --- 4. MUST KNOW (INDEPENDENT) ---
    mustKnow: TATA_AIG_MEDICARE_SELECT_MUST_KNOW,

    featuresSections: TATA_AIG_MEDICARE_SELECT_FEATURES_SECTIONS
  },
  'medicare-protect': {
    planId: 'medicare-select',
    planName: 'MediCare Select',
    fullName: 'Tata AIG MediCare Select',
    companyName: 'Tata AIG',
    subtitle: 'Standard essential coverage covering hospitalization and recovery benefits',
    tagline: 'Standard essential coverage covering hospitalization and recovery benefits',
    coverage: '₹5 Lakh - ₹20 Lakh',
    uiConfig: {
      primaryColor: '#0038A8',
      accentColor: '#0038A8',
      lightBg: '#F0F4FF',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  },

  // ===========================================================================
  // PLAN 3: MEDICARE RESERVE (SUPER TOP-UP POLICY)
  // ===========================================================================
  'medicare-reserve': {
    planId: 'medicare-reserve',
    planName: 'MediCare Reserve',
    fullName: 'Tata AIG MediCare Reserve',
    companyName: 'Tata AIG',
    subtitle: 'Super Top-Up Health Insurance with flexible aggregate deductible and restoration benefits',
    tagline: 'Super Top-Up Health Insurance with flexible aggregate deductible and restoration benefits',
    coverage: '₹5 Lakh - ₹1 Crore',
    premium: '₹3,500/year',

    uiConfig: {
      primaryColor: '#0038A8',
      accentColor: '#0038A8',
      lightBg: '#F0F4FF',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Tata AIG Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'Claim Settlement Ratio',
        summaryValue: '89.5%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'On average, Tata AIG settled around 89.5% of claims over the last 3 years.',
        singleYear: '89.5%',
        singleYearLabel: 'Recent Single Year',
        threeYearAvg: '89.5%',
        threeYearAvgLabel: '3 Years Avg Ratio'
      },
      icr: {
        title: 'Incurred Claim Ratio',
        summaryValue: '77.50%',
        subtitle: 'Incurred Claim Ratio',
        explanation: 'For every ₹100 collected in premiums, Tata AIG spends about ₹77.50 on settling claims.',
        range: '77.50%',
        rangeLabel: 'Incurred Claim Ratio'
      },
      complaintVolume: {
        title: 'Complaints/10K',
        summaryValue: '11.6',
        subtitle: 'Complaints/10K',
        explanation: 'Around 11.6 complaints per 10,000 claims settled,    showing a low number of complaints.',
        value: '11.6',
        label: 'Complaints/10K — 11.6'
      }
    },

    // --- 2. COMPANY STRENGTH (INDEPENDENT) ---
    companyStrength: {
      heading: 'COMPANY STRENGTH',
      subheading: 'How reliable/strong is the insurer?',
      description: 'How reliable/strong is the insurer?',
      ownership: {
        title: 'OWNERSHIP / PERCENTAGE',
        summaryValue: '74% / 26%',
        explanation: 'Tata AIG General Insurance is a trusted joint venture combining the legacy of Tata Group with the global underwriting expertise of American International Group (AIG).',
        items: [
          { name: 'Tata Group (Tata Sons)', value: '74%', label: 'Ownership' },
          { name: 'American International Group (AIG)', value: '26%', label: 'Ownership' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'AAA',
        explanation: 'Top-tier credit ratings signify the highest level of financial security and outstanding capability to honor policyholder commitments.',
        items: [
          { agency: 'CRISIL', rating: 'AAA / Stable' },
          { agency: 'ICRA', rating: 'AAA / Stable' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '1.95×',
        explanation: "Solvency ratio measures the insurer's financial buffer to pay claims under stress conditions, well above the IRDAI mandatory minimum of 1.50×.",
        value: '1.95×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹22,000+ Cr',
        explanation: 'Substantial investment assets and capital reserves ensuring long-term claim-paying liquidity across India.',
        value: '₹22,000+ Cr',
        label: 'Investment Assets under Management'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: '90%+',
        explanation: 'Over 90% of reinsurance treaties placed with world-class A+ and AAA rated global reinsurers to absorb catastrophic risks.',
        value: '90%+',
        label: 'Backed by Munich Re, Swiss Re & GIC Re'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: 'Top 5',
        explanation: "Ranked among India's top 5 private general insurers with a comprehensive network of over 10,000+ cashless hospitals nationwide.",
        value: 'Top 5 Private Insurer',
        label: 'Over 2 Crore+ Policies Serviced'
      }
    },

    // --- 3. LIMITATIONS & WAITING PERIODS ---
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Terms & Waiting Periods',
      description: 'Interactive policy timelines, specific disease waiting, and permanent exclusions.',
      items: [
        {
          id: 'reserve-initial',
          title: 'Initial Waiting Period (30 Days)',
          summary: 'A mandatory waiting period of 30 days applies from the policy inception date for any non-accidental illness or hospitalization.',
          highlight: 'Accidental hospitalization is covered from Day 1 with zero waiting period.',
          policyRef: 'Tata AIG MediCare Reserve Policy Terms (Section 3.1)',
          durationTag: '30 Days'
        },
        {
          id: 'reserve-specific',
          title: '36 Months Waiting Period on Specific Diseases & Surgeries',
          summary: 'A continuous waiting period of 36 months applies for medical or surgical treatment of specified conditions including cataract, hernia, joint replacements, and benign tumors.',
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
          policyRef: 'Tata AIG MediCare Reserve Specific Illness Schedule (Section 3.2)',
          durationTag: '36 Months'
        },
        {
          id: 'reserve-ped',
          title: '36 Months Pre-Existing Disease (PED) Waiting',
          summary: 'A waiting period of 36 months of continuous coverage applies for pre-existing diseases declared at inception.',
          highlight: 'Continuous coverage and timely renewal preserve cumulative waiting credits.',
          policyRef: 'Tata AIG MediCare Reserve Policy Terms (Section 3.3)',
          durationTag: '36 Months'
        },
        {
          id: 'reserve-permanent',
          title: 'Permanent Exclusions',
          summary: 'The policy does not cover medical expenses incurred towards treatment of standard permanent exclusions:',
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
          policyRef: 'Standard IRDAI & Tata AIG Guidelines (Section 4)',
          durationTag: 'Never Covered'
        }
      ]
    },

    // --- 4. MUST KNOW (INDEPENDENT) ---
    mustKnow: {
      heading: 'MUST-KNOW DETAILS',
      subheading: 'Important MediCare Reserve terms that policyholders should keep in mind',
      buttonLabel: 'MUST KNOW DETAILS',
      layout: 'details-modal',
      items: [
        {
          id: 'super-top-up',
          icon: '🛡️',
          title: 'SUPER TOP-UP POLICY STRUCTURE',
          paragraphs: [
            'MediCare Reserve acts as a high-deductible Super Top-Up policy to extend your coverage beyond base policy limits.',
            'Aggregate deductible applies across multiple hospitalizations in a single policy year.'
          ]
        },
        {
          id: 'room-rent',
          icon: '🏥',
          title: 'SINGLE PRIVATE ROOM COVERED',
          paragraphs: [
            'Single Private Room is covered with zero proportionate deductions on associated medical expenses.',
            'No daily sub-limit on room rent charges across network hospitals.'
          ]
        },
        {
          id: 'pre-post',
          icon: '📅',
          title: '90 DAYS PRE & 90 DAYS POST HOSPITALIZATION',
          paragraphs: [
            'Medical expenses incurred 90 days prior to admission and 90 days post discharge are fully covered.'
          ]
        },
        {
          id: 'waiver-deductible-5yr',
          icon: '✨',
          title: 'WAIVER OF AGGREGATE DEDUCTIBLE AFTER 5 YEARS',
          paragraphs: [
            'If the policy is renewed continuously for 5 years, the customer can remove the deductible at renewal without any fresh underwriting.'
          ]
        }
      ]
    },

    // --- 5. BEST SUITED FOR (INDEPENDENT) ---
    bestSuitedFor: {
      heading: 'BEST SUITED FOR',
      subheading: 'Who should choose Tata AIG MediCare Reserve?',
      description: 'Ideal customer profiles and high-deductible super top-up coverage scenarios.',
      tagline: 'High-value financial buffer designed to supercharge your health insurance at minimal premium.',
      profiles: [
        {
          title: 'Corporate Employees with Base Group Cover',
          icon: '🏢',
          summary: 'Salaried professionals who have base GMC employer health insurance (₹3L–₹5L) and need a large ₹20L–₹1 Crore cushion for major critical illness.',
          badge: 'Corporate Top-Up',
          highlights: [
            'Deductible matches existing employer base policy',
            'Super top-up buffer across multiple hospitalizations in a year',
            'High sum insured protection at a fraction of regular base premium'
          ]
        },
        {
          title: 'Families Facing Medical Inflation',
          icon: '📈',
          summary: 'Families with an existing base health insurance policy who want to expand their safety net against catastrophic hospitalization costs.',
          badge: 'Inflation Shield',
          highlights: [
            'Single Private Room with no proportionate deductions',
            'Pre & post hospitalization expenses covered for 90 & 90 days',
            'Annual wellness teleconsultations included'
          ]
        },
        {
          title: 'Senior Parents & Elder Family Members',
          icon: '👴',
          summary: 'Families seeking comprehensive high financial safety nets for senior parents where increasing base sum insured carries very high premiums.',
          badge: 'Affordable Buffer',
          highlights: [
            'High coverage without exorbitant base premiums',
            'Option to remove deductible after 5 continuous renewal years',
            'Day care surgeries & modern treatments covered'
          ]
        },
        {
          title: 'Smart Cost Optimizers',
          icon: '💡',
          summary: 'Savvy buyers who choose a deductible matching their out-of-pocket capacity to lock in high ₹50L to ₹1 Crore coverage at ultra-low cost.',
          badge: 'Smart Savings',
          highlights: [
            '0% co-payment on eligible claims above deductible',
            'Access to 10,000+ cashless network hospitals',
            'Optional transition cover and consumable protection riders'
          ]
        }
      ]
    },

    // --- 6. 4 POLICY BENEFITS CATEGORIES (EXACTLY 4 MAIN HEADINGS) ---
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
            id: 'reserve-inpatient',
            title: 'Inpatient Hospitalization – Up to Sum Insured',
            subtitle: 'Inpatient Hospitalization Coverage',
            badge: 'UP TO SUM INSURED',
            iconType: 'shield',
            summary: 'Inpatient Hospitalization is covered up to the full Sum Insured for medical treatment and surgeries requiring admission.',
            points: [
              'Covers doctor fees, nursing, ICU, operating theater charges, and diagnostics',
              'Medical expenses covered up to full Sum Insured',
              'Cashless settlement available across 10,000+ network hospitals'
            ]
          },
          {
            id: 'reserve-room-category',
            title: 'Room Category – Single Private Room',
            subtitle: 'Single Private Room Accommodation',
            badge: 'SINGLE PRIVATE ROOM',
            iconType: 'home',
            summary: 'Single Private Room category is covered with zero proportionate deductions on associated medical charges.',
            points: [
              'Single Private Room accommodation covered',
              'Zero proportionate deduction on doctor visits and nursing costs',
              'Ensures comfortable and private patient recovery'
            ]
          },
          {
            id: 'reserve-pre-post',
            title: 'Pre & Post Hospitalization – 90 & 90 days',
            subtitle: '90 Days Pre & 90 Days Post Hospitalization',
            badge: '90 & 90 DAYS',
            iconType: 'calendar',
            summary: 'Comprehensive coverage for medical consultations, diagnostic tests, and prescribed medicines 90 days before admission and 90 days after discharge.',
            points: [
              '90 Days Pre-Hospitalization medical and diagnostic expenses covered',
              '90 Days Post-Hospitalization follow-up consultations and recovery medicines covered',
              'Eliminates major out-of-pocket expenses before and after hospital stay'
            ]
          },
          {
            id: 'reserve-day-care',
            title: 'Day Care Treatments – Covered',
            subtitle: 'Advanced Day Care Surgeries & Procedures',
            badge: 'COVERED',
            iconType: 'activity',
            summary: 'All advanced medical surgeries and day care procedures requiring less than 24 hours of hospital stay are fully covered.',
            points: [
              'All Day Care Treatments requiring less than 24 hours hospitalization covered',
              'Includes chemotherapy, dialysis, radiotherapy, cataract, and minor surgeries',
              '100% coverage up to base Sum Insured'
            ]
          },
          {
            id: 'reserve-organ-donor',
            title: 'Organ Donor Expenses – Covered',
            subtitle: 'Inpatient Harvesting Expenses for Donor',
            badge: 'COVERED',
            iconType: 'heart',
            summary: 'Medical and surgical expenses incurred towards harvesting the organ from a living donor for the insured recipient are fully covered.',
            points: [
              'Organ harvesting hospitalization expenses for donor covered up to Sum Insured',
              'Provides complete financial protection during organ transplant surgeries',
              'Standard IRDAI & Tata AIG clinical guidelines apply'
            ]
          },
          {
            id: 'reserve-ayush',
            title: 'AYUSH Treatment – Covered',
            subtitle: 'Alternative AYUSH Hospitalization Covered',
            badge: 'COVERED',
            iconType: 'shield',
            summary: 'Inpatient hospitalization expenses incurred under AYUSH treatment systems (Ayurveda, Yoga, Unani, Siddha, and Homeopathy) at recognized government and accredited medical centers are covered.',
            points: [
              'Inpatient alternative AYUSH treatments covered up to full Sum Insured',
              'Available at recognized government and accredited centers',
              'Holistic healthcare coverage without room rent capping'
            ]
          },
          {
            id: 'reserve-domiciliary',
            title: 'Domiciliary Treatment – Covered',
            subtitle: 'Home Hospitalization Treatment Covered',
            badge: 'COVERED',
            iconType: 'home',
            summary: 'Medical treatment administered at home (Domiciliary Treatment) when hospital accommodation is unavailable or the patient cannot be moved due to severe medical conditions is covered.',
            points: [
              'Domiciliary (home) hospitalization covered up to Sum Insured',
              'Applicable when patient cannot be safely moved or hospital beds are unavailable',
              'Prescribed active medical supervision required'
            ]
          },
          {
            id: 'reserve-ambulance',
            title: 'Ambulance – Up to Sum Insured',
            subtitle: 'Emergency Ambulance Transportation',
            badge: 'UP TO SUM INSURED',
            iconType: 'truck',
            summary: 'Emergency surface road ambulance expenses incurred for timely transportation to the nearest equipped medical facility are covered up to the Sum Insured.',
            points: [
              'Emergency road ambulance transportation covered up to Sum Insured',
              'Immediate emergency transit to nearest equipped hospital',
              'Seamless cashless or reimbursement claim settlement'
            ]
          },
          {
            id: 'reserve-initial-waiting',
            title: 'Initial Waiting Period – 30 days',
            subtitle: '30 Days Initial Waiting Period',
            badge: '30 DAYS',
            iconType: 'clock',
            summary: 'A mandatory initial waiting period of 30 days applies from policy inception for any non-accidental illness or disease hospitalization.',
            points: [
              '30 days initial waiting period applies for medical illnesses',
              'Accidental hospitalization covered from Day 1 with zero waiting period',
              'Waived on continuous annual renewals'
            ]
          },
          {
            id: 'reserve-ped-waiting',
            title: 'Pre-existing Diseases (PED) – 36 months',
            subtitle: '36 Months Pre-Existing Conditions Waiting',
            badge: '36 MONTHS',
            iconType: 'shield',
            summary: 'A waiting period of 36 months of continuous coverage applies for pre-existing diseases and declared medical conditions.',
            points: [
              'Pre-existing diseases (PED) covered after 36 months of continuous coverage',
              'Timely renewals ensure continuous waiting period credit',
              'Declared conditions covered up to Sum Insured post 36-month period'
            ]
          },
          {
            id: 'reserve-specific-waiting',
            title: 'Specified Diseases / Surgeries – 36 months',
            subtitle: '36 Months Waiting Period for Specified Illnesses',
            badge: '36 MONTHS',
            iconType: 'clock',
            summary: 'A continuous waiting period of 36 months applies for medical or surgical treatment of specified diseases and scheduled surgeries.',
            points: [
              '36 months waiting period for specified diseases and surgeries',
              'Covers cataract, hernia, piles, stones, joint replacements, and cyst removals post waiting period',
              'Immediate coverage if caused directly by accidental injury'
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
            id: 'reserve-ncb-bonus',
            title: 'No claim bonus: 50% to 100% - claim free year (After opting waiver of aggregate deductible)',
            subtitle: '50% to 100% Bonus per Claim-Free Year',
            badge: '50% TO 100% BONUS',
            iconType: 'trending',
            summary: 'No claim bonus: 50% to 100% - claim free year is earned after opting for waiver of aggregate deductible, boosting your sum insured without extra premium.',
            steps: [
              'Opt for Waiver of Aggregate Deductible',
              'Earn 50% to 100% Bonus per Claim-Free Year',
              'Max Bonus up to 100%'
            ],
            points: [
              '50% to 100% increase in basic Sum Insured per claim-free year',
              'Available after opting waiver of aggregate deductible',
              'Substantial financial growth against rising medical costs'
            ]
          },
          {
            id: 'reserve-wellness-teleconsult',
            title: 'Wellness Benefit – Unlimited Teleconsultation (General & Specialty)',
            subtitle: 'Unlimited General & Specialty E-Consultations',
            badge: 'UNLIMITED',
            iconType: 'heart',
            summary: 'Enjoy unlimited teleconsultation with general physicians and certified medical specialists from anywhere.',
            points: [
              'Unlimited Teleconsultation (General & Specialty)',
              'Convenient digital consultations with certified doctors',
              'Prompt medical advice and digital prescriptions'
            ]
          },
          {
            id: 'reserve-waiver-deductible',
            title: 'Waiver of Aggregate Deductible: If the policy is renewed continuously for 5 years, the customer can remove the deductible at renewal without any fresh underwriting.',
            subtitle: 'Remove Deductible After 5 Years Continuous Renewal',
            badge: '5 YEARS RENEWAL',
            iconType: 'check',
            summary: 'If the policy is renewed continuously for 5 years, the customer can remove the deductible at renewal without any fresh underwriting.',
            points: [
              'If the policy is renewed continuously for 5 years, the customer can remove the deductible at renewal without any fresh underwriting',
              'Allows seamless transition to a zero-deductible policy format',
              'Guaranteed eligibility without fresh medical tests'
            ]
          },
          {
            id: 'reserve-restore-benefit',
            title: 'Restore Benefit: Upto Sum Insured - (After opting waiver of aggregate deductible)',
            subtitle: 'Restore Benefit Up to Sum Insured',
            badge: 'UP TO SUM INSURED',
            iconType: 'refresh',
            summary: 'Restore Benefit: Upto Sum Insured - (After opting waiver of aggregate deductible). Restore can be used only one time in a Policy Year.',
            points: [
              'Restore Benefit: Upto Sum Insured - (After opting waiver of aggregate deductible)',
              'Restore can be used only one time in a Policy Year',
              'Second claim or an unrelated illness/disease is covered immediately',
              'If second hospitalization is for the same or related illness, Restore will be available only if the admission is after 45 days from the discharge date of the earlier claim'
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
            id: 'reserve-pocket-protect',
            title: 'Pocket Protect: Customer receives ₹10,000 cash per hospitalization',
            subtitle: '₹10,000 Cash Benefit on Extended Hospitalization',
            badge: '₹10,000 CASH',
            iconType: 'dollar',
            summary: 'Pocket Protect: Customer receives ₹10,000 cash per hospitalization for extended hospital stays to cover incidental expenses.',
            points: [
              'Customer receives ₹10,000 cash per hospitalization',
              'Hospitalization must be more than 7 continuous days',
              '1-year waiting period',
              'Maximum 5 claims in one policy year',
              'Benefit is not available after opting for Waiver of Aggregate Deductible'
            ]
          },
          {
            id: 'reserve-migration-condition',
            title: 'Migration condition:',
            subtitle: 'Option to Migrate to Base Health Product',
            badge: 'MIGRATION OPTION',
            iconType: 'globe',
            summary: 'On completion of one year of coverage after availing the waiver of the Aggregate Deductible option, the Policyholder shall have the option to migrate to a suitable base product offered by Us, subject to applicable terms, conditions, and underwriting guidelines.',
            points: [
              'On completion of one year of coverage after availing the waiver of the Aggregate Deductible option, the Policyholder shall have the option to migrate to a suitable base product offered by Us, subject to applicable terms, conditions, and underwriting guidelines',
              'Enables flexible policy migration within Tata AIG portfolio',
              'Protects accrued cumulative benefits and waiting credits'
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
            id: 'reserve-consumables',
            title: 'Consumables cover',
            subtitle: 'Non-Payable Medical Items & Disposables Covered',
            badge: 'OPTIONAL COVER',
            isRider: true,
            iconType: 'shield',
            summary: 'Consumables cover provides full coverage for non-payable hospital items including surgical gloves, PPE kits, masks, and syringes.',
            points: [
              'Full coverage for non-medical consumable hospital items',
              'Covers surgical gloves, masks, syringes, PPE kits, and cotton',
              'Minimizes unexpected out-of-pocket bills at discharge'
            ]
          },
          {
            id: 'reserve-transicare-wallet',
            title: 'TransiCare Wallet: If the company health insurance (GMC) ends due to resignation or termination, the policy provides up to ₹3 lakh coverage for 90 days',
            subtitle: 'Transition Coverage When GMC Ends',
            badge: 'OPTIONAL COVER',
            isRider: true,
            iconType: 'credit',
            summary: 'If the company health insurance (GMC) ends due to resignation or termination, the policy provides up to ₹3 lakh coverage for 90 days.',
            points: [
              'If the company health insurance (GMC) ends due to resignation or termination, the policy provides up to ₹3 lakh coverage for 90 days',
              'Protects during career transitions between employers',
              'Active financial backup during sudden job termination or resignation'
            ]
          },
          {
            id: 'reserve-inbound-emergency',
            title: 'Inbound Emergency Hospitalization: Provides emergency hospitalization coverage for NRI/OCI customers if they meet with an accident while visiting India.',
            subtitle: 'Emergency Accident Cover in India for NRI/OCI',
            badge: 'OPTIONAL COVER',
            isRider: true,
            iconType: 'globe',
            summary: 'Provides emergency hospitalization coverage for NRI/OCI customers if they meet with an accident while visiting India.',
            points: [
              'Provides emergency hospitalization coverage for NRI/OCI customers if they meet with an accident while visiting India.',
              'Cashless hospitalization access across 10,000+ network hospitals in India',
              'Accidental emergency medical expenses covered'
            ]
          }
        ]
      }
    ]
  },
  ...TATA_AIG_MEDICARE_SELECT_VARIANTS_DATA
};

export const getTataAigPlanData = (planId) => {
  const canonicalId = resolveTataAigPlanId(planId);
  return TATA_AIG_PLANS_DATA[canonicalId] || null;
};

// =============================================================================
// MAGMA GENERAL INSURANCE INDEPENDENT DATA CONFIGURATION
// Flagship Plan: Magma One Health Secure → magma-one-health-secure
// Visual Theme: Bright Red (#ED1B24), Deep Black (#000000), Pure White (#FFFFFF)
// =============================================================================

export const MAGMA_CANONICAL_PLAN_IDS = [
  'magma-one-health-secure'
];

export const resolveMagmaPlanId = (planId) => {
  if (!planId) return null;
  const cleanId = String(planId).toLowerCase().trim();
  if (
    cleanId === 'magma-one-health-secure' ||
    cleanId === 'one-health-secure' ||
    cleanId === 'one-health' ||
    cleanId === 'one-secure' ||
    cleanId === 'magma-one-health'
  ) {
    return 'magma-one-health-secure';
  }
  return cleanId;
};

export const getMagmaPlanData = (planId) => {
  const resolvedId = resolveMagmaPlanId(planId);
  return MAGMA_PLANS_DATA[resolvedId] || null;
};

export const MAGMA_PLANS_DATA = {
  // ===========================================================================
  // FLAGSHIP PLAN: MAGMA ONE HEALTH SECURE
  // ===========================================================================
  'magma-one-health-secure': {
    planId: 'magma-one-health-secure',
    planName: 'One Health Secure',
    fullName: 'Magma General Insurance One Health Secure',
    companyName: 'Magma General Insurance',
    subtitle: 'Comprehensive Health Insurance with Flexible Coverage, Unlimited Restoration, and Extensive Cashless Support',
    tagline: 'Comprehensive Health Insurance with Flexible Coverage, Unlimited Restoration, and Extensive Cashless Support',
    coverage: '₹5 Lakh - ₹1 Crore',
    premium: '₹12,500/year',

    // --- PLAN-SPECIFIC UI CONFIG (MAGMA BRIGHT RED & DEEP BLACK THEME) ---
    uiConfig: {
      primaryColor: '#ED1B24',
      accentColor: '#ED1B24',
      secondaryColor: '#000000',
      lightBg: '#FFF5F5',
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },

    // --- 1. REPORT CARD (INDEPENDENT) ---
    reportCard: {
      heading: 'REPORT CARD',
      subheading: 'Magma General Insurance Performance',
      description: 'Official claim settlement and financial strength metrics.',
      csr: {
        title: 'CSR',
        summaryValue: '97.8%',
        subtitle: 'Claim Settlement Ratio',
        explanation: 'CSR shows the percentage of eligible claims that Magma General Insurance settles during the financial year through its extensive network of 10,000+ cashless hospitals.',
        singleYear: '97.8%',
        singleYearLabel: 'Recent Single Year (FY2024-25)',
        threeYearAvg: '97.5%',
        threeYearAvgLabel: '3 Year Average (FY2022-25)'
      },
      icr: {
        title: 'ICR',
        summaryValue: '59%',
        subtitle: 'Incurred Claim Ratio',
        explanation: "ICR indicates the proportion of net earned premium that the insurer pays out for claims. Magma General Insurance's healthy ICR of 59% ensures financial sustainability and dependable claim settlement.",
        range: '59% → 62%',
        rangeLabel: 'Healthy ICR Range'
      },
      complaintVolume: {
        title: 'COMPLAINT VOLUME',
        summaryValue: '16.5',
        explanation: 'Complaint volume measures customer grievances per 10,000 claims settled. Magma maintains dedicated claim processing and 24/7 customer support.',
        value: '16.5',
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
        explanation: 'Magma General Insurance is a trusted general insurer delivering flexible health insurance solutions, transparent claim processes, and expansive cashless network support across India.',
        items: [
          { name: 'Magma Group & Institutional Investors', value: '100%', label: 'Shareholding' }
        ]
      },
      creditRating: {
        title: 'CREDIT RATING',
        summaryValue: 'Strong',
        explanation: 'Credit ratings reflect strong financial stability, high claims-paying ability, and disciplined underwriting fundamentals.',
        items: [
          { agency: 'CRISIL', rating: 'Strong Financial Position' },
          { agency: 'ICRA', rating: 'Strong Financial Position' }
        ]
      },
      capitalStrength: {
        title: 'CAPITAL STRENGTH',
        summaryValue: '1.71×',
        explanation: 'Solvency ratio of 1.71× indicates Magma General Insurance maintains strong capital reserves well above the IRDAI mandatory minimum of 1.50×.',
        value: '1.71×',
        label: 'Solvency Ratio (as of March 2025)'
      },
      financialBase: {
        title: 'FINANCIAL BASE',
        summaryValue: '₹5,000+ Cr',
        explanation: 'Solid investment asset base and reserves ensuring liquidity to meet policyholder claim commitments nationwide.',
        value: '₹5,000+ Cr',
        label: 'Investment Assets under Management'
      },
      reinsuranceStrength: {
        title: 'REINSURANCE STRENGTH',
        summaryValue: '90%+',
        explanation: 'Over 90% of reinsurance treaties placed with top-rated global reinsurers to absorb catastrophic risks.',
        value: '90%+',
        label: 'Backed by Global Reinsurers & GIC Re'
      },
      marketPosition: {
        title: 'MARKET POSITION',
        summaryValue: '10,000+ Hospitals',
        explanation: 'Expansive cashless network of 10,000+ network hospitals across India providing cashless hospitalization and on-request non-network cashless support.',
        value: '10,000+ Network Hospitals',
        label: 'Pan-India Cashless Presence'
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
          summary: 'A waiting period of 30 days applies from the date of policy commencement for all claims unless hospitalization is due to an accident.',
          highlight: 'Emergency claims due to accidents are covered from Day 1.',
          policyRef: 'Magma One Health Secure Policy Terms (Section 4.1)',
          durationTag: '30 Days'
        },
        {
          id: 'specific-diseases',
          title: 'Specific Disease Waiting Period',
          summary: 'A waiting period of 2 years applies for treatment of specific pre-defined diseases listed in the policy schedule.',
          highlight: 'Continuous coverage and timely annual renewals preserve waiting period credits.',
          policyRef: 'Magma One Health Secure Specific Disease Schedule (Section 4.2)',
          durationTag: '24 Months',
          diseaseList: [
            'Piles, Fistula & Fissure in ano',
            'Stones in Urinary, Biliary & Renal systems',
            'Hysterectomy for Menorrhagia / Fibroids',
            'Joint replacements (non-accidental)',
            'Osteoarthritis & Osteoporosis',
            'Sinusitis, DNS, Tonsillectomy & Adenoidectomy',
            'Benign cysts, nodules, polyps & tumors',
            'Varicose veins & varicose ulcers',
            'Spondylosis, Spondylitis & Disc disorders'
          ]
        },
        {
          id: 'ped-waiting',
          title: 'Pre-existing Disease (PED) Waiting Period',
          summary: 'A waiting period of 3 years of continuous coverage applies for pre-existing medical conditions declared at inception.',
          highlight: 'Continuous coverage and timely annual renewals preserve cumulative waiting credits.',
          policyRef: 'Magma One Health Secure Policy Terms (Section 4.3)',
          durationTag: '36 Months'
        },
        {
          id: 'permanent-exclusions',
          title: 'Permanent Exclusions',
          summary: 'The policy does not cover medical expenses incurred towards hospitalization or treatment of the following permanent exclusions:',
          exclusionsList: [
            'Substance abuse',
            'Hazardous / adventure sports',
            'Cosmetic treatments',
            'Treatments without prescription',
            'External congenital anomalies',
            'Complete exclusions are subject to the policy wording and policy documents'
          ],
          policyRef: 'Standard IRDAI & Magma General Insurance Guidelines (Section 6)',
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
          id: 'flexible-eligibility',
          icon: '🛡️',
          title: 'FLEXIBLE ENTRY & RENEWAL',
          summary: 'Individual entry from 5+ years and floater from 91+ days with no upper age limit on entry or renewal.',
          points: [
            'Proposer / Policyholder Age: Minimum 18 years',
            'Entry Age: Individual 5+ years, Floater 91+ days',
            'Maximum Entry Age: No upper age limit with lifelong renewal',
            'Floater allows up to 7 members (maximum 4 adults and 3 children)'
          ]
        },
        {
          id: 'room-rent-standard',
          icon: '🏥',
          title: 'SINGLE PRIVATE ROOM COVERAGE',
          summary: 'Single Private Room is covered without proportionate deduction penalties up to the Sum Insured.',
          points: [
            'Single Private Room covered for all inpatient admissions',
            'No separate room rent deduction or sub-limits',
            'In-Patient & AYUSH treatments covered up to Sum Insured'
          ]
        },
        {
          id: 'network-scale',
          icon: '🏢',
          title: '10,000+ CASHLESS HOSPITALS',
          summary: 'Access 10,000+ network hospitals across India (as of May 2025) with on-request cashless at non-network hospitals.',
          points: [
            '10,000+ network hospitals across India (May 2025)',
            'On-request cashless facility at non-network hospitals',
            'Green Channel: ₹1,000 (≤₹50k) & ₹2,000 (>₹50k at PPN) processing rewards'
          ]
        },
        {
          id: 'recharge-benefit',
          icon: '🔄',
          title: 'UNLIMITED RECHARGE OF SUM INSURED',
          summary: 'Unlimited recharge of Sum Insured up to 100% for unrelated claims throughout the policy year.',
          points: [
            'Unlimited recharge up to 100% of Sum Insured',
            'Applicable for unrelated claims only',
            'Not applicable for same illness / repeat complications in base policy',
            'Optional add-on rider available for same-illness recharge'
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
            id: 'eligibility',
            title: 'Eligibility',
            subtitle: 'Age and relationship eligibility criteria',
            badge: 'LIFELONG RENEWAL',
            iconType: 'users',
            summary: 'Comprehensive eligibility framework covering individuals and floater families with no upper entry age limit and lifelong renewals.',
            points: [
              'Proposer / Policyholder Age: Minimum 18 years',
              'Entry Age - Individual: 5+ years',
              'Entry Age - Floater: 91+ days',
              'Maximum Entry Age: No upper age limit',
              'Renewal: Lifelong renewal guaranteed',
              'Policy Type - Individual: 1 person',
              'Policy Type - Floater: Up to 7 members including maximum 4 adults and 3 children'
            ]
          },
          {
            id: 'in-patient-hospitalization-ayush',
            title: 'In-Patient Hospitalization & AYUSH',
            subtitle: 'Complete Hospital & Alternative Medicine Coverage',
            badge: 'UP TO SUM INSURED',
            iconType: 'shield',
            summary: 'Full inpatient hospitalization expenses are covered up to the Sum Insured, including treatments under recognized AYUSH systems (Ayurveda, Yoga & Naturopathy, Unani, Siddha, Homeopathy).',
            points: [
              'In-Patient Hospitalization: Up to Sum Insured',
              'AYUSH Treatment: Up to Sum Insured at recognized institutions',
              'Covers room charges, nursing, medical practitioner fees, and ICU expenses'
            ]
          },
          {
            id: 'pre-hospitalization',
            title: 'Pre-Hospitalization',
            subtitle: 'Pre-Admission Medical Expense Coverage',
            badge: '30 DAYS',
            iconType: 'calendar',
            summary: 'Medical expenses incurred 30 days prior to hospital admission are covered for consultations, diagnostic tests, and prescribed medicines related to the illness.',
            points: [
              'Pre-Hospitalization: 30 days',
              'Diagnostic tests and pathology investigations covered',
              'Doctor consultations and prescribed medications included'
            ]
          },
          {
            id: 'post-hospitalization',
            title: 'Post-Hospitalization',
            subtitle: 'Post-Discharge Medical Expense Coverage',
            badge: '60 DAYS',
            iconType: 'calendar',
            summary: 'Medical expenses incurred 60 days following hospital discharge are covered for follow-up consultations, recovery diagnostic tests, and prescribed medicines.',
            points: [
              'Post-Hospitalization: 60 days',
              'Follow-up specialist consultations covered',
              'Prescribed recovery medications and monitoring investigations included'
            ]
          },
          {
            id: 'room-rent',
            title: 'Room Rent',
            subtitle: 'Single Private Room Coverage',
            badge: 'SINGLE PRIVATE ROOM',
            iconType: 'home',
            summary: 'Single Private Room is covered without proportionate deduction penalties as part of inpatient hospitalization expenses.',
            points: [
              'Room Rent: Single Private Room',
              'No proportionate deduction on associate medical expenses',
              'Comfortable private accommodation during hospital stay'
            ]
          },
          {
            id: 'day-care-treatment',
            title: 'Day Care Treatment',
            subtitle: 'Advanced Short-Stay Procedures Covered',
            badge: 'UP TO SUM INSURED',
            iconType: 'activity',
            summary: 'All day care medical procedures and surgeries requiring less than 24 hours of hospital admission due to advanced medical technology are covered up to Sum Insured.',
            points: [
              'Day Care Treatment: Up to Sum Insured',
              'All day care procedures requiring <24 hrs admission covered',
              'Includes chemotherapy, radiotherapy, hemodialysis, and cataract procedures'
            ]
          },
          {
            id: 'organ-donor-expenses',
            title: 'Organ Donor Expenses',
            subtitle: 'Organ Harvesting & Transplantation Coverage',
            badge: 'UP TO SUM INSURED',
            iconType: 'heart',
            summary: 'Inpatient hospitalization expenses incurred towards harvesting the organ from a living donor for the insured recipient are covered up to Sum Insured.',
            points: [
              'Organ Donor Expenses: Up to Sum Insured',
              'Donor harvesting and surgical procedure charges covered',
              'Protects living donor financial welfare during organ harvesting'
            ]
          },
          {
            id: 'ambulance',
            title: 'Ambulance',
            subtitle: 'Emergency Transportation Coverage',
            badge: '₹2,500 / ADMISSION',
            iconType: 'truck',
            summary: 'Road ambulance transportation expenses incurred for transferring the insured to the nearest hospital in case of medical emergency.',
            points: [
              'Ambulance: ₹2,500 per hospitalization',
              'Emergency transfer from home or accident site to hospital covered',
              'Inter-hospital transfer covered when medically advised'
            ]
          },
          {
            id: 'domiciliary-treatment',
            title: 'Domiciliary Treatment',
            subtitle: 'Home-Based Medical Care Coverage',
            badge: 'UP TO SUM INSURED',
            iconType: 'home',
            summary: 'Medical treatment administered at home when the insured patient is unable to be moved to a hospital due to severe medical condition or lack of hospital beds.',
            points: [
              'Domiciliary Treatment: Up to Sum Insured',
              'Applicable when patient cannot be safely transferred to hospital',
              'Supervised medical and nursing care administered at home'
            ]
          },
          {
            id: 'ivf-treatment',
            title: 'IVF Treatment',
            subtitle: 'In-Vitro Fertilization Medical Coverage',
            badge: 'UP TO ₹50,000',
            iconType: 'heart',
            summary: 'Expenses incurred for In-Vitro Fertilization (IVF) and assisted reproductive technology treatments are covered up to ₹50,000 for eligible couples.',
            points: [
              'IVF Treatment: Up to ₹50,000',
              'Assisted reproductive technology procedures covered',
              'Available for eligible policyholders as per policy terms'
            ]
          },
          {
            id: 'bariatric-surgery',
            title: 'Bariatric Surgery',
            subtitle: 'Medically Necessary Weight Loss Surgery',
            badge: 'UP TO ₹1 LAKH',
            iconType: 'heart',
            summary: 'Surgical treatment for severe obesity is covered up to ₹1 Lakh when recommended by a medical specialist for life-threatening health conditions.',
            points: [
              'Bariatric Surgery: Up to ₹1 Lakh',
              'Covered for medically certified obesity criteria (BMI thresholds)',
              'Requires medical specialist recommendation'
            ]
          },
          {
            id: 'psychiatric-treatment',
            title: 'Psychiatric Treatment',
            subtitle: 'Mental Healthcare Inpatient Hospitalization',
            badge: 'UP TO SUM INSURED',
            iconType: 'shield',
            summary: 'Inpatient psychiatric treatment and mental illness hospitalization are covered up to Sum Insured, with a ₹50,000 sub-limit for specified psychiatric conditions.',
            points: [
              'Psychiatric Treatment: Up to Sum Insured',
              'Mental health inpatient hospitalization covered',
              '₹50,000 sub-limit applies for specified conditions as per policy schedule'
            ]
          },
          {
            id: 'lasik',
            title: 'LASIK',
            subtitle: 'Refractive Eye Surgery Coverage',
            badge: 'UP TO ₹25,000',
            iconType: 'activity',
            summary: 'Laser-Assisted in Situ Keratomileusis (LASIK) eye surgery for refractive error correction is covered up to ₹25,000 as per medical necessity.',
            points: [
              'LASIK: Up to ₹25,000',
              'Refractive vision correction procedures covered',
              'Subject to qualifying refractive error diopter limits'
            ]
          },
          {
            id: 'hiv-aids-treatment',
            title: 'HIV/AIDS Treatment',
            subtitle: 'Comprehensive Infectious Disease Care',
            badge: 'UP TO SUM INSURED',
            iconType: 'shield',
            summary: 'Inpatient hospitalization medical expenses for the management and treatment of HIV/AIDS and associated complications are covered up to Sum Insured.',
            points: [
              'HIV/AIDS Treatment: Up to Sum Insured',
              'Inpatient management and opportunistic infection care covered',
              'Compassionate healthcare coverage without discrimination'
            ]
          },
          {
            id: 'modern-treatment',
            title: 'Modern Treatment',
            subtitle: 'Advanced Robotic & Precision Medicine',
            badge: 'UP TO SUM INSURED',
            iconType: 'cpu',
            summary: 'All 12 IRDAI-specified modern treatment methods including robotic surgeries, immunotherapy, stem cell therapy, and precision radiation are covered up to Sum Insured.',
            points: [
              'Modern Treatment: Up to Sum Insured',
              'Includes Robotic Surgeries, Immunotherapy, and Stem Cell Therapy',
              'Balloon Sinuplasty, Deep Brain Stimulation, and Oral Chemotherapy covered'
            ]
          },
          {
            id: 'cumulative-bonus',
            title: 'Cumulative Bonus',
            subtitle: 'No-Claim Bonus SI Growth',
            badge: '10% P.A. (MAX 50%)',
            iconType: 'trending',
            summary: '10% increase in base Sum Insured for every claim-free policy year, accumulating up to a maximum of 50% of the base Sum Insured.',
            points: [
              'Cumulative Bonus: 10% of Sum Insured per year',
              'Maximum accumulation: 50% of base Sum Insured',
              'Earned bonus is preserved upon timely policy renewal'
            ]
          },
          {
            id: 'e-opinion',
            title: 'E-Opinion',
            subtitle: 'Second Opinion for Critical Illness',
            badge: 'COVERED',
            iconType: 'shield',
            summary: 'Electronic second medical opinion from leading specialists and medical experts across India for confirmed critical illness diagnoses.',
            points: [
              'E-Opinion: Available for critical illness',
              'Comprehensive review of medical records by expert panel',
              'Helps validate treatment roadmap and clinical decisions'
            ]
          },
          {
            id: 'annual-health-checkup',
            title: 'Annual Health Check-up',
            subtitle: 'Preventive Diagnostic Health Screening',
            badge: 'COVERED',
            iconType: 'activity',
            summary: 'Annual preventive health check-up package covered for all insured members to promote proactive wellness and early disease detection.',
            points: [
              'Annual Health Check-up: Covered',
              'Comprehensive diagnostic test panel included',
              'Available once during each policy year for all covered members'
            ]
          },
          {
            id: 'fitness-rewards-wellness',
            title: 'Fitness Rewards & Wellness',
            subtitle: 'Earn Premium Discounts & Claim-Free Rewards',
            badge: 'UP TO 10% REWARDS',
            iconType: 'zap',
            summary: 'Comprehensive wellness program enabling policyholders to earn up to 10% of premium through fitness activities, plus substantial claim-free cash rewards.',
            points: [
              'Fitness Rewards: Earn up to 10% of premium',
              '₹2,500 reward for 5 consecutive claim-free years',
              '₹5,000 reward for 10 consecutive claim-free years'
            ]
          },
          {
            id: 'green-channel',
            title: 'Green Channel',
            subtitle: 'Expedited Claim Processing Incentives',
            badge: 'UP TO ₹2,000',
            iconType: 'check',
            summary: 'Cash rewards for utilizing the streamlined Green Channel at preferred provider network (PPN) hospitals for accelerated claim settlement.',
            points: [
              'Green Channel: ₹1,000 for claims up to ₹50,000',
              'Green Channel: ₹2,000 for claims above ₹50,000 at PPN hospitals',
              'Expedited, transparent digital claim processing'
            ]
          },
          {
            id: 'recharge-sum-insured',
            title: 'Recharge Sum Insured',
            subtitle: 'Automatic Unlimited Restoration',
            badge: 'UNLIMITED RECHARGE',
            iconType: 'refresh',
            summary: 'Unlimited recharge of Sum Insured up to 100% for unrelated claims throughout the policy year when the base sum insured is exhausted.',
            points: [
              'Recharge Sum Insured: Unlimited recharge up to 100%',
              'Applicable for unrelated claims only',
              'Not applicable for same illness / repeat complications in base cover'
            ]
          },
          {
            id: 'network-hospitals',
            title: 'Network Hospitals',
            subtitle: 'Expansive Cashless Hospital Network',
            badge: '10,000+ HOSPITALS',
            iconType: 'users',
            summary: 'Pan-India network of over 10,000+ network hospitals (as of May 2025) providing seamless 100% cashless hospitalization.',
            points: [
              '10,000+ network hospitals across India (as of May 2025)',
              '100% cashless admission and discharge across network providers',
              'Dedicated hospital help desks for expedited approvals'
            ]
          },
          {
            id: 'non-network-cashless',
            title: 'Cashless at Non-Network Hospitals',
            subtitle: 'On-Request Cashless Facility',
            badge: 'ON REQUEST',
            iconType: 'shield',
            summary: 'Facility to request cashless hospitalization even at non-network hospitals across India, subject to pre-authorization terms.',
            points: [
              'On-request cashless facility at non-network hospitals',
              'Extends cashless convenience beyond standard network list',
              'Subject to intimation and pre-authorization approval'
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
            id: 'bonus-booster-plus',
            title: 'Bonus Booster Plus',
            subtitle: '100% Cumulative Bonus Accelerator',
            badge: 'UP TO 500%',
            iconType: 'trending',
            summary: 'Accelerated cumulative bonus feature available for Sum Insured ₹5 Lakh and above, granting 100% of Sum Insured per claim-free year up to 500%.',
            points: [
              'Available for Sum Insured ₹5 Lakh and above',
              'Bonus: 100% of Sum Insured per claim-free year',
              'Maximum accumulation: Up to 500% of base Sum Insured'
            ]
          },
          {
            id: 'infinite-bonus-booster',
            title: 'Infinite Bonus Booster',
            subtitle: 'Unlimited Cumulative Bonus Accumulation',
            badge: 'UNLIMITED BONUS',
            iconType: 'zap',
            summary: 'Infinite bonus accumulation available for Sum Insured ₹10 Lakh and above, granting 100% of Sum Insured per claim-free year with no upper limit.',
            points: [
              'Available for Sum Insured ₹10 Lakh and above',
              'Bonus: 100% of Sum Insured per claim-free year',
              'Maximum: Maximum unlimited Sum Insured accumulation'
            ]
          },
          {
            id: 'super-saver-pack',
            title: 'Super Saver Pack',
            subtitle: 'Enhanced Pre/Post, Bonus & Same Illness Recharge',
            badge: 'VALUE PACK',
            iconType: 'shield',
            summary: 'Comprehensive value pack enhancing pre-hospitalization (60 days), post-hospitalization (180 days), 20% annual bonus up to 100%, and same-illness unlimited recharge.',
            points: [
              'Pre-Hospitalization: 60 days',
              'Post-Hospitalization: 180 days',
              'Cumulative Bonus: 20% per year, maximum 100%',
              'Unlimited recharge for same illnesses'
            ]
          },
          {
            id: 'digital-claim-tracking',
            title: 'Digital Claim Tracking',
            subtitle: 'Real-Time App-Based Claim Monitoring',
            badge: 'MOBILE APP',
            iconType: 'clipboard',
            summary: 'Track claim status, submission, document verification, and cashless approval in real-time through the dedicated mobile application.',
            points: [
              'Track claims through the Magma General Insurance Limited mobile application',
              'Real-time cashless pre-authorization and reimbursement updates',
              'Instant push notifications on claim approval milestones'
            ]
          },
          {
            id: 'free-look-period',
            title: 'Free Look Period',
            subtitle: '30-Day Policy Review Window',
            badge: '30 DAYS',
            iconType: 'calendar',
            summary: 'A 30-day free look period from policy commencement allowing cancellation and refund if dissatisfied with terms and conditions.',
            points: [
              '30 days from policy commencement date',
              'Full cancellation and refund option if no claim has been made',
              'Cancellation/refund subject to applicable deductions and policy terms'
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
            id: 'waiting-periods-summary',
            title: 'Waiting Periods',
            subtitle: 'Standard Policy Waiting Schedules',
            badge: 'TIMELINE',
            iconType: 'clock',
            summary: 'Standard statutory waiting periods applicable from policy inception across initial, specific disease, and pre-existing disease categories.',
            points: [
              'Initial Waiting Period: 30 days (accidental injury covered Day 1)',
              'Specific Disease Waiting Period: 2 years (24 months)',
              'Pre-existing Disease (PED) Waiting Period: 3 years (36 months)'
            ]
          },
          {
            id: 'claim-procedure',
            title: 'Claim Procedure',
            subtitle: 'Cashless & Reimbursement Filing Terms',
            badge: 'PROCEDURE',
            iconType: 'check',
            summary: 'Clear and transparent claim filing guidelines for cashless hospital admissions and post-hospitalization reimbursement claims.',
            points: [
              'Initial waiting period: 30 days',
              'Planned admission: Intimate 48 hours prior to hospitalization',
              'Emergency admission: Intimate within 24 hours of hospitalization'
            ]
          },
          {
            id: 'multi-year-discount-2yr',
            title: 'Multi-Year Discount: 2-Year Policy',
            subtitle: '10% Long-Term Premium Savings',
            badge: '10% DISCOUNT',
            iconType: 'dollar',
            summary: 'Opt for a 2-year multi-year policy tenure and enjoy an upfront 10% premium discount with guaranteed rate locking.',
            points: [
              '2-year policy: 10% discount on total premium',
              'Protection against annual premium revisions for 2 years',
              'Hassle-free continuous coverage without yearly renewal paperwork'
            ]
          },
          {
            id: 'multi-year-discount-3yr',
            title: 'Multi-Year Discount: 3-Year Policy',
            subtitle: '12.5% Long-Term Premium Savings',
            badge: '12.5% DISCOUNT',
            iconType: 'dollar',
            summary: 'Opt for a 3-year multi-year policy tenure and enjoy an upfront 12.5% premium discount with maximum financial savings.',
            points: [
              '3-year policy: 12.5% discount on total premium',
              'Maximum rate protection and savings over a 3-year block',
              'Uninterrupted 36-month health security'
            ]
          },
          {
            id: 'exclusions-display',
            title: 'Exclusions',
            subtitle: 'Non-Covered Treatments & Circumstances',
            badge: 'POLICY TERMS',
            iconType: 'alert-triangle',
            summary: 'Medical treatments and circumstances excluded from coverage under the Magma One Health Secure policy.',
            points: [
              'Substance abuse',
              'Hazardous / adventure sports',
              'Cosmetic treatments',
              'Treatments without prescription',
              'External congenital anomalies',
              'Complete exclusions are subject to the policy wording and policy documents'
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
            id: 'waiting-period-reduction-addon',
            title: 'Waiting Period Reduction',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'refresh',
            summary: 'Optional add-on allowing reduction of the standard 30-day initial waiting period for faster coverage activation.',
            points: [
              'Optional / Add-on Benefit',
              'Reduction of first 30-day waiting period',
              'Accelerated coverage readiness from inception'
            ]
          },
          {
            id: 'enhanced-post-hospitalization-addon',
            title: 'Enhanced Post-Hospitalization',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'calendar',
            summary: 'Extended post-hospitalization recovery cover providing coverage up to 180 days instead of standard 60 days.',
            points: [
              'Optional / Add-on Benefit',
              'Post-hospitalization coverage up to 180 days',
              'Comprehensive long-term recovery and diagnostic protection'
            ]
          },
          {
            id: 'specific-disease-waiting-reduction-addon',
            title: 'Specific Disease Waiting Reduction',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'clock',
            summary: 'Optional rider to reduce the specific disease waiting period from 2 years down to 1 year for listed ailments.',
            points: [
              'Optional / Add-on Benefit',
              'Reduction of specific disease waiting period to 1 year',
              'Faster access to surgical and medical coverage for named ailments'
            ]
          },
          {
            id: 'durable-equipment-cover-addon',
            title: 'Durable Equipment Cover',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'shield',
            summary: 'Optional cover for essential durable medical equipment and supportive devices used during treatment and recovery.',
            points: [
              'Optional / Add-on Benefit',
              'Ventilator coverage',
              'Wheelchair coverage',
              'Prosthetic devices coverage',
              'Oxygen concentrators coverage',
              'Other eligible equipment as per policy terms'
            ]
          },
          {
            id: 'surrogacy-cover-addon',
            title: 'Surrogacy Cover',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'heart',
            summary: 'Financial protection for medical and inpatient expenses incurred towards surrogate mother hospitalization.',
            points: [
              'Optional / Add-on Benefit',
              '₹25,000 for Sum Insured up to ₹7.5 Lakh',
              '₹50,000 for Sum Insured above ₹7.5 Lakh'
            ]
          },
          {
            id: 'oocyte-donor-cover-addon',
            title: 'Oocyte Donor Cover',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'heart',
            summary: 'Coverage for medical expenses incurred towards oocyte (egg) donor harvesting and associated clinical procedures.',
            points: [
              'Optional / Add-on Benefit',
              '₹25,000 for Sum Insured up to ₹7.5 Lakh',
              '₹50,000 for Sum Insured above ₹7.5 Lakh'
            ]
          },
          {
            id: 'bonus-booster-addon',
            title: 'Bonus Booster',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'trending',
            summary: 'Optional booster rider providing an extra 20% of Sum Insured cumulative bonus per claim-free year up to 100%.',
            points: [
              'Optional / Add-on Benefit',
              '20% of Sum Insured per claim-free year',
              'Maximum 100% accumulation'
            ]
          },
          {
            id: 'maternity-benefit-addon',
            title: 'Maternity Benefit',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'heart',
            summary: 'Comprehensive maternity package available for Sum Insured ₹5 Lakh and above covering delivery, newborn baby, and vaccination.',
            points: [
              'Optional / Add-on Benefit',
              'Available for Sum Insured ₹5 Lakh and above',
              'Maternity: Up to ₹1 Lakh',
              'Newborn Baby: Up to ₹25,000',
              'Vaccination: Up to ₹5,000',
              'Enhanced maternity waiting period: 2 years',
              'Optional 1-year maternity waiting period option'
            ]
          },
          {
            id: 'enhanced-pre-post-hospitalization-addon',
            title: 'Enhanced Pre & Post Hospitalization',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'calendar',
            summary: 'Expanded pre and post-hospitalization window extending pre-hospitalization to 60 days and post-hospitalization to 90 days.',
            points: [
              'Optional / Add-on Benefit',
              'Pre-Hospitalization: 60 days',
              'Post-Hospitalization: 90 days'
            ]
          },
          {
            id: 'non-payable-expense-cover-addon',
            title: 'Non-Payable Expense Cover',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'shield',
            summary: 'Inbuilt protection covering non-payable consumable items that are generally deducted from hospital bills.',
            points: [
              'Optional / Add-on Benefit',
              'Eligible consumables/non-payable expenses such as:',
              'Gloves',
              'Masks',
              'Nebulizer kits',
              'Other eligible consumables as per policy terms'
            ]
          },
          {
            id: 'recharge-same-illnesses-addon',
            title: 'Recharge for Same Illnesses',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'refresh',
            summary: 'Removes the unrelated illness restriction, providing unlimited restoration even for the same illness or repeat complications.',
            points: [
              'Optional / Add-on Benefit',
              'Unlimited recharge for same illnesses',
              'Covers relapse and repeat medical complications'
            ]
          },
          {
            id: 'ped-waiting-period-reduction-addon',
            title: 'PED Waiting Period Reduction',
            subtitle: 'Optional / Add-on',
            badge: 'OPTIONAL / ADD-ON',
            isRider: true,
            iconType: 'clock',
            summary: 'Reduces the standard 3-year Pre-Existing Disease (PED) waiting period down to 2 years for earlier coverage.',
            points: [
              'Optional / Add-on Benefit',
              'Reduction of PED waiting period to 2 years',
              'Accelerates full coverage for declared pre-existing ailments'
            ]
          }
        ]
      }
    ]
  }
};

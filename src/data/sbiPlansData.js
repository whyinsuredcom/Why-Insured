// =============================================================================
// SBI GENERAL INSURANCE — PLAN DATA (SUPER HEALTH INSURANCE & AROGYA SUPREME)
// Policy Benefits, Report Card, Company Strength, Limitations & Takeaways
// Sourced from official SBI General Insurance policy documents & public disclosures.
// Theme: Primary #00B5EF (Sky Blue) | Secondary #292075 (Dark Navy) | Banner #660066 (Purple)
// =============================================================================

export const SBI_SOURCES = [
  {
    title: "SBI General Insurance – Public Disclosures",
    name: "SBI General Insurance – Public Disclosures",
    url: "https://www.sbigeneral.in/public-disclosure",
    type: "website"
  },
  {
    title: "SBI General Super Health Insurance Policy Document",
    name: "SBI General Super Health Insurance Policy Document",
    url: "https://www.sbigeneral.in/health-insurance/super-health-insurance",
    type: "pdf"
  },
  {
    title: "SBI General Arogya Supreme Policy Document",
    name: "SBI General Arogya Supreme Policy Document",
    url: "https://www.sbigeneral.in/health-insurance/arogya-supreme",
    type: "pdf"
  },
  {
    title: "IRDAI – Official Annual Reports",
    name: "IRDAI – Official Annual Reports",
    url: "https://irdai.gov.in/annual-reports",
    type: "website"
  }
];

export const SBI_SHARED_REPORT_CARD = {
  heading: 'REPORT CARD',
  subheading: 'SBI General Insurance Performance',
  description: 'Official claim settlement and financial strength metrics.',
  csr: {
    title: 'Claim Settlement Ratio',
    summaryValue: '89.51%',
    subtitle: 'Claim Settlement Ratio',
    explanation: 'SBI General Insurance maintains a strong claim settlement track record backed by a vast cashless network across India.',
    singleYear: '89.51%',
    singleYearLabel: 'Recent Single Year',
    threeYearAvg: '89.51%',
    threeYearAvgLabel: '3 Years Avg Ratio'
  },
  icr: {
    title: 'Incurred Claim Ratio',
    summaryValue: '73.80%',
    subtitle: 'Incurred Claim Ratio',
    explanation: 'For every ₹100 collected in premiums, SBI General Insurance spends about ₹73.80 on settling claims, indicating balanced claim underwriting.',
    range: '73.80%',
    rangeLabel: 'Incurred Claim Ratio'
  },
  complaintVolume: {
    title: 'Complaints/10K',
    summaryValue: '14.2',
    subtitle: 'Complaints/10K',
    explanation: 'Low volume of complaints per 10,000 claims settled across India.',
    value: '14.2',
    label: 'Complaints/10K — 14.2'
  }
};

export const SBI_SHARED_COMPANY_STRENGTH = {
  heading: 'COMPANY STRENGTH',
  subheading: 'How reliable/strong is the insurer?',
  description: 'Financial stability, sovereign backing, and institutional strength of SBI General Insurance.',
  ownership: {
    title: 'OWNERSHIP / PERCENTAGE',
    summaryValue: '70% / 30%',
    explanation: 'A joint venture between State Bank of India (70%), India’s largest public sector bank, and Napean Opportunities LLP / Premji Invest (30%).',
    items: [
      { name: 'State Bank of India (SBI)', value: '70%', label: 'Ownership' },
      { name: 'Napean Opportunities LLP / Premji Invest', value: '30%', label: 'Ownership' }
    ]
  },
  creditRating: {
    title: 'CREDIT RATING',
    summaryValue: 'AAA',
    explanation: 'Awarded top-tier AAA financial strength rating reflecting ultimate solvency and prompt claim repayment capability.',
    items: [
      { agency: 'ICRA', rating: 'AAA / Stable' },
      { agency: 'CRISIL', rating: 'AAA / Stable' }
    ]
  },
  capitalStrength: {
    title: 'CAPITAL STRENGTH',
    summaryValue: '2.04×',
    explanation: 'Solvency ratio stands robust at 2.04×, significantly exceeding the IRDAI mandatory minimum requirement of 1.50×.',
    value: '2.04×',
    label: 'Solvency Ratio (as of FY 2024-25)'
  },
  financialBase: {
    title: 'FINANCIAL BASE',
    summaryValue: '₹14,500+ Cr',
    explanation: 'Substantial asset backing and solid investment reserves ensuring prompt settlement of cashless hospital claims.',
    value: '₹14,500+ Cr',
    label: 'Assets Under Management (AUM)'
  },
  reinsuranceStrength: {
    title: 'REINSURANCE STRENGTH',
    summaryValue: '90%+',
    explanation: 'Backed by tier-1 global reinsurance treaties providing comprehensive risk management.',
    value: '90%+',
    label: 'Global Reinsurance Backing'
  },
  marketPosition: {
    title: 'MARKET POSITION',
    summaryValue: 'Top Insurer',
    explanation: 'Extensive pan-India network of 14,000+ cashless hospitals and branches across urban and rural India.',
    value: '14,000+ Cashless Hospitals',
    label: 'Backed by the Trust of SBI'
  }
};

// =============================================================================
// SUPER HEALTH INSURANCE: BEST SUITED FOR
// =============================================================================
export const SBI_SUPER_HEALTH_BEST_SUITED_FOR = {
  heading: 'PERFECT FOR',
  subheading: 'Who is this plan perfect for?',
  description: 'Target customer profiles and ideal family scenarios for SBI Super Health Insurance.',
  profiles: [
    {
      title: 'Families Seeking High Sum Insured & Unlimited Reinstatement',
      icon: '🏥',
      summary: 'Families needing comprehensive coverage from ₹3 Lakhs to ₹2 Crore with unlimited Reinsure Benefit for related and unrelated conditions.',
      badge: 'High Coverage',
      highlights: [
        'Sum Insured options from ₹3 Lakhs up to ₹2 Crore',
        'Unlimited Reinsure Benefit without additional premium',
        'Available in Individual and Family Floater options (up to 4 adults & kids)'
      ]
    },
    {
      title: 'Individuals Wanting Zero Out-of-Pocket Hospital Bills (Claims Shield)',
      icon: '🛡️',
      summary: 'Policyholders wanting coverage for consumable items such as gloves, masks, bandages, and PPE kits through Claims Shield.',
      badge: 'Claims Shield',
      highlights: [
        'Covers non-payable medical consumables',
        'Minimizes out-of-pocket expenses during hospitalization',
        '100% cashless claims across 14,000+ network hospitals'
      ]
    },
    {
      title: 'Critical Illness & Multiplied Protection Seekers',
      icon: '⚡',
      summary: 'Customers who want their coverage multiplied up to 3 times for specified serious illnesses without extra premium.',
      badge: 'Health Multiplier',
      highlights: [
        'Up to 3X coverage for specified serious illnesses',
        'No additional premium required for multiplier activation',
        'Comprehensive in-patient, modern treatments and AYUSH covered'
      ]
    },
    {
      title: 'Growing Families & Wellness-Minded Individuals',
      icon: '👶',
      summary: 'Families requiring maternity and newborn cover along with AI fitness coaching, gym discounts, and step-based renewal savings.',
      badge: 'Maternity & Wellness',
      highlights: [
        'Eligible maternity & newborn baby cover available',
        'Enhanced Cumulative Bonus (ECB) up to 50% per claim-free year',
        'Active wellness rewards and preventive annual health check-up'
      ]
    }
  ]
};

// =============================================================================
// SUPER HEALTH INSURANCE EXACT 4-SECTION POLICY BENEFITS ARCHITECTURE
// =============================================================================
export const SBI_SUPER_HEALTH_FEATURES_SECTIONS = [
  {
    id: 'most-important',
    title: 'MOST IMPORTANT',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'sum-insured',
        title: 'Sum Insured',
        subtitle: 'Flexible Sum Insured Options from ₹3 Lakh to ₹2 Crore',
        badge: '₹3 LAKH – ₹2 CRORE',
        iconType: 'credit',
        summary: 'The policy offers Sum Insured options from ₹3 lakh to ₹2 crore, as applicable under the plan.',
        points: [
          'The policy offers Sum Insured options from ₹3 lakh to ₹2 crore, as applicable under the plan.',
          'Wide range of Sum Insured slabs to suit diverse financial and healthcare protection needs.',
          'Applicable for both individual and family floater coverage.'
        ]
      },
      {
        id: 'policy-basis',
        title: 'Policy Basis',
        subtitle: 'Individual and Family Floater Basis',
        badge: 'INDIVIDUAL & FLOATER',
        iconType: 'users',
        summary: 'The policy can be taken on an Individual or Family Floater basis. Family Floater can cover up to 4 adults and children as applicable under the policy terms.',
        points: [
          'The policy can be taken on an Individual or Family Floater basis.',
          'Family Floater can cover up to 4 adults and children as applicable under the policy terms.',
          'Comprehensive family security under a single unified policy schedule.'
        ]
      },
      {
        id: 'entry-age',
        title: 'Entry Age',
        subtitle: 'Wide Entry Age with Lifelong Renewability',
        badge: '18 YRS TO LIFELONG',
        iconType: 'calendar',
        summary: 'Minimum entry age is 18 years for adults and 91 days to 30 years for dependent children. There is no maximum entry age restriction for proposer/family members, subject to applicable terms.',
        points: [
          'Minimum entry age is 18 years for adults.',
          '91 days to 30 years for dependent children.',
          'There is no maximum entry age restriction for proposer/family members, subject to applicable terms.'
        ]
      },
      {
        id: 'inpatient-hospitalization',
        title: 'Inpatient Hospitalization',
        subtitle: 'Room Rent, ICU, Nursing, Doctor Fees & Internal Prosthetics',
        badge: 'INPATIENT CARE',
        iconType: 'home',
        summary: 'Coverage includes eligible room rent, ICU/ICCU charges, nursing, surgeon/medical practitioner fees, blood, oxygen, operation theatre charges, medicines and internal prosthetic devices.',
        points: [
          'Coverage includes eligible room rent, ICU/ICCU charges, nursing, and surgeon/medical practitioner fees.',
          'Covers blood, oxygen, operation theatre charges, medicines and internal prosthetic devices.',
          'Requires minimum 24 hours of continuous in-patient hospitalization.'
        ]
      },
      {
        id: 'health-multiplier-benefit',
        title: 'Health Multiplier Benefit',
        subtitle: 'Up to 3 Times Multiplied Coverage for Serious Illnesses',
        badge: 'UP TO 3X COVERAGE',
        iconType: 'zap',
        summary: 'For diagnosis of specified serious illnesses, this feature can multiply the coverage up to 3 times without additional premium, subject to policy terms and applicable conditions.',
        points: [
          'For diagnosis of specified serious illnesses, this feature can multiply the coverage up to 3 times without additional premium.',
          'Subject to policy terms and applicable conditions.',
          'Provides extraordinary financial cushion during severe medical emergencies.'
        ]
      },
      {
        id: 'reinsure-benefit',
        title: 'Reinsure Benefit',
        subtitle: 'Unlimited Reinstatement of Base Sum Insured',
        badge: 'UNLIMITED REINSTATE',
        iconType: 'refresh',
        summary: 'Provides unlimited reinstatement during the policy year for eligible claims, including related or unrelated illnesses, without additional premium, subject to policy terms.',
        points: [
          'Provides unlimited reinstatement during the policy year for eligible claims.',
          'Applicable for both related or unrelated illnesses without additional premium.',
          'Subject to policy terms and guidelines.'
        ]
      },
      {
        id: 'claims-shield',
        title: 'Claims Shield',
        subtitle: 'Coverage for Non-Payable Medical Consumables',
        badge: 'CONSUMABLES COVER',
        iconType: 'shield',
        summary: 'Covers specified non-payable items such as gloves, masks, cotton, bandages and other eligible items to help reduce out-of-pocket expenses.',
        points: [
          'Covers specified non-payable items such as gloves, masks, cotton, bandages and other eligible items.',
          'Designed to significantly reduce out-of-pocket medical expenses.',
          'Available as per policy terms and defined consumables schedule.'
        ]
      },
      {
        id: 'pre-post-hospitalization',
        title: 'Pre & Post Hospitalization',
        subtitle: '60 Days Pre & 180 Days Post Hospitalization Medical Expenses',
        badge: '60 & 180 DAYS',
        iconType: 'clock',
        summary: 'Eligible medical expenses are covered for up to 60 days before hospitalization and up to 180 days after discharge, as applicable to the plan.',
        points: [
          'Eligible medical expenses are covered for up to 60 days before hospitalization.',
          'Up to 180 days after hospital discharge, as applicable to the plan.',
          'Includes diagnostics, specialist consultations, and prescribed follow-up medications.'
        ]
      },
      {
        id: 'day-care-domiciliary',
        title: 'Day Care & Domiciliary Treatment',
        subtitle: 'Advanced Day Care Procedures & Home Hospitalization',
        badge: 'DAY CARE & DOMICILIARY',
        iconType: 'activity',
        summary: 'Eligible day-care procedures and domiciliary hospitalization/treatment are covered as per the applicable policy terms and limits.',
        points: [
          'Eligible day-care procedures requiring less than 24 hours stay are covered.',
          'Domiciliary hospitalization/treatment is covered when hospital bed is unavailable or patient cannot be moved.',
          'Subject to applicable policy terms and limits.'
        ]
      },
      {
        id: 'home-health-care',
        title: 'Home Health Care',
        subtitle: 'Prescribed Doctor-Recommended Medical Treatment at Home',
        badge: 'HOME HEALTH CARE',
        iconType: 'heart',
        summary: 'Eligible treatment taken at home on the recommendation/prescription of the treating doctor is covered as per policy terms.',
        points: [
          'Eligible treatment taken at home on the recommendation/prescription of the treating doctor is covered.',
          'Enables comfortable recovery under expert nursing/medical oversight at home.',
          'Subject to policy terms and pre-authorization requirements.'
        ]
      },
      {
        id: 'ambulance-cover',
        title: 'Ambulance Cover',
        subtitle: 'Emergency Road & Domestic Air Ambulance up to ₹10 Lakh',
        badge: 'ROAD & AIR AMBULANCE',
        iconType: 'truck',
        summary: 'Emergency road ambulance and domestic air ambulance coverage is available, with domestic air ambulance coverage up to the applicable limit, including the stated maximum of ₹10 lakh where applicable.',
        points: [
          'Emergency road ambulance coverage available for transfer to nearest hospital.',
          'Domestic air ambulance coverage up to applicable limit, including stated maximum of ₹10 lakh where applicable.',
          'Ensures rapid transit in critical, life-threatening medical situations.'
        ]
      },
      {
        id: 'organ-donor-expenses',
        title: 'Organ Donor Expenses',
        subtitle: 'In-Patient Medical Expenses of Organ Donor Covered',
        badge: 'UP TO BASE SI',
        iconType: 'smile',
        summary: 'Eligible hospitalization and medical expenses of an organ donor are covered up to the applicable base Sum Insured, subject to policy terms.',
        points: [
          'Eligible hospitalization and medical expenses of an organ donor are covered.',
          'Coverage provided up to the applicable base Sum Insured.',
          'Subject to policy terms and valid organ transplantation protocols.'
        ]
      }
    ]
  },
  {
    id: 'value-added',
    title: 'valueAdded',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'annual-health-checkup',
        title: 'Annual Health Check-up',
        subtitle: 'Preventive Health Check-up Facility',
        badge: 'PREVENTIVE CHECK-UP',
        iconType: 'clipboard',
        summary: 'Preventive health check-up facility is available as per the policy terms and applicable limits.',
        points: [
          'Preventive health check-up facility is available as per the policy terms.',
          'Helps in early diagnosis and proactive monitoring of vital health metrics.',
          'Available on a cashless basis at designated diagnostic network centres.'
        ]
      },
      {
        id: 'enhanced-cumulative-bonus',
        title: 'Enhanced Cumulative Bonus (ECB)',
        subtitle: 'Up to 50% Sum Insured Increase per Claim-Free Year',
        badge: 'UP TO 50% ECB',
        iconType: 'trending',
        summary: 'For every claim-free policy year, the base Sum Insured can increase by up to 50%, subject to the applicable maximum and policy terms.',
        points: [
          'For every claim-free policy year, the base Sum Insured can increase by up to 50%.',
          'Subject to the applicable maximum bonus ceiling and policy terms.',
          'Substantially increases medical cover without requiring additional premium.'
        ]
      },
      {
        id: 'wellness-benefits',
        title: 'Wellness Benefits',
        subtitle: 'AI Fitness Coaching, Diet Consultations, Gym & Step Rewards',
        badge: 'WELLNESS REWARDS',
        iconType: 'award',
        summary: 'Includes eligible wellness services such as AI personal fitness coaching, dietician/nutrition e-consultations, gym membership benefits and walk/step-based renewal discount benefits, subject to applicable terms.',
        points: [
          'AI personal fitness coaching and personalized health management.',
          'Dietician and nutrition e-consultations with certified experts.',
          'Gym membership benefits and walk/step-based renewal discount benefits, subject to applicable terms.'
        ]
      },
      {
        id: 'maternity-newborn-cover',
        title: 'Maternity & New Born Baby Cover',
        subtitle: 'Maternity, Pre/Post Natal Care & Newborn Baby Expenses',
        badge: 'MATERNITY & NEWBORN',
        iconType: 'heart',
        summary: 'Eligible maternity expenses, including applicable pre/post-natal expenses, and newborn baby coverage may be available under applicable plans/terms.',
        points: [
          'Eligible maternity expenses including normal and C-section delivery covered.',
          'Applicable pre/post-natal medical expenses included.',
          'Newborn baby coverage available as per applicable plan options and terms.'
        ]
      }
    ]
  },
  {
    id: 'additional',
    title: 'ADDITIONAL',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'modern-treatments-bariatric',
        title: 'Modern Treatments & Bariatric Surgery',
        subtitle: 'Robotic Surgeries, Advanced Technologies & Bariatric Procedures',
        badge: 'MODERN & BARIATRIC',
        iconType: 'cpu',
        summary: 'Eligible modern/advanced treatments and bariatric surgery expenses are covered according to the policy terms and applicable conditions.',
        points: [
          'Eligible modern/advanced treatments including robotic surgeries, stem cell therapies, and immunotherapy.',
          'Bariatric surgery expenses covered according to policy terms and medical criteria.',
          'Ensures access to cutting-edge medical science and surgical techniques.'
        ]
      },
      {
        id: 'ayush-treatment',
        title: 'AYUSH Treatment',
        subtitle: 'Ayurveda, Yoga & Naturopathy, Unani, Siddha, Homeopathy',
        badge: 'AYUSH COVERED',
        iconType: 'globe',
        summary: 'Eligible inpatient hospitalization expenses for Ayurveda, Unani, Siddha and Homeopathy treatments are covered as per policy terms.',
        points: [
          'Inpatient hospitalization expenses for Ayurveda, Unani, Siddha and Homeopathy are covered.',
          'Treatment must be availed in a recognized government/accredited AYUSH healthcare institute.',
          'Covered up to applicable limits as per policy terms.'
        ]
      }
    ]
  },
  {
    id: 'optional',
    title: 'optional',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: []
  }
];

// =============================================================================
// SUPER HEALTH INSURANCE: LIMITATIONS & MUST KNOW
// =============================================================================
export const SBI_SUPER_HEALTH_LIMITATIONS = {
  heading: 'LIMITATIONS & WAITING PERIODS',
  subheading: 'Terms, Waiting Periods & Exclusions',
  items: [
    {
      id: 'initial-waiting-period',
      title: 'Initial Waiting Period',
      durationTag: '30 DAYS',
      summary: 'A standard waiting period of 30 days applies to all illnesses from policy inception, except accidental hospitalizations which are covered from Day 1.',
      highlight: 'Accidental injuries covered immediately from Day 1.'
    },
    {
      id: 'specific-illness-waiting-period',
      title: 'Specified Illnesses / Slow-Growing Ailments',
      durationTag: '24 MONTHS',
      summary: 'Specified medical conditions and surgeries have a 24-month waiting period before becoming eligible for claims.',
      diseaseList: [
        'Cataract & Eye Surgeries',
        'Hernia, Hydrocele, Piles & Fistula',
        'Joint Replacements (unless accidental)',
        'Kidney & Gallbladder Stones',
        'Benign Prostatic Hypertrophy (BPH)',
        'ENT & Sinus Surgeries'
      ]
    },
    {
      id: 'ped-waiting-period',
      title: 'Pre-Existing Diseases (PED)',
      durationTag: '24 TO 36 MONTHS',
      summary: 'Pre-existing medical conditions disclosed at the time of proposal are covered after 24 to 36 months of continuous coverage as per the selected plan variant.',
      highlight: 'Continuous coverage with portability credit recognized.'
    },
    {
      id: 'general-exclusions',
      title: 'General Permanent Exclusions',
      durationTag: 'STANDARD EXCLUSIONS',
      summary: 'Expenses incurred for non-standard medical conditions or unproven procedures are excluded under the policy terms.',
      exclusionsList: [
        'Cosmetic or aesthetic surgeries unless medically necessitated by injury',
        'Intentional self-injury, suicide attempts, or breach of law',
        'Hazardous or professional adventure sports',
        'Non-prescription drugs, experimental or unproven therapies'
      ]
    }
  ]
};

export const SBI_SUPER_HEALTH_MUST_KNOW = {
  heading: 'MUST KNOW DETAILS',
  subheading: 'Key product takeaways',
  items: [
    {
      id: 'health-multiplier-takeaway',
      icon: '⚡',
      title: 'Health Multiplier (Up to 3X Coverage)',
      summary: 'Multiplies Sum Insured up to 3 times for specified serious illnesses without any additional premium.'
    },
    {
      id: 'unlimited-reinsure',
      icon: '🔄',
      title: 'Unlimited Reinsure Benefit',
      summary: 'Unlimited reinstatement during the policy year for eligible claims, covering both related and unrelated illnesses.'
    },
    {
      id: 'claims-shield-takeaway',
      icon: '🛡️',
      title: 'Claims Shield for Consumables',
      summary: 'Covers non-payable medical consumables like gloves, masks, and surgical disposables, dramatically reducing out-of-pocket costs.'
    },
    {
      id: 'pre-post-hospitalization-window',
      icon: '📅',
      title: '60 Days Pre & 180 Days Post Hospitalization',
      summary: 'Industry-leading 180-day post-hospitalization coverage window ensures follow-up care and recovery are stress-free.'
    },
    {
      id: 'domestic-air-ambulance',
      icon: '🚁',
      title: 'Air Ambulance Coverage up to ₹10 Lakh',
      summary: 'Emergency domestic air ambulance coverage helps transport critical patients from remote locations to advanced medical centers.'
    },
    {
      id: 'wellness-rewards',
      icon: '💡',
      title: 'Wellness Rewards & AI Fitness Coach',
      summary: 'Access AI fitness coaching, dietary e-consultations, gym discounts, and step-based renewal discounts.'
    }
  ]
};

// =============================================================================
// AROGYA SUPREME: BEST SUITED FOR
// =============================================================================
export const SBI_AROGYA_SUPREME_BEST_SUITED_FOR = {
  heading: 'PERFECT FOR',
  subheading: 'Who is this plan perfect for?',
  description: 'Target customer profiles and ideal family scenarios for SBI Arogya Supreme.',
  profiles: [
    {
      title: 'Individuals & Multi-Generational Families',
      icon: '👨‍👩‍👧‍👦',
      summary: 'Individuals and families looking to cover spouse, dependent children, parents, and parents-in-law under flexible 1, 2, or 3-year tenures.',
      badge: 'Family Floater',
      highlights: [
        'Covers self, spouse, dependent children, parents and parents-in-law',
        'Available in 1, 2, or 3-year policy tenure options with tenure discounts',
        'Single Private AC Room with room upgrade options'
      ]
    },
    {
      title: 'Patients Needing Comprehensive Day Care & Advance Procedures',
      icon: '🔬',
      summary: 'Patients requiring coverage for 537 listed day-care procedures, robotic surgeries, stem cell therapies, or bariatric surgery.',
      badge: '537 Day Care',
      highlights: [
        '537 day-care procedures covered up to Sum Insured',
        'Modern treatments including robotic surgery, stem cell therapy & oral chemotherapy',
        'Genetic disorder (up to ₹1 Lakh) & internal congenital anomaly covered'
      ]
    },
    {
      title: 'Travelers Requiring Domestic Emergency Medical Evacuation',
      icon: '🚑',
      summary: 'Customers traveling across India who benefit from air ambulance, emergency medical evacuation beyond 150 km, and compassionate visit air fare.',
      badge: 'Emergency Services',
      highlights: [
        'Emergency medical evacuation & air ambulance for travel beyond 150 km',
        'Compassionate visit air fare covered up to ₹20,000',
        'Recovery benefit of up to ₹10,000 for hospital stay over 10 days'
      ]
    },
    {
      title: 'Policyholders Wanting Modular Optional Riders',
      icon: '🛡️',
      summary: 'Customers wanting customizable hospital cash (₹500–₹5,000/day), major illness cover (up to ₹25 Lakh), and NCB protector.',
      badge: 'Customizable Riders',
      highlights: [
        'Hospital cash allowance up to ₹5,000/day and Major Illness cover up to ₹25 Lakh',
        'Enhanced Cumulative Bonus up to 200% and NCB Protector rider',
        'Additional Sum Insured for accidental hospitalization (1.5X or 2X)'
      ]
    }
  ]
};

// =============================================================================
// AROGYA SUPREME EXACT 4-SECTION POLICY BENEFITS ARCHITECTURE
// 1. MOST IMPORTANT (13 Benefits)
// 2. valueAdded (5 Benefits)
// 3. ADDITIONAL (5 Waiting Periods & Special Conditions)
// 4. optional (6 Optional Covers)
// =============================================================================
export const SBI_AROGYA_SUPREME_FEATURES_SECTIONS = [
  // ---------------------------------------------------------------------------
  // 1. MOST IMPORTANT
  // ---------------------------------------------------------------------------
  {
    id: 'most-important',
    title: 'MOST IMPORTANT',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'who-can-buy',
        title: 'Who Can Buy',
        subtitle: 'Individual & Family Floater Options',
        badge: 'FAMILY & INDIVIDUAL',
        iconType: 'users',
        summary: 'The policy can be purchased by an individual for themselves or eligible family members including spouse, dependent children, parents and parents-in-law.',
        points: [
          'The policy can be purchased by an individual for themselves or eligible family members.',
          'Covers spouse, dependent children, parents and parents-in-law.',
          'Flexible individual and family floater coverage formats available.'
        ]
      },
      {
        id: 'entry-age',
        title: 'Entry Age',
        subtitle: 'Adults 18 to 65 Years & Children 91 Days to 25 Years',
        badge: '18 TO 65 YRS',
        iconType: 'calendar',
        summary: 'Adults: 18 to 65 years. Dependent children: 91 days to 25 years.',
        points: [
          'Adults: 18 to 65 years.',
          'Dependent children: 91 days to 25 years.',
          'Lifelong renewability available subject to policy terms.'
        ]
      },
      {
        id: 'tenure-options',
        title: 'Tenure Options',
        subtitle: '1 Year, 2 Years or 3 Years Policy Tenures',
        badge: '1, 2 OR 3 YEARS',
        iconType: 'clock',
        summary: 'Policy tenure options are 1 year, 2 years or 3 years.',
        points: [
          'Policy tenure options are 1 year, 2 years or 3 years.',
          'Multi-year discounts available on 2-year and 3-year tenures.',
          'Guaranteed premium lock-in benefits for multi-year options.'
        ]
      },
      {
        id: 'room-rent-boarding',
        title: 'Room Rent & Boarding',
        subtitle: 'Single Private AC Room with Upgrade Option',
        badge: 'SINGLE PRIVATE AC',
        iconType: 'home',
        summary: 'Single Private AC Room is available, with an upgrade option subject to applicable policy terms.',
        points: [
          'Single Private AC Room is available.',
          'Upgrade option available subject to applicable policy terms.',
          'No proportionate deductions applied within eligible category.'
        ]
      },
      {
        id: 'inpatient-hospitalization',
        title: 'In-patient Hospitalization',
        subtitle: 'ICU, Nursing, Surgeon/Anesthetist Fees & Medicines',
        badge: 'INPATIENT CARE',
        iconType: 'heart',
        summary: 'Eligible expenses including ICU/ICCU charges, nursing, surgeon/anesthetist/consultant fees, blood, oxygen, operation theatre charges, medicines and internal prosthetic devices are covered as per policy terms.',
        points: [
          'Eligible expenses including ICU/ICCU charges, nursing, surgeon/anesthetist/consultant fees.',
          'Blood, oxygen, operation theatre charges, medicines and internal prosthetic devices covered.',
          'Minimum 24 hours in-patient hospitalization required.'
        ]
      },
      {
        id: 'mental-healthcare-hiv',
        title: 'Mental Healthcare & HIV/AIDS Cover',
        subtitle: 'Mental Illness & HIV/AIDS Hospitalization Covered',
        badge: 'MENTAL HEALTH & HIV',
        iconType: 'activity',
        summary: 'Eligible hospitalization and treatment expenses related to mental illness and HIV/AIDS are covered up to the applicable Sum Insured.',
        points: [
          'Eligible hospitalization and treatment expenses related to mental illness covered.',
          'HIV/AIDS treatment expenses covered up to the applicable Sum Insured.',
          'Comprehensive clinical and psychiatric protection.'
        ]
      },
      {
        id: 'genetic-internal-congenital',
        title: 'Genetic Disorder & Internal Congenital Anomaly',
        subtitle: 'Genetic Disorders up to ₹1 Lakh & Congenital up to 25% SI',
        badge: 'GENETIC & CONGENITAL',
        iconType: 'shield',
        summary: 'Genetic disorder coverage is available up to ₹1 lakh, while internal congenital disease coverage is available up to 25% of the Sum Insured, subject to applicable terms.',
        points: [
          'Genetic disorder coverage is available up to ₹1 lakh.',
          'Internal congenital disease coverage is available up to 25% of the Sum Insured.',
          'Subject to applicable policy terms and conditions.'
        ]
      },
      {
        id: 'bariatric-advance-procedures',
        title: 'Bariatric Surgery & Advance Procedures',
        subtitle: 'Robotic Surgery, Stem Cell Therapy & Oral Chemotherapy',
        badge: 'ADVANCED PROCEDURES',
        iconType: 'cpu',
        summary: 'Eligible bariatric surgery and advanced procedures such as robotic surgery, stem cell therapy and oral chemotherapy are covered subject to specified criteria and policy terms.',
        points: [
          'Eligible bariatric surgery covered subject to specified medical criteria.',
          'Advanced procedures including robotic surgery, stem cell therapy and oral chemotherapy covered.',
          'Modern medical treatment technologies supported.'
        ]
      },
      {
        id: 'cataract-treatment',
        title: 'Cataract Treatment',
        subtitle: 'Up to ₹1,00,000 Coverage Per Eye',
        badge: 'UP TO ₹1 LAKH/EYE',
        iconType: 'smile',
        summary: 'Cataract treatment is covered up to ₹1,00,000 per eye, subject to policy terms.',
        points: [
          'Cataract treatment is covered up to ₹1,00,000 per eye.',
          'Covers advanced monofocal and multifocal lens procedures.',
          'Subject to applicable policy waiting period.'
        ]
      },
      {
        id: 'pre-post-hospitalization',
        title: 'Pre & Post Hospitalization',
        subtitle: '60 Days Pre & 90 Days Post Hospitalization Expenses',
        badge: '60 & 90 DAYS',
        iconType: 'clock',
        summary: 'Eligible medical expenses are covered for up to 60 days before hospitalization and 90 days after discharge.',
        points: [
          'Pre-hospitalization medical expenses covered up to 60 days.',
          'Post-hospitalization medical expenses covered up to 90 days.',
          'Includes diagnostics, doctor consultations, and prescribed pharmacy bills.'
        ]
      },
      {
        id: 'day-care-domiciliary',
        title: 'Day Care & Domiciliary Hospitalization',
        subtitle: '537 Day Care Procedures & Home Hospitalization Covered',
        badge: '537 PROCEDURES',
        iconType: 'clipboard',
        summary: 'Eligible 537 day-care procedures and domiciliary hospitalization are covered up to the applicable Sum Insured.',
        points: [
          'Eligible 537 day-care procedures covered.',
          'Domiciliary hospitalization covered up to the applicable Sum Insured.',
          'Requires treatment in recognized hospitals or at home per medical necessity.'
        ]
      },
      {
        id: 'ambulance-organ-donor',
        title: 'Ambulance & Organ Donor',
        subtitle: 'Road Ambulance up to ₹5,000 & Organ Donor Harvesting Covered',
        badge: 'AMBULANCE & DONOR',
        iconType: 'truck',
        summary: 'Road ambulance is covered up to ₹5,000 per hospitalization. Eligible organ donor hospitalization/harvesting expenses are covered as per policy terms.',
        points: [
          'Road ambulance is covered up to ₹5,000 per hospitalization.',
          'Eligible organ donor hospitalization and harvesting expenses are covered.',
          'Facilitates emergency transit and critical life-saving transplants.'
        ]
      },
      {
        id: 'ayush-treatment',
        title: 'AYUSH Treatment',
        subtitle: 'Ayurveda, Yoga, Unani, Siddha and Homeopathy',
        badge: 'AYUSH COVERED',
        iconType: 'globe',
        summary: 'Eligible inpatient hospitalization expenses for Ayurveda, Yoga, Unani, Siddha and Homeopathy treatments are covered.',
        points: [
          'Inpatient hospitalization expenses for Ayurveda, Yoga, Unani, Siddha and Homeopathy treatments covered.',
          'Must be availed in recognized government or accredited AYUSH healthcare facilities.',
          'Covered up to the applicable Sum Insured.'
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
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'recovery-benefit-eopinion',
        title: 'Recovery Benefit & E-Opinion',
        subtitle: '₹10,000 Recovery Benefit & Up to 4 E-Opinions',
        badge: 'RECOVERY & E-OPINION',
        iconType: 'award',
        summary: 'If hospitalization exceeds 10 consecutive days, a recovery benefit of up to ₹10,000 is available. The plan also provides up to 4 E-Opinions from panel doctors, subject to policy terms.',
        points: [
          'If hospitalization exceeds 10 consecutive days, a recovery benefit of up to ₹10,000 is available.',
          'Up to 4 E-Opinions from panel doctors for critical diagnosis.',
          'Provides secondary specialist guidance and recuperation support.'
        ]
      },
      {
        id: 'domestic-emergency-services',
        title: 'Domestic Emergency Services',
        subtitle: 'Emergency Evacuation, Air Ambulance & Compassionate Visit',
        badge: 'EMERGENCY EVACUATION',
        iconType: 'truck',
        summary: 'For travel beyond 150 km, eligible emergency medical evacuation, air ambulance and compassionate visit services are available. Compassionate visit air fare can be covered up to ₹20,000, subject to applicable terms.',
        points: [
          'For travel beyond 150 km from residence.',
          'Emergency medical evacuation and domestic air ambulance covered.',
          'Compassionate visit air fare covered up to ₹20,000, subject to applicable terms.'
        ]
      },
      {
        id: 'preventive-health-checkup',
        title: 'Preventive Health Check-up',
        subtitle: 'Available from 1st Renewal Year Onwards',
        badge: '1ST RENEWAL ONWARDS',
        iconType: 'clipboard',
        summary: 'Preventive health check-up is available from the 1st renewal year onwards, as per applicable terms.',
        points: [
          'Preventive health check-up is available from the 1st renewal year onwards.',
          'Covers comprehensive diagnostic tests at designated network centers.',
          'Promotes proactive healthcare monitoring.'
        ]
      },
      {
        id: 'cumulative-bonus',
        title: 'Cumulative Bonus',
        subtitle: '15% per Claim-Free Year up to 100% (No Claim Discount 2%/Yr)',
        badge: 'UP TO 100% BONUS',
        iconType: 'trending',
        summary: 'For every claim-free year, 15% of the Basic Sum Insured is added as cumulative bonus, up to a maximum of 100%. A No Claim Discount option of 2% per year may also be available as applicable.',
        points: [
          'For every claim-free year, 15% of the Basic Sum Insured is added as cumulative bonus, up to a maximum of 100%.',
          'A No Claim Discount option of 2% per year may also be available as applicable.',
          'Rewards healthy lifestyle with expanded cover or lower premiums.'
        ]
      },
      {
        id: 'discounts',
        title: 'Discounts',
        subtitle: 'Family, Loyalty & Long-Term Policy Discounts',
        badge: 'MULTI-DISCOUNTS',
        iconType: 'dollar',
        summary: 'Applicable Family Discount, Loyalty Discount and Long-Term Policy Discount are available subject to plan terms.',
        points: [
          'Family discount for multi-member policies.',
          'Loyalty discount for existing SBI General policyholders.',
          'Long-term policy discounts on 2-year and 3-year tenures.'
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
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'initial-waiting-period-30-days',
        title: 'Initial Waiting Period — 30 Days',
        subtitle: '30 Days Initial Waiting Period (Accidents Covered Day 1)',
        badge: '30 DAYS',
        iconType: 'clock',
        summary: '30 days, except for accidents.',
        points: [
          '30 days initial waiting period applies to all illnesses.',
          'Accidental hospitalizations covered immediately from Day 1.',
          'Subject to standard IRDAI guidelines.'
        ]
      },
      {
        id: 'specific-illnesses-2-years',
        title: 'Specific Illnesses — 2 Years',
        subtitle: '2-Year Waiting Period for Specified Slow-Growing Illnesses',
        badge: '2 YEARS',
        iconType: 'clock',
        summary: '2 years.',
        points: [
          '2 years waiting period for specified illnesses and surgeries.',
          'Covers cataract, hernia, joint replacements, stones, and ENT procedures.',
          'Portability credit recognized for previous continuous coverage.'
        ]
      },
      {
        id: 'ped-3-years',
        title: 'Pre-existing Diseases (PED) — 3 Years',
        subtitle: '3-Year Waiting Period for Pre-Existing Conditions',
        badge: '3 YEARS',
        iconType: 'clock',
        summary: '3 years.',
        points: [
          'Pre-existing diseases declared at proposal are covered after 3 years.',
          'Continuous policy renewals without break required.',
          'Subject to medical underwriting terms.'
        ]
      },
      {
        id: 'hypertension-diabetes-cardiac-90-days',
        title: 'Hypertension, Diabetes & Cardiac Condition — 90 Days',
        subtitle: '90-Day Waiting Period Where Applicable',
        badge: '90 DAYS',
        iconType: 'clock',
        summary: '90 days, where applicable under the policy terms.',
        points: [
          '90 days waiting period for hypertension, diabetes, and cardiac conditions.',
          'Applicable as per specific policy conditions and plan options.',
          'Subject to disclosure and plan schedule.'
        ]
      },
      {
        id: 'covid-19-15-days',
        title: 'COVID-19 — 15 Days',
        subtitle: '15-Day Waiting Period for COVID-19 Treatment',
        badge: '15 DAYS',
        iconType: 'clock',
        summary: '15 days, subject to applicable policy terms.',
        points: [
          '15 days waiting period for COVID-19 hospitalization.',
          'Subject to applicable policy terms and diagnostic certification.',
          'Covers in-patient medical care and oxygen therapy.'
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 4. optional
  // ---------------------------------------------------------------------------
  {
    id: 'optional',
    title: 'optional',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'hospital-cash-benefit',
        title: 'Hospital Cash Benefit',
        subtitle: '₹500 to ₹5,000 Daily Allowance during Hospitalization',
        badge: 'DAILY CASH',
        iconType: 'credit',
        summary: 'Daily hospital cash benefit options ranging from ₹500 to ₹5,000 may be selected for applicable durations.',
        points: [
          'Daily hospital cash benefit options ranging from ₹500 to ₹5,000.',
          'Payable for each continuous 24 hours of hospitalization.',
          'Helps manage incidental daily expenses.'
        ]
      },
      {
        id: 'major-illness-benefit',
        title: 'Major Illness Benefit',
        subtitle: 'Up to 100% of Sum Insured (Max ₹25 Lakh)',
        badge: 'UP TO ₹25 LAKH',
        iconType: 'zap',
        summary: 'Coverage of up to 100% of the Sum Insured, subject to a maximum of ₹25 lakh, as applicable.',
        points: [
          'Coverage of up to 100% of the Sum Insured.',
          'Subject to a maximum of ₹25 lakh, as applicable.',
          'Lump-sum payout upon diagnosis of listed critical illnesses.'
        ]
      },
      {
        id: 'additional-si-accidental',
        title: 'Additional Sum Insured for Accidental Hospitalization',
        subtitle: '1.5X or 2X Additional Coverage for Accidental Injuries',
        badge: '1.5X OR 2X SI',
        iconType: 'shield',
        summary: 'Additional coverage of 1.5X or 2X of the Base Sum Insured may be available.',
        points: [
          'Additional coverage of 1.5X or 2X of the Base Sum Insured.',
          'Activated in the event of accidental hospitalization.',
          'Enhances financial safety net for trauma care.'
        ]
      },
      {
        id: 'enhanced-cumulative-bonus-optional',
        title: 'Enhanced Cumulative Bonus',
        subtitle: 'Increase from 50% up to 200% Maximum',
        badge: 'UP TO 200% ECB',
        iconType: 'trending',
        summary: 'Enhanced cumulative bonus can increase from 50% up to a maximum of 200%, subject to applicable terms.',
        points: [
          'Enhanced cumulative bonus can increase from 50% up to a maximum of 200%.',
          'Subject to claim-free renewal policy terms.',
          'Accelerates sum insured growth over time.'
        ]
      },
      {
        id: 'ncb-protector',
        title: 'No Claim Bonus (NCB) Protector',
        subtitle: 'Protection of Cumulative Bonus against Small Claims',
        badge: 'NCB SHIELD',
        iconType: 'shield',
        summary: 'NCB Protector option is available subject to applicable terms.',
        points: [
          'NCB Protector option is available subject to applicable terms.',
          'Safeguards accumulated cumulative bonus even if a claim is filed.',
          'Maintains high coverage cushion without bonus erosion.'
        ]
      },
      {
        id: 'copay-deductibles-options',
        title: 'Co-Payment / Deductibles Options',
        subtitle: 'Flexible Co-Pay and Deductible Choices for Premium Optimization',
        badge: 'CO-PAY / DEDUCTIBLE',
        iconType: 'dollar',
        summary: 'Applicable co-payment and deductible options can be selected as per the available plan structure.',
        points: [
          'Applicable co-payment and deductible options can be selected.',
          'Enables significant reduction in annual premium outlay.',
          'Customizable per family budget and healthcare priorities.'
        ]
      }
    ]
  }
];

// =============================================================================
// AROGYA SUPREME: LIMITATIONS & MUST KNOW
// =============================================================================
export const SBI_AROGYA_SUPREME_LIMITATIONS = {
  heading: 'LIMITATIONS & WAITING PERIODS',
  subheading: 'Terms, Waiting Periods & Exclusions',
  items: [
    {
      id: 'initial-waiting-period',
      title: 'Initial Waiting Period',
      durationTag: '30 DAYS',
      summary: '30 days initial waiting period applies to all illnesses from policy inception, except accidental hospitalizations which are covered from Day 1.',
      highlight: 'Accidental injuries covered immediately from Day 1.'
    },
    {
      id: 'specific-illnesses-waiting-period',
      title: 'Specific Illnesses / Slow-Growing Ailments',
      durationTag: '2 YEARS',
      summary: '2 years waiting period for specified slow-growing illnesses and standard planned surgeries.',
      diseaseList: [
        'Cataract & Eye Surgeries (up to ₹1 Lakh/eye)',
        'Hernia, Hydrocele, Piles & Fistula',
        'Joint Replacements & Arthritis Surgeries',
        'Kidney & Gallbladder Stones',
        'Benign Prostatic Hypertrophy (BPH)',
        'ENT & Sinus Surgeries'
      ]
    },
    {
      id: 'ped-waiting-period',
      title: 'Pre-existing Diseases (PED)',
      durationTag: '3 YEARS',
      summary: 'Pre-existing medical conditions declared at the time of proposal are covered after 3 years (36 months) of continuous coverage.',
      highlight: 'Full portability benefits recognized from prior continuous health policies.'
    },
    {
      id: 'hypertension-diabetes-waiting',
      title: 'Hypertension, Diabetes & Cardiac Condition',
      durationTag: '90 DAYS',
      summary: '90 days waiting period applies for hypertension, diabetes, and cardiac condition where specified under the policy terms.'
    },
    {
      id: 'covid-19-waiting',
      title: 'COVID-19 Treatment',
      durationTag: '15 DAYS',
      summary: '15 days waiting period applies for COVID-19 hospitalization coverage.'
    }
  ]
};

export const SBI_AROGYA_SUPREME_MUST_KNOW = {
  heading: 'MUST KNOW DETAILS',
  subheading: 'Key product takeaways',
  items: [
    {
      id: 'day-care-procedures-537',
      icon: '🏥',
      title: '537 Day Care Procedures Covered',
      summary: 'Comprehensive list of 537 day-care procedures and domiciliary hospitalization covered up to the Sum Insured.'
    },
    {
      id: 'advance-procedures-bariatric',
      icon: '🔬',
      title: 'Bariatric & Robotic Procedures',
      summary: 'Eligible bariatric surgery, robotic surgery, stem cell therapy, and oral chemotherapy covered under modern treatment guidelines.'
    },
    {
      id: 'domestic-evacuation-emergency',
      icon: '🚁',
      title: 'Domestic Emergency Evacuation (>150 km)',
      summary: 'Emergency evacuation, air ambulance, and compassionate visit airfare up to ₹20,000 for travel beyond 150 km.'
    },
    {
      id: 'recovery-benefit-10k',
      icon: '💰',
      title: '₹10,000 Recovery Benefit',
      summary: 'Recovery benefit of up to ₹10,000 provided if hospitalization exceeds 10 consecutive days, along with up to 4 E-Opinions.'
    },
    {
      id: 'cataract-1lakh',
      icon: '👁️',
      title: 'Cataract Cover up to ₹1 Lakh/Eye',
      summary: 'Dedicated cataract surgery coverage up to ₹1,00,000 per eye.'
    },
    {
      id: 'modular-optional-covers',
      icon: '🛡️',
      title: '6 Modular Optional Covers',
      summary: 'Hospital cash, Major Illness (up to ₹25 Lakh), Accidental Sum Insured (1.5X/2X), ECB (up to 200%), and NCB Protector.'
    }
  ]
};

// =============================================================================
// MASTER SBI PLANS DATA CONFIGURATION
// =============================================================================
export const SBI_PLANS_DATA = {
  'super-health-insurance': {
    planId: 'super-health-insurance',
    planName: 'Super Health Insurance',
    companyName: 'SBI General Insurance',
    fullName: 'SBI General Super Health Insurance',
    tagline: 'Comprehensive healthcare coverage with Health Multiplier up to 3X, unlimited Reinsure Benefit, and Claims Shield consumables protection.',
    coverage: '₹3 Lakh - ₹2 Crore',
    premium: '₹7,200/year',
    benefits: [
      'Sum Insured options from ₹3 Lakh to ₹2 Crore',
      'Health Multiplier Benefit (Up to 3X for serious illnesses)',
      'Unlimited Reinsure Benefit (Related & Unrelated claims)',
      'Claims Shield Consumables & 60/180 Days Pre-Post Hospitalization'
    ],
    details: {
      eligibility: 'Adults 18+ to Lifelong | Children 91 days to 30 years',
      waitingPeriod: '30 Days initial, 24 Months Specified Diseases, 24-36 Months PED',
      roomRent: 'Single Private Room covered / No proportionate deductions',
      hospitalization: 'Inpatient treatment expenses covered up to Sum Insured',
      prePostHospital: '60 Days Pre & 180 Days Post Hospitalization',
      dayCare: 'All Day Care & Domiciliary procedures covered',
      noClaimBonus: 'Enhanced Cumulative Bonus (ECB) up to 50% per year',
      exclusions: 'Cosmetic surgery, intentional self-injury, experimental therapies'
    },
    featuresSections: SBI_SUPER_HEALTH_FEATURES_SECTIONS,
    reportCard: SBI_SHARED_REPORT_CARD,
    companyStrength: SBI_SHARED_COMPANY_STRENGTH,
    limitationsWaitingPeriods: SBI_SUPER_HEALTH_LIMITATIONS,
    mustKnow: SBI_SUPER_HEALTH_MUST_KNOW,
    bestSuitedFor: SBI_SUPER_HEALTH_BEST_SUITED_FOR,
    sources: SBI_SOURCES,
    uiConfig: {
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  },
  'arogya-supreme': {
    planId: 'arogya-supreme',
    planName: 'Arogya Supreme',
    companyName: 'SBI General Insurance',
    fullName: 'SBI General Arogya Supreme',
    tagline: 'Comprehensive health coverage with 537 Day Care procedures, Single Private AC Room, domestic emergency evacuation, and 6 modular optional covers.',
    coverage: '₹1 Lakh - ₹5 Crore',
    premium: '₹6,800/year',
    benefits: [
      'Single Private AC Room with upgrade option',
      '537 Day Care procedures & Domiciliary Hospitalization covered',
      'Genetic Disorder (₹1 Lakh) & Internal Congenital (25% SI) covered',
      '60 Days Pre & 90 Days Post Hospitalization covered',
      'Recovery Benefit (₹10,000) & Domestic Emergency Evacuation (>150 km)',
      '6 Optional Covers: Hospital Cash, Major Illness (up to ₹25 Lakh), NCB Protector'
    ],
    details: {
      eligibility: 'Adults 18 to 65 years | Children 91 days to 25 years',
      waitingPeriod: '30 Days initial, 2 Years Specified Diseases, 3 Years PED, 90 Days Cardiac/Diabetes, 15 Days COVID-19',
      roomRent: 'Single Private AC Room with upgrade option',
      hospitalization: 'In-patient treatment expenses covered up to Sum Insured',
      prePostHospital: '60 Days Pre & 90 Days Post Hospitalization covered',
      dayCare: '537 Day Care procedures covered up to Sum Insured',
      noClaimBonus: 'Cumulative Bonus 15% per claim-free year up to 100% (No Claim Discount 2%/year)',
      exclusions: 'Cosmetic surgery, intentional self-injury, non-prescription drugs'
    },
    featuresSections: SBI_AROGYA_SUPREME_FEATURES_SECTIONS,
    reportCard: SBI_SHARED_REPORT_CARD,
    companyStrength: SBI_SHARED_COMPANY_STRENGTH,
    limitationsWaitingPeriods: SBI_AROGYA_SUPREME_LIMITATIONS,
    mustKnow: SBI_AROGYA_SUPREME_MUST_KNOW,
    bestSuitedFor: SBI_AROGYA_SUPREME_BEST_SUITED_FOR,
    sources: SBI_SOURCES,
    uiConfig: {
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  },
  'health-alpha': {
    planId: 'health-alpha',
    planName: 'Health Alpha',
    companyName: 'SBI General Insurance',
    fullName: 'SBI General Health Alpha',
    tagline: 'Flagship health protection featuring Endless Sum Insured, Restore Benefit, Day Care procedures, and 8 comprehensive modular lifestyle add-ons.',
    coverage: '₹5 Lakh - ₹5 Crore',
    premium: '₹8,500/year',
    benefits: [
      'Hospitalization Cover with Single Private AC Room & ICU',
      'Restore Benefit & Endless Sum Insured (Unlimited Reinstatement)',
      '60 Days Pre & 180 Days Post Hospitalization covered',
      'High Cumulative Bonus & Built-In Continuity Benefits',
      'Bariatric Surgery, Modern Treatments & Home Health Care',
      '8 Optional Covers: Adventure Sports, Gym Injury, Prosthetics & Loan Protector'
    ],
    details: {
      eligibility: 'Adults 18 to 65 years | Children 91 days to 30 years',
      waitingPeriod: '30 Days initial, 24 Months Specified Diseases, 24-36 Months PED',
      roomRent: 'Single Private AC Room covered / No proportionate deductions',
      hospitalization: 'Inpatient treatment expenses covered up to Sum Insured',
      prePostHospital: '60 Days Pre & 180 Days Post Hospitalization covered',
      dayCare: 'All Day Care procedures covered up to Sum Insured',
      noClaimBonus: 'High Cumulative Bonus on base Sum Insured per claim-free year',
      exclusions: 'Intentional self-injury, cosmetic surgeries, unproven experimental therapies'
    },
    featuresSections: [
      // ---------------------------------------------------------------------------
      // 1. MOST IMPORTANT (10 Benefits)
      // ---------------------------------------------------------------------------
      {
        id: 'most-important',
        title: 'MOST IMPORTANT',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        items: [
          {
            id: 'entry-age',
            title: 'Entry Age',
            subtitle: 'Adults 18 to 65 Years & Children 91 Days to 30 Years',
            badge: '18 YRS TO LIFELONG',
            iconType: 'calendar',
            summary: 'Minimum entry age is 18 years for adults and 91 days to 30 years for dependent children, with lifelong renewability.',
            points: [
              'Adults: 18 to 65 years with lifelong renewability.',
              'Dependent children: 91 days to 30 years.',
              'Available for individuals and family floater structures.'
            ]
          },
          {
            id: 'policy-tenure',
            title: 'Policy Tenure',
            subtitle: 'Flexible 1, 2, or 3-Year Policy Options',
            badge: '1, 2 OR 3 YEARS',
            iconType: 'clock',
            summary: 'Available in 1-year, 2-year, and 3-year policy tenures with attractive multi-year premium discounts.',
            points: [
              'Flexible 1, 2, or 3-year policy tenure options.',
              'Long-term policy discounts on 2-year and 3-year options.',
              'Guaranteed premium lock-in benefits during multi-year tenure.'
            ]
          },
          {
            id: 'sum-insured-options',
            title: 'Sum Insured Options',
            subtitle: 'Wide Sum Insured Range from ₹5 Lakh to ₹5 Crore',
            badge: '₹5 LAKH – ₹5 CRORE',
            iconType: 'credit',
            summary: 'Offers comprehensive Sum Insured slabs ranging from ₹5 lakh up to ₹5 crore to fit individual and family healthcare needs.',
            points: [
              'Extensive Sum Insured options from ₹5 Lakh to ₹5 Crore.',
              'Suitable for individual and multi-member family floater plans.',
              'Higher sum insured slabs protect against severe medical inflation.'
            ]
          },
          {
            id: 'hospitalization-cover',
            title: 'Hospitalization Cover',
            subtitle: 'In-Patient Care, Room Rent, ICU, Nursing & Doctor Fees',
            badge: 'INPATIENT CARE',
            iconType: 'home',
            summary: 'Covers in-patient medical expenses including eligible room rent, ICU/ICCU charges, nursing, surgeon/doctor fees, medicines, and medical consumables.',
            points: [
              'Covers room rent and ICU/ICCU charges without proportionate deductions on eligible rooms.',
              'Doctor fees, surgeon/anesthetist fees, operation theatre, and nursing expenses covered.',
              'Requires a minimum of 24 hours in-patient hospitalization.'
            ]
          },
          {
            id: 'day-care-treatment',
            title: 'Day Care Treatment',
            subtitle: 'All Listed Day Care Procedures Covered',
            badge: 'DAY CARE PROCEDURES',
            iconType: 'activity',
            summary: 'Medical treatments and surgical procedures requiring less than 24 hours of hospitalization due to advanced medical technology are fully covered.',
            points: [
              'All recognized day-care surgeries and technological procedures covered.',
              'Treatment undertaken under general/local anesthesia in a hospital.',
              'Covers chemotherapy, radiotherapy, dialysis, cataract, and specialized day-care surgeries.'
            ]
          },
          {
            id: 'pre-post-hospitalization',
            title: 'Pre & Post Hospitalization',
            subtitle: '60 Days Pre & 180 Days Post Hospitalization Medical Expenses',
            badge: '60 & 180 DAYS',
            iconType: 'clock',
            summary: 'Eligible medical expenses are covered for up to 60 days before hospital admission and up to 180 days after hospital discharge.',
            points: [
              'Pre-hospitalization expenses covered up to 60 days.',
              'Post-hospitalization medical expenses covered up to 180 days.',
              'Includes specialist diagnostic tests, doctor consultations, and prescribed follow-up medications.'
            ]
          },
          {
            id: 'domiciliary-treatment',
            title: 'Domiciliary Treatment',
            subtitle: 'Medical Treatment at Home Covered up to Sum Insured',
            badge: 'DOMICILIARY CARE',
            iconType: 'heart',
            summary: 'Covers medical treatment taken at home when hospital accommodation is unavailable or the patient cannot be moved to a hospital.',
            points: [
              'Covers home hospitalization prescribed by the treating medical practitioner.',
              'Requires medical condition to exceed 3 consecutive days of treatment.',
              'Covered up to the applicable Sum Insured as per policy terms.'
            ]
          },
          {
            id: 'ayush-treatment',
            title: 'AYUSH Treatment',
            subtitle: 'Ayurveda, Yoga, Unani, Siddha and Homeopathy Treatments',
            badge: 'AYUSH COVERED',
            iconType: 'globe',
            summary: 'In-patient hospitalization expenses for alternative medicine treatments under Ayurveda, Yoga, Unani, Siddha, and Homeopathy are covered.',
            points: [
              'Covers in-patient treatment in recognized government/accredited AYUSH hospitals.',
              'Available up to the base Sum Insured.',
              'Holistic health recovery through recognized alternative medicine streams.'
            ]
          },
          {
            id: 'restore-benefit',
            title: 'Restore Benefit',
            subtitle: '100% Automatic Refill of Base Sum Insured on Exhaustion',
            badge: '100% RESTORE',
            iconType: 'refresh',
            summary: 'Automatically reinstates 100% of the base Sum Insured once during the policy year upon complete or partial exhaustion.',
            points: [
              '100% Sum Insured restored automatically upon exhaustion.',
              'Available for subsequent eligible hospitalizations within the same policy year.',
              'Ensures continuous family protection without additional premium.'
            ]
          },
          {
            id: 'endless-sum-insured',
            title: 'Endless Sum Insured',
            subtitle: 'Unlimited Restoration of Sum Insured for Subsequent Claims',
            badge: 'ENDLESS REFILL',
            iconType: 'zap',
            summary: 'Provides unlimited reinstatement of the Sum Insured during the policy year for both related and unrelated illnesses, ensuring uninterrupted medical security.',
            points: [
              'Unlimited times restoration of Sum Insured in a single policy year.',
              'Applies to related and unrelated illnesses as per policy terms.',
              'Infinite coverage cushion for catastrophic medical crises.'
            ]
          }
        ]
      },

      // ---------------------------------------------------------------------------
      // 2. valueAdded (7 Benefits)
      // ---------------------------------------------------------------------------
      {
        id: 'value-added',
        title: 'valueAdded',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        items: [
          {
            id: 'unlimited-flexibility',
            title: 'Unlimited Flexibility',
            subtitle: 'Customizable Sum Insured, Deductibles & Co-Pay Options',
            badge: 'CUSTOMIZABLE',
            iconType: 'shield',
            summary: 'Allows policyholders to tailor their health coverage with flexible deductible choices, voluntary co-pay options, and modular plan add-ons.',
            points: [
              'Choose voluntary deductibles to optimize annual premium outlay.',
              'Select room category preferences and rider bundles.',
              'Custom-fit health protection tailored to personal financial goals.'
            ]
          },
          {
            id: 'high-cumulative-bonus',
            title: 'High Cumulative Bonus',
            subtitle: 'Substantial Sum Insured Growth for Claim-Free Years',
            badge: 'CUMULATIVE BONUS',
            iconType: 'trending',
            summary: 'Earns substantial cumulative bonus increments on the base Sum Insured for every claim-free policy year up to the maximum specified limit.',
            points: [
              'Increases base Sum Insured for every claim-free policy year.',
              'Multiplies coverage protection without requiring extra premium.',
              'Subject to continuous renewals without break.'
            ]
          },
          {
            id: 'welcome-discount',
            title: 'Welcome Discount',
            subtitle: 'Special Introductory Savings on New Policy Purchases',
            badge: 'WELCOME DISCOUNT',
            iconType: 'dollar',
            summary: 'Exclusive welcome discount on first-year premiums for new policyholders entering the Health Alpha plan.',
            points: [
              'Upfront premium discount on new policy enrollments.',
              'Combinable with digital purchase and family floater discounts.',
              'Immediate cost optimization for first-time policyholders.'
            ]
          },
          {
            id: 'built-in-continuity-benefit',
            title: 'Built-In Continuity Benefit',
            subtitle: 'Seamless Portability & Waiting Period Carry-Forward',
            badge: 'CONTINUITY BENEFIT',
            iconType: 'clipboard',
            summary: 'Ensures uninterrupted waiting period credits and accumulated bonuses when porting from existing health insurance policies.',
            points: [
              'Full waiting period credit transferred from previous insurers.',
              'Cumulative bonus portability support as per IRDAI guidelines.',
              'Hassle-free migration with continuous coverage recognition.'
            ]
          },
          {
            id: 'preventive-care',
            title: 'Preventive Care',
            subtitle: 'Annual Health Check-Ups & Proactive Wellness Monitoring',
            badge: 'PREVENTIVE CARE',
            iconType: 'clipboard',
            summary: 'Comprehensive preventive health check-up packages available annually at designated diagnostic network centers.',
            points: [
              'Annual cashless health check-up for all insured adult members.',
              'Includes vital tests: lipid profile, blood sugar, kidney function, and liver profile.',
              'Proactive health management for early disease detection.'
            ]
          },
          {
            id: 'maternity-child-care',
            title: 'Maternity & Child Care',
            subtitle: 'Delivery Expenses, New Born Baby Cover & Vaccination Support',
            badge: 'MATERNITY & NEWBORN',
            iconType: 'heart',
            summary: 'Covers normal and C-section delivery expenses, pre/post-natal care, newborn baby hospitalization, and essential childhood vaccinations.',
            points: [
              'Eligible maternity expenses including delivery and complications covered.',
              'Newborn baby coverage from Day 1 up to specified limits.',
              'Vaccination expenses supported as per applicable schedule.'
            ]
          },
          {
            id: 'personal-accident-cover',
            title: 'Personal Accident Cover',
            subtitle: 'Accidental Death & Permanent Total Disablement Protection',
            badge: 'ACCIDENT COVER',
            iconType: 'award',
            summary: 'Provides financial compensation in the event of accidental death or permanent total disablement resulting from an accident.',
            points: [
              'Lump-sum compensation in case of accidental death.',
              'Covers Permanent Total Disablement (PTD) and Permanent Partial Disablement (PPD).',
              'Enhanced accidental security for the primary earning member.'
            ]
          }
        ]
      },

      // ---------------------------------------------------------------------------
      // 3. ADDITIONAL (6 Benefits)
      // ---------------------------------------------------------------------------
      {
        id: 'additional',
        title: 'ADDITIONAL',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        items: [
          {
            id: 'bariatric-surgery',
            title: 'Bariatric Surgery',
            subtitle: 'Medically Necessary Weight Reduction Surgery Covered',
            badge: 'BARIATRIC SURGERY',
            iconType: 'cpu',
            summary: 'Covers medically necessary bariatric surgery for severe life-threatening morbid obesity, subject to clinical guidelines.',
            points: [
              'Covered for BMI >35 with severe co-morbidities or BMI >40.',
              'Requires prescription and certification from a registered medical specialist.',
              'Subject to applicable policy waiting period and terms.'
            ]
          },
          {
            id: 'ambulance-transport',
            title: 'Ambulance & Transport',
            subtitle: 'Emergency Road & Domestic Air Ambulance Transit',
            badge: 'ROAD & AIR AMBULANCE',
            iconType: 'truck',
            summary: 'Covers emergency road ambulance charges to the nearest hospital and domestic air ambulance for critical patient transfer.',
            points: [
              'Road ambulance covered for emergency transportation to hospital.',
              'Domestic air ambulance supported for remote or critical patient evacuations.',
              'Ensures immediate life-saving transit during critical trauma or illness.'
            ]
          },
          {
            id: 'organ-donor',
            title: 'Organ Donor',
            subtitle: 'In-Patient Hospitalization of Organ Donor Covered',
            badge: 'ORGAN DONOR',
            iconType: 'smile',
            summary: 'Covers in-patient medical expenses incurred for organ harvesting and transplantation of an organ donor.',
            points: [
              'Hospitalization expenses of the donor covered up to the base Sum Insured.',
              'Conforms to the Transplantation of Human Organs Act guidelines.',
              'Supports critical organ replacement surgeries.'
            ]
          },
          {
            id: 'modern-treatments-home-care',
            title: 'Modern Treatments & Home Health Care',
            subtitle: 'Robotic Surgeries, Advanced Technologies & Home Nursing',
            badge: 'MODERN & HOME CARE',
            iconType: 'cpu',
            summary: 'Covers advanced technological treatments including robotic surgeries, immunotherapy, oral chemotherapy, and prescribed home health care.',
            points: [
              'Robotic surgery, stem cell therapy, balloon sinuplasty, and modern treatments covered.',
              'Home healthcare covered on the recommendation of treating doctor.',
              'High-tech medical procedures covered up to applicable limits.'
            ]
          },
          {
            id: 'special-covers',
            title: 'Special Covers',
            subtitle: 'Mental Healthcare, HIV/AIDS, Genetic & Congenital Disorders',
            badge: 'SPECIAL COVERAGE',
            iconType: 'shield',
            summary: 'Specialized protection for mental healthcare hospitalization, HIV/AIDS treatment, genetic disorders, and internal congenital conditions.',
            points: [
              'Mental illness hospitalization covered up to Sum Insured.',
              'HIV/AIDS and genetic disorder treatment supported as per policy wording.',
              'Internal congenital conditions covered up to applicable sub-limits.'
            ]
          },
          {
            id: 'critical-illness-daily-cash',
            title: 'Critical Illness & Hospital Daily Cash',
            subtitle: 'Lump-Sum Critical Illness Payout & Daily Hospital Allowance',
            badge: 'CRITICAL ILLNESS & CASH',
            iconType: 'credit',
            summary: 'Offers financial benefits for listed major critical illnesses along with daily cash allowances to manage routine hospital expenses.',
            points: [
              'Lump-sum critical illness benefit upon diagnosis of major ailments.',
              'Daily cash allowance for each 24 hours of hospitalization.',
              'Helps mitigate income loss and miscellaneous hospital expenses.'
            ]
          }
        ]
      },

      // ---------------------------------------------------------------------------
      // 4. optional (8 Optional Covers)
      // ---------------------------------------------------------------------------
      {
        id: 'optional',
        title: 'optional',
        gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        items: [
          {
            id: 'adventure-sports',
            title: 'Adventure Sports',
            subtitle: 'Coverage for Non-Professional Adventure Activities & Sports Injuries',
            badge: 'ADVENTURE SPORTS',
            iconType: 'zap',
            summary: 'Optional coverage for accidental injuries sustained while participating in non-professional adventure sports and recreational activities.',
            points: [
              'Covers medical treatment for injuries from recreational adventure activities.',
              'Includes scuba diving, trekking, paragliding, and rafting per guidelines.',
              'Protects adventure-seeking individuals and travelers.'
            ]
          },
          {
            id: 'gym-sports-injury',
            title: 'Gym & Sports Injury',
            subtitle: 'Medical Care for Fitness, Gym & Athletic Training Injuries',
            badge: 'SPORTS INJURY',
            iconType: 'award',
            summary: 'Provides dedicated medical expense coverage for ligament tears, fractures, and injuries sustained during gym workouts and sports training.',
            points: [
              'Covers physiotherapy, surgical repair, and rehabilitation for athletic injuries.',
              'Applies to gym workouts, marathons, and amateur athletic training.',
              'Specialized orthopaedic and sports medicine care.'
            ]
          },
          {
            id: 'reconstructive-surgery',
            title: 'Reconstructive Surgery',
            subtitle: 'Surgical Reconstruction Following Trauma or Cancer Treatment',
            badge: 'RECONSTRUCTIVE',
            iconType: 'heart',
            summary: 'Covers reconstructive surgery required to restore bodily function or structure following accidental trauma, burns, or cancer surgeries.',
            points: [
              'Covers reconstructive procedures following major accidents or burns.',
              'Post-mastectomy breast reconstruction and functional restoration supported.',
              'Subject to medical necessity certification.'
            ]
          },
          {
            id: 'prosthetics',
            title: 'Prosthetics',
            subtitle: 'External & Internal Prosthetic Devices and Mobility Aids',
            badge: 'PROSTHETICS',
            iconType: 'cpu',
            summary: 'Reimburses expenses for external and internal prosthetic devices, artificial limbs, and orthopedic mobility aids required post-surgery.',
            points: [
              'Covers artificial limbs, cochlear implants, and prosthetic devices.',
              'Supports post-amputation mobility and rehabilitation devices.',
              'Subject to specified rider limits and policy terms.'
            ]
          },
          {
            id: 'assisted-reproduction-treatment',
            title: 'Assisted Reproduction Treatment (IVF, IUI, etc.)',
            subtitle: 'Coverage for Infertility Treatments Including IVF & IUI Procedures',
            badge: 'IVF / IUI COVER',
            iconType: 'heart',
            summary: 'Provides coverage for fertility treatments including IVF, IUI, ICSI, and related diagnostic investigations after the waiting period.',
            points: [
              'Covers assisted reproductive procedures like IVF, IUI, and ICSI.',
              'Includes specialist consultations, hormonal therapy, and lab procedures.',
              'Available after continuous coverage waiting period.'
            ]
          },
          {
            id: 'loan-protector-benefit',
            title: 'Loan Protector Benefit',
            subtitle: 'Loan EMI Settlement in Event of Critical Illness or Permanent Disability',
            badge: 'LOAN PROTECTOR',
            iconType: 'credit',
            summary: 'Shields your family by covering outstanding loan EMIs for a specified period in the event of major critical illness or permanent disability.',
            points: [
              'Pays specified monthly loan EMIs during major medical recovery.',
              'Applies to home loans, car loans, and personal loans.',
              'Prevents financial distress and debt burden on the family.'
            ]
          },
          {
            id: 'home-modification',
            title: 'Home Modification',
            subtitle: 'Financial Support to Modify Living Spaces Post Permanent Disability',
            badge: 'HOME MODIFICATION',
            iconType: 'home',
            summary: 'Provides financial assistance for installing ramps, wheelchair access, bathroom modifications, and assistive infrastructure at home.',
            points: [
              'Reimburses home accessibility modifications post permanent disability.',
              'Covers wheelchair ramps, grab rails, and specialized bathroom fittings.',
              'Enables dignified and independent living during recovery.'
            ]
          },
          {
            id: 'child-education-benefit',
            title: 'Child Education Benefit',
            subtitle: 'Educational Grant for Dependent Children in Critical Events',
            badge: 'EDUCATION GRANT',
            iconType: 'users',
            summary: 'Provides a lump-sum educational grant to secure dependent children\'s ongoing school and college education in case of permanent disability or death.',
            points: [
              'Lump-sum grant to secure children\'s school or college education.',
              'Available for eligible dependent children covered under the policy.',
              'Guarantees uninterrupted educational progression for your children.'
            ]
          }
        ]
      }
    ],
    reportCard: SBI_SHARED_REPORT_CARD,
    companyStrength: SBI_SHARED_COMPANY_STRENGTH,
    limitationsWaitingPeriods: {
      heading: 'LIMITATIONS & WAITING PERIODS',
      subheading: 'Terms, Waiting Periods & Exclusions',
      items: [
        {
          id: 'initial-waiting-period',
          title: 'Initial Waiting Period',
          durationTag: '30 DAYS',
          summary: 'A standard 30-day waiting period applies to all illnesses from policy inception, except accidental hospitalizations which are covered from Day 1.',
          highlight: 'Accidental injuries covered immediately from Day 1.'
        },
        {
          id: 'specified-diseases-waiting',
          title: 'Specified Diseases / Slow-Growing Ailments',
          durationTag: '24 MONTHS',
          summary: '24-month waiting period for specified illnesses including cataract, hernia, joint replacements, and benign prostatic hypertrophy.',
          diseaseList: [
            'Cataract & Eye Surgeries',
            'Hernia, Hydrocele, Piles & Fistula',
            'Joint Replacements & Orthopaedic Surgeries',
            'Kidney & Gallbladder Stones',
            'Benign Prostatic Hypertrophy (BPH)',
            'ENT & Sinus Surgeries'
          ]
        },
        {
          id: 'ped-waiting',
          title: 'Pre-Existing Diseases (PED)',
          durationTag: '24 TO 36 MONTHS',
          summary: 'Pre-existing medical conditions declared at the time of proposal are covered after 24 to 36 months of continuous coverage.',
          highlight: 'Full portability credits recognized from prior continuous health policies.'
        },
        {
          id: 'general-exclusions',
          title: 'General Permanent Exclusions',
          durationTag: 'STANDARD EXCLUSIONS',
          summary: 'Standard non-payable exclusions apply as per regulatory guidelines.',
          exclusionsList: [
            'Cosmetic, aesthetic, or plastic surgeries unless medically necessitated by trauma',
            'Intentional self-injury, suicide attempts, or breach of law',
            'Unproven, experimental or non-prescribed drug treatments',
            'Hazardous professional sports and adventure competitions'
          ]
        }
      ]
    },
    mustKnow: {
      heading: 'MUST KNOW DETAILS',
      subheading: 'Key product takeaways',
      items: [
        {
          id: 'endless-restore',
          icon: '🔄',
          title: 'Endless Sum Insured & Restore Benefit',
          summary: 'Automatic 100% restoration plus unlimited reinstatements for both related and unrelated illnesses during the policy year.'
        },
        {
          id: 'pre-post-180',
          icon: '📅',
          title: '60 Days Pre & 180 Days Post Hospitalization',
          summary: 'Industry-leading 180-day post-hospitalization coverage window protects extended recovery and diagnostic expenses.'
        },
        {
          id: 'modular-optional-covers-8',
          icon: '🛡️',
          title: '8 Modular Optional Covers',
          summary: 'Customize with Adventure Sports, Gym Injury, Reconstructive Surgery, Prosthetics, IVF/IUI, Loan Protector, Home Modification, and Child Education.'
        },
        {
          id: 'day-care-ayush',
          icon: '🏥',
          title: 'All Day Care & AYUSH Inpatient Covered',
          summary: 'Complete coverage for advanced day-care procedures, home healthcare, and recognized AYUSH inpatient hospitalizations.'
        },
        {
          id: 'continuity-welcome-discounts',
          icon: '💡',
          title: 'Built-In Continuity & Welcome Discounts',
          summary: 'Seamless portability of waiting periods, welcome discounts for new policyholders, and multi-year tenure savings.'
        }
      ]
    },
    bestSuitedFor: {
      heading: 'PERFECT FOR',
      subheading: 'Who is this plan perfect for?',
      description: 'Target customer profiles and ideal family scenarios for SBI Health Alpha.',
      profiles: [
        {
          title: 'Families Seeking Endless Reinstatement Protection',
          icon: '👨‍👩‍👧‍👦',
          summary: 'Families needing high Sum Insured (₹5 Lakh to ₹5 Crore) with Restore Benefit and Endless Sum Insured for multiple claims.',
          badge: 'High Coverage',
          highlights: [
            'Sum Insured from ₹5 Lakh up to ₹5 Crore',
            'Endless Sum Insured for both related and unrelated illnesses',
            'Covers self, spouse, dependent children (up to 30 yrs), and parents'
          ]
        },
        {
          title: 'Active Fitness Enthusiasts & Adventure Seekers',
          icon: '⚡',
          summary: 'Individuals engaged in gym workouts, athletic training, and recreational adventure sports needing dedicated injury coverage.',
          badge: 'Sports & Adventure',
          highlights: [
            'Dedicated Adventure Sports injury coverage',
            'Gym & Sports Injury rehabilitation and surgical repair',
            'Prosthetics and orthopedic mobility support'
          ]
        },
        {
          title: 'Young Couples Planning Family Milestones (IVF & Maternity)',
          icon: '👶',
          summary: 'Couples looking for comprehensive maternity, newborn care, and optional Assisted Reproduction Treatment (IVF, IUI).',
          badge: 'Maternity & IVF',
          highlights: [
            'Maternity delivery and newborn baby care from Day 1',
            'Assisted Reproduction Treatment (IVF, IUI, ICSI) optional cover',
            'Child Education Benefit grant protection'
          ]
        },
        {
          title: 'Borrowers & Long-Term Financial Planners',
          icon: '🛡️',
          summary: 'Home/auto loan borrowers and families seeking Loan Protector EMI coverage and Home Modification support.',
          badge: 'Loan Protector',
          highlights: [
            'Loan Protector benefit pays EMIs during critical recovery',
            'Home accessibility modification assistance',
            'Multi-year policy tenure discounts up to 3 years'
          ]
        }
      ]
    },
    sources: SBI_SOURCES,
    uiConfig: {
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  }
};

export const resolveSbiPlanId = (planId) => {
  if (!planId) return null;
  const cleanId = String(planId).toLowerCase().trim();
  if (
    cleanId === 'health-alpha' ||
    cleanId === 'health alpha' ||
    cleanId === 'healthalpha' ||
    cleanId === 'sbi-health-alpha' ||
    cleanId === 'sbi-healthalpha'
  ) {
    return 'health-alpha';
  }
  if (
    cleanId === 'arogya-supreme' ||
    cleanId === 'arogya supreme' ||
    cleanId === 'arogyasupreme' ||
    cleanId === 'sbi-arogya-supreme' ||
    cleanId === 'sbi-arogyasupreme'
  ) {
    return 'arogya-supreme';
  }
  if (
    cleanId === 'super-health-insurance' ||
    cleanId === 'super-health' ||
    cleanId === 'superhealth' ||
    cleanId === 'sbi-super-health' ||
    cleanId === 'sbi-super-health-insurance'
  ) {
    return 'super-health-insurance';
  }
  return cleanId;
};

export const getSbiPlanData = (planId) => {
  const canonicalId = resolveSbiPlanId(planId);
  return SBI_PLANS_DATA[canonicalId] || null;
};


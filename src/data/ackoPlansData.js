// =============================================================================
// ACKO GENERAL INSURANCE — PLANS DATA
// (PLATINUM SUPER TOP UP, PLATINUM LITE & PLATINUM)
// Policy Benefits, Report Card, Company Strength, Limitations & Takeaways
// Sourced from official ACKO General Insurance policy terms & IRDAI public filings.
// Theme: Primary #511C53 (ACKO Purple) | Secondary #00A99D (Cyan) | Accent #E35275 (Magenta)
// =============================================================================

export const ACKO_SOURCES = [
  {
    title: "ACKO General Insurance – Public Disclosures",
    name: "ACKO General Insurance – Public Disclosures",
    url: "https://www.acko.com/public-disclosure/",
    type: "website"
  },
  {
    title: "ACKO Platinum Health Insurance Policy Document",
    name: "ACKO Platinum Health Insurance Policy Document",
    url: "https://www.acko.com/health-insurance/",
    type: "pdf"
  },
  {
    title: "ACKO Platinum Super Top Up Policy Document",
    name: "ACKO Platinum Super Top Up Policy Document",
    url: "https://www.acko.com/health-insurance/super-top-up-health-insurance/",
    type: "pdf"
  },
  {
    title: "IRDAI – Official Annual Reports",
    name: "IRDAI – Official Annual Reports",
    url: "https://irdai.gov.in/annual-reports",
    type: "website"
  }
];

export const ACKO_SHARED_REPORT_CARD = {
  heading: 'REPORT CARD',
  subheading: 'ACKO General Insurance Performance',
  description: 'Official claim settlement and financial strength metrics.',
  csr: {
    title: 'Claim Settlement Ratio',
    summaryValue: '95.8%',
    subtitle: 'Claim Settlement Ratio',
    explanation: 'ACKO maintains a digital-first claim settlement process with an average turnaround time of under 2 hours for cashless claims.',
    singleYear: '95.8%',
    singleYearLabel: 'Recent Single Year',
    threeYearAvg: '95.8%',
    threeYearAvgLabel: '3 Years Avg Ratio'
  },
  icr: {
    title: 'Incurred Claim Ratio',
    summaryValue: '72.4%',
    subtitle: 'Incurred Claim Ratio',
    explanation: 'For every ₹100 collected in premiums, ACKO spends ~₹72.40 on settling claims, demonstrating sustainable underwriting.',
    range: '72.4%',
    rangeLabel: 'Incurred Claim Ratio'
  },
  complaintVolume: {
    title: 'Complaints/10K',
    summaryValue: '4.8',
    subtitle: 'Complaints/10K',
    explanation: 'Extremely low volume of complaints per 10,000 claims settled across India.',
    value: '4.8',
    label: 'Complaints/10K — 4.8'
  }
};

export const ACKO_SHARED_COMPANY_STRENGTH = {
  heading: 'COMPANY STRENGTH',
  subheading: 'How reliable/strong is the insurer?',
  description: 'Financial stability, institutional backing, and digital infrastructure of ACKO General Insurance.',
  ownership: {
    title: 'OWNERSHIP / BACKING',
    summaryValue: 'Global Institutional Backing',
    explanation: 'Backed by premier global investment institutions including General Atlantic, Accel, Lightspeed, CPPIB, and Amazon.',
    items: [
      { name: 'General Atlantic, Accel & Lightspeed', value: 'Strategic Investors', label: 'Backing' },
      { name: 'Amazon & SoftBank Vision Fund', value: 'Growth Investors', label: 'Backing' }
    ]
  },
  creditRating: {
    title: 'CREDIT RATING',
    summaryValue: 'A / Stable',
    explanation: 'Rated with solid financial safety ratings and high solvency ratios for prompt claim settlement.',
    items: [
      { agency: 'CRISIL / ICRA', rating: 'High Safety / Stable' }
    ]
  },
  capitalStrength: {
    title: 'CAPITAL STRENGTH',
    summaryValue: '2.20×',
    explanation: 'Solvency ratio stands strong at 2.20×, well above the IRDAI mandatory requirement of 1.50×.',
    value: '2.20×',
    label: 'Solvency Ratio (as of FY 2024-25)'
  },
  financialBase: {
    title: 'FINANCIAL BASE',
    summaryValue: '₹2,500+ Cr',
    explanation: 'Substantial asset base and modern digital processing pipeline for instant cashless claims clearance.',
    value: '₹2,500+ Cr',
    label: 'Assets Under Management (AUM)'
  },
  reinsuranceStrength: {
    title: 'REINSURANCE STRENGTH',
    summaryValue: '90%+',
    explanation: 'Comprehensive risk management backed by global tier-1 reinsurers including Munich Re and Swiss Re.',
    value: '90%+',
    label: 'Global Reinsurance Backing'
  },
  marketPosition: {
    title: 'MARKET POSITION',
    summaryValue: 'Digital Pioneer',
    explanation: 'Pioneering digital-first general insurer with direct consumer model and 14,000+ cashless network hospitals.',
    value: '14,000+ Cashless Hospitals',
    label: 'Direct-to-Consumer Digital Model'
  }
};

// =============================================================================
// PLATINUM SUPER TOP UP: BENEFIT SECTIONS, LIMITATIONS & MUST KNOW
// =============================================================================
export const ACKO_PLATINUM_SUPER_TOP_UP_BEST_SUITED_FOR = {
  heading: 'PERFECT FOR',
  subheading: 'Who is this plan perfect for?',
  description: 'Target customer profiles and ideal family scenarios for ACKO Platinum Super Top Up.',
  profiles: [
    {
      title: 'Policyholders with Corporate / Base Health Insurance',
      icon: '🏥',
      summary: 'Individuals already having a base health insurance policy (₹3L to ₹10L) looking to multiply their coverage up to ₹1 Crore or Unlimited without paying heavy base premiums.',
      badge: 'High Value Cover',
      highlights: [
        'Sum Insured options: ₹10 lakh, ₹25 lakh, ₹50 lakh, ₹1 crore, & Unlimited',
        'Works seamlessly on top of any existing base or employer health plan',
        'Deductible applies per policy year, not per claim'
      ]
    },
    {
      title: 'Families Wanting Zero Room Rent Restrictions & 100% Bill Payment',
      icon: '🛡️',
      summary: 'Families wanting full freedom of room selection with no ICU caps and coverage for medical consumables like gloves, masks, and cotton.',
      badge: 'Zero Room Cap',
      highlights: [
        'No room rent capping — choose any room category',
        '100% Hospital Bill Payment including consumables',
        'Zero Waiting Period for healthy families with no pre-existing conditions'
      ]
    },
    {
      title: 'Comprehensive Pre & Post Recovery Protection',
      icon: '📅',
      summary: 'Patients requiring extensive diagnostic investigations and post-discharge consultations with industry-leading coverage windows.',
      badge: '60 & 180 Days',
      highlights: [
        '60 days pre-hospitalization coverage',
        '180 days post-hospitalization medical expense window',
        'Emergency road ambulance and domestic evacuation support'
      ]
    },
    {
      title: 'Tax Savers & Working Professionals',
      icon: '💡',
      summary: 'Salaried and self-employed professionals seeking Section 80D tax deductions alongside catastrophic illness financial safety.',
      badge: 'Tax Deduction',
      highlights: [
        'Tax deduction under Section 80D of the Income Tax Act',
        'Second opinion consultations included',
        'Affordable super top-up premiums with digital instant issuance'
      ]
    }
  ]
};

export const ACKO_PLATINUM_SUPER_TOP_UP_FEATURES_SECTIONS = [
  {
    id: 'most-important',
    title: 'MOST IMPORTANT',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'sum-insured-options',
        title: 'Sum Insured Options',
        subtitle: '₹10 Lakh, ₹25 Lakh, ₹50 Lakh, ₹1 Crore & Unlimited Sum Insured',
        badge: 'UP TO UNLIMITED',
        iconType: 'shield',
        summary: 'Flexible Sum Insured options ranging from ₹10 lakh, ₹25 lakh, ₹50 lakh, ₹1 crore, up to Unlimited Sum Insured for extensive super top-up protection.',
        points: [
          'Choose from ₹10 lakh, ₹25 lakh, ₹50 lakh, ₹1 crore, and Unlimited Sum Insured.',
          'Provides high financial backup over and above your base policy deductible.',
          'Deductible applies cumulatively across the policy year.'
        ]
      },
      {
        id: '100-percent-hospital-bill-payment',
        title: '100% Hospital Bill Payment',
        subtitle: 'Covers All Eligible Expenses Including Consumables (Gloves, Masks, Cotton)',
        badge: '100% BILL PAYMENT',
        iconType: 'credit',
        summary: 'Hospitalization ke saare eligible expenses covered, including non-medical consumables like gloves, masks, aur cotton with zero out-of-pocket stress.',
        points: [
          '100% hospital bill payment for all eligible inpatient expenses.',
          'Consumables covered including gloves, masks, cotton, and surgical disposables.',
          'Minimizes out-of-pocket deductions during hospital discharge.'
        ]
      },
      {
        id: 'zero-waiting-period',
        title: 'Zero Waiting Period',
        subtitle: 'Day-One Coverage for Healthy Families with No Pre-Existing Conditions',
        badge: 'ZERO WAITING',
        iconType: 'clock',
        summary: 'Healthy family aur no pre-existing condition hone par day-one coverage without initial waiting periods.',
        points: [
          'Day-one coverage for healthy families with no declared pre-existing diseases.',
          'Immediate protection for sudden illnesses and accidents.',
          'Seamless transition and coverage activation from inception.'
        ]
      },
      {
        id: 'room-rent-without-restriction',
        title: 'Room Rent Without Restriction',
        subtitle: 'Any Room Category Selection with Full ICU Coverage and No Daily Caps',
        badge: 'NO ROOM CAPPING',
        iconType: 'home',
        summary: 'Any room selection with full coverage; ICU charges aur days par koi restriction ya capping nahi.',
        points: [
          'Freedom to choose single private AC room, deluxe, or suite with no proportionate deduction.',
          'No capping on Intensive Care Unit (ICU / ICCU) charges or number of days.',
          'Ensures premium hospital accommodation during treatment.'
        ]
      },
      {
        id: 'hospitalization-expenses',
        title: 'Hospitalization Expenses',
        subtitle: 'Doctor-Approved Emergency & Planned Inpatient Hospitalization',
        badge: 'HOSPITALIZATION',
        iconType: 'heart',
        summary: 'Doctor-approved emergency ya planned hospitalization ke eligible medical expenses fully covered under the plan.',
        points: [
          'Covers doctor fees, nursing expenses, surgeon charges, operation theater costs, and medicines.',
          'Applies to doctor-recommended emergency or planned hospitalization of 24+ hours.',
          'Cashless hospitalization across ACKO network hospitals.'
        ]
      },
      {
        id: 'pre-post-hospitalization',
        title: 'Pre & Post Hospitalization',
        subtitle: '60 Days Pre-Hospitalization & 180 Days Post-Hospitalization Expenses',
        badge: '60 & 180 DAYS',
        iconType: 'calendar',
        summary: 'Eligible medical expenses covered for 60 days pre-hospitalization aur 180 days post-hospitalization.',
        points: [
          'Pre-hospitalization diagnostic and consultation expenses covered up to 60 days.',
          'Post-hospitalization recovery, follow-up tests, and prescribed medicines covered up to 180 days.',
          'Comprehensive protection for complete diagnosis and recovery journey.'
        ]
      },
      {
        id: 'day-care-treatments',
        title: 'Day-care Treatments',
        subtitle: 'Advanced Surgeries & Procedures Requiring Less Than 24 Hours Stay',
        badge: 'DAY CARE',
        iconType: 'activity',
        summary: 'Covers medical treatments and advanced surgical procedures requiring less than 24 hours of hospitalization due to medical technology.',
        points: [
          'All recognized day-care procedures and surgeries covered.',
          'Includes dialysis, chemotherapy, radiotherapy, eye surgeries, and minor procedures.',
          'Subject to medical necessity under general or local anesthesia.'
        ]
      },
      {
        id: 'domiciliary-treatment',
        title: 'Domiciliary Treatment',
        subtitle: 'Home Treatment Due to Patient Condition or Hospital Bed Non-Availability',
        badge: 'DOMICILIARY CARE',
        iconType: 'home',
        summary: 'Eligible treatment taken at home due to severe health condition ya hospital bed non-availability is covered.',
        points: [
          'Covers medical treatment at home prescribed by attending doctor.',
          'Applicable when patient cannot be moved or hospital beds are unavailable.',
          'Continuous treatment exceeding 3 days covered as per policy terms.'
        ]
      },
      {
        id: 'covid-19-treatment',
        title: 'COVID-19 Treatment',
        subtitle: 'Inpatient Hospitalization & Eligible Medical Care for COVID-19',
        badge: 'COVID-19 COVER',
        iconType: 'shield',
        summary: 'COVID-19 related eligible treatments and hospitalization expenses are covered under the policy terms.',
        points: [
          'Covers in-patient hospitalization and intensive medical care for COVID-19.',
          'Includes oxygen therapy, ICU charges, and prescribed antiviral medications.',
          'Diagnostic confirmation and authorized hospital admission required.'
        ]
      },
      {
        id: 'ambulance-trips',
        title: 'Ambulance Trips',
        subtitle: 'Emergency Road Ambulance Transportation Between Home & Hospital',
        badge: 'AMBULANCE COVER',
        iconType: 'truck',
        summary: 'Emergency road ambulance expenses covered for transportation between home and hospital for emergency medical care.',
        points: [
          'Emergency road ambulance transport to the nearest hospital covered.',
          'Inter-hospital transfer covered when advanced care is medically recommended.',
          'Provides timely emergency mobility during acute medical crises.'
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
        id: 'tax-benefit',
        title: 'Tax Benefit',
        subtitle: 'Tax Deduction Under Section 80D of the Income Tax Act',
        badge: 'SECTION 80D',
        iconType: 'dollar',
        summary: 'Income Tax Act, Section 80D ke under applicable tax deduction on premiums paid for self, family, and parents.',
        points: [
          'Deduction up to ₹25,000 for self, spouse, and dependent children.',
          'Additional deduction up to ₹50,000 for senior citizen parents.',
          'Annual tax certificates generated instantly through the ACKO app.'
        ]
      },
      {
        id: 'second-opinion',
        title: 'Second Opinion',
        subtitle: 'Expert Second Opinion Consultations for Critical Diagnoses',
        badge: 'SECOND OPINION',
        iconType: 'users',
        summary: 'Second opinion consultations available from independent medical specialists for major medical conditions and surgeries.',
        points: [
          'Access to qualified specialists for independent evaluation of treatment plans.',
          'Covers major illnesses, scheduled surgeries, and critical diagnoses.',
          'Helps policyholders make well-informed healthcare decisions.'
        ]
      },
      {
        id: 'domestic-evacuation',
        title: 'Domestic Evacuation',
        subtitle: 'On-Site Rescue & Domestic Medical Evacuation Assistance',
        badge: 'EVACUATION',
        iconType: 'truck',
        summary: 'On-site rescue / domestic evacuation assistance to transfer the patient to the nearest specialized healthcare facility.',
        points: [
          'Emergency evacuation assistance to adequate medical centers.',
          'Covers emergency medical transport in critical life-threatening situations.',
          'Coordinates logistics and emergency healthcare access.'
        ]
      },
      {
        id: 'organ-donor-expenses',
        title: 'Organ Donor Expenses',
        subtitle: 'In-Patient Hospitalization Costs of the Organ Donor Covered',
        badge: 'ORGAN DONOR',
        iconType: 'heart',
        summary: 'Eligible organ donor-related hospitalization expenses covered for harvesting the organ for the insured.',
        points: [
          'Covers in-patient hospitalization expenses of the organ donor.',
          'Complies with the Transplantation of Human Organs Act guidelines.',
          'Supports major organ transplant surgeries without financial distress.'
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
        id: 'vision-care',
        title: 'Vision Care',
        subtitle: 'Refractive Error ≥ ±7.5 Dioptres & Disease/Accident Eyesight Correction',
        badge: 'VISION CARE',
        iconType: 'cpu',
        summary: 'Refractive error ≥ ±7.5 dioptres aur accident/disease-related eyesight damage treatment covered as per terms.',
        points: [
          'Covers surgical correction of severe refractive errors exceeding ±7.5 dioptres.',
          'Covers treatment for eyesight damage caused by major accidental trauma or disease.',
          'Protects visual health against severe optical impairments.'
        ]
      },
      {
        id: 'accident-dental-treatment',
        title: 'Accident-related Dental Treatment',
        subtitle: 'In-Hospital Dental Surgery & Repair Required Due to Accidental Injury',
        badge: 'DENTAL INJURY',
        iconType: 'award',
        summary: 'Eligible dental treatment and surgical repair arising due to an accidental injury requiring hospital care.',
        points: [
          'Covers dental surgeries necessitated by sudden accidental trauma to natural teeth.',
          'Requires in-patient hospitalization or recognized day care admission.',
          'Routine cosmetic and preventive dental care excluded.'
        ]
      },
      {
        id: 'external-congenital-illness',
        title: 'External Congenital Illness',
        subtitle: 'Coverage for Eligible External Congenital Conditions',
        badge: 'EXTERNAL CONGENITAL',
        iconType: 'shield',
        summary: 'Eligible external congenital conditions covered as per specified terms and waiting periods in policy wording.',
        points: [
          'Coverage provided for eligible external congenital anomalies.',
          'Subject to medical evaluation and policy disclosure at inception.',
          'Applies as per defined guidelines in the policy certificate.'
        ]
      }
    ]
  },
  {
    id: 'optional',
    title: 'optional',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'maternity-childbirth',
        title: 'Maternity & Childbirth',
        subtitle: 'Hospitalization Not Covered; Ectopic Pregnancy Covered',
        badge: 'NOT COVERED',
        iconType: 'heart',
        summary: 'Hospitalization expenses generally not covered; ectopic pregnancy covered as a life-saving medical emergency.',
        points: [
          'Routine maternity delivery and childbirth hospitalization are not covered.',
          'Ectopic pregnancy treatment covered as a medical emergency.',
          'Refer to official policy terms for specific emergency exceptions.'
        ]
      },
      {
        id: 'opd-consultations',
        title: 'OPD Consultations',
        subtitle: 'Doctor Consultations Without Hospitalization Not Covered',
        badge: 'NOT COVERED',
        iconType: 'clipboard',
        summary: 'Outpatient doctor consultations and pharmacy bills without hospitalization are not covered under this super top-up plan.',
        points: [
          'Standalone OPD visits and clinic consultations are not covered.',
          'Pre & post hospitalization consultations within 60/180 days are covered when linked to inpatient stay.',
          'Super top up triggers on hospitalization crossing the deductible threshold.'
        ]
      },
      {
        id: 'worldwide-emergency-hospitalisation',
        title: 'Worldwide Emergency Hospitalisation',
        subtitle: 'Medical Emergencies Outside India Not Covered',
        badge: 'NOT COVERED',
        iconType: 'globe',
        summary: 'Medical emergencies and hospitalizations outside the geographical territory of India are not covered under this plan.',
        points: [
          'Coverage is valid across recognized hospitals within India only.',
          'Overseas treatments and emergency medical care abroad are excluded.',
          'Travelers should acquire dedicated international travel insurance.'
        ]
      },
      {
        id: 'infertility-treatments',
        title: 'Infertility Treatments',
        subtitle: 'IVF, IUI & Infertility Treatments Not Covered',
        badge: 'NOT COVERED',
        iconType: 'zap',
        summary: 'IVF, IUI, and related assisted reproductive or infertility treatments are not covered under the policy terms.',
        points: [
          'In vitro fertilization (IVF) and intrauterine insemination (IUI) excluded.',
          'Diagnostic investigations and medications related to infertility excluded.',
          'Standard regulatory exclusion for super top-up policies.'
        ]
      },
      {
        id: 'bariatric-surgery',
        title: 'Bariatric Surgery',
        subtitle: 'Generally Not Covered Unless Medically/Life-Threateningly Necessary',
        badge: 'CONDITIONAL / EXCLUDED',
        iconType: 'activity',
        summary: 'Bariatric surgery is generally not covered unless medically/life-threateningly necessary as specified under IRDAI criteria.',
        points: [
          'Weight control and elective obesity surgeries are not covered.',
          'Covered only if medically necessary and meeting strict clinical criteria (BMI > 40 with comorbidities).',
          'Prior approval from the insurer required before procedure.'
        ]
      },
      {
        id: 'cosmetic-plastic-surgery',
        title: 'Cosmetic/Plastic Surgery',
        subtitle: 'Non-Medically Necessary Procedures Not Covered',
        badge: 'NOT COVERED',
        iconType: 'cpu',
        summary: 'Cosmetic and plastic surgery procedures that are not medically necessary are not covered.',
        points: [
          'Elective aesthetic and cosmetic surgeries are excluded.',
          'Reconstructive surgery following accidental trauma or burns may be considered on medical advice.',
          'Standard permanent exclusion under the policy schedule.'
        ]
      }
    ]
  }
];

export const ACKO_PLATINUM_SUPER_TOP_UP_LIMITATIONS = {
  heading: 'LIMITATIONS & WAITING PERIODS',
  subheading: 'Terms, Waiting Periods & Exclusions',
  items: [
    {
      id: 'deductible-requirement',
      title: 'Annual Aggregate Deductible',
      durationTag: 'DEDUCTIBLE APPLIES',
      summary: 'The Super Top Up policy triggers after eligible medical expenses in a policy year cross the chosen deductible amount (e.g., ₹3 Lakh, ₹5 Lakh, or ₹10 Lakh).',
      highlight: 'Deductible can be paid via personal funds or your existing base health insurance policy.'
    },
    {
      id: 'initial-waiting-period',
      title: 'Zero / 30 Days Initial Waiting Period',
      durationTag: '0 / 30 DAYS',
      summary: 'Zero waiting period for healthy families with no pre-existing conditions; standard 30-day initial waiting period applies otherwise for non-accidental illnesses.',
      highlight: 'Accidental hospitalizations are covered from Day 1.'
    },
    {
      id: 'pre-existing-diseases',
      title: 'Pre-Existing Diseases (PED)',
      durationTag: '0 TO 36 MONTHS',
      summary: 'Declared pre-existing conditions covered as per underwriting approval and policy schedule (up to 36 months continuous coverage where applicable).',
      highlight: 'Portability credits from existing continuous insurance policies recognized.'
    },
    {
      id: 'permanent-exclusions',
      title: 'General Exclusions',
      durationTag: 'STANDARD EXCLUSIONS',
      summary: 'Routine OPD, elective cosmetic surgery, IVF/infertility procedures, overseas treatments, and illegal activities are excluded.',
      exclusionsList: [
        'Outpatient doctor consultations and routine health checkups without hospitalization',
        'Cosmetic or aesthetic procedures unless necessitated by accidental burns/trauma',
        'Infertility and assisted reproductive treatments (IVF / IUI)',
        'Hospitalization and medical emergency treatment outside India'
      ]
    }
  ]
};

export const ACKO_PLATINUM_SUPER_TOP_UP_MUST_KNOW = {
  heading: 'MUST KNOW DETAILS',
  subheading: 'Key product takeaways',
  items: [
    {
      id: 'super-top-up-nature',
      icon: '🛡️',
      title: 'Super Top Up Over Base Deductible',
      summary: 'Covers catastrophic medical bills once cumulative eligible expenses exceed your chosen deductible during the policy year.'
    },
    {
      id: '100-percent-bill-payment',
      icon: '💯',
      title: '100% Hospital Bill Payment with Consumables',
      summary: 'Covers inpatient expenses including consumables like gloves, masks, cotton, and surgical supplies with zero deduction.'
    },
    {
      id: 'zero-room-rent-capping',
      icon: '🏥',
      title: 'Zero Room Rent Capping & No ICU Limits',
      summary: 'Choose any room category without proportionate deduction penalties; no daily cap on ICU charges.'
    },
    {
      id: 'pre-post-extended-window',
      icon: '📅',
      title: '60 Days Pre & 180 Days Post Hospitalization',
      summary: 'Industry-leading 180-day post-hospitalization coverage window ensures follow-up medicines and tests are reimbursed.'
    },
    {
      id: 'unlimited-si-option',
      icon: '🔄',
      title: 'Unlimited Sum Insured Option Available',
      summary: 'Get infinite financial cushion against massive medical bills with the Unlimited Sum Insured plan variant.'
    }
  ]
};

// =============================================================================
// PLATINUM LITE: BENEFIT SECTIONS, LIMITATIONS & MUST KNOW
// =============================================================================
export const ACKO_PLATINUM_LITE_FEATURES_SECTIONS = [
  {
    id: 'most-important',
    title: 'MOST IMPORTANT',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'sum-insured-options',
        title: 'Sum Insured Options',
        subtitle: '₹10 Lakh, ₹25 Lakh, ₹50 Lakh, aur ₹1 Crore Options',
        badge: 'UP TO ₹1 CRORE',
        iconType: 'shield',
        summary: 'Flexible Sum Insured options of ₹10 lakh, ₹25 lakh, ₹50 lakh, aur ₹1 crore tailored for comprehensive individual and family health protection.',
        points: [
          'Choose from ₹10 lakh, ₹25 lakh, ₹50 lakh, and ₹1 crore Sum Insured options.',
          'Available for individual coverage and family floater options.',
          'High baseline financial security against escalating medical costs.'
        ]
      },
      {
        id: '100-percent-hospital-bill-payment',
        title: '100% Hospital Bill Payment',
        subtitle: 'Covers Eligible Inpatient Expenses Including Consumables (Gloves, Masks, Cotton)',
        badge: '100% BILL PAYMENT',
        iconType: 'credit',
        summary: 'Hospitalization ke eligible expenses covered, including medical/surgical consumables like gloves, masks aur cotton with zero out-of-pocket stress.',
        points: [
          '100% hospital bill payment for all doctor-approved inpatient hospitalizations.',
          'Includes non-medical and surgical consumables like gloves, masks, syringes, and cotton.',
          'Zero deduction for listed surgical disposables at network hospitals.'
        ]
      },
      {
        id: 'no-room-rent-limits',
        title: 'No Room Rent Limits',
        subtitle: 'Choose Any Room Category with Full ICU Coverage and No Daily Limits',
        badge: 'NO ROOM CAP',
        iconType: 'home',
        summary: 'Any hospital room choose kar sakte hain; ICU charges ya days par limit nahi with zero proportionate deduction penalties.',
        points: [
          'Freedom to select single private AC room, deluxe, or suite accommodation.',
          'No proportionate deduction on hospital room rent and associated medical charges.',
          'No limit on ICU/ICCU stay duration or daily ICU charges.'
        ]
      },
      {
        id: 'insurance-inflation-protection',
        title: 'Insurance Inflation Protection',
        subtitle: '10% Annual Sum Insured Increase Up to Maximum 100% of Base SI',
        badge: 'INFLATION SHIELD',
        iconType: 'trending',
        summary: 'Har saal Sum Insured mein 10% increase, maximum Base Sum Insured ke 100% tak to safeguard your healthcare coverage against medical inflation.',
        points: [
          'Automatic 10% increase in base Sum Insured upon each policy renewal.',
          'Accumulates up to a maximum of 100% of the initial Base Sum Insured.',
          'Protects against rising hospital treatment costs without extra premium.'
        ]
      },
      {
        id: 'hospitalization-expenses',
        title: 'Hospitalization Expenses',
        subtitle: 'Doctor-Approved Emergency & Pre-Planned Hospitalization',
        badge: 'HOSPITALIZATION',
        iconType: 'heart',
        summary: 'Doctor-approved emergency ya pre-planned hospitalization medical expenses fully covered under the policy terms.',
        points: [
          'Covers room rent, nursing charges, doctor fees, operation theater, and medicines.',
          'Applies to doctor-certified emergency or planned hospitalizations (24+ hours stay).',
          'Instant cashless facility across 14,000+ ACKO network hospitals.'
        ]
      },
      {
        id: 'pre-post-hospitalization',
        title: 'Pre & Post Hospitalization',
        subtitle: '60 Days Pre-Hospitalization & 180 Days Post-Hospitalization Expenses',
        badge: '60 & 180 DAYS',
        iconType: 'calendar',
        summary: 'Eligible medical expenses covered for 60 days pre-hospitalization aur 180 days post-hospitalization for complete diagnosis and recovery.',
        points: [
          'Pre-hospitalization diagnostic tests and doctor fees covered up to 60 days.',
          'Post-hospitalization recovery, diagnostic investigations, and medicines covered up to 180 days.',
          'Extensive diagnostic and recovery cushion post hospital discharge.'
        ]
      },
      {
        id: 'day-care-treatments',
        title: 'Day-care Treatments',
        subtitle: 'Treatments & Advanced Surgeries Completed in Less Than 24 Hours',
        badge: 'DAY CARE',
        iconType: 'activity',
        summary: 'Treatments completed in less than 24 hours of hospitalization due to medical technology advancements are fully covered.',
        points: [
          'All recognized day-care procedures and minor surgeries covered.',
          'Includes dialysis, radiotherapy, chemotherapy, cataract, and lithotripsy.',
          'Performed under general or local anesthesia in a recognized hospital/clinic.'
        ]
      },
      {
        id: 'domiciliary-treatment',
        title: 'Domiciliary Treatment',
        subtitle: 'Medical Treatment at Home Due to Health Condition or Bed Shortage',
        badge: 'DOMICILIARY CARE',
        iconType: 'home',
        summary: 'Eligible treatment at home due to medical condition ya hospital bed availability issue covered on attending doctor recommendation.',
        points: [
          'Covers home hospital treatment prescribed by the treating doctor.',
          'Applies when patient cannot be moved or hospital beds are unavailable.',
          'Treatment exceeding 3 continuous days covered as per policy terms.'
        ]
      },
      {
        id: 'covid-19-treatment',
        title: 'COVID-19 Treatment',
        subtitle: 'Inpatient Hospitalization & Eligible Medical Care for COVID-19',
        badge: 'COVID-19 COVER',
        iconType: 'shield',
        summary: 'COVID-19 related eligible treatments and hospitalizations covered under standard policy terms and clinical guidelines.',
        points: [
          'Covers in-patient hospitalization and ICU care for COVID-19 infection.',
          'Includes prescribed medications, diagnostic tests, and oxygen therapy.',
          'Requires diagnostic confirmation and authorized hospital admission.'
        ]
      },
      {
        id: 'multiple-ambulance-trips',
        title: 'Multiple Ambulance Trips',
        subtitle: 'Emergency Road Ambulance Transportation Between Home & Hospital',
        badge: 'AMBULANCE COVER',
        iconType: 'truck',
        summary: 'Emergency road ambulance trips between home and hospital covered for timely and safe transportation during medical emergencies.',
        points: [
          'Emergency road ambulance transportation to the nearest hospital covered.',
          'Supports multiple emergency road ambulance trips during the policy year.',
          'Inter-hospital transfer covered when higher medical care is recommended.'
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
        id: 'free-yearly-health-checkups',
        title: 'Free Yearly Health Check-ups',
        subtitle: 'Annual Preventive Health Screening for All Insured Members Aged 18+',
        badge: 'FREE ANNUAL CHECKUP',
        iconType: 'clipboard',
        summary: '18+ insured members ke liye annual health check-up provided free of cost at cashless network diagnostic centers.',
        points: [
          'Annual cashless health check-up for all adult insured members (18+ years).',
          'Includes key health markers: complete blood count, blood sugar, lipid, liver, and kidney profiles.',
          'Enables early detection and proactive wellness management.'
        ]
      },
      {
        id: 'unlimited-doctor-teleconsultations',
        title: 'Unlimited Doctor Teleconsultations',
        subtitle: 'Instant & Unlimited 24/7 Doctor Consultations via the ACKO App',
        badge: 'UNLIMITED TELECONSULT',
        iconType: 'users',
        summary: 'ACKO app ke through unlimited free doctor consultations across general physicians and medical specialists.',
        points: [
          '24/7 instant access to verified doctors and medical specialists via the ACKO app.',
          'Unlimited digital teleconsultations at zero extra cost.',
          'Instant digital prescriptions for routine health concerns.'
        ]
      },
      {
        id: 'second-opinion',
        title: 'Second Opinion',
        subtitle: 'Independent Expert Second Opinion Consultations for Critical Illnesses',
        badge: 'SECOND OPINION',
        iconType: 'heart',
        summary: 'Second opinion consultations from qualified independent medical specialists for major critical illnesses and planned surgeries.',
        points: [
          'Access to expert specialists for independent review of treatment protocols.',
          'Helps validate diagnosis and explore alternative therapies.',
          'Empowers families to make confident healthcare choices.'
        ]
      },
      {
        id: 'domestic-evacuation',
        title: 'Domestic Evacuation',
        subtitle: 'On-Site Rescue & Emergency Domestic Medical Evacuation Assistance',
        badge: 'DOMESTIC EVACUATION',
        iconType: 'truck',
        summary: 'On-site rescue / domestic evacuation assistance to transfer the patient to the nearest specialized medical facility.',
        points: [
          'Emergency rescue and evacuation coordination in life-threatening scenarios.',
          'Assists transfer to well-equipped tertiary hospital centers.',
          'Comprehensive logistical support during acute emergencies.'
        ]
      },
      {
        id: 'ayush-treatment',
        title: 'AYUSH Treatment',
        subtitle: 'Inpatient Alternative Medicine Care (Ayurveda, Yoga, Unani, Siddha, Homeopathy)',
        badge: 'AYUSH COVERED',
        iconType: 'globe',
        summary: 'Ayurveda, Yoga & Naturopathy, Unani, Siddha aur Homeopathy inpatient treatments covered in recognized government/accredited AYUSH hospitals.',
        points: [
          'Covers in-patient treatment in recognized government/NABH accredited AYUSH hospitals.',
          'Supported up to the applicable base Sum Insured.',
          'Holistic health therapies under recognized traditional medical systems.'
        ]
      },
      {
        id: 'organ-donor-expenses',
        title: 'Organ Donor Expenses',
        subtitle: 'In-Patient Hospitalization Costs of the Organ Donor Covered',
        badge: 'ORGAN DONOR',
        iconType: 'heart',
        summary: 'Eligible organ donor-related hospitalization expenses covered for harvesting the organ for the insured.',
        points: [
          'Covers in-patient hospitalization costs incurred by the organ donor.',
          'Complies with the Transplantation of Human Organs Act guidelines.',
          'Supports critical organ replacement surgeries without extra financial stress.'
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
        id: 'vision-care',
        title: 'Vision Care',
        subtitle: 'Refractive Error ≥ ±7.5 Dioptres & Disease/Accident Eyesight Correction',
        badge: 'VISION CARE',
        iconType: 'cpu',
        summary: 'Refractive error ≥ ±7.5 dioptres aur accident/disease-related eyesight damage treatment covered as per policy terms.',
        points: [
          'Covers surgical correction of severe refractive errors exceeding ±7.5 dioptres.',
          'Covers treatment for eyesight damage caused by accidental trauma or disease.',
          'Protects visual health against high optical impairments.'
        ]
      },
      {
        id: 'accident-dental-treatment',
        title: 'Accident-related Dental Treatment',
        subtitle: 'Hospital Dental Surgery & Repair Required Due to Accidental Trauma',
        badge: 'DENTAL INJURY',
        iconType: 'award',
        summary: 'Accident ke wajah se required eligible dental treatment and surgical repair requiring hospital admission covered.',
        points: [
          'Covers dental surgeries necessitated by sudden accidental trauma to natural teeth.',
          'Requires in-patient hospitalization or recognized day care procedure.',
          'Routine cosmetic and preventive dental care excluded.'
        ]
      },
      {
        id: 'initial-waiting-period',
        title: 'Initial Waiting Period',
        subtitle: '30 Days Initial Waiting Period for Non-Accidental Illnesses',
        badge: '30 DAYS',
        iconType: 'clock',
        summary: '30 days initial waiting period applies to non-accidental illnesses; accidental injuries covered immediately from Day 1.',
        points: [
          '30-day initial waiting period applies from the policy inception date.',
          'Accidental injuries and trauma hospitalizations covered immediately from Day 1.',
          'Waived upon subsequent continuous renewals.'
        ]
      },
      {
        id: 'specific-illness-waiting-period',
        title: 'Specific Illness Waiting Period',
        subtitle: '2 Years (24 Months) Waiting Period for Specified Slow-Growing Conditions',
        badge: '2 YEARS',
        iconType: 'clock',
        summary: '2 years waiting period for specified slow-growing illnesses including cataract, hernia, joint replacements, and stones.',
        points: [
          '24 months waiting period for listed planned surgeries and slow-growing ailments.',
          'Includes cataract, hernia, hydrocele, piles, and joint replacement surgeries.',
          'Full portability credits recognized from prior continuous health policies.'
        ]
      },
      {
        id: 'pre-existing-diseases-ped',
        title: 'Pre-Existing Diseases (PED)',
        subtitle: '3 Years (36 Months) Waiting Period for Declared Pre-Existing Conditions',
        badge: '3 YEARS',
        iconType: 'clock',
        summary: '3 years waiting period applies for declared pre-existing diseases before coverage becomes active.',
        points: [
          '36 months continuous coverage required for declared pre-existing medical conditions.',
          'Full portability credit recognized from prior continuous policies as per IRDAI.',
          'Covers pre-existing ailments up to the Sum Insured post waiting period.'
        ]
      }
    ]
  },
  {
    id: 'optional',
    title: 'optional',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'maternity-childbirth',
        title: 'Maternity & Childbirth',
        subtitle: 'Generally Covered Nahi; Specified Accident Miscarriage/Ectopic Pregnancy Covered',
        badge: 'NOT COVERED',
        iconType: 'heart',
        summary: 'Generally covered nahi; specified accident-related miscarriage/ectopic pregnancy coverage as applicable under emergency guidelines.',
        points: [
          'Routine maternity delivery and normal/C-section childbirth expenses are not covered.',
          'Ectopic pregnancy and life-threatening medical emergencies covered as specified.',
          'Refer to official policy terms for specific emergency exceptions.'
        ]
      },
      {
        id: 'opd-consultations',
        title: 'OPD Consultations',
        subtitle: 'Bina Hospitalization Ke Regular Doctor Consultations Not Covered',
        badge: 'NOT COVERED',
        iconType: 'clipboard',
        summary: 'Bina hospitalization ke regular doctor consultations and standalone pharmacy bills not covered under inpatient coverage.',
        points: [
          'Standalone outpatient clinic visits and pharmacy purchases are excluded.',
          'Unlimited digital doctor teleconsultations available free on the ACKO app.',
          'Pre & post hospitalization expenses within 60/180 days covered when linked to hospital stay.'
        ]
      },
      {
        id: 'worldwide-emergency-hospitalisation',
        title: 'Worldwide Emergency Hospitalisation',
        subtitle: 'India Ke Bahar Emergency Hospitalization Not Covered',
        badge: 'NOT COVERED',
        iconType: 'globe',
        summary: 'India ke bahar emergency hospitalization not covered; coverage valid exclusively within recognized hospitals across India.',
        points: [
          'Coverage applies strictly to medical treatments taken within the geographical boundary of India.',
          'Overseas hospital admissions and medical treatments abroad are excluded.',
          'Travelers are advised to acquire dedicated international travel health insurance.'
        ]
      },
      {
        id: 'external-congenital-illness',
        title: 'External Congenital Illness',
        subtitle: 'External Congenital Conditions & Anomalies Not Covered',
        badge: 'NOT COVERED',
        iconType: 'shield',
        summary: 'External congenital conditions, anomalies, and structural deformities are not covered under the policy terms.',
        points: [
          'External congenital defects and related medical management are excluded.',
          'Internal congenital conditions may be considered as per standard policy guidelines.',
          'Standard regulatory exclusion across basic health indemnity plans.'
        ]
      },
      {
        id: 'infertility-treatments',
        title: 'Infertility Treatments',
        subtitle: 'IVF Aur Related Infertility Treatments Not Covered',
        badge: 'NOT COVERED',
        iconType: 'zap',
        summary: 'IVF aur related assisted reproduction and infertility treatments are not covered under the policy terms.',
        points: [
          'In vitro fertilization (IVF), IUI, and ICSI treatments are excluded.',
          'Diagnostic investigations and hormone therapies for infertility are excluded.',
          'Standard permanent exclusion under the policy terms.'
        ]
      },
      {
        id: 'bariatric-surgery',
        title: 'Bariatric Surgery',
        subtitle: 'Generally Covered Unless Life-Threatening Condition Ke Liye Medically Necessary',
        badge: 'CONDITIONAL / EXCLUDED',
        iconType: 'activity',
        summary: 'Generally not covered unless life-threatening condition ke liye medically necessary as per strict clinical criteria.',
        points: [
          'Elective obesity and aesthetic weight-reduction surgeries are not covered.',
          'Covered only when medically necessary for life-threatening conditions (BMI > 40 with severe comorbidities).',
          'Requires prior clinical approval from the insurer.'
        ]
      },
      {
        id: 'cosmetic-plastic-surgery',
        title: 'Cosmetic/Plastic Surgery',
        subtitle: 'Non-Medically Necessary Procedures Not Covered',
        badge: 'NOT COVERED',
        iconType: 'cpu',
        summary: 'Non-medically necessary procedures, aesthetic enhancements, and cosmetic surgeries are not covered.',
        points: [
          'Elective cosmetic, aesthetic, and plastic procedures are excluded.',
          'Reconstructive surgery following accidental burns/trauma covered on medical advice.',
          'Standard permanent exclusion under the policy wording.'
        ]
      }
    ]
  }
];

export const ACKO_PLATINUM_LITE_LIMITATIONS = {
  heading: 'LIMITATIONS & WAITING PERIODS',
  subheading: 'Terms, Waiting Periods & Exclusions',
  items: [
    {
      id: 'initial-waiting-period',
      title: 'Initial Waiting Period',
      durationTag: '30 DAYS',
      summary: '30 days initial waiting period applies to all illnesses from policy inception, except accidental hospitalizations which are covered from Day 1.',
      highlight: 'Accidental hospitalizations covered immediately from Day 1.'
    },
    {
      id: 'specific-illness-waiting',
      title: 'Specific Illnesses / Slow-Growing Ailments',
      durationTag: '2 YEARS',
      summary: '2 years (24 months) waiting period applies for specified slow-growing ailments and planned surgeries.',
      diseaseList: [
        'Cataract & Eye Surgeries',
        'Hernia, Hydrocele, Piles & Fistula',
        'Joint Replacements & Arthritis Surgeries',
        'Kidney & Gallbladder Stones',
        'Benign Prostatic Hypertrophy (BPH)',
        'ENT & Sinus Surgeries'
      ]
    },
    {
      id: 'ped-waiting-period',
      title: 'Pre-Existing Diseases (PED)',
      durationTag: '3 YEARS',
      summary: 'Pre-existing medical conditions declared at the time of proposal are covered after 3 years (36 months) of continuous coverage.',
      highlight: 'Full portability credits recognized from prior continuous health policies.'
    },
    {
      id: 'general-exclusions',
      title: 'General Permanent Exclusions',
      durationTag: 'STANDARD EXCLUSIONS',
      summary: 'Routine OPD, elective cosmetic surgery, IVF/infertility procedures, external congenital defects, and treatments outside India are excluded.',
      exclusionsList: [
        'Outpatient doctor consultations and routine pharmacy bills without hospitalization',
        'Elective aesthetic or cosmetic surgeries unless necessitated by accidental burns/trauma',
        'Infertility treatments including IVF, IUI, and ICSI',
        'External congenital illnesses and structural anomalies',
        'Medical emergency hospitalization and treatment outside India'
      ]
    }
  ]
};

export const ACKO_PLATINUM_LITE_MUST_KNOW = {
  heading: 'MUST KNOW DETAILS',
  subheading: 'Key product takeaways',
  items: [
    {
      id: 'inflation-protection-feature',
      icon: '📈',
      title: '10% Annual Inflation Protection',
      summary: 'Sum Insured increases by 10% every year upon renewal, accumulating up to a maximum of 100% of the base Sum Insured.'
    },
    {
      id: '100-percent-bill-payment-lite',
      icon: '💯',
      title: '100% Hospital Bill Payment with Consumables',
      summary: 'Inpatient hospital bills paid in full, including surgical and medical consumables like gloves, masks, syringes, and cotton.'
    },
    {
      id: 'no-room-rent-capping-lite',
      icon: '🏥',
      title: 'Zero Room Rent Capping & No ICU Limits',
      summary: 'Choose any room category without proportionate deduction penalties; no daily cap on ICU charges or days.'
    },
    {
      id: 'pre-post-180-days',
      icon: '📅',
      title: '60 Days Pre & 180 Days Post Hospitalization',
      summary: 'Extensive 180-day post-hospitalization coverage window ensures follow-up medicines and diagnostic tests are reimbursed.'
    },
    {
      id: 'free-teleconsultations-checkups',
      icon: '🩺',
      title: 'Free Annual Checkups & App Teleconsultations',
      summary: 'Free yearly preventive health checkups for adult members and unlimited 24/7 doctor teleconsultations via the ACKO app.'
    }
  ]
};

export const ACKO_PLATINUM_LITE_BEST_SUITED_FOR = {
  heading: 'PERFECT FOR',
  subheading: 'Who is this plan perfect for?',
  description: 'Target customer profiles and ideal family scenarios for ACKO Platinum Lite.',
  profiles: [
    {
      title: 'Families Seeking Comprehensive Direct Hospitalization Cover',
      icon: '👨‍👩‍👧‍👦',
      summary: 'Families looking for comprehensive ₹10 Lakh to ₹1 Crore coverage with zero room rent limits and 100% bill payment including consumables.',
      badge: 'Zero Room Cap',
      highlights: [
        'Sum Insured options from ₹10 Lakh up to ₹1 Crore',
        'No room rent capping — choose any room category',
        '100% hospital bill payment including medical consumables'
      ]
    },
    {
      title: 'Value-Conscious Policyholders Seeking Inflation Shield',
      icon: '📈',
      summary: 'Individuals wanting coverage that grows over time with 10% annual inflation protection up to 100% of base Sum Insured.',
      badge: 'Inflation Protection',
      highlights: [
        '10% annual Sum Insured enhancement upon renewal',
        'Up to 100% bonus accumulation without extra premium',
        'Safeguards family against rising hospital healthcare inflation'
      ]
    },
    {
      title: 'Digital-First Users Wanting Unlimited Teleconsultations',
      icon: '📱',
      summary: 'Busy professionals and tech-savvy families who value 24/7 unlimited free doctor teleconsultations and free yearly check-ups.',
      badge: 'App Benefits',
      highlights: [
        'Unlimited free 24/7 doctor teleconsultations via ACKO app',
        'Free yearly health check-up for all adult members (18+)',
        'Direct cashless claims with zero commission deductions'
      ]
    },
    {
      title: 'Tax Savers & Comprehensive Planners',
      icon: '💡',
      summary: 'Taxpayers seeking Section 80D deductions combined with AYUSH alternative medicine coverage and domestic emergency evacuation.',
      badge: 'Tax Deduction',
      highlights: [
        'Section 80D tax deductions for self, family, and parents',
        'AYUSH inpatient alternative medicine treatment covered',
        'Domestic medical evacuation and organ donor cost coverage'
      ]
    }
  ]
};

// =============================================================================
// PLATINUM: BENEFIT SECTIONS, LIMITATIONS & MUST KNOW (NEW PLAN)
// =============================================================================
export const ACKO_PLATINUM_FEATURES_SECTIONS = [
  // ---------------------------------------------------------------------------
  // 1. MOST IMPORTANT (11 Benefits)
  // ---------------------------------------------------------------------------
  {
    id: 'most-important',
    title: 'MOST IMPORTANT',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'enhanced-sum-insured',
        title: 'Enhanced Sum Insured',
        subtitle: '₹1 Crore aur Unlimited Sum Insured Options for Complete Protection',
        badge: '₹1 CR - UNLIMITED',
        iconType: 'shield',
        summary: '₹1 crore aur Unlimited Sum Insured options tailored for high-net-worth protection against catastrophic hospital bills and advanced medical therapies.',
        points: [
          'Choose between ₹1 Crore and Unlimited Sum Insured options.',
          'Infinite coverage cushion against massive medical bills and prolonged ICU stays.',
          'Available in Individual and Family Floater configurations.'
        ]
      },
      {
        id: '100-percent-hospital-bill-payment',
        title: '100% Hospital Bill Payment',
        subtitle: 'Poore Eligible Expenses Covered, Including Consumables (Masks, Gloves, Cotton)',
        badge: '100% BILL PAYMENT',
        iconType: 'credit',
        summary: 'Hospitalization ke poore eligible expenses covered, including medical consumables like masks, gloves aur cotton with zero deductions on discharge.',
        points: [
          '100% hospital bill payment for all doctor-approved inpatient hospitalizations.',
          'Covers listed surgical and medical consumables (masks, gloves, syringes, cotton).',
          'Eliminates out-of-pocket medical deductions at hospital discharge.'
        ]
      },
      {
        id: 'no-room-rent-limits',
        title: 'No Room Rent Limits',
        subtitle: 'Choose Any Hospital Room Category with Zero ICU Charges or Days Limit',
        badge: 'NO ROOM CAP',
        iconType: 'home',
        summary: 'Any hospital room choose kar sakte hain; ICU charges ya days par limit nahi with zero proportionate deduction penalties.',
        points: [
          'Complete freedom to choose single private room, deluxe, or luxury suite.',
          'No proportionate deduction on room rent or doctor/surgical fees.',
          'No limit on Intensive Care Unit (ICU/ICCU) duration or daily rates.'
        ]
      },
      {
        id: 'zero-waiting-period',
        title: 'Zero Waiting Period',
        subtitle: 'Day-One Coverage for Healthy Families with No Pre-Existing Conditions',
        badge: 'ZERO WAITING',
        iconType: 'clock',
        summary: 'Healthy family aur no pre-existing health condition hone par day-one coverage without initial waiting periods.',
        points: [
          'Instant day-one coverage for healthy families with no pre-existing conditions.',
          'Immediate protection for unexpected medical illnesses and surgeries.',
          'Accidental injuries covered from Day 1.'
        ]
      },
      {
        id: 'insurance-inflation-protection',
        title: 'Insurance Inflation Protection',
        subtitle: '10% Annual Sum Insured Increase Up to Maximum 100% of Base SI',
        badge: 'INFLATION SHIELD',
        iconType: 'trending',
        summary: 'Har saal Sum Insured mein 10% increase, maximum Base Sum Insured ke 100% tak to protect against double-digit medical inflation.',
        points: [
          'Automatic 10% increase on Base Sum Insured upon every renewal.',
          'Accumulates up to a maximum of 100% of the initial Base Sum Insured.',
          'Enhances family coverage protection without additional premium charges.'
        ]
      },
      {
        id: 'hospitalization-expenses',
        title: 'Hospitalization Expenses',
        subtitle: 'Doctor-Approved Emergency & Pre-Planned Inpatient Hospitalization',
        badge: 'HOSPITALIZATION',
        iconType: 'heart',
        summary: 'Doctor-approved emergency ya pre-planned hospitalization medical expenses fully covered under the plan.',
        points: [
          'Covers room charges, nursing fees, surgeon costs, operation theater, and medicines.',
          'Applies to doctor-certified emergency or planned hospitalizations (24+ hours stay).',
          'Instant 100% cashless treatment across 14,000+ ACKO network hospitals.'
        ]
      },
      {
        id: 'pre-post-hospitalization',
        title: 'Pre & Post Hospitalization',
        subtitle: '60 Days Pre-Hospitalization & 180 Days Post-Hospitalization Expenses',
        badge: '60 & 180 DAYS',
        iconType: 'calendar',
        summary: 'Eligible medical expenses covered for 60 days pre-hospitalization aur 180 days post-hospitalization for complete recovery.',
        points: [
          'Pre-hospitalization diagnostic tests and consultations covered up to 60 days.',
          'Post-hospitalization diagnostic follow-ups and medicines covered up to 180 days.',
          'Comprehensive protection from initial diagnosis through final recovery.'
        ]
      },
      {
        id: 'day-care-treatments',
        title: 'Day-care Treatments',
        subtitle: 'Treatments & Advanced Surgeries Completed in Less Than 24 Hours',
        badge: 'DAY CARE',
        iconType: 'activity',
        summary: 'Treatments completed in less than 24 hours of hospitalization due to medical technology advancements are fully covered.',
        points: [
          'All recognized technological day-care surgeries and medical procedures covered.',
          'Includes dialysis, radiotherapy, chemotherapy, cataract, and minor surgeries.',
          'Subject to medical necessity under general or local anesthesia.'
        ]
      },
      {
        id: 'domiciliary-treatment',
        title: 'Domiciliary Treatment',
        subtitle: 'Eligible Treatment at Home Due to Health Condition or Hospital Bed Shortage',
        badge: 'DOMICILIARY CARE',
        iconType: 'home',
        summary: 'Eligible treatment at home due to medical condition ya hospital bed availability covered on attending doctor certification.',
        points: [
          'Covers home hospitalization prescribed by treating physician.',
          'Applies when the patient cannot be moved or hospital beds are unavailable.',
          'Treatment exceeding 3 consecutive days covered as per policy terms.'
        ]
      },
      {
        id: 'covid-19-treatment',
        title: 'COVID-19 Treatment',
        subtitle: 'Inpatient Hospitalization & Eligible Medical Care for COVID-19',
        badge: 'COVID-19 COVER',
        iconType: 'shield',
        summary: 'COVID-19 related treatments and hospitalizations covered under standard policy terms and clinical guidelines.',
        points: [
          'Covers in-patient hospitalization and ICU care for COVID-19 infection.',
          'Includes oxygen support, ICU monitoring, and prescribed antiviral medications.',
          'Requires clinical diagnostic confirmation and authorized hospital admission.'
        ]
      },
      {
        id: 'multiple-ambulance-trips',
        title: 'Multiple Ambulance Trips',
        subtitle: 'Emergency Road Ambulance Transportation Between Home & Hospital',
        badge: 'AMBULANCE COVER',
        iconType: 'truck',
        summary: 'Emergency road ambulance trips between home and hospital covered for timely and safe emergency transport.',
        points: [
          'Emergency road ambulance transportation to the nearest hospital covered.',
          'Supports multiple emergency road ambulance trips during the policy year.',
          'Covers inter-hospital transfers when higher medical care is recommended.'
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 2. valueAdded (6 Benefits)
  // ---------------------------------------------------------------------------
  {
    id: 'value-added',
    title: 'valueAdded',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'free-yearly-health-checkups',
        title: 'Free Yearly Health Check-ups',
        subtitle: 'Annual Preventive Health Screening for All Insured Members Aged 18+',
        badge: 'FREE ANNUAL CHECKUP',
        iconType: 'clipboard',
        summary: '18+ insured members ke liye annual health check-up provided free of cost at cashless network diagnostic centers.',
        points: [
          'Annual cashless health check-up for all adult insured members (18+ years).',
          'Includes lipid profile, blood sugar, kidney function, and liver function tests.',
          'Proactive wellness monitoring for early detection of health risks.'
        ]
      },
      {
        id: 'unlimited-doctor-teleconsultations',
        title: 'Unlimited Doctor Teleconsultations',
        subtitle: 'Instant & Unlimited 24/7 Doctor Consultations via the ACKO App',
        badge: 'UNLIMITED TELECONSULT',
        iconType: 'users',
        summary: 'ACKO app ke through unlimited free doctor consultations across general physicians and medical specialists.',
        points: [
          '24/7 instant digital access to verified doctors via the ACKO mobile app.',
          'Unlimited digital teleconsultations at zero extra charge.',
          'Instant digital prescriptions for routine health queries.'
        ]
      },
      {
        id: 'second-opinion',
        title: 'Second Opinion',
        subtitle: 'Independent Expert Second Opinion Consultations for Critical Illnesses',
        badge: 'SECOND OPINION',
        iconType: 'heart',
        summary: 'Second opinion consultations from qualified independent medical specialists for major critical illnesses and planned surgeries.',
        points: [
          'Access to qualified specialists for independent evaluation of treatment plans.',
          'Covers major critical illnesses, scheduled surgeries, and severe diagnoses.',
          'Helps policyholders make well-informed healthcare decisions.'
        ]
      },
      {
        id: 'domestic-evacuation',
        title: 'Domestic Evacuation',
        subtitle: 'On-Site Rescue & Emergency Domestic Medical Evacuation Assistance',
        badge: 'DOMESTIC EVACUATION',
        iconType: 'truck',
        summary: 'On-site rescue / domestic evacuation assistance to transfer the patient to the nearest specialized medical facility.',
        points: [
          'Emergency rescue and evacuation coordination in life-threatening situations.',
          'Assists transfer to well-equipped tertiary hospital centers.',
          'Comprehensive logistical support during acute emergencies.'
        ]
      },
      {
        id: 'organ-donor-expenses',
        title: 'Organ Donor Expenses',
        subtitle: 'In-Patient Hospitalization Costs of the Organ Donor Covered',
        badge: 'ORGAN DONOR',
        iconType: 'heart',
        summary: 'Eligible organ donor-related expenses covered for harvesting the organ for the insured member.',
        points: [
          'Covers in-patient hospitalization costs incurred by the organ donor.',
          'Complies with the Transplantation of Human Organs Act guidelines.',
          'Supports critical organ replacement surgeries without extra financial stress.'
        ]
      },
      {
        id: 'ayush-treatment',
        title: 'AYUSH Treatment',
        subtitle: 'Inpatient Alternative Medicine Care (Ayurveda, Yoga, Unani, Siddha, Homeopathy)',
        badge: 'AYUSH COVERED',
        iconType: 'globe',
        summary: 'Ayurveda, Yoga & Naturopathy, Unani, Siddha aur Homeopathy treatments covered in recognized government/NABH accredited AYUSH hospitals.',
        points: [
          'Covers in-patient treatment in recognized government/accredited AYUSH hospitals.',
          'Supported up to the applicable base Sum Insured.',
          'Holistic health therapies under recognized traditional medical systems.'
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 3. ADDITIONAL (2 Benefits)
  // ---------------------------------------------------------------------------
  {
    id: 'additional',
    title: 'ADDITIONAL',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'vision-care',
        title: 'Vision Care',
        subtitle: 'Refractive Error ≥ ±7.5 Dioptres & Disease/Accident Eyesight Correction',
        badge: 'VISION CARE',
        iconType: 'cpu',
        summary: 'Refractive error ≥ ±7.5 dioptres aur accident/disease-related eyesight damage treatment covered as per policy terms.',
        points: [
          'Covers surgical correction of severe refractive errors exceeding ±7.5 dioptres.',
          'Covers treatment for eyesight damage caused by accidental trauma or disease.',
          'Protects visual health against severe optical impairments.'
        ]
      },
      {
        id: 'accident-dental-treatment',
        title: 'Accident-related Dental Treatment',
        subtitle: 'Hospital Dental Surgery & Repair Required Due to Accidental Trauma',
        badge: 'DENTAL INJURY',
        iconType: 'award',
        summary: 'Accident ke wajah se required eligible dental treatment and surgical repair requiring hospital admission covered.',
        points: [
          'Covers dental surgeries necessitated by sudden accidental trauma to natural teeth.',
          'Requires in-patient hospitalization or recognized day care procedure.',
          'Routine cosmetic and preventive dental care excluded.'
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 4. optional (6 Exclusions / Policy Parameters)
  // ---------------------------------------------------------------------------
  {
    id: 'optional',
    title: 'optional',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    items: [
      {
        id: 'maternity-childbirth',
        title: 'Maternity & Childbirth',
        subtitle: 'Hospitalization Not Covered; Specified Accident Miscarriage/Ectopic Covered',
        badge: 'NOT COVERED',
        iconType: 'heart',
        summary: 'Hospitalization expenses generally not covered; specified accident-related miscarriage/ectopic pregnancy coverage as applicable.',
        points: [
          'Routine maternity delivery and normal/C-section childbirth expenses are not covered.',
          'Ectopic pregnancy and life-threatening medical emergencies covered as specified.',
          'Refer to official policy terms for specific emergency exceptions.'
        ]
      },
      {
        id: 'opd-consultations',
        title: 'OPD Consultations',
        subtitle: 'Bina Hospitalization Ke Doctor Consultations Not Covered',
        badge: 'NOT COVERED',
        iconType: 'clipboard',
        summary: 'Bina hospitalization ke doctor consultations and standalone pharmacy bills not covered under inpatient coverage.',
        points: [
          'Standalone outpatient clinic visits and pharmacy purchases are excluded.',
          'Unlimited digital doctor teleconsultations available free on the ACKO app.',
          'Pre & post hospitalization expenses within 60/180 days covered when linked to hospital stay.'
        ]
      },
      {
        id: 'worldwide-emergency-hospitalisation',
        title: 'Worldwide Emergency Hospitalisation',
        subtitle: 'India Ke Bahar Emergency Hospitalization Not Covered',
        badge: 'NOT COVERED',
        iconType: 'globe',
        summary: 'India ke bahar emergency hospitalization not covered; coverage valid exclusively within recognized hospitals across India.',
        points: [
          'Coverage applies strictly to medical treatments taken within India.',
          'Overseas hospital admissions and medical treatments abroad are excluded.',
          'Travelers are advised to acquire dedicated international travel health insurance.'
        ]
      },
      {
        id: 'infertility-treatments',
        title: 'Infertility Treatments',
        subtitle: 'Infertility Treatments (IVF, IUI, ICSI) Not Covered',
        badge: 'NOT COVERED',
        iconType: 'zap',
        summary: 'Infertility treatments including IVF, IUI, and assisted reproductive procedures not covered under the policy terms.',
        points: [
          'In vitro fertilization (IVF), IUI, and ICSI treatments are excluded.',
          'Diagnostic investigations and hormone therapies for infertility are excluded.',
          'Standard permanent exclusion under the policy terms.'
        ]
      },
      {
        id: 'bariatric-surgery',
        title: 'Bariatric Surgery',
        subtitle: 'Generally Not Covered Unless Life-Threatening Condition Ke Liye Medically Necessary',
        badge: 'CONDITIONAL / EXCLUDED',
        iconType: 'activity',
        summary: 'Generally not covered unless life-threatening condition ke liye medically necessary as per strict clinical criteria.',
        points: [
          'Elective obesity and aesthetic weight-reduction surgeries are not covered.',
          'Covered only when medically necessary for life-threatening conditions (BMI > 40 with severe comorbidities).',
          'Requires prior clinical approval from the insurer.'
        ]
      },
      {
        id: 'cosmetic-plastic-surgery',
        title: 'Cosmetic/Plastic Surgery',
        subtitle: 'Non-Medically Necessary Procedures Not Covered',
        badge: 'NOT COVERED',
        iconType: 'cpu',
        summary: 'Non-medically necessary procedures, aesthetic enhancements, and cosmetic surgeries are not covered.',
        points: [
          'Elective cosmetic, aesthetic, and plastic procedures are excluded.',
          'Reconstructive surgery following accidental burns/trauma covered on medical advice.',
          'Standard permanent exclusion under the policy wording.'
        ]
      }
    ]
  }
];

export const ACKO_PLATINUM_LIMITATIONS = {
  heading: 'LIMITATIONS & WAITING PERIODS',
  subheading: 'Terms, Waiting Periods & Exclusions',
  items: [
    {
      id: 'initial-waiting-period',
      title: 'Zero / 30 Days Initial Waiting Period',
      durationTag: '0 / 30 DAYS',
      summary: 'Zero waiting period applies for healthy families with no declared pre-existing conditions; standard 30-day initial waiting period applies otherwise for non-accidental illnesses.',
      highlight: 'Accidental hospitalizations covered immediately from Day 1.'
    },
    {
      id: 'ped-waiting-period',
      title: 'Pre-Existing Diseases (PED)',
      durationTag: '0 TO 36 MONTHS',
      summary: 'Declared pre-existing medical conditions covered as per underwriting schedule and continuous policy tenure.',
      highlight: 'Full portability credits recognized from prior continuous health policies.'
    },
    {
      id: 'general-exclusions',
      title: 'General Permanent Exclusions',
      durationTag: 'STANDARD EXCLUSIONS',
      summary: 'Routine OPD clinic visits, elective cosmetic surgery, infertility/IVF procedures, and treatments outside India are excluded.',
      exclusionsList: [
        'Outpatient doctor consultations and routine pharmacy bills without hospitalization',
        'Elective aesthetic or cosmetic surgeries unless necessitated by accidental burns/trauma',
        'Infertility treatments including IVF, IUI, and ICSI',
        'Medical emergency hospitalization and treatment outside India'
      ]
    }
  ]
};

export const ACKO_PLATINUM_MUST_KNOW = {
  heading: 'MUST KNOW DETAILS',
  subheading: 'Key product takeaways',
  items: [
    {
      id: 'enhanced-sum-insured-feature',
      icon: '🛡️',
      title: '₹1 Crore & Unlimited Sum Insured',
      summary: 'High-value financial security with ₹1 Crore and Unlimited Sum Insured options to handle major medical emergencies.'
    },
    {
      id: '100-percent-bill-payment-plat',
      icon: '💯',
      title: '100% Hospital Bill Payment with Consumables',
      summary: 'Inpatient hospital bills paid in full, including surgical and medical consumables like masks, gloves, and cotton.'
    },
    {
      id: 'no-room-rent-capping-plat',
      icon: '🏥',
      title: 'Zero Room Rent Capping & No ICU Limits',
      summary: 'Freedom to select any hospital room category without proportionate deduction penalties; no daily cap on ICU charges.'
    },
    {
      id: 'zero-waiting-period-plat',
      icon: '⚡',
      title: 'Zero Waiting Period for Healthy Families',
      summary: 'Instant day-one coverage for healthy families with no pre-existing conditions.'
    },
    {
      id: 'inflation-protection-plat',
      icon: '📈',
      title: '10% Annual Inflation Protection',
      summary: 'Sum Insured increases by 10% every year upon renewal, accumulating up to 100% of the base Sum Insured.'
    },
    {
      id: 'pre-post-180-days-plat',
      icon: '📅',
      title: '60 Days Pre & 180 Days Post Hospitalization',
      summary: 'Industry-leading 180-day post-hospitalization coverage window ensures follow-up medicines and diagnostic tests are reimbursed.'
    }
  ]
};

export const ACKO_PLATINUM_BEST_SUITED_FOR = {
  heading: 'PERFECT FOR',
  subheading: 'Who is this plan perfect for?',
  description: 'Target customer profiles and ideal family scenarios for ACKO Platinum.',
  profiles: [
    {
      title: 'High-Net-Worth Individuals & Families',
      icon: '💎',
      summary: 'Individuals and families seeking premier high-sum-insured coverage (₹1 Crore to Unlimited) to safeguard against catastrophic medical events.',
      badge: '₹1 Cr - Unlimited',
      highlights: [
        'Sum Insured options: ₹1 Crore and Unlimited Sum Insured',
        '100% hospital bill payment including medical consumables',
        'No room rent limits — choose any room category'
      ]
    },
    {
      title: 'Families Seeking Day-One Zero Waiting Period',
      icon: '👨‍👩‍👧‍👦',
      summary: 'Healthy families with no pre-existing conditions looking for instant Day-1 active coverage without standard 30-day initial waiting delays.',
      badge: 'Day 1 Coverage',
      highlights: [
        'Zero waiting period for healthy families with no pre-existing conditions',
        'Day-one coverage for sudden illnesses and accidents',
        'Seamless policy activation and instant cashless approval'
      ]
    },
    {
      title: 'Healthcare Inflation & Wealth Protection Seekers',
      icon: '📈',
      summary: 'Policyholders wanting their coverage to grow with double-digit healthcare inflation via 10% annual bonus additions up to 100% of base SI.',
      badge: 'Inflation Shield',
      highlights: [
        '10% annual Sum Insured enhancement upon renewal',
        'Up to 100% cumulative bonus accumulation at zero extra cost',
        'Protects savings against escalating medical hospital rates'
      ]
    },
    {
      title: 'Digital-First Users Wanting Unlimited Teleconsultations',
      icon: '📱',
      summary: 'Tech-savvy users who value 24/7 unlimited free doctor teleconsultations, free annual check-ups, and AYUSH alternative treatments.',
      badge: 'Direct Digital',
      highlights: [
        'Unlimited free 24/7 doctor teleconsultations on ACKO app',
        'Free yearly health check-up for all adult members (18+)',
        'Section 80D tax savings & AYUSH inpatient coverage'
      ]
    }
  ]
};

// =============================================================================
// MASTER PLAN DATA CONFIGURATION
// =============================================================================
export const ACKO_PLANS_DATA = {
  'platinum-super-top-up': {
    planId: 'platinum-super-top-up',
    planName: 'Platinum Super Top Up',
    companyName: 'ACKO',
    fullName: 'ACKO Platinum Super Top Up',
    tagline: 'High-value super top-up health coverage from ₹10 Lakh to Unlimited Sum Insured with 100% bill payment and zero room rent limits.',
    coverage: '₹10 Lakh - Unlimited',
    premium: '₹3,200/year',
    benefits: [
      'Sum Insured from ₹10 Lakh up to Unlimited',
      '100% Hospital Bill Payment including Consumables',
      'Zero Room Rent Capping & No ICU Restrictions',
      '60 Days Pre & 180 Days Post Hospitalization'
    ],
    details: {
      eligibility: 'Adults 18+ to Lifelong | Dependent Children 3 months to 25 years',
      waitingPeriod: 'Zero waiting period for healthy families; 30 days standard / up to 36 months PED',
      roomRent: 'Any Room Category without restriction (No room rent cap)',
      hospitalization: '100% Hospital Bill Payment including consumables (gloves, masks, cotton)',
      prePostHospital: '60 Days Pre & 180 Days Post Hospitalization',
      dayCare: 'All recognized day care treatments requiring < 24h stay covered',
      noClaimBonus: 'High coverage enhancement over base deductible',
      exclusions: 'Routine OPD, elective cosmetic surgery, IVF/infertility, treatment outside India'
    },
    featuresSections: ACKO_PLATINUM_SUPER_TOP_UP_FEATURES_SECTIONS,
    reportCard: ACKO_SHARED_REPORT_CARD,
    companyStrength: ACKO_SHARED_COMPANY_STRENGTH,
    limitationsWaitingPeriods: ACKO_PLATINUM_SUPER_TOP_UP_LIMITATIONS,
    mustKnow: ACKO_PLATINUM_SUPER_TOP_UP_MUST_KNOW,
    bestSuitedFor: ACKO_PLATINUM_SUPER_TOP_UP_BEST_SUITED_FOR,
    sources: ACKO_SOURCES,
    uiConfig: {
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  },

  'platinum-lite': {
    planId: 'platinum-lite',
    planName: 'Platinum Lite',
    companyName: 'ACKO',
    fullName: 'ACKO Platinum Lite',
    tagline: 'Comprehensive base health insurance with ₹10 Lakh to ₹1 Crore coverage, 100% bill payment with consumables, and 10% annual inflation protection.',
    coverage: '₹10 Lakh - ₹1 Crore',
    premium: '₹5,800/year',
    benefits: [
      'Sum Insured Options: ₹10 Lakh, ₹25 Lakh, ₹50 Lakh & ₹1 Crore',
      '100% Hospital Bill Payment including Consumables',
      'No Room Rent Limits & No ICU Restrictions',
      '10% Annual Insurance Inflation Protection'
    ],
    details: {
      eligibility: 'Adults 18+ to Lifelong | Dependent Children 3 months to 25 years',
      waitingPeriod: '30 Days Initial, 2 Years Specific Illnesses, 3 Years PED',
      roomRent: 'Any Hospital Room without restriction (No room rent cap / No ICU limit)',
      hospitalization: '100% Hospital Bill Payment including consumables (gloves, masks, cotton)',
      prePostHospital: '60 Days Pre & 180 Days Post Hospitalization',
      dayCare: 'All recognized day care treatments completed in < 24h covered',
      noClaimBonus: '10% Annual Inflation Protection up to 100% of Base Sum Insured',
      exclusions: 'Routine OPD, elective cosmetic surgery, IVF/infertility, external congenital, treatment outside India'
    },
    featuresSections: ACKO_PLATINUM_LITE_FEATURES_SECTIONS,
    reportCard: ACKO_SHARED_REPORT_CARD,
    companyStrength: ACKO_SHARED_COMPANY_STRENGTH,
    limitationsWaitingPeriods: ACKO_PLATINUM_LITE_LIMITATIONS,
    mustKnow: ACKO_PLATINUM_LITE_MUST_KNOW,
    bestSuitedFor: ACKO_PLATINUM_LITE_BEST_SUITED_FOR,
    sources: ACKO_SOURCES,
    uiConfig: {
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  },

  'platinum': {
    planId: 'platinum',
    planName: 'Platinum',
    companyName: 'ACKO',
    fullName: 'ACKO Platinum Health Insurance',
    tagline: 'Premier high-value health insurance with ₹1 Crore and Unlimited Sum Insured options, zero room rent limits, zero waiting period, and 100% bill payment.',
    coverage: '₹1 Crore - Unlimited',
    premium: '₹8,500/year',
    benefits: [
      'Enhanced Sum Insured: ₹1 Crore & Unlimited Options',
      '100% Hospital Bill Payment with Consumables',
      'Zero Waiting Period for Healthy Families',
      'No Room Rent Limits & 10% Inflation Protection'
    ],
    details: {
      eligibility: 'Adults 18+ to Lifelong | Dependent Children 3 months to 25 years',
      waitingPeriod: 'Zero waiting period for healthy families; 30 days standard / declared PED',
      roomRent: 'Any Hospital Room without restriction (No room rent cap / No ICU limits)',
      hospitalization: '100% Hospital Bill Payment including consumables (masks, gloves, cotton)',
      prePostHospital: '60 Days Pre & 180 Days Post Hospitalization',
      dayCare: 'All recognized day care treatments completed in < 24h covered',
      noClaimBonus: '10% Annual Inflation Protection up to 100% of Base Sum Insured',
      exclusions: 'Routine OPD, elective cosmetic surgery, infertility treatments, treatment outside India'
    },
    featuresSections: ACKO_PLATINUM_FEATURES_SECTIONS,
    reportCard: ACKO_SHARED_REPORT_CARD,
    companyStrength: ACKO_SHARED_COMPANY_STRENGTH,
    limitationsWaitingPeriods: ACKO_PLATINUM_LIMITATIONS,
    mustKnow: ACKO_PLATINUM_MUST_KNOW,
    bestSuitedFor: ACKO_PLATINUM_BEST_SUITED_FOR,
    sources: ACKO_SOURCES,
    uiConfig: {
      demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  }
};

export const resolveAckoPlanId = (planId) => {
  if (!planId) return null;
  const cleanId = String(planId).toLowerCase().trim();
  if (
    cleanId === 'platinum' ||
    cleanId === 'acko-platinum' ||
    cleanId === 'acko platinum' ||
    cleanId === 'platinum-health' ||
    cleanId === 'platinum health'
  ) {
    return 'platinum';
  }
  if (
    cleanId === 'platinum-lite' ||
    cleanId === 'platinum lite' ||
    cleanId === 'platinumlite' ||
    cleanId === 'acko-platinum-lite' ||
    cleanId === 'acko-platinumlite' ||
    cleanId === 'lite'
  ) {
    return 'platinum-lite';
  }
  if (
    cleanId === 'platinum-super-top-up' ||
    cleanId === 'platinum super top up' ||
    cleanId === 'platinum-super-topup' ||
    cleanId === 'super-top-up' ||
    cleanId === 'super-topup' ||
    cleanId === 'acko-platinum-super-top-up' ||
    cleanId === 'acko-super-top-up'
  ) {
    return 'platinum-super-top-up';
  }
  return cleanId;
};

export const getAckoPlanData = (planId) => {
  const canonicalId = resolveAckoPlanId(planId);
  return ACKO_PLANS_DATA[canonicalId] || null;
};

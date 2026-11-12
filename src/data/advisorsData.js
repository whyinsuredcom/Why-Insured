/**
 * WHYINSURED Health Insurance Advisor Directory
 *
 * 8 distinct health insurance advisory profiles.
 * In accordance with WHYINSURED platform guidelines:
 * - Unverified qualifications, licensing, and direct contact details are NOT fabricated.
 * - All advisors share equal importance without featured badges or popularity rankings.
 */
import dishantPhoto from '../assets/advisors/dishant-gupta.jpg';

export const ADVISOR_CATEGORIES = [
  { id: 'all', label: 'All Advisors' },
  { id: 'general', label: 'General Health Insurance' },
  { id: 'senior-citizen', label: 'Senior Citizen' },
  { id: 'family-floater', label: 'Family Floater' },
  { id: 'critical-illness', label: 'Critical Illness' },
  { id: 'claims-guidance', label: 'Claims Guidance' },
  { id: 'portability', label: 'Portability' },
  { id: 'cashless-network', label: 'Cashless Network' },
  { id: 'policy-review', label: 'Policy Review' }
];

export const advisorsData = [
  {
    id: 'adv-dishant-gupta',
    name: 'Dishant Gupta',
    slug: 'dishant-gupta',
    category: 'Health Insurance Advisor',
    categoryKey: 'general',
    profileImage: dishantPhoto,
    shortDescription: 'Advises individuals and families on selecting comprehensive health insurance plans with transparent policy terms and room-rent limits.',
    expertise: ['Health Insurance Evaluation', 'Policy Fine Print', 'Coverage Planning'],
    intro: [
      'Dishant Gupta provides objective health insurance guidance, assisting individuals and families in evaluating health plans suited to their medical needs and financial requirements.',
      'His advisory approach focuses on understanding policy contracts thoroughly, decoding restrictive clauses such as room-rent sub-limits, proportionate deductions, restoration triggers, and mandatory waiting periods.',
      'He helps clients evaluate whether standard base indemnity policies, super top-ups, or modular healthcare covers offer the right balance of protection.'
    ],
    guidancePoints: [
      {
        title: 'Sum Insured Adequacy',
        desc: 'Analyzing family size, medical inflation trends, and regional healthcare costs to establish appropriate coverage limits.'
      },
      {
        title: 'Room Rent Capping Scrutiny',
        desc: 'Identifying policies with proportionate deduction clauses to prevent unexpected out-of-pocket hospital deductions.'
      },
      {
        title: 'Waiting Period Clarity',
        desc: 'Explaining standard 30-day initial waiting, 2-year specific illness, and pre-existing condition timelines.'
      }
    ],
    consultation: {
      mode: 'Online & Telephonic Advisory',
      availability: 'Mon – Sat (10:00 AM – 6:30 PM IST)',
      email: 'whyinsured3@gmail.com',
      location: 'India'
    }
  },
  {
    id: 'adv-priya-verma',
    name: 'Priya Verma',
    slug: 'priya-verma',
    category: 'Senior Citizen Health Insurance',
    categoryKey: 'senior-citizen',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Assists families in securing comprehensive healthcare protection for elderly parents with manageable co-pays and pre-existing disease terms.',
    expertise: ['Senior Citizen Plans', 'Pre-Existing Conditions', 'Co-payment Analysis'],
    intro: [
      'Priya Verma specializes in senior citizen health insurance advisory, helping families navigate the complexities of securing coverage for aging parents.',
      'Senior policies often contain mandatory co-payments, disease sub-limits, and medical underwriting prerequisites. Priya helps policyholders balance premium affordability against high out-of-pocket costs at the hospital.',
      'She guides families on critical medical disclosure practices, helping ensure claims for long-standing conditions are not jeopardized.'
    ],
    guidancePoints: [
      {
        title: 'Co-Payment Evaluation',
        desc: 'Analyzing trade-offs between zero co-pay options and plans with 10%–20% cost sharing for elderly policyholders.'
      },
      {
        title: 'Pre-Existing Disease Terms',
        desc: 'Assessing waiting periods for diabetes, hypertension, cardiac care, and chronic conditions.'
      },
      {
        title: 'Day-Care & OPD Coverage',
        desc: 'Ensuring plans adequately cover modern treatments, dialysis, chemotherapy, and day-care procedures.'
      }
    ],
    consultation: {
      mode: 'Online & Telephonic Advisory',
      availability: 'Mon – Sat (11:00 AM – 7:00 PM IST)',
      email: 'whyinsured3@gmail.com',
      location: 'India'
    }
  },
  {
    id: 'adv-rahul-sharma',
    name: 'Rahul Sharma',
    slug: 'rahul-sharma',
    category: 'Family Floater Insurance',
    categoryKey: 'family-floater',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Specializes in multi-member family floater structuring, sum insured restoration triggers, and balanced health coverage.',
    expertise: ['Family Floater Plans', 'Restoration Benefits', 'Multi-Individual Structuring'],
    intro: [
      'Rahul Sharma advises families on structuring joint healthcare protection, evaluating when a family floater is advantageous compared to separate individual policies.',
      'He assists clients in understanding how sum insured refill benefits trigger, whether restoration applies to related or unrelated illnesses, and how older family members impact collective premiums.',
      'His consultations aim to ensure growing families have resilient health coverage that accommodates new dependents seamlessly.'
    ],
    guidancePoints: [
      {
        title: 'Floater vs Individual Analysis',
        desc: 'Determining the optimal split between joint floater limits and individual policies based on member age profiles.'
      },
      {
        title: 'Restoration Benefit Mechanics',
        desc: 'Clarifying complete sum insured refills for same versus different illnesses in a single policy year.'
      },
      {
        title: 'Newborn & Maternity Inclusions',
        desc: 'Evaluating waiting periods and coverage boundaries for maternity complications and infant healthcare.'
      }
    ],
    consultation: {
      mode: 'Online & Telephonic Advisory',
      availability: 'Mon – Fri (10:00 AM – 6:00 PM IST)',
      email: 'whyinsured3@gmail.com',
      location: 'India'
    }
  },
  {
    id: 'adv-neha-kapoor',
    name: 'Neha Kapoor',
    slug: 'neha-kapoor',
    category: 'Critical Illness Coverage',
    categoryKey: 'critical-illness',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Guides policyholders on fixed-benefit critical illness protection, cancer riders, and supplemental high-deductible top-up plans.',
    expertise: ['Critical Illness Riders', 'Lump-Sum Benefits', 'Super Top-up Planning'],
    intro: [
      'Neha Kapoor focuses on critical illness advisory and supplemental healthcare financing, ensuring policyholders are financially protected against life-altering diagnoses.',
      'While standard health insurance pays hospital bills via indemnity, critical illness plans pay a lump-sum upon diagnosis. Neha guides clients on evaluating listed illness definitions and survival period stipulations.',
      'She also assists in structuring cost-effective super top-up policies with matching deductibles over corporate base plans.'
    ],
    guidancePoints: [
      {
        title: 'Listed Critical Conditions',
        desc: 'Reviewing clinical criteria for cardiac conditions, cancer stages, stroke, and organ transplants.'
      },
      {
        title: 'Survival Period Requirements',
        desc: 'Explaining mandatory 30-day survival clauses common across lump-sum critical illness contracts.'
      },
      {
        title: 'Super Top-up Deductible Alignment',
        desc: 'Matching top-up deductible thresholds with existing corporate or retail base sums.'
      }
    ],
    consultation: {
      mode: 'Online & Telephonic Advisory',
      availability: 'Mon – Sat (10:30 AM – 6:30 PM IST)',
      email: 'whyinsured3@gmail.com',
      location: 'India'
    }
  },
  {
    id: 'adv-amit-malhotra',
    name: 'Amit Malhotra',
    slug: 'amit-malhotra',
    category: 'Health Insurance Claims Guidance',
    categoryKey: 'claims-guidance',
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Provides step-by-step guidance on cashless hospital admission protocols, mandatory claim documentation, and intimation timelines.',
    expertise: ['Cashless Claims', 'Reimbursement Filing', 'Hospital Discharge Summary'],
    intro: [
      'Amit Malhotra offers practical guidance on health insurance claim processes, helping policyholders understand requirements before, during, and after hospitalization.',
      'He assists families in assembling itemized bills, doctor prescriptions, indoor case sheets, and payment receipts to ensure smooth reimbursement filings.',
      'For planned and emergency cashless admissions, Amit explains how TPA pre-authorization requests are initiated and how common document deductions can be avoided.'
    ],
    guidancePoints: [
      {
        title: 'Pre-Authorization Timelines',
        desc: 'Initiating planned admission intimations 48–72 hours prior, or within 24 hours in emergencies.'
      },
      {
        title: 'Mandatory Paperwork Checklists',
        desc: 'Compiling discharge cards, itemized pharmacy bills, diagnostic reports, and final stamped receipts.'
      },
      {
        title: 'Non-Medical Deductions',
        desc: 'Understanding non-payable consumables, registration charges, and administrative exclusions.'
      }
    ],
    consultation: {
      mode: 'Online & Telephonic Advisory',
      availability: 'Mon – Sat (9:30 AM – 6:00 PM IST)',
      email: 'whyinsured3@gmail.com',
      location: 'India'
    }
  },
  {
    id: 'adv-sneha-mehta',
    name: 'Sneha Mehta',
    slug: 'sneha-mehta',
    category: 'Health Insurance Portability',
    categoryKey: 'portability',
    profileImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Advises policyholders on porting existing health insurance to new insurers without losing accumulated waiting period credits.',
    expertise: ['Policy Portability', 'Waiting Period Continuity', 'Insurer Transition'],
    intro: [
      'Sneha Mehta assists policyholders who want to transition from their current insurance company to another provider without resetting their waiting periods.',
      'Under IRDAI portability regulations, policyholders can transfer their base sum insured and accrued waiting credits if submitted at least 45 days prior to renewal.',
      'Sneha helps clients verify that cumulative bonuses, pre-existing disease credits, and continuity records are transferred accurately.'
    ],
    guidancePoints: [
      {
        title: 'Portability Timelines',
        desc: 'Ensuring portability applications are submitted between 60 and 45 days before the policy expiry date.'
      },
      {
        title: 'Credit Transfer Verification',
        desc: 'Safeguarding accrued waiting period credits for pre-existing diseases and specific ailments.'
      },
      {
        title: 'Cumulative Bonus Treatment',
        desc: 'Reviewing whether accumulated no-claim bonuses convert into enhanced sum insured or premium discounts.'
      }
    ],
    consultation: {
      mode: 'Online & Telephonic Advisory',
      availability: 'Mon – Fri (10:00 AM – 6:30 PM IST)',
      email: 'whyinsured3@gmail.com',
      location: 'India'
    }
  },
  {
    id: 'adv-vikas-yadav',
    name: 'Vikas Yadav',
    slug: 'vikas-yadav',
    category: 'Cashless Network Guidance',
    categoryKey: 'cashless-network',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Helps policyholders identify active network hospitals, understand TPA desks, and navigate cashless pre-authorization procedures.',
    expertise: ['Network Hospitals', 'TPA Coordination', 'Pre-Authorization'],
    intro: [
      'Vikas Yadav guides policyholders on accessing cashless treatment across India’s hospital networks, explaining hospital empanelment lists and TPA desks.',
      'Even when an insurer advertises 10,000+ hospitals, specific hospital branches or specialties may occasionally be excluded or de-paneled.',
      'Vikas helps policyholders verify network hospital status prior to planned treatments, understand security deposits, and navigate initial admission paperwork.'
    ],
    guidancePoints: [
      {
        title: 'Active Network Verification',
        desc: 'Confirming whether a treating hospital maintains active cashless empanelment with the insurer or TPA.'
      },
      {
        title: 'Initial Authorization Approvals',
        desc: 'Understanding initial provisional clearance amounts and final discharge claim settlement workflows.'
      },
      {
        title: 'TPA Desk Coordination',
        desc: 'Coordinating with the hospital insurance desk to resolve medical documentation queries promptly.'
      }
    ],
    consultation: {
      mode: 'Online & Telephonic Advisory',
      availability: 'Mon – Sat (10:00 AM – 6:00 PM IST)',
      email: 'whyinsured3@gmail.com',
      location: 'India'
    }
  },
  {
    id: 'adv-pooja-agarwal',
    name: 'Pooja Agarwal',
    slug: 'pooja-agarwal',
    category: 'Health Insurance Policy Review',
    categoryKey: 'policy-review',
    profileImage: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Conducts comprehensive reviews of active health policies to identify hidden room rent sub-limits, disease caps, and coverage gaps.',
    expertise: ['Policy Audit', 'Sub-Limit Identification', 'Exclusion Scrutiny'],
    intro: [
      'Pooja Agarwal focuses on policy audit and contract review, helping clients inspect existing policies they may have purchased years ago without full fine-print awareness.',
      'Many legacy policies contain restrictive 1% room rent limits, single-disease sub-limits, or outdated consumable exclusion clauses that cause large hospital bill deductions.',
      'Pooja helps policyholders audit their schedules, identifying critical gaps and evaluating whether upgrades or modern endorsements are recommended.'
    ],
    guidancePoints: [
      {
        title: 'Legacy Clause Inspection',
        desc: 'Identifying dated 1% or 2% room rent caps that trigger proportionate doctor and surgery deductions.'
      },
      {
        title: 'Sub-Limit Detection',
        desc: 'Checking for disease-specific ceilings on cataract, joint replacement, cardiac procedures, or hernia treatments.'
      },
      {
        title: 'Modern Treatment Coverage',
        desc: 'Verifying inclusion of robotic surgeries, stem cell therapies, and deep brain stimulation covers.'
      }
    ],
    consultation: {
      mode: 'Online & Telephonic Advisory',
      availability: 'Mon – Fri (11:00 AM – 7:00 PM IST)',
      email: 'whyinsured3@gmail.com',
      location: 'India'
    }
  }
];

export const getActiveAdvisors = () => {
  return advisorsData;
};

export const getAdvisorBySlug = (slug) => {
  if (!slug) return null;
  const cleanSlug = String(slug).toLowerCase().trim();
  return advisorsData.find(advisor => advisor.slug.toLowerCase() === cleanSlug) || null;
};

export const getAdvisorById = (id) => {
  if (!id) return null;
  return advisorsData.find(advisor => advisor.id === id) || null;
};

export default advisorsData;

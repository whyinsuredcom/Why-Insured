/**
 * WHYINSURED – Insurance Academy Video Directory
 * 
 * Clean, structured video dataset for learning and understanding health insurance.
 * Ready for YouTube video embeds and durations as videos are published.
 */

export const ACADEMY_CATEGORIES = [
  'All Videos',
  'Claims',
  'Documents',
  'Experience',
  'Policy Basics'
];

export const ACADEMY_VIDEOS = [
  // -------------------------------------------------------------
  // CLAIMS (4 videos)
  // -------------------------------------------------------------
  {
    id: 'claims-cashless-walkthrough',
    title: 'Cashless Hospitalization: Step-by-Step TPA Desk Process',
    topic: 'Cashless Hospitalization',
    category: 'Claims',
    type: 'long',
    duration: null, // Ready for genuine duration when published
    youtubeId: null, // Ready for YouTube video ID
    videoUrl: null,
    thumbnail: null,
    description: 'Detailed guide on how cashless admission, pre-authorization, and final settlement work at network hospitals.'
  },
  {
    id: 'claims-reimbursement-filing',
    title: 'Reimbursement Claim Filing & Necessary Bill Submission',
    topic: 'Reimbursement Claims',
    category: 'Claims',
    type: 'long',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'How to file a reimbursement claim after treatment at non-network hospitals without missing crucial paperwork.'
  },
  {
    id: 'claims-rejection-reasons',
    title: 'Top Reasons Health Insurance Claims Get Delayed or Rejected',
    topic: 'Claim Rejection Prevention',
    category: 'Claims',
    type: 'long',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'Understand common pitfalls like waiting periods, non-disclosure, and unapproved treatments to protect your claim.'
  },
  {
    id: 'claims-emergency-intimation',
    title: 'Emergency Hospital Admission: First Steps & Intimation Timelines',
    topic: 'Emergency Admission',
    category: 'Claims',
    type: 'short',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'Quick 60-second action checklist when a family member is rushed to the hospital in an emergency.'
  },

  // -------------------------------------------------------------
  // DOCUMENTS (4 videos)
  // -------------------------------------------------------------
  {
    id: 'docs-cashless-checklist',
    title: 'Mandatory Documents Required for Cashless Hospital Admission',
    topic: 'Admission Documents',
    category: 'Documents',
    type: 'long',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'Every essential document you must present at the insurance desk: Health card, doctor prescription, and photo ID.'
  },
  {
    id: 'docs-discharge-summary',
    title: 'Discharge Summary & Itemized Final Bill Verification',
    topic: 'Discharge Papers',
    category: 'Documents',
    type: 'long',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'How to scrutinize the hospital final bill, non-medical consumables, and doctor visit logs before signing.'
  },
  {
    id: 'docs-policy-schedule',
    title: 'How to Read & Verify Your Health Insurance Policy Schedule',
    topic: 'Policy Schedule',
    category: 'Documents',
    type: 'short',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'Locate your Sum Insured, base deductions, member names, and inception dates on your policy schedule.'
  },
  {
    id: 'docs-investigation-reports',
    title: 'Investigation Reports & Doctor Prescription Papers Checklist',
    topic: 'Medical Records',
    category: 'Documents',
    type: 'short',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'Why keeping original diagnostic lab reports and first consultation papers is vital for hassle-free claim approval.'
  },

  // -------------------------------------------------------------
  // EXPERIENCE (4 videos)
  // -------------------------------------------------------------
  {
    id: 'exp-tpa-desk-real-walkthrough',
    title: 'What Really Happens at the Hospital TPA Cashless Desk?',
    topic: 'Hospital Desk Experience',
    category: 'Experience',
    type: 'long',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'Inside look at query raises, pre-auth approval letters, deduction disputes, and discharge settlement times.'
  },
  {
    id: 'exp-room-category-billing',
    title: 'Single Private Room vs Shared Room: Real Hospital Billing Scenarios',
    topic: 'Room Category Experience',
    category: 'Experience',
    type: 'short',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'Real client example of how opting for an upgraded room led to proportionate cuts across the entire surgical bill.'
  },
  {
    id: 'exp-portability-truths',
    title: 'Porting Health Insurance: What Insurers Don’t Tell You',
    topic: 'Portability Experience',
    category: 'Experience',
    type: 'long',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'The real timeline, underwriting medical checkups, and waiting period transfer rights when switching insurers.'
  },
  {
    id: 'exp-ped-disclosure-case',
    title: 'Pre-Existing Disease Disclosure: Real Hospital Settlement Truths',
    topic: 'Medical Disclosure',
    category: 'Experience',
    type: 'long',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'Why total honesty about diabetes, hypertension, or past surgeries during proposal prevents painful claim cancellations.'
  },

  // -------------------------------------------------------------
  // POLICY BASICS (4 videos)
  // -------------------------------------------------------------
  {
    id: 'basics-room-rent-limits',
    title: 'Room Rent Capping & Proportionate Deductions Explained',
    topic: 'Room Rent Capping',
    category: 'Policy Basics',
    type: 'long',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'Understand the single most costly clause in health insurance contracts and why Single Private Room is essential.'
  },
  {
    id: 'basics-sum-insured-super-topup',
    title: 'Sum Insured vs Deductible vs Super Top-Up: Key Differences',
    topic: 'Coverage Planning',
    category: 'Policy Basics',
    type: 'long',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'How to structure high sum insured protection cost-effectively using base plans combined with super top-up covers.'
  },
  {
    id: 'basics-waiting-periods',
    title: 'Health Insurance Waiting Periods Decoded: 30 Days to 3 Years',
    topic: 'Waiting Periods',
    category: 'Policy Basics',
    type: 'short',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'A 60-second breakdown of initial 30-day, 2-year specific illness, and pre-existing disease waiting timelines.'
  },
  {
    id: 'basics-restoration-benefit',
    title: 'Restoration Benefit: Unlimited vs Single Refill Explained',
    topic: 'Restoration Benefit',
    category: 'Policy Basics',
    type: 'long',
    duration: null,
    youtubeId: null,
    videoUrl: null,
    thumbnail: null,
    description: 'Does your restore benefit trigger for related illnesses, or only unrelated conditions? Learn how refill clauses work.'
  }
];

export default {
  ACADEMY_CATEGORIES,
  ACADEMY_VIDEOS
};


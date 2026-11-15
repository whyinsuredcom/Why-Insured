/**
 * WHYINSURED – Insurance Academy Complete Dataset
 * 
 * Comprehensive, structured educational content for India's healthcare & insurance education platform:
 * 1. ACADEMY_CATEGORIES
 * 2. ACADEMY_VIDEOS (Long Educational & Short Vertical 9:16 Videos)
 * 3. ACADEMY_ARTICLES (Deep-dive guides with reading times & key takeaways)
 * 4. ACADEMY_LEARNING_PATHS (Beginner, Intermediate, Advanced)
 * 5. ACADEMY_DICTIONARY (A-Z Glossary with definitions & practical tips)
 * 6. ACADEMY_FAQS (Frequently asked policyholder questions)
 * 7. ACADEMY_MYTHS (Insurance Myths vs. Facts)
 * 8. POLICY_EXPLAINED_TOPICS (In-depth policy clause breakdowns)
 * 9. CLAIM_ACADEMY_GUIDES (Cashless, Reimbursement, Documents, Timelines, Rejection Avoidance)
 */

import video2x from '../assets/2x coverage.mp4';
import videoPreventive from '../assets/Preventive.mp4';
import videoUnlimited from '../assets/unlimited.mp4';

export const ACADEMY_CATEGORIES = [
  'All',
  'Health Insurance',
  'Motor Insurance',
  'Life Insurance',
  'Travel Insurance',
  'Home Insurance',
  'Claims',
  'Policy Basics'
];

export const ACADEMY_VIDEOS = [
  // =========================================================================
  // FEATURED & LONG EDUCATIONAL VIDEOS (16:9)
  // =========================================================================
  {
    id: 'vid-2x-coverage-multiplier',
    title: 'How 2X Coverage & Automatic Restoration Multipliers Work in Modern Health Plans',
    slug: '2x-coverage-automatic-restoration',
    type: 'long',
    category: 'Health Insurance',
    topic: 'Coverage Multipliers & Restoration',
    duration: '0:22',
    durationSeconds: 22,
    videoUrl: video2x,
    thumbnail: null,
    views: '14.2K',
    viewsCount: 14200,
    uploadDate: '3 weeks ago',
    instructor: 'WHYINSURED Advisory Desk',
    isFeatured: true,
    isPublished: true,
    description: 'Learn how modern health insurance policies like Optima Secure instantly double your base sum insured from Day 1 and automatically reload your protection without claim deductions.',
    chapters: [
      { time: '0:00', title: 'Introduction to Coverage Multipliers', seconds: 0 },
      { time: '0:08', title: 'How 2X Base Protection Activates', seconds: 8 },
      { time: '0:15', title: 'Automatic Restoration Mechanics', seconds: 15 }
    ],
    takeaways: [
      'Base sum insured multiplies automatically without waiting for claim-free renewals.',
      'Restoration triggers across related and unrelated hospitalizations.',
      'No proportionate deduction on hospital room rent in modern multiplier covers.'
    ],
    tags: ['Restoration', 'Optima Secure', 'Health Insurance', 'Sum Insured', 'Coverage Multiplier']
  },
  {
    id: 'vid-preventive-care-health-checkup',
    title: 'Preventive Healthcare & Annual Health Checkups: What Your Policy Covers',
    slug: 'preventive-healthcare-annual-checkup',
    type: 'long',
    category: 'Health Insurance',
    topic: 'Preventive Health Care',
    duration: '0:26',
    durationSeconds: 26,
    videoUrl: videoPreventive,
    thumbnail: null,
    views: '9.8K',
    viewsCount: 9800,
    uploadDate: '1 month ago',
    instructor: 'WHYINSURED Health Specialists',
    isFeatured: false,
    isPublished: true,
    description: 'A complete breakdown of preventive medical health checkups, diagnostic reimbursement, and cashless wellness benefits provided under comprehensive insurance policies.',
    chapters: [
      { time: '0:00', title: 'Why Preventive Care Matters', seconds: 0 },
      { time: '0:10', title: 'Included Blood & Diagnostic Tests', seconds: 10 },
      { time: '0:18', title: 'How to Book Cashless Health Checkups', seconds: 18 }
    ],
    takeaways: [
      'Annual health checkups are cashless and do not affect your No Claim Bonus (NCB).',
      'Covers tests like lipid profile, complete blood count (CBC), HbA1c, and ECG.',
      'Available for all adult members enrolled under the family floater.'
    ],
    tags: ['Preventive Care', 'Annual Checkup', 'Wellness', 'Diagnostic Tests', 'Cashless Health']
  },
  {
    id: 'vid-unlimited-restoration-benefit',
    title: 'Unlimited Restoration Explained: Never Run Out of Sum Insured in a Single Year',
    slug: 'unlimited-restoration-benefit-explained',
    type: 'long',
    category: 'Health Insurance',
    topic: 'Restoration Benefits',
    duration: '0:50',
    durationSeconds: 50,
    videoUrl: videoUnlimited,
    thumbnail: null,
    views: '21.5K',
    viewsCount: 21500,
    uploadDate: '2 weeks ago',
    instructor: 'WHYINSURED Advisory Desk',
    isFeatured: false,
    isPublished: true,
    description: 'Understand how unlimited reload and automatic reinstatement clauses work during repeated hospitalizations in a single policy year for individuals and families.',
    chapters: [
      { time: '0:00', title: 'What is Unlimited Restoration?', seconds: 0 },
      { time: '0:18', title: 'Same Illness vs. Different Illness Rules', seconds: 18 },
      { time: '0:35', title: 'How Families Benefit from Shared Refills', seconds: 35 }
    ],
    takeaways: [
      'Refills 100% of the sum insured every time base cover gets exhausted.',
      'Check whether your policy allows restoration for the same illness or only different illnesses.',
      'Crucial safeguard for senior citizens and families undergoing prolonged treatments.'
    ],
    tags: ['Unlimited Restoration', 'Family Floater', 'Hospital Bills', 'Health Insurance']
  },
  {
    id: 'vid-cashless-hospitalization-mastery',
    title: 'Cashless Hospitalization: Complete Step-by-Step TPA Desk Procedure',
    slug: 'cashless-hospitalization-step-by-step',
    type: 'long',
    category: 'Claims',
    topic: 'Cashless Claims',
    duration: '12:40',
    durationSeconds: 760,
    videoUrl: null, // Ready for YouTube video ID or stream
    youtubeId: null,
    thumbnail: null,
    views: '34.1K',
    viewsCount: 34100,
    uploadDate: '1 month ago',
    instructor: 'WHYINSURED Claims Advisory',
    isFeatured: false,
    isPublished: true,
    description: 'A comprehensive walkthrough of the network hospital admission process, pre-authorization forms, initial approval timelines, and final discharge settlement without paying out of pocket.',
    chapters: [
      { time: '0:00', title: 'Planned vs Emergency Admission', seconds: 0 },
      { time: '03:15', title: 'Documents Needed at TPA Desk', seconds: 195 },
      { time: '06:40', title: 'Understanding Initial Pre-Authorization', seconds: 400 },
      { time: '09:20', title: 'Final Discharge & Non-Medical Deductions', seconds: 560 }
    ],
    takeaways: [
      'Intimate the insurer at least 48 hours in advance for planned procedures.',
      'Carry health card, government photo ID, doctor prescription, and diagnostic reports.',
      'Review non-medical consumable deductions before settling the final hospital balance.'
    ],
    tags: ['Cashless', 'Claims', 'TPA', 'Hospitalization', 'Pre-authorization']
  },
  {
    id: 'vid-room-rent-capping-explained',
    title: 'Room Rent Limits & Proportionate Deductions: The Biggest Claim Shock',
    slug: 'room-rent-limits-proportionate-deductions',
    type: 'long',
    category: 'Policy Basics',
    topic: 'Room Rent Capping',
    duration: '10:15',
    durationSeconds: 615,
    videoUrl: null,
    youtubeId: null,
    thumbnail: null,
    views: '28.9K',
    viewsCount: 28900,
    uploadDate: '3 weeks ago',
    instructor: 'WHYINSURED Policy Experts',
    isFeatured: false,
    isPublished: true,
    description: 'Decoding the single most common cause of high out-of-pocket hospital bills: How choosing a higher room category causes proportionate deductions across doctor fees, surgery, and nursing.',
    chapters: [
      { time: '0:00', title: 'The 1% Room Rent Myth', seconds: 0 },
      { time: '02:50', title: 'How Proportionate Deduction Math Works', seconds: 170 },
      { time: '06:10', title: 'Single Private Room vs No Capping', seconds: 370 },
      { time: '08:40', title: 'How to Upgrade Your Policy to Avoid Capping', seconds: 520 }
    ],
    takeaways: [
      'If your policy caps room rent at 1% and you choose a 2% room, your entire bill gets cut by 50%.',
      'Always look for "Single Private Room Eligibility" or "No Room Rent Sub-limit".',
      'ICU room rent limits must be checked separately from regular room rent.'
    ],
    tags: ['Room Rent', 'Proportionate Deduction', 'Policy Fine Print', 'Exclusions']
  },
  {
    id: 'vid-reimbursement-claim-filing',
    title: 'How to File a Health Insurance Reimbursement Claim Without Errors',
    slug: 'how-to-file-reimbursement-claim',
    type: 'long',
    category: 'Claims',
    topic: 'Reimbursement Process',
    duration: '14:20',
    durationSeconds: 860,
    videoUrl: null,
    youtubeId: null,
    thumbnail: null,
    views: '19.4K',
    viewsCount: 19400,
    uploadDate: '2 months ago',
    instructor: 'WHYINSURED Claims Desk',
    isFeatured: false,
    isPublished: true,
    description: 'When hospitalized in a non-network facility, follow this detailed checklist to compile your original bills, discharge summary, and pharmacy logs for smooth reimbursement.',
    chapters: [
      { time: '0:00', title: 'When Do You Need Reimbursement?', seconds: 0 },
      { time: '03:10', title: 'Original Document Verification Checklist', seconds: 190 },
      { time: '07:30', title: 'Filling the Claim Form Correctly', seconds: 450 },
      { time: '11:00', title: 'IRDAI 30-Day Settlement Timelines', seconds: 660 }
    ],
    takeaways: [
      'Never submit original documents without keeping notarized or clear digital copies.',
      'Submit claims within 15 to 30 days of hospital discharge.',
      'Pre-hospitalization (30/60 days) and post-hospitalization (60/180 days) bills must be filed separately.'
    ],
    tags: ['Reimbursement', 'Claims Filing', 'Discharge Summary', 'Non-network Hospital']
  },
  {
    id: 'vid-motor-insurance-zero-dep',
    title: 'Zero Depreciation vs Comprehensive Car Insurance: Is the Add-on Worth It?',
    slug: 'zero-depreciation-car-insurance-guide',
    type: 'long',
    category: 'Motor Insurance',
    topic: 'Zero Depreciation',
    duration: '08:50',
    durationSeconds: 530,
    videoUrl: null,
    youtubeId: null,
    thumbnail: null,
    views: '16.7K',
    viewsCount: 16700,
    uploadDate: '1 month ago',
    instructor: 'WHYINSURED Auto Team',
    isFeatured: false,
    isPublished: true,
    description: 'Compare standard motor comprehensive insurance with Zero Dep covers. Discover how depreciation on plastic, metal, and rubber parts drastically impacts your settlement.',
    chapters: [
      { time: '0:00', title: 'Standard Depreciation on Auto Parts', seconds: 0 },
      { time: '02:30', title: 'Bumper-to-Bumper (Zero Dep) Explained', seconds: 150 },
      { time: '05:40', title: 'Engine Protector & Return to Invoice Add-ons', seconds: 340 }
    ],
    takeaways: [
      'Standard insurance deducts 50% on plastic, nylon, and rubber parts.',
      'Zero Dep eliminates part depreciation, leaving only mandatory deductibles.',
      'Recommended for all vehicles under 5 years of age.'
    ],
    tags: ['Motor Insurance', 'Zero Dep', 'Car Insurance', 'Bumper to Bumper']
  },
  {
    id: 'vid-term-life-insurance-sizing',
    title: 'Term Life Insurance: How Much Cover Does Your Family Actually Need?',
    slug: 'term-life-insurance-cover-calculation',
    type: 'long',
    category: 'Life Insurance',
    topic: 'Term Life Calculation',
    duration: '11:30',
    durationSeconds: 690,
    videoUrl: null,
    youtubeId: null,
    thumbnail: null,
    views: '24.1K',
    viewsCount: 24100,
    uploadDate: '3 weeks ago',
    instructor: 'WHYINSURED Financial Planners',
    isFeatured: false,
    isPublished: true,
    description: 'Calculate your ideal term insurance coverage using Human Life Value (HLV), accounting for inflation, liabilities, home loans, and children’s education goals.',
    chapters: [
      { time: '0:00', title: 'Why Pure Term Insurance is Essential', seconds: 0 },
      { time: '03:15', title: 'Human Life Value (HLV) Formula', seconds: 195 },
      { time: '06:50', title: 'Factoring Outstanding Loans & Inflation', seconds: 410 },
      { time: '09:10', title: 'Regular Pay vs Limited Pay Comparison', seconds: 550 }
    ],
    takeaways: [
      'Target 15x to 20x of your annual gross income as baseline term coverage.',
      'Add outstanding debt (home loan, car loan) on top of the baseline multiplier.',
      'Avoid mixing investment with insurance; pure term offers the highest coverage per rupee.'
    ],
    tags: ['Term Insurance', 'Life Insurance', 'HLV', 'Financial Planning']
  },

  // =========================================================================
  // SHORT VIDEOS (9:16 VERTICAL FORMAT)
  // =========================================================================
  {
    id: 'short-waiting-period',
    title: 'What is Waiting Period in Health Insurance?',
    slug: 'what-is-waiting-period',
    type: 'short',
    category: 'Health Insurance',
    topic: 'Waiting Period',
    duration: '0:55',
    durationSeconds: 55,
    videoUrl: null,
    thumbnail: null,
    views: '45.3K',
    viewsCount: 45300,
    likesCount: 3120,
    uploadDate: '2 weeks ago',
    creator: 'WHYINSURED Shorts',
    description: 'Health insurance policies have 3 types of waiting periods: Initial 30-day, 2-year specific illness, and pre-existing disease (PED) periods. Here is how each works.',
    takeaways: [
      'Initial 30 days: Only accidental emergencies are covered.',
      '2 Years: Specified conditions like hernia, cataract, stones, and joint replacement.',
      'PED Waiting: 1 to 3 years for conditions diagnosed prior to buying the policy.'
    ],
    tags: ['Waiting Period', 'Pre-existing Disease', 'Shorts', 'Health Insurance']
  },
  {
    id: 'short-pre-existing-disease',
    title: 'What Counts as a Pre-Existing Disease (PED)?',
    slug: 'what-is-pre-existing-disease',
    type: 'short',
    category: 'Health Insurance',
    topic: 'Pre-existing Disease',
    duration: '0:50',
    durationSeconds: 50,
    videoUrl: null,
    thumbnail: null,
    views: '52.1K',
    viewsCount: 52100,
    likesCount: 4210,
    uploadDate: '3 weeks ago',
    creator: 'WHYINSURED Shorts',
    description: 'Under IRDAI rules, any medical condition, injury, or symptom diagnosed or treated within 36 months before policy inception is classified as a Pre-Existing Disease.',
    takeaways: [
      'Always disclose diabetes, hypertension, asthma, and thyroid during application.',
      'Non-disclosure is the #1 ground for complete claim rejection and policy cancellation.',
      'Many modern plans allow buying a rider to reduce PED waiting from 3 years to 1 year.'
    ],
    tags: ['PED', 'Disclosures', 'Medical History', 'Shorts']
  },
  {
    id: 'short-no-claim-bonus',
    title: 'How No Claim Bonus (NCB) Multiplies Your Cover',
    slug: 'how-no-claim-bonus-works',
    type: 'short',
    category: 'Policy Basics',
    topic: 'No Claim Bonus',
    duration: '0:48',
    durationSeconds: 48,
    videoUrl: null,
    thumbnail: null,
    views: '38.6K',
    viewsCount: 38600,
    likesCount: 2890,
    uploadDate: '1 month ago',
    creator: 'WHYINSURED Shorts',
    description: 'Every year you do not claim, insurers increase your sum insured by 10% to 50% without charging extra premium! Discover Super NCB booster mechanics.',
    takeaways: [
      'Standard NCB: 10% to 50% addition up to 100% of sum insured.',
      'Super NCB / Booster: Up to 500% increase on claim-free years.',
      'NCB does not decrease with annual wellness health checkups.'
    ],
    tags: ['NCB', 'Cumulative Bonus', 'Shorts', 'Policy Basics']
  },
  {
    id: 'short-cashless-hospital-desk',
    title: '3 Things to Show at Hospital Cashless Desk',
    slug: 'three-things-hospital-cashless-desk',
    type: 'short',
    category: 'Claims',
    topic: 'Cashless Admission',
    duration: '0:45',
    durationSeconds: 45,
    videoUrl: null,
    thumbnail: null,
    views: '61.4K',
    viewsCount: 61400,
    likesCount: 5630,
    uploadDate: '1 month ago',
    creator: 'WHYINSURED Shorts',
    description: 'When reaching the network hospital insurance desk, have these 3 items ready to avoid admission delay: e-Health Card, government Photo ID, and doctor prescription.',
    takeaways: [
      'Keep your digital e-card saved offline on your smartphone.',
      'Doctor prescription must explicitly mention "Advised for Admission".',
      'Inform the insurance company or agent within 24 hours of emergency admission.'
    ],
    tags: ['Cashless', 'Hospital Desk', 'Admission', 'Shorts', 'Claims']
  },
  {
    id: 'short-room-rent-trap',
    title: 'The Room Rent 1% Trap in 60 Seconds',
    slug: 'room-rent-trap-in-60-seconds',
    type: 'short',
    category: 'Policy Basics',
    topic: 'Room Rent Capping',
    duration: '0:58',
    durationSeconds: 58,
    videoUrl: null,
    thumbnail: null,
    views: '74.2K',
    viewsCount: 74200,
    likesCount: 7190,
    uploadDate: '2 weeks ago',
    creator: 'WHYINSURED Shorts',
    description: 'Why you should never buy a policy with room rent capping. How upgrading your room from Twin Sharing to Deluxe can cost you lakhs in proportionate deductions.',
    takeaways: [
      'If your limit is Rs 5,000/day and you take a Rs 10,000/day room, you pay 50% of doctors fees too!',
      'Always choose a policy with "Single Private AC Room" or "No Sub-Limit".'
    ],
    tags: ['Room Rent', 'Proportionate Deduction', 'Fine Print', 'Shorts']
  },
  {
    id: 'short-zero-depreciation',
    title: 'Why You Must Have Zero Dep on Your Car',
    slug: 'why-you-need-zero-dep-on-car',
    type: 'short',
    category: 'Motor Insurance',
    topic: 'Zero Depreciation',
    duration: '0:42',
    durationSeconds: 42,
    videoUrl: null,
    thumbnail: null,
    views: '33.9K',
    viewsCount: 33900,
    likesCount: 2450,
    uploadDate: '3 weeks ago',
    creator: 'WHYINSURED Shorts',
    description: 'In an auto accident, a standard comprehensive policy will cut 50% for plastic bumper replacement. A Zero Dep cover pays 100% for metal, plastic, and glass!',
    takeaways: [
      'Standard policy: You pay 50% on plastic, rubber, and nylon parts.',
      'Zero Dep policy: Insurer pays 100% of parts replacement cost.',
      'Must-have add-on for cars less than 5 years old.'
    ],
    tags: ['Car Insurance', 'Zero Dep', 'Motor', 'Shorts']
  },
  {
    id: 'short-portability-rights',
    title: 'Did You Know You Can Port Health Insurance Without Losing Waiting Period?',
    slug: 'health-insurance-portability-rights',
    type: 'short',
    category: 'Health Insurance',
    topic: 'Portability',
    duration: '0:52',
    durationSeconds: 52,
    videoUrl: null,
    thumbnail: null,
    views: '41.8K',
    viewsCount: 41800,
    likesCount: 3780,
    uploadDate: '2 weeks ago',
    creator: 'WHYINSURED Shorts',
    description: 'Under IRDAI portability rules, you can switch from Company A to Company B without restarting your waiting periods or losing your cumulative bonus credits!',
    takeaways: [
      'Apply for portability at least 45 days before your policy renewal date.',
      'Accumulated waiting period credits transfer seamlessly to your new insurer.',
      'New insurer will underwrite based on current medical declarations.'
    ],
    tags: ['Portability', 'IRDAI Rules', 'Health Insurance', 'Shorts']
  }
];

// =========================================================================
// IN-DEPTH EDUCATIONAL ARTICLES & GUIDES
// =========================================================================
export const ACADEMY_ARTICLES = [
  {
    id: 'art-how-to-read-policy-schedule',
    slug: 'how-to-read-health-insurance-policy-schedule',
    title: 'How to Read & Understand Your Health Insurance Policy Schedule',
    category: 'Policy Basics',
    readingTime: '6 min read',
    publishedDate: 'Nov 10, 2026',
    author: 'WHYINSURED Editorial Team',
    excerpt: 'Demystifying the first page of your health policy: Sum insured breakdown, deductibles, co-pays, zone pricing, and critical endorsement clauses.',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    toc: [
      { id: 'sec-overview', title: '1. What is a Policy Schedule?' },
      { id: 'sec-sum-insured', title: '2. Base Sum Insured vs Cumulative Bonus' },
      { id: 'sec-zone-pricing', title: '3. Geographic Zone Classification' },
      { id: 'sec-sublimits', title: '4. Identifying Hidden Sub-Limits' },
      { id: 'sec-action-points', title: '5. Key Checklist When Receiving Your Policy' }
    ],
    content: `A health insurance policy document often runs 30 to 60 pages long. However, the most critical 90% of your operational terms are summarized on the first two pages—known as the **Policy Schedule**.

### 1. What is a Policy Schedule?
The Policy Schedule is your customized insurance contract summary. While the Policy Wordings booklet contains general terms applicable to every policyholder, the Schedule lists your specific personal terms: insured members, individual ages, medical pre-existing endorsements, base coverage amount, and premium paid.

### 2. Base Sum Insured vs Cumulative Bonus
Always verify two separate numbers on your schedule:
* **Base Sum Insured:** The primary indemnity limit purchased (e.g., ₹10 Lakhs or ₹25 Lakhs).
* **Cumulative Bonus (NCB):** The earned bonus added over consecutive claim-free years. In modern plans, this can increase your effective shield up to 2X or 5X without extra premium.

### 3. Geographic Zone Classification
Most Indian health insurers divide the country into medical cost tiers (Zone 1: Metro cities like Mumbai, Delhi; Zone 2: Bangalore, Pune, Ahmedabad; Zone 3: Rest of India). If your policy schedule lists Zone 2 or Zone 3, receiving treatment in a Zone 1 metro hospital may trigger a mandatory **10% to 20% co-payment** unless you opted for Pan-India coverage.

### 4. Identifying Hidden Sub-Limits
Scan the schedule for clauses labeled "Specific Disease Capping" or "Procedure Restrictions". Common sub-limits to check:
* Cataract surgery limit (often capped at ₹30,000–₹50,000 per eye).
* Joint replacement and robotic surgeries.
* Modern day-care procedures and psychiatric care.

### 5. Key Checklist When Receiving Your Policy
1. Verify spelling of member names and date of birth against Aadhaar / Passport.
2. Confirm pre-existing diseases declared during the proposal are accurately endorsed.
3. Keep digital copies stored on Digilocker or insurance portal for emergency access.`,
    takeaways: [
      'The Policy Schedule contains your personalized contract terms, unlike the generic wordings booklet.',
      'Check your Geographic Zone to avoid unexpected co-payments when treated in metro hospitals.',
      'Scrutinize cataract, joint replacement, and room rent sub-limits on the schedule sheet.'
    ],
    relatedVideoId: 'vid-2x-coverage-multiplier'
  },
  {
    id: 'art-cashless-vs-reimbursement',
    slug: 'cashless-hospitalization-vs-reimbursement-claims',
    title: 'Cashless Hospitalization vs. Reimbursement Claims: Full Comparison',
    category: 'Claims',
    readingTime: '8 min read',
    publishedDate: 'Nov 04, 2026',
    author: 'WHYINSURED Claims Advisory Desk',
    excerpt: 'Detailed comparison of cashless settlement at network hospitals versus reimbursement filing at non-network clinics. Understand timelines, paperwork, and financial impact.',
    coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    toc: [
      { id: 'sec-cashless-mech', title: '1. How Cashless Hospitalization Works' },
      { id: 'sec-reimb-mech', title: '2. How Reimbursement Claims Work' },
      { id: 'sec-comparison-table', title: '3. Head-to-Head Comparison' },
      { id: 'sec-non-medical', title: '4. Non-Medical Consumable Costs' },
      { id: 'sec-tips', title: '5. Pro Tips for Smooth Approvals' }
    ],
    content: `When a medical emergency strikes, the mode of insurance settlement determines whether your family pays thousands of rupees out-of-pocket or walks out with zero hospital bills.

### 1. How Cashless Hospitalization Works
In a cashless claim, the hospital insurance desk (TPA desk) coordinates directly with your insurance provider. You present your health e-card, the hospital submits a **Pre-Authorization Request**, and the insurer issues an initial sanction within 1 to 2 hours. Upon discharge, the hospital sends the final itemized bill, and the insurer settles payment directly with the hospital.

### 2. How Reimbursement Claims Work
If you are treated at a non-network hospital, you must pay all medical bills out of your own pocket. Following discharge, you compile all original diagnostic reports, pharmacy receipts, doctor indoor case papers, and the signed claim form, submitting them to the insurance company within 15 to 30 days.

### 3. Head-to-Head Comparison
| Metric | Cashless Hospitalization | Reimbursement Claims |
| :--- | :--- | :--- |
| **Out-of-Pocket Need** | Minimal (only non-medical items) | Full bill amount upfront |
| **Hospital Network** | Empaneled hospitals only | Any registered hospital with >10-15 beds |
| **Settlement Time** | At discharge (1-3 hours) | 15 to 30 days post-submission |
| **Document Risk** | Handled by hospital desk | Loss of original bills can delay claims |

### 4. Non-Medical Consumable Costs
Even in 100% cashless approvals, insurers exclude certain items listed under IRDAI Annexure I (gloves, sanitizers, thermometer, syringes, room administrative charges). Expect non-medical expenses to account for approximately 5% to 10% of total hospital bills unless your policy includes a **Consumables Add-On**.`,
    takeaways: [
      'Cashless eliminates the stress of arranging large cash sums during an emergency hospitalization.',
      'Reimbursement requires keeping original physical copies of every prescription and itemized bill.',
      'Add a Consumables Rider to cover surgical gloves, syringes, PPE, and non-medical items.'
    ],
    relatedVideoId: 'vid-cashless-hospitalization-mastery'
  },
  {
    id: 'art-health-insurance-portability-guide',
    slug: 'health-insurance-portability-step-by-step-guide',
    title: 'Health Insurance Portability: Switch Insurers Without Losing Waiting Periods',
    category: 'Health Insurance',
    readingTime: '7 min read',
    publishedDate: 'Oct 28, 2026',
    author: 'WHYINSURED Regulatory Experts',
    excerpt: 'Everything you need to know about porting your health insurance policy under IRDAI regulations: timing, eligibility, continuity benefits, and avoiding common mistakes.',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    toc: [
      { id: 'sec-port-overview', title: '1. What is Portability?' },
      { id: 'sec-continuity', title: '2. Continuity of Waiting Periods' },
      { id: 'sec-timeline', title: '3. Crucial 45-Day Notification Timeline' },
      { id: 'sec-step-by-step', title: '4. Step-by-Step Porting Checklist' }
    ],
    content: `Are you unhappy with high premium hikes, poor cashless network empanelment, or restrictive room rent sub-limits in your current health plan? IRDAI gives policyholders the legal right to **port (transfer)** their policy to any other general or health insurer.

### 1. What is Portability?
Portability allows you to transfer your health insurance coverage to another insurance company while retaining all accumulated continuity benefits, including completed waiting periods for pre-existing diseases and specific illnesses.

### 2. Continuity of Waiting Periods
If you have held a policy for 3 years and served the 36-month waiting period for hypertension, moving to a new insurer ensures hypertension is covered from Day 1 on the existing sum insured amount.

### 3. Crucial 45-Day Notification Timeline
Under IRDAI regulations, portability applications must be initiated at least **45 to 60 days before your existing policy renewal date**. If you apply within 15 days of expiry, the new insurer has the legal right to decline the portability request.`,
    takeaways: [
      'You do not lose your accumulated waiting period credits when switching insurance companies.',
      'Submit your portability application at least 45 days prior to renewal.',
      'Disclose any fresh medical diagnoses made during your previous policy term.'
    ],
    relatedVideoId: 'short-portability-rights'
  }
];

// =========================================================================
// STRUCTURED LEARNING PATHS
// =========================================================================
export const ACADEMY_LEARNING_PATHS = [
  {
    id: 'path-beginner',
    level: 'Beginner',
    badge: 'Foundation',
    title: 'Insurance Fundamentals & Policy Basics',
    description: 'Master the core building blocks of health, life, and motor insurance so you can evaluate any policy with total confidence.',
    estimatedTime: '45 mins',
    totalLessons: 4,
    lessons: [
      {
        id: 'lesson-b1',
        title: 'Introduction to Risk Protection & Insurance Principles',
        duration: '10 mins',
        summary: 'Understanding indemnity, utmost good faith, and insurable interest.',
        videoId: 'vid-2x-coverage-multiplier'
      },
      {
        id: 'lesson-b2',
        title: 'Types of Health Plans: Individual vs Family Floater vs Super Top-Up',
        duration: '12 mins',
        summary: 'Choosing between joint floater limits and dedicated individual sum insured covers.',
        videoId: 'short-no-claim-bonus'
      },
      {
        id: 'lesson-b3',
        title: 'Decoding Core Terms: Deductibles, Co-Pay, Sub-Limits & Waiting Periods',
        duration: '11 mins',
        summary: 'How cost-sharing clauses reduce premiums but increase hospital payments.',
        videoId: 'short-waiting-period'
      },
      {
        id: 'lesson-b4',
        title: 'How to Size Your Sum Insured Against Medical Inflation',
        duration: '12 mins',
        summary: 'Calculating adequate coverage for Tier-1 and Tier-2 hospital treatments.',
        videoId: 'vid-preventive-care-health-checkup'
      }
    ]
  },
  {
    id: 'path-intermediate',
    level: 'Intermediate',
    badge: 'Contract Mastery',
    title: 'Policy Wording & Fine-Print Scrutiny',
    description: 'Learn how to read complex contract wordings, decode room rent limits, and verify cashless hospital empanelment.',
    estimatedTime: '55 mins',
    totalLessons: 4,
    lessons: [
      {
        id: 'lesson-i1',
        title: 'Room Rent Capping & Proportionate Deductions Math',
        duration: '14 mins',
        summary: 'Why choosing a higher room category triggers proportionate deductions on doctor and surgery fees.',
        videoId: 'vid-room-rent-capping-explained'
      },
      {
        id: 'lesson-i2',
        title: 'Restoration & Coverage Multipliers: Same Illness vs Different Illness',
        duration: '15 mins',
        summary: 'How automatic sum insured refills work across repeated medical emergencies.',
        videoId: 'vid-unlimited-restoration-benefit'
      },
      {
        id: 'lesson-i3',
        title: 'Pre-Existing Disease (PED) Underwriting & Waiting Period Reduction',
        duration: '12 mins',
        summary: 'Managing disclosures for diabetes, hypertension, cardiac history, and thyroid.',
        videoId: 'short-pre-existing-disease'
      },
      {
        id: 'lesson-i4',
        title: 'Day-Care Procedures & Modern Treatments Under IRDAI Guidelines',
        duration: '14 mins',
        summary: 'Robotic surgeries, chemotherapy, dialysis, and procedures not requiring 24-hour admission.',
        videoId: 'vid-2x-coverage-multiplier'
      }
    ]
  },
  {
    id: 'path-advanced',
    level: 'Advanced',
    badge: 'Claims & Advisory',
    title: 'Claims Navigation, Rejection Defense & Portability',
    description: 'Expert strategies for cashless approvals, disputing wrongful claim deductions, and porting policies seamlessly.',
    estimatedTime: '1 hr 10 mins',
    totalLessons: 4,
    lessons: [
      {
        id: 'lesson-a1',
        title: 'Cashless Admission & Pre-Authorization Clearance Mastery',
        duration: '18 mins',
        summary: 'Navigating hospital TPA desks, query resolutions, and initial admission sanctions.',
        videoId: 'vid-cashless-hospitalization-mastery'
      },
      {
        id: 'lesson-a2',
        title: 'Reimbursement Audit: Compiling Error-Free Bill Packages',
        duration: '16 mins',
        summary: 'Indoor case papers, break-up bills, discharge summary, and pharmacy logs.',
        videoId: 'vid-reimbursement-claim-filing'
      },
      {
        id: 'lesson-a3',
        title: 'Top Reasons Claims Get Rejected & How to Defend Them',
        duration: '18 mins',
        summary: 'Pre-existing non-disclosure vs genuine new onset; raising complaints with the Insurance Ombudsman.',
        videoId: 'short-cashless-hospital-desk'
      },
      {
        id: 'lesson-a4',
        title: 'IRDAI Health Insurance Portability Rules & Timeline Execution',
        duration: '18 mins',
        summary: 'Switching insurers while preserving earned cumulative bonus and served waiting periods.',
        videoId: 'short-portability-rights'
      }
    ]
  }
];

// =========================================================================
// A TO Z INSURANCE DICTIONARY
// =========================================================================
export const ACADEMY_DICTIONARY = [
  {
    letter: 'A',
    term: 'Actuary',
    category: 'General',
    definition: 'A financial professional who analyzes statistical data, mortality tables, and medical inflation to calculate insurance risks and policy premiums.',
    tip: 'Insurers adjust policy premiums across age bands based on actuarial loss ratios.'
  },
  {
    letter: 'A',
    term: 'Ayush Treatment',
    category: 'Health Insurance',
    definition: 'Hospitalization treatment taken under Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy systems of medicine in recognized government-accredited hospitals.',
    tip: 'Check if your policy covers AYUSH treatments up to 100% of the sum insured or only under sub-limits.'
  },
  {
    letter: 'B',
    term: 'Base Sum Insured',
    category: 'Health Insurance',
    definition: 'The fundamental coverage amount purchased in your policy, which acts as the maximum payout limit for eligible hospital expenses in a single policy year.',
    tip: 'Aim for a minimum base sum insured of ₹10 Lakhs to ₹25 Lakhs for urban healthcare costs.'
  },
  {
    letter: 'C',
    term: 'Cashless Hospitalization',
    category: 'Claims',
    definition: 'A claim settlement facility where the insurance company or its Third Party Administrator (TPA) settles the medical bill directly with network hospitals.',
    tip: 'Always carry a government photo ID and your insurance e-card to the TPA desk during admission.'
  },
  {
    letter: 'C',
    term: 'Co-Payment',
    category: 'Health Insurance',
    definition: 'A cost-sharing requirement in an insurance policy where the insured agrees to pay a specified percentage (e.g., 10% or 20%) of the admissible claim amount.',
    tip: 'Avoid policies with mandatory co-pays unless enrolling senior parents where no other plan is available.'
  },
  {
    letter: 'D',
    term: 'Deductible',
    category: 'Health & Top-Up',
    definition: 'A cost-sharing clause where an insured must pay hospital expenses up to a defined threshold (e.g., ₹3 Lakhs or ₹5 Lakhs) before the insurer pays.',
    tip: 'Super top-up plans with a ₹5 Lakh deductible can provide ₹25 Lakhs extra coverage at a fraction of base premiums.'
  },
  {
    letter: 'D',
    term: 'Day-Care Procedure',
    category: 'Health Insurance',
    definition: 'Medical treatments or surgeries requiring less than 24 hours of hospitalization due to modern technological advancements (e.g., chemotherapy, cataract surgery).',
    tip: 'Ensure your plan covers "All Day Care Procedures" rather than a limited listed catalog.'
  },
  {
    letter: 'E',
    term: 'Exclusions',
    category: 'Policy Basics',
    definition: 'Specific medical conditions, treatments, or healthcare costs that are explicitly not covered under the insurance contract (e.g., cosmetic surgery, adventure sports).',
    tip: 'Always read the "Permanent Exclusions" section of the policy document before purchasing.'
  },
  {
    letter: 'F',
    term: 'Family Floater',
    category: 'Health Insurance',
    definition: 'A single health insurance policy that covers the entire family (self, spouse, children) under a shared pool of sum insured.',
    tip: 'Premiums are based on the age of the eldest family member.'
  },
  {
    letter: 'G',
    term: 'Grace Period',
    category: 'Policy Basics',
    definition: 'A specified period of 30 days granted after the premium due date during which the policyholder can pay the renewal premium without losing continuity benefits.',
    tip: 'Coverage is paused during the grace period; claims occurring while in grace period are not payable.'
  },
  {
    letter: 'H',
    term: 'Human Life Value (HLV)',
    category: 'Life Insurance',
    definition: 'A mathematical calculation estimating the future earnings and financial value of an individual to determine the appropriate term life insurance coverage.',
    tip: 'Standard thumb rule: Target 15X to 20X of your annual income as your term life cover.'
  },
  {
    letter: 'I',
    term: 'IRDAI',
    category: 'Regulatory',
    definition: 'Insurance Regulatory and Development Authority of India—the statutory body supervising and regulating the Indian insurance industry to safeguard policyholders.',
    tip: 'IRDAI sets standard rules for claim settlement timelines, portability, and ombudsman complaints.'
  },
  {
    letter: 'M',
    term: 'Maternity Benefit',
    category: 'Health Insurance',
    definition: 'Coverage for medical expenses incurred during pregnancy, delivery (normal or caesarean), and pre/post-natal hospital care.',
    tip: 'Maternity riders usually carry a mandatory waiting period of 2 to 4 years.'
  },
  {
    letter: 'N',
    term: 'No Claim Bonus (NCB)',
    category: 'Policy Basics',
    definition: 'A reward given to policyholders for every claim-free policy year, typically in the form of an increased sum insured at zero additional premium.',
    tip: 'Modern plans offer Super NCB that boosts cover up to 500% over consecutive claim-free years.'
  },
  {
    letter: 'P',
    term: 'Pre-Existing Disease (PED)',
    category: 'Health Insurance',
    definition: 'Any condition, ailment, injury, or disease diagnosed by a doctor within 36 months prior to the effective date of the policy.',
    tip: 'Always declare past medical history; undeclared conditions can nullify your insurance.'
  },
  {
    letter: 'P',
    term: 'Portability',
    category: 'Regulatory',
    definition: 'The legal right of a policyholder to transfer their health insurance policy to another insurer without losing accumulated waiting period credits and bonus benefits.',
    tip: 'You must apply for portability at least 45 days before policy expiry.'
  },
  {
    letter: 'R',
    term: 'Room Rent Limit',
    category: 'Health Insurance',
    definition: 'A cap placed on the daily hospital room rent covered by the insurer (e.g., 1% of the sum insured per day or Single Private Room).',
    tip: 'Exceeding room rent limits causes proportionate deductions across all hospital expenses.'
  },
  {
    letter: 'S',
    term: 'Sub-Limit',
    category: 'Health Insurance',
    definition: 'A monetary cap on specific diseases or treatments (e.g., maximum ₹40,000 for cataract or ₹2 Lakhs for joint replacement).',
    tip: 'Choose plans with zero sub-limits to ensure full settlement during major operations.'
  },
  {
    letter: 'T',
    term: 'Third Party Administrator (TPA)',
    category: 'Claims',
    definition: 'An IRDAI-licensed organization providing processing services for insurance claims, pre-authorizations, and network hospital empanelment.',
    tip: 'Check whether your insurer uses a third-party TPA or has an internal in-house claims processing desk.'
  },
  {
    letter: 'W',
    term: 'Waiting Period',
    category: 'Health Insurance',
    definition: 'A specified duration during which certain diseases or treatments are not covered, starting from the inception of the policy.',
    tip: 'Initial 30 days covers only accidental trauma; 2-year waiting applies to specific illnesses like hernia and stones.'
  },
  {
    letter: 'Z',
    term: 'Zero Depreciation',
    category: 'Motor Insurance',
    definition: 'An auto insurance add-on cover that waives depreciation deduction on car parts (rubber, plastic, glass, metal) during claim settlements.',
    tip: 'A must-have add-on for cars less than 5 years old to avoid paying 50% on plastic bumpers.'
  }
];

// =========================================================================
// FREQUENTLY ASKED QUESTIONS (FAQS)
// =========================================================================
export const ACADEMY_FAQS = [
  {
    id: 'faq-1',
    category: 'Health Insurance',
    question: 'How much health insurance coverage does a family of four need in India?',
    answer: 'For a family of four living in a metro city (Mumbai, Delhi, Bangalore), a base cover of ₹15 Lakhs to ₹25 Lakhs is recommended due to rising medical inflation. Pairing a ₹10–₹15 Lakh base plan with a ₹25–₹50 Lakh Super Top-Up is one of the most cost-effective ways to achieve high medical coverage.'
  },
  {
    id: 'faq-2',
    category: 'Health Insurance',
    question: 'What happens if I forget to disclose a pre-existing medical condition?',
    answer: 'Non-disclosure of pre-existing diseases (like diabetes, hypertension, asthma, or previous surgeries) is the #1 ground for claim rejection. Insurers can repudiate the claim, cancel your policy, and forfeit all paid premiums. Always declare all known medical history during application.'
  },
  {
    id: 'faq-3',
    category: 'Claims',
    question: 'Can a cashless claim be denied even if I am at a network hospital?',
    answer: 'Yes. A cashless request may be denied if: (1) Details submitted are incomplete or ambiguous, (2) The illness falls within the policy waiting period, (3) The hospital desk fails to reply to TPA queries before discharge, or (4) Treatment is investigational. If cashless is denied, you can still pay and apply for reimbursement.'
  },
  {
    id: 'faq-4',
    category: 'Policy Basics',
    question: 'What is the difference between Super Top-Up and Top-Up insurance?',
    answer: 'A standard Top-Up plan applies its deductible to each individual hospitalization claim separately. A Super Top-Up plan applies its deductible cumulatively across all hospitalizations in a single policy year. Therefore, a Super Top-Up is vastly superior for covering multiple hospital stays.'
  },
  {
    id: 'faq-5',
    category: 'Claims',
    question: 'What should I do if my insurance claim is wrongfully rejected?',
    answer: 'First, file a formal representation with the insurer’s Internal Grievance Cell (GRO). If unresolved within 15 days, escalate through IRDAI’s Bima Bharosa portal. If still unsatisfied, file a free appeal before the Insurance Ombudsman, which holds legal authority to issue binding awards up to ₹50 Lakhs.'
  },
  {
    id: 'faq-6',
    category: 'Motor Insurance',
    question: 'Does claiming insurance for a minor scratch affect my No Claim Bonus?',
    answer: 'Yes. Even a minor claim of ₹2,000 resets your accrued No Claim Bonus (which can be as high as 50% discount on your own-damage premium) to zero, unless you have purchased an NCB Protect add-on. If repair costs are less than your NCB discount, it is smarter to pay out-of-pocket.'
  }
];

// =========================================================================
// INSURANCE MYTHS VS FACTS
// =========================================================================
export const ACADEMY_MYTHS = [
  {
    id: 'myth-1',
    myth: 'Corporate health insurance from my employer is enough for my family.',
    fact: 'Corporate coverage ceases immediately upon job change, resignation, layoff, or retirement. Furthermore, corporate plans frequently feature high co-pays and lower sum insured limits. Having an independent personal health policy ensures lifelong uninterrupted protection.'
  },
  {
    id: 'myth-2',
    myth: 'Cashless insurance means the hospital bill will be completely ₹0.',
    fact: 'Cashless covers eligible medical treatment, surgery, and room rent. However, non-medical consumables (cotton, syringes, surgical gloves, registration charges) are excluded by standard guidelines unless you have a Consumables add-on.'
  },
  {
    id: 'myth-3',
    myth: 'Young and healthy people don’t need health insurance.',
    fact: 'Buying insurance young locks in the lowest possible premiums and serves mandatory 2–3 year waiting periods while you are completely healthy, ensuring you are 100% covered when medical needs arise later in life.'
  },
  {
    id: 'myth-4',
    myth: 'Insurers reject claims after 8 years of continuous policy renewals.',
    fact: 'Under IRDAI Moratorium guidelines, after 60 continuous months (5 years) of policy renewal, no health insurer can contest a claim on grounds of non-disclosure, except in cases of proven fraud.'
  }
];

// =========================================================================
// POLICY EXPLAINED TOPICS
// =========================================================================
export const POLICY_EXPLAINED_TOPICS = [
  {
    id: 'topic-waiting-periods',
    title: 'Waiting Periods Explained',
    badge: 'Crucial Clause',
    summary: 'Initial 30-day, 2-year specific illness, and pre-existing disease timelines.',
    details: 'Health policies require waiting periods before full coverage activates. Understand how initial accident covers, specific surgical timelines (hernia, stones, joints), and pre-existing disease terms apply to you.',
    keyPoints: [
      'Day 1 to 30: Accidental emergency hospitalization covered immediately.',
      'Month 1 to 24: Specific planned treatments like cataract, ENT, and hernia.',
      'Year 1 to 3: Pre-existing conditions like diabetes, hypertension, and asthma.'
    ],
    videoId: 'short-waiting-period'
  },
  {
    id: 'topic-room-rent-limits',
    title: 'Room Rent Capping & Proportionate Deductions',
    badge: 'High Financial Impact',
    summary: 'The single most common cause of surprise out-of-pocket hospital deductions.',
    details: 'When a policy caps room rent (e.g. 1% of sum insured), opting for a room above that limit triggers proportionate reductions across doctor fees, surgeon charges, and operating theater costs.',
    keyPoints: [
      'Always check whether your policy allows "Single Private Room" without sub-limits.',
      'ICU limits must be evaluated independently from regular room rent.',
      'Proportionate deductions do not apply to fixed-cost medications and implants.'
    ],
    videoId: 'vid-room-rent-capping-explained'
  },
  {
    id: 'topic-co-pay-deductibles',
    title: 'Co-Payment vs Deductible',
    badge: 'Cost Sharing',
    summary: 'Understand how cost-sharing clauses reduce premiums but increase hospital payments.',
    details: 'Co-pay requires you to pay a percentage of every claim (e.g., 20%). A deductible requires you to pay upfront medical expenses up to a threshold before the insurance kicks in.',
    keyPoints: [
      'Co-pay applies to every hospital bill across the year.',
      'Deductibles are best utilized in Super Top-Up plans for high-value protection.',
      'Zone-based co-pays apply when treated outside your registered geographic zone.'
    ],
    videoId: 'short-waiting-period'
  },
  {
    id: 'topic-restoration-benefits',
    title: 'Sum Insured Restoration & Coverage Multipliers',
    badge: 'Modern Benefit',
    summary: 'Automatic refills when your base sum insured gets exhausted in a policy year.',
    details: 'Modern policies automatically reinstate 100% of your sum insured when claims exhaust your base cover. Learn the differences between unlimited restoration, same illness refills, and 2X multiplier covers.',
    keyPoints: [
      'Restoration triggers automatically without claim penalties.',
      'Check whether restoration applies to the same illness or only different illnesses.',
      'Vital protection for multi-member family floater policies.'
    ],
    videoId: 'vid-unlimited-restoration-benefit'
  },
  {
    id: 'topic-maternity-newborn',
    title: 'Maternity & Newborn Health Coverage',
    badge: 'Family Planning',
    summary: 'Understanding maternity waiting periods, normal vs C-section limits, and vaccination.',
    details: 'Maternity benefits often include 24 to 48 months waiting periods and specific caps. Newborn coverage protects the baby from Day 1 for congenital and medical complications.',
    keyPoints: [
      'Plan maternity coverage at least 2 to 3 years before conceiving.',
      'Covers normal delivery, C-section, and medically necessary terminations.',
      'Newborn cover extends to vaccinations up to the first year in select plans.'
    ],
    videoId: 'vid-preventive-care-health-checkup'
  },
  {
    id: 'topic-portability-rights',
    title: 'Health Insurance Portability Rights',
    badge: 'Regulatory Right',
    summary: 'Transfer your policy between companies without resetting waiting periods.',
    details: 'IRDAI portability guidelines allow you to switch insurance companies while carrying forward your accrued cumulative bonus and served waiting period credits.',
    keyPoints: [
      'Apply at least 45 to 60 days before your renewal date.',
      'New insurer cannot re-impose waiting periods already served on your existing base sum insured.',
      'Maintain continuous renewals to keep your portability rights intact.'
    ],
    videoId: 'short-portability-rights'
  }
];

// =========================================================================
// CLAIM ACADEMY STEP-BY-STEP GUIDES
// =========================================================================
export const CLAIM_ACADEMY_GUIDES = [
  {
    id: 'claim-cashless-process',
    title: 'Cashless Hospitalization: Complete 4-Step Process',
    category: 'Cashless Claims',
    description: 'How to secure pre-authorization, admission, and final discharge settlement without paying out of pocket at network hospitals.',
    steps: [
      {
        step: 1,
        title: 'Network Hospital Verification & Admission',
        desc: 'Check if the hospital is on your insurer’s active cashless network. For planned admissions, notify the hospital TPA desk 48 hours prior; for emergency admissions, intimate within 24 hours.'
      },
      {
        step: 2,
        title: 'Pre-Authorization Submission',
        desc: 'Submit the completed Pre-Auth Form (Part A by patient, Part B by treating physician) along with your health e-card, doctor prescription, and photo ID.'
      },
      {
        step: 3,
        title: 'Initial Sanction Letter',
        desc: 'The insurer/TPA reviews medical necessity and issues an initial sanction letter (usually within 1 to 2 hours) authorizing admission and initial expenses.'
      },
      {
        step: 4,
        title: 'Final Discharge Settlement',
        desc: 'Upon recovery, the hospital sends the complete bill and discharge summary to the insurer. The insurer issues final authorization, and you settle only non-medical consumable expenses.'
      }
    ],
    videoId: 'vid-cashless-hospitalization-mastery'
  },
  {
    id: 'claim-reimbursement-process',
    title: 'Reimbursement Claim: Step-by-Step Filing Checklist',
    category: 'Reimbursement',
    description: 'When treated in a non-network hospital, compile and submit this exact document dossier to guarantee fast claim settlement.',
    steps: [
      {
        step: 1,
        title: 'Collect Original Bills & Discharge Summary',
        desc: 'Collect original itemized bills, payment receipts, discharge summary with doctor diagnosis, lab reports, and pharmacy bills with doctor prescriptions.'
      },
      {
        step: 2,
        title: 'Duly Signed Claim Form',
        desc: 'Fill out and sign the official Claim Form (Part A filled by policyholder, Part B certified by the hospital authority with hospital registration number).'
      },
      {
        step: 3,
        title: 'Submit Within 15–30 Days',
        desc: 'Submit the physical original document dossier to the insurer/TPA office or upload via customer portal within 15 to 30 days of hospital discharge.'
      },
      {
        step: 4,
        title: 'Verification & Direct Bank Transfer',
        desc: 'Under IRDAI rules, the insurer must settle the admissible claim or raise queries within 30 days. Payout is credited directly via NEFT into your verified bank account.'
      }
    ],
    videoId: 'vid-reimbursement-claim-filing'
  },
  {
    id: 'claim-required-documents',
    title: 'Mandatory Claim Documents Checklist',
    category: 'Documentation',
    description: 'A comprehensive checklist of all documents required by insurance desks to process claims without queries.',
    steps: [
      {
        step: 1,
        title: 'Health Card & KYC Documents',
        desc: 'Copy of Insurance E-Card, Policy Schedule, Aadhaar Card, PAN Card, and cancelled cheque with printed name.'
      },
      {
        step: 2,
        title: 'Medical Case Records',
        desc: 'Complete Discharge Summary, indoor case papers, initial doctor consultation prescription, and emergency admission notes.'
      },
      {
        step: 3,
        title: 'Financial Receipts',
        desc: 'Final hospital bill with detailed breakdown, original payment receipts with revenue stamps, and diagnostic lab reports with investigation films.'
      },
      {
        step: 4,
        title: 'Pharmacy & Consumables',
        desc: 'Itemized chemist cash memos supported by doctor prescriptions specifying medicine brand and dosage.'
      }
    ],
    videoId: 'short-cashless-hospital-desk'
  },
  {
    id: 'claim-rejection-prevention',
    title: 'Top Reasons Claims Get Delayed or Rejected',
    category: 'Rejection Prevention',
    description: 'Avoid the most common traps that lead to dispute, delay, or total denial of insurance reimbursement.',
    steps: [
      {
        step: 1,
        title: 'Undisclosed Pre-Existing Conditions',
        desc: 'Failing to declare medical history during policy application is the primary cause of claim rejection. Always ensure transparent medical disclosures.'
      },
      {
        step: 2,
        title: 'Active Waiting Period Clauses',
        desc: 'Treatments for slow-growing ailments (cataract, hernia, joint replacements) within the first 2 years will be denied under standard policy clauses.'
      },
      {
        step: 3,
        title: 'Admission Only for Investigation',
        desc: 'Health policies require active treatment. Hospitalization undertaken solely for diagnostic evaluation, blood tests, or checkups is excluded.'
      },
      {
        step: 4,
        title: 'Hospital Not Registered (>10–15 Beds)',
        desc: 'Insurers require treating hospitals to be officially registered with local authorities and meet minimum qualifying bed and qualified nursing criteria.'
      }
    ],
    videoId: 'vid-room-rent-capping-explained'
  },
  {
    id: 'claim-grievance-escalation',
    title: 'How to Escalate Wrongful Claim Denials to the Insurance Ombudsman',
    category: 'Grievance & Escalation',
    description: 'Your legal recourse when an insurer unfairly reduces or rejects an admissible claim.',
    steps: [
      {
        step: 1,
        title: 'Step 1: Insurer Grievance Officer (GRO)',
        desc: 'Submit a written complaint to the Grievance Redressal Officer of your insurance company with supporting medical evidence. The GRO has 15 days to resolve.'
      },
      {
        step: 2,
        title: 'Step 2: IRDAI Bima Bharosa Portal',
        desc: 'If unresolved or unsatisfied, register your complaint on the official IRDAI Bima Bharosa portal (bimabharosa.irdai.gov.in) or call toll-free 155255.'
      },
      {
        step: 3,
        title: 'Step 3: Insurance Ombudsman Office',
        desc: 'Approach the Insurance Ombudsman within 1 year of rejection. Ombudsman hearings are free of charge, require no lawyer, and award binding decisions up to ₹50 Lakhs.'
      }
    ],
    videoId: 'short-portability-rights'
  }
];

export default {
  ACADEMY_CATEGORIES,
  ACADEMY_VIDEOS,
  ACADEMY_ARTICLES,
  ACADEMY_LEARNING_PATHS,
  ACADEMY_DICTIONARY,
  ACADEMY_FAQS,
  ACADEMY_MYTHS,
  POLICY_EXPLAINED_TOPICS,
  CLAIM_ACADEMY_GUIDES
};


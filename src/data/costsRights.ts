/**
 * "Costs & Your Rights": plain-language help for the number one reason people avoid care, which is
 * fear of the bill. Facts were checked against official or authoritative sources in October 2026:
 *  - EMTALA: hospitals with an emergency department that participate in Medicare must screen and
 *    stabilize anyone with an emergency, regardless of insurance or ability to pay.
 *  - No Surprises Act (in effect since Jan 1, 2022): limits out-of-network surprise bills for
 *    emergency care for insured people.
 *  - Nonprofit hospitals must have a written Financial Assistance Policy (IRS 501(r) / ACA).
 *  - Community health centers charge on a sliding fee scale (HRSA).
 * General information only, not legal advice. Rules vary by state and hospital.
 */

export interface CostSection {
  id: string;
  icon: string;
  title: string;
  points: string[];
}

export const COST_SECTIONS: CostSection[] = [
  {
    id: 'er_rights',
    icon: '\u{1F3E5}',
    title: 'Emergency rooms must see you',
    points: [
      'At a hospital with an emergency department that takes Medicare (most do), federal law requires a medical screening exam, and treatment to stabilize an emergency, whatever your insurance or ability to pay.',
      'This does not make the care free. You may still get a bill, and the sections below explain how to reduce it.',
      'If this app shows warning signs, do not skip emergency care because of cost.',
    ],
  },
  {
    id: 'financial_help',
    icon: '\u{1F4B3}',
    title: 'Ask for financial help (charity care)',
    points: [
      'Nonprofit hospitals are required to have a written financial assistance policy. It explains who qualifies for free or reduced-cost care and how to apply.',
      'Ask the billing office for the policy and the application. Getting the policy is free. Income limits differ from hospital to hospital.',
      'You can apply after you have a bill. It is often still worth applying if a bill is already in collections.',
      'For-profit hospitals may have assistance programs too. Ask.',
    ],
  },
  {
    id: 'surprise_bills',
    icon: '\u{1F4C4}',
    title: 'Surprise bills',
    points: [
      'If you have health insurance, the No Surprises Act (in effect since 2022) generally protects you from surprise out-of-network bills for emergency care. You can be charged only your normal in-network share.',
      'You are never required to give up this protection. Be careful about signing any form that asks you to.',
      'If a bill looks wrong, call both your insurance company and the hospital and ask for it to be reviewed.',
    ],
  },
  {
    id: 'before_you_pay',
    icon: '\u{1F9FE}',
    title: 'Before you pay a medical bill',
    points: [
      'Ask for an itemized bill, a list of every charge. Mistakes happen, so check it.',
      'Do not pay right away. First ask whether financial assistance could apply.',
      'If you cannot pay in full, ask for a payment plan. Many hospitals offer them. Ask whether there is any interest.',
      'Write down who you spoke with and when.',
    ],
  },
  {
    id: 'lower_cost',
    icon: '\u{1F3D8}\u{FE0F}',
    title: 'Lower-cost places to start',
    points: [
      'Community health centers charge based on what you can afford, with or without insurance. Search by ZIP code at findahealthcenter.hrsa.gov (needs internet), or call 211.',
      'Many insurance plans include a free nurse advice line. Look for the number on your insurance card.',
      'For problems that are not emergencies, urgent care and telehealth usually cost less than an ER visit.',
      'Pharmacists can answer medicine questions at no charge.',
    ],
  },
  {
    id: 'coverage',
    icon: '\u{1F6E1}\u{FE0F}',
    title: 'Getting coverage',
    points: [
      'If your income is low, Medicaid or CHIP may cover you or your children. Your state Medicaid office or 211 can tell you.',
      'Losing a job or other coverage may let you sign up for a plan outside the usual enrollment period. Ask at healthcare.gov or call 211.',
    ],
  },
];

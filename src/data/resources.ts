import type { SymptomEntry, UrgencyLevel } from './triageData';

/**
 * Free U.S. help lines and services. Every number below was checked against the
 * organization's own or an official source in October 2026. Re-check before each release:
 * phone numbers are the one thing in this app that must never be wrong.
 *
 * Phone and text lines work without internet (you just need a signal).
 * Website links need internet and are marked as such in the UI.
 */

export type ResourceGroup = 'crisis' | 'substance' | 'safety' | 'poison' | 'care' | 'parents' | 'caregivers';

export interface Resource {
  id: string;
  name: string;
  blurb: string;
  hours: string;
  group: ResourceGroup;
  call?: { number: string; label: string };
  text?: { to: string; body: string; label: string };
  url?: { href: string; label: string };
}

export const RESOURCES: Resource[] = [
  {
    id: '988',
    name: '988 Suicide & Crisis Lifeline',
    blurb: 'Talk to a trained counselor about suicidal thoughts, emotional distress, or a mental health or substance use crisis. You can also call or text for someone you are worried about.',
    hours: 'Free, 24/7',
    group: 'crisis',
    call: { number: '988', label: '988' },
    text: { to: '988', body: '', label: 'Text 988' },
  },
  {
    id: 'crisis_text',
    name: 'Crisis Text Line',
    blurb: 'Prefer texting to talking? Text a live, trained crisis counselor about stress, anxiety, grief, loneliness, abuse, and more.',
    hours: 'Free, 24/7',
    group: 'crisis',
    text: { to: '741741', body: 'HOME', label: 'Text HOME to 741741' },
  },
  {
    id: 'nami',
    name: 'NAMI HelpLine',
    blurb: 'Peer support, information, and local referrals for mental health conditions, for you or someone you care about.',
    hours: 'Free, Mon\u2013Fri 10am\u201310pm ET',
    group: 'crisis',
    call: { number: '18009506264', label: '1-800-950-6264' },
    text: { to: '62640', body: 'helpline', label: 'Text "helpline" to 62640' },
  },
  {
    id: 'samhsa',
    name: 'SAMHSA National Helpline',
    blurb: 'Treatment referrals and information for mental health and substance use. English and Spanish.',
    hours: 'Free, 24/7, 365 days',
    group: 'substance',
    call: { number: '18006624357', label: '1-800-662-4357' },
  },
  {
    id: 'naed',
    name: 'National Alliance for Eating Disorders Helpline',
    blurb: 'Therapist-run support and referrals for eating disorders, for you or a loved one.',
    hours: 'Free, Mon\u2013Fri 9am\u20137pm ET',
    group: 'substance',
    call: { number: '18666621235', label: '1-866-662-1235' },
  },
  {
    id: 'ndvh',
    name: 'National Domestic Violence Hotline',
    blurb: 'Support and safety planning for anyone affected by relationship abuse. If you think your phone or internet use may be monitored, call rather than browsing.',
    hours: 'Free, 24/7',
    group: 'safety',
    call: { number: '18007997233', label: '1-800-799-7233' },
    text: { to: '88788', body: 'START', label: 'Text START to 88788' },
  },
  {
    id: 'rainn',
    name: 'RAINN National Sexual Assault Hotline',
    blurb: 'Support after sexual assault, and help finding local services. English and Spanish.',
    hours: 'Free, 24/7',
    group: 'safety',
    call: { number: '18006564673', label: '1-800-656-4673' },
  },
  {
    id: 'poison',
    name: 'Poison Help Line',
    blurb: 'Swallowed something harmful, or took too much of a medicine? Nurses and pharmacists will tell you what to do. Call even if the person seems fine.',
    hours: 'Free, 24/7',
    group: 'poison',
    call: { number: '18002221222', label: '1-800-222-1222' },
  },
  {
    id: 'maternal',
    name: 'National Maternal Mental Health Hotline',
    blurb: 'Support during pregnancy and after birth for sadness, anxiety, and feeling overwhelmed. English and Spanish.',
    hours: 'Free, 24/7, call or text',
    group: 'parents',
    call: { number: '18338526262', label: '1-833-852-6262' },
    text: { to: '18338526262', body: '', label: 'Text 1-833-852-6262' },
  },
  {
    id: 'eldercare',
    name: 'Eldercare Locator',
    blurb: 'Connects older adults, families, and caregivers to local services such as meals, home care, transportation, and respite care (a break for caregivers).',
    hours: 'Free, phone specialists Mon\u2013Fri',
    group: 'caregivers',
    call: { number: '18006771116', label: '1-800-677-1116' },
  },
  {
    id: 'alz',
    name: 'Alzheimer\u2019s Association 24/7 Helpline',
    blurb: 'Support and information for people living with memory loss or dementia, and for the people caring for them. Staff can talk through decisions and point you to local help.',
    hours: 'Free, 24/7, 365 days',
    group: 'caregivers',
    call: { number: '18002723900', label: '1-800-272-3900' },
  },
  {
    id: '211',
    name: '211 Community Help',
    blurb: 'Dial 211 to find local help with food, housing, utilities, clinics, and more. Texting your ZIP code to 898211 works in many areas.',
    hours: 'Free, hours vary by area',
    group: 'care',
    call: { number: '211', label: '211' },
    text: { to: '898211', body: '', label: 'Text your ZIP to 898211' },
  },
  {
    id: 'hrsa',
    name: 'Low-Cost Community Health Centers',
    blurb: 'Health centers that charge based on what you can afford, with or without insurance. Search by ZIP code. (Needs internet.)',
    hours: 'Find one near you',
    group: 'care',
    url: { href: 'https://findahealthcenter.hrsa.gov/', label: 'findahealthcenter.hrsa.gov' },
  },
];

const BY_ID: Record<string, Resource> = Object.fromEntries(RESOURCES.map((r) => [r.id, r]));

export const GROUP_TITLES: Record<ResourceGroup, string> = {
  crisis: 'Crisis & emotional support',
  substance: 'Substance use & eating disorders',
  safety: 'Safety & abuse',
  poison: 'Poison & overdose',
  parents: 'Pregnancy & new parents',
  caregivers: 'Caregivers & older adults',
  care: 'Low-cost care & community help',
};

/** Which resources fit which condition. Anything not listed falls back to a sensible default. */
const RESOURCES_BY_SYMPTOM: Record<string, string[]> = {
  mental_health_crisis: ['988', 'crisis_text', 'samhsa'],
  panic_anxiety: ['988', 'crisis_text', 'nami'],
  depression_signs: ['988', 'crisis_text', 'nami', 'hrsa'],
  burnout_stress: ['crisis_text', 'nami', 'hrsa'],
  sleep_problems: ['hrsa', '211'],
  grief_loss: ['988', 'crisis_text', 'nami'],
  substance_concern: ['samhsa', '988'],
  eating_concerns: ['naed', '988', 'crisis_text'],
  trauma: ['988', 'rainn', 'crisis_text'],
  unsafe_home: ['ndvh', 'rainn', '988'],
  postpartum: ['maternal', '988', 'hrsa'],
  loneliness: ['211', 'crisis_text', 'nami'],
  poisoning: ['poison'],
  pregnancy: ['hrsa', 'maternal'],
  anger: ['988', 'crisis_text', 'nami'],
  self_esteem: ['988', 'crisis_text', 'nami'],
  social_anxiety: ['crisis_text', 'nami', 'hrsa'],
  low_motivation: ['988', 'crisis_text', 'nami', 'hrsa'],
  screen_time: ['crisis_text', 'nami'],
  constant_worry: ['crisis_text', 'nami', 'hrsa'],
  caregiver_strain: ['eldercare', 'alz', '988', 'nami'],
  fall_older: ['eldercare', '211', 'hrsa'],
};

export function resourcesFor(symptom: SymptomEntry, urgency: UrgencyLevel): Resource[] {
  const mapped = RESOURCES_BY_SYMPTOM[symptom.id];
  let ids: string[];
  if (mapped) {
    ids = mapped;
  } else if (symptom.category === 'mental') {
    ids = ['988', 'crisis_text', 'nami'];
  } else {
    // Ordinary physical issue: the useful free help is about affording and finding care.
    ids = urgency === 'emergency' ? [] : ['hrsa', '211'];
  }
  return ids.map((id) => BY_ID[id]).filter(Boolean);
}

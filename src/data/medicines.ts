import type { UrgencyLevel } from './triageData';

/**
 * Plain-language guide to common over-the-counter medicines and first-aid supplies.
 * DELIBERATELY NO DOSING. Amounts depend on age, weight, and health, so this guide only says what
 * something is for and one key thing to know. The app always points people to the package label
 * and a pharmacist.
 */

export type IconKind =
  | 'acetaminophen'
  | 'ibuprofen'
  | 'aspirin'
  | 'antihistamine'
  | 'ors'
  | 'epinephrine'
  | 'naloxone'
  | 'inhaler'
  | 'glucose'
  | 'bandage'
  | 'thermometer'
  | 'coldpack'
  | 'antacid'
  | 'saline'
  | 'cream';

export interface Medicine {
  id: string;
  name: string;
  icon: IconKind;
  usedFor: string;
  goodToKnow: string;
}

export const MEDICINES: Medicine[] = [
  {
    id: 'acetaminophen',
    name: 'Acetaminophen (Tylenol)',
    icon: 'acetaminophen',
    usedFor: 'Pain and fever.',
    goodToKnow: 'Many cold and flu products also contain it, so check labels to avoid doubling up. Too much can harm the liver. Follow the package directions, and for babies and young children ask a doctor or pharmacist how much to give.',
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen (Advil, Motrin)',
    icon: 'ibuprofen',
    usedFor: 'Pain, fever, and swelling.',
    goodToKnow: 'Take it with food. It is not right for everyone. Ask a pharmacist first if you have kidney or stomach problems, take blood thinners, or are pregnant. Do not give it to babies under 6 months.',
  },
  {
    id: 'aspirin',
    name: 'Aspirin',
    icon: 'aspirin',
    usedFor: 'Chest pain that may be a heart attack, after you have called emergency services.',
    goodToKnow: 'Chew it unless you are allergic or were told not to. Do not give aspirin to children or teens.',
  },
  {
    id: 'antihistamine',
    name: 'Antihistamine (cetirizine, loratadine, diphenhydramine)',
    icon: 'antihistamine',
    usedFor: 'Mild allergy symptoms, itching, and hives.',
    goodToKnow: 'Some cause drowsiness. These do not treat a severe allergic reaction. That needs epinephrine and emergency care.',
  },
  {
    id: 'ors',
    name: 'Oral rehydration solution (Pedialyte, ORS packets)',
    icon: 'ors',
    usedFor: 'Dehydration from vomiting, diarrhea, or heat.',
    goodToKnow: 'Sip small amounts often rather than a lot at once. Seek care if you cannot keep fluids down.',
  },
  {
    id: 'epinephrine',
    name: 'Epinephrine auto-injector (EpiPen)',
    icon: 'epinephrine',
    usedFor: 'Severe allergic reactions (anaphylaxis).',
    goodToKnow: 'Use it right away, then call emergency services even if you feel better, because symptoms can return. Follow the pictures on the device.',
  },
  {
    id: 'naloxone',
    name: 'Naloxone nasal spray (Narcan)',
    icon: 'naloxone',
    usedFor: 'Reversing an opioid overdose.',
    goodToKnow: 'Anyone can give it. Call emergency services, give it, and stay with the person, because its effects can wear off. It is sold over the counter in the U.S., and many community programs hand it out for free.',
  },
  {
    id: 'inhaler',
    name: 'Rescue inhaler (albuterol)',
    icon: 'inhaler',
    usedFor: 'Asthma flare-ups: wheezing and a tight chest.',
    goodToKnow: 'Prescription only. Use it the way your doctor directed. If it does not help, or you struggle to speak, call emergency services.',
  },
  {
    id: 'glucose',
    name: 'Glucose tablets or gel',
    icon: 'glucose',
    usedFor: 'Low blood sugar in people with diabetes.',
    goodToKnow: 'Works fast. Recheck blood sugar after about 15 minutes. If the person cannot swallow safely, give nothing by mouth and call emergency services.',
  },
  {
    id: 'bandage',
    name: 'Sterile gauze and bandages',
    icon: 'bandage',
    usedFor: 'Covering wounds and pressing on bleeding.',
    goodToKnow: 'Press firmly and keep pressing. If blood soaks through, add more layers on top instead of removing the first one.',
  },
  {
    id: 'thermometer',
    name: 'Thermometer',
    icon: 'thermometer',
    usedFor: 'Checking for a fever.',
    goodToKnow: 'A temperature of 100.4\u00B0F (38\u00B0C) or higher is generally considered a fever. In a baby under 3 months, any fever needs medical care right away.',
  },
  {
    id: 'coldpack',
    name: 'Cold pack',
    icon: 'coldpack',
    usedFor: 'Sprains, bruises, and swelling.',
    goodToKnow: 'Wrap it in a cloth, never put ice directly on skin, and use it for about 15 to 20 minutes at a time.',
  },
  {
    id: 'antacid',
    name: 'Antacid (Tums, Rolaids)',
    icon: 'antacid',
    usedFor: 'Short-term relief from heartburn and upset stomach.',
    goodToKnow: 'Works within minutes but does not last. If you need it more than twice a week, see a doctor. Follow the package directions.',
  },
  {
    id: 'saline',
    name: 'Saline nasal spray or rinse',
    icon: 'saline',
    usedFor: 'Stuffy noses from colds and allergies.',
    goodToKnow: 'Gentle and safe to use often. If you use a rinse bottle, use only distilled, sterile, or boiled-and-cooled water, never plain tap water.',
  },
  {
    id: 'hydrocortisone',
    name: 'Hydrocortisone cream',
    icon: 'cream',
    usedFor: 'Itchy skin from bug bites, rashes, and eczema.',
    goodToKnow: 'Use a thin layer for a few days only, as directed on the label. Do not use it on broken skin or on the face unless a doctor says to.',
  },
  {
    id: 'barrier',
    name: 'Zinc oxide diaper cream',
    icon: 'cream',
    usedFor: 'Protecting a baby\u2019s skin from diaper rash.',
    goodToKnow: 'Apply a thick layer at every diaper change. Let the skin air-dry first if you can.',
  },
];

const BY_ID: Record<string, Medicine> = Object.fromEntries(MEDICINES.map((m) => [m.id, m]));

/** `always` shows at every urgency level; `nonEmergency` only when the result is not an emergency. */
const MEDICINES_BY_SYMPTOM: Record<string, { always?: string[]; nonEmergency?: string[] }> = {
  chest_pain: { always: ['aspirin'] },
  breathing: { always: ['inhaler'] },
  allergic_reaction: { always: ['epinephrine'], nonEmergency: ['antihistamine'] },
  bleeding: { always: ['bandage'] },
  high_fever: { nonEmergency: ['acetaminophen', 'ibuprofen', 'thermometer'] },
  headache: { nonEmergency: ['acetaminophen', 'ibuprofen'] },
  cold_flu: { nonEmergency: ['acetaminophen', 'ibuprofen', 'thermometer', 'saline'] },
  dehydration: { nonEmergency: ['ors'] },
  heat_illness: { nonEmergency: ['ors'] },
  minor_injury: { nonEmergency: ['bandage'] },
  sprain_fracture: { nonEmergency: ['coldpack', 'ibuprofen', 'bandage'] },
  rash: { nonEmergency: ['antihistamine'] },
  low_blood_sugar: { nonEmergency: ['glucose'] },
  substance_concern: { always: ['naloxone'] },
  sore_throat: { nonEmergency: ['acetaminophen', 'ibuprofen'] },
  earache: { nonEmergency: ['acetaminophen', 'ibuprofen'] },
  heartburn: { nonEmergency: ['antacid'] },
  back_pain: { nonEmergency: ['ibuprofen', 'acetaminophen'] },
  hay_fever: { nonEmergency: ['antihistamine', 'saline'] },
  toothache: { nonEmergency: ['acetaminophen', 'ibuprofen', 'coldpack'] },
  sunburn: { nonEmergency: ['acetaminophen', 'ibuprofen'] },
  bug_bites: { nonEmergency: ['hydrocortisone', 'antihistamine', 'coldpack'] },
  eczema: { nonEmergency: ['hydrocortisone'] },
  muscle_soreness: { nonEmergency: ['coldpack', 'ibuprofen'] },
  diaper_rash: { nonEmergency: ['barrier'] },
  period_pain: { nonEmergency: ['ibuprofen', 'acetaminophen'] },
};

export function medicinesFor(symptomId: string, urgency: UrgencyLevel): Medicine[] {
  const entry = MEDICINES_BY_SYMPTOM[symptomId];
  if (!entry) return [];
  const ids = [...(entry.always ?? []), ...(urgency === 'emergency' ? [] : entry.nonEmergency ?? [])];
  return ids.map((id) => BY_ID[id]).filter(Boolean);
}

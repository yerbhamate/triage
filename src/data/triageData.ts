/**
 * Offline triage knowledge base.
 *
 * Design principle: ALWAYS ERR TOWARD CAUTION. If any red-flag symptom is
 * present, the result is "emergency" regardless of anything else selected.
 * This mirrors how real nurse-line / NHS-111-style triage tools are built:
 * conservative rule-outs first, nothing fancy or diagnostic.
 *
 * This is general public health information, not a diagnosis. Every
 * result screen must carry a visible disclaimer (see ResultScreen.tsx).
 */

import { MORE_SYMPTOMS } from './moreSymptoms';
import { EVERYDAY_SYMPTOMS } from './everydaySymptoms';

export type UrgencyLevel = 'emergency' | 'urgent_care' | 'see_doctor' | 'self_care';
export type HealthCategory = 'physical' | 'mental';

export interface FlagOption {
  id: string;
  label: string;
}

export interface SymptomEntry {
  id: string;
  label: string;
  icon: string; // emoji, works with zero network/assets
  category: HealthCategory;
  /** If true, results for this entry are NOT saved to on-device history (protects people in unsafe situations). */
  private?: boolean;
  /** If ANY of these are checked, result is always "emergency." */
  redFlags: FlagOption[];
  /** If no red flag but ANY of these checked, result is "urgent_care." */
  moderateFlags: FlagOption[];
  /** Gentler tier: if nothing above is checked but ANY of these are, result is at least "see_doctor." */
  softFlags?: FlagOption[];
  /** Result when nothing above is checked. */
  defaultLevel: UrgencyLevel;
  advice: Record<UrgencyLevel, string>;
}

const BASE_SYMPTOMS: SymptomEntry[] = [
  {
    id: 'chest_pain',
    label: 'Chest Pain or Pressure',
    icon: '\u{1FAC0}',
    category: 'physical',
    redFlags: [
      { id: 'radiating', label: 'Pain spreads to arm, jaw, neck, or back' },
      { id: 'sob', label: 'Shortness of breath with the pain' },
      { id: 'sweating', label: 'Cold sweat, nausea, or lightheadedness with it' },
      { id: 'crushing', label: 'Feels like crushing, squeezing pressure' },
    ],
    moderateFlags: [
      { id: 'exertion', label: 'Started during physical activity' },
      { id: 'worsening', label: 'Getting worse over the last hour' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'These signs can mean a heart attack. Call emergency services (911 in the US) right now. Do not drive yourself. Chew an aspirin if you have one and are not allergic.',
      urgent_care: 'Go to urgent care or an ER today — this combination needs same-day evaluation.',
      see_doctor: 'Schedule a doctor visit in the next day or two. Seek immediate care if anything changes or worsens.',
      self_care: 'Monitor closely. Rest and avoid exertion. If pain returns or worsens, seek care immediately.',
    },
  },
  {
    id: 'breathing',
    label: 'Difficulty Breathing',
    icon: '\u{1F62E}\u{200D}\u{1F4A8}',
    category: 'physical',
    redFlags: [
      { id: 'cant_speak', label: 'Cannot speak full sentences' },
      { id: 'blue_lips', label: 'Lips or face turning blue or gray' },
      { id: 'severe_distress', label: 'Gasping, struggling hard to breathe' },
    ],
    moderateFlags: [
      { id: 'wheezing', label: 'Wheezing or whistling sound' },
      { id: 'worse_lying', label: 'Worse when lying down' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'Call emergency services now. Severe breathing trouble can become life-threatening within minutes.',
      urgent_care: 'Seek urgent care today — breathing difficulty with these signs needs same-day evaluation.',
      see_doctor: 'See a doctor within a day or two. Seek emergency care immediately if breathing worsens.',
      self_care: 'Rest in an upright position. If this does not improve within a few hours, seek care.',
    },
  },
  {
    id: 'stroke_signs',
    label: 'Possible Stroke Signs',
    icon: '\u{1F9E0}',
    category: 'physical',
    redFlags: [
      { id: 'face_droop', label: 'Face drooping on one side' },
      { id: 'arm_weak', label: 'Arm weakness or numbness on one side' },
      { id: 'speech', label: 'Slurred speech or trouble speaking' },
      { id: 'sudden_confusion', label: 'Sudden confusion or vision loss' },
    ],
    moderateFlags: [],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'Call emergency services immediately and note the time symptoms started. Every minute matters for stroke treatment. Do not drive yourself.',
      urgent_care: 'Seek urgent evaluation today.',
      see_doctor: 'These symptoms should still be checked by a doctor soon, even if mild.',
      self_care: 'Any of these signs, even briefly, should be evaluated — consider seeing a doctor soon.',
    },
  },
  {
    id: 'bleeding',
    label: 'Bleeding or Deep Wound',
    icon: '\u{1FA78}',
    category: 'physical',
    redFlags: [
      { id: 'wont_stop', label: "Won't stop after 10 minutes of firm pressure" },
      { id: 'spurting', label: 'Spurting or pulsing blood' },
      { id: 'deep_gaping', label: 'Wound is deep, gaping, or exposes bone/muscle' },
    ],
    moderateFlags: [
      { id: 'dirty_wound', label: 'Wound is dirty or from a rusty/animal source' },
      { id: 'numbness', label: 'Numbness or loss of movement near the wound' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Apply firm, direct pressure with a clean cloth and call emergency services now. Keep the injured area elevated if possible.',
      urgent_care: 'This likely needs stitches or a tetanus check — go to urgent care today.',
      see_doctor: 'Clean the wound and watch for infection (increasing redness, warmth, swelling, pus). See a doctor within a day or two.',
      self_care: 'Clean with water, apply pressure until bleeding stops, cover with a clean bandage. Watch for signs of infection.',
    },
  },
  {
    id: 'allergic_reaction',
    label: 'Allergic Reaction',
    icon: '\u{1F91D}',
    category: 'physical',
    redFlags: [
      { id: 'throat_swelling', label: 'Throat or tongue swelling' },
      { id: 'trouble_breathing_allergy', label: 'Trouble breathing or wheezing' },
      { id: 'fainting', label: 'Feeling faint or losing consciousness' },
      { id: 'whole_body', label: 'Hives or swelling spreading over the whole body' },
    ],
    moderateFlags: [
      { id: 'localized_swelling', label: 'Significant swelling in one area' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'This can be anaphylaxis. Use an epinephrine auto-injector (EpiPen) now if available, then call emergency services immediately, even if symptoms improve.',
      urgent_care: 'Seek urgent care today, especially if swelling is spreading.',
      see_doctor: 'An antihistamine may help. See a doctor if it does not improve in a day.',
      self_care: 'An over-the-counter antihistamine may help with mild itching or hives. Watch closely for any worsening.',
    },
  },
  {
    id: 'high_fever',
    label: 'High Fever',
    icon: '\u{1F321}\u{FE0F}',
    category: 'physical',
    redFlags: [
      { id: 'stiff_neck', label: 'Stiff neck with the fever' },
      { id: 'confusion_fever', label: 'Confusion or extreme drowsiness' },
      { id: 'rash_fever', label: 'Rash that does not fade when pressed' },
      { id: 'infant_fever', label: 'Infant under 3 months old with any fever' },
    ],
    moderateFlags: [
      { id: 'very_high', label: 'Temperature above 103°F (39.4°C)' },
      { id: 'days', label: 'Fever lasting more than 3 days' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'These combined signs need immediate emergency evaluation — call emergency services or go to the ER now.',
      urgent_care: 'Seek care today, especially for a very high or prolonged fever.',
      see_doctor: 'Monitor and stay hydrated. See a doctor if it continues past a day or two.',
      self_care: 'Rest, fluids, and fever-reducing medication like acetaminophen can help. Seek care if new symptoms appear.',
    },
  },
  {
    id: 'abdominal_pain',
    label: 'Severe Abdominal Pain',
    icon: '\u{1F91A}',
    category: 'physical',
    redFlags: [
      { id: 'rigid', label: 'Belly is rigid, hard, or extremely tender to touch' },
      { id: 'blood_stool', label: 'Blood in vomit or stool' },
      { id: 'pregnant_pain', label: 'Pregnant with severe pain or bleeding' },
    ],
    moderateFlags: [
      { id: 'persistent_vomit', label: 'Cannot keep fluids down' },
      { id: 'localized_severe', label: 'Severe pain in one specific spot (e.g. lower right)' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'Call emergency services or go to the ER now — these signs need immediate evaluation.',
      urgent_care: 'Seek urgent care today.',
      see_doctor: 'See a doctor within a day. Seek immediate care if pain worsens sharply.',
      self_care: 'Rest and avoid solid food temporarily. Seek care if pain worsens or persists beyond a day.',
    },
  },
  {
    id: 'head_injury',
    label: 'Head Injury',
    icon: '\u{1FA79}',
    category: 'physical',
    redFlags: [
      { id: 'lost_consciousness', label: 'Lost consciousness, even briefly' },
      { id: 'repeated_vomit', label: 'Repeated vomiting after the injury' },
      { id: 'worsening_headache', label: 'Worsening headache or confusion' },
      { id: 'unequal_pupils', label: 'Pupils are different sizes' },
    ],
    moderateFlags: [
      { id: 'dizzy', label: 'Dizziness or balance trouble since the injury' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services or go to the ER now — these are signs of a possible serious brain injury.',
      urgent_care: 'Seek urgent evaluation today, even if symptoms seem mild.',
      see_doctor: 'Watch closely for the next 24 hours. See a doctor if anything changes.',
      self_care: 'Rest and monitor for the next 24 hours. Seek care immediately if new symptoms appear.',
    },
  },
  {
    id: 'seizure',
    label: 'Seizure',
    icon: '\u{26A1}',
    category: 'physical',
    redFlags: [
      { id: 'first_time', label: 'First seizure ever' },
      { id: 'long_seizure', label: 'Lasted more than 5 minutes' },
      { id: 'not_waking', label: 'Not regaining consciousness between seizures' },
      { id: 'injury_seizure', label: 'Injury occurred during the seizure' },
    ],
    moderateFlags: [],
    defaultLevel: 'urgent_care',
    advice: {
      emergency: 'Call emergency services now. Keep the person safe from injury, turn them on their side, do not restrain them or put anything in their mouth.',
      urgent_care: 'This needs evaluation today, even if the person has seizures before and this one followed their normal pattern.',
      see_doctor: 'Follow up with a doctor soon.',
      self_care: 'Follow the person\u2019s existing seizure action plan if they have one.',
    },
  },
  {
    id: 'mental_health_crisis',
    label: 'Thoughts of Suicide or Self-Harm',
    icon: '\u{1F49A}',
    category: 'mental',
    private: true,
    redFlags: [
      { id: 'immediate_plan', label: 'Have a specific plan or means right now' },
      { id: 'immediate_intent', label: 'Feel you might act on it right now' },
    ],
    moderateFlags: [
      { id: 'frequent_thoughts', label: 'Having these thoughts frequently' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'Please call or text 988 (Suicide & Crisis Lifeline) right now, or call emergency services. You do not have to go through this alone, and help is available immediately, 24/7.',
      urgent_care: 'Please reach out now to 988 (call or text) to talk with someone right away. This is available 24/7 and free.',
      see_doctor: 'Please consider talking to a doctor or counselor soon. 988 is also available anytime you want to talk, even if it does not feel like an emergency.',
      self_care: '988 (Suicide & Crisis Lifeline) is available anytime, for any level of distress — not just emergencies. Reaching out is a sign of strength, not a last resort.',
    },
  },
  {
    id: 'minor_injury',
    label: 'Minor Cut, Scrape, or Bruise',
    icon: '\u{1FA79}',
    category: 'physical',
    redFlags: [],
    moderateFlags: [
      { id: 'increasing_redness', label: 'Redness or swelling is increasing' },
      { id: 'pus', label: 'Pus or foul smell from the wound' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services if bleeding will not stop, the wound is deep, or you feel faint.',
      urgent_care: 'This may be infected — seek care today.',
      see_doctor: 'Keep clean and watch closely; see a doctor if it does not improve in a couple days.',
      self_care: 'Clean with water, apply a bandage, and keep it clean and dry. Most minor wounds heal on their own within a week or two.',
    },
  },
  {
    id: 'cold_flu',
    label: 'Cold or Flu Symptoms',
    icon: '\u{1F927}',
    category: 'physical',
    redFlags: [
      { id: 'flu_breathing', label: 'Severe difficulty breathing' },
      { id: 'flu_chest_pain', label: 'Chest pain or pressure' },
    ],
    moderateFlags: [
      { id: 'flu_not_improving', label: 'Not improving after a week' },
      { id: 'flu_high_fever', label: 'High fever along with other symptoms' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'These combined signs need emergency evaluation now.',
      urgent_care: 'Seek care today, especially if you have other health conditions.',
      see_doctor: 'See a doctor if symptoms persist beyond a week.',
      self_care: 'Rest, fluids, and over-the-counter symptom relief. Most colds resolve within 7–10 days.',
    },
  },
  {
    id: 'dehydration',
    label: 'Vomiting / Diarrhea',
    icon: '\u{1F922}',
    category: 'physical',
    redFlags: [
      { id: 'no_urination', label: 'No urination for 8+ hours' },
      { id: 'severe_dizzy', label: 'Severe dizziness or fainting when standing' },
      { id: 'blood_vomit', label: 'Blood in vomit or stool' },
    ],
    moderateFlags: [
      { id: 'cant_keep_down', label: 'Cannot keep any fluids down for a day' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'These are signs of severe dehydration — seek emergency care now.',
      urgent_care: 'Seek care today to prevent worsening dehydration.',
      see_doctor: 'If this continues past a day, see a doctor.',
      self_care: 'Sip small amounts of water or oral rehydration solution frequently. Rest and avoid solid food until it settles.',
    },
  },
  {
    id: 'burns',
    label: 'Burn',
    icon: '\u{1F525}',
    category: 'physical',
    redFlags: [
      { id: 'large_burn', label: 'Larger than the palm of your hand' },
      { id: 'face_burn', label: 'On the face, hands, or genitals' },
      { id: 'charred', label: 'Skin is white, charred, or leathery' },
    ],
    moderateFlags: [
      { id: 'blistering', label: 'Blistering' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services or go to the ER now. Do not apply ice, butter, or ointments.',
      urgent_care: 'Seek urgent care today for proper burn treatment.',
      see_doctor: 'Keep clean and watch for infection. See a doctor if it worsens.',
      self_care: 'Cool the burn with cool (not ice-cold) running water for 10–20 minutes. Cover loosely with a clean, non-stick bandage.',
    },
  },

  // --- Mental & Emotional Health ---
  {
    id: 'panic_anxiety',
    label: 'Anxiety or Panic Attack',
    icon: '\u{1F630}',
    category: 'mental',
    redFlags: [
      { id: 'pa_harm', label: 'Thoughts of harming yourself' },
      { id: 'chest_pain_panic', label: 'Chest pain or pressure along with it' },
      { id: 'cant_breathe_panic', label: 'Feel like you truly cannot breathe' },
      { id: 'detached', label: 'Feel completely detached from reality' },
    ],
    moderateFlags: [
      { id: 'frequent_panic', label: 'This is happening several times a week' },
      { id: 'interfering', label: 'Interfering with work, school, or daily life' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Chest pain or real breathing difficulty should be checked right away — call emergency services, since panic attacks and heart issues can feel similar and it is safer to confirm which this is. If you are having thoughts of harming yourself, call or text 988 right now.',
      urgent_care: 'Please talk to a doctor or counselor soon — frequent panic attacks are very treatable, and you do not have to manage this alone.',
      see_doctor: 'Consider talking to a doctor or therapist. Panic attacks are common and respond well to treatment.',
      self_care: 'Try slow breathing: in for 4 counts, hold for 4, out for 6. Panic attacks are intense but not dangerous and typically peak within 10 minutes.',
    },
  },
  {
    id: 'depression_signs',
    label: 'Persistent Sadness or Hopelessness',
    icon: '\u{1F622}',
    category: 'mental',
    redFlags: [
      { id: 'dep_harm', label: 'Thoughts of harming yourself' },
      { id: 'cant_function', label: 'Cannot get out of bed or function at all' },
      { id: 'hopeless_severe', label: 'Feel like things will never get better' },
    ],
    moderateFlags: [
      { id: 'weeks', label: 'Lasting most of the day, nearly every day, for 2+ weeks' },
      { id: 'losing_interest', label: 'Lost interest in things you used to enjoy' },
      { id: 'sleep_appetite', label: 'Big changes in sleep or appetite' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'If you are also having thoughts of harming yourself, please call or text 988 right now, or call emergency services. If not, please still reach out to a doctor or counselor as soon as possible — you deserve support.',
      urgent_care: 'Please reach out to a doctor or therapist soon. What you are describing is treatable, and reaching out is a strong, worthwhile step.',
      see_doctor: 'Consider talking to a doctor or counselor. Persistent low mood is common and very treatable.',
      self_care: 'Low mood that comes and goes is normal. If it starts lasting most days for two weeks or more, consider talking to someone.',
    },
  },
  {
    id: 'burnout_stress',
    label: 'Overwhelming Stress or Burnout',
    icon: '\u{1F62B}',
    category: 'mental',
    redFlags: [
      { id: 'bo_harm', label: 'Thoughts of harming yourself' },
    ],
    moderateFlags: [
      { id: 'physical_symptoms', label: 'Causing physical symptoms (headaches, chest tightness, stomach issues)' },
      { id: 'cant_cope', label: 'Feel unable to cope with daily responsibilities' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Please call or text 988 right now, or call emergency services. You do not have to carry this alone, and help is available at any hour.',
      urgent_care: 'Please talk to a doctor — ongoing stress that affects your body and daily function is worth addressing with support.',
      see_doctor: 'Consider talking to a doctor or counselor about strategies to manage this.',
      self_care: 'Try to protect basic needs first — sleep, food, movement, and breaks. Small, consistent steps help more than big ones during high stress.',
    },
  },
  {
    id: 'sleep_problems',
    label: 'Sleep Problems',
    icon: '\u{1F62A}',
    category: 'mental',
    redFlags: [
      { id: 'sl_harm', label: 'Thoughts of harming yourself' },
      { id: 'unsafe_drowsy', label: 'So exhausted it feels unsafe to drive or work' },
    ],
    moderateFlags: [
      { id: 'weeks_sleep', label: 'Trouble sleeping most nights for 2+ weeks' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Please do not drive or operate machinery. If you feel unsafe right now, call emergency services. If you are having thoughts of harming yourself, call or text 988 right now.',
      urgent_care: 'Please avoid driving or operating machinery, and see a doctor soon — ongoing severe sleep loss affects safety and health.',
      see_doctor: 'Persistent sleep trouble is worth discussing with a doctor — it is often very treatable.',
      self_care: 'Keep a consistent sleep/wake time, limit screens before bed, and avoid caffeine late in the day. If it continues past two weeks, consider seeing a doctor.',
    },
  },
  {
    id: 'grief_loss',
    label: 'Grief or Loss',
    icon: '\u{1F97A}',
    category: 'mental',
    redFlags: [
      { id: 'gr_harm', label: 'Thoughts of harming yourself' },
    ],
    moderateFlags: [
      { id: 'grief_function', label: 'Struggling to function months after the loss' },
      { id: 'grief_isolating', label: 'Withdrawing completely from others' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Please call or text 988 right now, or call emergency services. Grief can feel unbearable, and you do not have to go through it alone.',
      urgent_care: 'A grief counselor or therapist can help — ongoing, intense grief that disrupts daily life deserves support, and that support really does help.',
      see_doctor: 'Consider a grief support group or counselor — you do not have to go through this alone.',
      self_care: 'Grief has no fixed timeline. Be patient with yourself, lean on people you trust, and consider a support group if it feels isolating.',
    },
  },
  {
    id: 'substance_concern',
    label: 'Substance Use Concern',
    icon: '\u{1F37A}',
    category: 'mental',
    private: true,
    redFlags: [
      { id: 'sub_harm', label: 'Thoughts of harming yourself' },
      { id: 'withdrawal_severe', label: 'Severe withdrawal symptoms (shaking, seizure, confusion)' },
      { id: 'overdose_signs', label: 'Signs of overdose (unresponsive, very slow/no breathing)' },
    ],
    moderateFlags: [
      { id: 'cant_stop', label: 'Unable to cut back despite wanting to' },
      { id: 'affecting_life', label: 'Affecting work, relationships, or health' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services immediately. If available, use naloxone for a suspected opioid overdose and stay with the person. If you are having thoughts of harming yourself, call or text 988 right now.',
      urgent_care: 'Please reach out to a doctor or a substance use helpline soon — withdrawal can be medically risky to manage alone.',
      see_doctor: 'Consider talking to a doctor — they can connect you with support without judgment.',
      self_care: 'Free, confidential support is available through SAMHSA\u2019s National Helpline (1-800-662-4357), available 24/7.',
    },
  },
];

export const SYMPTOMS: SymptomEntry[] = [...BASE_SYMPTOMS, ...MORE_SYMPTOMS, ...EVERYDAY_SYMPTOMS];

export const URGENCY_META: Record<UrgencyLevel, { label: string; color: string; description: string }> = {
  emergency: {
    label: 'Emergency — Act Now',
    color: '#E5484D',
    description: 'Call emergency services or go to the nearest ER immediately.',
  },
  urgent_care: {
    label: 'Urgent Care Today',
    color: '#F5A623',
    description: 'This needs medical attention today — urgent care or same-day doctor visit.',
  },
  see_doctor: {
    label: 'See a Doctor Soon',
    color: '#5B8DEF',
    description: 'Schedule a visit in the next day or two. Watch for worsening symptoms.',
  },
  self_care: {
    label: 'Self-Care at Home',
    color: '#30A46C',
    description: 'This can likely be managed at home. Seek care if it worsens or does not improve.',
  },
};

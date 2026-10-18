import type { SymptomEntry } from './triageData';

/**
 * Additional conditions. Same rules as triageData.ts:
 * - ANY red flag => emergency. Always err toward caution.
 * - No dosing anywhere. Medicine info lives in medicines.ts and never gives amounts.
 * - Entries marked `private: true` are never written to on-device history.
 */
export const MORE_SYMPTOMS: SymptomEntry[] = [
  // ---------------- PHYSICAL ----------------
  {
    id: 'headache',
    label: 'Severe or Unusual Headache',
    icon: '\u{1F92F}',
    category: 'physical',
    redFlags: [
      { id: 'thunderclap', label: 'Sudden, explosive headache, the worst of your life' },
      { id: 'headache_neuro', label: 'Weakness, numbness, vision loss, slurred speech, or confusion' },
      { id: 'headache_fever_neck', label: 'Fever and a stiff neck with the headache' },
      { id: 'headache_after_injury', label: 'Started after a blow to the head' },
    ],
    moderateFlags: [
      { id: 'headache_vomit', label: 'Repeated vomiting with it' },
      { id: 'headache_days', label: 'Lasting more than 3 days or keeps coming back' },
      { id: 'headache_new_over50', label: 'A new kind of headache and you are over 50' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services now. These warning signs can point to bleeding in the brain, infection, or stroke. Do not drive yourself.',
      urgent_care: 'Get seen today. A new or worsening headache with these signs needs a medical exam.',
      see_doctor: 'Book a doctor visit soon, especially if headaches are becoming more frequent.',
      self_care: 'Rest in a quiet, dim room, drink water, and try an over-the-counter pain reliever as directed on the label. See a doctor if headaches become frequent or severe.',
    },
  },
  {
    id: 'sprain_fracture',
    label: 'Sprain, Strain, or Broken Bone',
    icon: '\u{1F9B4}',
    category: 'physical',
    redFlags: [
      { id: 'bone_visible', label: 'Bone is visible, or the limb looks badly out of shape' },
      { id: 'no_circulation', label: 'Hand or foot is cold, pale, blue, or numb below the injury' },
      { id: 'neck_back', label: 'Neck or back pain after a serious fall or crash' },
    ],
    moderateFlags: [
      { id: 'cant_bear_weight', label: 'Cannot put weight on it or use it normally' },
      { id: 'severe_swelling', label: 'Swelling or bruising appeared quickly and is severe' },
      { id: 'bone_tender', label: 'Pain when you press directly on the bone' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services. If a neck or back injury is possible, do not move the person. Do not try to straighten a deformed limb. Cover any open wound with a clean cloth.',
      urgent_care: 'Get an X-ray today at urgent care or an ER. This could be a fracture. Keep the area still and supported.',
      see_doctor: 'If pain or swelling is not clearly improving in a few days, get it checked.',
      self_care: 'Rest it, put a cold pack wrapped in cloth on it for 15 to 20 minutes at a time, wrap it gently with a bandage, and raise it above heart level. Most mild sprains improve within a week or two.',
    },
  },
  {
    id: 'heat_illness',
    label: 'Heat Exhaustion or Heatstroke',
    icon: '\u{1F975}',
    category: 'physical',
    redFlags: [
      { id: 'heat_confused', label: 'Confusion, agitation, or slurred speech' },
      { id: 'heat_no_sweat', label: 'Skin is hot and dry, or sweating has stopped' },
      { id: 'heat_faint', label: 'Fainting or a seizure' },
    ],
    moderateFlags: [
      { id: 'heat_heavy_sweat', label: 'Heavy sweating, cramps, or pale, clammy skin' },
      { id: 'heat_nausea', label: 'Nausea, headache, or dizziness after heat or exertion' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'This may be heatstroke, which is life-threatening. Call emergency services, move the person to shade or air conditioning, and cool them with wet cloths or cool water while you wait.',
      urgent_care: 'Move somewhere cool, sip water, and get medical advice today. Heat exhaustion can turn into heatstroke.',
      see_doctor: 'Rest somewhere cool and drink fluids. See a doctor if you do not feel normal after a few hours.',
      self_care: 'Move to a cool place, loosen clothing, sip water, and rest. If symptoms last longer than an hour or get worse, seek care.',
    },
  },
  {
    id: 'low_blood_sugar',
    label: 'Low or High Blood Sugar',
    icon: '\u{1F36C}',
    category: 'physical',
    redFlags: [
      { id: 'sugar_unresponsive', label: 'Unconscious, very hard to wake, or having a seizure' },
      { id: 'sugar_cant_swallow', label: 'Cannot safely swallow' },
      { id: 'sugar_confused', label: 'Severely confused or unable to respond normally' },
    ],
    moderateFlags: [
      { id: 'sugar_vomiting', label: 'Vomiting, belly pain, or fruity-smelling breath with very high sugar' },
      { id: 'sugar_repeat_lows', label: 'Low sugar keeps coming back after you treat it' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'Call emergency services. Do not put food or drink in the mouth of someone who is unconscious or cannot swallow. If a glucagon kit is available and you know how to use it, use it.',
      urgent_care: 'Get medical help today. Vomiting with very high sugar, or lows that keep returning, can become dangerous quickly.',
      see_doctor: 'If you are awake and can swallow, treat a suspected low with fast sugar such as juice, regular soda, or glucose tablets, and recheck in about 15 minutes. Tell your doctor about any lows or highs that are new for you.',
      self_care: 'If you are awake and can swallow, treat a suspected low with fast sugar and recheck in about 15 minutes.',
    },
  },
  {
    id: 'poisoning',
    label: 'Swallowed Something Harmful',
    icon: '\u{1F9EA}',
    category: 'physical',
    redFlags: [
      { id: 'pois_unresponsive', label: 'Unconscious, hard to wake, or having a seizure' },
      { id: 'pois_breathing', label: 'Trouble breathing, or very slow breathing' },
      { id: 'pois_burns', label: 'Burns or blisters around the mouth, or vomiting blood' },
      { id: 'pois_battery', label: 'A child swallowed a button battery or magnets' },
    ],
    moderateFlags: [
      { id: 'pois_vomit', label: 'Vomiting, dizziness, or unusual sleepiness' },
      { id: 'pois_med', label: 'Took more medicine than directed, or someone else\u2019s medicine' },
    ],
    defaultLevel: 'urgent_care',
    advice: {
      emergency: 'Call emergency services now. Then call Poison Control at 1-800-222-1222 if you can. Do not make the person vomit unless a professional tells you to.',
      urgent_care: 'Call Poison Control now at 1-800-222-1222. It is free and open 24/7, and they will tell you whether you need to be seen. Keep the container or product with you.',
      see_doctor: 'Call Poison Control at 1-800-222-1222 for advice, even if the person feels fine.',
      self_care: 'Call Poison Control at 1-800-222-1222 even if the person feels fine. It is free and open 24/7.',
    },
  },
  {
    id: 'rash',
    label: 'Skin Rash or Hives',
    icon: '\u{1F9F4}',
    category: 'physical',
    redFlags: [
      { id: 'rash_breathing', label: 'Trouble breathing, or swelling of the face, lips, or tongue' },
      { id: 'rash_purple', label: 'Purple or dark spots that do not fade when pressed, with a fever' },
      { id: 'rash_blisters', label: 'Widespread blistering or peeling skin, or sores in the mouth or eyes' },
    ],
    moderateFlags: [
      { id: 'rash_with_fever', label: 'Fever along with the rash' },
      { id: 'rash_spreading', label: 'Spreading quickly or very painful' },
      { id: 'rash_infected', label: 'Warm, swollen, or oozing (possible infection)' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services. These signs can mean a severe allergic reaction or a dangerous skin or blood infection.',
      urgent_care: 'Get seen today. A rash with fever or fast spread should be examined.',
      see_doctor: 'If it lasts more than a few days or keeps coming back, see a doctor.',
      self_care: 'Avoid scratching and possible triggers such as new soaps, foods, medicines, or plants. Cool compresses and fragrance-free moisturizer can help. See a doctor if it spreads or does not improve in a few days.',
    },
  },
  {
    id: 'eye_injury',
    label: 'Eye Injury or Sudden Vision Change',
    icon: '\u{1F441}\u{FE0F}',
    category: 'physical',
    redFlags: [
      { id: 'eye_chemical', label: 'A chemical splashed in the eye' },
      { id: 'eye_vision_loss', label: 'Sudden loss of vision, or a curtain-like shadow' },
      { id: 'eye_embedded', label: 'Something is stuck in the eye, or the eye was cut or punctured' },
    ],
    moderateFlags: [
      { id: 'eye_pain_light', label: 'Eye pain with redness and sensitivity to light' },
      { id: 'eye_blow', label: 'Hit in the eye with swelling or double vision' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'For a chemical splash, flush the eye with clean running water for at least 15 minutes while you get emergency help. Do not rub the eye or try to remove anything stuck in it.',
      urgent_care: 'See an eye doctor or urgent care today. Do not rub the eye.',
      see_doctor: 'Have it checked within a day or two. Avoid rubbing it and avoid contact lenses until it is seen.',
      self_care: 'Rinse gently with clean water or saline, rest your eyes, and avoid rubbing. See a doctor if pain, redness, or blurry vision develops.',
    },
  },
  {
    id: 'pregnancy',
    label: 'Pregnancy Concerns',
    icon: '\u{1F930}',
    category: 'physical',
    redFlags: [
      { id: 'preg_bleeding', label: 'Heavy vaginal bleeding' },
      { id: 'preg_severe_pain', label: 'Severe belly pain or cramping' },
      { id: 'preg_headache_vision', label: 'Severe headache, vision changes, or sudden swelling of the face and hands' },
      { id: 'preg_less_movement', label: 'Baby is moving much less than usual (later in pregnancy)' },
      { id: 'preg_seizure', label: 'A seizure' },
    ],
    moderateFlags: [
      { id: 'preg_vomit', label: 'Vomiting so much you cannot keep fluids down' },
      { id: 'preg_fever', label: 'Fever' },
      { id: 'preg_burning', label: 'Burning when you urinate' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'Call emergency services or go to the nearest ER or labor and delivery unit now. These signs need immediate care for you and your baby.',
      urgent_care: 'Call your OB or midwife, or go to urgent care today. If you cannot reach them, go to an ER or labor and delivery unit.',
      see_doctor: 'Mention it at your next prenatal visit, or call your provider sooner if it worries you.',
      self_care: 'Many pregnancy symptoms are normal, but you can always call your provider with questions. Call sooner if anything changes.',
    },
  },

  // ---------------- MENTAL & EMOTIONAL ----------------
  {
    id: 'eating_concerns',
    label: 'Eating or Body Image Concerns',
    icon: '\u{1F37D}\u{FE0F}',
    category: 'mental',
    private: true,
    redFlags: [
      { id: 'ed_faint', label: 'Fainting, chest pain, or a racing or irregular heartbeat' },
      { id: 'ed_confusion', label: 'Confusion, extreme weakness, or cannot keep any fluids down' },
      { id: 'ed_selfharm', label: 'Thoughts of harming yourself' },
    ],
    moderateFlags: [
      { id: 'ed_restrict', label: 'Skipping meals, bingeing, or purging more than occasionally' },
      { id: 'ed_preoccupied', label: 'Thoughts about food, weight, or body shape take over your day' },
      { id: 'ed_exercise', label: 'Exercising compulsively, or when injured or ill' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'These signs can mean a medical emergency. Call emergency services or go to the nearest ER now. If you are having thoughts of harming yourself, call or text 988.',
      urgent_care: 'Please see a doctor soon. Eating disorders are medical conditions, and getting help early makes a big difference. You deserve support, not judgment.',
      see_doctor: 'Talking with a doctor or therapist who knows about eating concerns can help. You do not have to be "sick enough" to deserve support.',
      self_care: 'Many people struggle with food and body image at some point. If it is taking up more and more of your thoughts, reaching out to a doctor or a helpline is a good next step.',
    },
  },
  {
    id: 'trauma',
    label: 'Trauma, Flashbacks, or Nightmares',
    icon: '\u{1F327}\u{FE0F}',
    category: 'mental',
    private: true,
    redFlags: [
      { id: 'trauma_harm', label: 'Thoughts of harming yourself or someone else' },
      { id: 'trauma_danger', label: 'You are in danger right now' },
    ],
    moderateFlags: [
      { id: 'trauma_month', label: 'Flashbacks, nightmares, or panic for more than a month' },
      { id: 'trauma_avoid', label: 'Avoiding people, places, or reminders so much that daily life is shrinking' },
      { id: 'trauma_numb', label: 'Feeling numb or on edge all the time' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'If you are in danger, call emergency services. If you are thinking about harming yourself or someone else, call or text 988 right now.',
      urgent_care: 'Please connect with a counselor who works with trauma soon. 988 is also there any time you need to talk.',
      see_doctor: 'Trauma reactions are common and treatable. A therapist who specializes in trauma can help, and many offer reduced fees based on income.',
      self_care: 'Strong reactions after something frightening are normal and often ease with time, rest, and support from people you trust. If they last more than a few weeks, consider talking to a counselor.',
    },
  },
  {
    id: 'unsafe_home',
    label: 'Feeling Unsafe at Home',
    icon: '\u{1F3E0}',
    category: 'mental',
    private: true,
    redFlags: [
      { id: 'unsafe_now', label: 'Someone is hurting or threatening you right now' },
      { id: 'unsafe_weapon', label: 'There is a weapon, or threats to kill' },
      { id: 'unsafe_strangled', label: 'You were choked or strangled' },
    ],
    moderateFlags: [
      { id: 'unsafe_controls', label: 'Someone controls your money, phone, or who you see' },
      { id: 'unsafe_afraid', label: 'You are afraid of how someone will react' },
      { id: 'unsafe_repeat', label: 'You were hurt before and it keeps happening' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'If you can do it safely, call emergency services. If calling is not safe, the National Domestic Violence Hotline can help you make a plan: 1-800-799-7233, or text START to 88788.',
      urgent_care: 'Please reach out to the National Domestic Violence Hotline: 1-800-799-7233, or text START to 88788. Trained advocates are there 24/7 and can help you make a safety plan.',
      see_doctor: 'Controlling behavior is a form of abuse, even without physical violence. An advocate at the National Domestic Violence Hotline can talk through your options: 1-800-799-7233.',
      self_care: 'You deserve to feel safe. If anything changes, or you want to talk it through, the National Domestic Violence Hotline is there: 1-800-799-7233, or text START to 88788.',
    },
  },
  {
    id: 'postpartum',
    label: 'New Parent or Postpartum Struggles',
    icon: '\u{1F476}',
    category: 'mental',
    private: true,
    redFlags: [
      { id: 'pp_harm', label: 'Thoughts of harming yourself or your baby' },
      { id: 'pp_psychosis', label: 'Seeing or hearing things that are not there, or feeling confused or paranoid' },
    ],
    moderateFlags: [
      { id: 'pp_weeks', label: 'Sadness, anxiety, or anger lasting more than 2 weeks' },
      { id: 'pp_bonding', label: 'Trouble bonding with or caring for your baby' },
      { id: 'pp_overwhelm', label: 'Feeling like you cannot cope' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Please call emergency services, or call or text 988, right now. These symptoms can be treated, and you are not a bad parent for having them.',
      urgent_care: 'Please call your doctor or the National Maternal Mental Health Hotline today: 1-833-852-6262 (call or text). Postpartum depression and anxiety are common and treatable.',
      see_doctor: 'Many new parents struggle emotionally. Tell your doctor or midwife. Support really helps.',
      self_care: 'Mood swings and tears in the first couple of weeks are very common. Rest when you can, accept help, and reach out if it lasts longer than two weeks.',
    },
  },
  {
    id: 'loneliness',
    label: 'Loneliness or Isolation',
    icon: '\u{1F4AC}',
    category: 'mental',
    redFlags: [
      { id: 'lonely_harm', label: 'Thoughts of harming yourself' },
    ],
    moderateFlags: [
      { id: 'lonely_weeks', label: 'Feeling alone most days for weeks, and it is getting worse' },
      { id: 'lonely_withdraw', label: 'Pulling away from everyone, or stopped doing things you normally do' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Please call or text 988 right now. You do not have to be alone with this.',
      urgent_care: 'Please reach out to someone today: a counselor, a doctor, or 988. Long stretches of loneliness affect health, and real support is available.',
      see_doctor: 'Consider talking to a doctor or counselor. Feeling disconnected for a long time is worth taking seriously.',
      self_care: 'Loneliness is a human signal, not a personal failing. Small steps help: message one person, step outside, join a group, or volunteer. 211 can connect you with local community programs.',
    },
  },
];

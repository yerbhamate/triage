/**
 * Quick first-aid guides that work fully offline. Steps follow widely published basic guidance
 * (American Red Cross, American Heart Association). They are not a replacement for a certified
 * first-aid or CPR course. The UI says so on every guide.
 */

export interface FirstAidGuide {
  id: string;
  title: string;
  icon: string;
  when: string; // one-line "use this when"
  steps: string[];
  note?: string;
}

export const FIRST_AID: FirstAidGuide[] = [
  {
    id: 'cpr',
    title: 'Hands-Only CPR (adult)',
    icon: '\u{1F49B}',
    when: 'Someone has collapsed and is not responding or not breathing normally.',
    steps: [
      'Make sure the area is safe. Tap their shoulders and shout.',
      'Call emergency services, or point at someone and tell them to call and to bring an AED if there is one.',
      'Put the heel of one hand on the center of the chest, and your other hand on top.',
      'Push hard and fast: at least 2 inches deep, about 100 to 120 pushes a minute. Let the chest come back up each time.',
      'Do not stop until help arrives, the person starts to move, or an AED is ready. If you get an AED, turn it on and follow its spoken instructions.',
    ],
    note: 'A certified CPR course is the best preparation. Babies and young children need different steps.',
  },
  {
    id: 'choking',
    title: 'Choking (adult or child over 1)',
    icon: '\u{1FAC1}',
    when: 'Someone cannot cough, speak, or breathe, and may be clutching their throat.',
    steps: [
      'Ask, "Are you choking?" If they can cough or speak, encourage them to keep coughing.',
      'If they cannot breathe, have someone call emergency services.',
      'Lean them forward. Give 5 firm back blows between the shoulder blades with the heel of your hand.',
      'Then give 5 quick abdominal thrusts: make a fist just above the belly button, grab it with your other hand, and pull in and up.',
      'Alternate 5 back blows and 5 thrusts until the object comes out or they become unresponsive. If they become unresponsive, start CPR.',
    ],
    note: 'For a baby under 1, call emergency services right away and use infant-specific steps from a certified course.',
  },
  {
    id: 'bleeding',
    title: 'Severe Bleeding',
    icon: '\u{1FA78}',
    when: 'Blood is spurting, soaking through cloth, or will not stop.',
    steps: [
      'Call emergency services.',
      'Press firmly and directly on the wound with a clean cloth. Use both hands and lean your weight in.',
      'Do not lift the cloth to check. If blood soaks through, add more cloth on top and keep pressing.',
      'Keep pressing until help arrives, which can take many minutes.',
      'If bleeding from an arm or leg is life-threatening and will not stop, and you have a tourniquet and know how to use it, place it a few inches above the wound.',
    ],
  },
  {
    id: 'stroke',
    title: 'Stroke: BE FAST',
    icon: '\u{1F9E0}',
    when: 'Sudden weakness, face droop, trouble speaking, or loss of balance or vision.',
    steps: [
      'Balance: sudden loss of balance or coordination?',
      'Eyes: sudden vision loss or double vision?',
      'Face: does one side of the face droop when they smile?',
      'Arms: does one arm drift down when both are raised?',
      'Speech: is speech slurred, strange, or hard to understand?',
      'Time: if you see any of these, call emergency services right away and note when symptoms started. Do not drive yourself. Do not give food, drink, or aspirin.',
    ],
  },
  {
    id: 'seizure',
    title: 'Seizure',
    icon: '\u26A1',
    when: 'Someone is shaking, stiff, or unresponsive and cannot control it.',
    steps: [
      'Stay with them and note the time it started.',
      'Move hard or sharp objects away. Cushion their head.',
      'Do not hold them down. Do not put anything in their mouth.',
      'When the shaking stops, gently roll them onto their side.',
      'Call emergency services if it lasts more than 5 minutes, it is their first seizure, they are injured or pregnant, they have trouble breathing afterward, or they do not wake up.',
    ],
  },
  {
    id: 'anaphylaxis',
    title: 'Severe Allergic Reaction',
    icon: '\u{1F198}',
    when: 'Swelling of the face or throat, trouble breathing, widespread hives, or fainting after a sting, food, or medicine.',
    steps: [
      'Use an epinephrine auto-injector right away if the person has one. Press it firmly into the outer thigh. It works through clothing.',
      'Call emergency services, even if they start to feel better.',
      'Have them lie down with legs raised. If they are struggling to breathe, let them sit up instead.',
      'A second dose may be needed. Follow the device instructions and the emergency dispatcher.',
      'Stay with them until help arrives.',
    ],
  },
  {
    id: 'overdose',
    title: 'Opioid Overdose',
    icon: '\u{1F48A}',
    when: 'Someone is unresponsive, breathing very slowly or not at all, or has blue or gray lips.',
    steps: [
      'Call emergency services.',
      'If you have naloxone nasal spray, give it: tilt the head back and spray into one nostril.',
      'If they are not breathing and you are trained, give rescue breaths or start CPR.',
      'If they start breathing, roll them onto their side.',
      'Stay with them. If there is no response after 2 to 3 minutes and you have another dose, give it.',
    ],
    note: 'Naloxone is safe to give even if you are not sure it is an opioid overdose.',
  },
  {
    id: 'burns',
    title: 'Burns',
    icon: '\u{1F525}',
    when: 'Skin has been burned by heat, hot liquid, or fire.',
    steps: [
      'Move away from the heat source. Take off rings or tight items near the burn before it swells.',
      'Cool the burn with cool (not ice-cold) running water for 10 to 20 minutes.',
      'Do not use ice, butter, or ointments.',
      'Cover loosely with a clean, non-stick bandage.',
      'Get emergency care for burns bigger than your palm, burns on the face, hands, or genitals, or skin that looks white, charred, or leathery.',
    ],
  },
];

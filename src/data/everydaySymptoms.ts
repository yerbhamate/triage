import type { SymptomEntry } from './triageData';

/**
 * Everyday conditions: mostly milder, so most land on self-care or "see a doctor soon", but every
 * entry keeps real red flags so a serious version is never waved through.
 *
 * Rules (same as the rest of the app):
 * - ANY red flag => emergency. Moderate => urgent care today. Soft => at least "see a doctor soon".
 * - No dosing anywhere. Medicine info lives in medicines.ts.
 * - Every mental/emotional entry includes a "thoughts of harming yourself" red flag, so someone
 *   who picked a milder card while actually in distress is never missed.
 */
export const EVERYDAY_SYMPTOMS: SymptomEntry[] = [
  // ================= EVERYDAY ILLNESS =================
  {
    id: 'sore_throat',
    label: 'Sore Throat',
    icon: '\u{1F5E3}\u{FE0F}',
    category: 'physical',
    redFlags: [
      { id: 'st_breathing', label: 'Trouble breathing, or noisy breathing' },
      { id: 'st_drool', label: 'Cannot swallow your own saliva, or you are drooling' },
      { id: 'st_swelling', label: 'Swelling of the tongue, face, or neck' },
    ],
    moderateFlags: [
      { id: 'st_cant_drink', label: 'Too painful to drink fluids' },
      { id: 'st_high_fever', label: 'High fever along with it' },
      { id: 'st_rash', label: 'A new rash along with it' },
    ],
    softFlags: [
      { id: 'st_week', label: 'Lasting more than a week' },
      { id: 'st_strep', label: 'Someone you live with has strep throat' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services. Trouble breathing, or being unable to swallow saliva, can mean swelling that blocks the airway.',
      urgent_care: 'Get seen today. Very painful swallowing with a high fever can be strep throat or another infection that needs treatment.',
      see_doctor: 'See a doctor for a throat swab, especially if it has lasted more than a week or someone at home has strep.',
      self_care: 'Most sore throats come from viruses and clear up in a few days. Warm drinks, throat lozenges (for older children and adults), honey (not for babies under 1), and rest can help.',
    },
  },
  {
    id: 'cough',
    label: 'Cough',
    icon: '\u{1F637}',
    category: 'physical',
    redFlags: [
      { id: 'cough_blood', label: 'Coughing up blood' },
      { id: 'cough_breath', label: 'Trouble breathing, or cannot speak full sentences' },
      { id: 'cough_blue', label: 'Blue or gray lips' },
      { id: 'cough_choke', label: 'Started suddenly while eating, or after swallowing something' },
    ],
    moderateFlags: [
      { id: 'cough_fever', label: 'High fever, chest pain when breathing, or shaking chills' },
      { id: 'cough_wheeze', label: 'Wheezing' },
    ],
    softFlags: [{ id: 'cough_weeks', label: 'Lasting more than 3 weeks' }],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services. These signs can mean a serious lung problem or a blocked airway.',
      urgent_care: 'Get seen today. A cough with high fever, chest pain, or wheezing can be pneumonia or asthma and needs an exam.',
      see_doctor: 'A cough lasting more than 3 weeks should be checked by a doctor.',
      self_care: 'Most coughs come from colds and clear up within a couple of weeks. Drink fluids, rest, and try a humidifier or warm steam. Honey can soothe a cough in adults and children over 1.',
    },
  },
  {
    id: 'earache',
    label: 'Earache',
    icon: '\u{1F442}',
    category: 'physical',
    redFlags: [
      { id: 'ear_neck', label: 'Stiff neck, severe headache, or confusion' },
      { id: 'ear_behind', label: 'Swelling, redness, or pain behind the ear' },
      { id: 'ear_face', label: 'Weakness or drooping on one side of the face' },
    ],
    moderateFlags: [
      { id: 'ear_fever', label: 'Fever along with the ear pain' },
      { id: 'ear_drain', label: 'Fluid or pus draining from the ear' },
      { id: 'ear_hearing', label: 'Sudden hearing loss' },
    ],
    softFlags: [
      { id: 'ear_days', label: 'Pain lasting more than 2 days' },
      { id: 'ear_child', label: 'A child under 2 with ear pain or pulling at the ear' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services. These signs can mean the infection is spreading beyond the ear.',
      urgent_care: 'Get seen today. Fever, draining fluid, or sudden hearing loss with ear pain needs an exam.',
      see_doctor: 'Have the ear checked within a day or two, especially for young children or pain lasting more than 2 days.',
      self_care: 'Ear pain often comes with a cold and may ease on its own. A warm cloth held to the ear and an over-the-counter pain reliever as directed on the label can help. Do not put anything into the ear canal.',
    },
  },
  {
    id: 'heartburn',
    label: 'Heartburn or Upset Stomach',
    icon: '\u{1F525}',
    category: 'physical',
    redFlags: [
      { id: 'hb_chest', label: 'Chest pain or pressure that spreads to the arm, jaw, or back, or comes with sweating or shortness of breath' },
      { id: 'hb_blood', label: 'Vomiting blood, or black, tarry stools' },
    ],
    moderateFlags: [
      { id: 'hb_vomit', label: 'Repeated vomiting' },
      { id: 'hb_swallow', label: 'Food getting stuck, or painful swallowing' },
    ],
    softFlags: [
      { id: 'hb_often', label: 'Heartburn more than twice a week' },
      { id: 'hb_weight', label: 'Losing weight without trying' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services. Chest pain with these signs can be a heart attack, not heartburn. Vomiting blood or black stools can mean serious bleeding.',
      urgent_care: 'Get seen today. Repeated vomiting or trouble swallowing needs an exam.',
      see_doctor: 'See a doctor. Frequent heartburn, or heartburn with weight loss, should be checked.',
      self_care: 'Try smaller meals, avoid trigger foods, do not lie down right after eating, and raise the head of your bed. An over-the-counter antacid can give short-term relief. Follow the package directions.',
    },
  },
  {
    id: 'back_pain',
    label: 'Back Pain',
    icon: '\u{1F9CD}',
    category: 'physical',
    redFlags: [
      { id: 'bp_bladder', label: 'Numbness in the groin or inner thighs, or new trouble controlling bladder or bowels' },
      { id: 'bp_weak', label: 'Sudden weakness in a leg' },
      { id: 'bp_crash', label: 'Started after a serious fall or crash' },
    ],
    moderateFlags: [
      { id: 'bp_fever', label: 'Fever along with the back pain' },
      { id: 'bp_night', label: 'Severe pain at night that does not ease with rest' },
      { id: 'bp_numb_leg', label: 'Numbness or tingling down a leg' },
    ],
    softFlags: [{ id: 'bp_weeks', label: 'Lasting more than 2 weeks' }],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services. These signs can mean pressure on the spinal nerves, which needs urgent treatment.',
      urgent_care: 'Get seen today. Back pain with fever, nighttime pain, or leg numbness needs an exam.',
      see_doctor: 'If it is not improving after 2 weeks, see a doctor or physical therapist.',
      self_care: 'Stay gently active. Short walks, heat or a cold pack, and changing position often help more than bed rest. Most back pain improves within a few weeks.',
    },
  },
  {
    id: 'nosebleed',
    label: 'Nosebleed',
    icon: '\u{1F443}',
    category: 'physical',
    redFlags: [
      { id: 'nb_head', label: 'Started after a blow to the head or face' },
      { id: 'nb_heavy', label: 'Very heavy bleeding, or blood running down your throat with trouble breathing' },
    ],
    moderateFlags: [
      { id: 'nb_20', label: 'Still bleeding after 20 minutes of steady pressure' },
      { id: 'nb_thinner', label: 'You take blood thinners' },
    ],
    softFlags: [{ id: 'nb_often', label: 'Nosebleeds keep coming back' }],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services. Heavy bleeding, or bleeding after a head injury, needs immediate care.',
      urgent_care: 'Get seen today. A nosebleed that will not stop, or one while on blood thinners, needs medical care.',
      see_doctor: 'See a doctor if nosebleeds keep coming back.',
      self_care: 'Sit up and lean slightly forward (not back). Pinch the soft part of your nose firmly for 10 minutes without letting go to check. Breathe through your mouth, and avoid blowing your nose for several hours afterward.',
    },
  },
  {
    id: 'hay_fever',
    label: 'Allergies or Hay Fever',
    icon: '\u{1F927}',
    category: 'physical',
    redFlags: [
      { id: 'al_breath', label: 'Trouble breathing, wheezing, or throat swelling' },
      { id: 'al_swelling', label: 'Swelling of the face, lips, or tongue' },
    ],
    moderateFlags: [{ id: 'al_chest', label: 'Chest tightness that does not ease' }],
    softFlags: [
      { id: 'al_notworking', label: 'Symptoms most of the season and over-the-counter relief is not working' },
      { id: 'al_sinus', label: 'Facial pain with thick yellow-green mucus for more than 10 days' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'This may be a severe allergic reaction. Use an epinephrine auto-injector if you have one, and call emergency services.',
      urgent_care: 'Get seen today. Chest tightness with allergies can be asthma and needs an exam.',
      see_doctor: 'A doctor can suggest stronger treatment or check for a sinus infection.',
      self_care: 'Keep windows closed on high-pollen days, shower after being outdoors, and consider an over-the-counter antihistamine or nasal spray as directed on the label. If you rinse your nose, use only distilled, sterile, or boiled-and-cooled water, never plain tap water.',
    },
  },
  {
    id: 'pink_eye',
    label: 'Red, Itchy, or Sticky Eye',
    icon: '\u{1F440}',
    category: 'physical',
    redFlags: [
      { id: 'pe_vision', label: 'Sudden vision change, or severe eye pain' },
      { id: 'pe_newborn', label: 'A newborn under 1 month with red, swollen, or sticky eyes' },
      { id: 'pe_chem', label: 'A chemical splashed in the eye' },
    ],
    moderateFlags: [
      { id: 'pe_light', label: 'Eye pain with sensitivity to light' },
      { id: 'pe_contacts', label: 'You wear contact lenses and the eye is red and painful' },
    ],
    softFlags: [
      { id: 'pe_pus', label: 'Thick yellow or green discharge' },
      { id: 'pe_days', label: 'Not improving after 3 days' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services or go to the ER. For a chemical splash, flush the eye with clean running water for at least 15 minutes while you get help.',
      urgent_care: 'See an eye doctor or urgent care today. Stop wearing contact lenses until it is checked.',
      see_doctor: 'Have it checked within a day or two. Thick discharge may need treatment.',
      self_care: 'Pink eye is often viral and clears in one to two weeks, and it spreads easily. Wash your hands often, do not share towels, wipe crusts away with a clean, warm, wet cloth, and skip contact lenses until it is gone.',
    },
  },
  {
    id: 'toothache',
    label: 'Toothache',
    icon: '\u{1F9B7}',
    category: 'physical',
    redFlags: [
      { id: 'tt_neck', label: 'Swelling spreading to the face, jaw, or neck' },
      { id: 'tt_breath', label: 'Trouble breathing or swallowing' },
    ],
    moderateFlags: [
      { id: 'tt_fever', label: 'Fever along with the tooth pain' },
      { id: 'tt_trauma', label: 'A tooth was knocked out, loosened, or broken' },
    ],
    softFlags: [
      { id: 'tt_days', label: 'Pain lasting more than a day or two' },
      { id: 'tt_sens', label: 'Sensitivity to hot or cold that lingers' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'Call emergency services or go to the ER. A spreading dental infection can block the airway.',
      urgent_care: 'See a dentist or urgent care today. A knocked-out tooth is best treated within the hour. Keep it moist in milk, not water.',
      see_doctor: 'See a dentist soon. Tooth pain rarely goes away on its own. Community health centers often offer dental care on a sliding fee.',
      self_care: 'Rinse with warm salt water, avoid very hot, cold, or sugary foods, and use an over-the-counter pain reliever as directed on the label. A cold pack on the cheek can help with swelling.',
    },
  },

  // ================= SKIN & BODY CARE =================
  {
    id: 'sunburn',
    label: 'Sunburn',
    icon: '\u{2600}\u{FE0F}',
    category: 'physical',
    redFlags: [{ id: 'sb_confused', label: 'Confusion, fainting, or a very high fever' }],
    moderateFlags: [
      { id: 'sb_blisters', label: 'Blisters covering a large area, like the back' },
      { id: 'sb_fever', label: 'Fever or chills' },
      { id: 'sb_baby', label: 'Sunburn on a baby under 1 year old' },
    ],
    softFlags: [
      { id: 'sb_eyes', label: 'Painful, gritty, or light-sensitive eyes' },
      { id: 'sb_days', label: 'Not improving after several days' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services. These signs can mean heatstroke. Move to a cool place and cool the person with wet cloths while you wait.',
      urgent_care: 'Get seen today. Severe blistering, fever, or sunburn on a baby needs medical care.',
      see_doctor: 'Have it checked if eyes are affected or it is not improving.',
      self_care: 'Take cool showers or use cool compresses, apply fragrance-free moisturizer or aloe, drink extra water, and stay out of the sun. Do not pop blisters. An over-the-counter pain reliever as directed on the label can help.',
    },
  },
  {
    id: 'bug_bites',
    label: 'Bug Bite or Sting',
    icon: '\u{1F41D}',
    category: 'physical',
    redFlags: [
      { id: 'bite_breath', label: 'Trouble breathing, swelling of the face or throat, or dizziness after a bite or sting' },
      { id: 'bite_mouth', label: 'Stung inside the mouth or throat' },
      { id: 'bite_hives', label: 'Hives or swelling spreading across the body' },
    ],
    moderateFlags: [
      { id: 'bite_streaks', label: 'Redness spreading fast, or red streaks from the bite' },
      { id: 'bite_tickfever', label: 'Fever, body aches, or a rash within weeks of a tick bite' },
    ],
    softFlags: [
      { id: 'bite_tick', label: 'A tick was attached to your skin' },
      { id: 'bite_ring', label: 'A growing red ring or bullseye rash' },
      { id: 'bite_big', label: 'Swelling bigger than your palm for more than a few days' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'This can be a severe allergic reaction. Use an epinephrine auto-injector if you have one, then call emergency services.',
      urgent_care: 'Get seen today. Spreading redness or fever after a bite may mean infection or a tick-borne illness.',
      see_doctor: 'See a doctor, especially after a tick bite. Remove a tick with fine-tipped tweezers close to the skin, pulling straight up, then wash the area.',
      self_care: 'Wash with soap and water and use a cold pack. For a bee sting, scrape the stinger out. An over-the-counter antihistamine or hydrocortisone cream can ease itching. Follow the package directions.',
    },
  },
  {
    id: 'eczema',
    label: 'Dry, Itchy, or Irritated Skin',
    icon: '\u{1F9F4}',
    category: 'physical',
    redFlags: [
      { id: 'ec_wide', label: 'Skin is red and painful over most of the body, or you have a fever with a widespread rash' },
    ],
    moderateFlags: [{ id: 'ec_infected', label: 'Oozing, yellow crusts, or pus' }],
    softFlags: [
      { id: 'ec_sleep', label: 'Itching keeps you awake most nights' },
      { id: 'ec_weeks', label: 'Not improving after 1 to 2 weeks of moisturizing' },
      { id: 'ec_baby', label: 'The person with the rash is a baby' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services or go to the ER. Widespread painful redness, or a rash with fever, needs immediate care.',
      urgent_care: 'Get seen today. Oozing or yellow crusts can mean the skin is infected.',
      see_doctor: 'A doctor can suggest stronger treatment and help find triggers.',
      self_care: 'Moisturize right after bathing, use lukewarm water, choose fragrance-free products, and try not to scratch. Hydrocortisone cream can help for a few days, as directed on the label.',
    },
  },
  {
    id: 'muscle_soreness',
    label: 'Muscle Soreness or Cramps',
    icon: '\u{1F4AA}',
    category: 'physical',
    redFlags: [
      { id: 'mus_breath', label: 'Chest pain or shortness of breath along with leg pain or swelling' },
      { id: 'mus_urine', label: 'Dark, tea-colored urine after hard exercise' },
    ],
    moderateFlags: [
      { id: 'mus_leg', label: 'One leg is swollen, warm, and painful, especially the calf' },
      { id: 'mus_pop', label: 'Felt or heard a pop with sudden severe pain' },
    ],
    softFlags: [
      { id: 'mus_week', label: 'Soreness lasting more than a week' },
      { id: 'mus_cramps', label: 'Cramps that keep happening for no clear reason' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services. Chest pain or breathing trouble with leg pain can mean a blood clot in the lung. Dark urine after hard exercise can mean serious muscle breakdown.',
      urgent_care: 'Get seen today. A swollen, warm, painful leg can be a blood clot, and a sudden pop can mean a torn muscle or tendon.',
      see_doctor: 'See a doctor if soreness lasts more than a week or cramps keep coming back.',
      self_care: 'Gentle movement, stretching, a warm bath, and plenty of water help. Soreness from exercise usually peaks a day or two afterward and fades. Use a cold pack for a sudden strain.',
    },
  },

  // ================= KIDS, WOMEN'S & OLDER ADULTS' HEALTH =================
  {
    id: 'baby_concerns',
    label: 'Baby: Fussy, Feeding, or Teething',
    icon: '\u{1F37C}',
    category: 'physical',
    redFlags: [
      { id: 'tb_breath', label: 'Trouble breathing, grunting, or skin pulling in between the ribs' },
      { id: 'tb_blue', label: 'Blue or gray lips or skin' },
      { id: 'tb_limp', label: 'Very hard to wake, or limp and floppy' },
      { id: 'tb_fever', label: 'Fever of 100.4\u00B0F (38\u00B0C) or higher in a baby under 3 months' },
      { id: 'tb_green', label: 'Green or bloody vomit' },
    ],
    moderateFlags: [
      { id: 'tb_wet', label: 'Far fewer wet diapers than usual, or no tears when crying' },
      { id: 'tb_refuse', label: 'Refusing to feed for many hours' },
      { id: 'tb_cry', label: 'Crying nonstop and cannot be soothed for hours' },
    ],
    softFlags: [
      { id: 'tb_growth', label: 'You are worried about feeding, weight gain, or development' },
      { id: 'tb_rash', label: 'A new rash along with fussiness' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services now. These signs can be serious in a baby. A fever in a baby under 3 months always needs urgent care.',
      urgent_care: 'Call your baby\u2019s doctor or nurse line now, or go to urgent care. Babies can get dehydrated quickly.',
      see_doctor: 'Mention your worries to your baby\u2019s doctor. Questions about feeding and growth are always welcome.',
      self_care: 'For teething, gently rub the gums with a clean finger, or offer a chilled (not frozen) teething ring. Avoid teething gels, teething tablets, and necklaces. They can be dangerous for babies. Teething does not cause a high fever.',
    },
  },
  {
    id: 'diaper_rash',
    label: 'Diaper Rash',
    icon: '\u{1F9F7}',
    category: 'physical',
    redFlags: [{ id: 'dr_fever', label: 'Baby under 3 months with a fever' }],
    moderateFlags: [{ id: 'dr_sores', label: 'Blisters, open sores, or pus' }],
    softFlags: [
      { id: 'dr_days', label: 'Not improving after 3 days' },
      { id: 'dr_spread', label: 'Spreading beyond the diaper area' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services or go to the ER. Any fever in a baby under 3 months needs urgent care.',
      urgent_care: 'Get your baby seen today. Blisters, sores, or pus can mean an infection.',
      see_doctor: 'See your baby\u2019s doctor. A rash that lingers or spreads may be a yeast infection that needs treatment.',
      self_care: 'Change diapers often, clean gently with water, let the skin air-dry, and use a thick zinc oxide barrier cream at each change.',
    },
  },
  {
    id: 'period_pain',
    label: 'Period Pain or Heavy Periods',
    icon: '\u{1FA78}',
    category: 'physical',
    redFlags: [
      { id: 'per_soak', label: 'Soaking through a pad or tampon every hour for 2 or more hours' },
      { id: 'per_faint', label: 'Fainting or severe dizziness' },
      { id: 'per_preg', label: 'Possibly pregnant with severe one-sided belly pain or bleeding' },
    ],
    moderateFlags: [
      { id: 'per_fever', label: 'Fever, or foul-smelling discharge, along with the pain' },
      { id: 'per_nohelp', label: 'Pain so bad that medicine does not help' },
    ],
    softFlags: [
      { id: 'per_change', label: 'Periods suddenly changed or became very irregular' },
      { id: 'per_missed', label: 'Missed several periods in a row' },
      { id: 'per_life', label: 'Pain keeps you from school or work most months' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services or go to the ER. These signs can mean dangerous blood loss or a pregnancy outside the uterus.',
      urgent_care: 'Get seen today. Fever or severe pain that medicine does not ease needs an exam.',
      see_doctor: 'See a doctor. Painful, very heavy, or irregular periods are common and often treatable. You do not have to just put up with them.',
      self_care: 'A heating pad, gentle movement, and plenty of water can help. An over-the-counter pain reliever as directed on the label often works well.',
    },
  },
  {
    id: 'urinary',
    label: 'Burning When You Pee (Possible UTI)',
    icon: '\u{1F4A7}',
    category: 'physical',
    redFlags: [
      { id: 'uti_confused', label: 'New confusion or extreme drowsiness, especially in an older adult' },
      { id: 'uti_cant', label: 'Cannot pass any urine' },
    ],
    moderateFlags: [
      { id: 'uti_fever', label: 'Fever or shaking chills' },
      { id: 'uti_back', label: 'Pain in your side or back' },
      { id: 'uti_vomit', label: 'Vomiting' },
      { id: 'uti_preg', label: 'You are pregnant' },
    ],
    softFlags: [
      { id: 'uti_blood', label: 'Blood in your urine' },
      { id: 'uti_repeat', label: 'This keeps coming back' },
      { id: 'uti_male', label: 'The person is male' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'Call emergency services or go to the ER. Confusion, or being unable to pass urine, can be serious.',
      urgent_care: 'Get seen today. Fever, back pain, or vomiting can mean the infection has reached the kidneys.',
      see_doctor: 'See a doctor within a day or two. Urinary infections usually need antibiotics, and many clinics and telehealth services can help quickly.',
      self_care: 'Drink plenty of water, but do not wait it out. These infections usually need antibiotics, so see a doctor within a day or two.',
    },
  },
  {
    id: 'dizziness',
    label: 'Dizziness or Lightheadedness',
    icon: '\u{1F635}\u{200D}\u{1F4AB}',
    category: 'physical',
    redFlags: [
      { id: 'diz_chest', label: 'Chest pain, a racing or irregular heartbeat, or shortness of breath' },
      { id: 'diz_neuro', label: 'Face drooping, slurred speech, weakness, or a sudden severe headache' },
      { id: 'diz_head', label: 'Started after a blow to the head' },
    ],
    moderateFlags: [
      { id: 'diz_faint', label: 'You passed out, or nearly did' },
      { id: 'diz_spin', label: 'Room-spinning with vomiting, or sudden hearing loss' },
    ],
    softFlags: [
      { id: 'diz_stand', label: 'Mostly when you stand up quickly' },
      { id: 'diz_meds', label: 'Started after a new medicine' },
      { id: 'diz_repeat', label: 'Keeps happening' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Call emergency services. These signs can point to a heart problem, a stroke, or a head injury.',
      urgent_care: 'Get seen today. Fainting, or spinning with vomiting, needs an exam.',
      see_doctor: 'See a doctor. Dizziness that keeps happening, or began after a new medicine, is worth checking. Do not stop a prescribed medicine without asking.',
      self_care: 'Sit or lie down right away, sip water, and stand up slowly afterward. Dizziness when standing is often from dehydration or standing up too fast. Sudden movements can make it worse.',
    },
  },
  {
    id: 'fall_older',
    label: 'A Fall (Older Adult)',
    icon: '\u{1F9D3}',
    category: 'physical',
    redFlags: [
      { id: 'fall_head', label: 'Hit the head, especially if on blood thinners' },
      { id: 'fall_cantup', label: 'Cannot get up, or has severe hip, leg, or back pain' },
      { id: 'fall_confused', label: 'New confusion, drowsiness, or vomiting' },
      { id: 'fall_bleed', label: 'Heavy bleeding' },
    ],
    moderateFlags: [
      { id: 'fall_joint', label: 'Swelling or pain in a joint or limb' },
      { id: 'fall_cause', label: 'The fall happened because of dizziness, fainting, or a racing heart' },
    ],
    softFlags: [
      { id: 'fall_again', label: 'This is not the first fall this year' },
      { id: 'fall_afraid', label: 'Now afraid to walk or go out' },
    ],
    defaultLevel: 'see_doctor',
    advice: {
      emergency: 'Call emergency services. Do not move the person if a neck, back, or hip injury is possible. A head injury while on blood thinners can be serious even when the person seems fine.',
      urgent_care: 'Get seen today. Pain in a limb or joint may be a fracture, and a fall caused by dizziness needs a cause found.',
      see_doctor: 'Tell the doctor about any fall, even without injury. Ask for a review of medicines and a vision check. Falls are often preventable.',
      self_care: 'Tell the doctor about any fall. To lower the risk of another: remove loose rugs, add night lights and grab bars, wear sturdy shoes, and stay active to keep strength and balance.',
    },
  },

  // ================= EVERYDAY MENTAL HEALTH =================
  {
    id: 'social_anxiety',
    label: 'Social Anxiety',
    icon: '\u{1F636}',
    category: 'mental',
    redFlags: [{ id: 'sa_harm', label: 'Thoughts of harming yourself' }],
    moderateFlags: [
      { id: 'sa_avoid', label: 'Avoiding school, work, or leaving home because of it' },
      { id: 'sa_panic', label: 'Panic attacks in social situations' },
    ],
    softFlags: [
      { id: 'sa_months', label: 'It has lasted 6 months or more' },
      { id: 'sa_subst', label: 'Using alcohol or other substances to get through social situations' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Please call or text 988 right now. You do not have to face this alone.',
      urgent_care: 'Please talk to a doctor or counselor soon. Social anxiety is common and treats well, and avoiding things tends to make it grow.',
      see_doctor: 'Consider talking to a therapist. Treatments like cognitive behavioral therapy are very effective for social anxiety.',
      self_care: 'Take small steps toward situations that scare you, instead of avoiding them. Slow breathing before a social event helps, and so does focusing on the other person rather than on how you come across. Almost everyone worries more about this than others notice.',
    },
  },
  {
    id: 'low_motivation',
    label: 'Low Motivation or Feeling Stuck',
    icon: '\u{1F50B}',
    category: 'mental',
    redFlags: [{ id: 'lm_harm', label: 'Thoughts of harming yourself' }],
    moderateFlags: [
      { id: 'lm_hopeless', label: 'Feeling hopeless or worthless' },
      { id: 'lm_basic', label: 'Struggling to eat, wash, or get out of bed' },
    ],
    softFlags: [
      { id: 'lm_weeks', label: 'Lasting more than 2 weeks' },
      { id: 'lm_interest', label: 'Lost interest in things you used to enjoy' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Please call or text 988 right now. You matter, and help is available at any hour.',
      urgent_care: 'Please reach out to a doctor or counselor today, or call or text 988. What you are describing is treatable.',
      see_doctor: 'Low motivation that lasts weeks can be a sign of depression, which is common and treatable. Consider talking to a doctor or counselor.',
      self_care: 'Shrink the task: promise yourself just 5 minutes. Get daylight, move a little, and keep one small daily routine. Telling one person how you are doing can lift more than you expect.',
    },
  },
  {
    id: 'anger',
    label: 'Anger or Irritability',
    icon: '\u{1F624}',
    category: 'mental',
    redFlags: [
      { id: 'anger_others', label: 'Thoughts of harming someone else' },
      { id: 'anger_self', label: 'Thoughts of harming yourself' },
    ],
    moderateFlags: [
      { id: 'anger_hurt', label: 'You have hurt someone, broken things, or scared people close to you' },
    ],
    softFlags: [
      { id: 'anger_rel', label: 'It is damaging your relationships or work' },
      { id: 'anger_often', label: 'Frequent outbursts you regret' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'If you are thinking about harming someone or yourself, step away from the situation now and call or text 988. If anyone is in immediate danger, call emergency services.',
      urgent_care: 'Please talk to a counselor soon. Anger that has led to hurting people or breaking things is something help can change. Call or text 988 any time you need to talk.',
      see_doctor: 'Consider talking to a counselor or doctor. Anger is often tied to stress, sleep, pain, or something underneath, and it responds well to support.',
      self_care: 'In the moment: step away, breathe out slowly (longer than you breathe in), and move your body. Name what you feel. Come back to the conversation once you are calm.',
    },
  },
  {
    id: 'self_esteem',
    label: 'Low Self-Esteem or Harsh Self-Talk',
    icon: '\u{1F4AD}',
    category: 'mental',
    redFlags: [{ id: 'se_harm', label: 'Thoughts of harming yourself' }],
    moderateFlags: [{ id: 'se_burden', label: 'Feeling worthless, or like a burden to others' }],
    softFlags: [
      { id: 'se_weeks', label: 'Most days, for weeks' },
      { id: 'se_avoid', label: 'Avoiding things because you feel you are not good enough' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Please call or text 988 right now. The way you feel about yourself right now is not the whole truth, and help is there.',
      urgent_care: 'Please talk to a doctor or counselor soon, or call or text 988. Feeling like a burden is a symptom that treatment can ease.',
      see_doctor: 'A counselor can help with harsh self-talk. It is one of the things therapy is good at changing.',
      self_care: 'Notice the harsh voice, then ask what you would say to a friend in the same spot. Write down three things you handled this week. Cut back on scrolling that leaves you comparing yourself to others, and keep one small promise to yourself each day.',
    },
  },
  {
    id: 'screen_time',
    label: 'Too Much Screen Time or Doomscrolling',
    icon: '\u{1F4F1}',
    category: 'mental',
    redFlags: [{ id: 'scr_harm', label: 'Thoughts of harming yourself' }],
    moderateFlags: [
      { id: 'scr_sleep', label: 'Staying up most nights because of your phone' },
      { id: 'scr_duty', label: 'Missing school, work, or time with people because of it' },
    ],
    softFlags: [
      { id: 'scr_cant', label: 'You have tried to cut back and could not' },
      { id: 'scr_mood', label: 'You usually feel worse after using it' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Please call or text 988 right now. You do not have to be alone with this.',
      urgent_care: 'Please talk to a doctor or counselor soon. When a phone is costing you sleep or your responsibilities, support can help.',
      see_doctor: 'Consider talking to a counselor. Compulsive scrolling is often a way of coping with stress, loneliness, or low mood, and that is the part worth looking at.',
      self_care: 'Charge your phone outside the bedroom, turn off non-essential notifications, set a daily limit in your phone\u2019s built-in screen time settings, and plan a few scroll-free hours. A short walk makes a good replacement.',
    },
  },
  {
    id: 'constant_worry',
    label: 'Worry That Will Not Switch Off',
    icon: '\u{1F300}',
    category: 'mental',
    redFlags: [{ id: 'cw_harm', label: 'Thoughts of harming yourself' }],
    moderateFlags: [
      { id: 'cw_function', label: 'Worry is getting in the way of work, school, or relationships' },
      { id: 'cw_body', label: 'Restlessness, muscle tension, stomach trouble, or poor sleep most days' },
    ],
    softFlags: [{ id: 'cw_months', label: 'Most days for 6 months or more' }],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'Please call or text 988 right now. Help is available at any hour.',
      urgent_care: 'Please talk to a doctor or counselor soon. Worry that disrupts daily life is a common, treatable condition.',
      see_doctor: 'Consider talking to a doctor or therapist. Constant worry for months is very treatable.',
      self_care: 'Try a daily 15-minute worry time, then set worries aside until tomorrow. Write each one down next to what you can and cannot control. Slow breathing, movement, and less caffeine all help.',
    },
  },
  {
    id: 'caregiver_strain',
    label: 'Caring for Someone (Caregiver Strain)',
    icon: '\u{1F9E1}',
    category: 'mental',
    redFlags: [
      { id: 'cg_hurt', label: 'Worried you might hurt the person you care for, or yourself' },
    ],
    moderateFlags: [
      { id: 'cg_health', label: 'Exhausted, sick, or neglecting your own health because of caregiving' },
      { id: 'cg_alone', label: 'No break and no one to help' },
    ],
    softFlags: [
      { id: 'cg_guilt', label: 'Feeling guilty, resentful, or overwhelmed most days' },
      { id: 'cg_sleep', label: 'Not sleeping or eating well' },
    ],
    defaultLevel: 'self_care',
    advice: {
      emergency: 'If you are worried you might hurt the person you care for, or yourself, call or text 988 now, or call emergency services if anyone is in danger. Reaching out before things get that far is a sign of responsibility, not failure.',
      urgent_care: 'You are carrying a lot. Please reach out today to your own doctor or to 988, and ask about respite care, which gives caregivers a break. The Eldercare Locator can connect you with local help.',
      see_doctor: 'Caregivers often neglect their own health. Tell your own doctor, and look into respite care and caregiver support groups.',
      self_care: 'Feeling stretched thin is very common in caregivers. Accept help when it is offered, take short breaks, keep your own appointments, and connect with other caregivers.',
    },
  },
];

# Triage

A free health guide that works with **no internet, no account, and no cost**.

Pick what's going on, check any warning signs, and get a clear next step: **Emergency**, **Urgent Care Today**, **See a Doctor Soon**, or **Self-Care**. Then get free help you can reach right away.

## Why this exists

Lots of people have no good way to answer the question "is this serious?" at the moment it matters: people far from clinics, people without insurance who are afraid of an ER bill, people with no signal after a disaster, and people in an unsafe home who can't leave a trail on their phone. Most symptom checkers need an internet connection and an account. Triage needs neither.

## What it does

**The core check**
- **59 conditions** across **Physical** and **Mental & Emotional** health, from emergencies (chest pain, stroke signs) to everyday things (sore throat, sunburn, social anxiety), searchable from one box
- **Conservative triage with four levels.** Any single red-flag sign always escalates to *Emergency*. Milder warning signs step up to *Urgent Care* or *See a Doctor Soon*
- **Free help after every result:** the right U.S. hotlines and services for that situation, with one-tap call and text
- **Read aloud** on every result, for low-vision and low-literacy users

**Things most health apps leave out**
- **Costs & Your Rights.** Fear of the bill is a top reason people avoid care. Plain-language guide to ER rights, hospital financial assistance, surprise bills, and lower-cost care
- **Prepare for Your Visit.** Turns a result into a short summary and question list to show or share with a doctor, for anyone who freezes up or struggles to explain things
- **My Safety Plan.** A written list of steps for when thoughts get dark, saved only on the device
- **Privacy by design.** Sensitive topics are never saved to history (see below)

**Tools**
- **Medicine & supplies guide** with a consistent illustrated icon set. Says what things are *for*, with **no doses**
- **First aid guides:** hands-only CPR, choking, severe bleeding, stroke (BE FAST), seizure, severe allergic reaction, opioid overdose, burns
- **Calming tools:** guided breathing (in 4, hold 4, out 6) and a 5-4-3-2-1 grounding exercise
- **One-tap 911** bar always on the home screen

## Design decisions

- **Offline first.** All content is bundled in the app. Phone and text lines work without internet, only a signal.
- **Privacy by design.** Sensitive topics (crisis, domestic violence, eating concerns, trauma, substance use, postpartum) are **never saved** to history, so nobody who picks up the device can see them. Everything else is stored only on the device and can be cleared in one tap.
- **Every mental-health card has a safety net.** Each one includes a "thoughts of harming yourself" red flag that routes straight to 988, so someone who picked a milder card while in distress is never missed.
- **No dosing, ever.** Doses depend on age, weight, and health. The app always points to the package label and a pharmacist.
- **Icons instead of photos.** Medicine icons are drawn in one style on identical tiles, so they look like a set, work offline, and have no photo-licensing questions.
- **Auditable and tested.** The whole decision engine is about twenty lines (`src/utils/triageEngine.ts`). All medical content lives in plain data files you can read and review. An automated check runs the real engine over every condition: every red flag must escalate to Emergency, and no result may ever show empty or placeholder advice.

## Honest limitations

- This is **general guidance, not a diagnosis**, and it has **not been clinically reviewed or validated**. Content is written from widely published public guidance (American Red Cross, American Heart Association, CDC) and should be reviewed by a clinician before any real-world release.
- Resources and the Costs & Your Rights guide are **U.S. only**. Hotline numbers and legal facts (EMTALA, the No Surprises Act, hospital financial assistance rules) were checked against official or authoritative sources in October 2026 and must be re-checked before every release. The rights guide is general information, not legal advice.
- Anyone who opens the app on the device can see the safety plan and past checks. The app says so, and both can be cleared.
- Calling and texting need a phone. On a tablet the app shows the number to dial instead.

## Run it

```bash
npm install
npx expo start
```

Open the QR code in **Expo Go** on your phone or tablet.

## Project structure

```
App.tsx                         routes and shared state
src/data/
  triageData.ts                 core conditions, urgency levels
  moreSymptoms.ts               additional conditions
  everydaySymptoms.ts           everyday conditions (milder, with a gentle middle tier)
  resources.ts                  verified free help lines + which fit which condition
  medicines.ts                  what common medicines/supplies are for (no doses)
  firstAid.ts                   step-by-step first aid
  costsRights.ts                costs and patient-rights guide
src/utils/triageEngine.ts       red flag => emergency, moderate => urgent care, soft => see a doctor
src/components/MedIcon.tsx      the consistent medicine icon set
src/screens/                    home, flag check, result, history, tools, safety plan, visit prep
```

## Add a condition

Add an entry to `src/data/everydaySymptoms.ts` with its red flags, moderate flags, optional soft flags, default level, and advice for each of the four urgency levels. Keep red flags conservative. When in doubt, escalate.

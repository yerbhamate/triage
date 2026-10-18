import { SymptomEntry, UrgencyLevel } from '../data/triageData';

const RANK: Record<UrgencyLevel, number> = {
  self_care: 0,
  see_doctor: 1,
  urgent_care: 2,
  emergency: 3,
};

/**
 * Core triage decision logic. Deliberately simple and auditable:
 *   any red flag      -> emergency, full stop, no exceptions
 *   any moderate flag -> urgent care today
 *   any soft flag     -> at least "see a doctor soon" (never lowers a higher default)
 *   otherwise         -> the symptom's own default level
 *
 * This conservative "most serious flag wins" design is intentional: it is far safer to
 * over-escalate a self-limiting issue than to under-escalate a dangerous one.
 */
export function evaluateTriage(
  symptom: SymptomEntry,
  checkedFlagIds: Set<string>,
): UrgencyLevel {
  if (symptom.redFlags.some((f) => checkedFlagIds.has(f.id))) return 'emergency';
  if (symptom.moderateFlags.some((f) => checkedFlagIds.has(f.id))) return 'urgent_care';

  const soft = symptom.softFlags ?? [];
  if (soft.some((f) => checkedFlagIds.has(f.id))) {
    return RANK[symptom.defaultLevel] >= RANK.see_doctor ? symptom.defaultLevel : 'see_doctor';
  }
  return symptom.defaultLevel;
}

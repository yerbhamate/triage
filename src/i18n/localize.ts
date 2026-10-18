import { URGENCY_META } from '../data/triageData';
import type { SymptomEntry, UrgencyLevel, FlagOption } from '../data/triageData';
import { SYMPTOMS_ES } from '../data/es/symptoms.es';
import { URGENCY_ES } from '../data/es/symptomText';
import type { Lang } from './LanguageContext';

/** Returns the condition with Spanish label, flag text and advice when lang is 'es'. */
export function localizeSymptom(s: SymptomEntry, lang: Lang): SymptomEntry {
  if (lang !== 'es') return s;
  const es = SYMPTOMS_ES[s.id];
  if (!es) return s;
  const fl = (f: FlagOption): FlagOption => ({ ...f, label: es.flags[f.id] ?? f.label });
  return {
    ...s,
    label: es.label,
    redFlags: s.redFlags.map(fl),
    moderateFlags: s.moderateFlags.map(fl),
    softFlags: s.softFlags?.map(fl),
    advice: { ...s.advice, ...es.advice },
  };
}

/** Returns the urgency banner (label, color, description) in the chosen language. */
export function localizeUrgency(level: UrgencyLevel, lang: Lang) {
  const base = URGENCY_META[level];
  return lang === 'es' ? { ...base, ...URGENCY_ES[level] } : base;
}

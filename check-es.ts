import { SYMPTOMS } from './src/data/triageData';
import { SYMPTOMS_ES } from './src/data/es/symptoms.es';

const LEVELS = ['emergency', 'urgent_care', 'see_doctor', 'self_care'] as const;
const problems: string[] = [];
let flagCount = 0;

for (const s of SYMPTOMS) {
  const es = SYMPTOMS_ES[s.id];
  if (!es) {
    problems.push('MISSING condition: ' + s.id);
    continue;
  }
  if (!es.label) problems.push('No label: ' + s.id);
  const allFlags = [...s.redFlags, ...s.moderateFlags, ...(s.softFlags ?? [])];
  for (const f of allFlags) {
    flagCount++;
    if (!es.flags[f.id]) problems.push('MISSING flag: ' + s.id + ' / ' + f.id);
  }
  const known = new Set(allFlags.map((f) => f.id));
  for (const id of Object.keys(es.flags)) {
    if (!known.has(id)) problems.push('EXTRA flag (typo?): ' + s.id + ' / ' + id);
  }
  for (const lvl of LEVELS) {
    if (!es.advice[lvl]) problems.push('MISSING advice: ' + s.id + ' / ' + lvl);
  }
}

const englishIds = new Set(SYMPTOMS.map((s) => s.id));
for (const id of Object.keys(SYMPTOMS_ES)) {
  if (!englishIds.has(id)) problems.push('EXTRA condition (typo?): ' + id);
}

console.log('Conditions: ' + SYMPTOMS.length + ', flags checked: ' + flagCount);
console.log(problems.length ? problems.join('\n') : 'ALL GOOD: every condition, flag and advice has Spanish.');
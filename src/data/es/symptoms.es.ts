import type { SymptomTextEs } from './symptomText';
import { PART1 } from './symptoms.part1.es';
import { PART2 } from './symptoms.part2.es';
import { PART3 } from './symptoms.part3.es';
import { PART4 } from './symptoms.part4.es';
import { PART5 } from './symptoms.part5.es';
// @@IMPORTS

export const SYMPTOMS_ES: Record<string, SymptomTextEs> = {
  ...PART1,
  ...PART2,
  ...PART3,
  ...PART4,
  ...PART5,
  // @@SPREADS
};

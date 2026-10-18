/** Shape of Spanish text for one condition. Keys match the ids in the English data files. */

export type UrgencyKey = 'emergency' | 'urgent_care' | 'see_doctor' | 'self_care';

export interface SymptomTextEs {
  label: string;
  flags: Record<string, string>;
  advice: Record<UrgencyKey, string>;
}

export const URGENCY_ES: Record<UrgencyKey, { label: string; description: string }> = {
  emergency: {
    label: 'Emergencia — actúe ya',
    description: 'Llame a emergencias o vaya de inmediato a la sala de emergencias más cercana.',
  },
  urgent_care: {
    label: 'Atención urgente hoy',
    description: 'Esto necesita atención médica hoy: atención urgente o una cita médica el mismo día.',
  },
  see_doctor: {
    label: 'Consulte a un médico pronto',
    description: 'Programe una cita en el próximo día o dos. Vigile si los síntomas empeoran.',
  },
  self_care: {
    label: 'Autocuidado en casa',
    description: 'Esto probablemente se pueda manejar en casa. Busque atención si empeora o no mejora.',
  },
};

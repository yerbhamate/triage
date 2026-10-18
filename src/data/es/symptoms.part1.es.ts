import type { SymptomTextEs } from './symptomText';

export const PART1: Record<string, SymptomTextEs> = {
  chest_pain: {
    label: 'Dolor u opresión en el pecho',
    flags: {
      radiating: 'El dolor se extiende al brazo, la mandíbula, el cuello o la espalda',
      sob: 'Falta de aire junto con el dolor',
      sweating: 'Sudor frío, náuseas o mareo junto con el dolor',
      crushing: 'Se siente como una opresión fuerte, como si lo apretaran',
      exertion: 'Empezó durante actividad física',
      worsening: 'Está empeorando en la última hora',
    },
    advice: {
      emergency: 'Estas señales pueden indicar un infarto. Llame a emergencias (911 en EE. UU.) ahora mismo. No maneje usted mismo. Mastique una aspirina si tiene una y no es alérgico.',
      urgent_care: 'Vaya a atención urgente o a la sala de emergencias hoy: esta combinación necesita evaluación el mismo día.',
      see_doctor: 'Programe una cita con un médico en el próximo día o dos. Busque atención inmediata si algo cambia o empeora.',
      self_care: 'Vigile de cerca. Descanse y evite el esfuerzo. Si el dolor regresa o empeora, busque atención de inmediato.',
    },
  },
  breathing: {
    label: 'Dificultad para respirar',
    flags: {
      cant_speak: 'No puede decir oraciones completas',
      blue_lips: 'Los labios o la cara se ponen azules o grises',
      severe_distress: 'Jadea o se esfuerza mucho para respirar',
      wheezing: 'Silbidos al respirar',
      worse_lying: 'Empeora al acostarse',
    },
    advice: {
      emergency: 'Llame a emergencias ahora. La dificultad grave para respirar puede poner la vida en peligro en minutos.',
      urgent_care: 'Busque atención urgente hoy: la dificultad para respirar con estas señales necesita evaluación el mismo día.',
      see_doctor: 'Consulte a un médico en un día o dos. Busque atención de emergencia de inmediato si la respiración empeora.',
      self_care: 'Descanse en posición erguida. Si no mejora en unas horas, busque atención.',
    },
  },
  stroke_signs: {
    label: 'Posibles señales de derrame cerebral',
    flags: {
      face_droop: 'Un lado de la cara caído',
      arm_weak: 'Debilidad o adormecimiento en un brazo, de un solo lado',
      speech: 'Habla arrastrada o dificultad para hablar',
      sudden_confusion: 'Confusión repentina o pérdida de la vista',
    },
    advice: {
      emergency: 'Llame a emergencias de inmediato y anote la hora en que empezaron los síntomas. Cada minuto cuenta en el tratamiento del derrame cerebral. No maneje usted mismo.',
      urgent_care: 'Busque evaluación urgente hoy.',
      see_doctor: 'Estos síntomas deben ser revisados pronto por un médico, aunque sean leves.',
      self_care: 'Cualquiera de estas señales, aunque sea por poco tiempo, debe ser evaluada: considere ver a un médico pronto.',
    },
  },
  bleeding: {
    label: 'Sangrado o herida profunda',
    flags: {
      wont_stop: 'No se detiene después de 10 minutos de presión firme',
      spurting: 'La sangre sale a chorros o pulsa',
      deep_gaping: 'La herida es profunda, está abierta o deja ver hueso o músculo',
      dirty_wound: 'La herida está sucia o fue causada por algo oxidado o por un animal',
      numbness: 'Adormecimiento o pérdida de movimiento cerca de la herida',
    },
    advice: {
      emergency: 'Aplique presión firme y directa con un paño limpio y llame a emergencias ahora. Mantenga elevada la zona lesionada si es posible.',
      urgent_care: 'Es probable que necesite puntos o una revisión del tétanos: vaya a atención urgente hoy.',
      see_doctor: 'Limpie la herida y vigile si hay infección (más enrojecimiento, calor, hinchazón o pus). Consulte a un médico en un día o dos.',
      self_care: 'Limpie con agua, presione hasta que deje de sangrar y cubra con una venda limpia. Vigile si hay señales de infección.',
    },
  },
  allergic_reaction: {
    label: 'Reacción alérgica',
    flags: {
      throat_swelling: 'Hinchazón de la garganta o la lengua',
      trouble_breathing_allergy: 'Dificultad para respirar o silbidos al respirar',
      fainting: 'Sensación de desmayo o pérdida del conocimiento',
      whole_body: 'Ronchas o hinchazón que se extienden por todo el cuerpo',
      localized_swelling: 'Hinchazón importante en una zona',
    },
    advice: {
      emergency: 'Esto puede ser anafilaxia. Use ahora un autoinyector de epinefrina (EpiPen) si tiene uno, y luego llame a emergencias de inmediato, aunque los síntomas mejoren.',
      urgent_care: 'Busque atención urgente hoy, sobre todo si la hinchazón se está extendiendo.',
      see_doctor: 'Un antihistamínico puede ayudar. Consulte a un médico si no mejora en un día.',
      self_care: 'Un antihistamínico de venta libre puede ayudar con la picazón o las ronchas leves. Vigile de cerca cualquier empeoramiento.',
    },
  },
  high_fever: {
    label: 'Fiebre alta',
    flags: {
      stiff_neck: 'Rigidez en el cuello junto con la fiebre',
      confusion_fever: 'Confusión o somnolencia extrema',
      rash_fever: 'Sarpullido que no se borra al presionarlo',
      infant_fever: 'Bebé menor de 3 meses con cualquier fiebre',
      very_high: 'Temperatura superior a 103 °F (39.4 °C)',
      days: 'Fiebre que dura más de 3 días',
    },
    advice: {
      emergency: 'Estas señales combinadas necesitan evaluación de emergencia de inmediato: llame a emergencias o vaya a la sala de emergencias ahora.',
      urgent_care: 'Busque atención hoy, sobre todo si la fiebre es muy alta o prolongada.',
      see_doctor: 'Vigile y manténgase hidratado. Consulte a un médico si continúa pasado un día o dos.',
      self_care: 'Descanso, líquidos y un medicamento para bajar la fiebre, como el acetaminofén, pueden ayudar. Busque atención si aparecen síntomas nuevos.',
    },
  },
  abdominal_pain: {
    label: 'Dolor abdominal intenso',
    flags: {
      rigid: 'El abdomen está rígido, duro o extremadamente sensible al tacto',
      blood_stool: 'Sangre en el vómito o en las heces',
      pregnant_pain: 'Embarazada con dolor intenso o sangrado',
      persistent_vomit: 'No puede retener líquidos',
      localized_severe: 'Dolor intenso en un punto específico (p. ej., abajo a la derecha)',
    },
    advice: {
      emergency: 'Llame a emergencias o vaya a la sala de emergencias ahora: estas señales necesitan evaluación inmediata.',
      urgent_care: 'Busque atención urgente hoy.',
      see_doctor: 'Consulte a un médico en un día. Busque atención inmediata si el dolor empeora bruscamente.',
      self_care: 'Descanse y evite los alimentos sólidos por un tiempo. Busque atención si el dolor empeora o dura más de un día.',
    },
  },
  head_injury: {
    label: 'Golpe en la cabeza',
    flags: {
      lost_consciousness: 'Perdió el conocimiento, aunque haya sido por poco tiempo',
      repeated_vomit: 'Vómitos repetidos después del golpe',
      worsening_headache: 'Dolor de cabeza o confusión que empeoran',
      unequal_pupils: 'Las pupilas tienen tamaños diferentes',
      dizzy: 'Mareo o problemas de equilibrio desde el golpe',
    },
    advice: {
      emergency: 'Llame a emergencias o vaya a la sala de emergencias ahora: son señales de una posible lesión cerebral grave.',
      urgent_care: 'Busque evaluación urgente hoy, aunque los síntomas parezcan leves.',
      see_doctor: 'Vigile de cerca durante las próximas 24 horas. Consulte a un médico si algo cambia.',
      self_care: 'Descanse y vigile durante las próximas 24 horas. Busque atención de inmediato si aparecen síntomas nuevos.',
    },
  },
  seizure: {
    label: 'Convulsión',
    flags: {
      first_time: 'Es la primera convulsión de su vida',
      long_seizure: 'Duró más de 5 minutos',
      not_waking: 'No recupera el conocimiento entre convulsiones',
      injury_seizure: 'Se lesionó durante la convulsión',
    },
    advice: {
      emergency: 'Llame a emergencias ahora. Proteja a la persona de lesiones, gírela de lado, no la sujete ni le ponga nada en la boca.',
      urgent_care: 'Esto necesita evaluación hoy, incluso si la persona ya ha tenido convulsiones y esta siguió su patrón habitual.',
      see_doctor: 'Haga un seguimiento con un médico pronto.',
      self_care: 'Siga el plan de acción para convulsiones de la persona, si lo tiene.',
    },
  },
  mental_health_crisis: {
    label: 'Pensamientos de suicidio o de hacerse daño',
    flags: {
      immediate_plan: 'Tiene un plan específico o los medios en este momento',
      immediate_intent: 'Siente que podría actuar ahora mismo',
      frequent_thoughts: 'Tiene estos pensamientos con frecuencia',
    },
    advice: {
      emergency: 'Por favor, llame o envíe un texto al 988 (Línea de Prevención del Suicidio y Crisis) ahora mismo, o llame a emergencias. No tiene que pasar por esto a solas, y hay ayuda disponible de inmediato, las 24 horas.',
      urgent_care: 'Por favor, comuníquese ahora con el 988 (llamada o texto) para hablar con alguien de inmediato. Está disponible las 24 horas y es gratis.',
      see_doctor: 'Por favor, considere hablar pronto con un médico o consejero. El 988 también está disponible en cualquier momento en que quiera hablar, aunque no sienta que sea una emergencia.',
      self_care: 'El 988 (Línea de Prevención del Suicidio y Crisis) está disponible en cualquier momento, para cualquier nivel de angustia, no solo en emergencias. Pedir ayuda es una muestra de fortaleza, no un último recurso.',
    },
  },
};

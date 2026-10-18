import type { SymptomTextEs } from './symptomText';

export const PART2: Record<string, SymptomTextEs> = {
  minor_injury: {
    label: 'Corte, raspón o moretón leve',
    flags: {
      increasing_redness: 'El enrojecimiento o la hinchazón van en aumento',
      pus: 'Pus o mal olor en la herida',
    },
    advice: {
      emergency: 'Llame a emergencias si el sangrado no se detiene, la herida es profunda o siente que se desmaya.',
      urgent_care: 'Puede estar infectada: busque atención hoy.',
      see_doctor: 'Manténgala limpia y vigílela de cerca; consulte a un médico si no mejora en un par de días.',
      self_care: 'Limpie con agua, ponga una venda y manténgala limpia y seca. La mayoría de las heridas leves sanan solas en una o dos semanas.',
    },
  },
  cold_flu: {
    label: 'Síntomas de resfriado o gripe',
    flags: {
      flu_breathing: 'Dificultad grave para respirar',
      flu_chest_pain: 'Dolor u opresión en el pecho',
      flu_not_improving: 'No mejora después de una semana',
      flu_high_fever: 'Fiebre alta junto con otros síntomas',
    },
    advice: {
      emergency: 'Estas señales combinadas necesitan evaluación de emergencia ahora.',
      urgent_care: 'Busque atención hoy, sobre todo si tiene otras condiciones de salud.',
      see_doctor: 'Consulte a un médico si los síntomas continúan más de una semana.',
      self_care: 'Descanso, líquidos y alivio de síntomas con medicamentos de venta libre. La mayoría de los resfriados se resuelven en 7 a 10 días.',
    },
  },
  dehydration: {
    label: 'Vómito o diarrea',
    flags: {
      no_urination: 'No ha orinado en 8 horas o más',
      severe_dizzy: 'Mareo intenso o desmayo al ponerse de pie',
      blood_vomit: 'Sangre en el vómito o en las heces',
      cant_keep_down: 'No puede retener ningún líquido durante un día',
    },
    advice: {
      emergency: 'Estas son señales de deshidratación grave: busque atención de emergencia ahora.',
      urgent_care: 'Busque atención hoy para evitar que la deshidratación empeore.',
      see_doctor: 'Si esto continúa más de un día, consulte a un médico.',
      self_care: 'Tome sorbos pequeños de agua o de solución de rehidratación oral con frecuencia. Descanse y evite los alimentos sólidos hasta que se calme.',
    },
  },
  burns: {
    label: 'Quemadura',
    flags: {
      large_burn: 'Más grande que la palma de su mano',
      face_burn: 'En la cara, las manos o los genitales',
      charred: 'La piel se ve blanca, carbonizada o acartonada',
      blistering: 'Ampollas',
    },
    advice: {
      emergency: 'Llame a emergencias o vaya a la sala de emergencias ahora. No aplique hielo, mantequilla ni ungüentos.',
      urgent_care: 'Busque atención urgente hoy para recibir el tratamiento adecuado de la quemadura.',
      see_doctor: 'Manténgala limpia y vigile si hay infección. Consulte a un médico si empeora.',
      self_care: 'Enfríe la quemadura con agua corriente fresca (no helada) durante 10 a 20 minutos. Cubra sin apretar con una venda limpia que no se pegue.',
    },
  },
  panic_anxiety: {
    label: 'Ansiedad o ataque de pánico',
    flags: {
      pa_harm: 'Pensamientos de hacerse daño',
      chest_pain_panic: 'Dolor u opresión en el pecho junto con el ataque',
      cant_breathe_panic: 'Siente que de verdad no puede respirar',
      detached: 'Se siente completamente desconectado de la realidad',
      frequent_panic: 'Esto ocurre varias veces por semana',
      interfering: 'Interfiere con el trabajo, la escuela o la vida diaria',
    },
    advice: {
      emergency: 'El dolor en el pecho o la dificultad real para respirar deben revisarse de inmediato: llame a emergencias, porque los ataques de pánico y los problemas del corazón pueden sentirse parecidos y es más seguro confirmar de cuál se trata. Si tiene pensamientos de hacerse daño, llame o envíe un texto al 988 ahora mismo.',
      urgent_care: 'Por favor, hable pronto con un médico o consejero: los ataques de pánico frecuentes se pueden tratar muy bien, y no tiene que manejar esto a solas.',
      see_doctor: 'Considere hablar con un médico o terapeuta. Los ataques de pánico son comunes y responden bien al tratamiento.',
      self_care: 'Pruebe la respiración lenta: inhale contando 4, sostenga 4 y exhale contando 6. Los ataques de pánico son intensos pero no peligrosos, y por lo general llegan a su punto máximo en unos 10 minutos.',
    },
  },
  depression_signs: {
    label: 'Tristeza o desesperanza persistentes',
    flags: {
      dep_harm: 'Pensamientos de hacerse daño',
      cant_function: 'No puede levantarse de la cama ni funcionar en absoluto',
      hopeless_severe: 'Siente que las cosas nunca van a mejorar',
      weeks: 'Dura la mayor parte del día, casi todos los días, por 2 semanas o más',
      losing_interest: 'Perdió el interés en cosas que antes disfrutaba',
      sleep_appetite: 'Grandes cambios en el sueño o el apetito',
    },
    advice: {
      emergency: 'Si además tiene pensamientos de hacerse daño, por favor llame o envíe un texto al 988 ahora mismo, o llame a emergencias. Si no, de todos modos comuníquese con un médico o consejero lo antes posible: usted merece apoyo.',
      urgent_care: 'Por favor, comuníquese pronto con un médico o terapeuta. Lo que describe tiene tratamiento, y pedir ayuda es un paso valiente y valioso.',
      see_doctor: 'Considere hablar con un médico o consejero. El estado de ánimo bajo persistente es común y se trata muy bien.',
      self_care: 'Es normal tener un estado de ánimo bajo que va y viene. Si empieza a durar la mayoría de los días por dos semanas o más, considere hablar con alguien.',
    },
  },
  burnout_stress: {
    label: 'Estrés abrumador o agotamiento',
    flags: {
      bo_harm: 'Pensamientos de hacerse daño',
      physical_symptoms: 'Le causa síntomas físicos (dolores de cabeza, opresión en el pecho, problemas estomacales)',
      cant_cope: 'Siente que no puede con las responsabilidades diarias',
    },
    advice: {
      emergency: 'Por favor, llame o envíe un texto al 988 ahora mismo, o llame a emergencias. No tiene que cargar con esto a solas, y hay ayuda disponible a cualquier hora.',
      urgent_care: 'Por favor, hable con un médico: el estrés continuo que afecta su cuerpo y su vida diaria merece atención con apoyo.',
      see_doctor: 'Considere hablar con un médico o consejero sobre estrategias para manejar esto.',
      self_care: 'Trate de proteger primero las necesidades básicas: sueño, comida, movimiento y descansos. Los pasos pequeños y constantes ayudan más que los grandes durante el estrés intenso.',
    },
  },
  sleep_problems: {
    label: 'Problemas para dormir',
    flags: {
      sl_harm: 'Pensamientos de hacerse daño',
      unsafe_drowsy: 'Tan agotado que sería inseguro manejar o trabajar',
      weeks_sleep: 'Dificultad para dormir la mayoría de las noches durante 2 semanas o más',
    },
    advice: {
      emergency: 'Por favor, no maneje ni opere maquinaria. Si se siente inseguro en este momento, llame a emergencias. Si tiene pensamientos de hacerse daño, llame o envíe un texto al 988 ahora mismo.',
      urgent_care: 'Por favor, evite manejar u operar maquinaria, y consulte pronto a un médico: la falta de sueño grave y continua afecta la seguridad y la salud.',
      see_doctor: 'Vale la pena hablar con un médico sobre los problemas de sueño persistentes: con frecuencia se tratan muy bien.',
      self_care: 'Mantenga un horario constante para dormir y despertar, limite las pantallas antes de acostarse y evite la cafeína al final del día. Si continúa más de dos semanas, considere ver a un médico.',
    },
  },
  grief_loss: {
    label: 'Duelo o pérdida',
    flags: {
      gr_harm: 'Pensamientos de hacerse daño',
      grief_function: 'Le cuesta funcionar meses después de la pérdida',
      grief_isolating: 'Se aleja por completo de los demás',
    },
    advice: {
      emergency: 'Por favor, llame o envíe un texto al 988 ahora mismo, o llame a emergencias. El duelo puede sentirse insoportable, y no tiene que pasar por esto a solas.',
      urgent_care: 'Un consejero o terapeuta de duelo puede ayudar: el duelo intenso y continuo que interrumpe la vida diaria merece apoyo, y ese apoyo de verdad ayuda.',
      see_doctor: 'Considere un grupo de apoyo para el duelo o un consejero: no tiene que pasar por esto a solas.',
      self_care: 'El duelo no tiene un plazo fijo. Tenga paciencia consigo mismo, apóyese en las personas de su confianza y considere un grupo de apoyo si se siente aislado.',
    },
  },
  substance_concern: {
    label: 'Preocupación por el consumo de sustancias',
    flags: {
      sub_harm: 'Pensamientos de hacerse daño',
      withdrawal_severe: 'Síntomas graves de abstinencia (temblores, convulsiones, confusión)',
      overdose_signs: 'Señales de sobredosis (no responde, respira muy lento o no respira)',
      cant_stop: 'No puede reducir el consumo aunque quiera',
      affecting_life: 'Afecta el trabajo, las relaciones o la salud',
    },
    advice: {
      emergency: 'Llame a emergencias de inmediato. Si tiene naloxona, úsela ante una sospecha de sobredosis de opioides y quédese con la persona. Si tiene pensamientos de hacerse daño, llame o envíe un texto al 988 ahora mismo.',
      urgent_care: 'Por favor, comuníquese pronto con un médico o con una línea de ayuda para el consumo de sustancias: la abstinencia puede ser médicamente riesgosa si se maneja a solas.',
      see_doctor: 'Considere hablar con un médico: puede conectarle con apoyo sin juzgarle.',
      self_care: 'Hay apoyo gratuito y confidencial en la Línea Nacional de Ayuda de SAMHSA (1-800-662-4357), disponible las 24 horas, todos los días.',
    },
  },
};

/** Spanish text for first aid guides, keyed by the same ids as firstAid.ts. */

export interface FirstAidTextEs {
  title: string;
  when: string;
  steps: string[];
  note?: string;
}

export const FIRST_AID_ES: Record<string, FirstAidTextEs> = {
  cpr: {
    title: 'RCP solo con las manos (adulto)',
    when: 'Alguien se ha desplomado y no responde o no respira con normalidad.',
    steps: [
      'Asegúrese de que el lugar sea seguro. Toque a la persona en los hombros y grite.',
      'Llame a emergencias, o señale a alguien y dígale que llame y que traiga un desfibrilador (DEA) si hay uno.',
      'Coloque el talón de una mano en el centro del pecho y la otra mano encima.',
      'Presione fuerte y rápido: al menos 2 pulgadas (5 cm) de profundidad, de 100 a 120 compresiones por minuto. Deje que el pecho vuelva a subir después de cada compresión.',
      'No se detenga hasta que llegue la ayuda, la persona empiece a moverse o haya un DEA listo. Si consigue un DEA, enciéndalo y siga sus instrucciones habladas.',
    ],
    note: 'Un curso certificado de RCP es la mejor preparación. Los bebés y los niños pequeños necesitan pasos diferentes.',
  },
  choking: {
    title: 'Atragantamiento (adulto o niño mayor de 1 año)',
    when: 'Alguien no puede toser, hablar ni respirar, y puede estar agarrándose la garganta.',
    steps: [
      'Pregunte: "¿Se está atragantando?" Si puede toser o hablar, anímela a seguir tosiendo.',
      'Si no puede respirar, pida a alguien que llame a emergencias.',
      'Inclínela hacia adelante. Dé 5 golpes firmes en la espalda, entre los omóplatos, con el talón de la mano.',
      'Luego dé 5 compresiones abdominales rápidas: haga un puño justo encima del ombligo, sujételo con la otra mano y tire hacia adentro y hacia arriba.',
      'Alterne 5 golpes en la espalda y 5 compresiones hasta que salga el objeto o la persona quede inconsciente. Si queda inconsciente, comience la RCP.',
    ],
    note: 'Si es un bebé menor de 1 año, llame a emergencias de inmediato y use los pasos para bebés de un curso certificado.',
  },
  bleeding: {
    title: 'Sangrado grave',
    when: 'La sangre sale a chorros, empapa la tela o no se detiene.',
    steps: [
      'Llame a emergencias.',
      'Presione firme y directamente sobre la herida con un paño limpio. Use ambas manos y apoye su peso.',
      'No levante el paño para revisar. Si la sangre lo empapa, ponga más tela encima y siga presionando.',
      'Siga presionando hasta que llegue la ayuda, lo cual puede tardar varios minutos.',
      'Si el sangrado de un brazo o una pierna pone en peligro la vida y no se detiene, y usted tiene un torniquete y sabe usarlo, colóquelo unas pocas pulgadas por encima de la herida.',
    ],
  },
  stroke: {
    title: 'Derrame cerebral: BE FAST',
    when: 'Debilidad repentina, cara caída, dificultad para hablar, o pérdida del equilibrio o de la vista.',
    steps: [
      'Equilibrio (Balance): ¿pérdida repentina del equilibrio o la coordinación?',
      'Ojos (Eyes): ¿pérdida repentina de la visión o visión doble?',
      'Cara (Face): ¿se cae un lado de la cara cuando sonríe?',
      'Brazos (Arms): ¿un brazo se va hacia abajo cuando levanta los dos?',
      'Habla (Speech): ¿habla arrastrando las palabras, de forma extraña o difícil de entender?',
      'Tiempo (Time): si ve cualquiera de estas señales, llame a emergencias de inmediato y anote a qué hora empezaron los síntomas. No maneje usted mismo. No dé comida, bebida ni aspirina.',
    ],
  },
  seizure: {
    title: 'Convulsión',
    when: 'Alguien está temblando, rígido o sin responder y no puede controlarlo.',
    steps: [
      'Quédese con la persona y anote la hora en que empezó.',
      'Aparte los objetos duros o filosos. Proteja su cabeza con algo blando.',
      'No la sujete. No le ponga nada en la boca.',
      'Cuando termine el temblor, gírela suavemente de lado.',
      'Llame a emergencias si dura más de 5 minutos, si es su primera convulsión, si está lesionada o embarazada, si tiene dificultad para respirar después, o si no despierta.',
    ],
  },
  anaphylaxis: {
    title: 'Reacción alérgica grave',
    when: 'Hinchazón de la cara o la garganta, dificultad para respirar, ronchas por todo el cuerpo o desmayo después de una picadura, comida o medicamento.',
    steps: [
      'Use de inmediato un autoinyector de epinefrina si la persona tiene uno. Presiónelo firmemente en la parte externa del muslo. Funciona a través de la ropa.',
      'Llame a emergencias, aunque la persona empiece a sentirse mejor.',
      'Haga que se acueste con las piernas elevadas. Si le cuesta respirar, déjela sentarse.',
      'Puede necesitar una segunda dosis. Siga las instrucciones del dispositivo y del operador de emergencias.',
      'Quédese con ella hasta que llegue la ayuda.',
    ],
  },
  overdose: {
    title: 'Sobredosis de opioides',
    when: 'Alguien no responde, respira muy lento o no respira, o tiene los labios azules o grises.',
    steps: [
      'Llame a emergencias.',
      'Si tiene naloxona en aerosol nasal, adminístrela: incline la cabeza hacia atrás y rocíe en una fosa nasal.',
      'Si no respira y usted tiene capacitación, dé respiración de rescate o comience la RCP.',
      'Si empieza a respirar, gire a la persona de lado.',
      'Quédese con la persona. Si no responde después de 2 a 3 minutos y tiene otra dosis, adminístrela.',
    ],
    note: 'La naloxona es segura aunque no esté seguro de que sea una sobredosis de opioides.',
  },
  burns: {
    title: 'Quemaduras',
    when: 'La piel se ha quemado por calor, líquido caliente o fuego.',
    steps: [
      'Aléjese de la fuente de calor. Quite los anillos u objetos apretados cerca de la quemadura antes de que se hinche.',
      'Enfríe la quemadura con agua corriente fresca (no helada) durante 10 a 20 minutos.',
      'No use hielo, mantequilla ni ungüentos.',
      'Cubra sin apretar con una venda limpia que no se pegue.',
      'Busque atención de emergencia si la quemadura es más grande que la palma de la mano, está en la cara, las manos o los genitales, o si la piel se ve blanca, carbonizada o acartonada.',
    ],
  },
};

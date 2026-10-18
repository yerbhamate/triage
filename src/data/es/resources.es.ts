/** Spanish text for help lines, keyed by the same ids as resources.ts. Numbers and links stay in resources.ts. */

export interface ResourceTextEs {
  name: string;
  blurb: string;
  hours: string;
  textLabel?: string;
  urlNote?: string;
}

export const RESOURCES_ES: Record<string, ResourceTextEs> = {
  '988': {
    name: '988 Línea de Prevención del Suicidio y Crisis',
    blurb: 'Hable con un consejero capacitado sobre pensamientos suicidas, angustia emocional, o una crisis de salud mental o de uso de sustancias. También puede llamar o enviar un texto si le preocupa otra persona.',
    hours: 'Gratis, 24/7',
    textLabel: 'Envíe un texto al 988',
  },
  crisis_text: {
    name: 'Crisis Text Line (línea de texto para crisis)',
    blurb: '¿Prefiere escribir en vez de hablar? Envíe un texto a un consejero de crisis capacitado, en vivo, sobre estrés, ansiedad, duelo, soledad, abuso y más.',
    hours: 'Gratis, 24/7',
    textLabel: 'Envíe HOME por texto al 741741',
  },
  nami: {
    name: 'Línea de ayuda de NAMI',
    blurb: 'Apoyo de compañeros, información y referencias locales sobre condiciones de salud mental, para usted o alguien que le importa.',
    hours: 'Gratis, lun.–vie., 10 a. m.–10 p. m. (hora del Este)',
    textLabel: 'Envíe "helpline" por texto al 62640',
  },
  samhsa: {
    name: 'Línea Nacional de Ayuda de SAMHSA',
    blurb: 'Referencias a tratamiento e información sobre salud mental y uso de sustancias. En inglés y español.',
    hours: 'Gratis, 24 horas, los 365 días',
  },
  naed: {
    name: 'Línea de ayuda de la National Alliance for Eating Disorders',
    blurb: 'Apoyo y referencias, atendidos por terapeutas, para trastornos de la conducta alimentaria, para usted o un ser querido.',
    hours: 'Gratis, lun.–vie., 9 a. m.–7 p. m. (hora del Este)',
  },
  ndvh: {
    name: 'Línea Nacional de Violencia Doméstica',
    blurb: 'Apoyo y planificación de seguridad para cualquier persona afectada por abuso en una relación. Si cree que su teléfono o su uso de internet podría estar vigilado, llame en lugar de navegar.',
    hours: 'Gratis, 24/7',
    textLabel: 'Envíe START por texto al 88788',
  },
  rainn: {
    name: 'Línea Nacional de Agresión Sexual de RAINN',
    blurb: 'Apoyo después de una agresión sexual y ayuda para encontrar servicios locales. En inglés y español.',
    hours: 'Gratis, 24/7',
  },
  poison: {
    name: 'Línea de Ayuda de Envenenamiento (Poison Help)',
    blurb: '¿Tragó algo dañino, o tomó demasiado de un medicamento? Enfermeras y farmacéuticos le dirán qué hacer. Llame aunque la persona parezca estar bien.',
    hours: 'Gratis, 24/7',
  },
  maternal: {
    name: 'Línea Nacional de Salud Mental Materna',
    blurb: 'Apoyo durante el embarazo y después del parto para tristeza, ansiedad y sensación de agobio. En inglés y español.',
    hours: 'Gratis, 24/7, llamada o texto',
    textLabel: 'Envíe un texto al 1-833-852-6262',
  },
  eldercare: {
    name: 'Localizador de Cuidado para Adultos Mayores (Eldercare Locator)',
    blurb: 'Conecta a adultos mayores, familias y cuidadores con servicios locales como comidas, cuidado en el hogar, transporte y cuidado de relevo (un descanso para los cuidadores).',
    hours: 'Gratis, especialistas por teléfono de lunes a viernes',
  },
  alz: {
    name: 'Línea de ayuda 24/7 de la Asociación de Alzheimer',
    blurb: 'Apoyo e información para personas que viven con pérdida de memoria o demencia, y para quienes las cuidan. El personal puede ayudarle a considerar decisiones y orientarle hacia ayuda local.',
    hours: 'Gratis, 24/7, los 365 días',
  },
  '211': {
    name: '211 Ayuda comunitaria',
    blurb: 'Marque 211 para encontrar ayuda local con comida, vivienda, servicios públicos, clínicas y más. Enviar su código postal por texto al 898211 funciona en muchas áreas.',
    hours: 'Gratis, el horario varía según el área',
    textLabel: 'Envíe su código postal por texto al 898211',
  },
  hrsa: {
    name: 'Centros de salud comunitarios de bajo costo',
    blurb: 'Centros de salud que cobran según lo que usted pueda pagar, con o sin seguro. Busque por código postal. (Requiere internet.)',
    hours: 'Encuentre uno cerca de usted',
  },
};

export const GROUP_TITLES_ES: Record<string, string> = {
  crisis: 'Crisis y apoyo emocional',
  substance: 'Uso de sustancias y trastornos alimentarios',
  safety: 'Seguridad y abuso',
  poison: 'Envenenamiento y sobredosis',
  parents: 'Embarazo y nuevos padres',
  caregivers: 'Cuidadores y adultos mayores',
  care: 'Atención de bajo costo y ayuda comunitaria',
};

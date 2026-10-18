/** Spanish text for the medicine guide, keyed by the same ids as medicines.ts. Icons stay in medicines.ts. */

export interface MedicineTextEs {
  name: string;
  usedFor: string;
  goodToKnow: string;
}

export const MEDICINES_ES: Record<string, MedicineTextEs> = {
  acetaminophen: {
    name: 'Acetaminofén (Tylenol)',
    usedFor: 'Dolor y fiebre.',
    goodToKnow: 'Muchos productos para el resfriado y la gripe también lo contienen, así que revise las etiquetas para no duplicar la dosis. Demasiado puede dañar el hígado. Siga las instrucciones del envase, y en bebés y niños pequeños pregunte a un médico o farmacéutico cuánto darles.',
  },
  ibuprofen: {
    name: 'Ibuprofeno (Advil, Motrin)',
    usedFor: 'Dolor, fiebre e hinchazón.',
    goodToKnow: 'Tómelo con comida. No es adecuado para todos. Pregunte primero a un farmacéutico si tiene problemas de los riñones o del estómago, toma anticoagulantes o está embarazada. No se lo dé a bebés menores de 6 meses.',
  },
  aspirin: {
    name: 'Aspirina',
    usedFor: 'Dolor de pecho que podría ser un infarto, después de haber llamado a emergencias.',
    goodToKnow: 'Mastíquela, a menos que sea alérgico o le hayan dicho que no la tome. No dé aspirina a niños ni adolescentes.',
  },
  antihistamine: {
    name: 'Antihistamínico (cetirizina, loratadina, difenhidramina)',
    usedFor: 'Síntomas leves de alergia, picazón y ronchas.',
    goodToKnow: 'Algunos causan somnolencia. Estos no tratan una reacción alérgica grave. Esa necesita epinefrina y atención de emergencia.',
  },
  ors: {
    name: 'Solución de rehidratación oral (Pedialyte, sobres de SRO)',
    usedFor: 'Deshidratación por vómito, diarrea o calor.',
    goodToKnow: 'Tome sorbos pequeños con frecuencia en lugar de mucho de una vez. Busque atención si no puede retener líquidos.',
  },
  epinephrine: {
    name: 'Autoinyector de epinefrina (EpiPen)',
    usedFor: 'Reacciones alérgicas graves (anafilaxia).',
    goodToKnow: 'Úselo de inmediato y luego llame a emergencias aunque se sienta mejor, porque los síntomas pueden volver. Siga los dibujos del dispositivo.',
  },
  naloxone: {
    name: 'Naloxona en aerosol nasal (Narcan)',
    usedFor: 'Revertir una sobredosis de opioides.',
    goodToKnow: 'Cualquier persona puede darla. Llame a emergencias, adminístrela y quédese con la persona, porque su efecto puede desaparecer. Se vende sin receta en EE. UU., y muchos programas comunitarios la entregan gratis.',
  },
  inhaler: {
    name: 'Inhalador de rescate (albuterol)',
    usedFor: 'Brotes de asma: silbidos al respirar y opresión en el pecho.',
    goodToKnow: 'Solo con receta. Úselo como le indicó su médico. Si no ayuda, o le cuesta hablar, llame a emergencias.',
  },
  glucose: {
    name: 'Tabletas o gel de glucosa',
    usedFor: 'Azúcar baja en la sangre en personas con diabetes.',
    goodToKnow: 'Actúa rápido. Vuelva a medir el azúcar después de unos 15 minutos. Si la persona no puede tragar con seguridad, no le dé nada por la boca y llame a emergencias.',
  },
  bandage: {
    name: 'Gasa estéril y vendas',
    usedFor: 'Cubrir heridas y presionar un sangrado.',
    goodToKnow: 'Presione firme y siga presionando. Si la sangre empapa la gasa, ponga más capas encima en lugar de quitar la primera.',
  },
  thermometer: {
    name: 'Termómetro',
    usedFor: 'Revisar si hay fiebre.',
    goodToKnow: 'Una temperatura de 100.4 °F (38 °C) o más generalmente se considera fiebre. En un bebé menor de 3 meses, cualquier fiebre necesita atención médica de inmediato.',
  },
  coldpack: {
    name: 'Compresa fría',
    usedFor: 'Torceduras, moretones e hinchazón.',
    goodToKnow: 'Envuélvala en un paño, nunca ponga hielo directamente sobre la piel, y úsela unos 15 a 20 minutos a la vez.',
  },
  antacid: {
    name: 'Antiácido (Tums, Rolaids)',
    usedFor: 'Alivio a corto plazo de la acidez y el malestar estomacal.',
    goodToKnow: 'Actúa en minutos pero no dura. Si lo necesita más de dos veces por semana, consulte a un médico. Siga las instrucciones del envase.',
  },
  saline: {
    name: 'Aerosol o enjuague nasal con solución salina',
    usedFor: 'Nariz tapada por resfriados y alergias.',
    goodToKnow: 'Es suave y seguro de usar con frecuencia. Si usa una botella de enjuague, use solo agua destilada, estéril o hervida y enfriada, nunca agua del grifo sin tratar.',
  },
  hydrocortisone: {
    name: 'Crema de hidrocortisona',
    usedFor: 'Picazón de la piel por picaduras de insectos, sarpullidos y eccema.',
    goodToKnow: 'Use una capa delgada solo por unos días, como indica la etiqueta. No la use sobre piel abierta ni en la cara a menos que un médico lo indique.',
  },
  barrier: {
    name: 'Crema de óxido de zinc para el pañal',
    usedFor: 'Proteger la piel del bebé de la dermatitis del pañal.',
    goodToKnow: 'Aplique una capa gruesa en cada cambio de pañal. Deje que la piel se seque al aire primero si puede.',
  },
};

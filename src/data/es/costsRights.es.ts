/** Spanish text for Costs & Your Rights, keyed by the same ids as costsRights.ts. */

export interface CostSectionEs {
  title: string;
  points: string[];
}

export const COST_SECTIONS_ES: Record<string, CostSectionEs> = {
  er_rights: {
    title: 'Las salas de emergencia deben atenderle',
    points: [
      'En un hospital con departamento de emergencias que acepta Medicare (la mayoría lo hace), la ley federal exige un examen médico de evaluación y tratamiento para estabilizar una emergencia, sin importar su seguro ni su capacidad de pago.',
      'Esto no significa que la atención sea gratis. Es posible que aún reciba una factura, y las secciones siguientes explican cómo reducirla.',
      'Si esta app muestra señales de alarma, no evite la atención de emergencia por el costo.',
    ],
  },
  financial_help: {
    title: 'Pida ayuda financiera (atención de beneficencia)',
    points: [
      'Los hospitales sin fines de lucro están obligados a tener una política escrita de ayuda financiera. Explica quién califica para atención gratuita o a costo reducido y cómo solicitarla.',
      'Pida a la oficina de facturación la política y la solicitud. Obtener la política es gratis. Los límites de ingresos cambian de un hospital a otro.',
      'Puede solicitarla después de recibir una factura. A menudo vale la pena solicitarla aunque la factura ya esté en cobranza.',
      'Los hospitales con fines de lucro también pueden tener programas de ayuda. Pregunte.',
    ],
  },
  surprise_bills: {
    title: 'Facturas sorpresa',
    points: [
      'Si tiene seguro médico, la ley No Surprises Act (en vigor desde 2022) generalmente le protege de facturas sorpresa de proveedores fuera de la red por atención de emergencia. Solo se le puede cobrar su parte normal dentro de la red.',
      'Nunca está obligado a renunciar a esta protección. Tenga cuidado con firmar cualquier formulario que se lo pida.',
      'Si una factura parece incorrecta, llame tanto a su compañía de seguros como al hospital y pida que la revisen.',
    ],
  },
  before_you_pay: {
    title: 'Antes de pagar una factura médica',
    points: [
      'Pida una factura detallada, una lista de cada cargo. Hay errores, así que revísela.',
      'No pague de inmediato. Primero pregunte si podría aplicar la ayuda financiera.',
      'Si no puede pagar todo, pida un plan de pagos. Muchos hospitales los ofrecen. Pregunte si tiene algún interés.',
      'Anote con quién habló y cuándo.',
    ],
  },
  lower_cost: {
    title: 'Lugares de menor costo para empezar',
    points: [
      'Los centros de salud comunitarios cobran según lo que usted pueda pagar, con o sin seguro. Busque por código postal en findahealthcenter.hrsa.gov (requiere internet), o llame al 211.',
      'Muchos planes de seguro incluyen una línea gratuita de consejos de enfermería. Busque el número en su tarjeta del seguro.',
      'Para problemas que no son emergencias, la atención urgente (urgent care) y la telemedicina suelen costar menos que una visita a la sala de emergencias.',
      'Los farmacéuticos pueden responder preguntas sobre medicinas sin costo.',
    ],
  },
  coverage: {
    title: 'Cómo obtener cobertura',
    points: [
      'Si sus ingresos son bajos, Medicaid o CHIP podrían cubrirle a usted o a sus hijos. La oficina estatal de Medicaid o el 211 pueden decírselo.',
      'Perder un empleo u otra cobertura puede permitirle inscribirse en un plan fuera del período de inscripción habitual. Pregunte en healthcare.gov o llame al 211.',
    ],
  },
};

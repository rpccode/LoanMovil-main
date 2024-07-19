import { Estado, TipoPersona } from "../Configs/interfaces";

const initialEstados: Estado[] = [
    {
        idEstado: 1,
        nombre: 'Activo',
        descripcion: 'Estado activo',
        abreviatura: 'A',
        sistema: false,
        prestamo: false,
        pago: false
    },
    {
        idEstado: 2,
        nombre: 'Inactivo',
        descripcion: 'Estado inactivo',
        abreviatura: 'I',
        sistema: false,
        prestamo: false,
        pago: false
    },
    {
        idEstado: 3,
        nombre: 'Pendiente',
        descripcion: 'Préstamo pendiente de aprobación',
        abreviatura: 'P',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 4,
        nombre: 'Aprobado',
        descripcion: 'Préstamo aprobado',
        abreviatura: 'AP',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 5,
        nombre: 'Rechazado',
        descripcion: 'Préstamo rechazado',
        abreviatura: 'R',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 6,
        nombre: 'Pagado',
        descripcion: 'Cuota o pago completado',
        abreviatura: 'PG',
        sistema: true,
        prestamo: false,
        pago: true
    },
    {
        idEstado: 7,
        nombre: 'Vencido',
        descripcion: 'Cuota o pago vencido',
        abreviatura: 'V',
        sistema: true,
        prestamo: false,
        pago: true
    },
    {
        idEstado: 8,
        nombre: 'En mora',
        descripcion: 'Préstamo en mora',
        abreviatura: 'M',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 9,
        nombre: 'Cancelado',
        descripcion: 'Préstamo cancelado',
        abreviatura: 'C',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 10,
        nombre: 'En proceso',
        descripcion: 'Préstamo en proceso de evaluación',
        abreviatura: 'EP',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 11,
        nombre: 'Reestructurado',
        descripcion: 'Préstamo reestructurado',
        abreviatura: 'RS',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 12,
        nombre: 'Parcialmente pagado',
        descripcion: 'Cuota o pago parcialmente completado',
        abreviatura: 'PP',
        sistema: true,
        prestamo: false,
        pago: true
    },
    {
        idEstado: 13,
        nombre: 'Amortizado',
        descripcion: 'Préstamo amortizado',
        abreviatura: 'AM',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 14,
        nombre: 'Desembolsado',
        descripcion: 'Préstamo desembolsado',
        abreviatura: 'D',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 15,
        nombre: 'Refinanciado',
        descripcion: 'Préstamo refinanciado',
        abreviatura: 'RF',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 16,
        nombre: 'En revisión',
        descripcion: 'Préstamo en revisión',
        abreviatura: 'ER',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 17,
        nombre: 'Incobrable',
        descripcion: 'Préstamo declarado incobrable',
        abreviatura: 'IN',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 18,
        nombre: 'Suspensión temporal',
        descripcion: 'Préstamo en suspensión temporal',
        abreviatura: 'ST',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 19,
        nombre: 'En litigio',
        descripcion: 'Préstamo en proceso legal',
        abreviatura: 'EL',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 20,
        nombre: 'Descuento aplicado',
        descripcion: 'Descuento aplicado al préstamo',
        abreviatura: 'DA',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 21,
        nombre: 'Consolidado',
        descripcion: 'Préstamo consolidado',
        abreviatura: 'CO',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 22,
        nombre: 'Observación',
        descripcion: 'Préstamo con observaciones',
        abreviatura: 'OB',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 23,
        nombre: 'Suspensión definitiva',
        descripcion: 'Préstamo en suspensión definitiva',
        abreviatura: 'SD',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 24,
        nombre: 'Cobro judicial',
        descripcion: 'Préstamo en proceso de cobro judicial',
        abreviatura: 'CJ',
        sistema: true,
        prestamo: true,
        pago: false
    },
    {
        idEstado: 25,
        nombre: 'Reactivado',
        descripcion: 'Estado reactivado',
        abreviatura: 'RE',
        sistema: true,
        prestamo: false,
        pago: false
    },
    {
        idEstado: 26,
        nombre: 'Anulado',
        descripcion: 'Estado anulado',
        abreviatura: 'AN',
        sistema: true,
        prestamo: false,
        pago: false
    },
    {
        idEstado: 27,
        nombre: 'Procesado',
        descripcion: 'Estado procesado',
        abreviatura: 'PR',
        sistema: true,
        prestamo: false,
        pago: true
    },
    {
        idEstado: 28,
        nombre: 'Finalizado',
        descripcion: 'Estado finalizado',
        abreviatura: 'FI',
        sistema: true,
        prestamo: true,
        pago: true
    },
    {
        idEstado: 29,
        nombre: 'Pagado parcialmente',
        descripcion: 'Pago parcial realizado',
        abreviatura: 'PPG',
        sistema: true,
        prestamo: false,
        pago: true
    },
      {
          idEstado: 30,
          nombre: 'Pendiente de desembolso',
          descripcion: 'Préstamo aprobado pendiente de desembolso',
          abreviatura: 'PD',
          sistema: true,
          prestamo: true,
          pago: false
      },
      {
          idEstado: 31,
          nombre: 'Pendiente de aprobación',
          descripcion: 'Préstamo en espera de aprobación final',
          abreviatura: 'PA',
          sistema: true,
          prestamo: true,
          pago: false
      },
    {
        idEstado: 32,
        nombre: 'En auditoría',
        descripcion: 'Préstamo en proceso de auditoría interna',
        abreviatura: 'EA',
        sistema: true,
        prestamo: true,
        pago: false
    },
      {
          idEstado: 33,
          nombre: 'Reclamo',
          descripcion: 'Préstamo con reclamo en curso',
          abreviatura: 'RC',
          sistema: true,
          prestamo: true,
          pago: false
      },
      {
          idEstado: 34,
          nombre: 'Ajustado',
          descripcion: 'Préstamo ajustado por cambios en condiciones',
          abreviatura: 'AJ',
          sistema: true,
          prestamo: true,
          pago: false
      },
      {
          idEstado: 35,
          nombre: 'En análisis de riesgo',
          descripcion: 'Préstamo en análisis de riesgo crediticio',
          abreviatura: 'AR',
          sistema: true,
          prestamo: true,
          pago: false
      },
      {
          idEstado: 36,
          nombre: 'En seguimiento',
          descripcion: 'Préstamo en seguimiento por el equipo de crédito',
          abreviatura: 'ES',
          sistema: true,
          prestamo: true,
          pago: false
      },
      {
          idEstado: 37,
          nombre: 'Reprogramado',
          descripcion: 'Préstamo con fechas de pago reprogramadas',
          abreviatura: 'RP',
          sistema: true,
          prestamo: true,
          pago: false
      },  {
          idEstado: 38,
          nombre: 'Documentación incompleta',
          descripcion: 'Préstamo con documentación incompleta',
          abreviatura: 'DI',
          sistema: true,
          prestamo: true,
          pago: false
      },
      {
          idEstado: 39,
          nombre: 'A la espera de firma',
          descripcion: 'Préstamo a la espera de firma del contrato',
          abreviatura: 'AF',
          sistema: true,
          prestamo: true,
          pago: false
      },
];

const tiposDePersona: TipoPersona[] = [
  {
    idTipoPersona: 1,
    nombre: 'Cliente',
    descripcion: 'Cliente de la empresa',
    estado: 1,
  },
  {
    idTipoPersona: 2,
    nombre: 'Proveedor',
    descripcion: 'Proveedor de la empresa',
    estado: 1,
  },
  // Agrega más tipos de persona según sea necesario
];

export {
  initialEstados,
  tiposDePersona
};

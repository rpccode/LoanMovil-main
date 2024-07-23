// Interface para el esquema de la base de datos para Empresa
interface Empresa {
  idEmpresa: string;
  nombre_comercial: string;
  razon_social: string;
  tipo_documento: number;
  numero_doc: string;
  telefonos: string;
  direccion?: string;
  email: string;
  logotipo?: string;
  fecha_registro: Date;
  estado: number;
}

// Interface para el esquema de la base de datos para Estado
interface Estado {
  idEstado: number;
  nombre: string;
  descripcion?: string;
  abreviatura?: string;
  sistema: boolean;
  prestamo: boolean;
  pago: boolean;
}

// Interface para el esquema de la base de datos para Persona
interface Persona {
  idPersona: string;
  idEmpresa: string;
  idTipoPersona: number;
  idTipoDocumento: number;
  num_documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: number;
}

// Interface para el esquema de la base de datos para Prestamo
interface Prestamo {
  idPrestamo: string;
  idEmpresa: string;
  idPersona: string;
  num_prestamo: string;
  monto_solicitado: number;
  monto_aprobado: number;
  tasa_interes: number;
  tasa_mora: number;
  tipo_prestamo: number;
  cant_coutas: number;
  fecha_solicitud: string;
  fecha_aprobacion: string;
  fecha_inicioPrestamo: string;
  fecha_finPrestamo: string;
  estado: number;
}

export interface IDetallePrestamo {
  idDetallePrestamo: number;
  idPrestamo: string;
  num_cuota: number;
  mont_capital: number;
  mont_interes: number;
  mont_couta: number;
  fecha_couta: String;
  fecha_venc: String;
  estado: number;
}
export interface loanWhitDues {
  loan: Prestamo;
  dues: IDetallePrestamo[];
}
[];

// Interface para el esquema de la base de datos para TipoPersona
interface TipoPersona {
  idTipoPersona: number;
  nombre: string;
  descripcion?: string;
  estado: number;
}


type loanInfo = {
  person: Persona,
  loan: Prestamo,
  dues: IDetallePrestamo,
  diasAtraso?: number;

}
interface DetallePago {
  idDetalle_pago: number;
  idCouta: number;
  idTipoPago: number;
  fecha_pago: Date;
  estado: number;
  idPrestamo: string;
  mont_pagado: number;
  idUsuario: string;
  mont_cuota: number;
  idPago?: string;
}

interface Pago {
  idPago: number;
  idEmpresa: string;
  idPrestamo: string;
  idUsuario: string;
  num_pagos: number;
  total_capital: number;
  total_interes: number;
  mont_prestamo: number;
  balance: number;
  estado: number;
}




export enum tabPago {
   'today', 'Para Hoy',
  'overdue', 'Vencidas',
  'unpaid',  'No Pagadas',


}

export type {Empresa, Estado, Persona, Prestamo, TipoPersona, loanInfo,Pago,DetallePago};

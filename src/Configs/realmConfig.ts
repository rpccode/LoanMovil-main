import Realm from 'realm';
import { initialEstados, tiposDePersona } from '../Api/Data';

// Define el esquema de la base de datos para Empresa
export const EmpresaSchema: Realm.ObjectSchema = {
  name: 'Empresa',
  primaryKey: 'idEmpresa',
  properties: {
    idEmpresa: 'string',
    nombre_comercial: 'string',
    razon_social: 'string',
    tipo_documento: 'int',
    numero_doc: 'string',
    telefonos: 'string',
    direccion: 'string?',
    email: 'string',
    logotipo: 'string?',
    fecha_registro: 'date',
    estado: 'int',
  },
};

// Define el esquema de la base de datos para Estado
export const EstadoSchema: Realm.ObjectSchema = {
  name: 'Estado',
  primaryKey: 'idEstado',
  properties: {
    idEstado: 'int',
    nombre: 'string',
    descripcion: 'string?',
    abreviatura: 'string?',
    sistema: 'bool',
    prestamo: 'bool',
    pago: 'bool',


  },
};

// Define el esquema de la base de datos para Persona
export const PersonaSchema: Realm.ObjectSchema = {
  name: 'Persona',
  primaryKey: 'idPersona',
  properties: {
    idPersona: 'string',
    idEmpresa: 'string',
    idTipoPersona: 'int',
    idTipoDocumento: 'int',
    num_documento: 'string',
    primer_nombre: 'string',
    segundo_nombre: 'string',
    apellido_paterno: 'string',
    apellido_materno: 'string',
    direccion: 'string',
    telefono: 'string',
    email: 'string',
    estado: 'int',
  },
};

// Define el esquema de la base de datos para Prestamo
export const PrestamoSchema: Realm.ObjectSchema = {
  name: 'Prestamo',
  primaryKey: 'idPrestamo',
  properties: {
    idPrestamo: 'string',
    idEmpresa: 'string',
    idPersona: 'string',
    num_prestamo: 'string',
    monto_solicitado: 'float',
    monto_aprobado: 'float',
    tasa_interes: 'float',
    tasa_mora: 'float',
    tipo_prestamo: 'int',
    cant_coutas: 'int',
    fecha_solicitud: 'date',
    fecha_aprobacion: 'date',
    fecha_inicioPrestamo: 'date',
    fecha_finPrestamo: 'date',
    estado: 'int',
  },
};
export const  DetallePrestamo: Realm.ObjectSchema = {
    name: 'DetallePrestamo',
    primaryKey: 'idDetallePrestamo',
    properties: {
      idDetallePrestamo: 'int',
      idPrestamo: 'string',
      num_cuota: 'int',
      mont_capital: 'double',
      mont_interes: 'double',
      mont_couta: 'double',
      fecha_couta: 'date',
      fecha_venc: 'date',
      estado: 'int',
    },
  };


// Define el esquema de la base de datos para TipoPersona
export const TipoPersonaSchema: Realm.ObjectSchema = {
  name: 'TipoPersona',
  primaryKey: 'idTipoPersona',
  properties: {
    idTipoPersona: 'int',
    nombre: 'string',
    estado: 'int',
  },
};

export const MonedaSchema: Realm.ObjectSchema = {
  name: 'Moneda',
  primaryKey: 'idMoneda',
  properties: {
    idMoneda: 'int',
    nombre: 'string',
    estado: 'int',
    abreviatura: 'string',
  },
};

export const TasaMonedaSchema: Realm.ObjectSchema = {
  name: 'TasaMoneda',
  primaryKey: 'idTasaMoneda',
  properties: {
    idTasaMoneda: 'int',
    idMoneda: 'int',
    tasa_actual: 'float',
    tasa_anterior: 'float',
    fecha_registro: 'date',
    fecha_modificacion: 'date',
  },
};

export const DetallePagoSchema: Realm.ObjectSchema = {
  name: 'DetallePago',
  primaryKey: 'idDetalle_pago',
  properties: {
    idDetalle_pago: 'int',
    idCouta: 'int',
    idTipoPago: 'int',
    fecha_pago: 'date',
    estado: 'int',
    idPrestamo: 'string',
    mont_pagado: 'float',
    idUsuario: 'string',
    mont_cuota: 'float',
    idPago: 'string?',
  },
};

export const PagoSchema: Realm.ObjectSchema = {
  name: 'Pago',
  primaryKey: 'idPago',
  properties: {
    idPago: 'int',
    idEmpresa: 'string',
    idPrestamo: 'string',
    idUsuario: 'string',
    num_pagos: 'int',
    total_capital: 'float',
    total_interes: 'float',
    mont_prestamo: 'float',
    balance: 'float',
    estado: 'int',
  },
};

export const TipoPagoSchema: Realm.ObjectSchema = {
  name: 'TipoPago',
  primaryKey: 'idTipoPago',
  properties: {
    idTipoPago: 'int',
    nombre: 'string',
    descripcion: 'string?',
  },
};

export const MonedaEmpresaSchema: Realm.ObjectSchema = {
  name: 'MonedaEmpresa',
  primaryKey: 'idMonedaEmpresa',
  properties: {
    idMonedaEmpresa: 'int',
    idEmpresa: 'string',
    idTasaMoneda: 'int',
  },
};


// Exporta la configuración de la base de datos
export const realmConfig = {
  schema: [
    EmpresaSchema,
    EstadoSchema,
    PersonaSchema,
    PrestamoSchema,
    DetallePrestamo,
    TipoPersonaSchema,
    MonedaSchema,
    TasaMonedaSchema,
    DetallePagoSchema,
    PagoSchema,
    TipoPagoSchema,
  ],
  schemaVersion: 3,
};



export const initializeDatabase = async () => {
  const realm = new Realm(realmConfig);
// deleteAllData();

  const estadosExist = realm.objects('Estado');
  // console.log(estadosExist.length)
  if (estadosExist.length === 0 ) {
    
    realm.write(() => {
    initialEstados.forEach(estado => {
        realm.create('Estado', estado);
      });
    });
  }
  // Verificar si ya existen entradas en la tabla TipoPersona
  const existingEntries = realm.objects('TipoPersona');
  if (existingEntries.length === 0) {
 

    realm.write(() => {
      tiposDePersona.forEach(tipo => {
        realm.create('TipoPersona', tipo);
      });
    });
  }

 

  realm.close();
};

export const getNextId = async () => {
  const realm = new Realm(realmConfig);
  const objects = realm.objects('DetallePrestamo');
  
  if (objects.length > 0) {
    const sortedObjects = objects.sorted('idDetallePrestamo', true);
    const highestIdObject = sortedObjects[0];
    
    if (typeof highestIdObject.idDetallePrestamo === 'number') {
      return highestIdObject.idDetallePrestamo + 1;
    }
  }
  
  return 1;
};
export const deleteAllData = async () => {
  const realm = new Realm(realmConfig);
  try {
    // Inicia una transacción
    realm.write(() => {
      // Obtén todos los objetos de todas las colecciones y elimínalos
      realm.deleteAll();
    });
    console.log('Todos los datos han sido eliminados correctamente');
  } catch (error) {
    console.error('Error al eliminar todos los datos:', error);
  }
};

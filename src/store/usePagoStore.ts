import  Realm  from 'realm';
import { create } from "zustand";
import { realmConfig } from "../Configs";
import { DetallePago, Pago } from "../Configs/interfaces";

const realm = new Realm(realmConfig);


// Función para obtener todos los pagos desde Realm
const getPagosFromRealm = (): Pago[] => {
    const pagos = realm.objects<Pago>('Pago');
    return Array.from(pagos);
  };
  
  // Función para obtener todos los detalles de pago desde Realm
  const getDetallesPagoFromRealm = (): DetallePago[] => {
    const detallesPago = realm.objects<DetallePago>('DetallePago');
    return Array.from(detallesPago);
  };

const addPagoToRealm = (pago: Pago) => {
  realm.write(() => {
    realm.create('Pago', pago);
  });
};

const updatePagoInRealm = (idPago: number, updatedPago: Partial<Pago>) => {
  realm.write(() => {
    const pago = realm.objectForPrimaryKey('Pago', idPago);
    if (pago) {
      Object.assign(pago, updatedPago);
    }
  });
};

const removePagoFromRealm = (idPago: number) => {
  realm.write(() => {
    const pago = realm.objectForPrimaryKey('Pago', idPago);
    if (pago) {
      realm.delete(pago);
    }
  });
};

const addDetallePagoToRealm = (detallePago: DetallePago) => {
  realm.write(() => {
    realm.create('DetallePago', detallePago);
  });
};

const updateDetallePagoInRealm = (idDetalle_pago: number, updatedDetallePago: Partial<DetallePago>) => {
  realm.write(() => {
    const detallePago = realm.objectForPrimaryKey('DetallePago', idDetalle_pago);
    if (detallePago) {
      Object.assign(detallePago, updatedDetallePago);
    }
  });
};

const removeDetallePagoFromRealm = (idDetalle_pago: number) => {
  realm.write(() => {
    const detallePago = realm.objectForPrimaryKey('DetallePago', idDetalle_pago);
    if (detallePago) {
      realm.delete(detallePago);
    }
  });
};


interface PagoState {
    pagos: Pago[];
    detallePagos: DetallePago[];
    addPago: (pago: Pago) => void;
    updatePago: (idPago: number, pago: Partial<Pago>) => void;
    removePago: (idPago: number) => void;
    addDetallePago: (detallePago: DetallePago) => void;
    updateDetallePago: (idDetalle_pago: number, detallePago: Partial<DetallePago>) => void;
    removeDetallePago: (idDetalle_pago: number) => void;
  }
  
export const usePagoStore = create<PagoState>((set) => ({
    pagos: getPagosFromRealm(),
    detallePagos: getDetallesPagoFromRealm(),
  addPago: (pago) => {
    addPagoToRealm(pago);
    set((state) => ({ pagos: [...state.pagos, pago] }));
  },
  updatePago: (idPago, updatedPago) => {
    updatePagoInRealm(idPago, updatedPago);
    set((state) => ({
      pagos: state.pagos.map((p) => (p.idPago === idPago ? { ...p, ...updatedPago } : p)),
    }));
  },
  removePago: (idPago) => {
    removePagoFromRealm(idPago);
    set((state) => ({
      pagos: state.pagos.filter((p) => p.idPago !== idPago),
    }));
  },
  addDetallePago: (detallePago) => {
    addDetallePagoToRealm(detallePago);
    set((state) => ({ detallePagos: [...state.detallePagos, detallePago] }));
  },
  updateDetallePago: (idDetalle_pago, updatedDetallePago) => {
    updateDetallePagoInRealm(idDetalle_pago, updatedDetallePago);
    set((state) => ({
      detallePagos: state.detallePagos.map((dp) => (dp.idDetalle_pago === idDetalle_pago ? { ...dp, ...updatedDetallePago } : dp)),
    }));
  },
  removeDetallePago: (idDetalle_pago) => {
    removeDetallePagoFromRealm(idDetalle_pago);
    set((state) => ({
      detallePagos: state.detallePagos.filter((dp) => dp.idDetalle_pago !== idDetalle_pago),
    }));
  },
}));
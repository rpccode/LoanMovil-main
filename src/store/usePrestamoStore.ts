import { create } from 'zustand';
import Realm from 'realm';
import { realmConfig } from '../Configs';
import { Prestamo, IDetallePrestamo, loanWhitDues } from '../Configs/interfaces';

interface PrestamoStoreState {
  prestamo: {
    prestamo: Prestamo;
    cuotas: IDetallePrestamo[];
  };
  prestamos: Prestamo[];
  detallesPrestamo: IDetallePrestamo[];
  activeLoan: (prestamo: loanWhitDues) => void;
  loadPrestamos: () => void;
  confirmPrestamo: () => void;
  addPrestamo: (prestamo: Prestamo, detalles: IDetallePrestamo[]) => void;
  deletePrestamo: (prestamoId: string) => void;
  updatePrestamo: (
    prestamo: Prestamo,
    detalles: IDetallePrestamo[]
  ) => Prestamo;
  findOnePrestamo: (prestamoId: string) => { prestamo: Prestamo, detalles: IDetallePrestamo[] } | undefined;
  addDetallesPrestamo: (detalles: IDetallePrestamo[]) => void;
}

const usePrestamoStore = create<PrestamoStoreState>((set, get) => ({
  prestamo: {
    prestamo: {
      idPrestamo: '',
      idEmpresa: '',
      idPersona: '',
      num_prestamo: '',
      monto_solicitado: 0,
      monto_aprobado: 0,
      tasa_interes: 0,
      tasa_mora: 0,
      tipo_prestamo: 0,
      cant_coutas: 0,
      fecha_solicitud: '',
      fecha_aprobacion: '',
      fecha_inicioPrestamo: '',
      fecha_finPrestamo: '',
      estado: 0,
    },
    cuotas: [],
  },
  prestamos: [],
  detallesPrestamo: [],
  activeLoan: async (prestamo) => {
    set({
      prestamo: {
        prestamo: prestamo.loan,
        cuotas: prestamo.dues,
      },
    });
  },
  loadPrestamos: async () => {
    const realm = new Realm(realmConfig);
    const prestamos = realm.objects<Prestamo>('Prestamo');
    const detallesPrestamo = realm.objects<IDetallePrestamo>('DetallePrestamo');
    set({
      prestamos: prestamos.map((prestamo) => ({
        ...(prestamo.toJSON() as unknown as Prestamo),
      })),
      detallesPrestamo: detallesPrestamo.map((detalle) => ({
        ...(detalle.toJSON() as unknown as IDetallePrestamo),
      })),
    });
    realm.close();
  },
  confirmPrestamo: () => {
    const { prestamo } = get().prestamo;
    const realm = new Realm(realmConfig);
    realm.write(() => {
      realm.create('Prestamo', prestamo);
      get().prestamo.cuotas.forEach((detalle) => {
        realm.create('DetallePrestamo', detalle);
      });
    });
    realm.close();
  },
  addPrestamo: (prestamo: Prestamo, detalles: IDetallePrestamo[]) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      realm.create('Prestamo', prestamo);
      detalles.forEach((detalle) => {
        realm.create('DetallePrestamo', detalle);
      });
    });
    realm.close();
  },
  deletePrestamo: (prestamoId: string) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      const prestamoToDelete = realm.objectForPrimaryKey<Prestamo>(
        'Prestamo',
        prestamoId
      );
      if (prestamoToDelete) {
        const detallesToDelete = realm
          .objects<IDetallePrestamo>('DetallePrestamo')
          .filtered('idPrestamo == $0', prestamoId);
        realm.delete(detallesToDelete);
        realm.delete(prestamoToDelete);
      }
    });
    realm.close();
  },
  updatePrestamo: (prestamo: Prestamo, detalles: IDetallePrestamo[]) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      realm.create('Prestamo', prestamo, Realm.UpdateMode.Modified);
      const existingDetalles = realm
        .objects<IDetallePrestamo>('DetallePrestamo')
        .filtered('idPrestamo == $0', prestamo.idPrestamo);
      realm.delete(existingDetalles);
      detalles.forEach((detalle) => {
        realm.create('DetallePrestamo', detalle);
      });
    });
    realm.close();
    return prestamo;
  },
  findOnePrestamo: (prestamoId: string) => {
    const realm = new Realm(realmConfig);
    const foundPrestamo = realm.objectForPrimaryKey<Prestamo>(
      'Prestamo',
      prestamoId
    );
    if (!foundPrestamo) {
      realm.close();
      return undefined;
    }
    const prestamo = { ...(foundPrestamo.toJSON() as unknown as Prestamo) };
    const detalles = realm
      .objects<IDetallePrestamo>('DetallePrestamo')
      .filtered('idPrestamo == $0', prestamoId)
      .map((detalle) => ({ ...(detalle.toJSON() as unknown as IDetallePrestamo) }));
    realm.close();
    return {
      prestamo,
      detalles,
    };
  },
  addDetallesPrestamo: (detalles: IDetallePrestamo[]) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      detalles.forEach((detalle) => {
        realm.create('DetallePrestamo', detalle);
      });
    });
    realm.close();
  },
}));

export default usePrestamoStore;

import { create } from 'zustand';
import Realm from 'realm';
import { realmConfig } from '../Configs';
import { Estado } from '../Configs/interfaces';

interface EstadoStoreState {
  estados: Estado[];
  loadEstados: () => void;
  addEstado: (estado: Estado) => void;
  deleteEstado: (estadoId: number) => void;
  updateEstado: (estado: Estado) => Estado;
  findOneEstado: (estadoId: number) => Estado | undefined;
}

const useEstadoStore = create<EstadoStoreState>((set) => ({
  estados: [],
  loadEstados: async () => {
    const realm = new Realm(realmConfig);
    const estados = realm.objects<Estado>('Estado');
    set({ estados: estados.map(estado => ({ ...estado.toJSON() as unknown as Estado })) });
    realm.close();
  },
  addEstado: (estado: Estado) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      realm.create('Estado', estado);
    });
    realm.close();
  },
  deleteEstado: (estadoId: number) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      const estadoToDelete = realm.objectForPrimaryKey<Estado>('Estado', estadoId);
      if (estadoToDelete) {
        realm.delete(estadoToDelete);
      }
    });
    realm.close();
  },
  updateEstado: (estado: Estado) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      realm.create('Estado', estado, Realm.UpdateMode.Modified);
    });
    realm.close();
    return estado;
  },
  findOneEstado: (estadoId: number) => {
    const realm = new Realm(realmConfig);
    const foundEstado = realm.objectForPrimaryKey<Estado>('Estado', estadoId);
    const estado = foundEstado ? { ...foundEstado.toJSON() as unknown as Estado } : undefined;
    realm.close();
    return estado;
  },
}));

export default useEstadoStore;

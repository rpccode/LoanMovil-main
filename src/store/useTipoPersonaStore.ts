import { create } from 'zustand';
import Realm from 'realm';
import { realmConfig } from '../Configs';
import { TipoPersona } from '../Configs/interfaces';

interface TipoPersonaStoreState {
  tipoPersonas: TipoPersona[];
  loadTipoPersonas: () => void;
  addTipoPersona: (tipoPersona: TipoPersona) => void;
  deleteTipoPersona: (tipoPersonaId: number) => void;
  updateTipoPersona: (tipoPersona: TipoPersona) => TipoPersona;
  findOneTipoPersona: (tipoPersonaId: number) => TipoPersona | undefined;
}

const useTipoPersonaStore = create<TipoPersonaStoreState>((set) => ({
  tipoPersonas: [],
  loadTipoPersonas: async () => {
    const realm = new Realm(realmConfig);
    const tipoPersonas = realm.objects<TipoPersona>('TipoPersona');
    set({ tipoPersonas: tipoPersonas.map(tipoPersona => ({ ...tipoPersona.toJSON() as unknown as TipoPersona })) });
    realm.close();
  },
  addTipoPersona: (tipoPersona: TipoPersona) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      realm.create('TipoPersona', tipoPersona);
    });
    realm.close();
  },
  deleteTipoPersona: (tipoPersonaId: number) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      const tipoPersonaToDelete = realm.objectForPrimaryKey<TipoPersona>('TipoPersona', tipoPersonaId);
      if (tipoPersonaToDelete) {
        realm.delete(tipoPersonaToDelete);
      }
    });
    realm.close();
  },
  updateTipoPersona: (tipoPersona: TipoPersona) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      realm.create('TipoPersona', tipoPersona, Realm.UpdateMode.Modified);
    });
    realm.close();
    return tipoPersona;
  },
  findOneTipoPersona: (tipoPersonaId: number) => {
    const realm = new Realm(realmConfig);
    const foundTipoPersona = realm.objectForPrimaryKey<TipoPersona>('TipoPersona', tipoPersonaId);
    const tipoPersona = foundTipoPersona ? { ...foundTipoPersona.toJSON() as unknown as TipoPersona } : undefined;
    realm.close();
    return tipoPersona;
  },
}));

export default useTipoPersonaStore;

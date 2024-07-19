import { create } from 'zustand';
import Realm from 'realm';
import { realmConfig } from '../Configs';
import { Persona } from '../Configs/interfaces';



interface StoreState {
  personas: Persona[];
  loadPersonas: () => void;
  addCustomer: (customer: Persona) => void;
  deleteCustomer: (infoId: number) => void;
  updateCustomer: (customer: Persona) => Persona;
  findOneCustomer: (infoId: number) => Persona | undefined;
}

const usePersonaStore = create<StoreState>((set) => ({
  personas: [],
  loadPersonas: async () => {
    const realm = new Realm(realmConfig);
    const persona = realm.objects<Persona>('Persona');
    set({ personas: persona.map(customer => ({ ...customer.toJSON() as unknown as Persona })) });
    realm.close();
  },
  addCustomer: (customer: Persona) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      realm.create('Persona', customer);
    });
    realm.close();
  },
  deleteCustomer: (infoId: number) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      const customerToDelete = realm.objectForPrimaryKey<Persona>('Persona', infoId);
      if (customerToDelete) {
        realm.delete(customerToDelete);
      }
    });
    realm.close();
  },
  updateCustomer: (customer: Persona) => {
    const realm = new Realm(realmConfig);
    realm.write(() => {
      realm.create('Persona', customer, Realm.UpdateMode.Modified);
    });
    realm.close();
    return customer;
  },
  findOneCustomer: (infoId: number) => {
    const realm = new Realm(realmConfig);
    const foundCustomer = realm.objectForPrimaryKey<Persona>('Persona', infoId);
    const customer = foundCustomer ? { ...foundCustomer.toJSON() as unknown as Persona } : undefined;
    realm.close();
    return customer;
  },
}));

export default usePersonaStore;

import { useState } from "react";
import { Persona } from "../Configs/interfaces";
import uuid from 'uuid';

export const useCustomerModal = (initialState: Persona) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newCustomer, setNewCustomer] = useState<Persona>(initialState);
  
    const resetNewCustomer = () => {
      setNewCustomer({
        ...initialState,
        idPersona: uuid.v4(),
      });
    };
  
    return {
      isModalVisible,
      setIsModalVisible,
      newCustomer,
      setNewCustomer,
      resetNewCustomer,
    };
  };
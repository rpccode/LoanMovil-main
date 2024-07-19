import uuid from 'react-native-uuid';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { CustomHeader } from '../../../Components';
import { COLORS } from '../../../Configs';

import CustomerList from '../components/CustomerList';
import CustomerModal from '../components/CustomerModal';
import FilterForm from '../components/FilterForm';

import { Persona } from '../../../Configs/interfaces';
import useStore from '../../../store/usePersonaStore';
import { useCustomerFilters, useCustomerModal } from '../../../hooks';
import { ThemeStyles } from '../../../Configs/constants/theme';




const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CustomerScreens() {
  const { personas, loadPersonas, addCustomer } = useStore();
  const initialCustomerState: Persona = {
    idPersona: uuid.v4().toString(),
    idEmpresa: '37ee7232-f4c9-41a0-ba75-076ffb4e6e9a',
    idTipoPersona: 1,
    idTipoDocumento: 1,
    num_documento: '',
    primer_nombre: '',
    segundo_nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    direccion: '',
    telefono: '',
    email: '',
    estado: 1,
  };

  const {
    filteredCustomers,
    filterFirstName,
    setFilterFirstName,
    filterLastName,
    setFilterLastName,
  } = useCustomerFilters(personas);

  const {
    isModalVisible,
    setIsModalVisible,
    newCustomer,
    resetNewCustomer,
  } = useCustomerModal(initialCustomerState);

  useEffect(() => {
    loadPersonas();
  }, []);

  const handleAddCustomer = () => {
    addCustomer(newCustomer);
    loadPersonas();
    setIsModalVisible(false);
    resetNewCustomer();
  };

  return (
    <>
      <CustomHeader
        title="Administra tus Clientes"
        color={COLORS.base}
      />
      <View style={styles.container}>
        <FilterForm
          filterFirstName={filterFirstName}
          filterLastName={filterLastName}
          setFilterFirstName={setFilterFirstName}
          setFilterLastName={setFilterLastName}
        />
        <CustomerList customers={filteredCustomers} />
        <Button
          title="Agregar Cliente"
          buttonStyle={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        />
      </View>
      <CustomerModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
}

const styles = ThemeStyles
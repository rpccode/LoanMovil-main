// PersonSelectionScreen.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { usePersonaStore } from '../../../store';
import { COLORS } from '../../../Configs';
import { ThemeStyles } from '../../../Configs/constants/theme';
import { CustomHeader } from '../../../Components';
 // Importa tu hook para manejar personas

const PersonSelectionScreen = ({ navigation }) => {
  const { personas, loadPersonas } = usePersonaStore(); // Usa tu hook para cargar las personas

  React.useEffect(() => {
    loadPersonas(); // Carga las personas al montar la pantalla
  }, []);

  const handlePersonSelect = (personId: string) => {
    // Maneja la selección de la persona y la navegación a la siguiente pantalla
    navigation.navigate('LoanDetails', { personId }); // Sustituye 'LoanForm' con el nombre de tu siguiente pantalla
  };

  const handleAddNewPerson = () => {
    // Navega a la pantalla para agregar una nueva persona
    navigation.navigate('Customer');
  };

  return (
     <>
      <CustomHeader title={'Selecciona un Cliente'} color={''} />
    <View style={styles.container}>
      <FlatList
        data={personas}
        keyExtractor={(item) => item.idPersona}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.buttonContainer}  onPress={() => handlePersonSelect(item.idPersona)}>
            <Text style={styles.personName}>{item.primer_nombre} {item.apellido_paterno}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddNewPerson}>
        <Text style={styles.addButtonText}>Agregar Nueva Persona</Text>
      </TouchableOpacity>
    </View>
     
     </>
  );
};

const styles = ThemeStyles

export default PersonSelectionScreen;
 
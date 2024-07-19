import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../../Configs';

interface FilterFormProps {
  filterFirstName: string;
  filterLastName: string;
  setFilterFirstName: (text: string) => void;
  setFilterLastName: (text: string) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  filterFirstName,
  filterLastName,
  setFilterFirstName,
  setFilterLastName,
}) => {
  return (
    <View style={styles.filterContainer}>
      <TextInput
        style={styles.input}
        placeholder="Filtrar por nombre"
        placeholderTextColor={COLORS.darkBlue}
        value={filterFirstName}
        onChangeText={setFilterFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Filtrar por apellido"
        placeholderTextColor={COLORS.darkBlue}
        value={filterLastName}
        onChangeText={setFilterLastName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  input: {
    width: '48%',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    color: COLORS.darkBlue,
  },
});

export default FilterForm;

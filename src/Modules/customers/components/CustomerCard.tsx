import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../Configs';
import { Persona } from '../../../Configs/interfaces';
import { useTipoPersonaStore } from '../../../store';
import { ThemeStyles } from '../../../Configs/constants/theme';
import { formatID } from '../../../helpers/utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CustomerCardProps {
  customer: Persona;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  const { findOneTipoPersona } = useTipoPersonaStore();
  const cardBorderColor = customer.estado === 1 ? COLORS.green : COLORS.red;

  const tipoPersona = findOneTipoPersona(customer.idTipoPersona);

  return (
    <View style={[styles.card]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.tipoPersona, { color: cardBorderColor }]}>{tipoPersona?.nombre}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.name}>
          {customer.primer_nombre} {customer.segundo_nombre} {customer.apellido_paterno} {customer.apellido_materno}
        </Text>
        <View style={ThemeStyles.row}>
        <Text style={styles.info}>DNI: <Text>{customer.num_documento}</Text></Text>
        <Text style={styles.info}>Teléfono: {formatID(customer.telefono)}</Text>
        </View> 
        <View style={ThemeStyles.row}>
        <Text style={styles.info}>Email: {customer.email}</Text>
        <Text style={styles.info}>
          Estado: 
          <Text style={{ color: cardBorderColor }}> {customer.estado === 1 ? 'Activo' : 'Inactivo'}</Text>
        </Text>
        </View> 
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.9,
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
  },
  cardHeader: {
    // marginBottom: 10,
    alignItems: 'flex-end',
  },
  cardContent: {
    flex: 1,
  },
  tipoPersona: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
});

export default CustomerCard;

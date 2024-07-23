import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, ThemeStyles } from '../../../Configs/constants/theme';
import { Image } from 'react-native';
import { icons } from '../../../Configs';

const PaymentScreens = ({navigation}) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <Image
        source={icons.pagar}
        resizeMode="contain"
        style={{ height: 120, width: 120, tintColor: COLORS.blue, marginBottom:2 }}  
        />
        <Text style={styles.headerText}>Pagos</Text>
      </View>
      <View style={{
        margin:10,
        flexDirection: 'column',
        justifyContent:'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
        , backgroundColor:COLORS.white}}>
        <View style={{...styles.row,marginBottom: 5}}>
                <Text style={{
                    fontSize: 18,
                    color: COLORS.darkGray,
                    fontWeight: 'bold',
                    
  
                }}>Detalles del Prestamo</Text>
        </View>
        <View style={styles.row}>
                <Text style={{
                    fontSize: 18,
                    color: COLORS.darkGray,
                    fontWeight: 'bold',
                    marginBottom: 5
  
                }}>Cliente:</Text>
                <Text style={{
                    fontSize: 16,
                    color: COLORS.darkGray,
                    marginBottom: 5
                    }}>Rudy Alexander Perez Casilla</Text>

        </View>
        <View style={styles.row}>
                <Text style={{
                    fontSize: 18,
                    color: COLORS.darkGray,
                    fontWeight: 'bold',
                    marginBottom: 5
  
                }}>Numero de Prestamo:</Text>
                <Text style={{
                    fontSize: 16,
                    color: COLORS.darkGray,
                    marginBottom: 5
                    }}>0001-2345-6789-1234</Text>
        </View>
        
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Opciones de Pago</Text>
        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.paymentOptionText}>Pagar Cuota Actual</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.paymentOptionText}>Pagar Cuota Vencida</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.paymentOptionText}>Pagar Monto Personalizado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.paymentOptionText}>Otro Monto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.paymentOption, { backgroundColor: COLORS.darkRed }]}>
          <Text style={styles.paymentOptionText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PaymentScreens;

const styles = StyleSheet.create({
  ...ThemeStyles,
  headerContainer: {
    height: '30%',
    backgroundColor: COLORS.darkBlue,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  contentContainer: {
    flex: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: COLORS.white,
    padding: 16,
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    marginBottom: 16,
    textAlign: 'center',
  },
  paymentOption: {
    backgroundColor: COLORS.darkBlue,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  paymentOptionText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

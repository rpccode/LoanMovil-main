import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Share from 'react-native-share';
import {IDetallePrestamo, Prestamo} from '../../../Configs/interfaces';
import {COLORS} from '../../../Configs';
import {formatCurrency} from '../../../helpers/utils';
import {formatDate} from '../../../helpers';
import {usePrestamoStore} from '../../../store';
import { ThemeStyles } from '../../../Configs/constants/theme';
import { CustomHeader } from '../../../Components';

const LoanConfirmationScreen = ({navigation, route}) => {
  const {loanDetails, TotaloanDetails} = route.params; // Obtiene los detalles del préstamo de la pantalla anterior
  const loan: Prestamo = loanDetails.loan;
  const dues: IDetallePrestamo = loanDetails.dues[0];
  const {payDuesAmount, payTotalAmount, payTotalInterest} = TotaloanDetails;
  const {confirmPrestamo, prestamo} = usePrestamoStore();
  const handleConfirmLoan = () => {
    console.log(prestamo)
    confirmPrestamo();
    Alert.alert('Préstamo confirmado y guardado exitosamente.');
    navigation.navigate('HomeTabs'); // Ejemplo de navegación a la pantalla de inicio
  };

  const handleModifyLoan = () => {
    navigation.goBack();
  };

  const handleShareLoanDetails = () => {
    const message = `
    Confirmación del Préstamo:
    Monto Solicitado: ${formatCurrency(loan.monto_solicitado)}
    Tasa de Interés: ${loan.tasa_interes}%
    Cantidad de Cuotas: ${loan.cant_coutas}
    Monto de la Cuota: ${formatCurrency(dues.mont_couta)}
    Fecha de Inicio: ${formatDate(loan.fecha_inicioPrestamo)}

    Monto Total de Capital: ${formatCurrency(payTotalAmount)}
    Monto Total de Interés: ${formatCurrency(payTotalInterest)}
    Monto Total a Pagar: ${formatCurrency(payTotalAmount + payTotalInterest)}
    `;

    Share.open({
      title: 'Detalles del Préstamo',
      message: message,
    }).catch(err => {
      if (err) {
        console.error(err);
      }
    });
  };

  return (
   <>
<CustomHeader title={'Confirmación del Préstamo'} color={''} />
    <View style={{...styles.containerr, padding: 20,}}>
      {/* <Text style={styles.title}>Confirmación del Préstamo</Text> */}
      <View style={styles.summaryContainer}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Monto Solicitado:</Text>
            <Text style={styles.value}>
              {formatCurrency(loan.monto_solicitado)}
            </Text>
            <Text style={styles.label}>Tasa de Interés:</Text>
            <Text style={styles.value}>{loan.tasa_interes}%</Text>
            <Text style={styles.label}>Cantidad de Cuotas:</Text>
            <Text style={styles.value}># {loan.cant_coutas}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Monto de la Cuota:</Text>
            <Text style={styles.value}>{formatCurrency(dues.mont_couta)}</Text>
            <Text style={styles.label}>Fecha de Inicio:</Text>
            <Text style={styles.value}>
              {formatDate(loan.fecha_inicioPrestamo)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.label}>Monto Total de Capital:</Text>
        <Text style={styles.value}>{formatCurrency(payTotalAmount)}</Text>
        <Text style={styles.label}>Monto Total de Interés:</Text>
        <Text style={styles.value}>{formatCurrency(payTotalInterest)}</Text>
        <Text style={styles.label}>Monto Total a Pagar:</Text>
        <Text style={styles.value}>
          {formatCurrency(payTotalAmount + payTotalInterest)}
        </Text>
      </View>
      <View style={styles.buttonContainer2}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmLoan}>
          <Text style={styles.confirmButtonText}>Confirmar Préstamo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modifyButton}
          onPress={handleModifyLoan}>
          <Text style={styles.modifyButtonText}>Modificar Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShareLoanDetails}>
          <Text style={styles.shareButtonText}>Compartir</Text>
        </TouchableOpacity>
      </View>
    </View>
   
   
   </>
  );
};

const styles = ThemeStyles
export default LoanConfirmationScreen;

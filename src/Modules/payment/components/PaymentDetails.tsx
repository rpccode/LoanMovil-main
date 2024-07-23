import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {IDetallePrestamo, loanInfo} from '../../../Configs/interfaces';
import {COLORS} from '../../../Configs';
import {ThemeStyles} from '../../../Configs/constants/theme';
import {useLoans} from '../../../hooks';
import {formatCurrency, formatID, formatPhoneNumber} from '../../../helpers/utils';

interface PaymentDetailsProps {
  detailActionSheetRef: React.RefObject<ActionSheetRef>;
  paymentType: string | null;
  selectedLoan: loanInfo | null;
  closeSheet: () => void;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  detailActionSheetRef,
  paymentType,
  selectedLoan,
  closeSheet,
}) => {
  const {CuotasVencidas} = useLoans();
  const handlePaymentDetail = () => {
    console.log(
      `Pagar ${paymentType} para el préstamo ${selectedLoan?.dues?.idPrestamo}`,
    );
    closeSheet();
  };

  const newCuotasVencidas = CuotasVencidas(selectedLoan?.dues?.idPrestamo || '');
  const cantidadCuotaVencidas = newCuotasVencidas.length;
  const montoVencido = newCuotasVencidas.reduce(
    (total, cuota) => total + cuota.dues.mont_couta,
    0,
  );

  return (
    <ActionSheet ref={detailActionSheetRef}>
      <View style={styles.sheetContainer}>
        <Text style={styles.sheetTitle}>{`Detalle de ${paymentType}`}</Text>
        <Text style={styles.label}>
          {`Préstamo:`}
          <Text style={styles.value}>{selectedLoan?.dues?.idPrestamo ? formatPhoneNumber('00003921223'):''}</Text>
        </Text>
        {paymentType === 'Cuota Vencida' ? (
          <>
            <Text style={styles.label}>
              {`Cantidad de Cuotas Vencidas:`}
              <Text style={styles.value}>#{cantidadCuotaVencidas}</Text>
            </Text>
            <Text style={styles.label}>
              {`Monto Vencido: `}
              <Text style={styles.value}>${formatCurrency(montoVencido)}</Text>
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.label}>{`Monto: `}
            
            <Text style={styles.value}>${formatCurrency(montoVencido)}</Text>
            
            </Text>
          </>
        )}

        <TouchableOpacity
          style={{...styles.addButton2, backgroundColor: COLORS.darkGreen}}
          onPress={handlePaymentDetail}>
          <Text style={styles.addButtonText}>Confirmar Pago</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={closeSheet}
          style={{...styles.addButton2, backgroundColor: COLORS.darkRed}}>
          <Text style={styles.addButtonText}>Volver al menú principal</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  ...ThemeStyles,
  sheetContainer: {
    padding: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

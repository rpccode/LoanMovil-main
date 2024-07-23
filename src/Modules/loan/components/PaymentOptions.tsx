import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { COLORS } from '../../../Configs';
import { ThemeStyles } from '../../../Configs/constants/theme';

interface PaymentOptionsProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  handlePaymentSelection: (type: string) => void;
  closeSheet: () => void;
  currentTab: string; // Add this prop to indicate the current tab
}

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  actionSheetRef,
  handlePaymentSelection,
  closeSheet,
  currentTab, // Destructure the prop
}) => {
  return (
    <ActionSheet ref={actionSheetRef}>
      <View style={styles.sheetContainer}>
        <Text style={styles.sheetTitle}>Opciones de Pago</Text>
        
        {currentTab === 'today' && (
          <TouchableOpacity style={styles.addButton} onPress={() => handlePaymentSelection('Cuota Actual')}>
            <Text style={styles.addButtonText}>Pagar Cuota Actual</Text>
          </TouchableOpacity>
        )}
        
        {currentTab === 'overdue' && (
          <>
            <TouchableOpacity style={styles.addButton} onPress={() => handlePaymentSelection('Cuota Vencida')}>
              <Text style={styles.addButtonText}>Pagar Cuota Vencida</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => handlePaymentSelection('Múltiples Cuotas')}>
              <Text style={styles.addButtonText}>Pagar Múltiples Cuotas</Text>
            </TouchableOpacity>
          </>
        )}
        
        {currentTab === 'unpaid' && (
          <>
            <TouchableOpacity style={styles.addButton} onPress={() => handlePaymentSelection('Cuota Vencida')}>
              <Text style={styles.addButtonText}>Pagar Cuota Vencida</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => handlePaymentSelection('Múltiples Cuotas')}>
              <Text style={styles.addButtonText}>Pagar Múltiples Cuotas</Text>
            </TouchableOpacity>
          </>
        )}
        
        <TouchableOpacity style={styles.addButton} onPress={() => handlePaymentSelection('Otro Monto')}>
          <Text style={styles.addButtonText}>Otro Monto</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{...styles.addButton, backgroundColor: COLORS.darkRed}} onPress={() => closeSheet()}>
          <Text style={styles.addButtonText}>
            Cancelar
          </Text>
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

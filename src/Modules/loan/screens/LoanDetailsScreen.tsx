import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {usePrestamoStore} from '../../../store';
import uuid from 'react-native-uuid';
import {LoanDetailsTable} from '../components';
import {Picker} from '@react-native-picker/picker';
import {COLORS, FONTS, loanWhitDues} from '../../../Configs';
import {calcularDetallesCuotas} from '../../../helpers';
import {ThemeStyles} from '../../../Configs/constants/theme';
import { CustomHeader } from '../../../Components';
import { generateClientLoanNumber, generateNewClientCode } from '../../../helpers/utils';

const LoanDetailsScreen = ({navigation, route}) => {
  const [loanDetails, setLoanDetails] = useState<loanWhitDues | null>(null);
  const [TotaloanDetails, setTotaLoanDetails] = useState<{
    payDuesAmount: number;
    payTotalAmount: number;
    payTotalInterest: number;
  }>({payDuesAmount: 0, payTotalAmount: 0, payTotalInterest: 0});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Amount: '',
    Dues: '',
    Interest: '',
    Frequency: '1',
  });
  const {personId} = route.params; // Obtiene el id de la persona seleccionada de la pantalla anterior
  const {activeLoan} = usePrestamoStore(); // Usa tu hook para manejar los préstamos

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCalculateLoan = async () => {

    const clientCode1 = generateNewClientCode();
    setLoading(true);

    try {
      const calculatedLoan: loanWhitDues = {
        loan: {
          idPrestamo: uuid.v4().toString(),
          monto_solicitado: parseFloat(formData.Amount),
          tasa_interes: parseFloat(formData.Interest),
          cant_coutas: parseInt(formData.Dues, 10),
          idEmpresa: '37ee7232-f4c9-41a0-ba75-076ffb4e6e9a',
          idPersona: personId,
          num_prestamo: generateClientLoanNumber(clientCode1),
          monto_aprobado: 0,
          tasa_mora: 0,
          tipo_prestamo: parseInt(formData.Frequency),
          fecha_solicitud: new Date().toISOString(),
          fecha_aprobacion: new Date().toISOString(),
          fecha_inicioPrestamo: new Date().toISOString(),
          fecha_finPrestamo: new Date().toISOString(),
          estado: 1,
        },
        dues: [],
      };

      const cuota = await calcularDetallesCuotas(calculatedLoan);
      setTotaLoanDetails({
        payDuesAmount: cuota.payDuesAmount,
        payTotalAmount: cuota.payTotalAmount,
        payTotalInterest: cuota.payTotalInterest,
      });
      setLoanDetails({
        loan: calculatedLoan.loan,
        dues: cuota.cuotas,
      });
      // Guarda el préstamo en el almacenamiento o en tu base de datos
      activeLoan({
        loan: calculatedLoan.loan,
        dues: cuota.cuotas,
      });
    } catch (error) {
      console.error('Error calculating loan:', error);
    } finally {
      setLoading(false);
    }
  };

  function handleConfirm(): void {
    navigation.navigate('LoanConfirmation', {loanDetails, TotaloanDetails});
  }

  return (
    <>
    <CustomHeader title={'Detalles del Préstamo'} color={''} />
      <View
        style={{...styles.containerr, padding: 10, backgroundColor: '#ffffff'}}>
        <Text style={styles.textInput}>Frecuencia de Pago:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.Frequency}
            placeholder="Selecciona una Frecuencia"
            style={styles.picker}
            onValueChange={itemValue =>
              handleInputChange('Frequency', itemValue.toString())
            }>
            <Picker.Item label="Semanal" value="1" />
            <Picker.Item label="Quincenal" value="2" />
            <Picker.Item label="Mensual" value="3" />
            <Picker.Item label="Trimestral" value="4" />
            <Picker.Item label="Semi Anual" value="5" />
            <Picker.Item label="Anual" value="6" />
          </Picker>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.textInput}>Monto Solicitado:</Text>
            <TextInput
              style={styles.input}
              placeholder="Monto Solicitado"
              placeholderTextColor={COLORS.darkBlue}
              keyboardType="numeric"
              value={formData.Amount}
              onChangeText={value => handleInputChange('Amount', value)}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.textInput}>Tasa de Interés:</Text>

            <TextInput
              style={styles.input}
              placeholder="Tasa de Interés"
              placeholderTextColor={COLORS.darkBlue}
              keyboardType="numeric"
              value={formData.Interest}
              onChangeText={value => handleInputChange('Interest', value)}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.textInput}>Cantidad de Cuotas:</Text>
            <TextInput
              style={styles.input}
              placeholder="Cantidad de Cuotas"
              placeholderTextColor={COLORS.darkBlue}
              keyboardType="numeric"
              value={formData.Dues}
              onChangeText={value => handleInputChange('Dues', value)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={handleCalculateLoan}>
          <Text style={styles.calculateButtonText}>
            Calcular Detalles del Préstamo
          </Text>
        </TouchableOpacity>
      </View>
      {loanDetails && (
        <>
          <LoanDetailsTable loanDetails={loanDetails?.dues || []} />
          <TouchableOpacity
            style={styles.addButton2}
            onPress={handleConfirm}>
            <Text style={styles.calculateButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

const styles = ThemeStyles;

export default LoanDetailsScreen;

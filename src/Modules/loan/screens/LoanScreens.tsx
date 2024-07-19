import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {FONTS, COLORS, SIZES, loanWhitDues} from '../../../Configs';
import {calcularDetallesCuotas, formatDate} from '../../../helpers';
import {Picker} from '@react-native-picker/picker';
import {ModalForm} from '../../../Components';
import {LoanDetailsTable} from '../components';
import PreviewPDFScreen from './PreviewPDFScreen';
import HeaderTitle from '../../../Components/HeaderTitle';

export default function LoanScreens() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loanDetails, setLoanDetails] = useState<loanWhitDues | null>(null);
  const [TotaloanDetails, setTotaLoanDetails] = useState<{
    payDuesAmount: number;
    payTotalAmount: number;
    payTotalInterest: number;
  }>({payDuesAmount: 0, payTotalAmount: 0, payTotalInterest: 0});
  const [pdfURI, setPdfURI] = useState('');
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Amount: '',
    Dues: '',
    Interest: '',
    Frequency: '1',
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateLoan = async () => {
    setLoading(true);

    try {
      const calculatedLoan: loanWhitDues = {
        loan: {
          LoanId: 1,
          TenantId: '',
          UserId: '',
          infoId: 1,
          FrequencyId: parseInt(formData.Frequency),
          Amount: parseFloat(formData.Amount),
          Dues: parseInt(formData.Dues),
          Interest: parseFloat(formData.Interest),
          Start_date: '2024-01-27',
          StateId: 2,
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
    } catch (error) {
      console.error('Error calculating loan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePDF = async () => {
    try {
      // const pdfUri = await generatePDF(loanDetails); // Generar el PDF
      // setPdfURI(pdfUri || '');
      // setShowPDFPreview(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  return (
    <>
      <View
        style={{
          height: '8%',
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: SIZES.base * 2,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.8,
          shadowRadius: 2,
        }}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.h3,
            fontWeight: 'bold',
            marginBottom: SIZES.base,
          }}>
          Crea tu prestamo
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.textInput}>Frecuencia de Pago:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.Frequency}
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
            <Text style={styles.textInput}>Monto del Prestamo:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor={COLORS.darkBlue}
              value={formData.Amount}
              onChangeText={text => handleInputChange('Amount', text)}
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.textInput}>Porciento de Interes:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor={COLORS.darkBlue}
                value={formData.Interest}
                onChangeText={text => handleInputChange('Interest', text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.textInput}>Cantidad de cuotas:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor={COLORS.darkBlue}
                value={formData.Dues}
                onChangeText={text => handleInputChange('Dues', text)}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.buttonBlue} onPress={calculateLoan}>
            <Text style={styles.textButton}>Calcular Prestamo</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color={COLORS.blue} />}
        {loanDetails && (
          <View style={styles.loanContainer}>
            <View style={styles.loanItem}>
              <Text style={styles.title}>Préstamo</Text>
              <Text style={{...FONTS.body3, color: COLORS.darkBlue}}>
                Cantidad: {loanDetails.loan.Amount}
              </Text>
              <Text style={{...FONTS.body3, color: COLORS.darkBlue}}>
                Fecha de inicio: {formatDate(loanDetails.loan.Start_date)}
              </Text>
              <Text style={{...FONTS.body3, color: COLORS.darkBlue}}>
                Interés: {loanDetails.loan.Interest}%
              </Text>
              <Text style={{...FONTS.body3, color: COLORS.darkBlue}}>
                Numero de Cuotas: {loanDetails.loan.Dues}
              </Text>
              <Text style={{...FONTS.body2, color: COLORS.darkBlue}}></Text>
              <TouchableOpacity style={styles.buttonBlue} onPress={toggleModal}>
                <Text style={styles.textButton}>Visualizar Cuotas</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <ModalForm isVisible={isModalVisible} onClose={toggleModal}>
          <LoanDetailsTable
            loanDetails={loanDetails?.dues || []}
            TotaloanDetails={TotaloanDetails}
          />
        </ModalForm>

    {loanDetails && (
            <TouchableOpacity
            style={styles.buttonBlue}
            onPress={() => console.log('')}>
            <Text style={styles.textButton}>Siguiente</Text>
          </TouchableOpacity>
    )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 350,
  },
  textInput: {
    ...FONTS.body3,
    color: COLORS.secondary,
  },
  buttonRed: {
    marginTop: 4,
    padding: 6,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 6,
    backgroundColor: COLORS.red,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  buttonBlue: {
    marginTop: 4,
    padding: 6,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  textButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 6,
    marginBottom: 16,
    color: COLORS.darkBlue,
  },
  input: {
    color: COLORS.darkBlue,
    fontSize: SIZES.body3,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 6,
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.base,
  },
  formContainer: {
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
  },
  loanContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginVertical: 10,
  },
  loanItem: {
    marginBottom: 20,
  },
});

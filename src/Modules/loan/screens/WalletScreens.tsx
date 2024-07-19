import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {CustomHeader} from '../../../Components';
import {COLORS} from '../../../Configs';
import {useEstadoStore, usePrestamoStore} from '../../../store';
import {formatDate} from '../../../helpers';
import {formatCurrency} from '../../../helpers/utils';
import {ThemeStyles} from '../../../Configs/constants/theme';

interface IPrestamo {
  id: string;
  name: string;
  status: string;
  next_payment: string;
  installments_paid: number;
  outstanding_balance: string;
}

export default function WalletScreens({navigation, route}) {
  const [formattedLoans, setFormattedLoans] = useState<IPrestamo[]>([]);
  const {
    loadPrestamos,
    prestamos,
    addPrestamo,
    detallesPrestamo,
    findOnePrestamo,
  } = usePrestamoStore();
  const {findOneEstado} = useEstadoStore();
  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchNextPayment, setSearchNextPayment] = useState('');
  const [searchInstallments, setSearchInstallments] = useState('');
  const [searchBalance, setSearchBalance] = useState('');
  const [filteredLoans, setFilteredLoans] = useState(formattedLoans);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadPrestamos();
  }, []); // Este efecto solo se ejecuta una vez al montar el componente

  useEffect(() => {
    const transformLoans = () => {
      const loans = prestamos.map(prestamo => {
        const cuotas = detallesPrestamo.filter(
          detalle => detalle.idPrestamo === prestamo.idPrestamo,
        );

        const installmentsPaid = cuotas.filter(
          cuota => cuota.estado === 6, // Suponiendo que estado 6 es pagado
        ).length;

        const nextPayment =
          cuotas.find(
            cuota => cuota.estado === 3, // Suponiendo que estado 3 es no pagado
          )?.fecha_couta || new Date();

        const outstandingBalance = cuotas
          .filter(cuota => cuota.estado === 3)
          .reduce((acc, cuota) => acc + cuota.mont_couta, 0);

        return {
          id: prestamo.idPrestamo || '',
          name: `Prestamo ${prestamo.num_prestamo}` || '',
          status: findOneEstado(prestamo.estado)?.nombre || '', // Suposición del estado del prestamo
          next_payment: formatDate(nextPayment.toString()), // Formatear como string
          installments_paid: installmentsPaid,
          outstanding_balance: outstandingBalance.toFixed(2), // Formatear como string
        };
      });

      setFormattedLoans(loans);
      setFilteredLoans(loans); // Inicialmente establecer los préstamos filtrados como los formateados
    };

    transformLoans();
  }, [prestamos, detallesPrestamo]); // Este efecto se ejecuta cuando cambian 'prestamos' o 'detallesPrestamo'

  const handleFilter = () => {
    const filtered = formattedLoans.filter(
      loan =>
        loan.name.toLowerCase().includes(searchName.toLowerCase()) &&
        loan.status.toLowerCase().includes(searchStatus.toLowerCase()) &&
        loan.next_payment.includes(searchNextPayment) &&
        (searchInstallments
          ? loan.installments_paid == parseInt(searchInstallments)
          : true) &&
        (searchBalance
          ? loan.outstanding_balance.includes(searchBalance)
          : true),
    );
    setFilteredLoans(filtered);
    setModalVisible(false); // Cerrar el modal después de filtrar
  };

  const handleLoanInfo = (loan: IPrestamo) => {
    const loanWhitDues = findOnePrestamo(loan.id);

    navigation.navigate('LoanInfo', {loan, loanWhitDues});
  };
  return (
    <>
      <CustomHeader title={'Cartera de Préstamos'} color={COLORS.white} handlefuntion={() => setModalVisible(true)} />
      <View style={{...styles.containerr, padding: 10}}>
        {/* <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </TouchableOpacity> */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={{...styles.modalView}}>
            <View style={{...styles.modalContent,backgroundColor:COLORS.base}}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nombre"
                placeholderTextColor={COLORS.darkBlue}
                value={searchName}
                onChangeText={text => setSearchName(text)}
              />
              <Picker
                selectedValue={searchStatus}
                style={styles.picker}
                onValueChange={itemValue => setSearchStatus(itemValue)}>
                <Picker.Item label="Seleccionar estado" value="" />
                <Picker.Item label="Al día" value="al día" />
                <Picker.Item label="Atrasado" value="atrasado" />
              </Picker>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por próximo pago"
                placeholderTextColor={COLORS.darkBlue}
                value={searchNextPayment}
                onChangeText={text => setSearchNextPayment(text)}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por cuotas pagadas"
                placeholderTextColor={COLORS.darkBlue}
                value={searchInstallments}
                onChangeText={text => setSearchInstallments(text)}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por balance pendiente"
                placeholderTextColor={COLORS.darkBlue}
                value={searchBalance}
                onChangeText={text => setSearchBalance(text)}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleFilter}>
                <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
       <ScrollView>
       {filteredLoans.map((loan, index) => (
          <TouchableOpacity key={index} onPress={() => handleLoanInfo(loan)}>
            <ListItem style={{...styles.listItem, elevation:4}}>
              <ListItem.Content style={styles.content}>
                <ListItem.Title style={{...styles.title,fontSize:20}}>
                  {loan.name}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.subtitle}>
                  <Text style={styles.label}>Cuotas pagadas: </Text>
                  <Text style={styles.value}>{loan.installments_paid}</Text>
                  {'\n'}
                  <Text style={styles.label}>Próximo pago: </Text>
                  <Text style={styles.value}>{loan.next_payment}</Text>
                  {'\n'}
                  <Text style={styles.label}>Balance pendiente: </Text>
                  <Text style={styles.value}>
                    {formatCurrency(parseFloat(loan.outstanding_balance))}
                  </Text>
                  {'\n'}
                  <Text style={styles.label}>Estado: </Text>
                  <Text
                    style={
                      loan.status === 'pendiente'
                        ? styles.statusUpToDate
                        : styles.statusOverdue
                    }>
                    {loan.status}
                  </Text>
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
       </ScrollView>
      </View>
      <TouchableOpacity
        style={{...styles.applyButton, margin: 10}}
        onPress={() => navigation.navigate('Loan')}>
        <Text style={styles.applyButtonText}>Crear Prestamo</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = ThemeStyles;

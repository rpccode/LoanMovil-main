import React from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { ListItem } from 'react-native-elements';
import { CustomHeader } from '../../../Components';
import { COLORS } from '../../../Configs';
import BarchartLoan from '../components/BarchartLoan';
import { formatCurrency } from '../../../helpers/utils';
import { IDetallePrestamo, Prestamo } from '../../../Configs/interfaces';
import { LoanDetailsTable } from '../components';
import { ThemeStyles } from '../../../Configs/constants/theme';
import { format, parse } from 'date-fns';
const initialLayout = { width: Dimensions.get('window').width };

interface LoanInfoScreensProps {
  navigation: any;
  route: {
    params: {
      loan: any;
      loanWhitDues: {
        prestamo: Prestamo;
        detalles: IDetallePrestamo[];
      };
    };
  };
}

const LoanInfoScreens: React.FC<LoanInfoScreensProps> = ({ navigation, route }) => {
  const { loan, loanWhitDues } = route.params;
  const prestamo = {
    ...loanWhitDues.prestamo,
    fecha_solicitud: format(new Date(loanWhitDues.prestamo.fecha_solicitud), 'yyyy-MM-dd'),
  };
  const detalles = loanWhitDues.detalles;

  const LoanDetailTab: React.FC = () => (
    <ScrollView style={{ ...styles.container, padding: 10, backgroundColor:COLORS.base }}>
      <View style={{...styles.section,marginTop:10, padding:10, backgroundColor:COLORS.white, borderRadius: 4, elevation:4, marginHorizontal:8}}>
        {/* <Text style={styles.sectionTitle}>Detalles del Préstamo</Text> */}
        <Text style={styles.label}>
          Monto del préstamo: <Text style={styles.value}>${formatCurrency(prestamo.monto_solicitado)}</Text>
        </Text>
        <Text style={styles.label}>
          Porcentaje de interés: <Text style={styles.value}>{prestamo.tasa_interes}%</Text>
        </Text>
        <Text style={styles.label}>
          Interés total: <Text style={styles.value}>{loan.total_interest}</Text>
        </Text>
        <Text style={styles.label}>
          Balance pendiente: <Text style={styles.value}>{formatCurrency(parseFloat(loan.outstanding_balance))}</Text>
        </Text>
      </View>
      <BarchartLoan />
    </ScrollView>
  );

  const PaymentsTab: React.FC = () => (
    <ScrollView style={{...styles.container, backgroundColor:COLORS.base}}>
      {loan.payments && Array.isArray(loan.payments) ? (
        loan.payments.map((payment, index) => (
          <ListItem key={index} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{`Pago ${index + 1}`}</ListItem.Title>
              <ListItem.Subtitle>{`Monto: ${payment.amount}`}</ListItem.Subtitle>
              <ListItem.Subtitle>{`Fecha: ${payment.date}`}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      ) : (
        <Text style={styles.noDataText}>No payments available</Text>
      )}
    </ScrollView>
  );

  const AmortizationTab: React.FC = () => (
    <View style={{...styles.container, backgroundColor:COLORS.base}}>
      {detalles && Array.isArray(detalles) ? (
        <LoanDetailsTable loanDetails={detalles} />
      ) : (
        <Text>No amortization data available</Text>
      )}
    </View>
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'details', title: 'Detalles' },
    { key: 'payments', title: 'Pagos' },
    { key: 'amortization', title: 'Amortización' },
  ]);

  const renderScene = SceneMap({
    details: LoanDetailTab,
    payments: PaymentsTab,
    amortization: AmortizationTab,
  });

  return (
    <>
      <CustomHeader title="Detalles del Préstamo" color={COLORS.white} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => <TabBar {...props} style={styles.tabBar} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  ...ThemeStyles,
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: COLORS.black
  },
  value: {
    fontWeight: 'bold',
    color: COLORS.darkBlue,
  },
  noDataText: {
    color: COLORS.darkBlue,
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  tabBar: {
    backgroundColor: COLORS.darkBlue,
  },
});

export default LoanInfoScreens;

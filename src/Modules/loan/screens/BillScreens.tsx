import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Button, Alert } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { ListItem } from 'react-native-elements';
import { COLORS } from '../../../Configs';
import { IDetallePrestamo } from '../../../Configs/interfaces';
import { usePrestamoStore } from '../../../store';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

const initialLayout = { width: Dimensions.get('window').width };

const BillScreens: React.FC = () => {
  const { loadPrestamos, detallesPrestamo } = usePrestamoStore();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'today', title: 'Para Hoy' },
    { key: 'overdue', title: 'Vencidas' },
    { key: 'unpaid', title: 'No Pagadas' },
  ]);

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [selectedLoan, setSelectedLoan] = useState<IDetallePrestamo | null>(null);

  useEffect(() => {
    loadPrestamos();
  }, []);

  const todayDate = new Date().toISOString().split('T')[0];

  const todayLoans: IDetallePrestamo[] = detallesPrestamo.filter(
    loan => loan.fecha_couta === todayDate
  );

  const overdueLoans: IDetallePrestamo[] = detallesPrestamo.filter(
    loan => loan.fecha_couta < todayDate && loan.estado !== 6
  );

  const unpaidLoans: IDetallePrestamo[] = detallesPrestamo.filter(
    loan => loan.fecha_couta <= todayDate && loan.estado !== 6
  ).sort((a, b) => new Date(a.fecha_couta.toString()).getTime() - new Date(b.fecha_couta.toString()).getTime());

  const openSheet = (loan: IDetallePrestamo) => {
    setSelectedLoan(loan);
    actionSheetRef.current?.show();
  };

  const closeSheet = () => {
    setSelectedLoan(null);
    actionSheetRef.current?.hide();
  };

  const handlePayment = (paymentType: string) => {
    if (paymentType === 'Cuota Actual' && selectedLoan) {
      const loanHasOverduePayments = overdueLoans.some(
        overdueLoan => overdueLoan.idPrestamo === selectedLoan.idPrestamo
      );

      if (loanHasOverduePayments) {
        Alert.alert(
          "Advertencia",
          "No se puede pagar la cuota actual porque hay cuotas vencidas.",
          [{ text: "OK" }]
        );
        return;
      }
    }
    // Aquí iría la lógica de pago según el tipo de pago seleccionado
    console.log(`Pagar ${paymentType} para el préstamo ${selectedLoan?.idPrestamo}`);
    closeSheet();
  };

  const renderLoanItem = (loan: IDetallePrestamo, index: number) => (
    <ListItem key={index} bottomDivider onPress={() => openSheet(loan)}>
      <ListItem.Content>
        <ListItem.Title>{`Préstamo ${loan.idPrestamo}`}</ListItem.Title>
        <ListItem.Subtitle>{`Monto: ${loan.mont_capital}`}</ListItem.Subtitle>
        <ListItem.Subtitle>{`Fecha: ${loan.fecha_couta}`}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  const TodayTab: React.FC = () => (
    <ScrollView style={styles.container}>
      {todayLoans.length > 0 ? (
        todayLoans.map((loan, index) => renderLoanItem(loan, index))
      ) : (
        <Text style={styles.emptyText}>No hay cuotas para pagar hoy.</Text>
      )}
    </ScrollView>
  );

  const OverdueTab: React.FC = () => (
    <ScrollView style={styles.container}>
      {overdueLoans.length > 0 ? (
        overdueLoans.map((loan, index) => renderLoanItem(loan, index))
      ) : (
        <Text style={styles.emptyText}>No hay cuotas vencidas.</Text>
      )}
    </ScrollView>
  );

  const UnpaidTab: React.FC = () => (
    <ScrollView style={styles.container}>
      {unpaidLoans.length > 0 ? (
        unpaidLoans.map((loan, index) => renderLoanItem(loan, index))
      ) : (
        <Text style={styles.emptyText}>No hay cuotas no pagadas hasta hoy.</Text>
      )}
    </ScrollView>
  );

  const renderScene = SceneMap({
    today: TodayTab,
    overdue: OverdueTab,
    unpaid: UnpaidTab,
  });

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => <TabBar {...props} style={styles.tabBar} />}
      />

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.sheetContainer}>
          <Text style={styles.sheetTitle}>Opciones de Pago</Text>
          <Button title="Pagar Cuota Actual" onPress={() => handlePayment('Cuota Actual')} />
          <Button title="Pagar Cuota Vencida" onPress={() => handlePayment('Cuota Vencida')} />
          <Button title="Pagar Múltiples Cuotas" onPress={() => handlePayment('Múltiples Cuotas')} />
          <Button title="Otro Monto" onPress={() => handlePayment('Otro Monto')} />
        </View>
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: 10,
  },
  tabBar: {
    backgroundColor: COLORS.darkBlue,
  },
  emptyText: {
    color: COLORS.darkBlue,
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
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

export default BillScreens;

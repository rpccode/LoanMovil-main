import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { COLORS } from '../../../Configs';
import { LoanList } from '../components';
import { useLoans } from '../../../hooks';
import useSheet from '../../../hooks/useSheet';
import { PaymentDetails, PaymentOptions } from '../../payment/components';

const initialLayout = { width: Dimensions.get('window').width };

const BillScreens: React.FC = () => {
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'today', title: 'Para Hoy' },
    { key: 'overdue', title: 'Vencidas' },
    { key: 'unpaid', title: 'No Pagadas' },
  ]);

 
  const { todayLoans, overdueLoans, unpaidLoans, selectedLoan } = useLoans();
  const {openSheet, actionSheetRef,detailActionSheetRef} = useSheet()
  const [paymentType, setPaymentType] = useState<string | null>(null);

  const handlePaymentSelection = (type: string) => {
    setPaymentType(type);
    actionSheetRef.current?.hide();
    detailActionSheetRef.current?.show();
  };

  const closeSheet = () => {
    actionSheetRef.current?.hide();
    detailActionSheetRef.current?.hide();
  };

  const renderScene = SceneMap({
    today: () => <LoanList loans={todayLoans} openSheet={openSheet} />,
    overdue: () => <LoanList loans={overdueLoans} openSheet={openSheet} />,
    unpaid: () => <LoanList loans={unpaidLoans} openSheet={openSheet} />,
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
      <PaymentOptions 
        actionSheetRef={actionSheetRef}
        handlePaymentSelection={handlePaymentSelection}
        closeSheet={closeSheet} 
        currentTab={routes[index].key}        
      />
      <PaymentDetails 
        detailActionSheetRef={detailActionSheetRef}
        paymentType={paymentType}
        selectedLoan={selectedLoan}
        closeSheet={closeSheet}
      />
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.darkBlue,
  },
});

export default BillScreens;

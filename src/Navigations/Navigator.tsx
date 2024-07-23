import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../Configs';
import Tabs from '../Components/Tab';
import CalculateScreen from '../Modules/loan/screens/CalculateScreen';
import {  LoanConfirmationScreen, LoanDetailsScreen, PersonSelectionScreen, WalletScreens } from '../Modules/loan/screens';
import CustomerScreens from '../Modules/customers/screens/CustomerScreens';
import LoanInfoScreens from '../Modules/loan/screens/LoanInfoScreens';
import BillScreens from '../Modules/loan/screens/BillScreens';
import PaymentScreens from '../Modules/payment/screens/PaymentScreens';


const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: COLORS.white
        }
      }}
    >
      <>
        <Stack.Screen name="HomeTabs" component={Tabs} />
        <Stack.Screen name="Calculate" component={CalculateScreen} />
        <Stack.Screen name="Wallet" component={WalletScreens} />
        <Stack.Screen name="Bill" component={BillScreens} />
        {/* <Stack.Screen name="Loan" component={LoanScreens} /> */}
        <Stack.Screen name="Customer" component={CustomerScreens} />
        <Stack.Screen name="Loan" component={PersonSelectionScreen} />
        <Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
        <Stack.Screen name="LoanConfirmation" component={LoanConfirmationScreen} />
        <Stack.Screen name="LoanInfo" component={LoanInfoScreens} />
        <Stack.Screen name="Pay" component={PaymentScreens} />


        
        {/* Ensure LoanDetails screen uses correct component and props */}
        {/* <Stack.Screen
          name='LoanDetails'
          component={<LoanDetailScreens route={undefined}/>}
         // Initialize with an empty loan
        /> */}
      </>
    </Stack.Navigator>
  );
};

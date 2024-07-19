/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useColorScheme} from 'react-native';
import {Navigator} from './src/Navigations/Navigator';
import { initializeDatabase } from './src/Configs/realmConfig';

const AppState = ({children}: any) => {
  useEffect(() => {
   initializeDatabase()
   console.log('Initializing')
  }, [])
  
  return (
    <>
      {/* // <AuthProvider> */}
      {/* <CustomerProvider> */}
      {children}
      {/* </CustomerProvider> */}
      {/* // </AuthProvider> */}
    </>
  );
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
}

export default App;

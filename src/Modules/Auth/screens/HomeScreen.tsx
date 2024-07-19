import { ActivityIndicator, FlatList, View } from 'react-native'
import React, { useState } from 'react'

import { LoadingScreen } from './LoadingScreen';
import { useLoanDetails } from '../../../hooks';


const HomeScreen = () => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { duesDetails, isLoading } = useLoanDetails();

  // console.log({ data:customerData})
  const handleItemPress = () => {
    setBottomSheetVisible(true);
    // Aquí puedes manejar la lógica para mostrar el Bottom Sheet
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
    // Aquí puedes manejar la lógica para cerrar el Bottom Sheet
  };

  return (


    <View style={{ flex: 1 }}>
      {/* <Header title='Cuotas' descripción='Lista de Cuotas Para el dia de hoy'/>
      {isLoading ? (
        <LoadingScreen/>
      ) : (
        <FlatList
          data={duesDetails}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={<View style={{ height: 8 }} />}
          ListFooterComponent={<View style={{ height: 28 }} />}
          renderItem={({ item }) => <DuesListItemView handleItemPress={handleItemPress} item={item} />}
        />
      )}
      <PaymentOptionsBottomSheet isVisible={bottomSheetVisible} onClose={handleCloseBottomSheet} /> */}
    </View>


  );
}



export default HomeScreen
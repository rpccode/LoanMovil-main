import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoadingScreen } from './LoadingScreen';
import { useCustomerData } from '../../../hooks';
import { Customer } from '../../../Configs';

const CustomerScreen = () => {
    // const { setCustomer} = useCustomer();
    const navigation = useNavigation();
    const isDarkMode = false;
    const { customerData, isLoading } = useCustomerData()
    const [isModalVisible, setModalVisible] = useState(false);
 

    if (isLoading) {
        return <LoadingScreen />
    }
    const handleCustomerPress = (customer:Customer) => {
        // setCustomer(customer)
        navigation.navigate('DetalleCliente' as never);
    };
    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
       <>
        <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
            {/* <Header title='Clientes' descripción='Lista de Clientes Registrados' /> */}
            <FlatList
                style={styles.list}
                data={customerData}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleCustomerPress(item)}>
                        {/* <CustomerItem item={item} /> */}
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.InfoId.toString()}
            />
            {/* Botón flotante */}
            <TouchableOpacity style={styles.floatingButton} onPress={toggleModal}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

            {/* Modal para el formulario */}
            {/* <ModalForm isVisible={isModalVisible} onClose={toggleModal} /> */}
        </View>
       
       
        
       
       </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    header: {
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
    },
    headerDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    list: {
        flex: 1,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8, // Sombra en Android
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
    },
});

export default CustomerScreen;

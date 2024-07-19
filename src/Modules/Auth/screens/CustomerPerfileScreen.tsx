import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

import { LoadingScreen } from './LoadingScreen';

const CustomerPerfileScreen = () => {
    // const { customer } = useCustomer();

    // if (!customer) {
    //     return (
    //         <View style={styles.container}>
    //             <LoadingScreen/>
    //         </View>
    //     );
    // }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* <View style={styles.container}>
                <Text style={styles.title}>Información del Cliente</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.text}>{customer.FirstName} {customer.LastName}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>DNI:</Text>
                    <Text style={styles.text}>{customer.DNI}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.text}>{customer.Email}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <Text style={styles.text}>{customer.Telefono}</Text>
                </View>
                {customer.loansWithDues && customer.loansWithDues.length > 0 && (
                    <View style={styles.loanContainer}>
                        <Text style={styles.title}>Préstamos</Text>
                        {customer.loansWithDues.map((loanWithDues: loanWhitDues, index: number) => (
                            <View key={index} style={styles.loanItem}>
                                <Text style={styles.loanTitle}>Préstamo {index + 1}</Text>
                                <Text style={styles.loanText}>Cantidad: {loanWithDues.loan.Amount}</Text>
                                <Text style={styles.loanText}>Fecha de inicio: {formatDate(loanWithDues.loan.Start_date)}</Text>
                                <Text style={styles.loanText}>Interés: {loanWithDues.loan.Interest}%</Text>
                                <Text style={styles.loanText}>Numero de Cuotas:{loanWithDues.loan.Dues}</Text>
                                <Text style={styles.loanText}>Cuotas:</Text>
                            </View>
                        ))}
                                <LoanDetailsTable loanDetails={customer.loansWithDues[0].dues}/>

                    </View>
                )}
            </View> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    infoContainer: {
        marginBottom: 15,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#555',
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    loanContainer: {
        marginTop: 20,
    },
    loanItem: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    loanTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    loanText: {
        marginBottom: 5,
        color: '#333',
    },
    dueItem: {
        marginLeft: 20,
        marginTop: 10,
        borderLeftWidth: 2,
        borderColor: '#ddd',
        paddingLeft: 10,
    },
    dueText: {
        marginBottom: 5,
        color: '#555',
    },
});

export default CustomerPerfileScreen

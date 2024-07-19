import React, { useContext } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../../../Configs';


export const ProtectedScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil de Usuario</Text>

            <Button 
                title="Cerrar Sesión"
                color="#5856D6"
                
            />

            <View style={styles.userInfo}>
                <Text style={styles.label}>Correo Electrónico:</Text>
                <Text></Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.label}>Token:</Text>
                <Text></Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.label}>ID de Usuario:</Text>
                <Text></Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.label}>Tipo de Usuario:</Text>
                <Text></Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.label}>Información del Cliente:</Text>
                <Text></Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    userInfo: {
        marginTop: 10,
        marginBottom: 20,
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5
    }
});
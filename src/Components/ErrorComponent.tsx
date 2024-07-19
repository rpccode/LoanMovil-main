import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../Configs';

interface ErrorComponentProps {
    message: string;
    onClose: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message, onClose }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:COLORS.coral,
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    message: {
        flex: 1,
        color: COLORS.red,
    },
    closeButton: {
        marginLeft: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: COLORS.red,
    },
    closeButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
});

export default ErrorComponent;

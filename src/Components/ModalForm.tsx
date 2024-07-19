import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../Configs'; // Asegúrate de que esta importación apunte al archivo correcto

const ModalForm = ({ isVisible, onClose, children }: { isVisible: boolean; onClose: () => void; children?: React.ReactNode }) => {
    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        {children}
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: COLORS.base, // Usando color de fondo desde COLORS
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        width: '90%',
        maxHeight: '90%',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.gray, // Usando color de borde desde COLORS
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    select: {
        borderWidth: 1,
        borderColor: COLORS.gray, // Usando color de borde desde COLORS
        borderRadius: 5,
        padding: 2,
        marginBottom: 10,
    },
    button: {
        backgroundColor: COLORS.darkRed, // Usando color de fondo desde COLORS
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: COLORS.white, // Usando color de texto desde COLORS
        fontSize: 16,
    },
    errorText: {
        color: COLORS.red, // Usando color de texto de error desde COLORS
        marginBottom: 5,
    },
});

export default ModalForm;

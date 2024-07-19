import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import usePaymentOptionsBottomSheet from '../../../hooks/usePaymentOptionsBottomSheet';
import { COLORS } from '../../../Configs';



interface PaymentOptionsBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
}

const PaymentOptionsBottomSheet: React.FC<PaymentOptionsBottomSheetProps> = ({ isVisible, onClose }) => {
    const {
        selectedOption,
        reasonForNonPayment,
        customAmount,
        duesDetails,
        handleOptionSelection,
        setCustomAmount,
        setReasonForNonPayment,
        handleReasonForNonPaymentChange,
        handleCustomAmountChange,
    } = usePaymentOptionsBottomSheet();

    const renderAdditionalOptions = () => {
        switch (selectedOption) {
            case 'Pagar cuota':
                return duesDetails && (
                    <View>
                        <Text>Detalles de la cuota a pagar:</Text>
                        <Text>LoanId: {duesDetails.LoanId}</Text>
                        <Text>Dues_num: {duesDetails.Dues_num}</Text>
                        <Text>Dues_amount: {duesDetails.Dues_amount}</Text>
                    </View>
                );
            case 'No pago':
                return (
                    <View>
                        <Text>Selecciona una razón por la cual no has pagado:</Text>
                        <Picker
                            selectedValue={reasonForNonPayment}
                            onValueChange={(itemValue) => setReasonForNonPayment(itemValue.toString())}
                        >
                            <Picker.Item label="Razón 1" value="Razón 1" />
                            <Picker.Item label="Razón 2" value="Razón 2" />
                        </Picker>
                    </View>
                );
            case 'Monto personalizado':
                return (
                    <View>
                        <Text>Ingresa un monto personalizado:</Text>
                        <TextInput
                            value={customAmount}
                            onChangeText={(text) => setCustomAmount(text)}
                            keyboardType="numeric"
                            placeholder="Monto"
                        />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.5}
            backdropColor={COLORS.black}
            style={{ margin: 0, justifyContent: 'flex-end' }}
        >
            <View style={{ backgroundColor: COLORS.white, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Opciones de Pago</Text>
                <TouchableOpacity onPress={() => handleOptionSelection('Pagar cuota')}>
                    <Text style={{ fontSize: 16, marginBottom: 15 }}>Pagar Cuota</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionSelection('No pago')}>
                    <Text style={{ fontSize: 16, marginBottom: 15 }}>No Pago</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionSelection('Monto personalizado')}>
                    <Text style={{ fontSize: 16 }}>Monto Personalizado Cuota</Text>
                </TouchableOpacity>

                {/* Mostrar opciones adicionales según la selección */}
                {selectedOption && renderAdditionalOptions()}
            </View>
        </Modal>
    );
};

export default PaymentOptionsBottomSheet;

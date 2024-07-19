import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../Configs';
import ModalForm from '../../../Components/ModalForm';
import CustomerForm from './CustomerForm';

interface CustomerModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  isModalVisible,
  setIsModalVisible,
}) => {
  return (
    <ModalForm isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
     <CustomerForm/>
   
    </ModalForm>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.darkBlue,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    marginBottom: 10,
    color: COLORS.darkBlue,
  },
  modalAddButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default CustomerModal;

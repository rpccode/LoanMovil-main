import { useRef } from 'react';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { IDetallePrestamo, loanInfo } from '../Configs/interfaces';
import { useLoans } from './useLoans';

type ActionSheet = {
  show: () => void;
  hide: () => void;
  options: string[];
  cancelButtonIndex: number;
  destructiveButtonIndex: number;
  title: string;
  onPress: (index: number) => void;
  cancelButtonTitle: string;
  destructiveButtonTitle: string;
  getButtonIndex: () => number;
  showModal: () => void;
};

type SheetProp = {
  loan: loanInfo;
  setSelectedLoan?: (loan: loanInfo) => void;
};

export default function useSheet() {
  const {setSelectedLoan} = useLoans()
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const detailActionSheetRef = useRef<ActionSheetRef>(null);

  const openSheet = (loan: loanInfo) => {
    if (setSelectedLoan) {
      setSelectedLoan(loan);
    }
    actionSheetRef.current?.show();
  };

  return {
    openSheet,
    actionSheetRef,
    detailActionSheetRef
  };
}

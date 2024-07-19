import { useEffect, useState } from 'react';

interface DuesDetails {
    LoanId: number;
    Dues_num: number;
    Dues_amount: number;
}

const usePaymentOptionsBottomSheet = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [reasonForNonPayment, setReasonForNonPayment] = useState<string>('');
    const [customAmount, setCustomAmount] = useState<string>('');
    const [duesDetails, setDuesDetails] = useState<DuesDetails | null>(null);

    useEffect(() => {
        if (selectedOption === 'Pagar cuota') {
            fetchDuesDetails(); // Solo si se selecciona 'Pagar cuota'
        }
    }, [selectedOption]);

    const fetchDuesDetails = async () => {
        try {
            // Simular una llamada de API
            const duesDetailsResponse: DuesDetails = {
                LoanId: 123,
                Dues_num: 1,
                Dues_amount: 100,
            };
            setDuesDetails(duesDetailsResponse);
        } catch (error) {
            console.error('Error fetching dues details:', error);
        }
    };

    const handleOptionSelection = (option: string) => {
        setSelectedOption(option);
        setReasonForNonPayment('');
        setCustomAmount('');
    };

    const handleReasonForNonPaymentChange = (value: string) => {
        setReasonForNonPayment(value);
    };

    const handleCustomAmountChange = (value: string) => {
        setCustomAmount(value);
    };

    return {
        selectedOption,
        reasonForNonPayment,
        setReasonForNonPayment,
        customAmount,
        setCustomAmount,
        duesDetails,
        handleOptionSelection,
        handleReasonForNonPaymentChange,
        handleCustomAmountChange,
    };
};

export default usePaymentOptionsBottomSheet;

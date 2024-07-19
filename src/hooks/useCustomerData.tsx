import { useEffect, useState } from "react";
import { Customer, loanWhitDues } from "../interfaces";
import { getAllCustomers, getAllCustomersWithActiveLoansToday, getAllCustomersWithLoansAndDues } from "../api/customerServices";

// Hook personalizado para carga de datos
export const useCustomerData = () => {
    const [customerData, setCustomerData] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // const dataFromDB = await getAllCustomersWithLoansAndDues();
                const dataFromDB = await getAllCustomersWithActiveLoansToday()
                // console.log(dataFromDB)
                setCustomerData(dataFromDB);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    return { customerData, isLoading };
};

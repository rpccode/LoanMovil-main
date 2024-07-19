import { useEffect, useState } from 'react';
import { getAllLoanDetaill } from '../api/loanDetaillServices';
import { LoanDetail, loanWhitDues } from '../interfaces';
import { getAllLoan } from '../api/loanServices';

export const useLoanDetails = () => {
  const [duesDetails, setDuesDetails] = useState<LoanDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loanFromDB:loanWhitDues[] =await getAllLoan();
        // console.log(loanFromDB)
        const duesFromDB = await getAllLoanDetaill();
        setDuesDetails(duesFromDB);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { duesDetails, isLoading };
};



import { RouteProp } from '@react-navigation/native';

export type Payment = {
  amount: string;
  date: string;
};

export type Amortization = {
  principal: string;
  interest: string;
  balance: string;
};

export type Loan = {
  name: string;
  loan_amount: string;
  interest_rate: number;
  total_interest: string;
  outstanding_balance: string;
  payments: Payment[];
  amortization: Amortization[];
};

export type LoanDetailScreensProps = {
  route: RouteProp<{
    LoanDetails: {
      loan: Loan;
    };
  }, 'LoanDetails'>;
};

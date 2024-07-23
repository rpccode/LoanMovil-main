import uuid from 'react-native-uuid';

interface ClientLoanCounter {
[clientCode: string]: number;
}

const clientLoanCounters: ClientLoanCounter = {};

// Formato: 000-0000000-0
function formatPhoneNumber(number: string ) {
    if (!number) return ''; 
    return number.replace(/(\d{3})(\d{7})(\d{1})/, "$1-$2-$3");
}

// Formato: 000-0000-000
function formatID(number: string) {
    if (!number) return ''; 
    return number.replace(/(\d{3})(\d{4})(\d{3})/, "$1-$2-$3");
}

const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'DOP',
    });
  };

  function generateLoanNumber(prefix: string, loanCounter:number): string {
    loanCounter += 1;
    const sequentialNumber = loanCounter.toString().padStart(4, '0');
    return `${prefix}-${sequentialNumber}`;
  }

function generateClientLoanNumber(clientCode: string): string {
  if (!clientLoanCounters[clientCode]) {
    clientLoanCounters[clientCode] = 0;
  }

  clientLoanCounters[clientCode] += 1;
  const sequentialNumber = clientLoanCounters[clientCode].toString().padStart(4, '0');
  return `${clientCode}-${sequentialNumber}`;
}

function generateNewClientCode(): string {
  return `CUST${uuid.v4().toString().slice(0, 8).toUpperCase()}`;
}



export{
    formatPhoneNumber,
    formatID,
    formatCurrency,
    generateLoanNumber,
    generateClientLoanNumber,
    generateNewClientCode
}
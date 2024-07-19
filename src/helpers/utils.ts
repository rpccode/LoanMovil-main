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
    return value.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'DOP',
    });
  };




export{
    formatPhoneNumber,
    formatID,
    formatCurrency
}
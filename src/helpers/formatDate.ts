const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Se agrega 1 porque los meses comienzan desde 0
    const year = date.getFullYear();

    // Agregar ceros delante si es necesario para mantener el formato (por ejemplo, "01" en lugar de "1")
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
};

export default formatDate
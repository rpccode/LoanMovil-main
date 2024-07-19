// Función para verificar la conectividad a Internet
export const checkApiAvailability = async () => {
    try {
        const response = await fetch('URL_DE_TU_API_AQUI');
        return response.ok; // Devuelve true si la respuesta es exitosa (código de estado 2xx), false de lo contrario
    } catch (error) {
        console.error('Error al verificar la disponibilidad de la API:', error);
        return false;
    }
};




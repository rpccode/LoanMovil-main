import NetInfo from '@react-native-community/netinfo';

// Función para verificar la conectividad a Internet
export const checkInternetConnectivity = async () => {
    try {
        const state = await NetInfo.fetch();
        return state.isConnected;
    } catch (error) {
        console.error('Error al verificar la conectividad a Internet:', error);
        return false;
    }
};
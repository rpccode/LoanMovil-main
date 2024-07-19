import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";

const baseURL = 'http://appoffline-api-main-production.up.railway.app/api'

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    timeout:10000,
    headers:{
        'Content-Type':'application/json'
    }
})


axiosInstance.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if ( token ) {
            config.headers['authorization'] = token;
        }
        return config;
    }
);

export const setAuthToken = (token:string) =>{
    axiosInstance.defaults.headers['authorization'] =token
}

export default {
    axiosInstance,
    setAuthToken
}
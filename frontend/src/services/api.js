import axios from 'axios';
import { PRODUCT_API_END_POINT } from './constants';

const api = axios.create({
    baseURL: PRODUCT_API_END_POINT,
    // withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const currentPath = window.location.pathname;
            if (currentPath !== '/') {
                console.log('response 401');
            }
        }
        return Promise.reject(error);
    }
);

export default api;

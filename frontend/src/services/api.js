import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000/v1/api",
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

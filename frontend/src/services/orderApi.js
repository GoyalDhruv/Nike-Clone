import { ORDER_API_END_POINT } from './constants';
import api from "./api";
import { getTokenFromLocalStorage } from "../utils/utils";


export const createOrder = async (data) => {
    const response = await api.post(`${ORDER_API_END_POINT}/createOrder`, data,
        {
            headers: {
                "Authorization": `Bearer ${getTokenFromLocalStorage()}`
            }
        }
    );
    return response.data;
};

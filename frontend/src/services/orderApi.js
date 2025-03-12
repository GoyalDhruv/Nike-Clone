import { ORDER_API_END_POINT } from './constants';
import api from "./api";
import { getItemFromLocalStorage } from "../utils/utils";
const token = getItemFromLocalStorage()?.token;


export const createOrder = async (data) => {
    const response = await api.post(`${ORDER_API_END_POINT}/createOrder`, data,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
    return response.data;
};

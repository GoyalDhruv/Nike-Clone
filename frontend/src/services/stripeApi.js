import { STRIPE_API_END_POINT } from './constants';
import api from "./api";

export const createCheckoutSession = async (data) => {
    const response = await api.post(`${STRIPE_API_END_POINT}/create-checkout-session`, {
        products: data,
    });
    return response.data;
};

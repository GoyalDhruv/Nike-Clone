import { STRIPE_API_END_POINT } from './constants';
import api from "./api";

export const createCheckoutSession = async (data, email) => {
    const response = await api.post(`${STRIPE_API_END_POINT}/create-checkout-session`, {
        products: data,
        email: email,
    });
    return response.data;
};

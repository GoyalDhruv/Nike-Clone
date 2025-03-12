import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../services/orderApi';
import { setCart } from '../store/slices/cartSlice';
import { clearCart } from '../services/cartApi';

function PaymentSuccess() {

    const cartData = JSON.parse(sessionStorage.getItem("cart_items"));
    const grandTotal = JSON.parse(sessionStorage.getItem("cart_total_price"));
    const dispatch = useDispatch();

    const { mutate: createCurrentOrder } = useMutation({
        mutationFn: async () => {
            return await createOrder({ products: cartData, totalAmount: grandTotal })
        },
        onSuccess: async () => {
            sessionStorage.removeItem("cart_items");
            sessionStorage.removeItem("cart_total_price");

            try {
                await clearCart();
                dispatch(setCart([]));
            } catch (error) {
                console.error("Failed to clear cart:", error);
            }
        },
        onError: (error) => {
            console.error("Failed to create order:", error);
        }
    });

    useEffect(() => {
        if (cartData && cartData.length > 0) {
            createCurrentOrder();
        }
    }, []);

    const navigate = useNavigate();
    return (
        <div className='text-2xl h-96 flex flex-col items-center justify-center tracking-tight font-semibold'>
            <p>Your order has been successfully completed.</p>
            <p>Thank you for shopping with us!</p>
            <button className='black-btn mt-5 text-sm' onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
    )
}

export default PaymentSuccess
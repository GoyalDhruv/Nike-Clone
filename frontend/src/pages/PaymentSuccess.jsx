import React from 'react'
import { useNavigate } from 'react-router-dom'

function PaymentSuccess() {

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
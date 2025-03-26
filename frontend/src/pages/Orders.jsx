import React from 'react'
import CustomContainer from '../layouts/CustomContainer'
import { useSelector } from 'react-redux';
import { getDate, getTimeInIST, isLoggedIn } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, getOrderById } from '../services/orderApi';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader/Loader';
import OrderDetailRow from '../components/Orders/OrderDetailRow';
import OrderForm from '../components/Orders/OrderForm';

function Orders() {

    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const loggedIn = isLoggedIn(user);

    const { data: orderData, isLoading } = useQuery({
        queryKey: ['allOrders'],
        queryFn: () => getAllOrders(),
        enabled: loggedIn,
    });

    const handleNavigation = (id, email) => {
        navigate(`/orders/${id}`, {
            state: { email }
        });
    }

    const mutation = useMutation({
        mutationFn: (params) => getOrderById(params.orderNo, params.email),
        onSuccess: (data, variables) => {
            if (data.success) {
                handleNavigation(data.order._id, variables.email);
            } else {
                toast.error(data.message || 'Failed to retrieve the order status.');
            }
        },
        onError: (err) => {
            console.error('Error retrieving order:', err);
            toast.error('Failed to retrieve the order status. Please try again later.');
        },
    });

    const handleFormSubmit = async (values, { resetForm }) => {
        mutation.mutate({ orderNo: values.orderNo, email: values.email });
        resetForm();
    };

    return (
        <CustomContainer customClass={"xl:mx-40 lg:mx-12"}>
            {!loggedIn ?
                <>
                    <CustomContainer customClass={"xl:mx-80 lg:mx-12 py-10"}>
                        <h1 className='section-heading'>View Your Order</h1>
                        <p className='m-0'>To check the status of your order, please enter your order number and email address.</p>
                        <OrderForm onSubmit={handleFormSubmit} />
                    </CustomContainer>
                </>
                :
                <>
                    <h1 className='section-heading'>Your Orders</h1>
                    {isLoading ?
                        <Loader />
                        :
                        orderData?.orders?.length > 0 ? (
                            orderData.orders.map((item) => (
                                <div key={item._id} className='my-10 border p-3 rounded-3xl'>
                                    <OrderDetailRow
                                        label="Order ID"
                                        value={item?.orderId}
                                        customClass='mt-2'
                                    />
                                    <OrderDetailRow
                                        label="Payment ID"
                                        value={item?.paymentId}
                                        customClass='mt-2'
                                    />
                                    <OrderDetailRow
                                        label="Total Amount"
                                        value={`₹ ${item?.totalAmount}`}
                                        customClass='mt-2'
                                    />
                                    <OrderDetailRow
                                        label="Order Date"
                                        value={getDate(item?.createdAt)}
                                        customClass='mt-2'
                                    />
                                    <OrderDetailRow
                                        label="Order Time"
                                        value={getTimeInIST(item?.createdAt)}
                                        customClass='mt-2'
                                    />
                                    <div className='flex justify-center'>
                                        <button
                                            className='white-btn text-sm'
                                            onClick={() => handleNavigation(item?._id, item?.user?.email)}
                                        >
                                            View Order Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) :
                            <p className='text-lg font-bold text-center'>No orders found.</p>
                    }
                </>
            }
        </CustomContainer>
    )
}

export default Orders;
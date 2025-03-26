import React from 'react'
import CustomContainer from '../layouts/CustomContainer'
import { getDate, getTimeInIST } from '../utils/utils';
import { useLocation, useParams } from 'react-router-dom';
import { getOrderById } from '../services/orderApi';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader/Loader';
import OrderDetailRow from '../components/Orders/OrderDetailRow';

function IndividualOrder() {
    const { orderId } = useParams()
    const location = useLocation();
    const { email } = location.state;

    const { data: orderData, isLoading } = useQuery({
        queryKey: ['orders', orderId, email],
        queryFn: () => getOrderById(orderId, email),
    });

    return (
        <>
            {
                isLoading ?
                    <Loader /> :
                    <CustomContainer customClass={"xl:mx-40 lg:mx-12"}>
                        <div className='py-10'>
                            <h1 className='section-heading'>Orders</h1>
                            <div className="grid grid-cols-12 xl:gap-20 md:gap-8 gap-4">
                                <div className='lg:col-span-4 col-span-12'>
                                    <h2 className="text-lg font-bold border-b border-bgPrimary pb-2">Ordered Items</h2>
                                    {orderData?.order?.products?.map((item) => (
                                        <div key={item._id} className='flex gap-2 mb-3 mt-4'>
                                            <img
                                                src={item?.image}
                                                alt="cover img"
                                                className="aspect-square rounded-md bg-gray-200 object-cover w-40 h-40"
                                            />
                                            <div className="mt-4">
                                                <h3 className="text-md font-semibold tracking-tight">
                                                    {item?.title}
                                                    <p className="text-md text-textPrimary font-semibold capitalize">{item?.color}</p>
                                                </h3>
                                                <p className="text-md font-semibold mt-2">
                                                    <span className='text-dark'>₹{item?.discountedPrice || item?.price}</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='lg:col-span-4 md:col-span-6 col-span-12 md:mt-0 mt-5'>
                                    <h2 className="text-lg font-bold border-b border-bgPrimary pb-2">User Details</h2>
                                    <OrderDetailRow
                                        label="Name"
                                        value={`${orderData?.order?.user?.firstName} ${orderData?.order?.user?.lastName}`}
                                        customClass="mt-2"
                                    />
                                    <OrderDetailRow
                                        label="Email"
                                        value={orderData?.order?.user?.email}
                                    />
                                </div>
                                <div className='lg:col-span-4 md:col-span-6 col-span-12 md:mt-0 mt-5'>
                                    <h2 className="text-lg font-bold border-b border-bgPrimary pb-2">Summary</h2>
                                    <OrderDetailRow
                                        label="Order Date"
                                        value={getDate(orderData?.order?.createdAt)}
                                        customClass="mt-2"
                                    />
                                    <OrderDetailRow
                                        label="Order Time"
                                        value={getTimeInIST(orderData?.order?.createdAt)}
                                    />
                                    <OrderDetailRow
                                        label="Order ID"
                                        value={orderData?.order?.orderId}
                                        customClass='mt-2 pt-2 border-t border-bgPrimary'
                                    />
                                    <OrderDetailRow
                                        label="Payment ID"
                                        value={orderData?.order?.paymentId}
                                    />
                                    <OrderDetailRow
                                        label="Total"
                                        value={`₹ ${orderData?.order?.totalAmount}`}
                                        customClass='border-t border-b mt-2 py-2 border-bgPrimary'
                                    />
                                </div>
                            </div>
                        </div>
                    </CustomContainer>
            }
        </>
    )
}

export default IndividualOrder;
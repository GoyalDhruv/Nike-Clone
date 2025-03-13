import React, { useEffect, useState } from 'react'
import CustomContainer from '../layouts/CustomContainer'
import Images from '../constants/imageConstant'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToCart, deleteCartItem, getCart } from '../services/cartApi';
import Loader from '../components/Loader/Loader';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCart } from '../store/slices/cartSlice';
import { createCheckoutSession } from '../services/stripeApi';

// Add and remove from favorites in cart page pending

function Cart() {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [quantities, setQuantities] = useState({});
    const { isLoading, data } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
    });

    useEffect(() => {
        if (data) {
            dispatch(setCart(data?.cartItems));
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (data?.cartItems) {
            sessionStorage.setItem('cart_items', JSON.stringify(data.cartItems));
        }
        if (data?.grandTotalPrice) {
            sessionStorage.setItem('cart_total_price', JSON.stringify(data.grandTotalPrice));
        }
        if (data) {
            const initialQuantities = data?.cartItems?.reduce((acc, item) => {
                const productKey = `${item.product}-${item.color}`;
                acc[productKey] = item.quantity;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [data])

    const addtoCartMutation = useMutation(
        {
            mutationFn: (params) => addToCart(params.product, params.data),
            onSuccess: () => {
                toast.success('Cart Updated Successfully');
                queryClient.invalidateQueries(['cart']);
            },
            onError: (error) => {
                console.error('Error updating cart:', error);
            }
        }
    );

    const handleQuantityChange = (item, action) => {
        const product = item?.product;
        const size = item?.size;
        const color = item?.color;
        const productKey = `${product}-${color}`;
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[productKey] || 1;

            const newQuantity = action === 'increment'
                ? currentQuantity + 1
                : Math.max(currentQuantity - 1, 1);

            return { ...prevQuantities, [productKey]: newQuantity };
        });

        const data = {
            color,
            size,
            quantity: action === 'increment' ? (quantities[productKey] + 1) : Math.max(quantities[productKey] - 1, 1),
        };

        addtoCartMutation.mutate({ product, data });
    };

    const removeFromCartMutation = useMutation(
        {
            mutationFn: (params) => deleteCartItem(params.id, params.color),
            onSuccess: () => {
                toast.success('Item Removed From Cart Successfully');
                queryClient.invalidateQueries(['cart']);
            },
            onError: (error) => {
                console.error('Error updating cart:', error);
            }
        }
    )

    const handleRemove = (item) => {
        const id = item?._id;
        const product = item?.product;
        const color = item?.color;
        const productKey = `${product}-${color}`;
        setQuantities((prevQuantities) => {
            return { ...prevQuantities, [productKey]: 0 };
        });

        removeFromCartMutation.mutate({ id, color });
    }

    const handleCheckout = async () => {
        try {
            const session = await createCheckoutSession(data?.cartItems);
            if (session?.url) {
                window.location.href = session.url;
            } else {
                toast.error("Invalid checkout URL");
            }
        } catch (error) {
            toast.error("Failed to initiate checkout. Please try again.");
            console.error("Checkout error:", error);
        }
    };

    return (
        <>
            {isLoading ?
                <Loader />
                :
                <CustomContainer customClass={"xl:mx-40 lg:mx-12"}>
                    <div className="py-12">
                        {
                            !data?.cartItems?.length ?
                                <>
                                    <h1 className="section-heading">Bag</h1>
                                    <p className='text-xl font-semibold text-textSecondary'>Your bag is empty.</p>
                                </>
                                :
                                <div className='grid grid-cols-12 xl:gap-10'>
                                    <div className='xl:col-span-6 col-span-12'>
                                        <h1 className="section-heading">Bag</h1>
                                        {data?.cartItems?.map((item, index) => {
                                            const productKey = `${item.product}-${item.color}`;
                                            const itemQuantity = quantities[productKey] || item.quantity;
                                            return (
                                                <div className='card mt-3' key={index}>
                                                    <div className='flex justify-between'>
                                                        <div className='flex gap-3'>
                                                            <img src={item?.image} alt="shoes" className='size-40'
                                                                loading="lazy" />
                                                            <div>
                                                                <div className='sm:hidden block'>
                                                                    <p className='font-medium tracking-tight text-textPrimary'>MRP: ₹ {item?.totalPrice}</p>
                                                                    <p className='font-semibold tracking-tight text-lg'>
                                                                        ₹ {item?.discountedPrice}
                                                                    </p>
                                                                </div>
                                                                <h4 className='text-lg font-semibold tracking-tight'>{item?.title}</h4>
                                                                <p className='capitalize text-textPrimary font-medium'>
                                                                    Men&apos;s Shoes
                                                                </p>
                                                                <p className='capitalize text-textPrimary font-medium'>
                                                                    {item?.color}
                                                                </p>
                                                                <p className='capitalize text-textPrimary font-medium'>
                                                                    Size {item?.size}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='sm:flex gap-4 hidden'>
                                                            <span className='font-medium tracking-tight text-textPrimary'>MRP: ₹ {item?.totalPrice}</span>
                                                            <span className='font-semibold tracking-tight'>
                                                                ₹ {item?.discountedPrice}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className='mt-3 flex gap-2'>
                                                        <div className="flex items-center max-w-[7rem] border rounded-full">
                                                            {itemQuantity <= 1 ?
                                                                <button className="bg-white px-3 rounded-full h-full"
                                                                >
                                                                    <img src={Images.Delete} alt="Delete" className='w-16' onClick={() => handleRemove(item)} />
                                                                </button> :
                                                                <button className="bg-white border border-white hover:border-[#e5e7eb] px-3 rounded-full h-full"
                                                                    onClick={() => handleQuantityChange(item, 'decrement')}
                                                                >
                                                                    <img src={Images.Minus} alt="Minus" className='w-16' />
                                                                </button>
                                                            }
                                                            <input type="text" id="quantity-input" value={itemQuantity} className=" text-center text-black text-sm w-full bg-white" disabled />
                                                            <button className="bg-white border border-white hover:border-[#e5e7eb] px-3 rounded-full h-full"
                                                                onClick={() => handleQuantityChange(item, 'increment')}
                                                            >
                                                                <img src={Images.Plus} alt="Plus" className='w-16' />
                                                            </button>
                                                        </div>

                                                        <img src={Images.Favorite} alt="Favorite" className='size-10 border rounded-full p-2' />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='xl:col-span-5 xl:col-start-8 col-span-12 xl:mt-0 mt-5'>
                                        <h1 className="section-heading">Summary</h1>
                                        <div className="flex items-center justify-between mb-6 border-t border-b py-3">
                                            <span className="font-medium text-lg ">Total</span>
                                            <span className="font-medium text-lg">₹ {data?.grandTotalPrice}</span>
                                        </div>
                                        <button className="w-full py-3 black-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                                    </div>
                                </div>
                        }
                    </div>
                </CustomContainer>
            }
        </>
    )
}

export default Cart
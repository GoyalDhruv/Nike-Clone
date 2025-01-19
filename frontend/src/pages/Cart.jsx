import React, { useState } from 'react'
import CustomContainer from '../layouts/CustomContainer'
import Images from '../constants/imageConstant'

function Cart() {

    const [quantity, setQuantity] = useState(1)

    return (
        <CustomContainer customClass={"xl:mx-40 lg:mx-12"}>
            <div className="py-12">
                <div className='grid grid-cols-12 xl:gap-10'>
                    <div className='xl:col-span-6 col-span-12'>
                        <h1 className="section-heading">Bag</h1>
                        <div className='card'>
                            <div className='flex justify-between'>
                                <div className='flex gap-3'>
                                    <img src={Images.Shoe1} alt="shoes" className='size-40' />
                                    <div>
                                        <div className='sm:hidden block'>
                                            <p className='font-medium tracking-tight text-textPrimary'>MRP: ₹ 120000</p>
                                            <p className='font-semibold tracking-tight text-lg'>
                                                ₹ 10000
                                            </p>
                                        </div>
                                        <h4 className='text-lg font-semibold tracking-tight'>Nike Air Max</h4>
                                        <p className='capitalize text-textPrimary font-medium'>
                                            Men&apos;s Shoes
                                        </p>
                                        <p className='capitalize text-textPrimary font-medium'>
                                            White
                                        </p>
                                        <p className='capitalize text-textPrimary font-medium'>
                                            Size 7
                                        </p>
                                    </div>
                                </div>
                                <div className='sm:flex gap-4 hidden'>
                                    <span className='font-medium tracking-tight text-textPrimary'>MRP: ₹ 120000</span>
                                    <span className='font-semibold tracking-tight'>
                                        ₹ 10000
                                    </span>
                                </div>
                            </div>
                            <div className='mt-3 flex gap-2'>
                                <div className="flex items-center max-w-[7rem] border rounded-full">
                                    {quantity <= 1 ?
                                        <button className="bg-white px-3 rounded-full h-full"
                                        >
                                            <img src={Images.Delete} alt="minus" className='w-16' />
                                        </button> :
                                        <button className="bg-white border border-white hover:border-[#e5e7eb] px-3 rounded-full h-full"
                                            onClick={() => setQuantity(prev => prev - 1)}
                                        >
                                            <img src={Images.Minus} alt="minus" className='w-16' />
                                        </button>
                                    }
                                    <input type="text" id="quantity-input" value={quantity} className=" text-center text-black text-sm w-full bg-white" disabled />
                                    <button className="bg-white border border-white hover:border-[#e5e7eb] px-3 rounded-full h-full" onClick={() => setQuantity(prev => prev + 1)}
                                    >
                                        <img src={Images.Plus} alt="plus" className='w-16' />
                                    </button>
                                </div>

                                <img src={Images.Favorite} alt="Favorite" className='size-10 border rounded-full p-2' />
                            </div>
                        </div>
                    </div>
                    <div className='xl:col-span-5 xl:col-start-8 col-span-12 xl:mt-0 mt-5'>
                        <h1 className="section-heading">Summary</h1>
                        <div className="flex items-center justify-between mb-6 border-t border-b py-3">
                            <span className="font-medium text-lg ">Total</span>
                            <span className="font-medium text-lg">$100.00</span>
                        </div>
                        <button className="w-full py-3 black-btn">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </CustomContainer>
    )
}

export default Cart
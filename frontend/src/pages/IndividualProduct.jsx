import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../services/productApi';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import CustomContainer from '../layouts/CustomContainer';
import Images from '../constants/imageConstant';
import ProductDetails from '../components/ProductById/ProductDetails';

function IndividualProduct() {
    const { id } = useParams();
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedSize, setSelectedSize] = useState('')

    const { isLoading, data } = useQuery({
        queryKey: ['product', { id }],
        queryFn: getProductById,
    });

    useEffect(() => {
        if (data?.data?.variants?.length > 0) {
            const firstVariant = data.data.variants[0];
            setSelectedVariant(firstVariant);
        }
    }, [data]);

    const handleColorSelect = (color) => {
        const variant = data?.data?.variants?.find(item => item.color === color);
        setSelectedVariant(variant);
    };

    return (
        <>
            {isLoading ?
                <Loader /> :
                <CustomContainer customClass={'lg:mx-48 mx-30 mb-20'}>
                    <div className='grid grid-cols-12'>
                        {/* Variant Images */}
                        <div className="lg:col-span-1 col-span-2 hidden lg:block">
                            {selectedVariant?.images?.map((item, index) => (
                                <div key={index} className="mb-3">
                                    <img
                                        className="h-20 w-20 rounded-md cursor-pointer"
                                        src={item}
                                        alt={`Variant Image ${index}`}
                                        loading="lazy"
                                        onMouseEnter={() => setSelectedVariant((prev) => ({ ...prev, coverImg: item }))}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='col-span-12 lg:ps-8 lg:mt-0 my-10 block lg:hidden'>
                            <ProductDetails data={data} />
                        </div>

                        {/* Main Image */}
                        <div className='lg:col-span-5 col-span-12'>
                            <img
                                src={selectedVariant?.coverImg || selectedVariant?.images?.[0]}
                                className='rounded-md'
                                alt="Selected Variant"
                            />
                        </div>

                        {/* Product Details */}
                        <div className='lg:col-span-6 col-span-12 lg:ps-8 lg:mt-0 mt-10'>
                            <div className='lg:block hidden'>
                                <ProductDetails data={data} />
                            </div>
                            <div className="flex gap-3 mt-3">
                                {data?.data?.variants?.map((variant) => (
                                    <img
                                        key={variant.color}
                                        src={variant.coverImg}
                                        alt={`Variant ${variant.color}`}
                                        className={`h-28 w-28 rounded-md cursor-pointer ${selectedVariant?.color === variant.color ? 'border-2 border-[#dedede]' : ''}`}
                                        onClick={() => handleColorSelect(variant.color)}
                                    />
                                ))}
                            </div>
                            <div>
                                <p className='font-md font-semibold mt-8'>Select Size</p>
                                <div className='grid grid-cols-4 gap-3 mt-3'>
                                    {selectedVariant?.size?.map((size) => (
                                        <div
                                            key={size}
                                            className={`py-2 rounded text-center border ${selectedSize?.includes(size) ? 'border-black ' : 'border-[#E5E5E5]'} hover:border-black transition-all duration-300`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            <input
                                                value={size}
                                                checked={selectedSize?.includes(size)}
                                                onChange={() => setSelectedSize(size)}
                                                id={`filter-size-${size}`}
                                                type="checkbox"
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor={`filter-size-${size}`}
                                                className="text-md font-medium w-full"
                                            >
                                                {size}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className='w-full py-5 btn black-btn mt-4'>Add to bag</button>
                            <button className='w-full py-5 btn white-btn mt-4 flex justify-center items-center gap-1'>
                                <span>Favourite</span>
                                <img src={Images.Favorite} alt="Favorite" className='w-6 h-6' />
                            </button>
                            <div className='mt-8 font-semibold text-md'>{data?.data?.details}</div>
                        </div>
                    </div>
                </CustomContainer>
            }
        </>
    );
}

export default IndividualProduct;

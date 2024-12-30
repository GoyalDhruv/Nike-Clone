import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../services/productApi';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import CustomContainer from '../layouts/CustomContainer';
import Images from '../constants/imageConstant';
import ProductDetails from '../components/ProductById/ProductDetails';
import { Field, Radio, RadioGroup } from '@headlessui/react';
import { clothesSizeFilter, shoeSizeFilter } from '../constants/filterData';
import CustomDisclosure from '../components/Disclosure/CustomDisclosure';

function IndividualProduct() {
    const { id } = useParams();
    const [allSize, setAllSize] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedSize, setSelectedSize] = useState('')

    const { isLoading, data } = useQuery({
        queryKey: ['product', { id }],
        queryFn: getProductById,
    });

    useEffect(() => {
        if (data?.data?.variants?.length > 0) {
            if (data?.data?.category === 'shoes') {
                setAllSize(shoeSizeFilter)
            }
            else {
                setAllSize(clothesSizeFilter)
            }
            const firstVariant = data.data.variants[0];
            setSelectedVariant(firstVariant);
        }
    }, [data]);

    const handleColorSelect = (color) => {
        const variant = data?.data?.variants?.find(item => item.color === color);
        setSelectedVariant(variant);
        setSelectedSize('')
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
                                        className={`h-28 w-28 rounded-md cursor-pointer ${selectedVariant?.color === variant.color ? 'border-2 border-black' : ''}`}
                                        onClick={() => handleColorSelect(variant.color)}
                                    />
                                ))}
                            </div>
                            <div className="mt-10">
                                <p className='font-md font-semibold mt-8'>Select Size</p>

                                <Field className="mt-4">
                                    <RadioGroup
                                        value={selectedSize}
                                        onChange={setSelectedSize}
                                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                    >
                                        {allSize?.map((size) => {
                                            const isSizeAvailable = selectedVariant?.size?.includes(size.value);
                                            return (
                                                <Radio
                                                    key={size?.value}
                                                    value={size?.value}
                                                    disabled={!isSizeAvailable}
                                                    className={`${isSizeAvailable
                                                        ? 'cursor-pointer bg-white shadow-sm'
                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200'
                                                        } group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none  sm:flex-1 sm:py-6`}
                                                >
                                                    <span>{size?.value}</span>
                                                    {isSizeAvailable ? (
                                                        <span
                                                            className="pointer-events-none absolute -inset-px rounded-md group-data-[focus]:border-[#dedede] border-2 group-data-[checked]:border-black"
                                                        />
                                                    ) : (
                                                        <span
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-[#dedede]"
                                                        >
                                                            <svg
                                                                stroke="currentColor"
                                                                viewBox="0 0 100 100"
                                                                preserveAspectRatio="none"
                                                                className="absolute inset-0 size-full stroke-2 text-[#dedede]"
                                                            >
                                                                <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </Radio>
                                            );
                                        })}
                                    </RadioGroup>
                                </Field>
                            </div>
                            <button className='w-full py-5 btn black-btn mt-4'>Add to bag</button>
                            <button className='w-full py-5 btn white-btn mt-4 flex justify-center items-center gap-1'>
                                <span>Favourite</span>
                                <img src={Images.Favorite} alt="Favorite" className='w-6 h-6' />
                            </button>
                            <div className='mt-8 font-semibold text-md'>{data?.data?.details}</div>

                            <div className='mt-5'>
                                <CustomDisclosure
                                    title={'Delivery and Returns'}
                                    disclosureBody={
                                        <div className='text-md font-medium tracking-tight'>
                                            <p className='my-1'>All purchases are subject to delivery fees.</p>
                                            <p className='my-2'>Standard delivery 4–9 business days</p>
                                            <p className='my-1'>Orders are processed and delivered Monday–Friday (excluding public holidays)</p>
                                        </div>
                                    }
                                />
                            </div>
                            <div>
                                <CustomDisclosure
                                    title={'Reviews'}
                                    disclosureBody={
                                        <div>Rating and Reviews</div>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </CustomContainer>
            }
        </>
    );
}

export default IndividualProduct;

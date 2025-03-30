import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { deleteFavoriteItem, getAllFavorites } from '../services/favoriteApi';
import { setFavorite } from '../store/slices/favoriteSlice';
import Loader from '../components/Loader/Loader';
import CustomContainer from '../layouts/CustomContainer';
import Images from '../constants/imageConstant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Favourites() {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const { isLoading, data } = useQuery({
        queryKey: ['favorites'],
        queryFn: getAllFavorites,
    });

    useEffect(() => {
        if (data) {
            dispatch(setFavorite(data?.favorites));
        }
    }, [data, dispatch]);

    const removeFromFavoriteMutation = useMutation(
        {
            mutationFn: (params) => deleteFavoriteItem(params.id, params?.color),
            onSuccess: () => {
                toast.success('Item Removed From Favorites Successfully');
                queryClient.invalidateQueries(['favorites']);
            },
            onError: (error) => {
                console.error('Error updating favorites:', error);
            }
        }
    )

    const handleRemoveFavorite = (e, item) => {
        e.stopPropagation()
        const id = item?.product?._id
        const color = item.color

        removeFromFavoriteMutation.mutate({ id, color });
    }

    return (
        <>
            {isLoading ?
                <Loader />
                :
                <CustomContainer customClass={"xl:mx-24 lg:mx-12"}>
                    <div className="py-12">
                        {
                            !data?.favorites?.length ?
                                <>
                                    <h1 className="section-heading">Favorites</h1>
                                    <p className='text-xl font-semibold text-textSecondary text-center py-40'>Items added to your Favourites will be saved here.</p>
                                </>
                                :
                                <div className='grid grid-cols-12 xl:gap-10 gap-4'>
                                    <div className='col-span-12'>
                                        <h1 className="section-heading">Favorites</h1>
                                    </div>
                                    {data?.favorites?.map((item, index) => (
                                        <div className='xl:col-span-4 col-span-6' key={index}>
                                            <div className='card relative cursor-pointer' onClick={() => navigate(`/product/${item?.product?._id}`)}>
                                                <img
                                                    src={item?.product?.variants?.find(i => i?.color === item?.color)?.coverImg}
                                                    alt='cover img'
                                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80"
                                                />
                                                <img src={Images.ColoredFav} alt="store" className='w-8 h-8 absolute top-2 right-2 border-2 p-1 rounded-full cursor-pointer' onClick={(e) => handleRemoveFavorite(e, item)} />
                                                <div className="mt-4 flex items-center justify-between">
                                                    <h3 className="text-md font-semibold tracking-tight">
                                                        {item?.product?.title}
                                                    </h3>
                                                    <p className="text-md font-semibold flex gap-3">
                                                        {item?.product?.price !== item?.product?.discountedPrice &&
                                                            <span className=' text-textPrimary'>MRP ₹{item?.product?.price}</span>
                                                        }
                                                        <span className='text-dark'>₹{item?.product?.discountedPrice}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        }
                    </div>
                </CustomContainer>
            }
        </>
    )
}

export default Favourites
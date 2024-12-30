import React, { useState } from 'react';
import InputBox from '../../components/InputBox/InputBox';
import CustomContainer from '../../layouts/CustomContainer';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { FaPlusCircle } from 'react-icons/fa';
import { TbCloudUpload } from "react-icons/tb";
import { categoryFilter, clothesSizeFilter, colorFilter, genderFilter, kidsFilter, shoeSizeFilter, sportsFilter } from '../../constants/filterData';
import { useMutation } from '@tanstack/react-query';
import { createProduct, deleteFile, uploadFile } from '../../services/productApi';
import { MdDelete } from "react-icons/md";

function AddProduct() {

    const [isForKids, setIsForKids] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const initialValues = {
        title: '',
        details: '',
        price: '',
        discount: '',
        category: '',
        gender: '',
        sports: '',
        kids: '',
        variants: [
            {
                size: '',
                color: '',
                stock: 0,
                images: ['']
            }
        ]
    };
    const validationSchema = Yup.object({
        title: Yup.string().required('Product name is required'),
        details: Yup.string().required('Product details are required'),
        price: Yup.number().required('Price is required').positive('Price must be a positive number'),
        discount: Yup.number().required('Discount is required').min(0, 'Discount cannot be negative'),
        category: Yup.string().required('Category is required'),
    });

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            console.log('Data posted successfully', data);
        },
        onError: (error) => {
            console.error('Error posting data', error);
        },
    });

    const onSubmit = (values, { resetForm }) => {
        console.log('Form data:', values);
        mutation.mutate(values);
        resetForm();
    };

    const handleFileUpload = async (e, index, imgHelpers) => {
        const files = e.currentTarget.files;
        if (files && files[0]) {
            const file = files[0];

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await uploadFile(formData, (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(progress);
                    }
                });
                const uploadedImageUrl = response;
                imgHelpers.replace(index, uploadedImageUrl);
                setUploadProgress(0);
            } catch (error) {
                console.error('Error uploading the image:', error);
                setUploadProgress(0);
            }
        }
    }

    const handleDelete = async (image, imgIndex, imgHelpers) => {
        const res = await deleteFile(image?.public_id)
        if (res) {
            imgHelpers.remove(imgIndex);
        }
    }

    return (
        <CustomContainer>
            <p className='uppercase font-bold tracking-tighter md:text-4xl'>Upload new Item</p>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ values, errors, touched, handleChange, setFieldValue, handleSubmit, handleReset }) => (
                    <form onSubmit={handleSubmit} className="py-10 sm:px-10">
                        <div className='grid grid-cols-12 gap-4 border p-8 rounded-lg'>
                            <div className='md:col-span-6 col-span-12'>
                                <h4 className='font-bold text-lg tracking-tight'>Product Name</h4>
                                <InputBox
                                    label="Product Name"
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    error={errors.title && touched.title ? errors.title : ''}
                                />
                            </div>
                            <div className='col-span-12'>
                                <h4 className='font-bold text-lg tracking-tight'>Details</h4>
                                <InputBox
                                    label="Details"
                                    type="text"
                                    name="details"
                                    id="details"
                                    value={values.details}
                                    onChange={handleChange}
                                    error={errors.details && touched.details ? errors.details : ''}
                                />
                            </div>
                            <div className='md:col-span-6 col-span-12'>
                                <h4 className='font-bold text-lg tracking-tight'>Price</h4>
                                <InputBox
                                    label="Price"
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    error={errors.price && touched.price ? errors.price : ''}
                                />
                            </div>
                            <div className='md:col-span-6 col-span-12'>
                                <h4 className='font-bold text-lg tracking-tight'>Discount</h4>
                                <InputBox
                                    label="Discount"
                                    type="number"
                                    name="discount"
                                    id="discount"
                                    value={values.discount}
                                    onChange={handleChange}
                                    error={errors.discount && touched.discount ? errors.discount : ''}
                                />
                            </div>
                            <div className="lg:col-span-4 md:col-span-6 col-span-12">
                                <h4 className="font-bold text-lg tracking-tight">Is this product for Kids?</h4>
                                <InputBox
                                    label="For Kids"
                                    type="select"
                                    name="isForKids"
                                    value={isForKids}
                                    onChange={(value) => {
                                        setIsForKids(value);
                                        setFieldValue('kids', '');
                                        setFieldValue('gender', '');
                                    }}
                                    options={[
                                        { label: 'Yes', value: 'Yes' },
                                        { label: 'No', value: 'No' },
                                    ]}
                                />
                            </div>
                            {isForKids == 'Yes' &&
                                <div className='lg:col-span-4 md:col-span-6 col-span-12'>
                                    <h4 className='font-bold text-lg tracking-tight'>Kids</h4>
                                    <InputBox
                                        label="Kids"
                                        type="select"
                                        name="kids"
                                        value={values.kids || {}}
                                        onChange={(selectedValue) => setFieldValue('kids', selectedValue)}
                                        error={errors.kids && touched.kids ? errors.kids : ''}
                                        options={kidsFilter}
                                    />
                                </div>
                            }{
                                isForKids == 'No' &&
                                <div className='lg:col-span-4 md:col-span-6 col-span-12'>
                                    <h4 className='font-bold text-lg tracking-tight'>Gender</h4>
                                    <InputBox
                                        label="Gender"
                                        type="select"
                                        name="gender"
                                        value={values.gender || {}}
                                        onChange={(selectedValue) => setFieldValue('gender', selectedValue)}
                                        error={errors.gender && touched.gender ? errors.gender : ''}
                                        options={genderFilter}
                                    />
                                </div>
                            }
                            <div className='lg:col-span-4 md:col-span-6 col-span-12'>
                                <h4 className='font-bold text-lg tracking-tight'>Category</h4>
                                <InputBox
                                    label="Category"
                                    type="select"
                                    name="category"
                                    value={values.category || {}}
                                    onChange={(selectedValue) => setFieldValue('category', selectedValue)}
                                    error={errors.category && touched.category ? errors.category : ''}
                                    options={categoryFilter}
                                />
                            </div>
                            <div className='md:col-span-6 col-span-12'>
                                <h4 className='font-bold text-lg tracking-tight mb-3'>Type</h4>
                                <InputBox
                                    label="Size"
                                    type="checkbox"
                                    name="sports"
                                    options={sportsFilter}
                                    value={values.sports}
                                    onChange={handleChange}
                                    error={errors?.sports ? errors.sports : ''}
                                />
                            </div>

                            <div className='col-span-12 mt-4'>
                                <h4 className='font-bold text-lg tracking-tight'>Choose Your Fit & Style </h4>
                                <FieldArray
                                    name="variants"
                                    render={arrayHelpers => (
                                        <div>
                                            {values.variants.map((_, index) => (
                                                <div key={index} className="grid grid-cols-12 border p-4 mb-4 rounded-lg mt-2">
                                                    <div className='lg:col-span-5 md:col-span-6 col-span-12'>
                                                        <h4 className='font-bold text-lg tracking-tight my-2'>Color</h4>
                                                        <InputBox
                                                            label="Color"
                                                            type="radio"
                                                            name={`variants.${index}.color`}
                                                            options={colorFilter}
                                                            value={values.variants[index].color}
                                                            onChange={handleChange}
                                                            error={errors?.variants?.[index]?.color ? errors.variants[index].color : ''}
                                                        />
                                                    </div>
                                                    {values.category && <div className='lg:col-span-4 md:col-span-6 col-span-12'>
                                                        <h4 className='font-bold text-lg tracking-tight my-2'>Size</h4>
                                                        <InputBox
                                                            label="Size"
                                                            type="checkbox"
                                                            name={`variants.${index}.size`}
                                                            options={values.category === 'shoes' ? shoeSizeFilter : clothesSizeFilter}
                                                            value={values.variants[index].size}
                                                            onChange={handleChange}
                                                            error={errors?.variants?.[index]?.size ? errors.variants[index].size : ''}
                                                        />
                                                    </div>}
                                                    <div className='lg:col-span-3 md:col-span-6 col-span-12'>
                                                        <h4 className='font-bold text-lg tracking-tight my-2'>Stock</h4>
                                                        <InputBox
                                                            label="Stock"
                                                            type="number"
                                                            name={`variants.${index}.stock`}
                                                            value={values.variants[index].stock}
                                                            onChange={handleChange}
                                                            error={errors?.variants?.[index]?.stock ? errors.variants[index].stock : ''}
                                                        />
                                                    </div>
                                                    <div className='col-span-12'>
                                                        <h4 className='font-bold text-lg tracking-tight my-2'>Images</h4>
                                                        <FieldArray
                                                            name={`variants.${index}.images`}
                                                            render={imgHelpers => (
                                                                <>
                                                                    <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-3'>
                                                                        {values.variants[index].images.map((image, imgIndex) => (
                                                                            <div key={imgIndex}>
                                                                                <div className="flex items-center justify-center w-full">
                                                                                    {image?.url ? (
                                                                                        <div className='relative w-full'>
                                                                                            <img
                                                                                                src={image?.url}
                                                                                                alt="Preview"
                                                                                                className="h-60 lg:h-72 w-full"
                                                                                            />
                                                                                            <div
                                                                                                onClick={async () => {
                                                                                                    await handleDelete(image, imgIndex, imgHelpers);
                                                                                                }}
                                                                                                className=" absolute top-2 right-2 cursor-pointer hover:text-red-500 p-2 border rounded-full hover:bg-bgPrimary"
                                                                                            >
                                                                                                <MdDelete />
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <label
                                                                                            htmlFor={`dropzone-file-${imgIndex}`}
                                                                                            className="flex flex-col items-center justify-center w-full h-60 lg:h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                                                                        >
                                                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                                                <TbCloudUpload size={36} />
                                                                                                <p className="mb-2 text-sm text-gray-500">
                                                                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                                                                </p>
                                                                                                <p className="text-xs text-gray-500">SVG, PNG, JPG, or GIF</p>
                                                                                            </div>
                                                                                            <input
                                                                                                id={`dropzone-file-${imgIndex}`}
                                                                                                type="file"
                                                                                                className="hidden"
                                                                                                name={`variants.${index}.images.${imgIndex}`}
                                                                                                onChange={async (event) => {
                                                                                                    await handleFileUpload(event, imgIndex, imgHelpers);
                                                                                                }}
                                                                                            />
                                                                                            {uploadProgress !== 0 &&
                                                                                                <div className="space-y-2">
                                                                                                    <progress
                                                                                                        value={uploadProgress}
                                                                                                        max="100"
                                                                                                        className="w-full h-4 bg-bgPrimary rounded-full"
                                                                                                    />
                                                                                                    <div className="flex justify-between">
                                                                                                        <span className="text-sm text-gray-500">Uploading...</span>
                                                                                                        <span className="font-semibold text-sm text-gray-600 rounded-full">{uploadProgress}%</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            }
                                                                                        </label>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>

                                                                    <button
                                                                        type='button'
                                                                        onClick={() => imgHelpers.push('')}
                                                                        className="mt-4 black-btn flex items-center gap-2"
                                                                    >
                                                                        <FaPlusCircle /> Add Image
                                                                    </button>
                                                                </>
                                                            )
                                                            }
                                                        />
                                                    </div>
                                                    <div className='w-100 text-end col-span-12'>
                                                        <button type="button" onClick={() => arrayHelpers.remove(index)} className="white-btn">
                                                            Remove Variant
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => arrayHelpers.push({ size: [], color: [], stock: 0, images: [''] })} className="mt-4 flex items-center black-btn">
                                                <FaPlusCircle className="mr-2" />
                                                Add Variant
                                            </button>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='flex gap-3 justify-end mt-4'>
                            <button type="reset" onClick={() => handleReset()} className='white-btn mt-3 px-4'>Clear</button>
                            <button type="submit" className='black-btn mt-3 px-5'>Add Product</button>
                        </div>
                    </form>
                )}
            </Formik>
        </CustomContainer >
    );
}

export default AddProduct;

import React from 'react';
import InputBox from '../../components/InputBox/InputBox';
import CustomContainer from '../../layouts/CustomContainer';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { FaPlusCircle } from 'react-icons/fa';
import { TbCloudUpload } from "react-icons/tb";
import { categoryFilter, clothesSizeFilter, colorFilter, genderFilter, kidsFilter, shoeSizeFilter } from '../../constants/filterData';
import { Button, Field, Input, Label } from '@headlessui/react';

function AddProduct() {
    const initialValues = {
        productName: '',
        details: '',
        price: '',
        discount: '',
        category: '',
        gender: '',
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
        productName: Yup.string().required('Product name is required'),
        details: Yup.string().required('Product details are required'),
        price: Yup.number().required('Price is required').positive('Price must be a positive number'),
        discount: Yup.number().required('Discount is required').min(0, 'Discount cannot be negative'),
        category: Yup.string().required('Category is required'),
    });

    const onSubmit = (values, { resetForm }) => {
        console.log('Form data:', values);
        resetForm();
    };

    const handleReset = ({ resetForm }) => {
        resetForm();
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
                                    name="productName"
                                    value={values.productName}
                                    onChange={handleChange}
                                    error={errors.productName && touched.productName ? errors.productName : ''}
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
                                                    <div className='lg:col-span-4 md:col-span-6 col-span-12'>
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
                                                    </div>
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
                                                                                <Field className="flex items-center justify-center w-full">
                                                                                    {!image ?
                                                                                        <Label
                                                                                            htmlFor="dropzone-file"
                                                                                            className="flex flex-col items-center justify-center w-full h-40 lg:h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100"
                                                                                        >
                                                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                                                <TbCloudUpload size={36} />
                                                                                                <p className="mb-2 text-sm text-gray-500">
                                                                                                    <span className="font-semibold">Click to upload</span>
                                                                                                    or drag and drop
                                                                                                </p>
                                                                                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                                                                                            </div>
                                                                                            <Input
                                                                                                id="dropzone-file"
                                                                                                type="file"
                                                                                                className="hidden"
                                                                                                name={`variants.${index}.images.${imgIndex}`}
                                                                                                onChange={(event) => {
                                                                                                    const files = event.currentTarget.files;
                                                                                                    if (files && files[0]) {
                                                                                                        const fileURL = URL.createObjectURL(files[0]);
                                                                                                        imgHelpers.replace(imgIndex, fileURL);
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                        </Label>
                                                                                        :
                                                                                        <img src={image} alt="Preview" className="h-40 lg:h-52 w-full" />
                                                                                    }
                                                                                </Field>
                                                                                {image &&
                                                                                    <Button
                                                                                        type="button"
                                                                                        onClick={() => imgHelpers.remove(imgIndex)}
                                                                                        className="white-btn mt-2"
                                                                                    >
                                                                                        Remove
                                                                                    </Button>
                                                                                }
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => imgHelpers.push('')}
                                                                        className="mt-4 black-btn"
                                                                    >
                                                                        Add Image
                                                                    </Button>
                                                                </>
                                                            )}
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
                            <button type="reset" onClick={handleReset} className='white-btn mt-3 px-4'>Clear</button>
                            <button type="submit" className='black-btn mt-3 px-5'>Add Product</button>
                        </div>
                    </form>
                )}
            </Formik>
        </CustomContainer>
    );
}

export default AddProduct;

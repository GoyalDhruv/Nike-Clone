import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProductById } from '../../services/productApi';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct } from '../../services/dashboardApi';
import Loader from '../../components/Loader/Loader';
import AddProductForm from '../../components/Dashboard/AddProductForm';

function AddProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { isLoading, data } = useQuery({
        queryKey: ['product', { id }],
        queryFn: getProductById,
        enabled: !!id
    });

    const defaultInitialValues = {
        title: '',
        details: '',
        price: '',
        discount: '',
        category: '',
        gender: '',
        sports: '',
        kids: '',
        variants: [{
            size: '',
            color: '',
            stock: 0,
            images: ['']
        }]
    };

    const initialValues = data?.data ? {
        title: data?.data.title || '',
        details: data?.data.details || '',
        price: data?.data.price || '',
        discount: data?.data.discount || 0,
        category: data?.data.category || '',
        gender: data?.data.gender || '',
        sports: data?.data.sports || '',
        kids: data?.data.kids || '',
        variants: data?.data.variants.length > 0 ? data?.data.variants : defaultInitialValues.variants
    } : defaultInitialValues;

    const validationSchema = Yup.object({
        title: Yup.string().required('Product name is required'),
        details: Yup.string().required('Product details are required'),
        price: Yup.number().required('Price is required').positive('Price must be a positive number'),
        discount: Yup.number().required('Discount is required').min(0, 'Discount cannot be negative'),
        category: Yup.string().required('Category is required'),
    });

    const addMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            toast.success('Data added successfully');
            navigate('/dashboard/products')
        },
        onError: () => {
            toast.error('Error in posting data');
        },
    });

    const editMutate = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            toast.success('Data updated successfully');
            navigate('/dashboard/products')
        },
        onError: () => {
            toast.error('Error in updating data');
        },
    })

    const onSubmit = (values, { resetForm }) => {
        if (id) {
            editMutate.mutate({ values, id });
        }
        else {
            addMutation.mutate(values);
        }
        resetForm();
    };

    return (
        <>
            <p className='dashboard-heading'>{id ? "Edit" : "Add"} Product</p>
            {isLoading ?
                <Loader /> :
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, errors, touched, handleChange, setFieldValue, handleSubmit, handleReset }) => (
                        <AddProductForm
                            id={id}
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                            handleSubmit={handleSubmit}
                            handleReset={handleReset}
                        />
                    )}
                </Formik>
            }
        </>
    );
}

export default AddProduct;

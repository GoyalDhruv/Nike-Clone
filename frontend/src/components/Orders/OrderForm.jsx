import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputBox from '../InputBox/InputBox';
import PropTypes from 'prop-types';

const OrderForm = ({ onSubmit }) => {

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required'),
        orderNo: Yup.string().required('Order Number is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        onSubmit(values, resetForm);
    };

    return (
        <Formik initialValues={{ email: '', orderNo: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-12 gap-4 py-6 rounded-lg'>
                        <div className='col-span-12'>
                            <InputBox
                                label="Order Number"
                                type="text"
                                name="orderNo"
                                id="orderNo"
                                autofocus
                                value={values.orderNo}
                                onChange={handleChange}
                                error={errors.orderNo && touched.orderNo ? errors.orderNo : ''}
                            />
                        </div>
                        <div className='col-span-12'>
                            <InputBox
                                label="Email"
                                type="email"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                error={errors.email && touched.email ? errors.email : ''}
                            />
                        </div>
                        <div className='col-span-12'>
                            <button type="submit" className='black-btn w-full mt-3 px-5'>
                                Submit
                            </button>
                        </div>
                        <div className='col-span-12 text-center'>
                            <p className='text-sm tracking-tight'>
                                Already a member?
                                <span className='font-medium'>Sign in</span>
                            </p>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};

OrderForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default OrderForm;

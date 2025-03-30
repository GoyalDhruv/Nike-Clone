import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import InputBox from '../InputBox/InputBox'
import PropTypes from 'prop-types';

const SignUpForm = ({ onSubmit }) => {

    const initialValues = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        dateOfBirth: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            )
            .required('Password is required'),
        dateOfBirth: Yup.date().required('Date of birth is required')
    });

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values, errors, touched, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-12 gap-4 py-6 rounded-lg'>
                        <div className='col-span-12'>
                            <InputBox
                                label="Email"
                                type="email"
                                name="email"
                                id="email"
                                autofocus
                                value={values.email}
                                onChange={handleChange}
                                error={errors.email && touched.email ? errors.email : ''}
                            />
                        </div>
                        <div className='md:col-span-6 col-span-12'>
                            <InputBox
                                label="First Name"
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                error={errors.firstName && touched.firstName ? errors.firstName : ''}
                            />
                        </div>
                        <div className='md:col-span-6 col-span-12'>
                            <InputBox
                                label="Last Name"
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                error={errors.lastName && touched.lastName ? errors.lastName : ''}
                            />
                        </div>
                        <div className='col-span-12'>
                            <InputBox
                                label="Password"
                                type="password"
                                name="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                error={errors.password && touched.password ? errors.password : ''}
                            />
                        </div>
                        <div className='col-span-12 '>
                            <InputBox
                                label="Date of Birth"
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                value={values.dateOfBirth}
                                onChange={handleChange}
                                error={errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : ''}
                            />
                        </div>
                        <div className='col-span-12 text-end'>
                            <button type="submit" className='black-btn mt-3 px-5'>Create Account</button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default SignUpForm;

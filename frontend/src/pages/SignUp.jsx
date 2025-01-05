import React from 'react'
import CustomContainer from '../layouts/CustomContainer'
import * as Yup from 'yup'
import Images from '../constants/imageConstant'
import { Formik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import InputBox from '../components/InputBox/InputBox'
import { registerUser } from '../services/userApi'
import { useNavigate } from 'react-router-dom'

const roleOptions = [
    { value: 'User', label: 'User' },
    { value: 'Admin', label: 'Admin' }
]

function SignUp() {

    const navigate = useNavigate()

    const initialValues = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        dateOfBirth: '',
        role: 'User'
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

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            navigate('/sign-in')
        },
        onError: (error) => {
            console.error('Error posting data', error);
        },
    });

    const onSubmit = (values, { resetForm }) => {
        mutation.mutate(values);
        resetForm();
    };


    return (
        <CustomContainer customClass="sm:mx-auto sm:max-w-[550px] h-screen py-16">
            <div className='flex'>
                <img src={Images.NikeLogo} alt="NikeLogo" className='w-12' />
                <img src={Images.JordanLogo} alt="JordanLogo" className='w-12' />
            </div>
            <p className='text-3xl tracking-tight'>Now let&apos;s make you a Nike Member.</p>
            <div>
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
                                <div className='col-span-12 my-5'>
                                    <h4 className='font-semibold text-lg tracking-tight mb-3'>Role</h4>
                                    <InputBox
                                        label="Role"
                                        type="radio"
                                        name="role"
                                        options={roleOptions}
                                        value={values.role}
                                        onChange={handleChange}
                                        error={errors?.role ? errors.role : ''}

                                    />
                                </div>
                                <div className='col-span-12 text-end'>
                                    <button type="submit" className='black-btn mt-3 px-5'>Create Account</button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </CustomContainer>
    )
}

export default SignUp
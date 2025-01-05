import React from 'react'
import CustomContainer from '../layouts/CustomContainer'
import * as Yup from 'yup'
import Images from '../constants/imageConstant'
import { Formik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import InputBox from '../components/InputBox/InputBox'
import { loginUser } from '../services/userApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserCredentials } from '../store/slices/userSlice'

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // localStorage.setItem('user', JSON.stringify(data?.data));
            dispatch(setUserCredentials(data?.data));
            navigate('/');
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
            <p className='text-3xl tracking-tight'>Welcome Back, Nike Member.</p>
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
                                <div className='col-span-12 text-end'>
                                    <button type="submit" className='black-btn mt-3 px-5'>Sign in</button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </CustomContainer>
    )
}

export default Login
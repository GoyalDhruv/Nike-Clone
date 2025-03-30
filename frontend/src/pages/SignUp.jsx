import React from 'react'
import CustomContainer from '../layouts/CustomContainer'
import Images from '../constants/imageConstant'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../services/userApi'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import SignUpForm from '../components/SignUp/SignUpForm'

function SignUp() {

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success("User registered successfully")
            navigate('/sign-in')
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message);
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
            <SignUpForm onSubmit={onSubmit} />
        </CustomContainer>
    )
}

export default SignUp
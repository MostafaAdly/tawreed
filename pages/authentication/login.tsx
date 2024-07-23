import React from 'react'
import { getAPIURL, getAssetImage } from 'public/assets/utils/helpers';
import CardComponent from 'components/generic/ui/card.component';
import AuthLayout from 'layouts/auth.layout';
import TitleComponent from 'components/generic/ui/title.component';
import axios from 'axios';
import { useForm } from 'react-hook-form';


const LoginPage = ({ }) => {
    const { register, handleSubmit } = useForm();

    const onLogin = async (form) => {
        if (!form.email || !form.password) {
            alert(`أكمل البيانات المطلوبة لتسجيل الدخول`);
            return;
        }
        try {
            var response = (await axios.post(getAPIURL('/auth/login'), { email: form.email, password: form.password })).data;
            if (response?.error)
                return alert("إسم المستخدم أو كلمة المرور غير صحيحة");
            if (response.redirect)
                window.location.href = response.redirect;
        } catch (error) {
            console.log(error);
            alert('حدث خطأ ما');
        }
    }

    return (
        <>
            <AuthLayout>
                <CardComponent className="w-[40%]">
                    <form onSubmit={handleSubmit(onLogin)}>
                        <div className="center">
                            <img className=' w-[130px] h-[100px]' src={getAssetImage('logo')} alt="Logo" />
                        </div>
                        <div className="center my-7 mt-5">
                            <TitleComponent title='تسجيل الدخول' />
                        </div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">البريد الإلكتروني</label>
                        <div className="flex mb-4">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                </svg>
                            </span>
                            <input
                                required
                                type="text"
                                dir='ltr'
                                id="email"
                                {...register('email', { required: true })}
                                defaultValue={"admin@gmail.com"}
                                className="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username@tec-tawreed.com" />
                        </div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">كلمة المرور</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                            </span>
                            <input
                                required
                                type="password"
                                dir='ltr'
                                id="password"
                                {...register('password', { required: true })}
                                defaultValue={"123123"}
                                className="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" />
                        </div>
                        <div className="center mt-10 w-full">
                            <button type="submit" className="w-full text-white bg-gradient-to-r from-primary via-primary to-primary hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                                تسجيل الدخول
                            </button>
                        </div>

                    </form>
                </CardComponent>
            </AuthLayout>
        </>
    )
}



export default LoginPage;
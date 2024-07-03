import AuthLayout from 'components/layouts/auth.layout';
import { getAPIURL, getAssetImage } from 'public/assets/utils/helpers';
import React from 'react'
import { _css } from 'public/assets/utils/helpers';
import styles from 'public/pages/authentication/login.module.css';


const LoginPage = ({ }) => {
    return (
        <AuthLayout>
            <img className={_css(styles, 'logo')} src={getAssetImage('logo')} alt="Logo" />
            <form className={_css(styles, 'form')} action={getAPIURL('login')} method='post'>
                {/* TITLE */}
                <h1 className={_css(styles, 'title center')}>تسجيل الدخول</h1>
                <div className={_css(styles, 'fields center')}>
                    {/* EMAIL */}
                    <input className={_css(styles, 'input')} type='email' name='email' placeholder='البريد الإلكتروني' />
                    {/* PASSWORD */}
                    <input className={_css(styles, 'input')} type='password' name='password' placeholder='كلمة المرور' />
                </div>
                {/* SUBMIT */}
                <div className={_css(styles, 'control')}>
                    <button className={_css(styles, 'signIn opacity-active')} type='submit'>تسجيل الدخول</button>
                    {/* <button className={_css(styles, 'signUp opacity-active')}>طلب انضمام</button> */}
                </div>
            </form>
        </AuthLayout>
    )
}



export default LoginPage;
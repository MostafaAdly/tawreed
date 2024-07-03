import AuthLayout from 'components/layout/auth.layout';
import { getAssetImage } from 'public/assets/utils/helpers';
import React from 'react'


const LoginPage = ({ }) => {
    return (
        <AuthLayout>
            <div className="flex flex-col items-center justify-center h-screen">
                <div>
                    <img src={getAssetImage('logo')} alt="" />
                </div>
            </div>
        </AuthLayout>
    )
}



export default LoginPage;
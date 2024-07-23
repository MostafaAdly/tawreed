import { GetServerSideProps } from 'next';
import { getAPIURL, getFormData, getSSProps } from 'public/assets/utils/helpers';
import React, { useState } from 'react';
import AdminLayout from 'layouts/admin.layout';
import { AccountType } from 'src/config/enums/account.enum';
import NewClientForm from 'components/forms/new-client.form';
import NewSupplierForm from 'components/forms/new-supplier.form';
import Terms from 'components/generic/terms.component';
import axios from 'axios';

const NewUser = ({ user }) => {
    const [userType, setUserType] = useState(AccountType.CLIENT);
    const isClient = () => userType === AccountType.CLIENT;

    const createUser = async (self) => {
        try {
            self.preventDefault();
            const form = getFormData('user-form')
            if (!form) return;
            const data = {};
            for (let [key, value] of form.entries()) data[key] = value;
            const response = (await axios.post(getAPIURL(`/users/create/${isClient() ? 'client' : 'supplier'}`), data)).data;
            if (!response || response?.error) return alert(`حدث خطأ ما`);
            return alert(`تم إنشاء ال${userType} بنجاح`);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AdminLayout user={user}>
            <form onSubmit={createUser} id='user-form'>
                <h1 className='text-3xl font-bold mb-10'>إضافة مستخدم جديد ({userType})</h1>
                <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">إختر نوع الحساب</h5>
                    <select
                        id="countries"
                        onChange={({ target }) => setUserType(AccountType[target.value])}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {
                            Object.keys(AccountType).filter((key) => key != 'ADMIN').map((key) => (
                                <option key={key} value={key}>{AccountType[key]}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">الرجاء ملئ البيانات الخاصة بال{userType} الجديد:</h5>

                    {/* LOADING FORM */}
                    {isClient() ? <NewClientForm /> : <NewSupplierForm />}

                    <Terms className='mt-3' />
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        حفظ
                    </button>
                </div >
            </form>

        </AdminLayout >
    )
}

export default NewUser;

export const getServerSideProps: GetServerSideProps = getSSProps;
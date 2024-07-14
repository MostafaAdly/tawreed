import React, { useState } from 'react';
import { getAPIURL, getSSProps } from 'public/assets/utils/helpers';
import { GetServerSideProps } from 'next';
import AdminLayout from 'layouts/admin.layout';
import NewClientForm from '../../../components/forms/new-client.form';
import NewSupplierForm from 'components/forms/new-supplier.form';

const EditUser = () => {
    const [users, setUsers] = useState([]);
    const emailRef = React.useRef(null);
    const phoneRef = React.useRef(null);

    const onSearch = () => {
        fetch(getAPIURL(`/users?email=${emailRef.current.value}&phone=${phoneRef.current.value}`))
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // setUsers(data);
            });
    }

    const getUser = () => users.length == 1 ? users[0] : null;

    return (
        <AdminLayout>
            <h1 className='text-3xl font-bold mb-10'>تحرير مستخدم</h1>
            {
                !getUser() && (
                    <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">الرجاء البحث عن المستخدم المراد تعديل بياناته:</h5>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-300">- الرجاء البحث بإستخدام البريد الإلكتروني او بإستخدام الهاتف</p>
                        <div className="grid gap-6 mb-6 md:grid-cols-2 py-3">
                            <div className="flex flex-col gap-6 mb-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-gray-300">البريد الإلكتروني</label>
                                <input placeholder="email@example.com" ref={emailRef} type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex flex-col gap-6 mb-2">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-900 dark:text-gray-300">الهاتف</label>
                                <input placeholder="01xxxxxx341" ref={phoneRef} type="text" id="phone" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>
                        <button onClick={onSearch} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            بحث
                        </button>
                    </div>
                )
            }
            {
                users.length > 1 && (
                    <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
                        {/* SEARCH RESULTS */}


                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">

                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Color
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td className="px-6 py-4">
                                            Silver
                                        </td>
                                        <td className="px-6 py-4">
                                            Laptop
                                        </td>
                                        <td className="px-6 py-4">
                                            $2999
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div >
                )
            }
            {
                getUser() && (
                    <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
                        {/* LOADING FORM */}
                        {
                            getUser().type == 'client'
                                ? <NewClientForm formAction={getAPIURL('/users/edit')} user={getUser()} />
                                : <NewSupplierForm formAction={getAPIURL('/users/edit')} user={getUser()} />
                        }
                    </div >
                )
            }
        </AdminLayout >
    )
};

const SearchResult = ({ user }) => {
    return (
        
    )
}

export default EditUser;

export const getServerSideProps: GetServerSideProps = getSSProps;
import ClientLayout from 'layouts/client.layout';
import { getSSProps } from 'public/assets/utils/helpers';
import React, { useState } from 'react';
import { SimpleModal } from '../../../components/generic/ui/modal.component';
import CardComponent from 'components/generic/ui/card.component';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const NewRFQ = ({ user }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [openModal, setOpenModal] = useState(false);

    const onSubmit = (form) => {
        console.log(form);
        axios.post('/api/rfqs', form);
        setOpenModal(true);
    }

    return (
        <ClientLayout>
            <CardComponent>
                <SimpleModal openModal={openModal} setOpenModal={setOpenModal} title='لقد تم ارسال الطلب بنجاح' button='الصفحة الرئيسية' href='/client' />
                <div className='flex flex-col gap-y-5'>
                    <h1 className='text-3xl font-bold'>طلب تسعير جديد</h1>
                    <h3 className='text-2xl font-bold'>
                        رقم: <span className='font-normal'>0x020231</span>
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">إسم المنتج</label>
                                <input type="text" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="مسامير" required />
                            </div>
                            <div>
                                <label htmlFor="specifications" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">المواصفات</label>
                                <input type="text" id="specifications" {...register('specifications', { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="حجم, لون, معدن, إلخ" required />
                            </div>
                            <div>
                                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الكمية</label>
                                <input type="text" id="quantity" {...register('quantity', { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="22 قطعة" required />
                            </div>

                            <div className='flex items-end'>
                                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="flex justify-between w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                    القسم
                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                {/* <!-- Dropdown menu --> */}
                                <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="drop downDefaultButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">القسم 1</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image_input">إرفاق صور</label>
                        <input {...register('images', { required: true })} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image_input" type="file" multiple />
                        <div className="center mt-10">
                            <button type="submit" className="w-[30%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">أرسل الطلب</button>
                        </div>
                    </form>
                </div>

            </CardComponent>
        </ClientLayout>

    );
}

export default NewRFQ;

export const getServerSideProps = getSSProps;
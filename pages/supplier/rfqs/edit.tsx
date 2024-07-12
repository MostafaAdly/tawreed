import SupplierLayout from 'layouts/supplier.layout';
import { GetServerSideProps } from 'next';
import { getSSProps } from 'public/assets/utils/helpers';
import React from 'react';
import { InfoFields } from '../../../components/generic/ui/fields/info.component';

const EditRFQ = () => {
    const InlineFormField = ({ id, type = "text", title, placeholder, marginBottom = "0" }) => {
        return (
            <div className={`mb-${marginBottom}`}>
                <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
                <input type={type} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
            </div>
        )
    }
    return (
        <SupplierLayout>
            <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">بيانات الطلب من العميل</h5>
                <InfoFields
                    center={false}
                    fields={
                        [
                            {
                                title: "إسم السلعة",
                                value: "بطيخ"
                            },
                            {
                                title: "العميل",
                                value: "ابطخ"
                            },
                            {
                                title: "الكمية",
                                value: "123"
                            },
                            {
                                title: "المواصفات",
                                value: "321"
                            },
                            {
                                title: "الكمية",
                                value: "123"
                            },
                            {
                                title: "المواصفات",
                                value: "321"
                            }
                        ]
                    } />
            </div>

            <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">الرجاء ملئ البيانات التالية:</h5>

                <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2 py-3">
                        <InlineFormField id="price" type='number' title="سعر الوحدة" placeholder="3200 ج.م" />
                        <InlineFormField id="vat" type='number' title="ضريبة القيمة المضافة" placeholder="400 ج.م" />
                        <InlineFormField id="total_price" type='number' title="السعر الإجمالي" placeholder="3600 ج.م" />
                        <InlineFormField id="quantity" type='number' title="الكمية" placeholder="12 قطعة" />
                        <InlineFormField id="payments_terms" title="شروط الدفع" placeholder="" />
                        <InlineFormField id="comment" title="أضف تعليق" placeholder="يرجى أخذ الحذر مع هذا المنتج" />
                        <div id="date-range-picker" date-rangepicker={"true"} className="flex items-center justify-between">
                            <span className="mx-4 text-gray-500">من</span>
                            <div className="relative flex-grow">
                                <div className="center absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input id="datepicker-range-start" name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="تاريخ بداية التسليم" />
                            </div>
                            <span className="mx-4 text-gray-500">إلى</span>
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input id="datepicker-range-end" name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="تاريخ نهاية التسليم" />
                            </div>
                        </div>

                        <div className='flex items-end relative'>
                            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="flex justify-between w-full text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors duration-150 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                شروط العرض
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="dropdown" className="red z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-[100%] dark:bg-gray-700">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <a href='#' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">كاش</a>
                                    </li>
                                    <li>
                                        <a href='#' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">آجل</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image_input">إرفاق صور</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image_input" type="file" multiple />
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">أوافق على <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">الشروط والأحكام</a>.</label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">أرسل الرد</button>
                </form>

            </div >
        </SupplierLayout >
    )
}

export default EditRFQ;

export const getServerSideProps: GetServerSideProps = getSSProps;
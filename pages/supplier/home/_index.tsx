import React from 'react'
import { getSSProps } from "public/assets/utils/helpers";
import SupplierLayout from 'layouts/supplier.layout';

const Index = () => {
    const links = [
        {
            title: 'طلبات تسعير جديدة',
            url: '/supplier/rfqs/incoming'
        },
        {
            title: 'قيد التنفيذ',
            url: '/supplier/rfqs/in-progress'
        },
        {
            title: 'عروض مرسلة',
            url: '/supplier/rfqs/outgoing'
        },
        {
            title: 'المعاملات المكتملة',
            url: '/supplier/rfqs/completed'
        },
        {
            title: 'معاملات لم يتم استلام النقد',
            url: '/supplier/rfqs/waiting'
        }
    ]
    return (
        <SupplierLayout>
            <div className='flex flex-col gap-y-5'>
                {links.map((link, index) => (
                    <a key={index} href={link.url} className='w-[30%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-slate-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex justify-between transition-colors duration-150'>
                        <h5 className='text-black text-xl'>{link.title}</h5>
                        <span className="center bg-red-100 text-red-700 text-xs me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 font-bold">20</span>
                    </a>
                ))}
            </div>
        </SupplierLayout>
    );
}

export default Index;

export const getServerSideProps = getSSProps
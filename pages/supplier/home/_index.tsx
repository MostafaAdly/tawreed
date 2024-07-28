import React, { useEffect, useState } from 'react'
import { getAPIURL, getSSProps } from "public/assets/utils/helpers";
import SupplierLayout from 'layouts/supplier.layout';
import axios from 'axios';
import { OfferStatus } from 'src/config/enums/offer_status.enum';

const Index = ({ user }) => {
    const [links, setLinks] = useState([]);
    useEffect(() => {
        (async () => {
            setLinks([
                {
                    title: 'طلبات تسعير جديدة',
                    url: '/supplier/posts/incoming',
                    amount: (await axios.get(getAPIURL(`/posts/offers?status=${OfferStatus.New}&industry=${user.industry}`))).data?.data?.length || 0
                },
                {
                    title: 'قيد التنفيذ',
                    url: '/supplier/posts/in-progress',
                    amount: (await axios.get(getAPIURL(`/posts/offers?status=${OfferStatus.Pending}&industry=${user.industry}`))).data?.data?.length || 0
                },
                {
                    title: 'المعاملات قيد التوصيل',
                    url: '/supplier/posts/in-delivery',
                    amount: (await axios.get(getAPIURL(`/posts/offers?status=${OfferStatus.Confirmed}&industry=${user.industry}`))).data?.data?.length || 0
                },
                {
                    title: 'المعاملات المكتملة',
                    url: '/supplier/posts/completed',
                    amount: (await axios.get(getAPIURL(`/posts/offers?status=${OfferStatus.Shipped}&industry=${user.industry}`))).data?.data?.length || 0
                },
            ]);
        })();
    }, []);

    return (
        <SupplierLayout user={user}>
            <div className='flex flex-col gap-y-5'>
                {links.map((link, index) => (
                    <a key={index} href={link.url} className='w-[30%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-slate-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex justify-between transition-colors duration-150'>
                        <h5 className='text-black text-xl'>{link.title}</h5>
                        <span className="center bg-red-100 text-red-700 text-xs me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 font-bold">{link.amount || 0}</span>
                    </a>
                ))}
            </div>
        </SupplierLayout>
    );
}

export default Index;

export const getServerSideProps = getSSProps
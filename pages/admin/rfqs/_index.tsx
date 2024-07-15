import AdminLayout from 'layouts/admin.layout';
import { GetServerSideProps } from 'next';
import { getSSProps } from 'public/assets/utils/helpers';
import React from 'react';
import CardComponent from 'components/generic/ui/card.component';
import TitleComponent from 'components/generic/ui/title.component';


const Index = () => {

    const links = [
        {
            title: 'الطلبات',
            url: '/admin/rfqs/requests'
        },
        {
            title: 'العروض',
            url: '/admin/rfqs/offers'
        }
    ]
    return (
        <AdminLayout>
            <CardComponent>
                <TitleComponent title='إدارة الطلبات والعروض' marginBottom='10' />
                <div className='flex flex-col gap-y-5'>
                    {links.map((link, index) => (
                        <a key={index} href={link.url} className='center w-[30%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-slate-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-150'>
                            <h5 className='text-black text-xl'>{link.title}</h5>
                        </a>
                    ))}
                </div>
            </CardComponent>
        </AdminLayout>
    )
}

export default Index;

export const getServerSideProps: GetServerSideProps = getSSProps;
import ClientLayout from 'layouts/client.layout';
import { getSSProps } from 'public/assets/utils/helpers';
import React from 'react';

const Index = ({ user }) => {
    const links = [
        {
            title: 'طلب توريد جديد',
            url: '/client/posts/new'
        },
        {
            title: 'العروض الصادرة',
            url: '/client/posts/outgoing'
        },
        {
            title: 'العروض الواردة',
            url: '/client/posts/incoming'
        },
        {
            title: 'العروض الموافق عليها',
            url: '/client/posts/confirmed'
        },
        {
            title: 'العمليات المكتملة',
            url: '/client/posts/completed'
        },
        // {
        //     title: 'المعاملات السابقة',
        //     url: '/client/posts/history'
        // },
        // {
        //     title: 'إرسال مقترحات',
        //     url: '/client/send-proposals'
        // },
        // {
        //     title: "تغيير كلمة المرور",
        //     url: "/client/profile/change-password"
        // }
    ]
    return (
        <ClientLayout user={user}>
            <div className='flex flex-col gap-y-5'>
                {links.map((link, index) => (
                    <a key={index} href={link.url} className='center w-[30%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-slate-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-150'>
                        <h5 className='text-black text-xl'>{link.title}</h5>
                    </a>
                ))}
            </div>
        </ClientLayout>
    );
}

export default Index;

export const getServerSideProps = getSSProps;
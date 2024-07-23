import AdminLayout from 'layouts/admin.layout';
import { getSSProps } from 'public/assets/utils/helpers';
import React from 'react';

const Index = ({ user }) => {
    const links = [
        {
            title: 'إضافة مستخدم جديد',
            url: '/admin/users/new'
        },
        {
            title: 'تحرير المستخدم',
            url: '/admin/users/edit'
        },
        {
            title: 'ايقاف نشاط مستخدم',
            url: '/admin/users/suspend'
        },
        {
            title: 'اعادة تعيين كلمة المرور',
            url: '/admin/users/reset-password'
        },
        {
            title: 'الشكاوي والإقتراحات',
            url: '/admin/users/complaints'
        },
        {
            title: 'سجل النشاط',
            url: '/admin/users/activity-log'
        },
        {
            title: 'تحميل تقارير إكسيل',
            url: '/admin/users/excel-reports'
        },
    ]
    return (
        <AdminLayout user={user}>
            <h1 className='text-3xl font-bold mb-10'>إدارة المستخدمين</h1>
            <div className='flex flex-col gap-y-5'>
                {links.map((link, index) => (
                    <a key={index} href={link.url} className='center w-[30%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-slate-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-150'>
                        <h5 className='text-black text-xl'>{link.title}</h5>
                    </a>
                ))}
            </div>
        </AdminLayout>
    );
}

export default Index;

export const getServerSideProps = getSSProps;
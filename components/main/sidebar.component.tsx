import React, { ReactElement } from 'react';
import { _css, getAssetImage } from 'public/assets/utils/helpers';
import Divider from 'components/generic/ui/divider.component';



export const SidebarNavBar = ({ icon, text, url }) => {
    return (
        <a href={url} className='flex pt-[0.5em] pb-[0.5em] pr-[10%] min-w-14 justify-self-end items-center gap-x-5 rounded-xl transition-colors duration-150 hover:bg-[#353f66] cursor-pointer'>
            <i className={`fa-solid fa-${icon} text-white center`} />
            <h6 className='text-white'>{text}</h6>
        </a>
    )
}

const NavSection = ({ children }: { children: ReactElement[] }) => {
    return (
        <div className='flex flex-col gap-y-1'>
            {children.map((child, index) => <div key={index}>{child}</div>)}
        </div>
    )
}


const SidebarComponent = ({ // Default values are for /client
    upperSection = [
        SidebarNavBar({ icon: 'home', text: 'طلب توريد جديد', url: '/client/rfqs/new' }),
        SidebarNavBar({ icon: 'user', text: 'العروض الواردة', url: '/client/rfqs/incoming' }),
        SidebarNavBar({ icon: 'cog', text: 'العروض الصادرة', url: '/client/rfqs/outgoing' }),
        SidebarNavBar({ icon: 'sign-out', text: 'المعاملات السابقة', url: '/client/rfqs/history' }),
    ],
    bottomSection = [
        SidebarNavBar({ icon: 'home', text: 'من نحن', url: '/about' }),
        SidebarNavBar({ icon: 'user', text: 'الشروط والأحكام', url: '/terms' }),
        SidebarNavBar({ icon: 'cog', text: 'معلومات الاتصال', url: '/contact' }),
        SidebarNavBar({ icon: 'sign-out', text: 'الخدمات القادمة', url: '/services' }),
        SidebarNavBar({ icon: 'sign-out', text: 'سياسة الإسترجاع', url: '/refund-policy' }),
        SidebarNavBar({ icon: 'sign-out', text: 'المقترحات والشكاوي', url: '/suggestions-complaints' }),
        SidebarNavBar({ icon: 'sign-out', text: 'تسجيل الخروج', url: '/logout' }),
    ]
}: { upperSection?: ReactElement[], bottomSection?: ReactElement[] }) => {
    const sections = [
        NavSection({ children: upperSection }),
        NavSection({ children: bottomSection })
    ]
    return (
        <div
            className='bg-primary w-[20%] h-full fixed right-0 z-50 overflow-x-hidden pt-[20px] flex flex-col'>
            <div className='w-full h-20 center'>
                <img
                    className='flex justify-center mb-2 w-20 h-20'
                    src={getAssetImage('grey-logo.png')} alt="Logo | Grey" />
            </div>

            <Divider width='[100%]' height='px' color='bg-slate-50' addons='mt-5 bg-gray-50' />
            <div className='m-5 mt-15 mb-15 h-full flex flex-col justify-between'>
                {sections.map((navSection, index) => <div key={index}>{navSection}</div>)}
            </div>
        </div>
    );
}

export default SidebarComponent;
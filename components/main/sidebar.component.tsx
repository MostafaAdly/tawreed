import React, { ReactElement } from 'react';
import { _css, getAssetImage } from 'public/assets/utils/helpers';
import Divider from 'components/generic/ui/divider.component';



const Bar = ({ icon, text }) => {
    return (
        <div className='flex pt-[0.5em] pb-[0.5em] pr-[10%] min-w-14 justify-self-end items-center gap-x-5 rounded-xl transition-colors duration-150 hover:bg-[#353f66] cursor-pointer'>
            <i className={`fa-solid fa-${icon} text-white center`} />
            <h6 className='text-white'>{text}</h6>
        </div>
    )
}

const NavSection = ({ children }: { children: ReactElement[] }) => {
    return (
        <div className='flex flex-col gap-y-1'>
            {children.map((child, index) => <div key={index}>{child}</div>)}
        </div>
    )
}


const SidebarComponent = ({
    upperSection = [
        Bar({ icon: 'home', text: 'طلب توريد جديد' }),
        Bar({ icon: 'user', text: 'العروض الواردة' }),
        Bar({ icon: 'cog', text: 'العروض الصادرة' }),
        Bar({ icon: 'sign-out', text: 'المعاملات السابقة' }),
    ],
    bottomSection = [
        Bar({ icon: 'home', text: 'من نحن' }),
        Bar({ icon: 'user', text: 'الشروط والأحكام' }),
        Bar({ icon: 'cog', text: 'معلومات الاتصال' }),
        Bar({ icon: 'sign-out', text: 'الخدمات القادمة' }),
        Bar({ icon: 'sign-out', text: 'سياسة الإسترجاع' }),
        Bar({ icon: 'sign-out', text: 'المقترحات والشكاوي' }),
        Bar({ icon: 'sign-out', text: 'تسجيل الخروج' }),
    ]
}: { upperSection?: ReactElement[], bottomSection?: ReactElement[] }) => {
    const sections = [
        NavSection({ children: upperSection }),
        NavSection({ children: bottomSection })
    ]
    return (
        <div
            className='bg-primary w-[14%] h-full fixed right-0 z-100 overflow-x-hidden pt-[20px] flex flex-col'>
            <div className='w-full h-20 center'>
                <img
                    className='flex justify-center mb-2 w-20 h-20'
                    src={getAssetImage('grey-logo.png')} alt="Logo | Grey" />
            </div>

            <Divider color='bg-gray-100' addons='mt-5' />
            <div className='m-5 mt-15 mb-15 h-full flex flex-col justify-between'>
                {sections}
            </div>
        </div>
        // <nav className={_css(styles, 'sidebar')}>
        //     <div className={_css(styles, 'logo')}>
        //         <img src={getAssetImage('grey-logo.png')} alt="logo" />
        //     </div>
        //     <div className={_css(styles, 'divider')}></div>
        //     <div className={_css(styles, 'controls')}>
        //         {sections.map((section, index) => <section key={index} />)}
        //     </div>
        // </nav>
    );
}

export default SidebarComponent;
import React from 'react';
import { getSSProps } from '../public/assets/utils/helpers';
import HeaderComponent from 'components/main/header.component';
import SidebarComponent, { SidebarNavBar } from '../components/main/sidebar.component';


const SupplierLayout = ({ children }) => {
    return (
        <>
            <HeaderComponent />
            <SidebarComponent
                upperSection={[
                    SidebarNavBar({ icon: 'home', text: 'طلبات تسعير واردة', url: '/supplier/rfqs/incoming' }),
                    SidebarNavBar({ icon: 'user', text: 'قيد التنفيذ', url: '/supplier/rfqs/in-progress' }),
                    SidebarNavBar({ icon: 'cog', text: 'عروض مرسلة', url: '/supplier/rfqs/outgoing' }),
                    SidebarNavBar({ icon: 'sign-out', text: 'المعاملات', url: '/supplier/rfqs/completed' }),
                ]}
                bottomSection={[
                    SidebarNavBar({ icon: 'sign-out', text: 'تغير كلمة المرور', url: '/supplier/profile/change-password' }),
                    SidebarNavBar({ icon: 'sign-out', text: 'تغيير اللوجو', url: '/supplier/profile/change-logo' }),
                    SidebarNavBar({ icon: 'sign-out', text: 'تسجيل الخروج', url: '/logout' }),
                ]}
            />
            <main className='dashboard-layout'>
                {children}
            </main>
        </>
    );
}

export default SupplierLayout;

export const getServerSideProps = getSSProps
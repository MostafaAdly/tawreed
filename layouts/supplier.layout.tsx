import React from 'react';
import { getSSProps } from '../public/assets/utils/helpers';
import HeaderComponent from 'components/main/header.component';
import SidebarComponent, { SidebarNavBar } from '../components/main/sidebar.component';
import DashboardBody from './dashboard.body';


const SupplierLayout = ({ children, user }) => {
    return (
        <>
            <HeaderComponent user={user} />
            <SidebarComponent
                upperSection={[
                    SidebarNavBar({ icon: 'home', text: 'طلبات تسعير واردة', url: '/supplier/posts/incoming' }),
                    SidebarNavBar({ icon: 'user', text: 'قيد التنفيذ', url: '/supplier/posts/in-progress' }),
                    // SidebarNavBar({ icon: 'cog', text: 'عروض مرسلة', url: '/supplier/posts/outgoing' }),
                    SidebarNavBar({ icon: 'sign-out', text: 'المعاملات المكتملة', url: '/supplier/posts/completed' }),
                ]}
                bottomSection={[
                    SidebarNavBar({ icon: 'sign-out', text: 'تغير كلمة المرور', url: '/supplier/profile/change-password' }),
                    SidebarNavBar({ icon: 'sign-out', text: 'تغيير اللوجو', url: '/supplier`/profile/change-logo' }),
                    SidebarNavBar({ icon: 'sign-out', text: 'تسجيل الخروج', url: '/logout' }),
                ]}
            />
            <DashboardBody>{children}</DashboardBody>
        </>
    );
}

export default SupplierLayout;

export const getServerSideProps = getSSProps;
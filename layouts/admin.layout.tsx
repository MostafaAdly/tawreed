import React from 'react';
import { getSSProps } from '../public/assets/utils/helpers';
import HeaderComponent from 'components/main/header.component';
import SidebarComponent, { SidebarNavBar } from '../components/main/sidebar.component';
import DashboardBody from './dashboard.body';


const AdminLayout = ({ children, user }) => {
    return (
        <>
            <HeaderComponent user={user} />
            <SidebarComponent
                upperSection={[
                    SidebarNavBar({ icon: 'home', text: 'ادارة المستخدمين', url: '/admin/users' }),
                    SidebarNavBar({ icon: 'home', text: 'ادارة الطلبات', url: '/admin/posts/orders' }),
                    SidebarNavBar({ icon: 'home', text: 'ادارة العروض', url: '/admin/posts/offers' }),
                    SidebarNavBar({ icon: 'home', text: 'ادارة المدفوعات', url: '/admin/' }),
                    SidebarNavBar({ icon: 'home', text: 'ادارة المحتوى', url: '/admin/' }),
                    SidebarNavBar({ icon: 'home', text: 'اعدادات النظام', url: '/admin/' }),
                    SidebarNavBar({ icon: 'home', text: 'دعم العملاء', url: '/admin/' }),
                    SidebarNavBar({ icon: 'home', text: 'تسجيل الخروج', url: '/logout' }),
                ]}
                bottomSection={[]}
            />
            <DashboardBody>{children}</DashboardBody>
        </>
    );
}

export default AdminLayout;

export const getServerSideProps = getSSProps
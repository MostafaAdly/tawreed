import React from 'react';
import { getSSProps } from '../public/assets/utils/helpers';
import HeaderComponent from 'components/main/header.component';
import SidebarComponent, { SidebarNavBar } from '../components/main/sidebar.component';
import DashboardBody from './dashboard.body';


const AdminLayout = ({ children }) => {
    return (
        <>
            <HeaderComponent />
            <SidebarComponent
                upperSection={[
                    SidebarNavBar({ icon: 'home', text: 'ادارة المستخدمين', url: '/admin/users' }),
                    SidebarNavBar({ icon: 'home', text: 'ادارة الطلبات', url: '/admin/rfqs/requests' }),
                    SidebarNavBar({ icon: 'home', text: 'ادارة العروض', url: '/admin/rfqs/offers' }),
                    SidebarNavBar({ icon: 'home', text: 'ادارة المدفوعات', url: '/admin/' }),
                    SidebarNavBar({ icon: 'home', text: 'ادارة المحتوى', url: '/admin/' }),
                    SidebarNavBar({ icon: 'home', text: 'اعدادات النظام', url: '/admin/' }),
                    SidebarNavBar({ icon: 'home', text: 'دعم العملاء', url: '/admin/' }),
                    SidebarNavBar({ icon: 'home', text: 'تسجيل الخروج', url: '/admin/' }),
                ]}
                bottomSection={[]}
            />
            <DashboardBody>{children}</DashboardBody>
        </>
    );
}

export default AdminLayout;

export const getServerSideProps = getSSProps
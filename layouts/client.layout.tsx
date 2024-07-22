import React from 'react';
import { getSSProps } from '../public/assets/utils/helpers';
import HeaderComponent from 'components/main/header.component';
import SidebarComponent from '../components/main/sidebar.component';
import DashboardBody from './dashboard.body';


const ClientLayout = ({ children, user }) => {
    return (
        <>
            <HeaderComponent user={user} />
            <SidebarComponent />
            <DashboardBody>{children}</DashboardBody>
        </>
    );
}

export default ClientLayout;

export const getServerSideProps = getSSProps
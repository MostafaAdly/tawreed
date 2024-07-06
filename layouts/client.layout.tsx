import React from 'react';
import { getSSProps } from '../public/assets/utils/helpers';
import HeaderComponent from 'components/main/header.component';
import SidebarComponent from '../components/main/sidebar.component';


const ClientLayout = ({ children }) => {
    return (
        <>
            <HeaderComponent />
            <SidebarComponent />
            <main className='dashboard-layout'>
                {children}
            </main>
        </>
    );
}

export default ClientLayout;

export const getServerSideProps = getSSProps
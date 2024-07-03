import React from 'react';
import { getSSProps } from '../../public/assets/utils/helpers';
import HeaderComponent from 'components/generic/header.component';
import SidebarComponent from '../generic/sidebar.component';


const ClientLayout = ({ children }) => {
    return (
        <div>
            <HeaderComponent />
            <SidebarComponent />
            {children}
        </div>
    );
}

export default ClientLayout;

export const getServerSideProps = getSSProps
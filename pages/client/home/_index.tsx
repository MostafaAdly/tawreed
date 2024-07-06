import ClientLayout from 'layouts/client.layout';
import { _css, getSSProps } from 'public/assets/utils/helpers';
import React from 'react';
// import styles from 'public/pages/client/home/index.module.css';

const Index = ({ user }) => {
    return (
        <ClientLayout>
            <div className='bg-red-100 h-[100px]'>home</div>
        </ClientLayout>
    );
}

export default Index;

export const getServerSideProps = getSSProps;
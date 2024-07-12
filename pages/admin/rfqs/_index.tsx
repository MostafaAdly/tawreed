import AdminLayout from 'layouts/admin.layout';
import { GetServerSideProps } from 'next';
import { getSSProps } from 'public/assets/utils/helpers';
import React from 'react';


const Index = () => {
    return (
        <AdminLayout>
            <h1>rfqs</h1>
        </AdminLayout>
    )
}

export default Index;

export const getServerSideProps: GetServerSideProps = getSSProps;
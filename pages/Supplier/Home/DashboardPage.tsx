
import React from "react";
import styles from '../../../public/Supplier/Home/css/main.module.css'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';

const SupplierDashboardPage = ({ user, entity }) => {
    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className="supplier-body">
                <_self user={user} entity={entity} />
            </div>
        </>
    );
}

const _self = ({ user, entity }) => {
    return (
        <>

        </>
    );
}

export default SupplierDashboardPage;


export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
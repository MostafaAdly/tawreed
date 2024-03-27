import React from 'react'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/Supplier/MyRequests/css/SupplierRequestsPage.module.css'
import { _css } from '../../../public/Assets/Helpers';

const ApproveRFQ = ({ user, entity }) => {

    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className={_css(styles, 'supplier-body')}>
                <_self entity={entity} />
            </div>
        </>
    );
}

const _self = ({ entity }) => {
    return (
        <>
        </>
    );
}


export default ApproveRFQ;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
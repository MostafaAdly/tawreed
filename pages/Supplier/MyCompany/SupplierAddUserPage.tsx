import React from 'react'
import styles from '../../../public/Supplier/MyCompany/css/SupplierAddUserPage.module.css'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import { _css } from '../../../public/Assets/Helpers';

const SupplierAddUserPage = ({ user, entity }) => {
    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className={_css(styles, 'supplier-body')}>
                <_self user={user} entity={entity} />
            </div>
        </>
    );
}

const _self = ({ user, entity }) => {

    return (
        <>
            <div className={_css(styles, 'user-container')}>
                <div className={_css(styles, 'container-title')}>
                    <p></p>
                </div>

            </div>

        </>
    );
}

export default SupplierAddUserPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
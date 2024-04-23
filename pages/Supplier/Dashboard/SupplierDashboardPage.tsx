
import React from "react";
import styles from '../../../public/Supplier/Dashboard/css/SupplierDashboardPage.module.css'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import { _css } from "../../../public/Assets/Helpers";

const SupplierDashboardPage = ({ user, entity }) => {
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
            <section className={_css(styles, 'top')}>
                
            </section>
        </>
    );
}

const InfoBox = ({ label, number, color, href = "/", fontColor = "black" }) => {
    return (
        <div className={_css(styles, 'info-box center')}>
            <div className={_css(styles, 'circle center')} style={{ backgroundColor: color }}>
                <p style={{ color: fontColor }}>{number}</p>
            </div>
            <div className={_css(styles, 'content center')}>
                <a className={_css(styles, 'icon center')} href={href}>
                    <i className='fa-solid fa-arrow-right'></i>
                </a>
                <div className={_css(styles, 'label')}>
                    <p>{label}</p>
                </div>
            </div>
        </div>
    );
}


export default SupplierDashboardPage;


export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
import React from 'react'
import styles from '../../../public/Customer/Supplier/css/RFQ_Requested.module.css'
import { _css } from "../../../public/Assets/Helpers";
import C_HeaderComponent from '../Global/HeaderComponent';
import C_FooterComponent from '../Global/FooterComponent';

const RFQ_Requested = ({ user, supplier, product }) => {
    return (
        <>
            <C_HeaderComponent user={user} />
            <div className={_css(styles, 'page-body')}>
                <_self supplier={supplier} product={product} />
                <C_FooterComponent />
            </div>
        </>
    );
}

const _self = ({ supplier, product }) => {
    return (
        <>
            <div className={_css(styles, 'container-requested center')}>
                <div className={_css(styles, 'page-title')}>
                    <p>تم استلام طلب عرض السعر</p>
                </div>
                <div className={_css(styles, 'data center')}>
                    <p>تم استلام طلب عرض السعر بنجاح، سيتم التواصل معك في أقرب وقت ممكن</p>
                    <p>1 يوم 23 ساعة 59 دقيقة</p>
                </div>
                <button className={_css(styles, 'center opacity')}>
                    <i className={_css(styles, 'fa-solid fa-arrow-right-long')}></i>
                    <p>العودة للصفحة الرئيسية</p>
                </button>
            </div>
        </>
    );
}

export default RFQ_Requested;
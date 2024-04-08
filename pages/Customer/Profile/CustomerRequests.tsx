import React from 'react'
import styles from '../../../public/Customer/Profile/css/CustomerRequests.module.css'
import { _css, onTabClick } from "../../../public/Assets/Helpers";
import C_HeaderComponent from '../Global/HeaderComponent';
import C_FooterComponent from '../Global/FooterComponent';

const CustomerRequests = ({ user, products, rfqs }) => {
    return (
        <>
            <C_HeaderComponent user={user} />
            <div className={_css(styles, 'page-body')}>
                <_self product={products} rfqs={rfqs} />
                <C_FooterComponent />
            </div>
        </>
    );
}


const _self = ({ product, rfqs }) => {

    const onFiltering = (target) => {
        if (target.classList.contains(_css(styles, "filter-activated")))
            target.classList.remove(_css(styles, "filter-activated"));
        else
            target.classList.add(_css(styles, "filter-activated"));
    }

    return (
        <>
            <div className={_css(styles, 'requests-container')}>
                <section className={_css(styles, 'tabs')}>
                    <div
                        className={_css(styles, 'tab tab-activated opacity')}
                        onClick={(e) => onTabClick({ target: e.target, styles, activatedTabClassName: "tab-activated" })}
                        data-tab-id="orders" data-default-display="flex"
                    >
                        <p>طلبات</p>
                    </div>
                    <div
                        className={_css(styles, 'tab opacity')}
                        onClick={(e) => onTabClick({ target: e.target, styles, activatedTabClassName: "tab-activated" })}
                        data-tab-id="rfqs" data-default-display="flex"
                    >
                        <p>طلبات تسعير</p>
                    </div>
                </section>
                <section className={_css(styles, 'filters')}>
                    <div className={_css(styles, 'icon center opacity')}>
                        <i className={_css(styles, 'fa-solid fa-filter')}></i>
                    </div>
                    <div className={_css(styles, 'self')}>
                        {
                            ['جميع الطلبات', 'الطلبات الجديدة', 'جاري التجهيز', 'انتظار الرد', 'تم الموافقة'].map((filter, index) => {
                                return (
                                    <div className={_css(styles, 'filter opacity')} key={index} onClick={(e) => onFiltering(e.target)}>
                                        <p>{filter}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                </section>
                <section className={_css(styles, 'orders')} id="orders"></section>
                <section className={_css(styles, 'rfqs')} id="rfqs"></section>
            </div>
        </>
    );
}

export default CustomerRequests;
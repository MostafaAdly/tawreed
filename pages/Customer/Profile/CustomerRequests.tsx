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
        if (target.nodeName == "P")
            target = target.parentNode;
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
                        <p>طلباتي</p>
                    </div>
                    <div
                        className={_css(styles, 'tab opacity')}
                        onClick={(e) => onTabClick({ target: e.target, styles, activatedTabClassName: "tab-activated" })}
                        data-tab-id="rfqs" data-default-display="flex"
                    >
                        <p>طلبات عروض تسعير</p>
                    </div>
                </section>
                {/* ORDERS */}
                <section className={_css(styles, 'orders')} id="orders">
                    <div className={_css(styles, 'filters')}>
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
                    </div>
                    <table className='center'>
                        <tbody>
                            <tr>
                                <th><p>#</p></th>
                                <th><p>كود المنتج</p></th>
                                <th><p>وصف المنتج</p></th>
                                <th><p>المجموعة</p></th>
                                <th><p>السعر</p></th>
                                <th><p>حالة الشراء</p></th>
                                <th><p>التحكم</p></th>
                            </tr>
                            <tr>
                                <td><p><b>1</b></p></td>
                                <td><p>PID12345Ec</p></td>
                                <td className='name'><p>لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور</p></td>
                                <td><p>العدد</p></td>
                                <td><p>1224 ج.م</p></td>
                                <td><p>في الطريق</p></td>
                                <td>
                                    <div className={_css(styles, 'controls center')}>
                                        <button className='opacity'>
                                            <i className={_css(styles, 'fa-solid fa-trash')}></i>
                                        </button>
                                        <button className={_css(styles, 'visit opacity')}>
                                            <i className={_css(styles, 'fa-solid fa-eye')}></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                {/* REQUEST FOR QUOTATIONS */}
                <section className={_css(styles, 'rfqs')} id="rfqs">
                    <div className={_css(styles, 'filters')}>
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
                    </div>
                    <table className='center'>
                        <tbody>
                            <tr>
                                <th><p>#</p></th>
                                <th><p>كود المنتج</p></th>
                                <th><p>وصف المنتج</p></th>
                                <th><p>المجموعة</p></th>
                                <th><p>السعر</p></th>
                                <th><p>حالة الشراء</p></th>
                                <th><p>التحكم</p></th>
                            </tr>
                            <tr>
                                <td><p><b>1</b></p></td>
                                <td><p>PID12345Ec</p></td>
                                <td className='name'><p>لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور</p></td>
                                <td><p>العدد</p></td>
                                <td><p>1224 ج.م</p></td>
                                <td><p>في الطريق</p></td>
                                <td>
                                    <div className={_css(styles, 'controls center')}>
                                        <button className='opacity'>
                                            <i className={_css(styles, 'fa-solid fa-trash')}></i>
                                        </button>
                                        <button className={_css(styles, 'visit opacity')}>
                                            <i className={_css(styles, 'fa-solid fa-eye')}></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}

export default CustomerRequests;
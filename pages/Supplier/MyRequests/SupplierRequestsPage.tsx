import React from 'react'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/Supplier/MyRequests/css/SupplierRequestsPage.module.css'
import { _css } from '../../../public/Assets/Helpers';

const SupplierRequestsPage = ({ user, entity }) => {

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
            <section className={_css(styles, 'tabs')} id="section_tabs">
                <button
                    className={_css(styles, 'tab current-tab')}
                    id="tab_orders"
                    onClick={(e) => onTabClick(e)}
                    data-section='section_orders'
                >
                    <p>طلبات</p>
                </button>
                <button
                    className={_css(styles, 'tab')}
                    id="tab_quotations"
                    onClick={(e) => onTabClick(e)}
                    data-section='section_quotations'
                >
                    <p>طلبات تسعير</p>
                </button>
            </section>
            <section className={_css(styles, 'orders')} id="section_orders">
                <div className={_css(styles, 'filters')}>
                    <div className={_css(styles, 'icon box-shadow-hover center')}>
                        <i className={_css(styles, 'fa-solid fa-filter')}></i>
                    </div>
                    <div className={_css(styles, 'self')}>
                        <div className={_css(styles, 'filter checked box-shadow-hover')}>
                            <p>جميع المنتجات</p>
                            <div className={_css(styles, 'control')}>
                                <div className={_css(styles, 'check')}>
                                    <i className={_css(styles, 'fa-solid fa-circle-check')}></i>
                                </div>
                                <div className={_css(styles, 'exit')}>
                                    <i className={_css(styles, 'fa-solid fa-circle-xmark')}></i>
                                </div>
                            </div>
                        </div>
                        <div className={_css(styles, 'filter box-shadow-hover')}>
                            <p>منتجات مفعلة</p>
                            <div className={_css(styles, 'control')}>
                                <div className={_css(styles, 'check')}>
                                    <i className={_css(styles, 'fa-solid fa-circle-check')}></i>
                                </div>
                                <div className={_css(styles, 'exit')}>
                                    <i className={_css(styles, 'fa-solid fa-circle-xmark')}></i>
                                </div>
                            </div>
                        </div>
                        <div className={_css(styles, 'filter box-shadow-hover')}>
                            <p>منتجات غير مفعلة</p>
                            <div className={_css(styles, 'control')}>
                                <div className={_css(styles, 'check')}>
                                    <i className={_css(styles, 'fa-solid fa-circle-check')}></i>
                                </div>
                                <div className={_css(styles, 'exit')}>
                                    <i className={_css(styles, 'fa-solid fa-circle-xmark')}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th><p>رقم الطلب</p></th>
                            <th><p>أسم المنتج</p></th>
                            <th><p>الكمية</p></th>
                            <th><p>التاريخ</p></th>
                            <th><p>الحالة</p></th>
                            <th><p>عرض التفاصيل</p></th>
                        </tr>
                        <tr>
                            <td className={_css(styles, 'id')}>
                                <div className={_css(styles, 'center')}><p>RFQ2233A</p></div>
                            </td>
                            <td className={_css(styles, 'large')}>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Officia tempore eaque
                                    consectetur.
                                </p>
                            </td>
                            <td><p>100</p></td>
                            <td><p>12/12/2021</p></td>
                            <td>
                                <div className={_css(styles, 'center')}>
                                    <div className={_css(styles, 'box center box-shadow-hover')}>
                                        <p>طلب جديد</p>
                                        <i className={_css(styles, 'fa-solid fa-file-export')}></i>
                                    </div>
                                    <div
                                        className={_css(styles, 'choose-order center')}
                                    >
                                        <div className={_css(styles, 'title')}>
                                            <p>اختر إجراء</p>
                                        </div>
                                        <div className={_css(styles, 'self')}>
                                            <button><p>قيد التنفيذ</p></button>
                                            <button><p>جاهز للشخن</p></button>
                                            <button>
                                                <p>في انتظار التحميل</p>
                                            </button>
                                            <button>
                                                <p>في الإتجاه للعميل</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className={_css(styles, 'controls')}>
                                <button className={_css(styles, 'center box-shadow')}>
                                    <i className={_css(styles, 'fa-solid fa-trash')}></i>
                                </button>
                                <button className={_css(styles, 'center edit box-shadow')}>
                                    <i className={_css(styles, 'fa-solid fa-pen')}></i>
                                </button>
                                <button className={_css(styles, 'center view box-shadow')}>
                                    <i className={_css(styles, 'fa-solid fa-eye')}></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section className={_css(styles, 'quotations')} id="section_quotations">
                <div className={_css(styles, 'filters')}>
                    <div className={_css(styles, 'icon box-shadow-hover center')}>
                        <i className={_css(styles, 'fa-solid fa-filter')}></i>
                    </div>
                    <div className={_css(styles, 'self')}>
                        <div className={_css(styles, 'filter checked box-shadow-hover')}>
                            <p>جميع المنتجات</p>
                            <div className={_css(styles, 'control')}>
                                <div className={_css(styles, 'check')}>
                                    <i className={_css(styles, 'fa-solid fa-circle-check')}></i>
                                </div>
                                <div className={_css(styles, 'exit')}>
                                    <i className={_css(styles, 'fa-solid fa-circle-xmark')}></i>
                                </div>
                            </div>
                        </div>
                        <div className={_css(styles, 'filter box-shadow-hover')}>
                            <p>منتجات مفعلة</p>
                            <div className={_css(styles, 'control')}>
                                <div className={_css(styles, 'check')}>
                                    <i className={_css(styles, 'fa-solid fa-circle-check')}></i>
                                </div>
                                <div className={_css(styles, 'exit')}>
                                    <i className={_css(styles, 'fa-solid fa-circle-xmark')}></i>
                                </div>
                            </div>
                        </div>
                        <div className={_css(styles, 'filter box-shadow-hover')}>
                            <p>منتجات غير مفعلة</p>
                            <div className={_css(styles, 'control')}>
                                <div className={_css(styles, 'check')}>
                                    <i className={_css(styles, 'fa-solid fa-circle-check')}></i>
                                </div>
                                <div className={_css(styles, 'exit')}>
                                    <i className={_css(styles, 'fa-solid fa-circle-xmark')}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th><p>رقم الطلب</p></th>
                            <th><p>أسم المنتج</p></th>
                            <th><p>الكمية</p></th>
                            <th><p>التاريخ</p></th>
                            <th><p>الحالة</p></th>
                            <th><p>عرض التفاصيل</p></th>
                        </tr>
                        <tr>
                            <td className={_css(styles, 'id')}>
                                <div className={_css(styles, 'center')}><p>RFQ2233A</p></div>
                            </td>
                            <td className={_css(styles, 'large')}>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Officia tempore eaque
                                    consectetur.
                                </p>
                            </td>
                            <td><p>200</p></td>
                            <td><p>12/12/2021</p></td>
                            <td>
                                <div className={_css(styles, 'center')}>
                                    <div className={_css(styles, 'box center box-shadow-hover')}>
                                        <p>طلب جديد</p>
                                        <i className={_css(styles, 'fa-solid fa-file-export')}></i>
                                    </div>
                                    <div
                                        className={_css(styles, 'choose-order center')}
                                    >
                                        <div className={_css(styles, 'title')}>
                                            <p>اختر إجراء</p>
                                        </div>
                                        <div className={_css(styles, 'self')}>
                                            <button><p>قيد التنفيذ</p></button>
                                            <button><p>جاهز للشخن</p></button>
                                            <button>
                                                <p>في انتظار التحميل</p>
                                            </button>
                                            <button>
                                                <p>في الإتجاه للعميل</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className={_css(styles, 'controls')}>
                                <button className={_css(styles, 'center box-shadow')}>
                                    <i className={_css(styles, 'fa-solid fa-trash')}></i>
                                </button>
                                <button className={_css(styles, 'center edit box-shadow')}>
                                    <i className={_css(styles, 'fa-solid fa-pen')}></i>
                                </button>
                                <button className={_css(styles, 'center view box-shadow')}>
                                    <i className={_css(styles, 'fa-solid fa-eye')}></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    );
}



const onTabClick = (e) => {
    const tabs = document.getElementById("section_tabs")?.children;
    if (!tabs?.length) return;
    var target = e.target;
    if (e.target.tagName.toLowerCase() == "p")
        target = e.target.parentNode
    for (var all of tabs)
        if (all) {
            all.classList.remove(styles['current-tab']);
            const sectionId = all.getAttribute("data-section");
            if (!sectionId) continue;
            const section = document.getElementById(sectionId);
            if (section)
                section.style.display = "none";
        }
    target.classList.add(styles['current-tab']);
    const sectionId = target.getAttribute("data-section");
    if (!sectionId) return;
    const section = document.getElementById(sectionId);
    if (section)
        section.style.display = "block";
}

export default SupplierRequestsPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
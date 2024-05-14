import React, { useEffect, useState } from 'react'
import A_HeaderComponent from '../Global/HeaderComponent';
import A_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/AdminPanel/Entities/css/AdminEntitiesPage.module.css'
import { _css, onTabClick } from '../../../public/Assets/Helpers'


const AdminEntitiesPage = ({ user, entities }) => {
    return (
        <>
            <A_HeaderComponent user={user} />
            <A_SidebarComponent />
            <main className={_css(styles, 'supplier-body')}>
                <_self user={user} />
            </main>
        </>
    )
}

const _self = ({ user }) => {
    const [currentPopup, setCurrentPopup] = useState(null);

    useEffect(() => {

        const popups = document.querySelectorAll(`.${_css(styles, 'popup')}`) as any;
        const popup = currentPopup as any;

        if (popup) {
            popups.forEach((p) => {
                if (p.id !== popup) {
                    p.style.visibility = "hidden";
                }
            });
            const popupElement = (document.getElementById(popup) as any);
            if (popupElement)
                popupElement.style.visibility = "visible";
        } else {
            popups.forEach((p) => {
                p.style.visibility = "hidden";
            });
        }

    }, [currentPopup]);

    const togglePopup = (popupId) => {
        if (currentPopup === popupId) return setCurrentPopup(null);
        setCurrentPopup(popupId);
    };

    return (
        <>
            <section className={_css(styles, 'tabs')}>
                <button
                    className={_css(styles, 'tab opacity-active activated-tab')}
                    onClick={(e) => onTabClick({ target: e.target, styles, activatedTabClassName: "activated-tab" })}
                    data-tab-id="entities"
                    data-default-display="flex"
                >
                    <p>الشركات المسجلة</p>
                </button>
                <button className={_css(styles, 'tab opacity-active')}
                    onClick={(e) => onTabClick({ target: e.target, styles, activatedTabClassName: "activated-tab" })}
                    data-tab-id="add-entity"
                    data-default-display="flex"
                >
                    <p>تسجيل شركة جديدة</p>
                </button>
            </section>
            <section className={_css(styles, 'entities')} id="entities">
                <table>
                    <tbody>
                        <tr>
                            <th><p>رقم الشركة</p></th>
                            <th><p>إسم الشركة</p></th>
                            <th><p>نوع الحساب</p></th>
                            <th><p>عدد المنتجات</p></th>
                            <th><p>المستخدمين</p></th>
                            <th><p>الإجرائات</p></th>
                        </tr>
                        <tr>
                            <td><p>TE1234C</p></td>
                            <td><p>شركة العربي</p></td>
                            <td>
                                <div className={_css(styles, 'account supplier-account center')}>
                                    <p className='center'>حساب بائع</p>
                                </div>
                            </td>
                            <td><p>3 أصناف</p></td>
                            <td className='center'>
                                <div className={_css(styles, 'center view-users')} onClick={() => togglePopup("TE1234C")}>
                                    <p>اظهار</p>
                                    <div className={_css(styles, 'popup')} id="TE1234C">
                                        <div className={_css(styles, 'use')}>
                                            <div className={_css(styles, 'user')}>
                                                <p>محمد علي</p>
                                                <p className={_css(styles, 'rank_0')}>مدير</p>
                                            </div>
                                            <div className={_css(styles, 'user')}>
                                                <p>محمد علي</p>
                                                <p className={_css(styles, 'rank_1')}>مدير</p>
                                            </div>
                                            <div className={_css(styles, 'user')}>
                                                <p>محمد علي</p>
                                                <p className={_css(styles, 'rank_2')}>مدير</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className={_css(styles, 'controls center')}>
                                    <a className='center opacity-active' href="/a">
                                        <i className='fa-solid fa-eye' />
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section >
            <section className={_css(styles, 'add-entity')} id="add-entity" style={{ display: "none" }}>dsa</section>
        </>
    )
}

export default AdminEntitiesPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
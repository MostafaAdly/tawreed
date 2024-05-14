import React from "react";
import styles from '../../public/Authentication/css/PersonaSelectionPage.module.css';
import { _css, getImage, isCustomer, isSupplier } from "../../public/Assets/Helpers";
import { LoginFooter } from "./LoginPage";


const PersonaSelectionPage = ({ user, entity }) => {
    return (
        <>
            <main className={_css(styles, 'container center')}>
                <div className={_css(styles, 'logo center')}>
                    <img
                        src={getImage("logo.png")}
                        alt="T.E.C Tawreed Logo"
                        draggable="false"
                    />
                </div>
                <div className={_css(styles, 'title')}><p>الرجاء اختيار نوع الحساب</p></div>
                <div className={_css(styles, 'personas')}>
                    <a className={_css(styles, 'persona box-shadow-hover')} href="/profile">
                        <div className={_css(styles, 'image center')}>
                            <i className={_css(styles, 'fa-solid fa-gear')}></i>
                        </div>
                        <div className={_css(styles, 'info')}>
                            <p>حسابك - Profile</p>
                        </div>
                    </a>
                    {
                        isCustomer(entity) ?
                            <a className={_css(styles, 'persona box-shadow-hover')} href="/c">
                                <div className={_css(styles, 'image center')}>
                                    <i className={_css(styles, 'fa-solid fa-user')}></i>
                                </div>
                                <div className={_css(styles, 'info')}>
                                    <p>عميل - Client</p>
                                </div>
                            </a> : null
                    }
                    {
                        isSupplier(entity) ?
                            (
                                <a className={_css(styles, 'persona box-shadow-hover')} href="/s">
                                    <div className={_css(styles, 'image center')}>
                                        <i className={_css(styles, 'fa-solid fa-building')}></i>
                                    </div>
                                    <div className={_css(styles, 'info')}>
                                        <p>مورد - Supplier</p>
                                    </div>
                                </a>
                            )
                            : null
                    }
                    {
                        user?.admin ?
                            (
                                <a className={_css(styles, 'persona box-shadow-hover')} href="/a">
                                    <div className={_css(styles, 'image center')}>
                                        <i className={_css(styles, 'fa-solid fa-truck-fast')}></i>
                                    </div>
                                    <div className={_css(styles, 'info')}>
                                        <p>التحكم - Dashboard</p>
                                    </div>
                                </a>
                            )
                            : null
                    }
                </div>
                <LoginFooter />
            </main >
        </>
    );
}

export default PersonaSelectionPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
import React from "react";
import styles from '../../../public/Customer/Global/css/header.module.css';
import { _css, getImage } from "../../../public/Assets/Helpers";

const C_HeaderComponent = ({ user }) => {
    return (
        <>
            <div className={_css(styles, 'header')}>
                <a className={_css(styles, 'logo center')} href="/c">
                    <img src={getImage("logo.png")} alt="Tawreed Logo" />
                </a>
                <nav className={_css(styles, 'tabs')}>
                    <div className={_css(styles, 'tab activeTab')}>
                        <a href="/">الرئيسية</a>
                    </div>
                    <div className={_css(styles, 'tab')}>
                        <a href="/">تصنيفات</a>
                    </div>
                    <div className={_css(styles, 'tab')}>
                        <a href="/">الشركات</a>
                    </div >
                    <div className={_css(styles, 'tab')}>
                        <a href="/">الأصناف</a>
                    </div>
                </nav >
                <div className={_css(styles, 'controls center')}>
                    <a className={_css(styles, 'notifications center')} href="/c/requests">
                        {/* <div className={_css(styles, 'notificationsCount center')}><p>3</p></div> */}
                        <i className={_css(styles, 'fa-solid fa-file-export')}></i>
                    </a>
                    <a className={_css(styles, 'notifications center')} href="/c/requests">
                        {/* <div className={_css(styles, 'notificationsCount center')}><p>3</p></div> */}
                        <i className={_css(styles, 'fa-solid fa-file-import')}></i>
                    </a>
                    <div className={_css(styles, 'notifications center')}>
                        {/* <div className={_css(styles, 'notificationsCount center')}><p>3</p></div> */}
                        <i className={_css(styles, 'fa-solid fa-bell')}></i>

                    </div>
                    <div className={_css(styles, 'profile center')}>
                        <div className={_css(styles, 'profileImage')}>
                            <img src={getImage("default-profile-picture.png")} alt="Profile Picture" />
                        </div>
                        <div className={_css(styles, 'profileUsername center')}>
                            <p>{user?.displayName || "أسم المستخدم"}</p>
                            <i className={_css(styles, 'fa-solid fa-angles-down')}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default C_HeaderComponent;
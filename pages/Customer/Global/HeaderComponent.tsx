import React from "react";
import styles from '../../../public/Customer/Global/css/header.module.css';
import { _css, getImage } from "../../../public/Assets/Helpers";

const C_HeaderComponent = ({ user }) => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo + " " + styles.center}>
                    <img src={getImage("logo.png")} alt="Tawreed Logo" />
                </div>
                <nav className={styles.tabs}>
                    <div className={styles.tab + " " + styles.activeTab}>
                        <a href="/">الرئيسية</a>
                    </div>
                    <div className={styles.tab}>
                        <a href="/">تصنيفات</a>
                    </div>
                    <div className={styles.tab}>
                        <a href="/">الشركات</a>
                    </div >
                    <div className={styles.tab}>
                        <a href="/">الأصناف</a>
                    </div>
                </nav >
                <div className={styles.controls + " " + styles.center}>
                    <div className={styles.notifications + " " + styles.center}>
                        {/* <div className={styles.notificationsCount + " " + styles.center}><p>3</p></div> */}
                        <i className={_css(styles, 'fa-solid fa-bell')}></i>
                    </div>
                    <div className={styles.profile + " " + styles.center}>
                        <div className={styles.profileImage}>
                            <img src={getImage("default-profile-picture.png")} alt="Profile Picture" />
                        </div>
                        <div className={styles.profileUsername + " " + styles.center}>
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
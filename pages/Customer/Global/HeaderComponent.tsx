import React from "react";
import styles from '../../../public/Customer/Global/css/header.module.css';

const C_HeaderComponent = ({ user }) => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo + " " + styles.center}>
                    <img src="https://cdn.discordapp.com/attachments/729182998217359361/1215745947259371601/logo.png?ex=65fddea5&is=65eb69a5&hm=7ee9f4848c6f33549446bd808119283cc39b6857655b2a0db8abd09556426f21&" alt="Tawreed Logo" />
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
                        <i className="fa-solid fa-bell"></i>
                    </div>
                    <div className={styles.profile + " " + styles.center}>
                        <div className={styles.profileImage}>
                            <img src="https://cdn.discordapp.com/attachments/729182998217359361/1216084583137939636/profile.png?ex=65ff1a06&is=65eca506&hm=51a952ecfea3dad049a0cc6ade98ebba7cf569bc6f028c7c16763e3813472873&" alt="" />
                        </div>
                        <div className={styles.profileUsername + " " + styles.center}>
                            <p>{user?.displayName || "أسم المستخدم"}</p>
                            <i className="fa-solid fa-angles-down"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default C_HeaderComponent;
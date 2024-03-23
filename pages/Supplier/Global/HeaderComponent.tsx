import React from "react";
import styles from '../../../public/Supplier/Global/css/header.module.css';

const S_HeaderComponent = ({ user, entity }) => {
    return (
        <div className={styles.header}>
            <div className={styles['logo-section']}>
                <img src="../../Global/imgs/logo.png" alt="" />
            </div>
            <div className={styles.title + " " + styles.center}>
                <div className={styles.icon}>
                    <i className="fa-solid fa-building"></i>
                </div>
                <p>{entity.details.displayName}</p>
            </div>
            <div className={styles['search-section'] + " " + styles.center}>
                <div className={styles.icon + " " + styles.center}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type="text" placeholder="اكتب أي شيئ للبحث" />
                <div className={styles['search-by-image'] + " " + styles.center}>
                    <i className="fa-solid fa-camera"></i>
                </div>
            </div>
            <div className={styles['profile-section']}>
                <div className={styles.notifications}>
                    <div className={styles.count + " " + styles.count}>
                        {/* <p>3</p> */}
                    </div>
                    <div className={styles.icon}>
                        <i className="fa-solid fa-bell"></i>
                    </div>
                </div>
                <div className={styles.profile + " box-shadow"}>
                    <img src="https://cdn.discordapp.com/attachments/729182998217359361/1216084583137939636/profile.png?ex=66085486&is=65f5df86&hm=8dfa89c1e023feeb0ffb78fcb3176a025a3d98b942dca56721f0ebbd93156bfb&" alt="" />
                </div>
            </div>
        </div>
    );
}

export default S_HeaderComponent;
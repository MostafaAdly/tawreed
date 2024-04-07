import React from "react";
import styles from '../../../public/Supplier/Global/css/header.module.css';
import { _css, getImage } from "../../../public/Assets/Helpers";

const S_HeaderComponent = ({ user, entity }) => {
    return (
        <div className={styles.header}>
            <div className={styles['logo-section']}>
                <img src="../../Global/imgs/logo.png" alt="" />
            </div>
            <div className={styles.title + " " + styles.center}>
                <div className={styles.icon}>
                    <i className={_css(styles, 'fa-solid fa-building')}></i>
                </div>
                <p>{entity.details.displayName}</p>
            </div>
            <div className={styles['search-section'] + " " + styles.center}>
                <div className={styles.icon + " " + styles.center}>
                    <i className={_css(styles, 'fa-solid fa-magnifying-glass')}></i>
                </div>
                <input type="text" placeholder="اكتب أي شيئ للبحث" />
                <div className={styles['search-by-image'] + " " + styles.center}>
                    <i className={_css(styles, 'fa-solid fa-camera')}></i>
                </div>
            </div>
            <div className={styles['profile-section']}>
                <div className={styles.notifications}>
                    <div className={styles.count + " " + styles.count}>
                        {/* <p>3</p> */}
                    </div>
                    <div className={styles.icon}>
                        <i className={_css(styles, 'fa-solid fa-bell')}></i>
                    </div>
                </div>
                <div className={styles.profile + " box-shadow"}>
                    <img src={getImage("default-profile-picture.png")} alt="" />
                </div>
            </div>
        </div>
    );
}

export default S_HeaderComponent;
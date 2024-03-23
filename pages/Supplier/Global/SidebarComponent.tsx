import React from "react";
import styles from '../../../public/Supplier/Global/css/sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'



const S_SidebarComponent = ({ }) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles['top-section']}>
                <a href="/s">
                    <div className={styles.icon}>
                        <i className="fa-solid fa-table-cells-large"></i>
                    </div>
                    <div className={styles.title}>
                        <p>الرئيسية</p>
                    </div>
                </a>
                <a href="/s">
                    <div className={styles.icon}>
                        <i className="fa-solid fa-building"></i>
                    </div>
                    <div className={styles.title}>
                        <p>شركتي</p>
                    </div>
                </a>
                <a href="/s/products">
                    <div className={styles.icon}>
                        <i className="fa-solid fa-boxes-stacked"></i>
                    </div>
                    <div className={styles.title}>
                        <p>منتجاتي</p>
                    </div>
                </a>
                <a href="/s/orders">
                    <div className={styles.icon}>
                        <i className="fa-solid fa-table-cells-large"></i>
                    </div>
                    <div className={styles.title}>
                        <p>طلباتي</p>
                    </div>
                </a>
                <a href="/s/payments">
                    <div className={styles.icon}>
                        <i className="fa-solid fa-money-bill-1-wave"></i>
                    </div>
                    <div className={styles.title}>
                        <p>المدفوعات</p>
                    </div>
                </a>
                <a href="/s/statistics">
                    <div className={styles.icon}>
                        <i className="fa-solid fa-chart-simple"></i>
                    </div>
                    <div className={styles.title}>
                        <p>التحليل</p>
                    </div>
                </a>
            </div>
            <div className={styles['bottom-section']}>
                <a href="/s/chat">
                    <div className={styles.icon}>
                        <i className="fa-solid fa-message"></i>
                    </div>
                    <div className={styles.title}>
                        <p>الرسائل</p>
                    </div>
                </a>
                <a href="/logout">
                    <div className={styles.icon}>
                        <i className="fa-solid fa-table-cells-large"></i>
                    </div>
                    <div className={styles.title}>
                        <p>تسجيل الخروج</p>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default S_SidebarComponent;
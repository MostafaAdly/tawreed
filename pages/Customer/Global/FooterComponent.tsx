import React from "react";
import styles from '../../../public/Customer/Global/css/footer.module.css';
import { _css, getImage } from '../../../public/Assets/Helpers';


const C_FooterComponent = ({ }) => {
    return (
        <>
            <footer className={styles.footer + " " + styles.center}>
                <div className={styles.logo}>
                    <img src={getImage("grey-logo.png")} alt="Tawreed Logo" />
                </div>
                <div className={styles.companyInfo + " " + styles.center}>
                    <a href="">سياسة الخصوصية</a>
                    <a href="">سياسة الاتسبدال</a>
                    <a href="">من نحن</a>
                    <a href="">تواصل معنا</a>
                </div>
                <div className={styles.socialLinks + " " + styles.center}>
                    <div className={styles.divider}></div>
                    <div className={styles.links + " " + styles.center}>
                        <a href="" className={styles.link + " " + styles.center}>
                            <i className={_css(styles, 'fa-brands fa-facebook')}></i>
                        </a>
                        <a href="" className={styles.link + " " + styles.center}>
                            <i className={_css(styles, 'fa-brands fa-instagram')}></i>
                        </a>
                        <a href="" className={styles.link + " " + styles.center}>
                            <i className={_css(styles, 'fa-brands fa-twitter')}></i>
                        </a>
                        <a href="" className={styles.link + " " + styles.center}>
                            <i className={_css(styles, 'fa-brands fa-linkedin')}></i>
                        </a>
                        <a href="" className={styles.link + " " + styles.center}>
                            <i className={_css(styles, 'fa-regular fa-envelope')}></i>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default C_FooterComponent;
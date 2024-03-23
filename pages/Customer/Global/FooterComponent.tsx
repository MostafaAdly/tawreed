import React from "react";
import styles from '../../../public/Customer/Global/css/footer.module.css';


const C_FooterComponent = ({ }) => {
    return (
        <>
            <footer className={styles.footer + " " + styles.center}>
                <div className={styles.logo}>
                    <img src="https://cdn.discordapp.com/attachments/729182998217359361/1216082353588404334/grey_logo.png?ex=65ff17f2&is=65eca2f2&hm=bf461d30de793d218bb004334dc698f5f52ca02aaa589432a146220ae4953a38&" alt="Tawreed Logo" />
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
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a href="" className={styles.link + " " + styles.center}>
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="" className={styles.link + " " + styles.center}>
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="" className={styles.link + " " + styles.center}>
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="" className={styles.link + " " + styles.center}>
                            <i className="fa-regular fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default C_FooterComponent;
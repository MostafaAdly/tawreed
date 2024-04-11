import React from "react";
import styles from '../../public/Authentication/css/LoginPage.module.css';
import { _css, getImage } from '../../public/Assets/Helpers';

const LoginPage = ({ error }) => {
    return (
        <>
            <main className={styles.container}>
                <div className={styles.logo}>
                    <img
                        src={getImage("logo.png")}
                        alt="T.E.C Tawreed Logo"
                        draggable="false"
                    />
                </div>
                <div className={styles.authContainer}>
                    <p className={styles.authTitle}>تسجيل الدخول</p>
                    <form action="/login" method="POST">
                        <div className={styles.inputArea}>
                            <p className={styles.inputLabel}>أسم المستخدم</p>
                            <div className={_css(styles, `inputField ${error ? "error" : ""}`)}>
                                <i className={_css(styles, 'fa-solid fa-user')}></i>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        placeholder="رقم الهاتف أو البريد الالكتروني"
                                        id="username" name="username"
                                        dir="ltr"
                                        defaultValue={"MostafaAdly"}
                                    />
                                </div>
                            </div>
                            {error ? <p className={_css(styles, 'error')}>خطأ في البيانات! الرجاء إعادة إدخال بياناتك</p> : null}
                        </div>
                        <div className={styles.inputArea}>
                            <p className={styles.inputLabel}>كلمة المرور</p>
                            <div className={_css(styles, `inputField ${error ? "error" : ""}`)}>
                                <i className={_css(styles, 'fa-solid fa-lock')}></i>
                                <div className={styles.input}>
                                    {/* <input type="password" placeholder="********" id="password" name="password" dir="ltr" /> */}
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        dir="ltr"
                                        defaultValue={"123123"} />
                                </div>
                            </div>
                            {error ? <p className={_css(styles, 'error')}>خطأ في البيانات! الرجاء إعادة إدخال بياناتك</p> : null}
                        </div>
                        {/* <div className={styles.forgotPassword}>
                            <p className={styles.label}>هل فقدت كلمة المرور؟</p>
                            <a href="forgot-password">إعادة ظبط كلمة المرور</a>
                        </div> */}
                        <div className={styles.buttons}>
                            <div className={`${styles.authButton} ${styles.center}`}>
                                <button type="submit">
                                    <i className={_css(styles, 'fa-solid fa-arrow-right')}></i> تسجيل الدخول
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* <div className={`${styles.authButton} ${styles.newAccount} center`}>
                    <button>
                        <i className={_css(styles, 'fa-solid fa-arrow-right-to-bracket')}></i>
                        حساب جديد
                    </button>
                </div> */}
                    {/* <div className={styles.guestBrowse} >
                        <p className={styles.label}>هل تريد التصفح كضيف؟</p>
                        <a href="/">تصفح الآن</a>
                    </div> */}
                </div>
            </main>
            <footer className={styles.footer}>
                <div className={styles.footerDivider}></div>
                <div className={`${styles.companyInfo} center`}>
                    <a className={styles.info} href="">سياسة الخصوصية</a>
                    <a className={styles.info} href="">سياسة الاستبدال</a>
                    <a className={styles.info} href="">من نحن</a>
                    <a className={styles.info} href="">تواصل معنا</a>
                </div>
                <div className={styles.companyName + ' center'}>
                    حقوق النشر محفوظة © T.E.C Tawreed
                </div>
                <div className={styles.socialMedia}>
                    <div className={`${styles.media} center`}>
                        <i className={_css(styles, 'fa-brands fa-facebook')}></i>
                    </div>
                    <div className={`${styles.media} center`}>
                        <i className={_css(styles, 'fa-brands fa-twitter')}></i>
                    </div>
                    <div className={`${styles.media} center`}>
                        <i className={_css(styles, 'fa-brands fa-instagram')}></i>
                    </div>
                    <div className={`${styles.media} center`}>
                        <i className={_css(styles, 'fa-brands fa-linkedin')}></i>
                    </div>
                    <div className={`${styles.media} center`}>
                        <i className={_css(styles, 'fa-regular fa-envelope')}></i>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default LoginPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
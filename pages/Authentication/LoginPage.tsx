import React from "react";
import styles from '../../public/Authentication/css/LoginPage.module.css';
import { _css, getImage } from '../../public/Assets/Helpers';

const LoginPage = ({ error }) => {
    return (
        <>
            <main className={_css(styles, 'container center')}>
                <div className={_css(styles, 'logo')}>
                    <img
                        src={getImage("logo.png")}
                        alt="T.E.C Tawreed Logo"
                        draggable="false"
                    />
                </div>
                <div className={_css(styles, 'authContainer')}>
                    <p className={_css(styles, 'authTitle')}>تسجيل الدخول</p>
                    <form action="/login" method="POST">
                        <div className={_css(styles, 'inputArea')}>
                            <p className={_css(styles, 'inputLabel')}>أسم المستخدم</p>
                            <div className={_css(styles, `inputField ${error ? "error" : ""}`)}>
                                <i className={_css(styles, 'fa-solid fa-user')}></i>
                                <div className={_css(styles, 'input')}>
                                    <input
                                        type="text"
                                        placeholder="رقم الهاتف أو البريد الالكتروني"
                                        id="username" name="username"
                                        dir="ltr"
                                        defaultValue={"tawreed"}
                                    />
                                </div>
                            </div>
                            {error ? <p className={_css(styles, 'error')}>خطأ في البيانات! الرجاء إعادة إدخال بياناتك</p> : null}
                        </div>
                        <div className={_css(styles, 'inputArea')}>
                            <p className={_css(styles, 'inputLabel')}>كلمة المرور</p>
                            <div className={_css(styles, `inputField ${error ? "error" : ""}`)}>
                                <i className={_css(styles, 'fa-solid fa-lock')}></i>
                                <div className={_css(styles, 'input')}>
                                    {/* <input type="password" placeholder="********" id="password" name="password" dir="ltr" /> */}
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        dir="ltr"
                                        defaultValue={"tawreed"} />
                                </div>
                            </div>
                            {error ? <p className={_css(styles, 'error')}>خطأ في البيانات! الرجاء إعادة إدخال بياناتك</p> : null}
                        </div>
                        {/* <div className={_css(styles, 'forgotPassword}>
                            <p className=')}label}>هل فقدت كلمة المرور؟</p>
                            <a href="forgot-password">إعادة ظبط كلمة المرور</a>
                        </div> */}
                        <div className={_css(styles, 'buttons')}>
                            <div className={_css(styles, 'authButton center')}>
                                <button type="submit">
                                    <i className={_css(styles, 'fa-solid fa-arrow-right')}></i> تسجيل الدخول
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* <div className={_css(styles, 'authButton newAccount center')}>
                        <button>
                            <i className={_css(styles, 'fa-solid fa-arrow-right-to-bracket')}></i>
                            حساب جديد
                        </button>
                    </div>
                    <div className={_css(styles, 'guestBrowse')}>
                        <p className={_css(styles, 'label')}>هل تريد التصفح كضيف؟</p>
                        <a href="/">تصفح الآن</a>
                    </div> */}
                </div>
                <LoginFooter />
            </main>
        </>
    );
}

export const LoginFooter = ({ }) => {
    return (
        <footer className={_css(styles, 'footer center')}>
            <div className={_css(styles, 'footerDivider')}></div>
            <div className={_css(styles, 'companyInfo center')}>
                <a className={_css(styles, 'info')} href="">سياسة الخصوصية</a>
                <a className={_css(styles, 'info')} href="">سياسة الاستبدال</a>
                <a className={_css(styles, 'info')} href="">من نحن</a>
                <a className={_css(styles, 'info')} href="">تواصل معنا</a>
            </div>
            <div className={_css(styles, 'companyName center')}>
                حقوق النشر محفوظة © T.E.C Tawreed
            </div>
            <div className={_css(styles, 'socialMedia center')}>
                <div className={_css(styles, 'media')}>
                    <i className={_css(styles, 'fa-brands fa-facebook')}></i>
                </div>
                <div className={_css(styles, 'media')}>
                    <i className={_css(styles, 'fa-brands fa-twitter')}></i>
                </div>
                <div className={_css(styles, 'media')}>
                    <i className={_css(styles, 'fa-brands fa-instagram')}></i>
                </div>
                <div className={_css(styles, 'media')}>
                    <i className={_css(styles, 'fa-brands fa-linkedin')}></i>
                </div>
                <div className={_css(styles, 'media')}>
                    <i className={_css(styles, 'fa-regular fa-envelope')}></i>
                </div>
            </div>
        </footer>
    );
}
export default LoginPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
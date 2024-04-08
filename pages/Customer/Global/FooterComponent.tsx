import React from "react";
import styles from '../../../public/Customer/Global/css/footer.module.css';
import { _css, getImage } from '../../../public/Assets/Helpers';


const C_FooterComponent = ({ }) => {
    return (
        <>
            <footer className={_css(styles, 'footer center')}>
                <div className={_css(styles, 'logo')}>
                    <img src={getImage("grey-logo.png")} alt="Tawreed Logo" />
                </div>
                <div className={_css(styles, 'companyInfo center')}>
                    <a href="">سياسة الخصوصية</a>
                    <a href="">سياسة الاتسبدال</a>
                    <a href="">من نحن</a>
                    <a href="">تواصل معنا</a>
                </div>
                <div className={_css(styles, 'socialLinks center')}>
                    <div className={_css(styles, 'divider')}></div>
                    <div className={_css(styles, 'links center')}>
                        <a href="" className={_css(styles, 'link center')}>
                            <i className={_css(styles, 'fa-brands fa-facebook')}></i>
                        </a>
                        <a href="" className={_css(styles, 'link center')}>
                            <i className={_css(styles, 'fa-brands fa-instagram')}></i>
                        </a>
                        <a href="" className={_css(styles, 'link center')}>
                            <i className={_css(styles, 'fa-brands fa-twitter')}></i>
                        </a>
                        <a href="" className={_css(styles, 'link center')}>
                            <i className={_css(styles, 'fa-brands fa-linkedin')}></i>
                        </a>
                        <a href="" className={_css(styles, 'link center')}>
                            <i className={_css(styles, 'fa-regular fa-envelope')}></i>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default C_FooterComponent;
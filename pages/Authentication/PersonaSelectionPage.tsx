import React from "react";
import styles from '../../public/Authentication/css/PersonaSelectionPage.module.css';
import { _css, getImage } from "../../public/Assets/Helpers";
import { LoginFooter } from "./LoginPage";


const PersonaSelectionPage = () => {
    return (
        <>
            <main className={_css(styles, 'container center')}>
                <div className={_css(styles, 'logo center')}>
                    <img
                        src={getImage("logo.png")}
                        alt="T.E.C Tawreed Logo"
                        draggable="false"
                    />
                </div>
                <div className={_css(styles, 'title')}><p>الرجاء اختيار نوع الحساب</p></div>
                <div className={_css(styles, 'personas')}>
                    <a className={_css(styles, 'persona box-shadow-hover')} href="/profile">
                        <div className={_css(styles, 'image center')}>
                            <i className={_css(styles, 'fa-solid fa-gear')}></i>
                        </div>
                        <div className={_css(styles, 'info')}>
                            <p>حسابك - Profile</p>
                        </div>
                    </a>
                    <a className={_css(styles, 'persona box-shadow-hover')} href="/c">
                        <div className={_css(styles, 'image center')}>
                            <i className={_css(styles, 'fa-solid fa-user')}></i>
                        </div>
                        <div className={_css(styles, 'info')}>
                            <p>مستورد - Customer</p>
                        </div>
                    </a>
                    <a className={_css(styles, 'persona box-shadow-hover')} href="/s">
                        <div className={_css(styles, 'image center')}>
                            <i className={_css(styles, 'fa-solid fa-building')}></i>
                        </div>
                        <div className={_css(styles, 'info')}>
                            <p>مورد - Supplier</p>
                        </div>
                    </a>
                </div>
                <LoginFooter />
            </main >
        </>
    );
}

export default PersonaSelectionPage;
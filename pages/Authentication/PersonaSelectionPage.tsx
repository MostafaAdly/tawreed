import React from "react";
import styles from '../../public/Authentication/css/PersonaSelectionPage.module.css';
import { css } from "../../public/Assets/Helpers";



const PersonaSelectionPage = () => {
    return (
        <>
            <div className={css(styles, 'container center')}>
                <div className={css(styles, 'logo center')}>
                    <img
                        src="https://cdn.discordapp.com/attachments/729182998217359361/1215745947259371601/logo.png?ex=65fddea5&is=65eb69a5&hm=7ee9f4848c6f33549446bd808119283cc39b6857655b2a0db8abd09556426f21&"
                        alt="T.E.C Tawreed Logo"
                        draggable="false"
                    />
                </div>
                <div className={css(styles, 'title')}><p>الرجاء اختيار نوع الحساب</p></div>
                <div className={css(styles, 'personas')}>
                    <a className={css(styles, 'persona box-shadow-hover')} href="/c">
                        <div className={css(styles, 'image center')}>
                            <i className={css(styles, 'fa-solid fa-user')}></i>
                        </div>
                        <div className={css(styles, 'info')}>
                            <p>Customer - زبون</p>
                        </div>
                    </a>
                    <a className={css(styles, 'persona box-shadow-hover')} href="/s">
                        <div className={css(styles, 'image center')}>
                            <i className={css(styles, 'fa-solid fa-building')}></i>
                        </div>
                        <div className={css(styles, 'info')}>
                            <p>Supplier - مورد</p>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}

export default PersonaSelectionPage;
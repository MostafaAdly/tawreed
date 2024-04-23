import React from "react";
import styles from '../../../public/Supplier/Global/css/header.module.css';
import { _css, getImage } from "../../../public/Assets/Helpers";

const S_HeaderComponent = ({ user, entity, title = entity?.details?.displayName, icon = "building" }) => {
    return (
        <div className={_css(styles, 'header')}>
            <div className={_css(styles, 'logo-section')}>
                <img src={getImage("logo.png")} alt="" />
            </div>
            <div className={_css(styles, 'title center')}>
                <div className={_css(styles, 'icon')}>
                    <i className={_css(styles, 'fa-solid fa-' + icon)}></i>
                </div>
                <p>{title}</p>
            </div>
            <div className={_css(styles, 'search-section center')}>
                <div className={_css(styles, 'icon center')}>
                    <i className={_css(styles, 'fa-solid fa-magnifying-glass')}></i>
                </div>
                <input type="text" placeholder="اكتب أي شيئ للبحث" />
                <div className={_css(styles, 'search-by-image center')}>
                    <i className={_css(styles, 'fa-solid fa-camera')}></i>
                </div>
            </div>
            <div className={_css(styles, 'profile-section')}>
                <div className={_css(styles, 'notifications')}>
                    <div className={_css(styles, 'count count')}>
                        {/* <p>3</p> */}
                    </div>
                    <div className={_css(styles, 'icon')}>
                        <i className={_css(styles, 'fa-solid fa-bell')}></i>
                    </div>
                </div>
                <div className={_css(styles, 'profile box-shadow')}>
                    <img src={getImage("default-profile-picture.png")} alt="" />
                </div>
            </div>
        </div>
    );
}

export default S_HeaderComponent;
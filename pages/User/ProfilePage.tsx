import React from "react";
import styles from '../../public/User/css/ProfilePage.module.css';
import { _css, currentTime, getImage, onTabClick, toFormattedDate, toFormattedDateOnly } from '../../public/Assets/Helpers';
import { LoginFooter } from "../Authentication/LoginPage";

const ProfilePage = ({ user, entity, usersCount }) => {
    return <_self user={user} entity={entity} usersCount={usersCount} />
}

const _self = ({ user, entity, usersCount }) => {
    return (
        <main className={_css(styles, 'page-body center')}>
            <div className={_css(styles, 'profile-container')}>
                <div className={_css(styles, 'page-title center')}>
                    <p>الصفحة الشخصية</p>
                </div>
                <div className={_css(styles, 'title center')}>
                    <p>مرحباً بك: </p>
                    <p>{user.displayName}</p>
                </div>
                <section className={_css(styles, 'image-container center')}>
                    <label className={_css(styles, 'image')} htmlFor="profile-image">
                        <img src={getImage("default-profile-picture.png")} alt="" />
                    </label>
                    <input type="file" id="profile-image" name="profile-image" hidden />
                    <label htmlFor="profile-image" className={_css(styles, 'center opacity-active')}>
                        <p>تحميل الصورة الشخصية</p>
                        <i className={_css(styles, 'fa-solid fa-upload')} />
                    </label>
                </section>
                <section className={_css(styles, 'tabs')}>
                    <button
                        className={_css(styles, 'main-tab main-tab-activated')}
                        onClick={(e) => onTabClick({ target: e.target, styles, tabClassName: "main-tab", activatedTabClassName: "main-tab-activated" })}
                        data-tab-id="personal-settings"
                        data-default-display="flex"
                    >
                        <p>معلوماتي الشخصية</p>
                    </button>
                    <button
                        className={_css(styles, 'main-tab')}
                        onClick={(e) => onTabClick({ target: e.target, styles, tabClassName: "main-tab", activatedTabClassName: "main-tab-activated" })}
                        data-tab-id="company-settings"
                        data-default-display="flex">
                        <p>الشركة وإدارة المستخدمين</p>
                    </button>
                    <button
                        className={_css(styles, 'main-tab')}
                        onClick={(e) => onTabClick({ target: e.target, styles, tabClassName: "main-tab", activatedTabClassName: "main-tab-activated" })}
                        data-tab-id="more-settings"
                        data-default-display="flex">
                        <p>إدارة الطلبات والتوريد</p>
                    </button>
                </section>
                <section className={_css(styles, 'main-settings')} id="main-settings">
                    <section id="personal-settings" style={{ display: "flex" }}>
                        <SettingsRow label={"الإسم"} value={user.displayName} />
                        <SettingsRow label={"اللقب"} value={user.role.name} readOnly />
                        <SettingsRow label={"تاريخ تكوين الحساب"} value={toFormattedDate(user.createdAt)} readOnly dir="ltr" />
                        <SettingsRow label={"نوع الحساب"} value={`${entity.personas.supplier ? "مورد" : ""} و ${entity.personas.customer ? "مشتري" : ""}`} readOnly />
                        <SettingsRow label={"كلمة المرور"} value={user.credentials.password} />
                    </section>
                    <section id="company-settings">
                        <SettingsRow label={"إسم الشركة"} value={entity.details.displayName} />
                        <SettingsRow label={"عدد المستخدمين"} value={`${usersCount} مستخدمين`} readOnly />
                        <SettingsRow label={"السجل التجاري"} value={"---"} readOnly />
                        <SettingsRow label={"البطاقة الضريبية"} value={"---"} readOnly />
                        <SettingsRow label={"العنوان القانوني"} value={"---"} readOnly />
                    </section>
                    <section id="more-settings">
                        <SettingsRow label={"عنوان التوريد"} value={"---"} readOnly />
                        <SettingsRow label={"تليفون المخرن"} value={"---"} readOnly />
                    </section>
                </section>
                <section className={_css(styles, 'tabs')}>
                    <button
                        className={_css(styles, 'sub-tab sub-tab-activated')}
                        onClick={(e) => onTabClick({ target: e.target, styles, tabClassName: "sub-tab", activatedTabClassName: "sub-tab-activated" })}
                        data-tab-id="global-settings"
                        data-default-display="flex"
                    >
                        <p>الإعدادات العامة</p>
                    </button>
                    <button
                        className={_css(styles, 'sub-tab')}
                        onClick={(e) => onTabClick({ target: e.target, styles, tabClassName: "sub-tab", activatedTabClassName: "sub-tab-activated" })}
                        data-tab-id="comm-settings"
                        data-default-display="flex">
                        <p>إعدادات التواصل</p>
                    </button>
                    <button
                        className={_css(styles, 'sub-tab')}
                        onClick={(e) => onTabClick({ target: e.target, styles, tabClassName: "sub-tab", activatedTabClassName: "sub-tab-activated" })}
                        data-tab-id="notify-settings"
                        data-default-display="flex">
                        <p>اعدادات الإشعارات</p>
                    </button>
                </section>
                <section className={_css(styles, 'sub-settings')}>
                    <section id="global-settings" style={{ display: "flex" }}>
                        <SettingsRow label={"اللغة"} value={"العربية"} />
                        <SettingsRow label={"التاريخ"} value={toFormattedDateOnly()} readOnly dir="ltr" />
                        <SettingsRow label={"الساعة"} value={currentTime()} readOnly dir="ltr" />
                    </section>
                    <section id="comm-settings"></section>
                    <section id="notify-settings"></section>
                </section>
            </div>
            <LoginFooter />
        </main>
    )
}


const SettingsRow = ({ label, value, readOnly = false, dir = "rtl" }) => {
    return (
        <div className={_css(styles, 'settings-row')}>
            <div className={_css(styles, 'row-label')}>
                <p>{label}</p>
            </div>
            <div className={_css(styles, 'row-value')}>
                <p dir={dir}>{value}</p>
            </div>
            <div className={_css(styles, 'row-control')}>
                <button>
                    <i className={_css(styles, `fa-solid fa-${readOnly ? "eye" : "pen"}`)} />
                </button>
            </div>
        </div>
    );
}


export default ProfilePage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
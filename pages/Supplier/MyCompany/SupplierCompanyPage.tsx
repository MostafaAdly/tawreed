import React from 'react'
import styles from '../../../public/Supplier/MyCompany/css/SupplierCompanyPage.module.css'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import { _css } from '../../../public/Assets/Helpers';

const SupplierCompanyPage = ({ user, entity }) => {
    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className={_css(styles, 'supplier-body')}>
                <_self user={user} entity={entity} />
            </div>
        </>
    );
}

const _self = ({ user, entity }) => {
    const usersElement: any[] = [];

    return (
        <>
            <div className={styles.upload}>
                <input type="file" name="banner" id="banner" hidden />
                <input type="file" name="logo" id="logo" hidden />
                <label className={styles.banner + " center" + " box-shadow-hover"} htmlFor="banner">
                    <div className={styles.icon}>
                        <i className={_css(styles, 'fa-solid fa-arrow-up-from-bracket')}></i>
                    </div>
                    <div className={styles.title}>
                        <p>تحميل صورة الغلاف</p>
                    </div>
                    <div className={styles.info + " center"}>
                        <p>المقاس المطلوب</p>
                        <p>1440x384</p>
                    </div>
                    <div className={styles.info + " center"}>
                        <p>الصيغة المدعومة</p>
                        <p dir="ltr">.png, .jpg, .svg</p>
                    </div>
                </label>
                <label className={styles.logo + " center" + " box-shadow-hover"} htmlFor="logo">
                    <div className={styles.icon}>
                        <i className={_css(styles, 'fa-solid fa-arrow-up-from-bracket')}></i>
                    </div>
                    <div className={styles.title}>
                        <p>تحميل اللوجو</p>
                    </div>
                    <div className={styles.info + " center"}>
                        <p>المقاس المطلوب</p>
                        <p>256x256</p>
                    </div>
                    <div className={styles.info + " center"}>
                        <p>الصيغة المدعومة</p>
                        <p dir="ltr">.png, .jpg, .svg</p>
                    </div>
                </label>
            </div>
            <div className={styles['users-controller']}>
                <div className={styles.title}><p>المستخدمين</p></div>
                <table>
                    <tbody>
                        <tr>
                            <th><p>الإسم</p></th>
                            <th><p>اللقب</p></th>
                            <th><p>الوظيفة</p></th>
                            <th><p>الإجرائات</p></th>
                        </tr>
                        {
                            entity?.users?.map((user: any, index) => {
                                return (
                                    <tr key={index}>
                                        <td><p>{user.displayName}</p></td>
                                        <td><p>{user.role.name}</p></td>
                                        <td><p>{user.role.name}</p></td>
                                        <td className={styles.controls + " center"}>
                                            <button>
                                                <i className={_css(styles, 'fa-solid fa-pen')}></i>
                                            </button>
                                            <button className={styles.trash}>
                                                <i className={_css(styles, 'fa-solid fa-trash')}></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className={styles.description}>
                <div className={styles.title}><p>عن الشركة</p></div>
                <div className={styles.info}><p>اكتب ملخص عن الشركة</p></div>
                <textarea
                    typeof="text"
                    defaultValue={entity.details.description}
                    rows={8}
                    placeholder="اكتب وصف عن الشركة"
                ></textarea>
            </div >
        </>
    );
}

export default SupplierCompanyPage;


export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
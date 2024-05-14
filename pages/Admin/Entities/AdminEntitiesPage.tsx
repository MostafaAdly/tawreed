import React, { useEffect, useState } from 'react'
import A_HeaderComponent from '../Global/HeaderComponent';
import A_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/AdminPanel/Entities/css/AdminEntitiesPage.module.css'
import { _css, API_BASE_URL, isCustomer, isGeneral, isSupplier, onTabClick, registerNewEntity } from '../../../public/Assets/Helpers'


const AdminEntitiesPage = ({ user, users, entities, roles, departments }) => {
    return (
        <>
            <A_HeaderComponent user={user} />
            <A_SidebarComponent />
            <main className={_css(styles, 'supplier-body')}>
                <_self user={user} users={users} entities={entities} roles={roles} departments={departments} />
            </main>
        </>
    )
}

const _self = ({ user, users, entities, roles, departments }) => {
    const [currentPopup, setCurrentPopup] = useState(null);

    useEffect(() => {

        const popups = document.querySelectorAll(`.${_css(styles, 'popup')}`) as any;
        const popup = currentPopup as any;

        if (popup) {
            popups.forEach((p) => {
                if (p.id !== popup) {
                    p.style.visibility = "hidden";
                }
            });
            const popupElement = (document.getElementById(popup) as any);
            if (popupElement)
                popupElement.style.visibility = "visible";
        } else {
            popups.forEach((p) => {
                p.style.visibility = "hidden";
            });
        }

    }, [currentPopup]);

    const togglePopup = (popupId) => {
        if (currentPopup === popupId) return setCurrentPopup(null);
        setCurrentPopup(popupId);
    };

    const sendRegisterNewEntity = async (target: any) => {
        const entity = {
            displayName: target.entity_displayName.value,
            description: target.entity_description.value,
            department: target.department.value,
            type: target.entity_type.value,
        };

        // check password if it matches the confirmation
        if (target.user_password.value !== target.user_password.value) {
            alert("كلمة المرور غير متطابقة");
            return;
        }

        const userData = {
            displayName: target.user_displayName.value,
            phone: target.user_phone.value,
            email: target.user_email.value,
            username: target.user_username.value,
            password: target.user_password.value,
            role: target.user_role.value,
        };

        const formData = new FormData();
        formData.append('entity', JSON.stringify(entity));
        formData.append('user', JSON.stringify(userData));
        const response = await registerNewEntity({ token: user.token, userId: user._id, entity, user: userData }) || {};
        if (response.success) {
            alert("تم تسجيل الشركة بنجاح");
            return window.location.reload();
        } else {
            alert("حدث خطأ أثناء تسجيل الشركة");
        }
    }

    return (
        <>
            <section className={_css(styles, 'tabs')}>
                <button
                    className={_css(styles, 'tab opacity-active activated-tab')}
                    onClick={(e) => onTabClick({ target: e.target, styles, activatedTabClassName: "activated-tab" })}
                    data-tab-id="entities"
                    data-default-display="flex"
                >
                    <p>الشركات المسجلة</p>
                </button>
                <button className={_css(styles, 'tab opacity-active')}
                    onClick={(e) => onTabClick({ target: e.target, styles, activatedTabClassName: "activated-tab" })}
                    data-tab-id="add-entity"
                    data-default-display="flex"
                >
                    <p>تسجيل شركة جديدة</p>
                </button>
            </section>
            <section className={_css(styles, 'entities')} id="entities">
                <table>
                    <tbody>
                        <tr>
                            <th><p>رقم الشركة</p></th>
                            <th><p>إسم الشركة</p></th>
                            <th><p>نوع الحساب</p></th>
                            <th><p>عدد المنتجات</p></th>
                            <th><p>المستخدمين</p></th>
                            <th><p>الإجرائات</p></th>
                        </tr>
                        {
                            entities.map((entity, index) => {
                                return <tr key={index}>
                                    <td><p>{entity.entityId}</p></td>
                                    <td><p>{entity.details.displayName}</p></td>
                                    <td>
                                        <div className={_css(styles, `account ${isGeneral(entity) ? "general" : (isSupplier(entity) ? "supplier" : "customer")}-account center`)}>
                                            <p className='center'>حساب {isGeneral(entity) ? "مزدوج" : (isSupplier(entity) ? "بائع" : "مشتري")}</p>
                                        </div>
                                    </td>
                                    <td><p>{entity.personas.supplier.products.length} أصناف</p></td>
                                    <td className='center'>
                                        <div className={_css(styles, 'center view-users')} onClick={() => togglePopup(entity.entityId)}>
                                            <p>{users.filter((user) => user.entity == entity._id).length} مستخدمين</p>
                                            <div className={_css(styles, 'popup')} id={entity.entityId}>
                                                <div className={_css(styles, 'users')}>
                                                    {
                                                        users.filter((user) => user.entity == entity._id).map((user, index) => {
                                                            return <div key={index} className={_css(styles, 'user')}>
                                                                <p>{user.displayName}</p>
                                                                <p className={_css(styles, `rank_${user.role.priority}`)}>{user.role.name}</p>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={_css(styles, 'controls center')}>
                                            <a className='center opacity-active' href="/a">
                                                <i className='fa-solid fa-eye' />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </section >
            <form
                className={_css(styles, 'add-entity')}
                id="add-entity"
                style={{ display: "none" }}
                action={`${API_BASE_URL}/entities`}
                method='POST'
                encType='multipart/form-data'
                onSubmit={(e) => {
                    e.preventDefault();
                    sendRegisterNewEntity(e.target);
                }}
            >
                <div className={_css(styles, 'entity-container')}>
                    <div className={_css(styles, 'title')}>
                        <p>معلومات الشركة</p>
                    </div>
                    <StringInput id='entity_displayName' title='إسم الشركة' placeHolder='أدخل إسم الشركة' />
                    <SelectMenuInput id='entity_type' title="نوع الشركة"
                        selection={
                            [
                                { _id: "0", name: "بائع" },
                                { _id: "1", name: "مشتري" },
                                { _id: "2", name: "مزدوج" },
                            ]
                        } />
                    <div className={_css(styles, 'string-textarea')}>
                        <label>اكتب ملخص عن الشركة</label>
                        <textarea name='description' id='entity_description' placeholder='أدخل وصف الشركة' required
                        />
                    </div>
                    <div className={_css(styles, 'image-upload')} style={{ display: 'none' }}>
                        <div className={_css(styles, 'logo opacity-active center')}>
                            <div className={_css(styles, 'icon')}>
                                <i className='fa-solid fa-image' />
                            </div>
                            <p>تحميل اللوجو</p>
                            <div className={_css(styles, 'center info')}>
                                <p>المقاس المطلوب</p>
                                <p>256x256</p>
                            </div>
                            <div className={_css(styles, 'center info')}>
                                <p>الصيغة المدعومة</p>
                                <p>Png, Jpg, Svg</p>
                            </div>
                        </div>
                        <div className={_css(styles, 'banner opacity-active center')}>
                            <div className={_css(styles, 'icon')}>
                                <i className='fa-solid fa-image' />
                            </div>
                            <p>تحميل صورة الغلاف</p>
                            <div className={_css(styles, 'center info')}>
                                <p>المقاس المطلوب</p>
                                <p>1440x384</p>
                            </div>
                            <div className={_css(styles, 'center info')}>
                                <p>الصيغة المدعومة</p>
                                <p>Png, Jpg, Svg</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={_css(styles, 'entity-container center')}>
                    <div className={_css(styles, 'title')}>
                        <p>تصنيفات الشركة</p>
                    </div>
                    <SelectMenuInput id='department' title='إسم التصنيف' selection={departments} />
                </div>
                <div className={_css(styles, 'entity-container center')}>
                    <div className={_css(styles, 'title')}>
                        <p>إضافة بيانات المستخدم الرئيسي</p>
                    </div>
                    <StringInput id='user_displayName' title='إسم المستخدم' placeHolder='أدخل إسم المستخدم' />
                    <StringInput id='user_phone' title='رقم الهاتف' placeHolder='0100-000-0000' />
                    <StringInput id='user_email' title='البريد الإلكتروني' placeHolder='me@mycompany.com' />
                    <SelectMenuInput id='user_role' title="الوظيفة" selection={roles} />
                    <StringInput id='user_username' title='إسم الدخول' placeHolder='أدخل إسم الدخول' type="password" />
                    <StringInput id='user_password' title='كلمة المرور' placeHolder='**********' type="password" />
                    <StringInput id='' title='تأكيد كلمة المرور' placeHolder='**********' type="password" />
                </div>
                <div className={_css(styles, 'center')}>
                    <button className={_css(styles, 'center')} type='submit'>
                        <i className='fa-solid fa-plus' />
                        <p>أكمل التسجيل</p>
                    </button>
                </div>
            </form>
        </>
    )
}

export default AdminEntitiesPage;

const StringInput = ({ id, title, placeHolder, type = "text" }) => {
    return (
        <div className={_css(styles, 'string-input center')}>
            <label>{title}</label>
            <input type={type} name='string' id={id == '' ? undefined : id} placeholder={placeHolder} required
            />
        </div>
    )
}

const SelectMenuInput = ({ id, title, selection }) => {
    return (
        <div className={_css(styles, 'string-input center')}>
            <label>{title}</label>
            <select name={id} id={`${id}-select`} required
            >
                {selection.map((select, index) => <option key={index} value={select._id}>{select.name}</option>)}
            </select>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
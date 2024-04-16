import React from 'react'
import styles from '../../../public/Supplier/MyCompany/css/SupplierAddUserPage.module.css'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import { _css, API_BASE_URL } from '../../../public/Assets/Helpers';
import SaveButton from '../../../public/Assets/Components/SaveButton';

const SupplierAddUserPage = ({ user, entity }) => {
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

    const onSave = (e) => {
        const [password, confirm] = [document.getElementsByName('password'), document.getElementsByName('confirm-password')] as any;
        if (password.length && confirm.length && password[0].value !== confirm[0].value) {
            e.preventDefault();
            alert('كلمة المرور غير متطابقة');
            return;
        }
    }

    return (
        <>
            <form
                className={_css(styles, 'container')}
                method='POST'
                action={`${API_BASE_URL}/profile/add-user`}
                target='_blank'
                id='user-form'
            >
                <div className={_css(styles, 'user-container center')}>
                    <div className={_css(styles, 'container-title')}>
                        <p>معلومات المستخدم الجديد</p>
                    </div>
                    <div className={_css(styles, 'fields center')}>
                        <InputField label='الإسم' name='displayName' placeHolder='مثال: محمد محمود' icon='user' />
                        <InputField label='رقم الهاتف' name='phone' placeHolder='+20 100 000 0000' icon='phone' />
                        <InputField label='البريد الإلكتروني' type="email" name='email' placeHolder='your.name@yourcompany.com' icon='envelope' />
                        <InputField label='المسمى الوظيفي' name='nickname' placeHolder='مثال: محاسب' icon='user-tie' />
                        <InputField
                            label='الوظيفة (بداخل الشركة)'
                            name='role'
                            placeHolder='مثال: مدير المشتريات' icon='user-tie'
                            roles={entity.roles}
                            select />
                    </div>
                </div>
                <div className={_css(styles, 'user-container center')}>
                    <div className={_css(styles, 'container-title')}>
                        <p>معلومات الدخول</p>
                    </div>
                    <div className={_css(styles, 'fields center')}>
                        <InputField label='إسم المستخدم' name='username' placeHolder='Mohammed_Mahmoud' icon='user' />
                        <InputField label='كلمة المرور' name='password' placeHolder='********' icon='lock' type="password" />
                        <InputField label='أعد كتابة كلمة المرور' name='confirm-password' placeHolder='********' icon='lock' type="password" />
                    </div>
                </div>
                <SaveButton onSave={onSave} />
                <input type="text" name='userId' defaultValue={user._id.toString()} hidden />
                <input type="text" name='token' defaultValue={user.token} hidden />
                <input type="text" name='entityId' defaultValue={entity._id.toString()} hidden />
            </form>
        </>
    );
}

const InputField = ({ label, name, id = name, placeHolder, icon, type = "text", required = true, select = false, roles = [] }) => {
    return (
        <div className={_css(styles, 'field')}>
            <label className={_css(styles, 'label')} htmlFor={name}>{label}</label>
            <div className={_css(styles, 'input box-shadow')}>
                <i className={`fa-solid fa-${icon}`}></i>
                {
                    !select ?
                        <input type={type} name={name} id={id} placeholder={placeHolder} required />
                        : <select name="role">
                            {
                                roles.map((role: any, index) => <option key={index} value={role._id.toString()}>{role.name}</option>)
                            }
                        </select>
                }
            </div>
        </div>
    );
}

export default SupplierAddUserPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
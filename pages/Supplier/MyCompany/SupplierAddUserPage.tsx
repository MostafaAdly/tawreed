import React from 'react'
import styles from '../../../public/Supplier/MyCompany/css/SupplierAddUserPage.module.css'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import { _css, API_BASE_URL } from '../../../public/Assets/Helpers';
import SaveButton from '../../../public/Assets/Components/SaveButton';

const SupplierAddUserPage = ({ user, entity, editedUser }) => {
    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className={_css(styles, 'supplier-body')}>
                <_self user={user} entity={entity} editedUser={editedUser} />
            </div>
        </>
    );
}

const _self = ({ user, entity, editedUser }) => {

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
                action={`${API_BASE_URL}/profile/user`}
                target='_blank'
                id='user-form'
            >
                <div className={_css(styles, 'user-container center')}>
                    <div className={_css(styles, 'container-title')}>
                        <p>معلومات المستخدم الجديد</p>
                    </div>
                    <div className={_css(styles, 'fields center')}>
                        <InputField label='الإسم' name='displayName' placeHolder='مثال: محمد محمود' icon='user' value={editedUser?.displayName} />
                        <InputField label='رقم الهاتف' name='phone' placeHolder='+20 100 000 0000' icon='phone' value={editedUser?.details?.phone} required={false} />
                        <InputField label='البريد الإلكتروني' type="email" name='email' placeHolder='your.name@yourcompany.com' icon='envelope' value={editedUser?.details?.email} required={false} />
                        <InputField label='المسمى الوظيفي' name='nickname' placeHolder='مثال: محاسب' icon='user-tie' value={editedUser?.details?.nickname} required={false} />
                        <InputField
                            label='الوظيفة (بداخل الشركة)'
                            name='role'
                            placeHolder='مثال: مدير المشتريات' icon='user-tie'
                            roles={entity.roles}
                            value={editedUser?.role}
                            select />
                    </div>
                </div>
                <div className={_css(styles, 'user-container center')}>
                    <div className={_css(styles, 'container-title')}>
                        <p>معلومات الدخول</p>
                    </div>
                    <div className={_css(styles, 'fields center')}>
                        <InputField label='إسم المستخدم' name='username' placeHolder='Mohammed_Mahmoud' icon='user' value={editedUser?.credentials?.username} />
                        <InputField label='كلمة المرور' name='password' placeHolder='********' icon='lock' type="password" value={editedUser?.credentials?.password} />
                        <InputField label='أعد كتابة كلمة المرور' name='confirm-password' placeHolder='********' icon='lock' type="password" value={editedUser?.credentials?.password} />
                    </div>
                </div>
                <SaveButton onSave={onSave} />
                <input type="text" name='userId' defaultValue={user._id.toString()} hidden />
                <input type="text" name='token' defaultValue={user.token} hidden />
                <input type="text" name='entityId' defaultValue={editedUser?.entity?.toString() || entity._id.toString()} hidden />
                {
                    !editedUser ? null :
                        <>
                            <input type="text" name='user_id' defaultValue={editedUser._id.toString()} hidden />
                        </>
                }
            </form>
        </>
    );
}

const InputField = ({ label, name, id = name, placeHolder, icon, type = "text", required = true, select = false, roles = [], value }) => {
    return (
        <div className={_css(styles, 'field')}>
            <label className={_css(styles, 'label')} htmlFor={name}>{label}</label>
            <div className={_css(styles, 'input box-shadow')}>
                <i className={`fa-solid fa-${icon}`}></i>
                {
                    !select ?
                        <input type={type} name={name} id={id} placeholder={placeHolder} defaultValue={value || ""} required={required} />
                        : (<select name="role">
                            {
                                !value ? null :
                                    <option value={value._id.toString()}>{value.name}</option>
                            }
                            {
                                roles
                                    .filter((role: any) => role.roleId != value?.roleId)
                                    .map((role: any, index) =>
                                        <option key={index} value={role._id.toString()}>{role.name}</option>
                                    )
                            }
                        </select>)
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
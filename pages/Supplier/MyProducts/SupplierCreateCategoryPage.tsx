import React from 'react'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/Supplier/MyProducts/css/SupplierAddProductPage.module.css'
import { _css, API_BASE_URL, createNewCategory } from '../../../public/Assets/Helpers';

const SupplierCreateCategoryPage = ({ user, entity, ancestry }) => {

    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className={_css(styles, 'supplier-body')}>
                <_self user={user} entity={entity} ancestry={ancestry} />
            </div>
        </>
    );
}

const _self = ({ user, entity, ancestry }) => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        const response = await createNewCategory(data as any) || {};
        if (response.success) {
            alert("تم إضافة المجموعة بنجاح");
            window.location.href = `/s/products`;
        } else {
            alert("حدث خطأ أثناء إضافة المجموعة");
        }
    }

    return (
        <>
            <div className={_css(styles, 'container-title')}><p>أدخل مجموعة جديد</p></div>
            <form
                className={_css(styles, 'product')}
                method="post"
                action={`${API_BASE_URL}/category/create`}
                encType="multipart/form-data"
                target="_blank"
                onSubmit={onSubmit}
            >
                <div className={_css(styles, 'fields')}>
                    <Field
                        name={"ancestry"}
                        label="التصنيفات السابقة"
                        title="التصنيفات السابقة"
                        value={ancestry}
                        dir='ltr'
                        disabled
                    />
                    <Field
                        name={"name"}
                        label="اكتب إسم المجموعة"
                        title="إسم المجموعة"
                        placeHolder="مثال: الحدايد"
                    />
                </div>
                <section className={_css(styles, 'description')}>
                    <div className={_css(styles, 'container-title')}>
                        <p>الوصف التفصيلي للمنتج</p>
                    </div>
                    <div className={_css(styles, 'self')}>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="أكتب وصف تفصيلي للمجموعة لتعريف المورد بمميزاته"
                            required
                        ></textarea>
                    </div>
                </section>
                <section className={_css(styles, 'submit center')}>
                    <button className={_css(styles, 'center box-shadow-hover')} type="submit">
                        <i className={_css(styles, 'fa-solid fa-arrow-right-long')}></i>
                        <p>أضف المجموعة</p>
                    </button>
                </section>
                <input type="text" name='ancestry' defaultValue={ancestry} hidden />
                <input type="text" name='entity' defaultValue={entity._id.toString()} hidden />
                <input type="text" name='userId' defaultValue={user._id.toString()} hidden />
                <input type="text" name='token' defaultValue={user.token} hidden />
            </form>
        </>
    );
}

const Field = ({ label, name, title, value = "", placeHolder = '', type = "text", disabled = false, dir = 'rtl' }) => {
    return (
        <div className={_css(styles, 'field')}>
            <div className={_css(styles, 'info')}>
                <p>{label}</p>
            </div>
            <div className={_css(styles, 'input center')}>
                <div className={_css(styles, 'title')}><p>{title}</p></div>
                {
                    <input
                        type={type}
                        name={name}
                        id={name}
                        placeholder={placeHolder}
                        defaultValue={value}
                        disabled={disabled}
                        dir={dir}
                        required
                    />
                }
            </div>
        </div>
    );
}

export default SupplierCreateCategoryPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
import React, { useState } from 'react'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/Supplier/MyProducts/css/SupplierAddProductPage.module.css'
import { _css, API_BASE_URL } from '../../../public/Assets/Helpers';
import { Unit } from '../../../src/Instances/enums/Unit';

const SupplierAddProductPage = ({ user, entity, categories }) => {

    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className={_css(styles, 'supplier-body')}>
                <_self user={user} entity={entity} categories={categories} />
            </div>
        </>
    );
}

const _self = ({ user, entity, categories }) => {
    const [images, setImages] = useState<any[]>([]);

    const onImageAdd = (e) => {
        var target = e.target || window.event?.srcElement,
            files = target.files;

        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                setImages([...images, fr.result]);
                console.log(images)
            }
            fr.readAsDataURL(files[0]);
        }
    }

    return (
        <>
            <div className={_css(styles, 'container-title')}><p>أدخل صنف جديد</p></div>
            <form
                id='product-form'
                className={_css(styles, 'product')}
                method="post"
                action={`${API_BASE_URL}/profile/product`}
                encType="multipart/form-data"
                target="_blank"
            >
                <div className={_css(styles, 'fields')}>
                    <Field
                        name={"productId"}
                        label="اكتب كود الصنف لمعرفة إذا كان مسجلاً"
                        title="كود الصنف"
                        placeHolder="PID1y2ads6c"
                        disabled
                    />
                    <Field
                        name={"name"}
                        label="اكتب اسم المنتج"
                        title="أسم المنتج"
                        placeHolder="خوذة مدنية بجودة عالية"
                    />
                    <Field
                        select={categories}
                        name={"category"}
                        label="اختر المجموعة"
                        title="المجموعة"
                        placeHolder="المجموعة النهائية 3"
                    />
                    <Field
                        select={
                            Object.keys(Unit).map((unit) => {
                                return {
                                    _id: unit,
                                    name: (Unit as any)[unit]
                                }
                            }) as any}
                        name={"unit"}
                        label="اختر وحدة الطلب"
                        title="وحدة الطلب"
                        placeHolder="دستة"
                    />
                    <Field
                        name={"quantity"}
                        type="number"
                        label="حدد أقل كمية للطلب"
                        title="أقل كمية للطلب"
                        placeHolder="100"
                    />
                    <Field
                        name={"cost"}
                        type="number"
                        label="حدد سعر البيع لأقل كمية طلب"
                        title="سعر البيع"
                        placeHolder="1,500 ج.م"
                    />
                </div>
                <section className={_css(styles, 'images')}>
                    <div className={_css(styles, 'container-title')}>
                        <p>تحميل ملفات الوسائط</p>
                    </div>
                    <div className={_css(styles, 'self')}>
                        {
                            images.map((image, index) => <Image key={index} image={image} checked={index == 0} />)
                        }
                        <label
                            className={_css(styles, 'add-image center box-shadow-hover')}
                            htmlFor="images"
                        >
                            <input
                                type="file"
                                name="images"
                                id="images"
                                accept=".png"
                                multiple
                                hidden
                                required
                                onChange={(e) => onImageAdd(e)}
                            />
                            <i className={_css(styles, 'fa-solid fa-plus')}></i>
                        </label>
                    </div>
                </section>
                <section className={_css(styles, 'description')}>
                    <div className={_css(styles, 'container-title')}>
                        <p>الوصف التفصيلي للمنتج</p>
                    </div>
                    <div className={_css(styles, 'self')}>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="أكتب وصف تفصيلي للمنتج لتعريف المشتري بمميزاته"
                            required
                        ></textarea>
                    </div>
                </section>
                <section className={_css(styles, 'submit center')}>
                    <button className={_css(styles, 'center box-shadow-hover')} type="submit">
                        <i className={_css(styles, 'fa-solid fa-arrow-right-long')}></i>
                        <p>أضف المنتج</p>
                    </button>
                </section>
                <input type="text" name='userId' defaultValue={user._id.toString()} hidden />
                <input type="text" name='token' defaultValue={user.token} hidden />
            </form>
        </>
    );
}

const Image = ({ image, checked = false }) => {
    return (
        <label
            className={_css(styles, 'image box-shadow-hover')}
            htmlFor="product_image_1"
        >
            <div className={_css(styles, 'product-image center')}>
                {
                    !image ? <i className={_css(styles, 'fa-solid fa-image')}></i> :
                        <img
                            src={image}
                            alt=""
                        />
                }
            </div>
            <div className={_css(styles, 'info center')}>
                <input
                    type="checkbox"
                    defaultChecked={checked}
                />
                <p>الصورة الرئيسية</p>
            </div>
        </label>
    );
}

const Field = ({ label, name, title, value = "", placeHolder, select = null, disabled = false, type = "text", minValue = 0 }) => {
    return (
        <div className={_css(styles, 'field')}>
            <div className={_css(styles, 'info')}>
                <p>{label}</p>
            </div>
            <div className={_css(styles, 'input center')}>
                <div className={_css(styles, 'title')}><p>{title}</p></div>
                {
                    !select ?
                        <input
                            type={type}
                            name={name}
                            id={name}
                            placeholder={placeHolder}
                            defaultValue={value}
                            min={minValue}
                            disabled={disabled}
                            required
                        />
                        :
                        <select
                            name={name}
                            id={name}
                            required
                        >
                            {
                                (select as []).map((category: any, index) =>
                                    <option key={index} value={category._id.toString()}>{category.name}</option>
                                )
                            }
                        </select>
                }
            </div>
        </div>
    );
}

export default SupplierAddProductPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
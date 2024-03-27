import React, { useEffect, useState } from 'react'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/Supplier/MyProducts/css/SupplierProductsPage.module.css'
import { faker } from '@faker-js/faker/locale/ar';
import { _css } from '../../../public/Assets/Helpers';

const SupplierProductsPage = ({ user, entity, categories, products }) => {

    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className={_css(styles, 'supplier-body')}>
                <_self user={user} entity={entity} categories={categories} entityProducts={products} />
            </div>
        </>
    );
}

const _self = ({ user, entity, categories, entityProducts }) => {
    const [ancestry, setAncestry] = useState("");
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState<any[]>([]);



    useEffect(() => {
        const pros: any[] = [];
        for (var cat of categories.filter(c => (c.ancestry + "/" + c.id).includes(ancestry))) {
            for (var product of cat.products) {
                if (pros.find(p => p.id == product)) continue;
                const pro = entityProducts.find(p => p.id == product);
                if (pro)
                    pros.push(pro);
            }
        }
        setProducts(pros);
    }, [ancestry])

    const filterCategories = (category) => {
        if (!category) {
            setAncestry("");
            return;
        }
        setAncestry(category.ancestry + "/" + category.id);
        console.log("Filtering Categories to show:", ancestry)
    }

    const getCurrentCategory = () => {
        return ancestry == "" ? null : categories.filter(c => c.id == ancestry.split("/").pop())[0];
    }
    return (
        <>
            <section className={styles.categories}>
                <div className={styles.path}>
                    <p onClick={() => filterCategories(null)}>جميع المنتجات</p>
                    {ancestry.split("/").filter(id => id != "").map((id, index) => {
                        const category = categories.find(category => category.id == id);
                        return (
                            <div className={
                                _css(styles, ancestry.split("/").length == index + 2
                                    ? 'current-path' : "path")} key={index} onClick={() => filterCategories(category)}>
                                <i className={_css(styles, 'fa-solid fa-angles-left')}></i>
                                <p>{category.name}</p>
                            </div>
                        );
                    })}
                </div>
                <div className={styles['categories-self']}>
                    {categories.filter(cat => cat.ancestry == ancestry).map((cat, index) => {
                        return (
                            <div className={styles.category} key={index} onClick={() => filterCategories(cat)}>
                                <div className={styles.icon}>
                                    <i className={_css(styles, 'fa-solid fa-screwdriver-wrench')}></i>
                                </div>
                                <p>{cat.name}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className={styles.tabs} id="section_tabs">
                <button
                    className={_css(styles, 'tab current-tab')}
                    id="tab_products"
                    onClick={(e) => onTabClick(e)}
                    data-section="section_products"
                >
                    <p>المنتجات</p>
                </button>
                {
                    ancestry != "" ?
                        <button
                            className={_css(styles, 'tab')}
                            id="tab_description"
                            onClick={(e) => onTabClick(e)}
                            data-section="section_description"
                        >
                            <p>وصف المجموعة</p>
                        </button>
                        : null
                }
            </section>
            <section className={styles.description} id="section_description">
                <div className={styles.title} ><p>وصف {getCurrentCategory()?.name}</p></div>
                <div className={styles.label}>
                    <p>اكتب ملخص عن المجموعة</p>
                    <button>
                        <i className={_css(styles, 'fa-solid fa-pen')}></i>
                        <p>SAVE</p>
                    </button>
                </div>
                <div className={styles.input}>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="اكتب ملخص عن هذه المجموعة"
                        defaultValue={faker.commerce.productDescription()}
                        value={getCurrentCategory()?.description}
                    >
                    </textarea>
                </div>
            </section>
            <section className={styles.products} id="section_products">
                <div className={styles.filters} >
                    <div className={styles.icon + " box-shadow-hover center"}>
                        <i className={_css(styles, 'fa-solid fa-filter')}></i>
                    </div>
                    <div className={styles.self}>
                        <div className={styles.filter + " " + styles.checked + " box-shadow-hover"}>
                            <p>جميع المنتجات</p>
                            <div className={styles.control}>
                                <div className={styles.check}>
                                    <i className={_css(styles, 'fa-solid fa-circle-check')}></i>
                                </div>
                                <div className={styles.exit}>
                                    <i className={_css(styles, 'fa-solid fa-circle-xmark')}></i>
                                </div>
                            </div>
                        </div>
                        <div className={styles.filter + " box-shadow-hover"}>
                            <p>منتجات مفعلة</p>
                            <div className={styles.control}>
                                <div className={styles.check}>
                                    <i className={_css(styles, 'fa-solid fa-circle-check')}></i>
                                </div>
                                <div className={styles.exit}>
                                    <i className={_css(styles, 'fa-solid fa-circle-xmark')}></i>
                                </div>
                            </div>
                        </div>
                        <div className={styles.filter + " box-shadow-hover"}>
                            <p>منتجات غير مفعلة</p>
                            <div className={styles.control}>
                                <div className={styles.check}>
                                    <i className={_css(styles, 'fa-solid fa-circle-check')}></i>
                                </div>
                                <div className={styles.exit}>
                                    <i className={_css(styles, 'fa-solid fa-circle-xmark')}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['upload-controls']}>
                    <button className={"center box-shadow-hover"}>
                        <i className={_css(styles, 'fa-solid fa-arrow-up-from-bracket')}></i>
                        <p>تحميل مجمع</p>
                    </button>
                    <button className={"center box-shadow-hover " + styles['single-upload']}>
                        <i className={_css(styles, 'fa-solid fa-plus')}></i>
                        <p>اضافة منتجات</p>
                    </button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th><p><b>#</b></p></th>
                            <th><p>كود المنتج</p></th>
                            <th className={styles.large}><p>وصف المنتج</p></th>
                            <th><p>السعر</p></th>
                            <th><p>الوحدة</p></th>
                            <th><p>الحالة</p></th>
                            <th><p>الصورة</p></th>
                        </tr>
                        {products.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td><p><b>{index + 1}</b></p></td>
                                    <td className={styles.id}>
                                        <div className={"center"}><p>{product.id}</p></div>
                                    </td>
                                    <td>
                                        <p>
                                            {product.name}
                                        </p>
                                    </td>
                                    <td><p>{product.price.cost}</p></td>
                                    <td><p>{product.price.quantity}</p></td>
                                    <td><p>{product.price.unit}</p></td>
                                    <td className='center'>
                                        {product.images.length &&
                                            <img
                                                src={product.images[0]}
                                                alt=""
                                                key={index}
                                            />
                                        }
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </>
    );
}


const onTabClick = (e) => {
    const tabs = document.getElementById("section_tabs")?.children;
    if (!tabs?.length) return;
    var target = e.target;
    if (e.target.tagName.toLowerCase() == "p")
        target = e.target.parentNode
    for (var all of tabs)
        if (all) {
            all.classList.remove(styles['current-tab']);
            const sectionId = all.getAttribute("data-section");
            if (!sectionId) continue;
            const section = document.getElementById(sectionId);
            if (section)
                section.style.display = "none";
        }
    target.classList.add(styles['current-tab']);
    const sectionId = target.getAttribute("data-section");
    if (!sectionId) return;
    const section = document.getElementById(sectionId);
    if (section)
        section.style.display = "block";
}

export default SupplierProductsPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
import React, { useEffect, useState } from 'react'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/Supplier/MyProducts/css/SupplierProductsPage.module.css'
import { _css, getImage, onTabClick, saveCategoryDescription } from '../../../public/Assets/Helpers';
import SaveButton from '../../../public/Assets/Components/SaveButton';
import Filter from '../../../public/Assets/Components/Filter';

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
    const [products, setProducts] = useState<any[]>([]);
    // const [enabledFilters, setEnabledFilters] = useState([]);

    useEffect(() => {
        const pros: any[] = [];
        for (var cat of categories.filter(c => (c.ancestry + "/" + c.categoryId).includes(ancestry))) {
            // console.log(cat)
            for (var product of cat.products) {
                if (pros.find(p => p._id == product)) continue;
                const pro = entityProducts.find(p => p._id == product);
                if (pro)
                    pros.push(pro);
            }
        }
        console.log(products.map((p) => getImage(p.images[0])))
        setProducts(pros);
    }, [ancestry])

    const filterCategories = (category) => {
        if (!category) {
            setAncestry("");
            return;
        }
        setAncestry(category.ancestry + "/" + category.categoryId);
        // console.log("Filtering Categories to show:", ancestry);
        resetCurrentTab();
    }

    const resetCurrentTab = () => {
        // RESET CURRENT TAB
        const currentTab = document.getElementById('current-tab') as any;
        currentTab.classList.remove(_css(styles, 'current-tab'))
        onTabClick({
            styles,
            target: currentTab,
            activatedTabClassName: "current-tab",
            tabClassName: "tab"
        });
    }

    const getCurrentCategory = () => {
        return ancestry == "" ? null : categories.filter(c => c.categoryId == ancestry.split("/").pop())[0];
    }


    const onSave = async () => {
        const description = document.getElementById('description') as any;
        const currentCategory = getCurrentCategory();
        if (!description || !currentCategory) return;
        if (entity.details.description == description.value) return;
        const response = await saveCategoryDescription({
            categoryId: currentCategory._id,
            userId: user._id,
            token: user.token,
            description: description.value
        });
        if (response?.error) {
            alert("حدث خطأ أثناء تحديث الوصف");
            return;
        } else if (response?.success) {
            alert("تم تحديث الوصف بنجاح");
            categories.find(c => c.categoryId == currentCategory.categoryId).description = description.value;
        }
        resetCurrentTab();
    }

    return (
        <>
            <section className={_css(styles, 'categories')}>
                <div className={_css(styles, 'path')}>
                    <p onClick={() => filterCategories(null)}>جميع المنتجات</p>
                    {ancestry.split("/").filter(id => id != "").map((id, index) => {
                        const category = categories.find(category => category.categoryId == id);
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
                <div className={_css(styles, 'categories-self')}>
                    {categories.filter(cat => cat.ancestry == ancestry).map((cat, index) => {
                        return (
                            <div className={_css(styles, 'category')} key={index} onClick={() => filterCategories(cat)}>
                                <div className={_css(styles, 'icon')}>
                                    <i className={_css(styles, 'fa-solid fa-screwdriver-wrench')}></i>
                                </div>
                                <p>{cat.name}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className={_css(styles, 'tabs')} id="section_tabs">
                <button
                    id='current-tab'
                    className={_css(styles, 'tab current-tab')}
                    onClick={(e) => onTabClick({ styles, target: e.target, activatedTabClassName: "current-tab", tabClassName: "tab" })}
                    data-tab-id="section_products"
                    data-default-display="block"
                >
                    <p>المنتجات</p>
                </button>
                {
                    ancestry != "" ?
                        <button
                            className={_css(styles, 'tab')}
                            onClick={(e) => onTabClick({ styles, target: e.target, activatedTabClassName: "current-tab", tabClassName: "tab" })}
                            data-tab-id="section_description"
                            data-default-display="block"
                        >
                            <p>وصف المجموعة</p>
                        </button>
                        : null
                }
            </section>
            <section className={_css(styles, 'description')} id="section_description">
                <div className={_css(styles, 'label')}>
                    <p>اكتب ملخص عن المجموعة</p>
                </div>
                <div className={_css(styles, 'input')}>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="اكتب ملخص عن هذه المجموعة"
                        defaultValue={getCurrentCategory()?.description}
                    >
                    </textarea>
                </div>
                <SaveButton onSave={onSave} />
            </section>
            <section className={_css(styles, 'products')} id="section_products">
                {/*
                    <Filter
                        searchObject={products}
                        enabledFilters={enabledFilters}
                        setEnabledFilters={setEnabledFilters}
                        callback={() => { }}
                    />
                */}
                <div className={_css(styles, 'upload-controls')}>
                    <a className={"center box-shadow-hover"}>
                        <i className={_css(styles, 'fa-solid fa-arrow-up-from-bracket')}></i>
                        <p>تحميل مجمع</p>
                    </a>
                    <a className={"center box-shadow-hover " + styles['single-upload']}
                        href='/s/products/new'
                    >
                        <i className={_css(styles, 'fa-solid fa-plus')}></i>
                        <p>اضافة منتج</p>
                    </a>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th><p><b>#</b></p></th>
                            <th><p>كود المنتج</p></th>
                            <th className={_css(styles, 'large')}><p>وصف المنتج</p></th>
                            <th><p>السعر</p></th>
                            <th><p>الوحدة</p></th>
                            <th><p>الحالة</p></th>
                            <th><p>الصورة</p></th>
                        </tr>
                        {products.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td><p><b>{index + 1}</b></p></td>
                                    <td className={_css(styles, 'id')}>
                                        <div className={"center"}><p>{product.productId}</p></div>
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
                                                src={getImage(product.images[0])}
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

export default SupplierProductsPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
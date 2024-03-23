import React from 'react'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/Supplier/MyProducts/css/SupplierProductsPage.module.css'

const SupplierProductsPage = ({ user, entity }) => {

    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className="supplier-body">
                <_self user={user} entity={entity} />
            </div>
        </>
    );
}

const _self = ({ user, entity }) => {

    const onClickOnTab = (e) => {
        const productsTab = document.getElementById("tab_products");
        const descriptionSection = document.getElementById(
            "section_description"
        );
        const productsSection = document.getElementById("section_products");
        const tabsSection = document.getElementById("section_tabs");
        if (!productsSection || !descriptionSection || !tabsSection) return;

        console.log(e);

        for (const tab of tabsSection.children)
            tab.classList.remove("current-tab");
        e.classList.add("current-tab");

        if (e.id == "tab_products") {
            productsSection.style.display = "block";
            descriptionSection.style.display = "none";
        } else {
            productsSection.style.display = "none";
            descriptionSection.style.display = "flex";
        }
    }

    return (
        <>
            <section className={styles.categories}>
                <div className={styles.path}>
                    <p>جميع المنتجات</p>
                    <i className="fa-solid fa-angles-left"></i>
                    <p className={styles['current-path']}>المجموعة 1</p>
                </div>
                <div className={styles['categories-self']}>
                    <div className={styles.category}>
                        <div className={styles.icon}>
                            <i className="fa-solid fa-screwdriver-wrench"></i>
                        </div>
                        <p>category 1</p>
                    </div>
                    <div className={styles.category}>
                        <div className={styles.icon}>
                            <i className="fa-solid fa-screwdriver-wrench"></i>
                        </div>
                        <p>category 1</p>
                    </div>
                    <div className={styles.category}>
                        <div className={styles.icon}>
                            <i className="fa-solid fa-screwdriver-wrench"></i>
                        </div>
                        <p>category 1</p>
                    </div>
                </div>
            </section>
            <section className={styles.tabs} id="section_tabs">
                <button
                    className={styles.tab + " " + styles['current-tab']}
                    id="description_tab"
                    onClick={(e) => onClickOnTab(e.target)}
                >
                    <p>وصف المجموعة</p>
                </button>
                <button
                    className={styles.tab}
                    id="tab_products"
                    onClick={(e) => onClickOnTab(e.target)}
                >
                    <p>المنتجات</p>
                </button>
            </section>
            <section className={styles.description} id="section_description">
                <div className={styles.title} ><p>وصف المجموعة 1</p></div>
                <div className={styles.label}>
                    <p>اكتب ملخص عن المجموعة</p>
                    <button>
                        <i className="fa-solid fa-pen"></i>
                        <p>SAVE</p>
                    </button>
                </div>
                <div className={styles.input}>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="اكتب ملخص عن هذه المجموعة"
                    >
                        لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
                        يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت
                        لابوري ات دولار ماجنا أليكيوا لوريم ايبسوم دولار سيت
                        أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
                        أيوسمود تيمبور لوريم ايبسوم دولار سيت أميت
                        ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود
                        تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا
                        لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
                        يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم
                        دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت
                        دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
                        ماجنا أليكيوا لوريم ايبسوم دولار سيت أميت
                        ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود
                        تيمبور لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور
                        أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور
                        أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا لوريم
                        ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج
                        أليايت,سيت دو أيوسمود تيمبور</textarea
                    >
                </div>
            </section>
            <section className={styles.products} id="section_products">
                <div className={styles.filters} >
                    <div className={styles.icon + " box-shadow-hover center"}>
                        <i className="fa-solid fa-filter"></i>
                    </div>
                    <div className={styles.self}>
                        <div className={styles.filter + " " + styles.checked + " box-shadow-hover"}>
                            <p>جميع المنتجات</p>
                            <div className={styles.control}>
                                <div className={styles.check}>
                                    <i className="fa-solid fa-circle-check"></i>
                                </div>
                                <div className={styles.exit}>
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </div>
                            </div>
                        </div>
                        <div className={styles.filter + " box-shadow-hover"}>
                            <p>منتجات مفعلة</p>
                            <div className={styles.control}>
                                <div className={styles.check}>
                                    <i className="fa-solid fa-circle-check"></i>
                                </div>
                                <div className={styles.exit}>
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </div>
                            </div>
                        </div>
                        <div className={styles.filter + " box-shadow-hover"}>
                            <p>منتجات غير مفعلة</p>
                            <div className={styles.control}>
                                <div className={styles.check}>
                                    <i className="fa-solid fa-circle-check"></i>
                                </div>
                                <div className={styles.exit}>
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['upload-controls']}>
                    <button className={"center box-shadow-hover"}>
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                        <p>تحميل مجمع</p>
                    </button>
                    <button className={"center box-shadow-hover " + styles['single-upload']}>
                        <i className="fa-solid fa-plus"></i>
                        <p>اضافة منتجات</p>
                    </button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th><p>رقم المنتج</p></th>
                            <th className={styles.large}><p>وصف المنتج</p></th>
                            <th><p>المجموعة</p></th>
                            <th><p>السعر</p></th>
                            <th><p>الحالة</p></th>
                            <th><p>الصورة</p></th>
                        </tr>
                        <tr>
                            <td className={styles.id}>
                                <div className={"center"}><p>TE1234C</p></div>
                            </td>
                            <td>
                                <p>
                                    لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور
                                    أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور
                                    لوريم
                                </p>
                            </td>
                            <td><p>العدد</p></td>
                            <td><p>1224</p></td>
                            <td><p>1</p></td>
                            <td>
                                <img
                                    src="../../Global/imgs/background.jpeg"
                                    alt=""
                                />
                            </td>
                        </tr>
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
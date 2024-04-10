import React from "react";
import C_HeaderComponent from "../Global/HeaderComponent";
import C_FooterComponent from "../Global/FooterComponent";
import styles from '../../../public/Customer/Supplier/css/SupplierPage.module.css'
import { _css } from "../../../public/Assets/Helpers";

const SupplierPage = ({ user, supplier, products }) => {
    return (
        <>
            <C_HeaderComponent user={user} />
            <div className={_css(styles, 'page-body')}>
                <_self user={user} supplier={supplier} products={products} />
                <C_FooterComponent />
            </div>
        </>
    );
}

const _self = ({ user, supplier, products }) => {
    const productsElements: any[] = [];
    products.forEach(product => {
        productsElements.push(
            <div className={styles.product} key={product.productId}>
                <div className={styles.image}>
                    <img src={product.images[0]} alt="" />
                </div>
                <div className={styles.name}><p>{product.name}</p></div>
                <div className={styles.description}>
                    <p>
                        {product.description}
                    </p>
                </div>
                <div className={styles.controls}>
                    <div className={styles.order}>
                        <a href={`/c/suppliers/${supplier.entityId}/products/${product.productId}`} className={styles.center}>
                            <div className={styles.center}>
                                <i
                                    className={_css(styles, 'fa-solid fa-angles-right')}
                                ></i>
                            </div>
                            <p>اطلب الآن</p>
                        </a>
                    </div>
                    <div className={styles['request-quotation']}>
                        <a href={`/c/suppliers/${supplier.entityId}/products/${product.productId}`} className={styles.center}>
                            <div className={styles.icon}>
                                <i
                                    className={_css(styles, 'fa-solid fa-file-circle-exclamation')}
                                ></i>
                            </div>
                            <p>اطلب عرض سعر</p>
                        </a>
                    </div>
                </div>
            </div>
        );
    })

    return (
        <>
            <main className={styles['company-container']}>
                <section className={styles['company-hero']}>
                    <div className={styles.background}>
                        <div className={styles.gradient}></div>
                        {/* <div className={styles.banner}>
                            <img src={supplier.details.banner} alt="" />
                        </div> */}
                    </div>
                    <div className={styles['title-section']}>
                        <div className={styles.title}><p>{supplier.details.displayName}</p></div>
                        <div className={styles['company-image']}>
                            <img src={supplier?.details?.logo} alt="" />
                        </div>
                    </div>
                    <div className={styles.path + " " + styles.center}>
                        <div className={styles.root}><p>الرئيسية</p></div>
                        <div className={styles.icon}>
                            <i className={_css(styles, 'fa-solid fa-angles-left')}></i>
                        </div>
                        <div className={styles['sub-path']}><p>التصنيفات</p></div>
                    </div>
                </section>
                <div className={styles['body-section']}>
                    <section className={styles['company-info'] + " " + styles.center}>
                        <div className={styles.title}>
                            <p>عن الشركة</p>
                        </div>
                        <div className={styles.description}>
                            <p>
                                {supplier.details.description}
                            </p>
                        </div>
                    </section>
                    <section className={styles.products + " " + styles.center}>
                        <div className={styles.title}><p>منتجات الشركة</p></div>
                        {/* <div className={styles.filters}>
                            <div className={styles.icon + " " + styles.center}>
                                <i className={_css(styles, 'fa-solid fa-filter')}></i>
                            </div>
                            <div className={styles['self-filters']}>
                                <div className={styles.filter}>
                                    <button><p>اسم الفلتر</p></button>
                                </div>
                                <div className={styles.filter}>
                                    <button><p>اسم الفلتر</p></button>
                                </div>
                                <div className={styles.filter}>
                                    <button><p>اسم الفلتر</p></button>
                                </div>
                                <div className={styles.filter}>
                                    <button><p>اسم الفلتر</p></button>
                                </div>
                                <div className={styles.filter}>
                                    <button><p>اسم الفلتر</p></button>
                                </div>
                            </div>
                        </div> */}
                        <div className={styles.self}>
                            {productsElements}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default SupplierPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
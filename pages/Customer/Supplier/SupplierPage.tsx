import React from "react";
import C_HeaderComponent from "../Global/HeaderComponent";
import C_FooterComponent from "../Global/FooterComponent";
import styles from '../../../public/Customer/Supplier/css/SupplierPage.module.css'
import { _css } from '../../../public/Assets/Helpers';

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

const maxProductDescriptionLengthToViewInCard = 150;

const _self = ({ user, supplier, products }) => {

    return (
        <>
            <main className={_css(styles, 'company-container')}>
                <section className={_css(styles, 'company-hero')}>
                    <div className={_css(styles, 'background')}>
                        <div className={_css(styles, 'gradient')}></div>
                        {/* <div className={_css(styles, 'banner')}>
                            <img src={supplier.details.banner} alt="" />
                        </div> */}
                    </div>
                    <div className={_css(styles, 'title-section')}>
                        <div className={_css(styles, 'title')}><p>{supplier.details.displayName}</p></div>
                        <div className={_css(styles, 'company-image')}>
                            <img src={supplier?.details?.logo} alt="" />
                        </div>
                    </div>
                    <div className={_css(styles, 'path center')}>
                        <div className={_css(styles, 'root')}><p>الرئيسية</p></div>
                        <div className={_css(styles, 'icon')}>
                            <i className={_css(styles, 'fa-solid fa-angles-left')}></i>
                        </div>
                        <div className={_css(styles, 'root')}><p>الموردين</p></div>
                        <div className={_css(styles, 'icon')}>
                            <i className={_css(styles, 'fa-solid fa-angles-left')}></i>
                        </div>
                        <div className={_css(styles, 'sub-path')}><p>{supplier.details.displayName}</p></div>
                    </div>
                </section>
                <div className={_css(styles, 'body-section')}>
                    <section className={_css(styles, 'company-info center')}>
                        <div className={_css(styles, 'title')}>
                            <p>عن الشركة</p>
                        </div>
                        <div className={_css(styles, 'description')}>
                            <p>
                                {supplier.details.description}
                            </p>
                        </div>
                    </section>
                    <section className={_css(styles, 'products center')}>
                        <div className={_css(styles, 'title')}><p>منتجات الشركة</p></div>
                        <div className={_css(styles, 'filters center')}>
                            <div className={_css(styles, 'icon box-shadow-hover center')}>
                                <i className={_css(styles, 'fa-solid fa-filter')}></i>
                            </div>
                            <div className={_css(styles, 'self-filters')}>
                                <div className={_css(styles, 'filter box-shadow-hover')}>
                                    <button><p>اسم الفلتر</p></button>
                                </div>
                                <div className={_css(styles, 'filter box-shadow-hover')}>
                                    <button><p>اسم الفلتر</p></button>
                                </div>
                                <div className={_css(styles, 'filter box-shadow-hover')}>
                                    <button><p>اسم الفلتر</p></button>
                                </div>
                            </div>
                        </div>
                        <div className={_css(styles, 'self-products center')}>
                            {/* {productsElements} */}

                            {
                                products.map((product, index) => {
                                    return (
                                        <div className={_css(styles, 'product opacity box-shadow')} key={index} >
                                            <div className={_css(styles, 'image')}
                                                onClick={() => window.location.href = `/c/suppliers/${supplier.entityId}/products/${product.productId}`}>
                                                <img src={product.images[0]} alt="" />
                                            </div>
                                            <div className={_css(styles, 'product-name')}
                                                onClick={() => window.location.href = `/c/suppliers/${supplier.entityId}/products/${product.productId}`}>
                                                <p>{product.name}</p>
                                            </div>
                                            <div className={_css(styles, 'product-description')}>
                                                <p>
                                                    {(product.description || "")
                                                        .substring(0, maxProductDescriptionLengthToViewInCard) + (product.description.length > maxProductDescriptionLengthToViewInCard ? "..." : "")}
                                                </p>
                                            </div>
                                            <div className={_css(styles, 'controls center')}>
                                                <a className={_css(styles, 'center box-shadow')} href={`/c/suppliers/${supplier.entityId}/products/${product.productId}`}>
                                                    <i className={_css(styles, 'fa-solid fa-angles-right')}></i>
                                                    <p>أطلب عرض سعر</p>
                                                </a>
                                                <a className={_css(styles, 'center rfq box-shadow')} href={`/c/suppliers/${supplier.entityId}/products/${product.productId}/rfq`}>
                                                    <i className={_css(styles, 'fa-solid fa-file-circle-exclamation')}></i>
                                                    <p>عرض سعر فوري</p>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })
                            }
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
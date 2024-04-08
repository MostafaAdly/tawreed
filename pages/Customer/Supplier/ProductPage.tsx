import React from "react";
import C_HeaderComponent from "../Global/HeaderComponent";
import C_FooterComponent from "../Global/FooterComponent";
import styles from '../../../public/Customer/Supplier/css/ProductPage.module.css'
import { _css } from "../../../public/Assets/Helpers";

const SupplierPage = ({ user, supplier, product }) => {
    return (
        <>
            <C_HeaderComponent user={user} />
            <div className={_css(styles, 'page-body')}>
                <_self user={user} supplier={supplier} product={product} />
                <C_FooterComponent />
            </div>
        </>
    );
}

const _self = ({ user, supplier, product }) => {
    const imagesElements: any[] = [];
    product.images.map((image, index) =>
        imagesElements.push(
            <img key={index} src={image} alt="" />
        )
    );
    return (
        <>
            <main className={styles['product-container']}>
                <section className={styles['product-main']}>
                    <div className={styles['right-box']}>
                        <div className={styles.name}>
                            <p>
                                {product.name}
                            </p>
                        </div>
                        <div className={styles.info}>
                            <div className={styles['top-info']}>
                                <div className={styles.company + " " + styles.center}>
                                    <p>شركة:</p>
                                    <p>{supplier.details.displayName}</p>
                                </div>
                                <div className={styles.evaluation + " " + styles.center}>
                                    <div className={styles.icon}>
                                        <i className={_css(styles, 'fa-solid fa-star')}></i>
                                    </div>
                                    <div className={styles['self-evaluation']}>
                                        <p>4.5 من 15 تقييم</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['cost-info'] + " " + styles.center}>
                                <div className={styles['cost-right']}><p>السعر يبدأ من</p></div>
                                <div className={styles['cost-mid']}><p>{product.price.cost}</p></div>
                                <div className={styles['cost-right']}><p>{product.price.currency}</p></div>
                            </div>
                            <div className={styles.description}>
                                <p>
                                    {product.description}
                                </p>
                            </div>
                            <div className={styles['cost-info'] + " " + styles.center}>
                                <div className={styles['cost-right']}><p>أقل كمية للطلب</p></div>
                                <div className={styles['cost-mid']}><p>{product.price.quantity}</p></div>
                                <div className={styles['cost-right']}><p>{product.price.unit}</p></div>
                            </div>
                        </div>
                        <div className={styles.controls + " " + styles.center}>
                            <div className={styles.buy}>
                                <button className={styles.center}>
                                    <div className={styles.icon}>
                                        <i className={_css(styles, 'fa-solid fa-angles-right')}></i>
                                    </div>
                                    <p>اطلب الآن</p>
                                </button>
                            </div>
                            <div className={styles['request-quotation']}>
                                <button className={styles.center}>
                                    <div className={styles.icon}>
                                        <i
                                            className={_css(styles, 'fa-solid fa-file-circle-exclamation')}
                                        ></i>
                                    </div>
                                    <p>أطلب عرض سعر</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.images}>
                        <div className={styles.current}>
                            <img src={product.images[0]} alt="" />
                        </div>
                        <div className={styles.other}>
                            {imagesElements}
                        </div>
                    </div>
                </section>
                <section className={styles['product-info']}>
                    <div className={styles.tabs}>
                        <div className={styles.tab + " " + styles['current-tab']}>
                            <button>
                                <p>المزيد من التفاصيل</p>
                            </button>
                        </div>
                        <div className={styles.tab}>
                            <button>
                                <p>تقييمات العملاء</p>
                            </button>
                        </div>
                        <div className={styles.tab}>
                            <button>
                                <p>اضف تقييمك</p>
                            </button>
                        </div>
                    </div>
                    <div className={styles['self-info']}>
                        <table>
                            <tbody>
                                {Object.keys(product.details).map((d, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <p className={styles['table-head']}>{d}</p>
                                            </td>
                                            <td>
                                                <p>{product.details[d]}</p>
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>
                    </div>
                </section>
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
import React from "react";
import C_HeaderComponent from "../Global/HeaderComponent";
import C_FooterComponent from "../Global/FooterComponent";
import styles from '../../../public/Customer/Supplier/css/product-page.module.css'

const SupplierPage = ({ user, supplier, product }) => {
    return (
        <>
            <C_HeaderComponent user={user} />
            <div className="page-body">
                <_self user={user} supplier={supplier} product={product} />
            </div>
            <C_FooterComponent />
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
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                    <div className={styles['self-evaluation']}>
                                        <p>4.5 من 15 تقييم</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['cost-info'] + " " + styles.center}>
                                <div className={styles['cost-right']}><p>السعر يبدأ من</p></div>
                                <div className={styles['cost-mid']}><p>225.45</p></div>
                                <div className={styles['cost-right']}><p>جنيه مصري</p></div>
                            </div>
                            <div className={styles.description}>
                                <p>
                                    {product.description}
                                </p>
                            </div>
                            <div className={styles['cost-info'] + " " + styles.center}>
                                <div className={styles['cost-right']}><p>أقل كمية للطلب</p></div>
                                <div className={styles['cost-mid']}><p>100</p></div>
                                <div className={styles['cost-right']}><p>دستة (12 قطعة)</p></div>
                            </div>
                        </div>
                        <div className={styles.controls + " " + styles.center}>
                            <div className={styles.buy}>
                                <button className={styles.center}>
                                    <div className={styles.icon}>
                                        <i className="fa-solid fa-angles-right"></i>
                                    </div>
                                    <p>اطلب الآن</p>
                                </button>
                            </div>
                            <div className={styles['request-quotation']}>
                                <button className={styles.center}>
                                    <div className={styles.icon}>
                                        <i
                                            className="fa-solid fa-file-circle-exclamation"
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
                                <p>المزيد من التفاصيل</p>
                            </button>
                        </div>
                        <div className={styles.tab}>
                            <button>
                                <p>المزيد من التفاصيل</p>
                            </button>
                        </div>
                    </div>
                    <div className={styles['self-info']}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className={styles['table-head']}>الوزن</p>
                                    </td>
                                    <td>
                                        <p>240 جم</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className={styles['table-head']}>الأبعاد</p>
                                    </td>
                                    <td>
                                        <p>40X120X80 سم</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className={styles['table-head']}>مادة الصنع</p>
                                    </td>
                                    <td>
                                        <p>بولى بروبيلين</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className={styles['table-head']}>
                                            يحتوي على لون صناعي
                                        </p>
                                    </td>
                                    <td>
                                        <p>لا</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className={styles['table-head']}>
                                            حاصل على موافقة وزارة الصناعة
                                        </p>
                                    </td>
                                    <td>
                                        <p>نعم</p>
                                    </td>
                                </tr>
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
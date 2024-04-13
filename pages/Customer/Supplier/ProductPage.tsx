import React, { useState } from "react";
import C_HeaderComponent from "../Global/HeaderComponent";
import C_FooterComponent from "../Global/FooterComponent";
import styles from '../../../public/Customer/Supplier/css/ProductPage.module.css'
import { _css, getImage, onTabClick, purchaseProduct } from '../../../public/Assets/Helpers';
import SentForm from "../../../public/Assets/Components/SentForm";

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
    const [image, setImage] = useState(product.images[0]);
    const [images, setImages] = useState(product.images.filter(img => img != image));
    const [sentForm, setSentForm] = useState(false)

    const onSentFormClick = () => {
        setSentForm(false);
    }

    const onPurchase = (e) => {
        setSentForm(true);
        purchaseProduct({ userId: user._id, token: user.token, productId: product._id, supplierId: supplier._id, customerId: user.entity })
    }

    const onRFQ = (e) => {
        location.href = `/c/suppliers/${supplier.entityId}/products/${product.productId}/rfq`;
    }

    const onImageSelect = (target) => {
        setImage(target.src);
        setImages(product.images.filter(img => img != target.src));
    }

    return (
        <>
            <SentForm active={sentForm} title='تم ارسال طلبك الى الشركة بنجاح' text='العودة إلى صفحة الطلب الآن' callback={onSentFormClick} />
            <div className={_css(styles, 'container center')}>
                <section className={_css(styles, 'top-container')}>
                    <div className={_css(styles, 'product-container')}>
                        <section className={_css(styles, 'right-box')}>
                            <div className={_css(styles, 'product-name')}>
                                <p>{product.name}</p>
                            </div>
                            <div className={_css(styles, 'product-info')}>
                                <div className={_css(styles, 'product-company')}>
                                    <p>شركة:</p>
                                    <p>{supplier.details.displayName}</p>
                                </div>
                                <div className={_css(styles, 'evaluation center')}>
                                    <i className={_css(styles, 'fa-solid fa-star')}></i>
                                    <p>{"4.5"} من {"15"} تقييم</p>
                                </div>
                            </div>
                            <div className={_css(styles, 'product-cost center')}>
                                <p>السعر يبدأ من</p>
                                <p>{product.price.cost}</p>
                                <p>{product.price.currency}</p>
                            </div>
                            <div className={_css(styles, 'description')}>
                                <p>{product.description}</p>
                            </div>
                            <div className={_css(styles, 'product-cost center')}>
                                <p>أقل كمية للطلب</p>
                                <p>{product.price.quantity}</p>
                                <p>دستة</p>
                            </div>
                            <div className={_css(styles, 'controls')}>
                                <a className={_css(styles, 'center opacity-active box-shadow-hover')} onClick={(e) => onPurchase(e)}>
                                    <i className={_css(styles, 'fa-solid fa-angles-right')}></i>
                                    <p>أطلب الآن</p>
                                </a>
                                <a className={_css(styles, 'rfq center opacity-active box-shadow-hover')} onClick={(e) => onRFQ(e)}>
                                    <i className={_css(styles, 'fa-solid fa-file-circle-exclamation')}></i>
                                    <p>أطلب عرض سعر</p>
                                </a>
                            </div>
                        </section>
                        <section className={_css(styles, 'left-box')}>
                            <div className={_css(styles, 'current')}>
                                <img src={image} alt="" />
                            </div>
                            <div className={_css(styles, 'other center')}>
                                {images.map((image, index) => <img className={_css(styles, 'opacity')} key={index} src={image} alt="" onClick={(e) => onImageSelect(e.target)} />)}
                            </div>
                        </section>
                    </div>
                    <section className={_css(styles, 'details')}>
                        <div className={_css(styles, 'tabs')}>
                            <button
                                className={_css(styles, 'tab activated')}
                                onClick={(e) => onTabClick({ target: e.target, styles })}
                                data-tab-id="info"
                                data-default-display="flex"
                            >
                                <p>المزيد من التفاصيل</p>
                            </button>
                            <button
                                className={_css(styles, 'tab')}
                                onClick={(e) => onTabClick({ target: e.target, styles })}
                                data-tab-id="reviews"
                                data-default-display="flex">
                                <p>تقييمات العملاء</p>
                            </button>
                            <button
                                className={_css(styles, 'tab')}
                                onClick={(e) => onTabClick({ target: e.target, styles })}
                                data-tab-id="add-review"
                                data-default-display="flex">
                                <p>اضف تقييمك</p>
                            </button>
                        </div>
                        <div className={_css(styles, 'info')} id="info">
                            {Object.keys(product.details).map((d, index) => {
                                return (
                                    <div className={_css(styles, 'product-detail')} key={index}>
                                        <p>{d}</p>
                                        <p>{product.details[d]}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={_css(styles, 'reviews')} id="reviews">
                            <div className={_css(styles, 'review')}>
                                <div className={_css(styles, 'review-header center')}>
                                    <div className={_css(styles, 'profile-image')}>
                                        <img src={getImage("default-profile-picture.png")} alt="" />
                                    </div>
                                    <p className={_css(styles, 'profile-name')}>أيمن عبدالرحمن</p>
                                    <div className={_css(styles, 'profile-info')}>
                                        <p>مدير مشتريات</p>
                                        <p>المتحدة للصيانة</p>
                                    </div>
                                </div>
                                <div className={_css(styles, 'review-content')}>
                                    <p>
                                        لوريم ايبسوم دولار سيت أميت كونسيكتيتور أدايبا يسكينج أليايت.سيت دو أيوسمود تيمبور
                                        أنكايديديونتيوت لابوري ات
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={_css(styles, 'add-review')} id="add-review">
                            <div className={_css(styles, 'review-title')}>
                                <p>شكرا لرغبتك في ترك تعليق</p>
                                <i className={_css(styles, 'fa-solid fa-hands-praying')}></i>
                            </div>
                            <div className={_css(styles, 'review-info')}>
                                <p>مشاركة تجربتك مع الآخرين يساعدنا على تطوير خدماتنا وتعريق العملاء الأخرين بنا</p>
                            </div>
                            <div className={_css(styles, 'review-content')}>
                                <textarea placeholder="يعجبني في هذا المنتج ...." />
                            </div>
                            <div className={_css(styles, 'review-controls')}>
                                <button className={_css(styles, 'center opacity-active')}>
                                    <i className={_css(styles, 'fa-solid fa-arrow-right')} />
                                    <p>أرسل تعليقك</p></button>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </>
    );
}

export default SupplierPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
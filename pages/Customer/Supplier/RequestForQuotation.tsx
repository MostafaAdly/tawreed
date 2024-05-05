import React, { useState } from "react";
import C_HeaderComponent from "../Global/HeaderComponent";
import C_FooterComponent from "../Global/FooterComponent";
import styles from '../../../public/Customer/Supplier/css/RequestForQuotation.module.css'
import { _css, purchaseProduct } from "../../../public/Assets/Helpers";
import SentForm from "../../../public/Assets/Components/SentForm";
import TawreedTime from '../../../src/Instances/enums/TawreedTime.json';

const RequestForQuotation = ({ user, supplier, product, instant }) => {
    return (
        <>
            <C_HeaderComponent user={user} />
            <div className={_css(styles, 'page-body')}>
                <_self user={user} supplier={supplier} product={product} instant={instant} />
                <C_FooterComponent />
            </div>
        </>
    );
}

const _self = ({ user, supplier, product, instant }) => {
    const [image, setImage] = useState(product.images[0]);
    const [images, setImages] = useState(product.images.filter(img => img != image));
    const [sentForm, setSentForm] = useState(false);
    const [errorForm, setErrorForm] = useState(false);
    const [formTitle, setFormTitle] = useState("تم تأكيد طلب العرض بنجاح");
    const [teleporting, setTeleporting] = useState(false);

    const onSentFormClick = () => {
        setSentForm(false);
    }

    const onPurchase = (e) => {
        location.href = `/c/suppliers/${supplier.entityId}/products/${product.productId}`;
    }

    const onRFQ = async (e) => {
        if (teleporting) return;
        const response = await purchaseProduct({
            type: "rfq",
            userId: user._id,
            token: user.token,
            productId: product._id,
            supplierId: supplier._id,
            customerId: user.entity,
            rfqSettings: getRFQSettings()
        }) || {};
        setFormTitle(response.success ? "تم الإرسال" : 'حدث خطأ');
        setErrorForm(!response.success);
        setSentForm(true);
        if (!response.success) return;
        setTeleporting(true);
        setTimeout(() => {
            if (location)
                location.href = `/c/suppliers/${supplier.entityId}/products/${product.productId}/rfq/sent`;
        }, 1500);
    }

    const getRFQSettings = () => {
        return {
            quantity: +((document.getElementById("quantity") as HTMLInputElement)?.value || 1),
            supplyTime: +((document.getElementById("supplyTime") as HTMLInputElement)?.value || "7"),
            paymentCondition: +((document.getElementById("payment-condition") as HTMLInputElement)?.value || "1"),
        };
    }

    const onImageSelect = (target) => {
        setImage(target.src);
        setImages(product.images.filter(img => img != target.src));
    }

    return (
        <>
            <SentForm active={sentForm} title={formTitle} text='تم إرسال طلب العرض بنجاح' callback={onSentFormClick} error={errorForm} />
            <div className={_css(styles, 'product-rfq-container')}>
                <div className={_css(styles, 'page-title')}>
                    <p>طلب عرض سعر</p>
                </div>
                <div className={_css(styles, 'product-rfq center')}>
                    <section className={_css(styles, 'right-box')}>
                        <div className={_css(styles, 'product-name')}>
                            <p>{product.name}</p>
                        </div>
                        <div className={_css(styles, 'product-company')}>
                            <p>{supplier.details.displayName}</p>
                        </div>
                        <label htmlFor="quantity">الكمية</label>
                        <div className={_css(styles, 'product-input')}>
                            <input type="number" name="quantity" id="quantity" min={1} defaultValue={1} />
                        </div>
                        <label htmlFor="quantity">فترة التوريد</label>
                        <div className={_css(styles, 'product-input')}>
                            <select name="supply-time" id="supply-time">
                                {
                                    (instant ? Object.values(TawreedTime) : Object.values(TawreedTime).reverse()).map((time: any, index: any) => {
                                        return <option key={index} value={time.value}>{time.name}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <label htmlFor="payment-condition">شروط الدفع</label>
                        <div className={_css(styles, 'product-input')}>
                            <select name="payment-condition" id="payment-condition">
                                <option value="1">الدفع عند الاستلام</option>
                            </select>
                        </div>
                        <div className={_css(styles, 'controls')}>
                            <a className={_css(styles, 'center')} onClick={onRFQ}>
                                <i className={_css(styles, 'fa-solid fa-right-to-bracket')}></i>
                                <p>طلب عرض السعر</p>
                            </a>
                            <a className={_css(styles, 'center buy-now')} onClick={onPurchase}>
                                <i className={_css(styles, 'fa-solid fa-right-to-bracket')}></i>
                                <p>شراء الآن</p>
                            </a>
                        </div>
                    </section>
                    <section className={_css(styles, 'left-box')}>
                        <div className={_css(styles, 'tabs')}>
                            <div className={_css(styles, 'tab activated')} onClick={(e) => onTabClick(e.target)} data-tab-id="images" data-default-display="flex">
                                <p>صور المنتج</p>
                            </div>
                            <div className={_css(styles, 'tab')} onClick={(e) => onTabClick(e.target)} data-tab-id="product-info" data-default-display="flex">
                                <p>المواصفات الفنية</p>
                            </div>
                        </div>
                        <section id="images" className={_css(styles, 'images')}>
                            <div className={_css(styles, 'current')}>
                                <img src={image} alt="" />
                            </div>
                            <div className={_css(styles, 'other center')}>
                                {images.map((image, index) => <img className={_css(styles, 'opacity')} key={index} src={image} alt="" onClick={(e) => onImageSelect(e.target)} />)}
                            </div>
                        </section>
                        <section id="product-info" className={_css(styles, 'product-info')}>
                            {
                                Object.keys(product.details).map((key, index) => {
                                    return (
                                        <div className={_css(styles, 'data')} key={index}>
                                            <div className={_css(styles, 'label')}><p>{key}</p></div>
                                            <div className={_css(styles, 'value')}><p>{product.details[key]}</p></div>
                                        </div>
                                    );
                                })
                            }
                        </section>
                    </section>
                </div>
            </div>
        </>
    );
}

const onTabClick = (element) => {
    const tabs = document.getElementsByClassName(_css(styles, 'activated'));
    [...tabs].forEach((tab) => {
        tab.classList.remove(_css(styles, 'activated'));
        const tabId = tab.getAttribute("data-tab-id");
        if (tabId) {
            let tabElement = document.getElementById(tabId);
            if (tabElement)
                tabElement.style.display = "none";
        }
    });
    if (element.nodeName == "P")
        element = element.parentNode;
    element.classList.add(_css(styles, 'activated'));
    const tabId = element.getAttribute("data-tab-id");
    if (tabId) {
        let tabElement = document.getElementById(tabId);
        if (tabElement)
            tabElement.style.display = element.getAttribute("data-default-display") || "flex";
    }
}


export default RequestForQuotation;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
import React from "react";
import C_HeaderComponent from "../Global/HeaderComponent";
import C_FooterComponent from "../Global/FooterComponent";
import styles from '../../../public/Customer/Supplier/css/RequestForQuotation.module.css'
import { _css, getImage } from "../../../public/Assets/Helpers";


const RequestForQuotation = ({ user, supplier, product }) => {
    return (
        <>
            <C_HeaderComponent user={user} />
            <div className={_css(styles, 'page-body')}>
                <_self supplier={supplier} product={product} />
                <C_FooterComponent />
            </div>
        </>
    );
}

const _self = ({ supplier, product }) => {

    return (
        <>
            <div className={_css(styles, 'product-rfq-container')}>
                <div className={_css(styles, 'page-title')}>
                    <p>طلب عرض سعر</p>
                </div>
                <div className={_css(styles, 'product-rfq center')}>
                    <section className={_css(styles, 'right-box')}>
                        <div className={_css(styles, 'product-name')}>
                            <p>خوذة هيمليت سيفتي ألماني الصنع من البلاستيك مع حزام سيليكون مانع للإنزلاق</p>
                        </div>
                        <div className={_css(styles, 'product-company')}>
                            <p>الرضوان للعدد</p>
                        </div>
                        <label htmlFor="quantity">الكمية</label>
                        <div className={_css(styles, 'product-input')}>
                            <input type="number" name="quantity" id="quantity" min={1} />
                        </div>
                        <label htmlFor="quantity">فترة التوريد</label>
                        <div className={_css(styles, 'product-input')}>
                            <select name="supply-time" id="supply-time">
                                <option value="7">التوريد خلال 7 أيام</option>
                            </select>
                        </div>
                        <label htmlFor="payment-condition">شروط الدفع</label>
                        <div className={_css(styles, 'product-input')}>
                            <select name="payment-condition" id="payment-condition">
                                <option value="1">الدفع عند الاستلام</option>
                            </select>
                        </div>
                        <div className={_css(styles, 'controls')}>
                            <button className={_css(styles, 'center')}>
                                <i className={_css(styles, 'fa-solid fa-right-to-bracket')}></i>
                                <p>طلب عرض السعر</p>
                            </button>
                            <button className={_css(styles, 'center buy-now')}>
                                <i className={_css(styles, 'fa-solid fa-right-to-bracket')}></i>
                                <p>شراء الآن</p>
                            </button>
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
                                <img src={getImage("background.jpeg")} alt="" />
                                {/* <img src={getImage("default-profile-picture.png")} alt="" /> */}
                            </div>
                            <div className={_css(styles, 'other')}>
                                <img src={getImage("background.jpeg")} alt="" />
                                <img src={getImage("background.jpeg")} alt="" />
                                <img src={getImage("background.jpeg")} alt="" />
                                <img src={getImage("background.jpeg")} alt="" />
                                <img src={getImage("background.jpeg")} alt="" />
                            </div>
                        </section>
                        <section id="product-info" className={_css(styles, 'product-info')}>
                            <div className={_css(styles, 'data')}>
                                <div className={_css(styles, 'label')}><p>الوزن</p></div>
                                <div className={_css(styles, 'value')}><p>240 ج.م</p></div>
                            </div>
                            <div className={_css(styles, 'data')}>
                                <div className={_css(styles, 'label')}><p>الوزن</p></div>
                                <div className={_css(styles, 'value')}><p>240 ج.م</p></div>
                            </div>
                            <div className={_css(styles, 'data')}>
                                <div className={_css(styles, 'label')}><p>الوزن</p></div>
                                <div className={_css(styles, 'value')}><p>240 ج.م</p></div>
                            </div>
                            <div className={_css(styles, 'data')}>
                                <div className={_css(styles, 'label')}><p>الوزن</p></div>
                                <div className={_css(styles, 'value')}><p>240 ج.م</p></div>
                            </div>
                            <div className={_css(styles, 'data')}>
                                <div className={_css(styles, 'label')}><p>الوزن</p></div>
                                <div className={_css(styles, 'value')}><p>240 ج.م</p></div>
                            </div>
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


export default RequestForQuotation
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
            </div>
            <C_FooterComponent />
        </>
    );
}

const _self = ({ supplier, product }) => {
    return (
        <>
            <div className={_css(styles, 'product-rfq-container')}>
                <div className={_css(styles, 'page-title')}>
                    <h1>طلب عرض سعر</h1>
                </div>
                <div className={_css(styles, 'product-rfq')}>
                    <div className={_css(styles, 'right-box')}>
                        <div className={_css(styles, 'product-name')}>
                            <p>خوذة هيمليت سيفتي ألماني الصنع من البلاستيك مع حزام سيليكون مانع للإنزلاق</p>
                        </div>
                        <div className={_css(styles, 'product-company')}>
                            <p>الرضوان للعدد</p>
                        </div>
                        <label htmlFor="quantity">الكمية</label>
                        <div className={_css(styles, 'product-input')}>
                            <input type="number" name="quantity" id="quantity" />
                        </div>
                        <label htmlFor="quantity">فترة التوريد</label>
                        <div className={_css(styles, 'product-input')}>
                            <select name="supply-time" id="supply-time">
                                <option value="7">7 أيام</option>
                                <option value="5">5 أيام</option>
                                <option value="3">3 أيام</option>
                                <option value="2">2 أيام</option>
                            </select>
                        </div>
                        <label htmlFor="quantity">شروط الدفع</label>
                        <div className={_css(styles, 'product-input')}>
                            <input type="number" name="quantity" id="quantity" />
                        </div>
                    </div>
                    <div className={_css(styles, 'left-box')}>
                        <div className={_css(styles, 'tabs')}></div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default RequestForQuotation
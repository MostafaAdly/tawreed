import React from 'react'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/Supplier/MyRequests/css/SupplierApproveRFQPage.module.css'
import { _css, getImage } from '../../../public/Assets/Helpers';
import SentForm from '../../../public/Assets/Components/SentForm';

const SupplierApproveRFQPage = ({ user, entity }) => {

    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className={_css(styles, 'supplier-body')}>
                <_self entity={entity} />
            </div>
        </>
    );
}

const _self = ({ entity }) => {
    const [sentForm, setSentForm] = React.useState(false)

    const onSentFormClick = () => {
        setSentForm(false);
    }

    const onRFQSend = () => {
        setSentForm(true);
    }

    return (
        <>
            <SentForm active={sentForm} title='تم تأكيد طلب العرض بنجاح' text='العودة إلى طلباتي الآن' callback={onSentFormClick} />
            <section className={_css(styles, 'order-info')}>
                <div className={_css(styles, 'info')}>
                    <div className={_css(styles, 'title')}>
                        <p>رقم العملية</p>
                    </div>
                    <p>123456789</p>
                </div>
                <div className={_css(styles, 'info')}>
                    <div className={_css(styles, 'title')}>
                        <p>تاريخ الطلب</p>
                    </div>
                    <p>11/1/2024</p>
                </div>
                <div className={_css(styles, 'info')}>
                    <div className={_css(styles, 'title')}>
                        <p>مقدم إلى</p>
                    </div>
                    <p>شركة الإيمان للبلاستيك</p>
                </div>
            </section>
            <div className={_css(styles, 'divider')}></div>
            <section className={_css(styles, 'products')}>
                <div className={_css(styles, 'title')}>
                    <p>بيانات الاصناف</p>
                </div>
                <div className={_css(styles, 'self')}>
                    <table>
                        <tbody>
                            <tr className={_css(styles, 'rfq-table-head')}>
                                <th><p>كود/صورة</p></th>
                                <th><p>صنف</p></th>
                                <th><p>وحدة</p></th>
                                <th><p>كمية</p></th>
                                <th><p>السعر</p></th>
                                <th><p>الإجمالي</p></th>
                            </tr>
                            <tr>
                                <td>
                                    <div className={_css(styles, 'image-container')}>
                                        <div className={_css(styles, 'rfq-image-container')}>
                                            <img
                                                src={getImage("background.jpeg")}
                                                alt=""
                                                draggable="false"
                                            />
                                            <p><b>RFQ12eq56c</b></p>
                                        </div>
                                    </div>
                                </td>
                                <td className={_css(styles, 'product-name')}>
                                    <p>
                                        لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور
                                        أدايبا يسكينج أليايت,سيت دو أيوسمود
                                        تيمبور لوريم ايبسوم دولار سيت أميت
                                        ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
                                        أيوسمود تيمبور
                                    </p>
                                </td>
                                <td><p>دستة</p></td>
                                <td><p>100</p></td>
                                <td><p><b>1,500 ج.م</b></p></td>
                                <td><p>150,000 ج.م</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <div className={_css(styles, 'divider')}></div>
            <section className={_css(styles, 'payment-info')}>
                <div className={_css(styles, 'title')}>
                    <p>شروط العرض</p>
                </div>
                <div className={_css(styles, 'data')}>
                    <div className={_css(styles, 'info')}>
                        <div className={_css(styles, 'name')}>
                            <p>الإجمالي قبل الضريبة</p>
                        </div>
                        <div className={_css(styles, 'result')}>
                            <p>487,000 ج.م</p>
                        </div>
                    </div>
                    <div className={_css(styles, 'info')}>
                        <div className={_css(styles, 'name')}>
                            <p>ضريبة القيمة المضافة</p>
                        </div>
                        <div className={_css(styles, 'result')}>
                            <p>63,000 ج.م</p>
                        </div>
                    </div>
                    <div className={_css(styles, 'info')}>
                        <div className={_css(styles, 'name')}>
                            <p>الإجمالي</p>
                        </div>
                        <div className={_css(styles, 'result')}>
                            <p>450,000 ج.م</p>
                        </div>
                    </div>
                    <div className={_css(styles, 'info')}>
                        <div className={_css(styles, 'name')}>
                            <p>طريقة الدفع</p>
                        </div>
                        <div className={_css(styles, 'result')}>
                            <p>الدفع عند الإستلام</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={_css(styles, 'approve center')}>
                <button className='center' onClick={() => onRFQSend()}>
                    <i className={_css(styles, 'fa-solid fa-arrow-right')}></i>
                    <p>أرسل تأكيد طلب العرض</p>
                </button>
            </section>
        </>
    )
}

export default SupplierApproveRFQPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
import React, { useState } from 'react'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/Supplier/MyRequests/css/SupplierApproveRFQPage.module.css'
import { _css, changeRequestState, toFormattedDateOnly } from '../../../public/Assets/Helpers';
import SentForm from '../../../public/Assets/Components/SentForm';
import { ResponseType } from '../../../src/Instances/ResponseType';

const SupplierApproveRFQPage = ({ user, entity, request }) => {

    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className={_css(styles, 'supplier-body')}>
                <_self user={user} entity={entity} request={request} />
            </div>
        </>
    );
}

const _self = ({ user, entity, request }) => {
    const [sentForm, setSentForm] = useState(false);
    const [errorForm, setErrorForm] = useState(false);
    const [formTitle, setFormTitle] = useState("تم تأكيد طلب العرض بنجاح");
    const [teleporting, setTeleporting] = useState(false);

    const onSentFormClick = () => {
        setSentForm(false);
    }

    const onRFQSend = async () => {
        if (teleporting) return;
        const response = (await changeRequestState({
            userId: user._id, token: user.token, requestId: request._id, state: "RFQ_REPLY_PENDING"
        })) || {};
        setFormTitle(response.error ? 'حدث خطأ' : "تم تأكيد طلب العرض بنجاح");
        setErrorForm(response.error);
        setSentForm(true);
        if (!response.success) return;
        setTeleporting(response.success);
        setTimeout(() => {
            if (teleporting) return;
            if (location)
                location.href = "/s/requests"
        }, 1500);
    }

    return (
        <>
            <SentForm active={sentForm}
                title={formTitle}
                text='العودة إلى عرض السعر الآن'
                callback={onSentFormClick}
                error={errorForm}
            />
            <section className={_css(styles, 'order-info')}>
                <div className={_css(styles, 'info')}>
                    <div className={_css(styles, 'title')}>
                        <p>رقم العملية</p>
                    </div>
                    <p>{request?.requestId}</p>
                </div>
                <div className={_css(styles, 'info')}>
                    <div className={_css(styles, 'title')}>
                        <p>تاريخ الطلب</p>
                    </div>
                    <p>{toFormattedDateOnly(request?.createdAt)}</p>
                </div>
                <div className={_css(styles, 'info')}>
                    <div className={_css(styles, 'title')}>
                        <p>مقدم إلى</p>
                    </div>
                    <p>{request?.customer?.details?.displayName}</p>
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
                                                src={request.product.images[0]}
                                                alt=""
                                                draggable="false"
                                            />
                                            <p><b>{request.product.productId}</b></p>
                                        </div>
                                    </div>
                                </td>
                                <td className={_css(styles, 'product-name')}>
                                    <p>
                                        {request.product.name}
                                    </p>
                                </td>
                                <td><p>{request.product.price.unit}</p></td>
                                <td><p>{request.product.price.quantity}</p></td>
                                <td><p>{request.product.price.cost} ج.م</p></td>
                                <td><p><b>{request.product.price.cost} ج.م</b></p></td>
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
                    {/* <div className={_css(styles, 'info')}>
                        <div className={_css(styles, 'name')}>
                            <p>الإجمالي قبل الضريبة</p>
                        </div>
                        <div className={_css(styles, 'result')}>
                            <p>487,000 ج.م</p>
                        </div>
                    </div> */}
                    {/* <div className={_css(styles, 'info')}>
                        <div className={_css(styles, 'name')}>
                            <p>ضريبة القيمة المضافة</p>
                        </div>
                        <div className={_css(styles, 'result')}>
                            <p>63,000 ج.م</p>
                        </div>
                    </div> */}
                    <div className={_css(styles, 'info')}>
                        <div className={_css(styles, 'name')}>
                            <p>الإجمالي</p>
                        </div>
                        <div className={_css(styles, 'result')}>
                            <p>{request.product.price.cost} ج.م</p>
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
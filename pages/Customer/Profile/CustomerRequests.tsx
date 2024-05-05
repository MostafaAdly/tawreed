import React, { useState } from 'react'
import styles from '../../../public/Customer/Profile/css/CustomerRequests.module.css'
import { _css, changeRequestState, onTabClick, sendDeleteRequest } from "../../../public/Assets/Helpers";
import C_HeaderComponent from '../Global/HeaderComponent';
import C_FooterComponent from '../Global/FooterComponent';
import Filter from '../../../public/Assets/Components/Filter';
import { ResponseType } from '../../../src/Instances/enums/ResponseType';
import { RequestType } from '../../../src/Instances/enums/RequestType';
import SentForm from '../../../public/Assets/Components/SentForm';

const CustomerRequests = ({ user, supplier, requests }) => {
    return (
        <>
            <C_HeaderComponent user={user} />
            <div className={_css(styles, 'page-body')}>
                <_self user={user} supplier={supplier} requests={requests} />
                <C_FooterComponent />
            </div>
        </>
    );
}


const _self = ({ user, supplier, requests }) => {
    const [sentForm, setSentForm] = useState(false);
    const [errorForm, setErrorForm] = useState(false);
    const [formTitle, setFormTitle] = useState("تم تأكيد طلب العرض بنجاح");
    const [enabledFilters, setEnabledFilters] = React.useState<string[]>([]);
    const [_requests, setRequests] = React.useState<any[]>(requests);

    const filterRequests = () => {
        if (!enabledFilters.length) return _requests;
        return _requests.filter(request => enabledFilters
            .includes(Object.keys(ResponseType).find(key => (ResponseType as any)[key] == request.responseType) as any));
    }

    const deleteRequest = async (requestId) => {
        const response = await sendDeleteRequest({ requestId, token: user.token, userId: user._id });
        if (response?.success)
            setRequests(_requests.filter(request => request._id != requestId));
    }

    const onRFQApprove = async ({ requestId, approve = true }) => {
        const response = (await changeRequestState({
            userId: user._id, token: user.token, requestId, state: (approve ? "RFQ_APPROVED" : "RFQ_REJECTED")
        })) || {};
        if (response.success) {
            setRequests(_requests.map(request => {
                if (request._id == requestId) {
                    request.responseType = approve ? ResponseType.RFQ_APPROVED : ResponseType.RFQ_REJECTED;
                }
                return request;
            }));
        }
        setFormTitle(response.success ?
            (approve ? "تم طلب المنتج بنجاح" : "تم رفض المنتج بنجاح")
            : 'حدث خطأ');
        setErrorForm(!response.success);
        setSentForm(true);
    }

    return (
        <>
            <SentForm active={sentForm}
                title={formTitle}
                text='العودة إلى طلباتي الآن'
                error={errorForm}
                callback={() => setSentForm(false)}
            />
            <div className={_css(styles, 'requests-container')}>
                <section className={_css(styles, 'tabs')}>
                    <div
                        className={_css(styles, 'tab tab-activated opacity')}
                        onClick={(e) => onTabClick({ target: e.target, styles, activatedTabClassName: "tab-activated", onTabChange: () => setEnabledFilters([]) })}
                        data-tab-id="orders" data-default-display="flex"
                    >
                        <p>طلباتي</p>
                    </div>
                    <div
                        className={_css(styles, 'tab opacity')}
                        onClick={(e) => onTabClick({ target: e.target, styles, activatedTabClassName: "tab-activated", onTabChange: () => setEnabledFilters([]) })}
                        data-tab-id="rfqs" data-default-display="flex"
                    >
                        <p>طلبات تسعير</p>
                    </div>
                </section>
                {/* ORDERS */}
                <section className={_css(styles, 'orders')} id="orders">
                    <Filter
                        searchObject={ResponseType}
                        enabledFilters={enabledFilters}
                        type="purchase"
                        setEnabledFilters={setEnabledFilters}
                        callback={null} />
                    <table className='center'>
                        <tbody>
                            <tr>
                                <th><p>#</p></th>
                                <th><p>كود الطلب</p></th>
                                <th><p>كود المنتج</p></th>
                                <th><p>وصف المنتج</p></th>
                                <th><p>السعر</p></th>
                                <th><p>حالة الطلب</p></th>
                                <th><p>التحكم</p></th>
                            </tr>
                            {
                                filterRequests().filter(request => request.requestType == RequestType.PURCHASE).map((request: any, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><p><b>{index + 1}</b></p></td>
                                            <td><p>{request.requestId}</p></td>
                                            <td><p>{request.product.productId}</p></td>
                                            <td className='name'><p>{request.product.name}</p></td>
                                            <td><p>{request.product.price.cost}</p></td>
                                            <td><p>{request.responseType}</p></td>
                                            <td>
                                                <div className={_css(styles, 'controls center')}>
                                                    <a className='center opacity-active' onClick={() => deleteRequest(request._id)}>
                                                        <i className={_css(styles, 'fa-solid fa-trash')}></i>
                                                    </a>
                                                    <a className={_css(styles, 'center visit opacity-active')}>
                                                        <i className={_css(styles, 'fa-solid fa-eye')}></i>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </section>
                {/* REQUEST FOR QUOTATIONS */}
                <section className={_css(styles, 'rfqs')} id="rfqs" style={{ display: "none" }}>
                    <Filter
                        searchObject={ResponseType}
                        enabledFilters={enabledFilters}
                        type="rfq"
                        setEnabledFilters={setEnabledFilters}
                        callback={null} />
                    <table className='center'>
                        <tbody>
                            <tr>
                                <th><p>#</p></th>
                                <th><p>كود الطلب</p></th>
                                <th><p>كود المنتج</p></th>
                                <th><p>وصف المنتج</p></th>
                                <th><p>السعر</p></th>
                                <th><p>حالة الطلب</p></th>
                                <th><p>التحكم</p></th>
                            </tr>
                            {
                                filterRequests().filter(request => request.requestType == RequestType.RFQ).map((request: any, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><p><b>{index + 1}</b></p></td>
                                            <td><p>{request.requestId}</p></td>
                                            <td><p>{request.product.productId}</p></td>
                                            <td className='name'><p>{request.product.name}</p></td>
                                            <td><p><b>{request.product.price.cost} ج.م</b></p></td>
                                            <td><p>{request.responseType}</p></td>
                                            <td>
                                                <div className={_css(styles, 'controls center')}>
                                                    <a className='center opacity-active' onClick={() => deleteRequest(request._id)}>
                                                        <i className={_css(styles, 'fa-solid fa-trash')}></i>
                                                    </a>
                                                    <a className={_css(styles, 'center visit opacity-active')}>
                                                        <i className={_css(styles, 'fa-solid fa-eye')}></i>
                                                    </a>
                                                    {
                                                        request.responseType == ResponseType.RFQ_REPLY_PENDING ?
                                                            (
                                                                <>
                                                                    <a className={_css(styles, 'center reject opacity-active')} onClick={() => onRFQApprove({ requestId: request._id, approve: false })}>
                                                                        <i className={_css(styles, 'fa-solid fa-xmark')}></i>
                                                                    </a>
                                                                    <a className={_css(styles, 'center approve opacity-active')} onClick={() => onRFQApprove({ requestId: request._id })}>
                                                                        <i className={_css(styles, 'fa-solid fa-check')}></i>
                                                                    </a>
                                                                </>
                                                            ) : null
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}

export default CustomerRequests;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
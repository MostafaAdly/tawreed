import React, { useEffect, useState } from 'react'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/Supplier/MyRequests/css/SupplierRequestsPage.module.css'
import { _css, changeRequestState, onTabClick, sendDeleteRequest, toFormattedDateOnly } from '../../../public/Assets/Helpers';
import { RequestType } from '../../../src/Instances/RequestType';
import { ResponseType } from '../../../src/Instances/ResponseType';
import Filter from '../../../public/Assets/Components/Filter';

const SupplierRequestsPage = ({ user, entity, requests }) => {

    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className={_css(styles, 'supplier-body')}>
                <_self entity={entity} requests={requests} user={user} />
            </div>
        </>
    );
}

const _self = ({ entity, requests, user }) => {
    const [_requests, _setRequests] = useState(requests);
    const [enabledFilters, setEnabledFilters] = useState<string[]>([]);

    useEffect(() => {

        const popups = [...document.querySelectorAll("#popup")];

        window.addEventListener('click', ({ target }: { target: any }) => {
            if (!target) return;
            if (target.tagName == "P" || target.tagName == "I") target = target.parentNode;
            if (target.children.length > 0 && target.children[0].id == "popup") return;
            popups.forEach((p: any) => p.style.display = "none");
        });
    }, []);

    const handleShowPopUpOnClick = ({ target }: any) => {
        if (target.tagName == "P") target = target.parentNode;
        const popup = target.querySelector("#popup");
        if (popup) popup.style.display = popup.style.display == "block" ? "none" : "block";
    }

    const getActions = (type, requestId, requestState, actions) => {
        const map = {};
        actions.forEach(action => {
            if (action.toLowerCase().startsWith(type.toLowerCase()) &&
                (ResponseType as any)[action] != requestState) map[action] = onResponseActionClick(requestId, action);
        });
        return map;
    }

    const onResponseActionClick = (requestId, state) => {
        return async () => {
            const response = await changeRequestState({ requestId, state, token: user.token, userId: user._id });
            if (response?.success)
                _setRequests(_requests.map(request => {
                    if (request._id == requestId) request.responseType = (ResponseType as any)[state];
                    return request;
                }));
        }
    }

    const deleteRequest = async (requestId) => {
        const response = await sendDeleteRequest({ requestId, token: user.token, userId: user._id });
        if (response?.success)
            _setRequests(_requests.filter(request => request._id != requestId));
    }

    const filterRequests = () => {
        if (!enabledFilters.length) return _requests;
        return _requests.filter(request => enabledFilters
            .includes(Object.keys(ResponseType).find(key => (ResponseType as any)[key] == request.responseType) as any));
    }

    const onTabChange = () => {
        setEnabledFilters([]);
    }

    return (
        <>
            <section className={_css(styles, 'tabs')} id="section_tabs">
                <button
                    className={_css(styles, 'tab current-tab')}
                    id="tab_orders"
                    onClick={(e) => onTabClick({ target: e.target, activatedTabClassName: "current-tab", onTabChange, styles })}
                    data-tab-id='section_orders'
                    data-default-display="block"
                >
                    <p>طلبات</p>
                </button>
                <button
                    className={_css(styles, 'tab')}
                    id="tab_quotations"
                    onClick={(e) => onTabClick({ target: e.target, activatedTabClassName: "current-tab", onTabChange, styles })}
                    data-tab-id='section_quotations'
                    data-default-display="block"
                >
                    <p>طلبات تسعير</p>
                </button>
            </section>
            <section className={_css(styles, 'orders')} id="section_orders">
                <Filter
                    searchObject={ResponseType}
                    enabledFilters={enabledFilters}
                    type="purchase"
                    setEnabledFilters={setEnabledFilters}
                    callback={null} />
                <table>
                    <tbody>
                        <tr>
                            <th><p>رقم الطلب</p></th>
                            <th><p>أسم المنتج</p></th>
                            <th><p>الكمية</p></th>
                            <th><p>التاريخ</p></th>
                            <th><p>الحالة</p></th>
                            <th><p>عرض التفاصيل</p></th>
                        </tr>
                        {
                            filterRequests().filter(request => request.requestType == RequestType.PURCHASE).map((request, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={_css(styles, 'id')}>
                                            <div className={_css(styles, 'center')}><p>{request.requestId}</p></div>
                                        </td>
                                        <td className={_css(styles, 'large')}>
                                            <p>
                                                {request.product.name}
                                            </p>
                                        </td>
                                        <td><p>{request.product.price.quantity}</p></td>
                                        <td><p>{toFormattedDateOnly(request.createdAt)}</p></td>
                                        <td>
                                            <div className={_css(styles, 'center')}>
                                                <div className={_css(styles, 'box center box-shadow-hover')} onClick={handleShowPopUpOnClick} id={`state:${request._id.toString()}`}>
                                                    <ChooseAction selection={
                                                        getActions("purchase", request._id, request.responseType, Object.keys(ResponseType))
                                                    } />
                                                    <p>{request.responseType}</p>
                                                    <i className={_css(styles, 'fa-solid fa-file-export')}></i>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={_css(styles, 'controls')}>
                                                <a className={_css(styles, 'center box-shadow')} onClick={() => deleteRequest(request._id)}>
                                                    <i className={_css(styles, 'fa-solid fa-trash')}></i>
                                                </a>
                                                <a className={_css(styles, 'center view box-shadow')} href={`/c/suppliers/${entity.entityId}/products/${request.product.productId}`}>
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
            <section className={_css(styles, 'quotations')} id="section_quotations">
                <Filter
                    searchObject={ResponseType}
                    enabledFilters={enabledFilters}
                    type="rfq"
                    setEnabledFilters={setEnabledFilters}
                    callback={null} />
                <table>
                    <tbody>
                        <tr>
                            <th><p>رقم الطلب</p></th>
                            <th><p>أسم المنتج</p></th>
                            <th><p>الكمية</p></th>
                            <th><p>التاريخ</p></th>
                            <th><p>مدة التوريد</p></th>
                            <th><p>تفاصيل الدفع</p></th>
                            <th><p>الحالة</p></th>
                            <th><p>عرض التفاصيل</p></th>
                        </tr>
                        {
                            filterRequests().filter(request => request.requestType == RequestType.RFQ).map((request, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={_css(styles, 'id')} >
                                            <div className={_css(styles, 'center')}><p>{request.requestId}</p></div>
                                        </td>
                                        <td className={_css(styles, 'large')}>
                                            <p>
                                                {request.product.name}
                                            </p>
                                        </td>
                                        <td><p>{request.rfqSettings.quantity}</p></td>
                                        <td><p>{toFormattedDateOnly(request.createdAt)}</p></td>
                                        <td><p>{`${request.rfqSettings.supplyTime} أيام`}</p></td>
                                        <td><p>الدفع عند الإستلام</p></td>
                                        <td>
                                            <div className={_css(styles, 'center')}>
                                                <div className={_css(styles, 'box center box-shadow-hover')}
                                                    onClick={handleShowPopUpOnClick} id={`state:${request._id.toString()}`}>
                                                    <p>{request.responseType}</p>
                                                    <i className={_css(styles, 'fa-solid fa-file-export')}></i>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            <div className={_css(styles, 'controls')}>
                                                <a className={_css(styles, 'center box-shadow')} onClick={() => deleteRequest(request._id)}>
                                                    <i className={_css(styles, 'fa-solid fa-trash')}></i>
                                                </a>
                                                <a className={_css(styles, 'center edit box-shadow')} href={`/s/requests/rfq/${request.product.productId}`}>
                                                    <i className={_css(styles, 'fa-solid fa-pen')}></i>
                                                </a>
                                                <a className={_css(styles, 'center view box-shadow')} href={`/c/suppliers/${entity.entityId}/products/${request.product.productId}/rfq`}>
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
        </>
    );
}

const ChooseAction = ({ selection = {} }) => {
    return (
        <div className={_css(styles, 'choose-order center')} id='popup'>
            <div className={_css(styles, 'title')}>
                <p>اختر إجراء</p>
            </div>
            <div className={_css(styles, 'self')}>
                {
                    Object.entries(selection).map(([k, v], index) => {
                        return (
                            <button key={index} onClick={({ target }: any) => (v as any)(target)}><p>{ResponseType[k]}</p></button>);
                    })
                }
            </div>
        </div>
    )
}

export default SupplierRequestsPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}
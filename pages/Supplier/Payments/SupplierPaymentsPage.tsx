import React, { useState } from 'react'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/Supplier/MyPayments/css/SupplierPaymentsPage.module.css'
import { _css, toFormattedDate, toFormattedDateOnly } from '../../../public/Assets/Helpers';
import Filter from '../../../public/Assets/Components/Filter';
import { PaymentMethod } from '../../../src/Instances/PaymentMethod';


const SupplierPaymentsPage = ({ user, entity, payments }) => {
    return (
        <>
            <S_HeaderComponent user={user} entity={entity} />
            <S_SidebarComponent />
            <div className={_css(styles, 'supplier-body')}>
                <_self entity={entity} payments={payments} />
            </div>
        </>
    );
}


const _self = ({ entity, payments }) => {
    const [enabledFilters, setEnabledFilters] = useState([]);

    return (
        <div className={_css(styles, 'container')}>
            <div className={_css(styles, 'page-title')}>
                <p>بيانات الحالة المالية</p>
            </div>
            <Filter searchObject={PaymentMethod} enabledFilters={enabledFilters} type="" setEnabledFilters={setEnabledFilters} callback={null} />
            <table>
                <tbody>
                    <tr>
                        <th><p>الكود</p></th>
                        <th><p>التاريخ</p></th>
                        <th><p>المعاملات</p></th>
                        <th><p>العمولات</p></th>
                        <th><p>الصافي</p></th>
                        <th><p>الحالة</p></th>
                        <th><p>الإجراء</p></th>
                    </tr>
                    {
                        payments.map((payment, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className={_css(styles, 'id center')}>
                                            <p>{payment.paymentId}</p>
                                        </div>
                                    </td>
                                    <td><p>{toFormattedDateOnly(payment.createdAt)}</p></td>
                                    <td><p>{payment.request.product.price.cost}</p><p>جنيه مصري</p></td>
                                    <td> <p>{payment.commission}</p><p>جنيه مصري</p></td>
                                    <td><p><b>{payment.request.product.price.cost - payment.commission}</b></p><p>جنيه مصري</p></td>
                                    <td>
                                        <div className={_css(styles, 'state')}>
                                            <p>تم الدفع</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={_css(styles, 'controls center')}>
                                            <a className={_css(styles, 'visit opacity-active center')}
                                                href={`/c/suppliers/${payment.supplier.entityId}/products/${payment.request.product.productId}`}>
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
        </div>
    );
}

export default SupplierPaymentsPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}

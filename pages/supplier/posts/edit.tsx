import SupplierLayout from 'layouts/supplier.layout';
import { GetServerSideProps } from 'next';
import { getFormData, getSSProps } from 'public/assets/utils/helpers';
import React from 'react';
import { InfoFields } from '../../../components/generic/ui/fields/info.component';
import { InlineDateField, InlineFormField } from 'components/forms/inline-form-field';
import { InlineFormSelect, InlineFilesField } from '../../../components/forms/inline-form-field';
import Terms from 'components/generic/terms.component';



const EditPost = ({ offer }) => {

    const onSubmit = (form) => {
        form.preventDefault();
        const data = getFormData(form.target.id);
        console.log(data, data.get('files'));
    }

    return (
        <SupplierLayout>
            <ClientData offer={offer} />

            <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">الرجاء ملئ البيانات التالية:</h5>

                <form onSubmit={onSubmit} id='edit-form'>
                    <div className="grid gap-6 mb-6 md:grid-cols-2 py-3">
                        <InlineFormField id="price" type='number' title="سعر الوحدة" placeholder="3200 ج.م" />
                        <InlineFormField id="vat" type='number' title="ضريبة القيمة المضافة" placeholder="400 ج.م" />
                        <InlineFormField id="total_price" type='number' title="السعر الإجمالي" placeholder="3600 ج.م" />
                        <InlineFormField id="quantity" type='number' title="الكمية" placeholder="12 قطعة" />
                        <InlineFormField id="payments_terms" title="شروط الدفع" placeholder="" />
                        <InlineFormField id="comment" title="أضف تعليق" placeholder="يرجى أخذ الحذر مع هذا المنتج" />
                        <div id="date-range-picker" date-rangepicker={"true"} className="flex items-center justify-between gap-x-4">
                            <span className="text-gray-500">من</span>
                            <InlineDateField id="start_date" placeholder="تاريخ بداية التسليم" />
                            <span className="text-gray-500">إلى</span>
                            <InlineDateField id="end_date" placeholder="تاريخ نهاية التسليم" />
                        </div>

                        <InlineFormSelect id='offer_conditions' items={
                            [
                                { id: "CASH", value: "كاش" },
                                { id: "DIFFER", value: "آجل" },
                            ].map(item => <option key={item.id} value={item.id}>{item.value}</option>)
                        } />
                    </div>
                    <InlineFilesField id="files" label="صور المنتج" multiple={true} className='mb-5' />
                    <Terms />
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">أرسل الرد</button>
                </form>

            </div >
        </SupplierLayout >
    )
}

const ClientData = ({ offer }) => {
    return (
        <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">بيانات الطلب من العميل</h5>
            <InfoFields
                center={false}
                fields={
                    [
                        {
                            title: "إسم السلعة",
                            value: offer.name
                        },
                        {
                            title: "العميل",
                            value: offer.client.username
                        },
                        {
                            title: "الكمية",
                            value: offer.quantity
                        },
                        {
                            title: "المواصفات",
                            value: offer.description
                        },
                    ]
                } />
        </div>
    );
}

export default EditPost;

export const getServerSideProps: GetServerSideProps = getSSProps;
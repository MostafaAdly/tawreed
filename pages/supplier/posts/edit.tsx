import SupplierLayout from 'layouts/supplier.layout';
import { GetServerSideProps } from 'next';
import { getAPIURL, getFormData, getSSProps } from 'public/assets/utils/helpers';
import React from 'react';
import { HiddenInfoField, InfoFields } from '../../../components/generic/ui/fields/info.component';
import { InlineDateField, InlineFormField } from 'components/forms/inline-form-field';
import { InlineFormSelect, InlineFilesField } from '../../../components/forms/inline-form-field';
import Terms from 'components/generic/terms.component';
import axios from 'axios';



const EditPost = ({ user, offer }) => {

    const onSubmit = async (form) => {
        form.preventDefault();
        if (!offer?.id) return;
        const data = getFormData(form.target.id);
        try {
            console.log(offer)
            const response = (await axios.put(getAPIURL(`/posts/offers`), data)).data;
            console.log(response)
            if (response?.error)
                return alert(`Error: ${response.message}`);
            window.location.href = '/supplier/posts/in-progress';
            alert('تم إرسال الرد بنجاح');
        } catch (error) {
            console.error(error);
            alert('حدث خطأ أثناء إرسال الرد');
        }

    }

    return (
        <SupplierLayout>
            <ClientData offer={offer} />

            <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">الرجاء ملئ البيانات التالية:</h5>

                <form onSubmit={onSubmit} id='edit-form'>
                    <div className="grid gap-6 mb-6 md:grid-cols-2 py-3">
                        <InlineFormField id="price" type='number' title="سعر الوحدة" placeholder="3200 ج.م" required={true} />
                        <InlineFormField id="vat" type='number' title="ضريبة القيمة المضافة" placeholder="400 ج.م" required={true} />
                        <InlineFormField id="totalPrice" type='number' title="السعر الإجمالي" placeholder="3600 ج.م" required={true} />
                        <InlineFormField id="quantity" type='number' title="الكمية" placeholder="12 قطعة" required={true} />
                        <InlineFormField id="paymentsTerms" title="شروط الدفع" placeholder="" required={true} />
                        <InlineFormField id="comment" title="أضف تعليق" placeholder="يرجى أخذ الحذر مع هذا المنتج" required={true} />
                        <div id="date-range-picker" date-rangepicker={"true"} className="flex items-center justify-between gap-x-4">
                            <span className="text-gray-500">من</span>
                            <InlineDateField id="startDate" placeholder="تاريخ بداية التسليم" required={true} />
                            <span className="text-gray-500">إلى</span>
                            <InlineDateField id="endDate" placeholder="تاريخ نهاية التسليم" required={true} />
                        </div>

                        <InlineFormSelect id='paymentMethod' title='طريقة الدفع' required={true} items={
                            [
                                { id: "CASH", value: "كاش" },
                                { id: "DIFFER", value: "آجل" },
                            ].map(item => <option key={item.id} value={item.id}>{item.value}</option>)
                        } />
                    </div>
                    <InlineFilesField id="files" label="صور المنتج" multiple={true} className='mb-5' required={true} />
                    <Terms />
                    <HiddenInfoField id='offerId' value={offer.id} />
                    <HiddenInfoField id='supplierId' value={user.id} />
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
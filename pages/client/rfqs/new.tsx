import ClientLayout from 'layouts/client.layout';
import { getAPIURL, getSSProps } from 'public/assets/utils/helpers';
import React, { useState } from 'react';
import { SimpleModal } from '../../../components/generic/ui/modal.component';
import CardComponent from 'components/generic/ui/card.component';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { InlineFormField, InlineFormSelect } from 'components/forms/inline-form-field';
import categoriesConfig from 'src/config/core/categories.config';
import { InlineFilesField } from '../../../components/forms/inline-form-field';

const NewRFQ = ({ user }) => {
    const { register, handleSubmit } = useForm();
    const [openModal, setOpenModal] = useState(false);

    const onSubmit = async () => {
        try {
            const response = (
                await axios.post(
                    getAPIURL('/rfqs/new'),
                    new FormData(document.getElementById('new-rfq') as HTMLFormElement),
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })).data;
            if (response?.error)
                return window.alert(response.error);
            setOpenModal(true);
        } catch (error) {
            console.log(error);
            window.alert('حدث خطأ ما');
        }
    }

    return (
        <ClientLayout>
            <CardComponent>
                <SimpleModal openModal={openModal} setOpenModal={setOpenModal} title='لقد تم ارسال الطلب بنجاح' button='الصفحة الرئيسية' href='/client' />
                <div className='flex flex-col gap-y-5'>
                    <h1 className='text-3xl font-bold'>طلب تسعير جديد</h1>
                    <h3 className='text-2xl font-bold'>
                        رقم: <span className='font-normal'>0x020231</span>
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)} id='new-rfq'>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <InlineFormField id="productName" type='text' title="إسم المنتج" placeholder="مسامير" />
                            <InlineFormField id="description" type='text' title="المواصفات" placeholder="حجم, لون, معدن, إلخ" />
                            <InlineFormField id="quantity" type='text' title="الكمية" placeholder="22 قطعة" />
                            {/* <!-- Dropdown menu --> */}
                            <InlineFormSelect id="categories" title="القسم" items={
                                [...categoriesConfig].map((category) => <option key={category.name} value={category.name}>{category.name}</option>)
                            } />
                        </div>
                        <InlineFilesField id="files" name='files' multiple={true} label='إرفاق صور' />
                        <div className="center mt-10">
                            <button type="submit" className="w-[30%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">أرسل الطلب</button>
                        </div>
                    </form>
                </div>

            </CardComponent>
        </ClientLayout>

    );
}

export default NewRFQ;

export const getServerSideProps = getSSProps;
import React from 'react';
import { InlineFormField, InlineFormSelect } from './inline-form-field';
import companySizeConfig from 'src/config/core/company-size.config';

const NewClientForm = () => {
    return (
        <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2 py-3">
                <InlineFormField id="companyName" type='text' title="إسم الشركة" placeholder="مثال: شركة" />
                <InlineFormField id="email" type='text' title="البريد الإلكتروني" placeholder="example@email.com" />
                <InlineFormField id="password" type='text' title="كلمة المرور" placeholder="********" />
                <InlineFormField id="confirm_password" type='text' title="تأكيد كلمة المرور" placeholder="********" />
                <InlineFormSelect id="companySize" title="حجم الشركة" items={
                    companySizeConfig.map((size) => <option key={size.name} value={size.name}>{size.name}</option>)
                } />
                <InlineFormField id="phone" type='text' title="الهاتف" placeholder="01xxxxxxx123" />
            </div>
            <div className="flex flex-col gap-6 mb-2">
                <InlineFormField id="company_address" type='text' title="العنوان" placeholder="الجيزة, شارع الجمهورية, الناصية الأولى" />
                <InlineFormField id="notes" type='text' title="الملاحظات" placeholder="" />
                <div className="flex items-start mb-3">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">أوافق على <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">الشروط والأحكام</a>.</label>
                </div>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                أرسل الرد
            </button>
        </form>
    )
}

export default NewClientForm;
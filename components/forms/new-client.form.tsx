import React from 'react';
import { InlineFormField, InlineFormSelect } from './inline-form-field';
import companySizeConfig from 'src/config/core/company-size.config';
import Terms from 'components/generic/terms.component';

const NewClientForm = ({ user, formAction }: { user?, formAction?: string }) => {

  const _ = (key, def?: object) => {
    return user[key] || (def || '');
  }

  return (
    <form action={formAction}>
      <div className="grid gap-6 mb-6 md:grid-cols-2 py-3">
        <InlineFormField id="companyName" type='text' title="إسم الشركة" placeholder="مثال: شركة" value={_("username")} />
        <InlineFormField id="email" type='text' title="البريد الإلكتروني" placeholder="example@email.com" value={_("email")} />
        <InlineFormField id="password" type='text' title="كلمة المرور" placeholder="********" />
        <InlineFormField id="confirm_password" type='text' title="تأكيد كلمة المرور" placeholder="********" />
        <InlineFormSelect id="companySize" title="حجم الشركة" items={
          [
            { name: _("company", {}).size || '' },
            ...companySizeConfig.filter(size => size.name != _("company", {}).size)
          ]
            .map((size) => <option key={size.name} value={size.name}>{size.name}</option>)
        } />
        <InlineFormField id="phone" type='text' title="الهاتف" placeholder="01xxxxxxx123" value={_("phone")} />
      </div>
      <div className="flex flex-col gap-6 mb-2">
        <InlineFormField id="company_address" type='text' title="العنوان" placeholder="الجيزة, شارع الجمهورية, الناصية الأولى" value={_("company").address || ''} />
        <InlineFormField id="notes" type='text' title="الملاحظات" placeholder="" value={_("company").notes || ''} />
        <Terms />
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        حفظ
      </button>
    </form>
  )
};

export default NewClientForm;
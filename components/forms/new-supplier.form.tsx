import React from 'react';
import { InlineFormField, InlineFormSelect } from './inline-form-field';
import categoriesConfig from 'src/config/core/categories.config';
import companySizeConfig from 'src/config/core/company-size.config';

const NewSupplierForm = ({ user, formAction }: { user?, formAction?: string }) => {
	const _ = (key, def?: object) => {
		return (user && (user[key] || (def || ''))) || '';
	}

	const FormBody = () => {
		return (
			<>
				<div className="grid gap-6 mb-6 md:grid-cols-2 py-3">
					<InlineFormField id="username" type='text' title="إسم المستخدم" placeholder="مثال: ica_for_ceramic" value={_("username")} required={true} />
					<InlineFormField id="companyName" type='text' title="إسم الشركة" placeholder="مثال: شركة" value={_("username")} required={true} />
					<InlineFormField id="email" type='text' title="البريد الإلكتروني" placeholder="example@email.com" value={_("email")} required={true} />
					<InlineFormField id="password" type='text' title="كلمة المرور" placeholder="********" required={true} />
					<InlineFormField id="confirm_password" type='text' title="تأكيد كلمة المرور" placeholder="********" required={true} />
					<InlineFormSelect id="industry" title="القسم" required={true} items={
						[
							{ name: _('industry') },
							...categoriesConfig.filter(category => category.name != _("category"))
						]
							.map((category, index) => <option key={index} value={category.name}>{category.name}</option>)
					} />
					<InlineFormSelect id="companySize" title="حجم الشركة" required={true} items={
						[
							{ name: _("company", {}).size },
							...companySizeConfig.filter(size => size.name != _("company", {}).size)
						]
							.map((size, index) => <option key={index} value={size.name}>{size.name}</option>)
					} />
					<InlineFormField id="phone" type='text' title="الهاتف" placeholder="01xxxxxx123" value={_("phone")} required={true} />
					{/* <InlineFormField id="username" type='text' title="إسم المستخدم" placeholder="user.name123" value={_("phone")} /> */}
				</div>
				<div className="flex flex-col gap-6 mb-2">
					<InlineFormField id="companyAddress" type='text' title="العنوان" placeholder="الجيزة, شارع الجمهورية, الناصية الأولى" value={_("company").address} required={true} />
					<InlineFormField id="notes" type='text' title="الملاحظات" placeholder="" value={_("company").notes} required={true} />
					{/* <Terms /> */}
				</div>
				{/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				حفظ
			</button> */}
			</>
		)
	}

	return (
		<>
			{(formAction && (<form action={formAction}><FormBody /></form>)) || <FormBody />}
		</>
	)
}

export default NewSupplierForm;
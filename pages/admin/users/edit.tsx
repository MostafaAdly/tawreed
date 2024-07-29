import React, { useState } from 'react';
import { getAPIURL, getFormFields, getSSProps, isClientUser, isSupplierUser } from 'public/assets/utils/helpers';
import { GetServerSideProps } from 'next';
import AdminLayout from 'layouts/admin.layout';
import NewClientForm from '../../../components/forms/new-client.form';
import NewSupplierForm from 'components/forms/new-supplier.form';
import { AccountType } from 'src/config/enums/account.enum';
import axios from 'axios'

const EditUser = ({ user }) => {
	const [users, setUsers] = useState([]);
	const emailRef = React.useRef(null);
	const phoneRef = React.useRef(null);

	const onSearch = async (prompt = `email=${emailRef.current.value}&phone=${phoneRef.current.value}`) => {
		try {
			let response = (await axios.get(getAPIURL(`/users?${prompt}`))).data;
			if (!response.error) setUsers(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	const onSaveClick = async () => {
		try {
			const data = getFormFields('edit-user-form');
			const response = (await axios.post(getAPIURL(`/users/edit`), data)).data;
			if (!response || response?.error) return alert(`حدث خطأ ما`);
			return alert(`تم تعديل ال${AccountType[data['type'].toUpperCase()]} بنجاح`);
		} catch (error) {
			console.error(error);
		}
	}

	const onDeleteClick = async () => {
		try {
			const data = getFormFields('edit-user-form');
			const response = (await axios.post(getAPIURL(`/users/delete`), { id: data['id'] })).data;
			if (!response || response?.error) return alert(`حدث خطأ ما`);
			return alert(`تم حذف ${data['username']} بنجاح`);
		} catch (error) {
			console.error(error);
		}
	}

	const getUser = () => users.length == 1 ? users[0] : null;
	const clearSearch = () => {
		emailRef.current.value = '';
		phoneRef.current.value = '';
		setUsers([]);
	}

	return (
		<AdminLayout user={user}>
			<h1 className='text-3xl font-bold mb-10'>تحرير مستخدم</h1>

			<form onSubmit={(f) => f.preventDefault()} className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">الرجاء البحث عن المستخدم المراد تعديل بياناته:</h5>
				<p className="text-sm font-medium text-gray-900 dark:text-gray-300">- الرجاء البحث بإستخدام البريد الإلكتروني او بإستخدام الهاتف</p>
				<div className="grid gap-6 mb-3 md:grid-cols-2 py-3">
					<div className="flex flex-col gap-6 mb-1">
						<label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-gray-300">البريد الإلكتروني</label>
						<input placeholder="email@example.com" ref={emailRef} type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
					<div className="flex flex-col gap-6 mb-1">
						<label htmlFor="phone" className="text-sm font-medium text-gray-900 dark:text-gray-300">الهاتف</label>
						<input placeholder="01xxxxxx341" ref={phoneRef} type="text" id="phone" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
				</div>
				<div className="flex gap-x-5">
					<button onClick={() => onSearch()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						بحث
					</button>
					<button
						onClick={() => onSearch('type=Client')}
						className="text-blue-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						إعرض كل العملاء
					</button>
					<button
						onClick={() => onSearch('type=Supplier')}
						className="text-blue-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						إعرض كل الموردين
					</button>
					<button
						onClick={clearSearch}
						className="text-white bg-red-500 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						مسح
					</button>
				</div>
			</form>
			{
				users.length > 1 && (
					<div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">نتائج البحث ({users.length})</h5>
						{/* SEARCH RESULTS */}
						<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-3">
											#
										</th>
										<th scope="col" className="px-6 py-3">
											حساب
										</th>
										<th scope="col" className="px-6 py-3">
											إسم المستخدم
										</th>
										<th scope="col" className="px-6 py-3">
											البريد الإلكتروني
										</th>
										<th scope="col" className="px-6 py-3">
											الهاتف
										</th>
										<th scope="col" className="px-6 py-3"></th>
									</tr>
								</thead>
								<tbody>
									{users.map((user, key) => <SearchResult key={key} user={user} index={key + 1} onClick={() => { setUsers([user]); (emailRef.current.value = user.email); (phoneRef.current.value = user.phone); }} />)}
								</tbody>
							</table>
						</div>
					</div >
				)
			}
			{
				(isClientUser(getUser()) || isSupplierUser(getUser())) && (
					<form
						id='edit-user-form'
						className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
					>
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">النوع: {AccountType[getUser().type.toUpperCase()]}</h5>
						{/* LOADING FORM */}
						{
							isClientUser(getUser()) ? <NewClientForm formAction={getAPIURL('/users/edit')} user={getUser()} />
								: (isSupplierUser(getUser()) ? <NewSupplierForm formAction={getAPIURL('/users/edit')} user={getUser()} /> : null)
						}
						<button
							onClick={onSaveClick}
							className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							حفظ
						</button>
						<button
							onClick={onDeleteClick}
							className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							حذف
						</button>
					</form >
				)
			}
		</AdminLayout >
	)
};

const SearchResult = ({ index, user, onClick }) => {
	return (
		<tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				<b>{index}</b>
			</th>
			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				{AccountType[user.type.toUpperCase()]}
			</th>
			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				{user.username}
			</th>
			<td className="px-6 py-4">
				{user.email}
			</td>
			<td className="px-6 py-4">
				{user.phone}
			</td>
			<td className="px-6 py-4">
				<button onClick={onClick} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">تعديل</button>
			</td>
		</tr>
	)
}

export default EditUser;

export const getServerSideProps: GetServerSideProps = getSSProps;
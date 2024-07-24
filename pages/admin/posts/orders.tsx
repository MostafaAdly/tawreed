import AdminLayout from 'layouts/admin.layout';
import { GetServerSideProps } from 'next';
import { getAPIURL, getSSProps } from 'public/assets/utils/helpers';
import React, { useEffect, useRef, useState } from 'react';
import { InlineFormSelect } from '../../../components/forms/inline-form-field';
import CardComponent from 'components/generic/ui/card.component';
import TitleComponent from 'components/generic/ui/title.component';
import axios from 'axios';
import { OfferStatus } from 'src/config/enums/offer_status.enum';


const Index = ({ user }) => {
    const [offers, setOffers] = useState([]);
    const [offerName, setOfferName] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>('');
    const statusFilterRef = useRef();

    useEffect(() => {
        (async () => {
            try {
                const response = (await axios.post(getAPIURL('/posts/offers'), { relations: ['client', 'offerResponse', 'supplier'], })).data;
                if (response?.data) {
                    setOffers(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        })();

    }, []);

    const performAction = (offerId) => {
        return async (status) => {
            try {
                const response = (await axios.post(getAPIURL(`/posts/offers/status`), { offerId, status })).data;
                if (response?.error) return console.error(response);
                setOffers(offers.map(offer => offer.id == offerId ? { ...offer, status } : offer));
                return alert('تم تغيير حالة الطلب بنجاح');
            } catch (error) {
                console.error(error);
            }
        }
    }

    const clearFilter = () => {
        setStatusFilter('');
        if (statusFilterRef?.current) statusFilterRef.current['value'] = '' as never;
    }

    const onStatusFilterChange = ({ target }) => {
        setStatusFilter(target.value);
    }

    return (
        <AdminLayout user={user}>
            <CardComponent>
                <TitleComponent marginBottom='10' title={`إدارة الطلبات (${offers.length})`} />
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="pb-4 bg-white dark:bg-gray-900">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <div className="flex flex-row gap-x-5">
                                <input
                                    type="text"
                                    id="table-search"
                                    onChange={({ target }) => setOfferName(target.value.toLowerCase())}
                                    placeholder="أبحث"
                                    className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <InlineFormSelect id='filter' fref={statusFilterRef} className='w-10 h-auto' items={
                                    ['', ...Object.keys(OfferStatus)].map((status, index) => <option key={index} value={OfferStatus[status]}>{OfferStatus[status]}</option>)
                                } hideLabel onChange={onStatusFilterChange} />
                                <button onClick={clearFilter} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">أمسح التصفية</button>
                            </div>
                        </div>
                    </div>
                    <table className="w-full text-[18px] text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-[18px] text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-bold">
                                    <b>#</b>
                                </th>
                                <th scope="col" className="px-6 py-3 font-bold">
                                    الكود
                                </th>
                                <th scope="col" className="px-6 py-3 font-bold">
                                    إسم الطلب
                                </th>
                                <th scope="col" className="px-6 py-3 font-bold">
                                    الكمية
                                </th>
                                <th scope="col" className="px-6 py-3 font-bold">
                                    السعر
                                </th>
                                <th scope="col" className="px-6 py-3 font-bold">
                                    إسم العميل
                                </th>
                                <th scope="col" className="px-6 py-3 font-bold">
                                    إسم المورد
                                </th>
                                <th scope="col" className="px-6 py-3 font-bold">حالة الطلب</th>
                                <th scope="col" className="px-6 py-3 font-bold"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                offers
                                    .filter(offer => statusFilter == '' || (offer.status == statusFilter))
                                    .filter(offer => (offer.name || '').toLowerCase().includes(offerName))
                                    .map((offer, index) => <TableRow key={index} index={index} order={offer} performAction={performAction(offer.id)} />)
                            }
                        </tbody>
                    </table>
                </div>
            </CardComponent>
        </AdminLayout>
    )
}


const TableRow = ({ index, order, performAction }) => {
    console.log(order);
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-slate-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {order.id}
            </th>
            <td className="px-6 py-4">
                {order.name}
            </td>
            <td className="px-6 py-4">
                {order.quantity}
            </td>
            <td className="px-6 py-4">
                {order?.offerResponse?.totalPrice}
            </td>
            <td className="px-6 py-4">
                {order?.client?.username || 'لا يوجد'}
            </td>
            <td className="px-6 py-4">
                {order?.supplier?.username || 'لا يوجد'}
            </td>
            <td className="px-6 py-4">
                {order.status}
            </td>
            <td className="px-3 py-3 center flex-col gap-y-2">
                <button onClick={() => performAction(OfferStatus.Shipped)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">تم التوصيل</button>
                <button onClick={() => performAction(OfferStatus.Rejected)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">تم الرفض</button>
                <button onClick={() => performAction(OfferStatus.Cancelled)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">تم الإلغاء</button>
            </td>
            {/* <td className="px-3 py-4 flex gap-x-6 center">
                <InlineFormSelect id={index} key={index} marginBottom='0' width='[100%]' items={
                    Object.entries(OfferStatus).map(([key, value]) => {
                        return <option key={key} value={key}>{value}</option>
                    })
                } />
            </td> */}
        </tr>
    )
}


export default Index;

export const getServerSideProps: GetServerSideProps = getSSProps;
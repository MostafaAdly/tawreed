import axios from 'axios'
import SupplierLayout from 'layouts/supplier.layout'
import { GetServerSideProps } from 'next'
import { getAPIURL, getSSProps } from 'public/assets/utils/helpers'
import React, { useEffect, useRef, useState } from 'react'
import { InlineFormSelect } from '../../../components/forms/inline-form-field';
import categoriesConfig from 'src/config/core/categories.config'
import OfferModal from 'components/generic/modals/offer.modal'

// GLOBAL FOR THIS FILE
const maxDescriptionLength = 30;

const IncomingPosts = ({ user, offersIDs }) => {
    const [offers, setOffers] = useState([]);
    const [offerName, setOfferName] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const searchRef = useRef();

    useEffect(() => {
        (async () => {
            try {
                const response = (await axios.post(getAPIURL('/posts/offers'), { offersIDs, relations: ['client'] })).data;
                if (response?.data) {
                    setOffers(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        })();

    }, []);

    const clearSearch = () => {
        setOfferName('');
        if (searchRef.current) searchRef.current['value'] = '' as never;
        setCategoryFilter(null);
    }

    const onCategoryChange = ({ target }) => {
        setCategoryFilter(target.value);
    }

    return (
        <SupplierLayout user={user}>
            <div className="flex flex-col mb-5">
                <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">طلبات تسعير جديدة</h1>
                <p className="text-gray-500 dark:text-gray-400">هنا يمكنك مشاهدة طلبات التسعير الجديدة</p>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="pb-4 bg-white dark:bg-gray-900">
                    <div className="relative mt-1 grid">
                        <div className="flex flex-row gap-x-5">
                            <button onClick={clearSearch} type="button" className="h-[100%] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 center focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 text-nowrap">
                                <i className='fa-solid fa-delete-left text-[18px] text-white' />
                            </button>
                            <div className='h-[100%] relative'>
                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <i className="fa-solid fa-magnifying-glass" />
                                </div>
                                <input
                                    type="text"
                                    id="table-search"
                                    onChange={({ target }) => setOfferName(target.value.toLowerCase())}
                                    placeholder="أبحث"
                                    ref={searchRef}
                                    className="h-[100%] block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <InlineFormSelect id='filter' className='w-10 h-[100%]' items={
                                categoriesConfig.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)
                            } hideLabel onChange={onCategoryChange} />
                        </div>
                    </div>
                </div>
                <table className="w-full text-[18px] text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-[18px] text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                إسم السلعة
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                العميل
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                المواصفات
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                القسم
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            offers
                                .filter(offer => !categoryFilter || offer.industry == categoryFilter)
                                .filter(offer => (offer.name || '').toLowerCase().includes(offerName))
                                .map((offer, index) => <TableRow key={index} index={index} offer={offer} />)
                        }
                    </tbody>
                </table>
            </div>

        </SupplierLayout>
    )
}

const TableRow = ({ index, offer }) => {
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-slate-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {offer.name}
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {offer.client?.username}
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {(offer.description || '').substring(0, maxDescriptionLength) + (offer.description.length > maxDescriptionLength ? '...' : '')}
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {offer.industry}
            </td>
            <td scope="row" className="px-1 py-4 flex justify-evenly">
                <OfferModal offer={offer} buttonStyle='font-medium text-blue-600 dark:text-blue-500 hover:underline' />
                <a href={`/supplier/posts/edit/${offer.id}`} className="font-medium text-green-600 dark:text-blue-500 hover:underline">تعديل</a>
                <a href="#" className="font-medium text-red-600 dark:text-blue-500 hover:underline">رفض</a>
            </td>
        </tr>
    )
}

export default IncomingPosts


export const getServerSideProps: GetServerSideProps = getSSProps
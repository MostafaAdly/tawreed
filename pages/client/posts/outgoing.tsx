import axios from 'axios'
import OfferModal from 'components/generic/modals/offer.modal'
import ClientLayout from 'layouts/client.layout'
import { GetServerSideProps } from 'next'
import { getAPIURL, getSSProps } from 'public/assets/utils/helpers'
import React, { useEffect, useState } from 'react'
import { OfferStatus } from 'src/config/enums/offer_status.enum'

const maxDescriptionLength = 50;

const OutgoingPosts = ({ user, offersIDs }) => {
    const [offers, setOffers] = useState([]);
    const [offerName, setOfferName] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = (await axios.post(getAPIURL('/posts/offers'), {
                    offersIDs, status: OfferStatus.New
                })).data;
                if (response?.data) {
                    setOffers(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <ClientLayout user={user}>
            <div className="flex flex-col mb-5">
                <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">العروض الصادرة</h1>
                <p className="text-gray-500 dark:text-gray-400">هنا يمكنك مشاهدة العروض الصادرة منك</p>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="pb-4 bg-white dark:bg-gray-900">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            onChange={({ target }) => setOfferName(target.value.toLowerCase())}
                            placeholder="أبحث"
                            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <table className="w-full text-[18px] text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-[18px] text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                الكود
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                إسم السلعة
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                الكمية
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                القسم
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                الوصف
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            offers
                                .filter(offer => (offer.name || '').toLowerCase().includes(offerName))
                                .map((offer, index) => <TableRow key={index} index={index} offer={offer} />)
                        }
                    </tbody>
                </table>
            </div>

        </ClientLayout>
    )
}

const TableRow = ({ index, offer }) => {
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-slate-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
            </th>
            <td className="px-6 py-4">
                {offer.id}
            </td>
            <td className="px-6 py-4">
                {offer.name}
            </td>
            <td className="px-6 py-4">
                {offer.quantity}
            </td>
            <td className="px-6 py-4">
                {offer.industry}
            </td>
            <td className="px-6 py-4">
                {(offer.description || '').substring(0, maxDescriptionLength) + (offer.description.length > maxDescriptionLength ? '...' : '')}
            </td>
            <td className="px-6 py-4">
                <OfferModal offer={offer} buttonStyle='font-medium text-blue-600 dark:text-blue-500 hover:underline' />
            </td>
        </tr>
    )
}


export default OutgoingPosts

export const getServerSideProps: GetServerSideProps = getSSProps
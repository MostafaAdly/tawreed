import axios from 'axios'
import OfferModal from 'components/generic/modals/offer.modal'
import ClientLayout from 'layouts/client.layout'
import { GetServerSideProps } from 'next'
import { getAPIURL, getSSProps } from 'public/assets/utils/helpers'
import React, { useEffect, useState } from 'react'
import { OfferStatus } from 'src/config/enums/offer_status.enum'

const IncomingPosts = ({ user, offersIDs }) => {
    const [offers, setOffers] = useState([]);
    const [offerName, setOfferName] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = (await axios.post(getAPIURL('/posts/offers'), {
                    offersIDs, relations: ['supplier', 'offerResponse', 'client'], status: OfferStatus.Pending
                })).data;
                if (response?.data) {
                    setOffers(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const handleOffer = async (offer, type) => {
        if (type === 1) {
            // Confirm
            const response = (await axios.get(getAPIURL(`/posts/offers/confirm?offerId=${offer.id}`))).data;
            if (response?.error) return alert(`Error: ${response.message}`);
            alert('تمت الموافقة على العرض بنجاح');
            window.location.href = '/client/posts/confirmed';
        }
        else {
            // Reject
            const response = (await axios.get(getAPIURL(`/posts/offers/reject?offerId=${offer.id}`))).data;
            if (response?.error) return alert(`Error: ${response.message}`);
            alert('تم رفض العرض بنجاح');
            setOffers(offers.filter(o => o.id !== offer.id));
        }
    }

    return (
        <ClientLayout user={user}>
            <div className="flex flex-col mb-5">
                <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">العروض الواردة</h1>
                <p className="text-gray-500 dark:text-gray-400">هنا يمكنك مشاهدة العروض الواردة لك</p>
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
                                إسم السلعة
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                الكود
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                المورد
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                الكمية
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold">
                                السعر
                            </th>
                            <th scope="col" className="px-1 py-3 font-bold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            offers
                                .filter(offer => (offer.name || '').toLowerCase().includes(offerName))
                                .map((offer, index) => <TableRow key={index} index={index} offer={offer} handleOffer={handleOffer} />)
                        }
                    </tbody>
                </table>
            </div>

        </ClientLayout>
    )
}

const TableRow = ({ index, offer, handleOffer }) => {
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-slate-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
            </td>
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
                {offer.offerResponse.totalPrice}
            </td>
            <td className="px-3 py-4 gap-x-3 w-full center">
                <OfferModal offer={offer} buttonStyle='font-medium text-blue-600 dark:text-blue-500 hover:underline' />
                <button onClick={() => handleOffer(offer, 1)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">موافقة</button>
                <button onClick={() => handleOffer(offer, 0)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">رفض</button>
            </td>
        </tr>
    )
}

export default IncomingPosts




export const getServerSideProps: GetServerSideProps = getSSProps
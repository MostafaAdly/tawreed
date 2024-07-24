import axios from 'axios'
import SupplierLayout from 'layouts/supplier.layout'
import { GetServerSideProps } from 'next'
import { getAPIURL, getSSProps } from 'public/assets/utils/helpers'
import React, { useEffect, useState } from 'react'
import { OfferStatus } from 'src/config/enums/offer_status.enum'

const maxDescriptionLength = 50;

const PostsInDelivery = ({ user, offersIDs }) => {
  const [offers, setOffers] = useState([]);
  const [offerName, setOfferName] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = (await axios.post(getAPIURL('/posts/offers'),
          {
            offersIDs,
            status: OfferStatus.Confirmed,
            relations: ['client', 'offerResponse']
          })
        ).data;
        if (response?.data) {
          setOffers(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();

  }, []);
  return (
    <SupplierLayout user={user}>
      <div className="flex flex-col mb-5">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">العروض قيد التوصيل</h1>
        <p className="text-gray-500 dark:text-gray-400">هنا يمكنك مشاهدة العروض قيد التوصيل</p>
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
                إسم السلعة
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                العميل
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                المواصفات
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                السعر
              </th>
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
        {offer.offerResponse?.totalPrice}
      </td>
    </tr>
  )
}

export default PostsInDelivery;

export const getServerSideProps: GetServerSideProps = getSSProps
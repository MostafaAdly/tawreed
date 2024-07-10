import ClientLayout from 'layouts/client.layout'
import { GetServerSideProps } from 'next'
import { getSSProps } from 'public/assets/utils/helpers'
import React from 'react'

const RfqsHistory = ({ }) => {
    return (
        <ClientLayout>
            <div className="flex flex-col mb-5">
                <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">المعاملات السابقة</h1>
                <p className="text-gray-500 dark:text-gray-400">هنا يمكنك مشاهدة العروض معاملاتك السابقة مع الموردين</p>
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
                            type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="أبحث" />
                    </div>
                </div>
                <table className="w-full text-[18px] text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-[18px] text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold">
                                إسم السلعة
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
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow name='بطيخ' supplier='ابطخ' quantity='123' price='321' />
                    </tbody>
                </table>
            </div>

        </ClientLayout>
    )
}

const TableRow = ({ name, supplier, quantity, price }) => {
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-slate-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {name}
            </th>
            <td className="px-6 py-4">
                {supplier}
            </td>
            <td className="px-6 py-4">
                {quantity}
            </td>
            <td className="px-6 py-4">
                {price}
            </td>
        </tr>
    )
}

export default RfqsHistory




export const getServerSideProps: GetServerSideProps = getSSProps

import React from 'react';
import { _css, getAssetImage } from 'public/assets/utils/helpers';

const HeaderComponent = ({ }) => {
    return (
        <div className='fixed right-[14%] left-0 w-auto h-[4em] bg-gray-200 z-100 pr-10 pl-10 flex items-center justify-between'>
            <h1 className='text-2xl font-bold w-fit h-full flex items-center'>الصفحة الرئيسية</h1>
            {/* LEFT SIDE */}
            <div className='w-[60%] flex justify-end gap-x-10'>

                <form className="max-w-md w-[25%]">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-400 rounded-[3em] bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="أبحث" required />
                    </div>
                </form>

                <div className="flex items-center gap-4">
                    <img className="w-10 h-10 rounded-full" src={getAssetImage('logo')} alt="" />
                    <div className="font-medium dark:text-white">
                        <div>إسم المستخدم</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HeaderComponent;

import React from 'react';
import { getAssetImage } from 'public/assets/utils/helpers';

const HeaderComponent = ({ }) => {
    return (
        <header className='fixed right-0 pr-[22%] left-0 w-auto h-[4em] bg-gray-200 z-100 pl-10 flex items-center justify-between z-50 shadow'>
            <h1 className='text-2xl font-bold w-fit h-full flex items-center'>الصفحة الرئيسية</h1>
            {/* LEFT SIDE */}
            <div className='w-[60%] flex justify-end gap-x-10'>

                <form className="max-w-md w-[25%] focus:w-[35%] hover:w-[35%] transition-width duration-150">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <i aria-hidden className='fa-solid fa-search w-4 h-4 text-gray-500 dark:text-gray-400' />
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
        </header>
    );
}

export default HeaderComponent;
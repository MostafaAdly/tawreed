import React from 'react'


const CardComponent = ({ children }) => {
    return (
        <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            {children}
        </div>
    )
}

export default CardComponent
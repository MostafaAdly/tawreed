import React, { ReactElement } from 'react'


const CardComponent = ({ children, className }: { children: ReactElement | ReactElement[], className?: string }) => {
    return (
        <div className={`block ${className && className.includes('w-') ? '' : 'w-full'} p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}>
            {children}
        </div>
    )
}

export default CardComponent
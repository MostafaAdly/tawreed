import { ReactElement } from "react"

export const InlineFormField = ({ id, type = "text", title, placeholder, marginBottom = "0" }) => {
    return (
        <div className={`mb-${marginBottom}`}>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <input type={type} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}

export const InlineFormSelect = ({ id, title, marginBottom = "0", items }:
    { id: string, title: string, placeholder?: string, marginBottom?: string, items: ReactElement[] }) => {
    return (
        <div className={`mb-${marginBottom}`}>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {
                    items
                }
            </select>
        </div>
    )
}
import { ReactElement } from "react"

export const InlineFormField = ({ id, type = "text", title, placeholder, marginBottom = "0", value = "" }) => {
    return (
        <div className={`mb-${marginBottom}`}>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <input type={type} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required defaultValue={value} />
        </div>
    )
}

export const InlineFormSelect = ({ id, title, marginBottom = "0", items, hideLabel = false, width = "full" }:
    { id: string, title?: string, placeholder?: string, marginBottom?: string, items: ReactElement[], hideLabel?: boolean, width?: string }) => {
    if (!title) hideLabel = true;
    return (
        <div className={`mb-${marginBottom} w-${width}`}>
            {!hideLabel && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>}
            <select
                id="countries"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                {
                    items.filter((item) => item.props.value !== "").map((item) => item)
                }
            </select>
        </div>
    )
}

export const InlineFilesField = ({ id, label, multiple, ...rest }) => {
    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={id}>إرفاق صور</label>
            <input {...rest} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id={id} type="file" multiple={multiple} />
        </>
    )
}
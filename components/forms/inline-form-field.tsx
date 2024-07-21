import { ReactElement } from "react"

export const InlineFormField = ({ id, type = "text", title, placeholder, marginBottom = "0", value = "", ...rest }) => {
    return (
        <div className={`mb-${marginBottom}`}>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <input type={type} id={id} name={id} {...rest} placeholder={placeholder} defaultValue={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
    )
}

export const InlineFormSelect = ({ id, title, marginBottom = "0", items, hideLabel = false, width = "full", className = "", onChange, required = true }:
    { id: string, title?: string, placeholder?: string, marginBottom?: string, items: ReactElement[], hideLabel?: boolean, width?: string, className?: string, onChange?, required?: boolean }) => {
    if (!title) hideLabel = true;
    return (
        <div className={`mb-${marginBottom} w-${width}`}>
            {!hideLabel && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>}
            <select
                id={id}
                name={id}
                onChange={onChange}
                required={required}
                className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                {
                    items.filter((item) => item.props.value !== "").map((item) => item)
                }
            </select>
        </div>
    )
}

export const InlineFilesField = ({ id, label, multiple, className, required }:
    { id: string, label: string, multiple?: boolean, className?: string, required?: boolean }
) => {
    return (
        <div className={className}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={id}>إرفاق صور</label>
            <input id={id} name={id} type="file" multiple={multiple} required={required} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
    )
}

export const InlineDateField = ({ id, className = "", placeholder = "", register = null, required = true }) => {
    return (
        <div className={`relative flex-grow ${className}`}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
            </div>
            <input
                id={id}
                name={id}
                type="text"
                placeholder={placeholder}
                required={required}
                {...(register && register(id, { required: true }))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
    )
}
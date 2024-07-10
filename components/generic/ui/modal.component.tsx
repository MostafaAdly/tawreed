import { isClientSide } from 'public/assets/utils/helpers';
import React, { ReactNode } from 'react'
import { Modal as FlowModal } from 'flowbite-react'

export const SimpleModal = ({ openModal, setOpenModal, title, button, href }) => {
    return (
        <FlowModal show={openModal} onClose={() => setOpenModal(false)}>
            <FlowModal.Header>{title}</FlowModal.Header>
            <FlowModal.Footer>
                <a onClick={() => setOpenModal(false)} className='bg-slate-300 p-3 pl-5 pr-5 rounded' href={href}>{button}</a>
            </FlowModal.Footer>
        </FlowModal>
    )
}


const Modal = ({ children, id, title, description, button, href }: { children: ReactNode, id: string, title: string, description: string, button: string, href: string }) => {
    return (
        <div id={id} tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle={id}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-4 md:p-5">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">{description}</p>
                        <ul className="space-y-4 mb-4">
                            {children}
                        </ul>
                        <a href={href} className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {button}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const showModal = ({ id }) => {
    if (!isClientSide()) return;
    const modal = document.getElementById(id);
    modal?.classList.remove('hidden');
    modal?.setAttribute('aria-hidden', 'false');
}

export const ModalListItem = ({ title, description }: { title: string, description?: string }) => {
    return (
        <li>
            <input type="radio" id="job-1" name="job" value="job-1" className="hidden peer" required />
            <label htmlFor="job-1" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                <div className="block">
                    <div className="w-full text-lg font-semibold">{title}</div>
                    {description && <div className="w-full text-gray-500 dark:text-gray-400">{description}</div>}
                </div>
                <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
            </label>
        </li>
    )
}

export default Modal;
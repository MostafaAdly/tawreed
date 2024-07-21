import React from 'react';
import Divider from '../divider.component';

export const InfoField = ({ title, value }) => {
    return (
        <div className="flex flex-row border w-fit px-5 rounded-lg hover:bg-slate-50 transition-colors duration-150">
            <div className="font-bold py-4 min-w-[90px]">{title}</div>
            <Divider width='[1px]' height='[100%]' color='bg-gray-600' addons='m-2.5' />
            <div className="font-normal py-4 text-gray-600 min-w-40">{value}</div>
        </div>
    )
}

export const HiddenInfoField = ({ id, value }) => {
    return <input type="text" hidden id={id} name={id} defaultValue={value} />
}

export const InfoFields = ({ fields, center = true }: { fields: { title: string, value: string }[], center?: boolean }) => {
    return (
        <div className={`flex flex-wrap justify-start w-auto gap-3${(center ? ' center' : "")}`}>
            {fields.map((field, index) => (
                <InfoField key={index} title={field.title} value={field.value} />
            ))}
        </div>
    )
}

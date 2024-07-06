import React from 'react'


const CardComponent = ({ children, width = "full", height = "full", color = "bg-gray-200", addons = null }) => {
    return (
        <div className={`rounded-xl h-${height} w-${width} ${color}${addons ? " " + addons : ""}`}>
            {children}
        </div>
    )
}

export default CardComponent
import React from 'react';

const Divider = ({ width = "full", height = "[1px]", color = "bg-gray-300", addons = "" }) => {
    return (
        <div className={`w-${width} h-${height} ${color} ${addons}`}></div>
    );
}

export default Divider;
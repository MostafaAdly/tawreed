import React from 'react';

const Divider = (
    { width = "full", height = "[1px]", color = "bg-gray-300", addons = "" }
        : { width: string, height: string, color: string, addons: string }
) => {
    return (
        <div className={`w-${width} h-${height} ${color}${addons != "" ? " " + addons : ""}`}></div>
    );
}

export default Divider;
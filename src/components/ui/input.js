import React from 'react';

export const Input = ({ type = 'text', className = '', ...props }) => {
    return (
        <input
            type={type}
            className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    );
};

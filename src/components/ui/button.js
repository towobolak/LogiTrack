import React from 'react';

export const Button = ({ children, onClick, type = 'button', className = '', disabled = false, ...props }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 disabled:opacity-50 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

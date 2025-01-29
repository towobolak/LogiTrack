import React from 'react';

export const Textarea = ({ className = '', ...props }) => {
    return (
        <textarea
            className={`border rounded-lg p-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    );
};

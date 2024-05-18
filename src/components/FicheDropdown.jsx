// components/FicheDropdown.jsx
import React, { useState } from 'react';

const FicheDropdown = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-between w-full"
            >
                {title}
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <ul className="absolute z-10 w-full bg-white shadow-md max-h-60 overflow-auto">
                    {items.map((item, index) => (
                        <li key={index} className="p-2 hover:bg-gray-100 border-b last:border-b-0 text-black">
                            {item.type}: <em>{item.content}</em>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FicheDropdown;

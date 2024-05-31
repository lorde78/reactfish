import React, { useState } from 'react';

const UpdateCollectionModal = ({ isOpen, onClose, onSubmit, initialCollection }) => {
    const [newTitle, setNewTitle] = useState(initialCollection.title);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (!e.target.value) {
            setNewTitle('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...initialCollection, title: newTitle });
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="relative mt-5">
                        <input
                            type="text"
                            value={newTitle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                        />
                        <label
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${isFocused || newTitle ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'
                                }`}
                        >
                            Title
                        </label>
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Update
                        </button>
                        <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCollectionModal;

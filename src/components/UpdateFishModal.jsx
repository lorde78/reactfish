import React, { useState } from 'react';

const UpdateFishModal = ({ isOpen, onClose, onSubmit, initialTitle }) => {
    const [title, setTitle] = useState(initialTitle);

    const handleSubmit = () => {
        onSubmit(title);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="relative mt-5">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                        />
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Update
                        </button>
                        <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateFishModal;

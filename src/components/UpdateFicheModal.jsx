import React, { useState } from 'react';

const UpdateFicheModal = ({ isOpen, onClose, onSubmit, initialTitle }) => {
    const [newTitle, setNewTitle] = useState(initialTitle);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newTitle);
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="border-2 border-gray-300 rounded p-2 w-full text-black"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                        Update
                    </button>
                    <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2 mt-2">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateFicheModal;
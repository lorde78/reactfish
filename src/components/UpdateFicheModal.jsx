import React, { useState } from 'react';
import CustomForm from './CustomForm';

const UpdateFicheModal = ({ isOpen, onClose, onSubmit, initialTitle }) => {
    const [newTitle, setNewTitle] = useState(initialTitle);

    const handleFieldChange = (fieldName, value) => {
        setNewTitle(value);
    };

    const handleFormSubmit = () => {
        onSubmit(newTitle);
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    const fields = [
        {
            name: 'newTitle',
            type: 'text',
            value: newTitle,
            placeholder: 'Update the title',
            className: 'border-2 border-gray-300 rounded p-2 w-full text-black'
        }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <CustomForm
                    fields={fields}
                    onChange={handleFieldChange}
                    onSubmit={handleFormSubmit}
                    submitLabel="Update"
                />
                <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2 mt-2">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default UpdateFicheModal;

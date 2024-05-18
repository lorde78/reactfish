import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useCollections } from '../context/CollectionContext';
import { UserAuth } from '../context/AuthContext'; // Make sure this import path is correct
import FicheItem from './FishItem'; // Ensure this file exists
import CustomForm from './CustomForm';

const ItemType = 'fiche';

const Fish = ({ collection }) => {
    const { user } = UserAuth(); // Correctly using the UserAuth hook here
    const { addFiche, moveFiche } = useCollections();
    const [formData, setFormData] = useState({
        ficheTitle: ''
    });

    const handleFieldChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = () => {
        if (user && formData.ficheTitle) {
            addFiche(user.uid, collection.id, formData.ficheTitle);
            setFormData({ ficheTitle: '' }); // Reset the field after submission
        }
    };

    const fields = [
        {
            name: 'ficheTitle',
            type: 'text',
            value: formData.ficheTitle,
            placeholder: 'Enter fiche title',
            className: 'w-full p-2 text-black rounded'
        }
    ];

    const [, drop] = useDrop({
        accept: ItemType,
        drop: (item, monitor) => {
            if (!monitor.didDrop() && item.originCollectionId !== collection.id) {
                moveFiche(user.uid, item.originCollectionId, collection.id, item.id);
            }
        },
    });

    return (
        <div ref={drop} className="mt-4">
            <CustomForm
                fields={fields}
                onChange={handleFieldChange}
                onSubmit={handleFormSubmit}
                submitLabel="Add Fiche"
            />
            <ul className="mt-4">
                {collection.fiches.map(fiche => (
                    <FicheItem key={fiche.id} fiche={fiche} collectionId={collection.id} />
                ))}
            </ul>
        </div>
    );
};

export default Fish;

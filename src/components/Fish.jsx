import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useCollections } from '../context/CollectionContext';
import { useFiches } from '../context/FicheContext';
import { UserAuth } from '../context/AuthContext';
import FicheItem from './FishItem';
import CustomForm from './CustomForm';

const ItemType = 'fiche';

const Fish = ({ collection }) => {
    const { user } = UserAuth();
    const { moveFiche } = useCollections();
    const { addFiche } = useFiches();
    const [formData, setFormData] = useState({ ficheTitle: '' });

    const handleFieldChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = () => {
        if (user && formData.ficheTitle) {
            addFiche(user.uid, collection.id, { title: formData.ficheTitle }).then(() => {
                setFormData({ ficheTitle: '' });
            }).catch(error => {
                console.error("Failed to add fiche:", error);
            });
        }
    };

    const [, drop] = useDrop({
        accept: ItemType,
        drop: (item, monitor) => {
            if (!monitor.didDrop() && item.originCollectionId !== collection.id) {
                moveFiche(user.uid, item.originCollectionId, collection.id, item.id).catch(error => {
                    console.error("Failed to move fiche:", error);
                });
            }
        },
    });

    return (
        <div ref={drop} className="mt-4">
            <CustomForm
                fields={[
                    {
                        name: 'ficheTitle',
                        type: 'text',
                        value: formData.ficheTitle,
                        placeholder: 'Enter fiche title',
                        className: 'w-full p-2 text-black rounded'
                    }
                ]}
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

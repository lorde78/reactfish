import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { UserAuth } from '../context/AuthContext';
import { useCollections } from '../context/CollectionContext';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import UpdateFicheModal from './UpdateFicheModal';

const FicheItem = ({ fiche, collectionId }) => {
    const { user } = UserAuth();
    const { deleteFiche, updateFiche } = useCollections();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [{ isDragging }, drag] = useDrag({
        type: 'fiche',
        item: { id: fiche.id, originCollectionId: collectionId },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const handleUpdate = (newTitle) => {
        updateFiche(user.uid, collectionId, fiche.id, newTitle);
    };

    return (
        <li ref={drag} className={`mb-2 p-2 bg-gray-600 rounded flex justify-between items-center ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-center">
                <span className="mr-2">{fiche.title}</span>
                <button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-blue-700">
                    <FiEdit className="text-lg" />
                </button>
            </div>
            <button onClick={() => deleteFiche(user.uid, collectionId, fiche.id)} className="border rounded-full p-1 bg-red-500 hover:bg-red-700 text-white">
                <FiTrash2 className="text-lg" />
            </button>
            <UpdateFicheModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleUpdate}
                initialTitle={fiche.title}
            />
        </li>
    );
};

export default FicheItem;

import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { UserAuth } from '../context/AuthContext';
import { useFiches } from '../context/FicheContext';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import UpdateFicheModal from './UpdateFicheModal';

const FicheItem = ({ fiche, collectionId }) => {
    const { user } = UserAuth();
    const { deleteFiche, updateFiche } = useFiches();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const [{ isDragging }, drag] = useDrag({
        type: 'fiche',
        item: { id: fiche.id, originCollectionId: collectionId },
        collect: monitor => ({ isDragging: !!monitor.isDragging() }),
    });

    const handleUpdate = (updatedFiche) => {
        updateFiche(user.uid, collectionId, fiche.id, updatedFiche);
        setIsModalOpen(false);
    };

    const renderFicheDetails = (fiche) => {
        return Object.entries(fiche).map(([key, value]) => {
            if (typeof value === 'string' || typeof value === 'number') {
                return <li key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</li>;
            }
            return null; 
        });
    };

    return (
        <li ref={drag} className={`mb-2 p-2 bg-gray-600 rounded flex flex-col ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex justify-between items-center">
                <span className="mr-2 font-bold cursor-pointer" onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
                    {fiche.title}
                </span>
                <div>
                    <button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-blue-700">
                        <FiEdit className="text-lg" />
                    </button>
                    <button onClick={() => deleteFiche(user.uid, collectionId, fiche.id)} className="ml-2 border rounded-full p-1 bg-red-500 hover:bg-red-700 text-white">
                        <FiTrash2 className="text-lg" />
                    </button>
                </div>
            </div>
            {isDetailsOpen && (
                <div className="mt-2 p-2 bg-white rounded shadow text-black">
                    <h4 className="font-bold">Détails de la Fiche:</h4>
                    <ul className="list-disc pl-5">
                        {renderFicheDetails(fiche)}
                    </ul>
                </div>
            )}
            <UpdateFicheModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleUpdate}
                fiche={fiche}
            />
        </li>
    );
};

export default FicheItem;

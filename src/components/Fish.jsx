import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { UserAuth } from '../context/AuthContext';
import { useFishes } from '../context/FishContext';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import UpdateFicheModal from './UpdateFicheModal';

const ItemType = 'fiche';

const Fish = ({ collection }) => {
    const { user } = UserAuth();
    const { addFiche, moveFiche, collections } = useFishes();
    const [ficheTitle, setFicheTitle] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const [, drop] = useDrop({
        accept: ItemType,
        drop: (item, monitor) => {
            if (!monitor.didDrop() && item.originCollectionId !== collection.id) {
                moveFiche(user.uid, item.originCollectionId, collection.id, item.id);
            }
        },
    });

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (!e.target.value) {
            setFicheTitle(''); // Clears input if left empty
        }
    };

    const handleFicheSubmit = async (e) => {
        e.preventDefault();
        if (user && ficheTitle) {
            await addFiche(user.uid, collection.id, ficheTitle);
            setFicheTitle('');
        }
    };

    const updatedCollection = collections.find(col => col.id === collection.id) || collection;

    return (
        <div ref={drop} className="mt-4 bg-white rounded-lg shadow-lg p-4">
            <form onSubmit={handleFicheSubmit} className="mb-4">
                <div className="relative">
                    <input
                        id="ficheTitle"
                        type="text"
                        value={ficheTitle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => setFicheTitle(e.target.value)}
                        className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                    />
                    <label
                        htmlFor="ficheTitle"
                        className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${
                            isFocused || ficheTitle ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'
                        }`}
                    >
                        Title
                    </label>
                </div>
                <button type="submit" className="mt-3 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Add Fiche
                </button>
            </form>
            <ul>
                {updatedCollection.fiches.map((fiche) => (
                    <FicheItem key={fiche.id} fiche={fiche} originCollectionId={updatedCollection.id} />
                ))}
            </ul>
        </div>
    );
};

const FicheItem = ({ fiche, originCollectionId }) => {
    const { user } = UserAuth();
    const { deleteFiche, updateFiche } = useFishes();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id: fiche.id, originCollectionId },
        collect: monitor => ({ isDragging: !!monitor.isDragging() }),
    });

    const handleUpdate = (newTitle) => {
        updateFiche(user.uid, originCollectionId, fiche.id, newTitle);
    };

    return (
        <li ref={drag} className={`mb-2 p-3 rounded flex justify-between items-center ${isDragging ? 'opacity-50' : 'opacity-100'} bg-gray-700 text-white`}>
            <div className="flex items-center gap-2">
                <span>{fiche.title}</span>
                <button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-blue-700">
                    <FiEdit className="text-lg" />
                </button>
            </div>
            <button onClick={() => deleteFiche(user.uid, originCollectionId, fiche.id)} className='p-2 rounded bg-red-500 hover:bg-red-700'>
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

export default Fish;

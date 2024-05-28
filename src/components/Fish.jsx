import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { UserAuth } from '../context/AuthContext';
import { useFishes } from '../context/FishContext';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import UpdateFishModal from './UpdateFishModal';

const ItemType = 'Fish';

const Fish = ({ collection }) => {
    const { user } = UserAuth();
    const { addFish, moveFish, collections } = useFishes();
    const [fishTitle, setFishTitle] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const [, drop] = useDrop({
        accept: ItemType,
        drop: (item, monitor) => {
            if (!monitor.didDrop() && item.originCollectionId !== collection.id) {
                moveFish(user.uid, item.originCollectionId, collection.id, item.id);
            }
        },
    });

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (!e.target.value) {
            setFishTitle('');
        }
    };

    const handleFishSubmit = async (e) => {
        e.preventDefault();
        if (user && fishTitle) {
            await addFish(user.uid, collection.id, fishTitle);
            setFishTitle('');
        }
    };

    const updatedCollection = collections.find(col => col.id === collection.id) || collection;

    return (
        <div ref={drop} className="mt-4 bg-white rounded-lg shadow-lg p-4">
            <form onSubmit={handleFishSubmit} className="mb-4">
                <div className="relative">
                    <input
                        id="fishTitle"
                        type="text"
                        value={fishTitle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => setFishTitle(e.target.value)}
                        className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                    />
                    <label
                        htmlFor="fishTitle"
                        className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${isFocused || fishTitle ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'
                            }`}
                    >
                        Title
                    </label>
                </div>
                <button type="submit" className="mt-3 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Add Fish
                </button>
            </form>
            <ul>
                {Array.isArray(updatedCollection.fishes) && updatedCollection.fishes.map((fish) => (
                    <FishItem key={fish.id} fish={fish} originCollectionId={updatedCollection.id} />
                ))}
            </ul>
        </div>
    );
};

const FishItem = ({ fish, originCollectionId }) => {
    const { user } = UserAuth();
    const { deleteFish, updateFish } = useFishes();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id: fish.id, originCollectionId },
        collect: monitor => ({ isDragging: !!monitor.isDragging() }),
    });

    const handleUpdate = (newTitle) => {
        updateFish(user.uid, originCollectionId, fish.id, newTitle);
    };

    return (
        <li ref={drag} className={`mb-2 p-3 rounded flex justify-between items-center ${isDragging ? 'opacity-50' : 'opacity-100'} bg-gray-700 text-white`}>
            <div className="flex items-center gap-2">
                <span>{fish.title}</span>
                <button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-blue-700">
                    <FiEdit className="text-lg" />
                </button>
            </div>
            <button onClick={() => deleteFish(user.uid, originCollectionId, fish.id)} className='p-2 rounded bg-red-500 hover:bg-red-700'>
                <FiTrash2 className="text-lg" />
            </button>
            <UpdateFishModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleUpdate}
                initialTitle={fish.title}
            />
        </li>
    );
};

export default Fish;

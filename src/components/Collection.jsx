import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useCollections } from '../context/CollectionContext';
import Fish from './Fish';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import UpdateCollectionModal from './UpdateCollectionModal';

const Collection = () => {
    const { user } = UserAuth();
    const { addCollection, getCollections, collections, deleteCollection, updateCollection } = useCollections();
    const [title, setTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCollection, setCurrentCollection] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (user) {
            getCollections(user.uid);
        }
    }, [user, getCollections]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (!e.target.value) {
            setTitle('');
        }
    };

    const handleCollectionSubmit = async (e) => {
        e.preventDefault();
        if (user && title) {
            await addCollection(user.uid, title);
            setTitle('');
        }
    };

    const handleDeleteCollection = async (collectionId) => {
        if (window.confirm("Are you sure you want to delete this collection?")) {
            await deleteCollection(user.uid, collectionId);
        }
    };

    const handleUpdateCollection = (collection) => {
        setCurrentCollection(collection);
        setIsModalOpen(true);
    };

    const handleUpdateSubmit = async (updatedCollection) => {
        if (user) {
            await updateCollection(user.uid, updatedCollection);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-10">
                <form onSubmit={handleCollectionSubmit} className="max-w-md mx-auto mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={title}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                        />
                        <label
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${
                                isFocused || title ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'
                            }`}
                        >
                            Title
                        </label>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 block w-full">
                        Add Collection
                    </button>
                </form>
                <div>
                    <h2 className="text-lg mb-4">Your Collections:</h2>
                    <ul>
                        {collections.map((collection) => (
                            <li key={collection.id} className="mb-4 p-4 bg-gray-800 rounded">
                                <div className="flex justify-between items-center">
                                    <span>{collection.title}</span>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleUpdateCollection(collection)}
                                            className='border rounded-full p-1 bg-yellow-500 hover:bg-yellow-700 text-white mr-2'
                                        >
                                            <FiEdit className="text-lg" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCollection(collection.id)}
                                            className='border rounded-full p-1 bg-red-500 hover:bg-red-700 text-white'
                                        >
                                            <FiTrash2 className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                                <Fish collection={collection} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {currentCollection && (
                <UpdateCollectionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleUpdateSubmit}
                    initialCollection={currentCollection}
                />
            )}
        </div>
    );
};

export default Collection;

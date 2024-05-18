import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useCollections } from '../context/CollectionContext';
import Fish from './Fish';
import { FiTrash2, FiEdit } from 'react-icons/fi';

const UpdateCollectionModal = ({ isOpen, onClose, onSubmit, initialCollection }) => {
    const [newTitle, setNewTitle] = useState(initialCollection.title);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...initialCollection, title: newTitle });
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

const Collection = () => {
    const { user } = UserAuth();
    const { addCollection, getCollections, collections, deleteCollection, updateCollection } = useCollections();
    const [title, setTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCollection, setCurrentCollection] = useState(null);

    useEffect(() => {
        if (user) {
            getCollections(user.uid);
        }
    }, [user, getCollections]); // Add getCollections to dependency array

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
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto py-10">
                <form onSubmit={handleCollectionSubmit} className="max-w-md mx-auto mb-6">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter collection title"
                        className="w-full p-2 text-black rounded"
                    />
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
                                        <button onClick={() => handleUpdateCollection(collection)} className='border rounded-full p-1 bg-yellow-500 hover:bg-yellow-700 text-white mr-2'>
                                            <FiEdit className="text-lg" />
                                        </button>
                                        <button onClick={() => handleDeleteCollection(collection.id)} className='border rounded-full p-1 bg-red-500 hover:bg-red-700 text-white'>
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

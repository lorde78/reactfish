import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useCollections } from '../context/CollectionContext';
import Fish from './Fish';
import { FiTrash2 } from 'react-icons/fi';

const Collection = () => {
    const { user } = UserAuth();
    const { addCollection, getCollections, collections, deleteCollection } = useCollections();
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (user) {
            getCollections(user.uid);
        }
    }, [user]);

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

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto">
                <div className="flex">
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
                </div>
                <div>
                    <h2 className="text-lg mb-4">Your Collections:</h2>
                    <ul>
                        {collections.map((collection) => (
                            <li key={collection.id} className="mb-4 p-4 bg-gray-800 rounded">
                                <div className="flex justify-between items-center">
                                    <span>{collection.title}</span>
                                    <button onClick={() => handleDeleteCollection(collection.id)} className='border rounded-full p-1 bg-red-500 hover:bg-red-700 text-white'>
                                        <FiTrash2 className="text-lg" />
                                    </button>
                                </div>
                                <Fish collection={collection} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Collection;

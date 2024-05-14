import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useCollections } from '../context/CollectionContext';
import Fish from './Fish';

const Collection = () => {
    const { user } = UserAuth();
    const { addCollection, getCollections, collections } = useCollections();
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

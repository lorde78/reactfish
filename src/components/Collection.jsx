// CollectionComponent.js
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useCollections } from '../context/CollectionContext';
import { Link } from 'react-router-dom';

const CollectionComponent = () => {
    const { user } = UserAuth();
    const { addCollection, getCollections, collections } = useCollections();
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (user) {
            getCollections(user.uid);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user && title) {
            await addCollection(user.uid, title);
            setTitle('');
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto py-10">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
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
                            <li key={collection.id} className="mb-2 p-2 bg-gray-800 rounded">
                                <span className="mr-2">{collection.title}</span>
                                <Link to={`/collections/${collection.id}/fiches`}
                                      className="text-blue-400 hover:text-blue-600">
                                    View Fiches
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CollectionComponent;

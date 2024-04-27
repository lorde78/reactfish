import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

const Collection = () => {
    const { addCollection, deleteCollection, user, collections } = UserAuth();
    const [newCollectionName, setNewCollectionName] = useState('');

    const handleAddCollection = async (e) => {
        e.preventDefault();
        console.log(user + collections)
        if (newCollectionName) {
            await addCollection(newCollectionName);
            setNewCollectionName('');
        }
    };

    const handleDeleteCollection = async (collectionName) => {
        await deleteCollection(collectionName);
    };

    return (
        <div className='p-4'>
            <h1 className='text-lg font-bold mb-4'>Manage Collections</h1>
            <form onSubmit={handleAddCollection} className='mb-4'>
                <input 
                    type="text" 
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="New collection name"
                    className='border p-2 mr-2'
                />
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Add Collection
                </button>
            </form>
            {collections?.map((collection, index) => (
                <div key={index} className='mb-4 p-4 shadow-md'>
                    <h2 className='text-xl'>{collection.name}</h2>
                    <button onClick={() => handleDeleteCollection(collection.name)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Collection;

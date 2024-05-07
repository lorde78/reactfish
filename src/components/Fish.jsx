import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useCollections } from '../context/CollectionContext';

const Fiche = ({ collectionId }) => {
    const { user } = UserAuth();
    const { addFiche, deleteFiche } = useCollections();
    const [newFicheContent, setNewFicheContent] = useState('');

    const handleAddFiche = async (e) => {
        e.preventDefault();
        if (newFicheContent && user && user.uid) {
            await addFiche(user.uid, collectionId, newFicheContent);
            setNewFicheContent('');
        }
    };

    const handleDeleteFiche = async (ficheId) => {
        if (user && user.uid) {
            await deleteFiche(user.uid, collectionId, ficheId);
        }
    };

    return (
        <div>
            <form onSubmit={handleAddFiche} className='mb-2'>
                <input
                    type="text"
                    value={newFicheContent}
                    onChange={(e) => setNewFicheContent(e.target.value)}
                    placeholder="Add new fiche content"
                    className='border p-2 mr-2'
                />
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Add Fiche
                </button>
            </form>
            {/* Fetch and display fiches here */}
        </div>
    );
};

export default Fiche;

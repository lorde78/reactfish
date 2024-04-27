import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext'

const Fiche = ({ collectionName }) => {
    const { addFiche, deleteFiche, user } = UserAuth(); 
    const [newFicheContent, setNewFicheContent] = useState('');

    const handleAddFiche = async (e) => {
        e.preventDefault();
        if (newFicheContent) {
            await addFiche(collectionName, newFicheContent);
            setNewFicheContent('');
        }
    };

    const handleDeleteFiche = async (ficheId) => {
        await deleteFiche(collectionName, ficheId);
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
            {user?.collections.find(col => col.name === collectionName)?.fiches.map((fiche, index) => (
                <div key={index} className='flex justify-between items-center mb-2 p-2 border'>
                    <p>{fiche.content}</p>
                    <button onClick={() => handleDeleteFiche(fiche.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Fiche;

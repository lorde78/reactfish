import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useCollections } from '../context/CollectionContext';

const Fish = ({ collection }) => {
    const { user } = UserAuth();
    const { addFiche } = useCollections();
    const [ficheTitle, setFicheTitle] = useState('');

    const handleFicheSubmit = async (e) => {
        e.preventDefault();
        if (user && ficheTitle) {
            await addFiche(user.uid, collection.id, ficheTitle);
            setFicheTitle('');
        }
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleFicheSubmit}>
                <input
                    type="text"
                    value={ficheTitle}
                    onChange={(e) => setFicheTitle(e.target.value)}
                    placeholder="Enter fiche title"
                    className="w-full p-2 text-black rounded"
                />
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3 block w-full">
                    Add Fiche
                </button>
            </form>
            <ul className="mt-4">
                {collection.fiches.map((fiche) => (
                    <li key={fiche.id} className="mb-2 p-2 bg-gray-600 rounded">
                        {fiche.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Fish;
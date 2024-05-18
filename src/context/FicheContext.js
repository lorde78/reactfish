import React, { createContext, useContext, useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const FicheContext = createContext();

export const FicheProvider = ({ children }) => {
    const [fiches, setFiches] = useState([]);

    const addFiche = async (userId, collectionId, ficheData) => {
        const userRef = doc(db, 'users', userId);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
            const updatedCollections = snapshot.data().collections.map(collection => {
                if (collection.id === collectionId) {
                    const newFiche = { id: Date.now().toString(), ...ficheData };
                    return { ...collection, fiches: [...collection.fiches, newFiche] };
                }
                return collection;
            });
            await updateDoc(userRef, { collections: updatedCollections });
            setFiches(fiches => [...fiches, ...updatedCollections.flatMap(collection => collection.fiches)]);
        }
    };

    const updateFiche = async (userId, collectionId, ficheId, updateData) => {
        const userRef = doc(db, 'users', userId);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
            const updatedCollections = snapshot.data().collections.map(collection => {
                if (collection.id === collectionId) {
                    const updatedFiches = collection.fiches.map(fiche => {
                        if (fiche.id === ficheId) {
                            return { ...fiche, ...updateData };
                        }
                        return fiche;
                    });
                    return { ...collection, fiches: updatedFiches };
                }
                return collection;
            });
            await updateDoc(userRef, { collections: updatedCollections });
            setFiches(fiches => [...fiches, ...updatedCollections.flatMap(collection => collection.fiches)]);
        }
    };

    const deleteFiche = async (userId, collectionId, ficheId) => {
        const userRef = doc(db, 'users', userId);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
            const updatedCollections = snapshot.data().collections.map(collection => {
                if (collection.id === collectionId) {
                    const updatedFiches = collection.fiches.filter(fiche => fiche.id !== ficheId);
                    return { ...collection, fiches: updatedFiches };
                }
                return collection;
            });
            await updateDoc(userRef, { collections: updatedCollections });
            setFiches(fiches => [...fiches, ...updatedCollections.flatMap(collection => collection.fiches)]);
        }
    };

    return (
        <FicheContext.Provider value={{ fiches, addFiche, updateFiche, deleteFiche }}>
            {children}
        </FicheContext.Provider>
    );
};

export const useFiches = () => useContext(FicheContext);

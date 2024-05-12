import React, { createContext, useContext, useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';  // Use getDoc instead of getDocs

const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
    const [collections, setCollections] = useState([]);

    const addCollection = async (userId, title) => {
        const userRef = doc(db, 'users', userId);
        const newCollection = { id: Date.now().toString(), title: title };
        await updateDoc(userRef, {
            collections: arrayUnion(newCollection)
        });
        setCollections((prev) => [...prev, newCollection]);
    };

    const getCollections = async (userId) => {
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);  // Correct method to fetch data from a document
        if (docSnap.exists()) {
            const userCollections = docSnap.data().collections;
            setCollections(userCollections || []);
        } else {
            console.log("No such document!");
        }
    };

    return (
        <CollectionContext.Provider value={{ collections, addCollection, getCollections }}>
            {children}
        </CollectionContext.Provider>
    );
};

export function useCollections() {
    const context = useContext(CollectionContext);
    if (!context) {
        throw new Error('useCollections must be used within a CollectionProvider');
    }
    return context;
}

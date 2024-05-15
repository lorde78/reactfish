import React, { createContext, useContext, useState } from 'react'
import { db } from '../firebase'
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'

const CollectionContext = createContext()

export const CollectionProvider = ({ children }) => {
	const [collections, setCollections] = useState([])

	const addCollection = async (userId, title) => {
		const userRef = doc(db, 'users', userId)
		const newCollection = {
			id: Date.now().toString(),
			title: title,
			fiches: [],
		}
		await updateDoc(userRef, {
			collections: arrayUnion(newCollection),
		})
		setCollections((prev) => [...prev, newCollection])
	}

	const addFiche = async (userId, collectionId, ficheTitle) => {
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const userCollections = docSnap.data().collections
			const updatedCollections = userCollections.map((collection) => {
				if (collection.id === collectionId) {
					const newFiche = {
						id: Date.now().toString(),
						title: ficheTitle,
					}
					return {
						...collection,
						fiches: [...collection.fiches, newFiche],
					}
				}
				return collection
			})

			await updateDoc(userRef, { collections: updatedCollections })
			setCollections(updatedCollections)
		}
	}

	const getCollections = async (userId) => {
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const userCollections = docSnap.data().collections
			setCollections(userCollections || [])
		} else {
			console.log('No such document!')
		}
	}

        const deleteCollection = async (userId, collectionId) => {
            const userRef = doc(db, 'users', userId);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const filteredCollections = docSnap.data().collections.filter(collection => collection.id !== collectionId);
                await updateDoc(userRef, { collections: filteredCollections });
                setCollections(filteredCollections);
            }
        };
    
        const deleteFiche = async (userId, collectionId, ficheId) => {
            const userRef = doc(db, 'users', userId);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const newCollections = docSnap.data().collections.map(collection => {
                    if (collection.id === collectionId) {
                        const filteredFiches = collection.fiches.filter(fiche => fiche.id !== ficheId);
                        return { ...collection, fiches: filteredFiches };
                    }
                    return collection;
                });
                await updateDoc(userRef, { collections: newCollections });
                setCollections(newCollections);
            }
        };

	return (
		<CollectionContext.Provider
			value={{ collections, addCollection, addFiche, getCollections, deleteCollection, deleteFiche }}
		>
			{children}
		</CollectionContext.Provider>
	)
}

export function useCollections() {
	const context = useContext(CollectionContext)
	if (!context) {
		throw new Error(
			'useCollections must be used within a CollectionProvider'
		)
	}
	return context
}

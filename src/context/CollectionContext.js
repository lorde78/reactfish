import React, { createContext, useContext, useState } from 'react'
import { db } from '../firebase'
import {
	doc,
	collection,
	setDoc,
	addDoc,
	deleteDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore'

const CollectionContext = createContext()

export const CollectionProvider = ({ children }) => {
	const [collections, setCollections] = useState([])

	// Ajoute une nouvelle collection
	async function addCollection(userId, title) {
		const userRef = doc(db, 'users', userId)
		const newCollection = {
			id: doc(collection(db, 'users', userId, 'collections')).id,
			title: title,
		}
		try {
			await updateDoc(userRef, {
				collections: arrayUnion(newCollection),
			})
			setCollections((prev) => [...prev, newCollection])
			console.log('Collection added:', newCollection.id)
		} catch (error) {
			console.log('Error adding collection:', error.message)
		}
	}

	// Supprime une collection
	async function deleteCollection(userId, collectionId) {
		const userRef = doc(db, 'users', userId)
		const collectionToRemove = { id: collectionId }
		try {
			await updateDoc(userRef, {
				collections: arrayRemove(collectionToRemove),
			})
			setCollections((prev) => prev.filter((c) => c.id !== collectionId))
			console.log('Collection removed:', collectionId)
		} catch (error) {
			console.log('Error removing collection:', error.message)
		}
	}

	// Ajoute une fiche à une collection spécifique
	async function addFiche(userId, collectionId, title) {
		const ficheRef = collection(
			db,
			'users',
			userId,
			'collections',
			collectionId,
			'fiches'
		)
		const newFiche = {
			id: doc(ficheRef).id,
			title: title,
		}
		try {
			await setDoc(doc(ficheRef, newFiche.id), newFiche)
			console.log('Fiche added:', newFiche.id)
		} catch (error) {
			console.log('Error adding fiche:', error.message)
		}
	}

	return (
		<CollectionContext.Provider
			value={{
				collections,
				addCollection,
				deleteCollection,
				addFiche,
			}}
		>
			{children}
		</CollectionContext.Provider>
	)
}

export function useCollections() {
	return useContext(CollectionContext)
}

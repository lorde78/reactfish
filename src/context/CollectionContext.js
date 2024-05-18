import React, { createContext, useContext, useState } from 'react'
import { db } from '../firebase'
import {
	doc,
	updateDoc,
	arrayUnion,
	getDoc,
} from 'firebase/firestore'

const CollectionContext = createContext()

export const CollectionProvider = ({ children }) => {
	const [collections, setCollections] = useState([])

	const getCollections = async (userId) => {
		const userRef = doc(db, 'users', userId)
		const snapshot = await getDoc(userRef)
		if (snapshot.exists()) {
			setCollections(snapshot.data().collections || [])
		}
	}

	const addCollection = async (userId, title) => {
		const newCollection = { id: Date.now().toString(), title, fiches: [] }
		const userRef = doc(db, 'users', userId)
		await updateDoc(userRef, { collections: arrayUnion(newCollection) })
		setCollections((prev) => [...prev, newCollection])
	}

	const deleteCollection = async (userId, collectionId) => {
		const userRef = doc(db, 'users', userId)
		const snapshot = await getDoc(userRef)
		if (snapshot.exists()) {
			const updatedCollections = snapshot
				.data()
				.collections.filter(
					(collection) => collection.id !== collectionId
				)
			await updateDoc(userRef, { collections: updatedCollections })
			setCollections(updatedCollections)
		}
	}

	return (
		<CollectionContext.Provider
			value={{
				collections,
				getCollections,
				addCollection,
				deleteCollection,
			}}
		>
			{children}
		</CollectionContext.Provider>
	)
}

export const useCollections = () => useContext(CollectionContext)

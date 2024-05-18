import React, { createContext, useContext, useState } from 'react'
import { db } from '../firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

const FishContext = createContext()

export const FishProvider = ({ children }) => {
	const [collections, setCollections] = useState([])

	const syncCollections = async (userId) => {
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const userCollections = docSnap.data().collections
			setCollections(userCollections || [])
		} else {
			console.log('No such document!')
		}
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
			await syncCollections(userId)
		}
	}

	const moveFiche = async (
		userId,
		sourceCollectionId,
		targetCollectionId,
		ficheId
	) => {
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const userCollections = docSnap.data().collections
			let ficheToMove
			const updatedCollections = userCollections
				.map((collection) => {
					if (collection.id === sourceCollectionId) {
						ficheToMove = collection.fiches.find(
							(fiche) => fiche.id === ficheId
						)
						const remainingFiches = collection.fiches.filter(
							(fiche) => fiche.id !== ficheId
						)
						return { ...collection, fiches: remainingFiches }
					}
					return collection
				})
				.map((collection) => {
					if (collection.id === targetCollectionId && ficheToMove) {
						return {
							...collection,
							fiches: [...collection.fiches, ficheToMove],
						}
					}
					return collection
				})

			await updateDoc(userRef, { collections: updatedCollections })
			await syncCollections(userId)
		}
	}

	const deleteFiche = async (userId, collectionId, ficheId) => {
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const newCollections = docSnap
				.data()
				.collections.map((collection) => {
					if (collection.id === collectionId) {
						const filteredFiches = collection.fiches.filter(
							(fiche) => fiche.id !== ficheId
						)
						return { ...collection, fiches: filteredFiches }
					}
					return collection
				})
			await updateDoc(userRef, { collections: newCollections })
			await syncCollections(userId) 
		}
	}

	const updateFiche = async (userId, collectionId, ficheId, newTitle) => {
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const userCollections = docSnap.data().collections
			const updatedCollections = userCollections.map((collection) => {
				if (collection.id === collectionId) {
					const updatedFiches = collection.fiches.map((fiche) => {
						if (fiche.id === ficheId) {
							return { ...fiche, title: newTitle }
						}
						return fiche
					})
					return { ...collection, fiches: updatedFiches }
				}
				return collection
			})

			await updateDoc(userRef, { collections: updatedCollections })
			await syncCollections(userId)
		}
	}

	return (
		<FishContext.Provider
			value={{
				collections,
				addFiche,
				moveFiche,
				deleteFiche,
				updateFiche,
			}}
		>
			{children}
		</FishContext.Provider>
	)
}

export function useFishes() {
	const context = useContext(FishContext)
	if (!context) {
		throw new Error('useFishes must be used within a FishProvider')
	}
	return context
}

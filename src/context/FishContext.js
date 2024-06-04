import React, { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, updateDoc, getDoc, arrayUnion, setDoc } from 'firebase/firestore'
import { UserAuth } from '../context/AuthContext'

const FishContext = createContext()

export const FishProvider = ({ children }) => {
	const { user } = UserAuth()
	const [collections, setCollections] = useState(() => {
		const cachedCollections = localStorage.getItem('collections')
		return cachedCollections ? JSON.parse(cachedCollections) : []
	})

	useEffect(() => {
		if (user) {
			syncCollections(user.uid)
		} else {
			setCollections([])
		}
	}, [user])

	const ensureUserDocumentExists = async (userId) => {
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (!docSnap.exists()) {
			await setDoc(userRef, { collections: [] })
		}
	}

	const syncCollections = async (userId) => {
		if (!userId) return
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const userCollections = docSnap.data().collections
			setCollections(userCollections || [])
			localStorage.setItem(
				'collections',
				JSON.stringify(userCollections || [])
			)
		} else {
			console.log('No such document!')
		}
	}

	const addCollection = async (userId, title) => {
		if (!userId) return
		await ensureUserDocumentExists(userId)
		const userRef = doc(db, 'users', userId)
		const newCollection = {
			id: Date.now().toString(),
			title: title,
			fishes: [],
		}
		await updateDoc(userRef, {
			collections: arrayUnion(newCollection),
		})
		await syncCollections(userId)
	}

	const getCollections = async (userId) => {
		if (!userId) return
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const userCollections = docSnap.data().collections
			setCollections(userCollections || [])
			localStorage.setItem(
				'collections',
				JSON.stringify(userCollections || [])
			)
		} else {
			console.log('No such document!')
		}
	}

	const deleteCollection = async (userId, collectionId) => {
		if (!userId) return
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const filteredCollections = docSnap
				.data()
				.collections.filter(
					(collection) => collection.id !== collectionId
				)
			await updateDoc(userRef, { collections: filteredCollections })
			await syncCollections(userId)
		}
	}

	const updateCollection = async (userId, updatedCollection) => {
		if (!userId) return
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const userCollections = docSnap.data().collections
			const updatedCollections = userCollections.map((collection) => {
				if (collection.id === updatedCollection.id) {
					return { ...collection, ...updatedCollection }
				}
				return collection
			})
			await updateDoc(userRef, { collections: updatedCollections })
			await syncCollections(userId)
		}
	}

	const addFish = async (
		userId,
		collectionId,
		fishTitle,
		fishText,
		fishSubject,
		fishKeyPoints,
		fishDates,
		fishReferences
	) => {
		if (!userId) return
		await ensureUserDocumentExists(userId)
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const userCollections = docSnap.data().collections
			const updatedCollections = userCollections.map((collection) => {
				if (collection.id === collectionId) {
					const newFish = {
						id: Date.now().toString(),
						title: fishTitle,
						text: fishText,
						subject: fishSubject,
						keyPoints: fishKeyPoints,
						dates: fishDates,
						references: fishReferences,
					}
					return {
						...collection,
						fishes: [...collection.fishes, newFish],
					}
				}
				return collection
			})

			await updateDoc(userRef, { collections: updatedCollections })
			await syncCollections(userId)
		}
	}

	const moveFish = async (
		userId,
		sourceCollectionId,
		targetCollectionId,
		fishId
	) => {
		if (!userId) return
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const userCollections = docSnap.data().collections
			let fishToMove
			const updatedCollections = userCollections
				.map((collection) => {
					if (collection.id === sourceCollectionId) {
						fishToMove = collection.fishes.find(
							(fish) => fish.id === fishId
						)
						const remainingFishes = collection.fishes.filter(
							(fish) => fish.id !== fishId
						)
						return { ...collection, fishes: remainingFishes }
					}
					return collection
				})
				.map((collection) => {
					if (collection.id === targetCollectionId && fishToMove) {
						return {
							...collection,
							fishes: [...collection.fishes, fishToMove],
						}
					}
					return collection
				})

			await updateDoc(userRef, { collections: updatedCollections })
			await syncCollections(userId)
		}
	}

	const deleteFish = async (userId, collectionId, fishId) => {
		if (!userId) return
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const newCollections = docSnap
				.data()
				.collections.map((collection) => {
					if (collection.id === collectionId) {
						const filteredFishes = collection.fishes.filter(
							(fish) => fish.id !== fishId
						)
						return { ...collection, fishes: filteredFishes }
					}
					return collection
				})
			await updateDoc(userRef, { collections: newCollections })
			await syncCollections(userId)
		}
	}

	const updateFish = async (
		userId,
		collectionId,
		fishId,
		newTitle,
		newText,
		newSubject,
		newKeyPoints,
		newDates,
		newReferences
	) => {
		if (!userId) return
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const userCollections = docSnap.data().collections
			const updatedCollections = userCollections.map((collection) => {
				if (collection.id === collectionId) {
					const updatedFishes = collection.fishes.map((fish) => {
						if (fish.id === fishId) {
							return {
								...fish,
								title: newTitle,
								text: newText,
								subject: newSubject,
								keyPoints: newKeyPoints,
								dates: newDates,
								references: newReferences,
							}
						}
						return fish
					})
					return { ...collection, fishes: updatedFishes }
				}
				return collection
			})

			await updateDoc(userRef, { collections: updatedCollections })
			await syncCollections(userId)
		}
	}

	const gatherTextData = (collectionId) => {
		const collection = collections.find((col) => col.id === collectionId)
		if (!collection) return ''

		return collection.fishes
			.map(
				(fish) =>
					`${fish.title} ${fish.text} ${fish.subject} ${fish.keyPoints} ${fish.dates} ${fish.references}`
			)
			.join(' ')
	}

	

	return (
		<FishContext.Provider
			value={{
				collections,
				addCollection,
				getCollections,
				deleteCollection,
				updateCollection,
				addFish,
				moveFish,
				deleteFish,
				updateFish,
				gatherTextData,
			}}
		>
			{children}
		</FishContext.Provider>
	)
}

export function useFishes() {
	return useContext(FishContext)
}

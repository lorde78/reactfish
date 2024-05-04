import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth'
import {
	setDoc,
	doc,
	updateDoc,
	getDoc,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore'

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState({})

	function signUp(email, password) {
		createUserWithEmailAndPassword(auth, email, password)
		setDoc(doc(db, 'users', email), {
			collections: [],
		})
	}

	function signIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password)
	}

	function logOut() {
		return signOut(auth)
	}

	function addCollection(collectionName) {
		if (!user) return // Assurez-vous que l'utilisateur est connecté
		const userDocRef = doc(db, 'users', user.uid)
		return getDoc(userDocRef).then((docSnap) => {
			if (docSnap.exists()) {
				const userData = docSnap.data()
				const collections = userData.collections || []
				if (!collections.some((c) => c.name === collectionName)) {
					const newCollection = { name: collectionName, fiches: [] }
					const updatedCollections = [...collections, newCollection]
					return updateDoc(userDocRef, {
						collections: updatedCollections,
					})
				} else {
					console.error('Collection already exists')
					return null
				}
			} else {
				console.error('User document does not exist')
				return null
			}
		})
	}

	function deleteCollection(collectionName) {
		if (!user) return
		const userDocRef = doc(db, 'users', user.uid)

		return getDoc(userDocRef).then((docSnap) => {
			if (docSnap.exists()) {
				let collections = docSnap.data().collections || []
				collections = collections.filter(
					(c) => c.name !== collectionName
				)
				return updateDoc(userDocRef, { collections })
			} else {
				console.error('User document does not exist')
				return null
			}
		})
	}

	function addFiche(collectionName, ficheContent) {
		if (!user) return
		const userDocRef = doc(db, 'users', user.uid)

		return getDoc(userDocRef).then((docSnap) => {
			if (docSnap.exists()) {
				const userData = docSnap.data()
				let collections = userData.collections || []
				const updatedCollections = collections.map((collection) => {
					if (collection.name === collectionName) {
						const updatedFiches = [
							...collection.fiches,
							{ content: ficheContent },
						]
						return { ...collection, fiches: updatedFiches }
					}
					return collection
				})

				return updateDoc(userDocRef, {
					collections: updatedCollections,
				})
			} else {
				console.error('User document does not exist')
				return null
			}
		})
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser)
		})
		return unsubscribe
	}, [])

	// useEffect(() => {
	// 	const signoff = onAuthStateChanged(auth, (currentUser) => {
	// 		setUser(currentUser)
	// 	})
	// 	return () => {
	// 		signoff()
	// 	}
	// })
	return (
		<AuthContext.Provider
			value={{
				signUp,
				signIn,
				logOut,
				addCollection,
				deleteCollection,
				addFiche,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function UserAuth() {
	return useContext(AuthContext)
}

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
		if (!user) return
		const userDocRef = doc(db, 'users', user.uid)
		return setDoc(
			userDocRef,
			{
				collections: arrayUnion({ name: collectionName, fiches: [] }),
			},
			{ merge: true }
		)
	}

	function deleteCollection(collectionName) {
		if (!user) return
		const userDocRef = doc(db, 'users', user.uid)
		return updateDoc(userDocRef, {
			collections: arrayRemove({ name: collectionName }),
		})
	}

	function addFiche(collectionName, ficheContent) {
		if (!user) return
		const userDocRef = doc(db, 'users', user.uid)
		return getDoc(userDocRef).then((docSnap) => {
			if (docSnap.exists()) {
				const collections = docSnap.data().collections
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

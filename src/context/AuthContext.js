import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser)
				console.log('User is signed in or signed up:', currentUser)
			} else {
				setUser(null)
				console.log('User is signed out')
			}
		})
		return () => unsubscribe()
	}, [])

	async function signUp(email, password) {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const user = userCredential.user
			console.log('User created with UID:', user.uid)

			await setDoc(doc(db, 'users', user.uid), {
				userInfo: {
					email: email,
				},
				collections: [],
			})

			console.log('Initial user data set in Firestore')
		} catch (error) {
			console.log('Error signing up:', error.message)
		}
	}

	async function signIn(email, password) {
		try {
			await signInWithEmailAndPassword(auth, email, password)
		} catch (error) {
			console.log('Error signing in:', error.message)
		}
	}

	async function logOut() {
		try {
			await signOut(auth)
			console.log('User logged out successfully')
		} catch (error) {
			console.log('Error logging out:', error.message)
		}
	}

	return (
		<AuthContext.Provider value={{ user, signUp, signIn, logOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export function UserAuth() {
	return useContext(AuthContext)
}

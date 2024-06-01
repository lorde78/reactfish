import React, { createContext, useContext, useState } from 'react'
import { UserAuth } from './AuthContext'

const RewardsContext = createContext()

export const RewardsProvider = ({ children }) => {
	const { user } = UserAuth()
	const [userExp, setUserExp] = useState(() => {
		const cachedExp = localStorage.getItem('userExp')
		return cachedExp ? JSON.parse(cachedExp) : 0
	})

	const addExp = (exp) => {
		const newExp = userExp + exp
		setUserExp(newExp)
		localStorage.setItem('userExp', JSON.stringify(newExp))
	}

	const calculateLevel = () => {
		return Math.floor(userExp / 100) // 100 EXP per level
	}

	return (
		<RewardsContext.Provider value={{ userExp, addExp, calculateLevel }}>
			{children}
		</RewardsContext.Provider>
	)
}

export const useRewards = () => {
	return useContext(RewardsContext)
}

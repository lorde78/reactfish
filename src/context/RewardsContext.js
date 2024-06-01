import React, { createContext, useContext, useState } from 'react'

const RewardsContext = createContext()

export const RewardsProvider = ({ children }) => {
	const [userLevel, setUserLevel] = useState(1)
	const [userExp, setUserExp] = useState(0)

	const addExperience = (exp) => {
		const newExp = userExp + exp
		const newLevel = Math.floor(newExp / 100) + 1
		setUserExp(newExp)
		setUserLevel(newLevel)
	}

	return (
		<RewardsContext.Provider value={{ userLevel, userExp, addExperience }}>
			{children}
		</RewardsContext.Provider>
	)
}

export const useRewards = () => useContext(RewardsContext)

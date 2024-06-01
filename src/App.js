import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import { AuthContextProvider } from './context/AuthContext'
import Account from './pages/Account'
import ProtectedRoute from './components/ProtectedRoute'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { FishProvider } from './context/FishContext'
import Auth from './pages/Auth'
import QuizConstructor from './components/QuizConstructor'
import { RewardsProvider } from './context/RewardsContext'

function App() {
	return (
			<AuthContextProvider>
				<DndProvider backend={HTML5Backend}>
					<FishProvider>
						<RewardsProvider>
							<NavBar />
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/auth" element={<Auth />} />
								<Route
									path="/account"
									element={
										<ProtectedRoute>
											<Account />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/create-quiz"
									element={
										<ProtectedRoute>
											<QuizConstructor />
										</ProtectedRoute>
									}
								/>
							</Routes>
						</RewardsProvider>
					</FishProvider>
				</DndProvider>
			</AuthContextProvider>
	)
}

export default App

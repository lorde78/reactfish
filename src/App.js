import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import { AuthContextProvider } from './context/AuthContext.js'
import Account from './pages/Account.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
// import { CollectionProvider } from './context/CollectionContext'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { FishProvider } from './context/FishContext.js'
import Auth from './pages/Auth'

function App() {
	return (
		<>
			<AuthContextProvider>
				<DndProvider backend={HTML5Backend}>
					{/* <CollectionProvider> */}
						<FishProvider>
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
							</Routes>
						</FishProvider>
					{/* </CollectionProvider> */}
				</DndProvider>
			</AuthContextProvider>
		</>
	)
}

export default App

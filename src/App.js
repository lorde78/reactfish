import './index.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import { AuthContextProvider } from './context/AuthContext.js'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Account from './pages/Account.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { FishProvider } from './context/FishContext.js'

function App() {
	return (
		<AuthContextProvider>
			<DndProvider backend={HTML5Backend}>
				<FishProvider>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
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
			</DndProvider>
		</AuthContextProvider>
	)
}

export default App

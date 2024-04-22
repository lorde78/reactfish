import './index.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import { AuthContextProvider } from './context/AuthContext.js'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signup.jsx'

function App() {
  return (
    <>
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
		  <Route path='/login' element={<Login />} />
		  <Route path='/signup' element={<Signup />} />
		  <Route path='/signin' element={<Signin />} />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App

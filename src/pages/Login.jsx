import React, { useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, signIn } = UserAuth()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(email, password)
            await signIn(email, password)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='w-full h-screen'>
                <div className='max-w-[450px] h-[600px] mx-auto bg-red-700 text-white'>
                    <div className='max-w-[320] mx-auto py-16 px-16'>
                        <h1>Sign in</h1>
                        {/* {error ? <span className='text-red-500'>{error}</span> : null} */}
                        <form onSubmit={handleSubmit}  className='w-full flex flex-col py-4' action="">
                            <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 text-black' type="email" placeholder='Email' autoComplete='email' />
                            <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 text-black' type="password" placeholder='Paswword' autoComplete='password' />
                            <button className='bg-blue-400 py-3 my-6 rounded font-bold'>Sign In</button>
                            <div className='flex justify-between'>
                                <span><input className='mr-2' type="checkbox" />Remember me</span>
                                <span><Link to='/'>Need help ?</Link></span>
                            </div>
                            <div className='py-8'>
                                <span className='mr-2'>No account yet ?</span>{''}
                                <Link to='/signup'>Create your account here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login
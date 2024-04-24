import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useState } from 'react'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { user, signUp } = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(email, password)
            await signUp(email, password)
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
                        <h1>Sign up</h1>
                        <form onSubmit={handleSubmit} className='w-full flex flex-col py-4' action="">
                            <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 text-black' type="email" placeholder='Email' autoComplete='email' />
                            <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 text-black' type="password" placeholder='Paswword' autoComplete='password' />
                            <button className='bg-blue-400 py-3 my-6 rounded font-bold'>Sign Up</button>
                            <div className='flex justify-between'>
                                <span><input className='mr-2' type="checkbox" />Remember me</span>
                                <span><Link to='/'>Need help ?</Link></span>
                            </div>
                            <div className='py-8'>
                                <span className='mr-2'>Already have an account ?</span>
                                <Link to='/login'>Sign In</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Signup
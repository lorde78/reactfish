import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            id="email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200" 
                            placeholder="Email" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            id="password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200" 
                            placeholder="Password" 
                            required 
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Sign Up</button>
                    <div className="flex justify-between items-center mt-4">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <Link to="/" className="text-sm text-blue-500 hover:underline">Need help?</Link>
                    </div>
                </form>
                <div className="mt-8 text-center">
                    <span className="text-sm">Already have an account?</span> 
                    <Link to="/login" className="text-sm text-blue-500 hover:underline ml-1">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;

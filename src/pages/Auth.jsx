import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import HeroSection from '../components/HeroSection';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, signUp } = UserAuth();
    const navigate = useNavigate();

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handleEmailFocus = () => {
        setIsEmailFocused(true);
    };

    const handleEmailBlur = (e) => {
        setIsEmailFocused(false);
        if (!e.target.value) {
            setEmail('');
        }
    };

    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };

    const handlePasswordBlur = (e) => {
        setIsPasswordFocused(false);
        if (!e.target.value) {
            setPassword('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signIn(email, password);
            } else {
                await signUp(email, password);
            }
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center">
            <HeroSection showText={false} />
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Sign In' : 'Sign Up'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative mt-5">
                            <input
                                type="email"
                                value={email}
                                onFocus={handleEmailFocus}
                                onBlur={handleEmailBlur}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                                required
                            />
                            <label
                                className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${isEmailFocused || email ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'
                                    }`}
                            >
                                Email
                            </label>
                        </div>
                        <div className="relative mt-5">
                            <input
                                type="password"
                                value={password}
                                onFocus={handlePasswordFocus}
                                onBlur={handlePasswordBlur}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                                required
                            />
                            <label
                                className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${isPasswordFocused || password ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'
                                    }`}
                            >
                                Password
                            </label>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                        {isLogin && (
                            <div className="flex justify-between items-center mt-4">
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    Remember me
                                </label>
                                <Link to="/" className="text-sm text-blue-500 hover:underline">Need help?</Link>
                            </div>
                        )}
                    </form>
                    <div className="mt-8 text-center">
                        {isLogin ? (
                            <>
                                <span className="text-sm">No account yet?</span>
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className="text-sm text-blue-500 hover:underline ml-1"
                                >
                                    Create your account here
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="text-sm">Already have an account?</span>
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className="text-sm text-blue-500 hover:underline ml-1"
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;

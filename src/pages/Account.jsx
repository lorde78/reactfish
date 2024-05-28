import React from 'react'
import Collection from '../components/Collection'

const Account = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-gray-800 text-3xl font-bold text-center mb-10">Account</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <Collection />
                </div>
            </div>
        </div>
    )
}

export default Account

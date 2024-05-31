import React from 'react';
import Collection from '../components/Collection';

const Account = () => {
    return (
        <div className="min-h-screen bg-gray py-8">
            <h1 className='justify-center flex text-4xl text-white bold'>Account</h1>
            <div className="container mx-auto px-4">
                <div className="p-6 rounded-lg shadow-md">
                    <Collection />
                </div>
            </div>
        </div>
    );
};

export default Account;

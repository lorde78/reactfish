import React from 'react';

const HeroSection = ({ showText = true }) => {
    return (
        <div className="hero-section">
            {showText && (
                <div className="hero-content">
                    <h1 className="text-4xl font-bold text-white">Welcome to FishApp</h1>
                    <p className="text-xl text-white mt-4">Manage your fish collections easily and efficiently.</p>
                </div>
            )}
            <div className="bubbles">
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
            </div>
        </div>
    );
};

export default HeroSection;

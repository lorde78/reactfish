import React, { useState } from 'react';

const UpdateFishModal = ({ isOpen, onClose, onSubmit, initialTitle, initialText, initialSubject, initialKeyPoints, initialDates, initialReferences }) => {
    const [title, setTitle] = useState(initialTitle);
    const [text, setText] = useState(initialText);
    const [subject, setSubject] = useState(initialSubject);
    const [keyPoints, setKeyPoints] = useState(initialKeyPoints);
    const [dates, setDates] = useState(initialDates);
    const [references, setReferences] = useState(initialReferences);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(title, text, subject, keyPoints, dates, references);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="relative mt-5">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                        />
                        <label
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${title ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'}`}
                        >
                            Title
                        </label>
                    </div>
                    <div className="relative mt-4">
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                        />
                        <label
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${subject ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'}`}
                        >
                            Subject
                        </label>
                    </div>
                    <div className="relative mt-4">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                            rows="3"
                        />
                        <label
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${text ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'}`}
                        >
                            Text
                        </label>
                    </div>
                    <div className="relative mt-4">
                        <textarea
                            value={keyPoints}
                            onChange={(e) => setKeyPoints(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                            rows="2"
                        />
                        <label
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${keyPoints ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'}`}
                        >
                            Key Points
                        </label>
                    </div>
                    <div className="relative mt-4">
                        <textarea
                            value={dates}
                            onChange={(e) => setDates(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                            rows="2"
                        />
                        <label
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${dates ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'}`}
                        >
                            Important Dates
                        </label>
                    </div>
                    <div className="relative mt-4">
                        <textarea
                            value={references}
                            onChange={(e) => setReferences(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                            rows="2"
                        />
                        <label
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${references ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'}`}
                        >
                            References
                        </label>
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Update
                        </button>
                        <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateFishModal;

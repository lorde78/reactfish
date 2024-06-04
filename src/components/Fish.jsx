// src/components/Fish.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import { UserAuth } from '../context/AuthContext';
import { useFishes } from '../context/FishContext';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import UpdateFishModal from './UpdateFishModal';

const ItemType = 'Fish';

const Fish = ({ collection }) => {
    const { user } = UserAuth();
    const { addFish, moveFish, collections } = useFishes();
    const [fishTitle, setFishTitle] = useState('');
    const [fishText, setFishText] = useState('');
    const [fishSubject, setFishSubject] = useState('');
    const [fishKeyPoints, setFishKeyPoints] = useState('');
    const [fishDates, setFishDates] = useState('');
    const [fishReferences, setFishReferences] = useState('');
    const [isFocused, setIsFocused] = useState({
        title: false,
        text: false,
        subject: false,
        keyPoints: false,
        dates: false,
        references: false,
    });

    const [showForm, setShowForm] = useState(false);

    const [, drop] = useDrop({
        accept: ItemType,
        drop: (item, monitor) => {
            if (!monitor.didDrop() && item.originCollectionId !== collection.id) {
                moveFish(user.uid, item.originCollectionId, collection.id, item.id);
            }
        },
    });

    const handleFocus = (field) => {
        setIsFocused((prev) => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field, value) => {
        setIsFocused((prev) => ({ ...prev, [field]: false }));
        if (!value) {
            switch (field) {
                case 'title':
                    setFishTitle('');
                    break;
                case 'text':
                    setFishText('');
                    break;
                case 'subject':
                    setFishSubject('');
                    break;
                case 'keyPoints':
                    setFishKeyPoints('');
                    break;
                case 'dates':
                    setFishDates('');
                    break;
                case 'references':
                    setFishReferences('');
                    break;
                default:
                    break;
            }
        }
    };

    const handleFishSubmit = async (e) => {
        e.preventDefault();
        if (user && fishTitle) {
            await addFish(user.uid, collection.id, fishTitle, fishText, fishSubject, fishKeyPoints, fishDates, fishReferences);
            setFishTitle('');
            setFishText('');
            setFishSubject('');
            setFishKeyPoints('');
            setFishDates('');
            setFishReferences('');
        }
    };

    const updatedCollection = collections.find(col => col.id === collection.id) || collection;

    const navigate = useNavigate();

    const handleGenerateQuiz = (fishId) => {
        navigate(`/quiz/${fishId}`);
    };

    return (
        <div ref={drop} className="mt-4 bg-gray-800 rounded-lg p-4">
            <button onClick={() => setShowForm(!showForm)} className="text-white mb-4 focus:outline-none">
                {showForm ? '-' : '+'}
            </button>
            {showForm && (
                <form onSubmit={handleFishSubmit} className="mb-4">
                    <div className="relative">
                        <input
                            id="fishTitle"
                            type="text"
                            value={fishTitle}
                            onFocus={() => handleFocus('title')}
                            onBlur={(e) => handleBlur('title', e.target.value)}
                            onChange={(e) => setFishTitle(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                        />
                        <label
                            htmlFor="fishTitle"
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${isFocused.title || fishTitle ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'
                                }`}
                        >
                            Title
                        </label>
                    </div>
                    <div className="relative mt-4">
                        <input
                            id="fishSubject"
                            type="text"
                            value={fishSubject}
                            onFocus={() => handleFocus('subject')}
                            onBlur={(e) => handleBlur('subject', e.target.value)}
                            onChange={(e) => setFishSubject(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                        />
                        <label
                            htmlFor="fishSubject"
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${isFocused.subject || fishSubject ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'
                                }`}
                        >
                            Subject
                        </label>
                    </div>
                    <div className="relative mt-4">
                        <textarea
                            id="fishText"
                            value={fishText}
                            onFocus={() => handleFocus('text')}
                            onBlur={(e) => handleBlur('text', e.target.value)}
                            onChange={(e) => setFishText(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                            rows="3"
                        />
                        <label
                            htmlFor="fishText"
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${isFocused.text || fishText ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'
                                }`}
                        >
                            Text
                        </label>
                    </div>
                    <div className="relative mt-4">
                        <textarea
                            id="fishKeyPoints"
                            value={fishKeyPoints}
                            onFocus={() => handleFocus('keyPoints')}
                            onBlur={(e) => handleBlur('keyPoints', e.target.value)}
                            onChange={(e) => setFishKeyPoints(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                            rows="2"
                        />
                        <label
                            htmlFor="fishKeyPoints"
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${isFocused.keyPoints || fishKeyPoints ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'
                                }`}
                        >
                            Key Points
                        </label>
                    </div>
                    <div className="relative mt-4">
                        <textarea
                            id="fishDates"
                            value={fishDates}
                            onFocus={() => handleFocus('dates')}
                            onBlur={(e) => handleBlur('dates', e.target.value)}
                            onChange={(e) => setFishDates(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                            rows="2"
                        />
                        <label
                            htmlFor="fishDates"
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${isFocused.dates || fishDates ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'
                                }`}
                        >
                            Important Dates
                        </label>
                    </div>
                    <div className="relative mt-4">
                        <textarea
                            id="fishReferences"
                            value={fishReferences}
                            onFocus={() => handleFocus('references')}
                            onBlur={(e) => handleBlur('references', e.target.value)}
                            onChange={(e) => setFishReferences(e.target.value)}
                            className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 focus:outline-none transition-all duration-300 ease-in-out"
                            rows="2"
                        />
                        <label
                            htmlFor="fishReferences"
                            className={`absolute left-2 transition-all duration-300 ease-in-out pointer-events-none bg-white px-1 ${isFocused.references || fishReferences ? 'text-xs -top-2 text-gray-700' : 'text-sm top-3 text-gray-500'
                                }`}
                        >
                            References
                        </label>
                    </div>
                    <button type="submit" className="mt-3 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add Fish
                    </button>
                </form>
            )}
            <ul>
                {Array.isArray(updatedCollection.fishes) && updatedCollection.fishes.map((fish) => (
                    <FishItem key={fish.id} fish={fish} originCollectionId={updatedCollection.id} />
                ))}
            </ul>
        </div>
    );
};

const FishItem = ({ fish, originCollectionId }) => {
    const { user } = UserAuth();
    const { deleteFish, updateFish } = useFishes();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id: fish.id, originCollectionId },
        collect: monitor => ({ isDragging: !!monitor.isDragging() }),
    });

    const handleUpdate = (newTitle, newText, newSubject, newKeyPoints, newDates, newReferences) => {
        updateFish(user.uid, originCollectionId, fish.id, newTitle, newText, newSubject, newKeyPoints, newDates, newReferences);
    };

    const handleGenerateQuiz = () => {
        navigate(`/quiz/${fish.id}`);
    };

    return (
        <li ref={drag} className={`mb-2 p-3 rounded flex justify-between items-center ${isDragging ? 'opacity-50' : 'opacity-100'} bg-gray-700 text-white`}>
            <div className="flex items-center gap-2">
                <span className="font-bold">Title:</span> <span>{fish.title}</span>
                <span className="font-bold">Subject:</span> <span>{fish.subject}</span>
                <span className="font-bold">Text:</span> <span>{fish.text}</span>
                <span className="font-bold">Key Points:</span> <span>{fish.keyPoints}</span>
                <span className="font-bold">Important Dates:</span> <span>{fish.dates}</span>
                <span className="font-bold">References:</span> <span>{fish.references}</span>
                <button onClick={handleGenerateQuiz} className="text-purple-500 hover:text-purple-700 ml-2">
                    Generate Quiz
                </button>
                <button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-blue-700">
                    <FiEdit className="text-lg" />
                </button>
            </div>
            <button onClick={() => deleteFish(user.uid, originCollectionId, fish.id)} className='p-2 rounded bg-red-500 hover:bg-red-700'>
                <FiTrash2 className="text-lg" />
            </button>
            <UpdateFishModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleUpdate}
                initialTitle={fish.title}
                initialText={fish.text}
                initialSubject={fish.subject}
                initialKeyPoints={fish.keyPoints}
                initialDates={fish.dates}
                initialReferences={fish.references}
            />
        </li>
    );
};

export default Fish;

import React, { useState } from 'react';
import { useFishes } from '../context/FishContext';

const QuizConstructor = () => {
    const { collections } = useFishes();
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [questions, setQuestions] = useState([]);

    const handleCollectionChange = (e) => {
        const collection = collections.find(col => col.id === e.target.value);
        setSelectedCollection(collection);
        generateQuestions(collection);
    };

    const generateQuestions = (collection) => {
        if (!collection) return;
        const newQuestions = collection.fishes.map(fish => ({
            question: fish.text,
            answer: fish.title
        }));
        setQuestions(newQuestions);
    };

    return (
        <div>
            <h2>Quiz Constructor</h2>
            <select onChange={handleCollectionChange}>
                <option value="">Select a Collection</option>
                {collections.map(collection => (
                    <option key={collection.id} value={collection.id}>
                        {collection.title}
                    </option>
                ))}
            </select>
            {questions.length > 0 && (
                <div>
                    <h3>Questions</h3>
                    <ol>
                        {questions.map((question, index) => (
                            <li key={index}>
                                {question.question} - <strong>{question.answer}</strong>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default QuizConstructor;

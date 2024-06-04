// src/pages/Quiz.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFishes } from '../context/FishContext';

const Quiz = () => {
    const { quizId } = useParams();
    const { collections } = useFishes();
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            const quizCollection = collections.find(col =>
                col.fishes.some(fish => fish.id === quizId)
            );
            if (quizCollection) {
                const fish = quizCollection.fishes.find(fish => fish.id === quizId);
                const questions = [
                    {
                        question: `What is the subject of the fish titled "${fish.title}"?`,
                        answer: fish.subject,
                        subject: fish.subject,
                        keyPoints: fish.keyPoints,
                        dates: fish.dates,
                        references: fish.references,
                    },
                    // Add more questions as needed
                ];
                setQuizData(questions);
            }
        };
        fetchData();
    }, [quizId, collections]);

    const handleAnswerSubmit = () => {
        if (userAnswer.toLowerCase() === quizData[currentQuestionIndex].answer.toLowerCase()) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsQuizFinished(true);
        }

        setUserAnswer('');
    };

    if (isQuizFinished) {
        return (
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Quiz Finished</h1>
                <p className="text-xl">Your Score: {score} / {quizData.length}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            {quizData.length > 0 && (
                <>
                    <h1 className="text-3xl font-bold mb-6">Quiz</h1>
                    <div className="mb-6">
                        <p className="text-xl mb-2">{quizData[currentQuestionIndex].question}</p>
                        <p className="text-sm text-gray-600">Subject: {quizData[currentQuestionIndex].subject}</p>
                        <p className="text-sm text-gray-600">Key Points: {quizData[currentQuestionIndex].keyPoints}</p>
                        <p className="text-sm text-gray-600">Important Dates: {quizData[currentQuestionIndex].dates}</p>
                        <p className="text-sm text-gray-600">References: {quizData[currentQuestionIndex].references}</p>
                    </div>
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="w-full p-2 border-2 border-gray-300 rounded text-gray-800 mb-4"
                        placeholder="Your answer"
                    />
                    <button onClick={handleAnswerSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit Answer
                    </button>
                </>
            )}
        </div>
    );
};

export default Quiz;

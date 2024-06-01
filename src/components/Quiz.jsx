import React, { useState } from 'react';
import { useRewards } from '../context/RewardsContext';

const Quiz = ({ questions }) => {
    const { addExp } = useRewards();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswerChange = (e) => {
        setUserAnswers({
            ...userAnswers,
            [currentQuestionIndex]: e.target.value,
        });
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleSubmitQuiz = () => {
        setShowResults(true);
        addExp(questions.length * 10); // Add experience points based on the number of questions
    };

    if (showResults) {
        return (
            <div>
                <h2>Quiz Results</h2>
                <ul>
                    {questions.map((question, index) => (
                        <li key={index}>
                            <p>{question.question}</p>
                            <p>Your Answer: {userAnswers[index]}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div>
            <h2>Quiz</h2>
            <p>{questions[currentQuestionIndex].question}</p>
            <input
                type="text"
                value={userAnswers[currentQuestionIndex] || ''}
                onChange={handleAnswerChange}
            />
            {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={handleNextQuestion}>Next</button>
            ) : (
                <button onClick={handleSubmitQuiz}>Submit</button>
            )}
        </div>
    );
};

export default Quiz;

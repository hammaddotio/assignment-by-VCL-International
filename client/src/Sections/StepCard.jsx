// components/StepCard.jsx
import React from 'react';

const StepCard = ({ title, question, answer, example }) => {
    return (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 flex flex-col justify-between h-full">
            <div>
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                <h3 className="text-lg font-medium mb-2 text-gray-700">Question:</h3>
                <p className="text-gray-800 mb-4">{question}</p>
                <h3 className="text-lg font-medium mb-2 text-gray-700">Answer:</h3>
                <p className="text-gray-800 mb-4">{answer}</p>
                <h3 className="text-lg font-medium mb-2 text-gray-700">Example:</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    <code>{example}</code>
                </pre>
            </div>
        </div>
    );
};

export default StepCard;

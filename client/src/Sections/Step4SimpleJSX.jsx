// components/Step4AdvancedJSX.jsx
import React, { useState } from 'react';
import Toast from '../Components/Toast';

// Child component to display a greeting
const Greeting = ({ name }) => {
    const handleClick = () => {
        Toast(`Hello, ${name}!`, '👋');
    };
    return (
        <h3 onClick={() => handleClick} className="text-lg text-blue-600 pointer">Welcome, {name}!</h3>
    );
}

// Child component to display a list of skills
const SkillsList = ({ skills }) => (
    <ul className="list-disc list-inside">
        {skills.map((skill, index) => (
            <li key={index} className="text-gray-700">
                {skill}
            </li>
        ))}
    </ul>
);

const Step4AdvancedJSX = () => {
    const [name, setName] = useState('React Developer');
    const [skills, setSkills] = useState(['JSX', 'Hooks', 'State Management']);
    const [showSkills, setShowSkills] = useState(true);

    const toggleSkills = () => setShowSkills((prev) => !prev);

    return (
        <div className="">
            <h2 className="text-2xl font-semibold mb-4">Advanced JSX Component</h2>
            <p className="text-gray-800 mb-4">
                This component demonstrates advanced JSX features, including state management, event handling, conditional rendering, list rendering, and component composition.
            </p>

            {/* Greeting Component */}
            <Greeting name={name} />

            {/* Input to update name */}
            <div className="my-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-full"
                    placeholder="Enter your name"
                />
            </div>

            {/* add input for add new skill */}



            {/* Toggle Skills Button */}
            <button
                onClick={toggleSkills}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                {showSkills ? 'Hide' : 'Show'} Skills
            </button>

            {/* Conditional Rendering of SkillsList */}
            {showSkills && <SkillsList skills={skills} />}
        </div>
    );
};

export default Step4AdvancedJSX;

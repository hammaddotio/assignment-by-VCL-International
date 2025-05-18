// components/Step4AdvancedJSX.jsx
import React, { useState } from 'react';
import Toast from '../Components/Toast';
import Button from '../Components/Button';

// Child component to display a greeting
const Greeting = ({ name }) => {
    const handleClick = () => {
        Toast(`Hello, ${name}!`, '👋', 'top-center');
    };
    return (
        <h3 onClick={handleClick} className="text-lg text-blue-600 cursor-pointer">
            Welcome, {name}!
        </h3>
    );
};

// Child component to display a list of skills
const SkillsList = ({ skills }) => (
    <>
        <h2 className="text-xl font-semibold mt-4 mb-2">Skill List</h2>
        <ul className="list-disc list-inside mb-4">
            {skills.map((skill, index) => (
                <li key={index} className="text-gray-700">
                    {skill}
                </li>
            ))}
        </ul>
    </>
);

const Step4AdvancedJSX = () => {
    const [name, setName] = useState('React Developer');
    const [showSkills, setShowSkills] = useState(true);
    const [skills, setSkills] = useState(['JSX', 'Hooks', 'State Management']);
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = (e) => {
        e.preventDefault();
        const trimmedSkill = newSkill.trim();
        if (trimmedSkill && !skills.includes(trimmedSkill)) {
            setSkills((prevSkills) => [...prevSkills, trimmedSkill]);
            setNewSkill('');
        }
    };

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

            <form onSubmit={handleAddSkill} className="flex items-center space-x-2 mb-10">
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter new skill"
                />
                <Button label={'Add Skill'} type="submit" />
            </form>

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

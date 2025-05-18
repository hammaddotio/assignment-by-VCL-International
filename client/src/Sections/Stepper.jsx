// components/Stepper.jsx
import React, { useState } from 'react';
import { steps } from '../data/Steps';
import Button from '../Components/Button';
import Toast from '../Components/Toast';

const Stepper = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [displayCode, setDisplayCode] = useState(false);

    const handlePrevious = () => {
        setDisplayCode(false);
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setDisplayCode(false);
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            handlePrevious();
        } else if (e.key === 'ArrowRight') {
            handleNext();
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6"
            onKeyDown={handleKeyDown}
            tabIndex="0"
        >
            <div className='bg-white shadow-md rounded-xl p-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto space-y-6'>
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-6">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} font-medium cursor-pointer transition-colors`}
                                onClick={() => {
                                    setCurrentStep(index);
                                    setDisplayCode(false);
                                }}
                            >
                                {index + 1}
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-1 mx-2 ${currentStep > index ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Step title */}
                <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">{steps[currentStep].title}</h2>
                    <p className="text-gray-500 mt-1">Step {currentStep + 1} of {steps.length}</p>
                </div>

                {/* Step content */}
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    {steps[currentStep].component}
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between items-center pt-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className={`px-5 py-2 rounded-lg font-medium flex items-center ${currentStep === 0
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-700 text-white hover:bg-gray-800'}`}
                    >
                        ← Previous
                    </button>

                    <div className="flex space-x-3">
                        <Button
                            label='View Code'
                            onClick={() => setDisplayCode(!displayCode)}
                            variant={displayCode ? 'outline' : 'solid'}
                        />
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentStep === steps.length - 1}
                        className={`px-5 py-2 rounded-lg font-medium flex items-center ${currentStep === steps.length - 1
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Next →
                    </button>
                </div>

                {/* Code display */}
                {displayCode && (
                    <div className='mt-6 bg-gray-800 rounded-lg overflow-hidden'>
                        {steps[currentStep].code && (
                            <div className='flex justify-between items-center bg-gray-700 px-4 py-2'>
                                <span className="text-gray-300 text-sm">Code snippet</span>
                                <Button
                                    label='Copy Code'
                                    onClick={() => {
                                        navigator.clipboard.writeText(steps[currentStep].code);
                                        Toast('Code copied to clipboard!', 'success');
                                    }}
                                    size="small"
                                />
                            </div>
                        )}
                        <pre className="p-4 overflow-auto max-h-96">
                            <code className="text-gray-100 text-sm">{steps[currentStep].code}</code>
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stepper;
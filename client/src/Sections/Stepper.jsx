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

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            handlePrevious();
        } else if (e.key === 'ArrowRight') {
            handleNext();
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6"
            onKeyDown={handleKeyDown}
            tabIndex="0"
        >
            <div className='bg-white shadow-md rounded-xl p-4 sm:p-6 w-full max-w-2xl mx-auto space-y-4 sm:space-y-6'>
                {/* Responsive Step indicator */}
                <div className="flex items-center justify-between mb-4 sm:mb-6 overflow-x-auto pb-2">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div
                                className={`flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${currentStep >= index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                    } font-medium cursor-pointer transition-colors text-sm sm:text-base`}
                                onClick={() => {
                                    setCurrentStep(index);
                                    setDisplayCode(false);
                                }}
                            >
                                {index + 1}
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-1 mx-1 sm:mx-2 ${currentStep > index ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Step title */}
                <div className="text-center mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 px-2">{steps[currentStep].title}</h2>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">Step {currentStep + 1} of {steps.length}</p>
                </div>

                {/* Step content */}
                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200">
                    {steps[currentStep].component}
                </div>

                {/* Responsive Navigation buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className={`w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2 rounded-lg font-medium flex items-center justify-center ${currentStep === 0
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-700 text-white hover:bg-gray-800'
                            }`}
                    >
                        ← Previous
                    </button>

                    <div className="order-last sm:order-none w-full sm:w-auto">
                        <Button
                            label='View Code'
                            onClick={() => setDisplayCode(!displayCode)}
                            variant={displayCode ? 'outline' : 'solid'}
                            fullWidth
                        />
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentStep === steps.length - 1}
                        className={`w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2 rounded-lg font-medium flex items-center justify-center ${currentStep === steps.length - 1
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        Next →
                    </button>
                </div>

                {/* Code display */}
                {displayCode && (
                    <div className='mt-4 sm:mt-6 bg-gray-800 rounded-lg overflow-hidden'>
                        {steps[currentStep].code && (
                            <div className='flex flex-col sm:flex-row justify-between items-center bg-gray-700 px-3 sm:px-4 py-2 gap-2'>
                                <span className="text-gray-300 text-sm">Code snippet</span>
                                <Button
                                    label='Copy Code'
                                    onClick={() => {
                                        navigator.clipboard.writeText(steps[currentStep].code);
                                        Toast('Code copied to clipboard!', 'success');
                                    }}
                                    size="small"
                                    className="w-full sm:w-auto"
                                />
                            </div>
                        )}
                        <pre className="p-3 sm:p-4 overflow-auto max-h-96 text-xs sm:text-sm">
                            <code className="text-gray-100 block">{steps[currentStep].code}</code>
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stepper;
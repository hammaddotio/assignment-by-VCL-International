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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className='bg-white shadow-md rounded-lg p-6 w-full md:w- mx-auto'>
                {steps[currentStep].component}
                <div className="flex justify-end item-end w-full max-w-md">
                    <Button label='code' onClick={() => setDisplayCode(!displayCode)} />
                </div>
                <div>
                    {
                        displayCode && (
                            <div className='flex item-end my-6 w-full'>
                                <div className=" shadow-md rounded-lg p-6 w-full">
                                    {steps[currentStep].code &&
                                        <div className='flex justify-end item-end w-full'>
                                            <Button label='copy' onClick={() => {
                                                navigator.clipboard.writeText(steps[currentStep].code);
                                                Toast('Code copied to clipboard!', '🔔');
                                            }} />
                                        </div>
                                    }
                                    <pre className="bg-gray-200 p-2 rounded text-sm overflow-auto">
                                        <code>{steps[currentStep].code}</code>
                                    </pre>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="flex justify-between mt-6 w-full max-w-md">
                <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className={`px-4 py-2 rounded ${currentStep === 0
                        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentStep === steps.length - 1}
                    className={`px-4 py-2 rounded ${currentStep === steps.length - 1
                        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Stepper;

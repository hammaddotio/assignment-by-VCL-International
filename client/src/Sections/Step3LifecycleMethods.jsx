// components/Step3LifecycleMethods.jsx
import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import Toast from '../Components/Toast';

const Step3LifecycleMethods = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('en-US', {
            hour12: false,
            second: '2-digit',
        })
            + `.${now.getMilliseconds().toString().padStart(3, '0')}`;

        Toast(`Component mounted or updated time in seconds and milliseconds ${formattedTime}`, '🔔');

        return () => {
            Toast(`Component will unmount time in seconds and milliseconds ${formattedTime}`, '🔔');
        };
    }, [count]);


    return (

        <div className="">
            <h2 className="text-2xl font-semibold mb-4">Lifecycle Methods in React</h2>
            <p className="text-gray-800 mb-4">
                Lifecycle methods are special methods in React components that allow you to run code at particular times in the component's lifecycle, such as when it mounts, updates, or unmounts.
            </p>
            <p className="text-gray-800 mb-2">Count: {count}</p>
            <Button onClick={() => setCount(count + 1)} label={'Increment'} />

        </div>
    );
};

export default Step3LifecycleMethods;

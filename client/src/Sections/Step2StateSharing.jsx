// components/Step2StateSharing.jsx
import React, { useState } from 'react';
import Button from '../Components/Button';

const Child = ({ count, increment }) => (
    <div>
        <p className="text-gray-800 mb-2">Count: {count}</p>
        <Button onClick={increment} label={'Increment'} />
    </div>
);

const Step2StateSharing = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="">
            <h2 className="text-2xl font-semibold mb-4">Sharing State Between Components</h2>
            <p className="text-gray-800 mb-4">
                State can be shared by lifting it up to a common ancestor and passing it down via props, or by using state management tools like Context API or Redux.
            </p>
            <Child count={count} increment={() => setCount(count + 1)} />
        </div>
    );
};

export default Step2StateSharing;

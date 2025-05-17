import React from 'react';
import Stepper from './Sections/Stepper';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster />
      <Stepper />
    </div>
  );
};

export default App;

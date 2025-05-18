import React from 'react';
import Stepper from './Sections/Stepper';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

const App = () => {

  // Set base URL and enable credentials
  // axios.defaults.baseURL = 'https://busy-winna-mady-97b82aae.koyeb.app/';
  axios.defaults.baseURL = 'http://127.0.0.1:8000/';
  axios.defaults.withCredentials = true;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster />
      <Stepper />
    </div>
  );
};

export default App;

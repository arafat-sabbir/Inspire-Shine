// src/pages/NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-blue-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! Page Not Found</p>
      <p className="mb-6 text-center max-w-lg">
        The page you are looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
      </p>
      <button
        onClick={() => navigate('/')} // Navigate back to home
        className="bg-primary hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;

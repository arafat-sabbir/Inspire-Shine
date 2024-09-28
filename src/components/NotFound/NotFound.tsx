
import { Home } from 'lucide-react';
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
      <div className="flex space-x-4"> {/* Flex container for buttons */}
        <button
          onClick={() => navigate('/')} // Navigate back to home
          className="bg-primary flex text-xl gap-1 items-center hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Go <Home size={20}/>
        </button>
        <button
          onClick={() => navigate(-1)} // Navigate back one step
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Go Back 
        </button>
      </div>
    </div>
  );
};

export default NotFound;

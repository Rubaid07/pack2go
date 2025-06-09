import { useNavigate } from 'react-router';
import { FiHome, FiSearch, FiMeh } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-4 text-center">
      <div className="max-w-md mx-auto bg-base-200 rounded-xl shadow-2xl overflow-hidden p-8">
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
              <FiMeh className="text-red-500 dark:text-red-400 text-4xl" />
            </div>
            <div className="absolute -inset-2 border-4 border-red-200 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 cursor-pointer text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <FiHome /> Go Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 cursor-pointer text-gray-800 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <FiSearch /> Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
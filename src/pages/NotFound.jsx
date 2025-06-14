import { Link } from 'react-router';
import { FaHome } from 'react-icons/fa';
import Lottie from 'lottie-react';
import error from '../assets/error.json'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 text-center bg-white dark:bg-gray-900">
      <Lottie className='h-50' animationData={error} loop={true}></Lottie>

      <h1 className="text-4xl mt-5 font-bold text-gray-800 dark:text-white mb-4">
        Oops! You seem lost in the Himalayas.
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
        The trail you're looking for doesn't exist. Let's guide you back home.
      </p>

      <Link 
        to="/" 
        className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md"
      >
        <FaHome /> Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
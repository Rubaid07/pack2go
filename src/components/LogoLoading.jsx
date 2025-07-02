import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { motion } from 'framer-motion';
const LogoLoading = () => {
   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    useEffect(() => {
       document.querySelector('html').setAttribute('data-theme', theme);
       localStorage.setItem('theme', theme);
     }, [theme]);
  return (
    <div className="fixed inset-0 bg-base-100 dark:bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center z-50">
      <div className="animate-pulse mb-6">
        <img 
          src={logo} 
          alt="Pack2Go Logo" 
          className="w-32 h-32 object-contain mx-auto" 
        />
      </div>

      <motion.div 
          className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full w-64 mx-auto overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full bg-gradient-to-r from-teal-400 to-teal-600 w-1/2"
          />
        </motion.div>

      <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 mt-6 font-medium"
        >
          Loading your travel experience...
        </motion.p>
    </div>
  );
};

export default LogoLoading;
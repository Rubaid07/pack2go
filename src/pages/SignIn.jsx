import signin from '../assets/login.png';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import { use, useState } from 'react';

const SignIn = () => {
    const navigate = useNavigate()
    const { signIn, signInWithGoogle } = use(AuthContext)
    const [error, setError] = useState("")
    const location = useLocation()
    
    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                toast.success("Logged in successfully")
                navigate(`${location.state ? location.state : "/"}`)
            })
            .catch(error => {
                const errorCode = error.code
                setError(errorCode)
            })
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                toast.success("Logged in successfully")
                navigate(`${location.state ? location.state : "/"}`)
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <div className="max-h-[100vh-64px] flex gap-10 md:mt-10">
            <div className="hidden md:flex w-1/2 justify-end items-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-md"
                >
                    <img
                        src={signin}
                        alt="Pack2Go"
                        className="w-full"
                    />
                    <motion.h3
                        className="text-2xl font-semibold text-center mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Welcome back to Pack2Go
                    </motion.h3>
                    <motion.p
                        className="text-center text-gray-400  mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Your journey begins with a single sign in
                    </motion.p>
                </motion.div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-start p-6">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-md w-full rounded-2xl shadow-lg p-8 sm:p-10 transition-colors duration-300"
                >
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </motion.div>
                        <h2 className="text-3xl font-bold">Sign in</h2>
                        <p className="text-gray-400 mt-2">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-6">

                        {/* email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Email address
                            </label>
                            <input
                                type="email"
                                name='email'
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        {/* password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name='password'
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        {error && <p className='text-red-400 text-xs'>{error}</p>}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-teal-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-teal-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold transition duration-150 cupo py-3 px-4 rounded-lg shadow-md hover:shadow-lg mb-0 cursor-pointer"
                        >
                            Sign in
                        </button>

                        <div className="divider text-gray-400">Or continue with</div>

                        <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] w-full">
                            <svg aria-label="Google logo" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400 flex gap-2 justify-center">
                            Don't have an account?
                            <Link to="/signup" className="font-medium text-teal-600 hover:underline dark:text-teal-400">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default SignIn;
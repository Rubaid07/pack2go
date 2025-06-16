import React, { use, useState } from 'react';
import signup from '../assets/signup.png';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';

const SignUp = () => {
    const { createUser, updateUser, setUser, signInWithGoogle } = use(AuthContext)
    const navigate = useNavigate()
    const [passwordError, setPasswordError] = useState("")
    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const photo = form.photo.value
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters")
            return
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter")
            return
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError("Password must contain at least one lowercase letter")
            return
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo }).then(() => {
                    setUser({ ...user, displayName: name, photoURL: photo })
                    toast.success("Sign in successfully")
                    navigate("/")
                }).catch(error => {
                    toast.error(error.message)
                    setUser(user)
                })
                setUser(user)
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                toast.success("Sign in successfully")
                navigate("/")
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <div className="max-h-[100vh-64px] flex gap-10 md:mt-10">
            <div className="w-full md:w-1/2 flex items-center justify-end p-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
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
                        <h2 className="text-3xl font-bold">Sign up</h2>
                        <p className="text-gray-400 mt-2">Create your account to get started</p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-6">

                        {/* name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        {/* email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
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
                                name="password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* photo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                name="photo"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300"
                                placeholder="https://example.com/yourphoto.jpg"
                            />
                        </div>
                        {passwordError && <p className='text-red-400 text-xs'>{passwordError}</p>}

                        <button
                            type="submit"
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-150 mb-0 cursor-pointer"
                        >
                            Sign up
                        </button>
                        <div className="divider text-gray-400">Or continue with</div>

                        <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] w-full">
                            <svg aria-label="Google logo" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400  flex gap-2 justify-center">
                            Already have an account?
                            <Link to="/signin" className="font-medium text-teal-600 hover:underline dark:text-teal-400">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>

            <div className="hidden md:flex w-1/2 justify-start items-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-md"
                >
                    <img
                        src={signup}
                        alt="Pack2Go"
                        className="w-full"
                    />
                    <motion.h3
                        className="text-2xl font-semibold text-center mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Start your adventure with Pack2Go
                    </motion.h3>
                    <motion.p
                        className="text-center text-gray-400 mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Sign up now and plan your perfect getaway
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUp;

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const SpinWheel = () => {
    const { user } = useContext(AuthContext);
    const [isSpinning, setIsSpinning] = useState(false);
    const [spinResult, setSpinResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [lastSpinTime, setLastSpinTime] = useState(null);
    const axiosSecure = useAxiosSecure();

    const discountOptions = [
        { id: 1, discount: 5, probability: 30, color: 'bg-green-100', textColor: 'text-green-800' },
        { id: 2, discount: 10, probability: 25, color: 'bg-blue-100', textColor: 'text-blue-800' },
        { id: 3, discount: 15, probability: 20, color: 'bg-purple-100', textColor: 'text-purple-800' },
        { id: 4, discount: 20, probability: 15, color: 'bg-yellow-100', textColor: 'text-yellow-800' },
        { id: 5, discount: 25, probability: 7, color: 'bg-orange-100', textColor: 'text-orange-800' },
        { id: 6, discount: 50, probability: 3, color: 'bg-red-100', textColor: 'text-red-800' },
    ];

    const checkSpinEligibility = async () => {
        try {
            const response = await axiosSecure.get('/spin/eligibility');
            return response.data;
        } catch (error) {
            console.error('Error checking spin eligibility:', error);
            return { eligible: false, nextSpinTime: null };
        }
    };

    const handleSpin = async () => {
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Sign In Required',
                text: 'Please sign in to spin the wheel!',
                background: '#1f2937',
                color: '#fff'
            });
            return;
        }

        const eligibility = await checkSpinEligibility();
        if (!eligibility.eligible) {
            Swal.fire({
                icon: 'info',
                title: 'Come Back Later!',
                text: `You can spin again in ${eligibility.timeLeft}`,
                background: '#1f2937',
                color: '#fff'
            });
            return;
        }

        setIsSpinning(true);
        
        try {
            const response = await axiosSecure.post('/spin');
            const result = response.data;
            
            setTimeout(() => {
                setSpinResult(result);
                setIsSpinning(false);
                setShowModal(true);
                
                Swal.fire({
                    icon: 'success',
                    title: ` ${result.discount}% Discount Won!`,
                    text: `Use code: ${result.discountCode}`,
                    background: '#1f2937',
                    color: '#fff',
                    timer: 3000
                });
            }, 3000);
            
        } catch (error) {
            console.error('Spin error:', error);
            setIsSpinning(false);
            Swal.fire({
                icon: 'error',
                title: 'Spin Failed',
                text: 'Please try again later',
                background: '#1f2937',
                color: '#fff'
            });
        }
    };

    const getRandomDiscount = () => {
        const random = Math.random() * 100;
        let cumulativeProbability = 0;
        
        for (const option of discountOptions) {
            cumulativeProbability += option.probability;
            if (random <= cumulativeProbability) {
                return option;
            }
        }
        return discountOptions[0];
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        Spin & Win Discount!
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Spin the wheel every 2 days and get amazing discounts on your next tour booking!
                    </p>
                </div>

                <div className="max-w-4xl mx-auto card-theme rounded-2xl shadow-xl p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Spin Wheel */}
                        <div className="text-center">
                            <div className="relative w-64 h-64 mx-auto mb-6">
                                <motion.div
                                    className="w-full h-full rounded-full border-8 border-teal-500 relative overflow-hidden"
                                    animate={{ 
                                        rotate: isSpinning ? 3600 : 0 
                                    }}
                                    transition={{ 
                                        duration: 3, 
                                        ease: "easeOut" 
                                    }}
                                >
                                    {discountOptions.map((option, index) => (
                                        <div
                                            key={option.id}
                                            className={`absolute w-1/2 h-1/2 origin-bottom-right ${option.color} ${option.textColor}`}
                                            style={{
                                                transform: `rotate(${index * 60}deg)`,
                                                clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                                            }}
                                        >
                                            <div 
                                                className="absolute top-4 right-4 transform -rotate-45"
                                                style={{ transformOrigin: 'center' }}
                                            >
                                                <span className="font-bold text-lg">{option.discount}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                                    <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-red-600"></div>
                                </div>
                            </div>

                            <button
                                onClick={handleSpin}
                                disabled={isSpinning}
                                className={`btn text-lg py-3 px-8 rounded-full font-semibold transition-all duration-300 ${
                                    isSpinning 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {isSpinning ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Spinning...
                                    </span>
                                ) : (
                                    'Spin Now!'
                                )}
                            </button>
                        </div>

                        {/* Discount Info */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4">
                                Win Up to 50% Discount!
                            </h3>
                            <div className="space-y-3 mb-6">
                                {discountOptions.map(option => (
                                    <div key={option.id} className="flex items-center justify-between">
                                        <span className={`px-3 py-1 rounded-full ${option.color} ${option.textColor} font-medium`}>
                                            {option.discount}% OFF
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {option.probability}% chance
                                        </span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className=" border border-yellow-200 rounded-lg p-4">
                                <h4 className="font-semibold text-yellow-700 mb-2">How it works:</h4>
                                <ul className="text-sm text-yellow-600 space-y-1">
                                    <li>• Spin every 2 days for free</li>
                                    <li>• Discount valid for 7 days</li>
                                    <li>• Use code at checkout</li>
                                    <li>• One discount per booking</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Discount Result Modal */}
            {showModal && spinResult && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🎉</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            Congratulations!
                        </h3>
                        <p className="text-lg text-gray-600 mb-4">
                            You won <span className="font-bold text-green-600 text-xl">{spinResult.discount}% OFF</span>
                        </p>
                        <div className="bg-gray-100 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-600 mb-1">Your discount code:</p>
                            <p className="text-xl font-mono font-bold text-teal-600">{spinResult.discountCode}</p>
                            <p className="text-xs text-gray-500 mt-2">
                                Valid until: {new Date(spinResult.validUntil).toLocaleDateString()}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full btn bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg"
                        >
                            Awesome! 
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SpinWheel;
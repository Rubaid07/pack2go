import React, { useState } from 'react';
import { FaPaperPlane, FaCheck, FaEnvelope, FaCalendarAlt, FaStar } from 'react-icons/fa';

const SubscribeSection = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) return;

        setIsLoading(true);

        setTimeout(() => {
            setIsSubscribed(true);
            setEmail(''); 
            setIsLoading(false);
            setTimeout(() => {
                setIsSubscribed(false);
            }, 3000);
        }, 1000);
    };

    return (
        <section className="py-16 subscribe ">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center text-white mb-8">
                    <FaEnvelope className="text-4xl mx-auto mb-4 text-white/90" />
                    <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
                    <p className="text-teal-100 text-lg max-w-2xl mx-auto">
                        Subscribe to get notified about our latest seasonal offers, exclusive deals, and upcoming tours
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    {isSubscribed ? (
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/30">
                            <FaCheck className="text-2xl text-white mx-auto mb-3" />
                            <h3 className="text-xl font-semibold text-white mb-2">Successfully Subscribed!</h3>
                            <p className="text-teal-100">
                                Thank you for subscribing! We'll send you the best deals first.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-300"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading || !email}
                                className="bg-white text-teal-600 hover:bg-teal-50 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px] cursor-pointer"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                                        <span>Subscribing...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className="text-sm" />
                                        <span>Subscribe</span>
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    <p className="text-teal-100 text-sm text-center mt-4">
                        No spam ever. Unsubscribe anytime.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="text-center text-white">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FaPaperPlane className="text-white text-lg" />
                        </div>
                        <h4 className="font-semibold mb-2">Exclusive Deals</h4>
                        <p className="text-teal-100 text-sm">Get access to special offers before anyone else</p>
                    </div>

                    <div className="text-center text-white">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FaCalendarAlt className="text-white text-lg" />
                        </div>
                        <h4 className="font-semibold mb-2">Seasonal Updates</h4>
                        <p className="text-teal-100 text-sm">Be the first to know about limited-time packages</p>
                    </div>

                    <div className="text-center text-white">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FaStar className="text-white text-lg" />
                        </div>
                        <h4 className="font-semibold mb-2">Priority Access</h4>
                        <p className="text-teal-100 text-sm">Early booking opportunities for popular tours</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SubscribeSection;
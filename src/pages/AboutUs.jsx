import React from 'react';
import CountUp from 'react-countup';
import { FiGlobe, FiUsers, FiHeart, FiAward, FiMap, FiCompass, FiHelpCircle } from 'react-icons/fi';
import { Link } from 'react-router';

const AboutPage = () => {
    return (
        <div className="bg-base-100 max-w-7xl mx-auto transition-colors duration-300 px-4 py-12">

            <section className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    About <span className="text-teal-500">Pack2Go</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-gray-400">
                    We're more than a travel agency. We're a community-driven platform built by locals, explorers, and guides who believe travel should be simple, meaningful, and accessible.
                </p>
            </section>

            <section className="mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold mb-2">Why We Exist</h2>
                    <p className="text-gray-500">Our mission, purpose, and values</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-base-200 p-6 rounded-lg shadow hover:shadow-md transition">
                        <FiGlobe className="text-teal-500 text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Explore Freely</h3>
                        <p className='text-gray-500 text'>We remove barriers between people and travel through tech, transparency, and trust.</p>
                    </div>
                    <div className="bg-base-200 p-6 rounded-lg shadow hover:shadow-md transition">
                        <FiUsers className="text-teal-500 text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Empower Locals</h3>
                        <p className='text-gray-500 text'>We support local guides and businesses by giving them control and visibility.</p>
                    </div>
                    <div className="bg-base-200 p-6 rounded-lg shadow hover:shadow-md transition">
                        <FiHeart className="text-teal-500 text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Travel With Impact</h3>
                        <p className='text-gray-500 text'>We believe in responsible travel that respects people, places, and the planet.</p>
                    </div>
                </div>
            </section>

            <section className="mb-20 bg-teal-600 text-white py-12 rounded-lg">
                <div className="grid md:grid-cols-4 grid-cols-2 gap-8 max-w-6xl mx-auto text-center px-6">
                    <div>
                        <p className="text-4xl font-bold"><CountUp end={12}></CountUp>+</p>
                        <p>Years Experience</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold"><CountUp end={500}></CountUp>+</p>
                        <p>Curated Tours</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold"><CountUp end={10}></CountUp>K+</p>
                        <p>Happy Travelers</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold"><CountUp end={50}></CountUp>+</p>
                        <p>Destinations</p>
                    </div>
                </div>
            </section>

            <section className="mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold mb-2">What Sets Us Apart</h2>
                    <p className="text-gray-500">You won't find these everywhere</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-base-200 p-6 rounded-lg shadow hover:shadow-md transition">
                        <FiCompass className="text-teal-500 text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Real Local Guides</h3>
                        <p className='text-gray-500 text'>All guides are verified locals — no 3rd party outsourcing or bots.</p>
                    </div>
                    <div className="bg-base-200 p-6 rounded-lg shadow hover:shadow-md transition">
                        <FiMap className="text-teal-500 text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Custom Experiences</h3>
                        <p className='text-gray-500 text'>Create, book, or modify packages directly with the guide, your way.</p>
                    </div>
                    <div className="bg-base-200 p-6 rounded-lg shadow hover:shadow-md transition">
                        <FiAward className="text-teal-500 text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Trust & Transparency</h3>
                        <p className='text-gray-500 text'>No hidden charges, no fake ratings. Everything is review-driven and open.</p>
                    </div>
                </div>
            </section>

            <section className="mb-20">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-semibold mb-2">Frequently Asked Questions</h2>
                    <p className="text-gray-500">Still wondering?</p>
                </div>

                <div className="space-y-6 max-w-3xl mx-auto">
                    <div className="bg-base-200 p-5 rounded shadow">
                        <h4 className="flex items-center text-lg font-medium mb-2">
                            <FiHelpCircle className="text-teal-500 mr-2" />
                            Is this platform safe to use?
                        </h4>
                        <p className='text-gray-500 text'>Yes! We use secure authentication, verified guides, and have a transparent booking process.</p>
                    </div>

                    <div className="bg-base-200 p-5 rounded shadow">
                        <h4 className="flex items-center text-lg font-medium mb-2">
                            <FiHelpCircle className="text-teal-500 mr-2" />
                            Can I become a guide?
                        </h4>
                        <p className='text-gray-500 text'>Absolutely! Just register and apply under “Add Package” — we'll review and verify your account.</p>
                    </div>

                    <div className="bg-base-200 p-5 rounded shadow">
                        <h4 className="flex items-center text-lg font-medium mb-2">
                            <FiHelpCircle className="text-teal-500 mr-2" />
                            How do I book a tour?
                        </h4>
                        <p className='text-gray-500 text'>Login → Browse packages → Click “View Details” → Book Now → Done. Easy!</p>
                    </div>
                </div>
            </section>

            <section className="text-center py-12">
                <h2 className="text-3xl font-bold mb-4">Start Your Next Journey</h2>
                <p className="text-gray-600 mb-6">Explore, connect, and book the most authentic travel experiences in Bangladesh.</p>
                <Link to="/packages">
                    <button className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-700 hover:to-teal-500 cursor-pointer transition duration-400 px-6 py-3 rounded font-semibold shadow text-white">
                        Explore All Packages
                    </button>
                </Link>
            </section>
        </div>
    );
};

export default AboutPage;

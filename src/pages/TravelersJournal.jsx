import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const TravelersJournal = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Traveler's Journal</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Real stories from our community of explorers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-base-100 p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-6">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsiHYAT9_gk5w_1J5JmhhT4c_i9sj9bt4Wag&s" 
                alt="Traveler" 
                className="w-16 h-16 rounded-full object-cover border-2 border-teal-500"
              />
              <div className="ml-4">
                <h4 className="font-semibold">ACP pradyuman</h4>
                <p className="text-gray-500 text-sm">Explored Sundarbans, March 2023</p>
              </div>
            </div>
            <div className="relative">
              <FaQuoteLeft className="text-teal-300 text-xl absolute -top-3 -left-1" />
              <p className="text-gray-600 text italic pl-6 mb-4">
                "The mangrove boat tour at sunrise was magical. Our guide Rahim spotted tigers where others saw only trees. His generations of experience made all the difference!"
              </p>
              <FaQuoteRight className="text-teal-300 text-xl absolute -bottom-3 -right-1" />
            </div>
            <div className="mt-4 flex space-x-2">
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">Wildlife</span>
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">Boat Tour</span>
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">Local Guide</span>
            </div>
          </div>

          <div className="bg-base-100 p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-6">
              <img 
                src="https://randomuser.me/api/portraits/men/77.jpg" 
                alt="Traveler" 
                className="w-16 h-16 rounded-full object-cover border-2 border-teal-500"
              />
              <div className="ml-4">
                <h4 className="font-semibold">Arif Rahman</h4>
                <p className="text-gray-500 text-sm">Cultural Tour, December 2022</p>
              </div>
            </div>
            <div className="relative">
              <FaQuoteLeft className="text-teal-300 text-xl absolute -top-3 -left-1" />
              <p className="text-gray-600 text italic pl-6 mb-4">
                "Tasnim showed us parts of Old Dhaka I never knew existed - hidden havelis, century-old sweet shops, and the most beautiful mosque mosaics. Her art historian perspective brought the city to life."
              </p>
              <FaQuoteRight className="text-teal-300 text-xl absolute -bottom-3 -right-1" />
            </div>
            <div className="mt-4 flex space-x-2">
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">Heritage</span>
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">Food</span>
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">Architecture</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="px-6 py-3 border-2 border-teal-500 text-teal-500 rounded-lg font-medium hover:bg-teal-500 hover:text-white transition flex items-center mx-auto cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
            Share Your Story
          </button>
        </div>
      </div>
    </section>
  );
};
export default TravelersJournal;
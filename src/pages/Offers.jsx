import { FiClock, FiTag, FiCalendar, FiMapPin } from 'react-icons/fi';

const offers = [
  {
    id: 1,
    title: "Monsoon Magic Getaway",
    discount: "30% OFF",
    originalPrice: 15000,
    discountedPrice: 10500,
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be",
    expiry: "2025-08-31T23:59:59",
    location: "Sylhet Tea Gardens",
    duration: "3 Days 2 Nights",
    daysLeft: 12
  },
  {
    id: 2,
    title: "Early Bird Beach Escape",
    discount: "25% OFF",
    originalPrice: 12000,
    discountedPrice: 9000,
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6",
    expiry: "2025-09-15T23:59:59",
    location: "Cox's Bazar",
    duration: "4 Days 3 Nights",
    daysLeft: 25
  },
  {
    id: 3,
    title: "Last Minute Hill Retreat",
    discount: "40% OFF",
    originalPrice: 18000,
    discountedPrice: 10800,
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60",
    expiry: "2025-06-20T23:59:59",
    location: "Bandarban",
    duration: "3 Days 2 Nights",
    daysLeft: 3
  }
];

const Offers = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Exclusive Offers</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Snag these handpicked travel deals before they're gone!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-base-200 card-theme rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 relative"
            >
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                {offer.discount}
              </div>

              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{offer.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-teal-600">
                    ৳{offer.discountedPrice.toLocaleString()}
                  </span>
                  <span className="ml-2 line-through text-gray-400">
                    ৳{offer.originalPrice.toLocaleString()}
                  </span>
                  <span className="ml-auto text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded">
                    You Save ৳{(offer.originalPrice - offer.discountedPrice).toLocaleString()}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-500">
                    <FiMapPin className="mr-2 text-teal-500" />
                    <span>{offer.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <FiCalendar className="mr-2 text-teal-500" />
                    <span>{offer.duration}</span>
                  </div>
                </div>

                <div className="bg-base-100 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FiClock className="mr-2 text-red-500" />
                      <span className="text-sm font-medium">Hurry! Expires in:</span>
                    </div>
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-bold">
                      {offer.daysLeft > 0 ? `${offer.daysLeft} Days` : 'Ends Today!'}
                    </div>
                  </div>
                  {offer.daysLeft <= 3 && (
                    <div className="mt-2 text-xs text-red-400 font-medium">
                      Almost gone — book while you still can!
                    </div>
                  )}
                </div>

                <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-3 cursor-pointer rounded-lg font-medium transition-all shadow-md hover:shadow-lg">
                  Yes! Take Me There
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-6 py-3 border-2 border-teal-500 text-teal-500 rounded-lg font-medium hover:bg-teal-500 hover:text-white transition flex items-center mx-auto cursor-pointer">
            <FiTag className="mr-2" />
            See All Available Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default Offers;

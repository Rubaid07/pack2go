import { FaCalendarAlt, FaRegClock, FaMapMarkedAlt } from 'react-icons/fa';

const specials = [
  {
    id: 1,
    title: "Monsoon Tea Trail",
    tag: "25% OFF",
    tagColor: "bg-teal-100 text-teal-800",
    label: "Limited Seats",
    labelColor: "bg-teal-500",
    description: "Experience Sylhet's tea gardens during the lush rainy season",
    season: "Jun-Aug Only",
    duration: "4 Days, 3 Nights",
    location: "Sylhet Division",
    originalPrice: "৳12,500",
    price: "৳9,375",
    priceNote: null,
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be"
  },
  {
    id: 2,
    title: "Winter Bird Symphony",
    tag: "Early Bird",
    tagColor: "bg-amber-100 text-amber-800",
    label: "New",
    labelColor: "bg-amber-500",
    description: "Spot rare migratory birds in Tanguar Haor's winter wetlands",
    season: "Nov-Feb Only",
    duration: "2 Days, 1 Night",
    location: "Sunamganj District",
    originalPrice: null,
    price: "৳6,800",
    priceNote: "(until Oct 15)",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88"
  },
  {
    id: 3,
    title: "Spring Folk Festival",
    tag: "Cultural",
    tagColor: "bg-purple-100 text-purple-800",
    label: "Selling Fast",
    labelColor: "bg-red-500",
    description: "Celebrate Bengali New Year with indigenous communities",
    season: "Apr 10-15 Only",
    duration: "3 Days, 2 Nights",
    location: "Chittagong Hill Tracts",
    originalPrice: null,
    price: "৳8,900",
    priceNote: "all inclusive",
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60"
  }
];

const SeasonalSpecials = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Seasonal Specials</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Limited-time experiences you won't find any other time of year
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specials.map((special) => (
            <div
              key={special.id}
              className="bg-base-200 rounded-xl card-theme overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="relative">
                <img
                  src={special.image}
                  alt={special.title}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-4 right-4 ${special.labelColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  {special.label}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{special.title}</h3>
                  <span className={`${special.tagColor} px-2 py-1 rounded text-sm`}>
                    {special.tag}
                  </span>
                </div>
                <p className="text-gray-500 text mb-4">{special.description}</p>

                <div className="flex items-center text-gray-500 text mb-3">
                  <FaCalendarAlt className="mr-2" />
                  <span>{special.season}</span>
                </div>
                <div className="flex items-center text-gray-500 text mb-3">
                  <FaRegClock className="mr-2" />
                  <span>{special.duration}</span>
                </div>
                <div className="flex items-center text-gray-500 text mb-4">
                  <FaMapMarkedAlt className="mr-2" />
                  <span>{special.location}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="mr-2 font-bold text-lg text-teal-600">
                      {special.price}
                    </span>
                    {special.originalPrice && (
                      <span className="line-through text-gray-400">
                        {special.originalPrice}
                      </span>
                    )}
                    {special.priceNote && (
                      <span className="mr-2 text-sm text-gray-500">
                        {special.priceNote}
                      </span>
                    )}
                  </div>
                  <button onClick={() => document.getElementById('my_modal_2').showModal()} className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition cursor-pointer">
                    Book Now
                  </button>
                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Oops!</h3>
                      <p className="py-4">Oops sorry! This project is currently on development</p>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Okay</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalSpecials;

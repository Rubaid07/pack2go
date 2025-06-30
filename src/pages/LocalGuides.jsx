import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const guides = [
  {
    name: "Atik Rahman",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    location: "Cox's Bazar Specialist",
    reviews: 128,
    description: "Born and raised in Cox's Bazar, I'll show you hidden beaches and authentic Rohingya cuisine."
  },
  {
    name: "Rahim Khan",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Sundarbans Expert",
    reviews: 92,
    description: "Third-generation boat captain with unparalleled knowledge of the mangrove forests and wildlife."
  },
  {
    name: "Nasim Ahmed",
    photo: "https://randomuser.me/api/portraits/men/68.jpg",
    location: "Dhaka Cultural Guide",
    reviews: 156,
    description: "Art historian who reveals Dhaka's vibrant street art scene and forgotten Mughal architecture."
  }
];

const LocalGuides = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Meet Our Local Guides</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Handpicked experts who know their destinations inside out
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <div
              key={i}
              className="bg-base-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={guide.photo}
                  alt={guide.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-teal-500"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">{guide.name}</h3>
                  <div className="flex items-center text-yellow-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    <span className="text-gray-500 ml-2 text-sm">
                      ({guide.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-gray-500 text mb-3">
                <FaMapMarkerAlt className="mr-2" />
                <span>{guide.location}</span>
              </div>
              <p className="text-gray-600 text mb-4">{guide.description}</p>
              <button className="text-teal-500 font-medium flex items-center cursor-pointer hover:underline">
                View Tours
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-6 py-3 border-2 border-teal-500 text-teal-500 rounded-lg font-medium hover:bg-teal-500 hover:text-white transition flex items-center mx-auto cursor-pointer">
            Become a Guide
          </button>
        </div>
      </div>
    </section>
  );
};

export default LocalGuides;

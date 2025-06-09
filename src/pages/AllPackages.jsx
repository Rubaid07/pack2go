import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CiLocationOn, CiCalendarDate } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { TbCoinTaka } from "react-icons/tb";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/packages")
      .then(res => res.json())
      .then(data => setPackages(data));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filter = packages.filter(pkg =>
    pkg.tour_name.toLowerCase().includes(search)
  );

  const handleViewDetails = (id) => {
    if (!user) {
      navigate("/signin");
    } else {
      navigate(`/package/${id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">All Tour Packages</h2>
        <input
          type="text"
          placeholder="Search by tour name..."
          onChange={handleSearch}
          className="input input-bordered w-full max-w-md mt-4"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filter.map(pkg => (
          <div
            key={pkg._id}
            className="card-theme bg-base-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={pkg.image}
                alt={pkg.tour_name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-xl font-bold text-white">{pkg.tour_name}</h3>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={pkg.guide_photo}
                  alt={pkg.guide_name}
                  className="w-10 h-10 rounded-full border-2 border-teal-400"
                />
                <div>
                  <p className="text-teal-600 dark:text-teal-400">{pkg.guide_name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="flex items-center space-x-2">
                  <IoTimeOutline size={20} />
                  <span className="text-sm">{pkg.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CiCalendarDate size={20} />
                  <span className="text-sm">{pkg.departure_date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TbCoinTaka size={20} />
                  <span className="text-sm">BDT {pkg.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CiLocationOn size={20} />
                  <span className="text-sm">{pkg.destination}</span>
                </div>
              </div>

              <button
                onClick={() => handleViewDetails(pkg._id)}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPackages;

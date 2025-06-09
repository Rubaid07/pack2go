import React, { useEffect, useState } from "react";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { TbCoinTaka } from "react-icons/tb";
import { Link } from "react-router";
import { formatDistanceToNow } from 'date-fns';

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/packages/featured")
      .then(res => res.json())
      .then(data => {
        setPackages(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch packages:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-teal-400 to-teal-700 bg-clip-text text-transparent">
            Featured Tour Packages
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Discover our most popular adventure packages
          </p>
        </div>



        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map(pkg => (
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
                <p className="text-xs text-gray-500 mb-2">
                  Posted {formatDistanceToNow(new Date(pkg.created_at), { addSuffix: true })}
                </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="flex items-center space-x-2">
                    <IoTimeOutline size={20} />
                    <span className="text-sm ">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CiCalendarDate size={20} />
                    <span className="text-sm">{pkg.departure_date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TbCoinTaka size={20} />
                    <span className="text-sm ">BDT {pkg.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CiLocationOn size={20} />
                    <span className="text-sm ">{pkg.destination}</span>
                  </div>
                </div>

                <Link to={`/package/${pkg._id}`}>
                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/packages">
            <button className="px-6 py-3 font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-700 hover:to-teal-500 transition duration-400 cursor-pointer">
              Explore All Packages
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
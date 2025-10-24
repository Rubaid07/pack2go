import React, { useEffect, useState, useContext } from "react";
import { FaCalendarAlt, FaStar, FaTag } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import useAxiosSecure from "../../hook/useAxiosSecure";
import Loading from "../../components/Loading";
import { formatDistanceToNow } from 'date-fns';
import { CiCalendarDate, CiLocationOn } from 'react-icons/ci';
import { IoTimeOutline } from 'react-icons/io5';
import { TbCoinTaka } from 'react-icons/tb';
import { AuthContext } from "../../provider/AuthProvider";

const SeasonalSpecials = () => {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosSecure.get("/packages/seasonal")
      .then(res => {
        setSpecials(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch seasonal specials:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  const handleBookNow = (packageId) => {
    navigate(`/booking/${packageId}`);
  };

  const handleViewDetails = (packageId) => {
    navigate(`/package/${packageId}`);
  };

  const isMyPackage = (pkg) => {
    return user && pkg.guide_email === user.email;
  };

  if (loading) return <Loading />;

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
          {specials.map((pkg) => {
            const isExpired = new Date(pkg.departure_date) < new Date();
            const myPackage = isMyPackage(pkg);
            
            return (
              <div
                key={pkg._id}
                className="card-theme bg-base-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                {/* Image Section */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.tour_name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {pkg.isSeasonal && (
                      <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                        <FaTag className="text-xs" />
                        Seasonal
                      </span>
                    )}
                    {myPackage && (
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                        <FaStar className="text-xs" />
                        My Package
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {pkg.tag && (
                      <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {pkg.tag}
                      </span>
                    )}
                  </div>

                  {/* Image Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{pkg.tour_name}</h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Guide Info */}
                  <div className='flex justify-between items-start mb-4'>
                    <div className="flex items-center space-x-3">
                      <img
                        src={pkg.guide_photo}
                        alt={pkg.guide_name}
                        className="w-10 h-10 rounded-full border-2 border-teal-400"
                      />
                      <div>
                        <p className="text-teal-600">{pkg.guide_name}</p>
                        <p className="text-xs text-gray-500">
                          Posted {formatDistanceToNow(new Date(pkg.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <div>
                      {isExpired && (
                        <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full font-semibold">
                          Expired
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Package Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="flex items-center space-x-2">
                      <IoTimeOutline size={20} className="text-teal-500" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CiCalendarDate size={20} className="text-teal-500" />
                      <span className="text-sm">{pkg.departure_date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TbCoinTaka size={20} className="text-teal-500" />
                      <span className="text-sm font-semibold">BDT {pkg.price?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CiLocationOn size={20} className="text-teal-500" />
                      <span className="text-sm">{pkg.destination}</span>
                    </div>
                  </div>

                  {/* Description */}
                  {pkg.package_details && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {pkg.package_details}
                    </p>
                  )}

                  {/* Additional Seasonal Info */}
                  {(pkg.season || pkg.seasonal_note) && (
                    <div className="mb-4 p-3 bg-teal-50 rounded-lg border border-teal-100">
                      {pkg.season && (
                        <div className="flex items-center text-teal-700 text-sm mb-1">
                          <FaCalendarAlt className="mr-2 text-teal-500" />
                          <span className="font-medium">{pkg.season}</span>
                        </div>
                      )}
                      {pkg.seasonal_note && (
                        <p className="text-xs text-teal-600">{pkg.seasonal_note}</p>
                      )}
                    </div>
                  )}

                  {/* Price and Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-teal-600">
                          BDT {pkg.price?.toLocaleString()}
                        </span>
                        {pkg.originalPrice && (
                          <span className="line-through text-gray-400 text-sm">
                            BDT {pkg.originalPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {pkg.priceNote && (
                        <span className="text-xs text-gray-500 mt-1">
                          {pkg.priceNote}
                        </span>
                      )}
                    </div>
                    
                    {/* Conditional Buttons */}
                    <div className="flex gap-2">
                      {myPackage ? (
                        <button
                          onClick={() => handleViewDetails(pkg._id)}
                          className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
                        >
                          View Details
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBookNow(pkg._id)}
                          className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {specials.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Seasonal Packages Available</h3>
              <p className="text-gray-500">Check back later for special seasonal offers!</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SeasonalSpecials;
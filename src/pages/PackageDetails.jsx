import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { AuthContext } from "../provider/AuthProvider";
import { FiMail, FiPhone, FiClock, FiUsers, FiMapPin, FiCalendar, FiDollarSign } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa6";
import Loading from "../components/Loading";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [pakg, setPakg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/packages/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPakg(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading></Loading>

  if (!pakg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Package not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="btn bg-teal-600 hover:bg-teal-700 text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  const isExpired = new Date(pakg.departure_date) < new Date();
  const availableSeats = pakg.available_seats || pakg.seat_limit || 20;
  const totalSeats = pakg.seat_limit || 20;
  const isFullyBooked = availableSeats <= 0;
  const bookedSeats = totalSeats - availableSeats;

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark-mode">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-teal-600 hover:text-teal-800 dark-text mb-6 transition-colors cursor-pointer font-medium"
        >
          <FaAngleLeft className="mr-2" /> Back to Packages
        </button>

        {/* Main Card */}
        <div className="card-theme rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image Section */}
          <div className="relative h-80 md:h-96">
            <img
              src={pakg.image}
              alt={pakg.tour_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 md:p-8">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{pakg.tour_name}</h1>
                <div className="flex items-center flex-wrap gap-4 text-sm md:text-base">
                  <span className="flex items-center">
                    <FiMapPin className="mr-1" />
                    {pakg.departure_location} to {pakg.destination}
                  </span>
                  <span className="flex items-center">
                    <FiCalendar className="mr-1" />
                    {pakg.departure_date}
                  </span>
                  {isExpired && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Expired
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Tour Details */}
              <div className="lg:col-span-2">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-50 dark-card rounded-lg p-4 text-center">
                    <FiUsers className="text-blue-600 dark-icon text-xl mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark-text">Available Seats</p>
                    <p className={`text-lg font-bold ${
                      availableSeats === 0 ? 'text-red-600' : 
                      availableSeats < 5 ? 'text-orange-600' : 'text-green-600'
                    } dark-seat-text`}>
                      {availableSeats}
                    </p>
                  </div>
                  <div className="bg-green-50 dark-card rounded-lg p-4 text-center">
                    <FiUsers className="text-green-600 dark-icon text-xl mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark-text">Total Seats</p>
                    <p className="text-lg font-bold text-gray-800 dark-text-bold">{totalSeats}</p>
                  </div>
                  <div className="bg-purple-50 dark-card rounded-lg p-4 text-center">
                    <FiUsers className="text-purple-600 dark-icon text-xl mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark-text">Booked</p>
                    <p className="text-lg font-bold text-gray-800 dark-text-bold">{bookedSeats}</p>
                  </div>
                  <div className="bg-orange-50 dark-card rounded-lg p-4 text-center">
                    <FiDollarSign className="text-orange-600 dark-icon text-xl mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark-text">Price</p>
                    <p className="text-lg font-bold text-gray-800 dark-text-bold">BDT {pakg.price}</p>
                  </div>
                </div>

                {/* Tour Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark-text-bold mb-4">Tour Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center p-3 bg-gray-50 dark-card rounded-lg">
                        <FiMapPin className="text-teal-600 dark-icon mr-3 text-xl" />
                        <div>
                          <p className="font-medium text-gray-700 dark-text-bold">Route</p>
                          <p className="text-gray-600 dark-text flex items-center">
                            {pakg.departure_location} <GoArrowRight className="mx-2" /> {pakg.destination}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-50 dark-card rounded-lg">
                        <FiClock className="text-teal-600 dark-icon mr-3 text-xl" />
                        <div>
                          <p className="font-medium text-gray-700 dark-text-bold">Duration</p>
                          <p className="text-gray-600 dark-text">{pakg.duration}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-50 dark-card rounded-lg">
                        <FiCalendar className="text-teal-600 dark-icon mr-3 text-xl" />
                        <div>
                          <p className="font-medium text-gray-700 dark-text-bold">Departure Date</p>
                          <p className="text-gray-600 dark-text">{pakg.departure_date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-50 dark-card rounded-lg">
                        <FiDollarSign className="text-teal-600 dark-icon mr-3 text-xl" />
                        <div>
                          <p className="font-medium text-gray-700 dark-text-bold">Price per person</p>
                          <p className="text-gray-600 dark-text font-semibold">BDT {pakg.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Package Details */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark-text-bold mb-4">Package Details</h3>
                    <div className="bg-gray-50 dark-card rounded-lg p-6">
                      <div className="text-gray-700 dark-text whitespace-pre-line leading-relaxed">
                        {pakg.package_details}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Guide Info & Booking */}
              <div className="space-y-6">
                {/* Guide Information */}
                <div className="bg-white dark-card border border-gray-200 dark-border rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 dark-text-bold mb-4">Guide Information</h3>
                  <div className="flex items-center mb-4">
                    <img
                      src={pakg.guide_photo}
                      alt={pakg.guide_name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-teal-500"
                    />
                    <div className="ml-4">
                      <p className="font-bold text-gray-800 dark-text-bold text-lg">{pakg.guide_name}</p>
                      <p className="text-sm text-gray-600 dark-text">Tour Guide</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FiMail className="text-gray-400 dark-icon mr-3" />
                      <span className="text-gray-700 dark-text-bold">{pakg.guide_email}</span>
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 dark-icon mr-3" />
                      <span className="text-gray-700 dark-text-bold">{pakg.contact_no}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Section */}
                {user?.email !== pakg.guide_email && (
                  <div className="bg-white dark-card border border-gray-200 dark-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 dark-text-bold mb-4">Book This Tour</h3>
                    
                    {/* Availability Status */}
                    <div className={`p-4 rounded-lg mb-4 ${
                      isFullyBooked ? 'bg-red-50 border border-red-200 dark-availability-red' :
                      availableSeats < 5 ? 'bg-orange-50 border border-orange-200 dark-availability-orange' :
                      'bg-green-50 border border-green-200 dark-availability-green'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${
                          isFullyBooked ? 'text-red-800' :
                          availableSeats < 5 ? 'text-orange-800' :
                          'text-green-800'
                        } dark-availability-text`}>
                          {isFullyBooked ? '❌ Fully Booked' :
                           availableSeats < 5 ? `⚠️ Only ${availableSeats} seats left!` :
                           `✅ ${availableSeats} seats available`}
                        </span>
                        <span className="text-sm text-gray-600 dark-text">
                          {bookedSeats}/{totalSeats} booked
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="bg-gray-50 dark-card rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark-text-bold">Price per seat:</span>
                        <span className="text-2xl font-bold text-teal-600 dark-price">BDT {pakg.price}</span>
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => navigate(`/booking/${pakg._id}`)}
                      disabled={isExpired || isFullyBooked}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                        isExpired || isFullyBooked
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                      }`}
                    >
                      {isExpired 
                        ? "Booking Closed" 
                        : isFullyBooked
                          ? "Fully Booked"
                          : "Book Now"
                      }
                    </button>

                    {/* Additional Info */}
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600 dark-text">
                        Posted {formatDistanceToNow(new Date(pakg.created_at), { addSuffix: true })}
                      </p>
                      {pakg.bookingCount > 0 && (
                        <p className="text-sm text-teal-600 dark-price mt-1">
                          🎉 {pakg.bookingCount} successful booking(s)
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Quick Facts */}
                <div className="bg-blue-50 dark-card border border-blue-200 dark-border rounded-xl p-6">
                  <h4 className="font-bold text-blue-800 dark-facts-title mb-3">Quick Facts</h4>
                  <ul className="space-y-2 text-sm text-blue-700 dark-facts-text">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 dark-facts-dot"></span>
                      Instant confirmation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 dark-facts-dot"></span>
                      Free cancellation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 dark-facts-dot"></span>
                      Best price guarantee
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 dark-facts-dot"></span>
                      24/7 customer support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { AuthContext } from "../provider/AuthProvider";
import { FiMail, FiPhone } from "react-icons/fi";
import { TbCoinTaka } from "react-icons/tb";
import { GoArrowRight } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa6";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/packages/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPkg(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Package not found</h2>
        <button 
          onClick={() => navigate(-1)} 
          className="btn bg-teal-600 hover:bg-teal-700 text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-teal-600 hover:text-teal-800 mb-6 transition-colors cursor-pointer"
      >
        <FaAngleLeft  className="mr-2"/> Back to Packages
      </button>

      <div className="bg-base-200 card-theme rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-80 md:h-96">
          <img 
            src={pkg.image} 
            alt={pkg.tour_name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{pkg.tour_name}</h1>
              <p className="text-gray-200 mt-1">
                Posted {formatDistanceToNow(new Date(pkg.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Tour Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CiLocationOn size={20} className="text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Route</p>
                    <p className="text-gray-500 flex gap-3 items-center">
                      {pkg.departure_location} <GoArrowRight /> {pkg.destination}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <IoMdTime size={20} className="text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-gray-500">{pkg.duration}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CiCalendarDate size={20} className="text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Departure Date</p>
                    <p className="text-gray-500">{pkg.departure_date}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <TbCoinTaka size={20}  className="text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Price</p>
                    <p className="text-gray-500">BDT {pkg.price}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="font-medium mb-2">Bookings</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-teal-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(pkg.bookingCount * 10, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {pkg.bookingCount} bookings
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Guide Information</h3>
              
              <div className="flex items-center mb-4">
                <img 
                  src={pkg.guide_photo} 
                  alt={pkg.guide_name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-teal-500"
                />
                <div className="ml-4">
                  <p className="font-medium">{pkg.guide_name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tour Guide</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FiMail size={20} className="text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-500">{pkg.guide_email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiPhone size={20} className="text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-gray-500">{pkg.contact_no}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Package Details</h3>
            <div className="prose max-w-none text-gray-400 whitespace-pre-line">
              {pkg.package_details}
            </div>
          </div>

          {user?.email !== pkg.guide_email && (
            <div className="mt-10">
              <button
                onClick={() => navigate(`/book/${pkg._id}`)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
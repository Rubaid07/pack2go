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
            src={pakg.image} 
            alt={pakg.tour_name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{pakg.tour_name}</h1>
              <p className="text-gray-200 mt-1">
                Posted {formatDistanceToNow(new Date(pakg.created_at), { addSuffix: true })}
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
                      {pakg.departure_location} <GoArrowRight /> {pakg.destination}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <IoMdTime size={20} className="text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-gray-500">{pakg.duration}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CiCalendarDate size={20} className="text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Departure Date</p>
                    <p className="text-gray-500">{pakg.departure_date}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <TbCoinTaka size={20}  className="text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Price</p>
                    <p className="text-gray-500">BDT {pakg.price}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="font-medium mb-2">Bookings</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-teal-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(pakg.bookingCount * 1, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {pakg.bookingCount} bookings
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Guide Information</h3>
              
              <div className="flex items-center mb-4">
                <img 
                  src={pakg.guide_photo} 
                  alt={pakg.guide_name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-teal-500"
                />
                <div className="ml-4">
                  <p className="font-medium">{pakg.guide_name}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FiMail size={20} className="text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-500">{pakg.guide_email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiPhone size={20} className="text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-gray-500">{pakg.contact_no}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Package Details</h3>
            <div className="text text-gray-500 whitespace-pre-line">
              {pakg.package_details}
            </div>
          </div>

          {user?.email !== pakg.guide_email && (
            <div className="mt-10">
              <button
                onClick={() => navigate(`/booking/${pakg._id}`)}
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
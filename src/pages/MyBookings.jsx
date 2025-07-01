import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../hook/useAxiosSecure";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/bookings?email=${user.email}`)
        .then(res => {
          setBookings(res.data.reverse());
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">My Bookings</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Keep an eye on your exciting travel plans and manage your bookings with ease — adventure awaits!
        </p>
      </div>

      {
        bookings.length === 0 ? (
          <p className="text-center">No bookings found.</p>
        ) : (
          <div className="grid gap-6">
            {
              bookings.map((booking) => (
                <div key={booking._id} className="bg-base-200 card-theme rounded p-5 shadow">
                  <h3 className="text-xl font-semibold">{booking.tour_name}</h3>
                  <p><span className="text-gray-500 text">{booking.guide_name} ({booking.guide_email})</span></p>
                  <p>Guide Contact: <span className="text-gray-500 text">{booking.guide_contact}</span></p>
                  <p>Departure: <span className="text-gray-500 text">{booking.departure_location}</span></p>
                  <p>Destination: <span className="text-gray-500 text">{booking.destination}</span></p>
                  <p>Date: <span className="text-gray-500 text">{booking.departure_date}</span></p>
                  <p>Note: <span className="text-gray-500 text">{booking.notes || "None"}</span></p>
                  <p>Status:
                    <span className={
                      `ml-2 px-2 py-1 rounded text-sm ${booking.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                      }`
                    }>
                      {booking.status}
                    </span>
                  </p>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default MyBookings;

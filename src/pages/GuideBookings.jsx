import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../hook/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const GuideBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/guide-bookings`)
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

  const handleConfirm = (id) => {
    axiosSecure.patch(`/bookings/${id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Booking is now mark as complete",
            showConfirmButton: false,
            timer: 1500,
            background: "#f2f2f7",
            color: "#333"
          });

          setBookings(prev =>
            prev.map(b => b._id === id ? { ...b, status: "completed" } : b)
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Booking Request</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Manage and respond to traveler booking requests for your guided tours. Help make every trip unforgettable.
        </p>

      </div>

      {
        bookings.length === 0 ? (
          <p className="text-center">No booking request found for your packages.</p>
        ) : (
          <div className="grid gap-6">
            {
              bookings.map((booking) => (
                <div key={booking._id} className="bg-base-200 card-theme p-5 rounded shadow">
                  <h3 className="text-xl font-semibold">{booking.tour_name}</h3>
                  <p>Buyer: <span className="text-gray-500 text">{booking.buyer_name} ({booking.buyer_email})</span></p>
                  <p>Buyer Contact: <span className="text-gray-500 text">{booking.buyer_contact}</span></p>
                  <p>Departure: <span className="text-gray-500 text">{booking.departure_location}</span></p>
                  <p>Destination: <span className="text-gray-500 text">{booking.destination}</span></p>
                  <p>Date: <span className="text-gray-500 text">{booking.departure_date}</span></p>
                  <p>Note: <span className="text-gray-500 text">{booking.notes || "N/A"}</span></p>
                  <p>Status:
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${booking.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                      }`}>
                      {booking.status}
                    </span>
                  </p>

                  {
                    booking.status === "pending" && (
                      <button
                        onClick={() => handleConfirm(booking._id)}
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded cursor-pointer"
                      >
                        Confirm Booking
                      </button>
                    )
                  }
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default GuideBookings;

import React, { useEffect, useState, use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";

const MyBookings = () => {
    const { user } = use(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/bookings?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            });
    }, [user.email]);

    const handleConfirm = (id) => {
        fetch(`http://localhost:3000/bookings/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Booking confirmed",
                        showConfirmButton: false,
                        timer: 1500,
                        background: '#1f2937',
                        color: '#fff'
                    });
                    setBookings(prev =>
                        prev.map(b => b._id === id ? { ...b, status: "completed" } : b)
                    );
                }
            });
    };

    if (loading) return <Loading></Loading>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
             <h2 className="text-3xl font-semibold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-5 w-max">
            My Bookings
          </h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="grid gap-6">
                    {bookings.map(booking => (
                        <div key={booking._id} className="bg-base-200 rounded shadow p-4 card-theme">
                            <h3 className="text-xl font-semibold mb-1">{booking.tour_name}</h3>
                            <p>Guide: <span className="text-gray-500 text">{booking.guide_name}</span></p>
                            <p>Guide Contact no: <span className="text-gray-500 text"> {booking.guide_contact}</span></p>
                            <p>Departure Date: <span className="text-gray-500 text">{booking.departure_date}</span></p>
                            <p>Special Note: <span className="text-gray-500 text">{booking.notes || "N/A"}</span></p>
                            <p>Status:
                                <span className={`ml-2 px-2 py-1 rounded text-sm ${booking.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                                    }`}>
                                    {booking.status}
                                </span>
                            </p>

                            {booking.status === "pending" && (
                                <button
                                    onClick={() => handleConfirm(booking._id)}
                                    className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded cursor-pointer"
                                >
                                    Confirm Booking
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;

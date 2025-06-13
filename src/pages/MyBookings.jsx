import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../hook/useAxiosSecure";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

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

    const handleConfirm = (id) => {
        axiosSecure.patch(`/bookings/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
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
            })
    };

    if (loading) return <Loading></Loading>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold bg-gradient-to-r mx-auto from-teal-400 to-teal-600 bg-clip-text text-transparent w-max mb-6">My Bookings</h2>

            {bookings.length === 0 ? (
                <p className="text-center">No bookings found.</p>
            ) : (
                <div className="grid gap-6">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-base-200 card-theme rounded p-5 shadow">
                            <h3 className="text-xl font-semibold">{booking.tour_name}</h3>
                            <p>Guide: <span className="text-gray-500 text">{booking.guide_name} ({booking.guide_email})</span></p>
                            <p>Guide Contact: <span className="text-gray-500 text">{booking.guide_contact}</span></p>
                            <p>Departure: <span className="text-gray-500 text">{booking.departure_location}</span></p>
                            <p>Destination: <span className="text-gray-500 text">{booking.destination}</span></p>
                            <p>Date: <span className="text-gray-500 text">{booking.departure_date}</span></p>
                            <p>Note: <span className="text-gray-500 text">{booking.notes || "None"}</span></p>
                            <p>Status:
                                <span className={`ml-2 px-2 py-1 rounded text-sm ${booking.status === "pending"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : "bg-green-200 text-green-800"
                                    }`}>
                                    {booking.status}
                                </span>
                            </p>
                            {booking.status === "pending" && user?.email === booking.buyer_email && (
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

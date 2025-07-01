import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import useAxiosSecure from "../hook/useAxiosSecure";

const Booking = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/packages/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPkg(data);
                setLoading(false);
            });
    }, [id]);

    const handleBooking = (e) => {
        e.preventDefault();
        const note = e.target.note.value;
        const contact = e.target.contact.value;

        const bookingData = {
            tour_id: pkg._id,
            tour_name: pkg.tour_name,
            guide_name: pkg.guide_name,
            guide_email: pkg.guide_email,
            guide_contact: pkg.contact_no,
            buyer_email: user.email,
            buyer_contact: contact,
            buyer_name: user.displayName,
            booking_date: new Date(),
            departure_location: pkg.departure_location,
            destination: pkg.destination,
            departure_date: pkg.departure_date,
            status: "pending",
            notes: note
        };

        axiosSecure.post('/bookings', bookingData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Booking confirmed",
                        showConfirmButton: false,
                        timer: 1500,
                        background: '#1f2937',
                        color: '#fff'
                    });
                    navigate("/my-booking");
                }
            })
    };

    if (loading) return <Loading></Loading>;

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-base-100 p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Book: {pkg.tour_name}</h2>
            <form onSubmit={handleBooking} className="space-y-4">
                <input readOnly value={pkg.tour_name} className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                <input readOnly value={`BDT ${pkg.price}`} className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                <input readOnly value={user.displayName} className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                <input readOnly value={user.email} className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />

                <input readOnly value={pkg.departure_date} className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                <input
                    type="number"
                    name="contact"
                    placeholder="Your Contact Number"
                    className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                />
                <textarea
                    name="note"
                    placeholder="Special Note (optional)"
                    className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    rows="3"
                ></textarea>
                <button type="submit" className="btn bg-teal-600 cursor-pointer hover:bg-teal-700 text-white w-full">
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default Booking;

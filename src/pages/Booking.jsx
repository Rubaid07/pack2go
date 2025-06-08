import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";

const Booking = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/packages/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPkg(data);
                setLoading(false);
            });
    }, [id]);

    const handleBooking = (e) => {
        e.preventDefault();

        const bookingData = {
            tour_id: pkg._id,
            tour_name: pkg.tour_name,
            guide_name: pkg.guide_name,
            guide_email: pkg.guide_email,
            buyer_email: user.email,
            buyer_name: user.displayName,
            booking_date: new Date(),
            departure_date: pkg.departure_date,
            status: "pending"
        };

        fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Booking confirmed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/my-booking");
                }
            });
    };

    if (loading) return <Loading></Loading>;

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-base-100 p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Book: {pkg.tour_name}</h2>
            <form onSubmit={handleBooking} className="space-y-4">
                <input value={pkg.tour_name} className="input w-full" />
                <input value={`BDT ${pkg.price}`} className="input w-full" />
                <input value={user.displayName} className="input w-full" />
                <input value={user.email} className="input w-full" />
                <input value={pkg.departure_date} className="input w-full" />
                <button type="submit" className="btn bg-teal-600 cursor-pointer hover:bg-teal-700 text-white w-full">
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default Booking;

import React, { useEffect, useState, use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";

const ManageMyPackages = () => {
    const { user } = use(AuthContext);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/my-packages?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setPackages(data);
                setLoading(false);
            });
    }, [user.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This package will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            background: '#1f2937',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_URL}/packages/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Booking confirmed",
                                showConfirmButton: false,
                                timer: 1500,
                                background: '#1f2937',
                                color: '#fff'
                            });
                            setPackages(prev => prev.filter(p => p._id !== id));
                        }
                    });
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold bg-gradient-to-r  from-teal-400 to-teal-600 bg-clip-text text-transparent w-max mb-6">Manage My Packages</h2>

            {loading ? (
                <p>Loading your packages...</p>
            ) : packages.length === 0 ? (
                <p>You haven't added any packages yet.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {packages.map(pkag => (
                        <div key={pkag._id} className="bg-base-200 dark:bg-base-100 p-4 rounded shadow-lg">
                            <img src={pkag.image} alt={pkag.tour_name} className="w-full h-48 object-cover rounded mb-3" />
                            <h3 className="text-xl font-bold">{pkag.tour_name}</h3>
                            <p className="text-sm text text-gray-500">BDT {pkag.price}</p>
                            <p className="text-sm text text-gray-500">Departure Date: {pkag.departure_date}</p>
                            <p className="text-sm text text-gray-500">Departure Location: {pkag.departure_location}</p>
                            <p className="text-sm text text-gray-500">Destination: {pkag.destination}</p>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleDelete(pkag._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 cursor-pointer rounded"
                                >
                                    Delete
                                </button>
                                <Link to={`/edit-package/${pkag._id}`}>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded cursor-pointer">Edit</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageMyPackages;

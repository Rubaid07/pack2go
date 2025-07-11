import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";
import useAxiosSecure from "../hook/useAxiosSecure";
import Loading from "../components/Loading";

const ManageMyPackages = () => {
    const { user } = useContext(AuthContext);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!user?.email) return;
        axiosSecure.get(`/my-packages?email=${user.email}`)
            .then(res => {
                setPackages(res.data.reverse());
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch packages:", err);
                setLoading(false);
            });
    }, [user?.email, axiosSecure]);

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
                axiosSecure.delete(`/packages/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Package deleted successfully",
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

    if (loading) return <Loading />;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3">Manage Your Packages</h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Stay in control of your tours — review, update, or remove any package in just a few clicks.
                </p>
            </div>

            {packages.length === 0 ? (
                <p>You haven't added any packages yet.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {packages.map(pkag => (
                        <div key={pkag._id} className="bg-base-200 card-theme dark:bg-base-100 rounded-xl overflow-hidden shadow-lg">
                            <div className="relative h-48 overflow-hidden">
                                <img src={pkag.image} alt={pkag.tour_name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-bold">{pkag.tour_name}</h3>
                                <p className="text-sm text-gray-500 text">BDT {pkag.price}</p>
                                <p className="text-sm text-gray-500 text">Departure Date: {pkag.departure_date}</p>
                                <p className="text-sm text-gray-500 text">Departure Location: {pkag.departure_location}</p>
                                <p className="text-sm text-gray-500 text">Destination: {pkag.destination}</p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Link to={`/package/${pkag._id}`}>
                                        <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded cursor-pointer">
                                            View
                                        </button>
                                    </Link>

                                    <Link to={`/edit-package/${pkag._id}`}>
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded cursor-pointer">
                                            Edit
                                        </button>
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(pkag._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageMyPackages;

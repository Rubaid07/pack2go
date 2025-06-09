import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { CiLocationOn, CiCalendarDate } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { TbCoinTaka } from "react-icons/tb";
import { formatDistanceToNow } from "date-fns";
import PackageCard from "./PackageCard";

const AllPackages = () => {
    const [packages, setPackages] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/packages")
            .then(res => res.json())
            .then(data => {
                const randomData = data.sort(() => Math.random() - 0.5);
                setPackages(randomData);
            });
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const filter = packages.filter(pkg =>
        pkg.tour_name.toLowerCase().includes(search)
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-semibold bg-gradient-to-r mx-auto from-teal-400 to-teal-600 bg-clip-text text-transparent w-max">
                    All Tour Packages
                </h2>
                <input
                    type="text"
                    placeholder="Search by tour name..."
                    onChange={handleSearch}
                    className="input input-bordered w-full max-w-md mt-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filter.map(pkg => (
                    <PackageCard key={pkg._id} pkg={pkg}></PackageCard>
                ))}
            </div>
        </div>
    );
};

export default AllPackages;

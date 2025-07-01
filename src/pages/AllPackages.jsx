import React, { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import Loading from "../components/Loading";
import useAxiosSecure from "../hook/useAxiosSecure";
import { FiSearch, FiFilter } from "react-icons/fi";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/packages")
      .then(res => {
        const randomData = res.data.sort(() => Math.random() - 0.5);
        setPackages(randomData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching packages:", error);
        setLoading(false);
      });
  }, [axiosSecure]);

  const sortedPackages = [...packages].sort((a, b) => {
    if (sortBy === "name") {
      return a.tour_name.localeCompare(b.tour_name);
    } else if (sortBy === "date") {
      return new Date(a.departure_date) - new Date(b.departure_date);
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredPackages = sortedPackages.filter(pkg =>
    pkg.tour_name.toLowerCase().includes(search) ||
    pkg.destination.toLowerCase().includes(search)
  );

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Explore Our Tour Packages</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Discover amazing destinations with our carefully curated collection of travel experiences
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-10 bg-base-200 rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by destination or package name..."
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-base-100 focus:ring-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
            >
              <option value="">Sort by</option>
              <option value="name">Name (A-Z)</option>
              <option value="date">Departure Date</option>
              <option value="price">Price (Low to High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-400">
          {filteredPackages.length} {filteredPackages.length === 1 ? "package" : "packages"} available
        </h3>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map(pkg => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No packages found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default AllPackages;
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import PackageCard from "./PackageCard";

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/packages/featured")
      .then(res => res.json())
      .then(data => {
        setPackages(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch packages:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold bg-gradient-to-r mx-auto from-teal-400 to-teal-600 bg-clip-text text-transparent w-max">
            Featured Tour Packages
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Discover our most popular adventure packages
          </p>
        </div>



        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map(pkg => (
            <PackageCard key={pkg._id} pkg={pkg}></PackageCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/packages">
            <button className="px-6 py-3 font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-700 hover:to-teal-500 transition duration-400 cursor-pointer">
              Explore All Packages
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
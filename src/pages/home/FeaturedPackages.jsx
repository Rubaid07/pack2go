import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import PackageCard from "../PackageCard";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hook/useAxiosSecure";

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/packages/featured")
      .then(res => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch packages:", error);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) return <Loading />;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-3">Featured Tour Packages</h2>
          <p className="max-w-xl mx-auto text-xl text-gray-500">
            Discover our most popular adventure packages
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map(pkg => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/packages">
            <button className="px-6 py-3 border-2 border-teal-500 text-teal-500 rounded-lg font-medium hover:bg-teal-500 hover:text-white transition flex items-center mx-auto cursor-pointer">
              Explore All Packages
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;

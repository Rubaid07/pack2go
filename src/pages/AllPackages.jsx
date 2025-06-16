import React, { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import Loading from "../components/Loading";
import useAxiosSecure from "../hook/useAxiosSecure";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/packages")
      .then(res => {
        const randomData = res.data.sort(() => Math.random() - 0.5);
        setPackages(randomData);
        setLoading(false);
      });
  }, [axiosSecure]);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filter = packages.filter(pkg =>
    pkg.tour_name.toLowerCase().includes(search) ||
    pkg.destination.toLowerCase().includes(search)
  );

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold bg-gradient-to-r mx-auto from-teal-400 to-teal-600 bg-clip-text text-transparent w-max">
          All Tour Packages
        </h2>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="input input-bordered w-full max-w-md mt-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filter.map(pkg => (
          <PackageCard key={pkg._id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
};

export default AllPackages;

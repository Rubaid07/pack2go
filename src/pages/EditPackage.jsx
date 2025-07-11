import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router';
import Loading from '../components/Loading';
import useAxiosSecure from '../hook/useAxiosSecure';

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg ]  = useState(null)
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/packages/${id}`)
      .then(data => setPkg(data.data))
  }, [id]);

  const handleUpdatePackage = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatePkg = {
      tour_name: form.tour_name.value,
      image: form.image.value,
      duration: form.duration.value,
      departure_location: form.departure_location.value,
      destination: form.destination.value,
      price: form.price.value,
      departure_date: form.departure_date.value,
      contact_no: form.contact_no.value,
      package_details: form.package_details.value,
    }

    axiosSecure.put(`${import.meta.env.VITE_API_URL}/packages/${id}`, updatePkg)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Package Updated!',
            text: 'The tour package has been successfully updated.',
            showConfirmButton: false,
            timer: 1500,
            position: 'center',
            background: '#1f2937',
            color: '#fff'
          });
          navigate('/manage-packages');
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong while updating the package.',
          background: '#1f2937',
          color: '#fff'
        });
      });
  };

  if (!pkg) return <Loading></Loading>;

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 shadow-xl rounded-xl transition-all duration-300">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3">Edit Tour Package</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">Update the fields to modify the tour package</p>
      </div>

      <form onSubmit={handleUpdatePackage} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Tour Name</label>
            <input 
              type="text"
              name="tour_name"
              defaultValue={pkg.tour_name}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Image URL</label>
            <input 
              type="text"
              name="image"
              defaultValue={pkg.image}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Duration</label>
            <input 
              type="text"
              name="duration"
              defaultValue={pkg.duration}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Departure Location</label>
            <input 
              type="text"
              name="departure_location"
              defaultValue={pkg.departure_location}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Destination</label>
            <input 
              type="text"
              name="destination"
              defaultValue={pkg.destination}
              
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Price (BDT)</label>
            <input 
              type="number"
              name="price"
              defaultValue={pkg.price}
              
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Departure Date</label>
            <input 
              type="date"
              name="departure_date"
              defaultValue={pkg.departure_date}
              
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Contact Number</label>
            <input 
              type="text"
              name="contact_no"
              defaultValue={pkg.contact_no}
              
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Package Details</label>
          <textarea 
            name="package_details"
            rows="4"
            defaultValue={pkg.package_details}
            
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          ></textarea>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 cursor-pointer"
          >
            Update Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPackage;

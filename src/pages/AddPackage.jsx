import React, { use } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router';

const AddPackage = () => {
  const { user } = use(AuthContext);
  const navigate= useNavigate()

  const handleAddPackage = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const newPackage = {
      ...data,
      guide_name: user.displayName,
      guide_email: user.email,
      guide_photo: user.photoURL,
      bookingCount: 0,
      created_at: new Date()
    };

    axios.post('http://localhost:3000/packages  ', newPackage)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: 'success',
            title: 'Package Added!',
            text: 'The tour package has been successfully added.',
            showConfirmButton: false,
            timer: 1500,
            position: 'center',
            background: '#1f2937',
            color: '#fff'
          });
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong while adding the package.',
          background: '#1f2937',
          color: '#fff'
        });
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 shadow-xl rounded-xl transition-all duration-300">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Add a Tour Package</h2>
        <p className="text-gray-400">Fill out the form to create a new tour package</p>
      </div>

      <form onSubmit={handleAddPackage} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Tour Name</label>
            <input 
              type="text" 
              name="tour_name" 
              placeholder="Tour Name" 
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Image URL</label>
            <input 
              type="text" 
              name="image" 
              placeholder="https://example.com/image.jpg" 
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Duration</label>
            <input 
              type="text" 
              name="duration" 
              placeholder="Travel Duration" 
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Departure Location</label>
            <input 
              type="text" 
              name="departure_location" 
              placeholder="Departure Location" 
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Destination</label>
            <input 
              type="text" 
              name="destination" 
              placeholder="Destination" 
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Price (BDT)</label>
            <input 
              type="number" 
              name="price" 
              placeholder="Price (BDT)" 
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Departure Date</label>
            <input 
              type="date" 
              name="departure_date" 
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Contact Number</label>
            <input 
              type="text" 
              name="contact_no" 
              placeholder="+8801XXXXXXXXX" 
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300" 
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Package Details</label>
          <textarea 
            name="package_details" 
            rows="4" 
            placeholder="Describe the package details including itinerary, inclusions, exclusions, etc." 
            className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300" 
            required
          ></textarea>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 cursor-pointer "
          >
            Add Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
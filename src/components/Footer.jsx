import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logoo from "../assets/logoo.png"
import { Link } from 'react-router';
const Footer = () => {
  return (
    <footer className="bg-base-200 card-theme pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <img  className="w-28 md:w-32" src={logoo} alt="" />
            </h3>
            <p className="text-gray-800 text mb-4 ">
              Your trusted partner for authentic travel experiences in Bangladesh since 2010.
            </p>
            <div className="flex space-x-4">
              <a to="https://facebook.com" target='_blank' className="cursor-pointer text-gray-400 footer-text hover:text-teal-400 transition">
                <FaFacebook size={20} />
              </a>
              <a to="https://twitter.com" target='_blank' className="cursor-pointer text-gray-400 footer-text hover:text-teal-400 transition">
                <FaTwitter size={20} />
              </a>
              <a to="https://instagram.com" target='_blank' className="cursor-pointer text-gray-400 footer-text hover:text-teal-400 transition">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 footer-text hover:text-teal-400 transition">Home</Link></li>
              <li><Link to="packages" className="text-gray-400 footer-text hover:text-teal-400 transition">All Packages</Link></li>
              <li><Link to="about" className="text-gray-400 footer-text hover:text-teal-400 transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="privacy" className="text-gray-400 footer-text hover:text-teal-400 transition">Privacy Policy</Link></li>
              <li><Link to="terms" className="text-gray-400 footer-text hover:text-teal-400 transition">Terms & Conditions</Link></li>
              <li><Link to="guidelines" className="text-gray-400 footer-text hover:text-teal-400 transition">Safety Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 footer-text">123 Travel Street, Dhaka 1212, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-teal-400 mr-3" />
                <span className="text-gray-400 footer-text">+880 1111 123456</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-teal-400 mr-3" />
                <span className="text-gray-400 footer-text">info@pack2go.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 my-6"></div>

      
          <p className="text-gray-500 text-center text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Pack2Go. All rights reserved.
          </p>
      </div>
    </footer>
  );
};

export default Footer;
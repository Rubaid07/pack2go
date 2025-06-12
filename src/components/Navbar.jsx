import { Link, NavLink } from 'react-router';
import logo from '../assets/logo.png';
import logoText from '../assets/logo-text.png';
import { use, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { CgLogOut } from 'react-icons/cg';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const handleTheme = e => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const links = <>
    <li>
      <NavLink to='/' className={({ isActive }) => isActive ? 'text-teal-500 font-medium' : 'text-gray-400 dar hover:text-teal-500'}>Home</NavLink>
    </li>
    <li>
      <NavLink to='/packages' className={({ isActive }) => isActive ? 'text-teal-500 font-medium' : 'text-gray-400 dar hover:text-teal-500'}>All Packages</NavLink>
    </li>
    {user && (
      <>
        <li>
          <NavLink to="my-booking" className={({ isActive }) => isActive ? 'text-teal-500 font-medium' : 'text-gray-400 dar hover:text-teal-500'}>My Booking</NavLink></li>
        <li>
          <NavLink to="/guide-bookings" className={({ isActive }) => isActive ? 'text-teal-500 font-medium' : 'text-gray-400 dar hover:text-teal-500'}>Guide Bookings</NavLink>
        </li>
      </>
    )}
    <li> <NavLink to='/about' className={({ isActive }) => isActive ? 'text-teal-500 font-medium' : 'text-gray-400 dar hover:text-teal-500'}>About Us</NavLink></li>
  </>;

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
      }).catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='bg-base-100 sticky top-0 z-50 shadow-md transition-colors duration-300'>
      <div className="navbar max-w-7xl mx-auto px-4 py-3">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2">
              {links}
            </ul>
          </div>
          <Link to="/" className='flex items-center'>
            <img className='w-8 h-8 md:w-10 md:h-10' src={logo} alt="Logo" />
            <img className='w-24 md:w-32' src={logoText} alt="Brand Name" />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu flex-row">
            {links}
          </ul>
        </div>

        <div className="navbar-end gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={handleTheme}
              className="toggle toggle-sm text-teal-400 border-teal-500"
            />
          </label>

          {!user ? (
            <Link to='/signin' className="btn bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md transition-colors duration-300">
              Sign In
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn md:tooltip md:tooltip-right btn-ghost btn-circle avatar" data-tip={user.displayName}>
                <div className="w-10 rounded-full border-2 border-teal-500">
                  <img alt={user.displayName} src={user?.photoURL} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="add-package" className="hover:text-teal-500">Add Package</Link></li>
                <li><Link to="manage-packages" className="hover:text-teal-500">Manage My Packages</Link></li>
                <li onClick={handleLogout}><a className="hover:text-teal-500">Logout <CgLogOut size={16} className="ml-1" /></a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
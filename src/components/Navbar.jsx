import { Link, NavLink } from 'react-router';
import logoo from '../assets/logoo.png';
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
    <div className='bg-base-100/90 sticky top-0 z-50 shadow-md transition-colors duration-300'>
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
            <img className='w-24 md:w-35' src={logoo} alt="Brand Name" />
          </Link>
        </div>
        <div className="navbar-end gap-4">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-3">
              {links}
            </ul>
          </div>

          <label className="swap swap-rotate">

            <input 
            type="checkbox"
              checked={theme === 'dark'}
              onChange={handleTheme} />

            {/* sun icon */}
            <svg
              className="swap-on h-7 w-7 fill-current text-gray-600 text"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off h-7 w-7 fill-current text-gray-600 text"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          {!user ? (
            <Link to='/signin' className="btn bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md transition-colors duration-300">
              Sign In
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn xl:tooltip xl:tooltip-right btn-ghost btn-circle avatar" data-tip={user.displayName}>
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
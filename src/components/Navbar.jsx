import { Link, NavLink } from 'react-router';
import logo from '../assets/logo.png'
import logoText from '../assets/logo-text.png'
import { useEffect, useState } from 'react';

const Navbar = () => {
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
    <NavLink to='/' className={({ isActive }) => isActive ? 'text-active' : 'text-inactive'}>Home</NavLink>
    <NavLink to='/packages' className={({ isActive }) => isActive ? 'text-active' : 'text-inactive'}>All Packages</NavLink>
    <NavLink to='/about' className={({ isActive }) => isActive ? 'text-active' : 'text-inactive'}>About Us</NavLink>
  </>;

  return (
    <div className='bg-base-100 shadow-md montserrat'>
      <div className="navbar md:w-10/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown block  lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 pb-5 shadow-md">
              {links}
            </ul>
          </div>
          <Link to="/" className='flex items-center cursor-pointer'>
            <img className='md:w-12 w-7' src={logo} alt="" />
            <img className='md:w-30 w-24' src={logoText} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <label className="text-base-content mr-4">
            <input type="checkbox" checked={theme === 'dark'} onChange={handleTheme} className="theme-controller toggle toggle-info" />
          </label>
          <div className='hidden lg:flex'>
            <Link to='/signin' className="md:btn md:px-[30px] md:py-[15px] md:bg-sky-600 hover:bg-sky-700 md:flex rounded-sm px-3 py-2 md:text-white">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
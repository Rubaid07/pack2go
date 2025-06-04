import { Link, NavLink } from 'react-router';
import logo from '../assets/pack2go.png'
const Navbar = () => {
  const links = <>
    <NavLink to='/' className={({ isActive }) => isActive ? 'underline text-accent underline-offset-7 font-medium' : 'text-neutral hover:text-primary'}>Home</NavLink>
    <NavLink to='/packages' className={({ isActive }) => isActive ? 'underline text-accent underline-offset-7 font-medium' : 'text-neutral hover:text-primary'}>All Packages</NavLink>
    <NavLink to='/about' className={({ isActive }) => isActive ? 'underline text-accent underline-offset-7 font-medium' : 'text-neutral hover:text-primary'}>About Us</NavLink>
  </>
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 pb-5 shadow-md">
              {links}
            </ul>
          </div>
          <Link to="/" className='flex items-center gap-2 cursor-pointer'>
            <img className='md:w-12 w-7' src={logo} alt="" /> 
          <p className='font-semibold text-2xl text-[#2C3E50]'>Pack<span className='text-[#4CAF50] text-3xl'>2Go</span></p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <input type="checkbox" value="dark" className="toggle theme-controller" />
            <div className='hidden lg:flex'>
              <Link to='/login' className="md:btn md:px-[30px] md:py-[15px] md:bg-transparent  border  hover: hover: md: md:  rounded-sm px-3 py-2  mr-3">Login</Link>
              <Link to='/register' className="md:btn md:px-[30px] md:py-[15px] md:  hover: md: md:flex rounded-sm px-3 py-2 text-white">Register</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
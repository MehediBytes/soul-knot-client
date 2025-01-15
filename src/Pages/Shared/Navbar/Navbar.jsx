import { useState } from 'react';
import { FaBarsStaggered, FaUser } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    // State for toggling mobile menu
    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();

    const navOptions = <>
        <Link to={"/"} className={`p-1 ${location.pathname === '/' ? 'border-b-2 rounded-lg border-white' : ''}`}>Home</Link>
        <Link to={"/biodata"} className={`p-1 ${location.pathname === '/biodata' ? 'border-b-2 rounded-lg border-white' : ''}`}>Biodatas</Link>
        <Link to={"/about"} className={`p-1 ${location.pathname === '/about' ? 'border-b-2 rounded-lg border-white' : ''}`}>About Us</Link>
        <Link to={"/contact"} className={`p-1 ${location.pathname === '/contact' ? 'border-b-2 rounded-lg border-white' : ''}`}>Contact Us</Link>
        <Link to={"/dashboard"} className={`p-1 ${location.pathname === '/dashboard' ? 'border-b-2 rounded-lg border-white' : ''}`}>Dashboard</Link>
    </>

    return (
        <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white fixed w-full z-10 top-0 left-0">
            <nav className="max-w-7xl mx-auto p-3 flex justify-between items-center">
                {/* Logo and Website Name */}
                <div className="flex items-center space-x-2">
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <FaBarsStaggered className='font-black text-2xl' />
                    </button>
                    <h3 className="text-3xl font-black"><Link to={"/"}>Soul-Knot</Link></h3>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-5">
                    {navOptions}
                </div>
                {/* {user ?
                    <div className='flex items-center gap-2'>
                        <div className='border rounded-full p-2'>
                            <img src={user?.PhotoUrl} alt="" />
                        </div>
                        <button className='border rounded-lg px-2 py-1 hover:bg-pink-700'>Log out</button>
                    </div>
                    : */}
                    <div className='flex items-center gap-2'>
                        <p className='border rounded-full p-2 cursor-pointer'><FaUser></FaUser></p>
                        <button className='border rounded-lg px-2 py-1 hover:bg-pink-700'><Link to={"/login"}>Log In</Link></button>
                    </div>
                
            </nav>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden ${isOpen ? 'block' : 'hidden'} absolute bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 mt-2 rounded-md`}
                style={{ top: '50px', left: 0 }}
            >
                <div className="flex flex-col items-center space-y-4">
                    {navOptions}
                </div>
            </div>
        </header>
    );
};

export default Navbar;

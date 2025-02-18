import { useState } from 'react';
import { FaBarsStaggered, FaUser } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAdmin from '../../../Hooks/UseAdmin';

const Navbar = () => {

    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for toggling mobile menu
    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();

    // Handle Logout
    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You are now loged out",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((error) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Problem in log out.", error,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const navOptions = <>
        <Link to={"/"} className={`p-1 ${location.pathname === '/' ? 'border-b-2 rounded-lg border-white' : ''}`}>Home</Link>

        <Link to={"/biodata"} className={`p-1 ${location.pathname === '/biodata' ? 'border-b-2 rounded-lg border-white' : ''}`}>Biodatas</Link>

        <Link to={"/about"} className={`p-1 ${location.pathname === '/about' ? 'border-b-2 rounded-lg border-white' : ''}`}>About Us</Link>

        <Link to={"/contact"} className={`p-1 ${location.pathname === '/contact' ? 'border-b-2 rounded-lg border-white' : ''}`}>Contact Us</Link>

        {
            user && isAdmin &&
            <div className='flex flex-col lg:flex-row lg:space-x-5'>
                <Link to={"/dashboard/adminHome"}
                    className={`p-1 ${location.pathname === '/dashboard/adminHome' ? 'border-b-2 rounded-lg border-white' : ''}`}
                >Dashboard</Link>
                <button onClick={() => setIsModalOpen(true)} className="p-1">Profile</button>
            </div>
        }
        {
            user && !isAdmin &&
            <div className='flex flex-col lg:flex-row lg:space-x-5'>
                <Link to={"/dashboard/userHome"}
                    className={`p-1 ${location.pathname === '/dashboard/userHome' ? 'border-b-2 rounded-lg border-white' : ''}`}
                >Dashboard</Link>
                <button onClick={() => setIsModalOpen(true)} className="p-1">Profile</button>
            </div>
        }
    </>

    return (
        <header className="bg-pink-500 text-white fixed w-full z-10 top-0 left-0">
            <nav className="container mx-auto py-3 px-4 flex justify-between items-center">
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
                {user && user?.email ?
                    <div className='flex items-center gap-2'>
                        <div className='border rounded-full'>
                            <img className="w-8 h-8 rounded-full cursor-pointer"
                                referrerPolicy="no-referrer"
                                src={user?.photoURL || "None"}
                                alt={user?.displayName || "User"}
                                title={user?.displayName || "User"} />
                        </div>
                        <button onClick={handleLogout}
                            className='border rounded-lg px-2 py-1 hover:bg-pink-700'>Log out</button>
                    </div>
                    :
                    <div className='flex items-center gap-2'>
                        <p className='border rounded-full p-2 cursor-pointer'><FaUser></FaUser></p>
                        <button className='border rounded-lg px-2 py-1 hover:bg-pink-700'><Link to={"/login"}>Log In</Link></button>
                    </div>
                }
            </nav>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden ${isOpen ? 'block' : 'hidden'} absolute bg-pink-500 text-white p-4 mt-2 rounded-md`}
                style={{ top: '50px', left: 0 }}
            >
                <div className="flex flex-col items-center">
                    {navOptions}
                </div>
            </div>
            {/* Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h2 className="text-2xl font-bold text-pink-500">{user?.displayName}</h2>
                        <div className="mt-4">
                            <div className='flex justify-center items-center'>
                                <img className="w-28 h-28 rounded-full border-2 border-pink-500 mx-auto object-cover"
                                    referrerPolicy="no-referrer"
                                    src={user?.photoURL || "None"}
                                    alt={user?.displayName || "User"}
                                    title={user?.displayName || "User"} />
                            </div>
                            <div className='mt-5'>
                                <p className='text-black'><strong>Name:</strong> {user?.displayName || "N/A"}</p>
                                <p className='text-black'><strong>Email:</strong> {user?.email}</p>
                            </div>
                        </div>
                        <button
                            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;

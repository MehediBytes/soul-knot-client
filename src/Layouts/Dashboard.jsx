import { Link, Outlet, useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/UseAdmin';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const location = useLocation();
    const { user, logOut } = useAuth();

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

    return (
        <div className="md:flex container mx-auto">
            {/* dashboard side bar */}
            <div className="md:w-1/4 md:min-h-screen bg-pink-500">
                <ul className='text-center md:py-10 py-4 px-4 text-white space-y-3'>
                    {
                        isAdmin ? <>
                            <div>
                                <Link to={"/dashboard/adminHome"}
                                    className={`p-1 ${location.pathname === '/dashboard/adminHome' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                >
                                    Dashboard
                                </Link>
                            </div>
                            <div>
                                <Link to={"/dashboard/adminProfile"}
                                    className={`p-1 ${location.pathname === '/dashboard/adminProfile' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                >
                                    Profile
                                </Link>
                            </div>
                            <div>
                                <Link to={"/dashboard/manageUsers"}
                                    className={`p-1 ${location.pathname === '/dashboard/manageUsers' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                >
                                    Manage Users
                                </Link>
                            </div>
                            <div>
                                <Link to={"/dashboard/approvedPremium"}
                                    className={`p-1 ${location.pathname === '/dashboard/approvedPremium' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                >
                                    Approved Premium
                                </Link>
                            </div>
                            <div>
                                <Link to={"/dashboard/approvedContact"}
                                    className={`p-1 ${location.pathname === '/dashboard/approvedContact' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                >
                                    Contact Requests
                                </Link>
                            </div>
                            <div>
                                <Link to={"/dashboard/successStory"}
                                    className={`p-1 ${location.pathname === '/dashboard/successStory' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                >
                                    Success Story
                                </Link>
                            </div>

                        </>
                            :
                            <>
                                <div>
                                    <Link to={"/dashboard/userHome"}
                                        className={`p-1 ${location.pathname === '/dashboard/userHome' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        Dashboard
                                    </Link>
                                </div>
                                <div>
                                    <Link to={"/dashboard/userProfile"}
                                        className={`p-1 ${location.pathname === '/dashboard/userProfile' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        Profile
                                    </Link>
                                </div>
                                <div>
                                    <Link to={"/dashboard/editBiodata"}
                                        className={`p-1 ${location.pathname === '/dashboard/editBiodata' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        Edit Biodata
                                    </Link>
                                </div>
                                <div>
                                    <Link to={"/dashboard/viewBiodata"}
                                        className={`p-1 ${location.pathname === '/dashboard/viewBiodata' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        Biodata
                                    </Link>
                                </div>
                                <div>
                                    <Link to={"/dashboard/contactRequest"}
                                        className={`p-1 ${location.pathname === '/dashboard/contactRequest' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        Contact Request
                                    </Link>
                                </div>
                                <div>
                                    <Link to={"/dashboard/favouritesBiodata"}
                                        className={`p-1 ${location.pathname === '/dashboard/favouritesBiodata' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        Favourites Biodata
                                    </Link>
                                </div>
                                <div>
                                    <Link to={"/dashboard/gotMarried"}
                                        className={`p-1 ${location.pathname === '/dashboard/gotMarried' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        Got Married
                                    </Link>
                                </div>

                            </>
                    }
                    <hr className='text-white my-10' />

                    {/* shared link */}
                    <div className='space-y-3'>
                        <Link to={"/"}>Home</Link>

                        <div>
                            <button onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="w-full">
                <nav className='flex flex-row justify-between mb-5 border-b border-pink-500 p-2'>
                    <h3 className="text-3xl font-black text-pink-500"><Link to={"/"}>Soul-Knot</Link></h3>
                    <div className='flex items-center gap-2'>
                        <div className='border rounded-full'>
                            <img className="w-10 h-10 rounded-full border-2 border-pink-500 cursor-pointer"
                                referrerPolicy="no-referrer"
                                src={user?.photoURL || "None"}
                                alt={user?.displayName || "User"}
                                title={user?.displayName || "User"} />
                        </div>
                        <button onClick={handleLogout}
                            className='border rounded-lg px-2 py-1 text-white bg-pink-500 hover:bg-pink-700'>Log out</button>
                    </div>
                </nav>
                <section className='px-2 py-4'>
                    <Outlet></Outlet>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
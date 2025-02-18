import useAuth from "../../../Hooks/useAuth";

const AdminProfile = () => {
    const { user } = useAuth();
    return (
        <div className="text-center">
            <div className="mt-4">
                <div className='flex justify-center items-center'>
                    <img className="w-48 h-48 rounded-full border-2 border-pink-500 mx-auto object-cover"
                        referrerPolicy="no-referrer"
                        src={user?.photoURL || "None"}
                        alt={user?.displayName || "User"}
                        title={user?.displayName || "User"} />
                </div>
                <div className='mt-5 space-y-4'>
                    <p className='text-black'><strong>Name:</strong> {user?.displayName || "N/A"}</p>
                    <p className='text-gray-500'><strong>Email:</strong> {user?.email}</p>
                    <p className='text-black'><strong>Sign Up:</strong> {user?.metadata?.creationTime || "N/A"}</p>
                    <p className='text-gray-500'><strong>Last Login:</strong> {user?.metadata?.lastSignInTime || "N/A"}</p>                    
                    <p className='text-black'><strong>Phone:</strong> {user?.phoneNumber || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
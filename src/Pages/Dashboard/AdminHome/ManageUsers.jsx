import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseBiodata from "../../../Hooks/UseBiodata";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState("");
    const [biodata] = UseBiodata();

    const { data: allUsers = [], isLoading, refetch: usersRefetch } = useQuery({
        queryKey: ['users', searchQuery],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users?search=${searchQuery}`);
            return response?.data;
        }
    });

    const handleMakePremium = async (id) => {
        const user = allUsers.find((user) => user._id === id);
        const userBiodata = biodata.find((bio) => bio.contactEmail === user.email);
        if (!user) {
            console.error('User not found!');
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to make this user a premium member?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make premium!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.put(`/admin/approve-premium/${id}`, {
                        userEmail: user?.email,
                        biodataId: userBiodata?.biodataId
                    });
                    if (response?.data?.success) {
                        Swal.fire("Approved!", response.data.message, "success");
                    }
                    usersRefetch();
                } catch (error) {
                    console.error('Error Response:', error.response);
                    Swal.fire("Error!", error.response?.data?.message || "Failed to make the user premium.", "error");
                }
            }
        });
    };
    const handleMakeAdmin = async (id) => {
        const user = allUsers.find((user) => user._id === id);
        if (!user) {
            console.error('User not found!');
            return;
        }
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to make this user an admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Update user role to 'admin'
                    await axiosSecure.put(`/users/role/${id}`, { role: 'admin' });
                    Swal.fire("Success!", "User is now an admin.", "success");
                    usersRefetch();
                } catch (error) {
                    console.error('Error Response:', error.response);
                    Swal.fire("Error!", error.response?.data?.message || "Failed to update role.", "error");
                }
            }
        });
    }
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto">
            <Helmet>
                <title>Manage Users | Soul-Knot</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-pink-500 text-center">Manage Users</h2>
            <div className="my-5">
                <input
                    type="text"
                    className="px-4 py-2 border rounded-md"
                    placeholder="Search User By Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="overflow-x-auto mt-5">
                <table className="w-full table-auto">
                    <thead className="bg-white">
                        <tr>
                            <th className="p-4 border border-gray-300 text-center">Name</th>
                            <th className="p-4 border border-gray-300 text-center">Email</th>
                            <th className="p-4 border border-gray-300 text-center">Make Premium</th>
                            <th className="p-4 border border-gray-300 text-center">Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="p-4 border border-gray-300 text-center">{user.name}</td>
                                <td className="p-4 border border-gray-300 text-center">{user.email}</td>
                                <td className="p-4 border border-gray-300 text-center">
                                    <button
                                        onClick={() => handleMakePremium(user._id)}
                                        className={`text-white px-4 py-2 rounded-full ${user?.memberType === 'premium' ? 'bg-amber-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'}`}
                                        disabled={user?.memberType === 'premium'}
                                    >
                                        {user?.memberType === 'premium' ? 'Premium' : 'Make Premium'}
                                    </button>
                                </td>
                                <td className="p-4 border border-gray-300 text-center space-x-2">
                                    <button
                                        onClick={() => handleMakeAdmin(user._id)}
                                        className={`text-white px-4 py-2 rounded-full ${user?.role === 'admin' ? 'bg-indigo-900 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
                                        disabled={user?.role === 'admin'}
                                    >
                                        {user?.role === 'admin' ? 'Admin' : 'Make Admin'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
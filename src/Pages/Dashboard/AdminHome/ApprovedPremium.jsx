import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ApprovedPremium = () => {

    const axiosSecure = useAxiosSecure();

    const { data: premiumRequests = [], isLoading, refetch: premiumRefetch } = useQuery({
        queryKey: ['premiumRequests'],
        queryFn: async () => {
            const response = await axiosSecure.get('/premium/request');
            return response?.data;
        },
    });

    const handleApprove = async (id) => {
         const requestData = premiumRequests.find(request => request._id == id);
        if (!requestData) {
            console.error('Request not found!');
            return;
        }
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to approve this user request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.put(`/admin/approve-premium/${id}`, {
                        biodataId: requestData.biodataId,
                        userEmail: requestData.userEmail,
                    });
                    Swal.fire("Approved!", "The user has been approved for premium.", "success");
                    premiumRefetch();
                } catch (error) {
                    console.error('Error Response:', error.response);
                    Swal.fire("Error!", error.response?.data?.message || "Failed to approve the request. Try again.", "error");
                }
            }
        });
    }
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
                <title>Approved-Premium | Soul-Knot</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-pink-500 text-center">Premium Requests</h2>
            <div className="overflow-x-auto mt-5">
                <table className="w-full table-auto">
                    <thead className="bg-white">
                        <tr>
                            <th className="p-4 border border-gray-300 text-center">Name</th>
                            <th className="p-4 border border-gray-300 text-center">Email</th>
                            <th className="p-4 border border-gray-300 text-center">Biodata ID</th>
                            <th className="p-4 border border-gray-300 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {premiumRequests.map(request => (
                            <tr key={request._id}>
                                <td className="p-4 border border-gray-300 text-center">{request.userName}</td>
                                <td className="p-4 border border-gray-300 text-center">{request.userEmail}</td>
                                <td className="p-4 border border-gray-300 text-center">{request.biodataId}</td>
                                <td className="p-4 border border-gray-300 text-center">
                                    <button
                                        onClick={() => handleApprove(request._id)}
                                        className={`text-white px-4 py-2 rounded-full ${request.memberType === 'premium' ? 'bg-amber-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'}`}
                                        disabled={request.memberType === 'premium'}
                                    >
                                        {request.memberType === 'premium' ? 'Premium User' : 'Make Premium'}
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

export default ApprovedPremium;
import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import UseBiodata from "../../../Hooks/UseBiodata";

const ContactRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [biodata, loading] = UseBiodata();

    // Fetch Contact Requests
    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ["contactRequests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/my-contact-requests");
            return res.data;
        },
    });

    // Combine Contact Requests with Biodata
    const combinedData = requests.map((req) => {
        const biodataDetails = biodata.find((b) => b.biodataId == req.biodataId);
        return { ...req, ...biodataDetails };
    });
    console.log(combinedData);

    // Handle Delete Request
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/delete-payment/${id}`);
                    if (res.data?.deletedCount > 0) {
                        Swal.fire("Deleted!", "The contact request has been deleted.", "success");
                        refetch();
                    } else {
                        Swal.fire("Error", "Failed to delete the request.", "error");
                    }
                } catch (error) {
                    console.error("Error deleting request:", error);
                    Swal.fire("Error", "Failed to delete the request.", "error", error.message);
                }
            }
        });
    };

    if (isLoading || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }



    return (
        <div className="max-w-7xl mx-auto px-4">
            <Helmet>
                <title>Contact-Request | Soul-Knot</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-5 text-pink-500 text-center">
                My Contact Information Request
            </h2>
            {combinedData.length > 0 ?
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-white">
                                <th className="border border-gray-300 px-4 py-2">#</th>
                                <th className="border border-gray-300 px-4 py-2">Biodata ID</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Mobile No</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {combinedData.map((req, index) => (
                                <tr key={req._id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{req.biodataId}</td>
                                    <td className={`border border-gray-300 px-4 py-2 capitalize ${req.status === "approved" ? "bg-green-300" : "bg-yellow-300"}`}>
                                        {req.status}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {req.status === "approved" ? req.mobileNumber : "N/A"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {req.status === "approved" ? req.contactEmail : "N/A"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDelete(req.paymentId)}
                                            disabled={req.status === "approved"}
                                            className={`p-2 rounded-full ${req.status === "approved"
                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                                                    : "bg-white text-red-500 hover:bg-red-200"
                                                }`}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                :
                <div>
                    <h3 className="text-red-500">No Contact Request Found</h3>
                </div>
            }
        </div>
    );
};

export default ContactRequest;
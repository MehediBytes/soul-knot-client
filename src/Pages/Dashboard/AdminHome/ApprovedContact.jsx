import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseBiodata from "../../../Hooks/UseBiodata";
import UsePayments from "../../../Hooks/UsePayments";
import Swal from "sweetalert2";

const ApprovedContact = () => {
    const [payments, paymentsLoading, refetchPayments] = UsePayments();
    const [biodata, loading] = UseBiodata();
    const axiosSecure = useAxiosSecure();
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        if (!paymentsLoading && !loading) {
            const mergedData = payments.map((payment) => {
                const matchedBiodata = biodata.find((b) => b.biodataId === payment.biodataId);
                return {
                    ...payment,
                    userGender: matchedBiodata?.biodataType || "Unknown",
                };
            });
            setCombinedData(mergedData);
        }
    }, [payments, biodata, paymentsLoading, loading]);

    const handleApprove = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to approve this contact request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/payments/${id}`, { status: "approved" });
                Swal.fire("Approved!", "The contact has been approved.", "success");
                refetchPayments();
            }
        });
    };

    if (loading || paymentsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto">
            <Helmet>
                <title>Approved-Contact | Soul-Knot</title>
            </Helmet>
            <h3 className="text-2xl font-bold text-pink-500 text-center">Contact Requests</h3>
            <div className="overflow-x-auto mt-5">
                <table className="w-full table-auto">
                    <thead className="bg-white">
                        <tr>
                            <th className="p-4 border border-gray-300 text-center">User Name</th>
                            <th className="p-4 border border-gray-300 text-center">User Email</th>
                            <th className="p-4 border border-gray-300 text-center">Biodata ID</th>
                            <th className="p-4 border border-gray-300 text-center">Payment Amount</th>
                            <th className="p-4 border border-gray-300 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {combinedData.map((data) => (
                            <tr key={data._id} className="">
                                <td className="p-4 border border-gray-300 text-center">{data?.userName}</td>
                                <td className="p-4 border border-gray-300 text-center">{data.requestEmail}</td>
                                <td className="p-4 border border-gray-300 text-center">{data.biodataId}</td>
                                <td className="p-4 border border-gray-300 text-center">${data.paymentAmount}</td>
                                <td className="p-4 border border-gray-300 text-center">
                                    <button
                                        onClick={() => handleApprove(data._id)}
                                        disabled={data.status === "approved"}
                                        className={`p-2 rounded-full ${data.status === "approved"
                                                ? "bg-green-500 text-white cursor-not-allowed"
                                                : "bg-blue-500 text-white hover:bg-blue-700"
                                            }`}
                                    >
                                        {data.status === "approved"
                                            ? "Approved"
                                            : "Approve Contact"}
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

export default ApprovedContact;
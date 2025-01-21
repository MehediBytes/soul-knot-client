import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import UseBiodata from "../../../Hooks/UseBiodata";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import usePremium from "../../../Hooks/UsePremium";


const ViewBiodata = () => {

    const { user } = useAuth();
    const [allBiodata, loading] = UseBiodata();
    const [biodata, setBiodata] = useState(null);
    const axiosSecure = useAxiosSecure();
    const [isPremium, isPremiumLoading, premiumRefetch] = usePremium();
    const [requestSent, setRequestSent] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    useEffect(() => {
        if (allBiodata) {
            const userBiodata = allBiodata.find(item => item.contactEmail === user?.email);
            if (userBiodata) {
                setBiodata(userBiodata);
            }
        }
    }, [allBiodata, user?.email]);

    const handleRequestPremium = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Make request for premium!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Make A Request!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const payload = {
                        biodataId: biodata?.biodataId,
                        memberType: biodata?.memberType,
                        userEmail: user?.email,
                        userName: user?.displayName,
                    };
                    // Sending request to the backend to request premium
                    const response = await axiosSecure.post('/premium/request', payload);
                    if (response.data) {
                        Swal.fire("Success", "Your premium request has been sent. Awaiting approval from admin.", "success");
                        setRequestSent(true);
                    } else {
                        Swal.fire("Error", "Something went wrong, please try again.", "error");
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire("Error", "An error occurred. Please try again later.", "error", error.message);
                }
            }
        });
    };

    useEffect(() => {
        if (requestSent) {
            premiumRefetch();
        }
    }, [requestSent, premiumRefetch]);

    useEffect(() => {
        if (isPremium) {
            setIsApproved(true);
        }
    }, [isPremium]);

    if (loading || isPremiumLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <Helmet>
                <title>{user?.displayName}-Biodata | Soul-Knot</title>
            </Helmet>
            <div>
                {!biodata ?
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6 text-pink-500 text-center">
                            No Biodata Found
                        </h2>
                    </div> :
                    <div className="flex flex-col justify-center items-center gap-5">
                        <div>
                            <img className="w-48 h-48 rounded-full border-2 border-pink-500 mx-auto object-cover" src={biodata.profileImageLink} alt="" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="mb-2 md:col-span-2">
                                <h3 className="text-3xl font-bold text-pink-500 text-center">{biodata.name}</h3>
                                <h3 className="text-center"><strong>Biodata ID: </strong> {biodata.biodataId}</h3>
                            </div>
                            <div className="border-2 rounded p-1">
                                <p><strong>Occupation: </strong> {biodata.occupation}</p>
                                <p className="text-gray-500"><strong>Gender: </strong> {biodata.biodataType}</p>
                            </div>
                            <div className="border-2 p-1 rounded">
                                <p><strong>Present Address: </strong> {biodata.presentDivisionName}</p>
                                <p className="text-gray-500"><strong>Permanent Address: </strong> {biodata.permanentDivisionName}</p>
                            </div>
                            <div className="border-2 p-1 rounded">
                                <p><strong>Mothers Name: </strong> {biodata.mothersName}</p>
                                <p className="text-gray-500"><strong>Fathers Name: </strong> {biodata.fathersName}</p>
                            </div>
                            <div className="border-2 p-1 rounded">
                                <p><strong>Age: </strong> {biodata.age}</p>
                                <p className="text-gray-500"><strong>Date Of Birth: </strong> {biodata.dateOfBirth}</p>

                            </div>
                            <div className="border-2 p-1 rounded">
                                <p><strong>Height: </strong> {biodata.height}</p>
                                <p className="text-gray-500"><strong>Skin Tone: </strong> {biodata.race}</p>

                            </div>
                            <div className="border-2 p-1 rounded">
                                <p><strong>Weight: </strong> {biodata.weight}</p>
                                <p className="text-gray-500"><strong>Expected Partner Age: </strong> {biodata.expectedPartnerAge}</p>

                            </div>
                            <div className="border-2 p-1 rounded">
                                <p><strong>Expected Partner Height: </strong> {biodata.expectedPartnerHeight}</p>
                                <p className="text-gray-500"><strong>Expected Partner Weight: </strong> {biodata.expectedPartnerWeight}</p>

                            </div>
                            <div className="border-2 p-1 rounded">
                                <p><strong>Mail: </strong> {biodata.contactEmail}</p>
                                <p className="text-gray-500"><strong>Mobile: </strong> {biodata.mobileNumber}</p>

                            </div>
                        </div>

                        {/* TODO: Make premium button functinality  */}
                        <div>
                            <button
                                onClick={handleRequestPremium}
                                disabled={isPremium || requestSent}
                                className={`w-full px-4 py-2 rounded-full ${isPremium
                                    ? "text-amber-500 text-2xl font-bold"
                                    : requestSent
                                        ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                                        : "bg-pink-500 text-white hover:bg-pink-700"
                                    }`}
                            >
                                {isPremium ? "Premium Biodata" : requestSent ? "Premium Request Sent" : "Make Biodata to Premium"}
                            </button>
                            {isApproved && (
                                <div className="text-green-500 font-semibold">
                                    Congratulations You Are A Premium User!
                                </div>
                            )}
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default ViewBiodata;
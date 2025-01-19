import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import UseBiodata from "../../../Hooks/UseBiodata";
import { Helmet } from "react-helmet-async";


const ViewBiodata = () => {

    const { user } = useAuth();
    const [allBiodata, loading] = UseBiodata();
    const [biodata, setBiodata] = useState(null);

    useEffect(() => {
        if (allBiodata) {
            const userBiodata = allBiodata.find(item => item.contactEmail === user.email);
            if (userBiodata) {
                setBiodata(userBiodata);
            }
        }
    }, [allBiodata, user?.email]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="">
            <Helmet>
                <title>{user?.displayName}-Biodata | Soul-Knot</title>
            </Helmet>
            <div>
                {!biodata ?
                    <div className="">
                        <h2 className="text-3xl font-bold mb-6 text-pink-500 text-center">
                            No Biodata Found
                        </h2>
                    </div> :
                    <div className="flex flex-col justify-center items-center gap-5">
                        <div>
                            <img className="w-32 h-32 rounded-full border-2 border-pink-500 mx-auto object-cover" src={biodata.profileImageLink} alt="" />
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
                                className="w-full bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-700 mt-4"
                            >
                                Make Biodata To Premium
                            </button>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default ViewBiodata;
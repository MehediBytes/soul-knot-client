import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegHandshake } from "react-icons/fa6";

const BiodataDetails = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: biodata = [] } = useQuery({
        queryKey: ['biodata', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodata/${id}`);
            return res.data;
        }
    })

    console.log(biodata);

    return (
        <div className="max-w-7xl mx-auto px-4 py-5">
            <div className="md:flex items-center flex-grow gap-10">
                <div className="md:w-1/2">
                    <img className="w-full h-96" src={biodata.profileImageLink} alt="" />
                </div>
                <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <h3 className="text-3xl font-bold text-pink-500 mb-2 md:col-span-2 text-center">{biodata.name}</h3>
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
                        {/* TODO: need to be dynamic */}
                        <p><strong>Mail: </strong> {biodata.contactEmail}</p>
                        <p className="text-gray-500"><strong>Mobile: </strong> {biodata.mobileNumber}</p>

                    </div>

                    {/* TODO: need to be dynamic */}
                    <p className="capitalize md:col-span-2 text-center font-bold">{biodata.memberType} Member</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-10 mt-10">
                <div className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-700">
                    <button>Add to Favourites</button>
                    <IoIosAddCircleOutline className="text-xl" />
                </div>
                <div className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-700">
                    <button>Request Contact Information</button>
                    <FaRegHandshake className="text-xl"/>
                </div>
            </div>
        </div>
    );
};

export default BiodataDetails;
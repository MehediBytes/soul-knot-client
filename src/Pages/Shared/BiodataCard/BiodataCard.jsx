import { FaRegAddressCard } from "react-icons/fa";
import { IoMaleFemale } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const BiodataCard = ({ profile }) => {
    return (
        <div
            key={profile?._id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col flex-grow justify-between hover:shadow-xl"
        >
            <img
                src={profile?.profileImageLink}
                alt={profile?.name}
                className="w-32 h-32 rounded-full border-2 border-pink-500 mx-auto mt-2 object-cover"
            />
            <div className="p-4 text-center">
                <div className="text-center border-2 border-pink-500 rounded">
                    <h2 className="text-xl font-bold">{profile?.name}</h2>
                    <h4 className="font-medium">Biodata ID: {profile?.biodataId}</h4>
                    <p className="flex items-center justify-center gap-2 text-gray-500"><strong><MdWorkOutline className="text-xl" /></strong> {profile?.occupation}</p>
                    <p className="flex items-center justify-center gap-2"><FaRegAddressCard className="text-xl"/> {profile?.permanentDivisionName}</p>
                    <p className="text-gray-500 flex items-center justify-center gap-2">
                        <strong><IoMaleFemale className="text-xl"/></strong> {profile?.biodataType}
                    </p>
                    <p className=""><strong>Age:</strong> {profile?.age}</p>
                </div>
                <div>
                    <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-700">
                        <Link to={`/biodata/${profile?._id}`}>
                            View Profile
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BiodataCard;
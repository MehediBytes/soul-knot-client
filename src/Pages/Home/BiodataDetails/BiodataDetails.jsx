import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegHandshake } from "react-icons/fa6";
import BiodataCard from "../../Shared/BiodataCard/BiodataCard";
import UseBiodata from "../../../Hooks/UseBiodata";
import usePremium from "../../../Hooks/UsePremium";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import UseFavourites from "../../../Hooks/UseFavourites";
import { Helmet } from "react-helmet-async";


const BiodataDetails = () => {

    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [allBiodata, loading] = UseBiodata();
    const [isPremium] = usePremium();
    const [favoritesStatus, setFavoritesStatus] = useState({});
    const [userFavorites, favoritesLoading, refetchFavorites] = UseFavourites();

    const { data: biodata = [] } = useQuery({
        queryKey: ['biodata', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodata/${id}`);
            return res.data;
        }
    })

    const similarBiodata = allBiodata.filter(
        (item) => item.biodataType === biodata.biodataType && item.id !== biodata._id
    ).slice(0, 3);

    useEffect(() => {
        if (userFavorites) {
            const favoritesMap = {};
            userFavorites.forEach(item => {
                favoritesMap[item.biodataId] = item.userFavorite === user?.email;
            });
            setFavoritesStatus(favoritesMap);
        }
    }, [userFavorites, user?.email]);

    const handleAddToFavorites = async () => {
        try {
            const response = await axiosSecure.post('/favorites', {
                biodataId: biodata._id,
                userFavorite: user?.email
            });

            if (response.data.insertedId) {
                refetchFavorites()
                Swal.fire({
                    icon: 'success',
                    title: 'Added to Favorites!',
                    text: `${biodata?.name} has been added to your favorites.`,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to add biodata to favorites. Please try again.',
                });
            }
        } catch (error) {
            console.error("Error adding to favorites:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong. Please try again later.',
            });
        }
    };

    if (loading || favoritesLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-5">
            <Helmet>
                <title>Biodata-Details | Soul-Knot</title>
            </Helmet>
            <div className="md:flex items-center flex-grow gap-10">
                <div className="md:w-1/2">
                    <img className="w-full h-96 rounded" src={biodata.profileImageLink} alt="" />
                </div>
                <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-3">
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
                        {isPremium ?
                            <div>
                                <p><strong>Mail: </strong> {biodata.contactEmail}</p>
                                <p className="text-gray-500"><strong>Mobile: </strong> {biodata.mobileNumber}</p>
                            </div> :
                            <div>
                                <h3 className="text-pink-500">Please request for contact informations</h3>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center gap-10 mt-10">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full 
                    ${favoritesStatus[biodata._id] ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 text-white hover:bg-pink-700"}`}>
                    <button
                        onClick={handleAddToFavorites}
                        disabled={favoritesStatus[biodata._id]}
                        className={favoritesStatus[biodata._id] ? "cursor-not-allowed" : ""}
                    >
                        {favoritesStatus[biodata._id] ? "Added to Favorites" : "Add to Favorites"}
                    </button>
                    <IoIosAddCircleOutline className="text-xl" />
                </div>

                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isPremium
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-pink-500 text-white hover:bg-pink-700"
                    }`}>
                    <button disabled={isPremium}>Request Contact Information</button>
                    <FaRegHandshake className="text-xl" />
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-5">Similar Biodata :</h2>
                {similarBiodata?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {
                            similarBiodata.map((item) => (
                                <BiodataCard key={item._id} profile={item}></BiodataCard>
                            ))
                        }
                    </div>
                ) : (
                    <p className="text-red-500">No similar biodata found.</p>
                )}
            </div>
        </div>
    );
};

export default BiodataDetails;
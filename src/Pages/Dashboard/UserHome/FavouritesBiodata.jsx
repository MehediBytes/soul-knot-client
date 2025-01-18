import { FaTrash } from "react-icons/fa6";
import UseFavourites from "../../../Hooks/UseFavourites";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const FavouritesBiodata = () => {

    const axiosSecure = useAxiosSecure();
    const [favorites, loading, refetch] = UseFavourites();

    const handleDelete = async (id) => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/favorites/${id}`);
                console.log(res.data.deletedCount);
                if (res.data.deletedCount > 0) {
                    refetch();                   
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Biodata has been deleted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="px-4">
            <h2 className="text-2xl font-bold text-center text-pink-500 mb-5">My Favorites Biodata</h2>
            {(favorites.length>0 ?
                <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">#</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Biodata ID</th>
                            <th className="border border-gray-300 p-2">Permanent Address</th>
                            <th className="border border-gray-300 p-2">Occupation</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorites.map((item, index) => (
                            <tr key={item._id} className="text-center">
                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                <td className="border border-gray-300 p-2">{item.name}</td>
                                <td className="border border-gray-300 p-2">{item.biodataId}</td>
                                <td className="border border-gray-300 p-2">{item.permanentDivisionName}</td>
                                <td className="border border-gray-300 p-2">{item.occupation}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        className="bg-white text-red-500 rounded-full p-2"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        <FaTrash></FaTrash>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            :
            <div>
                <h3 className="text-red-500">No Favourite Biodata Found</h3>
            </div>
             )}
        </div>
    );
};

export default FavouritesBiodata;
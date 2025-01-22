import { useEffect, useState } from "react";
import UseBiodata from "../../../Hooks/UseBiodata";
import BiodataCard from "../../Shared/BiodataCard/BiodataCard";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const BiodataPage = () => {
    const [ageRange, setAgeRange] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [divisionFilter, setDivisionFilter] = useState("");
    const [filteredBiodata, setFilteredBiodata] = useState([]);
    const [biodata, loading] = UseBiodata();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const { user } = useAuth();

    useEffect(() => {
        const applyFilters = () => {
            const result = biodata.filter((bio) => {
                if (bio.contactEmail === user?.email) {
                    return false;
                }
                const ageInRange = (age) => {
                    switch (ageRange) {
                        case "18-30":
                            return age >= 18 && age <= 30;
                        case "31-45":
                            return age >= 31 && age <= 45;
                        case "46-above":
                            return age >= 46;
                        default:
                            return true;
                    }
                };
                const isAgeInRange = ageInRange(bio.age);
                const isGenderMatching =
                    genderFilter === "" || bio.biodataType === genderFilter;
                const isDivisionMatching =
                    divisionFilter === "" ||
                    bio.permanentDivisionName === divisionFilter;

                return isAgeInRange && isGenderMatching && isDivisionMatching;
            });

            setFilteredBiodata(result);
            setCurrentPage(1);
        };

        if (biodata.length > 0) {
            applyFilters();
        }
    }, [biodata, ageRange, genderFilter, divisionFilter, user?.email]);

    // Calculate paginated data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBiodata = filteredBiodata.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const totalPages = Math.ceil(filteredBiodata.length / itemsPerPage);

    // Loading state while fetching data
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="md:flex max-w-7xl mb-5 mx-auto px-4">
            <Helmet>
                <title>Biodata | Soul-Knot</title>
            </Helmet>
            {/* Filter Section */}
            <div className="md:w-1/4 w-full p-4 md:min-h-screen md:border-r md:border-gray-400">
                <h3 className="text-lg font-bold mb-4">Filter Options</h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Age Range</label>
                    <select
                        value={ageRange}
                        onChange={(e) => setAgeRange(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">All Ages</option>
                        <option value="18-30">18 - 30</option>
                        <option value="31-45">31 - 45</option>
                        <option value="46-above">46 and Above</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="">
                    <label className="block text-sm font-medium mb-1">Division</label>
                    <select
                        value={divisionFilter}
                        onChange={(e) => setDivisionFilter(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">All Divisions</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattagram">Chattagram</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Rajshahi">Rajshahi</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                </div>
            </div>

            {/* Biodata List Section */}
            <div className="md:w-3/4 w-full md:min-h-screen p-4">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold">Biodata List</h2>
                    <h3 className="tex-xl font-semibold">Total Biodata: {filteredBiodata.length}</h3>
                </div>

                {paginatedBiodata.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {paginatedBiodata.map((bio) => (
                            <BiodataCard key={bio._id} profile={bio}></BiodataCard>
                        ))}
                    </div>
                ) : (
                    <p className="text-xl font-semibold text-red-500">No biodata found.</p>
                )}

                {/* Pagination Controls */}
                <div className="mt-6 flex justify-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1
                                ? "bg-pink-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BiodataPage;

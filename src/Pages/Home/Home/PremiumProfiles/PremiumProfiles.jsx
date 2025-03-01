import { useEffect, useState } from "react";
import UseBiodata from "../../../../Hooks/UseBiodata";
import BiodataCard from "../../../Shared/BiodataCard/BiodataCard";
import { Link } from "react-router-dom";

const PremiumProfiles = () => {
    const [biodata, loading] = UseBiodata();
    const [premiumBiodata, setPremiumBiodata] = useState([]);
    const [sortOrder, setSortOrder] = useState("ascending");

    useEffect(() => {
        if (!loading && biodata.length) {
            // Directly filter biodata based on memberType
            const filteredBiodata = biodata.filter(data => data.memberType === "premium");
            setPremiumBiodata(filteredBiodata);
        }
    }, [biodata, loading]);

    // Sort premium profiles based on age
    const sortedPremium = [...premiumBiodata].sort((a, b) =>
        sortOrder === "ascending" ? a.age - b.age : b.age - a.age
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-10 px-4">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-pink-500">Our Premium Members</h3>
            </div>
            {/* Dropdown for sorting */}
            <div className="">
                <label className="mr-2 font-semibold">Sort by Age:</label>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="rounded px-2 py-1"
                >
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>
            {/* Profile Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {sortedPremium.slice(0, 8).map((profile) => (
                    <BiodataCard key={profile._id} profile={profile}></BiodataCard>
                ))}
            </div>
            <div className="flex items-center justify-center">
                <button className="mt-5 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-700">
                    <Link to={"/biodata"}>
                        See All Members Biodata
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default PremiumProfiles;

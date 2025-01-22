import { useEffect, useState } from "react";
import UseBiodata from "../../../../Hooks/UseBiodata";
import BiodataCard from "../../../Shared/BiodataCard/BiodataCard";
import UseUsers from "../../../../Hooks/UseUsers";

const PremiumProfiles = () => {
    const [biodata, loading] = UseBiodata();
    const [users, usersLoading] = UseUsers();
    const [premiumBiodata, setPremiumBiodata] = useState([]);
    const [sortOrder, setSortOrder] = useState("ascending");

    useEffect(() => {
        if (!usersLoading && !loading && users.length && biodata.length) {
            const premiumUsers = users.filter(user => user.memberType === "premium");
            const filteredBiodata = biodata.filter(data =>
                premiumUsers.some(user => user.email === data.contactEmail)
            );
            setPremiumBiodata(filteredBiodata);
        }
    }, [users, biodata, loading, usersLoading]);

    // Sort premium profiles based on age
    const sortedPremium = [...premiumBiodata].sort((a, b) =>
        sortOrder === "ascending" ? a.age - b.age : b.age - a.age
    );

    if (loading || usersLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto my-10 px-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {sortedPremium.slice(0, 6).map((profile) => (
                    <BiodataCard key={profile._id} profile={profile}></BiodataCard>
                ))}
            </div>
        </div>
    );
};

export default PremiumProfiles;
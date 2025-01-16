import { useState } from "react";
import UseBiodata from "../../../Hooks/UseBiodata";

const PremiumProfiles = () => {
    const [biodata, loading] = UseBiodata();
    const premium = biodata.filter(data => data.memberType === 'premium')

    // State to manage sort order
    const [sortOrder, setSortOrder] = useState("ascending");

    // Sort premium profiles based on age
    const sortedPremium = [...premium].sort((a, b) =>
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
        <div className="max-w-7xl mx-auto my-5 px-4">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-pink-500">Our Premium Members</h3>
            </div>
            {/* Dropdown for sorting */}
            <div className="p-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {sortedPremium.map((profile) => (
                    <div
                        key={profile._id}
                        className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col flex-grow justify-between"
                    >
                        <img
                            src={profile.profileImageLink}
                            alt={profile.name}
                            className="w-40 h-40 rounded-full mx-auto mt-2 object-cover"
                        />
                        <div className="p-4">
                            <div className="space-y-1">
                                <h2 className="text-xl font-bold">{profile.name}</h2>
                                <p className="text-gray-600">
                                    Type: {profile.biodataType}
                                </p>
                                <p>Permanent Division: {profile.permanentDivisionName}</p>
                                <p>Age: {profile.age}</p>
                                <p>Occupation: {profile.occupation}</p>
                            </div>
                            <div>
                                <button
                                    className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center"><button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-700">View More Profiles</button></div>
        </div>
    );
};

export default PremiumProfiles;
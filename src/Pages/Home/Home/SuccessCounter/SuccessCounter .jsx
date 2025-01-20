import UseBiodata from "../../../../Hooks/UseBiodata";
import UseStory from "../../../../Hooks/UseStory";

const SuccessCounter = () => {
    const [biodata, loading] = UseBiodata();
    const [stories] = UseStory();

    // Calculate counts
    const totalBiodata = biodata.length;
    const boysCount = biodata.filter((data) => data.biodataType === "Male").length;
    const girlsCount = biodata.filter((data) => data.biodataType === "Female").length;
    const marriagesCompleted = stories.length;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto my-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-5 text-pink-500">Success Counter</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Biodata */}
                <div className="bg-green-500 shadow-md rounded-full p-6 text-center">
                    <h3 className="text-2xl font-semibold text-white">Total Biodata</h3>
                    <p className="text-4xl font-bold mt-2">{totalBiodata}</p>
                </div>

                {/* Boys Biodata */}
                <div className="bg-blue-500 shadow-md rounded-full p-6 text-center">
                    <h3 className="text-2xl font-semibold text-white">Boys Biodata</h3>
                    <p className="text-4xl font-bold mt-2">{boysCount}</p>
                </div>

                {/* Girls Biodata */}
                <div className="bg-pink-500 shadow-md rounded-full p-6 text-center">
                    <h3 className="text-2xl font-semibold text-white">Girls Biodata</h3>
                    <p className="text-4xl font-bold mt-2">{girlsCount}</p>
                </div>

                {/* Marriages Completed */}
                <div className="bg-purple-500 shadow-md rounded-full p-6 text-center col-span-1 md:col-span-3">
                    <h3 className="text-2xl font-semibold text-white">
                        Marriages Completed
                    </h3>
                    <p className="text-4xl font-bold mt-2">{marriagesCompleted}</p>
                </div>
            </div>
        </div>
    );
};

export default SuccessCounter;

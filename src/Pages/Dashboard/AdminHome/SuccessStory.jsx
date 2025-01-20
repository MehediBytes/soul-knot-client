import { Helmet } from "react-helmet-async";
import UseStory from "../../../Hooks/UseStory";
import { useState } from "react";
import { GrView } from "react-icons/gr";

const SuccessStory = () => {

    const [stories, storiesLoading] = UseStory();
    console.log(stories);
    const [showModal, setShowModal] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);

    // Open modal and set the selected story to be viewed
    const handleViewStory = (story) => {
        setSelectedStory(story);
        setShowModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedStory(null);
    };


    if (storiesLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <Helmet>
                <title>Success-Stories | Soul-Knot</title>
            </Helmet>
            <div>
                <h3 className="text-2xl font-bold text-pink-500 text-center">Success Stories</h3>
                <div className="overflow-x-auto mt-5">
                    <table className="w-full table-auto">
                        <thead className="bg-white">
                            <tr>
                                <th className="p-4 border border-gray-300 text-center">Reviewer Biodata ID</th>
                                <th className="p-4 border border-gray-300 text-center">Reviewer Partner Biodata ID</th>
                                <th className="p-4 border border-gray-300 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stories.map((story) => (
                                <tr key={story._id} className="border-b">
                                    <td className="p-4 border border-gray-300 text-center">{story.selfBiodataId}</td>
                                    <td className="p-4 border border-gray-300 text-center">{story.partnerBiodataId
                                    }</td>
                                    <td className="p-4 border border-gray-300 text-center">
                                        <button
                                            onClick={() => handleViewStory(story)}
                                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                        >
                                            <GrView />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Tailwind Modal for Viewing Story */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-5 rounded-lg w-96">
                            <div>
                                <img className="rounded-full w-80 h-80 mx-auto object-cover" src={selectedStory?.coupleImage} alt="" />
                            </div>
                            <div>
                                <h3 className="my-4">Marriage Date: {selectedStory?.marriageDate}</h3>
                                <p>Story: {selectedStory?.review}</p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuccessStory;
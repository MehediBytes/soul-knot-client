import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UseStory from "../../../../Hooks/UseStory";

const SuccessStories = () => {
    const [stories, loading] = UseStory();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    // Sort stories by marriageDate in accecending to descending order
    const sortedStories = [...stories].sort((a, b) => new Date(b.marriageDate) - new Date(a.marriageDate));

    return (
        <section className="container mx-auto px-8 my-10">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Success Stories</h2>
                <p className="text-gray-600 mb-5">
                    Read the heartwarming stories of couples who found their soulmate on Soul-Knot.
                </p>
                <div className="flex gap-6 overflow-x-scroll pb-5">
                    {sortedStories.map((story) => (
                        <div
                            key={story._id}
                            className="flex-shrink-0 w-64 p-5 bg-white rounded-lg shadow-md"
                        >
                            <div className="mb-4">
                                <img
                                    src={story.coupleImage}
                                    alt="Couple"
                                    className="w-40 mx-auto h-40 object-cover rounded-full"
                                />
                            </div>
                            <p className="text-gray-500 text-sm mb-2">Married on: {story.marriageDate}</p>
                            <div className="flex justify-center items-center mb-4">
                                {Array.from({ length: 5 }, (_, index) => {
                                    const starValue = index + 1;
                                    if (story.reviewStar >= starValue) {
                                        return <FaStar key={index} className="text-pink-500" />;
                                    } else if (
                                        story.reviewStar > starValue - 1 &&
                                        story.reviewStar < starValue
                                    ) {
                                        return (
                                            <FaStarHalfAlt key={index} className="text-pink-500" />
                                        );
                                    } else {
                                        return <FaRegStar key={index} className="text-gray-400" />;
                                    }
                                })}
                            </div>
                            <p className="text-gray-700 mb-4">{story.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;

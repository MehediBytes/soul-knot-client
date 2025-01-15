import Slider from "react-slick";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"


const SuccessStories = () => {
    const stories = [
        {
            id: 1,
            coupleImage: "https://i.ibb.co.com/5Y6pknm/Khan-2492.jpg", // Replace with actual image URLs
            marriageDate: "2023-12-15",
            reviewStar: 4.5,
            storyText: "Soul-Knot helped us find each other, and it's been the happiest journey ever!",
        },
        {
            id: 2,
            coupleImage: "https://i.ibb.co.com/4N3Ljmw/speaker-1.jpg",
            marriageDate: "2023-11-20",
            reviewStar: 5,
            storyText: "Thank you, Soul-Knot, for making our dreams come true!",
        },
        {
            id: 3,
            coupleImage: "https://i.ibb.co.com/1rqhjJS/tutor-8-3.jpg",
            marriageDate: "2023-10-05",
            reviewStar: 4,
            storyText: "We are so grateful for this platform. It was truly a life-changer for us.",
        },
        {
            id: 4,
            coupleImage: "https://i.ibb.co.com/0CtdrXx/rs.jpg",
            marriageDate: "2023-09-18",
            reviewStar: 5,
            storyText: "Our soulmate journey started with Soul-Knot, and we couldn't be happier!",
        },
        {
            id: 5,
            coupleImage: "https://i.ibb.co.com/3BHNB7g/jofra.jpg",
            marriageDate: "2023-08-12",
            reviewStar: 4.5,
            storyText: "We met our life partners thanks to Soul-Knot! Grateful for the connections!",
        },
        {
            id: 6,
            coupleImage: "https://i.ibb.co.com/gm9bZ0K/Kane-Williamson-1024x768.webp",
            marriageDate: "2023-07-30",
            reviewStar: 5,
            storyText: "We never thought we would find our perfect match, but Soul-Knot made it possible!",
        },
    ];

    // Settings for the slick carousel
    const settings = {

        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="max-w-7xl mx-auto px-8 mt-5 mb-10">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Success Stories
                </h2>
                <p className="text-gray-600 mb-5">
                    Read the heartwarming stories of couples who found their soulmate on
                    Soul-Knot.
                </p>

                <div className="bg-white rounded-lg">
                    <Slider className="" {...settings}>
                        {stories.map((story) => (
                            <div
                                key={story.id}
                                className="p-5"
                            >
                                <div className="mb-4">
                                    <img
                                        src={story.coupleImage}
                                        alt="Couple"
                                        className="w-40 mx-auto h-40 object-cover rounded-full"
                                    />
                                </div>

                                {/* Marriage Date */}
                                <p className="text-gray-500 text-sm mb-2">
                                    Married on: {new Date(story.marriageDate).toLocaleDateString()}
                                </p>

                                {/* Review Star */}
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

                                {/* Success Story Text */}
                                <p className="text-gray-700 mb-4">{story.storyText}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;

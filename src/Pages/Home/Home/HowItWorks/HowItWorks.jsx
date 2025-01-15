import { FaUserPlus, FaSearch, FaHeart, FaHandshake } from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            icon: <FaUserPlus className="text-pink-500 text-4xl" />,
            title: "Sign Up",
            description: "Create your profile in just a few minutes and let us know your preferences.",
        },
        {
            id: 2,
            icon: <FaSearch className="text-pink-500 text-4xl" />,
            title: "Search Profiles",
            description: "Browse through hundreds of profiles and find the perfect match for you.",
        },
        {
            id: 3,
            icon: <FaHeart className="text-pink-500 text-4xl" />,
            title: "Connect",
            description: "Express interest and start chatting with your potential match.",
        },
        {
            id: 4,
            icon: <FaHandshake className="text-pink-500 text-4xl" />,
            title: "Build Your Bond",
            description: "Take your relationship to the next level with trust and compatibility.",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto my-5">
            <div className="text-center px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">How It Works</h2>
                <p className="text-gray-600 mb-5">
                    Discover your soulmate with Soul-Knot in just four simple steps.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="bg-white p-5 rounded-lg shadow hover:shadow-xl transition text-center"
                        >
                            <div className="mb-4 flex items-center justify-center">{step.icon}</div>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>

                {/* TOD: if the user login then showing the button your dashboard if not then link them to log in page */}
                <div className="mt-5">
                    <button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700">
                        Get Started Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

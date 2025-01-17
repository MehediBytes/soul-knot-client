import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="pb-5">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading Section */}
                <motion.h1
                    className="text-3xl font-bold text-pink-500 text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    About Us
                </motion.h1>

                {/* Intro Section */}
                <motion.p
                    className="text-gray-700 text-lg mb-6 text-center"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Welcome to our Matrimony platform, a space where meaningful connections are
                    made, and life-long bonds are formed. We understand that finding the right
                    partner is one of life’s most important journeys, and we’re here to make it
                    seamless and enjoyable.
                </motion.p>

                {/* Mission Section */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h2 className="text-2xl font-semibold text-pink-500 mb-4">
                        Our Mission
                    </h2>
                    <p className="text-gray-700 text-lg">
                        Our mission is to connect individuals based on shared values, preferences,
                        and aspirations. We aim to provide a trusted platform where users can find
                        companionship, love, and happiness. With advanced technology and
                        personalized recommendations, we bring people closer together.
                    </p>
                </motion.div>

                {/* Why Choose Us Section */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <h2 className="text-2xl font-semibold text-pink-500 mb-4">
                        Why Choose Us?
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
                        <li>Advanced matchmaking algorithms for compatibility.</li>
                        <li>User-friendly interface for a seamless experience.</li>
                        <li>Comprehensive profiles to ensure authenticity.</li>
                        <li>Commitment to privacy and security for all users.</li>
                        <li>Dedicated support team to assist at every step.</li>
                    </ul>
                </motion.div>

                {/* Our Vision Section */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <h2 className="text-2xl font-semibold text-pink-500 mb-4">
                        Our Vision
                    </h2>
                    <p className="text-gray-700 text-lg">
                        We envision a world where everyone can find their perfect match, building
                        relationships that stand the test of time. By fostering a supportive
                        community, we aim to make the journey of finding a life partner a joyous
                        and memorable one.
                    </p>
                </motion.div>

                {/* Closing Section */}
                <motion.p
                    className="text-center text-gray-700 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    Thank you for trusting us to be part of your journey. Let’s create a beautiful
                    story together!
                </motion.p>
            </div>
        </div>
    );
};

export default About;

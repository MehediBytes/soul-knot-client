
const BlogAdvice = () => {

    const blogs = [
        {
            title: "Top 5 Tips for Finding Your Perfect Match",
            date: "Feb 10, 2025",
            description: "Finding the right partner takes time. Here are five proven strategies to help you find your perfect match.",
            image: "https://i.ibb.co.com/Xxj7sb8k/man-963182-1280.jpg",
        },
        {
            title: "How to Start a Meaningful Conversation",
            date: "Feb 01, 2025",
            description: "Breaking the ice can be tough. Learn how to start conversations that lead to real connections.",
            image: "https://i.ibb.co.com/qM3rjR0R/couple-7433499-1280.jpg",
        },
        {
            title: "Online Dating Safety Tips",
            date: "January 5, 2025",
            description: "Stay safe while searching for love online. Follow these essential safety tips to protect yourself.",
            image: "https://i.ibb.co.com/RT0S6yBF/love-4888774-1280.jpg",
        },
        {
            title: "Red Flags to Watch Out for in a Relationship",
            date: "December 15, 2024",
            description: "Not all relationships are healthy. Learn about red flags to avoid toxic relationships and ensure emotional well-being.",
            image: "https://i.ibb.co.com/ZpMhb0fc/flag-7081789-1280.jpg",
        },
        {
            title: "The Science Behind Love: What Makes Relationships Last?",
            date: "December 2, 2024",
            description: "Discover the psychological and biological factors that contribute to long-lasting relationships.",
            image: "https://i.ibb.co.com/wh2LKGWQ/couple-1845108-1280.jpg",
        },
        {
            title: "How to Overcome Heartbreak and Move On",
            date: "April 15, 2024",
            description: "Breakups are tough, but healing is possible. Learn practical steps to recover and find happiness again.",
            image: "https://i.ibb.co.com/C3jzwW1R/nature-3401886-1280.jpg",
        },
        {
            title: "Why Communication is the Key to a Healthy Relationship",
            date: "June 25, 2024",
            description: "Strong relationships are built on communication. Discover how to express yourself and truly listen to your partner.",
            image: "https://i.ibb.co.com/PG5qXktd/mobile-605422-1280.jpg",
        },
        {
            title: "The Role of Trust in Building a Strong Relationship",
            date: "May 5, 2024",
            description: "Trust is the foundation of any successful relationship. Learn how to build and maintain trust with your partner.",
            image: "https://i.ibb.co.com/ymMYmksZ/couple-347220-1280.jpg",
        }
    ];

    return (
        <section className="py-5">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Blog & Relationship Advice</h2>
                <p className="text-gray-600 mb-5">Get expert tips on relationships, dating, and making meaningful connections.</p>

                {/* Blog Cards (Scrollable) */}
                <div className="overflow-x-scroll pb-5">
                    <div className="flex space-x-4 ">
                        {blogs.map((blog, index) => (
                            <div key={index} className="w-72 bg-white rounded-lg shadow-md overflow-hidden flex-none">
                                <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
                                <div className="">
                                    <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                                    <p className="text-gray-500 text-sm">{blog.date}</p>
                                    <p className="text-gray-700 mt-2">{blog.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogAdvice;

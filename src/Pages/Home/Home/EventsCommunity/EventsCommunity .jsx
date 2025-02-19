const EventsCommunity = () => {
    const events = [
        {
            title: "Virtual Matchmaking Meetup",
            date: "November 10, 2025",
            time: "6:00 PM - 8:00 PM (GMT)",
            description: "Join our exclusive online matchmaking event and meet potential matches in a friendly environment.",
            image: "https://i.ibb.co.com/VWN9TCq0/meetup-243206-1280.jpg",
        },
        {
            title: "Soul-Kont Annual Gala",
            date: "December 25, 2025",
            time: "7:00 PM - 11:00 PM (GMT)",
            description: "A grand event to connect with singles, hear success stories, and enjoy a luxurious evening.",
            image: "https://i.ibb.co.com/rSb22nj/gala-dinner-3884732-1280.jpg",
        },
        {
            title: "Relationship Webinar",
            date: "December 10, 2025",
            time: "5:00 PM - 6:30 PM (GMT)",
            description: "Expert advice on building lasting relationships and choosing the right life partner.",
            image: "https://i.ibb.co.com/1F0PPcW/couple-6518232-1280.jpg",
        },
    ];

    return (
        <section className="py-5">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-pink-500 mb-6">Events & Community</h2>
                <p className="text-gray-600 mb-10">
                    Stay connected with our community through exciting events and informative webinars.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {events.map((event, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl">
                            <img src={event.image} alt={event.title} className="w-full h-52 object-cover" />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                                <p className="text-gray-600 text-sm">{event.date} | {event.time}</p>
                                <p className="text-gray-700 mt-2">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventsCommunity;

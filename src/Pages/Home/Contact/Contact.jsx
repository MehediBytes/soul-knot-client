import emailjs from 'emailjs-com';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { MdLocationPin } from 'react-icons/md';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const sendEmail = async (e) => {
        e.preventDefault();

        try {
            const result = await emailjs.sendForm(
                'service_yc30tsb',
                'template_phbh4vg',
                e.target,
                'Py0rW7WoFLw61Yn7n'
            );
            if (result) {
                Swal.fire({
                    icon: 'success',
                    title: 'Email Sent',
                    text: 'Your email has been sent successfully!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            }
            setFormData({
                name: '',
                email: '',
                message: ''
            });

            e.target.reset();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error Sending Message',
                text: `There was an error sending your message: ${error.text || 'Unknown error'}.`,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Retry'
            });

            console.error('Email.js error:', error);
        }
    };


    return (
        <div className="container mx-auto px-4 pb-5">
            <Helmet>
                <title>Contact-Us | Soul-Knot</title>
            </Helmet>
            <div className='text-center pb-5'>
                <h2 className="text-3xl font-bold text-pink-500">Contact Us</h2>
            </div>
            <div className='md:flex md:justify-between md:flex-grow gap-5'>
                <form onSubmit={sendEmail} className="space-y-4 md:w-full">
                    <div>
                        <label htmlFor="name" className="block text-lg font-semibold mb-2">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder='Write Your Name'
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Write Your Email Address'
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-lg font-semibold mb-2">Message:</label>
                        <textarea
                            name="message"
                            id="message"
                            placeholder='Write Message Here...'
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            rows="4"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-pink-500 text-white hover:bg-pink-700 w-full mt-4 px-4 py-2 rounded-full"
                    >
                        Send Email
                    </button>
                </form>

                <div className="mt-5 md:w-full md:place-items-end text-gray-950">
                    <div>
                        <h3 className="text-2xl font-semibold mb-5">Contact Information</h3>
                        <div className="flex items-center mt-3">
                            <MdLocationPin className="text-green-500 text-2xl mr-3" />
                            <p className="text-lg">Kushtia, Bangladesh</p>
                        </div>
                        {/* Email link with redirect to Gmail */}
                        <div className="flex items-center mt-3">
                            <FaEnvelope className="text-blue-500 text-2xl mr-3" />
                            <a
                                href="mailto:mehedi.m000@gmail.com"
                                className="text-lg"
                            >
                                mehedi.m000@gmail.com
                            </a>
                        </div>
                        {/* WhatsApp link with redirect to WhatsApp */}
                        <div className="flex items-center text-2xl mt-3">
                            <FaWhatsapp className="text-green-700 mr-3" />
                            <a
                                href="https://wa.me/8801303587085"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg"
                            >
                                +880-1303587085
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

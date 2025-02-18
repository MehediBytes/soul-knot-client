import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-pink-500 text-white py-5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Column 1 */}
                    <div>
                        <h2 className="text-2xl font-bold">Soul-Knot</h2>
                        <p>
                            Connecting hearts and building lifelong partnerships.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <ul className="space-y-1">
                            <li><a href="/" className="hover:text-pink-800 transition">Home</a></li>
                            <li><a href="/about" className="hover:text-pink-800 transition">About Us</a></li>
                            <li><a href="/contact" className="hover:text-pink-800 transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex justify-center md:justify-start space-x-4 text-white">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-pink-700 transition text-2xl">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-700 transition text-2xl">
                                <FaInstagram />
                            </a>
                            <a href="https://x.com/" target="_blank" rel="noreferrer" className=" hover:text-pink-700 transition text-2xl">
                                <FaXTwitter />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className=" hover:text-pink-700 transition text-2xl">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-white" />

                <div className="text-center">
                    <p className="text-white">
                        © {new Date().getFullYear()} Soul-Knot. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

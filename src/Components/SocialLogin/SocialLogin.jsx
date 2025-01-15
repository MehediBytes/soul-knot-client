import { FaGoogle } from "react-icons/fa6";

const SocialLogin = () => {
    return (
        <div>
            <button
                className="bg-pink-500 font-semibold text-white py-2 px-10 w-full rounded-md hover:bg-pink-700 flex items-center gap-2 justify-center"
            >
                <FaGoogle></FaGoogle>
                <p>Login with Google</p>
            </button>
        </div>
    );
};

export default SocialLogin;
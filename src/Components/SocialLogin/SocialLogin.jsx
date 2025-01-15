import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {

    const { googleSignIn, setUser } = useAuth();
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            setUser(result.user)
            navigate(from, { replace: true });
        })
    }

    return (
        <div>
            <button onClick={handleGoogleSignIn}
                className="bg-pink-500 font-semibold text-white py-2 px-10 w-full rounded-md hover:bg-pink-700 flex items-center gap-2 justify-center"
            >
                <FaGoogle></FaGoogle>
                <p>Login with Google</p>
            </button>
        </div>
    );
};

export default SocialLogin;
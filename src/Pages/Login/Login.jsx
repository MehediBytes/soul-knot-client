import { useForm } from "react-hook-form";
import loginAnime from '../../assets/login-anime.png';
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
    const { signIn, showPassword, setShowPassword } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                user & Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Loged in successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })

    };

    return (
        <div className="md:flex md:items-center md:justify-between md:gap-10 container mx-auto px-5">
            <Helmet>
                <title>Login | Soul-Knot</title>
            </Helmet>
            <div className="md:w-1/2">
                <img src={loginAnime} className="w-full md:h-full h-72" alt="" />
            </div>
            <div className="p-5 flex items-center justify-center md:w-1/2">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full"
                >
                    <h2 className="text-3xl font-bold text-center mb-6">Login Now!</h2>
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required" })}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                            <button type="button" className="absolute right-5 top-3" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-pink-500 font-semibold text-white py-2 px-10 w-full rounded-md hover:bg-pink-700"
                    >
                        Login
                    </button>
                    <p className="text-center my-5 font-semibold">OR</p>
                    <SocialLogin></SocialLogin>
                    <p className="text-sm mt-6 text-center">
                        Do not have an account?{" "}
                        <Link to="/signup" className="text-purple-500 font-bold hover:underline">
                            Register here.
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;

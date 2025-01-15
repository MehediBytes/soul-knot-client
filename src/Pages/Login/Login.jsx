import { useForm } from "react-hook-form";
import loginAnime from '../../assets/login-anime.png';
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { Link } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async () => {
        try {
            // 
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="md:flex md:items-center md:justify-between md:gap-10 container mx-auto px-5">
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
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-pink-500 font-semibold text-white py-2 px-10 w-full rounded-md hover:bg-pink-700"
                    >
                        Login
                    </button>
                    <p className="text-center my-5">OR</p>
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

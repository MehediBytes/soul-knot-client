// import { useForm } from 'react-hook-form';
// import signUpAnime from '../../assets/signUp-anime.png'
// import SocialLogin from '../../Components/SocialLogin/SocialLogin';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import useAuth from '../../Hooks/useAuth';
// import Swal from 'sweetalert2';
// import useAxiosPublic from '../../Hooks/UseAxiosPublic';

// const SignUp = () => {
//     const axiosPublic = useAxiosPublic();
//     const { createUser, updateUserProfile, setUser } = useAuth();
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || "/";

//     const onSubmit = (data) => {
//         createUser(data.email, data.password)
//             .then(result => {
//                 const loggedUser = result.user;
//                 console.log(loggedUser);
//                 setUser(loggedUser);
//                 updateUserProfile(data?.name, data?.photoURL, data?.memberType)
//                     .then(() => {
//                         const userInfo = {
//                             name: data.name,
//                             email: data.email,
//                             photo: data.photoURL,
//                             memberType: "standard"
//                         }
//                         axiosPublic.post('/users', userInfo)
//                             .then(res => {
//                                 if (res.data.insertedId) {
//                                     console.log('user added to the database')
//                                     reset();
//                                     Swal.fire({
//                                         position: 'top-end',
//                                         icon: 'success',
//                                         title: 'User created successfully.',
//                                         showConfirmButton: false,
//                                         timer: 1500
//                                     });
//                                     navigate(from, { replace: true });
//                                 }
//                             })
//                     })
//                     .catch(error => console.log(error))
//             })
//     };

//     return (
//         <div className="md:flex md:items-center md:justify-between md:gap-10 container mx-auto px-5">
//             <div className='md:w-1/2'>
//                 <img src={signUpAnime} className='w-full md:h-full h-80' alt="" />
//             </div>
//             <div className="flex items-center justify-center md:w-1/2">
//                 <form
//                     onSubmit={handleSubmit(onSubmit)}
//                     className="w-full p-6"
//                 >
//                     <h2 className="text-3xl font-bold text-center mb-6">Sign Up now!</h2>
//                     <div className="mb-4">
//                         <label className="block mb-1">Name</label>
//                         <input
//                             type="text"
//                             {...register("name", { required: "Name is required" })}
//                             className="w-full px-4 py-2 border rounded-md"
//                         />
//                         {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//                     </div>
//                     <div className="mb-4">
//                         <label className="block mb-1">Photo URL</label>
//                         <input
//                             type="text"
//                             {...register("photoURL", { required: "Photo URL is required" })}
//                             className="w-full px-4 py-2 border rounded-md"
//                         />
//                         {errors.photoURL && <p className="text-red-500 text-sm">{errors.photoURL.message}</p>}
//                     </div>
//                     <div className="mb-4">
//                         <label className="block mb-1">Email</label>
//                         <input
//                             type="email"
//                             {...register("email", { required: "Email is required" })}
//                             className="w-full px-4 py-2 border rounded-md"
//                         />
//                         {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//                     </div>
//                     <div className="mb-4">
//                         <label className="block mb-1">Password</label>
//                         <input
//                             type="password"
//                             {...register("password", {
//                                 required: "Password is required",
//                                 pattern: {
//                                     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
//                                     message: "Password must include at least one uppercase letter, one lowercase letter, and one number",
//                                 },
//                             })}
//                             className="w-full px-4 py-2 border rounded-md"
//                         />
//                         {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//                     </div>
//                     <button
//                         type="submit"
//                         className="bg-pink-500 font-semibold text-white py-2 px-10 w-full rounded-md hover:bg-pink-700"
//                     >
//                         Sign Up
//                     </button>
//                     <p className="text-center my-5 font-semibold">OR</p>
//                     <SocialLogin></SocialLogin>
//                     <p className="text-sm mt-6 text-center">
//                         Already have an account?{" "}
//                         <Link to="/login" className="text-purple-500 font-bold hover:underline">
//                             Log in here.
//                         </Link>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUp;

import { useForm } from "react-hook-form";
import signUpAnime from "../../assets/signUp-anime.png";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile, setUser } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const onSubmit = async (data) => {
        try {
            // Prepare FormData for image upload
            const formData = new FormData();
            formData.append("image", data.photoURL[0]);

            // Upload image to image hosting API
            const imgResponse = await axios.post(image_hosting_api, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const imgResult = imgResponse.data;

            if (!imgResult.success) {
                Swal.fire("Error", "Image upload failed", "error");
                return;
            }

            // Get the image URL
            const imgUrl = imgResult.data.display_url;

            // Create user with email and password
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;

            // Update user profile
            await updateUserProfile(data.name, imgUrl, "standard");
            setUser(loggedUser);

            // Save user to the database
            const userInfo = {
                name: data.name,
                email: data.email,
                photo: imgUrl,
                memberType: "standard",
            };

            const res = await axiosPublic.post("/users", userInfo);
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong. Please try again.", "error");
        }
    };

    return (
        <div className="md:flex md:items-center md:justify-between md:gap-10 container mx-auto px-5">
            <Helmet>
                <title>Signup | Soul-Knot</title>
            </Helmet>
            <div className="md:w-1/2">
                <img src={signUpAnime} className="w-full md:h-full h-80" alt="" />
            </div>
            <div className="flex items-center justify-center md:w-1/2">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full p-6"
                >
                    <h2 className="text-3xl font-bold text-center mb-6">Sign Up now!</h2>
                    <div className="mb-4">
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Photo</label>
                        <input
                            type="file"
                            {...register("photoURL", { required: "Photo is required" })}
                            className="px-4 py-2"
                        />
                        {errors.photoURL && <p className="text-red-500 text-sm">{errors.photoURL.message}</p>}
                    </div>
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
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                    message: "Password must include at least one uppercase letter, one lowercase letter, and one number",
                                },
                            })}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-pink-500 font-semibold text-white py-2 px-10 w-full rounded-md hover:bg-pink-700"
                    >
                        Sign Up
                    </button>
                    <p className="text-center my-5 font-semibold">OR</p>
                    <SocialLogin></SocialLogin>
                    <p className="text-sm mt-6 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-purple-500 font-bold hover:underline">
                            Log in here.
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseBiodata from "../../../Hooks/UseBiodata";
import useAuth from "../../../Hooks/useAuth";
import UseStory from "../../../Hooks/UseStory";

const GotMarried = () => {
    const [uploading, setUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [allBiodata, loading] = UseBiodata();
    const [stories, storiesLoading, storiesRefetch] = UseStory();
    const { user } = useAuth();
    const [userBio, setUserBio] = useState(null);
    const [userStory, setUserStory] = useState(null);
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    useEffect(() => {
        if (allBiodata) {
            const userBiodata = allBiodata.find(item => item.contactEmail === user?.email);
            if (userBiodata) {
                setUserBio(userBiodata);
                reset(userBiodata);
            }
        }
    }, [allBiodata, user?.email, reset]);

    useEffect(() => {
        if (stories) {
            const userOwnStory = stories.find(item => item?.selfBiodataId == userBio?.biodataId);
            if (userOwnStory) {
                setUserStory(userOwnStory);
                reset(userOwnStory)
            }
        }
    }, [stories, userBio?.biodataId, reset]);

    const onSubmit = async (data) => {
        if (!data.partnerBiodataId || !data.review || !data.coupleImage[0] || !data.marriageDate) {
            Swal.fire("Error", "Please fill in all required fields.", "error");
            return;
        }
        console.log(data);

        // Image upload to imgbb
        const imageFile = data.coupleImage[0];
        const formData = new FormData();
        formData.append("image", imageFile);
        setUploading(true);

        try {
            // Upload image to image hosting API
            const imgbbResponse = await axios.post(image_hosting_api, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const imgResult = imgbbResponse.data;

            if (imgResult.success) {
                const storyData = {
                    selfBiodataId: data.selfBiodataId,
                    partnerBiodataId: data.partnerBiodataId,
                    coupleImage: imgResult.data.display_url,
                    reviewStar: data.reviewStar,
                    review: data.review,
                    marriageDate: data.marriageDate,
                };

                // Submit the story to the backend
                if (userStory) {
                    // Update existing story
                    await axiosSecure.patch(`/success-stories/${userStory._id}`, storyData);
                    Swal.fire("Success", "Story updated successfully!", "success");
                } else {
                    // Create new story
                    await axiosSecure.post("/success-stories", storyData);
                    Swal.fire("Success", "Story created successfully!", "success");
                }
            } else {
                Swal.fire("Error", "Image upload failed.", "error");
            }
            storiesRefetch();
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong.", "error");
        } finally {
            setUploading(false);
        }
    };

    if (loading || storiesLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Married | Soul-Knot</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-center text-pink-500 mb-6">
                {userStory ? "Edit Your Story" : "Create Your Story"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Self bioadat id */}
                <div className="mb-4">
                    <label className="block mb-2">Self Biodata ID</label>
                    <input
                        {...register("selfBiodataId")}
                        className="w-full mb-4 p-2 border rounded-md bg-gray-200 cursor-not-allowed"
                        defaultValue={userBio?.biodataId}
                        readOnly
                    />
                </div>
                {/* partner bioadat id */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Partner Biodata ID</label>
                    <input
                        type="number"
                        {...register("partnerBiodataId", {
                            required: "Partner Biodata ID is required",
                            validate: (value) => {
                                if (value < 1) {
                                    return "biodata ID must be at least 1";
                                }
                                return true;
                            },
                        })}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    {errors.partnerBiodataId && (
                        <p className="text-red-500 text-sm mt-1">{errors.partnerBiodataId.message}</p>
                    )}
                </div>
                {/* Marriage date */}
                <label className="block mb-2">Date of Birth</label>
                <input
                    type="date"
                    {...register("marriageDate", { required: "Marriage Date is required" })}
                    className="w-full mb-4 p-2 border rounded-md"
                />
                {errors.marriageDate && <span className="text-red-500">{errors.marriageDate.message}</span>}
                {/* ratings */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Ratings</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        {...register("reviewStar", {
                            required: "Ratings are required",
                            validate: (value) => {
                                if (value > 5) {
                                    return "Ratings must be at most 5";
                                }
                                if (value < 1) {
                                    return "Ratings must be at least 1";
                                }
                                return true;
                            },
                        })}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    {errors.reviewStar && (
                        <p className="text-red-500 text-sm mt-1">{errors.reviewStar.message}</p>
                    )}
                </div>

                {/* Couple image  */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Couple Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("coupleImage", { required: "Couple image is required" })}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    {errors.coupleImage && (
                        <p className="text-red-500 text-sm mt-1">{errors.coupleImage.message}</p>
                    )}
                </div>
                {/* Reviews or stories */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Success Story Review</label>
                    <textarea
                        {...register("review", { required: "Review is required" })}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-md"
                    ></textarea>
                    {errors.review && (
                        <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-700 flex justify-center items-center"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default GotMarried;

import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import UseBiodata from "../../../Hooks/UseBiodata";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const EditBiodata = () => {
    const { user } = useAuth();
    const [allBiodata, loading, refetch] = UseBiodata();
    const [biodata, setBiodata] = useState(null);
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (allBiodata) {
            const userBiodata = allBiodata.find(item => item.contactEmail === user.email);
            if (userBiodata) {
                setBiodata(userBiodata);
                reset(userBiodata)
            }
        }
    }, [allBiodata, user.email, reset]);

    const onSubmit = (data) => {
        if (biodata) {
            // PATCH method: Update existing biodata
            axiosSecure.patch(`/biodata/${biodata._id}`, data)
                .then(response => {
                    if (response.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Biodata updated successfully.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    refetch();
                })
        } else {
            // patch method: update  biodata
            axiosSecure.post('/biodata', { ...data, memberType: "Standard" })
                .then(response => {

                    if (response.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: 'Biodata created successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    refetch();
                })
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-pink-500">
                {biodata ? "Edit Your Biodata" : "Create Your Biodata"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Biodata Type */}
                <label className="block mb-2">Biodata Type</label>
                <select
                    {...register("biodataType", { required: "Biodata type is required" })}
                    className="w-full mb-4 p-2 border rounded-md"
                >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors.biodataType && <span className="text-red-500">{errors.biodataType.message}</span>}

                {/* Name */}
                <label className="block mb-2">Name</label>
                <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full mb-4 p-2 border rounded-md"
                    placeholder="Full Name"
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}

                {/* Profile Image */}
                <label className="block mb-2">Profile Image Link</label>
                <input
                    {...register("profileImageLink", { required: "Profile image url is required" })}
                    className="w-full mb-4 p-2 border rounded-md"
                    placeholder="Profile Image URL"
                />
                {errors.profileImageLink && <span className="text-red-500">{errors.profileImageLink.message}</span>}

                {/* Date of Birth */}
                <label className="block mb-2">Date of Birth</label>
                <input
                    type="date"
                    {...register("dateOfBirth", { required: "Date Of Birth is required" })}
                    className="w-full mb-4 p-2 border rounded-md"
                />
                {errors.dateOfBirth && <span className="text-red-500">{errors.dateOfBirth.message}</span>}

                {/* Height */}
                <label className="block mb-2">Height</label>
                <select
                    {...register("height", { required: true })}
                    className="w-full mb-4 p-2 border rounded-md"
                >
                    <option value="">Select</option>
                    <option value={`5'0"`}>5</option>
                    <option value={`5'5"`}>5.5</option>
                    <option value={`6'0"`}>5.5</option>
                    <option value={`6'5"`}>5.5</option>
                    <option value={`7'0"`}>5.5</option>
                    <option value={`7'5"`}>5.5</option>
                    <option value={`8'0"`}>5.5</option>
                </select>
                {errors.height && <span className="text-red-500">Required</span>}

                {/* weight */}
                <label className="block mb-2">Weight</label>
                <select
                    {...register("weight", { required: true })}
                    className="w-full mb-4 p-2 border rounded-md"
                >
                    <option value="">Select</option>
                    <option value="40kg">40 kg</option>
                    <option value="50kg">50 kg</option>
                    <option value="60kg">60 kg</option>
                    <option value="70kg">70 kg</option>
                    <option value="80kg">80 kg</option>
                    <option value="90kg">90 kg</option>
                    <option value="100kg">100 kg</option>
                    <option value="110kg">110 kg</option>
                </select>
                {errors.weight && <span className="text-red-500">Required</span>}

                {/* age */}
                <label className="block mb-2">Age</label>
                <input
                    type="number"
                    {...register("age", { required: true })}
                    className="w-full mb-4 p-2 border rounded-md"
                    placeholder="Age"
                />
                {errors.age && <span className="text-red-500">Required</span>}

                {/* occupation */}
                <label className="block mb-2">Occupation</label>
                <select
                    {...register("occupation", { required: true })}
                    className="w-full mb-4 p-2 border rounded-md"
                >
                    <option value="">Select</option>
                    <option value="Businessman">Businessman</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Service Holder">Service Holder</option>
                    <option value="Designer">Designer</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Layer">Layer</option>
                    <option value="Entertainer">Entertainer</option>
                </select>
                {errors.occupation && <span className="text-red-500">Required</span>}

                {/* race */}
                <label className="block mb-2">Skin Tone</label>
                <select
                    {...register("race", { required: true })}
                    className="w-full mb-4 p-2 border rounded-md"
                >
                    <option value="">Select</option>
                    <option value="Fair">Fair</option>
                    <option value="Black">Black</option>
                    <option value="Brown">Brown</option>
                    <option value="Blonde">Blonde</option>
                    <option value="Tan">Tan</option>
                    <option value="Ebony">Ebony</option>
                </select>
                {errors.race && <span className="text-red-500">Required</span>}

                {/* fathersName */}
                <label className="block mb-2">Father Name</label>
                <input
                    {...register("fathersName", { required: true })}
                    className="w-full mb-4 p-2 border rounded-md"
                    placeholder="Father's Name"
                />
                {errors.fathersName && <span className="text-red-500">Required</span>}

                {/* mothersName */}
                <label className="block mb-2">Mother Name</label>
                <input
                    {...register("mothersName", { required: true })}
                    className="w-full mb-4 p-2 border rounded-md"
                    placeholder="Mother's Name"
                />
                {errors.mothersName && <span className="text-red-500">Required</span>}

                {/* permanentDivisionName */}
                <label className="block mb-2">Permanent Division Name</label>
                <select
                    {...register("permanentDivisionName", { required: true })}
                    className="w-full mb-4 p-2 border rounded-md"
                >
                    <option value="">Select</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattagram">Chattagram</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                </select>
                {errors.permanentDivisionName && <span className="text-red-500">Required</span>}

                {/* presentDivisionName */}
                <label className="block mb-2">Present Division Name</label>
                <select
                    {...register("presentDivisionName", { required: true })}
                    className="w-full mb-4 p-2 border rounded-md"
                >
                    <option value="">Select</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattagram">Chattagram</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                </select>
                {errors.presentDivisionName && <span className="text-red-500">Required</span>}

                {/* expectedPartnerAge */}
                <label className="block mb-2">Expected Partner Age</label>
                <input
                    type="number"
                    {...register("expectedPartnerAge", { required: true })}
                    className="w-full mb-4 p-2 border rounded-md"
                    placeholder="Expected Partner Age"
                />
                {errors.expectedPartnerAge && <span className="text-red-500">Required</span>}

                {/* expectedPartnerHeight */}
                <label className="block mb-2">Expected Partner Height</label>
                <select
                    {...register("expectedPartnerHeight", { required: true })}
                    className="w-full mb-4 p-2 border rounded-md"
                >
                    <option value="">Select</option>
                    <option value={`5'0"`}>5</option>
                    <option value={`5'5"`}>5.5</option>
                    <option value={`6'0"`}>5.5</option>
                    <option value={`6'5"`}>5.5</option>
                    <option value={`7'0"`}>5.5</option>
                    <option value={`7'5"`}>5.5</option>
                    <option value={`8'0"`}>5.5</option>
                </select>
                {errors.expectedPartnerHeight && <span className="text-red-500">Required</span>}

                {/* expectedPartnerWeight */}
                <label className="block mb-2">Expected Partner Weight</label>
                <select
                    {...register("expectedPartnerWeight", { required: true })}
                    className="w-full mb-4 p-2 border rounded-md"
                >
                    <option value="">Select</option>
                    <option value="40kg">40 kg</option>
                    <option value="50kg">50 kg</option>
                    <option value="60kg">60 kg</option>
                    <option value="70kg">70 kg</option>
                    <option value="80kg">80 kg</option>
                    <option value="90kg">90 kg</option>
                    <option value="100kg">100 kg</option>
                    <option value="110kg">110 kg</option>
                </select>
                {errors.expectedPartnerWeight && <span className="text-red-500">Required</span>}

                {/* Contact Email */}
                <label className="block mb-2">Contact Email</label>
                <input
                    type="email"
                    {...register("contactEmail")}
                    className="w-full mb-4 p-2 border rounded-md bg-gray-200 cursor-not-allowed"
                    value={user.email}
                    readOnly
                />

                {/* Mobile Number */}
                <label className="block mb-2">Mobile Number</label>
                <input
                    {...register("mobileNumber", { required: "Mobile number is required" })}
                    className="w-full mb-4 p-2 border rounded-md"
                    placeholder="Mobile Number"
                />
                {errors.mobileNumber && <span className="text-red-500">{errors.mobileNumber.message}</span>}

                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-700 mt-4"
                >
                    Save And Publish Now
                </button>
            </form>
        </div>
    );
};

export default EditBiodata;

import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import wellcome from "../../../assets/wellcome.webp";

const UserHome = () => {

    const { user } = useAuth();

    return (
        <div>
            <Helmet>
                <title>{user?.displayName}-Dashboard | Soul-Knot</title>
            </Helmet>
            <h2 className="text-4xl text-pink-500 text-center">
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
            <div className="mt-5 flex justify-center items-center">
                <img className="rounded-full w-96 h-96 object-cover" src={wellcome} alt="" />
            </div>
        </div>
    );
};

export default UserHome;
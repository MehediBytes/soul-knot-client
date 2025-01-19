import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {

    const { user } = useAuth();

    return (
        <div>
            <Helmet>
                <title>{user?.displayName}-Dashboard | Soul-Knot</title>
            </Helmet>
            <h2 className="text-4xl text-pink-500">
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
        </div>
    );
};

export default UserHome;
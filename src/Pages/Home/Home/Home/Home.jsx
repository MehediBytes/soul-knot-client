import PremiumProfiles from "../PremiumProfiles/PremiumProfiles";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import SuccessStories from "../SuccessStories/SuccessStories";
import SuccessCounter from "../SuccessCounter/SuccessCounter ";
import { Helmet } from "react-helmet-async";


const Home = () => {
    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Soul-Knot</title>
            </Helmet>
            <div className="-mt-5">
                <Banner></Banner>
            </div>
            <div>
                <PremiumProfiles></PremiumProfiles>
            </div>
            <div>
                <HowItWorks></HowItWorks>
            </div>
            <div>
                <SuccessCounter></SuccessCounter>
            </div>
            <div>
                <SuccessStories></SuccessStories>
            </div>
        </div>
    );
};

export default Home;
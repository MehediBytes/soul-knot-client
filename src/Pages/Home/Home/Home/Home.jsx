import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import SuccessStories from "../SuccessStories/SuccessStories";


const Home = () => {
    return (
        <div className="container mx-auto">
            <div className="-mt-5">
                <Banner></Banner>
            </div>
            <div>
                <h3>premium customer section</h3>
            </div>
            <div>
                <HowItWorks></HowItWorks>
            </div>
            <div>
                <h3>success counter section is here...</h3>
            </div>
            <div>
                <SuccessStories></SuccessStories>
            </div>
        </div>
    );
};

export default Home;
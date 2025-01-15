import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";


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
        </div>
    );
};

export default Home;
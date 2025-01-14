import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
    return (
        <div>
            {/* Nvabar section */}
            <section>
                <Navbar></Navbar>
            </section>

            {/* outlets */}
            <section className="min-h-screen pt-20">
                <Outlet></Outlet>
            </section>

            {/* Footer section */}
            <section>
                <Footer></Footer>
            </section>

        </div>
    );
};

export default Main;
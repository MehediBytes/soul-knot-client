import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {

    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');

    return (
        <div>
            {/* Nvabar section */}
            {noHeaderFooter ||
                <section>
                    <Navbar></Navbar>
                </section>
            }

            {/* outlets */}
            {noHeaderFooter ?
                <section className="min-h-screen">
                    <Outlet></Outlet>
                </section> :
                <section className="min-h-screen pt-20">
                    <Outlet></Outlet>
                </section>
            }

            {/* Footer section */}
            {noHeaderFooter ||
                <section>
                    <Footer></Footer>
                </section>
            }

        </div>
    );
};

export default Main;
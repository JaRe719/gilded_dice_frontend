import { Outlet } from "react-router-dom";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";

export default function Layout() {
    return (
        <>
            <div>
                {/* <Navbar /> */}
                <main
                    role="main"
                >
                    <Outlet />
                </main>
                {/* <Footer /> */}
            </div>
        </>
    );
}
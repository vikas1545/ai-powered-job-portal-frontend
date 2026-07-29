
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../MainLayout";
import Home from "../../components/Home";

function PageRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    {/* <Route path='/' element={<HeroSection/>} /> */}
                    <Route path='/' element={<Home/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes;
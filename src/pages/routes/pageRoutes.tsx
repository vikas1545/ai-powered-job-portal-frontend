
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../MainLayout";
import Home from "../../components/Home";
import About from "../../components/About";

function PageRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home/>} />
                    <Route path='/about' element={<About/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes;
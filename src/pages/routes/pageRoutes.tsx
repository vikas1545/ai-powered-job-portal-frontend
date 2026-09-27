
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../MainLayout";
import Home from "../../components/Home";
import About from "../../components/About";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Account from "../Account/Account";
import SpecificCompany from "../Account/SpecificCompany";
import ForgotPassword from "../Login/ForgotPassword";
import ResetPassword from "../Login/ResetPassword";

function PageRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/forgot' element={<ForgotPassword />} />
                    <Route path='/reset/:token' element={<ResetPassword />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/account/:id' element={<Account />} />
                    <Route path='/company/:id' element={<SpecificCompany />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes;
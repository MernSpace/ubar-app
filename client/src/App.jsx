import React, { Fragment } from 'react';
import { getToken } from "./helper/SessionHelper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import FullscreenLoader from "./components/MasterLayout/FullscreenLoader";
import LoginPage from "./pages/Users/LoginPage.jsx";
import RegistrationPage from "./pages/Users/RegistrationPage.jsx";
import SendOTPPage from "./pages/Users/SendOTPPage.jsx";
import VerifyOTPPage from "./pages/Users/VerifyOTPPage.jsx";
import CreatePasswordPage from "./pages/Users/CreatePasswordPage.jsx";
import ProfilePage from "./pages/Users/ProfilePage.jsx";
import Page404 from "./pages/NotFound/Page404.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import RiderPage from './pages/RiderPage/RiderPage.jsx';
import CheckoutPage from './pages/booking-checkout/Checkout-Page.jsx';
import DriverDashboard from './pages/DriverPage/DriverPage.jsx';


const App = () => {

    return (
        <Fragment>
            <BrowserRouter>
                <Routes>

                    <Route exact path="/Login" element={<LoginPage />} />
                    <Route exact path="/Registration" element={<RegistrationPage />} />
                    <Route exact path="/SendOTP" element={<SendOTPPage />} />
                    <Route exact path="/VerifyOTP" element={<VerifyOTPPage />} />
                    <Route exact path="/CreatePassword" element={<CreatePasswordPage />} />
                    <Route exact path='/rider-profile' element={<RiderPage />} />
                    <Route exact path="/driver-dashboard" element={<DriverDashboard />} />
                    <Route path="/checkout/:bookingId" element={<CheckoutPage />} />
                    <Route exact path="/Dashboard" element={<DashboardPage />} />
                    <Route exact path="/Profile" element={<ProfilePage />} />

                    {/*{for student}*/}

                    <Route path="/" element={<HomePage />} />

                    <Route path="*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>
            <FullscreenLoader />
        </Fragment>
    )


};
export default App;
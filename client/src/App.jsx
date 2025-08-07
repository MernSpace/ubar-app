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
import StudentCreateUpdatePage from "./pages/student/studentCreateUpdatePage.jsx";
import StudentListPage from "./pages/student/studentListPage.jsx";
import BalanceCreateUpdatePage from "./pages/BalancePage/BalanceCreateUpdate.jsx";
import BalanceListPage from "./pages/BalancePage/BalanceListPage.jsx";
import PrintBalancePage from "./pages/BalancePage/printBalancePage.jsx";
import PrintApplicationPage from "./pages/student/PrintApplication.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AdmissionPage from "./pages/Admission/AdmissionPage.jsx";
import UploadLogoPage from "./pages/Options/logo/UploadLogoPage.jsx";
import DisplayLogoPage from "./pages/Options/logo/DsiplayLogoPage.jsx";
import UploadCarouselPage from "./pages/Options/carousel/UploadCarouselPage..jsx";
import DisplayCarouselPage from "./pages/Options/carousel/DisplayCarouselPage.jsx";
import UploadInfoPage from "./pages/Options/info/UploadInfoPage.jsx";
import DisplayInfoPage from "./pages/Options/info/DisplayInfoPage.jsx";
import UploadWhyIPHPage from "./pages/Options/whyiph/UploadWhyIPHPage.jsx";
import DisplayWhyIPHPage from "./pages/Options/whyiph/DisplayWhyIPHPage.jsx";
import UploadFooterPage from "./pages/Options/footer/UploadFooterPage.jsx";
import DisplayFooterPage from "./pages/Options/footer/DisplayFooterPage.jsx";
import UploadNoticePage from "./pages/Options/notice/UploadNoticePage.jsx";
import DisplayNoticePage from "./pages/Options/notice/DisplayNoticePage.jsx";
import PendingStudentPage from "./pages/student/PendingStudentList.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import NoticePage from "./pages/NoticePage/NoticePage.jsx";
import UploadGalleryPage from "./pages/Options/gallery/UploadGalleryPage.jsx";
import DisplayGalleryPage from "./pages/Options/gallery/DisplayGalleryPage.jsx";
import GalleryPage from "./pages/GalleryPage/GalleryPage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import SubscribePage from "./pages/Options/subscribe/subscribePage.jsx";
import RiderPage from './pages/RiderPage/RiderPage.jsx';


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
                    <Route exact path="/Dashboard" element={<DashboardPage />} />
                    <Route exact path="/Profile" element={<ProfilePage />} />

                    <Route exact path="/StudentCreateUpdatePage" element={<StudentCreateUpdatePage />} />
                    <Route exact path="/StudentListPage" element={<StudentListPage />} />
                    <Route exact path="/PrintApplication" element={<PrintApplicationPage />} />
                    <Route exact path="/PendingStudent" element={<PendingStudentPage />} />

                    <Route exact path="/BalanceCreateUpdatePage" element={<BalanceCreateUpdatePage />} />
                    <Route exact path="/BalanceListPage" element={<BalanceListPage />} />
                    <Route exact path="/PrintBalance" element={<PrintBalancePage />} />

                    <Route exact path="/upload-logo" element={<UploadLogoPage />} />
                    <Route exact path="/display-logo" element={<DisplayLogoPage />} />

                    <Route exact path="/upload-carousel" element={<UploadCarouselPage />} />
                    <Route exact path="/display-carousel" element={<DisplayCarouselPage />} />

                    <Route exact path="/upload-info" element={<UploadInfoPage />} />
                    <Route exact path="/display-info" element={<DisplayInfoPage />} />

                    <Route exact path="/upload-gallery" element={<UploadGalleryPage />} />
                    <Route exact path="/display-gallery" element={<DisplayGalleryPage />} />

                    <Route exact path="/upload-whyiph" element={<UploadWhyIPHPage />} />
                    <Route exact path="/display-whyiph" element={<DisplayWhyIPHPage />} />

                    <Route exact path="/upload-footer" element={<UploadFooterPage />} />
                    <Route exact path="/display-footer" element={<DisplayFooterPage />} />

                    <Route exact path="/upload-notice" element={<UploadNoticePage />} />
                    <Route exact path="/display-notice" element={<DisplayNoticePage />} />

                    <Route exact path="/display-subscriber" element={<SubscribePage />} />

                    {/*{for student}*/}

                    <Route path="/" element={<HomePage />} />
                    <Route path="/admission" element={<AdmissionPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/notice" element={<NoticePage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    <Route path="*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>
            <FullscreenLoader />
        </Fragment>
    )


};
export default App;
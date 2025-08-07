import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/settings-slice";
import profileReducer from "../state-slice/profile-slice";
import studentReducer from "../state-slice/student-slice";
import balanceReducer from "../state-slice/balance-slice";
import Logo from '../state-slice/Logo-slice'
import Carousel from '../state-slice/carousel-slice'
import Info from '../state-slice/info-slice'
import WhyIPH from '../state-slice/why-ihp-slice'
import Footer from '../state-slice/footer-slice'
import Report from '../state-slice/repost-slice'
import Notice from '../state-slice/notice-slice'
import Gallery from '../state-slice/gallery-slice'
import Subscribe from '../state-slice/subscribe-slice'
import booking from "../state-slice/booking-slice";

export default configureStore({
    reducer: {
        booking: booking,
        settings: settingsReducer,
        profile: profileReducer,
        student: studentReducer,
        balance: balanceReducer,
        logo: Logo,
        carousel: Carousel,
        whyIPH: WhyIPH,
        footer: Footer,
        report: Report,
        notice: Notice,
        gallery: Gallery,
        subscribe: Subscribe,
    }
})
import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/setting-slice";

import profileReducer from "../state-slice/profile-slice";
import booking from "../state-slice/booking-slice";
import Subscribe from '../state-slice/subscribe-slice'

export default configureStore({
    reducer: {
        settings: settingsReducer,
        booking: booking,
        profile: profileReducer,
        subscribe: Subscribe,
    }
})
import { createSlice } from "@reduxjs/toolkit";
export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        BookingData: [],
        BookingDetail: [],
        UserBooking: [],
        BookingFormValue: {
            pickupL: "",
            pickupD: "",
            pickupT: "",
            dropL: "",
            riderID: "",
            status: "",
            driverID: "",
            distance: "",
            price: ""
        },
    },
    reducers: {
        OnChangeBookingInput: (state, action) => {
            state.BookingFormValue[`${action.payload.Name}`] = action.payload.Value;
        },
        SetBookingList: (state, action) => {
            state.BookingData = action.payload
        },
        SetBooking: (state, action) => {
            state.BookingDetail = action.payload
        },
        SetUserBooking: (state, action) => {
            state.UserBooking = action.payload
        },
    }
})

export const { OnChangeBookingInput, SetBookingList, SetBooking, SetUserBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        BookingData: [],
        BookingDetail: [],
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
    }
})

export const { OnChangeBookingInput, SetBookingList, SetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
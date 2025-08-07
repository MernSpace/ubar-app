import { createSlice } from "@reduxjs/toolkit";
export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        BookingData: [],
        BookingFormValue: {
            pickupL: "",
            pickupD: "",
            pickupT: "",
            dropL: "",
            riderID: "",
            status: "",
            driverID: ""
        },
    },
    reducers: {
        OnChangeBookingInput: (state, action) => {
            state.BookingFormValue[`${action.payload.Name}`] = action.payload.Value;
        },
        SetBookingList: (state, action) => {
            state.BookingData = action.payload
        },
    }
})

export const { OnChangeBookingInput, SetBookingList } = bookingSlice.actions;
export default bookingSlice.reducer;
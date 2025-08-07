import {createSlice} from "@reduxjs/toolkit";
export const WhyIPHSlice=createSlice({
    name:'whyiph',
    initialState:{
        WhyIPHList:[],
        WhyIPHFormValue:{
            Img1:"",
            heading:"",
            description:"",
        },
    },
    reducers:{
        OnChangeWhyIPHInput:(state,action)=>{
            state.WhyIPHFormValue[`${action.payload.Name}`]=action.payload.Value;
        },
        SetWhyIPHList:(state,action)=>{
            state.WhyIPHList=action.payload
        },
    }
})

export  const {OnChangeWhyIPHInput,SetWhyIPHList}=WhyIPHSlice.actions;
export default  WhyIPHSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";
export const carouselSlice=createSlice({
    name:'carousel',
    initialState:{
        CarouselData:[],
        CarouselFormValue:{
            Image:""
        },
    },
    reducers:{
        OnChangeCarouselInput:(state,action)=>{
            state.CarouselFormValue[`${action.payload.Name}`]=action.payload.Value;
        },
        SetCarouselList:(state,action)=>{
            state.CarouselData=action.payload
        }
    }
})

export  const {OnChangeCarouselInput,SetCarouselList}=carouselSlice.actions;
export default  carouselSlice.reducer;
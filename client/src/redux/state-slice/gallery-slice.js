import {createSlice} from "@reduxjs/toolkit";
export const gallerySlice=createSlice({
    name:'gallery',
    initialState:{
        GalleryData:[],
        GalleryFormValue:{
           image:""
        },
    },
    reducers:{
        OnChangeGalleryInput:(state,action)=>{
            state.GalleryFormValue[`${action.payload.Name}`]=action.payload.Value;
        },
        SetGalleryList:(state,action)=>{
            state.GalleryData=action.payload
        },
    }
})

export  const {OnChangeGalleryInput,SetGalleryList}=gallerySlice.actions;
export default  gallerySlice.reducer;
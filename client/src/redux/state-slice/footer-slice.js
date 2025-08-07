import {createSlice} from "@reduxjs/toolkit";
export const footerSlice=createSlice({
    name:'footer',
    initialState:{
        footerData:[],
        FooterFormValue:{
            Logo:"",
            heading:"",
            description:"",
            phone:"",
            email:"",
            address:""
        },
    },
    reducers:{
        OnChangeFooterInput:(state,action)=>{
            state.FooterFormValue[`${action.payload.Name}`]=action.payload.Value;
        },
        SetFooterData:(state,action)=>{
            state.footerData=action.payload
        },
    }
})

export  const {OnChangeFooterInput,SetFooterData}=footerSlice.actions;
export default  footerSlice.reducer;
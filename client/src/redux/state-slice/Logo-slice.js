import {createSlice} from "@reduxjs/toolkit";
export const logoSlice=createSlice({
    name:'logo',
    initialState:{
        LogoFormValue:{
            Logo:""
        },
    },
    reducers:{
        OnChangeLogoInput:(state,action)=>{
            state.LogoFormValue[`${action.payload.Name}`]=action.payload.Value;
        },
    }
})

export  const {OnChangeLogoInput}=logoSlice.actions;
export default  logoSlice.reducer;
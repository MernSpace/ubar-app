import {createSlice} from "@reduxjs/toolkit";
export const infoSlice=createSlice({
    name:'info',
    initialState:{
        InfoData:[],
        InfoFormValue:{
            Img1:"",
            heading:"",
            description:"",
        },
    },
    reducers:{
        OnChangeInfoInput:(state,action)=>{
            state.InfoFormValue[`${action.payload.Name}`]=action.payload.Value;
        },
        SetInfoList:(state,action)=>{
            state.InfoData=action.payload
        },
    }
})

export  const {OnChangeInfoInput,SetInfoList}=infoSlice.actions;
export default  infoSlice.reducer;
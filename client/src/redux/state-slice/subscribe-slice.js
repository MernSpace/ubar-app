import {createSlice} from "@reduxjs/toolkit";
export const subscribeSlice=createSlice({
    name:'subscribe',
    initialState:{
        SubscribeData:[],
        SubscribeFormValue:{
            name:"",
            email:"",
            massage:""
        },
    },
    reducers:{
        OnChangeSubscribeInput:(state,action)=>{
            state.SubscribeFormValue[`${action.payload.Name}`]=action.payload.Value;
        },
        SetSubscribeList:(state,action)=>{
            state.SubscribeData=action.payload
        },
        ResetFormValue: (state, action) => {
            Object.keys(state.SubscribeFormValue).forEach((i) => state.SubscribeFormValue[i] = "");
        }
    }
})

export  const {OnChangeSubscribeInput,SetSubscribeList,ResetFormValue}=subscribeSlice.actions;
export default  subscribeSlice.reducer;
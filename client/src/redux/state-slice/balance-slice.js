import {createSlice} from "@reduxjs/toolkit";
export const balanceSlice=createSlice({
    name:'balance',
    initialState:{
        BalanceList:[],
        BalanceListTotal:0,
        StudentDropDown:[],
        BalanceDetail:[],
        BalanceFormValue:{
            StudentID:"",
            Payment:"",
            invNumber:"",
            studentDew:"",
            discount:"",
            Note:"",
        },
    },
    reducers:{
        SetBalanceList:(state,action)=>{
            state.BalanceList=action.payload
        },
        SetBalanceListTotal:(state,action)=>{
            state.BalanceListTotal=action.payload
        },
        SetBalanceDetail:(state,action)=>{
            state.BalanceDetail=action.payload
        },
        SetStudentDropDown:(state,action)=>{
            state.StudentDropDown=action.payload
        },
        OnChangeBalanceInput:(state,action)=>{
            state.BalanceFormValue[`${action.payload.Name}`]=action.payload.Value;
        },
    }
})

export  const {SetBalanceListTotal,SetBalanceList,SetStudentDropDown,SetBalanceDetail,OnChangeBalanceInput}=balanceSlice.actions;
export default  balanceSlice.reducer;
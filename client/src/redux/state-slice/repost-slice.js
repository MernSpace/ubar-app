import {createSlice} from "@reduxjs/toolkit";

export const reportSlice=createSlice({
    name:'report',
    initialState:{
        TotalSell:0,
        TotalPayment:0,
        TotalDue:0,
        TotalStudent:0,
        StudentData:[],
        AddBalanceData:[]
    },
    reducers:{
        SetTotalSell:(state,action)=>{
            state.TotalSell=action.payload
        },
        SetTotalPayment:(state,action)=>{
            state.TotalPayment=action.payload
        },
        SetTotalDue:(state,action)=>{
            state.TotalDue=action.payload
        },
        SetTotalStudent:(state,action)=>{
            state.TotalStudent=action.payload
        },
        SetStudentData:(state,action)=>{
            state.StudentData=action.payload
        },
        SetAddBalanceData:(state,action)=>{
            state.AddBalanceData=action.payload
        }


    }
})

export  const {SetAddBalanceData,SetTotalSell,SetTotalPayment,SetTotalDue,SetTotalStudent,SetStudentData}=reportSlice.actions;
export default  reportSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";

export const studentSlice=createSlice({
    name:'students',
    initialState:{
        List:[],
        ListTotal:0,
        PendingStudentData:[],
        PendingStudentTotal:0,
        FormValue:{
            AdmissionRoll:"",
            StudentName:"",
            ParentName:"",
            Email:"",
            Address:"",
            Class:"",
            Session:"",
            Gender:"",
            Religion:"",
            AdmissionDate:"",
            StudentPhone:"",
            GuardianPhone:"",
            CourseFee:"",
            Photo:"",
            Payment:"0",
            Approval:"",
            dew:""
        }
    },
    reducers:{
        SetPendingStudentData:(state,action)=>{
            state.PendingStudentData=action.payload
        },
        SetPendingStudentTotal:(state,action)=>{
            state.PendingStudentTotal=action.payload
        },
        SetStudentList:(state,action)=>{
            state.List=action.payload
        },
        SetStudentListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        OnChangeStudentInput:(state,action)=>{
            state.FormValue[`${action.payload.Name}`]=action.payload.Value;
        },
        ResetFormValue:(state,action)=>{
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }

    }
})

export  const {SetPendingStudentData,SetPendingStudentTotal,SetStudentList,SetStudentListTotal,OnChangeStudentInput,ResetFormValue}=studentSlice.actions;
export default  studentSlice.reducer;
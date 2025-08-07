import {createSlice} from "@reduxjs/toolkit";
export const noticeSlice=createSlice({
    name:'notice',
    initialState:{
        NoticeData:[],
        NoticeFormValue:{
            notice:""
        },
    },
    reducers:{
        OnChangeNoticeInput:(state,action)=>{
            state.NoticeFormValue[`${action.payload.Name}`]=action.payload.Value;
        },
        SetNoticeList:(state,action)=>{
            state.NoticeData=action.payload
        }
    }
})

export  const {OnChangeNoticeInput,SetNoticeList}=noticeSlice.actions;
export default  noticeSlice.reducer;
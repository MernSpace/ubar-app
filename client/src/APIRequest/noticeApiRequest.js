import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {SetNoticeList} from "../redux/state-slice/notice-slice.js";
const AxiosHeader={headers:{"token":getToken()}}



export async function CreateNoticeRequest(PostBody) {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/create-notice";
        const result = await axios.post(URL, PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(result.status ===200){
            SuccessToast('Notice Successfully Uploaded!')
            return result;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



export async function ReadNoticeRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/read-notice";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        store.dispatch(SetNoticeList(result.data))
        return result
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function DeleteNoticeRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/delete-notice/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            SuccessToast(result.data.status)
            return  true;
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}

export async function UpdateNoticeRequest(ObjectID,PostBody) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + "/update-notice/" + ObjectID;
        const result = await axios.get(URL,PostBody, AxiosHeader)
        console.log(result.data)
        store.dispatch(HideLoader())
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}
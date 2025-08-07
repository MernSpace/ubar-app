import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {SetFooterData} from "../redux/state-slice/footer-slice.js";
const AxiosHeader={headers:{"token":getToken()}}



export async function CreateFooterInfoRequest(PostBody) {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/create-footer-info";
        const result = await axios.post(URL, PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(result.status ===200){
            SuccessToast('Footer info Successfully Uploaded!')
            return result;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



export async function ReadFooterInfoRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/read-footer-info";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        store.dispatch(SetFooterData(result.data))
        return result
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function DeleteFooterInfoRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/delete-footer-info/"+ObjectID;
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

export async function UpdateFooterInfoRequest(ObjectID,PostBody) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + "/update-footer-info/" + ObjectID;
        const result = await axios.get(URL,PostBody, AxiosHeader)
        store.dispatch(HideLoader())
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}
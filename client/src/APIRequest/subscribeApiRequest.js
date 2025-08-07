import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {SetInfoList} from "../redux/state-slice/info-slice.js";
import {SetSubscribeList} from "../redux/state-slice/subscribe-slice.js";
const AxiosHeader={headers:{"token":getToken()}}



export async function CreateSubscribeRequest(PostBody) {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/create-subscribe";
        const result = await axios.post(URL, PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(result.status ===200){
            SuccessToast('Successfully Subscribe!')
            return result;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



export async function ReadSubscribeRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/read-subscribe";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        store.dispatch(SetSubscribeList(result.data))
        return result
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function DeleteSubscribeRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/delete-subscribe/"+ObjectID;
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

export async function UpdateSubscribeRequest(ObjectID,PostBody) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + "/update-subscribe/" + ObjectID;
        const result = await axios.get(URL,PostBody, AxiosHeader)
        SuccessToast(result.data.status)
        store.dispatch(HideLoader())
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}

export async function DetailSubscribeRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + "/subscribe-detail/" + ObjectID;
        const result = await axios.get(URL, AxiosHeader)
        SuccessToast(result.data.status)
        store.dispatch(HideLoader())
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}
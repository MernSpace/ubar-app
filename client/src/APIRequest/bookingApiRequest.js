import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import { SetInfoList } from "../redux/state-slice/info-slice.js";
const AxiosHeader = { headers: { "token": getToken() } }



export async function CreateBookingRequest(PostBody) {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL + "/create-booking";
        const result = await axios.post(URL, PostBody, AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            SuccessToast('Booking Successfull!')
            return result;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



export async function ReadInfoRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL + "/read-info";
        const result = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())
        store.dispatch(SetInfoList(result.data))
        return result
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function DeleteInfoRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + "/delete-info/" + ObjectID;
        const result = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            SuccessToast(result.data.status)
            return true;
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false
    }
}

export async function UpdateInfoRequest(ObjectID, PostBody) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + "/update-info/" + ObjectID;
        const result = await axios.get(URL, PostBody, AxiosHeader)
        console.log(result.data)
        store.dispatch(HideLoader())
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false
    }
}
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {SetCarouselList} from "../redux/state-slice/carousel-slice.js";
const AxiosHeader={headers:{"token":getToken()}}



export async function CreateCarouselRequest(PostBody) {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/create-carousel";
        const result = await axios.post(URL, PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(result.status ===200){
            SuccessToast('Logo Successfully Uploaded!')
            return result;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



export async function ReadCarouselRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/read-carousel";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        store.dispatch(SetCarouselList(result.data))
        return result
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function DeleteCarouselRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/delete-carousel/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            ErrorToast(result.data.status)
            return  false;
        }
        if (result.status === 200) {
            SuccessToast("Request Successful");
            return  true
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

export async function UpdateCarouselRequest(ObjectID,PostBody) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + "/update-carousel/" + ObjectID;
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
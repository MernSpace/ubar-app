import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {SetGalleryList} from "../redux/state-slice/gallery-slice.js";
const AxiosHeader={headers:{"token":getToken()}}



export async function CreateGalleryRequest(PostBody) {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/create-gallery";
        const result = await axios.post(URL, PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(result.status ===200){
            SuccessToast('Gallery Successfully Uploaded!')
            return result;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



export async function ReadGalleryRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/read-gallery";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        store.dispatch(SetGalleryList(result.data))
        return result
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function DeleteGalleryRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/delete-gallery/"+ObjectID;
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

export async function UpdateGalleryRequest(ObjectID,PostBody) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + "/update-gallery/" + ObjectID;
        const result = await axios.get(URL,PostBody, AxiosHeader)
        store.dispatch(HideLoader())
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}
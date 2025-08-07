import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import {getToken} from "../helper/SessionHelper";
import {
    SetStudentDropDown,
    SetBalanceList,
    SetBalanceListTotal,
    SetBalanceDetail
} from "../redux/state-slice/balance-slice.js";
import {BaseURL} from "../helper/config";
const AxiosHeader={headers:{"token":getToken()}}



export async function AddBalanceRequest(PostBody) {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/add-balance";
        const result = await axios.post(URL, PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(result.status ===200){
            SuccessToast('Balance Successfully Added!')
            return result;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}




export async function StudentDropDownRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/studentDropDown";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'].length > 0) {
                store.dispatch(SetStudentDropDown(result.data['data']))
            } else {
                store.dispatch(SetStudentDropDown([]));
                ErrorToast("No Customer Found");
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



export async function ListBalanceRequest(pageNo,perPage,searchKeyword) {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/read-balance/"+pageNo+"/"+perPage+"/"+searchKeyword;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            if (result.data.data && result.data.data.length > 0) {
                store.dispatch(SetBalanceList(result.data.data))
                store.dispatch(SetBalanceListTotal(result.data.totalCount || 0))
            } else {
                store.dispatch(SetBalanceList([]))
                store.dispatch(SetBalanceListTotal(0))
                ErrorToast("No Data Found")
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function DeleteBalanceRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/delete-balance/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "associate") {
            ErrorToast(result.data['data'])
            return  false;
        }
        if (result.status === 200 && result.data['status'] === "success") {
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

export async function DetailBalanceRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + "/balance-detail/" + ObjectID;
        const result = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            store.dispatch(SetBalanceDetail(result.data))

        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}
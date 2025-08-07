import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {
    SetAddBalanceData,
    SetStudentData,
    SetTotalDue,
    SetTotalPayment,
    SetTotalSell,
    SetTotalStudent
} from "../redux/state-slice/repost-slice.js";
const AxiosHeader={headers:{"token":getToken()}}



export async function TotalSellRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/total-sell";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(result.status ===200){
            store.dispatch(HideLoader())
            store.dispatch(SetTotalSell(result.data.data[0].Last360Days[0].TotalAmount))
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



export async function TotalPaymentRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/total-payment";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            store.dispatch(SetTotalPayment(result.data.data[0].Last360Days[0].TotalAmount))
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
    }
}

export async function TotalDueRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/total-due";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            store.dispatch(SetTotalDue(result.data.data[0].Last360Days[0].TotalAmount))
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

export async function TotalStudentRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/List-student/1/50000/0";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            store.dispatch(SetTotalStudent(result.data.data.total))
            store.dispatch(SetStudentData(result.data.data.rows))
            return  result;
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


export async function TotalBalanceRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/all-balance";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            store.dispatch(SetAddBalanceData(result.data))
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
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import {getToken} from "../helper/SessionHelper";
import {
    OnChangeStudentInput,
    ResetFormValue,
    SetPendingStudentData, SetPendingStudentTotal,
    SetStudentList,
    SetStudentListTotal
} from "../redux/state-slice/student-slice.js";
import {BaseURL} from "../helper/config";

const AxiosHeader={headers:{"token":getToken()}}

export async function StudentListRequest(pageNo, perPage, searchKeyword) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/List-student/"+pageNo+"/"+perPage+"/"+searchKeyword;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            if (result.data.data.rows.length > 0) {
                store.dispatch(SetStudentList(result.data.data.rows))
                store.dispatch(SetStudentListTotal(result.data.data.total))
            } else {
                store.dispatch(SetStudentList([]))
                store.dispatch(SetStudentListTotal(0))
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


export async function CreateStudentRequest(PostBody,ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/create-student"
        if(ObjectID!==0){
            URL = BaseURL+"/Update-student/"+ObjectID;
        }
        const result = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Request Successful");
            store.dispatch(ResetFormValue())
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


export async function FillStudentFormRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/student-detailById/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            let FormValue=result.data['data'][0];
            store.dispatch(OnChangeStudentInput({Name:"AdmissionRoll",Value:FormValue['AdmissionRoll']}));
            store.dispatch(OnChangeStudentInput({Name:"StudentName",Value:FormValue['StudentName']}));
            store.dispatch(OnChangeStudentInput({Name:"ParentName",Value:FormValue['ParentName']}));
            store.dispatch(OnChangeStudentInput({Name:"Email",Value:FormValue['Email']}));
            store.dispatch(OnChangeStudentInput({Name:"Address",Value:FormValue['Address']}));
            store.dispatch(OnChangeStudentInput({Name:"Class",Value:FormValue['Class']}));
            store.dispatch(OnChangeStudentInput({Name:"Session",Value:FormValue['Session']}));
            store.dispatch(OnChangeStudentInput({Name:"Gender",Value:FormValue['Gender']}));
            store.dispatch(OnChangeStudentInput({Name:"Religion",Value:FormValue['Religion']}));
            store.dispatch(OnChangeStudentInput({Name:"StudentPhone",Value:FormValue['StudentPhone']}));
            store.dispatch(OnChangeStudentInput({Name:"GuardianPhone",Value:FormValue['GuardianPhone']}));
            store.dispatch(OnChangeStudentInput({Name:"CourseFee",Value:FormValue['CourseFee']}));
            store.dispatch(OnChangeStudentInput({Name:"Photo",Value:FormValue['Photo']}));
            store.dispatch(OnChangeStudentInput({Name:"Payment",Value:FormValue['Payment']}));
            store.dispatch(OnChangeStudentInput({Name:"Approval",Value:FormValue['Approval']}));
            store.dispatch(OnChangeStudentInput({Name:"dew",Value:FormValue['dew']}));
            store.dispatch(OnChangeStudentInput({Name:"AdmissionDate",Value:FormValue['AdmissionDate']}));
            return  result.data['data'][0];
        } else {
            debugger;
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        debugger;
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}


export async function DeleteStudentRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/Delete-student/"+ObjectID;
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


export async function PendingStudentListRequest(pageNo, perPage, searchKeyword) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/pending-student/"+pageNo+"/"+perPage+"/"+searchKeyword;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            if (result.data.data.rows.length > 0) {
                store.dispatch(SetPendingStudentData(result.data.data.rows))
                store.dispatch(SetPendingStudentTotal(result.data.data.total))
            } else {
                store.dispatch(SetPendingStudentData([]))
                store.dispatch(SetPendingStudentTotal(0))
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
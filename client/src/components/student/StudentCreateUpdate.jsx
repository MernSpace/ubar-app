import React, {Fragment, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import store from "../../redux/store/store";
import {OnChangeStudentInput, ResetFormValue} from "../../redux/state-slice/student-slice.js";
import {CreateStudentRequest, FillStudentFormRequest} from "../../APIRequest/studentApiRequest.js";
import {ErrorToast, getBase64, IsEmail, IsEmpty} from "../../helper/FormHelper";
import {useNavigate} from "react-router-dom";



const StudentCreateUpdate = () => {
    let studentImgRef,studentImgView,CourseFeeRef,PaymentRef = useRef()

    let FormValue=useSelector((state)=>(state.student.FormValue));
    let navigate=useNavigate();
    let [ObjectID,SetObjectID]=useState(0);

    useEffect(()=>{
        let params= new URLSearchParams(window.location.search);
        let id=params.get('id');
        if(id!==null){
            SetObjectID(id);
            (async () => {
                await FillStudentFormRequest(id);
            })();
        }
    },[])

    const PreviewImage = () => {
        let ImgFile = studentImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            studentImgView.src=base64Img;
        })
    }

    const SaveChange = async () => {
        let CourseFee = CourseFeeRef.value;
        let Payment = PaymentRef.value;

        let photo = studentImgView.src
        let dew = CourseFee - Payment;
        if(IsEmpty(photo)){
            ErrorToast("Student Photo Required !")
        }
        else {
            const updateStudentFormValue={
                ...FormValue,
                Photo:photo,
                dew:dew
            };
            await CreateStudentRequest(updateStudentFormValue,ObjectID)
            ResetFormValue()
            navigate('/StudentListPage')
        }
    }


    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input) => studentImgView = input} className="icon-nav-img-lg"
                                     src={FormValue.Photo} alt=""/>
                                <h2>{FormValue.StudentName}</h2>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Profile Picture</label>
                                        <input onChange={PreviewImage} ref={(input) => studentImgRef = input}
                                               placeholder="" className="form-control animated fadeInUp"
                                               type="file"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Admission Roll</label>
                                        <input value={FormValue.AdmissionRoll}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "AdmissionRoll",
                                                       Value: e.target.value
                                                   }))
                                               }} placeholder="Admission Roll"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Student Name</label>
                                        <input  value={FormValue.StudentName}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "StudentName",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               placeholder="Student Name"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Parent Name</label>
                                        <input value={FormValue.ParentName}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "ParentName",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                             placeholder="Parent Name"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Email</label>
                                        <input value={FormValue.Email}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "Email",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               placeholder="Email"
                                               className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Address</label>
                                        <input value={FormValue.Address}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "Address",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               placeholder="Address"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Class</label>
                                        <select
                                            className="form-select mb-3"
                                            name="class"
                                            id="inputClass"
                                            value={FormValue.Class}
                                            onChange={(e) => {
                                                store.dispatch(OnChangeStudentInput({
                                                    Name: "Class",
                                                    Value: e.target.value
                                                }));
                                            }}
                                        >
                                            <option value="">Select your class</option>
                                            {/* Removed 'selected' from here */}
                                            <option value="inter-1st">Inter First Year</option>
                                            <option value="inter-2nd">Inter Second Year</option>
                                            <option value="Revision-Batch">Revision Batch</option>
                                        </select>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Session</label>
                                        <select
                                            className="form-select mb-3"
                                            name="class"
                                            id="inputClass"
                                            value={FormValue.Session}
                                            onChange={(e) => {
                                                store.dispatch(OnChangeStudentInput({
                                                    Name: "Session",
                                                    Value: e.target.value
                                                }));
                                            }}
                                        >
                                            <option value="">Select your Session</option>
                                            {/* Removed 'selected' from here */}
                                            <option value="2023-2024">2023-2024</option>
                                            <option value="2024-2025">2024-2025</option>
                                            <option value="2025-2026">2025-2026</option>
                                            <option value="2026-2027">2026-2027</option>
                                            <option value="2027-2028">2027-2028</option>
                                            <option value="2028-2029">2028-2029</option>
                                            <option value="2029-2030">2029-2030</option>
                                            <option value="2030-2031">2030-2031</option>
                                            <option value="2031-2032">2031-2032</option>
                                            <option value="2032-2033">2032-2033</option>
                                            <option value="2033-2034">2033-2034</option>
                                            <option value="2033-2034">2033-2034</option>
                                            <option value="2034-2035">2034-2035</option>
                                            <option value="2035-2036">2035-2036</option>
                                            <option value="2036-2037">2036-2037</option>
                                            <option value="2037-2038">2037-2038</option>
                                            <option value="2038-2039">2038-2039</option>
                                            <option value="2039-2040">2039-2040</option>
                                        </select>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Gender</label>
                                        <select
                                            value={FormValue.Gender}
                                            onChange={(e) => {
                                                store.dispatch(OnChangeStudentInput({
                                                    Name: "Gender",
                                                    Value: e.target.value
                                                }))
                                            }}

                                            className="form-control animated fadeInUp"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Religion</label>
                                        <select value={FormValue.Religion}
                                                onChange={(e) => {
                                                    store.dispatch(OnChangeStudentInput({
                                                        Name: "Religion",
                                                        Value: e.target.value
                                                    }))
                                                }}

                                                className="form-control animated fadeInUp"
                                        >
                                            <option value="">Select Religion</option>
                                            <option value="Islam">Islam</option>
                                            <option value="Hindu">Hindu</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Student Phone</label>
                                        <input value={FormValue.StudentPhone}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "StudentPhone",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                              placeholder="Student Phone"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Guardian Phone</label>
                                        <input value={FormValue.GuardianPhone}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "GuardianPhone",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                            placeholder="Guardian Phone"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Course Fee</label>
                                        <input value={FormValue.CourseFee}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "CourseFee",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               ref={(input) => CourseFeeRef = input} placeholder="Course Fee"
                                               className="form-control animated fadeInUp" type="number"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Payment</label>
                                        <input disabled={true} value={FormValue.Payment}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "Payment",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               ref={(input) => PaymentRef = input} placeholder="Payment"
                                               className="form-control animated fadeInUp" type="number"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Approval</label>
                                        <select value={FormValue.Approval}
                                                onChange={(e)=>{
                                                    store.dispatch(OnChangeStudentInput({
                                                        Name: "Approval",
                                                        Value: e.target.value
                                                    }))
                                                }}

                                                className="form-control animated fadeInUp"
                                        >
                                            <option value="">Select Approval</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Payment Dew</label>
                                        <input  value={FormValue.dew} disabled={true}
                                               onChange={(e)=>{
                                                   store.dispatch(OnChangeStudentInput({
                                                       Name: "dew",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               placeholder="Dew"
                                               className="form-control animated fadeInUp" type="number"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} className="w-100  btn btn-success">Register
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentCreateUpdate;
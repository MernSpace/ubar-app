import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {AddBalanceRequest, StudentDropDownRequest} from "../../APIRequest/balanceApiRequest.js";
import {OnChangeBalanceInput} from "../../redux/state-slice/balance-slice.js";
import store from "../../redux/store/store";
import {CreateStudentRequest, FillStudentFormRequest} from "../../APIRequest/studentApiRequest.js";
import {useNavigate} from "react-router-dom";
import Select from "react-select";


const BalanceCreateUpdate = () => {
    let navigate = useNavigate();
    let StudentDropDown=useSelector((state)=>(state.balance.StudentDropDown));
    let FormValue=useSelector((state)=>(state.student.FormValue));
    let BalanceFormValue = useSelector((state)=>(state.balance.BalanceFormValue));
    const [voucherNumber, setVoucherNumber] = useState('');
    const currentDate = new Date(Date.now()).toLocaleString();

    useEffect(() => {
        (async ()=>{
            await StudentDropDownRequest()
        })()
    }, []);

    useEffect( () => {
        const generateVoucherNumber = () => {
            return Math.random().toString(36).substring(2, 10).toUpperCase();
        };
        setVoucherNumber(generateVoucherNumber());
    }, []);

    let id = BalanceFormValue.StudentID;

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    await FillStudentFormRequest(id);
                } catch (error) {
                    console.error('Error fetching supplier data:', error);

                }
            };

            fetchData();
        }
    }, [id]);
    const studentOptions = StudentDropDown.map(item => ({
        value: item._id,
        label: `${item.StudentName} - ${item.StudentPhone}`
    }));
    const handleInputChange = (name, value) => {
        store.dispatch(OnChangeBalanceInput({
            Name: name,
            Value: value
        }));
    };


    let previousDew = Number(FormValue.dew)
    let payment = Number(BalanceFormValue.Payment)
    let discount = Number(BalanceFormValue.discount)
    let totalPayment = payment + discount
    let newDew = previousDew - totalPayment;
let studentPayment = Number(FormValue.Payment) + totalPayment
    const Save= async ()=>{
        try {
            const updatedBalanceFormValue = {
                ...BalanceFormValue,         // Spread the original object
                invNumber: voucherNumber,    // Update the invNumber property
                studentDew: FormValue.dew
            };
            const updateStudentFormValue = {
                ...FormValue,
                dew:newDew,
                Payment:studentPayment


            };
            await CreateStudentRequest(updateStudentFormValue,id)
            let res =  await AddBalanceRequest(updatedBalanceFormValue)
            console.log(res.data.data._id)
            navigate(`/PrintBalance?id=${res.data.data._id}`)

        }catch (e) {
            console.error("Error creating purchase and updating customer:", e);
        }
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-12 col-md-8 col-lg-12 mb-3">
                        <div className="card  h-100">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Add Balance</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-12 p-1">
                                        <label className="form-label">Student</label>
                                        <Select
                                            options={studentOptions}
                                            placeholder="Select Student"
                                            onChange={(option) => handleInputChange("StudentID", option?.value || "")}
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12 d-flex justify-content-between my-3 '>
                                        <div className='col-6'>
                                            <img src={FormValue.Photo} alt={`${FormValue.StudentName}'s photo`}
                                                 className=" "
                                                 style={{
                                                     width: '100px',
                                                     height: '100px',
                                                     objectFit: 'cover'
                                                 }}/>
                                            <p className='form-label'>Student Name: {FormValue.StudentName}</p>
                                            <p className='form-label'>Student Address: {FormValue.StudentPhone}</p>
                                            <p className='form-label'>Student Phone: {FormValue.Address}</p>
                                            <p className='form-label'>Student Dew: {FormValue.dew}</p>

                                        </div>
                                        <div className='col-6'>
                                            <p className='form-label'>Voucher No: {voucherNumber}</p>

                                            <p className='form-label'>Payment Date:{currentDate} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <hr/>
                                    <div className='col-12 '>
                                    <div className='  d-flex '>
                                            <div className=" p-1">
                                                <label className="form-label">Course Free</label>
                                                <input value={FormValue.CourseFee}
                                                       className="form-control form-control-sm disabled" type="number"/>
                                            </div>
                                            <div className=" p-1">
                                                <label className="form-label">Total Paid</label>
                                                <input value={FormValue.Payment} disabled={true}
                                                       className="form-control form-control-sm" type="number"/>
                                            </div>
                                            <div className=" p-1">
                                                <label className="form-label">Total Payable</label>
                                                <input value={FormValue.dew} disabled={true}
                                                       onChange={(e) => {
                                                           store.dispatch(OnChangeBalanceInput({
                                                               Name: "studentDew",
                                                               Value: e.target.value
                                                           }))
                                                       }}
                                                       className="form-control form-control-sm"
                                                       type="number"/>
                                            </div>


                                        </div>
                                        <div className='  d-flex '>
                                            <div className=" p-1">
                                                <label className="form-label">Deposit</label>
                                                <input onChange={(e) => {
                                                    store.dispatch(OnChangeBalanceInput({
                                                        Name: "Payment",
                                                        Value: e.target.value
                                                    }))
                                                }} className="form-control form-control-sm" type="text"/>
                                            </div>
                                            <div className=" p-1">
                                                <label className="form-label">Discount</label>
                                                <input onChange={(e) => {
                                                    store.dispatch(OnChangeBalanceInput({
                                                        Name: "discount",
                                                        Value: e.target.value
                                                    }))
                                                }} className="form-control form-control-sm" type="text"/>
                                            </div>
                                            <div className=" p-1">
                                                <label className="form-label">Note</label>
                                                <input onChange={(e) => {
                                                    store.dispatch(OnChangeBalanceInput({
                                                        Name: "Note",
                                                        Value: e.target.value
                                                    }))
                                                }} className="form-control form-control-sm" type="text"/>
                                            </div>
                                        </div>
                                        <div className='row mt-5'>

                                            <button className='btn btn-success w-25' onClick={Save}>Add</button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default BalanceCreateUpdate;
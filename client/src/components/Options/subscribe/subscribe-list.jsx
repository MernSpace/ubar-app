import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiOutlineDelete, AiOutlineEdit, AiOutlinePrinter} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import {DeleteAlert} from "../../../helper/deleteAlert.js";
import {DeleteSubscribeRequest, ReadSubscribeRequest} from "../../../APIRequest/subscribeApiRequest.js";


const SubscriberList = () => {
    useEffect(()=>{
        (async () => {
            await ReadSubscribeRequest();
        })();
    },[])

    let DataList=useSelector((state)=>(state.subscribe.SubscribeData));
    let Total=useSelector((state)=>(state.student.ListTotal))


    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }

    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed){
            let DeleteResult= await DeleteSubscribeRequest(id)
            if(DeleteResult){
                await ReadSubscribeRequest();
            }
        }
    }

    return (
        <Fragment>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-4">
                                            <h5>Subscriber List</h5>
                                        </div>

                                        <div className="col-2">
                                            <input onKeyUp={TextSearch} placeholder="Text Filter" className="form-control form-control-sm"/>
                                        </div>

                                        <div className="col-2">
                                            <select  className="form-control mx-2 form-select-sm form-select form-control-sm" >
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="100">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input  type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                <button className="btn  btn-success btn-sm mb-0" type="button">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">No</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Name</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Email</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Massage</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        DataList.map((item,i)=>
                                                            <tr key={i}>
                                                                <td><p className="text-md text-start">{i+1}</p></td>
                                                                <td><p className="text-md text-start">{item.name}</p></td>
                                                                <td><p className="text-md text-start">{item.email}</p></td>
                                                                <td className='text-wrap'><p className="text-md text-start">{item.massage}</p></td>
                                                                <td>
                                                                    <Link to={`/display-subscriber`}
                                                                          className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                        <AiOutlineEdit size={15}/>
                                                                    </Link>
                                                                    <button onClick={DeleteItem.bind(this, item._id)}
                                                                            className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                        <AiOutlineDelete size={15}/>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <nav aria-label="Page navigation example">
                                                <ReactPaginate
                                                    previousLabel="<"
                                                    nextLabel=">"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakLabel="..."
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                />
                                            </nav>
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

export default SubscriberList;
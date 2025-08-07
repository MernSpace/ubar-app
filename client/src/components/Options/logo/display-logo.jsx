import React, {Fragment, useEffect, useState} from 'react';
import {DeleteLogoRequest, ReadLogoRequest} from "../../../APIRequest/logoApiRequest.js";
import {Link} from "react-router-dom";
import {AiOutlineDelete, AiOutlineEdit, AiOutlinePrinter} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import {DeleteAlert} from "../../../helper/deleteAlert.js";
import {DeleteStudentRequest, StudentListRequest} from "../../../APIRequest/studentApiRequest.js";

const DisplayLogo = () => {
const [DataList,setDataList] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                let res = await ReadLogoRequest();
                setDataList(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading || !DataList) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed){
            let DeleteResult= await DeleteLogoRequest(id)
            if(DeleteResult){
                await ReadLogoRequest();
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
                                            <h5>LOGO</h5>
                                        </div>


                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">No</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Logo Photo</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        DataList.map((item,i)=>
                                                            <tr key={i}>
                                                                <td><p className="text-md text-start">{i+1}</p></td>

                                                                <td><img src={item.Logo}
                                                                         className=""
                                                                         style={{
                                                                             width: '100px',
                                                                             height: '100px'
                                                                         }} /></td>

                                                                <td>
                                                                    <div
                                                                          className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                        <AiOutlineEdit size={15}/>
                                                                    </div>
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

export default DisplayLogo;
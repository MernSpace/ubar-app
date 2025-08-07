import React, {Fragment, useEffect} from 'react';
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import {DeleteAlert} from "../../../helper/deleteAlert.js";
import {DeleteInfoRequest, ReadInfoRequest} from "../../../APIRequest/infoApiRequest.js";
import {useSelector} from "react-redux";

const DisplayInfo = () => {

    useEffect(() => {
        (async () => {
            await ReadInfoRequest()
        })();
    }, []);

    let DataList=useSelector((state)=>(state.info.InfoData));

    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed){
            let DeleteResult= await DeleteInfoRequest(id)
            if(DeleteResult){
                await ReadInfoRequest();
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
                                            <h5>Info List</h5>
                                        </div>


                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">No</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Info Photo</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Info Heading</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Info Description</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        DataList.map((item,i)=>
                                                            <tr key={i}>
                                                                <td><p className="text-md text-start">{i + 1}</p></td>

                                                                <td><img src={item.Img1}
                                                                         className=""
                                                                         style={{
                                                                             width: '50px',
                                                                             height: '50px'
                                                                         }}/></td>
                                                                <td><p
                                                                    className="text-md text-start">{item.heading}</p>
                                                                </td>
                                                                <td className='text-wrap'><p
                                                                    className="text-md text-start">{item.description}</p>
                                                                </td>


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

export default DisplayInfo;
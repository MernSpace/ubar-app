import React, {Fragment, useEffect} from 'react';
import {useSelector} from "react-redux";
import {DeleteAlert} from "../../../helper/deleteAlert.js";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import {DeleteFooterInfoRequest, ReadFooterInfoRequest} from "../../../APIRequest/footerApiRequest.js";

const DisplayFooter = () => {

    useEffect(() => {
        (async () => {
            await ReadFooterInfoRequest()
        })();
    }, []);

    let DataList=useSelector((state)=>(state.footer.footerData));

    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed){
            let DeleteResult= await DeleteFooterInfoRequest(id)
            if(DeleteResult){
                await ReadFooterInfoRequest();
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
                                            <h5>Footer Data</h5>
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
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Footer Heading</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Footer Description</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Footer Phone</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Footer Email</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Footer Address</td>
                                                        <td className="text-uppercase text-secondary text-md font-weight-bolder opacity-9">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        DataList.map((item,i)=>
                                                            <tr key={i}>
                                                                <td><p className="text-md text-start">{i + 1}</p></td>

                                                                <td><img src={item.Logo}
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
                                                                <td className='text-wrap'><p
                                                                    className="text-md text-start">{item.phone}</p>
                                                                </td>
                                                                <td className='text-wrap'><p
                                                                    className="text-md text-start">{item.email}</p>
                                                                </td>
                                                                <td className='text-wrap'><p
                                                                    className="text-md text-start">{item.address}</p>
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

export default DisplayFooter;
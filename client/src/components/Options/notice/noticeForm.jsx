import React, {useRef} from 'react';
import {getBase64, SuccessToast} from "../../../helper/FormHelper.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {CreateCarouselRequest} from "../../../APIRequest/carouselApiRequest.js";
import store from "../../../redux/store/store.js";
import {OnChangeInfoInput} from "../../../redux/state-slice/info-slice.js";
import {OnChangeNoticeInput} from "../../../redux/state-slice/notice-slice.js";
import {CreateNoticeRequest} from "../../../APIRequest/noticeApiRequest.js";

const NoticeForm = () => {
    let NoticeFormValue=useSelector((state)=>(state.notice.NoticeFormValue));
    const Navigate = useNavigate();

    const SaveChange=async ()=>{

        await CreateNoticeRequest(NoticeFormValue)
        Navigate('/display-notice')
        SuccessToast('Notice Uploaded Successfully!')

    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Notice</label>
                                        <input value={NoticeFormValue.notice}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeNoticeInput({
                                                       Name: "notice",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               placeholder="Notice!"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} className="w-100  btn btn-success">Upload Notice
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

export default NoticeForm;
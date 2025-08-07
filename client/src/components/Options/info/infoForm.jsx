import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getBase64, SuccessToast} from "../../../helper/FormHelper.js";
import store from "../../../redux/store/store.js";
import {OnChangeStudentInput} from "../../../redux/state-slice/student-slice.js";
import {CreateCarouselRequest} from "../../../APIRequest/carouselApiRequest.js";
import {OnChangeInfoInput} from "../../../redux/state-slice/info-slice.js";
import {CreateInfoRequest} from "../../../APIRequest/infoApiRequest.js";

const InfoForm = () => {
    let infoImgRef,infoImgView = useRef()
    let infoFormValue=useSelector((state)=>(state.info.InfoFormValue));
    const Navigate = useNavigate();

    const PreviewImage = () => {
        let ImgFile = infoImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            infoImgView.src=base64Img;
        })
    }
    const SaveChange=async ()=>{
        let photo = infoImgView.src

        const updateInfoFormValue={
            ...infoFormValue,
            Img1:photo
        };
        console.log(updateInfoFormValue);
        await CreateInfoRequest(updateInfoFormValue)
        // Navigate('/display-carousel')

    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input) => infoImgView = input} className=" w-25"

                                     src={infoFormValue.Img1} alt=""/>
                                <h2>{infoFormValue.Img1}</h2>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Info Image</label>
                                        <input onChange={PreviewImage} ref={(input) => infoImgRef = input}
                                               placeholder="" className="form-control animated fadeInUp"
                                               type="file"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Info Heading</label>
                                        <input value={infoFormValue.heading}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeInfoInput({
                                                       Name: "heading",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               placeholder="Info Heading"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Info Description</label>
                                        <input value={infoFormValue.description}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeInfoInput({
                                                       Name: "description",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               placeholder="Info Description"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} className="w-100  btn btn-success">Upload Info
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

export default InfoForm;
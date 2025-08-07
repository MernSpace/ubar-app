import React, {useRef} from 'react';
import store from "../../../redux/store/store.js";
import {OnChangeInfoInput} from "../../../redux/state-slice/info-slice.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getBase64} from "../../../helper/FormHelper.js";
import {CreateWhyIPHRequest} from "../../../APIRequest/WhyIPHApiRequest.js";
import {OnChangeWhyIPHInput} from "../../../redux/state-slice/why-ihp-slice.js";

const WhyIphForm = () => {
    let infoImgRef,infoImgView = useRef()
    let WhyIPHFormValue=useSelector((state)=>(state.whyIPH.WhyIPHFormValue));
    const Navigate = useNavigate();

    const PreviewImage = () => {
        let ImgFile = infoImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            infoImgView.src=base64Img;
        })
    }


    const SaveChange=async ()=>{
        let photo = infoImgView.src

        const updateWhyIPHFormValue={
            ...WhyIPHFormValue,
            Img1:photo
        };
        console.log(updateWhyIPHFormValue);
        await CreateWhyIPHRequest(updateWhyIPHFormValue)
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

                                     src={WhyIPHFormValue.Img1} alt=""/>
                                <h2>{WhyIPHFormValue.Img1}</h2>
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
                                        <input value={WhyIPHFormValue.heading}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeWhyIPHInput({
                                                       Name: "heading",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               placeholder="Info Heading"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Info Description</label>
                                        <input value={WhyIPHFormValue.description}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeWhyIPHInput({
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

export default WhyIphForm;
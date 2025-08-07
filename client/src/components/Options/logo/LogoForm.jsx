import React, {useRef} from 'react';
import {getBase64, SuccessToast} from "../../../helper/FormHelper.js";
import {useSelector} from "react-redux";
import {AddLogoRequest} from "../../../APIRequest/logoApiRequest.js";
import {useNavigate} from "react-router-dom";

const LogoForm = () => {
    let logoImgRef,logoImgView = useRef()
    let LogoFormValue=useSelector((state)=>(state.logo.LogoFormValue));
    const Navigate = useNavigate();

    const PreviewImage = () => {
        let ImgFile = logoImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            logoImgView.src=base64Img;
        })
    }
    const SaveChange=async ()=>{
        let photo = logoImgView.src

        const updateLogoFormValue={
            ...LogoFormValue,
            Logo:photo
        };
        await AddLogoRequest(updateLogoFormValue)
        Navigate('/display-logo')
        SuccessToast('Logo Uploaded Successfully!')

    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input) => logoImgView = input} className=""
                                     src={LogoFormValue.Logo} alt=""/>
                                <h2>{LogoFormValue.Logo}</h2>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Logo Image</label>
                                        <input onChange={PreviewImage} ref={(input) => logoImgRef = input}
                                               placeholder="" className="form-control animated fadeInUp"
                                               type="file"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} className="w-100  btn btn-success">Upload Logo
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

export default LogoForm;
import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getBase64} from "../../../helper/FormHelper.js";
import {CreateInfoRequest} from "../../../APIRequest/infoApiRequest.js";
import store from "../../../redux/store/store.js";
import {OnChangeInfoInput} from "../../../redux/state-slice/info-slice.js";
import {OnChangeFooterInput} from "../../../redux/state-slice/footer-slice.js";
import {CreateFooterInfoRequest} from "../../../APIRequest/footerApiRequest.js";

const FooterForm = () => {
    let footerImgRef,footerImgView = useRef()
    let footerFormValue=useSelector((state)=>(state.footer.FooterFormValue));
    const Navigate = useNavigate();

    const PreviewImage = () => {
        let ImgFile = footerImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            footerImgView.src=base64Img;
        })
    }
    const SaveChange=async ()=>{
        let photo = footerImgView.src

        const updateFooterFormValue={
            ...footerFormValue,
            Logo:photo
        };
        console.log(updateFooterFormValue);
        await CreateFooterInfoRequest(updateFooterFormValue)
        // Navigate('/display-carousel')

    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input) => footerImgView = input} className=" w-25"

                                     src={footerFormValue.Logo} alt=""/>
                                <h2>{footerFormValue.Logo}</h2>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Footer Logo</label>
                                        <input onChange={PreviewImage} ref={(input) => footerImgRef = input}
                                               placeholder="" className="form-control animated fadeInUp"
                                               type="file"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Footer Heading</label>
                                        <input value={footerFormValue.heading}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeFooterInput({
                                                       Name: "heading",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               placeholder="Footer Heading"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Footer Description</label>
                                        <input value={footerFormValue.description}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeFooterInput({
                                                       Name: "description",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               placeholder="Footer Description"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Footer Phone</label>
                                        <input value={footerFormValue.phone}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeFooterInput({
                                                       Name: "phone",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               placeholder="Footer Phone"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Footer Email</label>
                                        <input value={footerFormValue.email}
                                               onChange={(e) => {
                                                   store.dispatch(OnChangeFooterInput({
                                                       Name: "email",
                                                       Value: e.target.value
                                                   }))
                                               }}
                                               placeholder="Footer Email"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Footer Address</label>
                                        <textarea value={footerFormValue.address}
                                                  onChange={(e) => {
                                                      store.dispatch(OnChangeFooterInput({
                                                          Name: "address",
                                                          Value: e.target.value
                                                      }))
                                                  }}
                                                  placeholder="Footer Address"
                                                  className="form-control animated fadeInUp"></textarea>
                                    </div>

                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} className="w-100  btn btn-success">Upload Footer Info
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

export default FooterForm;
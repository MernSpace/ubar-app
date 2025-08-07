import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getBase64} from "../../../helper/FormHelper.js";
import {CreateGalleryRequest} from "../../../APIRequest/galleryApiRequest.js";

const GalleryForm = () => {
    let galleryImgRef,galleryImgView = useRef()
    let galleryFormValue=useSelector((state)=>(state.gallery.GalleryFormValue));
    const Navigate = useNavigate();

    const PreviewImage = () => {
        let ImgFile = galleryImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            galleryImgView.src=base64Img;
        })
    }
    const SaveChange=async ()=>{
        let photo = galleryImgView.src

        const updateGalleryFormValue={
            ...galleryFormValue,
            image:photo
        };
        console.log(updateGalleryFormValue);
        await CreateGalleryRequest(updateGalleryFormValue)
        Navigate('/display-gallery')

    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input) => galleryImgView = input} className=" w-25"

                                     src={galleryFormValue.image} alt=""/>
                                <h2>{galleryFormValue.image}</h2>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Gallery Image</label>
                                        <input onChange={PreviewImage} ref={(input) => galleryImgRef = input}
                                               placeholder="" className="form-control animated fadeInUp"
                                               type="file"/>
                                    </div>

                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} className="w-100  btn btn-success">Upload Gallery
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

export default GalleryForm;
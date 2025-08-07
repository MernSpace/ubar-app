import React, {useRef} from 'react';
import {getBase64, SuccessToast} from "../../../helper/FormHelper.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {CreateCarouselRequest} from "../../../APIRequest/carouselApiRequest.js";

const CarouselForm = () => {
    let carouselImgRef,carouselImgView = useRef()
    let CarouselFormValue=useSelector((state)=>(state.carousel.CarouselFormValue));
    const Navigate = useNavigate();

    const PreviewImage = () => {
        let ImgFile = carouselImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            carouselImgView.src=base64Img;
        })
    }
    const SaveChange=async ()=>{
        let photo = carouselImgView.src

        const updateLogoFormValue={
            ...CarouselFormValue,
            Image:photo
        };
        await CreateCarouselRequest(updateLogoFormValue)
        Navigate('/display-carousel')
        SuccessToast('Carousel Uploaded Successfully!')

    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input) => carouselImgView = input} className=" w-50"

                                     src={CarouselFormValue.Image} alt=""/>
                                <h2>{CarouselFormValue.Image}</h2>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Carousel Image</label>
                                        <input onChange={PreviewImage} ref={(input) => carouselImgRef = input}
                                               placeholder="" className="form-control animated fadeInUp"
                                               type="file"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} className="w-100  btn btn-success">Upload Carousel
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

export default CarouselForm;
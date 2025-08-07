import { Edit3, Mail, MapPin, Phone, Star, User } from "lucide-react"
import { useState, useEffect, useRef } from "react";
import { ErrorToast, getBase64, IsEmail, IsEmpty, IsMobile } from "../../helper/FormHelper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetProfileDetails, ProfileUpdateRequest } from "../../APIRequest/userApiRequest.js";



export const ProfileInfo = () => {
    let emailRef, firstNameRef, lastNameRef, mobileRef, userImgRef, userImgView, addressRef = useRef();

    useEffect(() => {
        (async () => {
            await GetProfileDetails()
        })();
    }, [])

    const ProfileData = useSelector((state) => state.profile.value);

    let navigate = useNavigate();

    const PreviewImage = () => {
        let ImgFile = userImgRef.files[0];
        getBase64(ImgFile).then((base64Img) => {
            userImgView.src = base64Img;
        })
    }

    const UpdateMyProfile = async () => {
        let email = emailRef.value;
        let fastName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let photo = userImgView.src
        let address = addressRef.value;

        if (IsEmail(email)) {
            ErrorToast("Valid Email Address Required !")
        } else if (IsEmpty(fastName)) {
            ErrorToast("First Name Required !")
        } else if (IsEmpty(lastName)) {
            ErrorToast("Last Name Required !")
        } else if (!IsMobile(mobile)) {
            ErrorToast("Valid Mobile  Required !")
        } else {
            let result = await ProfileUpdateRequest(email, fastName, lastName, mobile, photo, address)
            if (result === true) {
                navigate("/")
            }
        }
    }

    return (
        <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="card-title h3 mb-0">My Profile</h2>
                <button
                    onClick={UpdateMyProfile}
                    className="btn btn-primary d-flex align-items-center gap-2"
                >
                    Update Profile
                </button>
            </div>

            <div className="row">

                <div className="col-4 p-2">
                    <img ref={(input) => userImgView = input} className="icon-nav-img-lg" src={ProfileData['photo']} alt="" />
                    <hr />
                    <label>Profile Picture</label>
                    <input onChange={PreviewImage} ref={(input) => userImgRef = input} placeholder="User Email" className="form-control animated fadeInUp" type="file" />
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Full Name</label>

                            <input key={Date.now()} defaultValue={ProfileData['firstName']} ref={(input) => firstNameRef = input} placeholder="First Name" className="form-control animated fadeInUp" type="text" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Last Name</label>

                            <input key={Date.now()} defaultValue={ProfileData['lastName']} ref={(input) => lastNameRef = input} placeholder="Last Name" className="form-control animated fadeInUp" type="text" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Email</label>

                            <input key={Date.now()} defaultValue={ProfileData['email']} ref={(input) => emailRef = input} placeholder="Email" className="form-control animated fadeInUp" type="email" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Phone</label>

                            <input key={Date.now()} defaultValue={ProfileData['mobile']} ref={(input) => mobileRef = input} placeholder="Phone" className="form-control animated fadeInUp" type="text" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Address</label>

                            <input key={Date.now()} defaultValue={ProfileData['address']} ref={(input) => addressRef = input} placeholder="Address" className="form-control animated fadeInUp" type="text" />
                        </div>

                    </div>
                </div>
            </div>

            <hr className="my-4" />

            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card bg-primary bg-opacity-10 border-0">
                        <div className="card-body text-center">
                            <h3 className="text-primary fw-bold mb-1">24</h3>
                            <p className="text-primary mb-0">Total Bookings</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-success bg-opacity-10 border-0">
                        <div className="card-body text-center">
                            <h3 className="text-success fw-bold mb-1">18</h3>
                            <p className="text-success mb-0">Completed</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-warning bg-opacity-10 border-0">
                        <div className="card-body text-center">
                            <h3 className="text-warning fw-bold mb-1 d-flex align-items-center justify-content-center">
                                4.8 <Star size={16} className="ms-1 text-warning" fill="currentColor" />
                            </h3>
                            <p className="text-warning mb-0">Average Rating</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
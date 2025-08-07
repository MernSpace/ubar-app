import React from 'react';
import NavBar from '../../components/Home/NavBar.jsx'; // Import your NavBar component
import Footer from '../../components/Home/Footer.jsx';
import {useDispatch, useSelector} from "react-redux";
import {ErrorToast, IsEmpty} from "../../helper/FormHelper.js";
import {CreateSubscribeRequest} from "../../APIRequest/subscribeApiRequest.js";
import {OnChangeSubscribeInput, ResetFormValue} from "../../redux/state-slice/subscribe-slice.js";
import store from "../../redux/store/store.js"; // Import your Footer component

const ContactPage = () => {

    const dispatch = useDispatch();
    let FormValue = useSelector((state) => (state.subscribe.SubscribeFormValue));
    const save = async () => {
        if (IsEmpty(FormValue.name)) {
            ErrorToast("Name Required!");
        } else if (IsEmpty(FormValue.email)) {
            ErrorToast("Email Required!");
        } else if (IsEmpty(FormValue.massage)) {
            ErrorToast("Massage Required!");
        } else {
            await CreateSubscribeRequest(FormValue);
            dispatch(ResetFormValue());
        }
    }
    return (
        <div className='main_wrapper container'>
            <NavBar/>

            <div className="row mt-5">
                {/* Left Side: Google Map */}
                <div className="col-12 col-lg-6 mb-4">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!4v1735221212237!6m8!1m7!1sbhthbG1DCyUBpMFjfBVKKw!2m2!1d24.73009281882708!2d88.42208160025919!3f191.86893319198444!4f4.286733166709297!5f0.7820865974627469"
                        width="100%" height="450" style={{border: 0}} allowFullScreen=""
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* Right Side: Contact Form */}
                <div className="col-12 col-lg-6">
                    <h2 className="mb-4">Contact Us</h2>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                className="form-control"
                                value={FormValue.name}
                                onChange={(e) => {
                                    store.dispatch(OnChangeSubscribeInput({
                                        Name: "name",
                                        Value: e.target.value
                                    }))
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="form-control"

                                value={FormValue.email}
                                onChange={(e) => {
                                    store.dispatch(OnChangeSubscribeInput({
                                        Name: "email",
                                        Value: e.target.value
                                    }))
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                name="message"
                                placeholder="Write your message"
                                className="form-control"
                                rows="5"
                                value={FormValue.massage}
                                onChange={(e) => {
                                    store.dispatch(OnChangeSubscribeInput({
                                        Name: "massage",
                                        Value: e.target.value
                                    }))
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <button style={{background:"#d8014c",color:"#fff"}}
                                onClick={save}
                                className="btn my-btn w-100"
                            >
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default ContactPage;

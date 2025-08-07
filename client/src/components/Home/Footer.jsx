
import { FaCar, FaFacebook, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4">
                        <h5 className="fw-bold mb-4">
                            <FaCar className="me-2" /> AutoBook
                        </h5>
                        <p>Your reliable auto booking service for daily commute and travel needs.</p>
                        <div className="mt-4">
                            <a href="#" className="text-white me-3"><FaFacebook className="fs-5" /></a>
                            <a href="#" className="text-white me-3"><FaTwitter className="fs-5" /></a>
                            <a href="#" className="text-white me-3"><FaInstagram className="fs-5" /></a>
                            <a href="#" className="text-white"><FaLinkedin className="fs-5" /></a>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <h6 className="fw-bold mb-4">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Home</a></li>
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">About Us</a></li>
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Services</a></li>
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Pricing</a></li>
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <h6 className="fw-bold mb-4">Contact Us</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2 d-flex align-items-center">
                                <FaPhoneAlt className="me-2" /> +91 9876543210
                            </li>
                            <li className="mb-2 d-flex align-items-center">
                                <FaEnvelope className="me-2" /> support@autobook.com
                            </li>
                            <li className="mb-2 d-flex align-items-start">
                                <FaMapMarkerAlt className="me-2 mt-1" />
                                <span>123 Auto Street, City Name, State - 123456</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <h6 className="fw-bold mb-4">Newsletter</h6>
                        <p>Subscribe to get updates and offers</p>
                        <div className="input-group mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Your Email"
                            />
                            <button className="btn btn-primary" type="button">Subscribe</button>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="row">
                    <div className="col-md-6 text-center text-md-start">
                        <p className="mb-0">© 2023 AutoBook. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <p className="mb-0">Designed and developed by <a href="#" className="text-white text-decoration-none">Your Company</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
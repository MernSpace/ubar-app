import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { ErrorToast, IsEmail, IsEmpty } from "../../helper/FormHelper";
import { LoginRequest } from "../../APIRequest/userApiRequest.js";

const Login = () => {
    let passRef, emailRef = useRef();

    const SubmitLogin = async () => {
        let email = emailRef.value;
        let pass = passRef.value;

        if (IsEmail(email)) {
            ErrorToast("Invalid Email Address");
        } else if (IsEmpty(pass)) {
            ErrorToast("Password Required");
        } else {
            await LoginRequest(email, pass);
        }
    };

    return (
        <Fragment>
            <div className="container d-flex align-items-center justify-content-center vh-100">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-4 p-4">
                        <div className="card-body">
                            <h3 className="text-center mb-4 fw-bold">Sign In</h3>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input
                                    ref={(input) => emailRef = input}
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Password</label>
                                <input
                                    ref={(input) => passRef = input}
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <button
                                onClick={SubmitLogin}
                                className="btn btn-primary w-100 py-2"
                            >
                                Login
                            </button>
                            <div className="text-center mt-4">
                                <Link className="text-decoration-none me-3" to="/Registration">
                                    Sign Up
                                </Link>
                                |
                                <Link className="text-decoration-none ms-3" to="/SendOTP">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;

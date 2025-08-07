import React from 'react';
import {
    FaCar,
    FaClock,
    FaMapMarkerAlt,

} from 'react-icons/fa';
import { BookingForm } from './BookingForm';

const AutoBookingPage = () => {
    return (
        <div className="auto-booking-page">
            {/* Hero Section */}
            <BookingForm />


            {/* Features Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Why Choose Us</h2>
                        <p className="text-muted">We provide the best auto booking experience</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-block mb-3">
                                        <FaCar className="fs-3" />
                                    </div>
                                    <h5 className="fw-bold">Instant Booking</h5>
                                    <p className="text-muted">Book your auto instantly with just a few taps</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-block mb-3">
                                        <FaClock className="fs-3" />
                                    </div>
                                    <h5 className="fw-bold">24/7 Service</h5>
                                    <p className="text-muted">Available round the clock for your convenience</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-block mb-3">
                                        <FaMapMarkerAlt className="fs-3" />
                                    </div>
                                    <h5 className="fw-bold">Wide Coverage</h5>
                                    <p className="text-muted">Service available across the entire city</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">How It Works</h2>
                        <p className="text-muted">Get your auto booked in 3 simple steps</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="text-center">
                                <div className="bg-primary text-white rounded-circle p-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                                    <span className="fs-4 fw-bold">1</span>
                                </div>
                                <h5 className="fw-bold">Enter Details</h5>
                                <p className="text-muted">Provide your pickup and drop locations</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center">
                                <div className="bg-primary text-white rounded-circle p-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                                    <span className="fs-4 fw-bold">2</span>
                                </div>
                                <h5 className="fw-bold">Confirm Booking</h5>
                                <p className="text-muted">Select your preferred auto and confirm</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center">
                                <div className="bg-primary text-white rounded-circle p-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                                    <span className="fs-4 fw-bold">3</span>
                                </div>
                                <h5 className="fw-bold">Enjoy Your Ride</h5>
                                <p className="text-muted">Track your auto and enjoy a safe ride</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">What Our Customers Say</h2>
                        <p className="text-muted">Hear from our satisfied customers</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <div className="mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-warning">★</span>
                                        ))}
                                    </div>
                                    <p className="mb-4">"The easiest auto booking experience I've ever had. Drivers are always on time!"</p>
                                    <div className="d-flex align-items-center">
                                        <img src="https://via.placeholder.com/50" alt="Customer" className="rounded-circle me-3" />
                                        <div>
                                            <h6 className="mb-0 fw-bold">Rajesh Kumar</h6>
                                            <small className="text-muted">Regular Customer</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <div className="mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-warning">★</span>
                                        ))}
                                    </div>
                                    <p className="mb-4">"Affordable prices and reliable service. I use it every day for my commute."</p>
                                    <div className="d-flex align-items-center">
                                        <img src="https://via.placeholder.com/50" alt="Customer" className="rounded-circle me-3" />
                                        <div>
                                            <h6 className="mb-0 fw-bold">Priya Sharma</h6>
                                            <small className="text-muted">Daily Commuter</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <div className="mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-warning">★</span>
                                        ))}
                                    </div>
                                    <p className="mb-4">"Great app! Booking is quick and drivers are professional. Highly recommended!"</p>
                                    <div className="d-flex align-items-center">
                                        <img src="https://via.placeholder.com/50" alt="Customer" className="rounded-circle me-3" />
                                        <div>
                                            <h6 className="mb-0 fw-bold">Amit Patel</h6>
                                            <small className="text-muted">New User</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-5 bg-primary text-white">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 mb-4 mb-lg-0">
                            <h2 className="fw-bold mb-3">Ready to book your auto?</h2>
                            <p className="mb-0">Download our app now for faster bookings and exclusive offers</p>
                        </div>
                        <div className="col-lg-4 text-lg-end">
                            <button className="btn btn-light me-2 px-4 py-2 fw-bold">Download App</button>
                            <button className="btn btn-outline-light px-4 py-2 fw-bold">Book Now</button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AutoBookingPage;
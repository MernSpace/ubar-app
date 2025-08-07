import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BookingDetailRequest } from "../../APIRequest/bookingApiRequest";

const CheckoutPage = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await BookingDetailRequest(bookingId);
                setBooking(res.data.data); // assuming response shape: { status, data: { ...booking } }
            } catch (error) {
                console.error("Failed to fetch booking:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [bookingId]);




    if (loading) return <div className="text-center py-5">Loading booking details...</div>;
    if (!booking) return <div className="text-center py-5 text-danger">Booking not found.</div>;

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">Booking Summary</h3>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <h5>Pickup Information</h5>
                                    <p className="mb-1"><strong>Date:</strong> { }</p>
                                    <p className="mb-1"><strong>Time:</strong> {booking.pickupT}</p>
                                    <p className="mb-1"><strong>Location:</strong> {booking.pickupL}</p>
                                </div>
                                <div className="col-md-6">
                                    <h5>Drop Information</h5>
                                    <p className="mb-1"><strong>Location:</strong> {booking.dropL}</p>
                                    <p className="mb-1"><strong>Distance:</strong> {booking.distance} km</p>
                                </div>
                            </div>

                            <hr />

                            <div className="row align-items-center mb-3">
                                <div className="col-md-6">
                                    <h5>Rider Information</h5>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={booking.riderID.photo}
                                            alt="Rider"
                                            className="rounded-circle me-3"
                                            width="60"
                                            height="60"
                                        />
                                        <div>
                                            <p className="mb-0"><strong>Name:</strong> {booking.riderID.firstName} {booking.riderID.lastName}</p>
                                            <p className="mb-0"><strong>Mobile:</strong> {booking.riderID.mobile}</p>
                                            <p className="mb-0"><strong>Address:</strong> {booking.riderID.address}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 text-end">
                                    <span className={`badge bg-${booking.status === 'Waiting' ? 'warning' : 'success'} text-dark fs-5 p-2`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                <div className="col-md-6">
                                    <h5>Payment Summary</h5>
                                    <p className="mb-1"><strong>Base Fare:</strong> ৳50.00</p>
                                    <p className="mb-1"><strong>Distance Charge:</strong> ৳26.86</p>
                                    <p className="mb-1"><strong>Total:</strong> ৳{booking.price}</p>
                                </div>
                                <div className="col-md-6 d-flex align-items-end justify-content-end">
                                    <div>
                                        <button className="btn btn-primary me-2">Confirm Booking</button>
                                        <button className="btn btn-outline-secondary">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header bg-light">
                            <h4 className="mb-0">Booking ID: {booking._id}</h4>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Your booking will be confirmed once payment is processed.</p>
                            <div className="alert alert-info">
                                <strong>Note:</strong> Please be ready at the pickup location 5 minutes before the scheduled time.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

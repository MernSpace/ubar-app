import { Calendar, CheckCircle, Clock, XCircle, MapPin } from "lucide-react";
import { getUserDetails } from "../../helper/SessionHelper";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserBookingDetailRequest } from "../../APIRequest/bookingApiRequest";

export const RiderBookingHistory = () => {
    const user = getUserDetails();

    useEffect(() => {
        if (user?.id) {
            UserBookingDetailRequest(user.id);
        }
    }, [user?.id]);

    const bookingHistory = useSelector((state) => state.booking.UserBooking) || [];

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case "confirmed": return <CheckCircle className="me-1" size={16} color="#198754" />;
            case "completed": return <CheckCircle className="me-1" size={16} color="#0d6efd" />;
            case "cancelled": return <XCircle className="me-1" size={16} color="#dc3545" />;
            default: return <Clock className="me-1" size={16} color="#ffc107" />;
        }
    };

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case "confirmed": return "success";
            case "completed": return "primary";
            case "cancelled": return "danger";
            default: return "warning";
        }
    };

    return (
        <>
            <div className="card-header bg-white">
                <h2 className="card-title h3 mb-1">Booking History</h2>
                <p className="text-muted mb-0">View all your past and current bookings</p>
            </div>

            <div className="card-body">
                {bookingHistory.length === 0 ? (
                    <p className="text-muted">No bookings found</p>
                ) : (
                    bookingHistory.map((booking) => (
                        <div key={booking._id} className="card mb-3 border">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h5 className="card-title mb-1">
                                            Ride to: {booking.dropL}
                                        </h5>
                                        <p className="text-muted mb-2">
                                            <MapPin size={14} className="me-1" />
                                            Pickup: {booking.pickupL}
                                        </p>
                                        <div className="d-flex gap-3">
                                            <small className="text-muted d-flex align-items-center">
                                                <Calendar size={14} className="me-1" />
                                                {new Date(booking.pickupD).toLocaleDateString()}
                                            </small>
                                            <small className="text-muted d-flex align-items-center">
                                                <Clock size={14} className="me-1" />
                                                {booking.pickupT}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="col-auto text-end">
                                        <h5 className="mb-2">${booking.price}</h5>
                                        <span
                                            className={`badge bg-${getStatusBadge(booking.status)} d-flex align-items-center`}
                                        >
                                            {getStatusIcon(booking.status)}
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

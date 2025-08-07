import React, { useEffect, useRef } from "react";
import { FaCalendarAlt, FaCar, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { OnChangeBookingInput } from "../../redux/state-slice/booking-slice.js";

// Import Leaflet at the top level
import L from 'leaflet';
import { CreateBookingRequest } from "../../APIRequest/bookingApiRequest.js";
import { getToken, getUserDetails } from "../../helper/SessionHelper.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapComponent = ({ pickupLocation, dropLocation, onLocationSelect }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef({ pickup: null, drop: null });

    // Initialize map
    useEffect(() => {
        if (mapRef.current && !mapInstanceRef.current) {
            // Create map instance
            mapInstanceRef.current = L.map(mapRef.current).setView([23.8103, 90.4125], 13);

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            }).addTo(mapInstanceRef.current);

            // Add click event
            mapInstanceRef.current.on('click', (e) => {
                const { lat, lng } = e.latlng;
                onLocationSelect(`${lat.toFixed(6)},${lng.toFixed(6)}`);
            });
        }

        // Cleanup
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                markersRef.current = { pickup: null, drop: null };
            }
        };
    }, [onLocationSelect]);

    // Update markers
    useEffect(() => {
        if (!mapInstanceRef.current) return;

        // Clear existing markers
        Object.values(markersRef.current).forEach(marker => {
            if (marker) {
                mapInstanceRef.current.removeLayer(marker);
            }
        });
        markersRef.current = { pickup: null, drop: null };

        // Add pickup marker
        if (pickupLocation && pickupLocation.includes(',')) {
            const [lat, lng] = pickupLocation.split(',').map(coord => parseFloat(coord.trim()));
            if (!isNaN(lat) && !isNaN(lng)) {
                // Create custom pickup icon
                const pickupIcon = L.icon({
                    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
                        <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12.5" cy="12.5" r="10" fill="#0d6efd" stroke="white" stroke-width="2"/>
                            <text x="12.5" y="17" font-family="Arial" font-size="12" fill="white" text-anchor="middle">P</text>
                        </svg>
                    `),
                    iconSize: [25, 25],
                    iconAnchor: [12.5, 12.5],
                    popupAnchor: [0, -12]
                });

                markersRef.current.pickup = L.marker([lat, lng], { icon: pickupIcon })
                    .addTo(mapInstanceRef.current)
                    .bindPopup('Pickup Location');

                console.log('Added pickup marker at:', lat, lng);
            }
        }

        // Add drop marker
        if (dropLocation && dropLocation.includes(',')) {
            const [lat, lng] = dropLocation.split(',').map(coord => parseFloat(coord.trim()));
            if (!isNaN(lat) && !isNaN(lng)) {
                // Create custom drop icon
                const dropIcon = L.icon({
                    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
                        <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12.5" cy="12.5" r="10" fill="#dc3545" stroke="white" stroke-width="2"/>
                            <text x="12.5" y="17" font-family="Arial" font-size="12" fill="white" text-anchor="middle">D</text>
                        </svg>
                    `),
                    iconSize: [25, 25],
                    iconAnchor: [12.5, 12.5],
                    popupAnchor: [0, -12]
                });

                markersRef.current.drop = L.marker([lat, lng], { icon: dropIcon })
                    .addTo(mapInstanceRef.current)
                    .bindPopup('Drop Location');

                console.log('Added drop marker at:', lat, lng);
            }
        }
    }, [pickupLocation, dropLocation]);

    return (
        <div
            ref={mapRef}
            style={{ height: "100%", width: "100%" }}
            id="booking-map"
        />
    );
};

export const BookingForm = () => {
    const dispatch = useDispatch();
    const bookingFormValue = useSelector((state) => state.booking.BookingFormValue);

    const handleLocationClick = (location) => {
        console.log('Location clicked:', location);

        // Logic to determine if this should be pickup or drop location
        if (!bookingFormValue.pickupL) {
            dispatch(OnChangeBookingInput({ Name: "pickupL", Value: location }));
            console.log('Set as pickup location');
        } else if (!bookingFormValue.dropL) {
            dispatch(OnChangeBookingInput({ Name: "dropL", Value: location }));
            console.log('Set as drop location');
        } else {
            // Both are filled, replace pickup
            dispatch(OnChangeBookingInput({ Name: "pickupL", Value: location }));
            console.log('Replaced pickup location');
        }
    };
    const Navigate = useNavigate();


    const calculateDistance = (pickupL, dropL) => {
        if (!pickupL || !dropL) return 0;

        const [lat1, lon1] = pickupL.split(',').map(Number);
        const [lat2, lon2] = dropL.split(',').map(Number);

        const toRad = (value) => (value * Math.PI) / 180;

        const R = 6371; // Radius of Earth in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in KM
    };


    const calculatePrice = (distance) => {
        const baseFare = 30;        // Minimum fare
        const perKmRate = 15;       // Per km charge
        return Math.max(baseFare, distance * perKmRate).toFixed(2); // 2 decimal places
    };





    const handleSubmit = async () => {

        try {
            const user = getUserDetails();

            if (!user) {
                Navigate("/login"); // Fixed: lowercase 'navigate'
                return; // Added return to prevent further execution
            }


            // Check if user details are valid
            if (!user || !user.id) {
                console.error("User details not found");
                // Handle error appropriately (show message, redirect, etc.)
                return;
            }
            const distance = calculateDistance(bookingFormValue.pickupL, bookingFormValue.dropL);
            const price = calculatePrice(distance);
            const updateBookingFormValue = {
                ...bookingFormValue,
                riderID: user.id,
                distance: distance.toFixed(2),
                price,
            };

            const result = await CreateBookingRequest(updateBookingFormValue);
            if (result.status === 201 && result.data?.data?._id) {
                const bookingId = result.data.data._id;

                // Navigate to checkout page
                Navigate(`/checkout/${bookingId}`);
            }


        } catch (error) {
            console.error("Error creating booking:", error);
            // Handle error appropriately (show error message, etc.)
        }
    }
    return (
        <section className="hero-section position-relative">
            <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
            <div className="container position-relative z-index-1 py-5">
                <div className="row align-items-start">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <h1 className="text-white fw-bold display-4 mb-4">Book Your Auto in Seconds</h1>
                        <p className="text-white fs-5 mb-4">
                            Fast, reliable, and hassle-free auto booking service for your daily commute
                        </p>

                        <div className="bg-white p-4 rounded-3 shadow">
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label d-flex align-items-center">
                                        <FaMapMarkerAlt className="me-2 text-primary" /> Pickup Location
                                    </label>
                                    <input
                                        value={bookingFormValue.pickupL || ""}
                                        onChange={(e) =>
                                            dispatch(OnChangeBookingInput({ Name: "pickupL", Value: e.target.value }))
                                        }
                                        type="text"
                                        className="form-control mb-3"
                                        placeholder="Click on the map or type location"
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label d-flex align-items-center">
                                        <FaMapMarkerAlt className="me-2 text-primary" /> Drop Location
                                    </label>
                                    <input
                                        value={bookingFormValue.dropL || ""}
                                        onChange={(e) =>
                                            dispatch(OnChangeBookingInput({ Name: "dropL", Value: e.target.value }))
                                        }
                                        type="text"
                                        className="form-control mb-3"
                                        placeholder="Click on the map or type location"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label d-flex align-items-center">
                                        <FaCalendarAlt className="me-2 text-primary" /> Pickup Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={bookingFormValue.pickupD || ""}
                                        onChange={(e) =>
                                            dispatch(OnChangeBookingInput({ Name: "pickupD", Value: e.target.value }))
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label d-flex align-items-center">
                                        <FaClock className="me-2 text-primary" /> Pickup Time
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={bookingFormValue.pickupT || ""}
                                        onChange={(e) =>
                                            dispatch(OnChangeBookingInput({ Name: "pickupT", Value: e.target.value }))
                                        }
                                    />
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-primary py-3 w-100 fw-bold"
                                        onClick={handleSubmit}
                                    >
                                        <FaCar className="me-2" /> Book Auto Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MAP AREA */}
                    <div className="col-lg-6 mt-10">
                        <div className="rounded-3 overflow-hidden shadow" style={{ height: "500px" }}>
                            <MapComponent
                                pickupLocation={bookingFormValue.pickupL}
                                dropLocation={bookingFormValue.dropL}
                                onLocationSelect={handleLocationClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
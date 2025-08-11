import React, { useState } from "react";
import {
    User,
    Truck,
    History,
    CreditCard,
    Bell,
    Settings,
    MapPin,
    Clock,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { getUserDetails } from "../../helper/SessionHelper";
import { DriverBookingHistory } from "./Ride-History";

const DriverDashboard = () => {
    const [activeTab, setActiveTab] = useState("profile");

    // Mock driver user info
    const user = getUserDetails()

    const sidebarItems = [
        { id: "profile", label: "My Profile", icon: User },
        { id: "activeRides", label: "Active Rides", icon: Truck },
        { id: "rideHistory", label: "Ride History", icon: History },
        { id: "payments", label: "Payments", icon: CreditCard },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const renderProfile = () => (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title h3 mb-4">Driver Profile</h2>
                <div className="d-flex align-items-center gap-4">
                    <img
                        src={user.photo}
                        alt="Driver"
                        className="rounded-circle"
                        style={{ width: 96, height: 96, objectFit: "cover" }}
                    />
                    <div>
                        <h4>{user.firstName} {user.lastName}</h4>
                        <p>Rating: {5} ⭐</p>
                        <p>Total Rides: {15}</p>
                        <p>Completed Rides: {14}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderActiveRides = () => (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title h3 mb-4">Active Rides</h2>

            </div>
        </div>
    );

    const renderRideHistory = () => (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title h3 mb-4">Ride History</h2>
                <p>List of past rides with details and statuses.</p>
                <DriverBookingHistory />
            </div>
        </div>
    );

    const renderPayments = () => (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title h3 mb-4">Payment Methods</h2>
                <p>Manage your payment information.</p>
            </div>
        </div>
    );

    const renderNotifications = () => (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title h3 mb-4">Notifications</h2>
                <p>Notification preferences and alerts.</p>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title h3 mb-4">Settings</h2>
                <p>Account and app settings.</p>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return renderProfile();
            case "activeRides":
                return renderActiveRides();
            case "rideHistory":
                return renderRideHistory();
            case "payments":
                return renderPayments();
            case "notifications":
                return renderNotifications();
            case "settings":
                return renderSettings();
            default:
                return renderProfile();
        }
    };

    return (
        <>
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
                rel="stylesheet"
            />
            <div className="min-vh-100 bg-light">
                <div className="d-flex">
                    {/* Sidebar */}
                    <div
                        className="bg-white shadow-sm"
                        style={{ width: "280px", minHeight: "100vh" }}
                    >
                        <div className="p-4 border-bottom">
                            <div className="d-flex align-items-center">
                                <img
                                    src={user.photo}
                                    alt="Profile"
                                    className="rounded-circle me-3"
                                    style={{ width: "48px", height: "48px", objectFit: "cover" }}
                                />
                                <div>
                                    <div className="fw-semibold">{user.name}</div>
                                    <small className="text-muted">Driver</small>
                                </div>
                            </div>
                        </div>

                        <nav className="p-3">
                            {sidebarItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`btn w-100 text-start mb-2 d-flex align-items-center gap-2 ${activeTab === item.id
                                            ? "btn-primary"
                                            : "btn-outline-light text-dark border-0 hover-bg-light"
                                            }`}
                                        style={activeTab !== item.id ? { backgroundColor: "transparent" } : {}}
                                        onMouseEnter={(e) => {
                                            if (activeTab !== item.id) {
                                                e.target.style.backgroundColor = "#f8f9fa";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (activeTab !== item.id) {
                                                e.target.style.backgroundColor = "transparent";
                                            }
                                        }}
                                    >
                                        <Icon size={18} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-fill p-4">
                        <div className="container-fluid" style={{ maxWidth: "1200px" }}>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DriverDashboard;

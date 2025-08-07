import React, { useState } from 'react';
import { User, Calendar, Settings, History, CreditCard, Bell, MapPin, Phone, Mail, Edit3, Star, Clock, CheckCircle, XCircle } from 'lucide-react';
import { ProfileInfo } from './Profile-info';
import { getUserDetails } from '../../helper/SessionHelper';

const RiderProfile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const user = getUserDetails()

    // Demo booking data
    const bookings = [
        {
            id: 'BK001',
            service: 'Luxury Spa Package',
            date: '2024-08-15',
            time: '2:00 PM',
            status: 'confirmed',
            price: '$299',
            location: 'Serenity Spa & Wellness',
            image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=80&h=80&fit=crop'
        },
        {
            id: 'BK002',
            service: 'Hair Styling & Color',
            date: '2024-08-12',
            time: '11:00 AM',
            status: 'completed',
            price: '$185',
            location: 'Elite Hair Studio',
            image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=80&h=80&fit=crop'
        },
        {
            id: 'BK003',
            service: 'Personal Training Session',
            date: '2024-08-10',
            time: '6:00 AM',
            status: 'completed',
            price: '$75',
            location: 'FitLife Gym',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop'
        },
        {
            id: 'BK004',
            service: 'Yoga Class',
            date: '2024-08-08',
            time: '7:00 PM',
            status: 'cancelled',
            price: '$25',
            location: 'Zen Yoga Studio',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=80&h=80&fit=crop'
        }
    ];

    const sidebarItems = [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'bookings', label: 'Booking History', icon: History },
        { id: 'upcoming', label: 'Upcoming', icon: Calendar },
        { id: 'payments', label: 'Payment Methods', icon: CreditCard },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed': return <CheckCircle className="me-1" size={16} color="#198754" />;
            case 'completed': return <CheckCircle className="me-1" size={16} color="#0d6efd" />;
            case 'cancelled': return <XCircle className="me-1" size={16} color="#dc3545" />;
            default: return <Clock className="me-1" size={16} color="#ffc107" />;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'confirmed': return 'success';
            case 'completed': return 'primary';
            case 'cancelled': return 'danger';
            default: return 'warning';
        }
    };



    const renderProfileContent = () => (
        <div className="card">
            <ProfileInfo />
        </div>
    );

    const renderBookingHistory = () => (
        <div className="card">
            <div className="card-header bg-white">
                <h2 className="card-title h3 mb-1">Booking History</h2>
                <p className="text-muted mb-0">View all your past and current bookings</p>
            </div>
            <div className="card-body">
                {bookings.map((booking) => (
                    <div key={booking.id} className="card mb-3 border">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <img
                                        src={booking.image}
                                        alt={booking.service}
                                        className="rounded"
                                        style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="col">
                                    <h5 className="card-title mb-1">{booking.service}</h5>
                                    <p className="text-muted mb-2">{booking.location}</p>
                                    <div className="d-flex gap-3">
                                        <small className="text-muted d-flex align-items-center">
                                            <Calendar size={14} className="me-1" />
                                            {booking.date}
                                        </small>
                                        <small className="text-muted d-flex align-items-center">
                                            <Clock size={14} className="me-1" />
                                            {booking.time}
                                        </small>
                                    </div>
                                </div>
                                <div className="col-auto text-end">
                                    <h5 className="mb-2">{booking.price}</h5>
                                    <span className={`badge bg-${getStatusBadge(booking.status)} d-flex align-items-center`}>
                                        {getStatusIcon(booking.status)}
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderUpcoming = () => (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title h3 mb-4">Upcoming Bookings</h2>
                <div className="card bg-primary bg-opacity-10 border-primary">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <img
                                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=80&h=80&fit=crop"
                                    alt="Spa"
                                    className="rounded"
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="col">
                                <h5 className="card-title mb-1">Luxury Spa Package</h5>
                                <p className="text-muted mb-2">Serenity Spa & Wellness</p>
                                <div className="d-flex gap-3">
                                    <small className="text-muted d-flex align-items-center">
                                        <Calendar size={14} className="me-1" />
                                        August 15, 2024
                                    </small>
                                    <small className="text-muted d-flex align-items-center">
                                        <Clock size={14} className="me-1" />
                                        2:00 PM
                                    </small>
                                </div>
                            </div>
                            <div className="col-auto text-end">
                                <h4 className="text-primary mb-2">$299</h4>
                                <button className="btn btn-primary">
                                    Modify Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPayments = () => (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title h3 mb-4">Payment Methods</h2>
                <div className="card border mb-3">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="bg-primary rounded me-3 d-flex align-items-center justify-content-center"
                                    style={{ width: '48px', height: '32px' }}>
                                    <CreditCard size={20} className="text-white" />
                                </div>
                                <div>
                                    <div className="fw-semibold">**** **** **** 4532</div>
                                    <small className="text-muted">Expires 12/26</small>
                                </div>
                            </div>
                            <span className="badge bg-success">Default</span>
                        </div>
                    </div>
                </div>
                <div className="card border-2 border-dashed">
                    <div className="card-body text-center">
                        <button className="btn btn-outline-secondary">
                            + Add New Payment Method
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotifications = () => (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title h3 mb-4">Notification Settings</h2>
                {[
                    { title: 'Booking Confirmations', desc: 'Get notified when your booking is confirmed' },
                    { title: 'Booking Reminders', desc: 'Receive reminders before your appointments' },
                    { title: 'Special Offers', desc: 'Get notified about deals and promotions' },
                    { title: 'Service Updates', desc: 'Stay informed about service changes' }
                ].map((item, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold">{item.title}</div>
                            <small className="text-muted">{item.desc}</small>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title h3 mb-4">Account Settings</h2>
                <div className="card border mb-4">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">Privacy & Security</h5>
                    </div>
                    <div className="list-group list-group-flush">
                        <button className="list-group-item list-group-item-action">
                            Change Password
                        </button>
                        <button className="list-group-item list-group-item-action">
                            Two-Factor Authentication
                        </button>
                        <button className="list-group-item list-group-item-action">
                            Privacy Settings
                        </button>
                    </div>
                </div>
                <div className="card border-danger">
                    <div className="card-header bg-danger bg-opacity-10">
                        <h5 className="text-danger mb-0">Danger Zone</h5>
                    </div>
                    <div className="card-body">
                        <button className="btn btn-danger">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return renderProfileContent();
            case 'bookings': return renderBookingHistory();
            case 'upcoming': return renderUpcoming();
            case 'payments': return renderPayments();
            case 'notifications': return renderNotifications();
            case 'settings': return renderSettings();
            default: return renderProfileContent();
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
                    <div className="bg-white shadow-sm" style={{ width: '280px', minHeight: '100vh' }}>
                        <div className="p-4 border-bottom">
                            <div className="d-flex align-items-center">
                                <img
                                    src={user.photo}
                                    alt="Profile"
                                    className="rounded-circle me-3"
                                    style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                                />
                                <div>
                                    <div className="fw-semibold">{user.name}</div>
                                    <small className="text-muted">Premium Member</small>
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
                                            ? 'btn-primary'
                                            : 'btn-outline-light text-dark border-0 hover-bg-light'
                                            }`}
                                        style={activeTab !== item.id ? { backgroundColor: 'transparent' } : {}}
                                        onMouseEnter={(e) => {
                                            if (activeTab !== item.id) {
                                                e.target.style.backgroundColor = '#f8f9fa';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (activeTab !== item.id) {
                                                e.target.style.backgroundColor = 'transparent';
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
                        <div className="container-fluid" style={{ maxWidth: '1200px' }}>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RiderProfile;
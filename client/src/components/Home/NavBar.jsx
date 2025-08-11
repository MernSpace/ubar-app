import { FaCar } from 'react-icons/fa';
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { getToken, getUserDetails, removeSessions } from '../../helper/SessionHelper';
import '../../assets/css/homeStyle.css';
import '../../assets/css/responsive.css';

const NavBar = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        removeSessions();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
            <div className="container">
                <NavLink className="navbar-brand fw-bold" to="/">
                    <FaCar className="me-2" /> AutoBook
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <RxHamburgerMenu className="fs-4" />
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                to="/about"
                            >
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                to="/services"
                            >
                                Services
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                to="/pricing"
                            >
                                Pricing
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                to="/contact"
                            >
                                Contact
                            </NavLink>
                        </li>
                    </ul>

                    {/* User button/dropdown on the right with spacing */}
                    <div className="d-flex align-items-center me-4">
                        {getToken() && getUserDetails() ? (
                            <div className="user-dropdown">
                                <img
                                    className="icon-nav-img icon-nav"
                                    src={getUserDetails()['photo'] || '/default-avatar.png'}
                                    alt="User Avatar"
                                    onError={(e) => {
                                        e.target.src = '/default-avatar.png';
                                    }}
                                />
                                <div className="user-dropdown-content">
                                    <div className="mt-4 text-center">
                                        <img
                                            className="icon-nav-img"
                                            src={getUserDetails()['photo'] || '/default-avatar.png'}
                                            alt="User Avatar"
                                            onError={(e) => {
                                                e.target.src = '/default-avatar.png';
                                            }}
                                        />
                                        <h6>{getUserDetails()['firstName'] || 'User'}</h6>
                                        <hr className="user-dropdown-divider p-0" />
                                    </div>
                                    {
                                        getUserDetails()['role'] === "driver" ? <NavLink to="/driver-dashboard" className="side-bar-item">
                                            <AiOutlineUser className="side-bar-item-icon" />
                                            <span className="side-bar-item-caption">Profile</span>
                                        </NavLink>
                                            : <NavLink to="/rider-profile" className="side-bar-item">
                                                <AiOutlineUser className="side-bar-item-icon" />
                                                <span className="side-bar-item-caption">Profile</span>
                                            </NavLink>
                                    }
                                    <button onClick={onLogout} className="side-bar-item btn-link">
                                        <AiOutlineLogout className="side-bar-item-icon" />
                                        <span className="side-bar-item-caption">Logout</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="btn btn-outline-light"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
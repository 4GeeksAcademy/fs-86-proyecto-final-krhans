import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
    const {store, actions} = useContext(Context);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => {
        if (isMenuOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsMenuOpen(false);
                setIsClosing(false);
            }, 500);
        } else {
            setIsMenuOpen(true);
        }
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !event.target.closest("a")
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="navbar-container">
            <div
                className={`navbar-button ${isMenuOpen ? "is-expanded" : ""}`}
                onClick={toggleMenu}
            >
                {isMenuOpen ? "KHRANS" : "K"}
            </div>

            {isMenuOpen && (
                <div ref={menuRef} className={`navbar-menu ${isClosing ? "closing" : ""}`}>
                    <ul>
                        <li>
                            <Link
                                to="/"
                                onClick={() =>
                                    setTimeout(() => setIsMenuOpen(false), 200)}> 
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about"
                                onClick={() =>
                                    setTimeout(() => setIsMenuOpen(false), 200)}>
                                About us
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
             <div className="navbar-button_login">
            {store.userData && store.userData.is_active ? (
                <div className="">
                    <button className="user-button dropdown-toggle" data-bs-toggle="dropdown">
                        {store.userData.user_name}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <Link className="dropdown-item" to="dashboard/userprofile">Profile</Link>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => actions.logout(navigate)}>Log Out</button>
                        </li>
                    </ul>
                </div>
            ) : (
                <Link to="/login">
                <button className="login-button" >
                    Log In
                </button>
                </Link>
            )}
        </div>
        </nav>
    );
};
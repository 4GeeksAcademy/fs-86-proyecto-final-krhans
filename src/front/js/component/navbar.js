import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
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

    const handleLogin = () => {
        navigate("/login");
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
            <div className="navbar-button">
                <button className="login-button" onClick={handleLogin}>
                    Log In
                </button>
            </div>
        </nav>
    );
};